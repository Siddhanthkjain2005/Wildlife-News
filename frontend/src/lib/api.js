export const ENDPOINTS = {
  summary: "/api/dashboard-summary",
  chart: "/api/chart-data",
  map: "/api/map-data",
  alerts: "/api/alerts?limit=60",
  reports: "/api/reports?limit=50",
  osint: "/api/osint-feed?limit=30",
  syncStatus: "/api/sync-status",
  filterNews: "/api/filter-news",
  exportCsv: "/api/export/csv",
  exportPdf: "/api/export/pdf",
  exportExcel: "/api/export/excel",
  exportBriefing: "/api/export/briefing-pack",
  sync: "/sync"
};

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
