import React from "react";

export default function Notification() {
   return (
      <div className="text-gray-900 bg-[#F8FAFC] text-gray-800 rounded-lg shadow absolute top-10 right-0 z-50" style={{ width: "20rem" }} role="alert">
         <div className="flex items-center mb-3 bg-[#a1b59a] px-4 py-3 rounded-t-lg">
            <span className="mb-1 text-lg font-semibold text-gray-900">
               New notification
            </span>
            {/* <button type="button" className="ms-auto -mx-1.5 -my-1.5 justify-center items-center flex-shrink-0 text-gray-600 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8" aria-label="Close">
               <span className="sr-only">Close</span>
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button> */}
         </div>
         <div className="flex items-center px-4 py-3 border-b border-gray-200">
            <div className="relative inline-block shrink-0">
               <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xl">
                  M
               </div>
               <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-messages-square"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" /><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" /></svg>
                  <span className="sr-only">Message icon</span>
               </span>
            </div>
            <div className="ms-3 text-sm font-normal">
               <div className="text-sm font-semibold text-gray-900">
                  Manish Tamang
               </div>
               <div className="text-sm font-normal">commented on your photo</div>
               <span className="text-xs font-medium text-blue-600">
                  a few seconds ago
               </span>
            </div>
         </div>
      </div>
   );
}
