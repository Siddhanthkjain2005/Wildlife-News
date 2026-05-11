from __future__ import annotations

import logging
import re
from copy import deepcopy
from datetime import datetime
from threading import Lock, Thread

from sqlalchemy import delete, func, select
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.intelligence import Alert, Entity
from app.models.news import NewsItem
from app.models.report import Report
from app.repositories.news_filters import apply_strict_incident_filters
from app.services.intelligence import HybridIntelligenceEngine, NON_ANIMAL_CRIME_TYPES
from app.services.reports import upsert_report_for_news

logger = logging.getLogger("app.maintenance")

_maintenance_lock = Lock()
_maintenance_state: dict[str, object] = {
    "running": False,
    "started_at": None,
    "finished_at": None,
    "trigger": "",
    "last_result": None,
}


def _now_iso() -> str:
    return datetime.utcnow().isoformat()


def get_maintenance_status() -> dict[str, object]:
    with _maintenance_lock:
        return deepcopy(_maintenance_state)


def _update_maintenance_state(**kwargs: object) -> None:
    with _maintenance_lock:
        _maintenance_state.update(kwargs)


def start_deep_maintenance_job(*, trigger: str = "manual", on_complete=None) -> dict[str, object]:
    """Start a single maintenance job in the background if one is not already running."""
    with _maintenance_lock:
        if bool(_maintenance_state.get("running")):
            return {"ok": False, "started": False, "status": deepcopy(_maintenance_state), "reason": "already_running"}
        _maintenance_state["running"] = True
        _maintenance_state["started_at"] = _now_iso()
        _maintenance_state["finished_at"] = None
        _maintenance_state["trigger"] = trigger
        _maintenance_state["last_result"] = None

    def _runner() -> None:
        try:
            with SessionLocal() as db:
                result = run_deep_maintenance(db)
        except Exception as err:  # noqa: BLE001
            logger.error("Background maintenance crashed: %s", err)
            result = {"ok": False, "error": str(err)}
        _update_maintenance_state(running=False, finished_at=_now_iso(), last_result=result)
        if on_complete is not None:
            try:
                on_complete(result)
            except Exception as err:  # noqa: BLE001
                logger.error("Maintenance completion callback failed: %s", err)

    Thread(target=_runner, daemon=True).start()
    return {"ok": True, "started": True, "status": get_maintenance_status()}


def _delete_incident_with_dependents(db: Session, news_id: int) -> None:
    db.execute(delete(Report).where(Report.news_id == news_id))
    db.execute(delete(Alert).where(Alert.news_id == news_id))
    db.execute(delete(Entity).where(Entity.news_id == news_id))
    row = db.query(NewsItem).filter(NewsItem.id == news_id).first()
    if row is not None:
        db.delete(row)


def run_deep_maintenance(db: Session):
    """Re-analyze all stored incidents with latest AI and keep only strict India wildlife incidents."""
    engine_ai = HybridIntelligenceEngine()
    try:
        item_ids = [int(row[0]) for row in db.query(NewsItem.id).order_by(NewsItem.id.asc()).all()]
        deleted_non_india = 0
        deleted_non_poaching = 0
        updated = 0
        scanned = 0

        for index, news_id in enumerate(item_ids, start=1):
            item = db.query(NewsItem).filter(NewsItem.id == news_id).first()
            if item is None:
                continue
            scanned += 1
            base_summary = item.summary or ""
            full_content = "\n".join(
                part.strip()
                for part in [item.title or "", base_summary, item.intel_summary or "", item.confidence_explanation or ""]
                if part and part.strip()
            )
            intel = engine_ai.analyze(
                title=item.title or "",
                summary=base_summary,
                full_content=full_content or base_summary,
                source=item.source or "",
            )

            if not intel.is_india:
                _delete_incident_with_dependents(db, item.id)
                deleted_non_india += 1
                continue
            if not intel.is_poaching:
                _delete_incident_with_dependents(db, item.id)
                deleted_non_poaching += 1
                continue

            species_text = ", ".join(intel.species) if isinstance(intel.species, list) else str(intel.species or "")
            persons_text = (
                ", ".join(intel.involved_persons)
                if isinstance(intel.involved_persons, list)
                else str(intel.involved_persons or "")
            )
            if not species_text.strip() or "unknown" in species_text.lower():
                _delete_incident_with_dependents(db, item.id)
                deleted_non_poaching += 1
                continue

            item.ai_score = float(intel.confidence)
            item.ai_reason = str(intel.reason or "")[:300]
            item.is_poaching = True
            item.is_india = True
            item.confidence = float(intel.confidence)
            item.risk_score = int(intel.risk_score)
            item.crime_type = str(intel.crime_type or "unknown")[:80]
            item.species = species_text[:300]
            item.state = str(intel.state or "")[:120]
            item.district = str(intel.district or "")[:120]
            item.location = str(intel.location or "")[:240]
            item.involved_persons = persons_text[:500]
            item.network_indicator = bool(intel.network_indicator)
            item.repeat_indicator = bool(intel.repeat_indicator)
            item.intel_summary = str(intel.summary or "")[:500]
            item.intel_points = intel.to_record()["intel_points"]
            item.likely_smuggling_route = str(intel.likely_smuggling_route or "")[:500]
            item.enforcement_recommendation = str(intel.enforcement_recommendation or "")[:500]
            item.confidence_explanation = str(intel.confidence_explanation or "")[:500]
            upsert_report_for_news(db, item)
            updated += 1

            if index % 100 == 0:
                db.commit()
                db.expire_all()

        db.commit()
        return {
            "ok": True,
            "scanned": scanned,
            "updated": updated,
            "deleted_non_india": deleted_non_india,
            "deleted_non_poaching": deleted_non_poaching,
            "deleted": deleted_non_india + deleted_non_poaching,
        }
    except Exception as e:
        db.rollback()
        logger.error("Maintenance failed: %s", e)
        return {"ok": False, "error": str(e)}


def compute_data_quality_overview(db: Session, *, sample_limit: int = 15) -> dict[str, object]:
    safe_sample_limit = max(1, min(100, sample_limit))
    total_news = int(db.scalar(select(func.count()).select_from(NewsItem)) or 0)
    strict_news = int(db.scalar(apply_strict_incident_filters(select(func.count()).select_from(NewsItem))) or 0)
    poaching_rows = int(db.scalar(select(func.count()).select_from(NewsItem).where(NewsItem.is_poaching.is_(True))) or 0)
    non_india_poaching = int(
        db.scalar(
            select(func.count()).select_from(NewsItem).where(NewsItem.is_poaching.is_(True)).where(NewsItem.is_india.is_(False))
        )
        or 0
    )
    unknown_species_rows = int(
        db.scalar(
            select(func.count())
            .select_from(NewsItem)
            .where(func.lower(func.trim(func.coalesce(NewsItem.species, ""))).like("%unknown%"))
        )
        or 0
    )
    non_animal_crime_rows = int(
        db.scalar(
            select(func.count())
            .select_from(NewsItem)
            .where(func.lower(func.trim(func.coalesce(NewsItem.crime_type, ""))).in_(tuple(NON_ANIMAL_CRIME_TYPES)))
        )
        or 0
    )
    report_gaps = int(
        db.scalar(
            select(func.count())
            .select_from(NewsItem)
            .where(NewsItem.is_poaching.is_(True))
            .where(~NewsItem.id.in_(select(Report.news_id)))
        )
        or 0
    )

    person_rows = db.execute(
        select(NewsItem.id, NewsItem.title, NewsItem.involved_persons)
        .where(func.length(func.trim(func.coalesce(NewsItem.involved_persons, ""))) > 0)
        .order_by(NewsItem.published_at.desc())
    ).all()
    engine = HybridIntelligenceEngine()
    noisy_person_rows = 0
    noisy_samples: list[dict[str, object]] = []
    for news_id, title, raw_people in person_rows:
        parts = [part.strip() for part in re.split(r"\s*,\s*", str(raw_people or "")) if part.strip()]
        bad_parts = [part for part in parts if engine._is_bad_person(part)]
        if not bad_parts:
            continue
        noisy_person_rows += 1
        if len(noisy_samples) < safe_sample_limit:
            noisy_samples.append(
                {"id": int(news_id), "title": str(title or "")[:160], "noisy_parts": bad_parts[:8], "stored": str(raw_people or "")[:220]}
            )

    coverage_ratio = round((strict_news / total_news), 4) if total_news else 0.0
    recommendations: list[str] = []
    if non_india_poaching > 0:
        recommendations.append("Run Full AI Reanalysis to purge remaining non-India incidents.")
    if noisy_person_rows > 0:
        recommendations.append("Re-run maintenance to clean noisy involved_persons in historical records.")
    if unknown_species_rows > 0:
        recommendations.append("Backfill species by rescanning article content and tightening enrichment sources.")
    if report_gaps > 0:
        recommendations.append("Regenerate reports for rows missing report snapshots.")
    if not recommendations:
        recommendations.append("Quality posture is healthy. Continue regular maintenance cadence.")

    return {
        "generated_at": _now_iso(),
        "maintenance_status": get_maintenance_status(),
        "totals": {
            "all_news_rows": total_news,
            "poaching_rows": poaching_rows,
            "strict_incident_rows": strict_news,
            "strict_coverage_ratio": coverage_ratio,
            "non_india_poaching_rows": non_india_poaching,
            "unknown_species_rows": unknown_species_rows,
            "non_animal_crime_rows": non_animal_crime_rows,
            "rows_with_no_report_snapshot": report_gaps,
            "rows_with_noisy_involved_persons": noisy_person_rows,
        },
        "samples": {"noisy_person_rows": noisy_samples},
        "recommendations": recommendations,
    }
