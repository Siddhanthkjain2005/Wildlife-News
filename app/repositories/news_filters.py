from __future__ import annotations

from sqlalchemy import func

from app.models import NewsItem
from app.services.intelligence import NON_ANIMAL_CRIME_TYPES


def apply_strict_incident_filters(stmt):
    """Keep only high-confidence India wildlife incidents suitable for user-facing analytics."""
    species_value = func.lower(func.trim(func.coalesce(NewsItem.species, "")))
    crime_value = func.lower(func.trim(func.coalesce(NewsItem.crime_type, "")))
    return (
        stmt.where(NewsItem.is_poaching.is_(True))
        .where(NewsItem.is_india.is_(True))
        .where(func.length(species_value) > 0)
        .where(species_value.notlike("%unknown%"))
        .where(~crime_value.in_(tuple(NON_ANIMAL_CRIME_TYPES)))
    )


def is_strict_incident_record(news_item: object) -> bool:
    is_poaching = bool(getattr(news_item, "is_poaching", False))
    is_india = bool(getattr(news_item, "is_india", False))
    species = str(getattr(news_item, "species", "") or "").strip().lower()
    crime_type = str(getattr(news_item, "crime_type", "") or "").strip().lower()
    if not is_poaching or not is_india:
        return False
    if not species or "unknown" in species:
        return False
    if crime_type in NON_ANIMAL_CRIME_TYPES:
        return False
    return True
