import React from 'react';
import Sidebar from '@/layout/sidebar';

export default function SellerSettingsPage() {
   return (
      <>
         <div className="flex flex-col md:flex-row min-h-screen">
            {/* Sidebar */}
            <div className="w-full md:w-[16rem] lg:w-[16rem] bg-[#ffd8b3] text-gray-800">
               <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-[#fff5eb]">
               <h2 className="text-3xl font-bold mb-6 text-gray-800">Seller Settings</h2>

               {/* Grid Layout for Cards */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Profile Settings Card */}
                  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                     <h3 className="text-xl font-semibold mb-4 text-gray-800">Profile Settings</h3>
                     <div className="space-y-4 flex-1">
                        <div>
                           <label className="block text-sm font-medium text-gray-700">Full Name</label>
                           <input
                              type="text"
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ffd8b3] focus:border-[#ffd8b3]"
                              placeholder="John Doe"
                           />
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-gray-700">Email</label>
                           <input
                              type="email"
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ffd8b3] focus:border-[#ffd8b3]"
                              placeholder="johndoe@example.com"
                           />
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                           <input
                              type="tel"
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ffd8b3] focus:border-[#ffd8b3]"
                              placeholder="+1 (555) 555-5555"
                           />
                        </div>
                     </div>
                     <button className="w-full bg-[#ffd8b3] text-gray-800 px-4 py-2 rounded-md hover:bg-[#ffc999] mt-4">
                        Update Profile
                     </button>
                  </div>

                  {/* Store Settings Card */}
                  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                     <h3 className="text-xl font-semibold mb-4 text-gray-800">Store Settings</h3>
                     <div className="space-y-4 flex-1">
                        <div>
                           <label className="block text-sm font-medium text-gray-700">Store Name</label>
                           <input
                              type="text"
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ffd8b3] focus:border-[#ffd8b3]"
                              placeholder="My Awesome Store"
                           />
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-gray-700">Store Description</label>
                           <textarea
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ffd8b3] focus:border-[#ffd8b3]"
                              rows={3}
                              placeholder="Describe your store..."
                           ></textarea>
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-gray-700">Store Logo</label>
                           <input
                              type="file"
                              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#ffd8b3] file:text-gray-800 hover:file:bg-[#ffc999]"
                           />
                        </div>
                     </div>
                     <button className="w-full bg-[#ffd8b3] text-gray-800 px-4 py-2 rounded-md hover:bg-[#ffc999] mt-4">
                        Save Store Settings
                     </button>
                  </div>

                  {/* Payment Settings Card */}
                  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                     <h3 className="text-xl font-semibold mb-4 text-gray-800">Payment Settings</h3>
                     <div className="space-y-4 flex-1">
                        <div>
                           <label className="block text-sm font-medium text-gray-700">Bank Account Number</label>
                           <input
                              type="text"
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ffd8b3] focus:border-[#ffd8b3]"
                              placeholder="1234567890"
                           />
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                           <input
                              type="text"
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ffd8b3] focus:border-[#ffd8b3]"
                              placeholder="Example Bank"
                           />
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-gray-700">Routing Number</label>
                           <input
                              type="text"
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ffd8b3] focus:border-[#ffd8b3]"
                              placeholder="123456789"
                           />
                        </div>
                     </div>
                     <button className="w-full bg-[#ffd8b3] text-gray-800 px-4 py-2 rounded-md hover:bg-[#ffc999] mt-4">
                        Update Payment Details
                     </button>
                  </div>

                  {/* Shipping Settings Card */}
                  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                     <h3 className="text-xl font-semibold mb-4 text-gray-800">Shipping Settings</h3>
                     <div className="space-y-4 flex-1">
                        <div>
                           <label className="block text-sm font-medium text-gray-700">Shipping Method</label>
                           <select
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ffd8b3] focus:border-[#ffd8b3]"
                           >
                              <option>Standard Shipping</option>
                              <option>Express Shipping</option>
                              <option>Free Shipping</option>
                           </select>
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-gray-700">Shipping Cost</label>
                           <input
                              type="number"
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ffd8b3] focus:border-[#ffd8b3]"
                              placeholder="Enter shipping cost"
                           />
                        </div>
                     </div>
                     <button className="w-full bg-[#ffd8b3] text-gray-800 px-4 py-2 rounded-md hover:bg-[#ffc999] mt-4">
                        Save Shipping Settings
                     </button>
                  </div>

                  {/* Tax Settings Card */}
                  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                     <h3 className="text-xl font-semibold mb-4 text-gray-800">Tax Settings</h3>
                     <div className="space-y-4 flex-1">
                        <div>
                           <label className="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
                           <input
                              type="number"
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ffd8b3] focus:border-[#ffd8b3]"
                              placeholder="Enter tax rate"
                           />
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-gray-700">Tax ID</label>
                           <input
                              type="text"
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ffd8b3] focus:border-[#ffd8b3]"
                              placeholder="Enter tax ID"
                           />
                        </div>
                     </div>
                     <button className="w-full bg-[#ffd8b3] text-gray-800 px-4 py-2 rounded-md hover:bg-[#ffc999] mt-4">
                        Save Tax Settings
                     </button>
                  </div>

                  {/* Notification Settings Card */}
                  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                     <h3 className="text-xl font-semibold mb-4 text-gray-800">Notification Settings</h3>
                     <div className="space-y-4 flex-1">
                        <div className="flex items-center">
                           <input
                              type="checkbox"
                              className="h-4 w-4 text-[#ffd8b3] focus:ring-[#ffd8b3] border-gray-300 rounded"
                           />
                           <label className="ml-2 block text-sm text-gray-700">Email Notifications</label>
                        </div>
                        <div className="flex items-center">
                           <input
                              type="checkbox"
                              className="h-4 w-4 text-[#ffd8b3] focus:ring-[#ffd8b3] border-gray-300 rounded"
                           />
                           <label className="ml-2 block text-sm text-gray-700">SMS Notifications</label>
                        </div>
                     </div>
                     <button className="w-full bg-[#ffd8b3] text-gray-800 px-4 py-2 rounded-md hover:bg-[#ffc999] mt-4">
                        Save Notification Settings
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}