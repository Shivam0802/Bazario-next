"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/layout/navbar";
import { Footer } from "@/layout/footer";
import ProductCard from "@/component/productCard";
import Subscription from "@/component/subscription";
import {
  ArrowBigUpDash,
  Shirt,
  Truck,
  BadgePercent,
  BadgeIndianRupee,
  Mail,
  Redo2,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  ChevronRight,
} from "lucide-react";
import { ads, productCategories, productDetails } from "@/assets/data";
import { getAllProducts } from "@/services/product.services";
import Chatbot from "@/component/chatbot";
import Client from "@/component/client";
import Image from "next/image";
import DealofdayCard from "@/component/dealofdayCard";
import { itemsCategory, mainAdsBanner, subscription } from "@/assets/data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import toast from "react-hot-toast";
import { subscribeToNewsletter } from "@/services/newsletter.services";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const scrollToTopButton = document.getElementById("scrollToTopButton");

  window.addEventListener("scroll", () => {
    if (scrollToTopButton) {
      if (window.scrollY > 200) {
        scrollToTopButton.classList.remove("opacity-0");
        scrollToTopButton.classList.add("opacity-100");
      } else {
        scrollToTopButton.classList.remove("opacity-100");
        scrollToTopButton.classList.add("opacity-0");
      }
    }
  });

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const handleDropdown = (id: number) => {
    setShowDropdown((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    getAllProducts().then((data: any) => {
      setProducts(data);
    });
  }, []);

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false); // Close the menu if the click is outside
      }
    };

    if (showMobileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMobileMenu]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the default form submission

    try {
      const date = moment(new Date()).format("YYYY-MM-DD");

      const newsletterData = {
        email,
        subscriptionDate: date,
      };

      const res = await subscribeToNewsletter(newsletterData);
      setEmail("");
      toast.success("Subscribed Successfully");
    } catch (e) {
      toast.error(e);
    }
  };

  return (
    <>
      <Navbar />
      <section>
        <Slider {...settings}>
          {mainAdsBanner.map((item, index) => (
            <div key={index}>
              <Image
                src={item.image}
                alt={item.alt}
                width={1920}
                height={1080}
                objectFit="contain"
                className="w-full h-auto sm:h-[30rem] md:h-[50rem] lg:h-[50rem] md:mt-10 lg:mt-10"
              />
            </div>
          ))}
        </Slider>
      </section>

      <section className="flex my-4 hidden sm:block">
        <div className="mt-6 mx-28">
          <h1 className="text-[1.4rem] font-bold uppercase text-gray-800">
            Featured Categories
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mt-6">
            {itemsCategory.map((item, index) => (
              <Link
                href={`/products?category=${item.category}`}
                key={index}
                className="flex items-center space-x-4 p-4 bg-white shadow-xl rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 bg-[#ffe5c9d9] rounded-lg`}
                >
                  <item.image />
                </div>
                <div>
                  <p className="text-xl font-semibold">{item.category}</p>
                  <p className="text-gray-500">
                    {item.description.split(", ").join(" | ")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="md:mt-20 lg:mt-20">
        <Client />
      </div>

      <section className="flex flex-col md:flex-row lg:flex-row mt-0 md:mt-8 lg:mt-8 w-full mx-0 md:mx-4 lg:mx-4 md:ml-20 lg:ml-28">
        <div className="flex flex-col justify-between items-center mx-1 md:mx-4 lg:mx-4 mt-1 md:mt-8 lg:mt-8 w-[8%] md:w-[15%] lg:w-[15%] h-auto">
          {/* Sidebar for desktop */}
          <div className="hidden sm:flex flex-col w-full border border-gray-200 rounded-lg p-4 sm:p-2 bg-white shadow-md">
            <h1 className="text-[1.15rem] font-bold uppercase text-gray-800 leading-3 ml-4 mt-4">
              Categories
            </h1>
            <ul className="flex flex-col gap-2 mt-4">
              {productCategories.map((item, index) => (
                <li key={index} className="relative">
                  <div
                    onClick={() => handleDropdown(index)}
                    className="flex justify-between items-center gap-3 text-[1.14rem] font-medium text-gray-800 leading-8 ml-4 sm:ml-0 cursor-pointer hover:bg-[#ffe5c9d9] px-4 py-2 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      {React.createElement(item.image, {
                        className: "w-2 h-2 inline-block",
                      })}
                      {item.name}
                    </div>
                    <div className="text-[1.25rem] font-medium text-gray-800">
                      {showDropdown === index ? (
                        <Minus
                          size="12"
                          className="text-gray-800 cursor-pointer font-medium"
                          onClick={() => handleDropdown(index)}
                        />
                      ) : (
                        <Plus
                          size="12"
                          className="text-gray-800 cursor-pointer font-medium"
                          onClick={() => handleDropdown(index)}
                        />
                      )}
                    </div>
                  </div>
                  {showDropdown === index && (
                    <ul className="absolute top-12 left-0 z-10 bg-white shadow-lg py-4 rounded-b-lg flex flex-col gap-2 w-full">
                      {item.subCategories.map((subitem, subindex) => (
                        <li
                          key={subindex}
                          className="text-[1.12rem] font-medium text-gray-900 leading-8 ml-4 sm:ml-0 cursor-pointer hover:bg-[#ffe5c9d9] px-4 py-1"
                        >
                          {subitem}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden sm:block w-full border border-gray-200 rounded-lg p-4 sm:p-2 bg-white shadow-md mt-6">
            <h2 className="text-lg font-semibold mb-4">Best Sellers</h2>
            <ul>
              {productDetails.map((product, index) => (
                <li key={index} className="flex items-center mb-4">
                  <div className="w-16 h-16 relative mr-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">
                      {product.name}
                    </h3>
                    <div className="flex items-center">
                      <span className="text-yellow-500 text-sm">
                        {"★".repeat(product.rating)}
                      </span>
                      <span className="text-gray-300 text-sm">
                        {"★".repeat(5 - product.rating)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-gray-500 line-through">
                        {product.originalPrice}
                      </div>
                      <div className="text-gray-800 font-bold">
                        {product.discountedPrice}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden sm:block w-full border border-gray-200 rounded-lg p-4 sm:p-2 bg-white shadow-md mt-6">
            <img
              src="/Promo/ad11.webp"
              alt="banner"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          {/* Navbar for mobile */}
          <div className="relative mt-2 md:hidden lg:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="flex items-center gap-2 cursor-pointer fixed top-24 left-1 z-50"
            >
              <ChevronRight size="32" className="text-gray-800" />
            </button>

            {showMobileMenu && (
              <div
                ref={menuRef}
                className="fixed top-0 left-0 w-[80%] h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50"
              >
                <ul className="flex flex-col gap-4 p-4">
                  {productCategories.map((item, index) => (
                    <li key={index} className="relative">
                      <div
                        onClick={() => handleDropdown(index)}
                        className="flex justify-between items-center text-[1.14rem] font-medium text-gray-800 leading-8 px-4 py-2 rounded-lg cursor-pointer hover:bg-[#ffe5c9d9]"
                      >
                        <div className="flex items-center gap-2">
                          {React.createElement(item.image, {
                            className: "w-6 h-6 inline-block",
                          })}
                          {item.name}
                        </div>
                        <div className="text-[1.25rem] font-medium text-gray-800">
                          {showDropdown === index ? (
                            <Minus
                              size="20"
                              className="text-gray-800 cursor-pointer font-medium"
                            />
                          ) : (
                            <Plus
                              size="20"
                              className="text-gray-800 cursor-pointer font-medium"
                            />
                          )}
                        </div>
                      </div>
                      {showDropdown === index && (
                        <ul className="absolute left-0 top-16 z-10 bg-gray-100 shadow-lg py-4 rounded-lg flex flex-col gap-2 w-full">
                          {item.subCategories.map((subitem, subindex) => (
                            <li
                              key={subindex}
                              className="text-[1.12rem] font-medium text-gray-900 leading-8 px-4 py-1 cursor-pointer hover:bg-[#ffe5c9d9]"
                            >
                              {subitem}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between items-start sm:items-center md:mx-4 lg:mx-4 md:w-[75%] lg:w-[75%] mt-4 sm:mt-0">
          <section className="flex flex-col md:mt-8 lg:mt-8 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center mx-4">
              <div className="flex flex-col w-full sm:w-[35%]">
                <h1 className="md:text-[1.4rem] lg:text-[1.4rem] font-bold uppercase text-gray-800 mt-6 leading-3 ml-4 sm:ml-0">
                  Popular Products
                </h1>
                <p className="md:text-[1.12rem] lg:text-[1.12rem] font-normal text-gray-500 leading-8 ml-4 sm:ml-0">
                  Don't miss out on these amazing products
                </p>
              </div>
            </div>
            <div className="my-8 mx-4 hidden md:grid lg:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {products.slice(0, 5).map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
            <div className="my-8 mx-4 md:hidden lg:hidden grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {products.slice(0, 6).map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </section>

          <section className="flex flex-col mt-8 md:w-full lg:w-full my-10">
            <div className="flex flex-col items-start mx-3 mb-4">
              <h1 className="md:text-[1.4rem] lg:text-[1.4rem] font-bold uppercase text-gray-800 mt-4 leading-5 text-center">
                Deal of the Day
              </h1>
              <p className="md:text-[1.12rem] lg:text-[1.12rem] font-light text-gray-500 leading-6 text-center">
                Don't miss out on these amazing deals
              </p>
              <hr className="border-t border-gray-300 w-full mt-4 mb-4 hidden md:block lg:block" />
            </div>
            <div className="flex flex-col items-center w-full">
              <DealofdayCard />
            </div>
          </section>

          <section className="flex flex-col mt-8 w-full">
            <div className="flex flex-row md:flex-row justify-between items-start sm:items-center mx-4">
              <div className="flex flex-col w-full sm:w-[35%]">
                <h1 className="md:text-[1.43rem] lg:text-[1.43rem] font-bold uppercase text-gray-800 mt-4 leading-5 sm:leading-3">
                  New Arrivals
                </h1>
                <p className="text-base md:text-[1.12rem] lg:text-[1.12rem] font-light text-gray-500 leading-6 sm:leading-8">
                  Check out the latest products in store now
                </p>
              </div>
              <Link
                href="/products"
                className="flex items-center gap-2 bg-gray-100 py-2 px-2 rounded-tl-lg rounded-br-lg rounded-md shadow-lg text-base sm:text-[1.12rem] text-[#3C3D37] hover:text-[#AE445A] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 mt-4 sm:mt-0 w-full md:w-auto"
              >
                View all products
                <Redo2 size="20" className="inline-block" />
              </Link>
            </div>
            <div className="my-8 mx-4 hidden md:grid lg:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {products.slice(0, 5).map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
            <div className="my-8 mx-4 md:hidden lg:hidden grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {products.slice(0, 6).map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="flex flex-col mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mx-4 sm:mx-28">
          <div className="flex flex-col w-full sm:w-[35%]">
            <h1 className="text-xl sm:text-[1.4rem] font-bold uppercase text-gray-800 mt-4 sm:mt-6 leading-5 sm:leading-3">
              Featured Products
            </h1>
            <p className="text-base sm:text-[1.12rem] font-light text-gray-500 leading-6 sm:leading-8">
              Do not miss the current offers until the end of March.
            </p>
          </div>
        </div>
        <div className="my-8 mx-4 sm:mx-28 hidden md:grid lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-8">
          {ads.map((item, index) => {
            return (
              <img
                key={index}
                src={item.img}
                alt="banner"
                className="w-full h-auto object-cover rounded-lg"
              />
            );
          })}
        </div>
        <div className="my-8 mx-4 sm:mx-28 md:hidden lg:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-8">
          <Slider {...settings}>
            {ads.map((item, index) => {
              return (
                <img
                  key={index}
                  src={item.img}
                  alt="banner"
                  className="w-full h-auto object-cover rounded-lg"
                />
              );
            })}
          </Slider>
        </div>
      </section>

      {/*<section className="hidden md:flex lg:flex flex-col justify-center items-center mx-28 mt-8">
        <h1 className="text-[2.25rem] font-extrabold uppercase text-gray-800 mt-4">
          Subscription Plans
        </h1>
        <p className="text-[1.12rem] font-medium text-gray-500 leading-6">
          Choose the best plan for you and get amazing discounts and offers on
          products
        </p>
        <div className="flex flex-row gap-4 mt-4">
          {subscription.map((item, index) => (
            <Subscription key={index} subscription={item} />
          ))}
        </div>
      </section>*/}

      {/*<section className="md:hidden lg:hidden flex flex-col mt-8 w-full">
        <h1 className="text-[1.5rem] font-extrabold uppercase text-gray-800 text-center mt-4 mx-4">
          Subscription Plans
        </h1>
        <p className="text-[0.9rem] font-medium text-gray-500 mx-4 text-center leading-6 mb-4">
          Choose the best plan for you and get amazing discounts and offers on
          products
        </p>
        <Slider {...settings}>
          {subscription.map((item, index) => (
            <Subscription key={index} subscription={item} />
          ))}
        </Slider>
      </section>*/}

      <section className="flex flex-col md:flex-row justify-between bg-[#F5F5F5] m-4 md:m-6 py-6 rounded-[2rem]">
        <div className="flex flex-col w-full md:w-[50%] px-4 md:px-0 lg:px-0 md:mx-28 mt-8">
          <h1 className="text-[1rem] md:text-[1.3rem] font-normal uppercase text-gray-800 mt-4">
            $20 discount for your first order
          </h1>
          <h1 className="text-[1.5rem] md:text-[2rem] font-bold uppercase text-[#eba964] mt-4 mb-8">
            Join our newsletter and get...
          </h1>
          <p className="text-[1rem] md:text-[1.12rem] font-medium text-gray-700 leading-6 md:leading-5 md:px-0 lg:px-0 md:pr-80">
            Join our email subscription now to get updates on promotions and
            coupons.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col md:flex-row mt-8 md:mt-20 gap-4 md:gap-0"
          >
            <div className="flex items-center gap-2 md:rounded-l-lg w-full">
              <div className="relative w-full">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer block w-full rounded-md border-2 border-gray-300 bg-white px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                >
                  Your Email
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#ffe5c9d9] text-gray-700 font-bold px-4 py-2 lg:py-0 md:py-0 w-full md:w-[50%] lg:w-[50%] hover:bg-[#FFDAB3] md:mx-4"
            >
              Subscribe
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center w-full md:w-[50%] mt-8 md:mt-0 md:mr-28">
          <img
            src="/newsletter.webp"
            alt="discount"
            className="w-full h-auto md:h-[24rem] bg-blend-normal"
          />
        </div>
      </section>

      <section className="sm:flex mt-8 mx-28 gap-8 hidden">
        <div className="flex justify-center items-center w-[30%] my-6 gap-2">
          <Shirt size="28" className="text-gray-800" />
          <h1 className="text-[1rem] font-normal text-gray-800 leading-3">
            Everyday trending products
          </h1>
        </div>
        <hr className="border-1 border-gray-300 rotate-90 w-[6rem] h-[4rem]" />
        <div className="flex justify-center items-center w-[30%]  my-6 gap-2">
          <Truck size="28" className="text-gray-800" />
          <h1 className="text-[1rem] font-normal text-gray-800 leading-3">
            Free delivery for order over $70
          </h1>
        </div>
        <hr className="border-1 border-gray-300 rotate-90 w-[6rem] h-[4rem]" />
        <div className="flex justify-center items-center w-[30%] my-6 gap-2">
          <BadgePercent size="28" className="text-gray-800" />
          <h1 className="text-[1rem] font-normal text-gray-800 leading-3">
            Daily Mega Discounts
          </h1>
        </div>
        <hr className="border-1 border-gray-300 rotate-90 w-[6rem] h-[4rem]" />
        <div className="flex justify-center items-center w-[30%] my-6 gap-2">
          <BadgeIndianRupee size="28" className="text-gray-800" />
          <h1 className="text-[1rem] font-normal text-gray-800 leading-3">
            Best price on the market
          </h1>
        </div>
      </section>

      <button
        id="scrollToTopButton"
        className="bg-[#3C3D37] rounded-full w-12 h-12 flex justify-center items-center fixed bottom-28 right-10 cursor-pointer hover:shadow-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowBigUpDash size="28" className="text-white" />
      </button>
      <div className="fixed bottom-10 right-10 z-50">
        <Chatbot />
      </div>
      <Footer />
    </>
  );
}
