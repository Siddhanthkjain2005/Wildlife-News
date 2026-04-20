from __future__ import annotations

import json
import re
from dataclasses import asdict, dataclass
from threading import Lock

try:
    from transformers import pipeline as hf_pipeline
except Exception as import_error:  # pragma: no cover - optional dependency path
    hf_pipeline = None
    _TRANSFORMERS_IMPORT_ERROR = import_error
else:
    _TRANSFORMERS_IMPORT_ERROR = None

from app.core.config import settings
from app.core.logger import get_logger
from app.utils.location_data import DISTRICT_TO_STATE, INDIA_STATES
from app.utils.text_utils import first_sentence, normalize_space

logger = get_logger("app.intelligence")


CRIME_TYPES: dict[str, set[str]] = {
    "poaching": {
        "poaching",
        "poached",
        "hunted",
        "shikar",
        "illegal hunting",
        "snaring",
        "वन्यजीव शिकार",
        "वन्यजीव शिकारी",
        "ಕಳ್ಳಬೇಟೆ",
        "வனவிலங்கு வேட்டை",
        "వన్యప్రాణి వేట",
        "বন্যপ্রাণী শিকার",
        "বন্যপ্ৰাণী চোৰাশিকার",
        "جنگلی حیات کا شکار",
        "ବନ୍ୟଜୀବ ଶିକାର",
        "વન્યજીવ શિકાર",
        "ਜੰਗਲੀ ਜੀਵ ਸ਼ਿਕਾਰ",
    },
    "smuggling": {
        "smuggling",
        "trafficking",
        "interstate transport",
        "cross-border",
        "वन्यजीव तस्करी",
        "तस्करी",
        "ಕಳ್ಳಸಾಗಣೆ",
        "விலங்கு கடத்தல்",
        "అక్రమ వన్యప్రాణి రవాణా",
        "বন্যপ্রাণী পাচার",
        "বন্যপ্ৰাণী সৰবৰাহ",
        "جنگلی حیات اسمگلنگ",
        "ବନ୍ୟଜୀବ ତସକରି",
        "વન્યજીવ તસ્કરી",
        "ਜੰਗਲੀ ਜੀਵ ਤਸਕਰੀ",
    },
    "illegal_wildlife_trade": {
        "wildlife trade",
        "illegal wildlife trade",
        "trade network",
        "online sale",
        "वन्यजीव व्यापार",
        "अवैध वन्यजीव व्यापार",
        "वन्यजीव अपराध",
    },
    "ivory_trade": {
        "ivory",
        "tusk",
        "elephant tusk",
        "हाथी दांत",
        "हस्तीदंत",
        "ആനക്കൊമ്പ്",
        "হাতির দাঁত",
        "হাতীদাঁত",
        "ਹਾਥੀ ਦਾਂਤ",
        "ہاتھی دانت",
        "ହାତୀଦାନ୍ତ",
        "હાથીદાંત",
    },
    "tiger_skin_seizure": {"tiger skin", "tiger hide", "tiger pelt"},
    "rhino_horn_trafficking": {"rhino horn", "rhinoceros horn"},
    "exotic_bird_trafficking": {"exotic bird", "parrot trafficking", "macaw", "cockatoo"},
    "illegal_fishing": {"illegal fishing", "blast fishing", "dynamite fishing"},
    "forest_hunting_gang": {"hunting gang", "poaching gang", "racket", "syndicate", "cartel", "network"},
}

SPECIES_KEYWORDS: dict[str, set[str]] = {
    "tiger": {"tiger", "tigress", "big cat", "बाघ", "व्याघ्र", "ಹುಲಿ", "புலி", "పులి", "বাঘ", "বাঘ", "ਬਾਘ", "شیر", "ବାଘ", "વાઘ"},
    "leopard": {"leopard", "panther"},
    "elephant": {"elephant", "tusk", "ivory", "हाथी", "ಆನೆ", "யானை", "ఏనుగు", "হাতি", "হাতী", "ہاتھی", "ହାତୀ", "હાથી"},
    "rhino": {"rhino", "rhinoceros", "गैंडा", "ಖಡ್ಗಮೃಗ", "காண்டாமிருகம்", "ఖడ్గమృగం", "গণ্ডার", "گینڈا", "ଗଣ୍ଡମୃଗ", "ગેંડો"},
    "pangolin": {"pangolin", "scales", "पैंगोलिन", "ಪ್ಯಾಂಗೋಲಿನ್", "பாங்கோலின்", "ప్యాంగోలిన్", "প্যাঙ্গোলিন", "پینگولن", "ପ୍ୟାଙ୍ଗୋଲିନ", "પેંગોલિન"},
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
    "गिरफ्तार",
    "गिरफ़्तार",
    "जब्त",
    "जप्त",
    "ಬಂಧನ",
    "ವಶ",
    "கைது",
    "பறிமுதல்",
    "అరెస్ట్",
    "సీజ్",
    "গ্রেফতার",
    "জব্দ",
    "گرفتار",
    "ضبط",
    "ଗିରଫ",
    "ଜବତ",
    "પકડાયો",
    "જપ્ત",
    "ਗ੍ਰਿਫ਼ਤਾਰ",
    "ਜ਼ਬਤ",
}

INDIA_HINT_TERMS = {
    "india",
    "bharat",
    "भारत",
    "ಭಾರತ",
    "இந்தியா",
    "భారత్",
    "ভারত",
    "ভাৰত",
    "ഭാരത",
    "بھارت",
    "ଭାରତ",
    "ભારત",
    "ਭਾਰਤ",
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

DISTRICT_ALIASES = {
    "navi mumbai": "maharashtra",
    "virar": "maharashtra",
    "palghar": "maharashtra",
    "greater noida": "uttar pradesh",
}

PERSON_EXTRACTION_PATTERNS = [
    re.compile(
        r"\b(?:arrested|held|detained|booked|nabbed|caught|identified|named)\s+"
        r"(?:the\s+)?(?:alleged\s+)?(?:poacher(?:s)?|trafficker(?:s)?|suspect(?:s)?|accused)?\s*"
        r"(?:named|identified as)?\s*([A-Z][A-Za-z.'-]*(?:\s+[A-Z][A-Za-z.'-]*){0,3})\b"
    ),
    re.compile(
        r"\b([A-Z][A-Za-z.'-]*(?:\s+[A-Z][A-Za-z.'-]*){0,3})\s+"
        r"(?:was|were)?\s*(?:arrested|held|detained|booked|nabbed|accused|named|identified)\b"
    ),
    re.compile(r"\bidentified as\s+([A-Z][A-Za-z.'-]*(?:\s+[A-Z][A-Za-z.'-]*){0,3})\b"),
    re.compile(
        r"\b(?:named|identified as|arrested)\s+"
        r"([A-Z][A-Za-z.'-]*(?:\s+[A-Z][A-Za-z.'-]*){0,3}"
        r"(?:\s*(?:,|and|&)\s*[A-Z][A-Za-z.'-]*(?:\s+[A-Z][A-Za-z.'-]*){0,3}){1,4})\b"
    ),
]

PERSON_NAME_STOPWORDS = {
    "forest",
    "official",
    "officials",
    "officer",
    "officers",
    "police",
    "department",
    "court",
    "customs",
    "wildlife",
    "crime",
    "bureau",
    "wccb",
    "team",
    "unit",
    "staff",
    "agency",
    "branch",
    "station",
    "range",
    "times",
    "india",
    "suspect",
    "suspects",
    "accused",
    "poacher",
    "poachers",
    "man",
    "men",
    "woman",
    "women",
    "person",
    "persons",
    "unknown",
    "case",
    "fir",
    "number",
    "no",
    "crimebranch",
}

PERSON_ACTION_TERMS = {
    "arrested",
    "detained",
    "held",
    "booked",
    "nabbed",
    "caught",
    "identified",
    "named",
    "accused",
    "गिरफ्तार",
    "गिरफ़्तार",
    "ಬಂಧನ",
    "ಬಂಧಿಸಲಾಗಿದೆ",
    "கைது",
    "அடையாளம்",
    "అరెస్ట్",
    "గుర్తించారు",
    "গ্রেফতার",
    "আটক",
    "گرفتار",
    "حراست",
    "ଗିରଫ",
    "ଚିହ୍ନଟ",
    "પકડાયો",
    "ધીરપકડ",
    "ਗ੍ਰਿਫ਼ਤਾਰ",
    "ਹਿਰਾਸਤ",
}

PERSON_CONTEXT_TERMS = {
    *PERSON_ACTION_TERMS,
    "poacher",
    "poachers",
    "trafficker",
    "traffickers",
    "suspect",
    "suspects",
    "wildlife crime",
    "smuggling",
    "seizure",
    "raid",
}

GEO_STOP_TERMS = {
    *INDIA_STATES,
    *DISTRICT_TO_STATE.keys(),
    *DISTRICT_ALIASES.keys(),
    *STATE_ALIASES.keys(),
}

SPECIES_STOP_TERMS = {
    species.lower() for species in SPECIES_KEYWORDS
} | {
    alias.lower()
    for aliases in SPECIES_KEYWORDS.values()
    for alias in aliases
}

AGENCY_TERMS = [
    "wccb",
    "wildlife crime control bureau",
    "forest department",
    "forest officials",
    "forest officer",
    "customs",
    "police",
    "stf",
    "crime branch",
    "railway protection force",
]

QUANTITY_PATTERN = re.compile(
    r"\b\d+(?:\.\d+)?\s?(?:kg|kgs|kilograms?|gm|grams?|tonnes?|pieces?|skins?|horns?|tusks?|animals?|birds?|scales?)\b",
    re.IGNORECASE,
)
MONEY_PATTERN = re.compile(r"(?:₹|rs\.?|inr)\s?\d[\d,]*(?:\.\d+)?(?:\s?(?:lakh|crore|million))?", re.IGNORECASE)
CASE_REF_PATTERN = re.compile(r"\b(?:fir|case)\s*(?:no|number)?\.?\s*[:#-]?\s*[A-Za-z0-9/-]{3,20}\b", re.IGNORECASE)
VEHICLE_REF_PATTERN = re.compile(r"\b[A-Z]{2}\s?\d{1,2}\s?[A-Z]{1,3}\s?\d{3,4}\b")


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
    involved_persons: list[str]
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
        self._person_ner = None
        self._lock = Lock()
        self._model_ready = False
        self._logged_fallback_notice = False
        self._logged_ner_notice = False

    @property
    def model_ready(self) -> bool:
        return self._model_ready

    def warmup(self) -> bool:
        try:
            classifier = self._get_classifier()
            if classifier is False:
                self._model_ready = False
                return False
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
        if self._classifier is False:
            return self._classifier
        if self._classifier is None:
            with self._lock:
                if self._classifier is None:
                    if hf_pipeline is None:
                        if not self._logged_fallback_notice:
                            logger.warning(
                                "transformers unavailable (%s); using rule-based intelligence fallback.",
                                _TRANSFORMERS_IMPORT_ERROR,
                            )
                            self._logged_fallback_notice = True
                        self._classifier = False
                        return self._classifier
                    self._classifier = hf_pipeline(
                        "zero-shot-classification",
                        model=settings.model_name,
                    )
        return self._classifier

    def _get_person_ner(self):
        if not settings.person_ner_enabled:
            self._person_ner = False
            return self._person_ner
        if self._person_ner is False:
            return self._person_ner
        if self._person_ner is None:
            with self._lock:
                if self._person_ner is None:
                    if hf_pipeline is None:
                        if not self._logged_ner_notice:
                            logger.warning(
                                "transformers unavailable (%s); person NER fallback will use regex only.",
                                _TRANSFORMERS_IMPORT_ERROR,
                            )
                            self._logged_ner_notice = True
                        self._person_ner = False
                        return self._person_ner
                    try:
                        self._person_ner = hf_pipeline(
                            "token-classification",
                            model=settings.person_ner_model_name,
                            aggregation_strategy="simple",
                        )
                    except Exception as err:  # noqa: BLE001
                        if not self._logged_ner_notice:
                            logger.warning(
                                "Person NER model unavailable (%s); falling back to regex-only person extraction.",
                                err,
                            )
                            self._logged_ner_notice = True
                        self._person_ner = False
                        return self._person_ner
        return self._person_ner

    @classmethod
    def _fallback_score_map(cls, text: str) -> dict[str, float]:
        labels = [
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
        ]
        score_map = {label: 0.0 for label in labels}

        rule_crime_type, rule_score = cls._keyword_crime_scores(text)
        keyword_hits = cls._keyword_signal_hits(text)
        species = cls._extract_species(text)
        state, district, _ = cls._extract_location(text)

        poach_signal = min(1.0, rule_score + min(0.35, keyword_hits * 0.08) + (0.08 if species else 0.0))
        india_signal = 0.0
        if any(term in text for term in INDIA_HINT_TERMS):
            india_signal += 0.55
        if state:
            india_signal += 0.30
        if district:
            india_signal += 0.20
        india_signal = min(1.0, india_signal)

        crime_label_map = {
            "poaching": "wildlife poaching",
            "smuggling": "wildlife smuggling",
            "illegal_wildlife_trade": "illegal wildlife trade",
            "ivory_trade": "ivory trade",
            "tiger_skin_seizure": "tiger skin seizure",
            "rhino_horn_trafficking": "rhino horn trafficking",
            "exotic_bird_trafficking": "exotic bird trafficking",
            "illegal_fishing": "illegal fishing",
            "forest_hunting_gang": "forest hunting gang",
        }
        mapped_label = crime_label_map.get(rule_crime_type)
        if mapped_label:
            score_map[mapped_label] = poach_signal

        score_map["wildlife poaching"] = max(score_map["wildlife poaching"], poach_signal)
        score_map["incident in India"] = india_signal
        score_map["incident outside India"] = max(0.0, min(1.0, 1.0 - india_signal))
        score_map["not wildlife crime"] = max(0.0, min(1.0, 0.85 - poach_signal))
        return score_map

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
    def _find_term_position(text: str, term: str) -> int | None:
        match = re.search(rf"(?<![a-z0-9]){re.escape(term)}(?![a-z0-9])", text)
        return match.start() if match else None

    @classmethod
    def _extract_location(cls, text: str) -> tuple[str, str, str]:
        district = ""
        state = ""

        district_candidates = {**DISTRICT_TO_STATE, **DISTRICT_ALIASES}
        district_match: tuple[int, str, str] | None = None
        for district_name, mapped_state in district_candidates.items():
            position = cls._find_term_position(text, district_name)
            if position is None:
                continue
            if district_match is None or position < district_match[0]:
                district_match = (position, district_name, mapped_state)
        if district_match:
            district = district_match[1]
            state = district_match[2]

        if not state:
            state_match: tuple[int, str] | None = None
            for state_name in INDIA_STATES:
                position = cls._find_term_position(text, state_name)
                if position is None:
                    continue
                if state_match is None or position < state_match[0]:
                    state_match = (position, state_name)
            if state_match:
                state = state_match[1]

        if not state:
            for alias, mapped in STATE_ALIASES.items():
                if cls._find_term_position(text, alias) is not None:
                    state = mapped
                    break

        if not district:
            district_hint_patterns = [
                r"\bdistrict of\s+([a-z][a-z\s-]{2,50})",
                r"\bin\s+([a-z][a-z\s-]{2,50})\s+district\b",
                r"\b([a-z][a-z\s-]{2,50})\s+district\b",
            ]
            for pattern in district_hint_patterns:
                for match in re.finditer(pattern, text):
                    district_candidate = re.sub(r"\s+", " ", match.group(1)).strip(" -")
                    if district_candidate in district_candidates:
                        district = district_candidate
                        state = district_candidates[district_candidate]
                        break
                if district:
                    break

        if not state:
            state_hint_patterns = [
                r"\bstate of\s+([a-z][a-z\s-]{2,60})",
                r"\bin\s+([a-z][a-z\s-]{2,60})\s+state\b",
            ]
            for pattern in state_hint_patterns:
                for match in re.finditer(pattern, text):
                    state_candidate = re.sub(r"\s+", " ", match.group(1)).strip(" -")
                    if state_candidate in INDIA_STATES:
                        state = state_candidate
                        break
                    if state_candidate in STATE_ALIASES:
                        state = STATE_ALIASES[state_candidate]
                        break
                if state:
                    break

        if not district:
            for phrase_match in re.finditer(r"\b(?:in|at|near|from)\s+([a-z][a-z\s-]{2,60})", text):
                raw_fragment = re.split(r"[,.;:()]", phrase_match.group(1), maxsplit=1)[0]
                fragment = re.sub(r"\s+", " ", raw_fragment).strip(" -")
                if not fragment:
                    continue
                words = fragment.split()
                for size in range(min(4, len(words)), 0, -1):
                    candidate = " ".join(words[:size])
                    if candidate in district_candidates:
                        district = candidate
                        state = district_candidates[candidate]
                        break
                    if candidate in INDIA_STATES:
                        state = candidate
                        break
                    if candidate in STATE_ALIASES:
                        state = STATE_ALIASES[candidate]
                        break
                if district or state:
                    break

        if district and state:
            location = f"{district.title()}, {state.title()}"
        elif state:
            location = state.title()
        else:
            location = "India" if "india" in text or "bharat" in text else ""
        return state, district, location

    @staticmethod
    def _clean_person_candidate(raw_value: str) -> str:
        value = re.sub(r"^[\"'`“”‘’\s-]+|[\"'`“”‘’,.;:\s-]+$", "", raw_value or "")
        value = re.sub(r"\([^)]{1,20}\)", "", value).strip()
        value = re.sub(r"\baged\s+\d{1,2}\b", "", value, flags=re.IGNORECASE).strip()
        value = re.sub(r"\balias\b.*$", "", value, flags=re.IGNORECASE).strip()
        value = re.sub(r"\s+", " ", value).strip()
        value = re.sub(r"^(?:mr|mrs|ms|dr|shri|smt)\.?\s+", "", value, flags=re.IGNORECASE)
        if not value:
            return ""
        tokens = [token.strip() for token in value.split(" ") if token.strip()]
        if not tokens or len(tokens) > 4:
            return ""
        lowered_tokens = [token.lower().strip(".") for token in tokens]
        if any(token in PERSON_NAME_STOPWORDS for token in lowered_tokens):
            return ""
        normalized = " ".join(lowered_tokens)
        if normalized in GEO_STOP_TERMS or normalized in SPECIES_STOP_TERMS:
            return ""
        if len(tokens) == 1 and len(tokens[0].strip(".")) < 3:
            return ""
        if not re.search(r"[A-Z]", value) and not re.search(r"[^\x00-\x7F]", value):
            return ""
        return " ".join(tokens)

    @classmethod
    def _split_person_candidates(cls, raw_value: str) -> list[str]:
        if not raw_value:
            return []
        chunks = re.split(r"\s*(?:,| and | & )\s*", raw_value.strip(), flags=re.IGNORECASE)
        if len(chunks) <= 1:
            return [raw_value]
        return [chunk for chunk in chunks if chunk]

    @staticmethod
    def _person_sentences(text: str) -> list[str]:
        if not text:
            return []
        chunks = re.split(r"(?<=[.!?।])\s+|\n+", text)
        return [re.sub(r"\s+", " ", chunk).strip() for chunk in chunks if chunk and chunk.strip()]

    @classmethod
    def _person_context_sentences(cls, text: str) -> list[str]:
        sentences = cls._person_sentences(text)
        if not sentences:
            return []
        contextual = []
        for sentence in sentences[:32]:
            lower = sentence.lower()
            if any(term in lower for term in PERSON_CONTEXT_TERMS):
                contextual.append(sentence)
        return (contextual or sentences)[:14]

    def _extract_ner_person_candidates(self, sentences: list[str]) -> list[str]:
        ner = self._get_person_ner()
        if ner is False:
            return []
        candidates: list[str] = []
        for sentence in sentences[:10]:
            try:
                entities = ner(sentence[:450])
            except Exception as err:  # noqa: BLE001
                if not self._logged_ner_notice:
                    logger.warning("Person NER inference failed: %s", err)
                    self._logged_ner_notice = True
                self._person_ner = False
                return []
            for entity in entities:
                label = str(entity.get("entity_group") or entity.get("entity") or "").upper()
                if "PER" not in label and "PERSON" not in label:
                    continue
                score = float(entity.get("score") or 0.0)
                if score < settings.person_ner_min_score:
                    continue
                candidate = self._clean_person_candidate(str(entity.get("word") or ""))
                if candidate:
                    candidates.append(candidate)
        return candidates

    def _extract_involved_persons(self, text: str) -> list[str]:
        if not text:
            return []
        sentences = self._person_context_sentences(text)
        candidate_scores: dict[str, int] = {}
        display_names: dict[str, str] = {}
        for sentence in sentences:
            lower_sentence = sentence.lower()
            context_bonus = 2 if any(term in lower_sentence for term in PERSON_ACTION_TERMS) else 1
            for pattern in PERSON_EXTRACTION_PATTERNS:
                for match in pattern.finditer(sentence):
                    for chunk in self._split_person_candidates(match.group(1)):
                        candidate = self._clean_person_candidate(chunk)
                        if not candidate:
                            continue
                        key = candidate.lower()
                        display_names.setdefault(key, candidate)
                        candidate_scores[key] = candidate_scores.get(key, 0) + (2 + context_bonus)
        for candidate in self._extract_ner_person_candidates(sentences):
            key = candidate.lower()
            display_names.setdefault(key, candidate)
            candidate_scores[key] = candidate_scores.get(key, 0) + 2
        ranked = sorted(candidate_scores.items(), key=lambda item: (-item[1], item[0]))
        return [display_names[name] for name, score in ranked if score >= 2][:6]

    @staticmethod
    def _is_india(text: str, state: str, district: str, india_prob: float, outside_prob: float) -> tuple[bool, float]:
        rule_score = 0.0
        if any(term in text for term in INDIA_HINT_TERMS):
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
    def _extract_operational_details(source_text: str, text: str) -> dict[str, object]:
        lower = text
        agency_hits = [term for term in AGENCY_TERMS if term in lower]
        quantities = [match.group(0) for match in QUANTITY_PATTERN.finditer(source_text)]
        money_mentions = [match.group(0) for match in MONEY_PATTERN.finditer(source_text)]
        case_refs = [match.group(0) for match in CASE_REF_PATTERN.finditer(source_text)]
        vehicle_refs = [match.group(0) for match in VEHICLE_REF_PATTERN.finditer(source_text)]
        seizure_present = any(token in lower for token in ["seized", "seizure", "confiscated", "recovered"])
        arrest_present = any(token in lower for token in ["arrested", "detained", "held", "nabbed", "booked"])
        cross_border = bool(re.search(r"\bcross[- ]?border\b|\binternational\b|\bnepal\b|\bbhutan\b|\bmyanmar\b|\bbangladesh\b", lower))
        weapon_signal = any(token in lower for token in ["rifle", "gun", "weapon", "snare", "trap", "cartridge"])
        return {
            "agency_hits": agency_hits[:4],
            "quantities": quantities[:4],
            "money_mentions": money_mentions[:3],
            "case_refs": case_refs[:3],
            "vehicle_refs": vehicle_refs[:3],
            "seizure_present": seizure_present,
            "arrest_present": arrest_present,
            "cross_border": cross_border,
            "weapon_signal": weapon_signal,
        }

    @staticmethod
    def _evidence_strength(
        *,
        keyword_hits: int,
        species_hits: int,
        person_hits: int,
        state: str,
        district: str,
        operational_details: dict[str, object],
        network_indicator: bool,
    ) -> float:
        score = min(0.4, keyword_hits * 0.05)
        score += min(0.2, species_hits * 0.08)
        score += min(0.15, person_hits * 0.05)
        if state:
            score += 0.08
        if district:
            score += 0.07
        if operational_details.get("seizure_present"):
            score += 0.08
        if operational_details.get("arrest_present"):
            score += 0.06
        if operational_details.get("cross_border"):
            score += 0.06
        if operational_details.get("weapon_signal"):
            score += 0.04
        if operational_details.get("quantities"):
            score += 0.05
        if network_indicator:
            score += 0.05
        return max(0.0, min(1.0, score))

    @staticmethod
    def _compute_confidence(
        *,
        poach_prob: float,
        rule_score: float,
        keyword_hits: int,
        species_hits: int,
        person_hits: int,
        network_indicator: bool,
        not_wildlife_prob: float,
        crime_type: str,
        has_false_positive: bool,
        evidence_strength: float,
        operational_details: dict[str, object],
    ) -> float:
        confidence = (0.55 * poach_prob) + (0.30 * rule_score) + (0.15 * evidence_strength)
        confidence += min(0.06, keyword_hits * 0.01)
        if species_hits:
            confidence += 0.03
        if person_hits:
            confidence += 0.03
        if network_indicator:
            confidence += 0.03
        if operational_details.get("seizure_present"):
            confidence += 0.03
        if operational_details.get("cross_border"):
            confidence += 0.02
        confidence -= min(0.24, not_wildlife_prob * 0.20)
        if has_false_positive:
            confidence -= 0.12
        if crime_type == "unknown":
            confidence -= 0.06
        return max(0.0, min(1.0, confidence))

    @staticmethod
    def _compute_risk(
        *,
        confidence: float,
        poach_prob: float,
        crime_type: str,
        species: list[str],
        network_indicator: bool,
        repeat_indicator: bool,
        person_hits: int,
        operational_details: dict[str, object],
    ) -> int:
        score = (confidence * 52) + (poach_prob * 20)
        crime_bonus = {
            "rhino_horn_trafficking": 13,
            "tiger_skin_seizure": 12,
            "ivory_trade": 11,
            "illegal_wildlife_trade": 9,
            "forest_hunting_gang": 9,
            "smuggling": 8,
            "poaching": 7,
            "illegal_fishing": 5,
            "exotic_bird_trafficking": 6,
        }
        score += crime_bonus.get(crime_type, 0)
        if any(sp in {"tiger", "rhino", "elephant"} for sp in species):
            score += 10
        if network_indicator:
            score += 8
        if repeat_indicator:
            score += 6
        if operational_details.get("seizure_present"):
            score += 5
        if operational_details.get("cross_border"):
            score += 5
        if operational_details.get("weapon_signal"):
            score += 4
        if operational_details.get("quantities"):
            score += min(4, len(operational_details["quantities"]))
        if person_hits >= 2:
            score += 3
        if not species and person_hits == 0 and not operational_details.get("seizure_present"):
            score -= 6
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
        involved_persons: list[str],
        network_indicator: bool,
        repeat_indicator: bool,
        confidence: float,
        risk_score: int,
        operational_details: dict[str, object],
    ) -> list[str]:
        points = [
            f"Crime type signal: {crime_type.replace('_', ' ')}",
            f"Confidence: {confidence:.2f}; Risk score: {risk_score}/100",
            f"Species detected: {', '.join(species) if species else 'not explicit'}",
            f"Location signal: district={district or 'unknown'}, state={state or 'unknown'}",
            f"Involved persons: {', '.join(involved_persons) if involved_persons else 'not explicit'}",
        ]
        if operational_details.get("agency_hits"):
            points.append(f"Agencies referenced: {', '.join(operational_details['agency_hits'])}.")
        if operational_details.get("quantities"):
            points.append(f"Quantity/evidence mentions: {', '.join(operational_details['quantities'])}.")
        if operational_details.get("money_mentions"):
            points.append(f"Monetary signal: {', '.join(operational_details['money_mentions'])}.")
        if operational_details.get("case_refs"):
            points.append(f"Case/FIR references: {', '.join(operational_details['case_refs'])}.")
        if operational_details.get("vehicle_refs"):
            points.append(f"Vehicle references: {', '.join(operational_details['vehicle_refs'])}.")
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
        evidence_strength: float,
        not_wildlife_prob: float,
        species_hits: int,
        person_hits: int,
        operational_details: dict[str, object],
        network_indicator: bool,
        repeat_indicator: bool,
    ) -> str:
        return (
            f"Model confidence={confidence:.2f} (poaching signal={poach_prob:.2f}, rule score={rule_score:.2f}, india score={india_score:.2f}); "
            f"evidence_strength={evidence_strength:.2f}, not_wildlife={not_wildlife_prob:.2f}, "
            f"species_hits={species_hits}, person_hits={person_hits}, seizure={int(bool(operational_details.get('seizure_present')))}, "
            f"cross_border={int(bool(operational_details.get('cross_border')))}, "
            f"network_indicator={int(network_indicator)}, repeat_indicator={int(repeat_indicator)}."
        )

    def analyze(
        self,
        *,
        title: str,
        summary: str,
        prior_district_hits: int = 0,
        prior_source_hits: int = 0,
    ) -> IntelligenceResult:
        source_text = normalize_space(f"{title}. {summary}")
        text = source_text.lower()
        if not source_text:
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
                involved_persons=[],
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
        if classifier is False:
            score_map = self._fallback_score_map(text)
        else:
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
        involved_persons = self._extract_involved_persons(source_text)
        operational_details = self._extract_operational_details(source_text, text)
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
        evidence_strength = self._evidence_strength(
            keyword_hits=keyword_hits,
            species_hits=len(species),
            person_hits=len(involved_persons),
            state=state,
            district=district,
            operational_details=operational_details,
            network_indicator=network_indicator,
        )
        confidence = self._compute_confidence(
            poach_prob=poach_prob,
            rule_score=rule_score,
            keyword_hits=keyword_hits,
            species_hits=len(species),
            person_hits=len(involved_persons),
            network_indicator=network_indicator,
            not_wildlife_prob=not_wildlife_prob,
            crime_type=crime_type,
            has_false_positive=has_false_positive,
            evidence_strength=evidence_strength,
            operational_details=operational_details,
        )
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
            poach_prob=poach_prob,
            crime_type=crime_type,
            species=species,
            network_indicator=network_indicator,
            repeat_indicator=repeat_indicator,
            person_hits=len(involved_persons),
            operational_details=operational_details,
        )
        summary_text = self._build_summary(title, summary, crime_type, species, location)
        intel_points = self._build_intel_points(
            crime_type=crime_type,
            species=species,
            state=state,
            district=district,
            involved_persons=involved_persons,
            network_indicator=network_indicator,
            repeat_indicator=repeat_indicator,
            confidence=confidence,
            risk_score=risk_score,
            operational_details=operational_details,
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
            evidence_strength=evidence_strength,
            not_wildlife_prob=not_wildlife_prob,
            species_hits=len(species),
            person_hits=len(involved_persons),
            operational_details=operational_details,
            network_indicator=network_indicator,
            repeat_indicator=repeat_indicator,
        )

        reason = (
            f"poach_prob={poach_prob:.2f}, rule_score={rule_score:.2f}, keyword_hits={keyword_hits}, "
            f"india_score={india_score:.2f}, confidence={confidence:.2f}, evidence={evidence_strength:.2f}, "
            f"not_wildlife={not_wildlife_prob:.2f}"
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
            involved_persons=involved_persons,
            network_indicator=network_indicator,
            repeat_indicator=repeat_indicator,
            summary=summary_text[:500],
            intel_points=intel_points,
            likely_smuggling_route=likely_smuggling_route[:500],
            enforcement_recommendation=enforcement_recommendation[:500],
            confidence_explanation=confidence_explanation[:500],
            reason=reason[:300],
        )
