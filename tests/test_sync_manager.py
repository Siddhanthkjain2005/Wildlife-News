from unittest.mock import patch

from app.workers.sync_manager import SyncStateStore


def test_long_crawl_with_progress_remains_running():
    with patch("app.workers.sync_manager.monotonic", return_value=0) as clock:
        store = SyncStateStore()
        assert store.start("test")
        clock.return_value = 590
        store.update_progress({"scanned": 17}, "Analyzing")
        clock.return_value = 603
        assert store.snapshot()["running"] is True
        assert store.snapshot()["error"] == ""
        assert store.start("overlapping") is False


def test_inactive_crawl_still_times_out():
    with patch("app.workers.sync_manager.monotonic", return_value=0) as clock:
        store = SyncStateStore()
        store.start("test")
        clock.return_value = 601
        assert store.snapshot()["running"] is False
        assert "stale_timeout" in store.snapshot()["error"]
        assert store.start("retry") is True
        assert store.snapshot()["error"] == ""


def test_incident_refreshes_activity():
    with patch("app.workers.sync_manager.monotonic", return_value=0) as clock:
        store = SyncStateStore()
        store.start("test")
        clock.return_value = 590
        store.append_incident({"id": 1})
        clock.return_value = 603
        assert store.snapshot()["running"] is True
