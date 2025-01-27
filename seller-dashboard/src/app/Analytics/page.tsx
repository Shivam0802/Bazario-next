"use client";

import Sidebar from "@/layout/sidebar";
import Analytics from "@/component/Analytics";
import { ChartBarIcon } from "lucide-react";

const Page = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-[16rem] lg:w-[16rem] bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-[#fff5eb]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Analytics</h2>
          <ChartBarIcon className="w-8 h-8 text-gray-500" />
        </div>
        <Analytics />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Sales */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700">Total Sales</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">$12,345</p>
          </div>

          {/* Total Orders */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700">
              Total Orders
            </h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">456</p>
          </div>

          {/* Total Revenue */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700">
              Total Revenue
            </h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">$9,876</p>
          </div>

          {/* Conversion Rate */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700">
              Conversion Rate
            </h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">12.5%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
