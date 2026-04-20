from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Wildlife Live Poaching News System"

    # Database
    database_url: str = "sqlite:///./data/news.db"

    # Excel export
    excel_path: str = "./data/wildlife_poaching_news.xlsx"

    # Sync
    sync_interval_minutes: int = 5
    today_only: bool = True
    app_timezone: str = "Asia/Kolkata"
    start_from_date: str = ""
    max_articles_per_query: int = 25
    max_queries_per_language: int = 3
    request_timeout_seconds: int = 20
    provider_parallel_workers: int = 6
    provider_min_request_interval_seconds: float = 1.2
    provider_rate_limit_cooldown_seconds: int = 900
    sync_scheduler_jitter_seconds: int = 20

    # Intelligence thresholds
    ai_threshold: float = 0.62
    india_threshold: float = 0.55
    india_only: bool = True
    risk_alert_threshold: int = 80
    dedupe_title_similarity_threshold: float = 0.92
    dedupe_semantic_similarity_threshold: float = 0.86
    dedupe_embedding_model_name: str = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"

    # Models
    model_name: str = "MoritzLaurer/mDeBERTa-v3-base-mnli-xnli"

    # Providers
    enabled_providers: str = (
        "google_rss,bing_rss,gdelt,newsapi,gnews,mediastack,newsdata,"
        "reddit_osint,govt_notices,ngo_feeds,x_adapter"
    )
    supported_languages: str = "en,hi,kn,ta,te,ml,bn,mr,gu,pa,ur,or,as"
    newsapi_key: str | None = None
    gnews_api_key: str | None = None
    mediastack_api_key: str | None = None
    newsdata_api_key: str | None = None

    # Alerts
    alerts_enabled: bool = False
    telegram_alerts_enabled: bool = False
    telegram_bot_token: str | None = None
    telegram_chat_id: str | None = None
    email_alerts_enabled: bool = False
    smtp_host: str | None = None
    smtp_port: int = 587
    smtp_username: str | None = None
    smtp_password: str | None = None
    alert_email_to: str | None = None
    alert_dispatch_interval_seconds: int = 60

    # Logging
    log_dir: str = "./logs"
    frontend_origin: str = ""

    # Security / Ops hardening
    admin_token: str | None = None
    admin_api_key: str | None = None
    admin_username: str = "admin"
    admin_password: str | None = None
    admin_password_hash: str | None = None
    admin_session_minutes: int = 480
    api_rate_limit_per_minute: int = 180
    login_rate_limit_per_minute: int = 10
    sync_rate_limit_per_minute: int = 8

    # Cache / Backup
    cache_ttl_seconds: int = 45
    backup_interval_minutes: int = 120
    backups_dir: str = "./data/backups"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
