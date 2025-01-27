import React from "react";
import { ChartBarIcon } from "lucide-react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Sales",
        data: [5000, 7000, 4500, 8000, 6000, 9000, 10000],
        borderColor: "rgba(99, 102, 241, 1)", // Indigo
        backgroundColor: "rgba(99, 102, 241, 0.2)", // Light Indigo
        borderWidth: 2,
        tension: 0.4, // Smooth line
      },
    ],
  };

  // Data for the Bar Chart (Performance Metrics)
  const performanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Performance",
        data: [80, 85, 70, 90, 95, 88, 92],
        backgroundColor: "rgba(16, 185, 129, 0.6)", // Green
        borderColor: "rgba(16, 185, 129, 1)", // Dark Green
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Data",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      {/* Chart Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Sales Performance
          </h3>
          <div className="h-96">
            <Line data={salesData} options={chartOptions} />
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Performance Metrics
          </h3>
          <div className="h-96">
            <Bar data={performanceData} options={chartOptions} />
          </div>
        </div>
      </div>
    </>
  );
}
