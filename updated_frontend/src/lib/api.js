const API_BASE = String(import.meta.env.VITE_API_BASE_URL || "").trim().replace(/\/$/, "");
const withBase = (path) => (API_BASE ? `${API_BASE}${path}` : path);

export const ENDPOINTS = {
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
  const res = await fetch(url, { cache: "no-store", credentials: "same-origin" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function buildQuery(params) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (String(value || "").trim() !== "") query.set(key, value);
  });
  return query.toString();
}
