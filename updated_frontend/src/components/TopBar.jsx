import { Menu, RefreshCw, Download, FileSpreadsheet, FileText, LogOut } from "lucide-react";

export default function TopBar({
  activeSection,
  busy,
  syncStatus,
  onRefresh,
  onExport,
  onToggleMenu,
  onLogout
}) {
  const titles = {
    overview: "Overview",
    map: "Threat Map",
    alerts: "Live Alerts",
    analytics: "Analytics",
    incidents: "Incidents",
    osint: "OSINT Feed",
    reco: "Recommendations"
  };
  const isSearching = Boolean(syncStatus?.running);
  const syncLabel = isSearching ? "Search in progress" : "Auto search active";
  const syncProgress = syncStatus?.progress || {};
  const syncMessage = String(syncStatus?.message || "").trim();
  const stage = typeof syncProgress.stage === "string" && syncProgress.stage !== "-" ? syncProgress.stage : "";
  const provider = typeof syncProgress.provider === "string" && syncProgress.provider !== "-" ? syncProgress.provider : "";
  const language = typeof syncProgress.language === "string" && syncProgress.language !== "-" ? syncProgress.language : "";
  const query = typeof syncProgress.query === "string" && syncProgress.query !== "-" ? syncProgress.query : "";
  const scope = [provider, language].filter(Boolean).join(" / ");
  const syncMetaParts = [];
  if (stage) syncMetaParts.push(`stage: ${stage}`);
  if (scope) syncMetaParts.push(scope);
  if (query) syncMetaParts.push(`q: ${query}`);
  const syncMeta = isSearching ? (syncMetaParts.join(" • ") || syncMessage || "Collecting live reports") : "";

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="mobile-menu"
          onClick={onToggleMenu}
          aria-label="Open navigation menu"
        >
          <Menu size={18} />
        </button>
        <div className="breadcrumb">
          <span>Wildlife Intelligence</span>
          <span className="sep">/</span>
          <strong>{titles[activeSection] || "Overview"}</strong>
        </div>
      </div>

      <div className="topbar-right">
        <div className={`sync-pill ${isSearching ? "is-running" : "is-idle"}`} role="status" aria-live="polite">
          <span className="sync-pill-dot" aria-hidden="true" />
          <span className="sync-pill-label">{syncLabel}</span>
          {syncMeta ? <span className="sync-pill-meta">{syncMeta}</span> : null}
        </div>

        <button
          type="button"
          className="btn btn-ghost"
          onClick={onRefresh}
          disabled={busy}
          aria-label="Refresh data"
        >
          <RefreshCw size={15} className={busy ? "spin" : ""} />
          <span className="btn-label">Refresh</span>
        </button>

        <button type="button" className="btn btn-ghost" onClick={onLogout} aria-label="Logout">
          <LogOut size={15} />
          <span className="btn-label">Logout</span>
        </button>

        <div className="btn-group" role="group" aria-label="Export options">
          <button type="button" className="btn" onClick={() => onExport("csv")}>
            <Download size={14} />
            <span className="btn-label">CSV</span>
          </button>
          <button type="button" className="btn" onClick={() => onExport("excel")}>
            <FileSpreadsheet size={14} />
            <span className="btn-label">Excel</span>
          </button>
          <button type="button" className="btn" onClick={() => onExport("excel_incidents_reports")}>
            <FileSpreadsheet size={14} />
            <span className="btn-label">Excel 2-Sheet</span>
          </button>
          <button type="button" className="btn" onClick={() => onExport("pdf")}>
            <FileText size={14} />
            <span className="btn-label">PDF</span>
          </button>
        </div>

      </div>

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </header>
  );
}
