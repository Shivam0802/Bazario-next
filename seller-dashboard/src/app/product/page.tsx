"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/layout/sidebar";
import { PencilIcon, TrashIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import { getProduct } from "@/services/product.service";
import Cookies from "js-cookie";

// Define the Product interface
interface Product {
  imageUrls: string[];
  // Add other properties based on your product structure
  name: string;
  price: number;
  discountedPrice?: number;
  stock: number;
  availability: string;
  category: string;
  subCategory: string;
  brand: string;
}

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]); // Use the Product type
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("authToken");

    if (!token) {
      console.error("No token found");
      return;
    }

    const decodeToken = jwtDecode(token);

    const fetchProducts = async () => {
      try {
        const userId = (decodeToken as any)?.userId;

        if (!userId) {
          console.error("No userId found in token");
          return;
        }

        const response = await getProduct(userId);
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  console.log(products, "getAll");

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

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Image</th>
                <th className="py-3 px-6 text-left">Product</th>
                
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Sub-Category</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Discounted Price</th>
                <th className="py-3 px-6 text-left">Stock</th>
                <th className="py-3 px-6 text-left">Availability</th>
                <th className="py-3 px-6 text-left">Brand</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-medium">
              {products.map((product, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">
                    <div className="relative h-16 w-16 mr-4">
                      <Image
                        src={product.imageUrls[0]}
                        alt={"Product Image"}
                        layout="fill"
                        objectFit="contain"
                        className="rounded"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-6 flex items-center">
                    <span className="font-semibold">{product.name}</span>
                  </td>

                  
                  <td className="py-3 px-6">{product.category}</td>
                  <td className="py-3 px-6">{product.subCategory}</td>

                  <td className="py-3 px-6">₹ {product.price}</td>
                  <td className="py-3 px-6">
                    {product.discountedPrice ? `₹ ${product.discountedPrice}` : 'N/A'}
                  </td>
                  <td className="py-3 px-6">
                    <div className=" backdrop-blur-sm  text-sm font-medium text-gray-800 shadow-sm">
                      {product.stock}
                    </div>
                  </td>
                  <td className="py-3 px-6">{product.availability}</td>
                  <td className="py-3 px-6">{product.brand}</td>
                  <td className="py-3 px-6 flex space-x-4 items-center mt-3">
                    <button
                      onClick={() => router.push(`/product/edit/${index}`)}
                      className="flex items-center text-[#69904d] px-3 py-1 border-2 border-[#69904d] rounded-2xl"
                    >
                      <PencilIcon className="w-4 h-4 mr-2" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() =>
                        console.log(`Delete product ${index}`)
                      }
                      className="flex items-center text-[#AE445A] px-3 py-1 border-2 border-[#AE445A] rounded-2xl"
                    >
                      <TrashIcon className="w-4 h-4 mr-2" />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
