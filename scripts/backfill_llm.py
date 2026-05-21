"""
Backfill script: Re-extract species, involved persons, and WPA fields for ALL
existing articles using the full HybridIntelligenceEngine pipeline.

Run on Railway via SSH:
    railway ssh --service web
    PYTHONPATH=. python scripts/backfill_llm.py

This script:
  1. Checks if the LLM model is available (and reports status)
  2. Iterates through every news article in the database
  3. Re-runs the full analyze() pipeline (rule-based + NER + LLM hybrid)
  4. Updates species, involved_persons, WPA fields, and all intel metadata
  5. Commits each article individually to avoid data loss
"""
import os
import sys
import time

sys.path.insert(0, os.getcwd())

from app.core.config import settings
from app.core.database import SessionLocal, init_database
from app.models.news import NewsItem
from app.services.intelligence import HybridIntelligenceEngine
from app.services.reports import upsert_report_for_news


def check_llm_status() -> bool:
    """Check whether the LLM model file exists and can be loaded."""
    model_path = settings.llm_summary_model_path.strip()
    enabled = settings.llm_summary_enabled

    print(f"\n{'='*60}")
    print("LLM DIAGNOSTICS")
    print(f"{'='*60}")
    print(f"  LLM_SUMMARY_ENABLED  = {enabled}")
    print(f"  LLM_SUMMARY_MODEL_PATH = {model_path!r}")

    if not enabled:
        print("  ⚠️  LLM is DISABLED in config. Set LLM_SUMMARY_ENABLED=true")
        print("     Species/persons will still use rule-based + NER extraction.")
        return False

    if not model_path:
        print("  ⚠️  LLM model path is empty. Set LLM_SUMMARY_MODEL_PATH.")
        return False

    if os.path.isfile(model_path):
        size_gb = os.path.getsize(model_path) / (1024**3)
        print(f"  ✅ Model file exists ({size_gb:.2f} GB)")
    else:
        print(f"  ❌ Model file NOT FOUND at: {model_path}")
        print("     The LLM will silently fall back to rule-based extraction.")
        return False

    try:
        from llama_cpp import Llama
        print("  ✅ llama-cpp-python is installed")
    except ImportError:
        print("  ❌ llama-cpp-python is NOT installed!")
        print("     Run: pip install llama-cpp-python>=0.2.90")
        return False

    print(f"{'='*60}\n")
    return True


def run_backfill():
    print("\n🚀 Starting full article backfill (species + persons + WPA)...\n")

    init_database()
    llm_ok = check_llm_status()

    if llm_ok:
        print("🤖 LLM is ACTIVE — hybrid extraction (rules + NER + LLM) will be used.\n")
    else:
        print("📋 LLM is NOT active — rule-based + NER extraction only.\n")
        print("   To enable LLM, set these environment variables:")
        print("     LLM_SUMMARY_ENABLED=true")
        print("     LLM_SUMMARY_MODEL_PATH=/app/data/models/Phi-3-mini-4k-instruct-q4.gguf\n")

    engine = HybridIntelligenceEngine()
    db = SessionLocal()

    try:
        items = db.query(NewsItem).order_by(NewsItem.id.asc()).all()
        total = len(items)
        print(f"📊 Found {total} articles to process.\n")

        updated = 0
        errors = 0
        start_time = time.time()

        for idx, item in enumerate(items, 1):
            try:
                # Build full text from all available fields
                base_summary = item.summary or ""
                full_content = "\n".join(
                    part.strip()
                    for part in [
                        item.title or "",
                        base_summary,
                        item.intel_summary or "",
                        item.confidence_explanation or "",
                    ]
                    if part and part.strip()
                )

                # Run full analysis
                intel = engine.analyze(
                    title=item.title or "",
                    summary=base_summary,
                    full_content=full_content or base_summary,
                    source=item.source or "",
                )

                # Extract text representations
                species_text = (
                    ", ".join(intel.species)
                    if isinstance(intel.species, list)
                    else str(intel.species or "")
                )
                persons_text = (
                    ", ".join(intel.involved_persons)
                    if isinstance(intel.involved_persons, list)
                    else str(intel.involved_persons or "")
                )

                old_species = item.species or ""
                old_persons = item.involved_persons or ""

                # Update ALL fields
                item.ai_score = float(intel.confidence)
                item.ai_reason = str(intel.reason or "")[:300]
                item.is_poaching = bool(intel.is_poaching)
                item.is_india = bool(intel.is_india)
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
                item.wpa_schedule = str(getattr(intel, "wpa_schedule", "") or "")[:30]
                item.wpa_section = str(getattr(intel, "wpa_section", "") or "")[:100]
                item.wpa_offence_type = str(getattr(intel, "wpa_offence_type", "") or "")[:80]
                item.wpa_penalty_class = str(getattr(intel, "wpa_penalty_class", "") or "")[:30]
                item.protected_area_type = str(getattr(intel, "protected_area_type", "") or "")[:60]
                item.enforcement_authority = str(getattr(intel, "enforcement_authority", "") or "")[:120]

                # Upsert the report
                try:
                    upsert_report_for_news(db, item)
                except Exception:
                    pass

                db.commit()
                updated += 1

                # Print progress with change highlights
                species_changed = old_species.strip() != species_text.strip()
                persons_changed = old_persons.strip() != persons_text.strip()
                markers = []
                if species_changed:
                    markers.append(f"species: '{old_species[:40]}' → '{species_text[:40]}'")
                if persons_changed:
                    markers.append(f"persons: '{old_persons[:40]}' → '{persons_text[:40]}'")

                change_str = " | ".join(markers) if markers else "no change"
                print(f"  [{idx}/{total}] ID={item.id} ✅ {change_str}")

            except Exception as err:
                errors += 1
                print(f"  [{idx}/{total}] ID={item.id} ❌ Error: {err}")
                try:
                    db.rollback()
                except Exception:
                    pass

        elapsed = time.time() - start_time
        print(f"\n{'='*60}")
        print(f"✅ Backfill complete in {elapsed:.1f}s")
        print(f"   Updated: {updated}/{total}")
        print(f"   Errors:  {errors}")
        print(f"{'='*60}\n")

    finally:
        db.close()


if __name__ == "__main__":
    run_backfill()
