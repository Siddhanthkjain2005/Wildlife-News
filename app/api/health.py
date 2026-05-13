from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.database import diagnose_database, get_db
from app.models import Alert, NewsItem

router = APIRouter(tags=["health"])


def _main():
    from app import main as app_main

    return app_main


@router.get("/health")
def health(db: Session = Depends(get_db)):
    m = _main()
    db_diag = diagnose_database()
    try:
        total_rows = db.scalar(m._apply_today_news_scope(select(func.count()).select_from(NewsItem))) or 0
    except Exception:
        total_rows = 0
        db_diag["ok"] = False
        db_diag["error"] = "db_malformed_on_news_count"

    snapshot = m._sync_snapshot()
    started_at = m.runtime_diagnostics.get("startup_time")
    uptime_seconds = 0.0
    if isinstance(started_at, str):
        try:
            uptime_seconds = max(0.0, (datetime.now(tz=timezone.utc) - datetime.fromisoformat(started_at)).total_seconds())
        except ValueError:
            uptime_seconds = 0.0

    try:
        pending_alerts = int(
            db.scalar(
                select(func.count())
                .select_from(Alert)
                .where((Alert.sent_popup.is_(False)) | (Alert.sent_email.is_(False)) | (Alert.sent_telegram.is_(False)))
            )
            or 0
        )
    except Exception:
        pending_alerts = 0
        db_diag["ok"] = False
    return {
        "status": "ok" if db_diag.get("ok") else "degraded",
        "db": db_diag,
        "ai_model": {
            "ready": bool(m.runtime_diagnostics.get("ai_model_ready")),
            "model": m.settings.model_name,
        },
        "scheduler": {
            "running": m.scheduler.running,
            "interval_minutes": m.settings.sync_interval_minutes,
        },
        "alerts": {
            "pending": pending_alerts,
            "dispatch_interval_seconds": m.settings.alert_dispatch_interval_seconds,
        },
        "cache": m.api_cache.snapshot(),
        "realtime": m.event_bus.snapshot(),
        "security": {
            "admin_auth_enabled": bool(m.settings.admin_token or m.settings.admin_password or m.settings.admin_password_hash),
            "rate_limit_per_minute": m.settings.api_rate_limit_per_minute,
        },
        "last_sync": snapshot.get("finished_at"),
        "uptime_seconds": round(uptime_seconds, 2),
        "queue_backlog": m.collector.queue_backlog,
        "total_news_rows": int(total_rows),
        "predictor": m.wildlife_predictor.model_info,
    }
