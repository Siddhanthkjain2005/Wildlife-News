import os
import sys

sys.path.append(os.getcwd())

from app.core.database import SessionLocal, init_database
from app.models.news import NewsItem
from app.models.intelligence import Entity, Alert
from app.models.report import Report
from app.services.dedupe import DedupeEngine
from sqlalchemy import select, delete

def main() -> None:
    print("🧹 Starting retroactive duplicate cleanup script...")
    init_database()
    db = SessionLocal()
    try:
        # Load all NewsItems in ascending order of ID so older ones are kept
        items = db.execute(select(NewsItem).order_by(NewsItem.id.asc())).scalars().all()
        print(f"Loaded {len(items)} total articles from database.")
        
        dedupe_engine = DedupeEngine()
        merged_count = 0
        
        # We will keep track of unique articles that we have processed
        # Key: lower case normalized title, or URL hash
        seen_titles = {} # title -> NewsItem
        seen_urls = {} # url_hash -> NewsItem
        
        for item in items:
            title_norm = dedupe_engine._normalize_title(item.title)
            url_hash = dedupe_engine.url_hash(item.url)
            
            # Check for exact URL duplicate
            duplicate_of = None
            if url_hash in seen_urls:
                duplicate_of = seen_urls[url_hash]
                reason = "exact_url"
            elif title_norm and title_norm in seen_titles:
                duplicate_of = seen_titles[title_norm]
                reason = "title_similarity"
            else:
                # Let's check semantic similarity with all processed items
                for seen_title, seen_item in seen_titles.items():
                    title_similarity = dedupe_engine._semantic_similarity(
                        f"{item.title}. {item.summary or ''}", 
                        f"{seen_item.title}. {seen_item.summary or ''}"
                    )
                    # Use a very safe semantic similarity threshold of 0.85
                    if title_similarity >= 0.85:
                        duplicate_of = seen_item
                        reason = "semantic_similarity"
                        break
            
            if duplicate_of is not None and duplicate_of.id != item.id:
                print(f"Found Duplicate! ID {item.id} ('{item.title[:60]}') is a duplicate of ID {duplicate_of.id} ('{duplicate_of.title[:60]}') due to {reason}.")
                # Merge duplicate_of and item
                # 1. Update source count and merged sources
                dup_sources = {s.strip() for s in (duplicate_of.merged_sources or "").split(",") if s.strip()}
                dup_sources.add(duplicate_of.source)
                item_sources = {s.strip() for s in (item.merged_sources or "").split(",") if s.strip()}
                item_sources.add(item.source)
                merged = dup_sources.union(item_sources)
                duplicate_of.merged_sources = ",".join(sorted(list(merged)))
                duplicate_of.source_count = len(merged)
                
                # 2. Safely merge and update child references (Entity, Alert, Report) to duplicate_of.id
                # A. Report Merging (UNIQUE(news_id) constraint check)
                existing_report = db.execute(
                    select(Report).where(Report.news_id == duplicate_of.id)
                ).scalars().first()
                if existing_report:
                    # Duplicate_of already has a report, so we delete the duplicate's report
                    db.execute(delete(Report).where(Report.news_id == item.id))
                else:
                    # Update news_id if duplicate_of does not have a report
                    db.execute(
                        Report.__table__.update().where(Report.news_id == item.id).values(news_id=duplicate_of.id)
                    )

                # B. Alert Merging (avoid duplicate alerts for same news)
                existing_alert = db.execute(
                    select(Alert).where(Alert.news_id == duplicate_of.id)
                ).scalars().first()
                if existing_alert:
                    # Duplicate_of already has alerts, so we delete the duplicate's alerts
                    db.execute(delete(Alert).where(Alert.news_id == item.id))
                else:
                    # Update news_id if duplicate_of does not have alerts
                    db.execute(
                        Alert.__table__.update().where(Alert.news_id == item.id).values(news_id=duplicate_of.id)
                    )

                # C. Entity Merging (avoid duplicate entity records for duplicate_of.id)
                existing_entities = db.execute(
                    select(Entity).where(Entity.news_id == duplicate_of.id)
                ).scalars().all()
                seen_entities = {(e.entity_type, e.entity_value) for e in existing_entities}

                dup_entities = db.execute(
                    select(Entity).where(Entity.news_id == item.id)
                ).scalars().all()
                
                for ent in dup_entities:
                    if (ent.entity_type, ent.entity_value) in seen_entities:
                        db.delete(ent)
                    else:
                        ent.news_id = duplicate_of.id
                
                # 3. Delete duplicate item from database
                db.delete(item)
                merged_count += 1
            else:
                # Add to processed records
                if title_norm:
                    seen_titles[title_norm] = item
                seen_urls[url_hash] = item
        
        db.commit()
        print(f"✅ Retroactive duplicate cleanup complete! Merged and deleted {merged_count} duplicates.")
    except Exception as e:
        db.rollback()
        print(f"❌ Error during cleanup: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    main()
