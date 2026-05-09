import { useEffect, useRef, useState } from "react";
import { Menu, RefreshCw, Download, FileSpreadsheet, FileText, LogOut, Database, HardDrive, Upload, ChevronDown } from "lucide-react";

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

  const [openMenu, setOpenMenu] = useState(null); // 'export' | 'database' | null
  const exportRef = useRef(null);
  const databaseRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        exportRef.current && !exportRef.current.contains(e.target) &&
        databaseRef.current && !databaseRef.current.contains(e.target)
      ) {
        setOpenMenu(null);
      }
    }
    function handleEsc(e) {
      if (e.key === "Escape") setOpenMenu(null);
    }
    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [openMenu]);

  const apiBase = () =>
    typeof import.meta !== "undefined"
      ? String(import.meta.env.VITE_API_BASE_URL || "").trim().replace(/\/$/, "")
      : "";

  const handleExport = (type) => {
    onExport(type);
    setOpenMenu(null);
  };

  const handleDownloadAllCsv = () => {
    window.location.href = `${apiBase()}/api/public/download-csv`;
    setOpenMenu(null);
  };

  const handleDownloadDb = () => {
    window.location.href = `${apiBase()}/api/public/download-db`;
    setOpenMenu(null);
  };

  const handleUploadDb = () => {
    setOpenMenu(null);
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
        const res = await fetch(`${apiBase()}/api/public/upload-db`, { method: "POST", body: form });
        const data = await res.json();
        if (data.ok) {
          alert(`Database restored!\n\nTotal rows: ${data.total_rows}\nPoaching articles: ${data.poaching_rows}\nPredictor retrained: ${data.predictor_retrained ? "Yes" : "No"}`);
          window.location.reload();
        } else {
          alert(`Restore failed: ${data.detail || "Unknown error"}`);
        }
      } catch (err) {
        alert(`Upload failed: ${err.message}`);
      }
    };
    input.click();
  };

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
        <div className="india-exclusive-badge hidden md:flex">
          <span className="dot animate-pulse" />
          <span>India Exclusive Intelligence</span>
        </div>
      </div>

      <div className="topbar-center">
        <div className={`sync-pill ${isSearching ? "is-running" : "is-idle"}`} role="status" aria-live="polite">
          <span className="sync-pill-dot" aria-hidden="true" />
          <span className="sync-pill-label">{syncLabel}</span>
          {syncMeta ? <span className="sync-pill-meta">{syncMeta}</span> : null}
        </div>
      </div>

      <div className="topbar-right">
        <div className="dropdown" ref={exportRef}>
          <button
            type="button"
            className="btn"
            onClick={() => setOpenMenu(openMenu === "export" ? null : "export")}
            aria-haspopup="menu"
            aria-expanded={openMenu === "export"}
          >
            <Download size={15} />
            <span className="btn-label">Export</span>
            <ChevronDown size={13} className={`dropdown-caret ${openMenu === "export" ? "is-open" : ""}`} />
          </button>
          {openMenu === "export" && (
            <div className="dropdown-menu" role="menu">
              <button type="button" role="menuitem" className="dropdown-item" onClick={() => handleExport("csv")}>
                <Download size={14} />
                <span>Export as CSV</span>
              </button>
              <button type="button" role="menuitem" className="dropdown-item" onClick={() => handleExport("excel")}>
                <FileSpreadsheet size={14} />
                <span>Export as Excel</span>
              </button>
              <button type="button" role="menuitem" className="dropdown-item" onClick={() => handleExport("excel_incidents_reports")}>
                <FileSpreadsheet size={14} />
                <span>Excel (2-Sheet)</span>
              </button>

            </div>
          )}
        </div>

        <div className="dropdown" ref={databaseRef}>
          <button
            type="button"
            className="btn"
            onClick={() => setOpenMenu(openMenu === "database" ? null : "database")}
            aria-haspopup="menu"
            aria-expanded={openMenu === "database"}
          >
            <Database size={15} />
            <span className="btn-label">Database</span>
            <ChevronDown size={13} className={`dropdown-caret ${openMenu === "database" ? "is-open" : ""}`} />
          </button>
          {openMenu === "database" && (
            <div className="dropdown-menu" role="menu">
              <button type="button" role="menuitem" className="dropdown-item" onClick={handleDownloadAllCsv}>
                <Download size={14} />
                <span>Download All Data (CSV)</span>
              </button>
              <button type="button" role="menuitem" className="dropdown-item" onClick={handleDownloadDb}>
                <HardDrive size={14} />
                <span>Download Database</span>
              </button>
              <button type="button" role="menuitem" className="dropdown-item" onClick={handleUploadDb}>
                <Upload size={14} />
                <span>Upload Database</span>
              </button>
            </div>
          )}
        </div>

        <div className="topbar-divider" />

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
      </div>

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </header>
  );
}
