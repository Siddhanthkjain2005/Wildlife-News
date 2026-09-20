from __future__ import annotations

import os
import shutil
from datetime import datetime, timedelta
from pathlib import Path

from sqlalchemy import select, func
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import sqlite_path_from_url
from app.models import NewsItem, AuditLog, SyncLog, Alert

def _llm_key_pool() -> list[str]:
    """All configured LLM API keys (rotation pool or single key)."""
    raw = (
        os.environ.get("OLLAMA_API_KEYS")
        or os.environ.get("OLLAMA_API_KEY")
        or os.environ.get("LLM_API_KEY")
        or os.environ.get("OLLAMA_BEARER_TOKEN")
        or ""
    )
    keys = [k.strip() for k in raw.replace(",", " ").replace(";", " ").split() if k.strip()]
    return keys


def _llm_gateway_label(url: str) -> str:
    lowered = (url or "").lower()
    if "groq.com" in lowered:
        return "Groq Cloud (OpenAI-compatible)"
    if "ollama.com" in lowered:
        return "Ollama Cloud"
    if "openai.com" in lowered:
        return "OpenAI API"
    if "azure.com" in lowered or "inference.do-ai.run" in lowered:
        return "Azure AI Gateway"
    if "localhost" in lowered or "127.0.0.1" in lowered:
        return "Local Ollama Runtime"
    return "Custom OpenAI-compatible endpoint"


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

    # 4. Recent Errors (excluding noisy third-party dispatcher failures — those are
    # logged as warnings, so any residual error rows are genuine system errors)
    try:
        recent_errors = int(db.scalar(
            select(func.count()).select_from(AuditLog).where(AuditLog.status == "error").where(AuditLog.timestamp >= datetime.utcnow().replace(hour=0, minute=0, second=0))
        ) or 0)
    except Exception:
        recent_errors = -1

    # 5. Last Sync (with per-crawl results for richer admin detail)
    last_sync_scanned = None
    last_sync_kept = None
    last_sync_failed = None
    try:
        last_sync = db.execute(select(SyncLog).order_by(SyncLog.started_at.desc()).limit(1)).scalar_one_or_none()
        last_sync_time = last_sync.ended_at.isoformat() if (last_sync and last_sync.ended_at) else "never"
        last_sync_status = "ok" if (last_sync and last_sync.failed == 0) else ("error" if last_sync else "unknown")
        if last_sync:
            last_sync_scanned = int(last_sync.scanned or 0)
            last_sync_kept = int(last_sync.kept or 0)
            last_sync_failed = int(last_sync.failed or 0)
    except Exception:
        last_sync_time = "error"
        last_sync_status = "error"

    # 6. AI Model Status — reflects the real runtime configuration
    model_exists = Path(settings.setfit_model_path).exists() if settings.setfit_enabled else True

    # Dynamic settings extraction to avoid circular imports
    runtime_finished_at = None
    runtime_error = ""
    try:
        from app import main as app_main
        enabled_providers = app_main.settings.enabled_providers
        sync_interval = app_main.settings.sync_interval_minutes
        cache_entries = len(app_main.api_cache._cache) if hasattr(app_main.api_cache, "_cache") else 0
        cache_ttl = app_main.settings.cache_ttl_seconds
        _snapshot = app_main.sync_state_store.snapshot() if hasattr(app_main, "sync_state_store") else {}
        sync_is_running = bool(_snapshot.get("running", False))
        runtime_finished_at = _snapshot.get("finished_at")
        runtime_error = str(_snapshot.get("error") or "")
    except Exception:
        enabled_providers = settings.enabled_providers
        sync_interval = settings.sync_interval_minutes
        cache_entries = 0
        cache_ttl = settings.cache_ttl_seconds
        sync_is_running = False

    # Assess Component Statuses
    db_status = "working" if (db_exists and total_incidents >= 0) else "damaged"

    # LLM configuration (env-driven)
    ollama_enabled = os.environ.get("OLLAMA_ENABLED", "").lower() in ("true", "1")
    llm_keys = _llm_key_pool()
    ollama_model = os.environ.get("OLLAMA_MODEL", "openai/gpt-oss-20b")
    ollama_url = os.environ.get("OLLAMA_URL", "")

    ai_status = "working" if (ollama_enabled and llm_keys) else "damaged"

    # Fresh-ingestion signal: if articles arrived in the last 24h, the
    # pipeline is demonstrably alive — no historical log row can override that.
    try:
        recent_ingest = int(db.scalar(
            select(func.count()).select_from(NewsItem).where(NewsItem.created_at >= datetime.utcnow() - timedelta(hours=24))
        ) or 0)
    except Exception:
        recent_ingest = 0
    try:
        latest_ingest_at = db.scalar(select(func.max(NewsItem.created_at)).select_from(NewsItem))
    except Exception:
        latest_ingest_at = None

    # Scraper status: prefer the LIVE runtime snapshot over stale DB rows.
    # A historical row only marks "damaged" on a TOTAL crawl failure
    # (nothing scanned AND nothing kept AND providers failing) — partial
    # provider hiccups are normal in a multi-provider pipeline.
    if sync_is_running:
        scraper_status = "working"
    elif runtime_finished_at is not None and not runtime_error:
        scraper_status = "working"  # completed successfully since this boot
    elif runtime_finished_at is not None and runtime_error:
        scraper_status = "damaged"
    elif recent_ingest > 0:
        scraper_status = "working"  # ingested data within 24h proves liveness
    elif last_sync_time == "never" or last_sync_time == "error":
        scraper_status = "idle"
    elif last_sync_status == "error" and (last_sync_scanned == 0 and last_sync_kept == 0):
        scraper_status = "damaged"
    else:
        scraper_status = "working"

    # Alert engine: a missing channel is "idle" (nothing configured to send),
    # NOT "damaged" — dispatchers degrade gracefully and log warnings.
    has_alert_channels = bool(
        settings.email_alerts_enabled or settings.telegram_alerts_enabled or settings.whatsapp_alerts_enabled
    )
    alerts_status = "working" if has_alert_channels else "idle"
    if has_alert_channels and total_alerts == 0:
        alerts_status = "idle"

    gateway_status = "working"

    overall_status = "healthy"
    if "damaged" in (db_status, ai_status, scraper_status):
        overall_status = "error"
    elif "idle" in (db_status, ai_status, scraper_status) or disk_free_gb < 1.0:
        # Only core-pipeline idleness or genuine disk pressure degrades the
        # overall banner; an unconfigured alert channel is informational.
        overall_status = "warning"

    active_feeds = [p.strip() for p in str(enabled_providers).split(",") if p.strip()]
    crawl_state = "CRAWLING ACTIVE NEWS" if sync_is_running else "Idle waiting for timer"

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
            "name": "AI Intelligence Parser (Groq)",
            "status": ai_status,
            "description": "Processes news text to perform entity extraction, WPA schedule classification, and draft chargesheets via an OpenAI-compatible gateway.",
            "stats": {
                "Active Model": ollama_model,
                "Inference API": _llm_gateway_label(ollama_url),
                "API Key Pool": f"{len(llm_keys)} key(s)" + (" — rotation enabled" if len(llm_keys) > 1 else ""),
                "Content Filter": "JSON-mode structured output"
            },
            "troubleshoot": "If damaged, check OLLAMA_API_KEYS environment credentials, then use the Test AI button to validate gateway connectivity.",
            "action": "test_ai"
        },
        "collector": {
            "name": "Background News Scraper",
            "status": scraper_status,
            "description": "Crawls search nodes and RSS feeds across multiple media platforms to harvest new wildlife incident signals.",
            "stats": {
                "STANDBY STATE": crawl_state,
                "Crawling Interval": f"Every {sync_interval} minutes",
                "Last Active Crawl": (
                    str(runtime_finished_at)[:19].replace("T", " ") if runtime_finished_at
                    else (str(latest_ingest_at)[:19].replace("T", " ") + f" ({recent_ingest} new in 24h)" if latest_ingest_at and recent_ingest > 0
                          else "Never" if last_sync_time == "never" else str(last_sync_time)[:19].replace("T", " "))
                ),
                "Active Feeds": f"{len(active_feeds)} providers",
                "Last Crawl Result": (
                    f"scanned={last_sync_scanned}, kept={last_sync_kept}, failed={last_sync_failed}"
                    if last_sync_scanned is not None else "n/a"
                )
            },
            "troubleshoot": "If damaged, check internet routing. If the scraper appears locked or stuck running for >15 minutes, click 'Reset Sync Lock' to recover standby.",
            "action": "sync_now"
        },
        "alert_engine": {
            "name": "Threat Notification Dispatcher",
            "status": alerts_status,
            "description": "Sends high-risk threat alerts and daily summaries to forest rangers and enforcement directors. Degrades gracefully when no channels are configured.",
            "stats": {
                "Alerts Compiled": f"{total_alerts} dispatched",
                "E-Mail Channel": "ACTIVE" if settings.email_alerts_enabled else "disabled",
                "Telegram Channel": "ACTIVE" if settings.telegram_alerts_enabled else "disabled",
                "WhatsApp Channel": "ACTIVE" if settings.whatsapp_alerts_enabled else "disabled"
            },
            "troubleshoot": "If idle, no channels are configured or no high-risk alerts have triggered today. Trigger a test alert to verify Telegram/WhatsApp connectivity.",
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
            "scanned": last_sync_scanned,
            "kept": last_sync_kept,
            "failed": last_sync_failed,
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
