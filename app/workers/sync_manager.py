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
    last_search: dict[str, object] | None = None
    recent_incidents: list[dict[str, object]] | None = None


class SyncStateStore:
    def __init__(self) -> None:
        self._lock = Lock()
        self._state = SyncRuntimeState(stats={}, progress={}, last_search={}, recent_incidents=[])

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
                "last_search": dict(self._state.last_search or {}),
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
                    "updated_at": datetime.now(tz=UTC).isoformat(),
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
