"use client";

import React, { useEffect, useState, useRef, JSX } from "react";
import Navbar from "@/layout/navbar";
import { Footer } from "@/layout/footer";
import { getAllProducts } from "@/services/product.services";
import { addToCart } from "@/services/poductCart.services";
import ProductCard from "@/component/productCard";
import { productCategories, brands, ads } from "@/assets/data";
import Select from "react-select";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default function Home() {
  const [products, setProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [filterData, setFilterData] = useState({
    minPrice: 0,
    maxPrice: 0,
    category: "",
    brand: "",
  });

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        console.log(response);
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDropdown = (id: number) => {
    setShowDropdown((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false); // Close the menu if the click is outside
      }
    };

    if (showMobileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMobileMenu]);

  const filterBrands = () => {
    return brands
      .filter(brand => {
        // Check if the category matches the selected filter
        if (filterData.category) {
          return brand.name === filterData.category;
        }
        return true;
      })
      .flatMap(brand => brand.brand.map(b => b.label)); // Extract brand labels
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };


  return (
    <>
      <Navbar />
      <section className="flex flex-col md:flex-row lg:flex-row mt-0 md:mt-8 lg:mt-8 mx-0 md:mx-10 lg:mx-10">

        <div className="flex flex-col justify-between items-start sm:items-center md:mx-4 lg:mx-4 md:w-[100%] lg:w-[100%] mt-4 sm:mt-0">

          <section className="flex flex-row md:mt-8 lg:mt-8 justify-between items-center mx-4 md:w-[100%] lg:w-[100%]">
            <div className="flex flex-col w-full bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Filter Products</h2>
              <div className="flex flex-col md:flex-row lg:flex-row gap-4">
                <div className="flex flex-row space-x-2 md:space-x-4 lg:space-x-4 w-full">
                  <div className="relative">
                    <input
                      type="number"
                      id="name"
                      name="name"
                      className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                    >
                      Min Price
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="number"
                      id="name"
                      name="name"
                      className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                    >
                      Max Price
                    </label>
                  </div>
                </div>

                <div className="flex flex-row space-x-2 md:space-x-4 lg:space-x-4 w-full">
                  <div className="relative w-1/2">
                    <Select
                      options={productCategories.map(category => ({ value: category.name, label: category.name }))}
                      placeholder="Select Category"
                      onChange={(selectedOption) => {
                        if (selectedOption) {
                          setFilterData((prevData) => ({
                            ...prevData,
                            category: selectedOption.value,
                          }));
                        }
                      }}
                      className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent pt-[1rem] text-[1rem] text-gray-900 focus:border-[#f0a75b] focus:outline-none"
                      styles={{
                        control: (styles) => ({ ...styles, backgroundColor: "transparent", border: "none", boxShadow: "none" }),
                        option: (styles, { isFocused, isSelected }) => ({
                          ...styles,
                          backgroundColor: isSelected ? "#FFDAB3" : isFocused ? "#ffe5c9d9" : "transparent",
                          color: isSelected ? "black" : "inherit",
                          fontSize: "0.9rem",
                          fontWeight: "500",
                        }),
                        menu: (styles) => ({ ...styles, backgroundColor: "white" }),
                        menuList: (styles) => ({
                          ...styles,
                          overflowY: "auto",
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }),
                        placeholder: (styles) => ({ ...styles, color: 'darkslategrey', fontSize: "0.9rem", fontWeight: "600" }),
                        singleValue: (styles) => ({ ...styles, color: "darkslategrey", fontSize: "1rem", fontWeight: "600" }),
                      }}
                    />
                    <label
                      className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                    >
                      Category
                    </label>
                  </div>

                  <div className="relative w-1/2">
                    <Select
                      options={filterBrands().map(brand => ({ value: brand, label: brand }))}
                      placeholder="Select Brand"
                      className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent pt-[1rem] text-[1rem] text-gray-900 focus:border-[#f0a75b] focus:outline-none"
                      styles={{
                        control: (styles) => ({ ...styles, backgroundColor: "transparent", border: "none", boxShadow: "none" }),
                        option: (styles, { isFocused, isSelected }) => ({
                          ...styles,
                          backgroundColor: isSelected ? "#FFDAB3" : isFocused ? "#ffe5c9d9" : "transparent",
                          color: isSelected ? "black" : "inherit",
                          fontSize: "0.9rem",
                          fontWeight: "500",
                        }),
                        menu: (styles) => ({ ...styles, backgroundColor: "white" }),
                        menuList: (styles) => ({
                          ...styles,
                          overflowY: "auto",
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }),
                        placeholder: (styles) => ({ ...styles, color: 'darkslategrey', fontSize: "0.9rem", fontWeight: "600" }),
                        singleValue: (styles) => ({ ...styles, color: "darkslategrey", fontSize: "1rem", fontWeight: "600" }),
                      }}
                    />
                    <label
                      className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                    >
                      Brands
                    </label>
                  </div>
                </div>

                <button className="px-4 py-1 bg-[#FFDAB3] text-gray-900 font-semibold rounded-md md:w-[15%] lg:w-[15%]">Apply Filters</button>
              </div>
            </div>
          </section>

          <section className="flex flex-col justify-between items-start md:mx-4 lg:mx-4 md:w-[100%] lg:w-[100%] mt-4 sm:mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-start mx-4">
              <div className="flex flex-col w-full">
                <h1 className="md:text-[1.4rem] lg:text-[1.4rem] font-bold uppercase text-gray-800 mt-6 leading-3 ml-4 sm:ml-0">
                  Popular Products
                </h1>
                <p className="md:text-[1.12rem] lg:text-[1.12rem] font-normal text-gray-500 leading-8 ml-4 sm:ml-0">
                  Don't miss out on these amazing products
                </p>
              </div>
            </div>
            <div className="my-8 mx-4 hidden md:grid lg:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 w-full">
              {products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
            <div className="my-8 mx-4 md:hidden lg:hidden grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              {products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
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
            <div className="my-8 mx-4 hidden md:grid lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-8">
              {
                ads.map((item, index) => {
                  return (
                    <img key={index} src={item.img} alt="banner" className="w-full h-auto object-cover rounded-lg" />
                  )
                })
              }
            </div>
            <div className="my-8 mx-4 md:hidden lg:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-8">
              <Slider {...settings}>
                {
                  ads.map((item, index) => {
                    return (
                      <img key={index} src={item.img}
                        alt="banner"
                        className="w-full h-auto object-cover rounded-lg"
                      />
                    )
                  }
                  )}
              </Slider>
            </div>
          </section>
        </div>
      </section>
      {/* </section> */}
      <Footer />
    </>
  );
}
