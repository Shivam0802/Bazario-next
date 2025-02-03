"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/layout/navbar";
import { Footer } from "@/layout/footer";
import { jwtDecode } from "jwt-decode";
import {
  User,
  LayoutList,
  CreditCard,
  MoreVertical,
  Pencil,
  X,
  Trash2,
} from "lucide-react";
import { updateUserById, deleteUserById } from "@/services/user.services";
//import { decodeAction } from "next/dist/server/app-render/entry-base";
import toast from "react-hot-toast";
import { states } from "@/assets/data";
import Select from "react-select";
import PanCard from '@/component/panCard'
 
const SidebarLink: React.FC<{
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ children, isActive, onClick }) => (
  <li
    className={`font-medium cursor-pointer p-2 rounded transition-colors duration-150 ${
      isActive
        ? "bg-[#ffe5c9d9] text-gray-800"
        : "text-gray-700 hover:bg-gray-300"
    }`}
    onClick={onClick}
  >
    {children}
  </li>
);

interface User {
  email: string;
  contact: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  gender: string;
  _id: string;
}

export default function Profile() {
  const navigate = useRouter();
  const [user, setUser] = useState<User>({
    email: "",
    contact: "",
    name: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    gender: "",
    _id: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [email, setEmail] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tempPhone, setTempPhone] = useState("");
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [tempName, setTempName] = useState("");
  const [address, setAddress] = useState("");
  const [tempAddress, setTempAddress] = useState("");
  const [city, setCity] = useState("");
  const [tempCity, setTempCity] = useState("");
  const [state, setState] = useState("");
  const [tempState, setTempState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [tempPinCode, setTempPinCode] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodeToken = jwtDecode(token);
      setUser((decodeToken as any)?.user);
    }
  }, []);

  useEffect(() => {
    setGender(user.gender);
    setEmail(user.email);
    setTempEmail(user.email);
    setPhone(user.contact);
    setTempPhone(user.contact);
    setName(user.name);
    setTempName(user.name);
    setAddress(user.address);
    setTempAddress(user.address);
    setCity(user.city);
    setTempCity(user.city);
    setState(user.state);
    setTempState(user.state);
    setPinCode(user.pinCode);
    setTempPinCode(user.pinCode);
  }, [user]);

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [selectedTab, setSelectedTab] = useState("Profile Information");

  const [isSaving, setIsSaving] = useState(false); // Add a state to prevent multiple calls

  const handleSave = async () => {
    if (isSaving) return; // Prevent multiple calls
    setIsSaving(true);

    const updatedData: {
      name?: string;
      email?: string;
      contact?: string;
      address?: string;
      city?: string;
      state?: string;
      pinCode?: string;
    } = {};

    if (tempName !== name) updatedData.name = tempName;
    if (tempEmail !== email) updatedData.email = tempEmail;
    if (tempPhone !== phone) updatedData.contact = tempPhone;
    if (tempAddress !== address) updatedData.address = tempAddress;
    if (tempCity !== city) updatedData.city = city;
    if (tempState !== state) updatedData.state = state;
    if (tempPinCode !== pinCode) updatedData.pinCode = pinCode;

    if (Object.keys(updatedData).length === 0) {
      setIsEditingName(false);
      setIsEditingEmail(false);
      setIsEditingPhone(false);
      setIsEditingAddress(false);
      setIsSaving(false);
      return;
    }

    try {
      console.log("Updating user with data:", updatedData);
      const response = await updateUserById(user._id, updatedData); // Pass updatedData
      console.log("Update response:", response);
      if (response.status === 200) {
        setName(updatedData.name || name);
        setEmail(updatedData.email || email);
        setPhone(updatedData.contact || phone);
        setAddress(updatedData.address || address);
        setCity(updatedData.city || city);
        setState(updatedData.state || state);
        setPinCode(updatedData.pinCode || pinCode);
        setIsEditingName(false);
        setIsEditingEmail(false);
        setIsEditingPhone(false);
        setIsEditingAddress(false);
        toast.success("Updated Information Successfully !!!");
      } else {
        toast.error("Failed to update information");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      if (error instanceof Error) {
        toast.error(`Error updating user: ${error.message}`);
      } else {
        toast.error("Error updating user");
      }
    } finally {
      setIsSaving(false); // Reset the saving state
    }
  };

  const handleCancel = () => {
    setTempName(name);
    setTempEmail(email);
    setTempPhone(phone);
    setTempAddress(address);
    setTempCity(city);
    setTempState(state);
    setTempPinCode(pinCode);
    setIsEditingName(false);
    setIsEditingEmail(false);
    setIsEditingPhone(false);
    setIsEditingAddress(false);
  };

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleEscape = (e: any) => {
      if (e.key === "Escape") {
        setShowConfirmation(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handleDelete = async () => {
    try {
        const response = await deleteUserById(user._id);
        if (response.status === 200) {
          toast.success("Account deleted successfully", {
            duration: 5000,
            position: "top-center",
          });
          setShowConfirmation(false);
          localStorage.removeItem("token");
          navigate.push("/signin");
        } else {
          toast.error("Failed to delete account");
        }
    } catch (error: any) {
      toast.error(error.message || "Error deleting account");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 p-6 m-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-5 bg-white text-gray-600 p-6 rounded-lg shadow-slate-300 shadow-2xl mb-6">
            <img
              src={"/man.webp"}
              alt="image"
              className="w-[3.5rem] h-[3.5rem]"
            />
            <h1 className="text-3xl font-bold">Hello, {user.name}</h1>
          </div>

          <div className="flex gap-6">
            {/* Sidebar */}
            <div className="w-72 flex-shrink-0">
              <div className="rounded-lg shadow-sm p-4 top-6 bg-white shadow-lg">
                <div className="mb-6">
                  <h2 className="flex items-center gap-3 text-[1.2rem] font-bold mb-3 text-blue-600/50">
                    <User size={20} strokeWidth={3} />
                    ACCOUNT SETTINGS
                  </h2>
                  <ul className="space-y-1">
                    <SidebarLink
                      isActive={selectedTab === "Profile Information"}
                      onClick={() => setSelectedTab("Profile Information")}
                    >
                      Profile Information
                    </SidebarLink>
                    <SidebarLink
                      isActive={selectedTab === "Manage Addresses"}
                      onClick={() => setSelectedTab("Manage Addresses")}
                    >
                      Manage Addresses
                    </SidebarLink>
                    <SidebarLink
                      isActive={selectedTab === "PAN Card Information"}
                      onClick={() => setSelectedTab("PAN Card Information")}
                    >
                      PAN Card Information
                    </SidebarLink>
                  </ul>
                </div>

                <div className="mb-6">
                  <h2 className="flex items-center gap-3 text-[1.2rem] font-bold mb-3 text-blue-600/50">
                    <CreditCard size={20} strokeWidth={3} />
                    PAYMENTS
                  </h2>
                  <ul className="space-y-1">
                    <SidebarLink
                      isActive={selectedTab === "Saved UPI"}
                      onClick={() => setSelectedTab("Saved UPI")}
                    >
                      Saved UPI
                    </SidebarLink>
                    <SidebarLink
                      isActive={selectedTab === "Saved Cards"}
                      onClick={() => setSelectedTab("Saved Cards")}
                    >
                      Saved Cards
                    </SidebarLink>
                  </ul>
                </div>

                <div className="mb-6">
                  <h2 className="flex items-center gap-3 text-[1.2rem] font-bold mb-3 text-blue-600/50">
                    <LayoutList size={20} strokeWidth={3} />
                    MY ORDERS
                  </h2>
                  <ul className="space-y-1">
                    <SidebarLink
                      isActive={selectedTab === "Track Order"}
                      onClick={() => setSelectedTab("Track Order")}
                    >
                      Track Order
                    </SidebarLink>
                    <SidebarLink
                      isActive={selectedTab === "Help Center"}
                      onClick={() => setSelectedTab("Help Center")}
                    >
                      Help Center
                    </SidebarLink>
                  </ul>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white shadow-xl rounded-lg p-6">
                {selectedTab === "Profile Information" && (
                  <div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
                      <h2 className="text-lg font-semibold mb-4 text-blue-600">
                        Personal Information
                      </h2>

                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
                        <label className="block text-md font-semibold text-gray-700 mb-2">
                          Name
                        </label>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            {isEditingName ? (
                              <input
                                type="email"
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            ) : (
                              <span className="text-gray-700 py-2 block">
                                {name}
                              </span>
                            )}
                          </div>
                          <div className="ml-4 flex space-x-2">
                            {isEditingName ? (
                              <>
                                <button
                                  onClick={handleSave}
                                  className="px-3 py-1 bg-[#ffe5c9d9] text-gray-800 rounded-md hover:bg-[#FFDAB3] transition-colors"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={handleCancel}
                                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => setIsEditingName(true)}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                              >
                                Edit
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Gender Section */}
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
                        <label className="block text-md font-semibold text-gray-700 mb-2">
                          Your Gender
                        </label>
                        <div className="flex space-x-6">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="gender"
                              value="male"
                              checked={gender === "male"}
                              onChange={(e) => setGender(e.target.value)}
                              disabled
                              className="form-radio text-blue-600 h-4 w-4"
                            />
                            <span className="ml-2">Male</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="gender"
                              value="female"
                              checked={gender === "female"}
                              onChange={(e) => setGender(e.target.value)}
                              disabled
                              className="form-radio text-blue-600 h-4 w-4"
                            />
                            <span className="ml-2">Female</span>
                          </label>
                        </div>
                      </div>

                      {/* Email Section */}
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
                        <label className="block text-md font-semibold text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            {isEditingEmail ? (
                              <input
                                type="email"
                                value={tempEmail}
                                onChange={(e) => setTempEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            ) : (
                              <span className="text-gray-700 py-2 block">
                                {email}
                              </span>
                            )}
                          </div>
                          <div className="ml-4 flex space-x-2">
                            {isEditingEmail ? (
                              <>
                                <button
                                  onClick={handleSave}
                                  className="px-3 py-1 bg-[#ffe5c9d9] text-gray-800 rounded-md hover:bg-[#FFDAB3] transition-colors"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={handleCancel}
                                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => setIsEditingEmail(true)}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                              >
                                Edit
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Phone Section */}
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <label className="block text-md font-semibold text-gray-700 mb-2">
                          Mobile Number
                        </label>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            {isEditingPhone ? (
                              <input
                                type="tel"
                                value={tempPhone}
                                onChange={(e) => setTempPhone(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            ) : (
                              <span className="text-gray-700 py-2 block">
                                {phone}
                              </span>
                            )}
                          </div>
                          <div className="ml-4 flex space-x-2">
                            {isEditingPhone ? (
                              <>
                                <button
                                  onClick={handleSave}
                                  className="px-3 py-1 bg-[#ffe5c9d9] text-gray-800 rounded-md hover:bg-[#FFDAB3] transition-colors"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={handleCancel}
                                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => setIsEditingPhone(true)}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                              >
                                Edit
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* FAQs Section */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-8">
                      <h2 className="text-lg font-semibold mb-4 text-blue-600">
                        Frequently Asked Questions
                      </h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-gray-700">
                            What happens when I update my email address (or
                            mobile number)?
                          </h3>
                          <p className="text-sm text-gray-600">
                            Your login email id (or mobile number) changes,
                            likewise. You'll receive all your account related
                            communication on your updated email address (or
                            mobile number).
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-700">
                            When will my Bazario account be updated with the new
                            email address (or mobile number)?
                          </h3>
                          <p className="text-sm text-gray-600">
                            It happens as soon as you confirm the verification
                            code sent to your email (or mobile) and save the
                            changes.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-700">
                            What happens to my existing Bazario account when I
                            update my email address (or mobile number)?
                          </h3>
                          <p className="text-sm text-gray-600">
                            Updating your email address (or mobile number)
                            doesn't invalidate your account. Your account
                            remains fully functional. You'll continue seeing
                            your Order history, saved information and personal
                            details.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-700">
                            Does my Seller account get affected when I update my
                            email address?
                          </h3>
                          <p className="text-sm text-gray-600">
                            Bazario has a 'single sign-on' policy. Any changes
                            will reflect in your Seller account also.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Account Actions Section */}
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setShowConfirmation(true)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete Account
                      </button>

                      {showConfirmation && (
                        <div className="fixed inset-0 z-50">
                          {/* Modal Container - Top Center Positioning */}
                          <div className="relative flex justify-center">
                            {/* Modal Content */}
                            <div className="fixed top-8 mx-auto bg-[#FBFBFB] border border-black rounded-lg w-full max-w-md p-6 shadow-xl animate-in slide-in-from-top duration-300">
                              {/* Close button */}
                              <button
                                onClick={() => setShowConfirmation(false)}
                                className="absolute right-4 top-4 text-gray-400 hover:text-gray-900 transition-colors"
                              >
                                <X className="h-6 w-6" />
                              </button>

                              {/* Content */}
                              <div className="mb-6 pt-2">
                                <h2 className="flex gap-3 items-center text-[1.2rem] font-bold mb-3 text-gray-900">
                                  <Trash2 size={22} strokeWidth={2} />
                                  Delete Account
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                  Are you sure you want to delete your account?
                                  This action cannot be undone and all your data
                                  will be permanently removed.
                                </p>
                              </div>

                              {/* Actions */}
                              <div className="flex justify-end gap-3">
                                <button
                                  onClick={() => setShowConfirmation(false)}
                                  className="px-4 py-2 border border-gray-200 rounded-lg hover:border-gray-500 transition-colors"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={handleDelete}
                                  className="px-4 py-2 border border-red-600/30 hover:border-red-700/50 text-red-500 rounded-lg transition-colors"
                                >
                                  Delete Account
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedTab === "Manage Addresses" && (
                  <div className="mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                      <h1 className="text-2xl font-semibold">
                        Manage Addresses
                      </h1>
                    </div>

                    {/* Address Cards */}
                    {isEditingAddress === true ? (
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                          <div className="relative mb-6">
                            <textarea
                              id="address"
                              name="address"
                              value={tempAddress}
                              onChange={(e) => setTempAddress(e.target.value)}
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
                                value={tempCity}
                                onChange={(e) => setTempCity(e.target.value)}
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
                                  states.find(
                                    (s: { value: string }) =>
                                      s.value === tempState
                                  ) || null
                                }
                                onChange={(newValue) => {
                                  if (newValue) {
                                    setTempState(
                                      (newValue as { value: string }).value
                                    );
                                  }
                                }}
                                required
                                className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent pt-[1.2rem] text-[1rem] text-gray-900 focus:border-[#f0a75b] focus:outline-none"
                                styles={{
                                  control: (styles: any) => ({
                                    ...styles,
                                    backgroundColor: "transparent",
                                    border: "none",
                                    boxShadow: "none",
                                  }),
                                  option: (
                                    styles: any,
                                    {
                                      isFocused,
                                      isSelected,
                                    }: {
                                      isFocused: boolean;
                                      isSelected: boolean;
                                    }
                                  ) => ({
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
                                  menu: (styles: any) => ({
                                    ...styles,
                                    backgroundColor: "white",
                                    zIndex: "10",
                                  }),
                                  menuList: (styles: any) => ({
                                    ...styles,
                                    overflowY: "auto",
                                    scrollbarWidth: "none",
                                    msOverflowStyle: "none",
                                    zIndex: "10",
                                  }),
                                  placeholder: (styles: any) => ({
                                    ...styles,
                                    color: "darkslategrey",
                                    fontSize: "0.9rem",
                                    fontWeight: "600",
                                  }),
                                  singleValue: (styles: any) => ({
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
                                value={tempPinCode}
                                onChange={(e) => setTempPinCode(e.target.value)}
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
                            <button
                              type="button"
                              onClick={() => {
                                setIsEditingAddress(!isEditingAddress);
                                setShowMenu(false);
                              }}
                              className="w-full cursor-pointer bg-[#e9e9e9de] relative inline-flex items-center justify-center gap-2 rounded-md text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-200 h-9 rounded-md px-5"
                            >
                              {" "}
                              Cancel{" "}
                            </button>
                            <button
                              type="button"
                              onClick={handleSave}
                              className="w-full cursor-pointer bg-[#ffe5c9d9] relative inline-flex items-center justify-center gap-2 rounded-md text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#FFDAB3] h-9 rounded-md px-4"
                            >
                              Save
                            </button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-8 mt-8">
                          <h2 className="text-lg font-semibold mb-4 text-blue-600">
                            Frequently Asked Questions
                          </h2>
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-medium text-gray-700">
                                What happens when I update my address?
                              </h3>
                              <p className="text-sm text-gray-600">
                                When you update your address, it will be
                                reflected immediately in your account. All
                                future communications, deliveries, and orders
                                will be associated with the new address you
                                provided.
                              </p>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-700">
                                Will updating my address impact my billing
                                information?
                              </h3>
                              <p className="text-sm text-gray-600">
                                Updating your address will not automatically
                                update your billing address unless you choose to
                                modify that as well. You will need to update
                                your billing address separately in your account
                                settings if needed.
                              </p>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-700">
                                How long does it take for my new address to be
                                reflected in my order deliveries?
                              </h3>
                              <p className="text-sm text-gray-600">
                                The new address will be used for your next order
                                immediately. If you have an ongoing order,
                                contact customer support to update the delivery
                                address if necessary.
                              </p>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-700">
                                Will my shipping address change in all active
                                accounts linked to my profile?
                              </h3>
                              <p className="text-sm text-gray-600">
                                Yes, if you have multiple linked accounts (e.g.,
                                a seller account), any address updates will be
                                reflected across all associated accounts under
                                the same login credentials.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-lg font-semibold">
                                  {name}
                                </span>
                              </div>
                              <div className="text-gray-600 space-y-1">
                                <p>{address}</p>
                                <p>
                                  {city}, {state} - {pinCode}
                                </p>
                              </div>
                            </div>

                            <div className="relative">
                              <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                              >
                                <MoreVertical className="h-5 w-5 text-gray-500" />
                              </button>

                              {showMenu && (
                                <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                                  <button
                                    onClick={() =>
                                      setIsEditingAddress(!isEditingAddress)
                                    }
                                    className="w-full flex items-center gap-3 text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                  >
                                    <Pencil size={20} />
                                    Edit
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-8 mt-8">
                          <h2 className="text-lg font-semibold mb-4 text-blue-600">
                            Frequently Asked Questions
                          </h2>
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-medium text-gray-700">
                                What happens when I update my address?
                              </h3>
                              <p className="text-sm text-gray-600">
                                When you update your address, it will be
                                reflected immediately in your account. All
                                future communications, deliveries, and orders
                                will be associated with the new address you
                                provided.
                              </p>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-700">
                                Will updating my address impact my billing
                                information?
                              </h3>
                              <p className="text-sm text-gray-600">
                                Updating your address will not automatically
                                update your billing address unless you choose to
                                modify that as well. You will need to update
                                your billing address separately in your account
                                settings if needed.
                              </p>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-700">
                                How long does it take for my new address to be
                                reflected in my order deliveries?
                              </h3>
                              <p className="text-sm text-gray-600">
                                The new address will be used for your next order
                                immediately. If you have an ongoing order,
                                contact customer support to update the delivery
                                address if necessary.
                              </p>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-700">
                                Will my shipping address change in all active
                                accounts linked to my profile?
                              </h3>
                              <p className="text-sm text-gray-600">
                                Yes, if you have multiple linked accounts (e.g.,
                                a seller account), any address updates will be
                                reflected across all associated accounts under
                                the same login credentials.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {selectedTab === "PAN Card Information" && (
                  <div className="p-4 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-4 text-blue-600">
                      PAN Card Information
                    </h2>
                    <PanCard />
                  </div>
                )}

                {selectedTab === "Track Order" && (
                  <div className="p-4 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-4 text-blue-600">
                      Track Order
                    </h2>
                    <p>Check the status of your current orders.</p>
                  </div>
                )}

                {selectedTab === "Help Center" && (
                  <div className="p-4 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-4 text-blue-600">
                      Help Center
                    </h2>
                    <p>Find answers to common questions or contact support.</p>
                  </div>
                )}

                {selectedTab === "Saved UPI" && (
                  <div className="p-4 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-4 text-blue-600">
                      Saved UPIs
                    </h2>
                    <p>Manage your gift cards and check balances.</p>
                  </div>
                )}

                {selectedTab === "Saved Cards" && (
                  <div className="p-4 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-4 text-blue-600">
                      Saved Cards
                    </h2>
                    <p>View and manage your saved payment cards.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
