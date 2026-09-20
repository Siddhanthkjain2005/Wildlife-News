import { useEffect, useState, useCallback } from "react";
import { TrendingUp, MapPin, Crosshair, Users, Activity, RefreshCw, Inbox } from "lucide-react";
import { fetchJson, postJson, ENDPOINTS } from "../lib/api.js";

const THREAT_CLASS = {
  critical: "threat-critical",
  high: "threat-high",
  elevated: "threat-elevated",
  moderate: "threat-moderate",
  low: "threat-low"
};

function threatClass(level) {
  return THREAT_CLASS[String(level || "").toLowerCase()] || "threat-moderate";
}

function trendArrow(trend) {
  const t = String(trend || "").toLowerCase();
  if (t.includes("incr") || t === "rising" || t === "up") return "▲";
  if (t.includes("decr") || t === "falling" || t === "down") return "▼";
  return "→";
}

export default function Predictions() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hotspots, setHotspots] = useState([]);
  const [species, setSpecies] = useState([]);
  const [persons, setPersons] = useState([]);
  const [forecast, setForecast] = useState(null);
  const [modelInfo, setModelInfo] = useState(null);
  const [training, setTraining] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const tasks = await Promise.allSettled([
      fetchJson(ENDPOINTS.predictionsHotspots),
      fetchJson(ENDPOINTS.predictionsSpecies),
      fetchJson(ENDPOINTS.predictionsPersons),
      fetchJson(ENDPOINTS.predictionsForecast),
      fetchJson(ENDPOINTS.predictionsModelInfo)
    ]);
    const [h, s, p, f, m] = tasks;
    if (h.status === "fulfilled") setHotspots(Array.isArray(h.value?.hotspots) ? h.value.hotspots : []);
    if (s.status === "fulfilled") setSpecies(Array.isArray(s.value?.species) ? s.value.species : []);
    if (p.status === "fulfilled") setPersons(Array.isArray(p.value?.persons) ? p.value.persons : []);
    if (f.status === "fulfilled") setForecast(f.value?.forecast || null);
    if (m.status === "fulfilled") setModelInfo(m.value || null);
    if (tasks.every((task) => task.status === "rejected")) {
      setError("Prediction service is unavailable. The model may still be training.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const retrain = useCallback(async () => {
    setTraining(true);
    try {
      await postJson(ENDPOINTS.predictionsTrain, {});
      await load();
    } catch (err) {
      console.error("Retrain failed:", err);
      setError("Model retrain failed. Please try again.");
    } finally {
      setTraining(false);
    }
  }, [load]);

  const notTrained = !loading && !error && hotspots.length === 0 && species.length === 0 && persons.length === 0;

  return (
    <div className="predictions-wrap fade-in">
      {/* Forecast summary strip */}
      <div className="pred-summary-grid">
        <div className="pred-stat-card">
          <div className="pred-stat-label"><Activity size={13} /> Next-week incidents</div>
          <div className="pred-stat-value">{forecast?.forecast_next_week_incidents ?? "—"}</div>
          <div className={`pred-stat-trend ${String(forecast?.trend || "").includes("incr") ? "is-up" : "is-down"}`}>
            {trendArrow(forecast?.trend)} {forecast?.trend || "n/a"}
            {forecast?.trend_value != null ? ` (${forecast.trend_value > 0 ? "+" : ""}${forecast.trend_value})` : ""}
          </div>
        </div>
        <div className="pred-stat-card">
          <div className="pred-stat-label"><Crosshair size={13} /> Forecast avg risk</div>
          <div className="pred-stat-value">{forecast?.forecast_avg_risk != null ? Math.round(forecast.forecast_avg_risk) : "—"}</div>
          <div className="pred-stat-trend">confidence {forecast?.confidence != null ? `${Math.round(forecast.confidence * 100)}%` : "n/a"}</div>
        </div>
        <div className="pred-stat-card">
          <div className="pred-stat-label"><MapPin size={13} /> Active hotspots</div>
          <div className="pred-stat-value">{hotspots.length}</div>
          <div className="pred-stat-trend">{modelInfo?.metrics?.unique_states ?? "—"} states tracked</div>
        </div>
        <div className="pred-stat-card">
          <div className="pred-stat-label"><Users size={13} /> Persons of interest</div>
          <div className="pred-stat-value">{persons.length}</div>
          <div className="pred-stat-trend">
            {modelInfo?.training_samples ? `${modelInfo.training_samples} samples` : "—"}
          </div>
        </div>
      </div>

      <div className="pred-head-row">
        <p className="pred-model-note">
          {modelInfo?.last_trained_at
            ? `Model retrained ${new Date(modelInfo.last_trained_at).toLocaleString()}`
            : "Predictive model status unknown"}
        </p>
        <div style={{ display: "flex", gap: "8px" }}>
          <button type="button" className="btn btn-ghost btn-sm" onClick={load} disabled={loading || training}>
            <RefreshCw size={13} className={loading ? "spin" : ""} /> Refresh
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={retrain} disabled={training || loading}>
            <Activity size={13} className={training ? "spin" : ""} /> {training ? "Retraining…" : "Retrain"}
          </button>
        </div>
      </div>

      {error ? <div className="pred-error">{error}</div> : null}
      {notTrained ? (
        <div className="empty-state">
          <div className="empty-state-icon"><Inbox size={20} /></div>
          <div>No predictions yet — the model needs more data to train.</div>
        </div>
      ) : null}

      <div className="pred-cards-grid">
        {/* Predicted hotspots */}
        <article className="card">
          <div className="card-head">
            <div className="card-head-left">
              <MapPin size={16} className="card-head-icon" />
              <h2>Predicted Hotspots</h2>
            </div>
            <span className="card-count mono">{hotspots.length}</span>
          </div>
          <div className="card-body-flush pred-scroll">
            {hotspots.slice(0, 12).map((h, i) => (
              <div className="pred-row" key={`${h.state}-${h.district}-${i}`}>
                <div className="pred-row-main">
                  <div className="pred-row-title">{h.district || "—"}, {h.state || "—"}</div>
                  <div className="pred-row-meta">
                    {h.recent_14d} in 14d • {h.total_incidents} total • {h.network_signals} network
                  </div>
                </div>
                <div className="pred-row-right">
                  <span className={`threat-pill ${threatClass(h.threat_level)}`}>{h.threat_level}</span>
                  <span className="pred-risk mono">{h.predicted_risk}</span>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Species threat forecast */}
        <article className="card">
          <div className="card-head">
            <div className="card-head-left">
              <TrendingUp size={16} className="card-head-icon" />
              <h2>Species Threat Forecast</h2>
            </div>
            <span className="card-count mono">{species.length}</span>
          </div>
          <div className="card-body-flush pred-scroll">
            {species.slice(0, 12).map((s, i) => (
              <div className="pred-row" key={`${s.species}-${i}`}>
                <div className="pred-row-main">
                  <div className="pred-row-title pred-cap">{s.species}</div>
                  <div className="pred-row-meta">
                    {s.recent_30d} in 30d • {(s.top_states || []).slice(0, 2).join(", ")}
                  </div>
                </div>
                <div className="pred-row-right">
                  <span className={`pred-trend-tag ${String(s.trend).includes("incr") ? "is-up" : String(s.trend).includes("decr") ? "is-down" : ""}`}>
                    {trendArrow(s.trend)} {s.trend}
                  </span>
                  <span className="pred-risk mono">{s.threat_score}</span>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Persons of interest */}
        <article className="card pred-span-2">
          <div className="card-head">
            <div className="card-head-left">
              <Users size={16} className="card-head-icon" />
              <h2>Persons of Interest</h2>
            </div>
            <span className="card-count mono">{persons.length}</span>
          </div>
          <div className="card-body-flush pred-scroll">
            {persons.slice(0, 15).map((p, i) => (
              <div className="pred-row" key={`${p.name}-${i}`}>
                <div className="pred-row-main">
                  <div className="pred-row-title">
                    {p.name}
                    {p.network_linked ? <span className="poi-tag poi-network">network</span> : null}
                    {p.multi_state ? <span className="poi-tag poi-multistate">multi-state</span> : null}
                  </div>
                  <div className="pred-row-meta">
                    {p.incident_count} incidents • {(p.states || []).join(", ")} • {(p.crime_types || []).join(", ")}
                  </div>
                </div>
                <div className="pred-row-right">
                  <span className={`threat-pill ${p.threat_label === "high_value_target" ? "threat-critical" : "threat-high"}`}>
                    {String(p.threat_label || "").replace(/_/g, " ")}
                  </span>
                  <span className="pred-risk mono">{p.avg_risk != null ? Math.round(p.avg_risk) : "—"}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
