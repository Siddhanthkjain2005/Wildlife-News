#!/usr/bin/env bash
set -euo pipefail
mkdir -p /home/wildguard/data /home/wildguard/logs /home/wildguard/backups
export DATABASE_URL="${DATABASE_URL:-sqlite:////home/wildguard/data/news.db}"
export LOG_DIR="${LOG_DIR:-/home/wildguard/logs}"
export BACKUPS_DIR="${BACKUPS_DIR:-/home/wildguard/backups}"
export EXCEL_PATH="${EXCEL_PATH:-/home/wildguard/data/wildlife-news.xlsx}"
# One process owns the scheduler and SQLite database.
exec python -m uvicorn app.main:app --host 0.0.0.0 --port "${PORT:-8000}" --workers 1 --proxy-headers
