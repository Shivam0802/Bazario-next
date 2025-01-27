"use client";

import { useState } from "react";
import Sidebar from "@/layout/sidebar";
import {
  ShoppingCartIcon,
  IndianRupeeIcon,
  PackageSearch,
  ChartBarIcon,
  UsersIcon,
  StarIcon,
  ClockIcon,
} from "lucide-react";
import Analytics from "@/component/Analytics";

const DashboardPage = () => {
  // Dummy data for recent orders and top-selling products
  const recentOrders = [
    { id: 1, customer: "John Doe", amount: "$120", status: "Delivered" },
    { id: 2, customer: "Jane Smith", amount: "$250", status: "Processing" },
    { id: 3, customer: "Alice Johnson", amount: "$80", status: "Cancelled" },
    { id: 4, customer: "Bob Brown", amount: "$300", status: "Delivered" },
  ];

  const topSellingProducts = [
    { id: 1, name: "Wireless Earbuds", sales: 120 },
    { id: 2, name: "Smartwatch Pro", sales: 95 },
    { id: 3, name: "Noise-Canceling Headphones", sales: 80 },
    { id: 4, name: "Gaming Keyboard", sales: 60 },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <div className="w-full md:w-[16rem] lg:w-[16rem] bg-gray-800 text-white">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-[#fff5eb]">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Dashboard Overview
          </h2>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Sales Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-50 rounded-full">
                  <IndianRupeeIcon className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Total Sales
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">$12,345</p>
                </div>
              </div>
            </div>

            {/* Total Orders Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-50 rounded-full">
                  <ShoppingCartIcon className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Total Orders
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">456</p>
                </div>
              </div>
            </div>

            {/* Total Products Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-50 rounded-full">
                  <PackageSearch className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Total Products
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">78</p>
                </div>
              </div>
            </div>

            {/* Total Revenue Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-50 rounded-full">
                  <ChartBarIcon className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Total Revenue
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">$9,876</p>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="mt-6">
            <Analytics />
          </div>

          {/* Additional Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Recent Orders Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Orders
              </h3>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-700">
                        {order.customer}
                      </p>
                      <p className="text-sm text-gray-500">{order.amount}</p>
                    </div>
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Processing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Selling Products Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Top Selling Products
              </h3>
              <div className="space-y-4">
                {topSellingProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <p className="font-medium text-gray-700">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} sales</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Feedback Section */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Customer Feedback
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feedback Card 1 */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <UsersIcon className="w-6 h-6 text-purple-500" />
                  <p className="font-medium text-gray-700">John Doe</p>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  "Great product! The quality is amazing."
                </p>
                <div className="mt-3 flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                    />
                  ))}
                </div>
              </div>

              {/* Feedback Card 2 */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <UsersIcon className="w-6 h-6 text-purple-500" />
                  <p className="font-medium text-gray-700">Jane Smith</p>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  "Fast delivery and excellent customer service."
                </p>
                <div className="mt-3 flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                    />
                  ))}
                </div>
              </div>

              {/* Feedback Card 3 */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <UsersIcon className="w-6 h-6 text-purple-500" />
                  <p className="font-medium text-gray-700">Alice Johnson</p>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  "Highly recommended! Will buy again."
                </p>
                <div className="mt-3 flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;