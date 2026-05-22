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
            "is_wildlife_poaching_incident": None,
            "suggested_confidence_score": None,
            "llm_classification_reason": "",
            "wpa_schedule": None,
            "wpa_section": "",
            "wpa_offence_type": "",
            "wpa_penalty_class": "",
            "protected_area_type": "",
            "enforcement_authority": "",
        }

    def _get_llm(self):
        if self._llm is not None:
            return self._llm
        if not self.enabled or not self.model_path.strip():
            logger.info("LLM summarizer DISABLED (enabled=%s, model_path=%r)", self.enabled, self.model_path)
            self._llm = False
            return self._llm

        with self._lock:
            if self._llm is not None:
                return self._llm
            try:
                import os
                if not os.path.isfile(self.model_path.strip()):
                    logger.error("LLM model file NOT FOUND at: %s", self.model_path.strip())
                    self._llm = False
                    return self._llm

                from llama_cpp import Llama

                import os
                threads_limit = max(1, min(2, os.cpu_count() or 1))
                logger.info("Loading LLM model from: %s (threads=%d)", self.model_path.strip(), threads_limit)
                self._llm = Llama(
                    model_path=self.model_path.strip(),
                    n_ctx=4096,
                    n_threads=threads_limit,
                    verbose=False,
                )
                logger.info("✅ LLM model loaded successfully!")
            except ImportError:
                logger.error("❌ llama-cpp-python is NOT installed! pip install llama-cpp-python>=0.2.90")
                self._llm = False
            except Exception as err:  # noqa: BLE001
                logger.error("❌ LLM summarizer failed to load: %s", err)
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

        # Dynamic token-based truncation: fit article precisely within the 4096-token context window.
        # Construct the prompt template text (excluding the dynamic article) to find its exact token count.
        template_text = (
            "You are a wildlife crime intelligence analyst for the Government of India. "
            "Return STRICT JSON with keys: "
            "is_wildlife_poaching_incident, suggested_confidence_score, llm_classification_reason, "
            "summary, key_facts, smuggling_route, recommendation, risk_factors, "
            "extracted_species, extracted_location, extracted_suspects, confidence_explanation, "
            "wpa_schedule, wpa_section, wpa_offence_type, wpa_penalty_class, protected_area_type, enforcement_authority.\n\n"
            "Article:\n\n\n"
            "Guidelines:\n"
            "1. 'is_wildlife_poaching_incident': Set to true only if this article describes a real, specific event of poaching, hunting, animal cruelty, smuggling, seizures, or illegal trade of wildlife parts in India. Set to false for general policy announcements, tourism safari updates, conservation successes, zoo updates, or opinions.\n"
            "2. 'suggested_confidence_score': Provide a rating from 0 to 100 representing how verified/factual the report is.\n"
            "3. 'llm_classification_reason': Brief sentence explaining why it is or is not an active wildlife crime incident.\n"
            "4. 'wpa_schedule': Extracted Indian Wildlife Protection Act 1972 schedule (one of: 'Schedule I', 'Schedule II', 'Schedule III', 'Schedule IV', 'Schedule V', 'Schedule VI', or 'Not Classified').\n"
            "5. 'wpa_section': Sections of the Wildlife Protection Act applicable (e.g. 'Section 9', 'Section 51', 'Section 51(1A)', 'Section 39', 'Section 49-B').\n"
            "6. 'wpa_offence_type': Type of WPA offence (e.g. 'Hunting', 'Possession', 'Illegal Trade', 'Plant Trade', etc.).\n"
            "7. 'wpa_penalty_class': Penalty severity (one of: 'severe', 'moderate', 'minor', or '').\n"
            "8. 'protected_area_type': Name and type of national park or sanctuary if mentioned (e.g. 'Bandipur National Park', or 'None / Not Applicable').\n"
            "9. 'enforcement_authority': Agency enforcing action (e.g. 'State Forest Department', 'Wildlife Crime Control Bureau (WCCB)', 'Local Police', or 'Local Police / Forest Dept.').\n"
            "10. Keep summary to 2-3 sentences and key_facts to <=6 bullets.\n"
            "11. 'extracted_suspects': Extract all involved persons, suspects, or perpetrators (e.g. poachers, smugglers, traders, buyers, or arrested individuals) mentioned by name in the article. Provide them as a JSON list of full names (e.g. ['Ramesh Kumar', 'Suresh Singh']). Do NOT extract names of forest officers, investigators, police officers, or department officials unless they are themselves accused of a crime.\n"
            "12. 'extracted_species': Extract all animal or plant species mentioned in the article that are victims of poaching, trafficking, seizure, or illegal trade. Provide them as a JSON list of lowercased common names (e.g. ['tiger', 'pangolin', 'red sanders']). Do NOT include generic terms like 'wildlife', 'animal', 'carcass', 'reptile', or 'bird'."
        )

        n_ctx = 4096
        truncated_article = article_text

        try:
            # Measure exact template tokens
            template_tokens = len(llm.tokenize(template_text.encode('utf-8')))
            # Available tokens for the article text itself, leaving a safe buffer of 35 tokens
            max_article_tokens = n_ctx - template_tokens - self.max_tokens - 35
            
            if max_article_tokens < 100:
                max_article_tokens = 500  # Safe minimum fallback

            article_tokens = llm.tokenize(article_text.encode('utf-8'))
            if len(article_tokens) > max_article_tokens:
                truncated_tokens = article_tokens[:max_article_tokens]
                truncated_article = llm.detokenize(truncated_tokens).decode('utf-8', errors='ignore') + "\n[...truncated]"
                logger.info("Exact token-based truncation: reduced article from %d tokens to %d tokens (template took %d, allowed max %d)", len(article_tokens), len(truncated_tokens), template_tokens, max_article_tokens)
        except Exception as e:
            logger.warning("Token-based truncation failed, falling back to conservative character limits: %s", e)
            # Safe character-based fallback (using 1.8 chars/token instead of 3.5 to prevent all overflows)
            available_for_article = n_ctx - 780 - self.max_tokens - 50
            max_article_chars = max(500, int(available_for_article * 1.8))
            truncated_article = article_text[:max_article_chars]
            if len(article_text) > max_article_chars:
                truncated_article += "\n[...truncated]"

        prompt = (
            "You are a wildlife crime intelligence analyst for the Government of India. "
            "Return STRICT JSON with keys: "
            "is_wildlife_poaching_incident, suggested_confidence_score, llm_classification_reason, "
            "summary, key_facts, smuggling_route, recommendation, risk_factors, "
            "extracted_species, extracted_location, extracted_suspects, confidence_explanation, "
            "wpa_schedule, wpa_section, wpa_offence_type, wpa_penalty_class, protected_area_type, enforcement_authority.\n\n"
            f"Article:\n{truncated_article}\n\n"
            "Guidelines:\n"
            "1. 'is_wildlife_poaching_incident': Set to true only if this article describes a real, specific event of poaching, hunting, animal cruelty, smuggling, seizures, or illegal trade of wildlife parts in India. Set to false for general policy announcements, tourism safari updates, conservation successes, zoo updates, or opinions.\n"
            "2. 'suggested_confidence_score': Provide a rating from 0 to 100 representing how verified/factual the report is.\n"
            "3. 'llm_classification_reason': Brief sentence explaining why it is or is not an active wildlife crime incident.\n"
            "4. 'wpa_schedule': Extracted Indian Wildlife Protection Act 1972 schedule (one of: 'Schedule I', 'Schedule II', 'Schedule III', 'Schedule IV', 'Schedule V', 'Schedule VI', or 'Not Classified').\n"
            "5. 'wpa_section': Sections of the Wildlife Protection Act applicable (e.g. 'Section 9', 'Section 51', 'Section 51(1A)', 'Section 39', 'Section 49-B').\n"
            "6. 'wpa_offence_type': Type of WPA offence (e.g. 'Hunting', 'Possession', 'Illegal Trade', 'Plant Trade', etc.).\n"
            "7. 'wpa_penalty_class': Penalty severity (one of: 'severe', 'moderate', 'minor', or '').\n"
            "8. 'protected_area_type': Name and type of national park or sanctuary if mentioned (e.g. 'Bandipur National Park', or 'None / Not Applicable').\n"
            "9. 'enforcement_authority': Agency enforcing action (e.g. 'State Forest Department', 'Wildlife Crime Control Bureau (WCCB)', 'Local Police', or 'Local Police / Forest Dept.').\n"
            "10. Keep summary to 2-3 sentences and key_facts to <=6 bullets.\n"
            "11. 'extracted_suspects': Extract all involved persons, suspects, or perpetrators (e.g. poachers, smugglers, traders, buyers, or arrested individuals) mentioned by name in the article. Provide them as a JSON list of full names (e.g. ['Ramesh Kumar', 'Suresh Singh']). Do NOT extract names of forest officers, investigators, police officers, or department officials unless they are themselves accused of a crime.\n"
            "12. 'extracted_species': Extract all animal or plant species mentioned in the article that are victims of poaching, trafficking, seizure, or illegal trade. Provide them as a JSON list of lowercased common names (e.g. ['tiger', 'pangolin', 'red sanders']). Do NOT include generic terms like 'wildlife', 'animal', 'carcass', 'reptile', or 'bird'."
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

        # Parse new validation keys
        is_incident = parsed.get("is_wildlife_poaching_incident")
        if is_incident is not None:
            is_incident = bool(is_incident)
            
        suggested_score = parsed.get("suggested_confidence_score")
        if suggested_score is not None:
            try:
                suggested_score = float(suggested_score)
            except (ValueError, TypeError):
                suggested_score = None
                
        classification_reason = str(parsed.get("llm_classification_reason") or "").strip()

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
            "is_wildlife_poaching_incident": is_incident,
            "suggested_confidence_score": suggested_score,
            "llm_classification_reason": classification_reason,
            "wpa_schedule": str(parsed.get("wpa_schedule") or "").strip(),
            "wpa_section": str(parsed.get("wpa_section") or "").strip(),
            "wpa_offence_type": str(parsed.get("wpa_offence_type") or "").strip(),
            "wpa_penalty_class": str(parsed.get("wpa_penalty_class") or "").strip(),
            "protected_area_type": str(parsed.get("protected_area_type") or "").strip(),
            "enforcement_authority": str(parsed.get("enforcement_authority") or "").strip(),
        }



@lru_cache
def get_intelligence_summarizer() -> IntelligenceSummarizer:
    return IntelligenceSummarizer(
        enabled=bool(settings.llm_summary_enabled),
        model_path=settings.llm_summary_model_path,
        max_tokens=settings.llm_summary_max_tokens,
        temperature=settings.llm_summary_temperature,
    )
