import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Activity, BarChart3, PieChart, ShieldCheck } from "lucide-react";

const AXIS_COLOR = "#71717A";
const GRID_COLOR = "rgba(255, 255, 255, 0.06)";
const LEGEND_COLOR = "#A1A1AA";

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
      backgroundColor: "#232327",
      borderColor: "rgba(255, 255, 255, 0.1)",
      borderWidth: 1,
      titleColor: "#FAFAFA",
      bodyColor: "#A1A1AA",
      padding: 12,
      boxPadding: 6,
      cornerRadius: 10,
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
  cutout: "65%",
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
        borderColor: "#3B82F6",
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return "rgba(59, 130, 246, 0.1)";
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.25)");
          gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#3B82F6"
      },
      {
        label: "High Risk",
        data: timeline.high_risk,
        borderColor: "#EF4444",
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return "rgba(239, 68, 68, 0.08)";
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(239, 68, 68, 0.2)");
          gradient.addColorStop(1, "rgba(239, 68, 68, 0)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#EF4444"
      }
    ]
  };

  const stateChart = {
    labels: topStates.map((x) => x.state),
    datasets: [
      {
        label: "Incidents",
        data: topStates.map((x) => x.count),
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        hoverBackgroundColor: "#60A5FA",
        borderRadius: 4,
        borderSkipped: false,
        barThickness: 18
      }
    ]
  };

  const speciesColors = [
    "#3B82F6", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6",
    "#06B6D4", "#EC4899", "#F97316", "#14B8A6", "#6366F1"
  ];
  const speciesChart = {
    labels: speciesDist.slice(0, 10).map((x) => x.species),
    datasets: [
      {
        data: speciesDist.slice(0, 10).map((x) => x.count),
        backgroundColor: speciesColors,
        borderColor: "#111113",
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
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        hoverBackgroundColor: "#22C55E",
        borderRadius: 4,
        borderSkipped: false,
        barThickness: 16
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
