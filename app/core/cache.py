from __future__ import annotations

import time
from dataclasses import dataclass
from threading import Lock
from typing import Callable, TypeVar

T = TypeVar("T")


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
                "entries": len(self._data),
                "hits": self._hits,
                "misses": self._misses,
                "ttl_seconds": self.ttl_seconds,
            }
