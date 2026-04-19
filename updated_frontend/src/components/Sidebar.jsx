import {
  Shield,
  LayoutDashboard,
  MapPinned,
  Radio,
  BarChart3,
  Table,
  Satellite,
  Lightbulb
} from "lucide-react";
import { formatDateShort } from "../lib/format.js";

const NAV = [
  {
    title: "Monitoring",
    items: [
      { id: "overview", label: "Overview", icon: LayoutDashboard },
      { id: "map", label: "Threat Map", icon: MapPinned },
      { id: "alerts", label: "Live Alerts", icon: Radio }
    ]
  },
  {
    title: "Analysis",
    items: [
      { id: "analytics", label: "Analytics", icon: BarChart3 },
      { id: "incidents", label: "Incidents", icon: Table }
    ]
  },
  {
    title: "Intelligence",
    items: [
      { id: "osint", label: "OSINT Feed", icon: Satellite },
      { id: "reco", label: "Recommendations", icon: Lightbulb }
    ]
  }
];

export default function Sidebar({ activeSection, onSelect, isOpen, syncStatus, lastSync }) {
  function handleClick(id) {
    onSelect?.(id);
    const node = document.getElementById(`section-${id}`);
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const isRunning = Boolean(syncStatus?.running);

  return (
    <aside className={`sidebar ${isOpen ? "is-open" : ""}`} aria-label="Primary navigation">
      <div className="sidebar-head">
        <div className="brand-mark" aria-hidden="true">
          <Shield size={18} strokeWidth={2.2} />
        </div>
        <div className="brand-copy">
          <div className="brand-title">Wildlife Intelligence</div>
          <div className="brand-sub">Command Center</div>
        </div>
      </div>

      <nav className="sidebar-body">
        {NAV.map((group) => (
          <div className="nav-group" key={group.title}>
            <div className="nav-group-title">{group.title}</div>
            {group.items.map(({ id, label, icon: Icon }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  type="button"
                  className={`nav-item ${isActive ? "is-active" : ""}`}
                  onClick={() => handleClick(id)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon size={16} className="nav-icon" strokeWidth={2} />
                  <span>{label}</span>
                  <span className="nav-dot" aria-hidden="true" />
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar-foot">
        <div className="sync-card">
          <div className="sync-row">
            <span>Data sync</span>
            <span className={`pulse ${isRunning ? "" : "is-idle"}`}>
              <span className="pulse-dot" />
              {isRunning ? "Live" : "Idle"}
            </span>
          </div>
          <div className="sync-row">
            <span>Last update</span>
            <strong className="mono">{formatDateShort(lastSync)}</strong>
          </div>
        </div>
      </div>
    </aside>
  );
}
