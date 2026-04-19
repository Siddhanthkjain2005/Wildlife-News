import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error instanceof Error ? error.message : "Unknown runtime error" };
  }

  componentDidCatch(error) {
    console.error("Dashboard runtime error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "24px", color: "#e8edff", fontFamily: "Inter, sans-serif" }}>
          <h2 style={{ marginTop: 0 }}>Dashboard failed to load</h2>
          <p style={{ opacity: 0.9 }}>
            {this.state.message || "Unexpected client error."}
          </p>
          <p style={{ opacity: 0.8 }}>
            Open <a href="/legacy?legacy=1" style={{ color: "#9ec2ff" }}>legacy dashboard</a> while this is being fixed.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootNode = document.getElementById("root");
if (rootNode) {
  window.addEventListener("error", (event) => {
    console.error("Window error:", event.error || event.message);
  });
  window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled promise rejection:", event.reason);
  });
  try {
    window.__WILDLIFE_DASHBOARD_BOOTED__ = true;
    createRoot(rootNode).render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
  } catch (error) {
    console.error("Fatal dashboard bootstrap error:", error);
    rootNode.innerHTML = `
      <div style="padding:24px;color:#e8edff;font-family:Inter,sans-serif">
        <h2 style="margin-top:0">Dashboard failed to initialize</h2>
        <p>${error instanceof Error ? error.message : "Unknown bootstrap error"}</p>
        <p><a href="/legacy?legacy=1" style="color:#9ec2ff">Open legacy dashboard</a></p>
      </div>
    `;
  }
}
