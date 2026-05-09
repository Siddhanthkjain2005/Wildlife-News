from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import AuditLog


class AuditRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def list_recent(self, *, limit: int = 200) -> list[AuditLog]:
        safe_limit = max(1, min(1000, limit))
        stmt = select(AuditLog).order_by(AuditLog.timestamp.desc()).limit(safe_limit)
        return self.db.execute(stmt).scalars().all()
