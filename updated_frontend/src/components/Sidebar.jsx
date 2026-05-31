import {
  Shield,
  LayoutDashboard,
  Table,
  Network,
  Scale
} from "lucide-react";
import { formatDateShort } from "../lib/format.js";
import { TRANSLATIONS } from "../lib/translation.js";

const NAV = [
  {
    title: "Intelligence Portal",
    items: [
      { id: "control_center", label: "Control Center", icon: LayoutDashboard },
      { id: "sigint_analyzer", label: "SIGINT Analyzer", icon: Network },
      { id: "database_workspace", label: "Database Workspace", icon: Table },
      { id: "tactical_resources", label: "Tactical Resources", icon: Scale },
      { id: "system_admin", label: "System Admin", icon: Shield }
    ]
  }
];

export default function Sidebar({ activeSection, onSelect, isOpen, syncStatus, lastSync, language = "en" }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  function handleClick(id) {
    onSelect?.(id);
  }

  const isRunning = Boolean(syncStatus?.running);

  return (
    <aside className={`sidebar ${isOpen ? "is-open" : ""}`} aria-label="Primary navigation">
      <div className="sidebar-head">
        <div className="brand-mark" aria-hidden="true">
          <Shield size={20} strokeWidth={2} />
        </div>
        <div className="brand-copy">
          <div className="brand-title">Wildlife Intelligence</div>
          <div className="brand-sub">Command Center</div>
        </div>
      </div>

      <nav className="sidebar-body">
        {NAV.map((group) => {
          const groupTitleKey = group.title.toLowerCase();
          const groupTitle = t[groupTitleKey] || group.title;
          return (
            <div className="nav-group" key={group.title}>
              <div className="nav-group-title">{groupTitle}</div>
              {group.items.map(({ id, label, icon: Icon }) => {
                const isActive = activeSection === id;
                const itemLabel = t[id] || label;
                return (
                  <button
                    key={id}
                    type="button"
                    className={`nav-item ${isActive ? "is-active" : ""}`}
                    onClick={() => handleClick(id)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon size={16} className="nav-icon" strokeWidth={2} />
                    <span>{itemLabel}</span>
                    <span className="nav-dot" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      <div className="sidebar-foot">
        <div className="sync-card">
          <div className="sync-row">
            <span>{t.data_sync}</span>
            <span className={`pulse ${isRunning ? "" : "is-idle"}`}>
              <span className="pulse-dot" />
              {isRunning ? t.live : t.idle}
            </span>
          </div>
          <div className="sync-row">
            <span>{t.last_update}</span>
            <strong className="mono">{formatDateShort(lastSync)}</strong>
          </div>
        </div>
      </div>
    </aside>
  );
}
