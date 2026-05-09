import os
from pathlib import Path

# Set working directory to project root
root_dir = Path(__file__).parent.parent
os.chdir(root_dir)

import sys
sys.path.append(str(root_dir))

from sqlalchemy import delete
from app.core.database import SessionLocal
from app.models import NewsItem, Alert, Report, Entity

def purge_international_data():
    db = SessionLocal()
    try:
        # 1. Find international articles
        items_to_delete = db.query(NewsItem.id).filter(NewsItem.is_india == False).all()
        item_ids = [item.id for item in items_to_delete]
        
        if not item_ids:
            print("No international articles found to purge.")
            return

        print(f"Found {len(item_ids)} international articles. Purging...")

        # 2. Delete dependent records
        db.execute(delete(Alert).where(Alert.news_id.in_(item_ids)))
        db.execute(delete(Report).where(Report.news_id.in_(item_ids)))
        db.execute(delete(Entity).where(Entity.news_id.in_(item_ids)))
        
        # 3. Delete news items
        db.execute(delete(NewsItem).where(NewsItem.id.in_(item_ids)))
        
        db.commit()
        print("Purge completed successfully.")
    except Exception as e:
        db.rollback()
        print(f"Error during purge: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    purge_international_data()
