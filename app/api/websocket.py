from __future__ import annotations

import asyncio
import hmac
import json

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.core.config import settings
from app.core.realtime import InMemoryEventBus
from app.core.security import admin_sessions, decode_jwt_token, has_permission

router = APIRouter(tags=["websocket"])


def _redis_topic(channel: str) -> str:
    prefix = (settings.redis_key_prefix or "wildlife").strip()
    return f"{prefix}:{channel}"


def _extract_ws_token(websocket: WebSocket) -> tuple[str, str | None]:
    """Read the auth token from the Sec-WebSocket-Protocol header (preferred,
    keeps the token out of URLs/proxy logs) and fall back to the legacy
    query-string parameter for backward compatibility.

    Returns (token, accepted_subprotocol). When the token arrives via
    subprotocol the server must echo that subprotocol back on accept(), or the
    browser will fail the handshake.
    """
    # Header form: "Sec-WebSocket-Protocol: wildlife-auth, <token>"
    raw_proto = websocket.headers.get("sec-websocket-protocol") or ""
    parts = [p.strip() for p in raw_proto.split(",") if p.strip()]
    if len(parts) >= 2 and parts[0] == "wildlife-auth":
        return parts[1], parts[0]
    # Legacy fallback: token in query string (deprecated — leaks into logs).
    return (websocket.query_params.get("token") or "").strip(), None


@router.websocket("/api/ws/live")
async def websocket_live(websocket: WebSocket):
    supplied_token, accept_proto = _extract_ws_token(websocket)
    controls_enabled = bool(
        settings.admin_api_key or settings.admin_token or settings.admin_password or settings.admin_password_hash
    )
    if controls_enabled:
        token_ok = False
        if settings.admin_token and supplied_token and hmac.compare_digest(supplied_token, settings.admin_token):
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

    # Echo the negotiated subprotocol back when the token came via header.
    if accept_proto:
        await websocket.accept(subprotocol=accept_proto)
    else:
        await websocket.accept()
    redis_url = (settings.redis_url or "").strip()

    if not redis_url:
        # ── In-memory event bus mode ──
        from app import main as app_main

        bus = app_main.event_bus
        channels = ["incidents", "alerts", "sync_status"]
        queues = {}

        # Subscribe to in-memory event bus if available
        if isinstance(bus, InMemoryEventBus):
            for ch in channels:
                queues[ch] = bus.subscribe(ch)

        await websocket.send_json({
            "channel": "sync_status",
            "data": {"type": "websocket_connected", "redis": False, "bus": "memory" if queues else "none"},
        })

        # Send initial sync snapshot
        try:
            await websocket.send_json({
                "channel": "sync_status",
                "data": {"type": "sync_snapshot", "snapshot": app_main._sync_snapshot()},
            })
        except Exception:
            pass

        try:
            if queues:
                # Merge all queues into a single stream + periodic snapshot
                snapshot_interval = 15  # seconds
                last_snapshot = asyncio.get_event_loop().time()

                while True:
                    # Drain all queues with a short timeout
                    got_message = False
                    for ch, q in queues.items():
                        try:
                            payload = await asyncio.wait_for(q.get(), timeout=0.1)
                            await websocket.send_json({"channel": ch, "data": payload})
                            got_message = True
                        except asyncio.TimeoutError:
                            continue

                    now = asyncio.get_event_loop().time()
                    if not got_message and (now - last_snapshot) >= snapshot_interval:
                        await websocket.send_json({
                            "channel": "sync_status",
                            "data": {"type": "sync_snapshot", "snapshot": app_main._sync_snapshot()},
                        })
                        last_snapshot = now

                    if not got_message:
                        await asyncio.sleep(0.5)
            else:
                # Fallback: no event bus, just poll snapshots
                while True:
                    await asyncio.sleep(15)
                    await websocket.send_json({
                        "channel": "sync_status",
                        "data": {"type": "sync_snapshot", "snapshot": app_main._sync_snapshot()},
                    })
        except WebSocketDisconnect:
            return
        finally:
            if isinstance(bus, InMemoryEventBus):
                for ch, q in queues.items():
                    bus.unsubscribe(ch, q)
        return

    # ── Redis pub/sub mode ──
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

