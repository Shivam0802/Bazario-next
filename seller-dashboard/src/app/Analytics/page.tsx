"use client";

import Sidebar from "@/layout/sidebar";
import { ChartBarIcon } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
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
} from 'chart.js';

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

const Page = () => {
  // Data for the Line Chart (Sales Performance)
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Sales',
        data: [5000, 7000, 4500, 8000, 6000, 9000, 10000],
        borderColor: 'rgba(99, 102, 241, 1)', // Indigo
        backgroundColor: 'rgba(99, 102, 241, 0.2)', // Light Indigo
        borderWidth: 2,
        tension: 0.4, // Smooth line
      },
    ],
  };

  // Data for the Bar Chart (Performance Metrics)
  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Performance',
        data: [80, 85, 70, 90, 95, 88, 92],
        backgroundColor: 'rgba(16, 185, 129, 0.6)', // Green
        borderColor: 'rgba(16, 185, 129, 1)', // Dark Green
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Data',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-[16rem] lg:w-[16rem] bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Analytics</h2>
          <ChartBarIcon className="w-8 h-8 text-gray-500" />
        </div>

        {/* Chart Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Sales Performance</h3>
            <div className="h-96">
              <Line data={salesData} options={chartOptions} />
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Performance Metrics</h3>
            <div className="h-96">
              <Bar data={performanceData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Sales */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700">Total Sales</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">$12,345</p>
          </div>

          {/* Total Orders */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">456</p>
          </div>

          {/* Total Revenue */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">$9,876</p>
          </div>

          {/* Conversion Rate */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700">Conversion Rate</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">12.5%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;