"use client";

import { useState } from 'react';
import Sidebar from '@/layout/sidebar';
import {
  ShoppingCartIcon,
  IndianRupeeIcon,
  PackageSearch,
  ChartBarIcon,
} from 'lucide-react';

const DashboardPage = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <div className="w-full md:w-[16rem] lg:w-[16rem] bg-gray-800 text-white">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-50">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Sales Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-50 rounded-full">
                  <IndianRupeeIcon className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Total Sales</h3>
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
                  <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
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
                  <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
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
                  <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
                  <p className="text-2xl font-bold text-gray-900">$9,876</p>
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