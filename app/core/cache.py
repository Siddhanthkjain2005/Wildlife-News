from __future__ import annotations

import json
import time
from dataclasses import dataclass
from threading import Lock
from typing import Callable, Protocol, TypeVar

from app.core.logger import get_logger

T = TypeVar("T")
logger = get_logger("app.cache")


class CacheBackend(Protocol):
    ttl_seconds: int

    def get(self, key: str) -> object | None:
        ...

    def set(self, key: str, value: object, ttl_seconds: int | None = None) -> None:
        ...

    def get_or_set(self, key: str, producer: Callable[[], T], ttl_seconds: int | None = None) -> T:
        ...

    def clear(self) -> None:
        ...

    def snapshot(self) -> dict[str, object]:
        ...


@dataclass
class _CacheItem:
    expires_at: float
    value: object


class TTLCache:
    def __init__(self, ttl_seconds: int) -> None:
        self.ttl_seconds = max(5, ttl_seconds)
        self._data: dict[str, _CacheItem] = {}
        self._lock = Lock()
        self._hits = 0
        self._misses = 0

    def get(self, key: str) -> object | None:
        now = time.time()
        with self._lock:
            item = self._data.get(key)
            if item is None:
                self._misses += 1
                return None
            if item.expires_at <= now:
                self._data.pop(key, None)
                self._misses += 1
                return None
            self._hits += 1
            return item.value

    def set(self, key: str, value: object, ttl_seconds: int | None = None) -> None:
        ttl = max(1, ttl_seconds if ttl_seconds is not None else self.ttl_seconds)
        with self._lock:
            self._data[key] = _CacheItem(expires_at=time.time() + ttl, value=value)

    def get_or_set(self, key: str, producer: Callable[[], T], ttl_seconds: int | None = None) -> T:
        value = self.get(key)
        if value is not None:
            return value
        produced = producer()
        self.set(key, produced, ttl_seconds=ttl_seconds)
        return produced

    def clear(self) -> None:
        with self._lock:
            self._data.clear()

    def snapshot(self) -> dict[str, int]:
        with self._lock:
            return {
                "backend": "memory",
                "entries": len(self._data),
                "hits": self._hits,
                "misses": self._misses,
                "ttl_seconds": self.ttl_seconds,
            }


class RedisTTLCache:
    def __init__(self, *, redis_url: str, ttl_seconds: int, key_prefix: str = "wildlife") -> None:
        import redis

        self.ttl_seconds = max(5, ttl_seconds)
        self._prefix = (key_prefix or "wildlife").strip()
        self._hits = 0
        self._misses = 0
        self._lock = Lock()
        self._client = redis.Redis.from_url(redis_url, decode_responses=True)
        self._client.ping()

    def _full_key(self, key: str) -> str:
        return f"{self._prefix}:cache:{key}"

    def get(self, key: str) -> object | None:
        payload = self._client.get(self._full_key(key))
        if payload is None:
            with self._lock:
                self._misses += 1
            return None
        try:
            value = json.loads(payload)
        except json.JSONDecodeError:
            with self._lock:
                self._misses += 1
            return None
        with self._lock:
            self._hits += 1
        return value

    def set(self, key: str, value: object, ttl_seconds: int | None = None) -> None:
        ttl = max(1, ttl_seconds if ttl_seconds is not None else self.ttl_seconds)
        payload = json.dumps(value, ensure_ascii=False, default=str)
        self._client.setex(self._full_key(key), ttl, payload)

    def get_or_set(self, key: str, producer: Callable[[], T], ttl_seconds: int | None = None) -> T:
        value = self.get(key)
        if value is not None:
            return value
        produced = producer()
        self.set(key, produced, ttl_seconds=ttl_seconds)
        return produced

    def clear(self) -> None:
        pattern = f"{self._prefix}:cache:*"
        keys = list(self._client.scan_iter(match=pattern, count=200))
        if keys:
            self._client.delete(*keys)

    def snapshot(self) -> dict[str, object]:
        pattern = f"{self._prefix}:cache:*"
        entries = sum(1 for _ in self._client.scan_iter(match=pattern, count=200))
        with self._lock:
            return {
                "backend": "redis",
                "entries": entries,
                "hits": self._hits,
                "misses": self._misses,
                "ttl_seconds": self.ttl_seconds,
                "prefix": self._prefix,
            }


def build_cache(ttl_seconds: int, redis_url: str = "", key_prefix: str = "wildlife") -> CacheBackend:
    value = (redis_url or "").strip()
    if not value:
        return TTLCache(ttl_seconds)
    try:
        return RedisTTLCache(redis_url=value, ttl_seconds=ttl_seconds, key_prefix=key_prefix)
    except Exception as err:  # noqa: BLE001
        logger.warning("Redis cache unavailable; falling back to in-memory cache: %s", err)
        return TTLCache(ttl_seconds)
