from app.core.cache import build_cache


def test_build_cache_defaults_to_memory_backend() -> None:
    cache = build_cache(30, redis_url="")
    cache.set("alpha", {"ok": True})
    assert cache.get("alpha") == {"ok": True}
    snapshot = cache.snapshot()
    assert snapshot["backend"] == "memory"


def test_get_or_set_returns_cached_value() -> None:
    cache = build_cache(30, redis_url="")
    first = cache.get_or_set("k", lambda: {"v": 1})
    second = cache.get_or_set("k", lambda: {"v": 2})
    assert first == {"v": 1}
    assert second == {"v": 1}
