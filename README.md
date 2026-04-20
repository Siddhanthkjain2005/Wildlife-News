# Wildlife Live Poaching News System

This project collects **live wildlife-poaching related news**, uses intelligence scoring to keep only likely **India poaching incidents**, stores results in a database, exports to an **Excel sheet**, and displays everything on a website dashboard.

## Features

- Multi-provider ingestion (Google RSS, Bing RSS, GDELT, plus optional key-based APIs).
- AI/rule filtering: runs with lightweight rule intelligence by default, and can optionally use `MoritzLaurer/mDeBERTa-v3-base-mnli-xnli` for higher accuracy.
- India-only enforcement using AI + keyword geo-context validation.
- Precision boost with domain keywords (wildlife + crime terms) to reduce false positives.
- Website dashboard (React + FastAPI APIs) with:
  - Manual sync button
  - Officer real-time panel (critical/high counters)
  - Live incident feed (auto-refresh polling)
  - Language filter
  - AI confidence filter
  - JSON API endpoints (`/api/news`, `/api/live-incidents`, `/api/officer-metrics`)
- Persistent storage in SQLite.
- Live Excel event appends during sync (`live_events` sheet).
- Full Excel snapshot refresh after sync (`news_items` sheet).
- Background scheduler for periodic automatic sync.

## Project Structure

```text
wildlife-live-poaching-news-system/
├─ app/
│  ├─ main.py
│  ├─ services/
│  ├─ models/
│  ├─ core/
│  ├─ static/react-build/        # built React assets served by FastAPI
│  └─ templates/react_index.html
├─ updated_frontend/             # React (Vite) source
├─ data/                         # SQLite DB + Excel output
├─ .env.example
├─ requirements.txt
├─ requirements-ai.txt            # optional heavy AI model dependencies
└─ README.md
```

## Setup

1. Create virtual environment and install dependencies:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Optional (higher-accuracy transformer mode, larger memory/image footprint):

```bash
pip install -r requirements-ai.txt
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Build frontend assets for backend-served UI:

```bash
cd updated_frontend
npm install
npm run build:embed
cd ..
```

4. Run the server:

```bash
python -m uvicorn app.main:app --reload
```

5. Open dashboard:

```text
http://127.0.0.1:8000
```

## Real-time start-date mode

To ingest/show incidents from a start date onward (without deleting older DB rows):

```env
TODAY_ONLY=false
APP_TIMEZONE="Asia/Kolkata"
START_FROM_DATE="2026-04-19"
SYNC_INTERVAL_MINUTES=3
MAX_ARTICLES_PER_QUERY=60
MAX_QUERIES_PER_LANGUAGE=8
PROVIDER_MIN_REQUEST_INTERVAL_SECONDS=1.0
PROVIDER_RATE_LIMIT_COOLDOWN_SECONDS=600
SYNC_SCHEDULER_JITTER_SECONDS=20
FRONTEND_ORIGIN="https://your-frontend-domain.vercel.app"
```

Behavior:

- Ingestion accepts only articles with `published_at >= START_FROM_DATE` (in `APP_TIMEZONE`).
- APIs and dashboard queries are filtered to the same start-date floor.
- Older rows are **not auto-deleted** at startup or during sync.

## 24/7 deployment (Railway backend + Vercel frontend)

### Railway (backend, always-on sync)

1. Push this repo to GitHub and create a Railway project from that repo.
2. Railway root directory: repository root (`/`).
3. Keep build mode on **Dockerfile** (this repo includes a slim `Dockerfile` to stay under Railway image-size limits).
4. Railway start command: `python -c "import os, uvicorn; uvicorn.run('app.main:app', host='0.0.0.0', port=int(os.getenv('PORT', '8000')))"` (already in `Procfile`).
5. Add a Railway volume and mount it at `/data`.
6. Set these Railway environment variables:

```env
DATABASE_URL=sqlite:////data/news.db
EXCEL_PATH=/data/wildlife_poaching_news.xlsx
LOG_DIR=/data/logs
TODAY_ONLY=false
APP_TIMEZONE=Asia/Kolkata
START_FROM_DATE=2026-04-19
SYNC_INTERVAL_MINUTES=3
MAX_ARTICLES_PER_QUERY=60
MAX_QUERIES_PER_LANGUAGE=8
PROVIDER_MIN_REQUEST_INTERVAL_SECONDS=1.0
PROVIDER_RATE_LIMIT_COOLDOWN_SECONDS=600
SYNC_SCHEDULER_JITTER_SECONDS=20
FRONTEND_ORIGIN=https://your-frontend-domain.vercel.app
```

7. Deploy and verify:
   - `https://<railway-backend>/health`
   - `https://<railway-backend>/api/sync-status`

### Vercel (frontend)

1. Import the same repo in Vercel.
2. Set **Root Directory** to `updated_frontend`.
3. Build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add Vercel environment variable:

```env
VITE_API_BASE_URL=https://<railway-backend>.up.railway.app
```

5. Redeploy frontend, then copy the final Vercel domain and set it in Railway `FRONTEND_ORIGIN`.

6. Enable admin auth on Railway so Vercel frontend requires login:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=<pbkdf2_sha256 hash>
ADMIN_SESSION_MINUTES=480
```

After deployment, the Vercel app shows a native login screen and stores the bearer token for authenticated API calls.

Notes:

- For local FastAPI-served frontend, run `npm run build:embed` inside `updated_frontend`.
- For Vercel deployment, use `npm run build` (default static SPA build).
- If Railway still shows image-size errors, clear old failed deployments and redeploy so it rebuilds from the new Dockerfile.
- If you see `sqlite3.OperationalError: unable to open database file`, verify volume mount path is `/data` and `DATABASE_URL=sqlite:////data/news.db`.

## Data Output

- Database: `data/news.db`
- Excel file: `data/wildlife_poaching_news.xlsx`

Excel columns include:

- published_at
- title
- summary
- source
- language
- ai_score
- url
- ai_reason
- last_seen_at

Live event sheet columns include:

- event_time_utc
- event_type
- severity
- published_at
- title
- source
- language
- ai_score
- provider
- query
- url

## APIs / Sources Used

### Enabled by default (no API key required)

- Google News RSS
- Bing News RSS
- GDELT DOC 2 API

### Optional (add API key in `.env`)

- NewsAPI (`NEWSAPI_KEY`)
- GNews (`GNEWS_API_KEY`)
- Mediastack (`MEDIASTACK_API_KEY`)
- NewsData (`NEWSDATA_API_KEY`)

You can enable/disable providers with:

- `ENABLED_PROVIDERS="google_rss,bing_rss,gdelt,newsapi,gnews,mediastack,newsdata,reddit_osint,ngo_feeds,x_adapter"`
- `govt_notices` is intentionally disabled in runtime because upstream feeds are unstable and can stall sync cycles.

## API Endpoints

- `GET /` dashboard
- `GET /api/news?lang=en&min_score=0.65&limit=100` filtered JSON data
- `GET /api/live-incidents?since_id=120&limit=30` new incidents stream
- `GET /api/officer-metrics` critical/high counters and latest ID
- `GET /api/dashboard-summary` command-center KPI summary
- `GET /api/map-data` map markers and state heat points
- `GET /api/chart-data` timeline/state/species/source datasets
- `GET /api/filter-news` analyst filter query endpoint
- `GET /api/analyst-brief` AI intelligence summaries + action recommendations
- `GET /api/reports` analyst intelligence reports
- `GET /api/report/{id}` detailed analyst report
- `GET /api/export/csv` analyst CSV intelligence export
- `GET /api/export/pdf` analyst PDF intelligence export
- `GET /api/export/excel` executive formatted Excel intelligence export
- `GET /api/export/excel-incidents-reports` two-sheet Excel export (`Total Incidents` + `Reports Today`)
- `GET /api/export/briefing-pack` analyst briefing pack (JSON)
- `GET /export/csv` CSV export alias
- `GET /export/pdf` PDF export alias
- `GET /export/excel` Excel export alias
- `GET /export/excel-incidents-reports` two-sheet Excel export alias

Export endpoints include all incidents by default (`min_confidence=0`) so downloaded CSV/PDF/Excel align with dashboard totals unless you pass a stricter filter.
- `GET /api/sync-status` live sync progress, duration, and latest stats
- `GET /api/alerts` alert events
- `GET /api/alerts-popup?since_id=0` high-risk popup stream
- `GET /api/osint-feed` external OSINT threat feed
- `GET /api/trending-keywords` watchlist trend ranking
- `GET /api/external-signals` external signals list
- `GET /api/watchlists` watchlist list
- `POST /api/watchlists` create/update watchlist keyword
- `GET /api/hotspots` district hotspot intelligence
- `GET /api/species-trends` species trend intelligence
- `GET /api/source-rankings` source reliability rankings
- `GET /api/sync-history` provider sync history
- `POST /api/admin/login` admin login (returns bearer token + cookie)
- `POST /api/admin/logout` admin logout (invalidates session token)
- `GET /api/security-status` security runtime status
- `GET /login` admin login page
- `POST /login` create admin session cookie
- `POST /logout` destroy admin session
- `GET /admin/settings` admin settings panel
- `POST /admin/settings/update` runtime provider/sync/cache/backup settings
- `POST /admin/settings/test-telegram` send test Telegram message
- `POST /admin/settings/test-email` send test email message
- `POST /admin/settings/cache-clear` clear API cache
- `POST /admin/settings/run-backup` run SQLite backup + SQL snapshot
- `GET /api/admin/audit-logs` audit history
- `GET /open/{id}` safe article opener (handles aggregator links)
- `GET /health` service health

## Accuracy Notes

- With `requirements-ai.txt` installed, the multilingual model can classify poaching context in different languages.
- Involved-person extraction uses multilingual regex + optional transformer NER (`PERSON_NER_ENABLED=true`) for better name precision.
- Without transformer dependencies, the app automatically uses rule-based fallback intelligence (lighter deploy footprint).
- Filtering combines model/rule confidence with wildlife/crime term validation.
- India-only mode (`INDIA_ONLY=true`) keeps incidents with strong India context.
- You can tighten precision by increasing `AI_THRESHOLD` in `.env` (example: `0.70`).
- You can tighten India geolocation strictness via `INDIA_THRESHOLD`.

## Security and Ops Hardening

- Optional admin protection for mutating routes:
  - `POST /api/watchlists`
- Export routes are protected:
  - `/api/export/*`
  - `/export/*`
- Configure admin auth in `.env` using:
  - `ADMIN_API_KEY` (optional API key auth for sensitive routes)
  - `ADMIN_TOKEN` (static token)
  - `ADMIN_USERNAME` + `ADMIN_PASSWORD_HASH` (recommended) or `ADMIN_PASSWORD` (fallback)
- In-memory API rate limiting for `/api/*` with `API_RATE_LIMIT_PER_MINUTE`.
- Login and sync trigger rate limits:
  - `LOGIN_RATE_LIMIT_PER_MINUTE`
  - `SYNC_RATE_LIMIT_PER_MINUTE`
- API response cache with TTL:
  - `CACHE_TTL_SECONDS`
- Scheduled SQLite backup and SQL snapshot:
  - `BACKUP_INTERVAL_MINUTES`
  - `BACKUPS_DIR`

## Language Support

- Configure ingestion languages using `SUPPORTED_LANGUAGES`.
- Default languages: `en, hi, kn, ta, te, ml, bn, mr, gu, pa, ur, or, as`.

## How the system works

1. Scheduler/manual sync pulls articles from each enabled provider and language query.
2. Advanced deduplication engine runs per article:
   - URL canonical hash dedupe
   - title fuzzy similarity
   - semantic similarity embeddings (with fallback)
   - duplicate confidence scoring
3. Duplicate reports are merged into a single incident with merged sources and report counts.
4. AI model classifies:
   - wildlife poaching likelihood
   - India incident likelihood
5. Only high-confidence India poaching incidents are stored/updated.
6. During sync, each accepted incident is appended to Excel `live_events` sheet.
7. After sync, full rows are exported to `news_items` sheet in Excel.
8. Dashboard counts track merged incident intelligence using incident rows + report totals.
9. OSINT connectors ingest Reddit + government notices + NGO feeds + X adapter signals.
10. Analyst suite supports filtered CSV/PDF/briefing-pack exports and AI action recommendations with route/confidence rationale.
11. Analyst report records are persisted in `reports` table with summary, intel points, recommendation, route hypothesis, and confidence reason.

Rate-limit resilience:

- Collector enforces provider-level request spacing (`PROVIDER_MIN_REQUEST_INTERVAL_SECONDS`).
- On upstream `429`, provider requests are paused using `Retry-After` (or `PROVIDER_RATE_LIMIT_COOLDOWN_SECONDS` fallback).
- Query rotation limits per-cycle pressure via `MAX_QUERIES_PER_LANGUAGE` while preserving rolling coverage across sync cycles.

## SQL and Excel flow

- SQL (SQLite) is the primary store: `data/news.db` table `news_items`.
- Sync writes/updates DB rows in small batches for near real-time visibility.
- Every accepted incident is also appended live to Excel (`live_events` sheet).
- End-of-sync exporter rewrites canonical report sheet (`news_items`).
- Website/API read from SQL, so Excel is an operational mirror/report.

## Live Excel on macOS

- Keep `data/wildlife_poaching_news.xlsx` open in Excel to monitor updates.
- If Excel locks the file for editing, live writes pause until the lock is released.
- Best practice for uninterrupted updates: keep workbook open in read-only view.

## Coverage Note

No system can literally cover the entire web in real time. This design maximizes coverage using multiple APIs/providers and can be extended by adding more provider adapters in `app/collector.py`.

## If you get `ModuleNotFoundError: No module named 'apscheduler'`

This means the app is being started with a different Python than your virtual environment.

Use:

```bash
source .venv/bin/activate
python -m uvicorn app.main:app --reload
```

and verify:

```bash
which python
which uvicorn
```
