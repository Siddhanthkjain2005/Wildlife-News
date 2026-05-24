from __future__ import annotations

import asyncio
import json
from collections import defaultdict
from threading import Lock
from typing import Protocol

from app.core.logger import get_logger

logger = get_logger("app.realtime")


class EventBus(Protocol):
    def publish(self, channel: str, payload: dict[str, object]) -> bool:
        ...

    def snapshot(self) -> dict[str, object]:
        ...


class InMemoryEventBus:
    """Thread-safe in-memory pub/sub for when Redis is not available.

    WebSocket handlers call subscribe() to get an asyncio.Queue, then
    await items from it.  The sync-thread calls publish() which puts
    items into every subscriber queue in a thread-safe manner.
    """

    def __init__(self) -> None:
        self._lock = Lock()
        # channel -> list[asyncio.Queue]
        self._subscribers: dict[str, list[asyncio.Queue]] = defaultdict(list)

    def subscribe(self, channel: str) -> asyncio.Queue:
        q: asyncio.Queue = asyncio.Queue(maxsize=256)
        with self._lock:
            self._subscribers[channel].append(q)
        return q

    def unsubscribe(self, channel: str, q: asyncio.Queue) -> None:
        with self._lock:
            try:
                self._subscribers[channel].remove(q)
            except ValueError:
                pass

    def publish(self, channel: str, payload: dict[str, object]) -> bool:
        with self._lock:
            queues = list(self._subscribers.get(channel, []))
        if not queues:
            return False
        for q in queues:
            try:
                q.put_nowait(payload)
            except asyncio.QueueFull:
                # Drop oldest and retry
                try:
                    q.get_nowait()
                    q.put_nowait(payload)
                except Exception:
                    pass
        return True

    def snapshot(self) -> dict[str, object]:
        with self._lock:
            total = sum(len(v) for v in self._subscribers.values())
        return {"backend": "memory", "enabled": True, "subscribers": total}


class NoopEventBus:
    def publish(self, channel: str, payload: dict[str, object]) -> bool:
        return False

    def snapshot(self) -> dict[str, object]:
        return {"backend": "none", "enabled": False}


class RedisEventBus:
    def __init__(self, *, redis_url: str, channel_prefix: str = "wildlife") -> None:
        import redis

        self._prefix = (channel_prefix or "wildlife").strip()
        self._client = redis.Redis.from_url(redis_url, decode_responses=True)
        self._client.ping()

    def _topic(self, channel: str) -> str:
        value = channel.strip().lower() or "events"
        return f"{self._prefix}:{value}"

    def publish(self, channel: str, payload: dict[str, object]) -> bool:
        body = json.dumps(payload, ensure_ascii=False, default=str)
        published = self._client.publish(self._topic(channel), body)
        return bool(published)

    def snapshot(self) -> dict[str, object]:
        return {"backend": "redis", "enabled": True, "prefix": self._prefix}


def build_event_bus(redis_url: str = "", channel_prefix: str = "wildlife") -> EventBus:
    value = (redis_url or "").strip()
    if not value:
        logger.info("No Redis URL configured; using in-memory event bus for live updates")
        return InMemoryEventBus()
    try:
        return RedisEventBus(redis_url=value, channel_prefix=channel_prefix)
    except Exception as err:  # noqa: BLE001
        logger.warning("Redis event bus unavailable; falling back to in-memory event bus: %s", err)
        return InMemoryEventBus()

