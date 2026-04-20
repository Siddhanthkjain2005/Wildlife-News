import { Table, ExternalLink, SearchX } from "lucide-react";
import { formatDate, riskLevel } from "../lib/format.js";
import { resolveExternalUrl } from "../lib/api.js";

export default function IncidentTable({ rows, loading }) {
  return (
    <article className="card table-card">
      <div className="card-head">
        <div className="card-head-left">
          <Table size={16} className="card-head-icon" />
          <h2>Incident Intelligence</h2>
        </div>
        <span className="card-count mono">{rows.length} rows</span>
      </div>
      <div className="card-body-flush">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Risk</th>
                <th>Title</th>
                <th>Species</th>
                <th>State</th>
                <th>District</th>
                <th>Crime type</th>
                <th>Source</th>
                <th>Conf.</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const level = riskLevel(row.risk_score);
                return (
                  <tr key={row.id}>
                    <td className="cell-mono">{formatDate(row.date)}</td>
                    <td>
                      <span className={`risk-pill ${level}`}>{row.risk_score}</span>
                    </td>
                    <td className="cell-title">{row.title}</td>
                    <td className="cell-muted">{row.species || "—"}</td>
                    <td className="cell-muted">{row.state || "—"}</td>
                    <td className="cell-muted">{row.district || "—"}</td>
                    <td className="cell-muted">{row.crime_type || "—"}</td>
                    <td className="cell-muted">{row.source || "—"}</td>
                    <td className="cell-mono">{Number(row.confidence || 0).toFixed(2)}</td>
                    <td>
                      <a
                        href={resolveExternalUrl(row.open_url, row.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="feed-link"
                        aria-label="Open source article"
                      >
                        Open <ExternalLink size={12} />
                      </a>
                    </td>
                  </tr>
                );
              })}
              {!rows.length && !loading ? (
                <tr>
                  <td colSpan={10} className="empty-cell">
                    <div className="empty-cell-icon">
                      <SearchX size={20} />
                    </div>
                    No incidents match the current filters.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  );
}
