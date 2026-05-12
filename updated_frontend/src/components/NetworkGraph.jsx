import React, { useState, useEffect } from 'react';
import { Network, Users, MapPin, AlertTriangle, ChevronRight, User, Briefcase, ExternalLink, RefreshCw } from 'lucide-react';
import { fetchJson, ENDPOINTS } from '../lib/api';

export default function NetworkGraph() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({ limit: "10000", min_size: "2", incident_limit: "10000" });
      const result = await fetchJson(`${ENDPOINTS.graphNetworks}?${query.toString()}`);
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
      setError("Failed to load intelligence networks.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading && !data) {
    return (
      <div className="network-loading">
        <RefreshCw size={24} className="spin" />
        <p>Analyzing criminal networks...</p>
      </div>
    );
  }

  return (
    <div className="network-container" id="section-networks">
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
        <button className="btn-secondary" onClick={loadData}>
          <RefreshCw size={14} className={loading ? 'spin' : ''} />
          Refresh Analysis
        </button>
      </div>

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
                      <div key={idx} className="actor-card animate-fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
                        <div className="actor-main">
                          <div className="actor-name">{actor.name}</div>
                          <div className="actor-meta">
                            <span>Centrality: {actor.centrality}</span>
                            <span>•</span>
                            <span>{actor.incident_count} Incidents</span>
                          </div>
                        </div>
                        <div className="actor-risk-bar">
                          <div className="bar-fill" style={{ width: `${actor.centrality * 100}%` }}></div>
                        </div>
                      </div>
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
                      <span key={idx} className="location-pill">
                        {s.state} <span className="pill-count">{s.count}</span>
                      </span>
                    ))}
                  </div>

                  <h3 style={{ marginTop: '24px' }}><Briefcase size={18} /> Species Targeted</h3>
                  <div className="pill-cloud">
                    {selectedNetwork.top_species?.map((s, idx) => (
                      <span key={idx} className="species-pill">
                        {s.species} <span className="pill-count">{s.count}</span>
                      </span>
                    ))}
                  </div>

                  <h3 style={{ marginTop: '24px' }}><ExternalLink size={18} /> Linked Incidents</h3>
                  <div className="incident-list">
                    {selectedNetwork.linked_incidents?.map((incident) => (
                      <a key={incident.id} className="incident-item" href={incident.open_url || '#'} target="_blank" rel="noopener noreferrer">
                        <div className="incident-title">{incident.title}</div>
                        <div className="incident-meta">
                          Risk {incident.risk_score} • {incident.state || "Unknown"}{incident.district ? `, ${incident.district}` : ""}
                        </div>
                      </a>
                    ))}
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

      <style dangerouslySetInnerHTML={{ __html: `
        .network-container {
          padding: 24px;
          color: #1A1917;
        }
        .network-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .header-info {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .header-info h1 {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
        }
        .subtitle {
          color: #6B6966;
          font-size: 13px;
          margin: 4px 0 0;
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
          grid-template-columns: 40px 1fr 20px;
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
        }
        .cluster-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .cluster-stats {
          font-size: 11px;
          display: flex;
          align-items: center;
          gap: 4px;
          opacity: 0.8;
        }
        .network-details {
          background: #FFFFFF;
          border: 1px solid rgba(26, 25, 23, 0.08);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 8px 32px rgba(26, 25, 23, 0.04);
          overflow-y: auto;
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
        }
        .actor-meta {
          font-size: 11px;
          color: #6B6966;
          display: flex;
          gap: 6px;
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
        }
        .incident-meta {
          font-size: 11px;
          color: #6B6966;
        }
        .spin { animation: rotate 2s linear infinite; }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
}
