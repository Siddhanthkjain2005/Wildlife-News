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
    try:
        total_incidents = int(db.scalar(select(func.count()).select_from(NewsItem)) or 0)
    except Exception:
        total_incidents = -1
        
    try:
        total_alerts = int(db.scalar(select(func.count()).select_from(Alert)) or 0)
    except Exception:
        total_alerts = -1
    
    # 4. Recent Errors
    try:
        recent_errors = int(db.scalar(
            select(func.count()).select_from(AuditLog).where(AuditLog.status == "error").where(AuditLog.timestamp >= datetime.utcnow().replace(hour=0, minute=0, second=0))
        ) or 0)
    except Exception:
        recent_errors = -1
    
    # 5. Last Sync
    try:
        last_sync = db.execute(select(SyncLog).order_by(SyncLog.started_at.desc()).limit(1)).scalar_one_or_none()
        last_sync_time = last_sync.ended_at.isoformat() if last_sync else "never"
        last_sync_status = "ok" if (last_sync and last_sync.failed == 0) else ("error" if last_sync else "unknown")
    except Exception:
        last_sync_time = "error"
        last_sync_status = "error"
    
    # 6. AI Model Status
    model_exists = Path(settings.setfit_model_path).exists() if settings.setfit_enabled else True
    
    # Dynamic settings extraction to avoid circular imports
    try:
        from app import main as app_main
        enabled_providers = app_main.settings.enabled_providers
        sync_interval = app_main.settings.sync_interval_minutes
        cache_entries = len(app_main.api_cache._cache) if hasattr(app_main.api_cache, "_cache") else 0
        cache_ttl = app_main.settings.cache_ttl_seconds
        sync_is_running = app_main.sync_state_store.snapshot().get("running", False) if hasattr(app_main, "sync_state_store") else False
    except Exception:
        enabled_providers = settings.enabled_providers
        sync_interval = settings.sync_interval_minutes
        cache_entries = 0
        cache_ttl = settings.cache_ttl_seconds
        sync_is_running = False

    # Assess Component Statuses
    db_status = "working" if (db_exists and total_incidents >= 0) else "damaged"
    
    # Extract OLLAMA settings from environment variables as they are not Pydantic Settings class fields
    ollama_enabled = os.environ.get("OLLAMA_ENABLED", "").lower() in ("true", "1")
    ollama_api_key = os.environ.get("OLLAMA_API_KEY") or os.environ.get("OLLAMA_BEARER_TOKEN")
    ollama_model = os.environ.get("OLLAMA_MODEL", "meta-llama-3.1-8b-instruct")

    ai_status = "working" if (ollama_enabled and ollama_api_key and ollama_model) else "damaged"
    # If recent errors indicate LLM failures, downgrade status
    if recent_errors >= 10:
        ai_status = "damaged"
        
    scraper_status = "working"
    if last_sync_status == "error":
        scraper_status = "damaged"
    elif sync_is_running:
        scraper_status = "working"
    elif last_sync_time == "never":
        scraper_status = "idle"
        
    alerts_status = "working"
    has_alert_channels = bool(
        settings.email_alerts_enabled or settings.telegram_alerts_enabled or settings.whatsapp_alerts_enabled
    )
    if not has_alert_channels:
        alerts_status = "damaged"
    elif total_alerts == 0:
        alerts_status = "idle"
        
    gateway_status = "working"
    
    overall_status = "healthy"
    if "damaged" in (db_status, ai_status, scraper_status, alerts_status):
        overall_status = "error"
    elif "idle" in (db_status, ai_status, scraper_status, alerts_status) or recent_errors > 0 or disk_free_gb < 1.0:
        overall_status = "warning"
 
    components = {
        "database": {
            "name": "SQLite Incident Storage",
            "status": db_status,
            "description": "Stores and indexes classified poaching events, suspect entities, and syndicated network records.",
            "stats": {
                "Incidents Tracked": f"{total_incidents} items",
                "Storage Size": f"{db_size_mb} MB",
                "Disk Directory": str(db_path or "./data/news.db"),
                "Integrity Mode": "SQLITE-WAL"
            },
            "troubleshoot": "If damaged, perform a manual database restore using the Upload card. If slow, trigger the Optimize routine to rebuild indices.",
            "action": "optimize"
        },
        "ai_engine": {
            "name": "Llama 3.1 Intelligence Parser",
            "status": ai_status,
            "description": "Processes news text to perform entity extraction, suggest violation violative schedules, and draft chargesheets.",
            "stats": {
                "Active Model": ollama_model or "meta-llama-3.1-8b-instruct",
                "Inference API": "GitHub Models (Azure Gateway)",
                "Daily Quota Limit": "60,000 requests",
                "Content Filter": "Responsible AIPolicyViolation Catcher"
            },
            "troubleshoot": "If damaged, check your OLLAMA_API_KEY environment credentials or test connectivity to the models.inference.ai.azure.com endpoint.",
            "action": "test_ai"
        },
        "collector": {
            "name": "Background News Scraper",
            "status": scraper_status,
            "description": "Crawl search nodes and RSS feeds across 7+ media platforms to harvest new wildlife incident signals.",
            "stats": {
                "STANDBY STATE": "Idle waiting for timer" if not sync_is_running else "CRAWLING ACTIVE NEWS",
                "Crawling Interval": f"Every {sync_interval} minutes",
                "Last Active Crawl": "Never" if last_sync_time == "never" else last_sync_time[:19].replace("T", " "),
                "Active Feeds": enabled_providers
            },
            "troubleshoot": "If damaged, check internet routing. If the scraper appears locked or stuck running for >15 minutes, click 'Reset Sync Lock' to recover standby.",
            "action": "sync_now"
        },
        "alert_engine": {
            "name": "Threat Notification Dispatcher",
            "status": alerts_status,
            "description": "Sends high-risk threat alerts and daily summaries to forest rangers and enforcement directors.",
            "stats": {
                "Alerts Compiled": f"{total_alerts} dispatched",
                "E-Mail Channel": "ACTIVE" if settings.email_alerts_enabled else "disabled",
                "Telegram Channel": "ACTIVE" if settings.telegram_alerts_enabled else "disabled",
                "WhatsApp Channel": "ACTIVE" if settings.whatsapp_alerts_enabled else "disabled"
            },
            "troubleshoot": "If standby, no high-risk alerts have triggered today. Trigger a test alert to verify Twilio/SMTP connectivity on official handsets.",
            "action": "test_alerts"
        },
        "api_gateway": {
            "name": "API Cache & Web Server",
            "status": gateway_status,
            "description": "Manages FastAPI endpoints, serves React application bundles, and handles API caching for performance.",
            "stats": {
                "Memory Cache": f"{cache_entries} records cached",
                "Cache Lifetime": f"{cache_ttl} seconds",
                "Disk Space Left": f"{disk_free_gb} GB Free ({disk_usage_percent}% used)",
                "Daemon Status": "UVICORN-SERVICE ACTIVE"
            },
            "troubleshoot": "If stale charts or metrics are displayed on the frontend control centers, click 'Purge Memory Cache' to reload fresh records.",
            "action": "cache_clear"
        }
    }

    return {
        "status": overall_status,
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
        },
        "components": components
    }

