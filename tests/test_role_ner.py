from app.services.role_ner import RoleAwareNer


def test_role_ner_returns_empty_when_disabled() -> None:
    ner = RoleAwareNer(enabled=False, model_name="unused", threshold=0.6)
    assert ner.extract("Ravi Kumar was arrested.") == []


def test_role_ner_parses_supported_labels() -> None:
    class _FakeModel:
        @staticmethod
        def predict_entities(_text, _labels, threshold=0.6):
            assert threshold == 0.6
            return [
                {"text": "Ravi Kumar", "label": "SUSPECT", "score": 0.91},
                {"text": "Forest Department", "label": "ORGANIZATION", "score": 0.84},
                {"text": "Ignored", "label": "OTHER", "score": 0.9},
            ]

    ner = RoleAwareNer(enabled=True, model_name="fake", threshold=0.6)
    ner._model = _FakeModel()
    entities = ner.extract("dummy")
    assert len(entities) == 2
    assert entities[0]["label"] == "SUSPECT"
    assert entities[1]["label"] == "ORGANIZATION"
