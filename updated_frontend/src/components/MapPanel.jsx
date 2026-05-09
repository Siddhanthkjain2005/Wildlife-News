import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
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
        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
          maxZoom: 12,
          attribution: "&copy; CARTO"
        }).addTo(mapRef.current);
        layerRef.current = L.layerGroup().addTo(mapRef.current);
      }

      const layer = layerRef.current;
      if (!layer) return;
      layer.clearLayers();

      (mapData.markers || []).slice(0, 600).forEach((item) => {
        if (typeof item.lat !== "number" || typeof item.lng !== "number") return;
        const severity = riskLevel(item.risk_score);
        const color = severity === "high" ? "#EF4444" : severity === "medium" ? "#F59E0B" : "#22C55E";
        const marker = L.circleMarker([item.lat, item.lng], {
          radius: severity === "high" ? 8 : severity === "medium" ? 7 : 6,
          color,
          fillColor: color,
          fillOpacity: 0.85,
          weight: 2
        });
        const title = (item.title || "Incident").replace(/</g, "&lt;");
        const articleHref = resolveExternalUrl(item.open_url, item.url).replace(/"/g, "&quot;");
        marker.bindPopup(
          `<div style="min-width:240px;font-family:Inter,sans-serif;background:#232327;padding:14px;border-radius:10px">
            <b style="font-size:14px;color:#FAFAFA;display:block;margin-bottom:8px">${title}</b>
            <div style="color:#A1A1AA;font-size:12px">${item.state || "-"} · ${item.district || "-"}</div>
            <div style="margin-top:8px;font-size:13px;color:#FAFAFA">Risk <b style="color:${color}">${Number(item.risk_score || 0)}</b> · ${item.species || "—"}</div>
            <a href="${articleHref}" target="_blank" rel="noopener" style="display:inline-block;margin-top:12px;color:#3B82F6;font-weight:500;font-size:13px">Open article →</a>
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
    <div className="map-wrap">
      <div className="map-container" ref={nodeRef} />
    </div>
  );
}
