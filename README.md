<div align="center">

# Wildguard
### Wildlife intelligence. Conservation in action.

**An intelligence workspace for monitoring wildlife crime and supporting poaching prevention across India, developed in collaboration with Wildlife Trust of India (WTI).**

[![CI](https://github.com/Siddhanthkjain2005/Wildlife-News/actions/workflows/ci.yml/badge.svg)](https://github.com/Siddhanthkjain2005/Wildlife-News/actions/workflows/ci.yml)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)](https://react.dev/)

**[Live application](https://wildlifenews.azurewebsites.net/) · [Features](#the-workspace) · [Architecture](#architecture) · [Quick start](#quick-start) · [Contributors](#contributors)**

</div>

![Bengal tiger in a forest — Wildguard conservation artwork](frontend/src/assets/tiger-sanctuary.jpg)

## Why Wildguard

Wildlife crime reports are scattered across regional news sources and languages. Wildguard brings those signals into one workspace so conservation teams can review incidents, identify patterns, and prepare informed responses.

The platform supports human investigation. Automated classifications, risk scores, forecasts, and legal drafts require review; they are not verified findings or legal determinations.

## The workspace

| Area | Capabilities |
| --- | --- |
| **Control Center** | Incident indicators, national threat map, live high-risk alerts, WebSocket updates |
| **SIGINT Analyzer** | Relationship exploration, network analysis, predictive hotspots, species trends, charts |
| **Database Workspace** | Incident filtering, semantic and keyword retrieval, review notes, source links, intelligence feeds |
| **Tactical Resources** | Wildlife protection references, complaint drafting, field seizure procedures |
| **System Administration** | Ingestion monitoring, diagnostics, audit history, backup and restore, reanalysis |
| **Exports** | CSV, Excel, PDF dossiers, and analyst briefing packs |

A forest-inspired interface combines original wildlife artwork, a rotating 3D globe, subtle parallax, keyboard focus states, and reduced-motion support. English, Hindi, and Kannada interface options complement configurable multilingual ingestion.

## Contributors

Built by:

- **Siddhanth K Jain**
- **Kamma Rohan**
- **Adithya P**
- **Dinesh Kulkarni**
- **Rajath V Shanbhogue**

Developed in collaboration with **Wildlife Trust of India (WTI)**.

## Architecture

```text
News sources → Collection & deduplication → Intelligence analysis → Database
                                                 ↓                   ↓
                                         Alerts & predictions    FastAPI APIs
                                                                     ↓
                                                         React command center
```

- **Backend:** FastAPI, SQLAlchemy, APScheduler, WebSockets.
- **Frontend:** React, Vite, Leaflet, Chart.js, Lucide icons.
- **Storage:** SQLite for a single-instance deployment; PostgreSQL integration is available.
- **Intelligence:** Configurable NLP classifiers, entity extraction, hybrid search, and external model gateways. Optional model packages are separate from the base installation.

## Quick start

Requires Python 3.11+ and Node.js 20+.

```bash
git clone https://github.com/Siddhanthkjain2005/Wildlife-News.git
cd Wildlife-News
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Set `ADMIN_USERNAME`, a strong `ADMIN_PASSWORD` or `ADMIN_PASSWORD_HASH`, and a random `JWT_SECRET` in `.env`. Configure news providers and model services for your environment. Never commit credentials.

```bash
npm ci --prefix frontend
npm run build:embed --prefix frontend
uvicorn app.main:app --reload --port 8000
```

Open **http://localhost:8000**. The backend serves the embedded frontend and APIs from the same origin. On Windows, activate the environment with `.venv\Scripts\activate`.

For optional local AI models, install `requirements-ai.txt` after checking available RAM and disk space. Without optional models, behavior depends on the configured fallback and strict-analysis settings.

## Project structure

```text
app/
  api/                  HTTP and WebSocket endpoints
  core/                 Configuration, security, database, caching
  models/               Database models
  repositories/         Persistence and query logic
  services/             Collection, intelligence, search, alerts, reports
  static/react-build/   Generated embedded dashboard
  templates/            Dashboard shell and server-rendered fallback
  workers/              Background synchronization
frontend/
  src/components/       React interface components
  src/assets/           Conservation imagery
  src/lib/              API client, formatting, translations
  src/styles/           Component and conservation design systems
  vite.config.js        Standalone and embedded builds
deployment/azure/       Hosting configuration and startup script
docs/                   Architecture and supporting documentation
scripts/                Maintenance and data migration utilities
tests/                  Backend regression tests
alembic/                Database migrations
```

## Verification

```bash
python -m pytest tests/ -q
npm run build --prefix frontend
npm run build:embed --prefix frontend
```

GitHub Actions checks the backend and both frontend build formats.

## Deployment

**Live application:** [wildlifenews.azurewebsites.net](https://wildlifenews.azurewebsites.net/)

**Hosting:** Azure App Service, India South Central.

The workspace requires authorized sign-in. Credentials are not published in this repository.

Custom domain configuration for **www.wildlifenews.me** is pending. See [Azure deployment](deployment/azure/README.md) for persistent storage, runtime settings, domain verification, and HTTPS configuration.

Use a single worker and instance while SQLite and the in-process scheduler are enabled. Store backups and runtime data outside the deployed application directory.

## Contributing and security

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines and [SECURITY.md](SECURITY.md) for security reporting. Do not publish investigation data, credentials, database backups, or private reports in issues or pull requests.

## Acknowledgments

Developed in collaboration with **Wildlife Trust of India (WTI)**. The tiger hero is original AI-generated conservation artwork; it is illustrative and does not represent a recorded incident. Map attribution is displayed in the interface.
