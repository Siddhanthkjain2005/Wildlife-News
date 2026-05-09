from __future__ import annotations

import os
from collections.abc import Iterable

from sqlalchemy import MetaData, Table, create_engine, insert, select, text

SQLITE_URL = os.getenv("SQLITE_DATABASE_URL", "sqlite:///./data/news.db")
POSTGRES_URL = os.getenv("POSTGRES_DATABASE_URL", "")
CHUNK_SIZE = int(os.getenv("MIGRATION_CHUNK_SIZE", "500"))


def _chunked(rows: Iterable[dict[str, object]], size: int) -> Iterable[list[dict[str, object]]]:
    batch: list[dict[str, object]] = []
    for row in rows:
        batch.append(row)
        if len(batch) >= size:
            yield batch
            batch = []
    if batch:
        yield batch


def main() -> None:
    if not POSTGRES_URL:
        raise SystemExit("Set POSTGRES_DATABASE_URL before running migration.")

    sqlite_engine = create_engine(SQLITE_URL)
    pg_engine = create_engine(POSTGRES_URL)

    sqlite_meta = MetaData()
    sqlite_meta.reflect(bind=sqlite_engine)

    pg_meta = MetaData()
    pg_meta.reflect(bind=pg_engine)

    with pg_engine.begin() as conn:
        conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))

    table_names = [name for name in sqlite_meta.tables.keys() if not name.startswith("sqlite_")]

    for table_name in table_names:
        if table_name not in pg_meta.tables:
            print(f"Skipping {table_name}: table does not exist in PostgreSQL")
            continue

        sqlite_table: Table = sqlite_meta.tables[table_name]
        pg_table: Table = pg_meta.tables[table_name]
        pg_columns = {col.name for col in pg_table.columns}

        print(f"Migrating {table_name}...")
        with sqlite_engine.connect() as sqlite_conn, pg_engine.begin() as pg_conn:
            rows = sqlite_conn.execute(select(sqlite_table)).mappings().all()
            if not rows:
                print(f"  {table_name}: no rows")
                continue

            safe_rows = [
                {key: value for key, value in row.items() if key in pg_columns}
                for row in rows
            ]
            for batch in _chunked(safe_rows, CHUNK_SIZE):
                pg_conn.execute(insert(pg_table), batch)
            print(f"  {table_name}: migrated {len(safe_rows)} rows")

    print("SQLite -> PostgreSQL migration completed.")


if __name__ == "__main__":
    main()
