from __future__ import annotations

import json
from datetime import datetime

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import NewsItem, Report


def parse_points(raw: str) -> list[str]:
    try:
        parsed = json.loads(raw or "[]")
        if isinstance(parsed, list):
            return [str(item).strip() for item in parsed if str(item).strip()]
    except (TypeError, ValueError):
        return []
    return []


def build_executive_summary(news: NewsItem) -> str:
    if (news.intel_summary or "").strip():
        summary = news.intel_summary.strip()
        lines = [line.strip() for line in summary.splitlines() if line.strip()]
        if len(lines) >= 2:
            return "\n".join(lines[:2])[:500]

    species = news.species or "unknown species"
    place = f"{news.district or 'unknown district'}, {news.state or 'unknown state'}"
    seriousness = "high seriousness" if news.risk_score >= 80 else ("moderate seriousness" if news.risk_score >= 60 else "low seriousness")
    line1 = f"{news.crime_type.replace('_', ' ').title()} incident reported involving {species}."
    line2 = f"Location: {place}; assessed as {seriousness} (risk {news.risk_score}/100)."
    return f"{line1[:245]}\n{line2[:245]}"


def build_intel_points(news: NewsItem) -> list[str]:
    points = parse_points(news.intel_points)
    lower_title = (news.title or "").lower()
    lower_summary = (news.summary or "").lower()
    text = f"{lower_title} {lower_summary}"

    if news.network_indicator and not any("organized network" in item.lower() for item in points):
        points.append("Organized network indicators present in incident narrative.")
    if news.repeat_indicator and not any("repeat hotspot" in item.lower() for item in points):
        points.append("Repeated hotspot district activity detected.")
    if (
        ("cross-border" in text or "border" in text or "international" in text)
        and not any("cross-border smuggling" in item.lower() for item in points)
    ):
        points.append("Cross-border smuggling signs observed from language patterns.")
    if news.report_count >= 3 and not any("species trend" in item.lower() for item in points):
        points.append("Species trend increase likely due to repeated incident reporting.")
    if news.source_count >= 3 and not any("source cluster" in item.lower() for item in points):
        points.append("Suspicious source cluster detected across merged reports.")

    if not points:
        points.append("No high-confidence secondary intelligence points detected.")
    return points[:12]


def build_recommendation(news: NewsItem) -> str:
    if (news.enforcement_recommendation or "").strip():
        return news.enforcement_recommendation.strip()[:500]
    if news.risk_score >= 85:
        return f"Increase patrol in {news.district or 'target district'} and inspect nearby transport corridors."
    if news.network_indicator:
        return "Coordinate customs checks and police intelligence for organized trafficking links."
    if "elephant" in (news.species or "").lower() or "tiger" in (news.species or "").lower() or "rhino" in (news.species or "").lower():
        return "Deploy camera traps and monitor local wildlife markets for high-value species trafficking."
    return "Increase patrol frequency and maintain local informer network checks."


def build_route_hypothesis(news: NewsItem) -> str:
    if (news.likely_smuggling_route or "").strip():
        return news.likely_smuggling_route.strip()[:500]
    district = news.district or "forest zone"
    state = news.state or "state hub"
    return f"{district} forest fringe -> {district} town -> inter-state highway -> border/port node near {state}."


def build_confidence_reason(news: NewsItem) -> str:
    if (news.confidence_explanation or "").strip():
        return news.confidence_explanation.strip()[:500]
    return (
        f"Confidence {news.confidence:.2f} from species + crime keywords, seizure context, "
        f"state/district match, and repeat-pattern signals."
    )[:500]


def upsert_report_for_news(db: Session, news: NewsItem) -> Report:
    report = db.execute(select(Report).where(Report.news_id == news.id)).scalar_one_or_none()
    if report is None:
        report = Report(news_id=news.id)
        db.add(report)

    report.summary = build_executive_summary(news)
    report.intel_points = json.dumps(build_intel_points(news), ensure_ascii=False)
    report.recommendation = build_recommendation(news)
    report.route_hypothesis = build_route_hypothesis(news)
    report.confidence_reason = build_confidence_reason(news)
    report.generated_at = datetime.utcnow()
    return report
