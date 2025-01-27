"use client";

import { useRouter } from "next/navigation";
import {
  HomeIcon,
  ShoppingCartIcon,
  ChartBarIcon,
  CogIcon,
  PackageSearch,
  MessageCircleCode,
  LogOut
} from "lucide-react";

const Sidebar = () => {
  const navigate = useRouter();

  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
    navigate.push("/login"); // Redirect to login page
  };

  return (
    <div className="w-64 bg-[#f5f5f5] shadow-lg p-6 fixed h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-center mb-8">
          <img
            src={'/logo.svg'}
            alt="Logo"
          />
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate.push("/SellerDashboard")}
                className="flex items-center w-full p-3 font-semibold text-gray-700 hover:bg-[#ffd8b3] rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-1"
              >
                <HomeIcon className="w-5 h-5 mr-3" />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate.push("/product")}
                className="flex items-center w-full p-3 font-semibold text-gray-700 hover:bg-[#ffd8b3] rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-1"
              >
                <PackageSearch className="w-5 h-5 mr-3" />
                <span>Products</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate.push("/Order")}
                className="flex items-center w-full p-3 font-semibold text-gray-700 hover:bg-[#ffd8b3] rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-1"
              >
                <ShoppingCartIcon className="w-5 h-5 mr-3" />
                <span>Orders</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate.push("/Analytics")}
                className="flex items-center w-full p-3 font-semibold text-gray-700 hover:bg-[#ffd8b3] rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-1"
              >
                <ChartBarIcon className="w-5 h-5 mr-3" />
                <span>Analytics</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate.push("/CustomerReview")}
                className="flex items-center w-full p-3 font-semibold text-gray-700 hover:bg-[#ffd8b3] rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-1"
              >
                <MessageCircleCode className="w-5 h-5 mr-3" />
                <span>Customer Review</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate.push("/Setting")}
                className="flex items-center w-full p-3 font-semibold text-gray-700 hover:bg-[#ffd8b3] rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-1"
              >
                <CogIcon className="w-5 h-5 mr-3" />
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom Section: Logout Button */}
      <div>
        <button
          onClick={handleLogout}
          className="flex justify-center items-center gap-4 w-full p-3 font-semibold text-gray-700 bg-[#ffe5c9d9] shadow-slate-700 shadow-2xl backdrop-blur-sm border border-[rgba(255,255,255,0.3)] rounded-lg transition-all duration-200 hover:bg-[rgba(255,0,0,0.3)] hover:shadow-lg hover:-translate-y-1 active:scale-95 active:shadow-inner"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;