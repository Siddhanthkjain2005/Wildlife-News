# Wildlife Intelligence Platform — Complete Improvement Plan (Part 3 of 4)

## Sections: FastAPI Architecture, Real-Time, Frontend, Security, DevOps, Testing

---

## 11. FASTAPI ARCHITECTURE IMPROVEMENTS

### 11.1 Current Problem

`main.py` is 3,270 lines with 63 endpoints, all sync logic, startup tasks, and background jobs in one file.

### 11.2 New Modular Structure

```
app/
├── main.py                          (50 lines — app factory only)
├── config.py                        (settings)
├── dependencies.py                  (DI container)
│
├── api/                             (Route modules)
│   ├── __init__.py
│   ├── dashboard.py                 (GET /api/dashboard-summary, chart-data, map-data)
│   ├── incidents.py                 (GET /api/filter-news, news, live-incidents)
│   ├── intelligence.py              (GET /api/reports, analyst-brief, hotspots)
│   ├── predictions.py               (GET /api/predictions/*)
│   ├── exports.py                   (GET /api/export/*)
│   ├── alerts.py                    (GET /api/alerts, alerts-popup)
│   ├── osint.py                     (GET /api/osint-feed, external-signals)
│   ├── admin.py                     (POST /api/admin/*, settings)
│   ├── auth.py                      (POST /api/admin/login, logout)
│   ├── search.py                    (GET /api/search, similar)
│   ├── graph.py                     (GET /api/graph/*)
│   └── health.py                    (GET /health)
│
├── services/                        (Business logic — unchanged)
│   ├── intelligence.py
│   ├── collector.py
│   ├── predictor.py
│   ├── dedupe.py
│   ├── alert_engine.py
│   ├── graph_engine.py              (NEW)
│   ├── search_engine.py             (NEW)
│   └── summarizer.py                (NEW)
│
├── repositories/                    (Data access layer — NEW)
│   ├── incident_repo.py
│   ├── person_repo.py
│   ├── report_repo.py
│   └── audit_repo.py
│
├── models/                          (SQLAlchemy models)
├── core/                            (Infrastructure)
├── workers/                         (Background tasks)
│   ├── sync_worker.py
│   ├── analysis_worker.py
│   └── prediction_worker.py
└── utils/
```

### 11.3 New main.py (Clean App Factory)

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import dashboard, incidents, intelligence, predictions, exports,
                    alerts, osint, admin, auth, search, graph, health
from app.core.config import settings
from app.core.database import init_database
from app.workers.sync_worker import start_scheduler

def create_app() -> FastAPI:
    app = FastAPI(title="Wildlife Intelligence Platform", version="2.0.0")

    # Middleware
    app.add_middleware(CORSMiddleware, allow_origins=settings.cors_origins, ...)

    # Routes
    app.include_router(health.router, tags=["Health"])
    app.include_router(auth.router, prefix="/api/admin", tags=["Auth"])
    app.include_router(dashboard.router, prefix="/api", tags=["Dashboard"])
    app.include_router(incidents.router, prefix="/api", tags=["Incidents"])
    app.include_router(intelligence.router, prefix="/api", tags=["Intelligence"])
    app.include_router(predictions.router, prefix="/api", tags=["Predictions"])
    app.include_router(exports.router, prefix="/api/export", tags=["Exports"])
    app.include_router(alerts.router, prefix="/api", tags=["Alerts"])
    app.include_router(osint.router, prefix="/api", tags=["OSINT"])
    app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])
    app.include_router(search.router, prefix="/api", tags=["Search"])
    app.include_router(graph.router, prefix="/api/graph", tags=["Graph"])

    # Startup
    @app.on_event("startup")
    async def startup():
        init_database()
        start_scheduler()

    return app

app = create_app()
```

### 11.4 Dependency Injection

```python
# dependencies.py
from functools import lru_cache
from app.services.intelligence import HybridIntelligenceEngine
from app.services.predictor import PredictiveEngine

@lru_cache()
def get_intelligence_engine() -> HybridIntelligenceEngine:
    engine = HybridIntelligenceEngine()
    engine.warmup()
    return engine

@lru_cache()
def get_predictor() -> PredictiveEngine:
    return PredictiveEngine()

# In route:
from fastapi import Depends
from app.dependencies import get_intelligence_engine

@router.post("/analyze")
def analyze(text: str, engine=Depends(get_intelligence_engine)):
    return engine.analyze(title=text, summary="")
```

---

## 12. REAL-TIME SYSTEM REDESIGN

### 12.1 WebSocket Architecture

```
┌──────────┐    WebSocket     ┌──────────────┐    Redis Pub/Sub    ┌────────────┐
│  Browser │◄────────────────►│  FastAPI WS  │◄──────────────────►│  Sync      │
│  Client  │    /ws/live      │  Handler     │    "incidents"      │  Worker    │
└──────────┘                  └──────────────┘    channel           └────────────┘
```

### 12.2 Implementation

```python
# api/websocket.py
from fastapi import WebSocket, WebSocketDisconnect
import redis.asyncio as aioredis

active_connections: list[WebSocket] = []

@router.websocket("/ws/live")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    active_connections.append(ws)
    try:
        r = aioredis.from_url("redis://localhost:6379")
        pubsub = r.pubsub()
        await pubsub.subscribe("incidents", "alerts", "sync_status")

        async for message in pubsub.listen():
            if message["type"] == "message":
                await ws.send_json({
                    "channel": message["channel"].decode(),
                    "data": json.loads(message["data"])
                })
    except WebSocketDisconnect:
        active_connections.remove(ws)

# In sync worker, after storing new incident:
async def publish_new_incident(incident):
    r = aioredis.from_url("redis://localhost:6379")
    await r.publish("incidents", json.dumps({
        "type": "new_incident",
        "id": incident.id,
        "title": incident.title,
        "risk_score": incident.risk_score,
        "state": incident.state,
    }))
```

### 12.3 Frontend WebSocket Client

```javascript
// lib/websocket.js
export function connectWebSocket(token, onMessage) {
    const ws = new WebSocket(`${WS_BASE}/ws/live?token=${token}`);

    ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.channel === "incidents") onMessage("incident", msg.data);
        if (msg.channel === "alerts") onMessage("alert", msg.data);
        if (msg.channel === "sync_status") onMessage("sync", msg.data);
    };

    ws.onclose = () => setTimeout(() => connectWebSocket(token, onMessage), 5000);
    return ws;
}
```

---

## 13. FRONTEND INTELLIGENCE DASHBOARD UPGRADE

### 13.1 New Components

| Component | Purpose | Library |
|-----------|---------|---------|
| `InvestigationTimeline` | Temporal view of linked incidents | `react-chrono` or custom |
| `GraphVisualization` | Suspect network / smuggling route graph | `react-force-graph-2d` or `vis-network` |
| `IncidentClusterView` | Grouped incidents by event | Custom accordion with similarity scores |
| `SemanticSearch` | Natural language search bar | Custom with API integration |
| `AnalystWorkspace` | Multi-panel investigation view | Custom layout with resizable panes |
| `HeatmapLayer` | Density overlay on map | Leaflet.heat plugin |
| `ConfidenceOverlay` | Visual confidence indicators on all data | Custom badges/progress bars |
| `ExplainableAI` | "Why this score?" panels | Custom expandable sections |
| `LiveAlertStream` | WebSocket-powered alert toasts | `react-hot-toast` or custom |
| `TrendSparklines` | Mini trend charts in KPI cards | `recharts` Sparkline |

### 13.2 Graph Visualization

```javascript
// components/NetworkGraph.jsx
import ForceGraph2D from 'react-force-graph-2d';

function NetworkGraph({ graphData }) {
    return (
        <ForceGraph2D
            graphData={graphData}
            nodeLabel={node => node.name}
            nodeColor={node =>
                node.type === 'suspect' ? '#ff4444' :
                node.type === 'incident' ? '#4488ff' :
                node.type === 'location' ? '#44ff44' : '#888'
            }
            linkColor={() => 'rgba(255,255,255,0.2)'}
            nodeRelSize={6}
            linkDirectionalArrowLength={3}
            onNodeClick={(node) => openInvestigation(node.id)}
        />
    );
}
```

### 13.3 Analyst Workspace Layout

```
┌─────────────────────────────────────────────────────────┐
│ TopBar: Search │ Filters │ Export │ Live Status          │
├────────────┬────────────────────────┬───────────────────┤
│            │                        │                   │
│  Sidebar   │     Main Panel         │   Intel Panel     │
│  • Map     │  (changes based on     │  • AI Summary     │
│  • Table   │   selected view)       │  • Key Facts      │
│  • Graph   │                        │  • Risk Factors   │
│  • Search  │  [Map View]            │  • Recommendations│
│  • Alerts  │  [Table View]          │  • Confidence     │
│  • Trends  │  [Graph View]          │  • Similar Cases  │
│            │  [Timeline View]       │  • Sources        │
│            │  [Cluster View]        │                   │
│            │                        │                   │
├────────────┴────────────────────────┴───────────────────┤
│ Bottom: Alert Stream │ OSINT Feed │ Predictions         │
└─────────────────────────────────────────────────────────┘
```

---

## 14. SECURITY HARDENING

### 14.1 JWT with Refresh Tokens

```python
# Replace session-based auth with JWT
import jwt
from datetime import datetime, timedelta

SECRET_KEY = settings.jwt_secret
ALGORITHM = "HS256"

def create_tokens(user_id: str):
    access = jwt.encode({
        "sub": user_id,
        "exp": datetime.utcnow() + timedelta(minutes=30),
        "type": "access"
    }, SECRET_KEY, algorithm=ALGORITHM)

    refresh = jwt.encode({
        "sub": user_id,
        "exp": datetime.utcnow() + timedelta(days=7),
        "type": "refresh"
    }, SECRET_KEY, algorithm=ALGORITHM)

    return {"access_token": access, "refresh_token": refresh}
```

### 14.2 Role-Based Access Control (RBAC)

```python
ROLES = {
    "viewer": ["read:incidents", "read:dashboard", "read:map"],
    "analyst": ["read:*", "export:*", "search:*"],
    "admin": ["read:*", "write:*", "export:*", "admin:*"],
}

def require_permission(permission: str):
    def dependency(token: str = Depends(get_current_user)):
        user_role = get_user_role(token)
        role_perms = ROLES.get(user_role, [])
        if permission not in role_perms and "*" not in [p.split(":")[1] for p in role_perms if ":" in p]:
            raise HTTPException(403, "Insufficient permissions")
    return Depends(dependency)

@router.get("/api/admin/audit-logs")
def audit_logs(_=require_permission("admin:audit")):
    ...
```

### 14.3 Additional Security

| Feature | Implementation |
|---------|---------------|
| API Gateway | Traefik or Kong in front of FastAPI |
| Secrets management | HashiCorp Vault or AWS Secrets Manager |
| Input sanitization | Pydantic models with field validators |
| SIEM logging | Structured JSON logs → ELK stack |
| Anomaly detection | Unusual API usage patterns → alert |
| Data encryption at rest | SQLite encryption via SQLCipher, or PostgreSQL TDE |

---

## 15. DEVOPS + CLOUD REDESIGN

### 15.1 Docker Compose (Development)

```yaml
version: "3.9"
services:
  api:
    build: .
    ports: ["8000:8000"]
    environment:
      DATABASE_URL: postgresql://wildlife:pass@db:5432/wildlife
      REDIS_URL: redis://redis:6379/0
      CELERY_BROKER_URL: redis://redis:6379/1
    depends_on: [db, redis]

  worker:
    build: .
    command: celery -A app.workers worker -l info
    depends_on: [db, redis]

  scheduler:
    build: .
    command: celery -A app.workers beat -l info
    depends_on: [db, redis]

  db:
    image: postgis/postgis:16-3.4
    environment:
      POSTGRES_DB: wildlife
      POSTGRES_PASSWORD: pass
    volumes: ["pgdata:/var/lib/postgresql/data"]

  redis:
    image: redis:7-alpine
    volumes: ["redisdata:/data"]

  prometheus:
    image: prom/prometheus
    volumes: ["./prometheus.yml:/etc/prometheus/prometheus.yml"]
    ports: ["9090:9090"]

  grafana:
    image: grafana/grafana
    ports: ["3000:3000"]
    depends_on: [prometheus]

volumes:
  pgdata:
  redisdata:
```

### 15.2 CI/CD Pipeline (GitHub Actions)

```yaml
name: CI/CD
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.11" }
      - run: pip install -r requirements.txt -r requirements-test.txt
      - run: pytest tests/ --cov=app --cov-report=xml
      - run: ruff check app/
      - run: mypy app/ --ignore-missing-imports

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: docker build -t wildlife-intel .
      - run: docker push ghcr.io/siddhanthkjain2005/wildlife-intel:latest

  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: railway up --service wildlife-api
```

### 15.3 Observability Stack

| Tool | Purpose |
|------|---------|
| **Prometheus** | Metrics collection (request latency, sync duration, model inference time) |
| **Grafana** | Dashboards for ops monitoring |
| **Sentry** | Error tracking and alerting |
| **ELK Stack** | Log aggregation and search |
| **Jaeger** | Distributed tracing (when microservices) |

### 15.4 Prometheus Metrics

```python
from prometheus_client import Counter, Histogram, Gauge

SYNC_DURATION = Histogram("sync_duration_seconds", "Sync cycle duration")
ARTICLES_PROCESSED = Counter("articles_processed_total", "Total articles processed", ["provider"])
MODEL_INFERENCE_TIME = Histogram("model_inference_seconds", "AI model inference time", ["model"])
ACTIVE_INCIDENTS = Gauge("active_incidents", "Current incident count")
```

---

## 16. TESTING + EVALUATION FRAMEWORK

### 16.1 Test Structure

```
tests/
├── unit/
│   ├── test_intelligence.py        # NER, classification, post-filter
│   ├── test_location.py            # Location extraction accuracy
│   ├── test_person_filter.py       # Person post-filter validation
│   ├── test_dedupe.py              # Deduplication logic
│   └── test_risk_scoring.py        # Risk score computation
├── integration/
│   ├── test_collector.py           # Provider adapters with mocked HTTP
│   ├── test_sync_pipeline.py       # Full sync lifecycle
│   └── test_api_endpoints.py       # API contract tests
├── benchmarks/
│   ├── benchmark_ner.py            # NER precision/recall on labeled data
│   ├── benchmark_classification.py # Classification accuracy
│   └── benchmark_location.py       # Location extraction accuracy
├── fixtures/
│   ├── labeled_articles.json       # 200+ manually labeled articles
│   ├── known_persons.json          # Ground truth person list
│   └── known_locations.json        # Ground truth location list
└── conftest.py
```

### 16.2 NER Benchmark Pipeline

```python
# benchmarks/benchmark_ner.py
def benchmark_person_extraction():
    """Evaluate person extraction against ground truth."""
    labeled_data = load_json("fixtures/labeled_articles.json")

    true_positives = 0
    false_positives = 0
    false_negatives = 0

    for article in labeled_data:
        predicted = engine.extract_persons(article["text"])
        expected = set(article["ground_truth_persons"])

        predicted_set = set(predicted)
        tp = len(predicted_set & expected)
        fp = len(predicted_set - expected)
        fn = len(expected - predicted_set)

        true_positives += tp
        false_positives += fp
        false_negatives += fn

    precision = true_positives / (true_positives + false_positives)
    recall = true_positives / (true_positives + false_negatives)
    f1 = 2 * precision * recall / (precision + recall)

    print(f"Precision: {precision:.3f}")
    print(f"Recall: {recall:.3f}")
    print(f"F1: {f1:.3f}")
```

### 16.3 Creating Labeled Data from Your DB

```python
# Script to export articles for manual labeling
import sqlite3, json

db = sqlite3.connect("wildlife_news_backup (5).db")
cur = db.cursor()
cur.execute("SELECT id, title, summary, state, district, involved_persons FROM news_items WHERE is_poaching=1")

labeling_data = []
for row in cur.fetchall():
    labeling_data.append({
        "id": row[0],
        "text": f"{row[1]} {row[2]}",
        "current_state": row[3],
        "current_district": row[4],
        "current_persons": row[5],
        # Fill these manually:
        "ground_truth_state": "",
        "ground_truth_district": "",
        "ground_truth_persons": [],
        "ground_truth_crime_type": "",
    })

with open("fixtures/labeled_articles.json", "w") as f:
    json.dump(labeling_data, f, indent=2)
# Then manually review and fill ground truth fields
```
