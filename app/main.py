from datetime import UTC, date, datetime, timedelta
import json
import re
from difflib import SequenceMatcher
from pathlib import Path
from threading import Thread
from time import perf_counter
from urllib.parse import parse_qsl, urlencode, urljoin, urlparse
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

from apscheduler.schedulers.background import BackgroundScheduler
from bs4 import BeautifulSoup
from fastapi import Depends, FastAPI, Form, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, RedirectResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import requests
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.backup import create_snapshot_export, create_sqlite_backup, sqlite_integrity_check, sqlite_path_from_url
from app.core.cache import TTLCache
from app.core.database import SessionLocal, diagnose_database, get_db, init_database
from app.core.logger import get_logger, init_logging
from app.core.retry import retry_call
from app.core.security import RateLimiter, admin_sessions, require_admin_access
from app.excel_exporter import append_live_event_to_excel, export_news_to_excel
from app.i18n import UI_TEXT, get_ui_text
from app.models import Alert, AuditLog, DistrictStat, Entity, ExternalSignal, NewsItem, Report, SourceStat, SpeciesStat, SyncLog, Watchlist
from app.services.alert_engine import AlertEngine
from app.services.audit import record_audit
from app.services.collector import NewsCollector
from app.services.dedupe import DedupeEngine
from app.services.intelligence import HybridIntelligenceEngine
from app.services.report_export import build_csv_bytes, build_excel_bytes, build_pdf_bytes
from app.services.reports import upsert_report_for_news
from app.utils.india_geo import INDIA_CENTER, centroid_for_state
from app.workers.sync_manager import SyncStateStore

app = FastAPI(title=settings.app_name)
allowed_origins = [origin.strip() for origin in settings.frontend_origin.split(",") if origin.strip()]
if allowed_origins:
    allow_credentials = "*" not in allowed_origins
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=allow_credentials,
        allow_methods=["*"],
        allow_headers=["*"],
    )
app.mount("/static", StaticFiles(directory="app/static"), name="static")
templates = Jinja2Templates(directory="app/templates")

init_logging()
app_logger = get_logger("app.main")
sync_logger = get_logger("sync.main")

intelligence_engine = HybridIntelligenceEngine()
dedupe_engine = DedupeEngine(
    title_similarity_threshold=settings.dedupe_title_similarity_threshold,
    semantic_similarity_threshold=settings.dedupe_semantic_similarity_threshold,
    embedding_model_name=settings.dedupe_embedding_model_name,
)
collector = NewsCollector(intelligence_engine=intelligence_engine, dedupe_engine=dedupe_engine)
alert_engine = AlertEngine()
scheduler = BackgroundScheduler(timezone="UTC")
sync_state_store = SyncStateStore()
runtime_diagnostics: dict[str, object] = {"ai_model_ready": False, "startup_time": None}
rate_limiter = RateLimiter(settings.api_rate_limit_per_minute)
login_rate_limiter = RateLimiter(settings.login_rate_limit_per_minute)
api_cache = TTLCache(settings.cache_ttl_seconds)
DEFAULT_WATCHLISTS = [
    ("poaching", "threat"),
    ("tiger skin", "species"),
    ("ivory", "species"),
    ("rhino horn", "species"),
    ("pangolin", "species"),
    ("smuggling", "crime"),
    ("seizure", "crime"),
    ("wildlife trade", "crime"),
]
AGGREGATOR_HOSTS = {"news.google.com", "www.news.google.com", "google.com", "www.google.com", "bing.com", "www.bing.com"}
URL_RELEVANCE_HINTS = {
    "wildlife",
    "poaching",
    "poacher",
    "smuggling",
    "trafficking",
    "seizure",
    "tiger",
    "elephant",
    "rhino",
    "pangolin",
    "leopard",
    "ivory",
    "tusk",
}
ARTICLE_RESOLUTION_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
    )
}

try:
    APP_TIMEZONE = ZoneInfo(settings.app_timezone)
except ZoneInfoNotFoundError:
    APP_TIMEZONE = ZoneInfo("UTC")
    app_logger.warning("Invalid APP_TIMEZONE=%s. Falling back to UTC.", settings.app_timezone)


def _scope_from_start_enabled() -> bool:
    return bool(settings.today_only or str(settings.start_from_date or "").strip())


def _today_bounds_utc() -> tuple[datetime, datetime]:
    now_local = datetime.now(tz=APP_TIMEZONE)
    start_local = datetime(now_local.year, now_local.month, now_local.day, tzinfo=APP_TIMEZONE)
    end_local = start_local + timedelta(days=1)
    start_utc = start_local.astimezone(UTC).replace(tzinfo=None)
    end_utc = end_local.astimezone(UTC).replace(tzinfo=None)
    return start_utc, end_utc


def _start_from_utc() -> datetime:
    raw_start = str(settings.start_from_date or "").strip()
    if raw_start:
        try:
            parsed_date = date.fromisoformat(raw_start)
            start_local = datetime(parsed_date.year, parsed_date.month, parsed_date.day, tzinfo=APP_TIMEZONE)
            return start_local.astimezone(UTC).replace(tzinfo=None)
        except ValueError:
            app_logger.warning("Invalid START_FROM_DATE=%s. Falling back to current local date.", raw_start)
    start_utc, _ = _today_bounds_utc()
    return start_utc


def _apply_today_news_scope(stmt):
    if not _scope_from_start_enabled():
        return stmt
    start_utc = _start_from_utc()
    return stmt.where(NewsItem.published_at >= start_utc)


def _apply_today_signal_scope(stmt):
    if not _scope_from_start_enabled():
        return stmt
    start_utc = _start_from_utc()
    return stmt.where(ExternalSignal.published_at >= start_utc)


def _purge_non_today_records(db: Session) -> dict[str, int]:
    if not settings.today_only:
        return {
            "news_deleted": 0,
            "alerts_deleted": 0,
            "entities_deleted": 0,
            "reports_deleted": 0,
            "signals_deleted": 0,
            "species_rows": 0,
            "source_rows": 0,
            "district_rows": 0,
        }

    start_utc, end_utc = _today_bounds_utc()
    outside_news_ids = db.execute(
        select(NewsItem.id).where((NewsItem.published_at < start_utc) | (NewsItem.published_at >= end_utc))
    ).scalars().all()

    alerts_deleted = 0
    entities_deleted = 0
    reports_deleted = 0
    news_deleted = 0
    if outside_news_ids:
        alerts_deleted = db.query(Alert).filter(Alert.news_id.in_(outside_news_ids)).delete(synchronize_session=False)
        entities_deleted = db.query(Entity).filter(Entity.news_id.in_(outside_news_ids)).delete(synchronize_session=False)
        reports_deleted = db.query(Report).filter(Report.news_id.in_(outside_news_ids)).delete(synchronize_session=False)
        news_deleted = db.query(NewsItem).filter(NewsItem.id.in_(outside_news_ids)).delete(synchronize_session=False)

    signals_deleted = db.query(ExternalSignal).filter(
        (ExternalSignal.published_at < start_utc) | (ExternalSignal.published_at >= end_utc)
    ).delete(synchronize_session=False)

    db.query(SpeciesStat).delete(synchronize_session=False)
    db.query(SourceStat).delete(synchronize_session=False)
    db.query(DistrictStat).delete(synchronize_session=False)

    today_rows = db.execute(
        _apply_today_news_scope(select(NewsItem).where(NewsItem.is_poaching.is_(True)))
    ).scalars().all()

    species_totals: dict[str, dict[str, object]] = {}
    source_totals: dict[str, dict[str, object]] = {}
    district_totals: dict[tuple[str, str], dict[str, float]] = {}

    for row in today_rows:
        weight = max(1, int(row.report_count or 1))
        risk_score = int(row.risk_score or 0)
        confidence = float(row.confidence or row.ai_score or 0.0)

        for raw_species in str(row.species or "").split(","):
            species_name = raw_species.strip().lower()
            if not species_name:
                continue
            bucket = species_totals.setdefault(
                species_name,
                {"count": 0, "risk_sum": 0.0, "last_seen": row.published_at},
            )
            bucket["count"] = int(bucket["count"]) + weight
            bucket["risk_sum"] = float(bucket["risk_sum"]) + (risk_score * weight)
            if row.published_at > bucket["last_seen"]:
                bucket["last_seen"] = row.published_at

        source_name = (row.source or "unknown").strip()[:160] or "unknown"
        source_bucket = source_totals.setdefault(
            source_name,
            {"article_count": 0, "confidence_sum": 0.0, "last_seen": row.published_at},
        )
        source_bucket["article_count"] = int(source_bucket["article_count"]) + weight
        source_bucket["confidence_sum"] = float(source_bucket["confidence_sum"]) + (confidence * weight)
        if row.published_at > source_bucket["last_seen"]:
            source_bucket["last_seen"] = row.published_at

        state_name = (row.state or "").strip().title()
        district_name = (row.district or "").strip().title()
        if state_name and district_name:
            district_bucket = district_totals.setdefault(
                (state_name, district_name),
                {"incident_count": 0.0, "risk_sum": 0.0},
            )
            district_bucket["incident_count"] += weight
            district_bucket["risk_sum"] += risk_score * weight

    for species_name, bucket in species_totals.items():
        count = int(bucket["count"]) or 1
        avg_risk = round(float(bucket["risk_sum"]) / count, 2)
        db.add(
            SpeciesStat(
                species=species_name[:120],
                count=count,
                avg_risk=avg_risk,
                last_seen=bucket["last_seen"],
            )
        )

    for source_name, bucket in source_totals.items():
        article_count = int(bucket["article_count"]) or 1
        avg_confidence = float(bucket["confidence_sum"]) / article_count
        reliability_score = max(5.0, min(98.0, round(avg_confidence * 100, 2)))
        db.add(
            SourceStat(
                source_name=source_name[:160],
                reliability_score=reliability_score,
                article_count=article_count,
                last_seen=bucket["last_seen"],
            )
        )

    for (state_name, district_name), bucket in district_totals.items():
        incident_count = int(bucket["incident_count"]) or 1
        avg_risk = round(float(bucket["risk_sum"]) / incident_count, 2)
        hotspot_score = min(100.0, round((avg_risk * 0.7) + (incident_count * 2.2), 2))
        db.add(
            DistrictStat(
                state=state_name[:120],
                district=district_name[:120],
                incident_count=incident_count,
                avg_risk=avg_risk,
                hotspot_score=hotspot_score,
            )
        )

    return {
        "news_deleted": int(news_deleted),
        "alerts_deleted": int(alerts_deleted),
        "entities_deleted": int(entities_deleted),
        "reports_deleted": int(reports_deleted),
        "signals_deleted": int(signals_deleted),
        "species_rows": len(species_totals),
        "source_rows": len(source_totals),
        "district_rows": len(district_totals),
    }


class AdminLoginPayload(BaseModel):
    username: str
    password: str


@app.middleware("http")
async def api_rate_limiter(request: Request, call_next):
    path = request.url.path
    if path.startswith("/api") and path != "/api/admin/login":
        if request.method.upper() != "OPTIONS":
            try:
                require_admin_access(
                    request,
                    x_admin_token=request.headers.get("X-Admin-Token"),
                    x_api_key=request.headers.get("X-API-Key"),
                    authorization=request.headers.get("Authorization"),
                )
            except HTTPException as err:
                return JSONResponse(status_code=err.status_code, content={"detail": err.detail})
        client = request.client.host if request.client else "unknown"
        key = f"{client}:{path}"
        if not rate_limiter.is_allowed(key):
            return JSONResponse(
                status_code=429,
                content={"detail": "Rate limit exceeded. Please retry after 60 seconds."},
            )
    return await call_next(request)


def _client_ip(request: Request | None) -> str:
    if request is None or request.client is None:
        return ""
    return str(request.client.host or "")[:64]


def _audit(
    *,
    actor: str,
    action: str,
    status: str,
    ip: str = "",
    notes: str = "",
) -> None:
    try:
        with SessionLocal() as db:
            record_audit(db, actor=actor, action=action, status=status, ip=ip, notes=notes)
            db.commit()
    except Exception as err:  # noqa: BLE001
        app_logger.warning("Audit write failed for %s: %s", action, err)


def _cache_key(base: str, **kwargs: object) -> str:
    parts = [base]
    for key in sorted(kwargs.keys()):
        parts.append(f"{key}={kwargs[key]}")
    return "|".join(parts)


def _cache_get_or_compute(key: str, producer):
    return api_cache.get_or_set(key, producer, ttl_seconds=settings.cache_ttl_seconds)


def _clear_runtime_cache() -> None:
    api_cache.clear()


def _database_file_path() -> Path | None:
    return sqlite_path_from_url(settings.database_url)


def _run_backup_now() -> dict[str, object]:
    db_path = _database_file_path()
    if db_path is None:
        return {"ok": False, "error": "Backups are only supported for SQLite in current runtime."}
    if not db_path.exists():
        return {"ok": False, "error": f"Database file not found: {db_path}"}
    backups_dir = Path(settings.backups_dir).resolve()
    backup_path = create_sqlite_backup(db_path=db_path, backups_dir=backups_dir)
    snapshot_path = create_snapshot_export(db_path=db_path, backups_dir=backups_dir)
    return {
        "ok": True,
        "backup": str(backup_path),
        "snapshot": str(snapshot_path),
    }


def _parse_intel_points(raw: str) -> list[str]:
    try:
        parsed = json.loads(raw or "[]")
        if isinstance(parsed, list):
            return [str(item) for item in parsed]
    except (TypeError, ValueError):
        pass
    return []


def _sync_snapshot() -> dict[str, object]:
    return sync_state_store.snapshot()


def _severity_from_risk(risk: int) -> str:
    if risk > 80:
        return "high"
    if risk >= 50:
        return "medium"
    return "low"


def _parse_iso_date(raw: str) -> datetime | None:
    value = (raw or "").strip()
    if not value:
        return None
    try:
        if "T" in value:
            parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
            return parsed.replace(tzinfo=None) if parsed.tzinfo else parsed
        parsed_date = date.fromisoformat(value)
        return datetime(parsed_date.year, parsed_date.month, parsed_date.day)
    except ValueError:
        return None


def _safe_outbound_url(raw_url: str) -> str:
    value = (raw_url or "").strip()
    if not value:
        return ""
    parsed = urlparse(value)
    if not parsed.scheme and parsed.netloc:
        value = f"https:{value}"
        parsed = urlparse(value)
    elif not parsed.scheme and not parsed.netloc:
        value = f"https://{value}"
        parsed = urlparse(value)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        return ""
    return value


def _is_root_like_url(raw_url: str) -> bool:
    parsed = urlparse(raw_url)
    if not parsed.netloc:
        return True
    path = (parsed.path or "").strip()
    if path in {"", "/"} and not parsed.query:
        return True
    normalized = path.strip("/")
    if not normalized:
        return True
    parts = [part for part in normalized.split("/") if part]
    if len(parts) == 1 and not parsed.query:
        segment = parts[0].lower()
        if re.fullmatch(r"[a-z]{2}(?:-[a-z]{2})?", segment):
            return True
    return False


def _normalized_title_tokens(title: str) -> tuple[str, set[str]]:
    normalized = re.sub(r"\s+", " ", (title or "").strip().lower())
    normalized = re.sub(r"[^a-z0-9 ]", " ", normalized)
    normalized = re.sub(r"\s+", " ", normalized).strip()
    tokens = {token for token in normalized.split() if len(token) >= 3}
    return normalized, tokens


def _url_looks_relevant_to_title(raw_url: str, title: str) -> bool:
    title_norm, title_tokens = _normalized_title_tokens(title)
    if not title_norm or not title_tokens:
        return True
    url_norm = re.sub(r"[^a-z0-9 ]", " ", raw_url.lower())
    url_norm = re.sub(r"\s+", " ", url_norm).strip()
    hit_count = sum(1 for token in title_tokens if token in url_norm)
    must_have_hint = [token for token in title_tokens if token in URL_RELEVANCE_HINTS]
    if must_have_hint and not any(token in url_norm for token in must_have_hint):
        return False
    minimum_hits = 2 if len(title_tokens) >= 5 else 1
    if hit_count >= minimum_hits:
        return True
    return hit_count >= 1


def _http_get_for_resolution(url: str, *, allow_redirects: bool = True) -> requests.Response | None:
    if not url:
        return None

    def _call() -> requests.Response:
        return requests.get(
            url,
            timeout=settings.request_timeout_seconds,
            allow_redirects=allow_redirects,
            headers=ARTICLE_RESOLUTION_HEADERS,
        )

    try:
        return retry_call(
            _call,
            retries=2,
            delay_seconds=0.4,
            backoff=2.0,
            on_retry=lambda attempt, err: app_logger.warning(
                "Retrying article URL resolution (%s/%s) for %s: %s",
                attempt,
                2,
                url,
                err,
            ),
        )
    except requests.RequestException as err:
        app_logger.warning("Article URL resolution failed for %s: %s", url, err)
        return None


def _google_rss_variant_url(raw_url: str) -> str:
    parsed = urlparse(raw_url)
    host = parsed.netloc.lower()
    if host not in {"news.google.com", "www.news.google.com"}:
        return ""
    path = parsed.path or ""
    if "/articles/" in path and "/rss/articles/" not in path:
        path = path.replace("/articles/", "/rss/articles/", 1)
    query_pairs = dict(parse_qsl(parsed.query, keep_blank_values=True))
    query_pairs.setdefault("hl", "en-IN")
    query_pairs.setdefault("gl", "IN")
    query_pairs.setdefault("ceid", "IN:en")
    query_pairs.setdefault("oc", "5")
    return parsed._replace(path=path, query=urlencode(query_pairs)).geturl()


def _decode_google_news_rss_url(raw_url: str) -> str:
    rss_url = _google_rss_variant_url(raw_url)
    if not rss_url:
        return ""
    try:
        from googlenewsdecoder import gnewsdecoder
    except ImportError:
        return ""

    try:
        decoded = gnewsdecoder(rss_url)
    except requests.RequestException as err:
        app_logger.warning("Google RSS decode request failed for %s: %s", rss_url, err)
        return ""
    except ValueError as err:
        app_logger.warning("Google RSS decode parse failed for %s: %s", rss_url, err)
        return ""

    if not isinstance(decoded, dict) or not decoded.get("status"):
        return ""
    resolved = _safe_outbound_url(str(decoded.get("decoded_url", "")).strip())
    if not resolved:
        return ""
    if _is_root_like_url(resolved):
        return ""
    return resolved


def _extract_best_article_link_from_html(raw_url: str, html: str, title: str, blocked_hosts: set[str]) -> str:
    if not html:
        return ""
    parsed_base = urlparse(raw_url)
    base_host = parsed_base.netloc.lower()
    soup = BeautifulSoup(html, "html.parser")

    # Strong candidates first.
    selectors = [
        ("meta[property='og:url']", "content"),
        ("meta[name='twitter:url']", "content"),
        ("link[rel='canonical']", "href"),
    ]
    for selector, attr in selectors:
        node = soup.select_one(selector)
        if node is None:
            continue
        candidate = _safe_outbound_url(urljoin(raw_url, str(node.get(attr, "")).strip()))
        if not candidate:
            continue
        candidate_host = urlparse(candidate).netloc.lower()
        if candidate_host in blocked_hosts:
            continue
        if _is_root_like_url(candidate):
            continue
        return candidate

    title_norm, title_tokens = _normalized_title_tokens(title)
    if not title_norm:
        return ""

    best_url = ""
    best_score = 0.0
    for anchor in soup.find_all("a", href=True):
        href = str(anchor.get("href", "")).strip()
        if not href:
            continue
        candidate = _safe_outbound_url(urljoin(raw_url, href))
        if not candidate:
            continue
        parsed_candidate = urlparse(candidate)
        candidate_host = parsed_candidate.netloc.lower()
        if candidate_host in blocked_hosts:
            continue
        if _is_root_like_url(candidate):
            continue

        anchor_text = " ".join(
            [
                str(anchor.get_text(" ", strip=True) or ""),
                str(anchor.get("title", "") or ""),
            ]
        ).strip()
        anchor_norm, anchor_tokens = _normalized_title_tokens(anchor_text)

        overlap = 0.0
        if title_tokens:
            overlap = len(title_tokens.intersection(anchor_tokens)) / len(title_tokens)
        ratio = SequenceMatcher(None, title_norm[:200], anchor_norm[:200]).ratio() if anchor_norm else 0.0
        slug_bonus = 0.0
        lower_candidate = candidate.lower()
        token_hits_in_url = sum(1 for token in title_tokens if token in lower_candidate)
        if token_hits_in_url >= 3:
            slug_bonus = 0.2
        elif token_hits_in_url >= 2:
            slug_bonus = 0.1
        score = max(overlap, ratio) + slug_bonus
        if candidate_host == base_host:
            score += 0.05
        if score > best_score:
            best_score = score
            best_url = candidate

    return best_url if best_score >= 0.45 else ""


def _resolve_google_news_article_url(raw_url: str, title: str) -> str:
    decoded = _decode_google_news_rss_url(raw_url)
    if decoded:
        return decoded

    response = _http_get_for_resolution(raw_url, allow_redirects=True)
    if response is None:
        return ""

    final_url = _safe_outbound_url(response.url)
    if final_url:
        final_host = urlparse(final_url).netloc.lower()
        if final_host and final_host not in AGGREGATOR_HOSTS and not _is_root_like_url(final_url):
            return final_url

    content_type = str(response.headers.get("content-type", "")).lower()
    if "text/html" not in content_type:
        return ""

    return _extract_best_article_link_from_html(
        raw_url=raw_url,
        html=response.text,
        title=title,
        blocked_hosts=AGGREGATOR_HOSTS,
    )


def _resolve_article_from_homepage(raw_url: str, title: str) -> str:
    response = _http_get_for_resolution(raw_url, allow_redirects=True)
    if response is None:
        return ""

    final_url = _safe_outbound_url(response.url)
    if final_url and not _is_root_like_url(final_url):
        return final_url

    content_type = str(response.headers.get("content-type", "")).lower()
    if "text/html" not in content_type:
        return ""

    return _extract_best_article_link_from_html(
        raw_url=raw_url,
        html=response.text,
        title=title,
        blocked_hosts=set(),
    )


def _resolve_from_google_rss_lookup(title: str, source: str) -> str:
    query_parts = [title.strip()]
    if source.strip():
        query_parts.append(source.strip())
    query = " ".join(part for part in query_parts if part)
    if not query:
        return ""

    title_norm, _ = _normalized_title_tokens(title)
    best_url = ""
    best_score = 0.0

    language_sequence = ["en"]
    if re.search(r"[\u0900-\u097F]", title):
        language_sequence.insert(0, "hi")
    if re.search(r"[\u0C80-\u0CFF]", title):
        language_sequence.insert(0, "kn")
    if re.search(r"[\u0B80-\u0BFF]", title):
        language_sequence.insert(0, "ta")
    if re.search(r"[\u0C00-\u0C7F]", title):
        language_sequence.insert(0, "te")

    for language in dict.fromkeys(language_sequence):
        try:
            candidates = collector._fetch_google_rss(language, query, 12)
        except requests.RequestException as err:
            app_logger.warning("Google RSS lookup failed for title resolution (%s): %s", language, err)
            continue
        for article in candidates:
            candidate_url = _safe_outbound_url(article.url)
            if not candidate_url:
                continue
            candidate_host = urlparse(candidate_url).netloc.lower()
            if candidate_host in {"news.google.com", "www.news.google.com"}:
                candidate_url = _decode_google_news_rss_url(candidate_url)
                if not candidate_url:
                    continue
                candidate_host = urlparse(candidate_url).netloc.lower()
            if candidate_host in AGGREGATOR_HOSTS or _is_root_like_url(candidate_url):
                continue

            candidate_title_norm, _ = _normalized_title_tokens(article.title or "")
            score = SequenceMatcher(None, title_norm[:220], candidate_title_norm[:220]).ratio()
            if source and source.strip() and source.strip().lower() in (article.source or "").lower():
                score += 0.08
            if score > best_score:
                best_score = score
                best_url = candidate_url
    return best_url if best_score >= 0.78 else ""


def _resolve_exact_article_url(item: NewsItem) -> str:
    target = _safe_outbound_url(item.url)
    if not target:
        return ""

    host = urlparse(target).netloc.lower()
    if host in {"news.google.com", "www.news.google.com"}:
        resolved = _resolve_google_news_article_url(target, item.title or "")
        if resolved:
            return resolved
    if _is_root_like_url(target):
        resolved = _resolve_article_from_homepage(target, item.title or "")
        if resolved and _url_looks_relevant_to_title(resolved, item.title or ""):
            return resolved
        resolved = _resolve_from_google_rss_lookup(item.title or "", item.source or "")
        if resolved:
            return resolved
    if not _url_looks_relevant_to_title(target, item.title or ""):
        resolved = _resolve_from_google_rss_lookup(item.title or "", item.source or "")
        if resolved:
            return resolved
    return target


def _action_recommendation(
    risk_score: int,
    *,
    species: str,
    crime_type: str,
    state: str,
    district: str,
    network_indicator: bool = False,
    repeat_indicator: bool = False,
) -> str:
    location = f"{state or '-'} / {district or '-'}"
    species_lower = (species or "").lower()
    if risk_score >= 90 or network_indicator:
        return f"Immediate joint enforcement action in {location}; activate anti-trafficking task force."
    if "tiger" in species_lower or "rhino" in species_lower or "elephant" in species_lower:
        return f"Priority species response in {location}; deploy wildlife crime rapid unit and checkpoint sweep."
    if repeat_indicator:
        return f"Escalate surveillance in {location}; open district-level repeat-offender intelligence brief."
    if risk_score >= 70:
        return f"Initiate targeted patrol and inform forest intelligence desk for {crime_type or 'wildlife crime'}."
    return f"Monitor signal and keep district field team on proactive watch in {location}."


def _fetch_filtered_news_rows(
    db: Session,
    *,
    q: str = "",
    species: str = "",
    state: str = "",
    date_from: str = "",
    date_to: str = "",
    crime_type: str = "",
    severity: str = "",
    source: str = "",
    min_confidence: float = settings.ai_threshold,
    limit: int = 200,
) -> list[NewsItem]:
    safe_limit = max(1, min(1000, limit))
    stmt = (
        select(NewsItem)
        .where(NewsItem.is_poaching.is_(True))
        .where(NewsItem.confidence >= min_confidence)
        .order_by(NewsItem.published_at.desc())
    )
    stmt = _apply_today_news_scope(stmt)
    if q.strip():
        q_like = f"%{q.strip().lower()}%"
        stmt = stmt.where(
            func.lower(NewsItem.title).like(q_like)
            | func.lower(NewsItem.summary).like(q_like)
            | func.lower(NewsItem.intel_summary).like(q_like)
        )
    if species.strip():
        stmt = stmt.where(func.lower(NewsItem.species).like(f"%{species.strip().lower()}%"))
    if state.strip():
        stmt = stmt.where(func.lower(NewsItem.state) == state.strip().lower())
    if crime_type.strip():
        stmt = stmt.where(func.lower(NewsItem.crime_type) == crime_type.strip().lower())
    if source.strip():
        stmt = stmt.where(func.lower(NewsItem.source) == source.strip().lower())
    parsed_from = _parse_iso_date(date_from)
    parsed_to = _parse_iso_date(date_to)
    if parsed_from:
        stmt = stmt.where(NewsItem.published_at >= parsed_from)
    if parsed_to:
        stmt = stmt.where(NewsItem.published_at <= parsed_to + timedelta(days=1))

    severity_value = severity.strip().lower()
    if severity_value == "high":
        stmt = stmt.where(NewsItem.risk_score > settings.risk_alert_threshold)
    elif severity_value == "medium":
        stmt = stmt.where(NewsItem.risk_score >= 50).where(NewsItem.risk_score <= settings.risk_alert_threshold)
    elif severity_value == "low":
        stmt = stmt.where(NewsItem.risk_score < 50)

    return db.execute(stmt.limit(safe_limit)).scalars().all()


def _to_export_payload(row: NewsItem) -> dict[str, object]:
    return {
        "date": row.published_at.isoformat(sep=" ", timespec="seconds"),
        "risk_score": row.risk_score,
        "species": row.species,
        "state": row.state,
        "district": row.district,
        "involved_persons": row.involved_persons,
        "crime_type": row.crime_type,
        "source": row.source,
        "confidence": round(row.confidence, 4),
        "title": row.title,
        "two_line_summary": row.intel_summary,
        "key_intelligence_points": " | ".join(_parse_intel_points(row.intel_points)),
        "likely_smuggling_route": row.likely_smuggling_route,
        "action_recommendation": row.enforcement_recommendation
        or _action_recommendation(
            row.risk_score,
            species=row.species,
            crime_type=row.crime_type,
            state=row.state,
            district=row.district,
            network_indicator=row.network_indicator,
            repeat_indicator=row.repeat_indicator,
        ),
        "confidence_explanation": row.confidence_explanation or row.ai_reason,
    }


def _seed_reports_snapshot() -> int:
    generated = 0
    with SessionLocal() as db:
        rows = db.execute(
            _apply_today_news_scope(select(NewsItem).where(NewsItem.is_poaching.is_(True)))
        ).scalars().all()
        for row in rows:
            upsert_report_for_news(db=db, news=row)
            generated += 1
        if generated:
            db.commit()
    return generated


def _seed_watchlists() -> None:
    with SessionLocal() as db:
        existing = {str(item).strip().lower() for item in db.execute(select(Watchlist.keyword)).scalars().all()}
        created = 0
        for keyword, category in DEFAULT_WATCHLISTS:
            key = keyword.strip().lower()
            if key in existing:
                continue
            db.add(Watchlist(keyword=keyword, enabled=True, category=category))
            created += 1
        if created > 0:
            db.commit()


def _dashboard_summary(db: Session) -> dict[str, object]:
    start_window = _start_from_utc() if _scope_from_start_enabled() else _today_bounds_utc()[0]
    total_incidents = int(
        db.scalar(
            _apply_today_news_scope(select(func.count()).select_from(NewsItem).where(NewsItem.is_poaching.is_(True)))
        )
        or 0
    )
    high_risk = int(
        db.scalar(
            _apply_today_news_scope(
                select(func.count())
                .select_from(NewsItem)
                .where(NewsItem.is_poaching.is_(True))
                .where(NewsItem.risk_score > settings.risk_alert_threshold)
            )
        )
        or 0
    )
    states_active = int(
        db.scalar(
            _apply_today_news_scope(
                select(func.count(func.distinct(NewsItem.state)))
                .where(NewsItem.is_poaching.is_(True))
                .where(NewsItem.state != "")
            )
        )
        or 0
    )
    species_tracked = int(db.scalar(select(func.count()).select_from(SpeciesStat)) or 0)
    sources_active = int(db.scalar(select(func.count()).select_from(SourceStat)) or 0)
    reports_today = int(
        db.scalar(
            _apply_today_news_scope(
                select(func.coalesce(func.sum(NewsItem.report_count), 0))
                .where(NewsItem.is_poaching.is_(True))
                .where(NewsItem.published_at >= start_window)
            )
        )
        or 0
    )
    total_reports = int(
        db.scalar(
            _apply_today_news_scope(
                select(func.coalesce(func.sum(NewsItem.report_count), 0)).where(NewsItem.is_poaching.is_(True))
            )
        )
        or 0
    )
    high_risk_alerts = int(
        db.scalar(select(func.count()).select_from(Alert).where(Alert.severity.in_(["high", "critical"]))) or 0
    )
    latest_alert_id = int(db.scalar(select(func.max(Alert.id))) or 0)
    latest_incident_id = int(
        db.scalar(
            _apply_today_news_scope(select(func.max(NewsItem.id)).where(NewsItem.is_poaching.is_(True)))
        )
        or 0
    )
    snapshot = _sync_snapshot()
    return {
        "system_name": "Wildlife Crime Intelligence Center",
        "sync_running": bool(snapshot.get("running")),
        "last_sync_time": snapshot.get("finished_at"),
        "total_incidents": total_incidents,
        "high_risk_alerts": high_risk_alerts,
        "latest_alert_id": latest_alert_id,
        "kpis": {
            "total_incidents": total_incidents,
            "high_risk": high_risk,
            "states_active": states_active,
            "species_tracked": species_tracked,
            "sources_active": sources_active,
            "reports_today": reports_today,
        },
        "total_reports": total_reports,
        "latest_incident_id": latest_incident_id,
    }


def _marker_from_news(row: NewsItem) -> dict[str, object]:
    lat, lng = centroid_for_state(row.state)
    return {
        "id": row.id,
        "title": row.title,
        "state": row.state,
        "district": row.district,
        "crime_type": row.crime_type,
        "species": row.species,
        "risk_score": row.risk_score,
        "severity": _severity_from_risk(row.risk_score),
        "lat": lat,
        "lng": lng,
        "source": row.source,
        "published_at": row.published_at.isoformat(),
        "open_url": f"/open/{row.id}",
    }


def _try_start_sync(trigger: str) -> bool:
    started = sync_state_store.start(trigger=trigger)
    if started:
        sync_logger.info("Sync started | trigger=%s", trigger)
    return started


def _update_sync_progress(progress: dict[str, str | int]) -> None:
    provider = str(progress.get("provider", "unknown"))
    language = str(progress.get("language", "unknown"))
    query = str(progress.get("query", ""))
    scanned = int(progress.get("scanned", 0))
    kept = int(progress.get("kept", 0))
    stage = str(progress.get("stage", "processing"))
    query_short = query if len(query) <= 70 else f"{query[:67]}..."
    message = (
        f"{stage.title()} {provider} [{language}] "
        f"for '{query_short}' | scanned={scanned}, kept={kept}"
    )
    sync_state_store.update_progress(payload=dict(progress), message=message)


def _register_incident_event(event: dict[str, str | int | float]) -> None:
    now = datetime.now(tz=UTC).isoformat()
    enriched = dict(event)
    enriched["event_time_utc"] = now
    try:
        append_live_event_to_excel(enriched)
        sync_state_store.increment_live_excel_count()
    except PermissionError:
        sync_state_store.update_progress(
            payload={"stage": "excel_locked"},
            message=(
                "Live Excel update paused because the workbook is locked. "
                "Close the file briefly to resume live writes."
            ),
        )
    except OSError as err:
        sync_logger.error("Live Excel append failed: %s", err)
    sync_state_store.append_incident(enriched)


def _complete_sync_success(trigger: str, stats: dict[str, object], excel_rows: int, duration: float) -> None:
    snapshot = sync_state_store.snapshot()
    live_events_written = int((snapshot.get("stats") or {}).get("live_events_written", 0))
    enriched_stats: dict[str, object] = dict(stats)
    enriched_stats["excel_rows"] = excel_rows
    enriched_stats["live_events_written"] = live_events_written
    message = (
        f"Completed: scanned={stats.get('scanned', 0)}, "
        f"new={stats.get('inserted', 0)}, updated={stats.get('updated', 0)}, "
        f"excel_rows={excel_rows}, live_excel_events={live_events_written}"
    )
    sync_state_store.finish(
        trigger=trigger,
        duration_seconds=duration,
        stats=enriched_stats,
        message=message,
    )
    _clear_runtime_cache()
    _audit(
        actor="system",
        action="sync_trigger",
        status="ok",
        notes=f"trigger={trigger}; scanned={stats.get('scanned', 0)}; inserted={stats.get('inserted', 0)}; updated={stats.get('updated', 0)}",
    )
    sync_logger.info("Sync completed | trigger=%s | duration=%.2fs | stats=%s", trigger, duration, enriched_stats)


def _complete_sync_error(trigger: str, error_message: str, duration: float) -> None:
    sync_state_store.fail(trigger=trigger, duration_seconds=duration, error=error_message)
    _audit(actor="system", action="sync_trigger", status="error", notes=f"trigger={trigger}; error={error_message}")
    sync_logger.error("Sync failed | trigger=%s | duration=%.2fs | error=%s", trigger, duration, error_message)


def _sync_once(db: Session) -> tuple[dict[str, object], int]:
    effective_limit = max(1, settings.max_articles_per_query)
    stats = collector.collect_and_store(
        db=db,
        limit_per_query=effective_limit,
        progress_callback=_update_sync_progress,
        incident_callback=_register_incident_event,
    )
    excel_rows = export_news_to_excel(db=db)
    return stats, excel_rows


def _persist_sync_logs(db: Session, started_at: datetime, ended_at: datetime, stats: dict[str, object]) -> None:
    duration_sec = max(0.0, (ended_at - started_at).total_seconds())
    scanned_total = int(stats.get("scanned", 0) or 0)
    kept_total = int(stats.get("kept", 0) or 0)
    failed_total = int(stats.get("provider_failures", 0) or 0)
    provider_rows = stats.get("provider_stats") or []
    if isinstance(provider_rows, list) and provider_rows:
        for row in provider_rows:
            if not isinstance(row, dict):
                continue
            provider_name = str(row.get("provider") or "unknown")
            scanned = int(row.get("scanned") or 0)
            kept = int(row.get("kept") or 0)
            failed = int(row.get("failed") or 0)
            db.add(
                SyncLog(
                    started_at=started_at,
                    ended_at=ended_at,
                    provider=provider_name[:64],
                    scanned=scanned,
                    kept=kept,
                    failed=failed,
                    duration_sec=duration_sec,
                    notes="",
                )
            )
    else:
        db.add(
            SyncLog(
                started_at=started_at,
                ended_at=ended_at,
                provider="all",
                scanned=scanned_total,
                kept=kept_total,
                failed=failed_total,
                duration_sec=duration_sec,
                notes="",
            )
        )
    db.commit()


def _run_sync_job(trigger: str) -> None:
    started = perf_counter()
    started_at = datetime.utcnow()
    try:
        with SessionLocal() as db:
            stats, rows = _sync_once(db)
            alert_dispatch = alert_engine.dispatch_pending_alerts(db=db)
            stats["alerts_dispatched"] = alert_dispatch
            _persist_sync_logs(db=db, started_at=started_at, ended_at=datetime.utcnow(), stats=stats)
        duration = perf_counter() - started
        _complete_sync_success(trigger=trigger, stats=stats, excel_rows=rows, duration=duration)
    except Exception as err:
        duration = perf_counter() - started
        _complete_sync_error(trigger=trigger, error_message=str(err), duration=duration)


def _scheduled_sync_job() -> None:
    if not _try_start_sync(trigger="scheduled"):
        return
    _run_sync_job(trigger="scheduled")


def _scheduled_alert_dispatch() -> None:
    try:
        with SessionLocal() as db:
            alert_engine.dispatch_pending_alerts(db=db, limit=100)
    except Exception as err:
        _audit(actor="system", action="alert_dispatch", status="error", notes=str(err))
        sync_logger.error("Scheduled alert dispatch failed: %s", err)


def _scheduled_backup_job() -> None:
    result = _run_backup_now()
    if result.get("ok"):
        _audit(
            actor="system",
            action="db_backup",
            status="ok",
            notes=f"backup={result.get('backup')}; snapshot={result.get('snapshot')}",
        )
    else:
        _audit(actor="system", action="db_backup", status="error", notes=str(result.get("error", "unknown")))


def _reschedule_sync_job(interval_minutes: int) -> None:
    scheduler.add_job(
        _scheduled_sync_job,
        trigger="interval",
        minutes=max(1, interval_minutes),
        id="poaching-news-sync",
        replace_existing=True,
        max_instances=1,
        coalesce=True,
        misfire_grace_time=max(60, int(interval_minutes) * 60),
        jitter=max(0, int(settings.sync_scheduler_jitter_seconds)),
    )


def _officer_metrics(db: Session) -> dict[str, int]:
    base_stmt = _apply_today_news_scope(
        select(func.count())
        .select_from(NewsItem)
        .where(NewsItem.is_poaching.is_(True))
    )
    critical_24h = db.scalar(base_stmt.where(NewsItem.risk_score >= 85)) or 0
    high_24h = db.scalar(base_stmt.where(NewsItem.risk_score >= 70).where(NewsItem.risk_score < 85)) or 0
    latest_id = db.scalar(
        _apply_today_news_scope(select(func.max(NewsItem.id)).where(NewsItem.is_poaching.is_(True)))
    ) or 0
    return {
        "critical_24h": int(critical_24h),
        "high_24h": int(high_24h),
        "latest_incident_id": int(latest_id),
    }


def _repair_stored_urls() -> int:
    changed = 0
    with SessionLocal() as db:
        rows = db.execute(select(NewsItem).order_by(NewsItem.id.asc())).scalars().all()
        claimed_urls = {row.url for row in rows if row.url}
        for row in rows:
            original = row.url
            normalized = collector._normalize_url(original)
            if not normalized or normalized == original:
                continue
            if normalized in claimed_urls:
                if original != normalized:
                    claimed_urls.discard(original)
                    db.delete(row)
                    changed += 1
                continue
            claimed_urls.discard(original)
            claimed_urls.add(normalized)
            row.url = normalized[:1200]
            changed += 1
        for row in rows:
            if not row.url_hash:
                row.url_hash = dedupe_engine.url_hash(row.url)
                changed += 1
            if not row.merged_sources:
                row.merged_sources = row.source
                changed += 1
            if row.source_count < 1:
                row.source_count = 1
                changed += 1
            if row.report_count < 1:
                row.report_count = 1
                changed += 1
        if changed > 0:
            db.commit()
    return changed


@app.on_event("startup")
def startup_event() -> None:
    runtime_diagnostics["startup_time"] = datetime.now(tz=UTC).isoformat()
    app_logger.info("Starting %s", settings.app_name)
    init_database()
    db_file = _database_file_path()
    if db_file:
        integrity = sqlite_integrity_check(db_file)
        runtime_diagnostics["db_integrity"] = integrity
        if not integrity.get("ok"):
            app_logger.error("Database integrity check failed: %s", integrity)
        else:
            app_logger.info("Database integrity check: %s", integrity)
    _seed_watchlists()
    db_diag = diagnose_database()
    app_logger.info("Database diagnostics: %s", db_diag)

    repaired = _repair_stored_urls()
    if repaired:
        app_logger.info("URL normalization repair updated %d rows", repaired)

    reports_seeded = _seed_reports_snapshot()
    if reports_seeded:
        app_logger.info("Generated/updated %d analyst reports", reports_seeded)

    runtime_diagnostics["ai_model_ready"] = intelligence_engine.warmup()
    app_logger.info("AI model warmup ready=%s", runtime_diagnostics["ai_model_ready"])

    if not scheduler.running:
        _reschedule_sync_job(settings.sync_interval_minutes)
        scheduler.add_job(
            _scheduled_alert_dispatch,
            trigger="interval",
            seconds=max(15, settings.alert_dispatch_interval_seconds),
            id="poaching-alert-dispatch",
            replace_existing=True,
            max_instances=1,
        )
        scheduler.add_job(
            _scheduled_backup_job,
            trigger="interval",
            minutes=max(10, settings.backup_interval_minutes),
            id="poaching-db-backup",
            replace_existing=True,
            max_instances=1,
        )
        scheduler.start()
    app_logger.info("Scheduler running=%s", scheduler.running)


@app.on_event("shutdown")
def shutdown_event() -> None:
    app_logger.info("Shutting down %s", settings.app_name)
    if scheduler.running:
        scheduler.shutdown(wait=False)


@app.get("/")
def home(
    request: Request,
    db: Session = Depends(get_db),
    ui_lang: str = "en",
    news_lang: str = "",
    min_score: float = settings.ai_threshold,
):
    react_js = Path("app/static/react-build/dashboard.js")
    react_css = Path("app/static/react-build/dashboard.css")
    force_legacy = request.query_params.get("legacy", "").strip().lower() in {"1", "true", "yes"}
    if react_js.exists() and react_css.exists() and not force_legacy:
        return templates.TemplateResponse("react_index.html", {"request": request})

    texts = get_ui_text(ui_lang if ui_lang in UI_TEXT else "en")
    language_options = sorted(
        {
            lang
            for lang in db.execute(_apply_today_news_scope(select(NewsItem.language).distinct())).scalars().all()
            if lang and lang != "unknown"
        }
    )

    stmt = (
        select(NewsItem)
        .where(NewsItem.is_poaching.is_(True))
        .where(NewsItem.confidence >= min_score)
        .order_by(NewsItem.published_at.desc())
        .limit(200)
    )
    stmt = _apply_today_news_scope(stmt)
    if news_lang:
        stmt = stmt.where(NewsItem.language == news_lang)

    news_items = db.execute(stmt).scalars().all()
    total_saved = db.scalar(
        _apply_today_news_scope(select(func.count()).select_from(NewsItem).where(NewsItem.is_poaching.is_(True)))
    ) or 0
    total_scanned = db.scalar(
        _apply_today_news_scope(select(func.coalesce(func.sum(NewsItem.report_count), 0)).where(NewsItem.is_poaching.is_(True)))
    ) or 0
    summary = _dashboard_summary(db)

    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "texts": texts,
            "ui_lang": ui_lang,
            "news_lang": news_lang,
            "min_score": min_score,
            "language_options": language_options,
            "news_items": news_items,
            "sync_status": request.query_params.get("sync", ""),
            "sync_message": request.query_params.get("msg", ""),
            "sync_live": _sync_snapshot(),
            "officer_metrics": _officer_metrics(db),
            "total_saved": total_saved,
            "total_scanned": total_scanned,
            "excel_rows": total_saved,
            "dashboard_summary": summary,
            "map_center": {"lat": INDIA_CENTER[0], "lng": INDIA_CENTER[1]},
        },
    )


@app.get("/legacy")
def legacy_home(
    request: Request,
):
    query = request.query_params.multi_items()
    params = [(k, v) for k, v in query if k != "legacy"]
    params.append(("legacy", "1"))
    return RedirectResponse(url=f"/?{urlencode(params)}", status_code=307)


@app.post("/sync")
def sync_now():
    raise HTTPException(status_code=410, detail="Manual sync is disabled. Scheduler runs automatically.")


@app.get("/login")
def login_page(request: Request):
    return templates.TemplateResponse("login.html", {"request": request, "error": "", "info": ""})


@app.post("/login")
def login_submit(
    request: Request,
    username: str = Form(...),
    password: str = Form(...),
):
    ip = _client_ip(request)
    if not login_rate_limiter.is_allowed(f"login:{ip}"):
        _audit(actor=username.strip() or "unknown", action="login_attempt", status="blocked", ip=ip, notes="rate_limited")
        return templates.TemplateResponse(
            "login.html",
            {"request": request, "error": "Too many login attempts. Try again later.", "info": ""},
            status_code=429,
        )
    try:
        token = admin_sessions.create(username=username.strip(), password=password)
    except HTTPException:
        _audit(actor=username.strip() or "unknown", action="login_attempt", status="error", ip=ip, notes="invalid_credentials")
        return templates.TemplateResponse(
            "login.html",
            {"request": request, "error": "Invalid username or password.", "info": ""},
            status_code=401,
        )
    _audit(actor=username.strip() or "admin", action="login_attempt", status="ok", ip=ip, notes="session_created")
    redirect = RedirectResponse(url="/admin/settings", status_code=303)
    redirect.set_cookie(
        key="admin_session",
        value=token,
        max_age=max(300, settings.admin_session_minutes * 60),
        httponly=True,
        secure=False,
        samesite="lax",
    )
    return redirect


@app.post("/logout")
def logout(request: Request):
    token = str(request.cookies.get("admin_session") or "")
    if token:
        admin_sessions.destroy(token)
    _audit(actor="admin", action="logout", status="ok", ip=_client_ip(request), notes="")
    redirect = RedirectResponse(url="/login", status_code=303)
    redirect.delete_cookie("admin_session")
    return redirect


@app.get("/logout")
def logout_get(request: Request):
    return logout(request)


@app.post("/api/admin/login")
def admin_login(payload: AdminLoginPayload, request: Request, response: Response):
    ip = _client_ip(request)
    if not login_rate_limiter.is_allowed(f"api-login:{ip}"):
        _audit(actor=payload.username.strip() or "unknown", action="login_attempt", status="blocked", ip=ip, notes="api_rate_limited")
        raise HTTPException(status_code=429, detail="Too many login attempts.")
    try:
        token = admin_sessions.create(username=payload.username.strip(), password=payload.password)
    except HTTPException:
        _audit(actor=payload.username.strip() or "unknown", action="login_attempt", status="error", ip=ip, notes="invalid_credentials")
        raise
    response.set_cookie(
        key="admin_session",
        value=token,
        max_age=max(300, settings.admin_session_minutes * 60),
        httponly=True,
        secure=False,
        samesite="lax",
    )
    _audit(actor=payload.username.strip() or "admin", action="login_attempt", status="ok", ip=ip, notes="api_session_created")
    return {"access_token": token, "token_type": "bearer", "expires_in_seconds": max(300, settings.admin_session_minutes * 60)}


@app.get("/api/security-status")
def security_status(_: None = Depends(require_admin_access)):
    return {
        "admin_auth_enabled": bool(settings.admin_token or settings.admin_password or settings.admin_password_hash),
        "admin_username": settings.admin_username,
        "rate_limit_per_minute": settings.api_rate_limit_per_minute,
        "api_key_enabled": bool(settings.admin_api_key),
        "cache_ttl_seconds": settings.cache_ttl_seconds,
    }


@app.get("/admin/settings")
def admin_settings_page(request: Request):
    try:
        require_admin_access(request)
    except HTTPException:
        return RedirectResponse(url="/login", status_code=303)
    cache_state = api_cache.snapshot()
    return templates.TemplateResponse(
        "admin_settings.html",
        {
            "request": request,
            "settings_view": {
                "enabled_providers": settings.enabled_providers,
                "sync_interval_minutes": settings.sync_interval_minutes,
                "cache_ttl_seconds": settings.cache_ttl_seconds,
                "backup_interval_minutes": settings.backup_interval_minutes,
                "admin_auth_enabled": bool(settings.admin_token or settings.admin_password or settings.admin_password_hash),
                "admin_api_key_enabled": bool(settings.admin_api_key),
            },
            "cache_state": cache_state,
            "sync_state": _sync_snapshot(),
        },
    )


@app.post("/admin/settings/update")
def admin_settings_update(
    request: Request,
    enabled_providers: str = Form(...),
    sync_interval_minutes: int = Form(...),
    cache_ttl_seconds: int = Form(...),
    backup_interval_minutes: int = Form(...),
    _: None = Depends(require_admin_access),
):
    settings.enabled_providers = enabled_providers.strip()
    settings.sync_interval_minutes = max(1, min(180, int(sync_interval_minutes)))
    settings.cache_ttl_seconds = max(5, min(900, int(cache_ttl_seconds)))
    settings.backup_interval_minutes = max(10, min(1440, int(backup_interval_minutes)))
    api_cache.ttl_seconds = settings.cache_ttl_seconds
    if scheduler.running:
        _reschedule_sync_job(settings.sync_interval_minutes)
        scheduler.add_job(
            _scheduled_backup_job,
            trigger="interval",
            minutes=settings.backup_interval_minutes,
            id="poaching-db-backup",
            replace_existing=True,
            max_instances=1,
        )
    _clear_runtime_cache()
    _audit(
        actor="admin",
        action="config_change",
        status="ok",
        ip=_client_ip(request),
        notes=(
            f"providers={settings.enabled_providers}; sync_interval={settings.sync_interval_minutes}; "
            f"cache_ttl={settings.cache_ttl_seconds}; backup_interval={settings.backup_interval_minutes}"
        ),
    )
    return RedirectResponse(url="/admin/settings", status_code=303)


@app.post("/admin/settings/cache-clear")
def admin_cache_clear(request: Request, _: None = Depends(require_admin_access)):
    _clear_runtime_cache()
    _audit(actor="admin", action="cache_clear", status="ok", ip=_client_ip(request), notes="")
    return RedirectResponse(url="/admin/settings", status_code=303)


@app.post("/admin/settings/run-backup")
def admin_run_backup(request: Request, _: None = Depends(require_admin_access)):
    result = _run_backup_now()
    status = "ok" if result.get("ok") else "error"
    _audit(
        actor="admin",
        action="manual_backup",
        status=status,
        ip=_client_ip(request),
        notes=str(result.get("error") or f"backup={result.get('backup')}"),
    )
    return RedirectResponse(url="/admin/settings", status_code=303)


@app.post("/admin/settings/test-telegram")
def admin_test_telegram(request: Request, _: None = Depends(require_admin_access)):
    ok = alert_engine._telegram_send("Wildlife Intelligence test alert from admin settings panel.")
    _audit(
        actor="admin",
        action="alert_test_telegram",
        status="ok" if ok else "error",
        ip=_client_ip(request),
        notes="",
    )
    return RedirectResponse(url="/admin/settings", status_code=303)


@app.post("/admin/settings/test-email")
def admin_test_email(request: Request, _: None = Depends(require_admin_access)):
    ok = alert_engine._email_send(
        "Wildlife Intelligence Test Email",
        "This is a test email from Wildlife Crime Intelligence admin settings.",
    )
    _audit(
        actor="admin",
        action="alert_test_email",
        status="ok" if ok else "error",
        ip=_client_ip(request),
        notes="",
    )
    return RedirectResponse(url="/admin/settings", status_code=303)


@app.get("/api/admin/audit-logs")
def admin_audit_logs(limit: int = 200, _: None = Depends(require_admin_access), db: Session = Depends(get_db)):
    safe_limit = max(1, min(1000, limit))
    rows = db.execute(select(AuditLog).order_by(AuditLog.timestamp.desc()).limit(safe_limit)).scalars().all()
    return [
        {
            "id": row.id,
            "timestamp": row.timestamp.isoformat(),
            "actor": row.actor,
            "action": row.action,
            "status": row.status,
            "ip": row.ip,
            "notes": row.notes,
        }
        for row in rows
    ]


@app.get("/api/news")
def get_news(
    db: Session = Depends(get_db),
    lang: str = "",
    min_score: float = settings.ai_threshold,
    limit: int = 100,
):
    safe_limit = max(1, min(500, limit))
    stmt = (
        select(NewsItem)
        .where(NewsItem.is_poaching.is_(True))
        .where(NewsItem.confidence >= min_score)
        .order_by(NewsItem.published_at.desc())
        .limit(safe_limit)
    )
    stmt = _apply_today_news_scope(stmt)
    if lang:
        stmt = stmt.where(NewsItem.language == lang)

    rows = db.execute(stmt).scalars().all()
    return [
        {
            "id": row.id,
            "title": row.title,
            "article_summary": row.summary,
            "source": row.source,
            "url": row.url,
            "open_url": f"/open/{row.id}",
            "language": row.language,
            "published_at": row.published_at.isoformat(),
            "is_poaching": row.is_poaching,
            "is_india": row.is_india,
            "confidence": row.confidence,
            "risk_score": row.risk_score,
            "crime_type": row.crime_type,
            "species": row.species,
            "state": row.state,
            "district": row.district,
            "involved_persons": row.involved_persons,
            "location": row.location,
            "network_indicator": row.network_indicator,
            "repeat_indicator": row.repeat_indicator,
            "summary": row.intel_summary,
            "two_line_summary": row.intel_summary,
            "intel_points": _parse_intel_points(row.intel_points),
            "key_intelligence_points": _parse_intel_points(row.intel_points),
            "likely_smuggling_route": row.likely_smuggling_route,
            "enforcement_recommendation": row.enforcement_recommendation
            or _action_recommendation(
                row.risk_score,
                species=row.species,
                crime_type=row.crime_type,
                state=row.state,
                district=row.district,
                network_indicator=row.network_indicator,
                repeat_indicator=row.repeat_indicator,
            ),
            "confidence_explanation": row.confidence_explanation or row.ai_reason,
            "duplicate_confidence": row.duplicate_confidence,
            "source_count": row.source_count,
            "report_count": row.report_count,
            "merged_sources": row.merged_sources,
        }
        for row in rows
    ]


@app.get("/api/live-incidents")
def live_incidents(
    db: Session = Depends(get_db),
    since_id: int = 0,
    min_score: float = settings.ai_threshold,
    limit: int = 30,
):
    safe_limit = max(1, min(100, limit))
    stmt = (
        select(NewsItem)
        .where(NewsItem.is_poaching.is_(True))
        .where(NewsItem.confidence >= min_score)
        .where(NewsItem.id > since_id)
        .order_by(NewsItem.id.asc())
        .limit(safe_limit)
    )
    stmt = _apply_today_news_scope(stmt)
    rows = db.execute(stmt).scalars().all()
    return [
        {
            "id": row.id,
            "title": row.title,
            "source": row.source,
            "language": row.language,
            "published_at": row.published_at.isoformat(),
            "ai_score": row.confidence,
            "severity": "critical" if row.risk_score >= 85 else ("high" if row.risk_score >= 70 else "medium"),
            "risk_score": row.risk_score,
            "crime_type": row.crime_type,
            "species": row.species,
            "state": row.state,
            "district": row.district,
            "involved_persons": row.involved_persons,
            "two_line_summary": row.intel_summary,
            "key_intelligence_points": _parse_intel_points(row.intel_points),
            "likely_smuggling_route": row.likely_smuggling_route,
            "enforcement_recommendation": row.enforcement_recommendation
            or _action_recommendation(
                row.risk_score,
                species=row.species,
                crime_type=row.crime_type,
                state=row.state,
                district=row.district,
                network_indicator=row.network_indicator,
                repeat_indicator=row.repeat_indicator,
            ),
            "confidence_explanation": row.confidence_explanation or row.ai_reason,
            "duplicate_confidence": row.duplicate_confidence,
            "source_count": row.source_count,
            "report_count": row.report_count,
            "merged_sources": row.merged_sources,
            "url": row.url,
            "open_url": f"/open/{row.id}",
        }
        for row in rows
    ]


@app.get("/api/officer-metrics")
def officer_metrics(db: Session = Depends(get_db)):
    data = _officer_metrics(db)
    data["sync_running"] = _sync_snapshot()["running"]
    return data


@app.get("/api/dashboard-summary")
def dashboard_summary(db: Session = Depends(get_db)):
    key = _cache_key("dashboard_summary")
    return _cache_get_or_compute(key, lambda: _dashboard_summary(db))


@app.get("/api/map-data")
def map_data(db: Session = Depends(get_db), limit: int = 400):
    safe_limit = max(50, min(1200, limit))
    rows = (
        db.execute(
            _apply_today_news_scope(
                select(NewsItem)
                .where(NewsItem.is_poaching.is_(True))
                .order_by(NewsItem.published_at.desc())
                .limit(safe_limit)
            )
        )
        .scalars()
        .all()
    )
    markers = [_marker_from_news(row) for row in rows]
    state_counts: dict[str, int] = {}
    for row in rows:
        state = (row.state or "").strip().title() or "Unknown"
        state_counts[state] = state_counts.get(state, 0) + max(1, row.report_count)
    heatmap = []
    for state, count in sorted(state_counts.items(), key=lambda item: item[1], reverse=True):
        lat, lng = centroid_for_state(state)
        heatmap.append({"state": state, "count": count, "lat": lat, "lng": lng})
    return {
        "center": {"lat": INDIA_CENTER[0], "lng": INDIA_CENTER[1]},
        "markers": markers,
        "state_heatmap": heatmap,
    }


@app.get("/api/chart-data")
def chart_data(db: Session = Depends(get_db)):
    key = _cache_key("chart_data")

    def _compute_chart_data():
        now_utc = datetime.utcnow()
        if _scope_from_start_enabled():
            start_date = _start_from_utc()
            window_days = max(1, (now_utc.date() - start_date.date()).days + 1)
            aggregate_weekly = window_days > 90
        else:
            recent_30_count = int(
                db.scalar(
                    select(func.count())
                    .select_from(NewsItem)
                    .where(NewsItem.is_poaching.is_(True))
                    .where(NewsItem.published_at >= (now_utc - timedelta(days=30)))
                )
                or 0
            )
            if recent_30_count >= 20:
                window_days = 30
            elif recent_30_count >= 8:
                window_days = 120
            else:
                window_days = 365
            start_date = now_utc - timedelta(days=window_days - 1)
            aggregate_weekly = window_days > 90
        rows_stmt = (
            select(NewsItem)
            .where(NewsItem.is_poaching.is_(True))
            .where(NewsItem.published_at >= start_date)
            .order_by(NewsItem.published_at.asc())
        )
        rows = db.execute(rows_stmt).scalars().all()

        timeline: dict[str, dict[str, int]] = {}
        state_totals: dict[str, int] = {}
        crime_types: set[str] = set()
        for row in rows:
            if aggregate_weekly:
                week_start = (row.published_at - timedelta(days=row.published_at.weekday())).date()
                day = week_start.isoformat()
            else:
                day = row.published_at.date().isoformat()
            bucket = timeline.setdefault(day, {"incidents": 0, "high_risk": 0})
            bucket["incidents"] += max(1, row.report_count)
            if row.risk_score > settings.risk_alert_threshold:
                bucket["high_risk"] += max(1, row.report_count)
            state_key = (row.state or "Unknown").strip().title() or "Unknown"
            state_totals[state_key] = state_totals.get(state_key, 0) + max(1, row.report_count)
            if row.crime_type:
                crime_types.add(row.crime_type)

        species_rows = (
            db.execute(select(SpeciesStat).order_by(SpeciesStat.count.desc()).limit(12))
            .scalars()
            .all()
        )
        source_rows = (
            db.execute(select(SourceStat).order_by(SourceStat.reliability_score.desc()).limit(12))
            .scalars()
            .all()
        )

        all_states = db.execute(
            _apply_today_news_scope(
                select(func.distinct(NewsItem.state))
                .where(NewsItem.is_poaching.is_(True))
                .where(NewsItem.state != "")
                .order_by(NewsItem.state.asc())
            )
        ).scalars().all()
        all_sources = db.execute(
            _apply_today_news_scope(
                select(func.distinct(NewsItem.source))
                .where(NewsItem.is_poaching.is_(True))
                .where(NewsItem.source != "")
                .order_by(NewsItem.source.asc())
            )
        ).scalars().all()
        all_crime_types = db.execute(
            _apply_today_news_scope(
                select(func.distinct(NewsItem.crime_type))
                .where(NewsItem.is_poaching.is_(True))
                .where(NewsItem.crime_type != "")
                .order_by(NewsItem.crime_type.asc())
            )
        ).scalars().all()
        all_species = db.execute(select(SpeciesStat.species).order_by(SpeciesStat.species.asc())).scalars().all()

        timeline_labels = sorted(timeline.keys())
        return {
            "timeline": {
                "labels": timeline_labels,
                "incidents": [timeline[label]["incidents"] for label in timeline_labels],
                "high_risk": [timeline[label]["high_risk"] for label in timeline_labels],
                "window_days": window_days,
                "granularity": "weekly" if aggregate_weekly else "daily",
            },
            "top_states": sorted(
                [{"state": state, "count": count} for state, count in state_totals.items()],
                key=lambda item: item["count"],
                reverse=True,
            )[:10],
            "species_distribution": [{"species": row.species, "count": row.count} for row in species_rows],
            "source_rankings": [
                {"source": row.source_name, "reliability_score": row.reliability_score, "article_count": row.article_count}
                for row in source_rows
            ],
            "filters": {
                "states": [str(value) for value in all_states if value],
                "species": [str(value) for value in all_species if value],
                "crime_types": sorted({*crime_types, *[str(value) for value in all_crime_types if value]}),
                "sources": [str(value) for value in all_sources if value],
            },
        }

    return _cache_get_or_compute(key, _compute_chart_data)


@app.get("/api/filter-news")
def filter_news(
    db: Session = Depends(get_db),
    q: str = "",
    species: str = "",
    state: str = "",
    date_from: str = "",
    date_to: str = "",
    crime_type: str = "",
    severity: str = "",
    source: str = "",
    min_confidence: float = settings.ai_threshold,
    limit: int = 200,
):
    rows = _fetch_filtered_news_rows(
        db=db,
        q=q,
        species=species,
        state=state,
        date_from=date_from,
        date_to=date_to,
        crime_type=crime_type,
        severity=severity,
        source=source,
        min_confidence=min_confidence,
        limit=limit,
    )
    return {
        "items": [
            {
                "id": row.id,
                "date": row.published_at.isoformat(sep=" ", timespec="seconds"),
                "risk_score": row.risk_score,
                "species": row.species,
                "state": row.state,
                "district": row.district,
                "involved_persons": row.involved_persons,
                "crime_type": row.crime_type,
                "source": row.source,
                "confidence": row.confidence,
                "title": row.title,
                "summary": row.intel_summary,
                "two_line_summary": row.intel_summary,
                "key_intelligence_points": _parse_intel_points(row.intel_points),
                "likely_smuggling_route": row.likely_smuggling_route,
                "action_recommendation": row.enforcement_recommendation
                or _action_recommendation(
                    row.risk_score,
                    species=row.species,
                    crime_type=row.crime_type,
                    state=row.state,
                    district=row.district,
                    network_indicator=row.network_indicator,
                    repeat_indicator=row.repeat_indicator,
                ),
                "confidence_explanation": row.confidence_explanation or row.ai_reason,
                "open_url": f"/open/{row.id}",
            }
            for row in rows
        ],
        "count": len(rows),
    }


@app.get("/api/analyst-brief")
def analyst_brief(db: Session = Depends(get_db), limit: int = 40):
    rows = _fetch_filtered_news_rows(db=db, limit=max(10, min(200, limit)))
    return [
        {
            "id": row.id,
            "title": row.title,
            "summary": row.intel_summary,
            "two_line_summary": row.intel_summary,
            "intel_points": _parse_intel_points(row.intel_points),
            "key_intelligence_points": _parse_intel_points(row.intel_points),
            "involved_persons": row.involved_persons,
            "likely_smuggling_route": row.likely_smuggling_route,
            "action_recommendation": row.enforcement_recommendation
            or _action_recommendation(
                row.risk_score,
                species=row.species,
                crime_type=row.crime_type,
                state=row.state,
                district=row.district,
                network_indicator=row.network_indicator,
                repeat_indicator=row.repeat_indicator,
            ),
            "confidence_explanation": row.confidence_explanation or row.ai_reason,
            "risk_score": row.risk_score,
            "confidence": row.confidence,
            "open_url": f"/open/{row.id}",
        }
        for row in rows
    ]


@app.get("/api/reports")
def get_reports(
    db: Session = Depends(get_db),
    limit: int = 100,
    min_risk: int = 0,
):
    safe_limit = max(1, min(500, limit))
    stmt = (
        select(Report, NewsItem)
        .join(NewsItem, NewsItem.id == Report.news_id)
        .where(NewsItem.is_poaching.is_(True))
        .where(NewsItem.risk_score >= max(0, min(100, min_risk)))
        .order_by(Report.generated_at.desc())
        .limit(safe_limit)
    )
    if _scope_from_start_enabled():
        stmt = stmt.where(NewsItem.published_at >= _start_from_utc())
    rows = db.execute(stmt).all()
    return [
        {
            "id": report.id,
            "news_id": report.news_id,
            "generated_at": report.generated_at.isoformat(),
            "summary": report.summary,
            "intel_points": _parse_intel_points(report.intel_points),
            "recommendation": report.recommendation,
            "route_hypothesis": report.route_hypothesis,
            "confidence_reason": report.confidence_reason,
            "risk_score": news.risk_score,
            "state": news.state,
            "district": news.district,
            "involved_persons": news.involved_persons,
            "species": news.species,
            "crime_type": news.crime_type,
            "title": news.title,
            "source": news.source,
            "open_url": f"/open/{news.id}",
        }
        for report, news in rows
    ]


@app.get("/api/report/{id}")
def get_report(id: int, db: Session = Depends(get_db)):
    row = db.execute(select(Report, NewsItem).join(NewsItem, NewsItem.id == Report.news_id).where(Report.id == id)).first()
    if row is None:
        raise HTTPException(status_code=404, detail="Report not found")
    report, news = row
    return {
        "id": report.id,
        "news_id": report.news_id,
        "generated_at": report.generated_at.isoformat(),
        "summary": report.summary,
        "intel_points": _parse_intel_points(report.intel_points),
        "recommendation": report.recommendation,
        "route_hypothesis": report.route_hypothesis,
        "confidence_reason": report.confidence_reason,
        "incident": {
            "title": news.title,
            "risk_score": news.risk_score,
            "confidence": news.confidence,
            "species": news.species,
            "state": news.state,
            "district": news.district,
            "involved_persons": news.involved_persons,
            "crime_type": news.crime_type,
            "source": news.source,
            "published_at": news.published_at.isoformat(),
            "open_url": f"/open/{news.id}",
        },
    }


@app.get("/api/export/csv")
@app.get("/export/csv")
def export_csv(
    request: Request,
    db: Session = Depends(get_db),
    q: str = "",
    species: str = "",
    state: str = "",
    date_from: str = "",
    date_to: str = "",
    crime_type: str = "",
    severity: str = "",
    source: str = "",
    min_confidence: float = settings.ai_threshold,
    limit: int = 500,
    _: None = Depends(require_admin_access),
):
    rows = _fetch_filtered_news_rows(
        db=db,
        q=q,
        species=species,
        state=state,
        date_from=date_from,
        date_to=date_to,
        crime_type=crime_type,
        severity=severity,
        source=source,
        min_confidence=min_confidence,
        limit=limit,
    )
    payload = [_to_export_payload(row) for row in rows]
    csv_bytes = build_csv_bytes(payload)
    _audit(actor="admin", action="export_csv", status="ok", ip=_client_ip(request), notes=f"rows={len(payload)}")
    return StreamingResponse(
        iter([csv_bytes]),
        media_type="text/csv; charset=utf-8",
        headers={"Content-Disposition": "attachment; filename=wildlife_intelligence_report.csv"},
    )


@app.get("/api/export/pdf")
@app.get("/export/pdf")
def export_pdf(
    request: Request,
    db: Session = Depends(get_db),
    q: str = "",
    species: str = "",
    state: str = "",
    date_from: str = "",
    date_to: str = "",
    crime_type: str = "",
    severity: str = "",
    source: str = "",
    min_confidence: float = settings.ai_threshold,
    limit: int = 300,
    _: None = Depends(require_admin_access),
):
    rows = _fetch_filtered_news_rows(
        db=db,
        q=q,
        species=species,
        state=state,
        date_from=date_from,
        date_to=date_to,
        crime_type=crime_type,
        severity=severity,
        source=source,
        min_confidence=min_confidence,
        limit=limit,
    )
    payload = [_to_export_payload(row) for row in rows]
    pdf_bytes = build_pdf_bytes(payload)
    _audit(actor="admin", action="export_pdf", status="ok", ip=_client_ip(request), notes=f"rows={len(payload)}")
    return StreamingResponse(
        iter([pdf_bytes]),
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=wildlife_intelligence_report.pdf"},
    )


@app.get("/api/export/excel")
@app.get("/export/excel")
def export_excel(
    request: Request,
    db: Session = Depends(get_db),
    q: str = "",
    species: str = "",
    state: str = "",
    date_from: str = "",
    date_to: str = "",
    crime_type: str = "",
    severity: str = "",
    source: str = "",
    min_confidence: float = settings.ai_threshold,
    limit: int = 500,
    _: None = Depends(require_admin_access),
):
    rows = _fetch_filtered_news_rows(
        db=db,
        q=q,
        species=species,
        state=state,
        date_from=date_from,
        date_to=date_to,
        crime_type=crime_type,
        severity=severity,
        source=source,
        min_confidence=min_confidence,
        limit=limit,
    )
    payload = [_to_export_payload(row) for row in rows]
    excel_bytes = build_excel_bytes(payload, title="Wildlife Crime Intelligence Brief")
    _audit(actor="admin", action="export_excel", status="ok", ip=_client_ip(request), notes=f"rows={len(payload)}")
    return StreamingResponse(
        iter([excel_bytes]),
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=wildlife_intelligence_report.xlsx"},
    )


@app.get("/api/export/briefing-pack")
def export_briefing_pack(
    request: Request,
    db: Session = Depends(get_db),
    q: str = "",
    species: str = "",
    state: str = "",
    date_from: str = "",
    date_to: str = "",
    crime_type: str = "",
    severity: str = "",
    source: str = "",
    min_confidence: float = settings.ai_threshold,
    limit: int = 200,
    _: None = Depends(require_admin_access),
):
    rows = _fetch_filtered_news_rows(
        db=db,
        q=q,
        species=species,
        state=state,
        date_from=date_from,
        date_to=date_to,
        crime_type=crime_type,
        severity=severity,
        source=source,
        min_confidence=min_confidence,
        limit=limit,
    )
    incidents = [
        {
            "id": row.id,
            "date": row.published_at.isoformat(sep=" ", timespec="seconds"),
            "title": row.title,
            "two_line_summary": row.intel_summary,
            "key_intelligence_points": _parse_intel_points(row.intel_points),
            "likely_smuggling_route": row.likely_smuggling_route,
            "enforcement_recommendation": row.enforcement_recommendation
            or _action_recommendation(
                row.risk_score,
                species=row.species,
                crime_type=row.crime_type,
                state=row.state,
                district=row.district,
                network_indicator=row.network_indicator,
                repeat_indicator=row.repeat_indicator,
            ),
            "confidence_explanation": row.confidence_explanation or row.ai_reason,
            "risk_score": row.risk_score,
            "confidence": round(row.confidence, 4),
            "species": row.species,
            "state": row.state,
            "district": row.district,
            "involved_persons": row.involved_persons,
            "crime_type": row.crime_type,
            "source": row.source,
            "open_url": f"/open/{row.id}",
        }
        for row in rows
    ]
    pack = {
        "generated_at_utc": datetime.utcnow().isoformat(),
        "total_incidents": len(incidents),
        "filters": {
            "q": q,
            "species": species,
            "state": state,
            "date_from": date_from,
            "date_to": date_to,
            "crime_type": crime_type,
            "severity": severity,
            "source": source,
            "min_confidence": min_confidence,
        },
        "incidents": incidents,
    }
    payload = json.dumps(pack, ensure_ascii=False, indent=2).encode("utf-8")
    _audit(actor="admin", action="export_briefing_pack", status="ok", ip=_client_ip(request), notes=f"rows={len(incidents)}")
    return StreamingResponse(
        iter([payload]),
        media_type="application/json; charset=utf-8",
        headers={"Content-Disposition": "attachment; filename=wildlife_analyst_briefing_pack.json"},
    )


@app.get("/api/external-signals")
def get_external_signals(
    db: Session = Depends(get_db),
    source_type: str = "",
    min_strength: float = 0.0,
    limit: int = 200,
):
    safe_limit = max(1, min(1000, limit))
    stmt = _apply_today_signal_scope(select(ExternalSignal)).order_by(ExternalSignal.published_at.desc())
    if source_type.strip():
        stmt = stmt.where(func.lower(ExternalSignal.source_type) == source_type.strip().lower())
    if min_strength > 0:
        stmt = stmt.where(ExternalSignal.signal_strength >= min_strength)
    rows = db.execute(stmt.limit(safe_limit)).scalars().all()
    return [
        {
            "id": row.id,
            "source_type": row.source_type,
            "source_name": row.source_name,
            "title": row.title,
            "url": row.url,
            "open_url": _safe_outbound_url(row.url),
            "published_at": row.published_at.isoformat(),
            "risk_score": row.risk_score,
            "species": row.species,
            "state": row.state,
            "signal_strength": row.signal_strength,
        }
        for row in rows
    ]


@app.get("/api/osint-feed")
def get_osint_feed(db: Session = Depends(get_db), limit: int = 80):
    safe_limit = max(1, min(300, limit))
    stmt = _apply_today_signal_scope(select(ExternalSignal))
    rows = (
        db.execute(
            stmt
            .order_by(ExternalSignal.signal_strength.desc(), ExternalSignal.published_at.desc())
            .limit(safe_limit)
        )
        .scalars()
        .all()
    )
    return [
        {
            "id": row.id,
            "source_type": row.source_type,
            "source_name": row.source_name,
            "title": row.title,
            "url": row.url,
            "open_url": _safe_outbound_url(row.url),
            "published_at": row.published_at.isoformat(),
            "risk_score": row.risk_score,
            "signal_strength": row.signal_strength,
            "early_chatter": row.signal_strength >= 0.52 and row.risk_score < 70,
        }
        for row in rows
    ]


@app.get("/api/trending-keywords")
def get_trending_keywords(db: Session = Depends(get_db), days: int = 7, limit: int = 15):
    safe_days = max(1, min(30, days))
    safe_limit = max(1, min(50, limit))
    if _scope_from_start_enabled():
        since = _start_from_utc()
    else:
        since = datetime.utcnow() - timedelta(days=safe_days)
    signals = (
        db.execute(_apply_today_signal_scope(select(ExternalSignal).where(ExternalSignal.published_at >= since)))
        .scalars()
        .all()
    )
    watch_keywords = [
        str(row).strip().lower()
        for row in db.execute(select(Watchlist.keyword).where(Watchlist.enabled.is_(True))).scalars().all()
        if str(row).strip()
    ]
    keyword_counts: dict[str, dict[str, float]] = {}
    reddit_mentions = 0
    govt_signals = 0
    ngo_signals = 0
    source_breakdown: dict[str, int] = {}
    for signal in signals:
        text = (signal.title or "").lower()
        source_type = (signal.source_type or "unknown").lower()
        source_breakdown[source_type] = source_breakdown.get(source_type, 0) + 1
        if source_type == "reddit":
            reddit_mentions += 1
        if source_type == "government":
            govt_signals += 1
        if source_type == "ngo":
            ngo_signals += 1
        for keyword in watch_keywords:
            if keyword in text:
                bucket = keyword_counts.setdefault(keyword, {"count": 0.0, "max_strength": 0.0})
                bucket["count"] += 1.0 + (signal.signal_strength * 0.6)
                bucket["max_strength"] = max(bucket["max_strength"], signal.signal_strength)
    ranking = sorted(
        [
            {"keyword": key, "score": round(value["count"], 2), "max_strength": round(value["max_strength"], 4)}
            for key, value in keyword_counts.items()
        ],
        key=lambda item: item["score"],
        reverse=True,
    )[:safe_limit]
    return {
        "keywords": ranking,
        "source_breakdown": [{"source_type": key, "count": count} for key, count in sorted(source_breakdown.items())],
        "reddit_spike_mentions": reddit_mentions,
        "ngo_govt_signals": {"ngo": ngo_signals, "government": govt_signals},
    }


@app.get("/api/watchlists")
def get_watchlists(db: Session = Depends(get_db)):
    rows = db.execute(select(Watchlist).order_by(Watchlist.keyword.asc())).scalars().all()
    return [
        {
            "id": row.id,
            "keyword": row.keyword,
            "enabled": row.enabled,
            "category": row.category,
        }
        for row in rows
    ]


@app.post("/api/watchlists")
def upsert_watchlist(
    request: Request,
    keyword: str,
    category: str = "threat",
    enabled: bool = True,
    _: None = Depends(require_admin_access),
    db: Session = Depends(get_db),
):
    value = keyword.strip().lower()
    if not value:
        raise HTTPException(status_code=400, detail="keyword is required")
    existing = db.execute(select(Watchlist).where(func.lower(Watchlist.keyword) == value)).scalar_one_or_none()
    if existing is not None:
        existing.category = category[:60]
        existing.enabled = enabled
        db.commit()
        _audit(
            actor="admin",
            action="config_change",
            status="ok",
            ip=_client_ip(request),
            notes=f"watchlist updated keyword={value}; enabled={enabled}; category={category}",
        )
        return {"status": "updated", "id": existing.id}
    row = Watchlist(keyword=value[:120], category=category[:60], enabled=enabled)
    db.add(row)
    db.commit()
    db.refresh(row)
    _audit(
        actor="admin",
        action="config_change",
        status="ok",
        ip=_client_ip(request),
        notes=f"watchlist created keyword={value}; enabled={enabled}; category={category}",
    )
    return {"status": "created", "id": row.id}


@app.get("/api/alerts")
def get_alerts(db: Session = Depends(get_db), limit: int = 100):
    safe_limit = max(1, min(500, limit))
    stmt = select(Alert)
    if _scope_from_start_enabled():
        stmt = stmt.where(Alert.created_at >= _start_from_utc())
    rows = (
        db.execute(stmt.order_by(Alert.created_at.desc()).limit(safe_limit))
        .scalars()
        .all()
    )
    related_news = {}
    news_ids = [row.news_id for row in rows]
    if news_ids:
        news_rows = db.execute(select(NewsItem).where(NewsItem.id.in_(news_ids))).scalars().all()
        related_news = {news.id: news for news in news_rows}
    return [
        {
            "id": row.id,
            "created_at": row.created_at.isoformat(),
            "news_id": row.news_id,
            "severity": row.severity,
            "trigger_reason": row.trigger_reason,
            "sent_telegram": row.sent_telegram,
            "sent_email": row.sent_email,
            "sent_popup": row.sent_popup,
            "title": related_news.get(row.news_id).title if related_news.get(row.news_id) else row.trigger_reason,
            "source": related_news.get(row.news_id).source if related_news.get(row.news_id) else "alert-engine",
            "state": related_news.get(row.news_id).state if related_news.get(row.news_id) else "",
            "district": related_news.get(row.news_id).district if related_news.get(row.news_id) else "",
            "involved_persons": related_news.get(row.news_id).involved_persons if related_news.get(row.news_id) else "",
            "risk_score": related_news.get(row.news_id).risk_score if related_news.get(row.news_id) else 0,
            "open_url": f"/open/{row.news_id}",
        }
        for row in rows
    ]


@app.get("/api/alerts-popup")
def get_alerts_popup(db: Session = Depends(get_db), since_id: int = 0, limit: int = 20):
    safe_limit = max(1, min(100, limit))
    stmt = select(Alert).where(Alert.id > since_id).where(Alert.severity.in_(["high", "critical"]))
    if _scope_from_start_enabled():
        stmt = stmt.where(Alert.created_at >= _start_from_utc())
    rows = (
        db.execute(
            stmt.order_by(Alert.id.asc()).limit(safe_limit)
        )
        .scalars()
        .all()
    )
    if not rows:
        return []
    news_map = {
        row.id: row
        for row in db.execute(select(NewsItem).where(NewsItem.id.in_([alert.news_id for alert in rows]))).scalars().all()
    }
    payload = []
    for alert in rows:
        news = news_map.get(alert.news_id)
        if news is None:
            continue
        payload.append(
            {
                "id": alert.id,
                "news_id": alert.news_id,
                "created_at": alert.created_at.isoformat(),
                "severity": alert.severity,
                "title": news.title,
                "state": news.state,
                "district": news.district,
                "involved_persons": news.involved_persons,
                "risk_score": news.risk_score,
                "crime_type": news.crime_type,
                "species": news.species,
                "trigger_reason": alert.trigger_reason,
                "open_url": f"/open/{news.id}",
            }
        )
    return payload


@app.get("/api/hotspots")
def get_hotspots(db: Session = Depends(get_db), limit: int = 50):
    safe_limit = max(1, min(200, limit))
    key = _cache_key("hotspots", limit=safe_limit)
    return _cache_get_or_compute(
        key,
        lambda: [
            {
                "state": row.state,
                "district": row.district,
                "incident_count": row.incident_count,
                "avg_risk": row.avg_risk,
                "hotspot_score": row.hotspot_score,
            }
            for row in (
                db.execute(select(DistrictStat).order_by(DistrictStat.hotspot_score.desc()).limit(safe_limit))
                .scalars()
                .all()
            )
        ],
    )


@app.get("/api/species-trends")
def get_species_trends(db: Session = Depends(get_db), limit: int = 100):
    safe_limit = max(1, min(500, limit))
    rows = (
        db.execute(select(SpeciesStat).order_by(SpeciesStat.count.desc(), SpeciesStat.avg_risk.desc()).limit(safe_limit))
        .scalars()
        .all()
    )
    return [
        {
            "species": row.species,
            "count": row.count,
            "avg_risk": row.avg_risk,
            "last_seen": row.last_seen.isoformat(),
        }
        for row in rows
    ]


@app.get("/api/source-rankings")
def get_source_rankings(db: Session = Depends(get_db), limit: int = 100):
    safe_limit = max(1, min(500, limit))
    key = _cache_key("source_rankings", limit=safe_limit)
    return _cache_get_or_compute(
        key,
        lambda: [
            {
                "source_name": row.source_name,
                "reliability_score": row.reliability_score,
                "article_count": row.article_count,
                "last_seen": row.last_seen.isoformat(),
            }
            for row in (
                db.execute(select(SourceStat).order_by(SourceStat.reliability_score.desc(), SourceStat.article_count.desc()).limit(safe_limit))
                .scalars()
                .all()
            )
        ],
    )


@app.get("/api/sync-history")
def get_sync_history(db: Session = Depends(get_db), limit: int = 100):
    safe_limit = max(1, min(500, limit))
    rows = db.execute(select(SyncLog).order_by(SyncLog.started_at.desc()).limit(safe_limit)).scalars().all()
    return [
        {
            "id": row.id,
            "started_at": row.started_at.isoformat(),
            "ended_at": row.ended_at.isoformat(),
            "provider": row.provider,
            "scanned": row.scanned,
            "kept": row.kept,
            "failed": row.failed,
            "duration_sec": row.duration_sec,
            "notes": row.notes,
        }
        for row in rows
    ]


@app.get("/health")
def health(db: Session = Depends(get_db)):
    db_diag = diagnose_database()
    total_rows = db.scalar(_apply_today_news_scope(select(func.count()).select_from(NewsItem))) or 0
    snapshot = _sync_snapshot()
    started_at = runtime_diagnostics.get("startup_time")
    uptime_seconds = 0.0
    if isinstance(started_at, str):
        try:
            uptime_seconds = max(0.0, (datetime.now(tz=UTC) - datetime.fromisoformat(started_at)).total_seconds())
        except ValueError:
            uptime_seconds = 0.0
    pending_alerts = int(
        db.scalar(
            select(func.count())
            .select_from(Alert)
            .where((Alert.sent_popup.is_(False)) | (Alert.sent_email.is_(False)) | (Alert.sent_telegram.is_(False)))
        )
        or 0
    )
    return {
        "status": "ok" if db_diag.get("ok") else "degraded",
        "db": db_diag,
        "ai_model": {
            "ready": bool(runtime_diagnostics.get("ai_model_ready")),
            "model": settings.model_name,
        },
        "scheduler": {
            "running": scheduler.running,
            "interval_minutes": settings.sync_interval_minutes,
        },
        "alerts": {
            "pending": pending_alerts,
            "dispatch_interval_seconds": settings.alert_dispatch_interval_seconds,
        },
        "cache": api_cache.snapshot(),
        "security": {
            "admin_auth_enabled": bool(settings.admin_token or settings.admin_password or settings.admin_password_hash),
            "rate_limit_per_minute": settings.api_rate_limit_per_minute,
        },
        "last_sync": snapshot.get("finished_at"),
        "uptime_seconds": round(uptime_seconds, 2),
        "queue_backlog": collector.queue_backlog,
        "total_news_rows": int(total_rows),
    }


@app.get("/api/sync-status")
def sync_status():
    return _sync_snapshot()


@app.get("/open/{item_id}")
def open_article(item_id: int, db: Session = Depends(get_db)):
    item = db.execute(select(NewsItem).where(NewsItem.id == item_id)).scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Article not found")

    cache_key = _cache_key("resolved_article_url", resolver="v3", item_id=item.id, source_url=item.url or "")
    target = _cache_get_or_compute(cache_key, lambda: _resolve_exact_article_url(item))
    if not target:
        target = _safe_outbound_url(item.url)
    if not target:
        raise HTTPException(status_code=502, detail="Could not resolve article URL")

    redirect_target = _safe_outbound_url(target)
    if not redirect_target:
        raise HTTPException(status_code=502, detail="Could not resolve article URL")

    return RedirectResponse(url=redirect_target, status_code=307)
