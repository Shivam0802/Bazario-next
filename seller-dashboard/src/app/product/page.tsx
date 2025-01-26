"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/layout/sidebar';
import { PencilIcon, TrashIcon, PlusIcon } from 'lucide-react';

const Page = () => {
  const products = [
    { id: 1, name: 'Product 1', price: 100, stock: 10 },
    { id: 2, name: 'Product 2', price: 200, stock: 5 },
    { id: 3, name: 'Product 3', price: 300, stock: 20 },
  ];

  const navigate = useRouter();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-[16rem] lg:w-[16rem] bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">
        {/* Header and Add Product Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Products</h2>
          <button
            onClick={() => navigate.push('/product/addProduct')}
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
              className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
            >
              {/* Product Name */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>

              {/* Product Details */}
              <div className="space-y-2 text-gray-600">
                <p>
                  <span className="font-medium">Price:</span> ${product.price}
                </p>
                <p>
                  <span className="font-medium">Stock:</span> {product.stock}
                </p>
              </div>

              {/* Action Buttons with 3D Effect */}
              <div className="flex items-center justify-end space-x-4 mt-4">
                <button className="flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <PencilIcon className="w-4 h-4 mr-2" />
                  <span>Edit</span>
                </button>
                <button className="flex items-center bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <TrashIcon className="w-4 h-4 mr-2" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;