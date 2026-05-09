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
from app.services.role_ner import role_ner
from app.services.setfit_classifier import CLASSIFIER_LABELS, setfit_classifier
from app.services.summarizer import get_intelligence_summarizer
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
    "exotic_bird_trafficking": {"exotic bird", "parrot trafficking", "macaw", "cockatoo", "parakeet smuggling"},
    "illegal_fishing": {"illegal fishing", "blast fishing", "dynamite fishing", "trawler"},
    "forest_hunting_gang": {"hunting gang", "poaching gang", "racket", "syndicate", "cartel", "network"},
    "habitat_destruction": {
        "deforestation", "illegal logging", "encroachment", "forest fire arson",
        "habitat destruction", "illegal mining forest", "land grab forest",
        "वन कटाई", "अवैध कटाई",
    },
    "animal_cruelty": {
        "animal cruelty", "animal abuse", "animal torture",
        "poisoning animals", "poisoned carcass",
        "पशु क्रूरता",
    },
    "snake_venom_trade": {"snake venom", "venom trade", "venom trafficking", "सांप का जहर"},
    "red_sanders_smuggling": {"red sanders", "red sandalwood", "red sander", "रक्तचंदन", "ఎర్రచందనం"},
}

SPECIES_KEYWORDS: dict[str, set[str]] = {
    "tiger": {"tiger", "tigress", "big cat", "बाघ", "व्याघ्र", "ಹುಲಿ", "புலி", "పులి", "বাঘ", "বাঘ", "ਬਾਘ", "شیر", "ବାଘ", "વાઘ"},
    "leopard": {"leopard", "panther", "leopardess", "तेंदुआ", "चीता", "ಚಿರತೆ", "சிறுத்தை", "చిరుత"},
    "elephant": {"elephant", "tusk", "ivory", "हाथी", "ಆನೆ", "யானை", "ఏనుగు", "হাতি", "হাতী", "ہاتھی", "ହାତୀ", "હાથી"},
    "rhino": {"rhino", "rhinoceros", "गैंडा", "ಖಡ್ಗಮೃಗ", "காண்டாமிருகம்", "ఖడ్గమృగం", "গণ্ডার", "گینڈا", "ଗଣ୍ଡମୃଗ", "ગેંડો"},
    "pangolin": {"pangolin", "scales", "पैंगोलिन", "ಪ್ಯಾಂಗೋಲಿನ್", "பாங்கோலின்", "ప్యాంగోలిన్", "প্যাঙ্গোলিন", "پینگولن", "ପ୍ୟାଙ୍ଗୋଲିନ", "પેંગોલિન"},
    "bear": {"bear", "sloth bear", "himalayan bear", "bear bile", "भालू", "ಕರಡಿ", "கரடி", "ఎలుగుబంటి"},
    "deer": {"deer", "sambar", "chital", "antler", "spotted deer", "barking deer", "musk deer", "hog deer", "हिरण", "ಜಿಂಕೆ", "மான்", "జింక"},
    "bird": {"parrot", "owl", "eagle", "hornbill", "falcon", "macaw", "cockatoo", "bird", "parakeet", "myna", "peacock", "emu", "ostrich", "turkey"},
    "reptile": {"python", "cobra", "turtle", "tortoise", "gecko", "lizard", "star tortoise", "monitor lizard", "crocodile", "gharial", "tokay gecko", "sand boa", "red sand boa", "chameleon"},
    "marine": {"shark", "ray", "sea cucumber", "illegal fishing", "shark fin", "seahorse", "sea turtle", "whale shark", "dugong", "ambergris"},
    "snow leopard": {"snow leopard", "हिम चीता", "ounce"},
    "red panda": {"red panda", "लाल पांडा"},
    "lion": {"lion", "asiatic lion", "gir lion", "शेर", "सिंह"},
    "wolf": {"wolf", "indian wolf", "भेड़िया"},
    "wild boar": {"wild boar", "boar", "जंगली सूअर"},
    "red sanders": {"red sanders", "red sandalwood", "red sander", "रक्तचंदन", "ఎర్রచందనం", "செம்மரம்"},
    "sandalwood": {"sandalwood", "sandal wood", "चंदन", "श्रीगंध", "சந்தனம்"},
    "pangolin": {"pangolin", "scales", "पैंगोलिन", "चिंटीखोर", "ప్యాంగోలిన్", "பாங்கோலின்"},
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

# Source credibility — weights intelligence confidence by publisher reliability
SOURCE_CREDIBILITY: dict[str, float] = {
    "mongabay": 0.97, "mongabay india": 0.97, "down to earth": 0.95,
    "sanctuary nature": 0.95, "traffic": 0.95, "wwf": 0.95, "iucn": 0.95,
    "the hindu": 0.92, "indian express": 0.92, "hindustan times": 0.90,
    "ndtv": 0.90, "times of india": 0.88, "the wire": 0.90,
    "scroll": 0.88, "firstpost": 0.87, "theprint": 0.88,
    "deccan herald": 0.87, "deccan chronicle": 0.85, "the statesman": 0.85,
    "new indian express": 0.87, "hans india": 0.82, "eenadu": 0.82,
    "prajavani": 0.82, "vijaya karnataka": 0.82, "mathrubhumi": 0.82,
    "dinamalar": 0.80, "dainik jagran": 0.82, "amar ujala": 0.82,
    "divya bhaskar": 0.82, "lokmat": 0.82, "navbharat times": 0.82,
    "pti": 0.92, "ani": 0.90, "reuters": 0.92, "afp": 0.92,
    "latestly": 0.60, "newsmeter": 0.62, "dt next": 0.65,
    "india today": 0.85, "outlook": 0.78, "business standard": 0.75,
}
_SOURCE_DEFAULT = 0.70


PERSON_TOKEN_PATTERN = r"(?:[A-Z][A-Za-z.'\u2019-]*|[A-Z]\.?|[^\W\d_]{2,})"
PERSON_NAME_PATTERN = rf"{PERSON_TOKEN_PATTERN}(?:\s+{PERSON_TOKEN_PATTERN}){{0,4}}"
PERSON_NAME_LIST_PATTERN = rf"{PERSON_NAME_PATTERN}(?:\s*(?:,|and|&|और|एवं|तथा)\s*{PERSON_NAME_PATTERN}){{1,6}}"

PERSON_EXTRACTION_PATTERNS = [
    # English: "arrested/held/detained [person]"
    re.compile(
        rf"\b(?:arrested|held|detained|booked|nabbed|caught|apprehended|captured|seized|"
        rf"identified|named|questioned|interrogated|remanded|charged|convicted|sentenced)\s+"
        rf"(?:the\s+)?(?:alleged\s+)?(?:main\s+)?(?:prime\s+)?"
        rf"(?:poacher(?:s)?|trafficker(?:s)?|suspect(?:s)?|accused|individual(?:s)?|smuggler(?:s)?|"
        rf"kingpin(?:s)?|mastermind(?:s)?|operative(?:s)?|handler(?:s)?|dealer(?:s)?)?\s*"
        rf"(?:named|identified as|known as)?\s*({PERSON_NAME_PATTERN})\b"
    ),
    # English: "[person] was arrested/held"
    re.compile(
        rf"\b({PERSON_NAME_LIST_PATTERN}|{PERSON_NAME_PATTERN})\s+"
        rf"(?:was|were|has been|have been|had been)?\s*"
        rf"(?:arrested|held|detained|booked|nabbed|accused|named|identified|questioned|"
        rf"apprehended|captured|charged|convicted|sentenced|remanded)\b"
    ),
    # "identified as [name]"
    re.compile(rf"\bidentified as\s+({PERSON_NAME_LIST_PATTERN}|{PERSON_NAME_PATTERN})\b"),
    # "named/identified/arrested [list of names]"
    re.compile(
        rf"\b(?:named|identified as|arrested|apprehended)\s+({PERSON_NAME_LIST_PATTERN})\b"
    ),
    # "arrest/detention of [name]"
    re.compile(
        rf"\b(?:arrest|detention|questioning|interrogation|remand|conviction|sentencing)\s+(?:of\s+)?({PERSON_NAME_PATTERN})\b",
        re.IGNORECASE,
    ),
    # "kingpin/mastermind [name]"
    re.compile(
        rf"\b(?:kingpin|mastermind|ringleader|gang\s*leader|head|boss|supplier|handler)\s+"
        rf"(?:named|identified as|known as)?\s*({PERSON_NAME_PATTERN})\b",
        re.IGNORECASE,
    ),
    # "[name], the kingpin/mastermind"
    re.compile(
        rf"\b({PERSON_NAME_PATTERN})\s*,\s*(?:the\s+)?(?:alleged\s+)?"
        rf"(?:kingpin|mastermind|ringleader|gang\s*leader|main\s+accused|prime\s+accused)\b",
        re.IGNORECASE,
    ),
    # "accused [name] (age/alias)"
    re.compile(
        rf"\b(?:accused|suspect)\s+({PERSON_NAME_PATTERN})\s*(?:\(|\,)",
        re.IGNORECASE,
    ),
    # Hindi: "गिरफ्तार [name]" or "[name] गिरफ्तार"
    re.compile(rf"गिरफ़?\s*तार\s+(?:किया\s+)?({PERSON_NAME_PATTERN})", re.IGNORECASE),
    re.compile(rf"({PERSON_NAME_PATTERN})\s+(?:को\s+)?गिरफ़?\s*तार", re.IGNORECASE),
    # Hindi: "आरोपी [name]"
    re.compile(rf"(?:आरोपी|संदिग्ध|तस्कर|शिकारी)\s+({PERSON_NAME_PATTERN})", re.IGNORECASE),
    # Kannada: "ಬಂಧನ"
    re.compile(rf"({PERSON_NAME_PATTERN})\s+(?:ಅನ್ನು\s+)?ಬಂಧಿಸ", re.IGNORECASE),
    # Tamil: "கைது"
    re.compile(rf"({PERSON_NAME_PATTERN})\s+கைது", re.IGNORECASE),
    # Bengali: "গ্রেপ্তার/গ্রেফতার"
    re.compile(rf"({PERSON_NAME_PATTERN})\s+(?:কে\s+)?গ্রে(?:প|ফ)তার", re.IGNORECASE),
    # FIR reference: "FIR against [name]"
    re.compile(
        rf"\b(?:FIR|case|complaint)\s+(?:filed|registered|lodged)\s+(?:against\s+)?({PERSON_NAME_PATTERN})\b",
        re.IGNORECASE,
    ),
    # "led by [name]" / "headed by [name]"
    re.compile(
        rf"\b(?:led|headed|operated|run|managed|controlled)\s+by\s+({PERSON_NAME_PATTERN})\b",
        re.IGNORECASE,
    ),
    # "one [name], aged/resident" — very common in Indian news
    re.compile(
        rf"\bone\s+({PERSON_NAME_PATTERN})\s*(?:,|\(|aged|resident|r/o|a\s+resident)\b",
        re.IGNORECASE,
    ),
    # "including [names]"
    re.compile(
        rf"\bincluding\s+({PERSON_NAME_LIST_PATTERN})\b",
        re.IGNORECASE,
    ),
    # "gang of [name]" / "racket of [name]"
    re.compile(
        rf"\b(?:gang|racket|syndicate|network|nexus)\s+(?:of|headed by|led by|run by)\s+({PERSON_NAME_PATTERN})\b",
        re.IGNORECASE,
    ),
    # Telugu: "అరెస్ట్ [name]"
    re.compile(rf"అరెస్ట్\s+({PERSON_NAME_PATTERN})", re.IGNORECASE),
    # Malayalam: "അറസ്റ്റ് [name]"
    re.compile(rf"അറസ്റ്റ്\s+({PERSON_NAME_PATTERN})", re.IGNORECASE),
    # Marathi: "अटक [name]"
    re.compile(rf"(?:अटक|ताब्यात)\s+({PERSON_NAME_PATTERN})", re.IGNORECASE),
    # Gujarati: "ધરપકડ [name]"
    re.compile(rf"(?:ધરપકડ|પકડાયો)\s+({PERSON_NAME_PATTERN})", re.IGNORECASE),
]

PERSON_ROLE_PATTERNS = [
    (re.compile(r"\b(?:kingpin|mastermind|ringleader|gang\s*leader|boss|head)\b", re.IGNORECASE), "kingpin"),
    (re.compile(r"\b(?:smuggler|trafficker|dealer|supplier|handler|courier)\b", re.IGNORECASE), "smuggler"),
    (re.compile(r"\b(?:poacher|hunter|killer|shooter|trapper)\b", re.IGNORECASE), "poacher"),
    (re.compile(r"\b(?:forest\s+officer|ranger|warden|DFO|ACF|RFO|guard)\b", re.IGNORECASE), "officer"),
    (re.compile(r"\b(?:informer|informant|tipster|whistleblower)\b", re.IGNORECASE), "informant"),
]


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
    "j&k": "jammu and kashmir",
    "delhi ncr": "delhi",
    "ncr": "delhi",
    "orissa": "odisha",
    "ap": "andhra pradesh",
    "hp": "himachal pradesh",
    "uk": "uttarakhand",
    "ar": "arunachal pradesh",
    "cg": "chhattisgarh",
    "chattisgarh": "chhattisgarh",
    "bengal": "west bengal",
    "bombay": "maharashtra",
    "madras": "tamil nadu",
    "calcutta": "west bengal",
    "trivandrum": "kerala",
    "poona": "maharashtra",
    "baroda": "gujarat",
    "mysore": "karnataka",
    "pondicherry": "puducherry",
    "uttaranchal": "uttarakhand",
}

DISTRICT_ALIASES = {
    "navi mumbai": "maharashtra",
    "virar": "maharashtra",
    "palghar": "maharashtra",
    "greater noida": "uttar pradesh",
    "gurgaon": "haryana",
    "faridabad": "haryana",
    "ghaziabad": "uttar pradesh",
    "meerut": "uttar pradesh",
    "allahabad": "uttar pradesh",
    "prayagraj": "uttar pradesh",
    "kashi": "uttar pradesh",
    "benaras": "uttar pradesh",
    "mangalore": "karnataka",
    "calicut": "kerala",
    "vizag": "andhra pradesh",
    "secunderabad": "telangana",
    "cochin": "kerala",
    "pondicherry": "puducherry",
    "whitefield": "karnataka",
    "electronic city": "karnataka",
}



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
    "national",
    "park",
    "sanctuary",
    "reserve",
    "forest",
    "animal",
    "bird",
    "snake",
    "tiger",
    "leopard",
    "elephant",
    "rhino",
    "pangolin",
    "arrested",
    "detained",
    "held",
    "caught",
    "seized",
    "rescued",
    "recovered",
    "found",
    "killed",
    "total",
    "several",
    "multiple",
    "many",
    "various",
    "other",
    "first",
    "last",
    "senior",
    "deputy",
    "chief",
    "inspector",
    "constable",
    "superintendent",
    "director",
    "minister",
    "secretary",
    "collector",
    "commissioner",
    "magistrate",
    "judge",
    "advocate",
    "lawyer",
    "reporter",
    "journalist",
    "correspondent",
    "editor",
    "press",
    "pti",
    "ians",
    "ani",
    "reuters",
    "afp",
    "representative",
    # Common false-positive words from actual data analysis
    "the",
    "was",
    "were",
    "has",
    "have",
    "had",
    "been",
    "being",
    "is",
    "are",
    "will",
    "would",
    "could",
    "should",
    "may",
    "might",
    "can",
    "shall",
    "did",
    "does",
    "do",
    "some",
    "most",
    "all",
    "any",
    "each",
    "every",
    "both",
    "few",
    "more",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "twenty",
    "hundred",
    "following",
    "another",
    "also",
    "additionally",
    "meanwhile",
    "however",
    "according",
    "sources",
    "source",
    "said",
    "told",
    "reported",
    "news",
    "report",
    "update",
    "breaking",
    "msn",
    "ndtv",
    "toi",
    "bbc",
    "cnn",
    "today",
    "yesterday",
    "morning",
    "evening",
    "night",
    "local",
    "state",
    "central",
    "government",
    "authorities",
    "authority",
    "task",
    "force",
    "joint",
    "operation",
    "special",
    "gang",
    "illegal",
    "smuggling",
    "hunting",
    "poaching",
    "trafficking",
    "trade",
    "crime",
    "criminal",
    "minor",
    "major",
    "sale",
    "sold",
    "selling",
    "buying",
    "bought",
    "worth",
    "valued",
    "crore",
    "lakh",
    "rupees",
    "myanmar", "thailand", "singapore", "vietnam", "laos", "cambodia", "china",
    "nepal", "bhutan", "bangladesh", "sri lanka", "malaysia", "indonesia",
    "africa", "kenya", "tanzania", "dubai", "uae", "qatar", "usa", "uk",
}

PERSON_COUNT_WORDS = {
    "an": 1,
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
    "ten": 10,
    "duo": 2,
    "trio": 3,
}

PERSON_COUNT_PATTERN = re.compile(
    r"\b(?:(?P<digits>\d{1,2})|(?P<word>an|one|two|three|four|five|six|seven|eight|nine|ten|duo|trio))\s+"
    r"(?:alleged\s+)?(?:poacher(?:s)?|trafficker(?:s)?|suspect(?:s)?|accused|persons?|individuals?)\b",
    re.IGNORECASE,
)

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
    "myanmar", "singapore", "thailand", "vietnam", "china", "laos", "cambodia",
    "nepal", "bhutan", "bangladesh", "sri lanka", "malaysia", "indonesia",
    "hong kong", "taiwan", "africa", "south africa", "kenya", "tanzania",
    "europe", "usa", "uk", "dubai", "uae", "qatar", "russia", "australia",
    "canada", "brazil", "nigeria", "congo", "madagascar",
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
        self._role_ner = role_ner
        self._setfit_classifier = setfit_classifier
        self._summarizer = get_intelligence_summarizer()
        self._lock = Lock()
        self._model_ready = False
        self._logged_fallback_notice = False
        self._logged_ner_notice = False

    @property
    def model_ready(self) -> bool:
        return self._model_ready

    def warmup(self) -> bool:
        setfit_scores = self._setfit_classifier.predict_score_map("Wildlife officers seized tiger skin in Karnataka.")
        if setfit_scores is not None:
            self._model_ready = True
            return True
        try:
            classifier = self._get_classifier()
            if classifier is False:
                self._model_ready = False
                return False
            _ = classifier(
                "Wildlife officers seized tiger skin in Karnataka.",
                candidate_labels=CLASSIFIER_LABELS,
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
        labels = list(CLASSIFIER_LABELS)
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
                r"\bdistrict\s+([a-z][a-z\s-]{2,50})\b",
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

    def _extract_location_ner(self, text: str) -> tuple[str, str]:
        """Use NER model to extract LOC entities and map them to Indian states/districts."""
        ner = self._get_person_ner()
        if ner is False:
            return "", ""
        state = ""
        district = ""
        try:
            # Analyze more text for better context
            entities = ner(text[:2500])
        except Exception:
            return "", ""
        loc_candidates = []
        for entity in entities:
            label = str(entity.get("entity_group") or entity.get("entity") or "").upper()
            if "LOC" not in label and "GPE" not in label:
                continue
            score = float(entity.get("score") or 0.0)
            if score < 0.45: # Slightly lower threshold for NER
                continue
            word = str(entity.get("word") or "").strip().lower()
            if len(word) < 3:
                continue
            loc_candidates.append(word)

        # Cross-reference extracted locations with our geo database
        for candidate in loc_candidates:
            if candidate in DISTRICT_TO_STATE:
                district = candidate
                state = DISTRICT_TO_STATE[candidate]
                break
            if candidate in INDIA_STATES:
                state = candidate
                break
            # Check for partial matches or aliases
            for d, s in DISTRICT_TO_STATE.items():
                if candidate in d or d in candidate:
                    district = d
                    state = s
                    break
            if state: break

        # Aggressive Fallback: If still unknown, scan the text for exact district names
        if not state:
            lower_text = text.lower()
            for d, s in DISTRICT_TO_STATE.items():
                if f" {d} " in f" {lower_text} ":
                    district = d
                    state = s
                    break

        return state, district

    @staticmethod
    def _clean_person_candidate(raw_value: str) -> str:
        value = re.sub(r"^[\"'`\u201c\u201d\u2018\u2019\s-]+|[\"'`\u201c\u201d\u2018\u2019,.;:\s-]+$", "", raw_value or "")
        value = re.sub(r"\([^)]{1,30}\)", "", value).strip()
        value = re.sub(r"\baged?\s+\d{1,3}\s*(?:years?|yrs?)?\b", "", value, flags=re.IGNORECASE).strip()
        value = re.sub(r"\b\d{1,3}\s*(?:years?|yrs?)\s*(?:old)?\b", "", value, flags=re.IGNORECASE).strip()
        value = re.sub(r"\balias\b.*$", "", value, flags=re.IGNORECASE).strip()
        value = re.sub(r"\b(?:a\.?k\.?a\.?|also known as)\b.*$", "", value, flags=re.IGNORECASE).strip()
        value = re.sub(
            r"^(?:the\s+)?(?:alleged\s+)?(?:main\s+)?(?:prime\s+)?"
            r"(?:poacher(?:s)?|trafficker(?:s)?|suspect(?:s)?|accused|smuggler(?:s)?|kingpin(?:s)?)\s+",
            "",
            value,
            flags=re.IGNORECASE,
        )
        value = re.sub(r",?\s*(?:resident(?:s)?|r/o|s/o|d/o|w/o|h/o|f/o)\b.*$", "", value, flags=re.IGNORECASE).strip()
        value = re.sub(r"\b(?:son|daughter|wife|husband|father)\s+of\b.*$", "", value, flags=re.IGNORECASE).strip()
        value = re.sub(r"\b(?:hailing|belonging|native)\s+(?:from|to)\b.*$", "", value, flags=re.IGNORECASE).strip()
        value = re.sub(r"\s+", " ", value).strip()
        value = re.sub(r"^(?:mr|mrs|ms|dr|shri|smt|sri|prof)\.?\s+", "", value, flags=re.IGNORECASE)
        if not value:
            return ""
        tokens = [token.strip() for token in value.split(" ") if token.strip()]
        if not tokens or len(tokens) > 5:
            return ""
        lowered_tokens = [token.lower().strip(".") for token in tokens]
        # Filter out stopword tokens but keep non-stopword ones
        clean_tokens = [t for t, lt in zip(tokens, lowered_tokens) if lt not in PERSON_NAME_STOPWORDS]
        if not clean_tokens:
            return ""
        lowered_clean = [t.lower().strip(".") for t in clean_tokens]
        normalized = " ".join(lowered_clean)
        if normalized in GEO_STOP_TERMS or normalized in SPECIES_STOP_TERMS:
            return ""
        if len(clean_tokens) == 1 and len(clean_tokens[0].strip(".")) < 3:
            return ""
        if not re.search(r"[A-Z]", " ".join(clean_tokens)) and not re.search(r"[^\x00-\x7F]", " ".join(clean_tokens)):
            return ""
        return " ".join(clean_tokens)

    @classmethod
    def _split_person_candidates(cls, raw_value: str) -> list[str]:
        if not raw_value:
            return []
        chunks = re.split(
            r"\s*(?:,|;|/| and | & |और|एवं|तथा|और|ও|এবং|و|ਅਤੇ)\s*",
            raw_value.strip(),
            flags=re.IGNORECASE,
        )
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
        gliner_candidates: list[str] = []
        for sentence in sentences[:16]:
            for entity in self._role_ner.extract(sentence[:512]):
                if entity.get("label") not in {"SUSPECT", "OFFICER"}:
                    continue
                candidate = self._clean_person_candidate(str(entity.get("text") or ""))
                if candidate:
                    gliner_candidates.append(candidate)
        if gliner_candidates:
            return gliner_candidates

        ner = self._get_person_ner()
        if ner is False:
            return []
        candidates: list[str] = []
        for sentence in sentences[:16]:
            try:
                entities = ner(sentence[:512])
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

    @staticmethod
    def _extract_involved_count_hint(text: str) -> int:
        if not text:
            return 0
        max_count = 0
        for match in PERSON_COUNT_PATTERN.finditer(text.lower()):
            digits = match.group("digits")
            if digits:
                count = int(digits)
            else:
                count = PERSON_COUNT_WORDS.get((match.group("word") or "").strip().lower(), 0)
            if count > max_count:
                max_count = count
        return max_count

    @staticmethod
    def _is_bad_person(person: str) -> bool:
        if not person or person.endswith("unnamed suspect") or person.endswith("unnamed suspects"):
            return False

        start_block = re.compile(
            r"^(?:in|at|of|for|from|by|with|to|the|a|an|as|on|is|was|were|has|have|had|"
            r"this|that|these|those|and|or|but|not|no|its|their|our|who|which|what|where|"
            r"when|how|why|after|before|during|while|about|against|between|through|under|"
            r"over|into|upon|until|within|without|some|most|many|several|few|all|any|such|"
            r"also|additionally|meanwhile|however|further|moreover|hence|thus|therefore|"
            r"yet|still|already|just|only|even|much|more|less|very|too|quite|rather|here|"
            r"there|now|then|often|never|always|sometimes|recently|usually|finally|"
            r"among|another|earlier|following|identified|investigations|interrogation|"
            r"while|late|busted|racket|arrested|am|were|on|anganwadi|cbi|ncb|stf|sho|ngo|ncrb|wbcsd)\b",
            re.IGNORECASE,
        )
        contains_block = re.compile(
            r"\b(?:district|state|forest|police|crime|branch|bureau|wildlife|poaching|hunting|"
            r"smuggling|trafficking|smuggler|smugglers|trafficker|traffickers|arrested|detained|"
            r"seized|seizure|national|international|park|sanctuary|reserve|government|ministry|"
            r"department|court|bench|tribunal|committee|commission|board|authority|agency|office|"
            r"organization|organisation|council|news|media|times|today|daily|express|herald|"
            r"telegraph|gazette|post|reporter|correspondent|editor|publication|website|online|"
            r"digital|india|indian|bharat|hindustan|airport|station|highway|road|bridge|border|"
            r"river|lake|village|town|city|area|region|zone|sector|block|tehsil|taluk|mandal|"
            r"panchayat|assembly|parliament|lok|rajya|sabha|pradesh|nagar|gang|racket|syndicate|"
            r"network|nexus|cartel|mafia|ring|sold|repatriated|released|rescued|recovered|"
            r"deported|blue|red|green|white|black|minor|major|old|new|young|small|big|large|"
            r"that\s+was|that\s+were|left|right|long|short|good|bad|wing|ran|"
            r"towards|behind|front|above|below|inside|outside|nearby|forward|backward|"
            r"birds|animals|deer|peacock|peacocks|monkey|monkeys|cattle|horses|cows|dogs|cats|"
            r"meter|metre|newsmeter|deccan|navbharat|eenadu|sakshi|mathrubhumi|manorama|"
            r"dainik|jagran|amar|ujala|rajasthan|patrika|divya|bhaskar|lokmat|sakal|"
            r"saamana|loksatta|prajavani|vijaya|udayavani|sandesh|akila|dinamalar|dt\s+next|"
            r"dinamani|dinakaran|standard|journal|latestly|statesman|observer|mirror|"
            r"chronicle|sentinel|pioneer|quint|firstpost|theprint|scroll|"
            r"cruelty|credit|image|photo|video|streamer|twitch|whatsapp|telegram|"
            r"delivery|passenger|passengers|owner|store|shop|muslim|rohingya|centres|"
            r"reserves|landscapes|pressed|revealed|investigations|interrogation|"
            r"identified|discussion|discussions|stated|scent|squad|once|cases|"
            r"people|persons|suspects|accused|convict|convicts|offender|offenders|"
            r"boy|girl|man|woman|men|women|couple|family|resident|residents|"
            r"encounter|monday|tuesday|wednesday|thursday|friday|saturday|sunday|"
            r"morning|evening|night|march|april|january|february|may|june|july|"
            r"august|september|october|november|december|pangolin|leopard|tiger|"
            r"elephant|rhinoceros|rhino|turtle|tortoise|snake|crocodile|ivory|"
            r"skin|skins|horn|horns|tusk|tusks|claw|claws|bone|bones|scale|scales|"
            r"sanders|sander|coral|corals|quill|quills|gibbon|gibbons|"
            r"heroin|smack|ganja|drug|drugs|narcotic|narcotics|ndps|"
            r"escobar|pablo|hippo|hippos|sho|cbi|ncb|stf|ncrb|dfo|acf|rfo|division|force|task)\b",
            re.IGNORECASE,
        )
        number_word = re.compile(
            r"^(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|"
            r"fourteen|fifteen|twenty|thirty|forty|fifty|hundred|thousand|several|many|few|"
            r"multiple|numerous|duo|trio)(?:\s|$)",
            re.IGNORECASE,
        )
        verb_frag = re.compile(
            r"\b(?:ran|went|came|said|told|asked|made|took|gave|got|saw|"
            r"found|knew|thought|called|tried|used|turned|started|moved|"
            r"brought|kept|held|sent|happened|appeared|seemed|became|"
            r"revealed|pressed|stated|convicted|sentenced|busted|raided|"
            r"confiscated|caught|nabbed|apprehended|smuggled|traded|is|are|"
            r"towards|against|behind|before|between)\b",
            re.IGNORECASE,
        )

        if start_block.match(person):
            return True
        if contains_block.search(person):
            return True
        words = person.split()
        if all(len(w.strip(".")) <= 1 for w in words):
            return True
        if re.match(r"^\d+", person):
            return True
        if number_word.match(person.strip()):
            return True
        if len(person) <= 5 and person == person.upper():
            return True
        if len(person) <= 4:
            return True
        if verb_frag.search(person):
            return True
        if not any(
            len(re.sub(r"[^a-zA-Z\u0900-\u097F\u0C80-\u0CFF\u0B80-\u0BFF\u0C00-\u0C7F\u0A00-\u0A7F\u0980-\u09FF\u0D00-\u0D7F\u0A80-\u0AFF\u0B00-\u0B7F]", "", w)) >= 2
            for w in words
        ):
            return True
        person_lower = person.lower().strip()
        if person_lower in DISTRICT_TO_STATE or person_lower in INDIA_STATES:
            return True
        return False

    def _extract_involved_persons(self, text: str) -> list[str]:
        if not text:
            return []
        involved_count_hint = self._extract_involved_count_hint(text)
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
            candidate_scores[key] = candidate_scores.get(key, 0) + 3
        # Also try NER on all sentences (not just context) for broader coverage
        all_sentences = self._person_sentences(text)
        extra_ner = [s for s in all_sentences if s not in sentences][:6]
        for candidate in self._extract_ner_person_candidates(extra_ner):
            key = candidate.lower()
            display_names.setdefault(key, candidate)
            candidate_scores[key] = candidate_scores.get(key, 0) + 1

        ranked = sorted(candidate_scores.items(), key=lambda item: (-item[1], item[0]))
        raw_persons = [display_names[name] for name, score in ranked if score >= 2][:12]

        # Post-filter: remove obvious false positives
        involved_persons = []
        for person in raw_persons:
            if self._is_bad_person(person):
                continue
            involved_persons.append(person)
            if len(involved_persons) >= 8:
                break
        if 0 < involved_count_hint <= 20 and involved_count_hint > len(involved_persons) and len(involved_persons) < 6:
            remaining = involved_count_hint - len(involved_persons)
            suffix = "other unnamed suspect" if remaining == 1 else "other unnamed suspects"
            involved_persons.append(f"{remaining} {suffix}")
        return involved_persons[:8]

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
        
        # International Veto: If specific international hubs are mentioned without strong India context
        veto_terms = {
            "vietnam", "south africa", "kenya", "tanzania", "laos", "cambodia", "china", 
            "europe", "usa", "uk", "myanmar", "singapore", "thailand", "malaysia", 
            "indonesia", "bangladesh", "sri lanka", "dubai", "uae", "africa"
        }
        lower_text = text.lower()
        if any(term in lower_text for term in veto_terms):
            # Only allow if an Indian state/district is EXPLICITLY present
            if not (state or district):
                return False, 0.0
            
            # If the title explicitly mentions the international country as the primary location, drop it
            title_lower = lower_text.split(".")[0] # approximate title
            if any(term in title_lower for term in veto_terms) and not any(s in title_lower for s in INDIA_STATES):
                return False, 0.0
                
            india_score -= 0.20 # Heavier penalty for international mentions

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
            "rhino_horn_trafficking": 15,
            "tiger_skin_seizure": 14,
            "ivory_trade": 13,
            "red_sanders_smuggling": 12,
            "snake_venom_trade": 11,
            "illegal_wildlife_trade": 10,
            "forest_hunting_gang": 10,
            "smuggling": 9,
            "poaching": 8,
            "exotic_bird_trafficking": 7,
            "habitat_destruction": 7,
            "animal_cruelty": 6,
            "illegal_fishing": 5,
        }
        score += crime_bonus.get(crime_type, 0)

        # Endangered species bonus — higher for CITES Appendix I species
        critical_species = {"tiger", "rhino", "elephant", "snow leopard", "pangolin", "red panda"}
        high_species = {"leopard", "bear", "lion", "wolf", "red sanders", "star tortoise", "gharial"}
        if any(sp in critical_species for sp in species):
            score += 12
        elif any(sp in high_species for sp in species):
            score += 8
        elif species:
            score += 4

        if network_indicator:
            score += 10
        if repeat_indicator:
            score += 7
        if operational_details.get("seizure_present"):
            score += 6
        if operational_details.get("arrest_present"):
            score += 4
        if operational_details.get("cross_border"):
            score += 7
        if operational_details.get("weapon_signal"):
            score += 5
        if operational_details.get("quantities"):
            score += min(5, len(operational_details["quantities"]) * 2)
        if operational_details.get("money_mentions"):
            score += min(4, len(operational_details["money_mentions"]) * 2)
        if operational_details.get("vehicle_refs"):
            score += 3
        if operational_details.get("case_refs"):
            score += 2
        if person_hits >= 3:
            score += 5
        elif person_hits >= 2:
            score += 3
        elif person_hits >= 1:
            score += 1
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
    def _likely_smuggling_route(state: str, district: str, network_indicator: bool, species: list[str] | None = None) -> str:
        state_norm = (state or "").strip().lower()
        district_norm = (district or "").strip().lower()
        species_set = {s.lower() for s in (species or [])}
        if not state_norm:
            return "Potential interstate movement route not yet clear."

        # Species-specific known trafficking corridors (TRAFFIC/WCCB documented)
        SPECIES_ROUTES = {
            "tiger": {
                "madhya pradesh": "MP → Rajasthan → Gujarat border or MP → UP → Nepal corridor",
                "uttarakhand": "Corbett/Rajaji belt → UP/Delhi via NH-58/NH-34",
                "maharashtra": "Tadoba/Melghat → Nagpur rail hub → Delhi/international",
                "karnataka": "Bandipur/Nagarhole → Tamil Nadu/Kerala → port cities",
            },
            "red sanders": {
                "andhra pradesh": "Seshachalam Hills (Chittoor/Kadapa) → Chennai port → SE Asia/China",
                "tamil nadu": "TN coast → Sri Lanka transit or Chennai/Tuticorin port → export",
                "telangana": "Telangana → AP border → Chennai port",
            },
            "pangolin": {
                "assam": "NE India → Myanmar border → China/Vietnam",
                "manipur": "Manipur/Nagaland → Myanmar → SE Asian markets",
                "odisha": "Odisha → Kolkata → international via Chittagong or air cargo",
                "jharkhand": "Jharkhand/Chhattisgarh forests → Delhi/Mumbai via rail",
            },
            "elephant": {
                "assam": "Kaziranga belt → ivory processing via NE border routes",
                "kerala": "Kerala/Tamil Nadu border → ivory carving hubs in Rajasthan/Gujarat",
                "karnataka": "Southern Karnataka → Tamil Nadu → coastal export",
            },
        }

        # Check for species-specific route first
        for sp in species_set:
            routes = SPECIES_ROUTES.get(sp, {})
            if state_norm in routes:
                route_detail = routes[state_norm]
                base = f"Known {sp} trafficking corridor: {route_detail}."
                if network_indicator:
                    return f"{base} Organized network detected — coordinate with WCCB and border agencies."
                return base

        # General geographic route logic
        border_hubs = {"assam", "west bengal", "sikkim", "arunachal pradesh", "nagaland", "manipur", "mizoram", "tripura", "jammu and kashmir", "ladakh", "punjab", "rajasthan", "gujarat"}
        coastal_hubs = {"kerala", "tamil nadu", "andhra pradesh", "goa", "maharashtra", "odisha", "west bengal", "gujarat"}
        ne_states = {"assam", "manipur", "nagaland", "mizoram", "tripura", "arunachal pradesh", "meghalaya", "sikkim"}

        if state_norm in ne_states:
            base = "Northeast corridor: likely cross-border movement via Myanmar/Bangladesh/Nepal routes."
        elif state_norm in border_hubs:
            base = "Border-linked corridor into interstate or cross-border trafficking chain."
        elif state_norm in coastal_hubs:
            base = "Coastal transit route through port-linked channels (Chennai, Mumbai, Tuticorin, Kochi)."
        else:
            base = "Inland interstate movement through road and rail logistics corridors."
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
        full_content: str = "",
        source: str = "",
        prior_district_hits: int = 0,
        prior_source_hits: int = 0,
    ) -> IntelligenceResult:
        # Use full content for better context if available, fallback to title + summary
        source_text = normalize_space(full_content) if len(full_content) > 200 else normalize_space(f"{title}. {summary}")
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

        score_map = self._setfit_classifier.predict_score_map(text)
        if score_map is None:
            classifier = self._get_classifier()
        else:
            classifier = None

        if score_map is None and classifier is False:
            score_map = self._fallback_score_map(text)
        elif score_map is None:
            zs = classifier(
                text,
                candidate_labels=CLASSIFIER_LABELS,
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
            score_map.get("habitat destruction", 0.0),
            score_map.get("animal cruelty", 0.0),
            score_map.get("snake venom trade", 0.0),
            score_map.get("red sanders smuggling", 0.0),
        )

        rule_crime_type, rule_score = self._keyword_crime_scores(text)
        keyword_hits = self._keyword_signal_hits(text)
        species = self._extract_species(text)
        state, district, location = self._extract_location(text)

        # Also try extracting from original (non-lowered) text for regional scripts
        if not state and not district:
            state, district, location = self._extract_location(source_text)

        # AI fallback: use NER to detect state/district when rules found nothing
        if not state and not district:
            ner_state, ner_district = self._extract_location_ner(source_text)
            if ner_state:
                state = ner_state
                district = ner_district
                if district and state:
                    location = f"{district.title()}, {state.title()}"
                elif state:
                    location = state.title()

        involved_persons = self._extract_involved_persons(source_text)
        operational_details = self._extract_operational_details(source_text, text)
        network_indicator = self._network_indicator(text)
        repeat_indicator = prior_district_hits >= 2 or prior_source_hits >= 4
        has_false_positive = self._has_false_positive(text)
        strict_mode = settings.strict_ai_mode
        if strict_mode:
            strong_rule_signal = (
                rule_score >= 0.6
                or keyword_hits >= 4
                or (len(species) > 0 and poach_prob >= 0.55)
            )
        else:
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
            ("habitat_destruction", score_map.get("habitat destruction", 0.0)),
            ("animal_cruelty", score_map.get("animal cruelty", 0.0)),
            ("snake_venom_trade", score_map.get("snake venom trade", 0.0)),
            ("red_sanders_smuggling", score_map.get("red sanders smuggling", 0.0)),
            key=lambda item: item[1],
        )[0]
        crime_type = zs_crime if score_map.get("not wildlife crime", 0.0) < 0.75 else "unknown"
        if crime_type == "unknown":
            crime_type = rule_crime_type
        if crime_type == "unknown" and (poach_prob >= 0.45 or keyword_hits >= 3):
            crime_type = "poaching"

        outside_prob = score_map.get("incident outside India", 0.0)
        is_india, india_score = self._is_india(
            text=text,
            state=state,
            district=district,
            india_prob=score_map.get("incident in India", 0.0),
            outside_prob=outside_prob,
        )
        if not is_india and (state or district) and strong_rule_signal and (not strict_mode or outside_prob < 0.55):
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
        # Apply source credibility weighting
        if source:
            src_key = source.strip().lower()
            cred = next(
                (v for k, v in SOURCE_CREDIBILITY.items() if k in src_key),
                _SOURCE_DEFAULT,
            )
            # Nudge confidence ±5% based on source reliability
            confidence = max(0.0, min(1.0, confidence + (cred - 0.75) * 0.20))
        if strict_mode:
            effective_ai_threshold = min(0.98, settings.ai_threshold + 0.04)
            baseline_accept = confidence >= effective_ai_threshold and crime_type != "unknown"
            fallback_accept = (
                crime_type != "unknown"
                and not_wildlife_prob < 0.65
                and strong_rule_signal
                and poach_prob >= 0.45
                and evidence_strength >= 0.55
                and keyword_hits >= 3
            )
        else:
            baseline_accept = confidence >= settings.ai_threshold and crime_type != "unknown"
            fallback_accept = (
                crime_type != "unknown"
                and not_wildlife_prob < 0.82
                and strong_rule_signal
                and poach_prob >= 0.22
            )

        # Strict High-Value Signal Check
        has_operational_signal = any(t in text for t in ["arrested", "seized", "held", "nabbed", "raided", "caught", "booked", "seizure"])
        if not has_operational_signal:
            confidence *= 0.8 # Penalize articles with no clear action verbs
            
        is_poaching = baseline_accept or fallback_accept
        
        # Additional strict check for low signal articles
        if is_poaching and not has_operational_signal and keyword_hits < 5:
            is_poaching = False

        if has_false_positive and keyword_hits < 2 and poach_prob < 0.45 and not network_indicator:
            is_poaching = False
        if strict_mode and not_wildlife_prob >= 0.62 and evidence_strength < 0.75 and poach_prob < 0.70:
            is_poaching = False

        # Deep Recovery: If critical values are missing, do a second, more exhaustive scan of the source_text
        if is_poaching and not species:
            species = self._extract_species(source_text) # Re-scan with full casing/spacing
        if is_poaching and not (state or district):
            s_rec, d_rec, l_rec = self._extract_location(source_text)
            if s_rec or d_rec:
                state, district, location = s_rec, d_rec, l_rec
        
        if is_poaching and not involved_persons:
            # More aggressive person extraction on full text
            involved_persons = self._extract_involved_persons(source_text)[:5]

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
            species=species,
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
        llm_summary = self._summarizer.generate(
            article_text=source_text,
            species=species,
            state=state,
            district=district,
            suspects=involved_persons,
            crime_type=crime_type,
            default_summary=summary_text,
            default_points=intel_points,
            default_route=likely_smuggling_route,
            default_recommendation=enforcement_recommendation,
            default_confidence_explanation=confidence_explanation,
        )
        summary_text = str(llm_summary.get("summary") or summary_text)
        key_facts = llm_summary.get("key_facts")
        if isinstance(key_facts, list):
            intel_points = [str(item) for item in key_facts if str(item).strip()]
        likely_smuggling_route = str(llm_summary.get("smuggling_route") or likely_smuggling_route)
        enforcement_recommendation = str(llm_summary.get("recommendation") or enforcement_recommendation)
        confidence_explanation = str(llm_summary.get("confidence_explanation") or confidence_explanation)

        # Post-Analysis Metadata Recovery (using LLM hints)
        llm_species = llm_summary.get("extracted_species")
        if isinstance(llm_species, list) and not species:
            species = [str(s).strip().lower() for s in llm_species if str(s).strip()]
        
        llm_location = str(llm_summary.get("extracted_location") or "").strip()
        if llm_location and not (state or district):
            # Attempt to re-extract location from the LLM's suggested text
            s_ext, d_ext, l_ext = self._extract_location(llm_location.lower())
            if s_ext or d_ext:
                state, district, location = s_ext, d_ext, l_ext
        
        llm_suspects = llm_summary.get("extracted_suspects")
        if isinstance(llm_suspects, list) and not involved_persons:
            involved_persons = [str(p).strip() for p in llm_suspects if str(p).strip()][:8]

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
