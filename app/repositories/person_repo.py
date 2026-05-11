from __future__ import annotations

from collections import Counter

from sqlalchemy.orm import Session

from app.repositories.incident_repo import IncidentRepository
from app.services.graph_engine import GraphIntelligenceEngine


class PersonRepository:
    def __init__(self, db: Session) -> None:
        self.db = db
        self.incident_repo = IncidentRepository(db)
        self.graph_engine = GraphIntelligenceEngine()

    def top_persons(self, *, limit: int = 50, incident_limit: int = 5000) -> list[dict[str, object]]:
        safe_limit = max(1, min(500, limit))
        incidents = self.incident_repo.list_recent_poaching(limit=incident_limit)
        counter: Counter[str] = Counter()
        for incident in incidents:
            for person in self.graph_engine._extract_persons(incident.involved_persons or ""):
                counter[person] += 1
        return [{"name": name, "incident_count": count} for name, count in counter.most_common(safe_limit)]
