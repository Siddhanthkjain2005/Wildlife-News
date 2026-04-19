from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, Index, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class NewsItem(Base):
    __tablename__ = "news_items"
    __table_args__ = (
        Index("ix_news_items_published_at", "published_at"),
        Index("ix_news_items_language", "language"),
        Index("ix_news_items_is_poaching", "is_poaching"),
        Index("ix_news_items_risk_score", "risk_score"),
        Index("ix_news_items_state", "state"),
        Index("ix_news_items_district", "district"),
        Index("ix_news_items_crime_type", "crime_type"),
        Index("ix_news_items_url_hash", "url_hash"),
        Index("ix_news_items_duplicate_confidence", "duplicate_confidence"),
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(600), nullable=False)
    summary: Mapped[str] = mapped_column(Text, nullable=False)
    source: Mapped[str] = mapped_column(String(160), nullable=False)
    url: Mapped[str] = mapped_column(String(1200), nullable=False, unique=True)
    language: Mapped[str] = mapped_column(String(16), nullable=False, default="unknown")
    published_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    ai_score: Mapped[float] = mapped_column(Float, nullable=False)
    is_poaching: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    is_india: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    ai_reason: Mapped[str] = mapped_column(String(300), nullable=False)

    confidence: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    risk_score: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    crime_type: Mapped[str] = mapped_column(String(80), nullable=False, default="unknown")
    species: Mapped[str] = mapped_column(String(300), nullable=False, default="")
    state: Mapped[str] = mapped_column(String(120), nullable=False, default="")
    district: Mapped[str] = mapped_column(String(120), nullable=False, default="")
    location: Mapped[str] = mapped_column(String(240), nullable=False, default="")
    network_indicator: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    repeat_indicator: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    intel_summary: Mapped[str] = mapped_column(String(500), nullable=False, default="")
    intel_points: Mapped[str] = mapped_column(Text, nullable=False, default="[]")
    likely_smuggling_route: Mapped[str] = mapped_column(String(500), nullable=False, default="")
    enforcement_recommendation: Mapped[str] = mapped_column(String(500), nullable=False, default="")
    confidence_explanation: Mapped[str] = mapped_column(String(500), nullable=False, default="")
    url_hash: Mapped[str] = mapped_column(String(64), nullable=False, default="")
    duplicate_confidence: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    source_count: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    report_count: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    merged_sources: Mapped[str] = mapped_column(Text, nullable=False, default="")

    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)
    last_seen_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)
