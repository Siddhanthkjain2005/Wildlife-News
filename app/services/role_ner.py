from __future__ import annotations

from threading import Lock

from app.core.config import settings
from app.core.logger import get_logger

logger = get_logger("app.role_ner")

ROLE_LABELS = ["SUSPECT", "OFFICER", "NEWS_SOURCE", "ORGANIZATION"]


class RoleAwareNer:
    def __init__(self, *, enabled: bool, model_name: str, threshold: float) -> None:
        self.enabled = enabled
        self.model_name = model_name
        self.threshold = max(0.1, min(0.95, threshold))
        self._model = None
        self._lock = Lock()

    def _get_model(self):
        if self._model is not None:
            return self._model
        if not self.enabled:
            self._model = False
            return self._model
        with self._lock:
            if self._model is not None:
                return self._model
            try:
                from gliner import GLiNER

                self._model = GLiNER.from_pretrained(self.model_name)
            except Exception as err:  # noqa: BLE001
                logger.warning("GLiNER unavailable, falling back to legacy NER: %s", err)
                self._model = False
            return self._model

    def extract(self, text: str) -> list[dict[str, object]]:
        model = self._get_model()
        if model is False or not text.strip():
            return []
        try:
            entities = model.predict_entities(text, ROLE_LABELS, threshold=self.threshold)
        except Exception as err:  # noqa: BLE001
            logger.warning("GLiNER inference failed, using fallback NER: %s", err)
            return []

        parsed: list[dict[str, object]] = []
        for item in entities or []:
            label = str(item.get("label") or "").strip().upper()
            if label not in ROLE_LABELS:
                continue
            parsed.append(
                {
                    "text": str(item.get("text") or "").strip(),
                    "label": label,
                    "score": float(item.get("score") or 0.0),
                }
            )
        return parsed


role_ner = RoleAwareNer(
    enabled=bool(settings.gliner_enabled),
    model_name=settings.gliner_model_name,
    threshold=settings.gliner_threshold,
)
