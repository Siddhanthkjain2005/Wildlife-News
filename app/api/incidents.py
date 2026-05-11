from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.models import NewsItem

router = APIRouter(tags=["incidents"])


def _main():
    from app import main as app_main

    return app_main


@router.get("/api/news")
def get_news(
    db: Session = Depends(get_db),
    lang: str = "",
    min_score: float = settings.ai_threshold,
    limit: int = 100,
):
    m = _main()
    safe_limit = max(1, min(500, limit))
    stmt = (
        select(NewsItem)
        .where(NewsItem.is_poaching.is_(True))
        .where(NewsItem.is_india.is_(True))
        .where(func.length(func.trim(NewsItem.species)) > 0)
        .where(func.lower(NewsItem.species).notlike("%unknown%"))
        .where(NewsItem.confidence >= min_score)
        .order_by(NewsItem.published_at.desc())
        .limit(safe_limit)
    )
    stmt = m._apply_today_news_scope(stmt)
    if lang:
        stmt = stmt.where(NewsItem.language == lang)

    rows = db.execute(stmt).scalars().all()
    return [
        {
            "id": row.id,
            "title": row.title,
            "article_summary": row.summary,
            "source": row.source,
            "url": row.url,
            "open_url": f"/open/{row.id}",
            "language": row.language,
            "published_at": row.published_at.isoformat(),
            "is_poaching": row.is_poaching,
            "is_india": row.is_india,
            "confidence": row.confidence,
            "risk_score": row.risk_score,
            "crime_type": row.crime_type,
            "species": row.species,
            "state": row.state,
            "district": row.district,
            "involved_persons": row.involved_persons,
            "location": row.location,
            "network_indicator": row.network_indicator,
            "repeat_indicator": row.repeat_indicator,
            "summary": row.intel_summary,
            "two_line_summary": row.intel_summary,
            "intel_points": m._parse_intel_points(row.intel_points),
            "key_intelligence_points": m._parse_intel_points(row.intel_points),
            "likely_smuggling_route": row.likely_smuggling_route,
            "enforcement_recommendation": row.enforcement_recommendation
            or m._action_recommendation(
                row.risk_score,
                species=row.species,
                crime_type=row.crime_type,
                state=row.state,
                district=row.district,
                network_indicator=row.network_indicator,
                repeat_indicator=row.repeat_indicator,
            ),
            "confidence_explanation": row.confidence_explanation or row.ai_reason,
            "duplicate_confidence": row.duplicate_confidence,
            "source_count": row.source_count,
            "report_count": row.report_count,
            "merged_sources": row.merged_sources,
        }
        for row in rows
    ]


@router.get("/api/live-incidents")
def live_incidents(
    db: Session = Depends(get_db),
    since_id: int = 0,
    min_score: float = settings.ai_threshold,
    limit: int = 30,
):
    m = _main()
    safe_limit = max(1, min(100, limit))
    stmt = (
        select(NewsItem)
        .where(NewsItem.is_poaching.is_(True))
        .where(NewsItem.is_india.is_(True))
        .where(func.length(func.trim(NewsItem.species)) > 0)
        .where(func.lower(NewsItem.species).notlike("%unknown%"))
        .where(NewsItem.confidence >= min_score)
        .where(NewsItem.id > since_id)
        .order_by(NewsItem.id.asc())
        .limit(safe_limit)
    )
    stmt = m._apply_today_news_scope(stmt)
    rows = db.execute(stmt).scalars().all()
    return [
        {
            "id": row.id,
            "title": row.title,
            "source": row.source,
            "language": row.language,
            "published_at": row.published_at.isoformat(),
            "ai_score": row.confidence,
            "severity": "critical" if row.risk_score >= 85 else ("high" if row.risk_score >= 70 else "medium"),
            "risk_score": row.risk_score,
            "crime_type": row.crime_type,
            "species": row.species,
            "state": row.state,
            "district": row.district,
            "involved_persons": row.involved_persons,
            "two_line_summary": row.intel_summary,
            "key_intelligence_points": m._parse_intel_points(row.intel_points),
            "likely_smuggling_route": row.likely_smuggling_route,
            "enforcement_recommendation": row.enforcement_recommendation
            or m._action_recommendation(
                row.risk_score,
                species=row.species,
                crime_type=row.crime_type,
                state=row.state,
                district=row.district,
                network_indicator=row.network_indicator,
                repeat_indicator=row.repeat_indicator,
            ),
            "confidence_explanation": row.confidence_explanation or row.ai_reason,
            "duplicate_confidence": row.duplicate_confidence,
            "source_count": row.source_count,
            "report_count": row.report_count,
            "merged_sources": row.merged_sources,
            "url": row.url,
            "open_url": f"/open/{row.id}",
        }
        for row in rows
    ]


@router.get("/api/filter-news")
def filter_news(
    db: Session = Depends(get_db),
    q: str = "",
    species: str = "",
    state: str = "",
    date_from: str = "",
    date_to: str = "",
    crime_type: str = "",
    severity: str = "",
    source: str = "",
    min_confidence: float = 0.0,
    limit: int = 200,
):
    m = _main()
    rows = m._fetch_filtered_news_rows(
        db=db,
        q=q,
        species=species,
        state=state,
        date_from=date_from,
        date_to=date_to,
        crime_type=crime_type,
        severity=severity,
        source=source,
        min_confidence=min_confidence,
        limit=limit,
    )
    return {
        "items": [
            {
                "id": row.id,
                "date": row.published_at.isoformat(sep=" ", timespec="seconds"),
                "risk_score": row.risk_score,
                "species": row.species,
                "state": row.state,
                "district": row.district,
                "involved_persons": row.involved_persons,
                "crime_type": row.crime_type,
                "source": row.source,
                "confidence": row.confidence,
                "title": row.title,
                "summary": row.intel_summary,
                "two_line_summary": row.intel_summary,
                "key_intelligence_points": m._parse_intel_points(row.intel_points),
                "likely_smuggling_route": row.likely_smuggling_route,
                "action_recommendation": row.enforcement_recommendation
                or m._action_recommendation(
                    row.risk_score,
                    species=row.species,
                    crime_type=row.crime_type,
                    state=row.state,
                    district=row.district,
                    network_indicator=row.network_indicator,
                    repeat_indicator=row.repeat_indicator,
                ),
                "confidence_explanation": row.confidence_explanation or row.ai_reason,
                "open_url": f"/open/{row.id}",
            }
            for row in rows
        ],
        "count": len(rows),
    }
