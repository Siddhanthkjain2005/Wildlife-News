import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Activity, BarChart3, PieChart, ShieldCheck } from "lucide-react";

const AXIS_COLOR = "#6B6966";
const GRID_COLOR = "rgba(26, 25, 23, 0.06)";
const LEGEND_COLOR = "#6B6966";

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
      backgroundColor: "#FFFFFF",
      borderColor: "rgba(26, 25, 23, 0.12)",
      borderWidth: 1,
      titleColor: "#1A1917",
      bodyColor: "#6B6966",
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
        borderColor: "#C17F59",
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return "rgba(193, 127, 89, 0.12)";
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(193, 127, 89, 0.2)");
          gradient.addColorStop(1, "rgba(193, 127, 89, 0)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#C17F59"
      },
      {
        label: "High Risk",
        data: timeline.high_risk,
        borderColor: "#C75050",
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return "rgba(199, 80, 80, 0.1)";
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(199, 80, 80, 0.18)");
          gradient.addColorStop(1, "rgba(199, 80, 80, 0)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#C75050"
      }
    ]
  };

  const stateChart = {
    labels: topStates.map((x) => x.state),
    datasets: [
      {
        label: "Incidents",
        data: topStates.map((x) => x.count),
        backgroundColor: "rgba(193, 127, 89, 0.75)",
        hoverBackgroundColor: "#C17F59",
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 16
      }
    ]
  };

  const speciesColors = [
    "#C17F59", "#D4956F", "#C9933D", "#C75050", "#5B7BA8",
    "#5A9E6F", "#8B7355", "#A67B5B", "#9C7B56", "#7D7471"
  ];
  const speciesChart = {
    labels: speciesDist.slice(0, 10).map((x) => x.species),
    datasets: [
      {
        data: speciesDist.slice(0, 10).map((x) => x.count),
        backgroundColor: speciesColors,
        borderColor: "#FFFFFF",
        borderWidth: 3,
        hoverOffset: 8
      }
    ]
  };

  const sourceChart = {
    labels: sourceRank.slice(0, 10).map((x) => x.source),
    datasets: [
      {
        label: "Reliability",
        data: sourceRank.slice(0, 10).map((x) => Number(x.reliability_score || 0)),
        backgroundColor: "rgba(91, 123, 168, 0.75)",
        hoverBackgroundColor: "#5B7BA8",
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
