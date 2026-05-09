from app.services.setfit_classifier import CLASSIFIER_LABELS, SetFitClassifier


def test_setfit_classifier_returns_none_when_disabled() -> None:
    classifier = SetFitClassifier(enabled=False, model_path="")
    assert classifier.predict_score_map("tiger poaching incident") is None


def test_setfit_classifier_maps_probabilities() -> None:
    class _FakeModel:
        labels = ["wildlife poaching", "not wildlife crime"]

        @staticmethod
        def predict_proba(_texts):
            return [[0.82, 0.18]]

    classifier = SetFitClassifier(enabled=True, model_path="/tmp/model")
    classifier._model = _FakeModel()
    scores = classifier.predict_score_map("sample")
    assert scores is not None
    assert set(CLASSIFIER_LABELS).issubset(set(scores.keys()))
    assert scores["wildlife poaching"] == 0.82
    assert scores["not wildlife crime"] == 0.18
