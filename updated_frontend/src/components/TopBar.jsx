import { useEffect, useRef, useState } from "react";
import { Menu, RefreshCw, Download, FileSpreadsheet, FileText, LogOut, Database, HardDrive, Upload, ChevronDown } from "lucide-react";
import { formatDateShort } from "../lib/format.js";
import { TRANSLATIONS } from "../lib/translation.js";

export default function TopBar({
  activeSection,
  busy,
  syncStatus,
  onRefresh,
  onExport,
  onToggleMenu,
  onLogout,
  onReanalyze,
  authToken,
  language = "en",
  onLanguageChange
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const titles = {
    control_center: "Control Center",
    sigint_analyzer: "SIGINT Analyzer",
    database_workspace: "Database Workspace",
    tactical_resources: "Tactical Resources",
    system_admin: "System Admin"
  };
  const isSearching = Boolean(syncStatus?.running);
  const syncLabel = isSearching ? t.sync_running : "Auto search active";
  const activeData = isSearching ? (syncStatus?.progress || {}) : (syncStatus?.last_search || {});
  const syncMessage = String(syncStatus?.message || "").trim();
  const stage = typeof activeData.stage === "string" && activeData.stage !== "-" ? activeData.stage : "";
  const provider = typeof activeData.provider === "string" && activeData.provider !== "-" ? activeData.provider : "";
  const lang = typeof activeData.language === "string" && activeData.language !== "-" ? activeData.language : "";
  const query = typeof activeData.query === "string" && activeData.query !== "-" ? activeData.query : "";
  const scanned = activeData.scanned !== undefined ? activeData.scanned : null;
  const kept = activeData.kept !== undefined ? activeData.kept : null;
  const updatedAt = typeof activeData.updated_at === "string" && activeData.updated_at !== "-" ? activeData.updated_at : "";
  
  const scope = [provider, lang].filter(Boolean).join(" / ");
  const syncMetaParts = [];
  if (stage) syncMetaParts.push(`stage: ${isSearching ? stage : `last ${stage}`}`);
  if (scope) syncMetaParts.push(scope);
  if (query) syncMetaParts.push(`q: ${query}`);
  if (scanned !== null && kept !== null) syncMetaParts.push(`scanned ${scanned}, kept ${kept}`);
  
  if (!isSearching && updatedAt) syncMetaParts.push(`updated ${formatDateShort(updatedAt)}`);
  const syncMeta = syncMetaParts.length
    ? syncMetaParts.join(" • ")
    : (syncMessage || (isSearching ? "Collecting live reports" : ""));

  const [openMenu, setOpenMenu] = useState(null); // 'export' | 'database' | null
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  
  const exportRef = useRef(null);
  const databaseRef = useRef(null);
  const langRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (exportRef.current && !exportRef.current.contains(e.target) &&
          databaseRef.current && !databaseRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const apiBase = () =>
    typeof import.meta !== "undefined"
      ? String(import.meta.env.VITE_API_BASE_URL || "").trim().replace(/\/$/, "")
      : "";

  const handleExport = (type) => {
    onExport(type);
    setOpenMenu(null);
  };

  const handleDownloadAllCsv = () => {
    window.location.href = `${apiBase()}/api/admin/download-csv?admin_token=${authToken}`;
    setOpenMenu(null);
  };

  const handleDownloadDb = () => {
    window.location.href = `${apiBase()}/api/admin/download-db?admin_token=${authToken}`;
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
        const res = await fetch(`${apiBase()}/api/admin/upload-db`, {
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
      }
    };
    input.click();
  };

  const handleReanalyzeDb = () => {
    setOpenMenu(null);
    onReanalyze();
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
      </div>

      <div className="topbar-center">
        <div className={`sync-pill ${isSearching ? "is-running" : "is-idle"}`} role="status" aria-live="polite">
          <span className="sync-pill-dot" aria-hidden="true" />
          <span className="sync-pill-label">{syncLabel}</span>
          {syncMeta ? <span className="sync-pill-meta">{syncMeta}</span> : null}
        </div>
      </div>

      <div className="topbar-right">
        <div className="lang-dropdown" ref={langRef}>
          <button
            type="button"
            className="lang-btn"
            onClick={() => setLangMenuOpen(!langMenuOpen)}
          >
            <span>{language === "hi" ? "हिन्दी" : language === "kn" ? "ಕನ್ನಡ" : "EN"}</span>
            <ChevronDown size={12} className="dropdown-caret" />
          </button>
          {langMenuOpen && (
            <div className="lang-menu" role="menu">
              <button
                type="button"
                className={`lang-item ${language === "en" ? "is-active" : ""}`}
                onClick={() => {
                  onLanguageChange("en");
                  setLangMenuOpen(false);
                }}
              >
                English
              </button>
              <button
                type="button"
                className={`lang-item ${language === "hi" ? "is-active" : ""}`}
                onClick={() => {
                  onLanguageChange("hi");
                  setLangMenuOpen(false);
                }}
              >
                हिन्दी
              </button>
              <button
                type="button"
                className={`lang-item ${language === "kn" ? "is-active" : ""}`}
                onClick={() => {
                  onLanguageChange("kn");
                  setLangMenuOpen(false);
                }}
              >
                ಕನ್ನಡ
              </button>
            </div>
          )}
        </div>

        <div className="dropdown" ref={exportRef}>
          <button
            type="button"
            className="btn"
            onClick={() => setOpenMenu(openMenu === "export" ? null : "export")}
            aria-haspopup="menu"
            aria-expanded={openMenu === "export"}
          >
            <Download size={15} />
            <span className="btn-label">{t.export}</span>
            <ChevronDown size={13} className={`dropdown-caret ${openMenu === "export" ? "is-open" : ""}`} />
          </button>
          {openMenu === "export" && (
            <div className="dropdown-menu" role="menu">
              <button type="button" role="menuitem" className="dropdown-item" onClick={() => handleExport("csv")}>
                <Download size={14} />
                <span>{t.download_csv}</span>
              </button>
              <button type="button" role="menuitem" className="dropdown-item" onClick={() => handleExport("excel")}>
                <FileSpreadsheet size={14} />
                <span>{t.download_excel}</span>
              </button>
              <button type="button" role="menuitem" className="dropdown-item" onClick={() => handleExport("excel_incidents_reports")}>
                <FileSpreadsheet size={14} />
                <span>{t.download_excel_two}</span>
              </button>
              <button type="button" role="menuitem" className="dropdown-item" onClick={() => handleExport("pdf")}>
                <FileText size={14} />
                <span>{t.download_pdf}</span>
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
            <span className="btn-label">{t.database}</span>
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
                <span>{t.download_db}</span>
              </button>
              <button type="button" role="menuitem" className="dropdown-item" onClick={handleUploadDb}>
                <Upload size={14} />
                <span>{t.upload_db}</span>
              </button>
              <button type="button" role="menuitem" className="dropdown-item" onClick={handleReanalyzeDb}>
                <RefreshCw size={14} />
                <span>Re-analyze Database</span>
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
          <span className="btn-label">{t.refresh}</span>
        </button>

        <button type="button" className="btn btn-ghost" onClick={onLogout} aria-label="Logout">
          <LogOut size={15} />
          <span className="btn-label">{t.logout}</span>
        </button>
      </div>

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </header>
  );
}
