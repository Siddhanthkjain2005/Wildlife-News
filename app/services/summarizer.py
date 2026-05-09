from __future__ import annotations

import json
from functools import lru_cache
from threading import Lock

from app.core.config import settings
from app.core.logger import get_logger

logger = get_logger("app.summarizer")


class IntelligenceSummarizer:
    def __init__(
        self,
        *,
        enabled: bool,
        model_path: str,
        max_tokens: int,
        temperature: float,
    ) -> None:
        self.enabled = enabled
        self.model_path = model_path
        self.max_tokens = max(64, max_tokens)
        self.temperature = max(0.0, min(1.0, temperature))
        self._lock = Lock()
        self._llm = None

    def _fallback_payload(
        self,
        *,
        default_summary: str,
        default_points: list[str],
        default_route: str,
        default_recommendation: str,
        default_confidence_explanation: str,
    ) -> dict[str, object]:
        return {
            "summary": default_summary,
            "key_facts": default_points,
            "smuggling_route": default_route,
            "recommendation": default_recommendation,
            "risk_factors": [],
            "confidence_explanation": default_confidence_explanation,
        }

    def _get_llm(self):
        if self._llm is not None:
            return self._llm
        if not self.enabled or not self.model_path.strip():
            self._llm = False
            return self._llm

        with self._lock:
            if self._llm is not None:
                return self._llm
            try:
                from llama_cpp import Llama

                self._llm = Llama(
                    model_path=self.model_path.strip(),
                    n_ctx=4096,
                    n_threads=4,
                    verbose=False,
                )
            except Exception as err:  # noqa: BLE001
                logger.warning("LLM summarizer unavailable, using fallback summaries: %s", err)
                self._llm = False
            return self._llm

    @staticmethod
    def _extract_json_object(raw: str) -> dict[str, object] | None:
        text = (raw or "").strip()
        if not text:
            return None
        if text.startswith("```"):
            text = text.strip("`").replace("json", "", 1).strip()
        start = text.find("{")
        end = text.rfind("}")
        if start < 0 or end <= start:
            return None
        candidate = text[start : end + 1]
        try:
            parsed = json.loads(candidate)
        except json.JSONDecodeError:
            return None
        if isinstance(parsed, dict):
            return parsed
        return None

    def generate(
        self,
        *,
        article_text: str,
        species: list[str],
        state: str,
        district: str,
        suspects: list[str],
        crime_type: str,
        default_summary: str,
        default_points: list[str],
        default_route: str,
        default_recommendation: str,
        default_confidence_explanation: str,
    ) -> dict[str, object]:
        fallback = self._fallback_payload(
            default_summary=default_summary,
            default_points=default_points,
            default_route=default_route,
            default_recommendation=default_recommendation,
            default_confidence_explanation=default_confidence_explanation,
        )

        llm = self._get_llm()
        if llm is False:
            return fallback

        prompt = (
            "You are a wildlife crime intelligence analyst. "
            "Return STRICT JSON with keys: summary, key_facts, smuggling_route, recommendation, risk_factors, extracted_species, extracted_location, extracted_suspects, confidence_explanation.\n\n"
            f"Article:\n{article_text[:4500]}\n\n"
            "Extracted facts:\n"
            f"- Crime type: {crime_type}\n"
            f"- Species: {', '.join(species) if species else 'unknown'}\n"
            f"- Location: {district or 'unknown'}, {state or 'unknown'}\n"
            f"- Suspects: {', '.join(suspects) if suspects else 'unknown'}\n"
            "If any facts are 'unknown', try to find them in the article text. "
            "Keep summary to 2-3 sentences and key_facts to <=6 bullets."
        )

        try:
            response = llm.create_completion(
                prompt=prompt,
                max_tokens=self.max_tokens,
                temperature=self.temperature,
                stop=["\n\n```"],
            )
            raw_text = str((response.get("choices") or [{}])[0].get("text") or "")
            parsed = self._extract_json_object(raw_text)
            if parsed is None:
                return fallback
        except Exception as err:  # noqa: BLE001
            logger.warning("LLM summary generation failed, using fallback: %s", err)
            return fallback

        summary = str(parsed.get("summary") or fallback["summary"]).strip()[:500]
        key_facts = parsed.get("key_facts")
        if isinstance(key_facts, list):
            points = [str(item).strip() for item in key_facts if str(item).strip()][:8]
        else:
            points = list(default_points)
        if not points:
            points = list(default_points)

        risk_factors = parsed.get("risk_factors")
        risk_points = [str(item).strip() for item in risk_factors] if isinstance(risk_factors, list) else []
        if risk_points:
            points.extend([f"Risk factor: {item}" for item in risk_points[:3]])

        return {
            "summary": summary or fallback["summary"],
            "key_facts": points[:8],
            "smuggling_route": str(parsed.get("smuggling_route") or fallback["smuggling_route"])[:500],
            "recommendation": str(parsed.get("recommendation") or fallback["recommendation"])[:500],
            "risk_factors": risk_points[:5],
            "extracted_species": parsed.get("extracted_species") or [],
            "extracted_location": str(parsed.get("extracted_location") or ""),
            "extracted_suspects": parsed.get("extracted_suspects") or [],
            "confidence_explanation": str(
                parsed.get("confidence_explanation") or fallback["confidence_explanation"]
            )[:500],
        }


@lru_cache
def get_intelligence_summarizer() -> IntelligenceSummarizer:
    return IntelligenceSummarizer(
        enabled=bool(settings.llm_summary_enabled),
        model_path=settings.llm_summary_model_path,
        max_tokens=settings.llm_summary_max_tokens,
        temperature=settings.llm_summary_temperature,
    )
