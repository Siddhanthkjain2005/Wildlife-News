from __future__ import annotations

from threading import Lock

from app.core.config import settings
from app.core.logger import get_logger

logger = get_logger("app.setfit")

CLASSIFIER_LABELS = [
    "wildlife poaching",
    "wildlife smuggling",
    "illegal wildlife trade",
    "ivory trade",
    "tiger skin seizure",
    "rhino horn trafficking",
    "exotic bird trafficking",
    "illegal fishing",
    "forest hunting gang",
    "habitat destruction",
    "animal cruelty",
    "snake venom trade",
    "red sanders smuggling",
    "not wildlife crime",
    "incident in India",
    "incident outside India",
]


class SetFitClassifier:
    def __init__(self, *, enabled: bool, model_path: str) -> None:
        self.enabled = enabled
        self.model_path = model_path
        self._model = None
        self._lock = Lock()

    def _get_model(self):
        if self._model is not None:
            return self._model
        if not self.enabled or not self.model_path.strip():
            self._model = False
            return self._model
        with self._lock:
            if self._model is not None:
                return self._model
            try:
                from setfit import SetFitModel

                self._model = SetFitModel.from_pretrained(self.model_path.strip())
            except Exception as err:  # noqa: BLE001
                logger.warning("SetFit model unavailable, falling back to zero-shot: %s", err)
                self._model = False
            return self._model

    def predict_score_map(self, text: str) -> dict[str, float] | None:
        model = self._get_model()
        if model is False:
            return None
        try:
            probs = model.predict_proba([text])[0]
        except Exception as err:  # noqa: BLE001
            logger.warning("SetFit inference failed, falling back to zero-shot: %s", err)
            return None

        labels = [str(label) for label in getattr(model, "labels", CLASSIFIER_LABELS)]
        score_map = {label: 0.0 for label in CLASSIFIER_LABELS}
        for label, prob in zip(labels, probs):
            if label in score_map:
                score_map[label] = float(prob)
        return score_map


setfit_classifier = SetFitClassifier(
    enabled=bool(settings.setfit_enabled),
    model_path=settings.setfit_model_path,
)
