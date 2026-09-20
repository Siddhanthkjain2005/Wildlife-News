import { useEffect, useRef, useState } from "react";
import { AlertOctagon, Flame, MapPin, Fish, TrendingUp, TrendingDown } from "lucide-react";

function formatNumber(value) {
  const n = Number(value || 0);
  if (!Number.isFinite(n)) return "0";
  if (n >= 1000) {
    return n.toLocaleString("en-US");
  }
  return n.toString();
}

/* Animated count-up numeral — eases out, formats with separators */
function useCountUp(target, duration = 900) {
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    const to = Number(target || 0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setDisplay(to); fromRef.current = to; return; }
    const from = fromRef.current;
    if (from === to) {
      setDisplay(to);
      return;
    }
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4); // ease-out-quart
      const val = Math.round(from + (to - from) * eased);
      setDisplay(val);
      if (t < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return display;
}

/* 3D mouse-tracked tilt with holographic sheen */
function Tilt({ children, tone }) {
  const ref = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const onMove = (e) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 8}deg) rotateY(${(px - 0.5) * 10}deg) translateY(-4px)`;
      el.style.setProperty("--sheen-x", `${px * 100}%`);
      el.style.setProperty("--sheen-y", `${py * 100}%`);
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(rafRef.current);
    el.style.transform = "";
  };

  return (
    <article
      ref={ref}
      className={`kpi-card ${tone === "danger" ? "is-danger" : tone === "primary" ? "is-primary" : tone === "warn" ? "is-warn" : ""}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="tilt-sheen" aria-hidden="true" />
      {children}
    </article>
  );
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

const KPI_DEFS = [
  {
    id: "total",
    label: "Total Incidents",
    pick: (d) => d.total_incidents ?? 0,
    trendKey: "trend_incidents",
    icon: AlertOctagon,
    tone: "primary",
    hint: "All tracked events"
  },
  {
    id: "high",
    label: "High Risk",
    pick: (d) => d.high_risk_count ?? d.high_risk ?? 0,
    trendKey: "trend_high_risk",
    icon: Flame,
    tone: "danger",
    hint: "Risk score above 80"
  },
  {
    id: "states",
    label: "States Affected",
    pick: (d) => d.states_affected ?? d.states_active ?? 0,
    trendKey: "trend_states",
    icon: MapPin,
    tone: "default",
    hint: "With recent activity"
  },
  {
    id: "species",
    label: "Species Impacted",
    pick: (d) => d.species_impacted ?? d.species_tracked ?? 0,
    trendKey: "trend_species",
    icon: Fish,
    tone: "warn",
    hint: "Unique species tracked"
  }
];

function KpiCard({ def, data }) {
  const value = def.pick(data);
  const animated = useCountUp(value);
  return (
    <Tilt tone={def.tone}>
      <div className="kpi-head">
        <div className="kpi-label">{def.label}</div>
        <div className="kpi-icon">
          <def.icon size={16} strokeWidth={2} />
        </div>
      </div>
      <div className="kpi-body">
        <div className="kpi-value">{formatNumber(animated)}</div>
        <TrendBadge value={data[def.trendKey]} />
      </div>
      <div className="kpi-meta">{def.hint}</div>
    </Tilt>
  );
}

export default function Kpis({ summary, loading }) {
  // Support both nested and flat summary structures
  const data = summary?.kpis || summary || {};

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
      {KPI_DEFS.map((def) => (
        <KpiCard key={def.id} def={def} data={data} />
      ))}
    </div>
  );
}
