from __future__ import annotations

from datetime import datetime, timedelta

from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.models import NewsItem
from app.repositories.news_filters import apply_strict_incident_filters
from app.utils.india_geo import INDIA_CENTER, centroid_for_state

router = APIRouter(tags=["dashboard"])


def _main():
    from app import main as app_main

    return app_main


@router.get("/api/officer-metrics")
def officer_metrics(db: Session = Depends(get_db)):
    m = _main()
    data = m._officer_metrics(db)
    data["sync_running"] = m._sync_snapshot()["running"]
    return data


@router.get("/api/dashboard-summary")
def dashboard_summary(db: Session = Depends(get_db)):
    m = _main()
    key = m._cache_key("dashboard_summary")
    return m._cache_get_or_compute(key, lambda: m._dashboard_summary(db))


@router.get("/api/map-data")
def map_data(db: Session = Depends(get_db), limit: int = 400):
    m = _main()
    key = m._cache_key(f"map_data_{limit}")

    def _compute_map_data():
        safe_limit = max(50, min(1200, limit))
        try:
            strict_stmt = apply_strict_incident_filters(select(NewsItem))
            rows = (
                db.execute(
                    m._apply_today_news_scope(
                        strict_stmt.order_by(NewsItem.published_at.desc()).limit(safe_limit)
                    )
                )
                .scalars()
                .all()
            )
            markers = [m._marker_from_news(row) for row in rows]
            state_counts: dict[str, int] = {}
            for row in rows:
                state = (row.state or "").strip().title() or "Unknown"
                state_counts[state] = state_counts.get(state, 0) + max(1, row.report_count)
            heatmap = []
            for state, count in sorted(state_counts.items(), key=lambda item: item[1], reverse=True):
                lat, lng = centroid_for_state(state)
                heatmap.append({"state": state, "count": count, "lat": lat, "lng": lng})
        except Exception as err:
            from app.core.logger import get_logger
            get_logger().error("Failed to compute dashboard map data (DB issue): %s", err)
            markers = []
            heatmap = []

        return {
            "center": {"lat": INDIA_CENTER[0], "lng": INDIA_CENTER[1]},
            "markers": markers,
            "state_heatmap": heatmap,
        }

    return m._cache_get_or_compute(key, _compute_map_data)


@router.get("/api/chart-data")
def chart_data(db: Session = Depends(get_db)):
    m = _main()
    key = m._cache_key("chart_data")

    def _compute_chart_data():
        now_utc = datetime.utcnow()
        timeline: dict[str, dict[str, int]] = {}
        state_totals: dict[str, int] = {}
        species_totals: dict[str, int] = {}
        source_totals: dict[str, dict[str, float]] = {}
        crime_types: set[str] = set()
        all_states: list[str] = []
        all_sources: list[str] = []
        all_crime_types: list[str] = []
        window_days = 30
        aggregate_weekly = False

        try:
            if m._scope_from_start_enabled():
                start_date = m._start_from_utc()
                window_days = max(1, (now_utc.date() - start_date.date()).days + 1)
                aggregate_weekly = window_days > 90
            else:
                recent_30_count = int(
                    db.scalar(
                        apply_strict_incident_filters(select(func.count()).select_from(NewsItem)).where(
                            NewsItem.published_at >= (now_utc - timedelta(days=30))
                        )
                    )
                    or 0
                )
                if recent_30_count >= 20:
                    window_days = 30
                elif recent_30_count >= 8:
                    window_days = 120
                else:
                    window_days = 365
                start_date = now_utc - timedelta(days=window_days - 1)
                aggregate_weekly = window_days > 90

            rows_stmt = apply_strict_incident_filters(select(NewsItem)).where(NewsItem.published_at >= start_date)
            rows_stmt = rows_stmt.order_by(NewsItem.published_at.asc())
            rows = db.execute(rows_stmt).scalars().all()

            for row in rows:
                if aggregate_weekly:
                    week_start = (row.published_at - timedelta(days=row.published_at.weekday())).date()
                    day = week_start.isoformat()
                else:
                    day = row.published_at.date().isoformat()
                bucket = timeline.setdefault(day, {"incidents": 0, "high_risk": 0})
                bucket["incidents"] += 1
                if row.risk_score > settings.risk_alert_threshold:
                    bucket["high_risk"] += 1
                state_key = (row.state or "Unknown").strip().title() or "Unknown"
                state_totals[state_key] = state_totals.get(state_key, 0) + 1
                source_name = (row.source or "Unknown").strip() or "Unknown"
                source_bucket = source_totals.setdefault(source_name, {"count": 0.0, "confidence_sum": 0.0})
                source_bucket["count"] += 1.0
                source_bucket["confidence_sum"] += float(row.confidence or 0.0)
                incident_species = {item.strip().lower() for item in str(row.species or "").split(",") if item.strip()}
                for species_name in incident_species:
                    species_totals[species_name] = species_totals.get(species_name, 0) + 1
                if row.crime_type:
                    crime_types.add(row.crime_type)

            all_states = db.execute(
                m._apply_today_news_scope(
                    apply_strict_incident_filters(select(func.distinct(NewsItem.state))).where(NewsItem.state != "").order_by(
                        NewsItem.state.asc()
                    )
                )
            ).scalars().all()
            all_sources = db.execute(
                m._apply_today_news_scope(
                    apply_strict_incident_filters(select(func.distinct(NewsItem.source))).where(NewsItem.source != "").order_by(
                        NewsItem.source.asc()
                    )
                )
            ).scalars().all()
            all_crime_types = db.execute(
                m._apply_today_news_scope(
                    apply_strict_incident_filters(select(func.distinct(NewsItem.crime_type))).where(
                        NewsItem.crime_type != ""
                    ).order_by(NewsItem.crime_type.asc())
                )
            ).scalars().all()
        except Exception as err:
            from app.core.logger import get_logger
            get_logger().error("Failed to compute dashboard chart data (DB issue): %s", err)

        species_rows = sorted(
            [{"species": species, "count": count} for species, count in species_totals.items()],
            key=lambda item: item["count"],
            reverse=True,
        )[:12]
        source_rows = sorted(
            [
                {
                    "source": source,
                    "reliability_score": round(stats["confidence_sum"] / stats["count"], 4) if stats["count"] > 0 else 0.0,
                    "article_count": int(stats["count"]),
                }
                for source, stats in source_totals.items()
            ],
            key=lambda item: (item["reliability_score"], item["article_count"]),
            reverse=True,
        )[:12]

        all_species = sorted(species_totals.keys())
        timeline_labels = sorted(timeline.keys())

        return {
            "timeline": {
                "labels": timeline_labels,
                "incidents": [timeline[label]["incidents"] for label in timeline_labels],
                "high_risk": [timeline[label]["high_risk"] for label in timeline_labels],
                "window_days": window_days,
                "granularity": "weekly" if aggregate_weekly else "daily",
            },
            "top_states": sorted(
                [{"state": state, "count": count} for state, count in state_totals.items()],
                key=lambda item: item["count"],
                reverse=True,
            )[:10],
            "species_distribution": species_rows,
            "source_rankings": source_rows,
            "filters": {
                "states": [str(value) for value in all_states if value],
                "species": [str(value) for value in all_species if value],
                "crime_types": sorted({*crime_types, *[str(value) for value in all_crime_types if value]}),
                "sources": [str(value) for value in all_sources if value],
            },
        }

    return m._cache_get_or_compute(key, _compute_chart_data)
