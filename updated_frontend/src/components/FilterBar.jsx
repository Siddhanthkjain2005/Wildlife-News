import { Filter, Search, Briefcase, RotateCcw } from "lucide-react";

const EMPTY = {
  q: "",
  species: "",
  state: "",
  date_from: "",
  date_to: "",
  crime_type: "",
  severity: "",
  source: ""
};

export default function FilterBar({ filters, filterOptions, onChange, onApply, onBriefing }) {
  const activeCount = Object.values(filters).filter((v) => String(v || "").trim() !== "").length;

  function update(key, value) {
    onChange({ ...filters, [key]: value });
  }

  function reset() {
    onChange(EMPTY);
  }

  return (
    <article className="card filters-card" id="section-incidents">
      <div className="card-head">
        <div className="card-head-left">
          <Filter size={16} className="card-head-icon" />
          <h2>Analyst Filters</h2>
          {activeCount > 0 ? <span className="badge">{activeCount} active</span> : null}
        </div>
        <button type="button" className="btn btn-ghost" onClick={reset}>
          <RotateCcw size={14} />
          <span className="btn-label">Reset</span>
        </button>
      </div>

      <div className="card-body">
        <div className="filter-grid">
          <div className="filter-field" style={{ gridColumn: "span 2" }}>
            <label className="filter-label" htmlFor="f-search">Search</label>
            <div className="input-with-icon">
              <Search size={14} className="icon" />
              <input
                id="f-search"
                className="input"
                placeholder="Search title, summary, or keywords"
                value={filters.q}
                onChange={(e) => update("q", e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onApply();
                }}
              />
            </div>
          </div>

          <div className="filter-field">
            <label className="filter-label" htmlFor="f-species">Species</label>
            <select
              id="f-species"
              className="select"
              value={filters.species}
              onChange={(e) => update("species", e.target.value)}
            >
              <option value="">All species</option>
              {(filterOptions.species || []).map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label className="filter-label" htmlFor="f-state">State</label>
            <select
              id="f-state"
              className="select"
              value={filters.state}
              onChange={(e) => update("state", e.target.value)}
            >
              <option value="">All states</option>
              {(filterOptions.states || []).map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label className="filter-label" htmlFor="f-crime">Crime type</label>
            <select
              id="f-crime"
              className="select"
              value={filters.crime_type}
              onChange={(e) => update("crime_type", e.target.value)}
            >
              <option value="">All types</option>
              {(filterOptions.crime_types || []).map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label className="filter-label" htmlFor="f-source">Source</label>
            <select
              id="f-source"
              className="select"
              value={filters.source}
              onChange={(e) => update("source", e.target.value)}
            >
              <option value="">All sources</option>
              {(filterOptions.sources || []).map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label className="filter-label" htmlFor="f-severity">Severity</label>
            <select
              id="f-severity"
              className="select"
              value={filters.severity}
              onChange={(e) => update("severity", e.target.value)}
            >
              <option value="">All severity</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="filter-field">
            <label className="filter-label" htmlFor="f-from">Date from</label>
            <input
              id="f-from"
              type="date"
              className="input"
              value={filters.date_from}
              onChange={(e) => update("date_from", e.target.value)}
            />
          </div>

          <div className="filter-field">
            <label className="filter-label" htmlFor="f-to">Date to</label>
            <input
              id="f-to"
              type="date"
              className="input"
              value={filters.date_to}
              onChange={(e) => update("date_to", e.target.value)}
            />
          </div>
        </div>

        <div className="filter-actions">
          <div className="filter-actions-left">
            {activeCount > 0
              ? `${activeCount} filter${activeCount === 1 ? "" : "s"} applied`
              : "No filters applied"}
          </div>
          <div className="filter-actions-right">
            <button type="button" className="btn" onClick={onBriefing}>
              <Briefcase size={14} />
              <span>Briefing Pack</span>
            </button>
            <button type="button" className="btn btn-primary" onClick={onApply}>
              <Filter size={14} />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
