import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPinned } from "lucide-react";
import { riskLevel } from "../lib/format.js";
import { resolveExternalUrl } from "../lib/api.js";

export default function MapPanel({ mapData, onMapError }) {
  const nodeRef = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    if (!nodeRef.current || !mapData) return;

    try {
      if (!mapRef.current) {
        mapRef.current = L.map(nodeRef.current, { zoomControl: true, attributionControl: true }).setView(
          [mapData.center?.lat || 22.97, mapData.center?.lng || 78.65],
          5
        );
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 12,
          attribution: "&copy; OpenStreetMap contributors"
        }).addTo(mapRef.current);
        layerRef.current = L.layerGroup().addTo(mapRef.current);
      }

      const layer = layerRef.current;
      if (!layer) return;
      layer.clearLayers();

      (mapData.markers || []).slice(0, 600).forEach((item) => {
        if (typeof item.lat !== "number" || typeof item.lng !== "number") return;
        const severity = riskLevel(item.risk_score);
        const color = severity === "high" ? "#ef4444" : severity === "medium" ? "#f59e0b" : "#10b981";
        const marker = L.circleMarker([item.lat, item.lng], {
          radius: severity === "high" ? 7 : severity === "medium" ? 6 : 5,
          color,
          fillColor: color,
          fillOpacity: 0.7,
          weight: 1.5
        });
        const title = (item.title || "Incident").replace(/</g, "&lt;");
        const articleHref = resolveExternalUrl(item.open_url, item.url).replace(/"/g, "&quot;");
        marker.bindPopup(
          `<div style="min-width:220px">
            <b>${title}</b>
            <div style="margin-top:4px;color:#94a3b8;font-size:11px">${item.state || "-"} · ${item.district || "-"}</div>
            <div style="margin-top:6px;font-size:12px">Risk <b style="color:${color}">${Number(item.risk_score || 0)}</b> · ${item.species || "—"}</div>
            <a href="${articleHref}" target="_blank" rel="noopener" style="display:inline-block;margin-top:8px;color:#34d399">Open article →</a>
          </div>`
        );
        marker.addTo(layer);
      });
    } catch (err) {
      console.error("Map rendering failed:", err);
      onMapError?.("Map failed to render on this browser. Use legacy view as fallback.");
    }
  }, [mapData, onMapError]);

  const count = mapData?.markers?.length || 0;

  return (
    <article className="card map-card" id="section-map">
      <div className="card-head">
        <div className="card-head-left">
          <MapPinned size={16} className="card-head-icon" />
          <h2>National Threat Map</h2>
        </div>
        <span className="card-count mono">{count} markers</span>
      </div>
      <div className="card-body-flush" style={{ position: "relative", minHeight: 460 }}>
        <div className="map-surface" ref={nodeRef} />
      </div>
      <div className="map-legend">
        <span className="legend-dot high">High risk</span>
        <span className="legend-dot medium">Medium</span>
        <span className="legend-dot low">Low</span>
        <span style={{ marginLeft: "auto", color: "var(--dim)" }}>Tap a marker for details</span>
      </div>
    </article>
  );
}
