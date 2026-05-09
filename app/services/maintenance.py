import logging
from sqlalchemy.orm import Session
from app.models.news import NewsItem
from app.services.intelligence import HybridIntelligenceEngine

logger = logging.getLogger("app.maintenance")

def run_deep_maintenance(db: Session):
    engine_ai = HybridIntelligenceEngine()
    
    # Comprehensive veto list
    VETO_COUNTRIES = {
        "myanmar", "thailand", "singapore", "vietnam", "laos", "cambodia", "china",
        "nepal", "bhutan", "bangladesh", "sri lanka", "malaysia", "indonesia",
        "africa", "south africa", "kenya", "tanzania", "nigeria", "congo",
        "europe", "usa", "uk", "russia", "australia", "brazil", "dubai", "uae"
    }

    try:
        items = db.query(NewsItem).all()
        deleted = 0
        updated = 0
        
        for item in items:
            # 1. Strict India Check
            is_india, score = engine_ai._is_india(item.summary, state=item.state, district=item.district)
            
            # If title is international and no strong Indian location, drop it
            title_low = item.title.lower()
            if any(f" {v} " in f" {title_low} " for v in VETO_COUNTRIES):
                if not item.state and not item.district:
                    is_india = False
            
            if not is_india:
                db.delete(item)
                deleted += 1
                continue
                
            # 2. Metadata Recovery
            has_unknown = (
                not item.species or "unknown" in item.species.lower() or
                not item.state or
                not item.involved_persons or "unknown" in item.involved_persons.lower()
            )
            
            if has_unknown:
                intel = engine_ai.analyze(
                    title=item.title,
                    summary=item.summary,
                    full_content=item.summary,
                    source=item.source
                )
                
                if intel.is_poaching:
                    # Convert lists to strings for DB compatibility
                    new_species = intel.species
                    if isinstance(new_species, list):
                        new_species = ", ".join(new_species)
                    
                    new_persons = intel.involved_persons
                    if isinstance(new_persons, list):
                        new_persons = ", ".join(new_persons)

                    item.species = new_species or item.species
                    item.state = intel.state or item.state
                    item.district = intel.district or item.district
                    item.involved_persons = new_persons or item.involved_persons
                    item.risk_score = max(item.risk_score, intel.risk_score)
                    item.confidence = max(item.confidence, intel.confidence)
                    item.is_poaching = True
                    item.is_india = True
                    updated += 1
                else:
                    item.is_poaching = False
                    updated += 1
        
        db.commit()
        return {"ok": True, "deleted": deleted, "updated": updated}
    except Exception as e:
        db.rollback()
        logger.error(f"Maintenance failed: {e}")
        return {"ok": False, "error": str(e)}
