# Wildlife Intelligence Platform — Complete Improvement Plan (Part 1 of 4)

## Sections: AI/NLP Redesign, Location Extraction, Person Extraction, Crime Classification

---

## 1. AI/NLP PIPELINE REDESIGN

### 1.1 Why the Current Approach Fails

| Problem | Root Cause | Impact |
|---------|-----------|--------|
| Wrong state detection | Dictionary lookup only matches exact substrings; "Nampally station" doesn't match "Hyderabad" → Telangana | ~20% of articles get empty/wrong state |
| Weak person extraction | NER model treats ANY capitalized phrase as a person; post-filter is reactive, not proactive | Garbage like "The Hans India", "busted in Gujarat" |
| Inconsistent classification | Zero-shot classification assigns scores without domain knowledge; "animal cruelty" scores same as "tiger poaching ring" | Non-poaching articles pass threshold |
| Poor multilingual NER | Babelscape/wikineural is generic; it was never trained on Indian crime text | Extracts Hindi sentence fragments as names |
| Weak dedup | Semantic embeddings don't capture event-level similarity; same arrest reported differently = two incidents | Duplicate incidents inflate counts |
| Basic summaries | Template-based generation; no actual reasoning over article content | Intel summaries are generic filler |

### 1.2 What Should REMAIN

| Component | Why Keep |
|-----------|---------|
| Multi-provider collector (17 sources) | Well-engineered, battle-tested, handles rate limits properly |
| URL normalization pipeline | Solid; prevents aggregator duplicates |
| Regex species extraction | Species names are finite and well-defined; regex is perfect |
| Post-filter architecture | The concept of blocklist filtering is sound; just needs better data |
| Dual-mode fallback design | Critical for resource-constrained deployment |
| APScheduler sync loop | Simple, reliable, fits the use case |

### 1.3 What Should Be REPLACED

| Component | Replace With | Why |
|-----------|-------------|-----|
| Zero-shot classifier (mDeBERTa) | Fine-tuned SetFit classifier | 10x faster, 5x less memory, domain-specific accuracy |
| Generic NER (Babelscape) | GLiNER + spaCy with custom entity types | Zero-shot NER that understands SUSPECT vs OFFICER vs LOCATION |
| Dictionary-only location | spaCy NER + Mordecai2 geoparser + fuzzy matching | Handles context, disambiguation, regional scripts |
| Rule-based crime classification | Multi-label fine-tuned classifier | Hierarchical, calibrated confidence |
| Embedding-only dedup | Entity-aware incident clustering | Same suspects + same species + same location = same incident |
| Template summaries | Small LLM (Phi-3-mini / Qwen2-0.5B quantized) | Actual reasoning over article content |

### 1.4 New Intelligence Pipeline Architecture

```
Article (title + summary + enriched_body)
    │
    ▼
┌─────────────────────────────────────────────┐
│  STAGE 1: PREPROCESSING                     │
│  • Language detection (fasttext/langdetect)  │
│  • Script normalization (Unicode NFKC)       │
│  • Sentence segmentation (spaCy/stanza)      │
│  • Translation (optional: Helsinki-NLP/      │
│    opus-mt for non-English → English)        │
└──────────────────┬──────────────────────────┘
                   │
    ┌──────────────┼──────────────┐
    ▼              ▼              ▼
┌────────┐  ┌──────────┐  ┌──────────────┐
│STAGE 2 │  │STAGE 3   │  │STAGE 4       │
│Classify│  │Entity    │  │Location      │
│        │  │Extract   │  │Resolve       │
│SetFit  │  │GLiNER +  │  │spaCy NER +   │
│fine-   │  │spaCy     │  │Mordecai2 +   │
│tuned   │  │PER/ORG/  │  │FuzzyMatch +  │
│binary  │  │SUSPECT/  │  │DISTRICT_MAP  │
│+multi  │  │OFFICER   │  │              │
│label   │  │          │  │              │
└───┬────┘  └────┬─────┘  └──────┬───────┘
    │            │               │
    ▼            ▼               ▼
┌─────────────────────────────────────────────┐
│  STAGE 5: CONTEXTUAL FUSION                  │
│  • Cross-validate entities against location  │
│  • Disambiguate persons vs locations         │
│  • Score confidence per extraction           │
│  • Detect organized crime indicators         │
│  • Classify crime type (multi-label)         │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  STAGE 6: INTELLIGENCE GENERATION            │
│  • Risk scoring (ML-based, not rule-based)   │
│  • Intel summary (quantized LLM)             │
│  • Smuggling route inference                 │
│  • Enforcement recommendation                │
│  • Incident clustering + dedup               │
└─────────────────────────────────────────────┘
```

### 1.5 Recommended Models

| Purpose | Model | Params | Memory | Why |
|---------|-------|--------|--------|-----|
| Classification | `SetFit` (fine-tuned on your data) | ~33M | ~150MB | Few-shot fine-tuning, no GPU needed, 10x faster than zero-shot |
| NER (persons/orgs) | `GLiNER-large-v2.1` | ~304M | ~600MB | Zero-shot NER with custom entity types; no fine-tuning needed |
| NER (locations) | `spaCy xx_ent_wiki_sm` + custom | ~11M | ~50MB | Fast, multilingual, good for LOC entities |
| Geoparsing | `Mordecai2` + GeoNames | — | ~200MB | Maps extracted locations to coordinates with disambiguation |
| Embeddings | `BAAI/bge-m3` | ~568M | ~1.1GB | SOTA multilingual embeddings for dedup + search |
| Summaries | `microsoft/Phi-3-mini-4k-instruct` (Q4) | ~3.8B | ~2.5GB | Small enough for CPU, smart enough for summaries |
| Translation | `Helsinki-NLP/opus-mt-mul-en` | ~77M | ~300MB | Fast multilingual→English for Hindi/Kannada/Tamil |
| Crime classifier | Fine-tuned `xlm-roberta-base` | ~278M | ~1.1GB | Multi-label, multilingual, fine-tunable |

---

## 2. STATE + DISTRICT EXTRACTION IMPROVEMENTS

### 2.1 Why Current Approach Fails

```
CURRENT: article text → lowercase → substring search against DISTRICT_TO_STATE dict
```

**Failure modes**:
1. **"Nampally station"** — Nampally is in Hyderabad, Telangana, but "nampally" isn't in the dictionary
2. **"Arrested near Agra"** — "agra" matches, but the article is about a UK bakery (ID=216)
3. **"PD Act invoked against two red sanders smugglers"** — No location mentioned at all
4. **Multiple locations** — "smuggled from Assam to Mumbai" — which state is the incident in?
5. **Regional scripts without dictionary entry** — "ਯੂਗਾਂਡਾ" (Punjabi for Uganda) — not in India at all

### 2.2 New Location Extraction Pipeline

```
Article text
    │
    ├──→ [spaCy NER] → Extract all LOC/GPE entities
    │       "Nampally", "Hyderabad", "Telangana"
    │
    ├──→ [DISTRICT_TO_STATE dictionary] → exact + fuzzy match
    │       "nampally" → not found
    │       "hyderabad" → "telangana" ✓
    │
    ├──→ [Mordecai2 geoparsing] → resolve to coordinates
    │       "Nampally" → (17.38, 78.47) → Hyderabad, Telangana
    │
    ├──→ [Fuzzy matching] → rapidfuzz against all 300+ entries
    │       "Nampaly" (typo) → "nampally" → Hyderabad → Telangana
    │
    └──→ [Context validator]
            Is this location in India? (lat 8-37, lng 68-97)
            Is this a wildlife-relevant area?
            Which location is the INCIDENT location vs ORIGIN/DESTINATION?
    │
    ▼
┌─────────────────────────────────────────┐
│  LOCATION DISAMBIGUATION LOGIC          │
│                                         │
│  1. If only ONE Indian state found → use│
│  2. If MULTIPLE states found:           │
│     a. Prefer state mentioned in title  │
│     b. Prefer state with district match │
│     c. Prefer state with most mentions  │
│  3. If NO state found:                  │
│     a. Try fuzzy match (threshold 85%)  │
│     b. Try NER → Mordecai2 → reverse   │
│     c. Leave empty (honest "Unknown")   │
│  4. VALIDATE: Reject if article is      │
│     clearly about a non-India location  │
│     (Uganda, Thailand, USA keywords)    │
└─────────────────────────────────────────┘
```

### 2.3 Expanded District Database

Current: 300+ entries. Target: 800+ entries.

**Data sources to add**:
- Census 2011 district list (739 districts)
- All state capitals and major cities
- Wildlife sanctuary/national park names → district → state
- Railway station names → district → state
- Airport names → district → state
- Regional script mappings from Google Transliterate API

```python
# New structure: multi-level lookup
LOCATION_DB = {
    # Level 1: Direct district → state
    "baripada": {"state": "odisha", "district": "mayurbhanj", "lat": 21.94, "lng": 86.72},

    # Level 2: City/town → district → state
    "nampally": {"state": "telangana", "district": "hyderabad", "lat": 17.38, "lng": 78.47},

    # Level 3: Wildlife area → district → state
    "similipal": {"state": "odisha", "district": "mayurbhanj", "type": "national_park"},
    "tadoba": {"state": "maharashtra", "district": "chandrapur", "type": "tiger_reserve"},
    "ranthambore": {"state": "rajasthan", "district": "sawai madhopur", "type": "tiger_reserve"},

    # Level 4: Regional scripts
    "ಬಳ್ಳಾರಿ": {"state": "karnataka", "district": "ballari", "script": "kannada"},
    "जगदलपुर": {"state": "chhattisgarh", "district": "bastar", "script": "devanagari"},
}
```

### 2.4 Best Libraries

| Library | Purpose | Install |
|---------|---------|---------|
| `mordecai3` | Geoparsing + disambiguation | `pip install mordecai3` |
| `geopy` | Reverse geocoding | `pip install geopy` |
| `rapidfuzz` | Fuzzy string matching | Already installed |
| `spacy` + `xx_ent_wiki_sm` | Multilingual NER for LOC | `pip install spacy && python -m spacy download xx_ent_wiki_sm` |
| `geonamescache` | Offline GeoNames lookup | `pip install geonamescache` |

---

## 3. INVOLVED PERSON EXTRACTION REDESIGN

### 3.1 Why Current Approach Produces Garbage

**Root cause**: The NER model extracts ANY entity labeled PER, regardless of context. The post-filter then tries to remove bad ones reactively. This is fundamentally backwards.

**Examples of failures**:
```
"The Hans India" → NER sees "Hans India" as PER → post-filter catches "Hans"
"busted in Gujarat's Rajkot" → NER sees "Rajkot" as PER → post-filter catches "Rajkot"
"Delivery boy arrested" → NER sees "Delivery boy" as PER → hard to filter
"Minister stated that discussions" → NER sees "Minister" as PER → filter catches "stated"
```

### 3.2 New Architecture: Contextual Entity Extraction

```
Article text
    │
    ├──→ [GLiNER with custom entity types]
    │       Entity types:
    │       • SUSPECT — "accused", "arrested person", "smuggler"
    │       • OFFICER — "police officer", "forest officer", "DFO"
    │       • WITNESS — "informant", "complainant"
    │       • ORGANIZATION — "gang", "syndicate", "network"
    │       • NEWS_SOURCE — "newspaper", "media outlet"
    │
    │       GLiNER prompt: Extract entities of types
    │       [SUSPECT, OFFICER, NEWS_SOURCE] from the text
    │
    │       Result: [
    │           ("Mrityunjay Haldar", "SUSPECT", 0.92),
    │           ("The Hans India", "NEWS_SOURCE", 0.88),
    │           ("DFO Ramesh Kumar", "OFFICER", 0.85)
    │       ]
    │
    ├──→ [Dependency parsing — arrest event extraction]
    │       Pattern: VERB(arrest/nab/apprehend) → OBJECT(person name)
    │       "Police arrested Ajij Ullah and Mumtaz Ahmad"
    │       → dep parse → arrested.obj = ["Ajij Ullah", "Mumtaz Ahmad"]
    │       → these are SUSPECTS with HIGH confidence
    │
    ├──→ [Pattern-based extraction — improved regex]
    │       "identified as NAME" → SUSPECT
    │       "accused NAME" → SUSPECT
    │       "DFO/SP/SHO NAME" → OFFICER (exclude from suspects)
    │       "reported by NAME" → NEWS_SOURCE (exclude)
    │
    └──→ [Cross-validation + scoring]
            For each candidate person:
              +3 if GLiNER labeled SUSPECT
              +2 if found via arrest-verb dependency
              +2 if matches "identified as" pattern
              +1 if appears in multiple sources
              -5 if GLiNER labeled NEWS_SOURCE
              -5 if GLiNER labeled OFFICER
              -3 if matches location database
              -3 if fails character-level validation
              -2 if appears only in title (not body)

            Score ≥ 3 → include as involved person
            Score 1-2 → include with "unconfirmed" tag
            Score ≤ 0 → exclude
```

### 3.3 GLiNER Implementation

```python
# pip install gliner
from gliner import GLiNER

model = GLiNER.from_pretrained("urchade/gliner_large-v2.1")

# Custom entity types — this is the key innovation
labels = ["suspect", "police officer", "news source", "organization", "location"]

text = "Police arrested Mrityunjay Haldar near Similipal, The Hans India reported"

entities = model.predict_entities(text, labels, threshold=0.5)
# Result:
# [("Mrityunjay Haldar", "suspect", 0.92),
#  ("Similipal", "location", 0.87),
#  ("The Hans India", "news source", 0.85)]
```

**Why GLiNER is better than Babelscape NER**:
- GLiNER accepts arbitrary entity type labels at inference time
- You can specify "suspect" instead of generic "PER"
- It understands context: "The Hans India" is clearly a news source, not a person
- No fine-tuning needed — just provide descriptive entity type labels

### 3.4 Role-Aware Person Classification

```python
ROLE_PATTERNS = {
    "suspect": [
        r"(?:arrested|nabbed|apprehended|detained|held|caught)\s+(\w[\w\s]{3,40})",
        r"(?:accused|suspect|convict|offender)\s+(\w[\w\s]{3,40})",
        r"(?:identified\s+as)\s+(\w[\w\s]{3,40})",
        r"(?:smuggler|poacher|trafficker)\s+(\w[\w\s]{3,40})",
    ],
    "officer": [
        r"(?:DFO|SP|SHO|ASP|DSP|IPS|IAS|ACF|RFO|DCF)\s+(\w[\w\s]{3,40})",
        r"(?:officer|inspector|constable|ranger)\s+(\w[\w\s]{3,40})",
    ],
    "exclude": [
        r"(?:Minister|Chief\s+Minister|PM|President)\s+(\w[\w\s]{3,40})",
        r"(?:correspondent|reporter|editor|journalist)\s+(\w[\w\s]{3,40})",
    ],
}
```

### 3.5 Validation Methods

1. **Name structure validation**: Indian names typically have 2-4 words, each capitalized. "Ajij Ullah" ✓, "busted in Gujarat" ✗
2. **Script consistency**: A person name should be in one script (all Latin, all Devanagari, etc.)
3. **Cross-source verification**: If the same name appears in 2+ different articles about the same incident, confidence increases significantly
4. **Location cross-check**: If the extracted "person" matches a known location, it's almost certainly wrong
5. **Length validation**: Real Indian names are typically 6-40 characters

---

## 4. BETTER CRIME CLASSIFICATION

### 4.1 Current Problem

Zero-shot classification with generic hypothesis labels cannot distinguish:
- "Tiger poaching" (poaching) vs "Tiger conservation success" (not a crime)
- "Red sanders smuggling" (smuggling) vs "Red sanders plantation" (not a crime)
- "Snake venom trafficking" (trafficking) vs "Snake venom research" (not a crime)

### 4.2 Multi-Label Hierarchical Classification

```
Level 1: Is this a wildlife crime article?
    ├── YES → Level 2
    └── NO → Reject

Level 2: What type of crime? (multi-label, can be multiple)
    ├── Poaching (direct killing of wildlife)
    ├── Trafficking (transport/movement of wildlife products)
    ├── Smuggling (cross-border movement)
    ├── Illegal Trade (buying/selling)
    ├── Illegal Possession (keeping wildlife products)
    ├── Habitat Destruction (forest encroachment, mining)
    ├── Poisoning (deliberate poisoning of wildlife)
    ├── Cyber Wildlife Crime (online trading)
    ├── Organized Crime (syndicate/network operations)
    └── Unknown

Level 3: Species involved? (multi-label)
    tiger, leopard, elephant, pangolin, red_sanders, ...
```

### 4.3 Fine-Tuning Strategy with SetFit

```python
# SetFit: few-shot fine-tuning — needs only 8-16 examples per class
from setfit import SetFitModel, SetFitTrainer

# Training data from your own database (labeled manually or semi-auto)
train_data = [
    ("Three poachers arrested for killing tiger in Tadoba", "poaching"),
    ("Red sanders logs worth Rs 5 crore seized at port", "smuggling"),
    ("Online wildlife trade ring busted on social media", "cyber_wildlife_crime"),
    ("Forest encroachment destroys elephant corridor", "habitat_destruction"),
    # ... 8-16 examples per class
]

model = SetFitModel.from_pretrained("sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")
trainer = SetFitTrainer(model=model, train_dataset=train_data)
trainer.train()
model.save_pretrained("./models/crime_classifier")

# Inference: ~5ms per article, ~150MB memory
predictions = model.predict(["Pangolin scales seized from smuggler at airport"])
# → ["smuggling"]
```

**Why SetFit**:
- Needs only 8-16 labeled examples per class (you have 250+ articles to label from)
- Trains in <5 minutes on CPU
- Inference is 10x faster than zero-shot (5ms vs 200ms)
- Memory: ~150MB vs ~1.2GB for mDeBERTa
- Accuracy: Typically 85-95% with 16 examples, vs 60-75% for zero-shot

### 4.4 Confidence Calibration

Current confidence scores are uncalibrated — a score of 0.72 doesn't mean 72% probability of being correct.

**Fix**: Temperature scaling after fine-tuning:
```python
import numpy as np

def calibrate(logits, temperature=1.5):
    """Post-hoc calibration using temperature scaling."""
    scaled = logits / temperature
    probs = np.exp(scaled) / np.sum(np.exp(scaled))
    return probs

# Find optimal temperature on validation set
# Use Expected Calibration Error (ECE) as metric
```
