"""Compatibility shim for legacy imports."""

from app.services.collector import NewsCollector, RawArticle

__all__ = ["NewsCollector", "RawArticle"]
