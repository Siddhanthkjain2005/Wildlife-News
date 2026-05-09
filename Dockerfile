# Stage 1: Build the React frontend
FROM node:20-slim AS frontend-builder
WORKDIR /build
COPY updated_frontend/package*.json ./
RUN npm install
COPY updated_frontend/ ./
RUN npm run build

# Stage 2: Python runtime
FROM python:3.11-slim
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PORT=8000

WORKDIR /app

# Install system dependencies for Postgres and others
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/requirements.txt
RUN pip install --upgrade pip && pip install --no-cache-dir -r /app/requirements.txt

COPY app /app/app
COPY README.md /app/README.md
COPY Procfile /app/Procfile
COPY alembic.ini /app/alembic.ini
COPY alembic /app/alembic
COPY scripts /app/scripts

# Copy frontend build to static directory
RUN mkdir -p /app/app/static/react-build
COPY --from=frontend-builder /build/dist /app/app/static/react-build

RUN mkdir -p /data /app/logs

EXPOSE 8000

CMD ["sh", "-c", "python -m uvicorn app.main:app --host 0.0.0.0 --port ${PORT}"]
