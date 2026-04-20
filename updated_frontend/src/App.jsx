import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { AlertCircle, Activity } from "lucide-react";

import Sidebar from "./components/Sidebar.jsx";
import TopBar from "./components/TopBar.jsx";
import Kpis from "./components/Kpis.jsx";
import MapPanel from "./components/MapPanel.jsx";
import AlertFeed from "./components/AlertFeed.jsx";
import Analytics from "./components/Analytics.jsx";
import FilterBar from "./components/FilterBar.jsx";
import IncidentTable from "./components/IncidentTable.jsx";
import { OsintFeed, Recommendations } from "./components/BottomPanels.jsx";

import { ENDPOINTS, fetchJson, buildQuery } from "./lib/api.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Tooltip, Legend, Filler);

const AUTO_REFRESH_MS = 15000;

const EMPTY_FILTERS = {
  q: "",
  species: "",
  state: "",
  date_from: "",
  date_to: "",
  crime_type: "",
  severity: "",
  source: ""
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const [summary, setSummary] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [osintItems, setOsintItems] = useState([]);
  const [reports, setReports] = useState([]);
  const [syncStatus, setSyncStatus] = useState(null);
  const [newsRows, setNewsRows] = useState([]);

  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  const loadDashboard = useCallback(async () => {
    setBusy(true);
    const tasks = await Promise.allSettled([
      fetchJson(ENDPOINTS.summary),
      fetchJson(ENDPOINTS.chart),
      fetchJson(ENDPOINTS.map),
      fetchJson(ENDPOINTS.alerts),
      fetchJson(ENDPOINTS.reports),
      fetchJson(ENDPOINTS.osint),
      fetchJson(ENDPOINTS.syncStatus)
    ]);
    const [summaryRes, chartRes, mapRes, alertRes, reportRes, osintRes, syncRes] = tasks;
    if (summaryRes.status === "fulfilled") setSummary(summaryRes.value);
    if (chartRes.status === "fulfilled") setChartData(chartRes.value);
    if (mapRes.status === "fulfilled") setMapData(mapRes.value);
    if (alertRes.status === "fulfilled") setAlerts(Array.isArray(alertRes.value) ? alertRes.value : []);
    if (reportRes.status === "fulfilled") setReports(Array.isArray(reportRes.value) ? reportRes.value : []);
    if (osintRes.status === "fulfilled") setOsintItems(Array.isArray(osintRes.value) ? osintRes.value : []);
    if (syncRes.status === "fulfilled") setSyncStatus(syncRes.value);

    if (tasks.every((t) => t.status === "rejected")) {
      setError("Unable to load dashboard data right now.");
    } else {
      setError("");
    }
    setLoading(false);
    setBusy(false);
  }, []);

  const loadFilteredNews = useCallback(async () => {
    const query = buildQuery({ ...filters, limit: 120 });
    const data = await fetchJson(`${ENDPOINTS.filterNews}?${query}`);
    setNewsRows(Array.isArray(data.items) ? data.items : []);
  }, [filters]);

  useEffect(() => {
    loadDashboard();
    loadFilteredNews().catch(() => {});
    const timer = window.setInterval(() => {
      loadDashboard();
      loadFilteredNews().catch(() => {});
    }, AUTO_REFRESH_MS);
    return () => window.clearInterval(timer);
  }, [loadDashboard, loadFilteredNews]);

  // Track active section via scroll
  useEffect(() => {
    const ids = ["overview", "map", "alerts", "analytics", "incidents", "osint", "reco"];
    const observers = [];
    ids.forEach((id) => {
      const el = document.getElementById(`section-${id}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id);
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [loading]);

  const recommendations = useMemo(() => {
    const counts = new Map();
    reports.forEach((row) => {
      const text = (row.recommendation || "").trim();
      if (!text) return;
      counts.set(text, (counts.get(text) || 0) + 1);
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [reports]);

  const filterOptions = chartData?.filters || { states: [], species: [], crime_types: [], sources: [] };
  const lastSync = summary?.last_sync_time || syncStatus?.finished_at;
  const formatSearchDetails = useCallback((progress, { last = false } = {}) => {
    const scopeData = progress || {};
    const stage = typeof scopeData.stage === "string" && scopeData.stage !== "-" ? scopeData.stage : "";
    const provider = typeof scopeData.provider === "string" && scopeData.provider !== "-" ? scopeData.provider : "";
    const language = typeof scopeData.language === "string" && scopeData.language !== "-" ? scopeData.language : "";
    const query = typeof scopeData.query === "string" && scopeData.query !== "-" ? scopeData.query : "";
    const scanned = Number.isFinite(Number(scopeData.scanned)) ? Number(scopeData.scanned) : null;
    const kept = Number.isFinite(Number(scopeData.kept)) ? Number(scopeData.kept) : null;

    const parts = [];
    if (stage) parts.push(`stage: ${last ? `last ${stage}` : stage}`);
    const scope = [provider, language].filter(Boolean).join(" / ");
    if (scope) parts.push(`source: ${scope}`);
    if (query) parts.push(`query: ${query}`);
    if (scanned !== null && kept !== null) parts.push(`scanned ${scanned}, kept ${kept}`);
    return parts.join(" • ");
  }, []);

  const syncProgressText = useMemo(() => {
    if (!syncStatus?.running) return "";
    return formatSearchDetails(syncStatus?.progress, { last: false });
  }, [syncStatus, formatSearchDetails]);
  const lastSearchText = useMemo(() => {
    if (syncStatus?.running) return "";
    return formatSearchDetails(syncStatus?.last_search, { last: true });
  }, [syncStatus, formatSearchDetails]);

  function handleExport(kind) {
    const query = buildQuery(filters);
    const base =
      kind === "pdf"
        ? ENDPOINTS.exportPdf
        : kind === "excel"
          ? ENDPOINTS.exportExcel
          : kind === "briefing"
            ? ENDPOINTS.exportBriefing
            : ENDPOINTS.exportCsv;
    window.location.href = query ? `${base}?${query}` : base;
  }

  function handleNavSelect(id) {
    setActiveSection(id);
    setMobileOpen(false);
  }

  return (
    <div className="app">
      <Sidebar
        activeSection={activeSection}
        onSelect={handleNavSelect}
        isOpen={mobileOpen}
        syncStatus={syncStatus}
        lastSync={lastSync}
      />

      <div
        className={`scrim ${mobileOpen ? "is-visible" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <div className="main">
        <TopBar
          activeSection={activeSection}
          busy={busy}
          syncStatus={syncStatus}
          onRefresh={loadDashboard}
          onExport={handleExport}
          onToggleMenu={() => setMobileOpen((v) => !v)}
        />

        <div className="content">
          {error ? (
            <div className="status error" role="alert">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          ) : null}
          {syncStatus?.running ? (
            <div className="status info" role="status">
              <Activity size={16} />
              <span>
                {syncStatus.message || "Search in progress…"}
                {syncProgressText ? ` — ${syncProgressText}` : ""}
              </span>
            </div>
          ) : lastSearchText ? (
            <div className="status info" role="status">
              <Activity size={16} />
              <span>Auto search active — Last search: {lastSearchText}</span>
            </div>
          ) : null}

          <div className="section-title">
            <div>
              <h2>National Overview</h2>
              <p>Real-time wildlife threat monitoring across India. Auto-refresh every 15s.</p>
            </div>
          </div>

          <Kpis summary={summary} loading={loading} />

          <div className="ops-grid">
            <MapPanel mapData={mapData} onMapError={setError} />
            <AlertFeed alerts={alerts} />
          </div>

          <div className="section-title" style={{ marginTop: 4 }}>
            <div>
              <h2>Analytics</h2>
              <p>Trends, distributions, and source reliability.</p>
            </div>
          </div>

          <Analytics chartData={chartData} />

          <FilterBar
            filters={filters}
            filterOptions={filterOptions}
            onChange={setFilters}
            onApply={() => loadFilteredNews()}
            onBriefing={() => handleExport("briefing")}
          />

          <IncidentTable rows={newsRows} loading={loading} />

          <div className="bottom-grid">
            <OsintFeed items={osintItems} />
            <Recommendations items={recommendations} />
          </div>
        </div>
      </div>
    </div>
  );
}
