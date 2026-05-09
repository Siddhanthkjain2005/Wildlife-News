from app.services.summarizer import IntelligenceSummarizer


def _summarizer(enabled: bool = False, model_path: str = "") -> IntelligenceSummarizer:
    return IntelligenceSummarizer(
        enabled=enabled,
        model_path=model_path,
        max_tokens=256,
        temperature=0.2,
    )


def _defaults() -> dict[str, object]:
    return {
        "article_text": "Forest officials seized tiger skin and arrested two accused in Bandipur.",
        "species": ["tiger"],
        "state": "karnataka",
        "district": "mysuru",
        "suspects": ["Ravi Kumar"],
        "crime_type": "poaching",
        "default_summary": "Template summary.",
        "default_points": ["Point A", "Point B"],
        "default_route": "Template route.",
        "default_recommendation": "Template recommendation.",
        "default_confidence_explanation": "Template confidence.",
    }


def test_generate_returns_fallback_when_disabled() -> None:
    summarizer = _summarizer(enabled=False)
    result = summarizer.generate(**_defaults())
    assert result["summary"] == "Template summary."
    assert result["key_facts"] == ["Point A", "Point B"]
    assert result["smuggling_route"] == "Template route."


def test_generate_uses_llm_json_when_available() -> None:
    class FakeLlm:
        @staticmethod
        def create_completion(**_: object) -> dict[str, object]:
            return {
                "choices": [
                    {
                        "text": (
                            '{"summary":"LLM summary","key_facts":["Fact 1"],'
                            '"smuggling_route":"Route X","recommendation":"Action Y",'
                            '"risk_factors":["Cross-border"],"confidence_explanation":"LLM confidence"}'
                        )
                    }
                ]
            }

    summarizer = _summarizer(enabled=True, model_path="/tmp/fake.gguf")
    summarizer._llm = FakeLlm()
    result = summarizer.generate(**_defaults())
    assert result["summary"] == "LLM summary"
    assert "Fact 1" in result["key_facts"]
    assert "Risk factor: Cross-border" in result["key_facts"]
    assert result["recommendation"] == "Action Y"
