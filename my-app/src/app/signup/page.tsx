"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { createUser } from "@/services/user.services";
import { states } from "@/assets/data";
import { auth, provider } from "@/lib/firebase.config";
import { onAuthStateChanged, signInWithPopup, User } from "firebase/auth";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export default function Home() {
  const navigate = useRouter();

  const [isTermsAccepted, setIsTermsAccepted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    dob: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: any, field?: string) => {
    if (field) {
      setFormData({ ...formData, [field]: e.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }

      const fillData = {
        name: formData.name,
        email: formData.email,
        dob: formData.dob,
        gender: formData.gender,
        address: formData.address,
        city: formData.city,
        pinCode: formData.pinCode,
        state: formData.state,
        contact: formData.contact,
        password: formData.password,
      };

      // API Call
      const result = await createUser(fillData);
      //console.log(result, "result");

      if (result?.message) {
        navigate.push("/signin");
        toast.success(result.message, {
          duration: 5000,
          position: "top-center",
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    }
  };

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          contact: user.phoneNumber,
          photoURL: user.photoURL
        };
        setUser(user);
        localStorage.setItem("user", JSON.stringify(userData));

        createUser(userData);

      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignInWithGoogle = async () => {
    try {
      
      await signInWithPopup(auth, provider);
      navigate.push("/");
      toast.success("Signed in successfully");
    } catch (error) {
      console.log("Google Sign-In Error:", error);
      toast.error("Failed to sign in");
    }
  };



  return (
    <>
      <div
        className={`min-h-[105vh] md:min-h-screen lg:min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center`}
        style={{
          backgroundImage: "url(/signupbackground.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute right-0 md:right-48 lg:right-56 max-w-screen-xl h-fit m-0 sm:m-10 lg:my-28 bg-white shadow sm:rounded-lg flex justify-center">
          <div className="max-w-xl mx-auto md:p-8 lg:p-8 p-4">
            <div className="text-xl md:text-2xl lg:text-2xl text-[#f0a75b] font-bold capitalize text-center mb-4">
              <h3 className="font-bold uppercase letter-spacing-2">
                Welcome to Bazario!!
              </h3>
              <p className="text-[1rem] md:text-[1.12rem] lg:text-[1.12rem] font-medium text-gray-400">
                Create an account to get started with Bazario
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleChange(e)}
                  required
                  className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                />
                <label
                  htmlFor="name"
                  className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
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
                    value={formData.email}
                    onChange={(e) => handleChange(e)}
                    required
                    className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                  >
                    Your Email
                  </label>
                </div>

                <div className="relative mb-6 w-full md:w-1/3 lg:w-1/3">
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={(e) => handleChange(e)}
                    required
                    className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-1 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                  />
                  <label
                    htmlFor="dob"
                    className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                  >
                    Date of Birth
                  </label>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="relative mb-6 w-1/2">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-1 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                    maxLength={12}
                    value={formData.contact}
                    onChange={(e) => {
                      const formattedPhoneNumber = e.target.value
                        .replace(/\D/g, "")
                        .replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
                      setFormData({
                        ...formData,
                        contact: formattedPhoneNumber,
                      });
                    }}
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                  >
                    Phone
                  </label>
                </div>

                <div className="relative mb-6 w-1/2">
                  <Select
                    options={genderOptions as any}
                    placeholder="Select"
                    value={
                      genderOptions.find((s) => s.value === formData.gender) ||
                      null
                    }
                    onChange={(selectedOption) =>
                      handleChange(selectedOption, "gender")
                    }
                    required
                    className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent pt-[1rem] text-[1rem] text-gray-900 focus:border-[#f0a75b] focus:outline-none"
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
                  <label className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600">
                    Gender
                  </label>
                </div>
              </div>

              <div className="relative mb-6">
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={(e) => handleChange(e)}
                  rows={3}
                  required
                  className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                ></textarea>
                <label
                  htmlFor="address"
                  className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                >
                  Address
                </label>
              </div>

              <div className="flex space-x-4">
                <div className="relative mb-6 w-1/3">
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={(e) => handleChange(e)}
                    required
                    className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                  />
                  <label
                    htmlFor="city"
                    className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                  >
                    City
                  </label>
                </div>

                <div className="relative mb-6 w-2/3">
                  <Select
                    options={states}
                    placeholder="Select"
                    value={
                      states.find((s) => s.value === formData.state) || null
                    }
                    onChange={(selectedOption) =>
                      handleChange(selectedOption, "state")
                    }
                    required
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
                    className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                  >
                    State
                  </label>
                </div>

                <div className="relative mb-6 w-1/3">
                  <input
                    type="text"
                    id="pinCode"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={(e) => handleChange(e)}
                    required
                    maxLength={6}
                    className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                  />
                  <label
                    htmlFor="pinCode"
                    className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                  >
                    ZipCode
                  </label>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="relative mb-6 w-1/2">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => handleChange(e)}
                    required
                    className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-1 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                  >
                    Password
                  </label>
                </div>

                <div className="relative mb-6 w-1/2">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange(e)}
                    required
                    className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-1 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
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
                  I agree to the{" "}
                  <Link
                    href="/terms&condition"
                    className="text-blue-800 hover:underline"
                  >
                    terms and conditions
                  </Link>
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => navigate.push("/")}
                  className="w-full cursor-pointer bg-[#e9e9e9de] relative inline-flex items-center justify-center gap-2 rounded-md text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-200 h-9 rounded-md px-5"
                >
                  {" "}
                  Cancel{" "}
                </button>
                <button
                  type="submit"
                  //onClick={(e) => handleSubmit(e)}
                  className="w-full cursor-pointer bg-[#ffe5c9d9] relative inline-flex items-center justify-center gap-2 rounded-md text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#FFDAB3] h-9 rounded-md px-4"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <div className="text-center mt-4">
              <p className="text-gray-500 text-[1rem] font-semibold">
                Already have an account?{" "}
                <Link href="/signin" className="text-blue-800 hover:underline">
                  Sign In
                </Link>
              </p>
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
              <span className="text-zinc-400 dark:text-zinc-700 text-sm">
                OR
              </span>
              <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
            </div>
            <div className="mt-3 space-y-3">
              <button
                onClick={() => handleSignInWithGoogle()}
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none active:scale-100" // Add active:scale-100
                type="button"
              >
                <span className="mr-2 inline-block">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-rose-500"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
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
