import os
import sys

sys.path.append(os.getcwd())

from app.core.database import SessionLocal, init_database
from app.services.maintenance import run_deep_maintenance


def main() -> None:
    print("🚀 Running strict deep maintenance (full historical AI reanalysis)...")
    init_database()
    db = SessionLocal()
    try:
        result = run_deep_maintenance(db)
        if result.get("ok"):
            print(
                "✅ Completed. "
                f"scanned={result.get('scanned', 0)}, updated={result.get('updated', 0)}, "
                f"deleted_non_india={result.get('deleted_non_india', 0)}, "
                f"deleted_non_poaching={result.get('deleted_non_poaching', 0)}"
            )
        else:
            print(f"❌ Failed: {result.get('error', 'unknown error')}")
    finally:
        db.close()


if __name__ == "__main__":
    main()
