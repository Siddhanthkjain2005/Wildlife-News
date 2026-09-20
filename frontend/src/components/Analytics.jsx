import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Activity, BarChart3, PieChart, ShieldCheck } from "lucide-react";

const AXIS_COLOR = "#8CA2C8";
const GRID_COLOR = "rgba(148, 178, 235, 0.08)";
const LEGEND_COLOR = "#8CA2C8";

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
      backgroundColor: "rgba(10, 17, 32, 0.96)",
      borderColor: "rgba(240, 150, 75, 0.35)",
      borderWidth: 1,
      titleColor: "#F4F8FF",
      bodyColor: "#D7E3F8",
      padding: 12,
      boxPadding: 6,
      cornerRadius: 12,
      titleFont: { family: "Inter, sans-serif", size: 13, weight: "600" },
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
  const timeline = chartData?.timeline || { labels: [], incidents: [], high_risk: [], granularity: "monthly" };
  const topStates = chartData?.top_states || [];
  const speciesDist = chartData?.species_dist || chartData?.species_distribution || [];
  const sourceRank = chartData?.source_rank || chartData?.source_rankings || [];

  const timelineChart = {
    labels: timeline.labels,
    datasets: [
      {
        label: "Incidents",
        data: timeline.incidents,
        borderColor: "#F0964B",
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return "rgba(240, 150, 75, 0.12)";
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(240, 150, 75, 0.28)");
          gradient.addColorStop(1, "rgba(240, 150, 75, 0)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#FFB374"
      },
      {
        label: "High Risk",
        data: timeline.high_risk,
        borderColor: "#FF6B6B",
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return "rgba(255, 107, 107, 0.1)";
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(255, 107, 107, 0.22)");
          gradient.addColorStop(1, "rgba(255, 107, 107, 0)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#FF6B6B"
      }
    ]
  };

  const stateChart = {
    labels: topStates.map((x) => x.state),
    datasets: [
      {
        label: "Incidents",
        data: topStates.map((x) => x.count),
        backgroundColor: "rgba(240, 150, 75, 0.65)",
        hoverBackgroundColor: "#F0964B",
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 16
      }
    ]
  };

  const speciesColors = [
    "#F0964B", "#FFB374", "#FFC24D", "#FF6B6B", "#6FA8FF",
    "#4ADE9C", "#A78BFA", "#22D3EE", "#F472B6", "#94A3B8"
  ];
  const speciesChart = {
    labels: speciesDist.slice(0, 10).map((x) => x.species),
    datasets: [
      {
        data: speciesDist.slice(0, 10).map((x) => x.count),
        backgroundColor: speciesColors,
        borderColor: "#0D1526",
        borderWidth: 3,
        hoverOffset: 12
      }
    ]
  };

  const sourceChart = {
    labels: sourceRank.slice(0, 10).map((x) => x.source),
    datasets: [
      {
        label: "Reliability",
        data: sourceRank.slice(0, 10).map((x) => Number(x.reliability_score || 0)),
        backgroundColor: "rgba(111, 168, 255, 0.65)",
        hoverBackgroundColor: "#6FA8FF",
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 14
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
