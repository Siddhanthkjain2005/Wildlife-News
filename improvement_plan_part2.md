# Wildlife Intelligence Platform — Complete Improvement Plan (Part 2 of 4)

## Sections: Deduplication, Summarization, Predictions, Graph Intelligence, Vector Search, Backend Redesign

---

## 5. DEDUPLICATION IMPROVEMENTS

### 5.1 Current Weaknesses

| Failure Case | Why Current Fails |
|-------------|-------------------|
| Same arrest, different headline | "3 poachers held in Tadoba" vs "Tiger poaching gang busted in Chandrapur" — different titles, same event |
| Evolving story | Day 1: "Arrested", Day 2: "Sent to judicial custody", Day 3: "Bail denied" — same people, ongoing story |
| Multilingual duplicates | English article + Hindi article about same event — semantic similarity catches some, misses others |
| Partial reports | One source reports 3 arrested, another reports 5 — same event, different details |

### 5.2 New Architecture: Entity-Aware Incident Clustering

```
┌─────────────────────────────────────────────────┐
│            INCIDENT CLUSTERING ENGINE            │
│                                                  │
│  For each new article, compute similarity to     │
│  each existing incident on 5 dimensions:         │
│                                                  │
│  1. TEXT SIMILARITY (weight: 0.20)               │
│     Cosine similarity of BAAI/bge-m3 embeddings  │
│     Threshold: 0.75                              │
│                                                  │
│  2. ENTITY OVERLAP (weight: 0.30)                │
│     Jaccard similarity of extracted persons       │
│     If ≥1 person matches → strong signal         │
│                                                  │
│  3. LOCATION MATCH (weight: 0.25)                │
│     Same state + same district → 1.0             │
│     Same state, different district → 0.5         │
│     Different state → 0.0                        │
│                                                  │
│  4. SPECIES MATCH (weight: 0.15)                 │
│     Jaccard similarity of species sets            │
│                                                  │
│  5. TEMPORAL PROXIMITY (weight: 0.10)            │
│     Gaussian decay: exp(-(days_apart²) / 18)     │
│     Same day → 1.0, 3 days → 0.6, 7 days → 0.1  │
│                                                  │
│  COMPOSITE = Σ(weight_i × score_i)               │
│  If COMPOSITE ≥ 0.55 → MERGE into existing       │
│  If COMPOSITE 0.35-0.55 → FLAG for review        │
│  If COMPOSITE < 0.35 → NEW incident              │
└─────────────────────────────────────────────────┘
```

### 5.3 Merge Strategy

When merging:
```python
def merge_incident(existing: NewsItem, new_article: RawArticle, analysis: IntelligenceResult):
    existing.source_count += 1
    existing.report_count += 1
    existing.merged_sources += f"|{new_article.source}"
    existing.last_seen_at = datetime.utcnow()

    # Take the BEST confidence
    if analysis.confidence > existing.confidence:
        existing.confidence = analysis.confidence
        existing.risk_score = analysis.risk_score

    # UNION of persons (not replace)
    existing_persons = set(p.strip() for p in existing.involved_persons.split(",") if p.strip())
    new_persons = set(analysis.involved_persons)
    existing.involved_persons = ", ".join(existing_persons | new_persons)

    # Fill in missing fields
    if not existing.state and analysis.state:
        existing.state = analysis.state
    if not existing.district and analysis.district:
        existing.district = analysis.district

    # Append new intel points
    existing_points = json.loads(existing.intel_points or "[]")
    existing_points.extend(analysis.intel_points)
    existing.intel_points = json.dumps(list(set(existing_points)))
```

### 5.4 Duplicate Explanation Engine

```python
def explain_duplicate(existing, new_article, scores):
    reasons = []
    if scores["text_sim"] > 0.75:
        reasons.append(f"Text similarity: {scores['text_sim']:.0%}")
    if scores["entity_overlap"] > 0:
        reasons.append(f"Shared persons: {scores['shared_persons']}")
    if scores["location_match"] > 0.5:
        reasons.append(f"Same location: {scores['location']}")
    if scores["species_match"] > 0:
        reasons.append(f"Same species: {scores['species']}")
    return {
        "is_duplicate": True,
        "merged_into": existing.id,
        "confidence": scores["composite"],
        "reasons": reasons,
    }
```

---

## 6. AI SUMMARIZATION + INTELLIGENCE GENERATION

### 6.1 Current Problem

Current summaries are template-based: "Poaching incident involving {species} in {state}. {persons} arrested." This provides zero analytical value.

### 6.2 New Architecture: Quantized LLM with Structured Prompting

```
Article text + extracted entities
    │
    ▼
┌─────────────────────────────────────────┐
│  STRUCTURED PROMPT                       │
│                                          │
│  You are a wildlife crime intelligence   │
│  analyst. Given the following article    │
│  and extracted facts, generate:          │
│                                          │
│  Article: {article_text}                 │
│  Extracted:                              │
│    Species: {species}                    │
│    Location: {state}, {district}         │
│    Suspects: {persons}                   │
│    Crime: {crime_type}                   │
│                                          │
│  Generate JSON:                          │
│  {                                       │
│    "summary": "2-3 sentence intel brief",│
│    "key_facts": ["fact1", "fact2", ...], │
│    "smuggling_route": "origin→dest",     │
│    "recommendation": "action items",     │
│    "risk_factors": ["factor1", ...],     │
│    "confidence_explanation": "why this   │
│      confidence level"                   │
│  }                                       │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│  Phi-3-mini-4k-instruct (Q4_K_M)       │
│  • 3.8B parameters                      │
│  • Quantized to 4-bit: ~2.5GB RAM       │
│  • Inference: ~2-5 seconds per article  │
│  • Runs on CPU (no GPU needed)          │
│  • Via llama-cpp-python or ctransformers│
└─────────────────────────────────────────┘
```

### 6.3 Low-Memory LLM Options

| Model | Params | Quantized Size | RAM | Speed | Quality |
|-------|--------|----------------|-----|-------|---------|
| Qwen2-0.5B-Instruct | 0.5B | Q8: ~500MB | ~1GB | ~0.5s | Basic |
| Phi-3-mini-4k (Q4) | 3.8B | Q4: ~2.3GB | ~3GB | ~3s | Good |
| Mistral-7B (Q4) | 7B | Q4: ~4.1GB | ~5GB | ~5s | Great |
| Llama-3.1-8B (Q4) | 8B | Q4: ~4.7GB | ~6GB | ~7s | Excellent |

**Recommendation**: Start with **Qwen2-0.5B** for Railway (fits in 512MB with quantization), upgrade to **Phi-3-mini** when on a proper server.

### 6.4 Source Credibility Weighting

```python
SOURCE_CREDIBILITY = {
    "The Hindu": 0.95,
    "Times of India": 0.90,
    "NDTV": 0.90,
    "Indian Express": 0.90,
    "Mongabay India": 0.95,  # specialist conservation outlet
    "Down to Earth": 0.93,
    "Hindustan Times": 0.88,
    "Deccan Herald": 0.85,
    "DT Next": 0.70,
    "LatestLY": 0.60,
    "NewsMeter": 0.65,
    "unknown": 0.50,
}

# Weight intelligence by source credibility
weighted_confidence = raw_confidence * SOURCE_CREDIBILITY.get(source, 0.50)
```

---

## 7. PREDICTIVE ANALYTICS REDESIGN

### 7.1 Feature Engineering

```python
FEATURES = {
    # Temporal features
    "day_of_week": int,           # 0-6
    "month": int,                 # 1-12
    "is_monsoon": bool,           # Jun-Sep (poaching patterns change)
    "is_summer": bool,            # Mar-May (peak poaching season)
    "days_since_last_incident": float,

    # Geographic features
    "state_encoded": int,         # Label-encoded state
    "state_incident_count_30d": int,
    "district_incident_count_30d": int,
    "is_border_district": bool,
    "nearest_sanctuary_km": float,

    # Species features
    "species_encoded": int,
    "species_trend_7d": float,    # Week-over-week change
    "species_national_count_30d": int,

    # Crime features
    "crime_type_encoded": int,
    "avg_risk_score_state_30d": float,
    "organized_crime_ratio_30d": float,

    # Network features
    "suspect_seen_before": bool,
    "suspect_connection_count": int,
}
```

### 7.2 Models

| Task | Model | Features | Target |
|------|-------|----------|--------|
| Hotspot prediction | XGBoost Regressor | Temporal + geographic | incidents_next_7d per district |
| Species risk | LightGBM Classifier | Species + temporal + geographic | risk_level (low/med/high/critical) |
| Seasonal forecast | Prophet / ARIMA | Time series of daily incidents | weekly incident count |
| Anomaly detection | Isolation Forest | All features | is_anomalous (bool) |
| Network risk | Graph features + XGBoost | Suspect graph centrality | organized_crime_probability |

### 7.3 Retraining Pipeline

```
Every 24 hours (or 50 new articles):
    │
    ├── Extract features from all incidents
    ├── Split: 80% train, 20% validation
    ├── Train XGBoost + LightGBM
    ├── Evaluate: RMSE, F1, AUC-ROC
    ├── Compare to previous model
    ├── If better → deploy new model
    ├── If worse → keep old model, log warning
    └── Store metrics in model_metrics table
```

### 7.4 Drift Detection

```python
from scipy.stats import ks_2samp

def detect_drift(recent_predictions, historical_predictions):
    """Kolmogorov-Smirnov test for distribution shift."""
    stat, p_value = ks_2samp(recent_predictions, historical_predictions)
    if p_value < 0.05:
        logger.warning("Distribution drift detected (p=%.4f). Triggering retrain.", p_value)
        trigger_retrain()
```

---

## 8. GRAPH INTELLIGENCE ENGINE

### 8.1 Graph Schema

```
Nodes:
  (Person {name, role, first_seen, last_seen, incident_count})
  (Incident {id, title, date, risk_score, crime_type})
  (Location {state, district, lat, lng, type})
  (Species {name, conservation_status, cites_appendix})
  (Organization {name, type, size})

Edges:
  (Person)-[:INVOLVED_IN {role: suspect/officer}]->(Incident)
  (Person)-[:ASSOCIATED_WITH]->(Person)          # co-accused
  (Person)-[:MEMBER_OF]->(Organization)
  (Incident)-[:OCCURRED_IN]->(Location)
  (Incident)-[:INVOLVED_SPECIES]->(Species)
  (Location)-[:CONNECTED_TO {route_type}]->(Location)  # smuggling routes
```

### 8.2 NetworkX Implementation (lightweight, no Neo4j needed)

```python
import networkx as nx

G = nx.Graph()

# Build graph from incidents
for incident in incidents:
    G.add_node(f"incident_{incident.id}", type="incident", **incident.__dict__)
    for person in incident.involved_persons.split(","):
        person = person.strip()
        if person:
            G.add_node(f"person_{person}", type="person", name=person)
            G.add_edge(f"person_{person}", f"incident_{incident.id}")

# Find organized crime networks
components = list(nx.connected_components(G))
large_networks = [c for c in components if len(c) > 5]

# Find central actors
centrality = nx.betweenness_centrality(G)
top_actors = sorted(centrality.items(), key=lambda x: -x[1])[:10]

# Find smuggling corridors
location_pairs = [(i.state, i.district) for i in incidents if i.state]
from collections import Counter
corridors = Counter(location_pairs).most_common(10)
```

### 8.3 Graph Queries (API endpoints)

```
GET /api/graph/networks → List of identified criminal networks
GET /api/graph/person/{name} → Person's incident history + connections
GET /api/graph/corridor/{state} → Smuggling corridors from/to state
GET /api/graph/species/{name} → Species crime network map
```

---

## 9. VECTOR DATABASE + SEMANTIC SEARCH

### 9.1 Architecture

```
Article → BAAI/bge-m3 embedding (1024-dim) → Store in vector DB
    │
    ▼
Queries:
  "Find similar cases to pangolin trafficking in Odisha"
  → Embed query → Vector search → Top-K similar incidents
  → Return with similarity scores + explanations
```

### 9.2 Implementation Options

| Option | Pros | Cons | Best For |
|--------|------|------|----------|
| **pgvector** (PostgreSQL extension) | Single DB, no extra service, SQL integration | Slower than dedicated vector DBs | Your scale (250-10K incidents) |
| **Qdrant** | Fast, purpose-built, good API | Extra service to deploy | 10K-1M incidents |
| **FAISS** (in-memory) | Fastest, no server needed | Volatile, no persistence built-in | Prototyping |
| **ChromaDB** | Easy API, good for RAG | Less mature | RAG + LLM workflows |

**Recommendation**: Start with **FAISS in-memory** (zero deployment overhead), migrate to **pgvector** when you move to PostgreSQL.

### 9.3 FAISS Implementation

```python
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

embedder = SentenceTransformer("BAAI/bge-m3")
index = faiss.IndexFlatIP(1024)  # Inner product (cosine after normalization)

# Index all incidents
texts = [f"{item.title} {item.summary}" for item in all_incidents]
embeddings = embedder.encode(texts, normalize_embeddings=True)
index.add(np.array(embeddings, dtype="float32"))

# Search
query_emb = embedder.encode(["pangolin trafficking Odisha"], normalize_embeddings=True)
distances, indices = index.search(np.array(query_emb, dtype="float32"), k=10)
similar_incidents = [all_incidents[i] for i in indices[0]]
```

### 9.4 New API Endpoints

```
GET /api/search?q=pangolin+trafficking+odisha&limit=10
  → Semantic vector search across all incidents

GET /api/similar/{incident_id}?limit=5
  → Find incidents similar to a specific one

GET /api/rag/ask?q=What+are+the+main+smuggling+routes+for+red+sanders
  → RAG: retrieve relevant incidents + generate answer with LLM
```

---

## 10. DATABASE + BACKEND REDESIGN

### 10.1 PostgreSQL Migration

```sql
-- New normalized schema

CREATE TABLE incidents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(600) NOT NULL,
    summary TEXT NOT NULL,
    enriched_body TEXT,
    published_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_seen_at TIMESTAMPTZ DEFAULT NOW(),
    -- AI fields
    ai_score FLOAT NOT NULL,
    confidence FLOAT DEFAULT 0.0,
    risk_score INTEGER DEFAULT 0,
    crime_type VARCHAR(80) DEFAULT 'unknown',
    is_poaching BOOLEAN DEFAULT FALSE,
    is_india BOOLEAN DEFAULT TRUE,
    -- Intel
    intel_summary TEXT DEFAULT '',
    intel_points JSONB DEFAULT '[]',
    smuggling_route TEXT DEFAULT '',
    recommendation TEXT DEFAULT '',
    -- Dedup
    source_count INTEGER DEFAULT 1,
    report_count INTEGER DEFAULT 1,
    cluster_id INTEGER,  -- incident cluster
    -- Embedding
    embedding vector(1024)  -- pgvector
);

CREATE TABLE incident_sources (
    id SERIAL PRIMARY KEY,
    incident_id INTEGER REFERENCES incidents(id),
    source_name VARCHAR(160) NOT NULL,
    url VARCHAR(1200) NOT NULL UNIQUE,
    url_hash VARCHAR(64) NOT NULL,
    language VARCHAR(16),
    provider VARCHAR(50),
    fetched_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE persons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    role VARCHAR(50) DEFAULT 'suspect',  -- suspect, officer, witness
    confidence FLOAT DEFAULT 0.0,
    first_seen TIMESTAMPTZ,
    last_seen TIMESTAMPTZ,
    incident_count INTEGER DEFAULT 1
);

CREATE TABLE incident_persons (
    incident_id INTEGER REFERENCES incidents(id),
    person_id INTEGER REFERENCES persons(id),
    role VARCHAR(50),
    PRIMARY KEY (incident_id, person_id)
);

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    state VARCHAR(120),
    district VARCHAR(120),
    place_name VARCHAR(240),
    lat FLOAT,
    lng FLOAT,
    geom GEOMETRY(Point, 4326)  -- PostGIS
);

CREATE TABLE incident_species (
    incident_id INTEGER REFERENCES incidents(id),
    species_name VARCHAR(100),
    PRIMARY KEY (incident_id, species_name)
);

-- Indexes
CREATE INDEX idx_incidents_published ON incidents(published_at DESC);
CREATE INDEX idx_incidents_state ON incidents USING GIN (to_tsvector('english', intel_summary));
CREATE INDEX idx_incidents_embedding ON incidents USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_locations_geom ON locations USING GIST (geom);
```

### 10.2 Redis Caching Layer

```python
import redis

r = redis.Redis(host="localhost", port=6379, decode_responses=True)

# Cache API responses with TTL
def cached_endpoint(key: str, ttl: int = 60):
    def decorator(func):
        async def wrapper(*args, **kwargs):
            cached = r.get(key)
            if cached:
                return json.loads(cached)
            result = await func(*args, **kwargs)
            r.setex(key, ttl, json.dumps(result))
            return result
        return wrapper
    return decorator

# Pub/sub for real-time updates
def publish_incident(incident):
    r.publish("incidents", json.dumps(incident.to_dict()))
```

### 10.3 Background Workers (Celery)

```python
from celery import Celery

celery_app = Celery("wildlife", broker="redis://localhost:6379/0")

@celery_app.task
def analyze_article(article_id: int):
    """Run intelligence pipeline on a single article."""
    ...

@celery_app.task
def retrain_models():
    """Retrain prediction models."""
    ...

@celery_app.task(rate_limit="10/m")
def fetch_provider(provider: str, language: str, query: str):
    """Fetch from a single provider (rate-limited)."""
    ...
```

### 10.4 Migration Strategy (SQLite → PostgreSQL)

```
Phase 1: Add PostgreSQL support alongside SQLite
  - Abstract database access behind repository pattern
  - Support both via DATABASE_URL scheme detection

Phase 2: Migrate data
  - Export SQLite to CSV
  - Import to PostgreSQL with schema mapping
  - Normalize persons, locations, species into separate tables

Phase 3: Cut over
  - Switch DATABASE_URL to PostgreSQL
  - Remove SQLite code paths
  - Add pgvector + PostGIS extensions
```
