import { Radio, ExternalLink, Inbox } from "lucide-react";
import { riskLevel } from "../lib/format.js";
import { resolveExternalUrl } from "../lib/api.js";

export default function AlertFeed({ alerts }) {
  return (
    <article className="card" id="section-alerts">
      <div className="card-head">
        <div className="card-head-left">
          <Radio size={16} className="card-head-icon" />
          <h2>Live High-Risk Alerts</h2>
        </div>
        <span className="card-count mono">{alerts.length} active</span>
      </div>
      <div className="card-body-flush">
        {alerts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Inbox size={20} />
            </div>
            <div>No active alerts</div>
          </div>
        ) : (
          <div className="feed">
            {alerts.slice(0, 25).map((item) => {
              const level = riskLevel(item.risk_score);
              return (
                <div className={`feed-row is-${level}`} key={item.id}>
                  <div className="feed-row-head">
                    <div className="feed-title">{item.title || "Alert"}</div>
                    <span className={`risk-pill ${level}`}>{item.risk_score || 0}</span>
                  </div>
                  <div className="feed-meta">
                    <span>{item.state || "Unknown state"}</span>
                    <span className="dot" />
                    <span>{item.district || "—"}</span>
                    {item.species ? (
                      <>
                        <span className="dot" />
                        <span>{item.species}</span>
                      </>
                    ) : null}
                  </div>
                  <a
                    href={resolveExternalUrl(item.open_url, item.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="feed-link"
                  >
                    Open source <ExternalLink size={12} />
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}
