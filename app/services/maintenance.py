import logging
from sqlalchemy import delete
from sqlalchemy.orm import Session

from app.models.intelligence import Alert, Entity
from app.models.news import NewsItem
from app.models.report import Report
from app.services.intelligence import HybridIntelligenceEngine
from app.services.reports import upsert_report_for_news

logger = logging.getLogger("app.maintenance")


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
        items = db.query(NewsItem).all()
        deleted_non_india = 0
        deleted_non_poaching = 0
        updated = 0
        scanned = 0

        for item in items:
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
