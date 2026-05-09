import { AlertOctagon, Flame, MapPin, Fish, TrendingUp, TrendingDown } from "lucide-react";

function formatNumber(value) {
  const n = Number(value || 0);
  if (!Number.isFinite(n)) return "0";
  if (n >= 1000) {
    return n.toLocaleString("en-US");
  }
  return n.toString();
}

function TrendBadge({ value }) {
  if (value === undefined || value === null) return null;
  const isPositive = value >= 0;
  const Icon = isPositive ? TrendingUp : TrendingDown;
  return (
    <span className={`kpi-trend ${isPositive ? "is-up" : "is-down"}`}>
      <Icon size={12} />
      {Math.abs(value).toFixed(1)}%
    </span>
  );
}

export default function Kpis({ summary, loading }) {
  // Support both nested and flat summary structures
  const data = summary?.kpis || summary || {};

  const kpis = [
    {
      id: "total",
      label: "Total Incidents",
      value: data.total_incidents ?? 0,
      trend: data.trend_incidents,
      icon: AlertOctagon,
      tone: "primary",
      hint: "All tracked events"
    },
    {
      id: "high",
      label: "High Risk",
      value: data.high_risk_count ?? data.high_risk ?? 0,
      trend: data.trend_high_risk,
      icon: Flame,
      tone: "danger",
      hint: "Risk score above 80"
    },
    {
      id: "states",
      label: "States Affected",
      value: data.states_affected ?? data.states_active ?? 0,
      trend: data.trend_states,
      icon: MapPin,
      tone: "default",
      hint: "With recent activity"
    },
    {
      id: "species",
      label: "Species Impacted",
      value: data.species_impacted ?? data.species_tracked ?? 0,
      trend: data.trend_species,
      icon: Fish,
      tone: "warn",
      hint: "Unique species tracked"
    }
  ];

  if (loading && !summary) {
    return (
      <div className="kpi-grid" aria-busy="true">
        {Array.from({ length: 4 }).map((_, i) => (
          <div className="skel skel-kpi" key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="kpi-grid">
      {kpis.map(({ id, label, value, trend, icon: Icon, tone, hint }) => (
        <article
          key={id}
          className={`kpi-card ${tone === "danger" ? "is-danger" : tone === "primary" ? "is-primary" : tone === "warn" ? "is-warn" : ""}`}
        >
          <div className="kpi-head">
            <div className="kpi-label">{label}</div>
            <div className="kpi-icon">
              <Icon size={16} strokeWidth={2} />
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{formatNumber(value)}</div>
            <TrendBadge value={trend} />
          </div>
          <div className="kpi-meta">{hint}</div>
        </article>
      ))}
    </div>
  );
}
