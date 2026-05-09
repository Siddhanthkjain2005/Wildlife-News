from __future__ import annotations

from collections import Counter

from sqlalchemy.orm import Session

from app.repositories.incident_repo import IncidentRepository


class PersonRepository:
    def __init__(self, db: Session) -> None:
        self.db = db
        self.incident_repo = IncidentRepository(db)

    def top_persons(self, *, limit: int = 50, incident_limit: int = 5000) -> list[dict[str, object]]:
        safe_limit = max(1, min(500, limit))
        incidents = self.incident_repo.list_recent_poaching(limit=incident_limit)
        counter: Counter[str] = Counter()
        for incident in incidents:
            for part in (incident.involved_persons or "").split(","):
                person = part.strip()
                if not person or "unnamed suspect" in person.lower():
                    continue
                counter[person] += 1
        return [{"name": name, "incident_count": count} for name, count in counter.most_common(safe_limit)]
