from __future__ import annotations

import json
from datetime import datetime

from fastapi import APIRouter, Depends, Request
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import require_admin_access
from app.services.report_export import (
    build_csv_bytes,
    build_excel_bytes,
    build_excel_incidents_reports_bytes,
    build_pdf_bytes,
)

router = APIRouter(tags=["exports"])


def _main():
    from app import main as app_main

    return app_main


@router.get("/api/export/csv")
@router.get("/export/csv")
def export_csv(
    request: Request,
    db: Session = Depends(get_db),
    q: str = "",
    species: str = "",
    state: str = "",
    date_from: str = "",
    date_to: str = "",
    crime_type: str = "",
    severity: str = "",
    source: str = "",
    min_confidence: float = 0.0,
    limit: int = 500,
    _: None = Depends(require_admin_access),
):
    m = _main()
    rows = m._fetch_filtered_news_rows(
        db=db,
        q=q,
        species=species,
        state=state,
        date_from=date_from,
        date_to=date_to,
        crime_type=crime_type,
        severity=severity,
        source=source,
        min_confidence=min_confidence,
        limit=limit,
    )
    payload = [m._to_export_payload(row) for row in rows]
    csv_bytes = build_csv_bytes(payload)
    m._audit(actor="admin", action="export_csv", status="ok", ip=m._client_ip(request), notes=f"rows={len(payload)}")
    return StreamingResponse(
        iter([csv_bytes]),
        media_type="text/csv; charset=utf-8",
        headers={"Content-Disposition": "attachment; filename=wildlife_intelligence_report.csv"},
    )


@router.get("/api/export/pdf")
@router.get("/export/pdf")
def export_pdf(
    request: Request,
    db: Session = Depends(get_db),
    q: str = "",
    species: str = "",
    state: str = "",
    date_from: str = "",
    date_to: str = "",
    crime_type: str = "",
    severity: str = "",
    source: str = "",
    min_confidence: float = 0.0,
    limit: int = 300,
    _: None = Depends(require_admin_access),
):
    m = _main()
    rows = m._fetch_filtered_news_rows(
        db=db,
        q=q,
        species=species,
        state=state,
        date_from=date_from,
        date_to=date_to,
        crime_type=crime_type,
        severity=severity,
        source=source,
        min_confidence=min_confidence,
        limit=limit,
    )
    payload = [m._to_export_payload(row) for row in rows]
    pdf_bytes = build_pdf_bytes(payload)
    m._audit(actor="admin", action="export_pdf", status="ok", ip=m._client_ip(request), notes=f"rows={len(payload)}")
    return StreamingResponse(
        iter([pdf_bytes]),
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=wildlife_intelligence_report.pdf"},
    )


@router.get("/api/export/excel")
@router.get("/export/excel")
def export_excel(
    request: Request,
    db: Session = Depends(get_db),
    q: str = "",
    species: str = "",
    state: str = "",
    date_from: str = "",
    date_to: str = "",
    crime_type: str = "",
    severity: str = "",
    source: str = "",
    min_confidence: float = 0.0,
    limit: int = 500,
    _: None = Depends(require_admin_access),
):
    m = _main()
    rows = m._fetch_filtered_news_rows(
        db=db,
        q=q,
        species=species,
        state=state,
        date_from=date_from,
        date_to=date_to,
        crime_type=crime_type,
        severity=severity,
        source=source,
        min_confidence=min_confidence,
        limit=limit,
    )
    payload = [m._to_export_payload(row) for row in rows]
    excel_bytes = build_excel_bytes(payload, title="Wildlife Crime Intelligence Brief")
    m._audit(actor="admin", action="export_excel", status="ok", ip=m._client_ip(request), notes=f"rows={len(payload)}")
    return StreamingResponse(
        iter([excel_bytes]),
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=wildlife_intelligence_report.xlsx"},
    )


@router.get("/api/export/excel-incidents-reports")
@router.get("/export/excel-incidents-reports")
def export_excel_incidents_reports(
    request: Request,
    db: Session = Depends(get_db),
    q: str = "",
    species: str = "",
    state: str = "",
    date_from: str = "",
    date_to: str = "",
    crime_type: str = "",
    severity: str = "",
    source: str = "",
    min_confidence: float = 0.0,
    limit: int = 1000,
    _: None = Depends(require_admin_access),
):
    m = _main()
    rows = m._fetch_filtered_news_rows(
        db=db,
        q=q,
        species=species,
        state=state,
        date_from=date_from,
        date_to=date_to,
        crime_type=crime_type,
        severity=severity,
        source=source,
        min_confidence=min_confidence,
        limit=limit,
    )
    payload = [m._to_export_payload(row) for row in rows]
    excel_bytes = build_excel_incidents_reports_bytes(payload, title="Total Incidents and Reports Today")
    m._audit(
        actor="admin",
        action="export_excel_incidents_reports",
        status="ok",
        ip=m._client_ip(request),
        notes=f"rows={len(payload)}",
    )
    return StreamingResponse(
        iter([excel_bytes]),
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=wildlife_incidents_reports_today.xlsx"},
    )


@router.get("/api/export/briefing-pack")
def export_briefing_pack(
    request: Request,
    db: Session = Depends(get_db),
    q: str = "",
    species: str = "",
    state: str = "",
    date_from: str = "",
    date_to: str = "",
    crime_type: str = "",
    severity: str = "",
    source: str = "",
    min_confidence: float = 0.0,
    limit: int = 200,
    _: None = Depends(require_admin_access),
):
    m = _main()
    rows = m._fetch_filtered_news_rows(
        db=db,
        q=q,
        species=species,
        state=state,
        date_from=date_from,
        date_to=date_to,
        crime_type=crime_type,
        severity=severity,
        source=source,
        min_confidence=min_confidence,
        limit=limit,
    )
    incidents = [
        {
            "id": row.id,
            "date": row.published_at.isoformat(sep=" ", timespec="seconds"),
            "title": row.title,
            "two_line_summary": row.intel_summary,
            "key_intelligence_points": m._parse_intel_points(row.intel_points),
            "likely_smuggling_route": row.likely_smuggling_route,
            "enforcement_recommendation": row.enforcement_recommendation
            or m._action_recommendation(
                row.risk_score,
                species=row.species,
                crime_type=row.crime_type,
                state=row.state,
                district=row.district,
                network_indicator=row.network_indicator,
                repeat_indicator=row.repeat_indicator,
            ),
            "confidence_explanation": row.confidence_explanation or row.ai_reason,
            "risk_score": row.risk_score,
            "confidence": round(row.confidence, 4),
            "species": row.species,
            "state": row.state,
            "district": row.district,
            "involved_persons": row.involved_persons,
            "crime_type": row.crime_type,
            "source": row.source,
            "url": row.url,
            "open_url": f"/open/{row.id}",
        }
        for row in rows
    ]
    pack = {
        "generated_at_utc": datetime.utcnow().isoformat(),
        "total_incidents": len(incidents),
        "filters": {
            "q": q,
            "species": species,
            "state": state,
            "date_from": date_from,
            "date_to": date_to,
            "crime_type": crime_type,
            "severity": severity,
            "source": source,
            "min_confidence": min_confidence,
        },
        "incidents": incidents,
    }
    payload = json.dumps(pack, ensure_ascii=False, indent=2).encode("utf-8")
    m._audit(actor="admin", action="export_briefing_pack", status="ok", ip=m._client_ip(request), notes=f"rows={len(incidents)}")
    return StreamingResponse(
        iter([payload]),
        media_type="application/json; charset=utf-8",
        headers={"Content-Disposition": "attachment; filename=wildlife_analyst_briefing_pack.json"},
    )
