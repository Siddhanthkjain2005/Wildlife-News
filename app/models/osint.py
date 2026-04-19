from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, Index, Integer, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class ExternalSignal(Base):
    __tablename__ = "external_signals"
    __table_args__ = (
        UniqueConstraint("url", name="uq_external_signals_url"),
        Index("ix_external_signals_source_type", "source_type"),
        Index("ix_external_signals_published_at", "published_at"),
        Index("ix_external_signals_risk_score", "risk_score"),
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    source_type: Mapped[str] = mapped_column(String(40), nullable=False)
    source_name: Mapped[str] = mapped_column(String(180), nullable=False)
    title: Mapped[str] = mapped_column(String(600), nullable=False)
    url: Mapped[str] = mapped_column(String(1200), nullable=False)
    published_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)
    risk_score: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    species: Mapped[str] = mapped_column(String(300), nullable=False, default="")
    state: Mapped[str] = mapped_column(String(120), nullable=False, default="")
    signal_strength: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)


class Watchlist(Base):
    __tablename__ = "watchlists"
    __table_args__ = (
        UniqueConstraint("keyword", name="uq_watchlists_keyword"),
        Index("ix_watchlists_enabled", "enabled"),
        Index("ix_watchlists_category", "category"),
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    keyword: Mapped[str] = mapped_column(String(120), nullable=False)
    enabled: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    category: Mapped[str] = mapped_column(String(60), nullable=False, default="threat")
