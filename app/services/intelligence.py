from __future__ import annotations

import json
import re
from dataclasses import asdict, dataclass
from threading import Lock

from transformers import pipeline

from app.core.config import settings
from app.core.logger import get_logger
from app.utils.location_data import DISTRICT_TO_STATE, INDIA_STATES
from app.utils.text_utils import first_sentence, normalize_space

logger = get_logger("app.intelligence")


CRIME_TYPES: dict[str, set[str]] = {
    "poaching": {"poaching", "poached", "hunted", "shikar", "illegal hunting", "snaring"},
    "smuggling": {"smuggling", "trafficking", "interstate transport", "cross-border"},
    "illegal_wildlife_trade": {"wildlife trade", "illegal wildlife trade", "trade network", "online sale"},
    "ivory_trade": {"ivory", "tusk", "elephant tusk"},
    "tiger_skin_seizure": {"tiger skin", "tiger hide", "tiger pelt"},
    "rhino_horn_trafficking": {"rhino horn", "rhinoceros horn"},
    "exotic_bird_trafficking": {"exotic bird", "parrot trafficking", "macaw", "cockatoo"},
    "illegal_fishing": {"illegal fishing", "blast fishing", "dynamite fishing"},
    "forest_hunting_gang": {"hunting gang", "poaching gang", "racket", "syndicate", "cartel", "network"},
}

SPECIES_KEYWORDS: dict[str, set[str]] = {
    "tiger": {"tiger", "tigress", "big cat"},
    "leopard": {"leopard", "panther"},
    "elephant": {"elephant", "tusk", "ivory"},
    "rhino": {"rhino", "rhinoceros"},
    "pangolin": {"pangolin", "scales"},
    "bear": {"bear"},
    "deer": {"deer", "sambar", "chital", "antler"},
    "bird": {"parrot", "owl", "eagle", "hornbill", "falcon", "macaw", "cockatoo", "bird"},
    "reptile": {"python", "cobra", "turtle", "tortoise", "gecko", "lizard"},
    "marine": {"shark", "ray", "sea cucumber", "illegal fishing"},
}

FALSE_POSITIVE_PATTERNS = [
    r"\bpoached eggs?\b",
    r"\brecipe\b",
    r"\bcooking\b",
    r"\brestaurant\b",
]

NETWORK_PATTERNS = [
    r"\bgang\b",
    r"\bracket\b",
    r"\bsyndicate\b",
    r"\bnetwork\b",
    r"\binterstate\b",
    r"\bcross[- ]?border\b",
    r"\borganized\b",
]

ARTICLE_SIGNAL_TERMS = {
    "seized",
    "seizure",
    "arrested",
    "arrest",
    "poacher",
    "wildlife crime",
    "forest officials",
    "wccb",
    "customs",
    "raid",
    "contraband",
    "trafficker",
    "skins",
    "horns",
    "ivory",
    "scales",
}

STATE_ALIASES = {
    "mp": "madhya pradesh",
    "up": "uttar pradesh",
    "tn": "tamil nadu",
    "wb": "west bengal",
    "jk": "jammu and kashmir",
    "delhi ncr": "delhi",
    "orissa": "odisha",
}


@dataclass
class IntelligenceResult:
    is_poaching: bool
    is_india: bool
    confidence: float
    risk_score: int
    crime_type: str
    species: list[str]
    state: str
    district: str
    location: str
    network_indicator: bool
    repeat_indicator: bool
    summary: str
    intel_points: list[str]
    likely_smuggling_route: str
    enforcement_recommendation: str
    confidence_explanation: str
    reason: str

    def to_record(self) -> dict[str, object]:
        payload = asdict(self)
        payload["species"] = ", ".join(self.species)
        payload["intel_points"] = json.dumps(self.intel_points, ensure_ascii=False)
        return payload


class HybridIntelligenceEngine:
    def __init__(self) -> None:
        self._classifier = None
        self._lock = Lock()
        self._model_ready = False

    @property
    def model_ready(self) -> bool:
        return self._model_ready

    def warmup(self) -> bool:
        try:
            classifier = self._get_classifier()
            _ = classifier(
                "Wildlife officers seized tiger skin in Karnataka.",
                candidate_labels=[
                    "wildlife poaching",
                    "illegal wildlife trade",
                    "not wildlife crime",
                    "incident in India",
                    "incident outside India",
                ],
                hypothesis_template="This report concerns {}.",
                multi_label=True,
            )
            self._model_ready = True
            return True
        except Exception as err:
            logger.error("Model warmup failed: %s", err)
            self._model_ready = False
            return False

    def _get_classifier(self):
        if self._classifier is None:
            with self._lock:
                if self._classifier is None:
                    self._classifier = pipeline(
                        "zero-shot-classification",
                        model=settings.model_name,
                    )
        return self._classifier

    @staticmethod
    def _has_false_positive(text: str) -> bool:
        return any(re.search(pattern, text) for pattern in FALSE_POSITIVE_PATTERNS)

    @staticmethod
    def _keyword_crime_scores(text: str) -> tuple[str, float]:
        best_type = "unknown"
        best_score = 0.0
        for crime_type, keywords in CRIME_TYPES.items():
            hits = sum(1 for keyword in keywords if keyword in text)
            score = min(1.0, hits * 0.25)
            if score > best_score:
                best_type = crime_type
                best_score = score
        return best_type, best_score

    @staticmethod
    def _keyword_signal_hits(text: str) -> int:
        hits = 0
        for keywords in CRIME_TYPES.values():
            for keyword in keywords:
                if keyword in text:
                    hits += 1
        for keyword in ARTICLE_SIGNAL_TERMS:
            if keyword in text:
                hits += 1
        return hits

    @staticmethod
    def _extract_species(text: str) -> list[str]:
        species_hits = []
        for species, keywords in SPECIES_KEYWORDS.items():
            if any(keyword in text for keyword in keywords):
                species_hits.append(species)
        return species_hits

    @staticmethod
    def _extract_location(text: str) -> tuple[str, str, str]:
        district = ""
        state = ""
        for district_name, mapped_state in DISTRICT_TO_STATE.items():
            if district_name in text:
                district = district_name
                state = mapped_state
                break
        if not state:
            for state_name in INDIA_STATES:
                if state_name in text:
                    state = state_name
                    break
        if not state:
            for alias, mapped in STATE_ALIASES.items():
                if re.search(rf"\b{re.escape(alias)}\b", text):
                    state = mapped
                    break
        if district and state:
            location = f"{district.title()}, {state.title()}"
        elif state:
            location = state.title()
        else:
            location = "India" if "india" in text or "bharat" in text else ""
        return state, district, location

    @staticmethod
    def _is_india(text: str, state: str, district: str, india_prob: float, outside_prob: float) -> tuple[bool, float]:
        rule_score = 0.0
        if "india" in text or "bharat" in text:
            rule_score += 0.5
        if state:
            rule_score += 0.35
        if district:
            rule_score += 0.25
        rule_score = min(1.0, rule_score)
        india_score = min(1.0, 0.65 * india_prob + 0.35 * rule_score)
        is_india = india_score >= settings.india_threshold and india_score >= (outside_prob - 0.05)
        return is_india, india_score

    @staticmethod
    def _network_indicator(text: str) -> bool:
        return any(re.search(pattern, text) for pattern in NETWORK_PATTERNS)

    @staticmethod
    def _compute_risk(confidence: float, species: list[str], network_indicator: bool, repeat_indicator: bool) -> int:
        score = confidence * 70
        if any(sp in {"tiger", "rhino", "elephant"} for sp in species):
            score += 12
        if network_indicator:
            score += 10
        if repeat_indicator:
            score += 8
        return max(0, min(100, int(round(score))))

    @staticmethod
    def _build_summary(title: str, body: str, crime_type: str, species: list[str], location: str) -> str:
        line1 = normalize_space(title)
        species_text = ", ".join(species) if species else "unknown species"
        where = location or "unspecified location"
        line2 = f"Likely {crime_type.replace('_', ' ')} involving {species_text} near {where}."
        return f"{line1}\n{line2}"

    @staticmethod
    def _build_intel_points(
        crime_type: str,
        species: list[str],
        state: str,
        district: str,
        network_indicator: bool,
        repeat_indicator: bool,
        confidence: float,
        risk_score: int,
    ) -> list[str]:
        points = [
            f"Crime type signal: {crime_type.replace('_', ' ')}",
            f"Confidence: {confidence:.2f}; Risk score: {risk_score}/100",
            f"Species detected: {', '.join(species) if species else 'not explicit'}",
            f"Location signal: district={district or 'unknown'}, state={state or 'unknown'}",
        ]
        if network_indicator:
            points.append("Organized network indicator detected from text patterns.")
        if repeat_indicator:
            points.append("Repeat-indicator triggered from prior district/source pattern.")
        return points

    @staticmethod
    def _likely_smuggling_route(state: str, district: str, network_indicator: bool) -> str:
        state_norm = (state or "").strip().lower()
        district_norm = (district or "").strip().lower()
        if not state_norm:
            return "Potential interstate movement route not yet clear."
        border_hubs = {"assam", "west bengal", "sikkim", "arunachal pradesh", "nagaland", "manipur", "mizoram", "tripura", "jammu and kashmir", "ladakh", "punjab", "rajasthan", "gujarat"}
        coastal_hubs = {"kerala", "tamil nadu", "andhra pradesh", "goa", "maharashtra", "odisha", "west bengal", "gujarat"}
        if state_norm in border_hubs:
            base = "Likely border-linked corridor into interstate or cross-border trafficking chain."
        elif state_norm in coastal_hubs:
            base = "Likely coastal transit route through transport and port-linked channels."
        else:
            base = "Likely inland interstate movement through road and rail logistics corridors."
        if network_indicator:
            return f"{base} District signal: {district_norm.title() if district_norm else 'unspecified'} indicates organized relay movement."
        return base

    @staticmethod
    def _enforcement_recommendation(
        risk_score: int,
        species: list[str],
        state: str,
        district: str,
        network_indicator: bool,
        repeat_indicator: bool,
    ) -> str:
        location = f"{state.title() if state else 'Unknown'} / {district.title() if district else 'Unknown'}"
        if risk_score >= 90 or network_indicator:
            return f"Immediate joint operation in {location}; activate cyber-trade tracing, highway checkpoints, and coordinated arrests."
        if any(sp in {"tiger", "rhino", "elephant"} for sp in species):
            return f"Deploy priority-species response in {location}; verify informant leads and conduct market-to-transit seizure checks."
        if repeat_indicator:
            return f"Escalate district surveillance in {location}; initiate repeat-offender intelligence brief with forest and police units."
        if risk_score >= 70:
            return f"Run focused field verification and preventive patrol in {location}; monitor handlers and transport nodes."
        return f"Maintain watchlist monitoring and local patrol alert in {location}."

    @staticmethod
    def _confidence_explanation(
        poach_prob: float,
        rule_score: float,
        india_score: float,
        confidence: float,
        species_hits: int,
        network_indicator: bool,
        repeat_indicator: bool,
    ) -> str:
        return (
            f"Model confidence={confidence:.2f} (poaching signal={poach_prob:.2f}, rule score={rule_score:.2f}, india score={india_score:.2f}); "
            f"species_hits={species_hits}, network_indicator={int(network_indicator)}, repeat_indicator={int(repeat_indicator)}."
        )

    def analyze(
        self,
        *,
        title: str,
        summary: str,
        prior_district_hits: int = 0,
        prior_source_hits: int = 0,
    ) -> IntelligenceResult:
        text = normalize_space(f"{title}. {summary}").lower()
        if not text:
            return IntelligenceResult(
                is_poaching=False,
                is_india=False,
                confidence=0.0,
                risk_score=0,
                crime_type="unknown",
                species=[],
                state="",
                district="",
                location="",
                network_indicator=False,
                repeat_indicator=False,
                summary=normalize_space(title),
                intel_points=["Suppressed due to empty text."],
                likely_smuggling_route="Insufficient intelligence signal.",
                enforcement_recommendation="No action. Treat as non-incident.",
                confidence_explanation="Suppressed because content is empty.",
                reason="empty",
            )

        classifier = self._get_classifier()
        zs = classifier(
            text,
            candidate_labels=[
                "wildlife poaching",
                "wildlife smuggling",
                "illegal wildlife trade",
                "ivory trade",
                "tiger skin seizure",
                "rhino horn trafficking",
                "exotic bird trafficking",
                "illegal fishing",
                "forest hunting gang",
                "not wildlife crime",
                "incident in India",
                "incident outside India",
            ],
            hypothesis_template="This report concerns {}.",
            multi_label=True,
        )
        score_map = dict(zip(zs["labels"], zs["scores"]))
        poach_prob = max(
            score_map.get("wildlife poaching", 0.0),
            score_map.get("wildlife smuggling", 0.0),
            score_map.get("illegal wildlife trade", 0.0),
            score_map.get("ivory trade", 0.0),
            score_map.get("tiger skin seizure", 0.0),
            score_map.get("rhino horn trafficking", 0.0),
            score_map.get("exotic bird trafficking", 0.0),
            score_map.get("illegal fishing", 0.0),
            score_map.get("forest hunting gang", 0.0),
        )

        rule_crime_type, rule_score = self._keyword_crime_scores(text)
        keyword_hits = self._keyword_signal_hits(text)
        species = self._extract_species(text)
        state, district, location = self._extract_location(text)
        network_indicator = self._network_indicator(text)
        repeat_indicator = prior_district_hits >= 2 or prior_source_hits >= 4
        has_false_positive = self._has_false_positive(text)
        strong_rule_signal = (
            rule_score >= 0.5
            or keyword_hits >= 3
            or (len(species) > 0 and (poach_prob >= 0.45 or network_indicator))
        )

        # Choose crime type from strongest zero-shot crime label, fallback to rule.
        zs_crime = max(
            (
                "poaching",
                score_map.get("wildlife poaching", 0.0),
            ),
            ("smuggling", score_map.get("wildlife smuggling", 0.0)),
            ("illegal_wildlife_trade", score_map.get("illegal wildlife trade", 0.0)),
            ("ivory_trade", score_map.get("ivory trade", 0.0)),
            ("tiger_skin_seizure", score_map.get("tiger skin seizure", 0.0)),
            ("rhino_horn_trafficking", score_map.get("rhino horn trafficking", 0.0)),
            ("exotic_bird_trafficking", score_map.get("exotic bird trafficking", 0.0)),
            ("illegal_fishing", score_map.get("illegal fishing", 0.0)),
            ("forest_hunting_gang", score_map.get("forest hunting gang", 0.0)),
            key=lambda item: item[1],
        )[0]
        crime_type = zs_crime if score_map.get("not wildlife crime", 0.0) < 0.75 else "unknown"
        if crime_type == "unknown":
            crime_type = rule_crime_type
        if crime_type == "unknown" and (poach_prob >= 0.55 or keyword_hits >= 4):
            crime_type = "poaching"

        confidence = min(1.0, (0.65 * poach_prob) + (0.35 * rule_score))
        confidence = min(1.0, confidence + min(0.09, keyword_hits * 0.015))
        if species:
            confidence = min(1.0, confidence + 0.05)
        if network_indicator:
            confidence = min(1.0, confidence + 0.03)

        is_india, india_score = self._is_india(
            text=text,
            state=state,
            district=district,
            india_prob=score_map.get("incident in India", 0.0),
            outside_prob=score_map.get("incident outside India", 0.0),
        )
        if not is_india and (state or district) and strong_rule_signal:
            is_india = True
            india_score = max(india_score, settings.india_threshold)

        not_wildlife_prob = score_map.get("not wildlife crime", 0.0)
        baseline_accept = confidence >= settings.ai_threshold and crime_type != "unknown"
        fallback_accept = (
            crime_type != "unknown"
            and not_wildlife_prob < 0.78
            and strong_rule_signal
            and poach_prob >= 0.28
        )
        is_poaching = baseline_accept or fallback_accept
        if has_false_positive and keyword_hits < 2 and poach_prob < 0.45 and not network_indicator:
            is_poaching = False

        risk_score = self._compute_risk(
            confidence=confidence,
            species=species,
            network_indicator=network_indicator,
            repeat_indicator=repeat_indicator,
        )
        summary_text = self._build_summary(title, summary, crime_type, species, location)
        intel_points = self._build_intel_points(
            crime_type=crime_type,
            species=species,
            state=state,
            district=district,
            network_indicator=network_indicator,
            repeat_indicator=repeat_indicator,
            confidence=confidence,
            risk_score=risk_score,
        )
        likely_smuggling_route = self._likely_smuggling_route(
            state=state,
            district=district,
            network_indicator=network_indicator,
        )
        enforcement_recommendation = self._enforcement_recommendation(
            risk_score=risk_score,
            species=species,
            state=state,
            district=district,
            network_indicator=network_indicator,
            repeat_indicator=repeat_indicator,
        )
        confidence_explanation = self._confidence_explanation(
            poach_prob=poach_prob,
            rule_score=rule_score,
            india_score=india_score,
            confidence=confidence,
            species_hits=len(species),
            network_indicator=network_indicator,
            repeat_indicator=repeat_indicator,
        )

        reason = (
            f"poach_prob={poach_prob:.2f}, rule_score={rule_score:.2f}, keyword_hits={keyword_hits}, "
            f"india_score={india_score:.2f}, confidence={confidence:.2f}, not_wildlife={not_wildlife_prob:.2f}"
        )
        return IntelligenceResult(
            is_poaching=is_poaching,
            is_india=is_india,
            confidence=confidence,
            risk_score=risk_score,
            crime_type=crime_type,
            species=species,
            state=state,
            district=district,
            location=location,
            network_indicator=network_indicator,
            repeat_indicator=repeat_indicator,
            summary=summary_text[:500],
            intel_points=intel_points,
            likely_smuggling_route=likely_smuggling_route[:500],
            enforcement_recommendation=enforcement_recommendation[:500],
            confidence_explanation=confidence_explanation[:500],
            reason=reason[:300],
        )
