"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import login from "../assets/login.webp";

export default function Home() {

  const navigate = useRouter();
  // State to manage form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("Email: " + email);
    alert("Password:" + password);
    // Add your login logic here (e.g., API call to authenticate the user)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff5eb] p-6">
      {/* Main Container */}
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] overflow-hidden">
        {/* Image Card */}
        <div className="w-1/2 relative">
          <Image
            src={login} // Replace with your image path
            alt="Login Image"
            layout="fill"
            objectFit="cover"
            className="rounded-l-2xl"
          />
        </div>

        {/* Form Card */}
        <div className="w-1/2 p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-center mb-8">
            Log in to your account to continue.
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
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
                className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
              >
                Your Email
              </label>
            </div>

            {/* Password Input */}
            <div className="relative mb-6 w-full">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-1 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
              />
              <label
                htmlFor="password"
                className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
              >
                Password
              </label>
            </div>

            {/* Submit Button with 3D Effect */}
            <button
            onClick={() => navigate.push("/admin/dashboard")}
              type="submit"
              className="w-full py-3 bg-[#f0a75b] text-white font-semibold rounded-lg hover:bg-[#e0944a] focus:outline-none focus:ring-2 focus:ring-[#f0a75b] focus:ring-offset-2 transition-all shadow-[0_4px_6px_rgba(240,167,91,0.3)] hover:shadow-[0_6px_8px_rgba(240,167,91,0.4)] active:translate-y-0.5"
            >
              Log In
            </button>
          </form>

          {/* Optional: Forgot Password Link */}
          <div className="mt-6 text-center">
            <a
              href="#"
              className="text-sm text-[#f0a75b] hover:text-[#e0944a] transition-colors"
            >
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
