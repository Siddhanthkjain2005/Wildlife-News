const API_BASE = String(import.meta.env.VITE_API_BASE_URL || "").trim().replace(/\/$/, "");
const withBase = (path) => (API_BASE ? `${API_BASE}${path}` : path);
const AUTH_TOKEN_KEY = "wildlife_admin_token";

export const ENDPOINTS = {
  adminLogin: withBase("/api/admin/login"),
  adminLogout: withBase("/api/admin/logout"),
  summary: withBase("/api/dashboard-summary"),
  chart: withBase("/api/chart-data"),
  map: withBase("/api/map-data"),
  alerts: withBase("/api/alerts?limit=60"),
  reports: withBase("/api/reports?limit=50"),
  osint: withBase("/api/osint-feed?limit=30"),
  syncStatus: withBase("/api/sync-status"),
  filterNews: withBase("/api/filter-news"),
  exportCsv: withBase("/api/export/csv"),
  exportPdf: withBase("/api/export/pdf"),
  exportExcel: withBase("/api/export/excel"),
  exportBriefing: withBase("/api/export/briefing-pack")
};

export function resolveExternalUrl(primaryUrl, fallbackUrl = "") {
  const raw = String(primaryUrl || "").trim() || String(fallbackUrl || "").trim();
  if (!raw) return "#";
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith("//")) return `https:${raw}`;
  if (raw.startsWith("/")) return withBase(raw);
  if (raw.startsWith("www.")) return `https://${raw}`;
  if (/^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(raw)) return `https://${raw}`;
  return "#";
}

export async function fetchJson(url) {
  const token = getStoredToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await fetch(url, { cache: "no-store", credentials: "same-origin", headers });
  if (!res.ok) {
    let detail = "";
    try {
      const payload = await res.json();
      detail = String(payload?.detail || "").trim();
    } catch {
      detail = "";
    }
    const error = new Error(detail || `HTTP ${res.status}`);
    error.status = res.status;
    throw error;
  }
  return res.json();
}

export async function postJson(url, payload, { includeAuth = true } = {}) {
  const token = includeAuth ? getStoredToken() : "";
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers,
    body: JSON.stringify(payload || {})
  });
  if (!res.ok) {
    let detail = "";
    try {
      const body = await res.json();
      detail = String(body?.detail || "").trim();
    } catch {
      detail = "";
    }
    const error = new Error(detail || `HTTP ${res.status}`);
    error.status = res.status;
    throw error;
  }
  return res.json();
}

export function getStoredToken() {
  return String(localStorage.getItem(AUTH_TOKEN_KEY) || "").trim();
}

export function setStoredToken(token) {
  const value = String(token || "").trim();
  if (!value) return;
  localStorage.setItem(AUTH_TOKEN_KEY, value);
}

export function clearStoredToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function buildQuery(params) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (String(value || "").trim() !== "") query.set(key, value);
  });
  return query.toString();
}
