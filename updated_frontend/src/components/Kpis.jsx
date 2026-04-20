import { AlertOctagon, Flame, MapPin, Fish, Database, FileCheck2 } from "lucide-react";

function formatNumber(value) {
  const n = Number(value || 0);
  if (!Number.isFinite(n)) return "0";
  return n.toLocaleString("en-US");
}

export default function Kpis({ summary, loading }) {
  const data = summary?.kpis || {};

  const kpis = [
    {
      id: "total",
      label: "Total Incidents",
      value: data.total_incidents ?? 0,
      icon: AlertOctagon,
      tone: "primary",
      hint: "All tracked events"
    },
    {
      id: "high",
      label: "High Risk",
      value: data.high_risk ?? 0,
      icon: Flame,
      tone: "danger",
      hint: "Risk score > 80"
    },
    {
      id: "states",
      label: "States Active",
      value: data.states_active ?? 0,
      icon: MapPin,
      tone: "default",
      hint: "With recent activity"
    },
    {
      id: "species",
      label: "Species Tracked",
      value: data.species_tracked ?? 0,
      icon: Fish,
      tone: "default",
      hint: "Unique species seen"
    },
    {
      id: "sources",
      label: "Sources Active",
      value: data.sources_active ?? 0,
      icon: Database,
      tone: "default",
      hint: "Contributing feeds"
    },
    {
      id: "today",
      label: "Source Reports Today",
      value: data.reports_today ?? 0,
      icon: FileCheck2,
      tone: "warn",
      hint: "Merged source-article count"
    }
  ];

  if (loading && !summary) {
    return (
      <div className="kpi-grid" aria-busy="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="skel skel-kpi" key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="kpi-grid" id="section-overview">
      {kpis.map(({ id, label, value, icon: Icon, tone, hint }) => (
        <article
          key={id}
          className={`kpi-card ${tone === "danger" ? "is-danger" : tone === "primary" ? "is-primary" : tone === "warn" ? "is-warn" : ""}`}
        >
          <div className="kpi-head">
            <div className="kpi-label">{label}</div>
            <div className="kpi-icon">
              <Icon size={15} strokeWidth={2} />
            </div>
          </div>
          <div className="kpi-value mono">{formatNumber(value)}</div>
          <div className="kpi-meta">{hint}</div>
        </article>
      ))}
    </div>
  );
}
