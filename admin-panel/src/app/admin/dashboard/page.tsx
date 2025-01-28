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

export default function DashboardPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <div className="w-full md:w-[16rem] lg:w-[16rem] bg-gray-800 text-white">
          <Sidebar />
        </div>
      </div>
    </>
  );
}
