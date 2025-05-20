"use client";

import { JSX, useEffect, useState } from "react";
import Sidebar from "@/layout/sidebar";
import { EyeIcon, TruckIcon, CheckCircleIcon, ClockIcon } from "lucide-react";
import cookies from "js-cookie";
import { getAllOrders } from "@/services/order.service";
import { jwtDecode } from "jwt-decode";

interface Order {
  _id: string;
  buyerEmail: string;
  buyerName: string;
  imageUrl: string[];
  createdAt: string;
  paymentMethod: string;
  productId: string;
  productName: string;
  quantity: number;
  shippingAddress: string;
  status: string;
  totalAmount: number;
}

interface StatusDetails {
  color: string;
  icon: JSX.Element;
}

const Page = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getStatusDetails = (status: string): StatusDetails => {
    switch (status) {
      case "Pending":
        return {
          color: "bg-yellow-100 text-yellow-800",
          icon: <ClockIcon className="w-4 h-4 mr-2" />,
        };
      case "Shipped":
        return {
          color: "bg-blue-100 text-blue-800",
          icon: <TruckIcon className="w-4 h-4 mr-2" />,
        };
      case "Delivered":
        return {
          color: "bg-green-100 text-green-800",
          icon: <CheckCircleIcon className="w-4 h-4 mr-2" />,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: <ClockIcon className="w-4 h-4 mr-2" />,
        };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = cookies.get("authToken");
        if (!token) throw new Error("No token found");

        const decodedToken = jwtDecode(token);
        const sellerId = (decodedToken as any)?.userId;

        const fetchedOrders = await getAllOrders(sellerId);
        console.log("Fetched Orders:", fetchedOrders);

        if (!Array.isArray(fetchedOrders)) {
          throw new Error("Invalid response format, expected an array");
        }

        setOrders(fetchedOrders);
      } catch (err) {
        setError((err as Error).message);
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading orders...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-[16rem] lg:w-[16rem] bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-[#fff5eb]">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Orders</h2>

        <div className="overflow-x-auto">
          <div className="bg-white rounded-lg shadow-lg border border-gray-100">
            {/* Table Header */}
            <div className="bg-gray-50 rounded-t-lg">
              <div className="grid grid-cols-6 p-4 text-sm font-semibold text-gray-600">
                <div>Image</div>
                <div>Order ID</div>
                <div>Buyer Name</div>
                <div>Product</div>
                <div>Total Amount</div>
                <div>Status</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {orders.length > 0 ? (
                orders.map((order) => {
                  const statusDetails = getStatusDetails(order.status);
                  return (
                    <div
                      key={order._id}
                      className="grid grid-cols-6 p-4 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200"
                    >
                      <div>
                        <img
                          src={order.imageUrl[0]}
                          alt="Product"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </div>
                      <div>{order._id}</div>
                      <div>{order.buyerName}</div>
                      <div>{order.productName}</div>
                      <div>&#x20B9;{order.totalAmount}</div>
                      <div>
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusDetails.color}`}
                        >
                          {statusDetails.icon}
                          {order.status}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center py-4 text-gray-500">No orders found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
