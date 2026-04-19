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


class AdminSessionStore:
    def __init__(self) -> None:
        self._sessions: dict[str, _AdminSession] = {}
        self._lock = Lock()

    def create(self, username: str, password: str) -> str:
        if not authenticate_admin(username=username, password=password):
            raise HTTPException(status_code=401, detail="Invalid admin credentials.")
        token = secrets.token_urlsafe(32)
        expires_at = time.time() + (max(5, settings.admin_session_minutes) * 60)
        with self._lock:
            self._sessions[token] = _AdminSession(token=token, expires_at=expires_at)
        return token

    def validate(self, token: str) -> bool:
        now = time.time()
        with self._lock:
            expired = [key for key, value in self._sessions.items() if value.expires_at <= now]
            for key in expired:
                self._sessions.pop(key, None)
            session = self._sessions.get(token)
            return bool(session and session.expires_at > now)

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


admin_sessions = AdminSessionStore()


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


def authenticate_admin(*, username: str, password: str) -> bool:
    if username.strip() != settings.admin_username:
        return False
    if settings.admin_password_hash:
        return verify_password(password=password, encoded_hash=settings.admin_password_hash)
    if settings.admin_password:
        return hmac.compare_digest(password, settings.admin_password)
    return False


def _extract_token(request: Request, x_admin_token: str | None, authorization: str | None) -> str:
    if x_admin_token:
        return x_admin_token.strip()
    if authorization and authorization.lower().startswith("bearer "):
        return authorization.split(" ", 1)[1].strip()
    from_query = str(request.query_params.get("admin_token") or "").strip()
    if from_query:
        return from_query
    from_cookie = str(request.cookies.get("admin_session") or "").strip()
    return from_cookie


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
