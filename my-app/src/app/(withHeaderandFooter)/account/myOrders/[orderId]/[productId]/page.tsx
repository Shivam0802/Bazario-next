"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/layout/navbar";
import { Footer } from "@/layout/footer";
import { getOrderById, cancelOrder } from "@/services/order.services";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const steps = [
  { id: "1", name: "Order Placed", status: "completed" },
  { id: "2", name: "Order Shipped", status: "in-progress" },
  { id: "3", name: "Out for Delivery", status: "pending" },
  { id: "4", name: "Delivered", status: "pending" },
];

interface Order {
  _id: string;
  products: any[];
  name: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  imageUrls: string;
  description: string;
  productId: string;
  status: string;
  deliveryDate: string;
}

export default function Page() {
  const navigate = useRouter();
  const { orderId, productId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [order, setOrder] = useState<Order[]>([]);

  const decodedToken = jwtDecode(localStorage.getItem("token") as string);
  const userId = (decodedToken as any)?.userId;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!localStorage.getItem("token")) return;
        const response = await getOrderById(orderId as string, productId as string);
        //console.log(response);
        setOrder(response.order);
      } catch (error) { 
        console.log(error);
      }
    };

    fetchOrder();
  }, []);


  const handleCancelOrder = async () => {
    try {
      const response = await cancelOrder(productId as string);
      //console.log(response);
      toast.success("Order cancelled successfully!");
      navigate.push(`/account/myOrders`);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <Navbar />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">

        <div className="flex items-center mb-6 p-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              {/* Home */}
              <li className="inline-flex items-center">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-600"
                >
                  Home
                </Link>
              </li>

              {/* My Account */}
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <Link
                    href={`/account/${userId}`}
                    className="ml-1 text-sm font-medium text-gray-600 hover:text-blue-600 md:ml-2"
                  >
                    My Account
                  </Link>
                </div>
              </li>

              {/* My Orders */}
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <Link 
                  href={`/account/myOrders`}
                  className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                    My Orders
                  </Link>
                </div>
              </li>

              {/* Current Order */}
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                    Current Order
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

          {/* Product Details */}
          <div className="p-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            {Array.isArray(order) && order?.map((order) => (
              <div key={order._id} className="space-y-4">
                {order.products.map((product: any) => (
                  <div key={product._id} className="flex items-center">
                    <img src={product.imageUrls} alt={product.name} className="w-16 h-16 object-cover mr-4" />
                    <div>
                      <p className="text-lg font-semibold">{product.name}</p>
                      <p className="text-gray-600">Quantity: {product.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))
            }
          </div> 

          {/* Tracking Steps */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order Tracking</h2>
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center space-x-4">
                  {/* Step Indicator */}
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                      currentStep >= index + 1
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-gray-300 bg-white text-gray-400"
                    }`}
                  >
                    {step.id}
                  </div>

                  {/* Step Details */}
                  <div className="flex-1">
                    <p
                      className={`text-lg font-semibold ${
                        currentStep >= index + 1 ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {step.name}
                    </p>
                    {step.status === "completed" && (
                      <p className="text-sm text-green-600">Completed on October 10, 2023</p>
                    )}
                    {step.status === "in-progress" && (
                      <p className="text-sm text-yellow-600">In Progress</p>
                    )}
                    {step.status === "pending" && (
                      <p className="text-sm text-gray-500">Pending</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-t border-gray-100">
            <div className="flex items-center justify-end gap-4 px-3">
            <button
            className="px-6 py-2 bg-[#f7aaaa96] text-gray-900 text-[1rem] font-semibold rounded-lg hover:bg-[#872341] hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => handleCancelOrder()}
            >
              Cancel Order  
            </button>
            <button
              className="px-6 py-2 bg-[#ffedc3] text-gray-900 text-[1rem] font-semibold rounded-lg hover:bg-[#F4D793] focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => alert("Continue shopping!")}
            >
              Continue Shopping
            </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}