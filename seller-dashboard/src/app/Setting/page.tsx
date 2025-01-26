import React from 'react'
import Sidebar from '@/layout/sidebar'


export default function page() {
   return (
      <>
         <div className="flex flex-col md:flex-row min-h-screen">
            {/* Sidebar */}
            <div className="w-full md:w-[16rem] lg:w-[16rem] bg-gray-800 text-white">
               <Sidebar />
            </div>
            <div className="flex-1 p-6 bg-gray-100">
               <h2 className="text-3xl font-bold mb-6">Settings</h2>
               <div className="bg-white p-6 rounded-lg shadow-md">
                  <p>Settings will be displayed here.</p>
               </div>
            </div>
         </div>
      </>
   )
}