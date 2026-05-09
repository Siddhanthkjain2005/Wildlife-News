from __future__ import annotations

import json
from typing import Protocol

from app.core.logger import get_logger

logger = get_logger("app.realtime")


class EventBus(Protocol):
    def publish(self, channel: str, payload: dict[str, object]) -> bool:
        ...

    def snapshot(self) -> dict[str, object]:
        ...


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
        return NoopEventBus()
    try:
        return RedisEventBus(redis_url=value, channel_prefix=channel_prefix)
    except Exception as err:  # noqa: BLE001
        logger.warning("Redis event bus unavailable; continuing without pub/sub: %s", err)
        return NoopEventBus()
