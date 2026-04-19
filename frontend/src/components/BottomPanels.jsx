import { Satellite, Lightbulb, ExternalLink, Inbox } from "lucide-react";

export function OsintFeed({ items }) {
  return (
    <article className="card" id="section-osint">
      <div className="card-head">
        <div className="card-head-left">
          <Satellite size={16} className="card-head-icon" />
          <h2>OSINT Signal Feed</h2>
        </div>
        <span className="card-count mono">{items.length} signals</span>
      </div>
      <div className="card-body-flush">
        {items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Inbox size={20} />
            </div>
            <div>No OSINT signals yet</div>
          </div>
        ) : (
          <div className="feed">
            {items.slice(0, 16).map((item) => {
              const strength = Number(item.signal_strength || 0);
              return (
                <div className="feed-row" key={item.id}>
                  <div className="feed-row-head">
                    <div className="feed-title">{item.title}</div>
                    <span className="badge mono">{strength.toFixed(2)}</span>
                  </div>
                  <div className="feed-meta">
                    <span>{item.source_type || "source"}</span>
                    <span className="dot" />
                    <span>Signal strength</span>
                  </div>
                  <a
                    href={item.open_url || item.url || "#"}
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

export function Recommendations({ items }) {
  return (
    <article className="card" id="section-reco">
      <div className="card-head">
        <div className="card-head-left">
          <Lightbulb size={16} className="card-head-icon" />
          <h2>Top Recommendations</h2>
        </div>
        <span className="card-count mono">{items.length}</span>
      </div>
      <div className="card-body-flush">
        {items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Lightbulb size={20} />
            </div>
            <div>No recommendations generated yet</div>
          </div>
        ) : (
          <div className="feed">
            {items.map(([text, count]) => (
              <div className="reco-row" key={text}>
                <span>{text}</span>
                <span className="reco-count">{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
