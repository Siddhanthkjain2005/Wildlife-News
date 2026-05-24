from dataclasses import dataclass
from datetime import timezone, datetime
from threading import Lock

import logging

logger = logging.getLogger("app.sync_manager")

# Maximum time (seconds) a sync is allowed to stay "running" before the lock
# is automatically released.  Prevents permanent deadlock if a sync crashes
# without calling finish()/fail().
MAX_SYNC_RUNNING_SECONDS: int = 600  # 10 minutes


@dataclass
class SyncRuntimeState:
    running: bool = False
    trigger: str = ""
    message: str = ""
    started_at: str | None = None
    finished_at: str | None = None
    duration_seconds: float | None = None
    error: str = ""
    stats: dict[str, object] | None = None
    progress: dict[str, object] | None = None
    last_search: dict[str, object] | None = None
    recent_incidents: list[dict[str, object]] | None = None


class SyncStateStore:
    def __init__(self) -> None:
        self._lock = Lock()
        self._state = SyncRuntimeState(stats={}, progress={}, last_search={}, recent_incidents=[])

    def _is_stale_locked(self) -> bool:
        """Check if the current 'running' state is stale (exceeded timeout).
        Must be called while holding self._lock."""
        if not self._state.running:
            return False
        started_raw = self._state.started_at
        if not started_raw:
            return True  # running but no start time => definitely stale
        try:
            started_dt = datetime.fromisoformat(started_raw)
            if started_dt.tzinfo is None:
                started_dt = started_dt.replace(tzinfo=timezone.utc)
            elapsed = (datetime.now(tz=timezone.utc) - started_dt).total_seconds()
            return elapsed > MAX_SYNC_RUNNING_SECONDS
        except (ValueError, TypeError):
            return True

    def _force_reset_locked(self, reason: str = "stale_timeout") -> None:
        """Reset the running state. Must be called while holding self._lock."""
        logger.warning(
            "Force-resetting stale sync lock (reason=%s, started_at=%s, trigger=%s)",
            reason,
            self._state.started_at,
            self._state.trigger,
        )
        self._state.running = False
        self._state.finished_at = datetime.now(tz=timezone.utc).isoformat()
        self._state.error = f"Auto-reset: {reason}"
        self._state.message = f"Previous sync was force-reset ({reason})"

    def force_reset(self, reason: str = "manual") -> bool:
        """Externally force-reset the sync lock. Returns True if it was running."""
        with self._lock:
            was_running = self._state.running
            if was_running:
                self._force_reset_locked(reason=reason)
            return was_running

    def snapshot(self) -> dict[str, object]:
        with self._lock:
            # Auto-heal stale locks on read
            if self._is_stale_locked():
                self._force_reset_locked(reason="stale_timeout_on_snapshot")
            return {
                "running": self._state.running,
                "trigger": self._state.trigger,
                "message": self._state.message,
                "started_at": self._state.started_at,
                "finished_at": self._state.finished_at,
                "duration_seconds": self._state.duration_seconds,
                "error": self._state.error,
                "stats": dict(self._state.stats or {}),
                "progress": dict(self._state.progress or {}),
                "last_search": dict(self._state.last_search or {}),
                "recent_incidents": list(self._state.recent_incidents or []),
            }

    def start(self, trigger: str) -> bool:
        with self._lock:
            if self._state.running:
                # Check if the existing "running" state is stale
                if self._is_stale_locked():
                    self._force_reset_locked(reason="stale_timeout_on_start")
                else:
                    return False
            self._state.running = True
            self._state.trigger = trigger
            self._state.message = "Sync started. Searching providers..."
            self._state.started_at = datetime.now(tz=timezone.utc).isoformat()
            self._state.finished_at = None
            self._state.duration_seconds = None
            self._state.error = ""
            self._state.stats = {"live_events_written": 0}
            self._state.progress = {}
            if self._state.last_search is None:
                self._state.last_search = {}
            self._state.recent_incidents = []
            return True

    def update_progress(self, payload: dict[str, object], message: str) -> None:
        with self._lock:
            if not self._state.running:
                return
            self._state.progress = payload
            self._state.message = message
            provider = str(payload.get("provider", "")).strip()
            language = str(payload.get("language", "")).strip()
            query = str(payload.get("query", "")).strip()
            if (
                (provider and provider != "-")
                or (language and language != "-")
                or (query and query != "-")
            ):
                self._state.last_search = {
                    "stage": str(payload.get("stage", "")).strip(),
                    "provider": provider,
                    "language": language,
                    "query": query,
                    "scanned": int(payload.get("scanned", 0) or 0),
                    "kept": int(payload.get("kept", 0) or 0),
                    "updated_at": datetime.now(tz=timezone.utc).isoformat(),
                }

    def append_incident(self, incident: dict[str, object]) -> None:
        with self._lock:
            if not self._state.running:
                return
            incidents = self._state.recent_incidents or []
            incidents.insert(0, incident)
            if len(incidents) > 120:
                del incidents[120:]
            self._state.recent_incidents = incidents

    def increment_live_excel_count(self) -> None:
        with self._lock:
            stats = self._state.stats or {}
            stats["live_events_written"] = int(stats.get("live_events_written", 0)) + 1
            self._state.stats = stats

    def finish(self, *, trigger: str, duration_seconds: float, stats: dict[str, object], message: str) -> None:
        with self._lock:
            self._state.running = False
            self._state.trigger = trigger
            self._state.finished_at = datetime.now(tz=timezone.utc).isoformat()
            self._state.duration_seconds = round(duration_seconds, 2)
            self._state.error = ""
            self._state.stats = stats
            self._state.message = message

    def fail(self, *, trigger: str, duration_seconds: float, error: str) -> None:
        with self._lock:
            self._state.running = False
            self._state.trigger = trigger
            self._state.finished_at = datetime.now(tz=timezone.utc).isoformat()
            self._state.duration_seconds = round(duration_seconds, 2)
            self._state.error = error
            self._state.message = error
