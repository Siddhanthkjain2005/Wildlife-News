from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import NewsItem, Report
from app.repositories.news_filters import apply_strict_incident_filters


class ReportRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def list_recent(self, *, limit: int = 100, min_risk: int = 0) -> list[tuple[Report, NewsItem]]:
        safe_limit = max(1, min(500, limit))
        stmt = apply_strict_incident_filters(
            select(Report, NewsItem)
            .join(NewsItem, NewsItem.id == Report.news_id)
            .where(NewsItem.risk_score >= max(0, min(100, min_risk)))
        )
        stmt = stmt.order_by(Report.generated_at.desc()).limit(safe_limit)
        return list(self.db.execute(stmt).all())
