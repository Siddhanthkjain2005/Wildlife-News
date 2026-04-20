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
import { AlertCircle, Activity, Lock, ShieldCheck } from "lucide-react";

import Sidebar from "./components/Sidebar.jsx";
import TopBar from "./components/TopBar.jsx";
import Kpis from "./components/Kpis.jsx";
import MapPanel from "./components/MapPanel.jsx";
import AlertFeed from "./components/AlertFeed.jsx";
import Analytics from "./components/Analytics.jsx";
import FilterBar from "./components/FilterBar.jsx";
import IncidentTable from "./components/IncidentTable.jsx";
import { OsintFeed, Recommendations } from "./components/BottomPanels.jsx";

import {
  ENDPOINTS,
  fetchJson,
  buildQuery,
  postJson,
  getStoredToken,
  setStoredToken,
  clearStoredToken
} from "./lib/api.js";

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
  const [authToken, setAuthToken] = useState(() => getStoredToken());
  const [authError, setAuthError] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });

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

  const handleUnauthorized = useCallback((message = "Please log in to continue.") => {
    clearStoredToken();
    setAuthToken("");
    setAuthError(message);
    setError("");
    setBusy(false);
    setLoading(false);
  }, []);

  const loadDashboard = useCallback(async () => {
    if (!authToken) return;
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
    const unauthorized = tasks.some(
      (task) => task.status === "rejected" && Number(task.reason?.status) === 401
    );
    if (unauthorized) {
      handleUnauthorized("Session expired. Please sign in again.");
      return;
    }
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
  }, [authToken, handleUnauthorized]);

  const loadFilteredNews = useCallback(async () => {
    if (!authToken) return;
    const query = buildQuery({ ...filters, limit: 120 });
    try {
      const data = await fetchJson(`${ENDPOINTS.filterNews}?${query}`);
      setNewsRows(Array.isArray(data.items) ? data.items : []);
    } catch (err) {
      if (Number(err?.status) === 401) {
        handleUnauthorized("Session expired. Please sign in again.");
      }
    }
  }, [authToken, filters, handleUnauthorized]);

  useEffect(() => {
    if (!authToken) {
      setLoading(false);
      return undefined;
    }
    setLoading(true);
    loadDashboard();
    loadFilteredNews().catch(() => {});
    const timer = window.setInterval(() => {
      loadDashboard();
      loadFilteredNews().catch(() => {});
    }, AUTO_REFRESH_MS);
    return () => window.clearInterval(timer);
  }, [authToken, loadDashboard, loadFilteredNews]);

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

  function handleExport(kind) {
    if (!authToken) return;
    const query = buildQuery({ ...filters, admin_token: authToken });
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

  async function handleLoginSubmit(event) {
    event.preventDefault();
    setAuthBusy(true);
    setAuthError("");
    try {
      const payload = await postJson(
        ENDPOINTS.adminLogin,
        { username: credentials.username.trim(), password: credentials.password },
        { includeAuth: false }
      );
      const token = String(payload?.access_token || "").trim();
      if (!token) {
        setAuthError("Login failed. Missing access token.");
        return;
      }
      setStoredToken(token);
      setAuthToken(token);
      setCredentials({ username: "", password: "" });
      setLoading(true);
    } catch (err) {
      if (Number(err?.status) === 401) {
        setAuthError("Invalid username or password.");
      } else if (Number(err?.status) === 429) {
        setAuthError("Too many login attempts. Try again in a minute.");
      } else {
        setAuthError("Unable to login right now.");
      }
    } finally {
      setAuthBusy(false);
    }
  }

  async function handleLogout() {
    try {
      await postJson(ENDPOINTS.adminLogout, {}, { includeAuth: true });
    } catch {
      // Even if remote logout fails, clear local token to force re-auth.
    }
    handleUnauthorized("Signed out.");
  }

  function handleNavSelect(id) {
    setActiveSection(id);
    setMobileOpen(false);
  }

  if (!authToken) {
    return (
      <div className="auth-shell">
        <article className="card auth-card">
          <div className="card-head">
            <div className="card-head-left">
              <ShieldCheck size={16} className="card-head-icon" />
              <h2>Authorized Access</h2>
            </div>
          </div>
          <div className="card-body auth-card-body">
            <div className="auth-brand">
              <h1>Wildlife Crime Intelligence Center</h1>
              <p>Sign in with authorized credentials to continue.</p>
            </div>
            <form className="auth-form" onSubmit={handleLoginSubmit}>
              <label className="auth-field">
                <span>Username</span>
                <input
                  value={credentials.username}
                  onChange={(event) => setCredentials((prev) => ({ ...prev, username: event.target.value }))}
                  autoComplete="username"
                  required
                />
              </label>
              <label className="auth-field">
                <span>Password</span>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(event) => setCredentials((prev) => ({ ...prev, password: event.target.value }))}
                  autoComplete="current-password"
                  required
                />
              </label>
              {authError ? (
                <div className="status error auth-status" role="alert">
                  <AlertCircle size={16} />
                  <span>{authError}</span>
                </div>
              ) : null}
              <button className="btn btn-primary auth-submit" type="submit" disabled={authBusy}>
                <Lock size={14} />
                {authBusy ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </article>
      </div>
    );
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
          onLogout={handleLogout}
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
