import pytest

from app.services.intelligence import HybridIntelligenceEngine


@pytest.fixture
def intelligence_engine() -> HybridIntelligenceEngine:
    return HybridIntelligenceEngine()
