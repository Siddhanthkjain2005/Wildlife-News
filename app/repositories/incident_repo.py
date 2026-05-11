from __future__ import annotations

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models import NewsItem


class IncidentRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(self, incident_id: int) -> NewsItem | None:
        return self.db.execute(select(NewsItem).where(NewsItem.id == incident_id)).scalar_one_or_none()

    def list_recent_poaching(self, *, limit: int = 2000) -> list[NewsItem]:
        safe_limit = max(1, min(10000, limit))
        stmt = (
            select(NewsItem)
            .where(NewsItem.is_poaching.is_(True))
            .where(NewsItem.is_india.is_(True))
            .where(func.length(func.trim(NewsItem.species)) > 0)
            .where(func.lower(NewsItem.species).notlike("%unknown%"))
            .order_by(NewsItem.published_at.desc())
            .limit(safe_limit)
        )
        return self.db.execute(stmt).scalars().all()
