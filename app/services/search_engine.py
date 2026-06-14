from __future__ import annotations

import math
import re
from collections import Counter
from dataclasses import dataclass

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models import NewsItem
from app.repositories.incident_repo import IncidentRepository
from app.services.dedupe import DedupeEngine

_TOKEN_PATTERN = re.compile(r"[^\wऀ-ॿಀ-೿஀-௿ఀ-౿ঀ-৿ഀ-ൿ઀-૿଀-୿؀-ۿ]+")


def _tokenize(text: str) -> list[str]:
    return [tok for tok in _TOKEN_PATTERN.split((text or "").lower()) if len(tok) >= 2]


@dataclass
class SearchResult:
    item: NewsItem
    similarity: float


class _BM25:
    """Compact in-memory BM25 ranker over a candidate set.

    BM25 captures exact keyword relevance (names, places, species, statute
    numbers) that dense vector similarity tends to wash out. Fusing the two
    yields markedly better retrieval for short, entity-heavy analyst queries.
    """

    __slots__ = ("k1", "b", "_docs", "_df", "_avg_len", "_n")

    def __init__(self, documents: list[list[str]], *, k1: float = 1.5, b: float = 0.75) -> None:
        self.k1 = k1
        self.b = b
        self._docs = documents
        self._n = len(documents)
        self._df: Counter[str] = Counter()
        for doc in documents:
            for term in set(doc):
                self._df[term] += 1
        total_len = sum(len(doc) for doc in documents)
        self._avg_len = (total_len / self._n) if self._n else 0.0

    def _idf(self, term: str) -> float:
        df = self._df.get(term, 0)
        if df == 0:
            return 0.0
        # BM25+ style idf, always positive.
        return math.log(1 + (self._n - df + 0.5) / (df + 0.5))

    def scores(self, query_tokens: list[str]) -> list[float]:
        if not self._n or not query_tokens:
            return [0.0] * self._n
        q_terms = set(query_tokens)
        idf = {term: self._idf(term) for term in q_terms}
        out: list[float] = []
        for doc in self._docs:
            if not doc:
                out.append(0.0)
                continue
            counts = Counter(doc)
            doc_len = len(doc)
            score = 0.0
            for term in q_terms:
                tf = counts.get(term, 0)
                if tf == 0:
                    continue
                denom = tf + self.k1 * (1 - self.b + self.b * doc_len / (self._avg_len or 1.0))
                score += idf[term] * (tf * (self.k1 + 1)) / denom
            out.append(score)
        return out


def _normalize_scores(scores: list[float]) -> list[float]:
    if not scores:
        return scores
    top = max(scores)
    if top <= 0:
        return [0.0] * len(scores)
    return [s / top for s in scores]


class SemanticSearchEngine:
    def __init__(self, dedupe_engine: DedupeEngine | None = None) -> None:
        self.dedupe_engine = dedupe_engine or DedupeEngine()

    @staticmethod
    def _incident_text(item: NewsItem) -> str:
        return " ".join(
            part.strip()
            for part in [item.title or "", item.summary or "", item.intel_summary or "", item.species or "", item.crime_type or ""]
            if part and part.strip()
        )

    @staticmethod
    def _to_payload(item: NewsItem, similarity: float) -> dict[str, object]:
        return {
            "id": item.id,
            "title": item.title,
            "summary": item.intel_summary or item.summary,
            "state": item.state,
            "district": item.district,
            "species": item.species,
            "crime_type": item.crime_type,
            "risk_score": item.risk_score,
            "confidence": item.confidence,
            "published_at": item.published_at.isoformat(),
            "source": item.source,
            "open_url": f"/open/{item.id}",
            "similarity": round(float(similarity), 4),
            "wpa_schedule": getattr(item, "wpa_schedule", "") or "",
            "wpa_section": getattr(item, "wpa_section", "") or "",
            "wpa_offence_type": getattr(item, "wpa_offence_type", "") or "",
            "wpa_penalty_class": getattr(item, "wpa_penalty_class", "") or "",
            "protected_area_type": getattr(item, "protected_area_type", "") or "",
            "enforcement_authority": getattr(item, "enforcement_authority", "") or "",
            "review_status": getattr(item, "review_status", "pending") or "pending",
            "reviewed_by": getattr(item, "reviewed_by", "") or "",
            "review_notes": getattr(item, "review_notes", "") or "",
            "reviewed_at": item.reviewed_at.isoformat() if getattr(item, "reviewed_at", None) else "",
        }

    def _load_candidates(self, db: Session, *, candidate_limit: int) -> list[NewsItem]:
        safe_limit = max(1, min(10000, candidate_limit))
        repo = IncidentRepository(db)
        return repo.list_recent_poaching(limit=safe_limit)

    def _vector_scores(self, *, query: str, texts: list[str]) -> list[float] | None:
        """Score all candidate texts against the query with ONE batched encode.

        Returns None when batch embedding is not available on the configured
        dedupe engine (e.g. injected test doubles), signalling the caller to use
        the per-row similarity fallback.
        """
        embed_batch = getattr(self.dedupe_engine, "embed_batch", None)
        cosine = getattr(self.dedupe_engine, "cosine", None)
        if embed_batch is None or cosine is None:
            return None
        query_vec = embed_batch([query])[0]
        if not query_vec:
            return None
        candidate_vecs = embed_batch(texts)
        return [cosine(query_vec, vec) if vec else 0.0 for vec in candidate_vecs]

    def _rank_rows(self, *, query: str, rows: list[NewsItem], exclude_id: int | None = None) -> list[SearchResult]:
        usable: list[tuple[NewsItem, str]] = []
        for row in rows:
            if exclude_id is not None and row.id == exclude_id:
                continue
            candidate_text = self._incident_text(row)
            if not candidate_text:
                continue
            usable.append((row, candidate_text))

        if not usable:
            return []

        texts = [text for _, text in usable]

        # Dense vector scores: one batched encode for the whole candidate set when
        # the model is available; otherwise fall back to per-row similarity (also
        # what test doubles exercise).
        vector_scores = self._vector_scores(query=query, texts=texts)
        if vector_scores is None:
            vector_scores = [self.dedupe_engine._semantic_similarity(query, text) for text in texts]

        if not settings.hybrid_search_enabled:
            ranked = [SearchResult(item=row, similarity=score) for (row, _), score in zip(usable, vector_scores, strict=True)]
            ranked.sort(key=lambda result: result.similarity, reverse=True)
            return ranked

        # Sparse keyword (BM25) scores fused with the dense scores.
        query_tokens = _tokenize(query)
        bm25 = _BM25([_tokenize(text) for text in texts])
        bm25_scores = _normalize_scores(bm25.scores(query_tokens))

        v_weight = max(0.0, float(settings.hybrid_vector_weight))
        b_weight = max(0.0, float(settings.hybrid_bm25_weight))
        weight_sum = (v_weight + b_weight) or 1.0

        ranked: list[SearchResult] = []
        for (row, _), v_score, b_score in zip(usable, vector_scores, bm25_scores, strict=True):
            fused = (v_weight * float(v_score) + b_weight * float(b_score)) / weight_sum
            ranked.append(SearchResult(item=row, similarity=fused))
        ranked.sort(key=lambda result: result.similarity, reverse=True)
        return ranked

    def search(
        self,
        db: Session,
        *,
        query: str,
        limit: int = 10,
        candidate_limit: int = 2000,
        min_similarity: float = 0.0,
    ) -> dict[str, object]:
        safe_limit = max(1, min(100, limit))
        min_score = max(0.0, min(1.0, min_similarity))
        rows = self._load_candidates(db, candidate_limit=candidate_limit)
        ranked = self._rank_rows(query=query, rows=rows)
        filtered = [result for result in ranked if result.similarity >= min_score][:safe_limit]
        return {
            "query": query,
            "count": len(filtered),
            "items": [self._to_payload(result.item, result.similarity) for result in filtered],
        }

    def similar(
        self,
        db: Session,
        *,
        incident_id: int,
        limit: int = 5,
        candidate_limit: int = 2000,
        min_similarity: float = 0.0,
    ) -> dict[str, object]:
        safe_limit = max(1, min(100, limit))
        min_score = max(0.0, min(1.0, min_similarity))
        repo = IncidentRepository(db)
        target = repo.get_by_id(incident_id)
        if target is None:
            return {"incident": None, "count": 0, "items": []}

        rows = self._load_candidates(db, candidate_limit=candidate_limit)
        query = self._incident_text(target)
        ranked = self._rank_rows(query=query, rows=rows, exclude_id=incident_id)
        filtered = [result for result in ranked if result.similarity >= min_score][:safe_limit]
        return {
            "incident": self._to_payload(target, 1.0),
            "count": len(filtered),
            "items": [self._to_payload(result.item, result.similarity) for result in filtered],
        }
