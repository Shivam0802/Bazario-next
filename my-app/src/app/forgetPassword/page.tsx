"use client";

import React, { useState } from "react";
import { forgetPassword } from "@/services/user.services";
import toast from "react-hot-toast";

const page = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgetPassword(email);
      setMessage("Password reset link sent. Please check your email.");
      toast.success("Password reset link sent. Please check your email.");
      setEmail("");
      setMessage("");
    } catch (error) {
      setMessage("Failed to send reset link. Please try again.");
      toast.error("Failed to send reset link. Please try again.");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-[#f1d5b6]">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Forgot Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email to receive a password reset link
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="relative mb-6 w-full">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-2 text-[0.75rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
            >
              Your Email
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#f0a75b] hover:bg-[#e09b4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f0a75b] transition-colors duration-200"
            >
              Send Reset Link
            </button>
          </div>
        </form>

        {message && (
          <div
            className={`mt-4 p-4 rounded-md text-center ${
              message.includes("sent")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
