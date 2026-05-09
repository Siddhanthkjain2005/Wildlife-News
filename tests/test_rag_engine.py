from app.services.rag_engine import RagEngine


class _FakeSearchEngine:
    def search(self, *_args, **_kwargs):
        return {
            "query": "ignored",
            "count": 2,
            "items": [
                {
                    "id": 11,
                    "title": "Red sanders seizure in Chittoor",
                    "summary": "Forest police intercepted transport of red sanders logs.",
                    "state": "andhra pradesh",
                    "district": "chittoor",
                    "species": "red sanders",
                    "crime_type": "red_sanders_smuggling",
                    "source": "The Hindu",
                    "published_at": "2026-05-09T00:00:00",
                    "similarity": 0.91,
                    "open_url": "/open/11",
                },
                {
                    "id": 22,
                    "title": "Timber gang route via Chennai",
                    "summary": "Officials suspect onward movement through Chennai port.",
                    "state": "tamil nadu",
                    "district": "chennai",
                    "species": "red sanders",
                    "crime_type": "smuggling",
                    "source": "Indian Express",
                    "published_at": "2026-05-08T00:00:00",
                    "similarity": 0.79,
                    "open_url": "/open/22",
                },
            ],
        }


def test_rag_engine_fallback_answer_uses_retrieval_context() -> None:
    engine = RagEngine(search_engine=_FakeSearchEngine(), enabled=False)
    result = engine.ask(db=None, query="What smuggling routes for red sanders?", limit=5)

    assert result["llm_used"] is False
    assert result["count"] == 2
    assert "red sanders" in result["answer"].lower()
    assert result["citations"][0]["id"] == 11


def test_rag_engine_prefers_llm_answer_when_available() -> None:
    class _FakeLlm:
        @staticmethod
        def create_completion(**_kwargs):
            return {"choices": [{"text": "Primary route is Chittoor to Chennai port [11][22]."}]}

    engine = RagEngine(search_engine=_FakeSearchEngine(), enabled=True, model_path="/tmp/model.gguf")
    engine._llm = _FakeLlm()
    result = engine.ask(db=None, query="route?", limit=5)

    assert result["llm_used"] is True
    assert "Chittoor" in result["answer"]
