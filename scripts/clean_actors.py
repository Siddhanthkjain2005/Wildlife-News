import sys
import os
from sqlalchemy import select, update
from sqlalchemy.orm import Session

# Add project root to path
sys.path.append(os.getcwd())

from app.core.database import SessionLocal, engine
from app.models.news import NewsItem

VETO_NAMES = {
    "myanmar", "singapore", "thailand", "vietnam", "china", "laos", "cambodia",
    "nepal", "bhutan", "bangladesh", "sri lanka", "malaysia", "indonesia",
    "hong kong", "taiwan", "africa", "south africa", "kenya", "tanzania",
    "europe", "usa", "uk", "dubai", "uae", "qatar", "russia", "australia",
    "ghosh" # requested removal of isolated surname if appearing alone
}

def clean_database():
    print("Starting database actor cleanup...")
    db = SessionLocal()
    try:
        # 1. Purge international articles that slipped through
        # (Where is_india=False or title mentions veto countries)
        print("Purging non-India articles...")
        count = 0
        all_items = db.query(NewsItem).all()
        for item in all_items:
            # If title or location is clearly international, drop it
            title_low = item.title.lower()
            if any(f" {v} " in f" {title_low} " for v in VETO_NAMES if v != "ghosh"):
                if not item.state and not item.district:
                    db.delete(item)
                    count += 1
                    continue

            # 2. Clean actor names
            if item.involved_persons:
                persons = [p.strip() for p in item.involved_persons.split(",") if p.strip()]
                cleaned = []
                for p in persons:
                    p_low = p.lower()
                    # Skip if person name matches a country or is just "Ghosh"
                    if p_low in VETO_NAMES:
                        continue
                    # Skip very short names that might be noise
                    if len(p_low) < 3:
                        continue
                    cleaned.append(p)
                
                new_val = ", ".join(cleaned)
                if new_val != item.involved_persons:
                    item.involved_persons = new_val
                    print(f"Cleaned actors for ID {item.id}: {item.involved_persons}")

        db.commit()
        print(f"Cleanup complete. Deleted {count} international items.")
    except Exception as e:
        print(f"Error during cleanup: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    clean_database()
