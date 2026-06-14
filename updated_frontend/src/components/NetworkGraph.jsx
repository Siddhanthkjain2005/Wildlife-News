import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Network, Users, MapPin, AlertTriangle, ChevronRight, User, Briefcase, ExternalLink, RefreshCw } from 'lucide-react';
import { fetchJson, ENDPOINTS, resolveExternalUrl } from '../lib/api';

export default function NetworkGraph() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [personProfile, setPersonProfile] = useState(null);
  const [personLoading, setPersonLoading] = useState(false);
  const abortControllerRef = useRef(null);
  const requestIdRef = useRef(0);

  const loadPersonProfile = useCallback(async (name) => {
    if (!name) return;
    setPersonProfile({ person: name, loading: true });
    setPersonLoading(true);
    try {
      const result = await fetchJson(ENDPOINTS.graphPersonProfile(name));
      setPersonProfile(result);
    } catch (err) {
      console.error("Failed to load person profile:", err);
      setPersonProfile({ person: name, error: true });
    } finally {
      setPersonLoading(false);
    }
  }, []);

  const loadData = useCallback(async () => {
    requestIdRef.current += 1;
    const requestId = requestIdRef.current;
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);
    try {
      const query = new URLSearchParams({ limit: "10000", min_size: "2", incident_limit: "10000" });
      const result = await fetchJson(`${ENDPOINTS.graphNetworks}?${query.toString()}`, { signal: controller.signal });
      if (requestId !== requestIdRef.current) return;
      setData(result);
      setSelectedNetwork((current) => {
        if (!result.networks || result.networks.length === 0) return null;
        if (current?.network_id) {
          const existing = result.networks.find((net) => net.network_id === current.network_id);
          if (existing) return existing;
        }
        return result.networks[0];
      });
      setError(null);
    } catch (err) {
      if (err?.name === "AbortError") return;
      if (requestId !== requestIdRef.current) return;
      setError("Failed to load intelligence networks.");
      console.error("Failed to load intelligence networks:", err);
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    return () => {
      requestIdRef.current += 1;
      abortControllerRef.current?.abort();
    };
  }, [loadData]);

  if (loading && !data) {
    return (
      <div className="network-loading">
        <RefreshCw size={24} className="spin" />
        <p>Analyzing criminal networks...</p>
      </div>
    );
  }

  return (
    <div className="network-container">
      <div className="network-header">
        <div className="header-info">
          <Network size={24} className="accent-icon" />
          <div>
            <h1>Intelligence Network Browser</h1>
            <p className="subtitle">
              Visualizing {data?.person_nodes || 0} actors across {data?.incidents_analyzed || 0} incidents and {data?.total_network_count || 0} networks
            </p>
          </div>
        </div>
        <button className="btn-secondary" onClick={loadData} disabled={loading}>
          <RefreshCw size={14} className={loading ? 'spin' : ''} />
          Refresh Analysis
        </button>
      </div>
      {error ? (
        <div className="network-error" role="alert">
          {error}
        </div>
      ) : null}

      <div className="network-layout">
        <aside className="network-sidebar">
          <div className="sidebar-label">
            Detected Clusters ({data?.network_count || 0} shown / {data?.total_network_count || data?.network_count || 0} total)
          </div>
          <div className="cluster-list">
            {data?.networks?.map((net) => (
              <button 
                key={net.network_id}
                className={`cluster-item ${selectedNetwork?.network_id === net.network_id ? 'active' : ''}`}
                onClick={() => setSelectedNetwork(net)}
              >
                <div className="cluster-id">{net.network_id}</div>
                <div className="cluster-info">
                  <span className="cluster-stats">
                    <Users size={12} /> {net.suspect_count} Suspects
                  </span>
                  <span className="cluster-stats">
                    <AlertTriangle size={12} /> {net.incident_count} Incidents
                  </span>
                  <span className="cluster-stats">
                    Score {Number(net.network_score || 0).toFixed(1)} • Avg risk {Number(net.avg_risk_score || 0).toFixed(1)}
                  </span>
                </div>
                <ChevronRight size={14} className="chevron" />
              </button>
            ))}
          </div>
        </aside>

        <main className="network-details">
          {selectedNetwork ? (
            <div className="network-view animate-fade-in">
              <div className="network-hero">
                  <div className="hero-stats">
                    <div className="stat-card">
                      <label>Threat Score</label>
                      <div className="value">{Number(selectedNetwork.network_score || 0).toFixed(1)}</div>
                    </div>
                    <div className="stat-card">
                      <label>Avg Incident Risk</label>
                      <div className="value">{Number(selectedNetwork.avg_risk_score || 0).toFixed(1)}</div>
                    </div>
                    <div className="stat-card">
                      <label>Link Density</label>
                      <div className="value">{Number(selectedNetwork.edge_density || 0).toFixed(3)}</div>
                    </div>
                  </div>
                </div>

              <div className="network-grid">
                <section className="actors-section">
                  <h3><User size={18} /> Network Actors ({selectedNetwork.actor_count || selectedNetwork.suspect_count || 0})</h3>
                  <div className="actor-list">
                    {(selectedNetwork.actors || selectedNetwork.top_actors || []).map((actor, idx) => (
                      <button
                        type="button"
                        key={`${actor.name || 'actor'}-${actor.incident_count || 0}-${idx}`}
                        className="actor-card actor-card-btn animate-fade-in"
                        style={{ animationDelay: `${idx * 0.05}s` }}
                        onClick={() => loadPersonProfile(actor.name)}
                        title={`View intelligence profile for ${actor.name}`}
                      >
                        <div className="actor-main">
                          <div className="actor-name">{actor.name}</div>
                          <div className="actor-meta">
                            <span>Centrality: {actor.centrality}</span>
                            <span>•</span>
                            <span>{actor.incident_count} Incidents</span>
                          </div>
                        </div>
                        <ChevronRight size={14} className="actor-chevron" />
                        <div className="actor-risk-bar">
                          <div className="bar-fill" style={{ width: `${actor.centrality * 100}%` }}></div>
                        </div>
                      </button>
                    ))}
                    {(!selectedNetwork.actors || selectedNetwork.actors.length === 0) && (!selectedNetwork.top_actors || selectedNetwork.top_actors.length === 0) && (
                      <div className="empty-state">
                        <p>No actor nodes found for this network.</p>
                      </div>
                    )}
                  </div>
                </section>

                <section className="intel-section">
                  <h3><MapPin size={18} /> Operation Areas</h3>
                  <div className="pill-cloud">
                    {selectedNetwork.top_states?.map((s, idx) => (
                      <span key={`${s.state || "state"}-${idx}`} className="location-pill">
                        {s.state} <span className="pill-count">{s.count}</span>
                      </span>
                    ))}
                  </div>

                  <h3 style={{ marginTop: '24px' }}><Briefcase size={18} /> Species Targeted</h3>
                  <div className="pill-cloud">
                    {selectedNetwork.top_species?.map((s, idx) => (
                      <span key={`${s.species || "species"}-${idx}`} className="species-pill">
                        {s.species} <span className="pill-count">{s.count}</span>
                      </span>
                    ))}
                  </div>

                  <h3 style={{ marginTop: '24px' }}><ExternalLink size={18} /> Linked Incidents</h3>
                  <div className="incident-list">
                    {selectedNetwork.linked_incidents?.map((incident, idx) => {
                      const incidentUrl = resolveExternalUrl(incident.url, incident.open_url);
                      const itemContent = (
                        <>
                          <div className="incident-title">{incident.title}</div>
                          <div className="incident-meta">
                            Risk {incident.risk_score} • {incident.state || "Unknown"}{incident.district ? `, ${incident.district}` : ""}
                          </div>
                        </>
                      );
                      const key = incident.id || `${incident.title || "incident"}-${idx}`;
                      if (incidentUrl === "#") {
                        return (
                          <div key={key} className="incident-item incident-item-disabled">
                            {itemContent}
                          </div>
                        );
                      }
                      return (
                        <a key={key} className="incident-item" href={incidentUrl} target="_blank" rel="noopener noreferrer">
                          {itemContent}
                        </a>
                      );
                    })}
                    {(!selectedNetwork.linked_incidents || selectedNetwork.linked_incidents.length === 0) && (
                      <div className="empty-state">
                        <p>No linked incidents found for this network.</p>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <Network size={48} className="faint-icon" />
              <p>Select a cluster to view intelligence details</p>
            </div>
          )}
        </main>
      </div>

      {personProfile && (
        <div className="poi-overlay" onClick={() => setPersonProfile(null)}>
          <div className="poi-modal" onClick={(e) => e.stopPropagation()}>
            <div className="poi-modal-head">
              <div>
                <div className="poi-modal-label"><User size={14} /> Suspect Intelligence Profile</div>
                <h2 className="poi-modal-name">{personProfile.person}</h2>
              </div>
              <button type="button" className="poi-close" onClick={() => setPersonProfile(null)} aria-label="Close">×</button>
            </div>

            {personProfile.loading || personLoading ? (
              <div className="poi-modal-body"><RefreshCw size={20} className="spin" /> Loading profile…</div>
            ) : personProfile.error ? (
              <div className="poi-modal-body poi-error">Unable to load profile for this suspect.</div>
            ) : (
              <div className="poi-modal-body">
                <div className="poi-stat-row">
                  <div className="poi-stat"><label>Linked incidents</label><strong>{personProfile.incident_count || 0}</strong></div>
                  <div className="poi-stat"><label>Known associates</label><strong>{personProfile.connections?.length || 0}</strong></div>
                </div>

                <h3 className="poi-sub"><Users size={15} /> Known Associates</h3>
                {personProfile.connections?.length ? (
                  <div className="poi-assoc-list">
                    {personProfile.connections.slice(0, 20).map((c, i) => (
                      <button
                        type="button"
                        key={`${c.name}-${i}`}
                        className="poi-assoc"
                        onClick={() => loadPersonProfile(c.name)}
                        title={`View ${c.name}`}
                      >
                        <span className="poi-assoc-name">{c.name}</span>
                        <span className="poi-assoc-meta">{c.co_incident_count} shared • {c.incident_count} total</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="poi-empty">No known associates linked.</p>
                )}

                <h3 className="poi-sub"><AlertTriangle size={15} /> Linked Incidents</h3>
                {personProfile.incidents?.length ? (
                  <div className="poi-incident-list">
                    {personProfile.incidents.slice(0, 25).map((inc, i) => {
                      const url = resolveExternalUrl(inc.url, inc.open_url);
                      const body = (
                        <>
                          <div className="poi-inc-title">{inc.title}</div>
                          <div className="poi-inc-meta">Risk {inc.risk_score} • {inc.state || "Unknown"}{inc.district ? `, ${inc.district}` : ""}</div>
                        </>
                      );
                      const key = inc.id || `${inc.title}-${i}`;
                      return url === "#"
                        ? <div key={key} className="poi-inc">{body}</div>
                        : <a key={key} className="poi-inc poi-inc-link" href={url} target="_blank" rel="noopener noreferrer">{body}</a>;
                    })}
                  </div>
                ) : (
                  <p className="poi-empty">No linked incidents found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .network-container {
          padding: 24px;
          color: #1A1917;
        }
        .network-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 24px;
        }
        .header-info {
          display: flex;
          gap: 16px;
          align-items: center;
          min-width: 0;
          flex: 1;
        }
        .header-info > div {
          min-width: 0;
        }
        .header-info h1 {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          overflow-wrap: anywhere;
        }
        .subtitle {
          color: #6B6966;
          font-size: 13px;
          margin: 4px 0 0;
          overflow-wrap: anywhere;
        }
        .network-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 24px;
          height: 600px;
        }
        .network-sidebar {
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(26, 25, 23, 0.08);
          border-radius: 16px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          backdrop-filter: blur(8px);
        }
        .sidebar-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #6B6966;
          font-weight: 600;
          padding-left: 8px;
        }
        .cluster-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow-y: auto;
        }
        .cluster-item {
          display: grid;
          grid-template-columns: 56px minmax(0, 1fr) 20px;
          column-gap: 8px;
          align-items: center;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid transparent;
          background: transparent;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cluster-item:hover {
          background: rgba(193, 127, 89, 0.05);
          border-color: rgba(193, 127, 89, 0.1);
        }
        .cluster-item.active {
          background: #C17F59;
          color: white;
          box-shadow: 0 4px 12px rgba(193, 127, 89, 0.25);
        }
        .cluster-id {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 700;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .cluster-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }
        .cluster-stats {
          font-size: 11px;
          display: flex;
          align-items: center;
          gap: 4px;
          opacity: 0.8;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .network-details {
          background: #FFFFFF;
          border: 1px solid rgba(26, 25, 23, 0.08);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 8px 32px rgba(26, 25, 23, 0.04);
          overflow-y: auto;
          min-width: 0;
        }
        .network-hero {
          background: linear-gradient(135deg, #1A1917 0%, #3D3B38 100%);
          border-radius: 16px;
          padding: 24px;
          color: white;
          margin-bottom: 32px;
        }
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .stat-card label {
          font-size: 11px;
          text-transform: uppercase;
          opacity: 0.6;
          display: block;
          margin-bottom: 4px;
        }
        .stat-card .value {
          font-size: 24px;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
        }
        .network-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
        }
        .network-grid h3 {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .actor-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border-bottom: 1px solid rgba(26, 25, 23, 0.06);
          position: relative;
        }
        .actor-rank {
          font-family: 'JetBrains Mono', monospace;
          color: #C17F59;
          font-weight: 700;
          font-size: 14px;
        }
        .actor-name {
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 2px;
          overflow-wrap: anywhere;
        }
        .actor-meta {
          font-size: 11px;
          color: #6B6966;
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          overflow-wrap: anywhere;
        }
        .actor-risk-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          width: 100%;
          background: rgba(26, 25, 23, 0.03);
        }
        .bar-fill {
          height: 100%;
          background: #C17F59;
          opacity: 0.6;
        }
        .pill-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .location-pill, .species-pill {
          padding: 6px 12px;
          background: rgba(26, 25, 23, 0.04);
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
        }
        .pill-count {
          font-size: 10px;
          opacity: 0.5;
          margin-left: 4px;
        }
        .incident-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .incident-item {
          display: block;
          text-decoration: none;
          color: inherit;
          border: 1px solid rgba(26, 25, 23, 0.08);
          border-radius: 10px;
          padding: 10px 12px;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .incident-item:hover {
          background: rgba(193, 127, 89, 0.06);
          border-color: rgba(193, 127, 89, 0.25);
        }
        .incident-title {
          font-size: 13px;
          font-weight: 600;
          line-height: 1.35;
          margin-bottom: 2px;
          overflow-wrap: anywhere;
        }
        .incident-meta {
          font-size: 11px;
          color: #6B6966;
          overflow-wrap: anywhere;
        }
        .incident-item-disabled {
          opacity: 0.7;
          cursor: default;
        }
        .incident-item-disabled:hover {
          background: #FFFFFF;
          border-color: rgba(26, 25, 23, 0.08);
        }
        .network-error {
          margin: 0 0 16px;
          padding: 10px 12px;
          border: 1px solid rgba(199, 80, 80, 0.2);
          border-radius: 10px;
          background: rgba(199, 80, 80, 0.06);
          color: #A03434;
          font-size: 13px;
        }
        @media (max-width: 1280px) {
          .network-layout {
            grid-template-columns: 1fr;
            height: auto;
          }
          .network-sidebar {
            max-height: 260px;
          }
          .network-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
        @media (max-width: 900px) {
          .network-container {
            padding: 20px;
          }
          .network-details {
            padding: 20px;
          }
          .hero-stats {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
        .spin { animation: rotate 2s linear infinite; }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .actor-card-btn { width: 100%; background: transparent; border: none; border-bottom: 1px solid rgba(26,25,23,0.06); cursor: pointer; text-align: left; gap: 12px; }
        .actor-card-btn:hover { background: rgba(193,127,89,0.05); }
        .actor-chevron { color: #C17F59; flex-shrink: 0; opacity: 0.7; }

        .poi-overlay { position: fixed; inset: 0; background: rgba(26,25,23,0.55); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; backdrop-filter: blur(3px); }
        .poi-modal { background: #fff; border-radius: 18px; max-width: 620px; width: 100%; max-height: 84vh; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 24px 64px rgba(0,0,0,0.25); }
        .poi-modal-head { display: flex; justify-content: space-between; align-items: flex-start; padding: 22px 24px; border-bottom: 1px solid rgba(26,25,23,0.08); }
        .poi-modal-label { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #C17F59; font-weight: 700; }
        .poi-modal-name { margin: 6px 0 0; font-size: 20px; font-weight: 800; color: #0D0C0B; }
        .poi-close { background: none; border: none; font-size: 26px; line-height: 1; color: #6B6966; cursor: pointer; padding: 0 4px; }
        .poi-close:hover { color: #1A1917; }
        .poi-modal-body { padding: 20px 24px; overflow-y: auto; }
        .poi-error { color: #A03434; }
        .poi-stat-row { display: flex; gap: 16px; margin-bottom: 18px; }
        .poi-stat { flex: 1; padding: 12px 14px; background: rgba(26,25,23,0.03); border-radius: 10px; }
        .poi-stat label { display: block; font-size: 11px; text-transform: uppercase; color: #6B6966; margin-bottom: 4px; }
        .poi-stat strong { font-size: 22px; font-weight: 800; color: #0D0C0B; }
        .poi-sub { display: flex; align-items: center; gap: 7px; font-size: 14px; font-weight: 700; margin: 20px 0 12px; color: #1A1917; }
        .poi-assoc-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .poi-assoc { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; padding: 8px 12px; background: rgba(91,123,168,0.08); border: 1px solid rgba(91,123,168,0.18); border-radius: 10px; cursor: pointer; text-align: left; }
        .poi-assoc:hover { background: rgba(91,123,168,0.16); }
        .poi-assoc-name { font-size: 13px; font-weight: 700; color: #1A1917; }
        .poi-assoc-meta { font-size: 10px; color: #6B6966; }
        .poi-incident-list { display: flex; flex-direction: column; gap: 8px; }
        .poi-inc { display: block; text-decoration: none; color: inherit; border: 1px solid rgba(26,25,23,0.08); border-radius: 10px; padding: 10px 12px; }
        .poi-inc-link:hover { background: rgba(193,127,89,0.06); border-color: rgba(193,127,89,0.25); }
        .poi-inc-title { font-size: 13px; font-weight: 600; line-height: 1.35; overflow-wrap: anywhere; }
        .poi-inc-meta { font-size: 11px; color: #6B6966; margin-top: 2px; }
        .poi-empty { font-size: 13px; color: #6B6966; }
      `}} />
    </div>
  );
}
