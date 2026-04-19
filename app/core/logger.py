import logging
from logging.handlers import RotatingFileHandler
from pathlib import Path

from app.core.config import settings


class PrefixFilter(logging.Filter):
    def __init__(self, prefix: str) -> None:
        super().__init__()
        self.prefix = prefix

    def filter(self, record: logging.LogRecord) -> bool:
        return record.name.startswith(self.prefix)


_logging_initialized = False


def init_logging() -> None:
    global _logging_initialized
    if _logging_initialized:
        return

    log_dir = Path(settings.log_dir)
    log_dir.mkdir(parents=True, exist_ok=True)

    formatter = logging.Formatter(
        fmt="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )

    root = logging.getLogger()
    root.setLevel(logging.INFO)
    root.handlers.clear()

    console = logging.StreamHandler()
    console.setLevel(logging.INFO)
    console.setFormatter(formatter)
    root.addHandler(console)

    app_file = RotatingFileHandler(log_dir / "app.log", maxBytes=2_000_000, backupCount=5)
    app_file.setLevel(logging.INFO)
    app_file.setFormatter(formatter)
    root.addHandler(app_file)

    sync_file = RotatingFileHandler(log_dir / "sync.log", maxBytes=2_000_000, backupCount=5)
    sync_file.setLevel(logging.INFO)
    sync_file.setFormatter(formatter)
    sync_file.addFilter(PrefixFilter("sync"))
    root.addHandler(sync_file)

    error_file = RotatingFileHandler(log_dir / "error.log", maxBytes=2_000_000, backupCount=5)
    error_file.setLevel(logging.ERROR)
    error_file.setFormatter(formatter)
    root.addHandler(error_file)

    _logging_initialized = True


def get_logger(name: str) -> logging.Logger:
    init_logging()
    return logging.getLogger(name)
