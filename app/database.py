"""Compatibility shim for legacy imports."""

from app.core.database import Base, SessionLocal, diagnose_database, engine, get_db, init_database

__all__ = ["Base", "engine", "SessionLocal", "get_db", "init_database", "diagnose_database"]
