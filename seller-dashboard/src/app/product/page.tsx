"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/layout/sidebar";
import { PencilIcon, TrashIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import watch from "@/assets/watch.webp";
import earbuds from "@/assets/earbuds.webp";
import headphones from "@/assets/headphones.webp";
import keyboard from "@/assets/keyboard.webp";

const Page = () => {
  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Earbuds",
      price: 100,
      stock: 10,
      image: earbuds,
    },
    { id: 2, name: "Smartwatch Pro", price: 200, stock: 5, image: watch },
    {
      id: 3,
      name: "Noise-Canceling Headphones",
      price: 300,
      stock: 20,
      image: headphones,
    },
    { id: 4, name: "Gaming Keyboard", price: 150, stock: 15, image: keyboard },
  ];

  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-64 lg:w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-[#fff5eb]">
        {/* Header and Add Product Button */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Products</h2>
          <button
            onClick={() => router.push("/product/addProduct")}
            className="flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              {/* Product Image and Details Container */}
              <div className="flex flex-row">
                {/* Product Image */}
                <div className="relative h-48 w-1/2">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="contain"
                    className="transform group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Stock Badge */}
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800 shadow-sm">
                    {product.stock} in stock
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-4 w-1/2 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-md font-semibold text-gray-900 mb-4">
                      ${product.price} 
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end space-x-4">
                    <button
                      onClick={() => router.push(`/product/edit/${product.id}`)}
                      className="flex items-center text-[#69904d] px-3 py-1 border-2 border-[#69904d] rounded-2xl"
                    >
                      <PencilIcon className="w-4 h-4 mr-2" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => console.log(`Delete product ${product.id}`)}
                      className="flex items-center text-[#AE445A] px-3 py-1 border-2 border-[#AE445A] rounded-2xl"
                    >
                      <TrashIcon className="w-4 h-4 mr-2" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;