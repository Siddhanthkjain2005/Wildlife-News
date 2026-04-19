from __future__ import annotations

import sqlite3
from datetime import datetime
from pathlib import Path
from shutil import copy2


def sqlite_path_from_url(database_url: str) -> Path | None:
    if not database_url.startswith("sqlite:///"):
        return None
    raw = database_url.replace("sqlite:///", "", 1)
    return Path(raw).resolve()


def sqlite_integrity_check(db_path: Path) -> dict[str, object]:
    if not db_path.exists():
        return {"ok": False, "error": f"Database file missing: {db_path}"}
    try:
        with sqlite3.connect(str(db_path)) as conn:
            cursor = conn.execute("PRAGMA integrity_check;")
            result = cursor.fetchone()
            value = str(result[0]) if result else "unknown"
            return {"ok": value.lower() == "ok", "result": value}
    except sqlite3.Error as err:
        return {"ok": False, "error": str(err)}


def create_sqlite_backup(db_path: Path, backups_dir: Path) -> Path:
    backups_dir.mkdir(parents=True, exist_ok=True)
    stamp = datetime.utcnow().strftime("%Y%m%dT%H%M%SZ")
    backup_path = backups_dir / f"news-backup-{stamp}.db"
    copy2(db_path, backup_path)
    return backup_path


def create_snapshot_export(db_path: Path, backups_dir: Path) -> Path:
    backups_dir.mkdir(parents=True, exist_ok=True)
    stamp = datetime.utcnow().strftime("%Y%m%dT%H%M%SZ")
    snapshot = backups_dir / f"news-snapshot-{stamp}.sql"
    with sqlite3.connect(str(db_path)) as conn:
        with snapshot.open("w", encoding="utf-8") as handle:
            for line in conn.iterdump():
                handle.write(f"{line}\n")
    return snapshot
