from __future__ import annotations

from dataclasses import dataclass

from sqlalchemy.orm import Session

from app.models import NewsItem
from app.repositories.incident_repo import IncidentRepository
from app.services.dedupe import DedupeEngine


@dataclass
class SearchResult:
    item: NewsItem
    similarity: float


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
        }

    def _load_candidates(self, db: Session, *, candidate_limit: int) -> list[NewsItem]:
        safe_limit = max(1, min(10000, candidate_limit))
        repo = IncidentRepository(db)
        return repo.list_recent_poaching(limit=safe_limit)

    def _rank_rows(self, *, query: str, rows: list[NewsItem], exclude_id: int | None = None) -> list[SearchResult]:
        ranked: list[SearchResult] = []
        for row in rows:
            if exclude_id is not None and row.id == exclude_id:
                continue
            candidate_text = self._incident_text(row)
            if not candidate_text:
                continue
            score = self.dedupe_engine._semantic_similarity(query, candidate_text)
            ranked.append(SearchResult(item=row, similarity=score))
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
