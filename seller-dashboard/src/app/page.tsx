"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Select from "react-select";
import { states } from "../assets/data";
import { useRouter } from "next/navigation";
import { genderOptions, features } from "../assets/data";
import Header from "@/layout/header";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { updateUserById } from "@/services/user.service";
import toast from 'react-hot-toast'

interface User {
  email: string;
  contact: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  gender: string;
  gstNumber: string;
  role: string;
  _id: string;
}

export default function Home() {
  const navigate = useRouter();
  const [userData, setUserData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const [user, setUser] = useState<User>({
    email: "",
    contact: "",
    name: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    gender: "",
    gstNumber: "",
    role: "",
    _id: "",
  });

  const [isTermsAccepted, setIsTermsAccepted] = React.useState(false);

  useEffect(() => {
    const token = Cookies.get("authToken"); // Read token from cookie
    //console.log("Token from cookies:", token); // Debugging

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken); // Debugging
        setUser((decodedToken as any)?.user);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const [formData, setFormData] = useState({
    role: "Seller",
    businessName: "",
    businessType: "",
    gstNumber: "",
    paymentMethod: "",
    cinNumber: "",
    businessAddress: "",
    businessCity: "",
    businessState: "",
    businessPinCode: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
    panCardandTaxID: ""
  });

  const handleChange = (e: any, field?: string) => {
    if (field) {
      setFormData({ ...formData, [field]: e.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  //const [email, setEmail] = useState("");
  //const [email, setEmail] = useState("");
  //const [email, setEmail] = useState("");
  //const [email, setEmail] = useState("");
  //const [email, setEmail] = useState("");

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  //console.log("User", userData)

  // const handleChange = (e: any) => {
  //   setFormData({
  //     ...formData, [e.target.name]: e.target.value
  //   });
  // }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const token = Cookies.get("authToken"); // Fetch token from cookies

      console.log(token, "token")
      if (!token) {
        return toast.error("User is not authenticated");
      }
  
      const decodedToken: any = jwtDecode(token); // Decode token
      const userId = decodedToken?.userId; // Extract user ID
      if (!userId) {
        return toast.error("User ID not found");
      }
  
      // API request to update user info
      const response = await updateUserById(userId, formData)
  
      if (response.status !== 200) {
        toast.error(response.data.message || "Failed to update user info");
      }
  
      toast.success("User information updated successfully!");
      navigate.push("/SellerDashboard"); // Redirect to Seller Dashboard
    } catch (error: any) {
      console.error("Error updating user:", error);
      toast.error(error.message || "Something went wrong");
    }
  };
  

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row lg:flex-row items-start justify-center max-w-6xl mx-auto my-8 p-4 md:p-8 lg:p-8">
        {/* Left Side: Content Section */}
        <div className="w-full md:w-[65%] lg:w-[65%] p-4 md:p-0 lg:p-0 md:pr-8 lg:pr-8 mb-8 md:mb-0">
          <h1 className="text-[1.5rem] md:text-4xl lg:text-4xl font-bold mb-6">
            Why Sell on Bazario?
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Join thousands of sellers who are growing their businesses with
            Bazario. Here’s why you should become a seller:
          </p>

          {/* Benefits of Selling */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Benefits of Selling</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Access to millions of customers across the country.</li>
              <li>Lowest commission rates in the industry.</li>
              <li>
                Easy-to-use seller dashboard for managing orders and inventory.
              </li>
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
        <div className="flex flex-col items-center justify-center border border-[#ffe5c9d9] rounded-lg p-8 shadow-lg max-w-[40rem] mx-auto mb-8">
          <h1 className="text-3xl font-bold mb-6">Become a Seller</h1>
          <p className="mb-4 text-center">
            Join us as a seller and grow your business with ease. Fill out the
            form below to get started.
          </p>

          {/* Pagination Indicator */}
          <div className="flex justify-around items-center mb-6 w-full">
            <div>
              <button
                onClick={() => setCurrentPage(1)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  currentPage === 1
                    ? "bg-[#f0a75b] text-white shadow-lg hover:bg-[#e0944a]"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700"
                }`}
              >
                1
              </button>
            </div>
            <div className="h-16 w-px bg-gray-300 mx-2 rotate-90"></div>{" "}
            {/* Vertical line */}
            <div>
              <button
                onClick={() => setCurrentPage(2)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  currentPage === 2
                    ? "bg-[#f0a75b] text-white shadow-lg hover:bg-[#e0944a]"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700"
                }`}
              >
                2
              </button>
            </div>
            <div className="h-16 w-px bg-gray-300 mx-2 rotate-90"></div>{" "}
            {/* Vertical line */}
            <div>
              <button
                onClick={() => setCurrentPage(3)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  currentPage === 3
                    ? "bg-[#f0a75b] text-white shadow-lg hover:bg-[#e0944a]"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700"
                }`}
              >
                3
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            {/* Page 1: Personal Information */}
            {currentPage === 1 && (
              <>
                <div className="">
                  <h2 className="font-semibold text-lg mb-3">
                    Personal Details
                  </h2>
                  <div className="relative mb-6">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={user.name}
                      className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                    >
                      Your Name
                    </label>
                  </div>

                  <div className="flex flex-col md:flex-row lg:flex-row md:space-x-4 lg:space-x-4">
                    <div className="relative mb-6 w-full md:w-1/2 lg:w-1/2">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                      >
                        Your Email
                      </label>
                    </div>

                    <div className="relative mb-6  w-full md:w-1/2 lg:w-1/2">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={user.contact}
                        className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                      />
                      <label
                        htmlFor="phone"
                        className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                      >
                        Phone
                      </label>
                    </div>
                  </div>

                  <div className="relative mb-6">
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      value={user.address}
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
                        value={user.city}
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
                        value={states.find(
                          (option) => option.value === user.state
                        )}
                        className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent pt-[1.2rem] text-[1rem] text-gray-900 focus:border-[#f0a75b] focus:outline-none"
                        styles={{
                          control: (styles) => ({
                            ...styles,
                            backgroundColor: "transparent",
                            border: "none",
                            boxShadow: "none",
                          }),
                          option: (styles, { isFocused, isSelected }) => ({
                            ...styles,
                            backgroundColor: isSelected
                              ? "#FFDAB3"
                              : isFocused
                              ? "#ffe5c9d9"
                              : "transparent",
                            color: isSelected ? "black" : "inherit",
                            fontSize: "0.9rem",
                            fontWeight: "500",
                          }),
                          menu: (styles) => ({
                            ...styles,
                            backgroundColor: "white",
                          }),
                          menuList: (styles) => ({
                            ...styles,
                            overflowY: "auto",
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                          }),
                          placeholder: (styles) => ({
                            ...styles,
                            color: "darkslategrey",
                            fontSize: "0.9rem",
                            fontWeight: "600",
                          }),
                          singleValue: (styles) => ({
                            ...styles,
                            color: "darkslategrey",
                            fontSize: "1rem",
                            fontWeight: "600",
                          }),
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
                        value={user.pinCode}
                        className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                      />
                      <label
                        htmlFor="zip"
                        className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                      >
                        PinCode
                      </label>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Page 2: Business Information */}
            {currentPage === 2 && (
              <>
                <div className="">
                  <h2 className="font-semibold text-lg mb-3">
                    Business Details
                  </h2>
                  <div className="relative mb-6">
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                    />
                    <label
                      htmlFor="businessName"
                      className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                    >
                      Business Name
                    </label>
                  </div>

                  <div className="flex flex-col md:flex-row lg:flex-row md:space-x-4 lg:space-x-4 w-full">
                    <div className="relative mb-6 w-full md:w-1/2 lg:w-1/2">
                      <input
                        type="text"
                        id="businessType"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                      />
                      <label
                        htmlFor="businessType"
                        className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                      >
                        Business Type
                      </label>
                    </div>

                    <div className="relative mb-6 w-full md:w-1/2 lg:w-1/2">
                      <input
                        type="text"
                        id="cinNumber"
                        name="cinNumber"
                        maxLength={21}
                        value={formData.cinNumber}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                      />
                      <label
                        htmlFor="cinNumber"
                        className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                      >
                        CIN Number (optional)
                      </label>
                    </div>
                  </div>

                  <div className="relative mb-6">
                    <input
                      type="text"
                      id="gstNumber"
                      name="gstNumber"
                      maxLength={15}
                      value={formData.gstNumber}
                      onChange={handleChange}
                      className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                    />
                    <label
                      htmlFor="gstNumber"
                      className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                    >
                      GST Number
                    </label>
                  </div>

                  <div className="relative mb-6">
                    <textarea
                      id="businessAddress"
                      name="businessAddress"
                      rows={3}
                      value={formData.businessAddress}
                      onChange={handleChange}
                      className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                    ></textarea>
                    <label
                      htmlFor="businessAddress"
                      className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                    >
                      Business Address
                    </label>
                  </div>

                  <div className="flex flex-col md:flex-row lg:flex-row md:space-x-4 lg:space-x-4">
                    <div className="relative mb-6 w-full md:w-1/2 lg:w-1/2">
                      <input
                        type="text"
                        id="businessCity"
                        name="businessCity"
                        value={formData.businessCity}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                      />
                      <label
                        htmlFor="businessCity"
                        className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                      >
                        Business City
                      </label>
                    </div>

                    <div className="relative mb-6 w-full md:w-1/2 lg:w-1/2">
                      <input
                        type="text"
                        id="businessPinCode"
                        name="businessPinCode"
                        maxLength={6}
                        value={formData.businessPinCode}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                      />
                      <label
                        htmlFor="businessPinCode"
                        className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                      >
                       Business PinCode
                      </label>
                    </div>
                  </div>

                  <div className="relative mb-6 w-full">
                      <Select
                        options={states}
                        placeholder="Select"
                        value={states.find(
                          (option) => option.value === formData.businessState
                        )}
                        onChange={(selectedOption) =>
                          handleChange(selectedOption, "states")
                        }
                        className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent pt-[1.2rem] text-[1rem] text-gray-900 focus:border-[#f0a75b] focus:outline-none"
                        styles={{
                          control: (styles) => ({
                            ...styles,
                            backgroundColor: "transparent",
                            border: "none",
                            boxShadow: "none",
                          }),
                          option: (styles, { isFocused, isSelected }) => ({
                            ...styles,
                            backgroundColor: isSelected
                              ? "#FFDAB3"
                              : isFocused
                              ? "#ffe5c9d9"
                              : "transparent",
                            color: isSelected ? "black" : "inherit",
                            fontSize: "0.9rem",
                            fontWeight: "500",
                          }),
                          menu: (styles) => ({
                            ...styles,
                            backgroundColor: "white",
                          }),
                          menuList: (styles) => ({
                            ...styles,
                            overflowY: "auto",
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                          }),
                          placeholder: (styles) => ({
                            ...styles,
                            color: "darkslategrey",
                            fontSize: "0.9rem",
                            fontWeight: "600",
                          }),
                          singleValue: (styles) => ({
                            ...styles,
                            color: "darkslategrey",
                            fontSize: "1rem",
                            fontWeight: "600",
                          }),
                        }}
                      />
                      <label
                        htmlFor="state"
                        className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                      >
                       Business State
                      </label>
                    </div>
                </div>
              </>
            )}

            {/* Page 3: Tax/Payment Information */}
            {currentPage === 3 && (
              <>
                <div className="">
                  <h2 className="font-semibold text-lg mb-3">
                    Bank Account Details
                  </h2>

                  <div className="relative mb-6">
                    <input
                      type="text"
                      id="bankName"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                      className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                    />
                    <label
                      htmlFor="accountNumber"
                      className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                    >
                      Bank Name
                    </label>
                  </div>

                  <div className="flex flex-col md:flex-row lg:flex-row md:space-x-4 lg:space-x-4">
                    <div className="relative mb-6 w-full md:w-2/3 lg:w-2/3">
                      <input
                        type="text"
                        id="accountNumber"
                        name="accountNumber"
                        value={formData.accountNumber}
                        maxLength={20}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                      />
                      <label
                        htmlFor="accountNumber"
                        className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                      >
                        Bank Account Number
                      </label>
                    </div>

                    <div className="relative mb-6 w-full md:w-2/3 lg:w-2/3">
                      <input
                        type="text"
                        id="ifscCode"
                        name="ifscCode"
                        maxLength={11}
                        value={formData.ifscCode}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                      />
                      <label
                        htmlFor="ifscCode"
                        className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                      >
                        IFSC Code
                      </label>
                    </div>
                  </div>

                  <div className="relative mb-6 w-full">
                      <input
                        type="text"
                        id="panCardandTaxId"
                        name="panCardandTaxID"
                        maxLength={10}
                        value={formData.panCardandTaxID}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                      />
                      <label
                        htmlFor="panCardandTaxId"
                        className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                      >
                        PAN Card / Tax ID
                      </label>
                    </div>

                </div>

                <div className="mt-3">
                  <h2 className="mb-3 font-semibold text-lg">
                    Payments Details
                  </h2>

                  <div className="relative mb-6">
                    <input
                      type="text"
                      id="upiId"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleChange}
                      className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                    />
                    <label
                      htmlFor="upiId"
                      className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                    >
                      UPI ID (optional)
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6 w-full">
              {currentPage === 1 && (
                <div className="flex space-x-4 w-full">
                  <button
                    type="button"
                    onClick={() => navigate.push("http://localhost:3000")}
                    className="w-full cursor-pointer bg-[#e9e9e9de] relative inline-flex items-center justify-center gap-2 rounded-md text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-200 h-9 rounded-md px-5"
                  >
                    {" "}
                    Cancel{" "}
                  </button>
                  <button
                    type="submit"
                    onClick={nextPage}
                    //onClick={(e) => handleSubmit(e)}
                    className="w-full cursor-pointer bg-[#ffe5c9d9] relative inline-flex items-center justify-center gap-2 rounded-md text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#FFDAB3] h-9 rounded-md px-4"
                  >
                    Next
                  </button>
                </div>
              )}
              {currentPage === 2 && (
                <div className="flex space-x-4 w-full">
                  <button
                    type="button"
                    onClick={prevPage}
                    className="w-full cursor-pointer bg-[#e9e9e9de] relative inline-flex items-center justify-center gap-2 rounded-md text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-200 h-9 rounded-md px-5"
                  >
                    {" "}
                    Previos{" "}
                  </button>
                  <button
                    type="submit"
                    onClick={nextPage}
                    className="w-full cursor-pointer bg-[#ffe5c9d9] relative inline-flex items-center justify-center gap-2 rounded-md text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#FFDAB3] h-9 rounded-md px-4"
                  >
                    Next
                  </button>
                </div>
              )}
              {currentPage === 3 && (
                <div className="flex space-x-4 w-full">
                  <button
                    type="button"
                    onClick={prevPage}
                    className="w-full cursor-pointer bg-[#e9e9e9de] relative inline-flex items-center justify-center gap-2 rounded-md text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-200 h-9 rounded-md px-5"
                  >
                    {" "}
                    Previos{" "}
                  </button>
                  <button
                    type="submit"
                    //onClick={(e) => handleSubmit(e)}
                    className="w-full cursor-pointer bg-[#ffe5c9d9] relative inline-flex items-center justify-center gap-2 rounded-md text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#FFDAB3] h-9 rounded-md px-4"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
      <section
        className="w-full py-16"
        style={{ backgroundColor: "#ffe5c9d9" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Become a Seller on Bazario?
            </h2>
            <p className="text-lg text-gray-600">
              Join our platform and unlock a world of opportunities to grow your
              business.
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
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
