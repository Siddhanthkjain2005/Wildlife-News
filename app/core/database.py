from collections.abc import Generator

from sqlalchemy import create_engine, event, text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.core.config import settings
from app.core.logger import get_logger

logger = get_logger("app.database")


class Base(DeclarativeBase):
    pass


is_sqlite = settings.database_url.startswith("sqlite")
sqlite_connect_args = {"check_same_thread": False, "timeout": 30} if is_sqlite else {}
engine = create_engine(
    settings.database_url,
    connect_args=sqlite_connect_args,
    pool_pre_ping=True,
)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False, future=True)

if is_sqlite:

    @event.listens_for(engine, "connect")
    def _set_sqlite_pragmas(dbapi_connection, _connection_record) -> None:  # noqa: ANN001
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA journal_mode=WAL")
        cursor.execute("PRAGMA synchronous=NORMAL")
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.execute("PRAGMA busy_timeout=30000")
        cursor.close()


def get_db() -> Generator[Session]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def _existing_columns(table_name: str) -> set[str]:
    with engine.begin() as conn:
        if engine.dialect.name == "sqlite":
            rows = conn.execute(text(f"PRAGMA table_info({table_name})")).fetchall()
            return {str(row[1]) for row in rows}
        rows = conn.execute(
            text(
                "SELECT column_name FROM information_schema.columns "
                "WHERE table_name = :table_name"
            ),
            {"table_name": table_name},
        ).fetchall()
        return {str(row[0]) for row in rows}


def _ensure_news_items_schema() -> None:
    required_sqlite_columns: dict[str, str] = {
        "is_india": "ALTER TABLE news_items ADD COLUMN is_india BOOLEAN NOT NULL DEFAULT 1",
        "confidence": "ALTER TABLE news_items ADD COLUMN confidence FLOAT NOT NULL DEFAULT 0.0",
        "risk_score": "ALTER TABLE news_items ADD COLUMN risk_score INTEGER NOT NULL DEFAULT 0",
        "crime_type": "ALTER TABLE news_items ADD COLUMN crime_type VARCHAR(80) NOT NULL DEFAULT 'unknown'",
        "species": "ALTER TABLE news_items ADD COLUMN species VARCHAR(300) NOT NULL DEFAULT ''",
        "state": "ALTER TABLE news_items ADD COLUMN state VARCHAR(120) NOT NULL DEFAULT ''",
        "district": "ALTER TABLE news_items ADD COLUMN district VARCHAR(120) NOT NULL DEFAULT ''",
        "location": "ALTER TABLE news_items ADD COLUMN location VARCHAR(240) NOT NULL DEFAULT ''",
        "network_indicator": "ALTER TABLE news_items ADD COLUMN network_indicator BOOLEAN NOT NULL DEFAULT 0",
        "repeat_indicator": "ALTER TABLE news_items ADD COLUMN repeat_indicator BOOLEAN NOT NULL DEFAULT 0",
        "intel_summary": "ALTER TABLE news_items ADD COLUMN intel_summary VARCHAR(500) NOT NULL DEFAULT ''",
        "intel_points": "ALTER TABLE news_items ADD COLUMN intel_points TEXT NOT NULL DEFAULT '[]'",
        "likely_smuggling_route": "ALTER TABLE news_items ADD COLUMN likely_smuggling_route VARCHAR(500) NOT NULL DEFAULT ''",
        "enforcement_recommendation": "ALTER TABLE news_items ADD COLUMN enforcement_recommendation VARCHAR(500) NOT NULL DEFAULT ''",
        "confidence_explanation": "ALTER TABLE news_items ADD COLUMN confidence_explanation VARCHAR(500) NOT NULL DEFAULT ''",
        "url_hash": "ALTER TABLE news_items ADD COLUMN url_hash VARCHAR(64) NOT NULL DEFAULT ''",
        "duplicate_confidence": "ALTER TABLE news_items ADD COLUMN duplicate_confidence FLOAT NOT NULL DEFAULT 0.0",
        "source_count": "ALTER TABLE news_items ADD COLUMN source_count INTEGER NOT NULL DEFAULT 1",
        "report_count": "ALTER TABLE news_items ADD COLUMN report_count INTEGER NOT NULL DEFAULT 1",
        "merged_sources": "ALTER TABLE news_items ADD COLUMN merged_sources TEXT NOT NULL DEFAULT ''",
    }

    required_postgres_columns: dict[str, str] = {
        "is_india": "ALTER TABLE news_items ADD COLUMN IF NOT EXISTS is_india BOOLEAN NOT NULL DEFAULT TRUE",
        "confidence": "ALTER TABLE news_items ADD COLUMN IF NOT EXISTS confidence DOUBLE PRECISION NOT NULL DEFAULT 0.0",
        "risk_score": "ALTER TABLE news_items ADD COLUMN IF NOT EXISTS risk_score INTEGER NOT NULL DEFAULT 0",
        "crime_type": "ALTER TABLE news_items ADD COLUMN IF NOT EXISTS crime_type VARCHAR(80) NOT NULL DEFAULT 'unknown'",
        "species": "ALTER TABLE news_items ADD COLUMN IF NOT EXISTS species VARCHAR(300) NOT NULL DEFAULT ''",
        "state": "ALTER TABLE news_items ADD COLUMN IF NOT EXISTS state VARCHAR(120) NOT NULL DEFAULT ''",
        "district": "ALTER TABLE news_items ADD COLUMN IF NOT EXISTS district VARCHAR(120) NOT NULL DEFAULT ''",
        "location": "ALTER TABLE news_items ADD COLUMN IF NOT EXISTS location VARCHAR(240) NOT NULL DEFAULT ''",
        "network_indicator": "ALTER TABLE news_items ADD COLUMN IF NOT EXISTS network_indicator BOOLEAN NOT NULL DEFAULT FALSE",
        "repeat_indicator": "ALTER TABLE news_items ADD COLUMN IF NOT EXISTS repeat_indicator BOOLEAN NOT NULL DEFAULT FALSE",
        "intel_summary": "ALTER TABLE news_items ADD COLUMN IF NOT EXISTS intel_summary VARCHAR(500) NOT NULL DEFAULT ''",
        "intel_points": "ALTER TABLE news_items ADD COLUMN IF NOT EXISTS intel_points TEXT NOT NULL DEFAULT '[]'",
        "likely_smuggling_route": "ALTER TABLE news_items ADD COLUMN IF NOT EXISTS likely_smuggling_route VARCHAR(500) NOT NULL DEFAULT ''",
        "enforcement_recommendation": "ALTER TABLE news_items ADD COLUMN IF NOT EXISTS enforcement_recommendation VARCHAR(500) NOT NULL DEFAULT ''",
        "confidence_explanation": "ALTER TABLE news_items ADD COLUMN IF NOT EXISTS confidence_explanation VARCHAR(500) NOT NULL DEFAULT ''",
        "url_hash": "ALTER TABLE news_items ADD COLUMN IF NOT EXISTS url_hash VARCHAR(64) NOT NULL DEFAULT ''",
        "duplicate_confidence": "ALTER TABLE news_items ADD COLUMN IF NOT EXISTS duplicate_confidence DOUBLE PRECISION NOT NULL DEFAULT 0.0",
        "source_count": "ALTER TABLE news_items ADD COLUMN IF NOT EXISTS source_count INTEGER NOT NULL DEFAULT 1",
        "report_count": "ALTER TABLE news_items ADD COLUMN IF NOT EXISTS report_count INTEGER NOT NULL DEFAULT 1",
        "merged_sources": "ALTER TABLE news_items ADD COLUMN IF NOT EXISTS merged_sources TEXT NOT NULL DEFAULT ''",
    }

    existing = _existing_columns("news_items")
    column_ddl = required_sqlite_columns if engine.dialect.name == "sqlite" else required_postgres_columns
    if set(column_ddl.keys()).issubset(existing):
        return

    with engine.begin() as conn:
        for column_name, ddl in column_ddl.items():
            if engine.dialect.name == "sqlite" and column_name in existing:
                continue
            conn.execute(text(ddl))

        if engine.dialect.name == "sqlite":
            conn.execute(text("CREATE INDEX IF NOT EXISTS ix_news_items_risk_score ON news_items (risk_score)"))
            conn.execute(text("CREATE INDEX IF NOT EXISTS ix_news_items_state ON news_items (state)"))
            conn.execute(text("CREATE INDEX IF NOT EXISTS ix_news_items_district ON news_items (district)"))
            conn.execute(text("CREATE INDEX IF NOT EXISTS ix_news_items_crime_type ON news_items (crime_type)"))
            conn.execute(text("CREATE INDEX IF NOT EXISTS ix_news_items_url_hash ON news_items (url_hash)"))
            conn.execute(text("CREATE INDEX IF NOT EXISTS ix_news_items_duplicate_confidence ON news_items (duplicate_confidence)"))
        else:
            conn.execute(text("CREATE INDEX IF NOT EXISTS ix_news_items_risk_score ON news_items (risk_score)"))
            conn.execute(text("CREATE INDEX IF NOT EXISTS ix_news_items_state ON news_items (state)"))
            conn.execute(text("CREATE INDEX IF NOT EXISTS ix_news_items_district ON news_items (district)"))
            conn.execute(text("CREATE INDEX IF NOT EXISTS ix_news_items_crime_type ON news_items (crime_type)"))
            conn.execute(text("CREATE INDEX IF NOT EXISTS ix_news_items_url_hash ON news_items (url_hash)"))
            conn.execute(text("CREATE INDEX IF NOT EXISTS ix_news_items_duplicate_confidence ON news_items (duplicate_confidence)"))

        # Backfill for legacy rows to preserve existing behavior.
        conn.execute(text("UPDATE news_items SET confidence = ai_score WHERE confidence = 0 AND ai_score > 0"))
        conn.execute(text("UPDATE news_items SET risk_score = CAST(ROUND(confidence * 100) AS INTEGER) WHERE risk_score = 0 AND confidence > 0"))
        conn.execute(text("UPDATE news_items SET intel_summary = title WHERE intel_summary = ''"))
        conn.execute(text("UPDATE news_items SET likely_smuggling_route = 'Potential interstate movement route not yet clear.' WHERE likely_smuggling_route = ''"))
        conn.execute(text("UPDATE news_items SET enforcement_recommendation = 'Review incident and deploy field verification.' WHERE enforcement_recommendation = ''"))
        conn.execute(text("UPDATE news_items SET confidence_explanation = ai_reason WHERE confidence_explanation = ''"))
        conn.execute(text("UPDATE news_items SET merged_sources = source WHERE merged_sources = ''"))
        conn.execute(text("UPDATE news_items SET source_count = 1 WHERE source_count < 1"))
        conn.execute(text("UPDATE news_items SET report_count = 1 WHERE report_count < 1"))


def _ensure_reports_schema() -> None:
    required_sqlite_columns: dict[str, str] = {
        "news_id": "ALTER TABLE reports ADD COLUMN news_id INTEGER NOT NULL DEFAULT 0",
        "summary": "ALTER TABLE reports ADD COLUMN summary VARCHAR(500) NOT NULL DEFAULT ''",
        "intel_points": "ALTER TABLE reports ADD COLUMN intel_points TEXT NOT NULL DEFAULT '[]'",
        "recommendation": "ALTER TABLE reports ADD COLUMN recommendation VARCHAR(500) NOT NULL DEFAULT ''",
        "route_hypothesis": "ALTER TABLE reports ADD COLUMN route_hypothesis VARCHAR(500) NOT NULL DEFAULT ''",
        "confidence_reason": "ALTER TABLE reports ADD COLUMN confidence_reason VARCHAR(500) NOT NULL DEFAULT ''",
        "generated_at": "ALTER TABLE reports ADD COLUMN generated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP",
    }
    required_postgres_columns: dict[str, str] = {
        "news_id": "ALTER TABLE reports ADD COLUMN IF NOT EXISTS news_id INTEGER NOT NULL DEFAULT 0",
        "summary": "ALTER TABLE reports ADD COLUMN IF NOT EXISTS summary VARCHAR(500) NOT NULL DEFAULT ''",
        "intel_points": "ALTER TABLE reports ADD COLUMN IF NOT EXISTS intel_points TEXT NOT NULL DEFAULT '[]'",
        "recommendation": "ALTER TABLE reports ADD COLUMN IF NOT EXISTS recommendation VARCHAR(500) NOT NULL DEFAULT ''",
        "route_hypothesis": "ALTER TABLE reports ADD COLUMN IF NOT EXISTS route_hypothesis VARCHAR(500) NOT NULL DEFAULT ''",
        "confidence_reason": "ALTER TABLE reports ADD COLUMN IF NOT EXISTS confidence_reason VARCHAR(500) NOT NULL DEFAULT ''",
        "generated_at": "ALTER TABLE reports ADD COLUMN IF NOT EXISTS generated_at TIMESTAMP NOT NULL DEFAULT NOW()",
    }

    existing = _existing_columns("reports")
    required_columns = set(required_sqlite_columns.keys()) if engine.dialect.name == "sqlite" else set(required_postgres_columns.keys())
    if existing and required_columns.issubset(existing):
        return
    with engine.begin() as conn:
        if not existing:
            if engine.dialect.name == "sqlite":
                conn.execute(
                    text(
                        "CREATE TABLE IF NOT EXISTS reports ("
                        "id INTEGER PRIMARY KEY AUTOINCREMENT, "
                        "news_id INTEGER NOT NULL, "
                        "summary VARCHAR(500) NOT NULL DEFAULT '', "
                        "intel_points TEXT NOT NULL DEFAULT '[]', "
                        "recommendation VARCHAR(500) NOT NULL DEFAULT '', "
                        "route_hypothesis VARCHAR(500) NOT NULL DEFAULT '', "
                        "confidence_reason VARCHAR(500) NOT NULL DEFAULT '', "
                        "generated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "
                        "FOREIGN KEY(news_id) REFERENCES news_items (id)"
                        ")"
                    )
                )
            else:
                conn.execute(
                    text(
                        "CREATE TABLE IF NOT EXISTS reports ("
                        "id SERIAL PRIMARY KEY, "
                        "news_id INTEGER NOT NULL REFERENCES news_items(id), "
                        "summary VARCHAR(500) NOT NULL DEFAULT '', "
                        "intel_points TEXT NOT NULL DEFAULT '[]', "
                        "recommendation VARCHAR(500) NOT NULL DEFAULT '', "
                        "route_hypothesis VARCHAR(500) NOT NULL DEFAULT '', "
                        "confidence_reason VARCHAR(500) NOT NULL DEFAULT '', "
                        "generated_at TIMESTAMP NOT NULL DEFAULT NOW()"
                        ")"
                    )
                )
            existing = _existing_columns("reports")

        column_ddl = required_sqlite_columns if engine.dialect.name == "sqlite" else required_postgres_columns
        for column_name, ddl in column_ddl.items():
            if engine.dialect.name == "sqlite" and column_name in existing:
                continue
            conn.execute(text(ddl))
        conn.execute(text("CREATE INDEX IF NOT EXISTS ix_reports_generated_at ON reports (generated_at)"))
        conn.execute(text("CREATE INDEX IF NOT EXISTS ix_reports_news_id ON reports (news_id)"))


def _ensure_audit_logs_schema() -> None:
    required_sqlite_columns: dict[str, str] = {
        "timestamp": "ALTER TABLE audit_logs ADD COLUMN timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP",
        "actor": "ALTER TABLE audit_logs ADD COLUMN actor VARCHAR(120) NOT NULL DEFAULT 'system'",
        "action": "ALTER TABLE audit_logs ADD COLUMN action VARCHAR(120) NOT NULL DEFAULT 'unknown'",
        "status": "ALTER TABLE audit_logs ADD COLUMN status VARCHAR(24) NOT NULL DEFAULT 'ok'",
        "ip": "ALTER TABLE audit_logs ADD COLUMN ip VARCHAR(64) NOT NULL DEFAULT ''",
        "notes": "ALTER TABLE audit_logs ADD COLUMN notes TEXT NOT NULL DEFAULT ''",
    }
    required_postgres_columns: dict[str, str] = {
        "timestamp": "ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS timestamp TIMESTAMP NOT NULL DEFAULT NOW()",
        "actor": "ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS actor VARCHAR(120) NOT NULL DEFAULT 'system'",
        "action": "ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS action VARCHAR(120) NOT NULL DEFAULT 'unknown'",
        "status": "ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS status VARCHAR(24) NOT NULL DEFAULT 'ok'",
        "ip": "ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS ip VARCHAR(64) NOT NULL DEFAULT ''",
        "notes": "ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS notes TEXT NOT NULL DEFAULT ''",
    }
    existing = _existing_columns("audit_logs")
    required_columns = set(required_sqlite_columns.keys()) if engine.dialect.name == "sqlite" else set(required_postgres_columns.keys())
    if existing and required_columns.issubset(existing):
        return
    with engine.begin() as conn:
        if not existing:
            if engine.dialect.name == "sqlite":
                conn.execute(
                    text(
                        "CREATE TABLE IF NOT EXISTS audit_logs ("
                        "id INTEGER PRIMARY KEY AUTOINCREMENT, "
                        "timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "
                        "actor VARCHAR(120) NOT NULL DEFAULT 'system', "
                        "action VARCHAR(120) NOT NULL DEFAULT 'unknown', "
                        "status VARCHAR(24) NOT NULL DEFAULT 'ok', "
                        "ip VARCHAR(64) NOT NULL DEFAULT '', "
                        "notes TEXT NOT NULL DEFAULT ''"
                        ")"
                    )
                )
            else:
                conn.execute(
                    text(
                        "CREATE TABLE IF NOT EXISTS audit_logs ("
                        "id SERIAL PRIMARY KEY, "
                        "timestamp TIMESTAMP NOT NULL DEFAULT NOW(), "
                        "actor VARCHAR(120) NOT NULL DEFAULT 'system', "
                        "action VARCHAR(120) NOT NULL DEFAULT 'unknown', "
                        "status VARCHAR(24) NOT NULL DEFAULT 'ok', "
                        "ip VARCHAR(64) NOT NULL DEFAULT '', "
                        "notes TEXT NOT NULL DEFAULT ''"
                        ")"
                    )
                )
            existing = _existing_columns("audit_logs")
        column_ddl = required_sqlite_columns if engine.dialect.name == "sqlite" else required_postgres_columns
        for column_name, ddl in column_ddl.items():
            if engine.dialect.name == "sqlite" and column_name in existing:
                continue
            conn.execute(text(ddl))
        conn.execute(text("CREATE INDEX IF NOT EXISTS ix_audit_logs_timestamp ON audit_logs (timestamp)"))
        conn.execute(text("CREATE INDEX IF NOT EXISTS ix_audit_logs_actor ON audit_logs (actor)"))
        conn.execute(text("CREATE INDEX IF NOT EXISTS ix_audit_logs_action ON audit_logs (action)"))


def init_database() -> None:
    from app import models as _models  # noqa: F401

    Base.metadata.create_all(bind=engine)
    try:
        _ensure_news_items_schema()
        _ensure_reports_schema()
        _ensure_audit_logs_schema()
    except SQLAlchemyError as err:
        if engine.dialect.name == "sqlite" and "database is locked" in str(err).lower():
            logger.warning("Schema compatibility checks skipped due to database lock; continuing startup.")
            return
        logger.error("Failed to ensure schema compatibility: %s", err)
        raise


def diagnose_database() -> dict[str, object]:
    try:
        with engine.begin() as conn:
            conn.execute(text("SELECT 1"))
        return {"ok": True, "dialect": engine.dialect.name}
    except SQLAlchemyError as err:
        return {"ok": False, "dialect": engine.dialect.name, "error": str(err)}
