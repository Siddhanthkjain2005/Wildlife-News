import sqlite3
from unittest.mock import MagicMock, patch

import pytest

from app.core.backup import create_sqlite_backup, create_snapshot_export
from app.core.database import _set_sqlite_pragmas


def test_azure_journal_uses_full_durability(tmp_path):
    with sqlite3.connect(tmp_path / 'test.db') as conn:
        with patch('app.core.database.settings.sqlite_journal_mode', 'DELETE'):
            _set_sqlite_pragmas(conn, None)
        assert conn.execute('PRAGMA journal_mode').fetchone() == ('delete',)
        assert conn.execute('PRAGMA synchronous').fetchone() == (2,)


def test_backup_preserves_rows_and_passes_integrity(tmp_path):
    database = tmp_path / 'source.db'
    with sqlite3.connect(database) as conn:
        conn.execute('CREATE TABLE sample(id INTEGER PRIMARY KEY, title TEXT)')
        conn.execute("INSERT INTO sample VALUES(1, 'Tiger report')")
    backup = create_sqlite_backup(database, tmp_path / 'backups')
    with sqlite3.connect(backup) as conn:
        assert conn.execute('PRAGMA integrity_check').fetchall() == [('ok',)]
        assert conn.execute('SELECT title FROM sample').fetchone() == ('Tiger report',)
    assert not list(backup.parent.glob('*.partial'))


def test_invalid_backup_is_never_published(tmp_path):
    source, dest = MagicMock(), MagicMock()
    source.__enter__.return_value = source
    dest.__enter__.return_value = dest
    dest.execute.return_value.fetchall.return_value = [('malformed',)]
    with patch('app.core.backup.sqlite3.connect', side_effect=[source, dest]):
        with pytest.raises(sqlite3.DatabaseError, match='integrity validation'):
            create_sqlite_backup(tmp_path / 'source.db', tmp_path / 'backups')
    assert not list((tmp_path / 'backups').glob('*'))


def test_failed_snapshot_leaves_no_misleading_export(tmp_path):
    conn = MagicMock()
    conn.__enter__.return_value = conn
    def broken_dump():
        yield 'BEGIN TRANSACTION;'
        raise sqlite3.DatabaseError('malformed')
    conn.iterdump.side_effect = broken_dump
    with patch('app.core.backup.sqlite3.connect', return_value=conn):
        with pytest.raises(sqlite3.DatabaseError, match='malformed'):
            create_snapshot_export(tmp_path / 'source.db', tmp_path / 'backups')
    assert not list((tmp_path / 'backups').glob('*'))
