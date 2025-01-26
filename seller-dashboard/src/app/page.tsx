"use client";

import React from 'react';
import Link from 'next/link';
import Select from 'react-select';
import { states } from '../assets/data';
import { useRouter } from 'next/navigation';
import { genderOptions, features } from '../assets/data';
import Header from '@/layout/header';

export default function Home() {

  const navigate = useRouter();

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    gstNumber: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    password: '',
    confirmPassword: ''
  });

  const [isTermsAccepted, setIsTermsAccepted] = React.useState(false);



  const handleChange = (e: any) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate.push('/SellerDashboard');
  }

  return (
    <>
    <Header />
    <div className="flex flex-col md:flex-row lg:flex-row items-start justify-center max-w-6xl mx-auto my-8 p-4 md:p-8 lg:p-8">
      {/* Left Side: Content Section */}
      <div className="w-full md:w-1/2 lg:w-1/2 p-4 md:p-0 lg:p-0 md:pr-8 lg:pr-8 mb-8 md:mb-0">
        <h1 className="text-[1.5rem] md:text-4xl lg:text-4xl font-bold mb-6">Why Sell on Bazario?</h1>
        <p className="text-lg text-gray-600 mb-6">
          Join thousands of sellers who are growing their businesses with Bazario. Here’s why you should become a seller:
        </p>

        {/* Benefits of Selling */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Benefits of Selling</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Access to millions of customers across the country.</li>
            <li>Lowest commission rates in the industry.</li>
            <li>Easy-to-use seller dashboard for managing orders and inventory.</li>
            <li>Secure and timely payments.</li>
            <li>Dedicated support team to help you grow your business.</li>
          </ul>
        </div>

        {/* Steps to Get Started */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to Get Started</h2>
          <ol className="list-decimal list-inside text-gray-600 space-y-2">
            <li>Fill out the seller registration form.</li>
            <li>Verify your email and phone number.</li>
            <li>Upload your products and set up your store.</li>
            <li>Start selling and earning!</li>
          </ol>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center border border-[#ffe5c9d9] rounded-lg p-8 shadow-lg max-w-lg mx-auto my-8">
        <h1 className="text-3xl font-bold mb-6">Become a Seller</h1>
        <p className="mb-4 text-center">
          Join us as a seller and grow your business with ease. Fill out the form below to get started.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <input
              type="text"
              id="name"
              name="name"
              className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
            />
            <label
              htmlFor="name"
              className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
            >
              Your Name
            </label>
          </div>

          <div className="flex flex-col md:flex-row lg:flex-row space-x-0 md:space-x-4 lg:space-x-4">
            <div className="relative mb-6 w-full md:w-2/3 lg:w-2/3">
              <input
                type="email"
                id="email"
                name="email"
                className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
              >
                Your Email
              </label>
            </div>

            <div className="relative mb-6 w-full md:w-1/3 lg:w-1/3">
              <Select
                options={genderOptions}
                placeholder="Select"
                className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent pt-[1rem] text-[1rem] text-gray-900 focus:border-[#f0a75b] focus:outline-none"

                styles={{
                  control: (styles) => ({ ...styles, backgroundColor: "transparent", border: "none", boxShadow: "none", }),
                  option: (styles, { isFocused, isSelected }) => ({
                    ...styles, backgroundColor: isSelected ? "#FFDAB3" : isFocused ? "#ffe5c9d9" : "transparent",
                    color: isSelected ? "black" : "inherit",
                    fontSize: "0.9rem", fontWeight: "500",
                  }),
                  menu: (styles) => ({ ...styles, backgroundColor: "white" }),
                  menuList: (styles) => ({ ...styles, overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none", }),
                  placeholder: (styles) => ({ ...styles, color: 'darkslategrey', fontSize: "0.9rem", fontWeight: "600" }),
                  singleValue: (styles) => ({ ...styles, color: "darkslategrey", fontSize: "1rem", fontWeight: "600" }),
                }}

              />
              <label
                className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
              >
                Gender
              </label>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="relative mb-6 w-1/2">
              <input
                type="tel"
                id="phone"
                name="phone"
                className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-1 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                maxLength={12}
                value={formData.phone}
                onChange={(e) => {
                  const formattedPhoneNumber = e.target.value
                    .replace(/\D/g, '')
                    .replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
                  setFormData({ ...formData, phone: formattedPhoneNumber });
                }}
              />
              <label
                htmlFor="phone"
                className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
              >
                Phone
              </label>
            </div>

            <div className="relative mb-6 w-2/3">
              <input
                type="text"
                id="GST Number"
                name="GST Number"
                maxLength={15}
                onChange={(e) => {
                  const formattedGSTNumber = e.target.value
                    .replace(/^(\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1})$/, '$1');
                  setFormData({ ...formData, gstNumber: formattedGSTNumber });
                }}
                className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-1 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
              />
              <label
                className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
              >
                GST Number
              </label>
            </div>
          </div>

          <div className="relative mb-6">
            <textarea
              id="address"
              name="address"
              rows={3}
              className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
            ></textarea>
            <label
              htmlFor="address"
              className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
            >
              Address
            </label>
          </div>

          <div className="flex flex-col md:flex-row lg:flex-row md:space-x-4 lg:space-x-4">
            <div className="relative mb-6 w-full md:w-1/3 lg:w-1/3">
              <input
                type="text"
                id="city"
                name="city"
                className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
              />
              <label
                htmlFor="city"
                className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
              >
                City
              </label>
            </div>

            <div className="relative mb-6 w-full md:w-2/3 lg:w-2/3">
              <Select
                options={states}
                placeholder="Select"
                className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent pt-[1.2rem] text-[1rem] text-gray-900 focus:border-[#f0a75b] focus:outline-none"

                styles={{
                  control: (styles) => ({ ...styles, backgroundColor: "transparent", border: "none", boxShadow: "none", }),
                  option: (styles, { isFocused, isSelected }) => ({
                    ...styles, backgroundColor: isSelected ? "#FFDAB3" : isFocused ? "#ffe5c9d9" : "transparent",
                    color: isSelected ? "black" : "inherit",
                    fontSize: "0.9rem", fontWeight: "500",
                  }),
                  menu: (styles) => ({ ...styles, backgroundColor: "white" }),
                  menuList: (styles) => ({ ...styles, overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none", }),
                  placeholder: (styles) => ({ ...styles, color: 'darkslategrey', fontSize: "0.9rem", fontWeight: "600" }),
                  singleValue: (styles) => ({ ...styles, color: "darkslategrey", fontSize: "1rem", fontWeight: "600" }),
                }}

              />
              <label
                htmlFor="state"
                className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
              >
                State
              </label>
            </div>

            <div className="relative mb-6 w-full md:w-1/3 lg:w-1/3">
              <input
                type="text"
                id="zip"
                name="zip"
                maxLength={6}
                className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
              />
              <label
                htmlFor="zip"
                className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
              >
                Zip
              </label>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="relative mb-6 w-1/2">
              <input
                type="password"
                id="password"
                name="password"
                className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-1 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
              />
              <label
                htmlFor="password"
                className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
              >
                Password
              </label>
            </div>

            <div className="relative mb-6 w-1/2">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-1 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
              />
              <label
                htmlFor="password"
                className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
              >
                Confirm Password
              </label>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="peer w-3 h-3 text-blue-800 border-2 border-gray-300 rounded-md focus:outline-none"
              onChange={() => setIsTermsAccepted(!isTermsAccepted)}
            />
            <label
              htmlFor="terms"
              className="text-[0.9rem] text-gray-500 font-semibold"
            >
              I agree to the <Link href="/terms&condition" className="text-blue-800 hover:underline">terms and conditions</Link>
            </label>

          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => navigate.push('/')}
              className="w-full cursor-pointer bg-[#e9e9e9de] relative inline-flex items-center justify-center gap-2 rounded-md text-[0.9rem] md:text-lg lg:text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-200 h-9 rounded-md px-5"
            > Cancel </button>
            <button
              type="submit"
              className="w-full cursor-pointer bg-[#ffe5c9d9] relative inline-flex items-center justify-center gap-2 rounded-md text-[0.9rem] md:text-lg lg:text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#FFDAB3] h-9 rounded-md px-4"
            >
              Become a seller
            </button>
          </div>
        </form>
      </div>
    </div>
    <section className="w-full py-16" style={{ backgroundColor: '#ffe5c9d9' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Become a Seller on Bazario?
          </h2>
          <p className="text-lg text-gray-600">
            Join our platform and unlock a world of opportunities to grow your business.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-6 bg-orange-50 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
