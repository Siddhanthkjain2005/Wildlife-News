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
import { AlertCircle, Activity, Lock, ShieldCheck, X, ExternalLink, Download, FileText, HardDrive, Database, Cpu, RefreshCw, Radio, Bell, Globe, CheckCircle, AlertTriangle, XCircle, Wrench, ChevronRight } from "lucide-react";

import Sidebar from "./components/Sidebar.jsx";
import TopBar from "./components/TopBar.jsx";
import Kpis from "./components/Kpis.jsx";
import MapPanel from "./components/MapPanel.jsx";
import Analytics from "./components/Analytics.jsx";
import FilterBar from "./components/FilterBar.jsx";
import IncidentTable from "./components/IncidentTable.jsx";
import NetworkGraph from "./components/NetworkGraph.jsx";
import Predictions from "./components/Predictions.jsx";
import SemanticSearch from "./components/SemanticSearch.jsx";
import AlertFeed from "./components/AlertFeed.jsx";
import WpaReference from "./components/WpaReference.jsx";
import { OsintFeed, Recommendations } from "./components/BottomPanels.jsx";

import {
  ENDPOINTS,
  fetchJson,
  buildQuery,
  postJson,
  patchJson,
  getStoredToken,
  setStoredToken,
  clearStoredToken,
  resolveExternalUrl
} from "./lib/api.js";
import { formatDate, riskLevel } from "./lib/format.js";
import { TRANSLATIONS } from "./lib/translation.js";

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


const pickLatestTimestamp = (values) => {
  let latestValue = "";
  let latestMs = null;
  values.forEach((value) => {
    if (!value) return;
    const parsed = Date.parse(value);
    if (Number.isNaN(parsed)) return;
    if (latestMs === null || parsed > latestMs) {
      latestMs = parsed;
      latestValue = value;
    }
  });
  return latestValue;
};

export default function App() {
  return <DashboardApp />;
}

function DashboardApp() {
  const [language, setLanguage] = useState("en");
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
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
  const [wsStatus, setWsStatus] = useState("connecting");
  const [newsRows, setNewsRows] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [reviewStatus, setReviewStatus] = useState("pending");
  const [reviewNotes, setReviewNotes] = useState("");
  const [auditLogs, setAuditLogs] = useState([]);
  const [systemHealth, setSystemHealth] = useState(null);
  const [healthLoading, setHealthLoading] = useState(false);
  const [healthActionBusy, setHealthActionBusy] = useState("");
  const [selectedCureIssue, setSelectedCureIssue] = useState("missing_articles");
  const [resourcesTab, setResourcesTab] = useState("wpa_guide");
  const [drafterData, setDrafterData] = useState({
    courtName: "Court of Chief Judicial Magistrate",
    officerName: "Range Forest Officer, Wildlife Division",
    accusedName: "Vikram Singh & Others",
    contrabandDetails: "Tiger Skin (Panthera tigris) - 1 unit, length: 1.8 meters, tagged WCCB-T-2026-04",
    seizurePlace: "Melghat Corridor Buffer Zone, District Amravati, Maharashtra",
    wpaOffence: "Schedule I Species poaching and illegal possession under Section 9, 39, 49B and 51"
  });

  useEffect(() => {
    if (selectedIncident) {
      setReviewStatus(selectedIncident.review_status || "pending");
      setReviewNotes(selectedIncident.review_notes || "");
    }
  }, [selectedIncident]);

  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [debouncedFilters, setDebouncedFilters] = useState(EMPTY_FILTERS);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 300);
    return () => clearTimeout(handler);
  }, [filters]);
  const [activeSection, setActiveSection] = useState("control_center");
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
    const taskPromises = [
      fetchJson(ENDPOINTS.summary),
      fetchJson(ENDPOINTS.chart),
      fetchJson(ENDPOINTS.map),
      fetchJson(ENDPOINTS.alerts),
      fetchJson(ENDPOINTS.reports),
      fetchJson(ENDPOINTS.osint),
      fetchJson(ENDPOINTS.syncStatus),
      fetchJson(ENDPOINTS.adminAuditLogs)
    ];
    
    const fetchHealthIndex = activeSection === "system_admin" ? taskPromises.length : -1;
    if (activeSection === "system_admin") {
      taskPromises.push(fetchJson(ENDPOINTS.adminSystemHealth));
    }

    const tasks = await Promise.allSettled(taskPromises);
    const unauthorized = tasks.some(
      (task) => task.status === "rejected" && Number(task.reason?.status) === 401
    );
    if (unauthorized) {
      handleUnauthorized("Session expired. Please sign in again.");
      return;
    }
    const [summaryRes, chartRes, mapRes, alertRes, reportRes, osintRes, syncRes, auditRes] = tasks;
    if (summaryRes.status === "fulfilled") setSummary(summaryRes.value);
    if (chartRes.status === "fulfilled") setChartData(chartRes.value);
    if (mapRes.status === "fulfilled") setMapData(mapRes.value);
    if (alertRes.status === "fulfilled") setAlerts(Array.isArray(alertRes.value) ? alertRes.value : []);
    if (reportRes.status === "fulfilled") setReports(Array.isArray(reportRes.value) ? reportRes.value : []);
    if (osintRes.status === "fulfilled") setOsintItems(Array.isArray(osintRes.value) ? osintRes.value : []);
    if (syncRes.status === "fulfilled") setSyncStatus(syncRes.value);
    if (auditRes && auditRes.status === "fulfilled") setAuditLogs(Array.isArray(auditRes.value) ? auditRes.value : []);

    if (fetchHealthIndex !== -1 && tasks[fetchHealthIndex]?.status === "fulfilled") {
      setSystemHealth(tasks[fetchHealthIndex].value);
    }

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
    const query = buildQuery({ ...debouncedFilters, min_confidence: 0, limit: 120 });
    try {
      const data = await fetchJson(`${ENDPOINTS.filterNews}?${query}`);
      setNewsRows(Array.isArray(data.items) ? data.items : []);
    } catch (err) {
      if (Number(err?.status) === 401) {
        handleUnauthorized("Session expired. Please sign in again.");
      } else {
        console.error("Failed to refresh filtered incidents:", err);
        setError((current) => current || "Incident feed is temporarily unavailable.");
      }
    }
  }, [authToken, debouncedFilters, handleUnauthorized]);

  useEffect(() => {

    if (!authToken) {
      setLoading(false);
      return undefined;
    }

    const wsUrl = ENDPOINTS.wsLive();
    let ws = null;
    let reconnectTimer = null;

    function connect() {
      // Pass the auth token via the WebSocket subprotocol instead of the URL
      // query string, so it never appears in nginx/proxy access logs.
      setWsStatus((prev) => (prev === "live" ? "reconnecting" : prev === "offline" ? "reconnecting" : prev));
      ws = authToken
        ? new WebSocket(wsUrl, ["wildlife-auth", authToken])
        : new WebSocket(wsUrl);
      ws.onopen = () => {
        setWsStatus("live");
      };
      ws.onmessage = (event) => {
        try {
          const { channel, data } = JSON.parse(event.data);
          if (channel === "alerts") {
            const alertPayload = data?.payload || data;
            setAlerts((prev) => [alertPayload, ...prev].slice(0, 100));
          } else if (channel === "incidents") {
            const incidentPayload = data?.payload || data;
            setNewsRows((prev) => [incidentPayload, ...prev].slice(0, 200));
          } else if (channel === "sync_status") {
            if (data?.type === "sync_snapshot" && data.snapshot) {
              setSyncStatus(data.snapshot);
            } else if (data?.type === "sync_completed") {
              setSyncStatus((prev) => ({
                ...prev,
                running: false,
                finished_at: data.finished_at || new Date().toISOString(),
                duration_seconds: data.duration_seconds,
                stats: data.stats || prev?.stats,
                message: `Completed in ${(data.duration_seconds || 0).toFixed(1)}s`,
              }));
            } else {
              setSyncStatus(data);
            }
          }
        } catch (err) {
          console.error("WS parse error:", err);
        }
      };
      ws.onclose = () => {
        setWsStatus("offline");
        reconnectTimer = window.setTimeout(connect, 5000);
      };
      ws.onerror = () => {
        setWsStatus("offline");
        ws.close();
      };
    }

    connect();

    setLoading(true);
    loadDashboard();
    const timer = window.setInterval(() => {
      loadDashboard();
    }, AUTO_REFRESH_MS);

    return () => {
      window.clearInterval(timer);
      if (reconnectTimer) window.clearTimeout(reconnectTimer);
      if (ws) {
        ws.onclose = null;
        ws.close();
      }
    };
  }, [authToken, loadDashboard]);

  useEffect(() => {
    loadFilteredNews();
  }, [loadFilteredNews]);



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
  const lastSync = useMemo(
    () =>
      pickLatestTimestamp([
        summary?.last_sync_time,
        syncStatus?.finished_at,
        syncStatus?.last_search?.updated_at,
        syncStatus?.started_at
      ]),
    [summary?.last_sync_time, syncStatus?.finished_at, syncStatus?.last_search?.updated_at, syncStatus?.started_at]
  );
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

  function handleDownloadDossier(incidentId) {
    if (!authToken || !incidentId) return;
    const base = ENDPOINTS.exportPdfDossier(incidentId);
    window.location.href = `${base}?admin_token=${authToken}`;
  }

  const handleReanalyze = useCallback(async () => {
    if (!confirm("Re-analyze the entire historical database?\n\nThis will trigger the AI pipeline in the background to classify WPA 1972 protection schedules, offence categories, and penalty classes for all historical records.")) return;
    try {
      setBusy(true);
      const res = await postJson(ENDPOINTS.adminReanalyze, {});
      alert(`Historical analysis queued successfully!\n\nStatus: ${res.status || "queued"}\nMessage: ${res.message || "Historical analysis pipeline has been triggered in the background."}`);
      loadDashboard();
      loadFilteredNews();
    } catch (err) {
      alert(`Failed to trigger database re-analysis: ${err.message}`);
    } finally {
      setBusy(false);
    }
  }, [loadDashboard, loadFilteredNews]);

  const fetchSystemHealth = useCallback(async () => {

    try {
      setHealthLoading(true);
      const data = await fetchJson(ENDPOINTS.adminSystemHealth);
      setSystemHealth(data);
    } catch (err) {
      console.error("Failed to fetch system health:", err);
    } finally {
      setHealthLoading(false);
    }
  }, [authToken]);

  const handleComponentAction = useCallback(async (actionName) => {
    setHealthActionBusy(actionName);
    try {
      let endpoint = "";
      if (actionName === "optimize") {
        endpoint = ENDPOINTS.adminDbOptimize;
      } else if (actionName === "test_ai") {
        endpoint = ENDPOINTS.adminTestAi;
      } else if (actionName === "sync_now") {
        endpoint = ENDPOINTS.syncStatus.replace("/api/sync-status", "/sync");
      } else if (actionName === "sync_reset") {
        endpoint = ENDPOINTS.adminSystemHealth.replace("/api/admin/system-health", "/api/admin/sync-reset");
      } else if (actionName === "test_alerts") {
        endpoint = ENDPOINTS.adminTestAlerts;
      } else if (actionName === "cache_clear") {
        endpoint = ENDPOINTS.adminCacheClearJson;
      }
      
      if (!endpoint) throw new Error("Unknown action requested.");
      
      const res = await postJson(endpoint, {});
      alert(res.message || "Diagnostic action executed successfully!");
      
      // Re-fetch system health to update statuses
      const freshHealth = await fetchJson(ENDPOINTS.adminSystemHealth);
      setSystemHealth(freshHealth);
      loadDashboard();
    } catch (err) {
      alert(`Action failed: ${err.message}`);
    } finally {
      setHealthActionBusy("");
    }
  }, [authToken, loadDashboard]);

  const handleDownloadDb = useCallback(() => {
    window.location.href = `${ENDPOINTS.adminDownloadDb}?admin_token=${authToken}`;
  }, [authToken]);

  const handleUploadDb = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".db,.sqlite,.sqlite3";
    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!confirm(`Restore database from "${file.name}"? This will replace all current data.`)) return;
      const form = new FormData();
      form.append("file", file);
      try {
        setBusy(true);
        const res = await fetch(ENDPOINTS.adminUploadDb, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${authToken}`
          },
          body: form
        });
        const data = await res.json();
        if (data.ok) {
          alert(`Database restored!\n\nTotal rows: ${data.total_rows}\nPoaching articles: ${data.poaching_rows}\nPredictor retrained: ${data.predictor_retrained ? "Yes" : "No"}`);
          window.location.reload();
        } else {
          alert(`Restore failed: ${data.detail || "Unknown error"}`);
        }
      } catch (err) {
        alert(`Upload failed: ${err.message}`);
      } finally {
        setBusy(false);
      }
    };
    input.click();
  }, [authToken]);

  const handleReviewSubmit = useCallback(async (incidentId, reviewStatus, notes) => {
    try {
      setBusy(true);
      const updatedIncident = await patchJson(ENDPOINTS.reviewIncident(incidentId), {
        review_status: reviewStatus,
        review_notes: notes
      });
      
      // Update newsRows locally immediately so UI is snappy
      setNewsRows((prevRows) =>
        prevRows.map((row) => (row.id === incidentId ? { ...row, ...updatedIncident } : row))
      );
      
      // Also update selectedIncident state if it is currently selected
      setSelectedIncident((prev) => {
        if (prev && prev.id === incidentId) {
          return { ...prev, ...updatedIncident };
        }
        return prev;
      });
      
      alert(`Incident review updated to: ${reviewStatus.toUpperCase()}`);
    } catch (err) {
      alert(`Failed to submit review: ${err.message}`);
    } finally {
      setBusy(false);
    }
  }, []);

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
    if (id === "system_admin") {
      fetchSystemHealth();
    }
    // Fix scrolling issues in main page: scroll viewport to the top instantly
    window.scrollTo({ top: 0, behavior: "instant" });
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
        language={language}
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
          wsStatus={wsStatus}
          onRefresh={loadDashboard}
          onExport={handleExport}
          onToggleMenu={() => setMobileOpen((v) => !v)}
          onLogout={handleLogout}
          onReanalyze={handleReanalyze}
          language={language}
          onLanguageChange={setLanguage}
          authToken={authToken}
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

          {/* PAGE 1: CONTROL CENTER */}
          {activeSection === "control_center" && (
            <div className="fade-in">
              <div className="section-header" style={{ marginBottom: "20px" }}>
                <div className="section-header-content">
                  <span className="section-number" style={{ color: "#C17F59" }}>01</span>
                  <div>
                    <h2>{t.sec_control}</h2>
                    <p style={{ opacity: 0.8, fontSize: "14px" }}>Real-time threat monitoring, national map visualization, and critical poaching alerts</p>
                  </div>
                </div>
              </div>
              <Kpis summary={summary} loading={loading} />
              <div style={{ marginTop: "24px" }}>
                <MapPanel mapData={mapData} onMapError={setError} />
              </div>
              <div style={{ marginTop: "24px" }}>
                <AlertFeed alerts={alerts} />
              </div>
            </div>
          )}

          {/* PAGE 2: SIGINT ANALYZER */}
          {activeSection === "sigint_analyzer" && (
            <div className="fade-in">
              <div className="section-header" style={{ marginBottom: "20px" }}>
                <div className="section-header-content">
                  <span className="section-number" style={{ color: "#C17F59" }}>02</span>
                  <div>
                    <h2>{t.sec_sigint}</h2>
                    <p style={{ opacity: 0.8, fontSize: "14px" }}>Organized crime syndicate link inspector, networks connections mapping, and intelligence trends</p>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <article className="card network-card" style={{ padding: "24px" }}>
                  <div style={{ marginBottom: "16px" }}>
                    <h3 style={{ color: "var(--text-strong)", margin: "0 0 6px", fontSize: "18px" }}>Syndicate Link Visualizer</h3>
                    <p style={{ color: "var(--muted)", margin: 0, fontSize: "13px" }}>Click nodes to inspect relationship parameters and identified suspect links</p>
                  </div>
                  <NetworkGraph />
                </article>
                <article className="card" style={{ padding: "24px" }}>
                  <div style={{ marginBottom: "16px" }}>
                    <h3 style={{ color: "var(--text-strong)", margin: "0 0 6px", fontSize: "18px" }}>Predictive Threat Intelligence</h3>
                    <p style={{ color: "var(--muted)", margin: 0, fontSize: "13px" }}>ML-forecasted hotspots, species threat trends, and persons of interest derived from collected incidents</p>
                  </div>
                  <Predictions />
                </article>
                <Analytics chartData={chartData} />
              </div>
            </div>
          )}

          {/* PAGE 3: DATABASE WORKSPACE */}
          {activeSection === "database_workspace" && (
            <div className="fade-in">
              <div className="section-header" style={{ marginBottom: "20px" }}>
                <div className="section-header-content">
                  <span className="section-number" style={{ color: "#C17F59" }}>03</span>
                  <div>
                    <h2>{t.sec_database}</h2>
                    <p style={{ opacity: 0.8, fontSize: "14px" }}>Complete historical incident ledger, advanced semantic intelligence searches, and active signal streams</p>
                  </div>
                </div>
              </div>
              <SemanticSearch />
              <FilterBar
                filters={filters}
                filterOptions={filterOptions}
                onChange={setFilters}
                onApply={() => loadFilteredNews()}
                onBriefing={() => handleExport("briefing")}
              />
              <IncidentTable
                rows={newsRows}
                loading={loading}
                onSelectRow={(row) => setSelectedIncident(row)}
              />
              <div className="bottom-grid" style={{ marginTop: "24px" }}>
                <OsintFeed items={osintItems} t={t} />
                <Recommendations items={recommendations} t={t} />
              </div>
            </div>
          )}

          {/* PAGE 4: TACTICAL RESOURCES */}
          {activeSection === "tactical_resources" && (
            <div className="fade-in">
              <div className="section-header" style={{ marginBottom: "20px" }}>
                <div className="section-header-content">
                  <span className="section-number" style={{ color: "#C17F59" }}>04</span>
                  <div>
                    <h2>{t.sec_tactical}</h2>
                    <p style={{ opacity: 0.8, fontSize: "14px" }}>Official enforcement tools, complaint drafter, wildlife schedules, and field seizure protocols</p>
                  </div>
                </div>
              </div>

              {/* Sub-tab navigation */}
              <div className="wpa-tabs">
                <button
                  type="button"
                  onClick={() => setResourcesTab("wpa_guide")}
                  className={`wpa-tab-btn ${resourcesTab === "wpa_guide" ? "is-active" : ""}`}
                >
                  WPA 1972 reference guide
                </button>
                <button
                  type="button"
                  onClick={() => setResourcesTab("complaint_drafter")}
                  className={`wpa-tab-btn ${resourcesTab === "complaint_drafter" ? "is-active" : ""}`}
                >
                  Section 50 Complaint Drafter
                </button>
                <button
                  type="button"
                  onClick={() => setResourcesTab("seizure_sops")}
                  className={`wpa-tab-btn ${resourcesTab === "seizure_sops" ? "is-active" : ""}`}
                >
                  Field Seizure SOP Reference
                </button>
              </div>

              {/* Sub-tab 1: WPA Reference */}
              {resourcesTab === "wpa_guide" && (
                <WpaReference language={language} newsRows={newsRows} />
              )}

              {/* Sub-tab 2: Section 50 Official Complaint Drafter */}
              {resourcesTab === "complaint_drafter" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "24px" }} className="fade-in">
                  {/* Inputs Form */}
                  <article className="card" style={{ padding: "20px" }}>
                    <h3 style={{ margin: "0 0 16px", color: "var(--text-strong)", fontSize: "16px", borderBottom: "1px solid var(--border-2)", paddingBottom: "8px" }}>
                      Complaint Parameters
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", color: "var(--text)", fontWeight: "600" }}>
                        Designated Magistrate Court
                        <input
                          type="text"
                          value={drafterData.courtName}
                          onChange={(e) => setDrafterData({ ...drafterData, courtName: e.target.value })}
                          className="input"
                        />
                      </label>
                      <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", color: "var(--text)", fontWeight: "600" }}>
                        Complainant Officer Title
                        <input
                          type="text"
                          value={drafterData.officerName}
                          onChange={(e) => setDrafterData({ ...drafterData, officerName: e.target.value })}
                          className="input"
                        />
                      </label>
                      <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", color: "var(--text)", fontWeight: "600" }}>
                        Accused / Suspect Persons
                        <input
                          type="text"
                          value={drafterData.accusedName}
                          onChange={(e) => setDrafterData({ ...drafterData, accusedName: e.target.value })}
                          className="input"
                        />
                      </label>
                      <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", color: "var(--text)", fontWeight: "600" }}>
                        Contraband Description
                        <textarea
                          rows={3}
                          value={drafterData.contrabandDetails}
                          onChange={(e) => setDrafterData({ ...drafterData, contrabandDetails: e.target.value })}
                          className="input"
                          style={{ fontFamily: "inherit" }}
                        />
                      </label>
                      <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", color: "var(--text)", fontWeight: "600" }}>
                        Place of Seizure
                        <input
                          type="text"
                          value={drafterData.seizurePlace}
                          onChange={(e) => setDrafterData({ ...drafterData, seizurePlace: e.target.value })}
                          className="input"
                        />
                      </label>
                      <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", color: "var(--text)", fontWeight: "600" }}>
                        WPA Statutory Offence Clauses
                        <input
                          type="text"
                          value={drafterData.wpaOffence}
                          onChange={(e) => setDrafterData({ ...drafterData, wpaOffence: e.target.value })}
                          className="input"
                        />
                      </label>
                    </div>
                  </article>

                  {/* Generated Paper View */}
                  <article className="card" style={{ padding: "24px", background: "#fdfcfa", color: "#1a1917", borderRadius: "8px", border: "2px solid #C17F59", boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1.5px solid #C17F59", paddingBottom: "10px" }}>
                      <span style={{ fontWeight: "700", textTransform: "uppercase", fontSize: "11px", tracking: "1px", color: "#C17F59" }}>FORMAL LEGAL COMPLAINT (WPA 1972)</span>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          type="button"
                          className="btn"
                          style={{ padding: "4px 10px", fontSize: "11px", background: "#C17F59", color: "#ffffff", border: "none" }}
                          onClick={() => {
                            const complaintText = `BEFORE THE COURT OF THE CHIEF JUDICIAL MAGISTRATE AT: ${drafterData.courtName.toUpperCase()}
COMPLAINANT: ${drafterData.officerName}
VERSUS
ACCUSED: ${drafterData.accusedName}
SEIZURE PLACE: ${drafterData.seizurePlace}
SEIZED CONTRABAND: ${drafterData.contrabandDetails}
OFFENCE CHARGED: ${drafterData.wpaOffence}`;
                            navigator.clipboard.writeText(complaintText);
                            alert("Complaint draft text copied to clipboard successfully!");
                          }}
                        >
                          Copy Text
                        </button>
                        <button
                          type="button"
                          className="btn"
                          style={{ padding: "4px 10px", fontSize: "11px", background: "#1A1917", color: "#ffffff", border: "none" }}
                          onClick={() => window.print()}
                        >
                          Print Draft
                        </button>
                      </div>
                    </div>

                    <div style={{ fontFamily: "Georgia, serif", fontSize: "13px", lineHeight: "1.7", color: "#1a1917", padding: "10px" }}>
                      <h4 style={{ textAlign: "center", margin: "0 0 16px", textDecoration: "underline", fontWeight: "700" }}>
                        IN THE COURT OF THE CHIEF JUDICIAL MAGISTRATE AT {drafterData.courtName.toUpperCase()}
                      </h4>
                      <p style={{ margin: "0 0 10px" }}><strong>Complainant:</strong> {drafterData.officerName}, State Wildlife Department / WCCB Taskforce.</p>
                      <p style={{ textAlign: "center", margin: "10px 0" }}><strong>- VERSUS -</strong></p>
                      <p style={{ margin: "0 0 20px" }}><strong>Accused:</strong> {drafterData.accusedName}, having committed non-bailable offences under the WPA, 1972.</p>
                      
                      <p style={{ margin: "0 0 12px", textIndent: "30px", textAlign: "justify" }}>
                        <strong>MOST RESPECTFULLY SHOWETH:</strong>
                      </p>
                      <ol style={{ paddingLeft: "20px", margin: "0 0 20px", textAlign: "justify" }}>
                        <li style={{ marginBottom: "10px" }}>
                          That the Complainant is a duly authorized Forest Range Officer holding powers under Section 50 of the Wildlife (Protection) Act, 1972 to inspect, seize and file prosecution complaints.
                        </li>
                        <li style={{ marginBottom: "10px" }}>
                          That on this date, acting on highly verified signal intelligence alerts, the Complainant organized a tactical field trap at <strong>{drafterData.seizurePlace}</strong>, leading to the interception of the Accused.
                        </li>
                        <li style={{ marginBottom: "10px" }}>
                          That on conducting physical search of the Accused, the Complainant recovered and seized: <strong>{drafterData.contrabandDetails}</strong>. A formal seizure memo was prepared on spot.
                        </li>
                        <li style={{ marginBottom: "10px" }}>
                          That the seized contraband belongs to wild animal species protected under the WPA, 1972. The illegal hunting, smuggling, or custody thereof violates Section 9, 39, and 49B of the Act.
                        </li>
                      </ol>

                      <p style={{ margin: "20px 0 10px", textAlign: "justify" }}>
                        <strong>PRAYER:</strong> It is therefore prayed that this Hon'ble Court take immediate cognizance of the offence, summon the Accused, and initiate trial proceedings under Section 51 of the WPA, 1972.
                      </p>

                      <div style={{ marginTop: "40px", display: "flex", justifyContent: "space-between" }}>
                        <div>
                          <p style={{ margin: 0 }}><strong>Date:</strong> {new Date().toLocaleDateString("en-IN")}</p>
                          <p style={{ margin: 0 }}><strong>Place:</strong> India</p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <p style={{ margin: "0 0 40px" }}><strong>FILED BY:</strong></p>
                          <p style={{ margin: 0 }}>_______________________________</p>
                          <p style={{ margin: 0, fontSize: "11px", opacity: 0.8 }}>(Forest Range Officer / Seizing Authority)</p>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              )}

              {/* Sub-tab 3: Field Seizure SOPs Reference */}
              {resourcesTab === "seizure_sops" && (
                <div className="sop-grid fade-in">
                  {/* Category Buttons */}
                  <div className="sop-menu-list">
                    <button
                      type="button"
                      className="sop-menu-btn is-active"
                    >
                      🐅 Tiger Skin Seizure
                    </button>
                    <button
                      type="button"
                      className="sop-menu-btn"
                      style={{ opacity: 0.6 }}
                    >
                      🐘 Elephant Ivory SOPs
                    </button>
                    <button
                      type="button"
                      className="sop-menu-btn"
                      style={{ opacity: 0.6 }}
                    >
                      🐆 Leopard Skins SOPs
                    </button>
                    <button
                      type="button"
                      className="sop-menu-btn"
                      style={{ opacity: 0.6 }}
                    >
                      🦅 Live Birds / Protected Fauna
                    </button>
                  </div>

                  {/* SOP Grid */}
                  <article className="card" style={{ padding: "20px" }}>
                    <h3 style={{ margin: "0 0 6px", color: "var(--text-strong)", fontSize: "16px" }}>🐅 Tiger Skin & Canine Seizure Protocol</h3>
                    <p style={{ color: "var(--muted)", margin: "0 0 16px", fontSize: "13px" }}>Critical checklist for Forest Officers to preserve chain of custody and secure forensic prosecution proof.</p>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {[
                        { step: "SOP-01", desc: "Verify stripe pattern symmetry and authenticate skin. Look for bullet entry marks or poison residue holes.", checked: true },
                        { step: "SOP-02", desc: "Collect micro-biological DNA swab samples from the flesh remnants on the skin backing under sterile conditions.", checked: true },
                        { step: "SOP-03", desc: "Tag the specimen with a unique tamper-proof security identifier (e.g. WCCB-TIGER-YEAR-XX).", checked: false },
                        { step: "SOP-04", desc: "Measure exact total length from tail-tip to snout, width, and weigh the dry specimen.", checked: false },
                        { step: "SOP-05", desc: "Initiate veterinary certification and seal specimen in a specialized non-static moisture barrier containment bag.", checked: false },
                        { step: "SOP-06", desc: "Register formal seizure memo (Form A) signed by Complainant and at least two local witnesses.", checked: false }
                      ].map((x) => (
                        <div key={x.step} className="sop-step-item">
                          <input type="checkbox" defaultChecked={x.checked} style={{ width: "16px", height: "16px", accentColor: "var(--primary)", marginTop: "4px" }} />
                          <div>
                            <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--primary)", display: "block" }}>{x.step}</span>
                            <span style={{ fontSize: "13px", color: "var(--text)" }}>{x.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>
                </div>
              )}
            </div>
          )}

          {/* PAGE 5: SYSTEM ADMIN */}
          {activeSection === "system_admin" && (
            <div className="fade-in">
              <div className="section-header" style={{ marginBottom: "20px" }}>
                <div className="section-header-content" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", flexWrap: "wrap", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span className="section-number" style={{ color: "#C17F59" }}>05</span>
                    <div>
                      <h2>System Control Center</h2>
                      <p style={{ opacity: 0.8, fontSize: "14px" }}>Visual system pipeline dashboard, real-time diagnostic matrices, and administrative recovery controls</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className="btn" 
                    onClick={fetchSystemHealth} 
                    disabled={healthLoading} 
                    style={{ padding: "8px 12px", fontSize: "12px", display: "flex", alignItems: "center", gap: "6px", background: "var(--bg-3)", border: "1.5px solid var(--border)" }}
                  >
                    <RefreshCw size={14} className={healthLoading ? "spin" : ""} />
                    Refresh Diagnostics
                  </button>
                </div>
              </div>

              {/* CUSTOM ANIMS & STYLING FOR THE INTERACTIVE FLOW */}
              <style>{`
                @keyframes pipeline-flow {
                  0% { stroke-dashoffset: 24; }
                  100% { stroke-dashoffset: 0; }
                }
                @keyframes pulse-glow {
                  0% { transform: scale(0.95); opacity: 0.5; box-shadow: 0 0 0 0 rgba(90, 158, 111, 0.4); }
                  70% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 8px rgba(90, 158, 111, 0); }
                  100% { transform: scale(0.95); opacity: 0.5; box-shadow: 0 0 0 0 rgba(90, 158, 111, 0); }
                }
                @keyframes pulse-glow-warn {
                  0% { transform: scale(0.95); opacity: 0.5; box-shadow: 0 0 0 0 rgba(201, 147, 61, 0.4); }
                  70% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 8px rgba(201, 147, 61, 0); }
                  100% { transform: scale(0.95); opacity: 0.5; box-shadow: 0 0 0 0 rgba(201, 147, 61, 0); }
                }
                @keyframes pulse-glow-danger {
                  0% { transform: scale(0.95); opacity: 0.5; box-shadow: 0 0 0 0 rgba(199, 80, 80, 0.4); }
                  70% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 8px rgba(199, 80, 80, 0); }
                  100% { transform: scale(0.95); opacity: 0.5; box-shadow: 0 0 0 0 rgba(199, 80, 80, 0); }
                }
                .pipeline-node:hover {
                  transform: translateY(-4px);
                  border-color: var(--primary) !important;
                  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.06);
                }
                .cure-card:hover {
                  border-color: var(--primary) !important;
                  background: var(--bg-1) !important;
                }
              `}</style>

              {/* OVERALL HEALTH BANNER */}
              {systemHealth ? (
                <div 
                  className={`health-banner ${systemHealth.status}`} 
                  style={{
                    padding: "20px",
                    borderRadius: "8px",
                    marginBottom: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "16px",
                    background: systemHealth.status === "healthy" ? "#e6f4ea" : systemHealth.status === "warning" ? "#fef7e0" : "#fce8e6",
                    border: `1.5px solid ${systemHealth.status === "healthy" ? "#34a853" : systemHealth.status === "warning" ? "#fbbc05" : "#ea4335"}`,
                    color: systemHealth.status === "healthy" ? "#137333" : systemHealth.status === "warning" ? "#b06000" : "#c5221f"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                    <div style={{ padding: "8px", borderRadius: "50%", background: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {systemHealth.status === "healthy" ? (
                        <CheckCircle size={32} />
                      ) : systemHealth.status === "warning" ? (
                        <AlertTriangle size={32} />
                      ) : (
                        <XCircle size={32} />
                      )}
                    </div>
                    <div>
                      <h3 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: "700" }}>
                        {systemHealth.status === "healthy" && "ALL SYSTEM COMPONENTS SECURE & ACTIVE"}
                        {systemHealth.status === "warning" && "SYSTEM WARNING - MODERATE DEGRADATION"}
                        {systemHealth.status === "error" && "CRITICAL SYSTEM DAMAGE DETECTED"}
                      </h3>
                      <p style={{ margin: 0, fontSize: "13px", opacity: 0.95 }}>
                        {systemHealth.status === "healthy" && "All 5 core backend databases, collectors, and Llama 3.1 parsers are reporting optimal latency and standard integrity."}
                        {systemHealth.status === "warning" && "Recent errors have been registered in the audit logs or disk utilization is nearing thresholds. Please inspect standalone components."}
                        {systemHealth.status === "error" && "Critical components have reported standard failure or daily request quotas are locked. Click 'Repair Component' on the damaged card."}
                      </p>
                    </div>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: "700", opacity: 0.8, textTransform: "uppercase", padding: "4px 8px", background: "rgba(0,0,0,0.06)", borderRadius: "4px" }}>
                    Last Checked: {formatDate(systemHealth.timestamp)}
                  </span>
                </div>
              ) : (
                <div style={{ padding: "24px", textAlign: "center", background: "var(--bg-2)", border: "1.5px solid var(--border)", borderRadius: "8px", marginBottom: "24px" }}>
                  <Activity size={32} className="spin" style={{ color: "#C17F59", marginBottom: "8px" }} />
                  <p style={{ margin: 0, color: "var(--muted)", fontSize: "13px" }}>Assembling core component diagnostic matrices...</p>
                </div>
              )}

              {/* DYNAMIC PIPELINE GRAPH REPRESENTATION */}
              {systemHealth && systemHealth.components && (
                <div style={{
                  background: "var(--bg-1)",
                  border: "1.5px solid var(--border)",
                  borderRadius: "12px",
                  padding: "24px",
                  marginBottom: "30px",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.01)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "var(--text-strong)", display: "flex", alignItems: "center", gap: "8px" }}>
                        <Activity size={18} style={{ color: "var(--primary)" }} />
                        TACTICAL DATA INGESTION & INTELLIGENCE FLOW
                      </h3>
                      <p style={{ margin: "4px 0 0", fontSize: "13.5px", color: "var(--muted)" }}>
                        Real-time visualization of news pipelines. Glowing dots represent subsystem availability. Connecting paths indicate active data transit.
                      </p>
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--success)", background: "var(--success-soft)", border: "1px solid var(--success-border)", padding: "4px 10px", borderRadius: "20px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Pipeline Active
                    </span>
                  </div>

                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                    padding: "24px 16px",
                    background: "var(--bg-2)",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    overflowX: "auto"
                  }}>
                    {/* 1. Collector Node */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "1 1 150px", minWidth: "130px", maxWidth: "200px", padding: "14px", borderRadius: "10px", background: "var(--bg-1)", border: `1.5px solid ${systemHealth.components.collector.status === "damaged" ? "var(--danger-border)" : systemHealth.components.collector.status === "idle" ? "var(--warn-border)" : "var(--success-border)"}`, position: "relative" }}>
                      <span style={{ position: "absolute", top: "10px", right: "10px", width: "8px", height: "8px", borderRadius: "50%", background: systemHealth.components.collector.status === "damaged" ? "var(--danger)" : systemHealth.components.collector.status === "idle" ? "var(--warn)" : "var(--success)", animation: systemHealth.components.collector.status === "damaged" ? "pulse-glow-danger 2s infinite" : systemHealth.components.collector.status === "idle" ? "pulse-glow-warn 2s infinite" : "pulse-glow 2s infinite" }} />
                      <div style={{ padding: "8px", borderRadius: "50%", background: systemHealth.components.collector.status === "damaged" ? "var(--danger-soft)" : systemHealth.components.collector.status === "idle" ? "var(--warn-soft)" : "var(--success-soft)", color: systemHealth.components.collector.status === "damaged" ? "var(--danger)" : systemHealth.components.collector.status === "idle" ? "var(--warn)" : "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" }}><Radio size={20} /></div>
                      <h4 style={{ margin: "0 0 2px", fontSize: "12px", fontWeight: "700", color: "var(--text-strong)" }}>1. SCRAPER</h4>
                      <span style={{ fontSize: "10px", fontWeight: "600", color: "var(--muted)" }}>NEWS INGESTION</span>
                    </div>

                    {/* Arrow 1 */}
                    <div style={{ flex: "1 0 auto", display: "flex", justifyContent: "center", maxWidth: "60px", minWidth: "20px" }}>
                      <svg width="40" height="12" viewBox="0 0 40 12" fill="none" style={{ overflow: "visible" }}>
                        <path d="M0 6H34" stroke={systemHealth.components.collector.status === "damaged" ? "var(--danger)" : "var(--success)"} strokeWidth="2.5" strokeDasharray={systemHealth.components.collector.status === "working" ? "5,5" : ""} style={{ animation: systemHealth.components.collector.status === "working" ? "pipeline-flow 1s linear infinite" : "" }} />
                        <path d="M30 2L36 6L30 10" stroke={systemHealth.components.collector.status === "damaged" ? "var(--danger)" : "var(--success)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>

                    {/* 2. AI Intelligence Node */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "1 1 150px", minWidth: "130px", maxWidth: "200px", padding: "14px", borderRadius: "10px", background: "var(--bg-1)", border: `1.5px solid ${systemHealth.components.ai_engine.status === "damaged" ? "var(--danger-border)" : systemHealth.components.ai_engine.status === "idle" ? "var(--warn-border)" : "var(--success-border)"}`, position: "relative" }}>
                      <span style={{ position: "absolute", top: "10px", right: "10px", width: "8px", height: "8px", borderRadius: "50%", background: systemHealth.components.ai_engine.status === "damaged" ? "var(--danger)" : systemHealth.components.ai_engine.status === "idle" ? "var(--warn)" : "var(--success)", animation: systemHealth.components.ai_engine.status === "damaged" ? "pulse-glow-danger 2s infinite" : systemHealth.components.ai_engine.status === "idle" ? "pulse-glow-warn 2s infinite" : "pulse-glow 2s infinite" }} />
                      <div style={{ padding: "8px", borderRadius: "50%", background: systemHealth.components.ai_engine.status === "damaged" ? "var(--danger-soft)" : systemHealth.components.ai_engine.status === "idle" ? "var(--warn-soft)" : "var(--success-soft)", color: systemHealth.components.ai_engine.status === "damaged" ? "var(--danger)" : systemHealth.components.ai_engine.status === "idle" ? "var(--warn)" : "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" }}><Cpu size={20} /></div>
                      <h4 style={{ margin: "0 0 2px", fontSize: "12px", fontWeight: "700", color: "var(--text-strong)" }}>2. LLAMA AI</h4>
                      <span style={{ fontSize: "10px", fontWeight: "600", color: "var(--muted)" }}>INTELLIGENCE</span>
                    </div>

                    {/* Arrow 2 */}
                    <div style={{ flex: "1 0 auto", display: "flex", justifyContent: "center", maxWidth: "60px", minWidth: "20px" }}>
                      <svg width="40" height="12" viewBox="0 0 40 12" fill="none" style={{ overflow: "visible" }}>
                        <path d="M0 6H34" stroke={systemHealth.components.ai_engine.status === "damaged" ? "var(--danger)" : "var(--success)"} strokeWidth="2.5" strokeDasharray={systemHealth.components.ai_engine.status === "working" ? "5,5" : ""} style={{ animation: systemHealth.components.ai_engine.status === "working" ? "pipeline-flow 1s linear infinite" : "" }} />
                        <path d="M30 2L36 6L30 10" stroke={systemHealth.components.ai_engine.status === "damaged" ? "var(--danger)" : "var(--success)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>

                    {/* 3. Database Node */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "1 1 150px", minWidth: "130px", maxWidth: "200px", padding: "14px", borderRadius: "10px", background: "var(--bg-1)", border: `1.5px solid ${systemHealth.components.database.status === "damaged" ? "var(--danger-border)" : systemHealth.components.database.status === "idle" ? "var(--warn-border)" : "var(--success-border)"}`, position: "relative" }}>
                      <span style={{ position: "absolute", top: "10px", right: "10px", width: "8px", height: "8px", borderRadius: "50%", background: systemHealth.components.database.status === "damaged" ? "var(--danger)" : systemHealth.components.database.status === "idle" ? "var(--warn)" : "var(--success)", animation: systemHealth.components.database.status === "damaged" ? "pulse-glow-danger 2s infinite" : systemHealth.components.database.status === "idle" ? "pulse-glow-warn 2s infinite" : "pulse-glow 2s infinite" }} />
                      <div style={{ padding: "8px", borderRadius: "50%", background: systemHealth.components.database.status === "damaged" ? "var(--danger-soft)" : systemHealth.components.database.status === "idle" ? "var(--warn-soft)" : "var(--success-soft)", color: systemHealth.components.database.status === "damaged" ? "var(--danger)" : systemHealth.components.database.status === "idle" ? "var(--warn)" : "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" }}><Database size={20} /></div>
                      <h4 style={{ margin: "0 0 2px", fontSize: "12px", fontWeight: "700", color: "var(--text-strong)" }}>3. SQLITE DB</h4>
                      <span style={{ fontSize: "10px", fontWeight: "600", color: "var(--muted)" }}>INCIDENT REGISTRY</span>
                    </div>

                    {/* Arrow 3 */}
                    <div style={{ flex: "1 0 auto", display: "flex", justifyContent: "center", maxWidth: "60px", minWidth: "20px" }}>
                      <svg width="40" height="12" viewBox="0 0 40 12" fill="none" style={{ overflow: "visible" }}>
                        <path d="M0 6H34" stroke={systemHealth.components.database.status === "damaged" ? "var(--danger)" : "var(--success)"} strokeWidth="2.5" strokeDasharray={systemHealth.components.database.status === "working" ? "5,5" : ""} style={{ animation: systemHealth.components.database.status === "working" ? "pipeline-flow 1s linear infinite" : "" }} />
                        <path d="M30 2L36 6L30 10" stroke={systemHealth.components.database.status === "damaged" ? "var(--danger)" : "var(--success)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>

                    {/* 4. Threat Alerts Node */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "1 1 150px", minWidth: "130px", maxWidth: "200px", padding: "14px", borderRadius: "10px", background: "var(--bg-1)", border: `1.5px solid ${systemHealth.components.alert_engine.status === "damaged" ? "var(--danger-border)" : systemHealth.components.alert_engine.status === "idle" ? "var(--warn-border)" : "var(--success-border)"}`, position: "relative" }}>
                      <span style={{ position: "absolute", top: "10px", right: "10px", width: "8px", height: "8px", borderRadius: "50%", background: systemHealth.components.alert_engine.status === "damaged" ? "var(--danger)" : systemHealth.components.alert_engine.status === "idle" ? "var(--warn)" : "var(--success)", animation: systemHealth.components.alert_engine.status === "damaged" ? "pulse-glow-danger 2s infinite" : systemHealth.components.alert_engine.status === "idle" ? "pulse-glow-warn 2s infinite" : "pulse-glow 2s infinite" }} />
                      <div style={{ padding: "8px", borderRadius: "50%", background: systemHealth.components.alert_engine.status === "damaged" ? "var(--danger-soft)" : systemHealth.components.alert_engine.status === "idle" ? "var(--warn-soft)" : "var(--success-soft)", color: systemHealth.components.alert_engine.status === "damaged" ? "var(--danger)" : systemHealth.components.alert_engine.status === "idle" ? "var(--warn)" : "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" }}><Bell size={20} /></div>
                      <h4 style={{ margin: "0 0 2px", fontSize: "12px", fontWeight: "700", color: "var(--text-strong)" }}>4. ALERTS</h4>
                      <span style={{ fontSize: "10px", fontWeight: "600", color: "var(--muted)" }}>DISPATCHER</span>
                    </div>

                    {/* Arrow 4 */}
                    <div style={{ flex: "1 0 auto", display: "flex", justifyContent: "center", maxWidth: "60px", minWidth: "20px" }}>
                      <svg width="40" height="12" viewBox="0 0 40 12" fill="none" style={{ overflow: "visible" }}>
                        <path d="M0 6H34" stroke={systemHealth.components.alert_engine.status === "damaged" ? "var(--danger)" : "var(--success)"} strokeWidth="2.5" strokeDasharray={systemHealth.components.alert_engine.status === "working" ? "5,5" : ""} style={{ animation: systemHealth.components.alert_engine.status === "working" ? "pipeline-flow 1s linear infinite" : "" }} />
                        <path d="M30 2L36 6L30 10" stroke={systemHealth.components.alert_engine.status === "damaged" ? "var(--danger)" : "var(--success)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>

                    {/* 5. API Cache Gateway Node */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "1 1 150px", minWidth: "130px", maxWidth: "200px", padding: "14px", borderRadius: "10px", background: "var(--bg-1)", border: `1.5px solid ${systemHealth.components.api_gateway.status === "damaged" ? "var(--danger-border)" : systemHealth.components.api_gateway.status === "idle" ? "var(--warn-border)" : "var(--success-border)"}`, position: "relative" }}>
                      <span style={{ position: "absolute", top: "10px", right: "10px", width: "8px", height: "8px", borderRadius: "50%", background: systemHealth.components.api_gateway.status === "damaged" ? "var(--danger)" : systemHealth.components.api_gateway.status === "idle" ? "var(--warn)" : "var(--success)", animation: systemHealth.components.api_gateway.status === "damaged" ? "pulse-glow-danger 2s infinite" : systemHealth.components.api_gateway.status === "idle" ? "pulse-glow-warn 2s infinite" : "pulse-glow 2s infinite" }} />
                      <div style={{ padding: "8px", borderRadius: "50%", background: systemHealth.components.api_gateway.status === "damaged" ? "var(--danger-soft)" : systemHealth.components.api_gateway.status === "idle" ? "var(--warn-soft)" : "var(--success-soft)", color: systemHealth.components.api_gateway.status === "damaged" ? "var(--danger)" : systemHealth.components.api_gateway.status === "idle" ? "var(--warn)" : "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" }}><Globe size={20} /></div>
                      <h4 style={{ margin: "0 0 2px", fontSize: "12px", fontWeight: "700", color: "var(--text-strong)" }}>5. API SERVER</h4>
                      <span style={{ fontSize: "10px", fontWeight: "600", color: "var(--muted)" }}>WEB CACHE</span>
                    </div>
                  </div>
                </div>
              )}

              {/* NON-TECH WIZARD (SELF-HEALING ASSISTANT) */}
              {systemHealth && (
                <article className="card" style={{ padding: "24px", marginBottom: "30px", border: "1.5px solid var(--border)", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", borderBottom: "1px solid var(--border)", paddingBottom: "14px" }}>
                    <div style={{ padding: "8px", borderRadius: "8px", background: "var(--primary-soft)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Wrench size={20} />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "var(--text-strong)" }}>
                        🔧 LAYPERSON SELF-HEALING CURE ASSISTANT
                      </h3>
                      <p style={{ margin: "2px 0 0", fontSize: "13px", color: "var(--muted)" }}>
                        Choose a common system concern below. Even with zero technical background, you can analyze and cure the issue in one click.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr", gap: "24px" }}>
                    {/* Left Concerns Selector */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {[
                        { id: "missing_articles", q: "❓ No new poaching articles appear today", label: "Background news crawler status check" },
                        { id: "database_slowness", q: "🚀 System metrics or page loading is slow", label: "SQLite relational storage indexing optimization" },
                        { id: "ai_failing", q: "🤖 AI summarizing or parsing returns errors", label: "Llama 3.1 Azure Inference routing check" },
                        { id: "alerts_not_arriving", q: "📱 Threat warnings not reaching handsets", label: "SMTP / SMS official alert channels validation" },
                        { id: "cache_stale", q: "🔄 Edited incident updates do not show up", label: "Uvicorn Fast API cache purging" }
                      ].map((item) => {
                        const isSelected = selectedCureIssue === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            className="cure-card"
                            onClick={() => setSelectedCureIssue(item.id)}
                            style={{
                              padding: "14px",
                              borderRadius: "8px",
                              textAlign: "left",
                              background: isSelected ? "var(--primary-soft)" : "var(--bg-2)",
                              border: `1.5px solid ${isSelected ? "var(--primary)" : "var(--border)"}`,
                              transition: "all 0.2s ease",
                              fontSize: "13px",
                              fontWeight: "600",
                              color: isSelected ? "var(--primary)" : "var(--text-strong)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              cursor: "pointer"
                            }}
                          >
                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                              <span>{item.q}</span>
                              <span style={{ fontSize: "10px", fontWeight: "400", opacity: 0.6, color: "var(--text)" }}>{item.label}</span>
                            </div>
                            <ChevronRight size={14} style={{ opacity: isSelected ? 1 : 0.4, color: isSelected ? "var(--primary)" : "inherit" }} />
                          </button>
                        );
                      })}
                    </div>

                    {/* Right Troubleshoot Visual Workspace */}
                    <div style={{ padding: "20px", background: "var(--bg-2)", borderRadius: "8px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      {selectedCureIssue === "missing_articles" && (
                        <>
                          <div>
                            <h4 style={{ margin: "0 0 8px", color: "var(--text-strong)", fontSize: "14px", fontWeight: "700" }}>Troubleshoot: Background News Scraper</h4>
                            <p style={{ margin: "0 0 14px", fontSize: "13px", color: "var(--muted)", lineHeight: "1.5" }}>
                              The background news crawler actively checks news channels for new reports. If updates are missing, the system could be waiting for its timer, or a network request got interrupted leaving the synchronizer locked.
                            </p>
                            <div style={{ padding: "12px", background: "var(--bg-1)", borderRadius: "6px", border: "1px solid var(--border)", fontSize: "12px", color: "var(--muted)", marginBottom: "16px" }}>
                              <strong>Live Diagnostic Stats:</strong>
                              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginTop: "8px" }}>
                                <div>State: <strong style={{ color: "var(--primary)" }}>{systemHealth.components.collector.stats["STANDBY STATE"]}</strong></div>
                                <div>Interval: <strong>{systemHealth.components.collector.stats["Crawling Interval"]}</strong></div>
                                <div>Last Harvest: <strong>{systemHealth.components.collector.stats["Last Active Crawl"]}</strong></div>
                                <div>Providers Loaded: <strong>{String(systemHealth.components.collector.stats["Active Feeds"] || "")}</strong></div>
                              </div>
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => handleComponentAction("sync_now")}
                              disabled={healthActionBusy !== ""}
                              style={{ fontSize: "12px", padding: "8px 16px" }}
                            >
                              {healthActionBusy === "sync_now" ? "Crawling News Channels..." : "Force News Crawl Now"}
                            </button>
                            <button
                              type="button"
                              className="btn"
                              onClick={() => handleComponentAction("sync_reset")}
                              disabled={healthActionBusy !== ""}
                              style={{ fontSize: "12px", padding: "8px 16px", border: "1.5px solid var(--danger)", color: "var(--danger)", background: "transparent" }}
                            >
                              {healthActionBusy === "sync_reset" ? "Resetting Sync..." : "Unlock Sync Service Lock"}
                            </button>
                          </div>
                        </>
                      )}

                      {selectedCureIssue === "database_slowness" && (
                        <>
                          <div>
                            <h4 style={{ margin: "0 0 8px", color: "var(--text-strong)", fontSize: "14px", fontWeight: "700" }}>Troubleshoot: SQLite Relational Database</h4>
                            <p style={{ margin: "0 0 14px", fontSize: "13px", color: "var(--muted)", lineHeight: "1.5" }}>
                              As the intelligence system gathers reports, indices can become fragmented over time, causing delays when generating charts. Running optimization vacuum processes cleans up residual empty space and rebuilds rapid index tables.
                            </p>
                            <div style={{ padding: "12px", background: "var(--bg-1)", borderRadius: "6px", border: "1px solid var(--border)", fontSize: "12px", color: "var(--muted)", marginBottom: "16px" }}>
                              <strong>Live Diagnostic Stats:</strong>
                              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginTop: "8px" }}>
                                <div>Size on Disk: <strong>{systemHealth.components.database.stats["Storage Size"]}</strong></div>
                                <div>Incidents Tracked: <strong>{systemHealth.components.database.stats["Incidents Tracked"]}</strong></div>
                                <div>Integrity State: <strong style={{ color: "var(--success)" }}>{systemHealth.components.database.stats["Integrity Mode"]}</strong></div>
                                <div>Database Path: <span className="mono" style={{ fontSize: "10px" }}>{systemHealth.components.database.stats["Disk Directory"]}</span></div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => handleComponentAction("optimize")}
                              disabled={healthActionBusy !== ""}
                              style={{ fontSize: "12px", padding: "8px 16px" }}
                            >
                              {healthActionBusy === "optimize" ? "Optimizing Storage Layout..." : "Defragment & Optimize DB Indices"}
                            </button>
                          </div>
                        </>
                      )}

                      {selectedCureIssue === "ai_failing" && (
                        <>
                          <div>
                            <h4 style={{ margin: "0 0 8px", color: "var(--text-strong)", fontSize: "14px", fontWeight: "700" }}>Troubleshoot: Llama 3.1 AI Intelligence Parser</h4>
                            <p style={{ margin: "0 0 14px", fontSize: "13px", color: "var(--muted)", lineHeight: "1.5" }}>
                              The Llama 3.1 AI model parses and summarizes raw news reports. If summaries are missing, the endpoint may be rate-limited or the API token could be invalid. Check connection latency with a small diagnostic test.
                            </p>
                            <div style={{ padding: "12px", background: "var(--bg-1)", borderRadius: "6px", border: "1px solid var(--border)", fontSize: "12px", color: "var(--muted)", marginBottom: "16px" }}>
                              <strong>Live Diagnostic Stats:</strong>
                              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginTop: "8px" }}>
                                <div>Model Name: <strong className="mono">{systemHealth.components.ai_engine.stats["Active Model"]}</strong></div>
                                <div>Azure Inference: <strong style={{ color: "var(--success)" }}>Enabled</strong></div>
                                <div>Safety Filtering: <strong>{systemHealth.components.ai_engine.stats["Content Filter"]}</strong></div>
                                <div>Daily API Limit: <strong>{systemHealth.components.ai_engine.stats["Daily Quota Limit"]}</strong></div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => handleComponentAction("test_ai")}
                              disabled={healthActionBusy !== ""}
                              style={{ fontSize: "12px", padding: "8px 16px" }}
                            >
                              {healthActionBusy === "test_ai" ? "Pinging AI Gateway..." : "Verify Llama 3.1 Connectivity"}
                            </button>
                          </div>
                        </>
                      )}

                      {selectedCureIssue === "alerts_not_arriving" && (
                        <>
                          <div>
                            <h4 style={{ margin: "0 0 8px", color: "var(--text-strong)", fontSize: "14px", fontWeight: "700" }}>Troubleshoot: Threat Notification Dispatcher</h4>
                            <p style={{ margin: "0 0 14px", fontSize: "13px", color: "var(--muted)", lineHeight: "1.5" }}>
                              Threat warnings send notifications when high-severity incidents are discovered. Verify that the routing services (SMTP mail nodes or Twilio) are properly active by sending a secure mock test message.
                            </p>
                            <div style={{ padding: "12px", background: "var(--bg-1)", borderRadius: "6px", border: "1px solid var(--border)", fontSize: "12px", color: "var(--muted)", marginBottom: "16px" }}>
                              <strong>Live Diagnostic Stats:</strong>
                              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginTop: "8px" }}>
                                <div>Total Sent Logs: <strong>{systemHealth.components.alert_engine.stats["Alerts Compiled"]}</strong></div>
                                <div>E-Mail Alerts: <strong style={{ color: systemHealth.components.alert_engine.stats["E-Mail Channel"] === "ACTIVE" ? "var(--success)" : "var(--muted)" }}>{systemHealth.components.alert_engine.stats["E-Mail Channel"]}</strong></div>
                                <div>Telegram Node: <strong>{systemHealth.components.alert_engine.stats["Telegram Channel"]}</strong></div>
                                <div>WhatsApp Node: <strong>{systemHealth.components.alert_engine.stats["WhatsApp Channel"]}</strong></div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => handleComponentAction("test_alerts")}
                              disabled={healthActionBusy !== ""}
                              style={{ fontSize: "12px", padding: "8px 16px" }}
                            >
                              {healthActionBusy === "test_alerts" ? "Sending Diagnostic Signals..." : "Dispatch Secure Test Alerts"}
                            </button>
                          </div>
                        </>
                      )}

                      {selectedCureIssue === "cache_stale" && (
                        <>
                          <div>
                            <h4 style={{ margin: "0 0 8px", color: "var(--text-strong)", fontSize: "14px", fontWeight: "700" }}>Troubleshoot: API Cache & Web Server</h4>
                            <p style={{ margin: "0 0 14px", fontSize: "13px", color: "var(--muted)", lineHeight: "1.5" }}>
                              The API Gateway caches dashboard results in RAM memory to preserve performance. If you edited incidents or reviews but the main map still displays old reports, purging the RAM cache forces a fresh database sync.
                            </p>
                            <div style={{ padding: "12px", background: "var(--bg-1)", borderRadius: "6px", border: "1px solid var(--border)", fontSize: "12px", color: "var(--muted)", marginBottom: "16px" }}>
                              <strong>Live Diagnostic Stats:</strong>
                              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginTop: "8px" }}>
                                <div>Memory Cache: <strong style={{ color: "var(--primary)" }}>{systemHealth.components.api_gateway.stats["Memory Cache"]}</strong></div>
                                <div>Lifetime TTL: <strong>{systemHealth.components.api_gateway.stats["Cache Lifetime"]}</strong></div>
                                <div>Disk Space Left: <strong>{systemHealth.components.api_gateway.stats["Disk Space Left"]}</strong></div>
                                <div>Daemon Status: <strong style={{ color: "var(--success)" }}>{systemHealth.components.api_gateway.stats["Daemon Status"]}</strong></div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => handleComponentAction("cache_clear")}
                              disabled={healthActionBusy !== ""}
                              style={{ fontSize: "12px", padding: "8px 16px" }}
                            >
                              {healthActionBusy === "cache_clear" ? "Clearing Server RAM..." : "Purge Web Server Cache RAM"}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              )}

              {/* IN-DEPTH ENGINE DIAGNOSTIC METRICS */}
              {systemHealth && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "24px", marginBottom: "30px" }}>
                  {/* Circle SVG disk utilization gauge */}
                  <article className="card" style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "center", border: "1.5px solid var(--border)", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.01)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ position: "relative", width: "90px", height: "90px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="90" height="90" viewBox="0 0 90 90" style={{ transform: "rotate(-90deg)", overflow: "visible" }}>
                          <circle cx="45" cy="45" r="35" stroke="var(--bg-3)" strokeWidth="8" fill="transparent" />
                          <circle cx="45" cy="45" r="35" stroke={systemHealth.storage.usage_percent > 85 ? "var(--danger)" : systemHealth.storage.usage_percent > 65 ? "var(--warn)" : "var(--success)"} strokeWidth="8" strokeDasharray={2 * Math.PI * 35} strokeDashoffset={(2 * Math.PI * 35) - (systemHealth.storage.usage_percent / 100) * (2 * Math.PI * 35)} strokeLinecap="round" fill="transparent" style={{ transition: "stroke-dashoffset 0.8s ease-in-out" }} />
                        </svg>
                        <span style={{ position: "absolute", fontSize: "14px", fontWeight: "700", color: "var(--text-strong)" }}>
                          {systemHealth.storage.usage_percent}%
                        </span>
                      </div>
                      <div>
                        <h4 style={{ margin: "0 0 4px", fontSize: "13px", fontWeight: "700", color: "var(--text-strong)", textTransform: "uppercase", letterSpacing: "0.03em" }}>Disk Space Allocation</h4>
                        <span style={{ display: "block", fontSize: "18px", fontWeight: "700", color: "var(--text-strong)" }}>
                          {systemHealth.storage.free_gb} GB Free
                        </span>
                        <span style={{ fontSize: "12px", color: "var(--muted)" }}>FastAPI daemon storage threshold is healthy</span>
                      </div>
                    </div>
                  </article>

                  {/* Incident volumes growth meter */}
                  <article className="card" style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "center", border: "1.5px solid var(--border)", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.01)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <h4 style={{ margin: 0, fontSize: "13px", fontWeight: "700", color: "var(--text-strong)", textTransform: "uppercase", letterSpacing: "0.03em" }}>SQLite Relational Cap</h4>
                      <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--primary)" }}>{systemHealth.database.total_incidents} / 5000 records</span>
                    </div>
                    <div style={{ height: "10px", width: "100%", background: "var(--bg-3)", borderRadius: "5px", overflow: "hidden", marginBottom: "8px" }}>
                      <div style={{ height: "100%", width: `${Math.min(100, (systemHealth.database.total_incidents / 5000) * 100)}%`, background: "linear-gradient(90deg, var(--primary), var(--primary-2))", borderRadius: "5px", transition: "width 0.8s ease-in-out" }} />
                    </div>
                    <span style={{ fontSize: "11.5px", color: "var(--muted)" }}>Incident logs volume utilizing {((systemHealth.database.total_incidents / 5000) * 100).toFixed(1)}% of planned local index storage capacity.</span>
                  </article>
                </div>
              )}


              {/* STANDARD CONTROLS GRID */}
              <div className="admin-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
                {/* PDF Exporter Card */}
                <article className="card" style={{ padding: "20px" }}>
                  <h3 style={{ margin: "0 0 10px", color: "var(--text-strong)", fontSize: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <FileText size={18} style={{ color: "#C17F59" }} />
                    WCCB Intelligence Bulletin Exporter
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--muted)", margin: "0 0 16px", lineHeight: "1.5" }}>
                    Download a high-fidelity, printable PDF bulletin compiling past 7 days' tactical poaching reports, species metrics, hotspot alerts, WPA schedules, and authority signatures.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      window.location.href = `${ENDPOINTS.summary.replace("/api/dashboard-summary", "")}/api/admin/export/weekly-bulletin?admin_token=${authToken}`;
                    }}
                  >
                    <Download size={14} style={{ marginRight: "6px" }} />
                    Export Weekly PDF Bulletin
                  </button>
                </article>

                {/* Backups & Reanalyze Card */}
                <article className="card" style={{ padding: "20px" }}>
                  <h3 style={{ margin: "0 0 10px", color: "var(--text-strong)", fontSize: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <HardDrive size={18} style={{ color: "#C17F59" }} />
                    Database Maintenance
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--muted)", margin: "0 0 16px", lineHeight: "1.5" }}>
                    Generate full physical database copies, restore existing databases, or trigger full machine learning re-indexing to process and re-score poaching news data.
                  </p>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <button type="button" className="btn" onClick={handleDownloadDb} style={{ fontSize: "12px", padding: "8px 12px" }}>
                      Download SQLite DB
                    </button>
                    <button type="button" className="btn" onClick={handleUploadDb} style={{ fontSize: "12px", padding: "8px 12px" }}>
                      Upload SQLite DB
                    </button>
                    <button type="button" className="btn" onClick={handleReanalyze} style={{ fontSize: "12px", padding: "8px 12px" }}>
                      Force ML Re-analyze
                    </button>
                  </div>
                </article>
              </div>

              {/* Security Audit Log */}
              <article className="card" style={{ padding: "20px" }}>
                <h3 style={{ margin: "0 0 6px", color: "var(--text-strong)", fontSize: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <ShieldCheck size={18} style={{ color: "#C17F59" }} />
                  Official Security Audit Log
                </h3>
                <p style={{ color: "var(--muted)", margin: "0 0 16px", fontSize: "13px" }}>Chronological record of sensitive administrative events, exports, and security credentials updates.</p>
                
                <div className="table-wrapper" style={{ overflowX: "auto" }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Timestamp</th>
                        <th>Actor</th>
                        <th>Action</th>
                        <th>Status</th>
                        <th>IP Address</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditLogs && auditLogs.length > 0 ? (
                        auditLogs.slice(0, 15).map((log) => (
                          <tr key={log.id || Math.random()}>
                            <td className="cell-mono">{formatDate(log.timestamp)}</td>
                            <td><span style={{ padding: "2px 6px", background: "var(--bg-3)", color: "var(--text-strong)", borderRadius: "4px", fontWeight: "700" }}>{log.actor}</span></td>
                            <td><strong>{log.action}</strong></td>
                            <td>
                              <span className={`status-pill ${log.status === "ok" ? "approved" : "rejected"}`} style={{ padding: "2px 6px" }}>
                                {log.status}
                              </span>
                            </td>
                            <td className="cell-mono">{log.ip || "127.0.0.1"}</td>
                            <td style={{ opacity: 0.8 }}>{log.notes || "—"}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} style={{ padding: "24px", textAlign: "center", opacity: 0.5 }}>
                            No administrative audit logs compiled in this workspace.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </article>
            </div>
          )}
        </div>
      </div>

      {selectedIncident && (
        <div className="modal-overlay" onClick={() => setSelectedIncident(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-area">
                <div className="modal-title-pills">
                  <span className={`risk-pill ${riskLevel(selectedIncident.risk_score)}`}>
                    Risk: {selectedIncident.risk_score}
                  </span>
                  <span className={`status-pill ${selectedIncident.review_status || "pending"}`}>
                    {selectedIncident.review_status || "pending"}
                  </span>
                </div>
                <h1 className="modal-title">{selectedIncident.title}</h1>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedIncident(null)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {/* Section 1: General Intelligence */}
              <div>
                <h3 className="modal-section-title">General Intelligence</h3>
                <div className="metadata-grid">
                  <div className="metadata-item">
                    <span className="metadata-label">Date</span>
                    <span className="metadata-value cell-mono">{formatDate(selectedIncident.date)}</span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-label">Species</span>
                    <span className="metadata-value">{selectedIncident.species || "—"}</span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-label">State</span>
                    <span className="metadata-value">{selectedIncident.state || "—"}</span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-label">District</span>
                    <span className="metadata-value">{selectedIncident.district || "—"}</span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-label">Crime Type</span>
                    <span className="metadata-value">{selectedIncident.crime_type || "—"}</span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-label">Involved Persons</span>
                    <span className="metadata-value">{selectedIncident.involved_persons || "—"}</span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-label">Source</span>
                    <span className="metadata-value">{selectedIncident.source || "—"}</span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-label">AI Confidence</span>
                    <span className="metadata-value cell-mono">
                      {Number(selectedIncident.confidence || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 2: Summary / Description */}
              {selectedIncident.summary && (
                <div>
                  <h3 className="modal-section-title">Incident Summary</h3>
                  <div className="description-box">{selectedIncident.summary}</div>
                </div>
              )}

              {/* Section 3: WPA 1972 Classification */}
              <div>
                <h3 className="modal-section-title">Wildlife Protection Act (WPA) 1972 Classification</h3>
                <div className="classification-grid">
                  <div className="classification-card">
                    <span className="label">WPA Schedule</span>
                    <span className="value">{selectedIncident.wpa_schedule || "Not Classified"}</span>
                  </div>
                  <div className="classification-card">
                    <span className="label">WPA Section</span>
                    <span className="value">{selectedIncident.wpa_section || "Not Classified"}</span>
                  </div>
                  <div className="classification-card">
                    <span className="label">Offence Type</span>
                    <span className="value">{selectedIncident.wpa_offence_type || "Not Classified"}</span>
                  </div>
                  <div className="classification-card">
                    <span className="label">Penalty Class</span>
                    <span className="value">{selectedIncident.wpa_penalty_class || "Not Classified"}</span>
                  </div>
                  <div className="classification-card">
                    <span className="label">Protected Area Type</span>
                    <span className="value">{selectedIncident.protected_area_type || "None / Not Applicable"}</span>
                  </div>
                  <div className="classification-card">
                    <span className="label">Enforcement Authority</span>
                    <span className="value">{selectedIncident.enforcement_authority || "Local Police / Forest Dept."}</span>
                  </div>
                </div>
              </div>

              {/* Section 4: Manual Review Option */}
              <div className="review-section">
                <h3 className="modal-section-title" style={{ margin: 0, border: "none", padding: 0 }}>
                  Manual Checking & Verification
                </h3>
                <div className="review-status-selector">
                  <button
                    type="button"
                    className={`review-status-btn pending ${reviewStatus === "pending" ? "active" : ""}`}
                    onClick={() => setReviewStatus("pending")}
                  >
                    Pending
                  </button>
                  <button
                    type="button"
                    className={`review-status-btn approved ${reviewStatus === "approved" ? "active" : ""}`}
                    onClick={() => setReviewStatus("approved")}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className={`review-status-btn rejected ${reviewStatus === "rejected" ? "active" : ""}`}
                    onClick={() => setReviewStatus("rejected")}
                  >
                    Reject
                  </button>
                </div>
                <textarea
                  className="review-notes-input"
                  placeholder="Add manual checking notes, comments, or corrections..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setSelectedIncident(null)}
              >
                Cancel
              </button>
              <a
                href={resolveExternalUrl(selectedIncident.open_url, selectedIncident.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{ marginRight: "8px" }}
              >
                Open Article <ExternalLink size={14} style={{ marginLeft: "4px" }} />
              </a>
              <button
                type="button"
                className="btn"
                style={{ marginRight: "auto" }}
                onClick={() => handleDownloadDossier(selectedIncident.id)}
              >
                {t.btn_dossier || "Download Dossier"} <Download size={14} style={{ marginLeft: "4px" }} />
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleReviewSubmit(selectedIncident.id, reviewStatus, reviewNotes)}
                disabled={busy}
              >
                {busy ? "Saving..." : "Save Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
