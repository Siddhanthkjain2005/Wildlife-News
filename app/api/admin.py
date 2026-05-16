from __future__ import annotations

from fastapi import APIRouter, Depends, Form, HTTPException, Request
from fastapi.responses import RedirectResponse
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import require_admin_access
from app.models import AuditLog
from app.services.maintenance import compute_data_quality_overview, force_reset_maintenance_state, get_maintenance_status, start_deep_maintenance_job
from app.services.health_service import get_system_health

router = APIRouter(tags=["admin"])


def _main():
    from app import main as app_main

    return app_main


@router.get("/admin/settings")
def admin_settings_page(request: Request):
    m = _main()
    try:
        require_admin_access(request)
    except HTTPException:
        return RedirectResponse(url="/login", status_code=303)
    cache_state = m.api_cache.snapshot()
    maintenance_status = get_maintenance_status()
    return m.templates.TemplateResponse(
        "admin_settings.html",
        {
            "request": request,
            "settings_view": {
                "enabled_providers": m.settings.enabled_providers,
                "sync_interval_minutes": m.settings.sync_interval_minutes,
                "cache_ttl_seconds": m.settings.cache_ttl_seconds,
                "backup_interval_minutes": m.settings.backup_interval_minutes,
                "admin_auth_enabled": bool(
                    m.settings.admin_token or m.settings.admin_password or m.settings.admin_password_hash
                ),
                "admin_api_key_enabled": bool(m.settings.admin_api_key),
            },
            "cache_state": cache_state,
            "sync_state": m._sync_snapshot(),
            "maintenance_state": maintenance_status,
            "system_health": get_system_health(m.SessionLocal()),
        },
    )


@router.post("/admin/settings/update")
def admin_settings_update(
    request: Request,
    enabled_providers: str = Form(...),
    sync_interval_minutes: int = Form(...),
    cache_ttl_seconds: int = Form(...),
    backup_interval_minutes: int = Form(...),
    _: None = Depends(require_admin_access),
):
    m = _main()
    m.settings.enabled_providers = enabled_providers.strip()
    m.settings.sync_interval_minutes = max(1, min(180, int(sync_interval_minutes)))
    m.settings.cache_ttl_seconds = max(5, min(900, int(cache_ttl_seconds)))
    m.settings.backup_interval_minutes = max(10, min(1440, int(backup_interval_minutes)))
    m.api_cache.ttl_seconds = m.settings.cache_ttl_seconds
    if m.scheduler.running:
        m._reschedule_sync_job(m.settings.sync_interval_minutes)
        m.scheduler.add_job(
            m._scheduled_backup_job,
            trigger="interval",
            minutes=m.settings.backup_interval_minutes,
            id="poaching-db-backup",
            replace_existing=True,
            max_instances=1,
        )
    m._clear_runtime_cache()
    m._audit(
        actor="admin",
        action="config_change",
        status="ok",
        ip=m._client_ip(request),
        notes=(
            f"providers={m.settings.enabled_providers}; sync_interval={m.settings.sync_interval_minutes}; "
            f"cache_ttl={m.settings.cache_ttl_seconds}; backup_interval={m.settings.backup_interval_minutes}"
        ),
    )
    return RedirectResponse(url="/admin/settings?msg=Settings+updated+successfully", status_code=303)


@router.post("/admin/settings/cache-clear")
def admin_cache_clear(request: Request, _: None = Depends(require_admin_access)):
    m = _main()
    m._clear_runtime_cache()
    m._audit(actor="admin", action="cache_clear", status="ok", ip=m._client_ip(request), notes="")
    return RedirectResponse(url="/admin/settings?msg=Cache+cleared", status_code=303)


@router.post("/admin/settings/run-backup")
def admin_run_backup(request: Request, _: None = Depends(require_admin_access)):
    m = _main()
    result = m._run_backup_now()
    status = "ok" if result.get("ok") else "error"
    m._audit(
        actor="admin",
        action="manual_backup",
        status=status,
        ip=m._client_ip(request),
        notes=str(result.get("error") or f"backup={result.get('backup')}"),
    )
    msg = "Backup+successful" if status == "ok" else f"Backup+failed: {result.get('error')}"
    return RedirectResponse(url=f"/admin/settings?msg={msg}", status_code=303)


@router.post("/admin/settings/test-telegram")
def admin_test_telegram(request: Request, _: None = Depends(require_admin_access)):
    m = _main()
    ok = m.alert_engine._telegram_send("Wildlife Intelligence test alert from admin settings panel.")
    m._audit(
        actor="admin",
        action="alert_test_telegram",
        status="ok" if ok else "error",
        ip=m._client_ip(request),
        notes="",
    )
    msg = "Telegram+test+message+sent" if ok else "Telegram+test+failed.+Check+logs/config."
    return RedirectResponse(url=f"/admin/settings?msg={msg}", status_code=303)

@router.post("/admin/settings/test-whatsapp")
def admin_test_whatsapp(request: Request, _: None = Depends(require_admin_access)):
    m = _main()
    ok = m.alert_engine._whatsapp_send("Wildlife Intelligence test alert from admin settings panel.")
    m._audit(
        actor="admin",
        action="alert_test_whatsapp",
        status="ok" if ok else "error",
        ip=m._client_ip(request),
        notes="",
    )
    msg = "WhatsApp+test+message+sent" if ok else "WhatsApp+test+failed.+Check+logs/config."
    return RedirectResponse(url=f"/admin/settings?msg={msg}", status_code=303)



@router.post("/admin/settings/test-email")
def admin_test_email(request: Request, _: None = Depends(require_admin_access)):
    m = _main()
    ok = m.alert_engine._email_send(
        "Wildlife Intelligence Test Email",
        "This is a test email from Wildlife Crime Intelligence admin settings.",
    )
    m._audit(
        actor="admin",
        action="alert_test_email",
        status="ok" if ok else "error",
        ip=m._client_ip(request),
        notes="",
    )
    msg = "Email+test+sent" if ok else "Email+test+failed.+Check+logs/config."
    return RedirectResponse(url=f"/admin/settings?msg={msg}", status_code=303)


@router.post("/admin/settings/deep-maintenance")
def admin_deep_maintenance(request: Request, _: None = Depends(require_admin_access)):
    m = _main()
    client_ip = m._client_ip(request)

    def _on_complete(result: dict[str, object]) -> None:
        status = "ok" if result.get("ok") else "error"
        m._audit(
            actor="admin",
            action="deep_maintenance",
            status=status,
            ip=client_ip,
            notes=(
                f"scanned={result.get('scanned', 0)}; updated={result.get('updated', 0)}; "
                f"deleted_non_india={result.get('deleted_non_india', 0)}; "
                f"deleted_non_poaching={result.get('deleted_non_poaching', 0)}; "
                f"error={result.get('error', '')}"
            ),
        )

    launch = start_deep_maintenance_job(trigger="admin_settings", on_complete=_on_complete)
    if not launch.get("started"):
        m._audit(actor="admin", action="deep_maintenance_start", status="error", ip=client_ip, notes="already_running")
        return RedirectResponse(url="/admin/settings", status_code=303)
    m._audit(actor="admin", action="deep_maintenance_start", status="ok", ip=client_ip, notes="started_in_background")
    return RedirectResponse(url="/admin/settings?msg=Full+AI+reanalysis+started+in+background", status_code=303)


@router.post("/admin/settings/reset-maintenance")
def admin_reset_maintenance(request: Request, _: None = Depends(require_admin_access)):
    m = _main()
    force_reset_maintenance_state()
    m._audit(
        actor="admin",
        action="maintenance_force_reset",
        status="ok",
        ip=m._client_ip(request),
        notes="admin_manual_reset",
    )
    return RedirectResponse(url="/admin/settings?msg=Maintenance+lock+forcefully+reset", status_code=303)


@router.get("/api/admin/audit-logs")
def admin_audit_logs(limit: int = 200, _: None = Depends(require_admin_access), db: Session = Depends(get_db)):
    safe_limit = max(1, min(1000, limit))
    rows = db.execute(select(AuditLog).order_by(AuditLog.timestamp.desc()).limit(safe_limit)).scalars().all()
    return [
        {
            "id": row.id,
            "timestamp": row.timestamp.isoformat(),
            "actor": row.actor,
            "action": row.action,
            "status": row.status,
            "ip": row.ip,
            "notes": row.notes,
        }
        for row in rows
    ]


@router.get("/api/admin/maintenance-status")
def admin_maintenance_status(_: None = Depends(require_admin_access)):
    return get_maintenance_status()


@router.get("/api/admin/data-quality")
def admin_data_quality(
    sample_limit: int = 15,
    _: None = Depends(require_admin_access),
    db: Session = Depends(get_db),
):
    return compute_data_quality_overview(db, sample_limit=sample_limit)


@router.get("/api/admin/system-health")
def admin_system_health(_: None = Depends(require_admin_access), db: Session = Depends(get_db)):
    return get_system_health(db)
