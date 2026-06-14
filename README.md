<div align="center">

# 🐾 Wildlife Intelligence Platform

### Real-Time Poaching & Wildlife Crime Intelligence System

**Developed in Collaboration with the Wildlife Trust of India (WTI)**

[![Live](https://img.shields.io/badge/🌐_Live-www.wildlifenews.me-00C853?style=for-the-badge)](https://www.wildlifenews.me)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

<br/>

**An AI-powered, multi-source intelligence platform that monitors, analyzes, and visualizes wildlife poaching incidents across India in real-time — built for conservation officers, wildlife researchers, and law enforcement agencies.**

<br/>

<img src="https://img.shields.io/badge/Articles_Analyzed-10,000+-blue?style=flat-square" />
<img src="https://img.shields.io/badge/News_Sources-6_Active-green?style=flat-square" />
<img src="https://img.shields.io/badge/Languages-7_Optimized-orange?style=flat-square" />
<img src="https://img.shields.io/badge/States_Covered-28-red?style=flat-square" />
<img src="https://img.shields.io/badge/Species_Tracked-50+-purple?style=flat-square" />
<img src="https://img.shields.io/badge/Uptime-24%2F7-brightgreen?style=flat-square" />

</div>

---

## 🎯 The Problem

Every year, India loses thousands of endangered animals to poaching and illegal wildlife trade. Law enforcement and conservation teams struggle with:

- **Fragmented intelligence** — poaching incidents are reported across hundreds of regional news sources in multiple regional languages
- **Slow response times** — manual monitoring misses critical incidents by hours or days
- **No centralized system** — no single platform aggregates, analyzes, and maps wildlife crime data in real-time

## 💡 The Solution

**Wildlife Intelligence Platform** is a production-grade, AI-powered system that continuously monitors regional news feeds, extracts structured intelligence from unstructured articles, and presents actionable insights through a unified command-center dashboard.

Developed in collaboration with the **Wildlife Trust of India (WTI)**, this platform bridges the gap between unstructured field reports/news and active law enforcement.

### What Makes This Different

| Feature | Traditional Approach | This Platform |
|---|---|---|
| **Data Collection** | Manual Google searches | Automated active source ingestion (RSS, APIs, GDELT) |
| **Language Support** | English only | 7 optimized Indian languages including Hindi, Kannada, Tamil, Telugu, Malayalam, Bengali |
| **Analysis** | Human reading | Hybrid Intelligence Engine (NER, zero-shot classification, and risk scoring) |
| **WPA Mapping** | Manual reference | Built-in Wildlife Protection Act (WPA) legal schedules lookup |
| **Chargesheet Drafting** | Manual lookup | Auto-generated legal chargesheet drafts based on incident data |
| **Threat Intelligence** | Historical reports | Predictive hotspot maps, regional threat levels, and species forecasts |
| **Update Frequency** | Daily/weekly | Every 3 minutes, 24/7 with WebSocket live updates |

---

## ⚙️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    WILDLIFE INTELLIGENCE PLATFORM                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────────────────────────────────┐       │
│  │              DATA COLLECTION LAYER                       │       │
│  │  Google RSS │ Bing RSS │ GDELT │ GNews                   │       │
│  │  Indian Media RSS feeds │ NGO Feeds                      │       │
│  └──────────────────────┬───────────────────────────────────┘       │
│                         │                                           │
│  ┌──────────────────────▼───────────────────────────────────┐       │
│  │              HYBRID INTELLIGENCE ENGINE                  │       │
│  │  ┌─────────┐ ┌──────────┐ ┌────────────┐ ┌───────────┐  │       │
│  │  │ Dedupe  │ │ AI/Rule  │ │ NER Person │ │ Location  │  │       │
│  │  │ Engine  │ │ Classifier│ │ Extractor │ │ Resolver  │  │       │
│  │  └─────────┘ └──────────┘ └────────────┘ └───────────┘  │       │
│  │  ┌─────────┐ ┌──────────┐ ┌────────────┐ ┌───────────┐  │       │
│  │  │ Species │ │ Risk     │ │ Crime Type │ │ India     │  │       │
│  │  │ Detect  │ │ Scoring  │ │ Classifier │ │ Validator │  │       │
│  │  └─────────┘ └──────────┘ └────────────┘ └───────────┘  │       │
│  └──────────────────────┬───────────────────────────────────┘       │
│                         │                                           │
│  ┌──────────────────────▼───────────────────────────────────┐       │
│  │         PREDICTIVE THREAT INTELLIGENCE                   │       │
│  │  Regional Threat Ratings │ Hotspot Prediction │ Species    │       │
│  │  Vulnerability Models    │ Network Analysis   │ Forecasts  │       │
│  └──────────────────────┬───────────────────────────────────┘       │
│                         │                                           │
│  ┌──────────────────────▼───────────────────────────────────┐       │
│  │              PRESENTATION LAYER                          │       │
│  │  React Dashboard │ WebSocket Live Sync │ Excel Exporter │       │
│  └──────────────────────────────────────────────────────────┘       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Features

### 🤖 Hybrid Intelligence Engine
- **Multi-model AI pipeline**: Rule-based fast-path + mDeBERTa-v3 transformer classifier + optional SetFit classifier.
- **Geographic Attribution**: Maps locations to 300+ Indian districts with fallback logic for local scripts.
- **Person NER Pipeline**: Extract suspect names using Regex + Named Entity Recognition models with a 200+ stopword blocklist to eliminate false positives (like news agencies, dates, or places).

### 🔮 Predictive Threat Intelligence
- **Threat Levels**: Dynamically calculates regional vulnerability ratings (Low, Moderate, Elevated, High, Critical) based on incident frequency, species endangerment level, and local poaching history.
- **Poaching Hotspots**: Identifies high-risk areas to optimize field patrols and resource deployment.
- **Species Vulnerability Trends**: Models and displays which species are currently facing heightened threat profiles.

### ⚖️ WPA Legal Reference Tool & Chargesheet Generator
- **WPA Schedule Reference**: Complete database reference of the Indian Wildlife (Protection) Act, 1972 (with 2022 amendments) mapping species to their respective legal schedules.
- **Draft Chargesheet Generator**: Proactively generates structured legal drafts referencing specific WPA sections, schedules, penalties, and jurisdiction details based on the selected incident data.

### 📊 System Operations & Live Feeds
- **WebSocket Sync**: Real-time feedback loop displaying active scraper sync status, data processing state, and live incident updates.
- **Production Hardening**: Admin settings protected with constant-time token comparison (`hmac.compare_digest`) and HTTP cookies configured with secure production headers.
- **Data Export**: Support for CSV, formatted Excel briefs, and full analyst briefing packs.

---

## 🗣️ Optimized Language Support

To optimize scraping speed and eliminate API rate limits (such as Google RSS 503 cooldowns), the platform's query processor is restricted to **7 high-yield languages**:

| Language | Script | Region Focus |
|---|---|---|
| **English** | Latin | National |
| **Hindi** (हिन्दी) | Devanagari | North / Central India |
| **Kannada** (ಕನ್ನಡ) | Kannada | Karnataka |
| **Tamil** (தமிழ்) | Tamil | Tamil Nadu |
| **Telugu** (తెలుగు) | Telugu | Andhra Pradesh / Telangana |
| **Malayalam** (മലയാളം) | Malayalam | Kerala |
| **Bengali** (বাংলা) | Bengali | West Bengal |

---

## 💻 Tech Stack

- **Backend**: FastAPI, Python 3.11+, SQLAlchemy, SQLite
- **Frontend**: React (Vite), Tailwind CSS/Vanilla CSS, Lucide icons, Leaflet (Map)
- **Deployment**: Nginx, Systemd services, DigitalOcean droplet

---

## 👤 Credits

Developed in partnership with:

* **Wildlife Trust of India (WTI)** - Field expertise, species dataset mappings, and legal parameters.
* **Siddhanth K. Jain** - Software engineering, system architecture, and AI integration.

[![GitHub](https://img.shields.io/badge/GitHub-Siddhanthkjain2005-181717?style=for-the-badge&logo=github)](https://github.com/Siddhanthkjain2005)

> *Building technology that makes a real difference in wildlife conservation.*

---

<div align="center">

**⭐ If this project helped you, please give it a star! ⭐**

*Built with ❤️ for wildlife conservation*

</div>
