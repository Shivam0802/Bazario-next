"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/layout/navbar";
import { Footer } from "@/layout/footer";
import { getAllOrders } from "@/services/order.services";
import { jwtDecode } from "jwt-decode";

interface Order {
  _id: string;
  cancelled: boolean;
  products: {
    _id: string;
    name: string;
    price: number;
    discountedPrice: number;
    quantity: number;
    imageUrls: string;
    description: string;
    productId: string;
  }[];
  status: string;
  deliveryDate: string;
}

export default function MyOrdersPage() {
  const navigate = useRouter();
  const [allOrders, setAllOrders] = useState<Order[]>([]);

  const decodedToken = jwtDecode(localStorage.getItem("token") as string);
  const userId = (decodedToken as any)?.userId;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!localStorage.getItem("token")) return;
        const response = await getAllOrders(userId);
        setAllOrders(response.orders);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  const [filters, setFilters] = useState({
    status: "",
    orderTime: "",
  });

  //   const filteredOrders =
  //     Array.isArray(allOrders) &&
  //     allOrders.filter((order) => {
  //       if (filters.status && order.status !== filters.status) return false;
  //       if (filters.orderTime) {
  //         const orderYear = new Date(order.deliveryDate).getFullYear();
  //         if (filters.orderTime !== orderYear.toString()) return false;
  //       }
  //       return true;
  //     });

  const handleProductClick = (orderId: string, productId: string) => {
    navigate.push(`/account/myOrders/${orderId}/${productId}`);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-[88rem] mx-auto bg-gray-100 p-6 m-6">
        {/* Header */}
        <div className="flex items-center mb-6">
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
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                    My Orders
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="flex justify-start mb-6 gap-4">
          {/* Filters */}
          <div className="flex flex-col gap-4 mb-6 w-1/4">
            {/* Order Status Filter */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-2">ORDER STATUS</h2>
              <div className="space-y-2">
                {["On the way", "Delivered", "Cancelled", "Returned"].map(
                  (status) => (
                    <label key={status} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.status === status}
                        onChange={() =>
                          setFilters((prev) => ({
                            ...prev,
                            status: prev.status === status ? "" : status,
                          }))
                        }
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <span className="text-gray-700">{status}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Order Time Filter */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-2">ORDER TIME</h2>
              <div className="space-y-2">
                {["Last 30 days", "2024", "2023", "2022", "2021"].map(
                  (time) => (
                    <label key={time} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.orderTime === time}
                        onChange={() =>
                          setFilters((prev) => ({
                            ...prev,
                            orderTime: prev.orderTime === time ? "" : time,
                          }))
                        }
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <span className="text-gray-700">{time}</span>
                    </label>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Order List */}
          <div className="bg-white p-6 rounded-lg shadow-sm w-full">
            <h2 className="text-lg font-semibold mb-4">MY ORDERS</h2>
            <div className="space-y-4">
              {Array.isArray(allOrders) &&
                allOrders
                  .filter((order) => order.cancelled !== true)
                  .map((order: any) => (
                    <div key={order._id} className="space-y-6">
                      {Array.isArray(order.products) &&
                        order.products.map((product: any) => (
                          <div
                            key={product._id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
                            onClick={() =>
                              handleProductClick(product._id, order._id)
                            }
                          >
                            <div className="flex p-6 space-x-6">
                              {/* Product Image */}
                              <img
                                src={product.imageUrls[0]}
                                alt={product.name}
                                className="w-24 h-24 object-cover rounded-lg"
                              />

                              {/* Product Details */}
                              <div className="flex-1 flex flex-col justify-between">
                                {/* Product Name and Description */}
                                <div>
                                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {product.name}
                                  </h3>
                                  <p className="text-sm text-gray-600 line-clamp-2">
                                    {product.description}
                                  </p>
                                </div>

                                {/* Quantity, Price, Status, and Delivery Date */}
                                <div className="mt-4 space-y-3">
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-600">
                                      Quantity:{" "}
                                      <span className="font-medium">
                                        {product.quantity}
                                      </span>
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Price:{" "}
                                      <span className="font-medium text-green-600">
                                        ₹
                                        {product.discountedPrice *
                                          product.quantity}
                                      </span>
                                    </p>
                                  </div>

                                  <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-600">
                                      Status:{" "}
                                      <span
                                        className={`font-medium ${
                                          product.status === "Delivered"
                                            ? "text-green-600"
                                            : product.status === "Cancelled"
                                            ? "text-red-600"
                                            : "text-yellow-600"
                                        }`}
                                      >
                                        {product.status ?? "Pending"}
                                      </span>
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Delivery:{" "}
                                      <span className="font-medium">
                                        {product.deliveryDate ??
                                          "Not Available"}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
