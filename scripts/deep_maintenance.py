import sys
import os
from sqlalchemy import select, delete
from sqlalchemy.orm import Session

# Add project root to path
sys.path.append(os.getcwd())

from app.core.database import SessionLocal, engine
from app.models.news import NewsItem
from app.services.intelligence import HybridIntelligenceEngine
from app.core.config import settings

def run_deep_maintenance():
    print("🚀 Starting Deep Maintenance (Railway Target)...")
    db = SessionLocal()
    engine_ai = HybridIntelligenceEngine()
    
    try:
        items = db.query(NewsItem).all()
        print(f"📊 Processing {len(items)} incidents...")
        
        deleted = 0
        updated = 0
        
        # Comprehensive veto list
        VETO_COUNTRIES = {
            "myanmar", "thailand", "singapore", "vietnam", "laos", "cambodia", "china",
            "nepal", "bhutan", "bangladesh", "sri lanka", "malaysia", "indonesia",
            "africa", "south africa", "kenya", "tanzania", "nigeria", "congo",
            "europe", "usa", "uk", "russia", "australia", "brazil", "dubai", "uae"
        }
        
        for item in items:
            # 1. Strict India Check
            # We re-evaluate if it should even be in the database
            is_india, score = engine_ai._is_india(item.summary, state=item.state, district=item.district)
            
            # If title is international and no strong Indian location, drop it
            title_low = item.title.lower()
            if any(f" {v} " in f" {title_low} " for v in VETO_COUNTRIES):
                # If title mentions a veto country and there is no confirmed Indian state/district, drop
                if not item.state and not item.district:
                    is_india = False
            
            if not is_india:
                print(f"❌ Removing non-India/irrelevant article (ID {item.id}): {item.title[:60]}...")
                db.delete(item)
                deleted += 1
                continue
                
            # 2. Metadata Recovery (Fill Unknowns)
            # Re-analyze if critical fields are weak
            has_unknown = (
                not item.species or "unknown" in item.species.lower() or
                not item.state or
                not item.involved_persons or "unknown" in item.involved_persons.lower()
            )
            
            if has_unknown:
                print(f"🔍 Deep Scannning for unknowns (ID {item.id}): {item.title[:60]}...")
                # We treat summary as full_content for historical items
                intel = engine_ai.analyze(
                    title=item.title,
                    summary=item.summary,
                    full_content=item.summary,
                    source=item.source
                )
                
                if intel.is_poaching:
                    item.species = intel.species or item.species
                    item.state = intel.state or item.state
                    item.district = intel.district or item.district
                    item.involved_persons = intel.involved_persons or item.involved_persons
                    item.risk_score = max(item.risk_score, intel.risk_score)
                    item.confidence = max(item.confidence, intel.confidence)
                    item.is_poaching = True
                    item.is_india = True
                    updated += 1
                else:
                    # If it's no longer considered poaching by the new strict rules, remove it
                    print(f"⚠️  Demoting non-poaching incident (ID {item.id}): {item.title[:60]}")
                    item.is_poaching = False
                    updated += 1
        
        db.commit()
        print(f"\n✅ Maintenance Complete.")
        print(f"🗑️  Deleted: {deleted} international/irrelevant items")
        print(f"🔄 Updated/Enriched: {updated} items")
        print("💡 The Intelligence Network Browser will reflect these changes on the next refresh.")
        
    except Exception as e:
        print(f"❌ Error during maintenance: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    run_deep_maintenance()
