"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/layout/navbar";
import { Footer } from "@/layout/footer";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { Trash2, CircleArrowLeft } from "lucide-react";
import Modal from "@/component/modal";
import { createOrder } from "@/services/order.services";

interface ProductItem {
  _id: string;
  imageUrls: string[];
  product: {
    _id: string;
    name: string;
    price: number;
    discountedPrice: number;
    description: string;
  };
  quantity: number;
}

export default function page() {

  const navigate = useRouter();
  const searchParams = useSearchParams();
  const cartData = searchParams.get("cart");

  //console.log(cartData, "cartData");

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [savedCard, setSavedCard] = useState(false);
  const [newCard, setNewCard] = useState(false);
  const [upi, setUpi] = useState(false);
 // const [grandTotal, setGrandTotal] = useState(0);
  const [show, setShow] = useState(false);
  const [productCart, setProductCart] = useState<ProductItem[]>(() => {
    // Check if cart data exists
    if (cartData) {
      const parsedData = JSON.parse(decodeURIComponent(cartData));
      // Ensure it's an array even if the data is a single object
      return Array.isArray(parsedData) ? parsedData : [parsedData];
    }
    return [];
  });

  console.log(productCart, "productCart");

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handleCardPayment = () => {
    setNewCard(!newCard);
  };

  const handleUpiPayment = () => {
    setUpi(!upi);
  };

  const decodedToken = jwtDecode(localStorage.getItem("token") as string);

  const handleCheckout = () => {
    if (
      selectedPaymentMethod === "cod" ||
      selectedPaymentMethod === "upi" ||
      selectedPaymentMethod === "card"
    ) {
      setShow(!show);
    } else {
      toast.error("Please select a payment method");
    }
  };

  const handleDeleteCartItem = async (cartItemId: string) => {
    try {
      const updatedCartItems = productCart.filter(
        (item) => item._id !== cartItemId
      );
      setProductCart(updatedCartItems);
      toast.success("Cart item deleted successfully!");
    } catch (error) {
      console.error("Error deleting cart item:", error);
      toast.error("Failed to delete cart item. Please try again.");
    }
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      userId: (decodedToken as any)?.userId,
      products: productCart.map((item) => ({
        productId: item.product?._id || item?._id,
        quantity: item.quantity,
      })),
      paymentMethod: selectedPaymentMethod,
      totalAmount: productCart.reduce(
        (total: number, item: any) =>
          total +
          item.product?.discountedPrice * item?.quantity +
          (productCart.length * 30) || total + item?.discountedPrice * item?.quantity + (productCart.length * 30),
        0
      ), // Removed the curly braces here
      shippingAddress: (decodedToken as any)?.user.address + ", " + (decodedToken as any)?.user.city + ", " + (decodedToken as any)?.user.state + ", " + (decodedToken as any)?.user.pinCode + ", " + "India",
    }
    try {
      const response = await createOrder(orderData);
      toast.success("Order placed successfully!");
      navigate.push(`/account/myOrders`);  
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-[70rem] mx-auto p-4">
        {/* Delivery Section */}
        <div className="my-8 shadow-[0_0_0_1px_rgba(0,0,0,0.1)] rounded-lg p-4">
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-semibold">Delivering to Shivam</h2>
            {/* <button className="px-4 py-1 bg-[#F4D793] rounded-lg text-md font-medium">
              Change
            </button> */}
          </div>
          <p className="text-sm text-[#565959] mt-2">
            {(decodedToken as any)?.user.address +
              ", " +
              (decodedToken as any)?.user.city +
              ", " +
              (decodedToken as any)?.user.state +
              ", " +
              (decodedToken as any)?.user.pinCode +
              ", " +
              "India"}
          </p>
          <a
            href="#"
            className="text-sm text-[#007185] hover:text-[#c7511f] hover:underline"
          >
            Add delivery instructions
          </a>
        </div>

        {/* Order Summary */}
        <div className="shadow-[0_0_0_1px_rgba(0,0,0,0.1)] rounded-lg mb-8 ">
          <div className="p-4">
            <div className="w-full">
              <ul className="space-y-4">
                {productCart.map((item: any) => (
                  <li
                    key={item._id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="w-16 h-16 flex-shrink-0">
                        <img
                          src={item.imageUrls[0]}
                          alt={item.product?.name || item?.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[1.12rem] text-gray-800 font-semibold">
                              {item.product?.name || item?.name}
                            </span>
                            {item.product?.description && (
                              <p className="text-md text-gray-700">
                                {item.product?.description || item.description}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 w-[20%]">
                            <button
                              onClick={() => handleDeleteCartItem(item._id)}
                              className="w-full"
                            >
                              <Trash2 className="w-6 h-6 text-gray-600" />
                            </button>
                            <span className="text-[1rem] text-gray-800 font-semibold">
                              ₹{item.product?.discountedPrice * item?.quantity  || item?.discountedPrice * item?.quantity}
                            </span>
                          </div>
                        </div>
                        {/* Quantity Controls */}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="my-6" />
            <div className="px-3">
              <h2 className="text-[1.2rem] font-semibold text-gray-800">
                Order Summary
              </h2>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-semibold">Total</span>
                <span className="text-[1.15rem] font-semibold text-gray-900 tracking-wider">
                  ₹
                  {productCart.reduce(
                    (total: number, item: any) =>
                      total + item.product?.discountedPrice * item?.quantity || total + item?.discountedPrice * item?.quantity,
                    0
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-semibold">
                  Shipping Charge
                </span>
                <span className="text-[1.15rem] font-semibold text-gray-900 tracking-wider">
                  ₹ {productCart.length * 30}
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-t border-gray-100">
            <div className="flex items-center justify-between px-3">
              <span className="text-gray-700 font-bold">Grand Total</span>
              <span className="text-[1.15rem] font-bold text-gray-900 tracking-wider">
                ₹
                {productCart.reduce(
                  (total: number, item: any) =>
                    total + item.product?.discountedPrice * item?.quantity || total + item?.discountedPrice * item?.quantity,
                  0
                ) +
                  productCart.length * 30}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Method Section */}
        <div className="my-8 shadow-[0_0_0_1px_rgba(0,0,0,0.1)] rounded-lg">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Payment method</h2>
            <div className="shadow-slate-200 shadow-2xl rounded-lg p-4">
              {/* Credit & Debit Cards */}
              {savedCard && (
                <div className="mb-6">
                  <h3 className="font-medium mb-4">CREDIT & DEBIT CARDS</h3>
                  <div className="flex items-center justify-between border-b border-[#d5d9d9] pb-2">
                    <div className="flex items-center gap-2">
                      <input type="radio" id="axis" name="payment" />
                      <label htmlFor="axis" className="font-medium">
                        Axis Bank Credit Card ending in 5508
                      </label>
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EYeIkrwnQO78PodDP62I3um5sM5i0M.png"
                        alt="Visa"
                        className="w-8 h-5 ml-2"
                      />
                    </div>
                    <span className="text-sm">Shri kant kumar</span>
                  </div>
                </div>
              )}

              {/* Other Payment Methods */}
              <div>
                <h3 className="font-medium mb-4">CHOOSE PAYMENT METHOD</h3>

                {/* Credit/Debit Card Option */}
                <div className="mb-4 mt-4">
                  <div className="mb-4 flex justify-between w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="radio"
                        id="newcard"
                        name="payment"
                        onClick={() => {
                          handleCardPayment();
                          setSelectedPaymentMethod("card");
                        }}
                      />
                      <label htmlFor="newcard" className=" text-lg font-medium">
                        Credit or debit card
                      </label>
                    </div>
                    <div className="ml-6">
                      <img
                        src="/payment/czrd.webp"
                        alt="Payment methods"
                        className="h-10"
                      />
                    </div>
                  </div>
                  {newCard && (
                    <div className="w-full max-w-[45rem] mx-auto text-gray-900 bg-gray-50 shadow-xl overflow-hidden">
                      <div className="p-6 space-y-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="cardNumber"
                            className="text-sm font-medium flex items-center gap-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="lucide lucide-credit-card"
                            >
                              <rect width="20" height="14" x="2" y="5" rx="2" />
                              <line x1="2" x2="22" y1="10" y2="10" />
                            </svg>
                            Card Number
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            placeholder="XXXX-XXXX-XXXX-XXXX"
                            className="w-full px-3 py-2 bg-white border border-white/30 rounded-md text-gray-900 placeholder-gray-700/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2 col-span-2">
                            <label
                              htmlFor="expiry"
                              className="text-sm font-medium flex items-center gap-2"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="lucide lucide-calendar"
                              >
                                <rect
                                  width="18"
                                  height="18"
                                  x="3"
                                  y="4"
                                  rx="2"
                                  ry="2"
                                />
                                <line x1="16" x2="16" y1="2" y2="6" />
                                <line x1="8" x2="8" y1="2" y2="6" />
                                <line x1="3" x2="21" y1="10" y2="10" />
                              </svg>
                              Expiry Date
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                id="expiryMonth"
                                placeholder="MM"
                                maxLength={2}
                                className="w-full px-3 py-2 bg-white border border-white/30 rounded-md text-gray-900 placeholder-gray-700/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                              />
                              <input
                                type="text"
                                id="expiryYear"
                                placeholder="YYYY"
                                maxLength={4}
                                className="w-full px-3 py-2 bg-white border border-white/30 rounded-md text-gray-900 placeholder-gray-700/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="cvv"
                              className="text-sm font-medium flex items-center gap-2"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="lucide lucide-lock"
                              >
                                <rect
                                  width="18"
                                  height="11"
                                  x="3"
                                  y="11"
                                  rx="2"
                                  ry="2"
                                />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                              </svg>
                              CVV
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              placeholder="123"
                              maxLength={3}
                              className="w-full px-3 py-2 bg-white border border-white/30 rounded-md text-gray-900 placeholder-gray-700/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="text-sm font-medium flex items-center gap-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="lucide lucide-user"
                            >
                              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </svg>
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            placeholder="Cardholder Name"
                            className="w-full px-3 py-2 bg-white border border-white/30 rounded-md text-gray-900 placeholder-gray-700/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* UPI Section */}
                <div className="mb-4 mt-4">
                  <div className="flex justify-between w-full mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="radio"
                        id="upi"
                        name="payment"
                        onClick={() => {
                          handleUpiPayment();
                          setSelectedPaymentMethod("upi");
                        }}
                      />
                      <label htmlFor="upi" className=" text-lg font-medium">
                        UPI Payment
                      </label>
                    </div>
                    <div className="ml-6">
                      <img
                        src="/payment/upi.webp"
                        alt="Payment methods"
                        className="h-10 mr-2"
                      />
                    </div>
                  </div>
                  {upi && (
                    <div className="w-full max-w-[45rem] mx-auto text-gray-900 bg-gray-50 shadow-xl overflow-hidden p-6">
                      <p className="text-sm mb-2">Please enter your UPI ID</p>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Enter UPI ID"
                          className="w-full px-3 py-2 bg-white border border-white/30 rounded-md text-gray-900 placeholder-gray-700/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                        <button className="px-4 py-1 bg-[#F4D793] rounded text-md font-medium">
                          Verify
                        </button>
                      </div>
                      <p className="text-xs text-[#565959]">
                        The UPI ID is in the format of name/phone
                        number@bankname
                      </p>
                    </div>
                  )}
                </div>

                {/* Cash on Delivery */}
                <div className="mb-4 mt-4">
                  <div className="flex items-center gap-2 mb-1">
                    <input
                      type="radio"
                      id="cod"
                      name="payment"
                      onClick={() => setSelectedPaymentMethod("cod")}
                    />
                    <label htmlFor="cod" className="text-lg font-medium">
                      Cash on Delivery/Pay on Delivery
                    </label>
                  </div>
                  <p className="text-sm text-[#565959] ml-6">
                    Cash, UPI and Cards accepted.
                    <a
                      href="#"
                      className="text-[#007185] hover:text-[#c7511f] hover:underline ml-1"
                    >
                      Know more.
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-t border-gray-100">
            <div className="flex items-center justify-end px-3">
              <button
                onClick={() => handleCheckout()}
                className="px-10 py-2 bg-[#F4D793] rounded-lg text-md font-semibold w-full sm:w-auto"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm text-[#565959] space-y-4 shadow-[0_0_0_1px_rgba(0,0,0,0.1)] rounded-lg p-4">
          <p>
            Need help? Check our
            <Link
              href="/support24x7"
              className="text-[#007185] hover:text-[#c7511f] hover:underline ml-1"
            >
              contact us 24x7
            </Link>
          </p>
          <p>
            When your order is placed, we'll send you an e-mail message
            acknowledging receipt of your order. If you choose to pay using an
            electronic payment method (credit card, debit card or net banking),
            you will be directed to your bank's website to complete your
            payment. Your contract to purchase an item will not be complete
            until we receive your electronic payment and dispatch your item. If
            you choose to pay using Pay on Delivery (POD), you can pay using
            cash/card/net banking when you receive your item.
          </p>
          <p>
            See Bazario's
            <Link
              href="/cancellation&refund"
              className="text-[#007185] hover:text-[#c7511f] hover:underline ml-1"
            >
              Return Policy
            </Link>
          </p>
          <Link
            href="/cart"
            className="text-[#007185] hover:text-[#c7511f] hover:underline block"
          >
            Back to cart
          </Link>
        </div>
      </div>
      {show && (
        <Modal isOpen={show} onClose={() => setShow(false)} 
        footer={
          <button 
          onClick={() => handlePlaceOrder()}
          className="w-full px-6 py-2 bg-[#ffedc3] text-gray-900 text-[1rem] font-semibold rounded-lg hover:bg-[#F4D793] focus:outline-none focus:ring-2 focus:ring-blue-500">
            Place Order
          </button>
        }
      >
        <div className="bg-white rounded-lg shadow-md p-4">
          {/* Header */}
          <h1 className="text-[0.85rem] text-[#d09227] font-bold mb-6">
            CHECKOUT
          </h1>
      
          {/* Shipping Section */}
          <div className="mb-6">
            <h2 className="text-[1rem] font-semibold mb-2 ">
              Shipping Address
            </h2>
            <p className="text-gray-700">
              {(decodedToken as any)?.user.address +
                ", " +
                (decodedToken as any)?.user.city +
                ", " +
                (decodedToken as any)?.user.state +
                ", " +
                (decodedToken as any)?.user.pinCode +
                ", " +
                "India"}
            </p>
          </div>
      
          {/* Payment Method Section */}
          <div className="mb-6">
            <h2 className="text-[1rem] font-semibold mb-2">Payment Method</h2>
            <p className="text-gray-700">
              {selectedPaymentMethod === "upi" && (
                <span className="text-gray-700"> UPI</span>
              )}
              {selectedPaymentMethod === "card" && (
                <span className="text-gray-700"> Card</span>
              )}
              {selectedPaymentMethod === "cod" && (
                <span className="text-gray-700"> Cash on Delivery</span>
              )}
            </p>
          </div>
      
          {/* Order Summary */}
          <div>
            <h2 className="text-[1rem] font-semibold mb-2">Order Summary</h2>
            <hr className="my-4" />
            <div className="flex justify-between">
              <span className="text-[0.85rem] text-gray-700 font-semibold">
                Subtotal
              </span>
              <span className="text-[0.85rem] font-semibold text-gray-900 tracking-wider">
                ₹
                {productCart.reduce(
                  (total: number, item: any) =>
                    total + item.product?.discountedPrice * item?.quantity || total + item?.discountedPrice * item?.quantity,
                  0
                )}
              </span>
            </div>
      
            <div className="mt-2">
              <div className="flex items-center justify-between">
                <span className="text-[0.85rem] text-gray-700 font-semibold">
                  Shipping Charge
                </span>
                <span className="text-[0.85rem] font-semibold text-gray-900 tracking-wider">
                  ₹ {productCart.length * 30}
                </span>
              </div>
            </div>
      
            <hr className="my-4" />
            <div className="flex justify-between">
              <span className="text-[0.9rem] text-gray-700 font-semibold">
                Total
              </span>
              <span className="text-[0.9rem] font-semibold text-gray-900 tracking-wider">
                ₹
                {productCart.reduce(
                  (total: number, item: any) =>
                    total +
                    item.product?.discountedPrice * item?.quantity +
                    (productCart.length * 30)  || total + item?.discountedPrice * item?.quantity + (productCart.length * 30),
                  0
                )}
              </span>
            </div>
          </div>
        </div>
      </Modal>
      
      )}
      <Footer />
    </>
  );
}
