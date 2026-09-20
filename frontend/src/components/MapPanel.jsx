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
        const color = severity === "high" ? "#FF6B6B" : severity === "medium" ? "#FFC24D" : "#4ADE9C";
        const marker = L.circleMarker([item.lat, item.lng], {
          radius: severity === "high" ? 8 : severity === "medium" ? 7 : 6,
          color,
          fillColor: color,
          fillOpacity: 0.8,
          weight: 2
        });
        const title = (item.title || "Incident").replace(/</g, "&lt;");
        const articleHref = resolveExternalUrl(item.open_url, item.url).replace(/"/g, "&quot;");
        marker.bindPopup(
          `<div style="min-width:240px;font-family:Inter,sans-serif">
            <b style="font-size:14px;color:#F4F8FF">${title}</b>
            <div style="margin-top:6px;color:#8CA2C8;font-size:12px">${item.state || "-"} · ${item.district || "-"}</div>
            <div style="margin-top:8px;font-size:13px;color:#D7E3F8">Risk <b style="color:${color}">${Number(item.risk_score || 0)}</b> · ${item.species || "—"}</div>
            <a href="${articleHref}" target="_blank" rel="noopener" style="display:inline-block;margin-top:10px;color:#FFB374;font-weight:500">Open article →</a>
          </div>`
        );
        // Pulsing halo ring for high-risk markers (pure Leaflet, no deps)
        if (severity === "high") {
          L.circleMarker([item.lat, item.lng], {
            radius: 16,
            color: "#FF6B6B",
            weight: 1,
            opacity: 0.55,
            fill: false,
            interactive: false
          }).addTo(layer);
        }
        marker.addTo(layer);
      });
    } catch (err) {
      console.error("Map rendering failed:", err);
      onMapError?.("Map failed to render on this browser. Use legacy view as fallback.");
    }
  }, [mapData, onMapError]);

  useEffect(() => () => {
    mapRef.current?.remove();
    mapRef.current = null;
    layerRef.current = null;
  }, []);

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
      <div className="card-body-flush" style={{ position: "relative", minHeight: 400 }}>
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
