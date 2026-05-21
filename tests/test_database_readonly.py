from unittest.mock import patch
import pytest
from sqlalchemy.exc import SQLAlchemyError
from app.core.database import init_database


def test_init_database_readonly_graceful() -> None:
    """Verify that a readonly sqlite database error is caught and handled gracefully."""
    with patch("app.core.database.is_sqlite", True), \
         patch("app.core.database.engine") as mock_engine, \
         patch("app.core.database.Base.metadata.create_all") as mock_create_all:
        
        mock_engine.dialect.name = "sqlite"
        mock_create_all.side_effect = SQLAlchemyError("sqlite3.OperationalError: attempt to write a readonly database")
        
        # This should execute and return without raising
        init_database()
        mock_create_all.assert_called_once()


def test_init_database_other_error_raises() -> None:
    """Verify that other, unrelated database errors are still raised normally."""
    with patch("app.core.database.is_sqlite", True), \
         patch("app.core.database.engine") as mock_engine, \
         patch("app.core.database.Base.metadata.create_all") as mock_create_all:
        
        mock_engine.dialect.name = "sqlite"
        mock_create_all.side_effect = SQLAlchemyError("some other database error")
        
        with pytest.raises(SQLAlchemyError, match="some other database error"):
            init_database()
        
        mock_create_all.assert_called_once()
