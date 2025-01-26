"use client";

import Sidebar from "@/layout/sidebar";
import { EyeIcon, TruckIcon, CheckCircleIcon, ClockIcon } from 'lucide-react';
import { JSX } from 'react';

const Page = () => {
  const orders = [
    { id: 1, customer: 'John Doe', total: 100, status: 'Pending' },
    { id: 2, customer: 'Jane Smith', total: 200, status: 'Shipped' },
    { id: 3, customer: 'Alice Johnson', total: 300, status: 'Delivered' },
  ];

  // Function to get status color and icon
  interface Order {
    id: number;
    customer: string;
    total: number;
    status: string;
  }

  interface StatusDetails {
    color: string;
    icon: JSX.Element;
  }

  const getStatusDetails = (status: string): StatusDetails => {
    switch (status) {
      case 'Pending':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: <ClockIcon className="w-4 h-4 mr-2" />,
        };
      case 'Shipped':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: <TruckIcon className="w-4 h-4 mr-2" />,
        };
      case 'Delivered':
        return {
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircleIcon className="w-4 h-4 mr-2" />,
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: <ClockIcon className="w-4 h-4 mr-2" />,
        };
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-[16rem] lg:w-[16rem] bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Orders</h2>
        <div className="overflow-x-auto">
          <div className="bg-white rounded-lg shadow-lg border border-gray-100">
            {/* Table Header */}
            <div className="bg-gray-50 rounded-t-lg">
              <div className="grid grid-cols-5 p-4 text-sm font-semibold text-gray-600">
                <div>ID</div>
                <div>Customer</div>
                <div>Total</div>
                <div>Status</div>
                <div>Actions</div>
              </div>
            </div>


            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {orders.map((order) => {
                const statusDetails = getStatusDetails(order.status);
                return (
                  <div
                    key={order.id}
                    className="grid grid-cols-5 p-4 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200"
                  >
                    <div>{order.id}</div>
                    <div>{order.customer}</div>
                    <div>${order.total}</div>
                    <div>
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusDetails.color}`}
                      >
                        {statusDetails.icon}
                        {order.status}
                      </div>
                    </div>
                    <div>
                      <button className="flex items-center text-cyan-500 hover:text-cyan-600">
                        <EyeIcon className="w-5 h-5 mr-2" />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;