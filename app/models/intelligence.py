from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Index, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Alert(Base):
    __tablename__ = "alerts"
    __table_args__ = (
        Index("ix_alerts_created_at", "created_at"),
        Index("ix_alerts_news_id", "news_id"),
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)
    news_id: Mapped[int] = mapped_column(ForeignKey("news_items.id"), nullable=False)
    severity: Mapped[str] = mapped_column(String(16), nullable=False, default="high")
    trigger_reason: Mapped[str] = mapped_column(String(300), nullable=False)
    sent_telegram: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    sent_email: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    sent_popup: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)


class SpeciesStat(Base):
    __tablename__ = "species_stats"
    __table_args__ = (
        UniqueConstraint("species", name="uq_species_stats_species"),
        Index("ix_species_stats_species", "species"),
        Index("ix_species_stats_avg_risk", "avg_risk"),
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    species: Mapped[str] = mapped_column(String(120), nullable=False)
    count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    avg_risk: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    last_seen: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)


class SourceStat(Base):
    __tablename__ = "sources"
    __table_args__ = (
        UniqueConstraint("source_name", name="uq_sources_source_name"),
        Index("ix_sources_reliability_score", "reliability_score"),
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    source_name: Mapped[str] = mapped_column(String(160), nullable=False)
    reliability_score: Mapped[float] = mapped_column(Float, nullable=False, default=70.0)
    article_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    last_seen: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)


class SyncLog(Base):
    __tablename__ = "sync_logs"
    __table_args__ = (
        Index("ix_sync_logs_started_at", "started_at"),
        Index("ix_sync_logs_provider", "provider"),
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    started_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    ended_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    provider: Mapped[str] = mapped_column(String(64), nullable=False, default="all")
    scanned: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    kept: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    failed: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    duration_sec: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    notes: Mapped[str] = mapped_column(Text, nullable=False, default="")


class Entity(Base):
    __tablename__ = "entities"
    __table_args__ = (
        Index("ix_entities_news_id", "news_id"),
        Index("ix_entities_type_value", "entity_type", "entity_value"),
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    news_id: Mapped[int] = mapped_column(ForeignKey("news_items.id"), nullable=False)
    entity_type: Mapped[str] = mapped_column(String(40), nullable=False)
    entity_value: Mapped[str] = mapped_column(String(240), nullable=False)


class DistrictStat(Base):
    __tablename__ = "districts"
    __table_args__ = (
        UniqueConstraint("state", "district", name="uq_districts_state_district"),
        Index("ix_districts_hotspot_score", "hotspot_score"),
        Index("ix_districts_incident_count", "incident_count"),
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    state: Mapped[str] = mapped_column(String(120), nullable=False)
    district: Mapped[str] = mapped_column(String(120), nullable=False)
    incident_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    avg_risk: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    hotspot_score: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
