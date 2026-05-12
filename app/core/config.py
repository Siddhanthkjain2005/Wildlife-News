from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Wildlife Live Poaching News System"

    # Database
    database_url: str = "sqlite:///./data/news.db"

    # Excel export
    excel_path: str = "./data/wildlife_poaching_news.xlsx"

    # Sync
    sync_interval_minutes: int = 3
    today_only: bool = False
    app_timezone: str = "Asia/Kolkata"
    start_from_date: str = ""
    max_articles_per_query: int = 60
    max_queries_per_language: int = 8
    sync_commit_batch_size: int = 1
    request_timeout_seconds: int = 25
    article_fetch_timeout_seconds: int = 12
    provider_parallel_workers: int = 8
    provider_min_request_interval_seconds: float = 1.0
    provider_rate_limit_cooldown_seconds: int = 600
    sync_scheduler_jitter_seconds: int = 20

    # Intelligence thresholds
    ai_threshold: float = 0.62
    india_threshold: float = 0.70
    india_only: bool = True
    strict_ai_mode: bool = False
    risk_alert_threshold: int = 80
    dedupe_title_similarity_threshold: float = 0.92
    dedupe_semantic_similarity_threshold: float = 0.86
    dedupe_embedding_model_name: str = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"

    # Models
    model_name: str = "MoritzLaurer/mDeBERTa-v3-base-mnli-xnli"
    person_ner_enabled: bool = True
    person_ner_model_name: str = "Babelscape/wikineural-multilingual-ner"
    person_ner_min_score: float = 0.65
    article_enrichment_enabled: bool = True
    article_enrichment_min_chars: int = 280
    article_enrichment_max_chars: int = 3500
    llm_summary_enabled: bool = False
    llm_summary_model_path: str = ""
    llm_summary_max_tokens: int = 320
    llm_summary_temperature: float = 0.2
    rag_qa_enabled: bool = False
    rag_qa_max_tokens: int = 420
    setfit_enabled: bool = False
    setfit_model_path: str = "./models/setfit-wildlife"
    gliner_enabled: bool = False
    gliner_model_name: str = "urchade/gliner_multi-v2.1"
    gliner_threshold: float = 0.6

    # Providers
    enabled_providers: str = (
        "google_rss,bing_rss,gdelt,duckduckgo,indian_media_rss,newsapi,gnews,mediastack,newsdata,"
        "currents,thenewsapi,worldnewsapi,eventregistry,newscatcher,"
        "reddit_osint,ngo_feeds,x_adapter"
    )
    supported_languages: str = "en,hi,kn,ta,te,ml,bn,mr,gu,pa,ur,or,as"
    newsapi_key: str | None = None
    gnews_api_key: str | None = None
    mediastack_api_key: str | None = None
    newsdata_api_key: str | None = None
    currents_api_key: str | None = None
    thenewsapi_key: str | None = None
    worldnewsapi_key: str | None = None
    eventregistry_api_key: str | None = None
    newscatcher_api_key: str | None = None
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
    jwt_secret: str = ""
    jwt_algorithm: str = "HS256"
    jwt_access_minutes: int = 30
    jwt_refresh_days: int = 7
    rbac_enabled: bool = True
    default_user_role: str = "admin"

    # Cache / Backup
    cache_ttl_seconds: int = 45
    backup_interval_minutes: int = 120
    backups_dir: str = "./data/backups"
    redis_url: str = ""
    redis_key_prefix: str = "wildlife"
    celery_enabled: bool = False
    celery_broker_url: str = "redis://localhost:6379/1"
    celery_result_backend: str = ""
    celery_sync_queue: str = "sync"
    celery_ai_queue: str = "ai"
    s3_backup_bucket: str = ""
    s3_backup_prefix: str = "backups/"
    aws_region: str = "us-east-1"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
