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

// Demo mode - set to true to bypass authentication and show mock data
const DEMO_MODE = true;

const DEMO_SUMMARY = {
  total_incidents: 2847,
  high_risk_count: 342,
  states_affected: 28,
  species_impacted: 156,
  last_sync_time: new Date().toISOString(),
  trend_incidents: 12.5,
  trend_high_risk: -8.2,
  trend_states: 3,
  trend_species: 7.1
};

const DEMO_CHART_DATA = {
  timeline: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    incidents: [120, 145, 132, 178, 156, 189, 201, 234, 198, 267, 245, 282],
    high_risk: [23, 31, 28, 42, 35, 48, 52, 61, 45, 72, 58, 68]
  },
  top_states: [
    { state: "Maharashtra", count: 423 },
    { state: "Karnataka", count: 387 },
    { state: "Tamil Nadu", count: 312 },
    { state: "Kerala", count: 278 },
    { state: "Madhya Pradesh", count: 245 },
    { state: "Assam", count: 198 },
    { state: "West Bengal", count: 176 },
    { state: "Rajasthan", count: 154 }
  ],
  species_dist: [
    { species: "Tiger", count: 89 },
    { species: "Elephant", count: 156 },
    { species: "Leopard", count: 134 },
    { species: "Rhinoceros", count: 45 },
    { species: "Pangolin", count: 234 },
    { species: "Red Sanders", count: 312 },
    { species: "Sea Turtle", count: 67 },
    { species: "Lion", count: 23 },
    { species: "Deer", count: 189 },
    { species: "Bear", count: 78 }
  ],
  source_rank: [
    { source: "TOI", reliability_score: 92 },
    { source: "Hindu", reliability_score: 89 },
    { source: "NDTV", reliability_score: 87 },
    { source: "Indian Express", reliability_score: 85 },
    { source: "Hindustan Times", reliability_score: 83 },
    { source: "Deccan Herald", reliability_score: 81 },
    { source: "Tribune", reliability_score: 78 },
    { source: "Telegraph", reliability_score: 76 }
  ],
  filters: {
    states: ["Maharashtra", "Karnataka", "Tamil Nadu", "Kerala", "Madhya Pradesh", "Assam", "West Bengal", "Rajasthan"],
    species: ["Tiger", "Elephant", "Leopard", "Rhinoceros", "Pangolin", "Red Sanders", "Sea Turtle", "Lion"],
    crime_types: ["Poaching", "Trafficking", "Habitat Destruction", "Illegal Trade", "Smuggling"],
    sources: ["TOI", "Hindu", "NDTV", "Indian Express", "Hindustan Times"]
  }
};

const DEMO_MAP_DATA = {
  markers: [
    { lat: 19.076, lng: 72.8777, title: "Tiger poaching attempt foiled in Tadoba", state: "Maharashtra", district: "Chandrapur", risk_score: 85, species: "Tiger" },
    { lat: 12.9716, lng: 77.5946, title: "Elephant corridor protection initiative", state: "Karnataka", district: "Bangalore Rural", risk_score: 45, species: "Elephant" },
    { lat: 13.0827, lng: 80.2707, title: "Sea turtle nesting site secured", state: "Tamil Nadu", district: "Chennai", risk_score: 32, species: "Sea Turtle" },
    { lat: 9.9312, lng: 76.2673, title: "Pangolin trafficking ring busted", state: "Kerala", district: "Kochi", risk_score: 92, species: "Pangolin" },
    { lat: 23.2599, lng: 77.4126, title: "Leopard sighting near village", state: "Madhya Pradesh", district: "Bhopal", risk_score: 67, species: "Leopard" },
    { lat: 26.1445, lng: 91.7362, title: "Rhinoceros protection patrol", state: "Assam", district: "Guwahati", risk_score: 78, species: "Rhinoceros" },
    { lat: 22.5726, lng: 88.3639, title: "Illegal wildlife trade investigation", state: "West Bengal", district: "Kolkata", risk_score: 71, species: "Various" },
    { lat: 26.9124, lng: 75.7873, title: "Desert wildlife monitoring", state: "Rajasthan", district: "Jaipur", risk_score: 38, species: "Deer" },
    { lat: 21.1702, lng: 72.8311, title: "Lion habitat assessment", state: "Gujarat", district: "Surat", risk_score: 55, species: "Lion" },
    { lat: 15.2993, lng: 74.124, title: "Red Sanders seizure operation", state: "Goa", district: "Panaji", risk_score: 88, species: "Red Sanders" }
  ]
};

const DEMO_OSINT = [
  { id: 1, title: "International wildlife trafficking ring exposed", source: "Interpol", date: "Today", url: "#" },
  { id: 2, title: "New conservation technology deployed in reserves", source: "WWF", date: "Yesterday", url: "#" },
  { id: 3, title: "Climate change impact on migration patterns", source: "IUCN", date: "2 days ago", url: "#" },
  { id: 4, title: "Community-led conservation success story", source: "Wildlife Trust", date: "3 days ago", url: "#" }
];

const DEMO_NEWS_ROWS = [
  { id: 1, title: "Forest department seizes illegal wildlife products worth Rs 50 lakh", state: "Maharashtra", species: "Pangolin", risk_score: 87, date: "2024-01-15", source: "TOI" },
  { id: 2, title: "Tiger census reveals population increase in Corbett", state: "Uttarakhand", species: "Tiger", risk_score: 34, date: "2024-01-14", source: "Hindu" },
  { id: 3, title: "Elephant tramples crops, villagers demand compensation", state: "Karnataka", species: "Elephant", risk_score: 56, date: "2024-01-14", source: "NDTV" },
  { id: 4, title: "Red Sanders smugglers arrested at Chennai airport", state: "Tamil Nadu", species: "Red Sanders", risk_score: 91, date: "2024-01-13", source: "Indian Express" },
  { id: 5, title: "Leopard rescued from well in Pune suburbs", state: "Maharashtra", species: "Leopard", risk_score: 42, date: "2024-01-13", source: "Hindustan Times" },
  { id: 6, title: "Rhino horn trafficking case: Two more arrests", state: "Assam", species: "Rhinoceros", risk_score: 95, date: "2024-01-12", source: "Telegraph" },
  { id: 7, title: "Sea turtle nesting season begins on Kerala coast", state: "Kerala", species: "Sea Turtle", risk_score: 28, date: "2024-01-12", source: "Deccan Herald" },
  { id: 8, title: "Wildlife sanctuary expansion approved by state", state: "Madhya Pradesh", species: "Various", risk_score: 15, date: "2024-01-11", source: "Tribune" }
];

export default function App() {
  const [loading, setLoading] = useState(DEMO_MODE ? false : true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [authToken, setAuthToken] = useState(() => DEMO_MODE ? "demo" : getStoredToken());
  const [authError, setAuthError] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const [summary, setSummary] = useState(DEMO_MODE ? DEMO_SUMMARY : null);
  const [chartData, setChartData] = useState(DEMO_MODE ? DEMO_CHART_DATA : null);
  const [mapData, setMapData] = useState(DEMO_MODE ? DEMO_MAP_DATA : null);
  const [osintItems, setOsintItems] = useState(DEMO_MODE ? DEMO_OSINT : []);
  const [reports, setReports] = useState([]);
  const [syncStatus, setSyncStatus] = useState(null);
  const [newsRows, setNewsRows] = useState(DEMO_MODE ? DEMO_NEWS_ROWS : []);

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
    if (!authToken || DEMO_MODE) return;
    setBusy(true);
    const tasks = await Promise.allSettled([
      fetchJson(ENDPOINTS.summary),
      fetchJson(ENDPOINTS.chart),
      fetchJson(ENDPOINTS.map),
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
    const [summaryRes, chartRes, mapRes, reportRes, osintRes, syncRes] = tasks;
    if (summaryRes.status === "fulfilled") setSummary(summaryRes.value);
    if (chartRes.status === "fulfilled") setChartData(chartRes.value);
    if (mapRes.status === "fulfilled") setMapData(mapRes.value);
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
    if (!authToken || DEMO_MODE) return;
    const query = buildQuery({ ...filters, min_confidence: 0, limit: 120 });
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
    if (DEMO_MODE) return undefined;
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
    const ids = ["overview", "map", "analytics", "incidents", "osint", "reco"];
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
    const query = buildQuery({ ...filters, min_confidence: 0, admin_token: authToken });
    const base =
      kind === "pdf"
        ? ENDPOINTS.exportPdf
        : kind === "excel"
          ? ENDPOINTS.exportExcel
          : kind === "excel_incidents_reports"
            ? ENDPOINTS.exportExcelIncidentsReports
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
        setAuthError(String(err?.message || "Unable to login right now."));
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
          {/* Status Messages */}
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
                {syncStatus.message || "Search in progress..."}
                {syncProgressText ? ` - ${syncProgressText}` : ""}
              </span>
            </div>
          ) : null}

          {/* Section 1: Overview Dashboard */}
          <section className="dashboard-section" id="section-overview">
            <div className="section-header">
              <div className="section-header-content">
                <span className="section-number">01</span>
                <div>
                  <h2>National Overview</h2>
                  <p>Real-time wildlife threat monitoring across India</p>
                </div>
              </div>
            </div>
            <Kpis summary={summary} loading={loading} />
          </section>

          {/* Section 2: Geographic Intelligence */}
          <section className="dashboard-section" id="section-map">
            <div className="section-header">
              <div className="section-header-content">
                <span className="section-number">02</span>
                <div>
                  <h2>Geographic Intelligence</h2>
                  <p>Real-time incident mapping across regions</p>
                </div>
              </div>
            </div>
            <MapPanel mapData={mapData} onMapError={setError} />
          </section>

          {/* Section 3: Intelligence Analytics */}
          <section className="dashboard-section" id="section-analytics">
            <div className="section-header">
              <div className="section-header-content">
                <span className="section-number">03</span>
                <div>
                  <h2>Intelligence Analytics</h2>
                  <p>Trends, distributions, and source reliability metrics</p>
                </div>
              </div>
            </div>
            <Analytics chartData={chartData} />
          </section>

          {/* Section 4: Incident Database */}
          <section className="dashboard-section" id="section-incidents">
            <div className="section-header">
              <div className="section-header-content">
                <span className="section-number">04</span>
                <div>
                  <h2>Incident Database</h2>
                  <p>Search and filter wildlife crime reports</p>
                </div>
              </div>
            </div>
            <FilterBar
              filters={filters}
              filterOptions={filterOptions}
              onChange={setFilters}
              onApply={() => loadFilteredNews()}
              onBriefing={() => handleExport("briefing")}
            />
            <IncidentTable rows={newsRows} loading={loading} />
          </section>

          {/* Section 5: Intelligence Feed */}
          <section className="dashboard-section" id="section-osint">
            <div className="section-header">
              <div className="section-header-content">
                <span className="section-number">05</span>
                <div>
                  <h2>Intelligence Feed</h2>
                  <p>External sources and strategic recommendations</p>
                </div>
              </div>
            </div>
            <div className="bottom-grid">
              <OsintFeed items={osintItems} />
              <Recommendations items={recommendations} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
