from __future__ import annotations

import hashlib
import math
import re
from dataclasses import dataclass
from datetime import datetime, timedelta
from difflib import SequenceMatcher
from threading import Lock
from urllib.parse import parse_qsl, urlencode, urlparse, urlunparse

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.logger import get_logger
from app.models import NewsItem

logger = get_logger("app.dedupe")


@dataclass
class DuplicateDecision:
    matched_news_id: int | None
    confidence: float
    reason: str
    url_hash: str

    @property
    def is_duplicate(self) -> bool:
        return self.matched_news_id is not None


class DedupeEngine:
    def __init__(
        self,
        title_similarity_threshold: float = 0.92,
        semantic_similarity_threshold: float = 0.86,
        embedding_model_name: str = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2",
    ) -> None:
        self.title_similarity_threshold = title_similarity_threshold
        self.semantic_similarity_threshold = semantic_similarity_threshold
        self.embedding_model_name = embedding_model_name
        self._model = None
        self._model_lock = Lock()
        self._embedding_cache: dict[str, list[float]] = {}
        self._max_cache_size = 1200

    @staticmethod
    def canonicalize_url(url: str) -> str:
        parsed = urlparse((url or "").strip())
        query = [(k, v) for k, v in parse_qsl(parsed.query, keep_blank_values=False) if not k.startswith("utm_")]
        normalized = urlunparse(
            parsed._replace(
                scheme=(parsed.scheme or "https").lower(),
                netloc=parsed.netloc.lower(),
                path=parsed.path.rstrip("/"),
                query=urlencode(query),
                fragment="",
            )
        )
        return normalized

    @classmethod
    def url_hash(cls, url: str) -> str:
        return hashlib.sha256(cls.canonicalize_url(url).encode("utf-8")).hexdigest()

    @staticmethod
    def _normalize_title(value: str) -> str:
        text = re.sub(r"\s+", " ", (value or "").strip().lower())
        return re.sub(r"[^a-z0-9 ]", "", text).strip()

    @staticmethod
    def _normalize_text(value: str) -> str:
        text = re.sub(r"\s+", " ", (value or "").strip().lower())
        return re.sub(r"[^a-z0-9 ]", " ", text).strip()

    @staticmethod
    def _token_overlap_similarity(left: str, right: str) -> float:
        left_tokens = set(left.split())
        right_tokens = set(right.split())
        if not left_tokens or not right_tokens:
            return 0.0
        return len(left_tokens.intersection(right_tokens)) / len(left_tokens.union(right_tokens))

    @staticmethod
    def _cosine(left: list[float], right: list[float]) -> float:
        if not left or not right or len(left) != len(right):
            return 0.0
        dot = sum(a * b for a, b in zip(left, right, strict=True))
        left_norm = math.sqrt(sum(a * a for a in left))
        right_norm = math.sqrt(sum(b * b for b in right))
        if left_norm == 0 or right_norm == 0:
            return 0.0
        return float(dot / (left_norm * right_norm))

    def _get_embedding_model(self):
        if self._model is not None:
            return self._model
        with self._model_lock:
            if self._model is not None:
                return self._model
            try:
                from sentence_transformers import SentenceTransformer
            except Exception:
                logger.warning("sentence-transformers unavailable; using token-overlap semantic fallback")
                self._model = False
                return self._model

            try:
                self._model = SentenceTransformer(self.embedding_model_name)
            except Exception as err:
                logger.warning("Embedding model load failed (%s): %s", self.embedding_model_name, err)
                self._model = False
            return self._model

    def _embed_text(self, text: str) -> list[float]:
        normalized = self._normalize_text(text)
        if not normalized:
            return []
        if normalized in self._embedding_cache:
            return self._embedding_cache[normalized]

        model = self._get_embedding_model()
        if model is False:
            return []

        vector = model.encode(normalized, normalize_embeddings=True)
        embedding = [float(x) for x in vector.tolist()]
        if len(self._embedding_cache) >= self._max_cache_size:
            self._embedding_cache.clear()
        self._embedding_cache[normalized] = embedding
        return embedding

    def _semantic_similarity(self, left: str, right: str) -> float:
        left_embedding = self._embed_text(left)
        right_embedding = self._embed_text(right)
        if left_embedding and right_embedding:
            return self._cosine(left_embedding, right_embedding)
        return self._token_overlap_similarity(self._normalize_text(left), self._normalize_text(right))

    @staticmethod
    def _merged_sources_set(row: NewsItem) -> set[str]:
        items = {item.strip() for item in (row.merged_sources or "").split(",") if item.strip()}
        if row.source:
            items.add(row.source.strip())
        return {item for item in items if item}

    def _best_similarity_match(
        self,
        title: str,
        summary: str,
        candidates: list[NewsItem],
    ) -> tuple[NewsItem | None, float, str]:
        title_norm = self._normalize_title(title)
        if not title_norm:
            return None, 0.0, "none"

        input_text = f"{title}. {summary}".strip()
        best_match: NewsItem | None = None
        best_score = 0.0
        best_reason = "none"

        for candidate in candidates:
            candidate_title = self._normalize_title(candidate.title or "")
            if not candidate_title:
                continue

            title_similarity = SequenceMatcher(None, title_norm, candidate_title).ratio()
            candidate_text = f"{candidate.title or ''}. {candidate.summary or ''}".strip()
            semantic_similarity = self._semantic_similarity(input_text, candidate_text)
            score = max(title_similarity, semantic_similarity)
            if score > best_score:
                best_score = score
                if title_similarity >= semantic_similarity:
                    best_reason = "title_similarity"
                else:
                    best_reason = "semantic_similarity"
                best_match = candidate

        if best_match is None:
            return None, 0.0, "none"

        if best_score < min(self.title_similarity_threshold, self.semantic_similarity_threshold):
            return None, best_score, "below_threshold"

        return best_match, best_score, best_reason

    def find_duplicate(
        self,
        db: Session,
        *,
        url: str,
        title: str,
        summary: str,
        published_at: datetime,
        source: str,
        state: str,
        district: str,
    ) -> DuplicateDecision:
        canonical_url = self.canonicalize_url(url)
        hash_value = self.url_hash(canonical_url)

        exact_url_match = db.execute(select(NewsItem).where(NewsItem.url == canonical_url)).scalar_one_or_none()
        if exact_url_match is not None:
            return DuplicateDecision(
                matched_news_id=exact_url_match.id,
                confidence=1.0,
                reason="exact_url",
                url_hash=hash_value,
            )

        hash_match = db.execute(
            select(NewsItem).where(NewsItem.url_hash == hash_value).order_by(NewsItem.published_at.desc())
        ).scalar_one_or_none()
        if hash_match is not None:
            return DuplicateDecision(
                matched_news_id=hash_match.id,
                confidence=0.98,
                reason="url_hash",
                url_hash=hash_value,
            )

        since = published_at - timedelta(days=14)
        stmt = (
            select(NewsItem)
            .where(NewsItem.is_poaching.is_(True))
            .where(NewsItem.published_at >= since)
            .order_by(NewsItem.published_at.desc())
            .limit(120)
        )

        candidates = db.execute(stmt).scalars().all()
        if state.strip():
            state_candidates = [item for item in candidates if (item.state or "").strip().lower() == state.strip().lower()]
            if state_candidates:
                candidates = state_candidates
        if district.strip():
            district_candidates = [
                item for item in candidates if (item.district or "").strip().lower() == district.strip().lower()
            ]
            if district_candidates:
                candidates = district_candidates

        best_match, confidence, reason = self._best_similarity_match(title=title, summary=summary, candidates=candidates)
        if best_match is None:
            return DuplicateDecision(
                matched_news_id=None,
                confidence=confidence,
                reason=reason,
                url_hash=hash_value,
            )

        if reason == "title_similarity" and confidence < self.title_similarity_threshold:
            return DuplicateDecision(None, confidence, "below_threshold", hash_value)
        if reason == "semantic_similarity" and confidence < self.semantic_similarity_threshold:
            return DuplicateDecision(None, confidence, "below_threshold", hash_value)

        merged_sources = self._merged_sources_set(best_match)
        if source.strip() in merged_sources:
            confidence = min(1.0, confidence + 0.02)

        return DuplicateDecision(
            matched_news_id=best_match.id,
            confidence=round(float(confidence), 4),
            reason=reason,
            url_hash=hash_value,
        )
