"""Public API router – unauthenticated, rate-limited, cached endpoints.

Exposes curated article data with sensitive intelligence fields stripped.
Designed for the public-facing Wildlife News frontend at wildlifenews.me.
"""

from __future__ import annotations

import time
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, Query
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models import DistrictStat, NewsItem, SpeciesStat
from app.utils.india_geo import STATE_CENTROIDS
from app.utils.location_data import DISTRICT_TO_STATE

public_router = APIRouter(tags=["public"])

# ---------------------------------------------------------------------------
# Simple in-memory response cache with TTL
# ---------------------------------------------------------------------------
_CACHE: dict[str, tuple[float, object]] = {}
_CACHE_TTL = 60  # seconds


def _cache_get(key: str) -> object | None:
    entry = _CACHE.get(key)
    if entry is None:
        return None
    ts, value = entry
    if time.time() - ts > _CACHE_TTL:
        _CACHE.pop(key, None)
        return None
    return value


def _cache_set(key: str, value: object) -> None:
    _CACHE[key] = (time.time(), value)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

# Sensitive fields that must NEVER be returned by public endpoints
_EXCLUDED_FIELDS = {
    "involved_persons",
    "intel_points",
    "enforcement_recommendation",
    "intel_summary",
    "ai_reason",
    "confidence_explanation",
    "likely_smuggling_route",
    "network_indicator",
    "embedding",
}


def _article_list_dict(row: NewsItem, *, full_summary: bool = False) -> dict:
    """Build a safe public dict from a NewsItem, stripping intel fields."""
    summary = row.summary or ""
    if not full_summary:
        summary = summary[:300]
    return {
        "id": row.id,
        "title": row.title,
        "summary": summary,
        "species": row.species,
        "state": row.state,
        "district": row.district,
        "crime_type": row.crime_type,
        "published_at": row.published_at.isoformat() if row.published_at else None,
        "risk_score": row.risk_score,
        "source": row.source,
        "url": row.url,
        "wpa_schedule": getattr(row, "wpa_schedule", "") or "",
        "location": row.location,
    }


def _article_detail_dict(row: NewsItem) -> dict:
    """Build a detailed public dict for a single article view."""
    base = _article_list_dict(row, full_summary=True)
    base.update(
        {
            "wpa_section": getattr(row, "wpa_section", "") or "",
            "wpa_offence_type": getattr(row, "wpa_offence_type", "") or "",
            "wpa_penalty_class": getattr(row, "wpa_penalty_class", "") or "",
            "protected_area_type": getattr(row, "protected_area_type", "") or "",
            "enforcement_authority": getattr(row, "enforcement_authority", "") or "",
        }
    )
    return base


def _coords_for_row(row: NewsItem) -> tuple[float, float] | None:
    """Approximate lat/lng for a NewsItem using district→state lookup then state centroids."""
    district = (row.district or "").strip().lower()
    state = (row.state or "").strip().lower()

    # Try to resolve state from district if missing
    if not state and district:
        state = DISTRICT_TO_STATE.get(district, "")

    if state:
        coords = STATE_CENTROIDS.get(state)
        if coords:
            return coords

    return None


# ---------------------------------------------------------------------------
# 1. GET /articles — Paginated articles list
# ---------------------------------------------------------------------------

@public_router.get("/articles")
def list_articles(
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=50),
    species: str = "",
    state: str = "",
    crime_type: str = "",
    q: str = "",
):
    """Return a paginated list of public poaching articles with intel fields stripped."""
    try:
        cache_key = f"pub:articles:{page}:{limit}:{species}:{state}:{crime_type}:{q}"
        cached = _cache_get(cache_key)
        if cached is not None:
            return cached

        stmt = select(NewsItem).where(NewsItem.is_poaching == True)  # noqa: E712

        if species:
            stmt = stmt.where(NewsItem.species.ilike(f"%{species}%"))
        if state:
            stmt = stmt.where(NewsItem.state.ilike(f"%{state}%"))
        if crime_type:
            stmt = stmt.where(NewsItem.crime_type.ilike(f"%{crime_type}%"))
        if q:
            pattern = f"%{q}%"
            stmt = stmt.where(
                NewsItem.title.ilike(pattern) | NewsItem.summary.ilike(pattern)
            )

        stmt = stmt.order_by(NewsItem.published_at.desc())
        offset = (page - 1) * limit
        stmt = stmt.offset(offset).limit(limit)

        rows = db.execute(stmt).scalars().all()
        result = {
            "page": page,
            "limit": limit,
            "count": len(rows),
            "items": [_article_list_dict(row) for row in rows],
        }
        _cache_set(cache_key, result)
        return result
    except Exception:
        return {"page": page, "limit": limit, "count": 0, "items": []}


# ---------------------------------------------------------------------------
# 2. GET /articles/{article_id} — Single article detail
# ---------------------------------------------------------------------------

@public_router.get("/articles/{article_id}")
def get_article(article_id: int, db: Session = Depends(get_db)):
    """Return a single poaching article with full summary and WPA details, intel fields stripped."""
    try:
        cache_key = f"pub:article:{article_id}"
        cached = _cache_get(cache_key)
        if cached is not None:
            return cached

        row = db.execute(
            select(NewsItem).where(
                NewsItem.id == article_id,
                NewsItem.is_poaching == True,  # noqa: E712
            )
        ).scalars().first()

        if row is None:
            from fastapi import HTTPException

            raise HTTPException(status_code=404, detail="Article not found")

        result = _article_detail_dict(row)
        _cache_set(cache_key, result)
        return result
    except Exception as exc:
        # Re-raise HTTPException so FastAPI returns a proper 404
        from fastapi import HTTPException

        if isinstance(exc, HTTPException):
            raise
        return {"detail": "Article not found"}


# ---------------------------------------------------------------------------
# 3. GET /featured — Top 6 highest-risk articles from last 7 days
# ---------------------------------------------------------------------------

@public_router.get("/featured")
def featured_articles(db: Session = Depends(get_db)):
    """Return the top 6 highest-risk poaching articles from the last 7 days."""
    try:
        cache_key = "pub:featured"
        cached = _cache_get(cache_key)
        if cached is not None:
            return cached

        cutoff = datetime.utcnow() - timedelta(days=7)
        stmt = (
            select(NewsItem)
            .where(NewsItem.is_poaching == True, NewsItem.published_at >= cutoff)  # noqa: E712
            .order_by(NewsItem.risk_score.desc())
            .limit(6)
        )
        rows = db.execute(stmt).scalars().all()
        result = [_article_list_dict(row) for row in rows]
        _cache_set(cache_key, result)
        return result
    except Exception:
        return []


# ---------------------------------------------------------------------------
# 4. GET /stats — Public dashboard statistics
# ---------------------------------------------------------------------------

@public_router.get("/stats")
def public_stats(db: Session = Depends(get_db)):
    """Return aggregate statistics for the public dashboard."""
    try:
        cache_key = "pub:stats"
        cached = _cache_get(cache_key)
        if cached is not None:
            return cached

        base = select(NewsItem).where(NewsItem.is_poaching == True).subquery()  # noqa: E712

        total_incidents = db.scalar(
            select(func.count()).select_from(base)
        ) or 0

        species_count = db.scalar(
            select(func.count(func.distinct(base.c.species)))
        ) or 0

        states_count = db.scalar(
            select(func.count(func.distinct(base.c.state)))
        ) or 0

        sources_count = db.scalar(
            select(func.count(func.distinct(base.c.source)))
        ) or 0

        latest_article_date = db.scalar(
            select(func.max(base.c.published_at))
        )

        high_risk_count = db.scalar(
            select(func.count()).select_from(base).where(base.c.risk_score >= 80)
        ) or 0

        result = {
            "total_incidents": total_incidents,
            "species_count": species_count,
            "states_count": states_count,
            "sources_count": sources_count,
            "latest_article_date": latest_article_date.isoformat() if latest_article_date else None,
            "high_risk_count": high_risk_count,
        }
        _cache_set(cache_key, result)
        return result
    except Exception:
        return {
            "total_incidents": 0,
            "species_count": 0,
            "states_count": 0,
            "sources_count": 0,
            "latest_article_date": None,
            "high_risk_count": 0,
        }


# ---------------------------------------------------------------------------
# 5. GET /species-stats — Species incident counts and trends
# ---------------------------------------------------------------------------

@public_router.get("/species-stats")
def species_stats(db: Session = Depends(get_db)):
    """Return species incident counts, average risk, and last-seen dates."""
    try:
        cache_key = "pub:species-stats"
        cached = _cache_get(cache_key)
        if cached is not None:
            return cached

        rows = db.execute(
            select(SpeciesStat).order_by(SpeciesStat.count.desc())
        ).scalars().all()

        result = [
            {
                "species": row.species,
                "count": row.count,
                "avg_risk": round(row.avg_risk, 2),
                "last_seen": row.last_seen.isoformat() if row.last_seen else None,
            }
            for row in rows
        ]
        _cache_set(cache_key, result)
        return result
    except Exception:
        return []


# ---------------------------------------------------------------------------
# 6. GET /map-data — Map markers for public display
# ---------------------------------------------------------------------------

@public_router.get("/map-data")
def map_data(db: Session = Depends(get_db)):
    """Return map markers for poaching incidents with approximate coordinates."""
    try:
        cache_key = "pub:map-data"
        cached = _cache_get(cache_key)
        if cached is not None:
            return cached

        stmt = (
            select(NewsItem)
            .where(
                NewsItem.is_poaching == True,  # noqa: E712
                (NewsItem.state != "") | (NewsItem.district != ""),
            )
            .order_by(NewsItem.published_at.desc())
            .limit(500)
        )
        rows = db.execute(stmt).scalars().all()

        markers = []
        for row in rows:
            coords = _coords_for_row(row)
            if coords is None:
                continue
            lat, lng = coords
            markers.append(
                {
                    "id": row.id,
                    "title": (row.title or "")[:100],
                    "species": row.species,
                    "state": row.state,
                    "district": row.district,
                    "risk_score": row.risk_score,
                    "published_at": row.published_at.isoformat() if row.published_at else None,
                    "lat": lat,
                    "lng": lng,
                }
            )

        _cache_set(cache_key, markers)
        return markers
    except Exception:
        return []


# ---------------------------------------------------------------------------
# 7. GET /hotspots — District hotspot rankings
# ---------------------------------------------------------------------------

@public_router.get("/hotspots")
def hotspots(db: Session = Depends(get_db)):
    """Return the top 30 district hotspots ranked by hotspot score."""
    try:
        cache_key = "pub:hotspots"
        cached = _cache_get(cache_key)
        if cached is not None:
            return cached

        rows = db.execute(
            select(DistrictStat)
            .order_by(DistrictStat.hotspot_score.desc())
            .limit(30)
        ).scalars().all()

        result = [
            {
                "state": row.state,
                "district": row.district,
                "incident_count": row.incident_count,
                "avg_risk": round(row.avg_risk, 2),
                "hotspot_score": round(row.hotspot_score, 2),
            }
            for row in rows
        ]
        _cache_set(cache_key, result)
        return result
    except Exception:
        return []


# ---------------------------------------------------------------------------
# 8. GET /search — Public text search
# ---------------------------------------------------------------------------

@public_router.get("/search")
def public_search(
    q: str = Query(..., min_length=1),
    limit: int = Query(20, ge=1, le=50),
    db: Session = Depends(get_db),
):
    """Search public poaching articles by title and summary using text matching."""
    try:
        cache_key = f"pub:search:{q}:{limit}"
        cached = _cache_get(cache_key)
        if cached is not None:
            return cached

        pattern = f"%{q}%"
        stmt = (
            select(NewsItem)
            .where(
                NewsItem.is_poaching == True,  # noqa: E712
                NewsItem.title.ilike(pattern) | NewsItem.summary.ilike(pattern),
            )
            .order_by(NewsItem.published_at.desc())
            .limit(limit)
        )
        rows = db.execute(stmt).scalars().all()
        result = {
            "query": q,
            "count": len(rows),
            "items": [_article_list_dict(row) for row in rows],
        }
        _cache_set(cache_key, result)
        return result
    except Exception:
        return {"query": q, "count": 0, "items": []}


# ---------------------------------------------------------------------------
# 9. GET /timeline — Incident timeline data (last 90 days)
# ---------------------------------------------------------------------------

@public_router.get("/timeline")
def timeline(db: Session = Depends(get_db)):
    """Return daily incident counts and high-risk counts for the last 90 days."""
    try:
        cache_key = "pub:timeline"
        cached = _cache_get(cache_key)
        if cached is not None:
            return cached

        cutoff = datetime.utcnow() - timedelta(days=90)
        stmt = (
            select(NewsItem)
            .where(
                NewsItem.is_poaching == True,  # noqa: E712
                NewsItem.published_at >= cutoff,
            )
            .order_by(NewsItem.published_at.asc())
        )
        rows = db.execute(stmt).scalars().all()

        daily: dict[str, dict[str, int]] = {}
        for row in rows:
            day = row.published_at.date().isoformat()
            bucket = daily.setdefault(day, {"count": 0, "high_risk_count": 0})
            bucket["count"] += 1
            if row.risk_score >= 80:
                bucket["high_risk_count"] += 1

        result = [
            {"date": day, "count": data["count"], "high_risk_count": data["high_risk_count"]}
            for day, data in sorted(daily.items())
        ]
        _cache_set(cache_key, result)
        return result
    except Exception:
        return []
