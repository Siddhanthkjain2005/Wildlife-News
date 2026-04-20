from __future__ import annotations

import hashlib
import hmac
import secrets
import time
from collections import defaultdict, deque
from dataclasses import dataclass
from threading import Lock

from fastapi import Header, HTTPException, Request

from app.core.config import settings


@dataclass
class _AdminSession:
    token: str
    expires_at: float


@dataclass
class _CacheItem:
    expires_at: float


class AdminSessionStore:
    def __init__(self) -> None:
        self._sessions: dict[str, _AdminSession] = {}
        self._lock = Lock()
        self._next_cleanup_at = 0.0
        self._cleanup_interval_seconds = 60.0

    def _cleanup_expired_locked(self, now: float) -> None:
        if now < self._next_cleanup_at:
            return
        expired = [key for key, value in self._sessions.items() if value.expires_at <= now]
        for key in expired:
            self._sessions.pop(key, None)
        self._next_cleanup_at = now + self._cleanup_interval_seconds

    def create(self, username: str, password: str) -> str:
        if not authenticate_admin(username=username, password=password):
            raise HTTPException(status_code=401, detail="Invalid admin credentials.")
        token = secrets.token_urlsafe(32)
        now = time.time()
        expires_at = now + (max(5, settings.admin_session_minutes) * 60)
        with self._lock:
            self._cleanup_expired_locked(now)
            self._sessions[token] = _AdminSession(token=token, expires_at=expires_at)
        return token

    def validate(self, token: str) -> bool:
        now = time.time()
        with self._lock:
            self._cleanup_expired_locked(now)
            session = self._sessions.get(token)
            if session is None:
                return False
            if session.expires_at <= now:
                self._sessions.pop(token, None)
                return False
            return True

    def destroy(self, token: str) -> None:
        with self._lock:
            self._sessions.pop(token, None)


class RateLimiter:
    def __init__(self, requests_per_minute: int) -> None:
        self.requests_per_minute = max(10, requests_per_minute)
        self._history: dict[str, deque[float]] = defaultdict(deque)
        self._lock = Lock()

    def is_allowed(self, key: str) -> bool:
        now = time.time()
        window_start = now - 60.0
        with self._lock:
            bucket = self._history[key]
            while bucket and bucket[0] < window_start:
                bucket.popleft()
            if len(bucket) >= self.requests_per_minute:
                return False
            bucket.append(now)
            return True


class SuccessfulLoginCache:
    def __init__(self, ttl_seconds: int = 900) -> None:
        self._ttl_seconds = max(30, int(ttl_seconds))
        self._items: dict[str, _CacheItem] = {}
        self._lock = Lock()
        self._next_cleanup_at = 0.0
        self._cleanup_interval_seconds = 30.0

    def _cleanup_locked(self, now: float) -> None:
        if now < self._next_cleanup_at:
            return
        expired = [key for key, item in self._items.items() if item.expires_at <= now]
        for key in expired:
            self._items.pop(key, None)
        self._next_cleanup_at = now + self._cleanup_interval_seconds

    def is_valid(self, key: str) -> bool:
        now = time.time()
        with self._lock:
            self._cleanup_locked(now)
            item = self._items.get(key)
            if item is None:
                return False
            if item.expires_at <= now:
                self._items.pop(key, None)
                return False
            return True

    def remember(self, key: str) -> None:
        now = time.time()
        with self._lock:
            self._cleanup_locked(now)
            self._items[key] = _CacheItem(expires_at=now + self._ttl_seconds)


admin_sessions = AdminSessionStore()
successful_login_cache = SuccessfulLoginCache()


def build_password_hash(password: str, *, iterations: int = 260000) -> str:
    salt = secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), iterations)
    return f"pbkdf2_sha256${iterations}${salt}${digest.hex()}"


def verify_password(password: str, encoded_hash: str) -> bool:
    try:
        algo, raw_iterations, salt, raw_hash = encoded_hash.split("$", 3)
        if algo != "pbkdf2_sha256":
            return False
        iterations = int(raw_iterations)
    except (ValueError, TypeError):
        return False
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), iterations)
    return hmac.compare_digest(digest.hex(), raw_hash)


def _login_cache_key(username: str, password: str) -> str:
    payload = f"{username}\0{password}".encode("utf-8")
    return hashlib.sha256(payload).hexdigest()


def authenticate_admin(*, username: str, password: str) -> bool:
    username_value = username.strip()
    if username_value != settings.admin_username:
        return False
    if settings.admin_password_hash:
        cache_key = _login_cache_key(username_value, password)
        if successful_login_cache.is_valid(cache_key):
            return True
        is_valid = verify_password(password=password, encoded_hash=settings.admin_password_hash)
        if is_valid:
            successful_login_cache.remember(cache_key)
            return True
        if settings.admin_password:
            return hmac.compare_digest(password, settings.admin_password)
        return False
    if settings.admin_password:
        return hmac.compare_digest(password, settings.admin_password)
    return False


def _extract_token(request: Request, x_admin_token: str | None, authorization: str | None) -> str:
    if not isinstance(x_admin_token, str):
        x_admin_token = None
    if not isinstance(authorization, str):
        authorization = None
    if x_admin_token:
        return x_admin_token.strip()
    if authorization and authorization.lower().startswith("bearer "):
        return authorization.split(" ", 1)[1].strip()
    from_query = str(request.query_params.get("admin_token") or "").strip()
    if from_query:
        return from_query
    from_cookie = str(request.cookies.get("admin_session") or "").strip()
    return from_cookie


def extract_admin_token(request: Request) -> str:
    return _extract_token(
        request=request,
        x_admin_token=request.headers.get("X-Admin-Token"),
        authorization=request.headers.get("Authorization"),
    )


def require_admin_access(
    request: Request,
    x_admin_token: str | None = Header(default=None, alias="X-Admin-Token"),
    x_api_key: str | None = Header(default=None, alias="X-API-Key"),
    authorization: str | None = Header(default=None),
) -> None:
    if settings.admin_api_key:
        provided_key = (x_api_key or str(request.query_params.get("api_key") or "")).strip()
        if provided_key and hmac.compare_digest(provided_key, settings.admin_api_key):
            return

    admin_control_enabled = bool(
        settings.admin_api_key or settings.admin_token or settings.admin_password or settings.admin_password_hash
    )
    if not admin_control_enabled:
        return

    token = _extract_token(request=request, x_admin_token=x_admin_token, authorization=authorization)
    if not token:
        raise HTTPException(status_code=401, detail="Admin authentication required.")
    if settings.admin_token and token == settings.admin_token:
        return
    if admin_sessions.validate(token):
        return
    raise HTTPException(status_code=401, detail="Invalid or expired admin token.")
