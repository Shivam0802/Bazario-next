"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import {
  PhoneForwarded,
  BadgeIndianRupee,
  Truck,
  TicketXIcon,
  TableOfContents,
  Store,
} from "lucide-react";
import toast from "react-hot-toast";

export const Footer = () => {
  const navigate = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
   const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleTransfer = () => {
   if (!token) return toast.error("User is not authenticated");

   Cookies.set("authToken", token, { domain: "localhost", path: "/", secure: true });
   navigate.push("http://localhost:3001/");
 };


  return (
    <footer className="bg-[#f2f2f242] m-6 rounded-[2rem]">
      <div className="flex items-center justify-between gap-1 py-4 pl-16 pr-24">
        <div className="flex items-center gap-4">
          <img src="/logo.svg" alt="logo" className="w-[20rem]" />
        </div>
        <div className="hidden md:flex lg:flex items-center gap-2">
          <Link
            href="/"
            className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-[1rem] font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-[#8D0B41] hover:underline h-9 rounded-md px-3"
          >
            <svg
              className="lucide lucide-rocket text-cyan-500 dark:text-cyan-400"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              stroke="#8D0B41"
              fill="none"
              viewBox="0 0 24 24"
              height="22"
              width="22"
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
            className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-[1rem] font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-[#60A5FA] hover:underline h-9 rounded-md px-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
            About us
          </Link>

          <Link
            href="/blog"
            className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-[1rem] font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-[#578E7E] hover:underline h-9 rounded-md px-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
            className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-[1rem] font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-[#FB923C] hover:underline h-9 rounded-md px-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
      </div>
      <div className="flex flex-col justify-between gap-2 py-4 md:px-24 lg:px-24">
        <p className="text-[1rem] font-semibold text-gray-800 dark:text-gray-900 text-justify ml-2 hidden md:block lg:block">
          Bazario is a one-shrefp destination for all your shopping needs. With
          our fast and reliable delivery service, seamless online shopping
          experience, offering a wide range of products href cater href your
          every need. From fashion and electronics href home essentials, we
          bring you quality and affordability at your fingertips. Enjoy secure
          payments, fast delivery, and exceptional cushrefmer service every step
          of the way. At Bazario, we make shopping effortless and enjoyable, so
          you can focus on what matters most!
        </p>
        <div className="flex lg:flex justify-between items-center gap-2 mt-0 md:mt-4 lg:mt-4">
          <div className="hidden md:flex lg:flex items-center gap-2">
            <Link
              href="/payment"
              className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-[1rem] font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-[#8D0B41] hover:underline h-9 rounded-md px-3"
            >
              <BadgeIndianRupee size="22" stroke="#8D0B41" />
              Payments
            </Link>
            <Link
              href="/shipping"
              className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-[1rem] font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-[#60A5FA] hover:underline h-9 rounded-md px-3"
            >
              <Truck size="22" stroke="#60A5FA" />
              Shipping
            </Link>
            <Link
              href="/cancellation&refund"
              className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-[1rem] font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-[#578E7E] hover:underline h-9 rounded-md px-3"
            >
              <TicketXIcon size="22" stroke="#578E7E" />
              Cancellation & Returns
            </Link>
            <Link
              href="/faq"
              className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-[1rem] font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-[#FB923C] hover:underline h-9 rounded-md px-3"
            >
              <TableOfContents size="22" stroke="#FB923C" />
              FAQ
            </Link>
          </div>
          <div className="flex items-center gap-2 pl-4 md:pl-0 lg:pl-0">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-[1rem] font-semibold hover:text-[#8D0B41] h-9 rounded-md px-3 group"
              >
                <img
                  src="/facebook.svg"
                  alt="facebook"
                  className="w-8 lg:w-6"
                />
                <span className="hidden lg:inline">Facebook</span>
                <span className="absolute hidden lg:hidden bg-gray-700 text-white text-xs rounded-md py-1 px-2 -bottom-8 left-1/2 transform -translate-x-1/2 group-hover:flex">
                  Facebook
                </span>
              </Link>
              <Link
                href="/"
                className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-[1rem] font-semibold hover:text-[#60A5FA] h-9 rounded-md px-3 group"
              >
                <img src="/twitter.svg" alt="twitter" className="w-8 lg:w-6" />
                <span className="hidden lg:inline">Twitter</span>
                <span className="absolute hidden lg:hidden bg-gray-700 text-white text-xs rounded-md py-1 px-2 -bottom-8 left-1/2 transform -translate-x-1/2 group-hover:flex">
                  Twitter
                </span>
              </Link>
              <Link
                href="/"
                className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-[1rem] font-semibold hover:text-[#578E7E] h-9 rounded-md px-3 group"
              >
                <img
                  src="/instagram.svg"
                  alt="instagram"
                  className="w-8 lg:w-6"
                />
                <span className="hidden lg:inline">Instagram</span>
                <span className="absolute hidden lg:hidden bg-gray-700 text-white text-xs rounded-md py-1 px-2 -bottom-8 left-1/2 transform -translate-x-1/2 group-hover:flex">
                  Instagram
                </span>
              </Link>
              <Link
                href="/"
                className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-[1rem] font-semibold hover:text-[#FB923C] h-9 rounded-md px-3 group"
              >
                <img
                  src="/whatsapp.svg"
                  alt="whatsapp"
                  className="w-8 lg:w-6"
                />
                <span className="hidden lg:inline">Whatsapp</span>
                <span className="absolute hidden lg:hidden bg-gray-700 text-white text-xs rounded-md py-1 px-2 -bottom-8 left-1/2 transform -translate-x-1/2 group-hover:flex">
                  Whatsapp
                </span>
              </Link>
              <Link
                href="/"
                className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-[1rem] font-semibold hover:text-[#3E5879] h-9 rounded-md px-3 group"
              >
                <img src="/youtube.svg" alt="youtube" className="w-8 lg:w-6" />
                <span className="hidden lg:inline">Youtube</span>
                <span className="absolute hidden lg:hidden bg-gray-700 text-white text-xs rounded-md py-1 px-2 -bottom-8 left-1/2 transform -translate-x-1/2 group-hover:flex">
                  Youtube
                </span>
              </Link>
              <Link
                href="/"
                className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-[1rem] font-semibold hover:text-[#6A669D] h-9 rounded-md px-3 group"
              >
                <img src="/thread.svg" alt="thread" className="w-8 lg:w-6" />
                <span className="hidden lg:inline">Thread</span>
                <span className="absolute hidden lg:hidden bg-gray-700 text-white text-xs rounded-md py-1 px-2 -bottom-8 left-1/2 transform -translate-x-1/2 group-hover:flex">
                  Thread
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row lg:flex-row justify-between items-start py-4 px-3 md:px-[6.1rem] lg:px-[6.1rem] mt-1">
        <p className="text-[0.9rem] md:text-[1.15rem] lg:text-[1.15rem] font-medium text-gray-500 w-full md:w-[70%] lg:w-[70%] text-justify md:pr-28 lg:pr-28">
          Explore the best deals and latest trends at Bazario, your one-shrefp
          shop for quality products and seamless shopping. Shop smarter, live
          better with{" "}
          <strong className="text-[1.2rem] tracking-wide">Bazario</strong>!
        </p>
        <div className="flex flex-col md:flex-row lg:flex-row md:items-center lg:items-center justify-center md:justify-end lg:justify-end gap-4 md:w-[50%] lg:w-[50%] mt-4 md:mt-0 lg:mt-0 pl-16 md:pl-0 lg:pl-0">
          <Link
            href="/"
            className="cursor-pointer bg-white relative inline-flex items-center justify-start gap-5 rounded-[1rem] text-[1rem] font-semibold ring-offset-background transition-colors rounded-md p-3 w-[16rem] shadow-lg shadow-slate-500"
          >
            <img src="/playstore.svg" alt="facebook" className="w-9" />
            <div className="flex flex-col gap-1 text-left">
              <p className="font-light text-[0.89rem] uppercase leading-3">
                Get It On
              </p>
              <p className="font-semibold text-[1.70rem] leading-6">
                Google play
              </p>
            </div>
          </Link>
          <Link
            href="/"
            className="cursor-pointer bg-white relative inline-flex items-center justify-start gap-5 rounded-[1rem] text-[1rem] font-semibold ring-offset-background transition-colors rounded-md p-3 w-[16rem] shadow-lg shadow-slate-500"
          >
            <img src="/apple.svg" alt="facebook" className="w-10" />
            <div className="flex flex-col gap-1 text-left">
              <p className="font-light text-[0.89rem] uppercase leading-3">
                Download on the
              </p>
              <p className="font-semibold text-[1.70rem] leading-6">
                App Store
              </p>
            </div>
          </Link>
          <Link
            href="/"
            className="cursor-pointer bg-white relative hidden md:inline-flex items-center justify-start gap-5 rounded-[1rem] text-[1rem] font-semibold ring-offset-background transition-colors rounded-md p-3 w-[16rem] shadow-lg shadow-slate-500"
          >
            <img src="/huawei.svg" alt="facebook" className="w-10" />
            <div className="flex flex-col gap-1 text-left">
              <p className="font-light text-[0.89rem] uppercase leading-3">
                Available on
              </p>
              <p className="font-semibold text-[1.70rem] leading-6">
                App Gallery
              </p>
            </div>
          </Link>
        </div>
      </div>
      <hr className="border-1 border-gray-200 mt-4 mx-32" />
      <div className="flex flex-col md:flex-row lg:flex-row justify-between text-gray-800 text-center py-4 md:px-24 lg:px-24 my-4">
        <button
          onClick={handleTransfer}
          className="cursor-pointer bg-gray-300 md:bg-white lg:bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-[1rem] font-semibold hover:text-[#608BC1] h-9 rounded-md px-3"
        >
          <Store size="22" stroke="#133E87" />
          Become a Seller
        </button>
        <p className="text-[0.85rem] font-semibold mt-2 md:mt-0 lg:mt-0">
          <strong className="text-[0.85rem]">©</strong> 2025 BAZARIO -- All
          right reserved.
        </p>
        <div className="hidden md:flex lg:flex items-center justify-center gap-4">
          <Link
            href="/privacypolicy"
            className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-[1rem] font-semibold hover:text-[#8D0B41] h-9 rounded-md px-3"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms&condition"
            className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-[1rem] font-semibold hover:text-[#60A5FA] h-9 rounded-md px-3"
          >
            Terms & Conditions
          </Link>
          {/* <Link href="/" className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-[1rem] font-semibold hover:text-[#578E7E] h-9 rounded-md px-3">
                  Refund Policy
               </Link>
               <Link href="/" className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-[1rem] font-semibold hover:text-[#FB923C] h-9 rounded-md px-3">
                  Shipping Policy
               </Link> */}
        </div>
      </div>
    </footer>
  );
};
