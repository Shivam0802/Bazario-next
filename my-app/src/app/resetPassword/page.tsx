"use client";

import React, { useState, useEffect } from "react";
import { resetPassword } from "@/services/user.services";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Fetch token from query params and update state
  useEffect(() => {
    const tokenFromQuery = searchParams.get("token");
    console.log("Token from query:", tokenFromQuery); // Debugging
    if (tokenFromQuery) {
      setToken(tokenFromQuery);
    } else {
      toast.error("Invalid or missing token.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing token.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await resetPassword(token, newPassword);
      toast.success("Password reset successful!");
      router.push("/signin");
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-[#f1d5b6]">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your new password and confirm it to reset your password
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative mb-6 w-full">
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
            />
            <label
              htmlFor="newPassword"
              className="absolute left-3 top-2 text-[0.75rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
            >
              New Password
            </label>
          </div>
          <div className="relative mb-6 w-full">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
            />
            <label
              htmlFor="confirmPassword"
              className="absolute left-3 top-2 text-[0.75rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
            >
              Confirm Password
            </label>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#f0a75b] hover:bg-[#e79a4a] focus:outline-none"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
