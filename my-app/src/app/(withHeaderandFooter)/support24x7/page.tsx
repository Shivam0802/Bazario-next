"use client";

import { Footer } from "@/layout/footer";
import Navbar from "@/layout/navbar";
import React from "react";

export default function page() {
  return (
     <>
     <Navbar />
    <div className="bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          24/7 Customer Support
        </h1>
        <p className="text-gray-600 text-center mb-8">
          We're here to help you anytime, anywhere. Choose an option below to
          get started.
        </p>

        {/* Help Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FAQs Section */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">FAQs</h2>
            <p className="text-gray-600 mb-4">
              Find answers to common questions about orders, payments, and more.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Browse FAQs
            </button>
          </div>

          {/* Contact Us Section */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              Reach out to our support team via email or phone.
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Contact Support
            </button>
          </div>

          {/* Live Chat Section */}
          <div className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Live Chat</h2>
            <p className="text-gray-600 mb-4">
              Chat with a support agent in real-time for instant help.
            </p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              Start Live Chat
            </button>
          </div>

          {/* Order Tracking Section */}
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Track Your Order</h2>
            <p className="text-gray-600 mb-4">
              Enter your order ID to check the status of your delivery.
            </p>
            <input
              type="text"
              placeholder="Enter Order ID"
              className="w-full px-4 py-2 mb-4 border rounded"
            />
            <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              Track Order
            </button>
          </div>
        </div>

        {/* Additional Support Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Need more help? Visit our{" "}
            <a href="/help" className="text-blue-600 hover:underline">
              Help Center
            </a>
            .
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
