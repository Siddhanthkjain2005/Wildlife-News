from __future__ import annotations

import asyncio
import json

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.core.config import settings
from app.core.security import admin_sessions, decode_jwt_token, has_permission

router = APIRouter(tags=["websocket"])


def _redis_topic(channel: str) -> str:
    prefix = (settings.redis_key_prefix or "wildlife").strip()
    return f"{prefix}:{channel}"


@router.websocket("/api/ws/live")
async def websocket_live(websocket: WebSocket):
    supplied_token = (websocket.query_params.get("token") or "").strip()
    controls_enabled = bool(
        settings.admin_api_key or settings.admin_token or settings.admin_password or settings.admin_password_hash
    )
    if controls_enabled:
        token_ok = False
        if settings.admin_token and supplied_token == settings.admin_token:
            token_ok = True
        elif supplied_token and admin_sessions.validate(supplied_token):
            token_ok = True
        elif supplied_token:
            decoded = decode_jwt_token(supplied_token)
            if decoded is not None and str(decoded.get("type") or "") == "access":
                role = str(decoded.get("role") or "")
                token_ok = has_permission(role, "admin:access")
        if not token_ok:
            await websocket.close(code=1008, reason="Invalid token")
            return

    await websocket.accept()
    redis_url = (settings.redis_url or "").strip()

    if not redis_url:
        from app import main as app_main

        await websocket.send_json({"channel": "sync_status", "data": {"type": "websocket_connected", "redis": False}})
        try:
            while True:
                await asyncio.sleep(15)
                await websocket.send_json(
                    {
                        "channel": "sync_status",
                        "data": {
                            "type": "sync_snapshot",
                            "snapshot": app_main._sync_snapshot(),
                        },
                    }
                )
        except WebSocketDisconnect:
            return

    import redis.asyncio as redis_async

    client = redis_async.from_url(redis_url, decode_responses=True)
    pubsub = client.pubsub()
    channels = [_redis_topic("incidents"), _redis_topic("alerts"), _redis_topic("sync_status")]
    await pubsub.subscribe(*channels)
    await websocket.send_json({"channel": "sync_status", "data": {"type": "websocket_connected", "redis": True}})

    try:
        while True:
            message = await pubsub.get_message(ignore_subscribe_messages=True, timeout=10.0)
            if message is None:
                await asyncio.sleep(0.2)
                continue

            channel_raw = str(message.get("channel") or "")
            payload_raw = message.get("data")
            if isinstance(payload_raw, str):
                try:
                    payload = json.loads(payload_raw)
                except json.JSONDecodeError:
                    payload = {"raw": payload_raw}
            else:
                payload = {"raw": str(payload_raw)}

            channel = channel_raw.rsplit(":", 1)[-1] if ":" in channel_raw else channel_raw
            await websocket.send_json({"channel": channel, "data": payload})
    except WebSocketDisconnect:
        return
    finally:
        try:
            await pubsub.unsubscribe(*channels)
        finally:
            await pubsub.close()
            await client.close()
