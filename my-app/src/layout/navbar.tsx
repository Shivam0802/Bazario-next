"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import Notification from "@/component/notification";
import { Search, SearchIcon } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie'
import {
  UserRound,
  Settings,
  ListOrderedIcon,
  ShoppingBag,
  LogOutIcon,
} from "lucide-react";
import { getUserById } from "@/services/user.services";

interface DecodedToken {
   user: {
     name: string;
     email: string;
     _id: string;
   };
 }

const Navbar = () => {
  //const { data: session, status } = useSession();

  const navigate = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [token, setToken] = useState("");
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const handleNotificationButtonClick = () => {
    setShowNotification(!showNotification);
  };

  const handleDropdown = () => {
   setUserDropdown(false);
    setShowDropdown(!showDropdown);
  };

  const handleUserDropdown = () => {
   setShowDropdown(false);
   setUserDropdown(!showDropdown);
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //const token = localStorage.getItem("token");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setDecodedToken(jwtDecode(storedToken));
    }
  }, []);
  //console.log(decodedToken, "decodeToken")
  
  const handleTransfer = () => {
    if (!token) return toast.error("User is not authenticated");

    Cookies.set("authToken", token, { domain: "localhost", path: "/", secure: true });
    //console.log("Token", Cookies.get("authTOken"))
    navigate.push("http://localhost:3001/");
  };

  const handleLogout = () => {
    navigate.push("/");
    localStorage.removeItem("token");
    setToken("");
    setDecodedToken(null);
    
    toast.success("Logout Successfully");
  };

  const handleProfileClick = async () => {
   //console.log("Heelooooooo")
   try {
     const userId = decodedToken?.user?._id;
     if (!userId) return;

     const response = await getUserById(decodedToken?.user?._id)
 
     if (response.status) {
       navigate.push(`/account/id=${userId}`);
     } else {
       toast.error("Error fetching user data:", response.data.message);
     }
   } catch (error) {
     toast.error(`Failed to fetch user data: ${error}`);
   }
 };

 const handleSearch = () => {
  navigate.push("/search");
 }

  return (
    <nav className="bg-white shadow-lg py-4 px-6 max-w-screen mx-auto">
      <div className="md:w-full lg:w-full mx-auto md:mx-0 flex justify-between items-center md:h-16 lg:h-16">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800">
          <img src="/logo.svg" alt="logo" className="w-[10rem] md:w-[16rem]" />
        </Link>

        {/* Hamburger Icon */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="hidden lg:flex items-center gap-4">
          <div
            onClick={handleSearch}
            className="flex items-center bg-gray-100 border border-gray-200 rounded-md px-4 focus:outline-none focus:ring-1 focus:ring-[#8D0B41] focus:ring-opacity-50 cursor-pointer"
          >
            <SearchIcon size={20} />
            <input
              type="text"
              placeholder="Search for products"
              className="w-72 h-9 px-4 py-2 bg-gray-100 focus:outline-none font-semibold text-gray-800 placeholder-gray-400 cursor-pointer"
              onClick={handleSearch}
              readOnly
            />
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-4 items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-[1.12rem] text-gray-800 hover:text-[#8D0B41] cursor-pointer font-semibold hover:bg-gray-100 rounded-md px-4 py-1"
          >
            <svg
              className="lucide lucide-rocket text-cyan-300 dark:text-cyan-300"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              stroke="#8D0B41"
              fill="none"
              viewBox="0 0 24 24"
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
            </svg>
            Home
          </Link>

          <Link
            href="/products"
            className="flex items-center gap-2 text-[1.12rem] text-gray-800 hover:text-[#8D0B41] cursor-pointer font-semibold hover:bg-gray-100 rounded-md px-4 py-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20" 
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8D0B41"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shopping-bag"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Products
          </Link>

          <Link
            href="/about"
            className="flex items-center gap-2 text-[1.12rem] text-gray-800 hover:text-[#244da8] cursor-pointer font-semibold hover:bg-gray-100 rounded-md px-4 py-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#244da8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-newspaper"
            >
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
              <path d="M18 14h-8" />
              <path d="M15 18h-5" />
              <path d="M10 6h8v4h-8V6Z" />
            </svg>
            About Us
          </Link>

          <Link
            href="/blogs"
            className="flex items-center gap-2 text-[1.12rem] text-gray-800 hover:text-[#833f57] cursor-pointer font-semibold hover:bg-gray-100 rounded-md px-4 py-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#833f57"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-scroll-text"
            >
              <path d="M15 12h-5" />
              <path d="M15 8h-5" />
              <path d="M19 17V5a2 2 0 0 0-2-2H4" />
              <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
            </svg>
            Blogs
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-2 text-[1.12rem] text-gray-800 hover:text-[#48954b] cursor-pointer font-semibold hover:bg-gray-100 rounded-md px-4 py-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#48954b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-contact"
            >
              <path d="M16 2v2" />
              <path d="M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
              <path d="M8 2v2" />
              <circle cx="12" cy="11" r="3" />
              <rect x="3" y="4" width="18" height="18" rx="2" />
            </svg>
            Contact Us
          </Link>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center gap-2 space-x-3">
            <Link
              href="/cart"
              className="cursor-pointer hover:text-[#DF9755] transition ease-in-out delay-150 hover:translate-y-1 hover:scale-110 duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shopping-bag"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </Link>

            <div className="relative flex justify-end items-center gap-2 space-x-2">
              <button
                onClick={handleNotificationButtonClick}
                className="cursor-pointer hover:text-[#DF9755] transition ease-in-out delay-150 hover:translate-y-1 hover:scale-110 duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-bell"
                >
                  <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                  <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
                </svg>
              </button>
              {showNotification && <Notification />}
            </div>
          </div>
          <div>
            {token ? (
              <div className="flex items-center space-x-4 cursor-pointer">
                <div
                  className="flex items-center p-3 cursor-pointer"
                  onClick={handleUserDropdown}
                >
                  <img src="/boy.webp" alt="profile" className="w-12 h-12 rounded-full" />
                </div>
                {userDropdown && (
                  <div className="absolute top-20 right-16 mt-2 w-60 bg-white border rounded-lg shadow-lg z-50"> 
                  <section className="block m-3">
                    <div className="pl-3">
                      <h3 className="bg-clip-text text-transparent bg-gradient-to-l from-[#005BC4] to-[#27272A] text-lg font-bold">
                        {decodedToken?.user?.name}
                      </h3>
                      <h3 className="text-gray-600 font-semibold text-sm">
                        {decodedToken?.user?.email}
                      </h3>
                    </div>
                  </section>
                  <hr className="mx-1" />
                    <button
                      onClick={handleProfileClick}
                      className="w-full flex items-center gap-3 px-4 py-2 mt-2 font-medium hover:bg-[#ffe5c9d9] text-[1.12rem]"
                    >
                      <UserRound size={20} />
                      Profile
                    </button>
                    <Link
                      href="/account/myOrders"
                      className="flex items-center gap-3 px-4 py-2 mt-2 font-medium hover:bg-[#ffe5c9d9] text-[1.12rem]"
                    >
                      <ListOrderedIcon size={20} />
                      Orders
                    </Link>
                    <Link
                      href="/cart"
                      className="flex items-center gap-3 px-4 py-2 mt-2 mb-2 font-medium hover:bg-[#ffe5c9d9] text-[1.12rem]"
                    >
                      <ShoppingBag size={20} />
                      Wishlist
                    </Link>
                    <hr className="mx-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 flex items-center gap-3 px-4 py-2 font-medium hover:bg-[#ffe5c9d9] text-[1.12rem] mb-2 mt-2"
                    >
                      <LogOutIcon size={20} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/signin"
                  className="cursor-pointer bg-[#e9e9e9de] relative inline-flex items-center justify-center gap-2 rounded-md text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-200 h-9 rounded-md px-5"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="cursor-pointer bg-[#ffe5c9d9] relative inline-flex items-center justify-center gap-2 rounded-md text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#FFDAB3] h-9 rounded-md px-4"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button
            className="flex items-center gap-2 space-x-2 cursor-pointer"
            onClick={() => handleDropdown()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-ellipsis-vertical"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
          {showDropdown && (
            <div className="absolute top-[4.5rem] right-[2rem] bg-[#F5F5F5] rounded shadow-xl py-2 z-50">
              <button
                onClick={handleTransfer}
                className="w-full flex items-center gap-3 cursor-pointer block text-lg font-semibold text-gray-900 px-6 py-2 hover:bg-[#ffe5c9d9]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-store"
                >
                  <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                  <path d="M2 7h20" />
                  <path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7" />
                </svg>
                Become a Seller
              </button>
              <Link
                href="/support24x7"
                className="flex items-center gap-3 cursor-pointer block text-lg font-semibold text-gray-900 px-6 py-2 hover:bg-[#ffe5c9d9]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-badge-help"
                >
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" x2="12.01" y1="17" y2="17" />
                </svg>
                Support 24 x 7
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden text-gray-900 py-4 mt-4 transition-all duration-300 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-[1.12rem] text-gray-800 hover:text-[#8D0B41] cursor-pointer font-semibold hover:bg-gray-100 rounded-md px-4 py-1 mb-2"
        >
          <svg
            className="lucide lucide-rocket"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
          </svg>
          Home
        </Link>

        <Link
          href="/about"
          className="flex items-center gap-2 text-[1.12rem] text-gray-800 hover:text-[#244da8] cursor-pointer font-semibold hover:bg-gray-100 rounded-md px-4 py-1 mb-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-newspaper"
          >
            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
            <path d="M18 14h-8" />
            <path d="M15 18h-5" />
            <path d="M10 6h8v4h-8V6Z" />
          </svg>
          About Us
        </Link>

        <Link
          href="/products"
          className="flex items-center gap-2 text-[1.12rem] text-gray-800 hover:text-[#833f57] cursor-pointer font-semibold hover:bg-gray-100 rounded-md px-4 py-1 mb-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-package-search"
          >
            <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
            <path d="m7.5 4.27 9 5.15" />
            <polyline points="3.29 7 12 12 20.71 7" />
            <line x1="12" x2="12" y1="22" y2="12" />
            <circle cx="18.5" cy="15.5" r="2.5" />
            <path d="M20.27 17.27 22 19" />
          </svg>
          Products
        </Link>

        <Link
          href="/blogs"
          className="flex items-center gap-2 text-[1.12rem] text-gray-800 hover:text-[#833f57] cursor-pointer font-semibold hover:bg-gray-100 rounded-md px-4 py-1 mb-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-scroll-text"
          >
            <path d="M15 12h-5" />
            <path d="M15 8h-5" />
            <path d="M19 17V5a2 2 0 0 0-2-2H4" />
            <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
          </svg>
          Blogs
        </Link>

        <Link
          href="/contact"
          className="flex items-center gap-2 text-[1.12rem] text-gray-800 hover:text-[#48954b] cursor-pointer font-semibold hover:bg-gray-100 rounded-md px-4 py-1 mb-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-contact"
          >
            <path d="M16 2v2" />
            <path d="M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
            <path d="M8 2v2" />
            <circle cx="12" cy="11" r="3" />
            <rect x="3" y="4" width="18" height="18" rx="2" />
          </svg>
          Contact Us
        </Link>

        <Link
          href="/cart"
          className="flex items-center gap-2 text-[1.12rem] text-gray-800 hover:text-[#48954b] cursor-pointer font-semibold hover:bg-gray-100 rounded-md px-4 py-1 mb-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-shopping-bag"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Cart
        </Link>

        <button
          onClick={handleTransfer}
          className="w-full flex items-center gap-2 cursor-pointer block text-lg font-semibold text-gray-900 px-4 py-2 hover:bg-[#ffe5c9d9]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-store"
          >
            <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
            <path d="M2 7h20" />
            <path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7" />
          </svg>
          Become a Seller
        </button>

        <Link
          href="/settings"
          className="flex items-center gap-2 cursor-pointer block text-lg font-semibold text-gray-900 px-4 py-2 hover:bg-[#ffe5c9d9]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-badge-help"
          >
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" x2="12.01" y1="17" y2="17" />
          </svg>
          Support 24 x 7
        </Link>

        <div className="flex items-center gap-2 space-x-3 mx-3 mt-6">
          <Link
            href="/signin"
            className="w-full cursor-pointer bg-[#e9e9e9de] relative inline-flex items-center justify-center gap-2 rounded-md text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-200 h-9 rounded-md px-5"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="w-full cursor-pointer bg-[#ffe5c9d9] relative inline-flex items-center justify-center gap-2 rounded-md text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#FFDAB3] h-9 rounded-md px-4"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
