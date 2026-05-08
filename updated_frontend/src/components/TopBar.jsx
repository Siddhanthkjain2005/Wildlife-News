import { Menu, RefreshCw, Download, FileSpreadsheet, FileText, LogOut, Database, HardDrive } from "lucide-react";

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

        <div className="btn-group" role="group" aria-label="Data backup">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              const base = typeof import.meta !== "undefined" ? String(import.meta.env.VITE_API_BASE_URL || "").trim().replace(/\/$/, "") : "";
              window.location.href = `${base}/api/public/download-csv`;
            }}
          >
            <Database size={14} />
            <span className="btn-label">All Data CSV</span>
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              const base = typeof import.meta !== "undefined" ? String(import.meta.env.VITE_API_BASE_URL || "").trim().replace(/\/$/, "") : "";
              window.location.href = `${base}/api/public/download-db`;
            }}
          >
            <HardDrive size={14} />
            <span className="btn-label">Download DB</span>
          </button>
          <button
            type="button"
            className="btn"
            style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#fff" }}
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = ".db,.sqlite,.sqlite3";
              input.onchange = async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (!confirm(`Restore database from "${file.name}"? This will replace all current data.`)) return;
                const base = typeof import.meta !== "undefined" ? String(import.meta.env.VITE_API_BASE_URL || "").trim().replace(/\/$/, "") : "";
                const form = new FormData();
                form.append("file", file);
                try {
                  const res = await fetch(`${base}/api/public/upload-db`, { method: "POST", body: form });
                  const data = await res.json();
                  if (data.ok) {
                    alert(`✅ Database restored!\n\nTotal rows: ${data.total_rows}\nPoaching articles: ${data.poaching_rows}\nPredictor retrained: ${data.predictor_retrained ? "Yes" : "No"}`);
                    window.location.reload();
                  } else {
                    alert(`❌ Restore failed: ${data.detail || "Unknown error"}`);
                  }
                } catch (err) {
                  alert(`❌ Upload failed: ${err.message}`);
                }
              };
              input.click();
            }}
          >
            <Database size={14} />
            <span className="btn-label">Upload DB</span>
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
