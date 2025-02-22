"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/layout/navbar";
import { Footer } from "@/layout/footer";
import { getCartItems, deleteCartItem } from "@/services/poductCart.services";
import { jwtDecode } from "jwt-decode";
import { Trash2, CircleArrowLeft  } from "lucide-react";
import toast from "react-hot-toast";

interface PriductCartItem {
  _id: string;
  imageUrls: string;
  product: {
    _id: string;
    name: string;
    price: number;
    discountedPrice: number;
    description: string;
  };
  quantity: number;
}

export default function Cart() {

  const router = useRouter();
  const [productCart, setProductCart] = React.useState<PriductCartItem[]>([]);

  const decodedToken = jwtDecode(localStorage.getItem("token") as string);
  const userId = (decodedToken as any)?.userId;
  console.log(userId, "userId");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCartItems(userId);
        setProductCart(response);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  console.log(productCart);

  const handleDeleteCartItem = async (cartItemId: string) => {
    try {
      await deleteCartItem(cartItemId); 
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

  const totalPrice = productCart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const saving = productCart.reduce(
    (total, item) =>
      total +
      (item.product.price - item.product.discountedPrice) * item.quantity,
    0
  );

  const shipping = 50;

  const handleBack = () => {
    window.history.back();
  }

  const handleCheckout = () => {
    router.push(`/cart/checkOut?cart=${encodeURIComponent(JSON.stringify(productCart))}`);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 m-8">
        <section className="bg-white py-8 md:pb-16 rounded-[1.5rem] shadow-slate-300 shadow-2xl">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <button 
            type="button" 
            onClick={() => handleBack()}
            className="flex items-center gap-2 mb-10 text-[1.15rem] hover:text-[#DDA853]">
               <CircleArrowLeft size={22} stroke="#DDA853" />
               <span className="font-semibold">Back</span>
            </button>
            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Shopping Cart
            </h2>

            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                  {productCart.map((item: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
                      >
                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                          <a href="#" className="shrink-0 md:order-1">
                            <img
                              className="h-20 w-20 dark:hidden"
                              src={item.imageUrls}
                              alt="imac image"
                            />
                            <img
                              className="hidden h-20 w-20 dark:block"
                              src={item.imageUrls}
                              alt="imac image"
                            />
                          </a>

                          <label htmlFor="counter-input" className="sr-only">
                            Choose quantity:
                          </label>
                          <div className="flex items-center justify-between md:order-3 md:justify-end">
                            <div className="flex items-center">
                              <button
                                type="button"
                                id="decrement-button"
                                data-input-counter-decrement="counter-input"
                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                              >
                                <svg
                                  className="h-2.5 w-2.5 text-gray-900"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 2"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h16"
                                  />
                                </svg>
                              </button>
                              <input
                                type="text"
                                id="counter-input"
                                data-input-counter
                                className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 "
                                placeholder=""
                                value={item.quantity}
                                required
                              />
                              <button
                                type="button"
                                id="increment-button"
                                data-input-counter-increment="counter-input"
                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 "
                              >
                                <svg
                                  className="h-2.5 w-2.5 text-gray-900"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 18"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 1v16M1 9h16"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div className="text-end md:order-4 md:w-32">
                              <p className="text-base font-bold text-gray-900">
                                &#x20B9;
                                {item.product?.discountedPrice * item.quantity}
                              </p>
                            </div>

                            <div className="text-end md:order-5 md:w-32">
                              <button
                                type="button"
                                onClick={() => handleDeleteCartItem(item._id)} // Ensure `id` is correct
                                className="text-sm font-semibold text-gray-900 hover:underline"
                              >
                                <Trash2 size={28} stroke="#872341" />
                              </button>
                            </div>
                          </div>

                          <div className="w-full min-w-0 flex-1 space-y-2 md:order-2 md:max-w-md">
                            <a
                              href="#"
                              className="text-[1.12rem] font-semibold text-gray-900 hover:underline"
                            >
                              {item.product?.name}
                            </a>

                            <p className="text-sm text-gray-500 mt-0">
                              {item.product?.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* <div className="hidden xl:mt-8 xl:block">
                           <h3 className="text-2xl font-semibold text-gray-900">People also bought</h3>
                           <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
                              <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm ">
                                 <a href="#" className="overflow-hidden rounded">
                                    <img className="mx-auto h-44 w-44 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                                    <img className="mx-auto h-44 w-44" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
                                 </a>
                                 <div>
                                    <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline">iMac 27”</a>
                                    <p className="mt-2 text-base font-normal text-gray-500">This generation has some improvements, including a longer continuous battery life.</p>
                                 </div>
                                 <div>
                                    <p className="text-lg font-bold text-gray-900">
                                       <span className="line-through"> $399,99 </span>
                                    </p>
                                    <p className="text-lg font-bold leading-tight text-red-600">$299</p>
                                 </div>
                                 <div className="mt-6 flex items-center gap-2.5">
                                    <button data-tooltip-target="favourites-tooltip-1" type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100">
                                       <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                                       </svg>
                                    </button>
                                    <div id="favourites-tooltip-1" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300">
                                       Add to favourites
                                       <div className="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                    <button type="button" className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 ">
                                       <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                       </svg>
                                       Add to cart
                                    </button>
                                 </div>
                              </div>
                              <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                 <a href="#" className="overflow-hidden rounded">
                                    <img className="mx-auto h-44 w-44 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg" alt="imac image" />
                                    <img className="mx-auto hidden h-44 w-44 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg" alt="imac image" />
                                 </a>
                                 <div>
                                    <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline">Playstation 5</a>
                                    <p className="mt-2 text-base font-normal text-gray-500">This generation has some improvements, including a longer continuous battery life.</p>
                                 </div>
                                 <div>
                                    <p className="text-lg font-bold text-gray-900">
                                       <span className="line-through"> $799,99 </span>
                                    </p>
                                    <p className="text-lg font-bold leading-tight text-red-600">$499</p>
                                 </div>
                                 <div className="mt-6 flex items-center gap-2.5">
                                    <button data-tooltip-target="favourites-tooltip-2" type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100">
                                       <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                                       </svg>
                                    </button>
                                    <div id="favourites-tooltip-2" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300">
                                       Add to favourites
                                       <div className="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                    <button type="button" className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 ">
                                       <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                       </svg>
                                       Add to cart
                                    </button>
                                 </div>
                              </div>
                              <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                 <a href="#" className="overflow-hidden rounded">
                                    <img className="mx-auto h-44 w-44 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg" alt="imac image" />
                                    <img className="mx-auto hidden h-44 w-44 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg" alt="imac image" />
                                 </a>
                                 <div>
                                    <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline">Apple Watch Series 8</a>
                                    <p className="mt-2 text-base font-normal text-gray-500">This generation has some improvements, including a longer continuous battery life.</p>
                                 </div>
                                 <div>
                                    <p className="text-lg font-bold text-gray-900">
                                       <span className="line-through"> $1799,99 </span>
                                    </p>
                                    <p className="text-lg font-bold leading-tight text-red-600">$1199</p>
                                 </div>
                                 <div className="mt-6 flex items-center gap-2.5">
                                    <button data-tooltip-target="favourites-tooltip-3" type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100">
                                       <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                                       </svg>
                                    </button>
                                    <div id="favourites-tooltip-3" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300">
                                       Add to favourites
                                       <div className="tooltip-arrow" data-popper-arrow></div>
                                    </div>

                                    <button type="button" className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 ">
                                       <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                       </svg>
                                       Add to cart
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div> */}
              </div>

              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                  <p className="text-xl font-semibold text-gray-900">
                    Order summary
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 ">
                          Original price
                        </dt>
                        <dd className="text-base font-medium text-gray-900 ">
                          ₹{totalPrice}
                        </dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500">
                          Savings
                        </dt>
                        <dd className="text-base font-medium text-green-600">
                          -₹{saving}
                        </dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500">
                          Store Pickup
                        </dt>
                        <dd className="text-base font-medium text-gray-900">
                          ₹{shipping}
                        </dd>
                      </dl>
                    </div>

                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                      <dt className="text-base font-bold text-gray-900 ">
                        Total
                      </dt>
                      <dd className="text-base font-bold text-gray-900">
                        ₹{totalPrice - saving + shipping}
                      </dd>
                    </dl>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="flex w-full items-center justify-center rounded-lg bg-[#F4D793] px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-primary-800 focus:outline-none"
                  >
                    Proceed to Checkout
                  </button>

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {" "}
                      or{" "}
                    </span>
                    <Link
                      href="/products"
                      title=""
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline"
                    >
                      Continue Shopping
                      <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 12H5m14 0-4 4m4-4-4-4"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="voucher"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        {" "}
                        Do you have a voucher or gift card?{" "}
                      </label>
                      <input
                        type="text"
                        id="voucher"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        placeholder=""
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-lg bg-[#F4D793] px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                    >
                      Apply Code
                    </button>
                  </form>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
