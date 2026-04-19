from dataclasses import dataclass
from datetime import UTC, datetime
from threading import Lock


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
    recent_incidents: list[dict[str, object]] | None = None


class SyncStateStore:
    def __init__(self) -> None:
        self._lock = Lock()
        self._state = SyncRuntimeState(stats={}, progress={}, recent_incidents=[])

    def snapshot(self) -> dict[str, object]:
        with self._lock:
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
                "recent_incidents": list(self._state.recent_incidents or []),
            }

    def start(self, trigger: str) -> bool:
        with self._lock:
            if self._state.running:
                return False
            self._state.running = True
            self._state.trigger = trigger
            self._state.message = "Sync started. Searching providers..."
            self._state.started_at = datetime.now(tz=UTC).isoformat()
            self._state.finished_at = None
            self._state.duration_seconds = None
            self._state.error = ""
            self._state.stats = {"live_events_written": 0}
            self._state.progress = {}
            self._state.recent_incidents = []
            return True

    def update_progress(self, payload: dict[str, object], message: str) -> None:
        with self._lock:
            if not self._state.running:
                return
            self._state.progress = payload
            self._state.message = message

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
            self._state.finished_at = datetime.now(tz=UTC).isoformat()
            self._state.duration_seconds = round(duration_seconds, 2)
            self._state.error = ""
            self._state.stats = stats
            self._state.message = message

    def fail(self, *, trigger: str, duration_seconds: float, error: str) -> None:
        with self._lock:
            self._state.running = False
            self._state.trigger = trigger
            self._state.finished_at = datetime.now(tz=UTC).isoformat()
            self._state.duration_seconds = round(duration_seconds, 2)
            self._state.error = error
            self._state.message = error
