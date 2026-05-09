from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import NewsItem, Report


class ReportRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def list_recent(self, *, limit: int = 100, min_risk: int = 0) -> list[tuple[Report, NewsItem]]:
        safe_limit = max(1, min(500, limit))
        stmt = (
            select(Report, NewsItem)
            .join(NewsItem, NewsItem.id == Report.news_id)
            .where(NewsItem.is_poaching.is_(True))
            .where(NewsItem.risk_score >= max(0, min(100, min_risk)))
            .order_by(Report.generated_at.desc())
            .limit(safe_limit)
        )
        return list(self.db.execute(stmt).all())
