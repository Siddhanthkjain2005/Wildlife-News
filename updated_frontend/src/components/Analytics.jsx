import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Activity, BarChart3, PieChart, ShieldCheck } from "lucide-react";

const AXIS_COLOR = "#64748b";
const GRID_COLOR = "rgba(148, 163, 184, 0.08)";
const LEGEND_COLOR = "#94a3b8";

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  plugins: {
    legend: {
      labels: {
        color: LEGEND_COLOR,
        font: { family: "Inter, sans-serif", size: 11, weight: "500" },
        usePointStyle: true,
        boxWidth: 8,
        padding: 14
      }
    },
    tooltip: {
      backgroundColor: "#0b101c",
      borderColor: "rgba(148, 163, 184, 0.2)",
      borderWidth: 1,
      titleColor: "#f1f5f9",
      bodyColor: "#cbd5e1",
      padding: 10,
      boxPadding: 4,
      cornerRadius: 8,
      titleFont: { family: "Inter, sans-serif", size: 12, weight: "600" },
      bodyFont: { family: "JetBrains Mono, monospace", size: 11 }
    }
  },
  scales: {
    x: {
      ticks: { color: AXIS_COLOR, font: { family: "Inter, sans-serif", size: 10 } },
      grid: { color: GRID_COLOR, drawBorder: false },
      border: { display: false }
    },
    y: {
      ticks: { color: AXIS_COLOR, font: { family: "JetBrains Mono, monospace", size: 10 } },
      grid: { color: GRID_COLOR, drawBorder: false },
      border: { display: false }
    }
  }
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "62%",
  plugins: {
    legend: {
      position: "right",
      labels: {
        color: LEGEND_COLOR,
        font: { family: "Inter, sans-serif", size: 11 },
        usePointStyle: true,
        boxWidth: 8,
        padding: 10
      }
    },
    tooltip: baseOptions.plugins.tooltip
  }
};

export default function Analytics({ chartData }) {
  const timeline = chartData?.timeline || { labels: [], incidents: [], high_risk: [], granularity: "daily" };
  const topStates = chartData?.top_states || [];
  const speciesDist = chartData?.species_distribution || [];
  const sourceRank = chartData?.source_rankings || [];

  const timelineChart = {
    labels: timeline.labels,
    datasets: [
      {
        label: "Incidents",
        data: timeline.incidents,
        borderColor: "#10b981",
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return "rgba(16, 185, 129, 0.15)";
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(16, 185, 129, 0.25)");
          gradient.addColorStop(1, "rgba(16, 185, 129, 0)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: "#10b981"
      },
      {
        label: "High Risk",
        data: timeline.high_risk,
        borderColor: "#ef4444",
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return "rgba(239, 68, 68, 0.12)";
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(239, 68, 68, 0.22)");
          gradient.addColorStop(1, "rgba(239, 68, 68, 0)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: "#ef4444"
      }
    ]
  };

  const stateChart = {
    labels: topStates.map((x) => x.state),
    datasets: [
      {
        label: "Incidents",
        data: topStates.map((x) => x.count),
        backgroundColor: "rgba(16, 185, 129, 0.7)",
        hoverBackgroundColor: "#10b981",
        borderRadius: 4,
        borderSkipped: false,
        barThickness: 14
      }
    ]
  };

  const speciesColors = [
    "#10b981", "#34d399", "#f59e0b", "#ef4444", "#3b82f6",
    "#8b5cf6", "#06b6d4", "#f97316", "#ec4899", "#64748b"
  ];
  const speciesChart = {
    labels: speciesDist.slice(0, 10).map((x) => x.species),
    datasets: [
      {
        data: speciesDist.slice(0, 10).map((x) => x.count),
        backgroundColor: speciesColors,
        borderColor: "#0b101c",
        borderWidth: 2,
        hoverOffset: 6
      }
    ]
  };

  const sourceChart = {
    labels: sourceRank.slice(0, 10).map((x) => x.source),
    datasets: [
      {
        label: "Reliability",
        data: sourceRank.slice(0, 10).map((x) => Number(x.reliability_score || 0)),
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        hoverBackgroundColor: "#3b82f6",
        borderRadius: 4,
        borderSkipped: false,
        barThickness: 12
      }
    ]
  };

  const horizontalOptions = {
    ...baseOptions,
    indexAxis: "y",
    scales: {
      ...baseOptions.scales,
      y: {
        ...baseOptions.scales.y,
        ticks: { color: AXIS_COLOR, font: { family: "Inter, sans-serif", size: 10 } }
      }
    }
  };

  return (
    <div className="charts-grid" id="section-analytics">
      <article className="card chart-card">
        <div className="card-head">
          <div className="card-head-left">
            <Activity size={16} className="card-head-icon" />
            <h2>Incident Timeline</h2>
          </div>
          <span className="badge">{timeline.granularity || "daily"}</span>
        </div>
        <div className="card-body">
          <div className="chart-wrap">
            <Line data={timelineChart} options={baseOptions} />
          </div>
        </div>
      </article>

      <article className="card chart-card">
        <div className="card-head">
          <div className="card-head-left">
            <BarChart3 size={16} className="card-head-icon" />
            <h2>Top States</h2>
          </div>
          <span className="card-count mono">{topStates.length}</span>
        </div>
        <div className="card-body">
          <div className="chart-wrap">
            <Bar data={stateChart} options={baseOptions} />
          </div>
        </div>
      </article>

      <article className="card chart-card">
        <div className="card-head">
          <div className="card-head-left">
            <PieChart size={16} className="card-head-icon" />
            <h2>Species Distribution</h2>
          </div>
          <span className="card-count mono">{speciesDist.length}</span>
        </div>
        <div className="card-body">
          <div className="chart-wrap">
            <Doughnut data={speciesChart} options={doughnutOptions} />
          </div>
        </div>
      </article>

      <article className="card chart-card">
        <div className="card-head">
          <div className="card-head-left">
            <ShieldCheck size={16} className="card-head-icon" />
            <h2>Source Reliability</h2>
          </div>
          <span className="card-count mono">{sourceRank.length}</span>
        </div>
        <div className="card-body">
          <div className="chart-wrap">
            <Bar data={sourceChart} options={horizontalOptions} />
          </div>
        </div>
      </article>
    </div>
  );
}
