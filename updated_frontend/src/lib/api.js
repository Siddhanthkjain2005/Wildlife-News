const API_BASE = String(import.meta.env.VITE_API_BASE_URL || "").trim().replace(/\/$/, "");
const withBase = (path) => (API_BASE ? `${API_BASE}${path}` : path);
const AUTH_TOKEN_KEY = "wildlife_admin_token";
const WS_BASE = API_BASE.replace(/^http/, "ws");
const withWs = (path) => (WS_BASE ? `${WS_BASE}${path}` : `ws://${window.location.host}${path}`);
const REQUEST_TIMEOUT_MS = 20000;

export const ENDPOINTS = {
  adminLogin: withBase("/api/admin/login"),
  adminLogout: withBase("/api/admin/logout"),
  adminRefresh: withBase("/api/admin/refresh"),
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
  exportExcelIncidentsReports: withBase("/api/export/excel-incidents-reports"),
  exportBriefing: withBase("/api/export/briefing-pack"),
  publicDownloadCsv: withBase("/api/public/download-csv"),
  publicDownloadDb: withBase("/api/public/download-db"),
  publicUploadDb: withBase("/api/public/upload-db"),
  predictions: withBase("/api/predictions"),
  predictionsTrain: withBase("/api/predictions/train"),
  predictionsHotspots: withBase("/api/predictions/hotspots"),
  predictionsPersons: withBase("/api/predictions/persons"),
  graphNetworks: withBase("/api/graph/networks"),
  graphPersonProfile: (name) => withBase(`/api/graph/person/${encodeURIComponent(name)}`),
  ragQuery: withBase("/api/rag/query"),
  searchSemantic: withBase("/api/search/semantic"),
  wsLive: (token) => withWs(`/api/ws/live?token=${token}`),
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

async function fetchWithTimeout(url, init = {}, timeoutMs = REQUEST_TIMEOUT_MS) {
  const timeoutController = new AbortController();
  const combinedController = new AbortController();
  const signals = [timeoutController.signal, init.signal].filter(Boolean);
  const abortCombined = () => combinedController.abort();
  const timeoutId = setTimeout(() => timeoutController.abort(), timeoutMs);

  signals.forEach((signal) => {
    if (signal.aborted) {
      abortCombined();
      return;
    }
    signal.addEventListener("abort", abortCombined, { once: true });
  });

  try {
    return await fetch(url, { ...init, signal: combinedController.signal });
  } finally {
    clearTimeout(timeoutId);
    signals.forEach((signal) => signal.removeEventListener("abort", abortCombined));
  }
}

export async function fetchJson(url, { retry = true, signal } = {}) {
  const token = getStoredToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await fetchWithTimeout(url, { cache: "no-store", headers, signal });
  
  if (res.status === 401 && retry && token) {
    const refreshed = await refreshAccessToken();
    if (refreshed) return fetchJson(url, { retry: false, signal });
  }

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

export async function postJson(url, payload, { includeAuth = true, retry = true, signal } = {}) {
  const token = includeAuth ? getStoredToken() : "";
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  
  const res = await fetchWithTimeout(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload || {}),
    signal
  });

  if (res.status === 401 && retry && token && includeAuth) {
    const refreshed = await refreshAccessToken();
    if (refreshed) return postJson(url, payload, { includeAuth, retry: false, signal });
  }

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

async function refreshAccessToken() {
  try {
    const tokens = await postJson(ENDPOINTS.adminRefresh, {}, { includeAuth: false });
    if (tokens?.access_token) {
      setStoredToken(tokens.access_token);
      return true;
    }
  } catch (err) {
    console.error("Token refresh failed:", err);
  }
  return false;
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
