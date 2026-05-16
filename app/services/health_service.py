from __future__ import annotations

import os
import shutil
from datetime import datetime
from pathlib import Path

from sqlalchemy import select, func
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import sqlite_path_from_url
from app.models import NewsItem, AuditLog, SyncLog, Alert

def get_system_health(db: Session) -> dict[str, object]:
    """Perform a comprehensive system health check."""
    
    # 1. Database Health
    db_path = sqlite_path_from_url(settings.database_url)
    db_size_mb = 0.0
    db_exists = False
    if db_path and db_path.exists():
        db_exists = True
        db_size_mb = round(os.path.getsize(db_path) / (1024 * 1024), 2)
    
    # 2. Disk Space
    total, used, free = shutil.disk_usage(".")
    disk_free_gb = round(free / (1024 * 1024 * 1024), 2)
    disk_usage_percent = round((used / total) * 100, 1)
    
    # 3. Data Totals
    total_incidents = int(db.scalar(select(func.count()).select_from(NewsItem)) or 0)
    total_alerts = int(db.scalar(select(func.count()).select_from(Alert)) or 0)
    
    # 4. Recent Errors
    recent_errors = int(db.scalar(
        select(func.count()).select_from(AuditLog).where(AuditLog.status == "error").where(AuditLog.timestamp >= datetime.utcnow().replace(hour=0, minute=0, second=0))
    ) or 0)
    
    # 5. Last Sync
    last_sync = db.execute(select(SyncLog).order_by(SyncLog.started_at.desc()).limit(1)).scalar_one_or_none()
    last_sync_time = last_sync.ended_at.isoformat() if last_sync else "never"
    last_sync_status = "ok" if (last_sync and last_sync.failed == 0) else ("error" if last_sync else "unknown")
    
    # 6. AI Model Status
    # We'll need to check this from the main app instance if possible, 
    # but for now we'll check if the model directory exists
    model_exists = Path(settings.setfit_model_path).exists() if settings.setfit_enabled else True

    return {
        "status": "healthy" if (db_exists and disk_free_gb > 0.5 and recent_errors < 10) else "warning",
        "timestamp": datetime.utcnow().isoformat(),
        "database": {
            "exists": db_exists,
            "size_mb": db_size_mb,
            "total_incidents": total_incidents,
        },
        "storage": {
            "free_gb": disk_free_gb,
            "usage_percent": disk_usage_percent,
        },
        "alerts": {
            "total": total_alerts,
        },
        "errors_today": recent_errors,
        "last_sync": {
            "time": last_sync_time,
            "status": last_sync_status,
        },
        "ai_model": {
            "available": model_exists,
        },
        "channels": {
            "telegram": bool(settings.telegram_alerts_enabled and settings.telegram_bot_token),
            "whatsapp": bool(settings.whatsapp_alerts_enabled and (settings.whatsapp_api_key or settings.twilio_account_sid)),
            "email": bool(settings.email_alerts_enabled and (settings.smtp_host or settings.sendgrid_api_key or settings.resend_api_key)),
        }
    }
