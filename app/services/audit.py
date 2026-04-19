from __future__ import annotations

from sqlalchemy.orm import Session

from app.models import AuditLog


def record_audit(
    db: Session,
    *,
    actor: str,
    action: str,
    status: str,
    ip: str = "",
    notes: str = "",
) -> AuditLog:
    row = AuditLog(
        actor=(actor or "system")[:120],
        action=(action or "unknown")[:120],
        status=(status or "ok")[:24],
        ip=(ip or "")[:64],
        notes=(notes or "")[:2000],
    )
    db.add(row)
    return row
