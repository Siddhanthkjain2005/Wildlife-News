"""Compatibility shim for legacy AI imports."""

from dataclasses import dataclass

from app.services.intelligence import HybridIntelligenceEngine, IntelligenceResult


@dataclass
class ClassificationResult:
    is_poaching: bool
    is_india: bool
    score: float
    reason: str


class AINewsFilter:
    """Backward-compatible adapter over the new intelligence engine."""

    def __init__(self) -> None:
        self.engine = HybridIntelligenceEngine()

    def classify(self, title: str, summary: str) -> ClassificationResult:
        result = self.engine.analyze(title=title, summary=summary)
        return ClassificationResult(
            is_poaching=result.is_poaching,
            is_india=result.is_india,
            score=result.confidence,
            reason=result.reason,
        )


__all__ = ["ClassificationResult", "AINewsFilter", "HybridIntelligenceEngine", "IntelligenceResult"]
