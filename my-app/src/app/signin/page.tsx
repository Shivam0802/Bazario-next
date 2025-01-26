"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {

  const router = useRouter();
   return (
      <>
      <div className={`min-h-[95vh] md:min-h-screen lg:min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center`}
         style={{ 
          backgroundImage: 'url(/signinbackground.webp)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat',
        }}
      >

        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
        
        <div className="absolute md:right-56 lg:right-56 max-w-screen-xl h-fit m-0 sm:m-10 lg:my-28 bg-white shadow sm:rounded-lg flex justify-center">
        <div className="max-w-xl mx-auto md:p-8 lg:p-8 p-4">
                  <div className="text-xl md:text-2xl lg:text-2xl text-[#f0a75b] font-bold capitalize text-center mb-4">
                     <h3 className="font-bold uppercase letter-spacing-2">
                        Welcome to Bazario!!
                     </h3>
                     <p className="text-[1rem] md:text-[1.12rem] lg:text-[1.12rem] font-medium text-gray-400">
                        Create an account to get started with Bazario
                     </p>
                  </div>
                  <form>

                     <div className="flex flex-col md:flex-row lg:flex-row space-x-0 md:space-x-4 lg:space-x-4">
                        <div className="relative mb-6 w-full">
                           <input
                              type="email"
                              id="email"
                              name="email"
                              className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                           />
                           <label
                              htmlFor="email"
                              className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                           >
                              Your Email
                           </label>
                        </div>
                     </div>

                     <div className="flex space-x-4">
                        <div className="relative mb-6 w-full">
                           <input
                              type="password"
                              id="password"
                              name="password"
                              className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-1 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                           />
                           <label
                              htmlFor="password"
                              className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                           >
                              Password
                           </label>
                        </div>
                     </div>

                     <div className="flex items-center space-x-2 mb-6">
                        <input
                           type="checkbox"
                           id="terms"
                           name="terms"
                           className="peer w-3 h-3 text-blue-800 border-2 border-gray-300 rounded-md focus:outline-none"
                        />
                        <label
                           htmlFor="terms"
                           className="text-[0.9rem] text-gray-500 font-semibold"
                        >
                           I agree to the <Link href="/terms" className="text-blue-800 hover:underline">terms and conditions</Link>
                        </label>

                     </div>

                     <div className="flex space-x-4">
                        <button
                           type="submit"
                           className="w-full cursor-pointer bg-[#ffe5c9d9] relative inline-flex items-center justify-center gap-2 rounded-md text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#FFDAB3] h-9 rounded-md px-4"
                        >
                           Sign In
                        </button>
                     </div>
                  </form>

                  <div className="text-center mt-4">
                     <p className="text-gray-500 text-[1rem] font-semibold">
                        Already have an account? <Link href="/signup" className="text-blue-800 hover:underline">Sign Up</Link>
                     </p>
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                     <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
                     <span className="text-zinc-400 dark:text-zinc-700 text-sm">OR</span>
                     <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
                  </div>
                  <div className="mt-3 space-y-3">
                     <button
                        className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-black focus:outline-none"
                        type="button"
                     >
                        <span className="mr-2 inline-block">
                           <svg
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-rose-500"
                           >
                              <path
                                 d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                              ></path>
                           </svg>
                        </span>
                        Sign in with Google
                     </button>
                  </div>
               </div>
        </div>
      </div>
    </>
   );
}