from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Index, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Report(Base):
    __tablename__ = "reports"
    __table_args__ = (
        UniqueConstraint("news_id", name="uq_reports_news_id"),
        Index("ix_reports_generated_at", "generated_at"),
        Index("ix_reports_news_id", "news_id"),
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    news_id: Mapped[int] = mapped_column(ForeignKey("news_items.id"), nullable=False)
    summary: Mapped[str] = mapped_column(String(500), nullable=False, default="")
    intel_points: Mapped[str] = mapped_column(Text, nullable=False, default="[]")
    recommendation: Mapped[str] = mapped_column(String(500), nullable=False, default="")
    route_hypothesis: Mapped[str] = mapped_column(String(500), nullable=False, default="")
    confidence_reason: Mapped[str] = mapped_column(String(500), nullable=False, default="")
    generated_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)
