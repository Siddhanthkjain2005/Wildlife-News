from __future__ import annotations

import json
from collections.abc import Callable
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass
from datetime import UTC, date, datetime, timedelta
from threading import Lock
from time import monotonic, sleep
from urllib.parse import parse_qs, parse_qsl, quote_plus, unquote, urlencode, urlparse, urlunparse
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

import feedparser
import requests
from bs4 import BeautifulSoup
from dateutil import parser as date_parser
from langdetect import LangDetectException, detect
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.logger import get_logger
from app.core.retry import retry_call
from app.models import Alert, DistrictStat, Entity, ExternalSignal, NewsItem, SourceStat, SpeciesStat, Watchlist
from app.services.dedupe import DedupeEngine
from app.services.intelligence import HybridIntelligenceEngine
from app.services.reports import upsert_report_for_news

logger = get_logger("sync.collector")

QUERY_BY_LANGUAGE: dict[str, list[str]] = {
    "en": [
        "wildlife poaching India",
        "illegal wildlife trade India",
        "animal trafficking arrest India",
        "wildlife seizure India",
        "animal parts seized India",
        "wildlife crime arrest India",
        "ivory seizure India",
        "pangolin trafficking India",
        "tiger skin seizure India",
        "rhino horn trafficking India",
        "exotic bird trafficking India",
        "illegal fishing India",
        "forest hunting gang India",
    ],
    "hi": ["भारत वन्यजीव शिकार", "भारत वन्यजीव तस्करी", "भारत हाथी दांत जब्त"],
    "kn": ["ಭಾರತ ವನ್ಯಜೀವಿ ಕಳ್ಳಬೇಟೆ", "ಭಾರತ ವನ್ಯಜೀವಿ ಕಳ್ಳಸಾಗಣೆ", "ಭಾರತ ಆನೆ ದಂತ ವಶ"],
    "ta": ["இந்தியா வனவிலங்கு வேட்டை", "இந்தியா விலங்கு கடத்தல்"],
    "te": ["భారత్ వన్యప్రాణి వేట", "భారత్ అక్రమ వన్యప్రాణి రవాణా"],
    "ml": ["ഇന്ത്യ വന്യജീവി വേട്ട", "ഇന്ത്യ വന്യജീവി കടത്ത്", "ഇന്ത്യ ആനക്കൊമ്പ് പിടിച്ചെടുത്തു"],
    "bn": ["ভারত বন্যপ্রাণী শিকার", "ভারত বন্যপ্রাণী পাচার", "ভারত হাতির দাঁত জব্দ"],
    "mr": ["भारत वन्यजीव शिकारी", "भारत वन्यजीव तस्करी", "भारत हस्तीदंत जप्त"],
    "gu": ["ભારત વન્યજીવ શિકાર", "ભારત વન્યજીવ તસ્કરી", "ભારત હાથીદાંત જપ્ત"],
    "pa": ["ਭਾਰਤ ਜੰਗਲੀ ਜੀਵ ਸ਼ਿਕਾਰ", "ਭਾਰਤ ਜੰਗਲੀ ਜੀਵ ਤਸਕਰੀ", "ਭਾਰਤ ਹਾਥੀ ਦਾਂਤ ਜ਼ਬਤ"],
    "ur": ["بھارت جنگلی حیات کا شکار", "بھارت جنگلی حیات اسمگلنگ", "بھارت ہاتھی دانت ضبط"],
    "or": ["ଭାରତ ବନ୍ୟଜୀବ ଶିକାର", "ଭାରତ ବନ୍ୟଜୀବ ତସକରି", "ଭାରତ ହାତୀଦାନ୍ତ ଜବତ"],
    "as": ["ভাৰত বন্যপ্ৰাণী চোৰাশিকার", "ভাৰত বন্যপ্ৰাণী সৰবৰাহ", "ভাৰত হাতীদাঁত জব্দ"],
}

REGION_BY_LANGUAGE = {
    "en": ("en", "IN", "IN:en", "en-IN"),
    "hi": ("hi", "IN", "IN:hi", "hi-IN"),
    "kn": ("kn", "IN", "IN:kn", "en-IN"),
    "ta": ("ta", "IN", "IN:ta", "en-IN"),
    "te": ("te", "IN", "IN:te", "en-IN"),
    "ml": ("ml", "IN", "IN:ml", "en-IN"),
    "bn": ("bn", "IN", "IN:bn", "en-IN"),
    "mr": ("mr", "IN", "IN:mr", "en-IN"),
    "gu": ("gu", "IN", "IN:gu", "en-IN"),
    "pa": ("pa", "IN", "IN:pa", "en-IN"),
    "ur": ("ur", "IN", "IN:ur", "en-IN"),
    "or": ("or", "IN", "IN:or", "en-IN"),
    "as": ("as", "IN", "IN:as", "en-IN"),
}

DEFAULT_OSINT_KEYWORDS = [
    "poaching",
    "tiger skin",
    "ivory",
    "rhino horn",
    "pangolin",
    "smuggling",
    "seizure",
    "wildlife trade",
]
REDDIT_SUBREDDITS = ["wildlifecrime", "india", "conservation", "environment", "news", "worldnews"]
GOVT_FEED_URLS = [
    "https://wccb.gov.in/wccb/rss",
    "https://moef.gov.in/feed/",
    "https://www.karnatakaforest.gov.in/rss.xml",
    "https://forest.kerala.gov.in/feed",
    "https://forest.delhigovt.nic.in/feed",
]
NGO_FEED_URLS = [
    "https://www.worldwildlife.org/stories/feed",
    "https://www.traffic.org/news/feed/",
    "https://www.wcs.org/rss.xml",
    "https://www.wti.org.in/feed/",
    "https://www.iucn.org/rss/news",
]
OSINT_SOURCE_TYPE = {
    "reddit_osint": "reddit",
    "govt_notices": "government",
    "ngo_feeds": "ngo",
    "x_adapter": "x_adapter",
}

KEY_BASED_PROVIDERS = {"newsapi", "gnews", "mediastack", "newsdata"}
PROVIDER_QUERY_CAPS = {
    "google_rss": 4,
    "bing_rss": 2,
    "gdelt": 2,
    "newsapi": 1,
    "gnews": 1,
    "mediastack": 1,
    "newsdata": 1,
    "reddit_osint": 2,
    "govt_notices": 2,
    "ngo_feeds": 2,
    "x_adapter": 2,
}
PROVIDER_LANGUAGE_CAPS = {
    "google_rss": 8,
    "bing_rss": 2,
    "gdelt": 2,
    "newsapi": 1,
    "gnews": 1,
    "mediastack": 2,
    "newsdata": 1,
}


@dataclass
class RawArticle:
    title: str
    summary: str
    source: str
    url: str
    published_at: datetime
    language: str


class NewsCollector:
    def __init__(
        self,
        intelligence_engine: HybridIntelligenceEngine,
        dedupe_engine: DedupeEngine | None = None,
    ) -> None:
        self.intelligence_engine = intelligence_engine
        self.dedupe_engine = dedupe_engine or DedupeEngine()
        self.http = requests.Session()
        self._provider_failures: dict[str, int] = {}
        self._failed_sources: list[dict[str, object]] = []
        self._provider_cooldowns: dict[str, datetime] = {}
        self._cooldown_notified: set[str] = set()
        self._provider_next_allowed_at: dict[str, float] = {}
        self._query_offsets: dict[tuple[str, str], int] = {}
        self._language_offsets: dict[str, int] = {}
        self._rate_state_lock = Lock()

    @staticmethod
    def _parse_points(raw: str) -> list[str]:
        try:
            parsed = json.loads(raw or "[]")
            if isinstance(parsed, list):
                return [str(item) for item in parsed if str(item).strip()]
        except (TypeError, ValueError):
            return []
        return []

    @staticmethod
    def _merge_species(existing_species: str, incoming_species: list[str]) -> str:
        merged = {item.strip().lower() for item in existing_species.split(",") if item.strip()}
        merged.update(item.strip().lower() for item in incoming_species if item.strip())
        if not merged:
            return ""
        return ", ".join(sorted(merged))[:300]

    @staticmethod
    def _merge_intel_points(existing_points: str, incoming_points: list[str]) -> str:
        merged: list[str] = []
        seen: set[str] = set()
        for point in NewsCollector._parse_points(existing_points):
            key = point.strip().lower()
            if key and key not in seen:
                seen.add(key)
                merged.append(point.strip())
        for point in incoming_points:
            cleaned = str(point).strip()
            key = cleaned.lower()
            if cleaned and key not in seen:
                seen.add(key)
                merged.append(cleaned)
        return json.dumps(merged[:12], ensure_ascii=False)

    @staticmethod
    def _merge_people(existing_people: str, incoming_people: list[str]) -> str:
        merged: dict[str, str] = {}
        for raw in existing_people.split(","):
            cleaned = raw.strip()
            if cleaned:
                merged.setdefault(cleaned.lower(), cleaned)
        for raw in incoming_people:
            cleaned = str(raw).strip()
            if cleaned:
                merged.setdefault(cleaned.lower(), cleaned)
        return ", ".join(merged.values())[:500]

    @staticmethod
    def _merge_sources(existing_source: str, merged_sources: str, incoming_source: str) -> tuple[str, int]:
        values = {item.strip() for item in merged_sources.split(",") if item.strip()}
        if existing_source.strip():
            values.add(existing_source.strip())
        if incoming_source.strip():
            values.add(incoming_source.strip())
        ordered = sorted(values)
        return ", ".join(ordered), len(ordered)

    @staticmethod
    def _strip_html(value: str) -> str:
        return BeautifulSoup(value or "", "html.parser").get_text(" ", strip=True)

    @staticmethod
    def _extract_external_link_from_html(html: str, blocked_hosts: set[str] | None = None) -> str:
        if not html:
            return ""
        blocked = {host.lower() for host in (blocked_hosts or set())}
        soup = BeautifulSoup(html, "html.parser")
        for anchor in soup.find_all("a", href=True):
            href = str(anchor.get("href", "")).strip()
            if not href:
                continue
            candidate = NewsCollector._normalize_url(href)
            parsed = urlparse(candidate)
            host = parsed.netloc.lower()
            if parsed.scheme not in {"http", "https"} or not host:
                continue
            if host in blocked:
                continue
            return candidate
        return ""

    @staticmethod
    def _normalize_url(url: str) -> str:
        raw = (url or "").strip()
        parsed = urlparse(raw)
        if not parsed.scheme or not parsed.netloc:
            return raw

        host = parsed.netloc.lower()
        query_map = parse_qs(parsed.query)

        if ("bing.com" in host) and parsed.path.startswith("/news/apiclick.aspx"):
            target = (query_map.get("url") or query_map.get("u") or [None])[0]
            if target:
                return NewsCollector._normalize_url(unquote(target))

        if host in {"www.google.com", "google.com"} and parsed.path == "/url":
            target = (query_map.get("url") or query_map.get("q") or [None])[0]
            if target:
                return NewsCollector._normalize_url(unquote(target))

        if parsed.scheme == "http":
            parsed = parsed._replace(scheme="https")

        clean_query = [(k, v) for k, v in parse_qsl(parsed.query) if not k.startswith("utm_")]
        normalized = parsed._replace(query=urlencode(clean_query), fragment="")
        return urlunparse(normalized)

    @staticmethod
    def _parse_date(raw_date: str | None) -> datetime:
        if not raw_date:
            return datetime.now(tz=UTC).replace(tzinfo=None)
        try:
            parsed = date_parser.parse(raw_date)
        except (TypeError, ValueError, OverflowError):
            return datetime.now(tz=UTC).replace(tzinfo=None)
        if parsed.tzinfo is None:
            return parsed
        return parsed.astimezone(UTC).replace(tzinfo=None)

    @staticmethod
    def _detect_language(title: str, summary: str, fallback: str) -> str:
        fallback_lang = str(fallback or "").strip().lower() or "unknown"
        text = f"{title}. {summary}".strip()
        try:
            detected = detect(text).strip().lower()
        except LangDetectException:
            return fallback_lang
        if not detected:
            return fallback_lang
        if fallback_lang not in {"", "unknown"} and fallback_lang != detected:
            # For non-English query lanes, langdetect tends to over-predict English on short mixed snippets.
            if fallback_lang != "en" and (detected == "en" or len(text) < 120):
                return fallback_lang
        return detected

    @staticmethod
    def _csv_list(raw_value: str) -> list[str]:
        return [item.strip().lower() for item in raw_value.split(",") if item.strip()]

    @staticmethod
    def _start_from_utc() -> datetime:
        try:
            app_tz = ZoneInfo(settings.app_timezone)
        except ZoneInfoNotFoundError:
            app_tz = ZoneInfo("UTC")
        raw_start = str(settings.start_from_date or "").strip()
        if raw_start:
            try:
                parsed_date = date.fromisoformat(raw_start)
                start_local = datetime(parsed_date.year, parsed_date.month, parsed_date.day, tzinfo=app_tz)
                return start_local.astimezone(UTC).replace(tzinfo=None)
            except ValueError:
                logger.warning("Invalid START_FROM_DATE=%s in collector. Falling back to current local date.", raw_start)
        now_local = datetime.now(tz=app_tz)
        start_local = datetime(now_local.year, now_local.month, now_local.day, tzinfo=app_tz)
        return start_local.astimezone(UTC).replace(tzinfo=None)

    def _enabled_providers(self) -> list[str]:
        return self._csv_list(settings.enabled_providers)

    def _supported_languages(self) -> list[str]:
        configured = self._csv_list(settings.supported_languages)
        return configured or ["en", "hi", "kn", "ta", "te"]

    @property
    def queue_backlog(self) -> int:
        return len(self._failed_sources)

    def _push_failed_source(self, *, provider: str, language: str, query: str, error: str) -> None:
        self._failed_sources.append(
            {
                "provider": provider,
                "language": language,
                "query": query,
                "error": error[:300],
                "timestamp": datetime.utcnow().isoformat(),
            }
        )
        if len(self._failed_sources) > 500:
            del self._failed_sources[:-500]

    @staticmethod
    def _osint_queries(db: Session) -> list[str]:
        rows = (
            db.execute(select(Watchlist.keyword).where(Watchlist.enabled.is_(True)).order_by(Watchlist.keyword.asc()))
            .scalars()
            .all()
        )
        values = [str(row).strip() for row in rows if str(row).strip()]
        return values or DEFAULT_OSINT_KEYWORDS

    @staticmethod
    def _queries_for_language(language: str) -> list[str]:
        if language in QUERY_BY_LANGUAGE:
            return QUERY_BY_LANGUAGE[language]
        return QUERY_BY_LANGUAGE["en"]

    def _active_languages_for_provider(self, provider: str) -> list[str]:
        source_type = self._provider_source_type(provider)
        if source_type != "news":
            return ["en"]
        ordered: list[str] = []
        for preferred in ("en", "hi"):
            if preferred in self._supported_languages():
                ordered.append(preferred)
        for lang in self._supported_languages():
            normalized = lang if lang in QUERY_BY_LANGUAGE else "en"
            if normalized not in ordered:
                ordered.append(normalized)
        max_languages = max(1, PROVIDER_LANGUAGE_CAPS.get(provider, len(ordered)))
        if max_languages >= len(ordered):
            return ordered or ["en"]
        start = self._language_offsets.get(provider, 0) % len(ordered)
        selected = [ordered[(start + index) % len(ordered)] for index in range(max_languages)]
        self._language_offsets[provider] = (start + max_languages) % len(ordered)
        return selected or ["en"]

    @staticmethod
    def _provider_has_required_key(provider: str) -> bool:
        if provider == "newsapi":
            return bool(settings.newsapi_key)
        if provider == "gnews":
            return bool(settings.gnews_api_key)
        if provider == "mediastack":
            return bool(settings.mediastack_api_key)
        if provider == "newsdata":
            return bool(settings.newsdata_api_key)
        return True

    def _select_queries_for_cycle(self, *, provider: str, language: str, queries: list[str]) -> list[str]:
        if not queries:
            return []
        max_queries = max(1, int(settings.max_queries_per_language))
        provider_cap = max(1, int(PROVIDER_QUERY_CAPS.get(provider, max_queries)))
        max_queries = min(max_queries, provider_cap)
        if provider == "google_rss":
            # Keep non-English lanes active every cycle instead of letting English dominate volume.
            max_queries = min(max_queries, 4 if language == "en" else 3)
        if max_queries >= len(queries):
            return list(queries)
        key = (provider, language)
        start = self._query_offsets.get(key, 0) % len(queries)
        selected = [queries[(start + index) % len(queries)] for index in range(max_queries)]
        self._query_offsets[key] = (start + len(selected)) % len(queries)
        return selected

    def _record_provider_failure(self, provider: str) -> None:
        with self._rate_state_lock:
            self._provider_failures[provider] = self._provider_failures.get(provider, 0) + 1

    @staticmethod
    def _retry_after_seconds(header_value: str | None) -> int | None:
        value = str(header_value or "").strip()
        if not value:
            return None
        if value.isdigit():
            return max(1, int(value))
        try:
            retry_at = date_parser.parse(value)
        except (TypeError, ValueError, OverflowError):
            return None
        if retry_at.tzinfo is None:
            retry_at = retry_at.replace(tzinfo=UTC)
        delta = (retry_at.astimezone(UTC) - datetime.now(tz=UTC)).total_seconds()
        return max(1, int(delta))

    def _cooldown_seconds_from_response(self, response: requests.Response | None) -> int:
        configured = max(30, int(settings.provider_rate_limit_cooldown_seconds))
        if response is None:
            return configured
        parsed = self._retry_after_seconds(response.headers.get("Retry-After"))
        if parsed is None:
            return configured
        return max(30, min(3600, parsed))

    def _set_provider_cooldown(self, provider: str, seconds: int, reason: str) -> None:
        cooldown_seconds = max(30, int(seconds))
        cooldown_until = datetime.utcnow() + timedelta(seconds=cooldown_seconds)
        with self._rate_state_lock:
            previous = self._provider_cooldowns.get(provider)
            if previous is None or previous < cooldown_until:
                self._provider_cooldowns[provider] = cooldown_until
                self._cooldown_notified.discard(provider)
        logger.warning(
            "Provider cooldown enabled: %s for %ss (%s) until %s UTC",
            provider,
            cooldown_seconds,
            reason,
            cooldown_until.isoformat(timespec="seconds"),
        )

    def _throttle_provider(self, provider: str) -> None:
        interval_seconds = max(0.0, float(settings.provider_min_request_interval_seconds))
        if interval_seconds <= 0:
            return
        wait_seconds = 0.0
        with self._rate_state_lock:
            now = monotonic()
            next_allowed = self._provider_next_allowed_at.get(provider, now)
            scheduled = max(now, next_allowed)
            self._provider_next_allowed_at[provider] = scheduled + interval_seconds
            wait_seconds = max(0.0, scheduled - now)
        if wait_seconds > 0:
            sleep(wait_seconds)

    def _provider_on_cooldown(self, provider: str) -> bool:
        with self._rate_state_lock:
            until = self._provider_cooldowns.get(provider)
            notified = provider in self._cooldown_notified
        if until is None:
            return False
        now = datetime.utcnow()
        if now >= until:
            with self._rate_state_lock:
                self._provider_cooldowns.pop(provider, None)
                self._cooldown_notified.discard(provider)
            return False
        if not notified:
            logger.warning(
                "Skipping provider %s due to temporary cooldown until %s UTC",
                provider,
                until.isoformat(timespec="seconds"),
            )
            with self._rate_state_lock:
                self._cooldown_notified.add(provider)
        return True

    @staticmethod
    def _region(language: str) -> tuple[str, str, str, str]:
        return REGION_BY_LANGUAGE.get(language, REGION_BY_LANGUAGE["en"])

    def _http_get_json(self, *, provider: str, url: str, params: dict[str, object]) -> dict[str, object]:
        def _call() -> requests.Response:
            response = self.http.get(url, params=params, timeout=settings.request_timeout_seconds)
            if response.status_code >= 500:
                response.raise_for_status()
            return response

        response = retry_call(
            _call,
            retries=3,
            delay_seconds=1.0,
            backoff=2.0,
            on_retry=lambda attempt, err: logger.warning(
                "Retrying provider request (%s/%s): %s", attempt, 3, err
            ),
        )
        if response.status_code == 429:
            cooldown_seconds = self._cooldown_seconds_from_response(response)
            self._set_provider_cooldown(provider=provider, seconds=cooldown_seconds, reason="rate_limit_429")
        response.raise_for_status()
        return response.json()

    def _fetch_rss_urls(
        self,
        urls: list[str],
        query: str,
        limit: int,
        fallback_source: str,
        provider: str,
        language: str = "en",
    ) -> list[RawArticle]:
        items: list[RawArticle] = []
        query_tokens = [token.strip().lower() for token in query.split() if token.strip()]
        for feed_url in urls:
            self._throttle_provider(provider)
            feed = feedparser.parse(feed_url)
            for entry in feed.entries[:limit]:
                title = self._strip_html(getattr(entry, "title", ""))
                summary = self._strip_html(getattr(entry, "summary", ""))
                haystack = f"{title} {summary}".lower()
                if query_tokens and not any(token in haystack for token in query_tokens):
                    continue
                source_name = fallback_source
                if hasattr(entry, "source") and hasattr(entry.source, "title"):
                    source_name = self._strip_html(str(entry.source.title or fallback_source))
                items.append(
                    RawArticle(
                        title=title,
                        summary=summary,
                        source=source_name,
                        url=self._normalize_url(getattr(entry, "link", "").strip()),
                        published_at=self._parse_date(getattr(entry, "published", "")),
                        language=language,
                    )
                )
                if len(items) >= limit:
                    return items
        return items

    def _fetch_reddit_osint(self, query: str, limit: int) -> list[RawArticle]:
        items: list[RawArticle] = []
        for subreddit in REDDIT_SUBREDDITS:
            self._throttle_provider("reddit_osint")
            feed_url = (
                f"https://www.reddit.com/r/{subreddit}/search.rss?"
                f"q={quote_plus(query)}&restrict_sr=1&sort=new&t=week"
            )
            feed = feedparser.parse(feed_url)
            for entry in feed.entries[:max(2, limit // max(1, len(REDDIT_SUBREDDITS)))]:
                items.append(
                    RawArticle(
                        title=self._strip_html(getattr(entry, "title", "")),
                        summary=self._strip_html(getattr(entry, "summary", "")),
                        source=f"reddit:r/{subreddit}",
                        url=self._normalize_url(getattr(entry, "link", "").strip()),
                        published_at=self._parse_date(getattr(entry, "published", "")),
                        language="en",
                    )
                )
                if len(items) >= limit:
                    return items
        return items

    def _fetch_govt_notices(self, query: str, limit: int) -> list[RawArticle]:
        return self._fetch_rss_urls(
            urls=GOVT_FEED_URLS,
            query=query,
            limit=limit,
            fallback_source="govt-notice",
            provider="govt_notices",
            language="en",
        )

    def _fetch_ngo_feeds(self, query: str, limit: int) -> list[RawArticle]:
        return self._fetch_rss_urls(
            urls=NGO_FEED_URLS,
            query=query,
            limit=limit,
            fallback_source="ngo-feed",
            provider="ngo_feeds",
            language="en",
        )

    @staticmethod
    def _fetch_x_adapter(_query: str, _limit: int) -> list[RawArticle]:
        # Adapter intentionally returns no data when keys are not configured.
        return []

    def _fetch_google_rss(self, language: str, query: str, limit: int) -> list[RawArticle]:
        hl, gl, ceid, _ = self._region(language)
        feed_url = f"https://news.google.com/rss/search?q={quote_plus(query)}&hl={hl}&gl={gl}&ceid={ceid}"
        feed = feedparser.parse(feed_url)
        items: list[RawArticle] = []
        for entry in feed.entries[:limit]:
            article_url = self._normalize_url(getattr(entry, "link", "").strip())
            if urlparse(article_url).netloc.lower() == "news.google.com":
                summary_html = str(getattr(entry, "summary", "") or "")
                content_html = ""
                if hasattr(entry, "content") and isinstance(entry.content, list) and entry.content:
                    first_content = entry.content[0]
                    if isinstance(first_content, dict):
                        content_html = str(first_content.get("value", "") or "")
                blocked_hosts = {"news.google.com", "www.news.google.com", "google.com", "www.google.com"}
                extracted = self._extract_external_link_from_html(
                    summary_html,
                    blocked_hosts=blocked_hosts,
                )
                if not extracted and content_html:
                    extracted = self._extract_external_link_from_html(content_html, blocked_hosts=blocked_hosts)
                if extracted:
                    article_url = extracted
            items.append(
                RawArticle(
                    title=self._strip_html(getattr(entry, "title", "")),
                    summary=self._strip_html(getattr(entry, "summary", "")),
                    source=self._strip_html(
                        getattr(getattr(entry, "source", None), "title", "Google News")
                    ),
                    url=article_url,
                    published_at=self._parse_date(getattr(entry, "published", "")),
                    language=language,
                )
            )
        return items

    def _fetch_bing_rss(self, language: str, query: str, limit: int) -> list[RawArticle]:
        _, _, _, mkt = self._region(language)
        rss_url = f"https://www.bing.com/news/search?q={quote_plus(query)}&format=rss&mkt={mkt}"
        feed = feedparser.parse(rss_url)
        items: list[RawArticle] = []
        for entry in feed.entries[:limit]:
            items.append(
                RawArticle(
                    title=self._strip_html(getattr(entry, "title", "")),
                    summary=self._strip_html(getattr(entry, "summary", "")),
                    source=self._strip_html(
                        getattr(getattr(entry, "source", None), "title", "Bing News")
                    ),
                    url=self._normalize_url(getattr(entry, "link", "").strip()),
                    published_at=self._parse_date(getattr(entry, "published", "")),
                    language=language,
                )
            )
        return items

    def _fetch_gdelt(self, language: str, query: str, limit: int) -> list[RawArticle]:
        payload = self._http_get_json(
            provider="gdelt",
            url="https://api.gdeltproject.org/api/v2/doc/doc",
            params={
                "query": f"({query}) AND sourcecountry:IN",
                "mode": "ArtList",
                "format": "json",
                "sort": "HybridRel",
                "maxrecords": max(1, min(250, limit)),
            },
        )
        items: list[RawArticle] = []
        for article in (payload.get("articles") or [])[:limit]:
            title = self._strip_html(str(article.get("title", "")))
            items.append(
                RawArticle(
                    title=title,
                    summary=title,
                    source=self._strip_html(str(article.get("sourceCommonName", "GDELT"))),
                    url=self._normalize_url(str(article.get("url", "")).strip()),
                    published_at=self._parse_date(article.get("seendate")),
                    language=language,
                )
            )
        return items

    @staticmethod
    def _newsapi_lang(language: str) -> str | None:
        supported = {"ar", "de", "en", "es", "fr", "he", "it", "nl", "no", "pt", "ru", "sv", "ud", "zh"}
        return language if language in supported else ("en" if language == "hi" else None)

    def _fetch_newsapi(self, language: str, query: str, limit: int) -> list[RawArticle]:
        if not settings.newsapi_key:
            return []
        api_lang = self._newsapi_lang(language)
        if not api_lang:
            return []
        payload = self._http_get_json(
            provider="newsapi",
            url="https://newsapi.org/v2/everything",
            params={
                "apiKey": settings.newsapi_key,
                "q": query,
                "language": api_lang,
                "searchIn": "title,description,content",
                "sortBy": "publishedAt",
                "pageSize": max(1, min(100, limit)),
            },
        )
        items: list[RawArticle] = []
        for article in payload.get("articles", []):
            source_info = article.get("source") or {}
            items.append(
                RawArticle(
                    title=self._strip_html(str(article.get("title", ""))),
                    summary=self._strip_html(str(article.get("description", ""))),
                    source=self._strip_html(str(source_info.get("name", "NewsAPI"))),
                    url=self._normalize_url(str(article.get("url", "")).strip()),
                    published_at=self._parse_date(article.get("publishedAt")),
                    language=language,
                )
            )
        return items

    @staticmethod
    def _gnews_lang(language: str) -> str:
        supported = {"ar", "de", "en", "es", "fr", "he", "it", "ja", "nl", "no", "pt", "ro", "ru", "sv", "uk", "zh"}
        return language if language in supported else "en"

    def _fetch_gnews(self, language: str, query: str, limit: int) -> list[RawArticle]:
        if not settings.gnews_api_key:
            return []
        payload = self._http_get_json(
            provider="gnews",
            url="https://gnews.io/api/v4/search",
            params={
                "token": settings.gnews_api_key,
                "q": query,
                "lang": self._gnews_lang(language),
                "country": "in",
                "max": max(1, min(100, limit)),
            },
        )
        items: list[RawArticle] = []
        for article in payload.get("articles", []):
            source_info = article.get("source") or {}
            items.append(
                RawArticle(
                    title=self._strip_html(str(article.get("title", ""))),
                    summary=self._strip_html(str(article.get("description", ""))),
                    source=self._strip_html(str(source_info.get("name", "GNews"))),
                    url=self._normalize_url(str(article.get("url", "")).strip()),
                    published_at=self._parse_date(article.get("publishedAt")),
                    language=language,
                )
            )
        return items

    @staticmethod
    def _mediastack_lang(language: str) -> str:
        supported = {"ar", "de", "en", "es", "fr", "it", "nl", "no", "pt", "ru", "sv", "zh"}
        return language if language in supported else "en"

    def _fetch_mediastack(self, language: str, query: str, limit: int) -> list[RawArticle]:
        if not settings.mediastack_api_key:
            return []
        payload = self._http_get_json(
            provider="mediastack",
            url="http://api.mediastack.com/v1/news",
            params={
                "access_key": settings.mediastack_api_key,
                "keywords": query,
                "languages": self._mediastack_lang(language),
                "countries": "in",
                "sort": "published_desc",
                "limit": max(1, min(100, limit)),
            },
        )
        items: list[RawArticle] = []
        for article in payload.get("data", []):
            items.append(
                RawArticle(
                    title=self._strip_html(str(article.get("title", ""))),
                    summary=self._strip_html(str(article.get("description", ""))),
                    source=self._strip_html(str(article.get("source", "Mediastack"))),
                    url=self._normalize_url(str(article.get("url", "")).strip()),
                    published_at=self._parse_date(article.get("published_at")),
                    language=language,
                )
            )
        return items

    @staticmethod
    def _newsdata_lang(language: str) -> str:
        supported = {"ar", "de", "en", "es", "fr", "hi", "it", "ja", "nl", "pt", "ru", "sv", "zh"}
        return language if language in supported else "en"

    def _fetch_newsdata(self, language: str, query: str, limit: int) -> list[RawArticle]:
        if not settings.newsdata_api_key:
            return []
        payload = self._http_get_json(
            provider="newsdata",
            url="https://newsdata.io/api/1/news",
            params={
                "apikey": settings.newsdata_api_key,
                "q": query,
                "country": "in",
                "language": self._newsdata_lang(language),
                "size": max(1, min(50, limit)),
            },
        )
        items: list[RawArticle] = []
        for article in payload.get("results", []):
            source = article.get("source_id") or "NewsData"
            item_languages = article.get("language") or [language]
            item_lang = item_languages[0] if isinstance(item_languages, list) and item_languages else language
            items.append(
                RawArticle(
                    title=self._strip_html(str(article.get("title", ""))),
                    summary=self._strip_html(str(article.get("description", ""))),
                    source=self._strip_html(str(source)),
                    url=self._normalize_url(str(article.get("link", "")).strip()),
                    published_at=self._parse_date(article.get("pubDate")),
                    language=item_lang,
                )
            )
        return items

    def _fetch_provider(self, provider: str, language: str, query: str, limit: int) -> list[RawArticle]:
        if self._provider_on_cooldown(provider):
            return []
        self._throttle_provider(provider)
        try:
            if provider == "google_rss":
                return self._fetch_google_rss(language, query, limit)
            if provider == "bing_rss":
                return self._fetch_bing_rss(language, query, limit)
            if provider == "gdelt":
                return self._fetch_gdelt(language, query, limit)
            if provider == "newsapi":
                return self._fetch_newsapi(language, query, limit)
            if provider == "gnews":
                return self._fetch_gnews(language, query, limit)
            if provider == "mediastack":
                return self._fetch_mediastack(language, query, limit)
            if provider == "newsdata":
                return self._fetch_newsdata(language, query, limit)
            if provider == "reddit_osint":
                return self._fetch_reddit_osint(query, limit)
            if provider == "govt_notices":
                return self._fetch_govt_notices(query, limit)
            if provider == "ngo_feeds":
                return self._fetch_ngo_feeds(query, limit)
            if provider == "x_adapter":
                return self._fetch_x_adapter(query, limit)
        except requests.RequestException as err:
            status_code = getattr(getattr(err, "response", None), "status_code", None)
            if status_code == 429:
                response = getattr(err, "response", None)
                cooldown_seconds = self._cooldown_seconds_from_response(response)
                self._set_provider_cooldown(provider=provider, seconds=cooldown_seconds, reason="rate_limit_429")
            logger.warning("Provider request failed: %s (%s, %s): %s", provider, language, query, err)
            self._record_provider_failure(provider)
            self._push_failed_source(provider=provider, language=language, query=query, error=str(err))
        except ValueError as err:
            logger.warning("Provider payload parse failed: %s (%s, %s): %s", provider, language, query, err)
            self._record_provider_failure(provider)
            self._push_failed_source(provider=provider, language=language, query=query, error=str(err))
        return []

    @staticmethod
    def _severity_from_risk(risk_score: int) -> str:
        if risk_score >= 85:
            return "critical"
        if risk_score >= 70:
            return "high"
        return "medium"

    @staticmethod
    def _prior_district_hits(db: Session, district: str) -> int:
        if not district:
            return 0
        since = datetime.utcnow() - timedelta(days=30)
        return int(
            db.scalar(
                select(func.count())
                .select_from(NewsItem)
                .where(NewsItem.district == district)
                .where(NewsItem.published_at >= since)
            )
            or 0
        )

    @staticmethod
    def _prior_source_hits(db: Session, source: str) -> int:
        if not source:
            return 0
        since = datetime.utcnow() - timedelta(days=30)
        return int(
            db.scalar(
                select(func.count())
                .select_from(NewsItem)
                .where(NewsItem.source == source)
                .where(NewsItem.published_at >= since)
            )
            or 0
        )

    @staticmethod
    def _district_spike_anomaly(
        db: Session,
        *,
        state: str,
        district: str,
        reference_time: datetime,
        cache: dict[tuple[str, str], bool],
    ) -> bool:
        state_name = (state or "").strip().title()
        district_name = (district or "").strip().title()
        if not state_name or not district_name:
            return False

        cache_key = (state_name, district_name)
        if cache_key in cache:
            return cache[cache_key]

        recent_since = reference_time - timedelta(days=3)
        baseline_since = reference_time - timedelta(days=30)
        recent_count = int(
            db.scalar(
                select(func.count())
                .select_from(NewsItem)
                .where(NewsItem.state == state_name)
                .where(NewsItem.district == district_name)
                .where(NewsItem.published_at >= recent_since)
            )
            or 0
        )
        baseline_count = int(
            db.scalar(
                select(func.count())
                .select_from(NewsItem)
                .where(NewsItem.state == state_name)
                .where(NewsItem.district == district_name)
                .where(NewsItem.published_at >= baseline_since)
            )
            or 0
        )
        baseline_daily_avg = baseline_count / 30.0
        is_spike = recent_count >= 3 and recent_count >= (baseline_daily_avg * 2.0 + 1.0)
        cache[cache_key] = is_spike
        return is_spike

    @staticmethod
    def _clamp(value: float, lower: float, upper: float) -> float:
        return max(lower, min(upper, value))

    def _upsert_source_stat(
        self,
        db: Session,
        source_name: str,
        confidence: float,
        is_duplicate: bool,
    ) -> SourceStat:
        source_label = (source_name or "unknown").strip()[:160]
        now = datetime.utcnow()
        source_stat = db.execute(select(SourceStat).where(SourceStat.source_name == source_label)).scalar_one_or_none()
        if source_stat is None:
            source_stat = SourceStat(
                source_name=source_label,
                reliability_score=70.0,
                article_count=0,
                last_seen=now,
            )
            db.add(source_stat)
            db.flush()

        delta = -1.6 if is_duplicate else (0.9 if confidence >= 0.75 else -0.4 if confidence < 0.45 else 0.2)
        source_stat.reliability_score = self._clamp(source_stat.reliability_score + delta, 5.0, 98.0)
        source_stat.article_count += 1
        source_stat.last_seen = now
        return source_stat

    @staticmethod
    def _provider_source_type(provider: str) -> str:
        return OSINT_SOURCE_TYPE.get(provider, "news")

    def _upsert_external_signal(
        self,
        db: Session,
        *,
        provider: str,
        source_name: str,
        title: str,
        url: str,
        published_at: datetime,
        risk_score: int,
        confidence: float,
        species: list[str],
        state: str,
        network_indicator: bool,
        repeat_indicator: bool,
    ) -> None:
        source_type = self._provider_source_type(provider)
        if source_type == "news":
            return
        signal_strength = min(
            1.0,
            (confidence * 0.55)
            + ((risk_score / 100.0) * 0.25)
            + (0.1 if network_indicator else 0.0)
            + (0.1 if repeat_indicator else 0.0),
        )
        existing = db.execute(select(ExternalSignal).where(ExternalSignal.url == url)).scalar_one_or_none()
        joined_species = ", ".join(species)[:300]
        if existing is not None:
            existing.source_type = source_type
            existing.source_name = source_name[:180]
            existing.title = title[:600]
            existing.published_at = max(existing.published_at, published_at)
            existing.risk_score = max(existing.risk_score, risk_score)
            existing.species = joined_species or existing.species
            existing.state = state[:120] or existing.state
            existing.signal_strength = max(existing.signal_strength, round(signal_strength, 4))
            return

        db.add(
            ExternalSignal(
                source_type=source_type,
                source_name=source_name[:180],
                title=title[:600],
                url=url[:1200],
                published_at=published_at,
                risk_score=risk_score,
                species=joined_species,
                state=state[:120],
                signal_strength=round(signal_strength, 4),
            )
        )

    @staticmethod
    def _upsert_species_stats(db: Session, species: list[str], risk_score: int, published_at: datetime) -> None:
        seen: set[str] = set()
        for raw_name in species:
            normalized = raw_name.strip().lower()
            if not normalized or normalized in seen:
                continue
            seen.add(normalized)
            stat = db.execute(select(SpeciesStat).where(SpeciesStat.species == normalized)).scalar_one_or_none()
            if stat is None:
                db.add(
                    SpeciesStat(
                        species=normalized,
                        count=1,
                        avg_risk=float(risk_score),
                        last_seen=published_at,
                    )
                )
                continue

            total_risk = (stat.avg_risk * stat.count) + risk_score
            stat.count += 1
            stat.avg_risk = round(total_risk / stat.count, 2)
            stat.last_seen = max(stat.last_seen, published_at)

    @staticmethod
    def _upsert_district_stat(db: Session, state: str, district: str, risk_score: int) -> None:
        state_name = state.strip().title()
        district_name = district.strip().title()
        if not state_name or not district_name:
            return

        stat = db.execute(
            select(DistrictStat).where(DistrictStat.state == state_name).where(DistrictStat.district == district_name)
        ).scalar_one_or_none()
        if stat is None:
            hotspot = min(100.0, round((risk_score * 0.8) + 5.0, 2))
            db.add(
                DistrictStat(
                    state=state_name,
                    district=district_name,
                    incident_count=1,
                    avg_risk=float(risk_score),
                    hotspot_score=hotspot,
                )
            )
            return

        total_risk = (stat.avg_risk * stat.incident_count) + risk_score
        stat.incident_count += 1
        stat.avg_risk = round(total_risk / stat.incident_count, 2)
        stat.hotspot_score = min(100.0, round((stat.avg_risk * 0.7) + (stat.incident_count * 2.2), 2))

    @staticmethod
    def _sync_entities(
        db: Session,
        news_id: int,
        crime_type: str,
        species: list[str],
        state: str,
        district: str,
        location: str,
        involved_persons: list[str],
    ) -> None:
        db.query(Entity).filter(Entity.news_id == news_id).delete()
        payload: list[tuple[str, str]] = []
        if crime_type:
            payload.append(("crime_type", crime_type.strip().lower()[:240]))
        for item in species:
            cleaned = item.strip().lower()
            if cleaned:
                payload.append(("species", cleaned[:240]))
        if state.strip():
            payload.append(("state", state.strip().title()[:240]))
        if district.strip():
            payload.append(("district", district.strip().title()[:240]))
        if location.strip():
            payload.append(("location", location.strip()[:240]))
        for person in involved_persons:
            cleaned = person.strip()
            if cleaned:
                payload.append(("person", cleaned[:240]))
        for entity_type, entity_value in payload:
            db.add(Entity(news_id=news_id, entity_type=entity_type, entity_value=entity_value))

    @staticmethod
    def _ensure_alert(
        db: Session,
        news_id: int,
        risk_score: int,
        reason: str,
        severity: str = "high",
        force: bool = False,
    ) -> None:
        if not force and risk_score <= 80:
            return
        existing_alert = db.execute(select(Alert).where(Alert.news_id == news_id)).scalar_one_or_none()
        if existing_alert is not None:
            return
        db.add(
            Alert(
                news_id=news_id,
                severity=severity,
                trigger_reason=reason[:300],
                sent_telegram=False,
                sent_email=False,
                sent_popup=False,
            )
        )

    def _merge_into_incident(
        self,
        *,
        existing: NewsItem,
        title: str,
        summary: str,
        source: str,
        language: str,
        published: datetime,
        intel,
        url: str,
        url_hash: str,
        duplicate_confidence: float,
    ) -> None:
        merged_sources, source_count = self._merge_sources(
            existing_source=existing.source,
            merged_sources=existing.merged_sources,
            incoming_source=source,
        )

        existing.title = title[:600] if len(title) > len(existing.title or "") else existing.title
        existing.summary = (summary or title)[:4000] if len(summary or "") > len(existing.summary or "") else existing.summary
        existing.language = language[:16]
        existing.published_at = max(existing.published_at, published)
        existing.last_seen_at = datetime.utcnow()
        existing.ai_score = max(existing.ai_score, intel.confidence)
        existing.ai_reason = intel.reason[:300]
        existing.is_poaching = True
        existing.is_india = existing.is_india or intel.is_india
        previous_risk = existing.risk_score
        previous_confidence = existing.confidence
        existing.confidence = max(existing.confidence, intel.confidence)
        existing.risk_score = max(existing.risk_score, intel.risk_score)
        existing.crime_type = intel.crime_type[:80] if existing.crime_type == "unknown" else existing.crime_type
        existing.species = self._merge_species(existing.species, intel.species)
        existing.state = existing.state or intel.state[:120]
        existing.district = existing.district or intel.district[:120]
        existing.location = existing.location or intel.location[:240]
        existing.involved_persons = self._merge_people(existing.involved_persons, intel.involved_persons)
        existing.network_indicator = existing.network_indicator or intel.network_indicator
        existing.repeat_indicator = existing.repeat_indicator or intel.repeat_indicator
        existing.intel_summary = existing.intel_summary or intel.summary[:500]
        existing.intel_points = self._merge_intel_points(existing.intel_points, intel.intel_points)
        if intel.risk_score >= previous_risk or intel.confidence >= previous_confidence:
            existing.likely_smuggling_route = intel.likely_smuggling_route[:500]
            existing.enforcement_recommendation = intel.enforcement_recommendation[:500]
            existing.confidence_explanation = intel.confidence_explanation[:500]
        else:
            existing.likely_smuggling_route = existing.likely_smuggling_route or intel.likely_smuggling_route[:500]
            existing.enforcement_recommendation = existing.enforcement_recommendation or intel.enforcement_recommendation[:500]
            existing.confidence_explanation = existing.confidence_explanation or intel.confidence_explanation[:500]
        existing.url_hash = existing.url_hash or url_hash
        if existing.url == "":
            existing.url = url[:1200]
        existing.duplicate_confidence = max(existing.duplicate_confidence, duplicate_confidence)
        existing.merged_sources = merged_sources
        existing.source_count = max(existing.source_count, source_count)
        existing.report_count = max(1, existing.report_count) + 1

    def _fetch_batch_parallel(
        self,
        *,
        provider: str,
        language: str,
        queries: list[str],
        limit_per_query: int,
        progress_callback: Callable[[dict[str, str | int]], None] | None,
        scanned: int,
        kept: int,
    ) -> dict[str, list[RawArticle]]:
        if not queries:
            return {}
        if provider == "gdelt":
            fetched: dict[str, list[RawArticle]] = {}
            for query in queries:
                if progress_callback:
                    progress_callback(
                        {
                            "stage": "fetching",
                            "provider": provider,
                            "language": language,
                            "query": query,
                            "scanned": scanned,
                            "kept": kept,
                        }
                    )
                fetched[query] = self._fetch_provider(
                    provider=provider,
                    language=language,
                    query=query,
                    limit=limit_per_query,
                )
            return fetched
        worker_count = max(1, min(settings.provider_parallel_workers, len(queries)))
        fetched: dict[str, list[RawArticle]] = {}
        with ThreadPoolExecutor(max_workers=worker_count) as executor:
            futures = {}
            for query in queries:
                if progress_callback:
                    progress_callback(
                        {
                            "stage": "fetching",
                            "provider": provider,
                            "language": language,
                            "query": query,
                            "scanned": scanned,
                            "kept": kept,
                        }
                    )
                future = executor.submit(
                    self._fetch_provider,
                    provider=provider,
                    language=language,
                    query=query,
                    limit=limit_per_query,
                )
                futures[future] = query
            for future in as_completed(futures):
                query = futures[future]
                try:
                    fetched[query] = future.result()
                except Exception as err:  # noqa: BLE001
                    self._record_provider_failure(provider)
                    self._push_failed_source(provider=provider, language=language, query=query, error=str(err))
                    fetched[query] = []
        return fetched

    def collect_and_store(
        self,
        db: Session,
        limit_per_query: int = 25,
        progress_callback: Callable[[dict[str, str | int]], None] | None = None,
        incident_callback: Callable[[dict[str, str | int | float]], None] | None = None,
    ) -> dict[str, object]:
        scanned = 0
        kept = 0
        inserted = 0
        updated = 0
        dropped_non_india = 0
        pending_writes = 0
        seen_urls: set[tuple[str, str]] = set()
        provider_stats: dict[str, dict[str, int]] = {}
        district_spike_cache: dict[tuple[str, str], bool] = {}
        self._provider_failures = {}
        self._provider_next_allowed_at = {}
        start_from_utc = self._start_from_utc() if (settings.today_only or str(settings.start_from_date or "").strip()) else None

        for provider in self._enabled_providers():
            source_type = self._provider_source_type(provider)
            provider_stats.setdefault(provider, {"provider": provider, "scanned": 0, "kept": 0, "failed": 0})
            if provider in KEY_BASED_PROVIDERS and not self._provider_has_required_key(provider):
                self._record_provider_failure(provider)
                self._push_failed_source(
                    provider=provider,
                    language="-",
                    query="-",
                    error="missing_api_key",
                )
                logger.warning(
                    "Provider skipped due to missing API key: %s. Configure corresponding key in environment.",
                    provider,
                )
                continue
            for lang in self._active_languages_for_provider(provider):
                query_pool = self._queries_for_language(lang) if source_type == "news" else self._osint_queries(db)
                provider_queries = self._select_queries_for_cycle(provider=provider, language=lang, queries=query_pool)
                fetched_batches = self._fetch_batch_parallel(
                    provider=provider,
                    language=lang,
                    queries=provider_queries,
                    limit_per_query=limit_per_query,
                    progress_callback=progress_callback,
                    scanned=scanned,
                    kept=kept,
                )
                for query in provider_queries:
                    articles = fetched_batches.get(query, [])
                    for article in articles:
                        title = article.title.strip()
                        summary = article.summary.strip()
                        url = self._normalize_url(article.url.strip())
                        source = article.source.strip() or provider
                        published = article.published_at
                        if not title or not url:
                            continue
                        if start_from_utc is not None and published < start_from_utc:
                            continue
                        seen_key = (provider, url)
                        if seen_key in seen_urls:
                            continue
                        seen_urls.add(seen_key)

                        scanned += 1
                        provider_stats[provider]["scanned"] += 1
                        detected_language = self._detect_language(title=title, summary=summary, fallback=article.language)
                        prior_source = self._prior_source_hits(db, source)
                        initial_intel = self.intelligence_engine.analyze(
                            title=title,
                            summary=summary,
                            prior_source_hits=prior_source,
                        )
                        prior_district = self._prior_district_hits(db, initial_intel.district)
                        intel = self.intelligence_engine.analyze(
                            title=title,
                            summary=summary,
                            prior_district_hits=prior_district,
                            prior_source_hits=prior_source,
                        )

                        dedupe_decision = self.dedupe_engine.find_duplicate(
                            db=db,
                            url=url,
                            title=title,
                            summary=summary,
                            published_at=published,
                            source=source,
                            state=intel.state,
                            district=intel.district,
                        )
                        self._upsert_external_signal(
                            db=db,
                            provider=provider,
                            source_name=source,
                            title=title,
                            url=url,
                            published_at=published,
                            risk_score=intel.risk_score,
                            confidence=intel.confidence,
                            species=intel.species,
                            state=intel.state,
                            network_indicator=intel.network_indicator,
                            repeat_indicator=intel.repeat_indicator,
                        )

                        if not intel.is_poaching:
                            continue
                        if settings.india_only and not intel.is_india:
                            dropped_non_india += 1
                            continue

                        existing = None
                        if dedupe_decision.matched_news_id is not None:
                            existing = db.execute(
                                select(NewsItem).where(NewsItem.id == dedupe_decision.matched_news_id)
                            ).scalar_one_or_none()

                        kept += 1
                        provider_stats[provider]["kept"] += 1
                        is_duplicate = existing is not None
                        if existing:
                            self._merge_into_incident(
                                existing=existing,
                                title=title,
                                summary=summary,
                                source=source,
                                language=detected_language,
                                published=published,
                                intel=intel,
                                url=url,
                                url_hash=dedupe_decision.url_hash,
                                duplicate_confidence=dedupe_decision.confidence,
                            )
                            updated += 1
                            incident_id = existing.id
                            incident_row = existing
                            event_type = "merged"
                            source_count_value = existing.source_count
                            merged_sources_value = existing.merged_sources
                        else:
                            new_item = NewsItem(
                                title=title[:600],
                                summary=(summary or title)[:4000],
                                source=source[:160],
                                url=url[:1200],
                                language=detected_language[:16],
                                published_at=published,
                                ai_score=intel.confidence,
                                is_poaching=True,
                                is_india=intel.is_india,
                                ai_reason=intel.reason[:300],
                                confidence=intel.confidence,
                                risk_score=intel.risk_score,
                                crime_type=intel.crime_type[:80],
                                species=", ".join(intel.species)[:300],
                                state=intel.state[:120],
                                district=intel.district[:120],
                                location=intel.location[:240],
                                involved_persons=", ".join(intel.involved_persons)[:500],
                                network_indicator=intel.network_indicator,
                                repeat_indicator=intel.repeat_indicator,
                                intel_summary=intel.summary[:500],
                                intel_points=json.dumps(intel.intel_points, ensure_ascii=False),
                                likely_smuggling_route=intel.likely_smuggling_route[:500],
                                enforcement_recommendation=intel.enforcement_recommendation[:500],
                                confidence_explanation=intel.confidence_explanation[:500],
                                url_hash=dedupe_decision.url_hash,
                                duplicate_confidence=0.0,
                                source_count=1,
                                report_count=1,
                                merged_sources=source[:160],
                                created_at=datetime.utcnow(),
                                last_seen_at=datetime.utcnow(),
                            )
                            db.add(new_item)
                            db.flush()
                            inserted += 1
                            incident_id = new_item.id
                            incident_row = new_item
                            event_type = "inserted"
                            source_count_value = new_item.source_count
                            merged_sources_value = new_item.merged_sources

                        upsert_report_for_news(db=db, news=incident_row)

                        self._upsert_source_stat(
                            db=db,
                            source_name=source,
                            confidence=intel.confidence,
                            is_duplicate=is_duplicate
                            and dedupe_decision.reason in {"exact_url", "url_hash", "title_similarity", "semantic_similarity"},
                        )
                        self._upsert_species_stats(db=db, species=intel.species, risk_score=intel.risk_score, published_at=published)
                        self._upsert_district_stat(db=db, state=intel.state, district=intel.district, risk_score=intel.risk_score)
                        self._sync_entities(
                            db=db,
                            news_id=int(incident_id),
                            crime_type=intel.crime_type,
                            species=intel.species,
                            state=intel.state,
                            district=intel.district,
                            location=intel.location,
                            involved_persons=intel.involved_persons,
                        )
                        normalized_species = [item.strip().lower() for item in intel.species]
                        has_priority_species = any(
                            ("tiger" in item) or ("rhino" in item) or ("elephant" in item)
                            for item in normalized_species
                        )
                        trigger_reasons: list[str] = []
                        if intel.risk_score > settings.risk_alert_threshold:
                            trigger_reasons.append(f"high risk {intel.risk_score}")
                        if has_priority_species:
                            trigger_reasons.append("priority species")
                        if intel.network_indicator:
                            trigger_reasons.append("organized network signal")
                        has_district_spike = self._district_spike_anomaly(
                            db=db,
                            state=intel.state,
                            district=intel.district,
                            reference_time=published,
                            cache=district_spike_cache,
                        )
                        if intel.repeat_indicator or has_district_spike:
                            trigger_reasons.append("district repeat spike")
                        if trigger_reasons:
                            severity = "critical" if (intel.risk_score >= 90 or has_priority_species or intel.network_indicator) else "high"
                            self._ensure_alert(
                                db=db,
                                news_id=int(incident_id),
                                risk_score=intel.risk_score,
                                reason=", ".join(trigger_reasons),
                                severity=severity,
                                force=True,
                            )

                        if incident_callback:
                            incident_callback(
                                {
                                    "id": int(incident_id),
                                    "event_type": event_type,
                                    "severity": self._severity_from_risk(intel.risk_score),
                                    "title": title[:600],
                                    "source": source[:160],
                                    "source_count": source_count_value,
                                    "merged_sources": merged_sources_value,
                                    "duplicate_confidence": round(dedupe_decision.confidence, 4),
                                    "dedupe_reason": dedupe_decision.reason,
                                    "language": detected_language[:16],
                                    "ai_score": round(intel.confidence, 4),
                                    "risk_score": intel.risk_score,
                                    "crime_type": intel.crime_type[:80],
                                    "species": ", ".join(intel.species)[:300],
                                    "state": intel.state[:120],
                                    "district": intel.district[:120],
                                    "involved_persons": ", ".join(intel.involved_persons)[:500],
                                    "likely_smuggling_route": intel.likely_smuggling_route[:500],
                                    "enforcement_recommendation": intel.enforcement_recommendation[:500],
                                    "confidence_explanation": intel.confidence_explanation[:500],
                                    "url": url[:1200],
                                    "provider": provider,
                                    "query": query[:300],
                                    "published_at": published.isoformat(sep=" ", timespec="seconds"),
                                }
                            )

                        pending_writes += 1
                        if pending_writes >= 10:
                            db.commit()
                            pending_writes = 0

        for provider, fail_count in self._provider_failures.items():
            provider_stats.setdefault(provider, {"provider": provider, "scanned": 0, "kept": 0, "failed": 0})
            provider_stats[provider]["failed"] += fail_count

        if pending_writes > 0:
            db.commit()
        if progress_callback:
            progress_callback(
                {
                    "stage": "done",
                    "provider": "-",
                    "language": "-",
                    "query": "-",
                    "scanned": scanned,
                    "kept": kept,
                }
            )
        return {
            "scanned": scanned,
            "kept": kept,
            "inserted": inserted,
            "updated": updated,
            "dropped_non_india": dropped_non_india,
            "provider_failures": sum(self._provider_failures.values()),
            "provider_stats": list(provider_stats.values()),
        }
