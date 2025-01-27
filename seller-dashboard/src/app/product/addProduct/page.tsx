"use client";

import React, { useState } from 'react';
import { UploadCloud, X } from 'lucide-react';
import Select from 'react-select';
import { productCategories } from '@/assets/data';
import { useRouter } from 'next/navigation';
import Sidebar from '@/layout/sidebar';

const AddProductForm = () => {

  const navigate = useRouter();
  const [productImages, setProductImages] = useState<string[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [subCategories, setSubCategories] = useState<any[]>([]);

  // Handle category selection
  const handleCategoryChange = (selectedOption: any) => {
    setSelectedCategory(selectedOption);
    if (selectedOption) {
      const category = productCategories.find((cat) => cat.name === selectedOption.value);
      if (category) {
        setSubCategories(category.subCategories.map((subCat) => ({ value: subCat, label: subCat })));
      } else {
        setSubCategories([]);
      }
    } else {
      setSubCategories([]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setProductImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setProductImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Product added successfully!');
    navigate.push('/product'); // Redirect to the product list page
  };

  return (
    <>
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-[16rem] lg:w-[16rem] bg-gray-800 text-white">
        <Sidebar />
      </div>
      <div className="bg-[#fff5eb] w-full flex-1 p-6 md:p-8 lg:p-8 py-auto">
    <div className="w-[70rem] mx-auto my-auto p-8 bg-white rounded-xl shadow-lg h-fit">
      <h1 className="text-3xl font-bold mb-8 text-center">Add a New Product</h1>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="relative mb-6">
          <input
            type="text"
            id="Product name"
            name="Product name"
            className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
          />
          <label
            htmlFor="name"
            className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
          >
            Product Name
          </label>
        </div>

        {/* Product Description */}
        <div className="relative mb-6">
          <textarea
            id="Product Description"
            name="Product Description"
            className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
          />
          <label
            htmlFor="name"
            className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
          >
            Product Description
          </label>
        </div>

        {/* Product Price */}
        <div className="relative mb-6">
          <input
            type="number"
            id="price"
            name="price"
            className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
          />
          <label
            htmlFor="name"
            className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
          >
            Product Price
          </label>
        </div>


        <div className='flex flex-col md:flex-row lg:flex-row gap-4'>
          {/* Category Dropdown */}
          <div className="relative mb-6 w-full">
            <Select
              options={productCategories.map((cat) => ({ value: cat.name, label: cat.name }))}
              placeholder="Select Category"
              value={selectedCategory}
              onChange={handleCategoryChange}
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
                menuList: (styles) => ({ ...styles, overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }),
                placeholder: (styles) => ({ ...styles, color: "darkslategrey", fontSize: "0.9rem", fontWeight: "600" }),
                singleValue: (styles) => ({ ...styles, color: "darkslategrey", fontSize: "1rem", fontWeight: "600" }),
              }}
            />
            <label
              className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
            >
              Categories
            </label>
          </div>

          {/* Sub-Category Dropdown */}
          <div className="relative mb-6 w-full">
            <Select
              options={subCategories}
              placeholder="Select Sub-Category"
              isDisabled={!selectedCategory}
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
                menuList: (styles) => ({ ...styles, overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }),
                placeholder: (styles) => ({ ...styles, color: "darkslategrey", fontSize: "0.9rem", fontWeight: "600" }),
                singleValue: (styles) => ({ ...styles, color: "darkslategrey", fontSize: "1rem", fontWeight: "600" }),
              }}
            />
            <label
              className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
            >
              Sub Categories
            </label>
          </div>
        </div>

        {/* Product Inventory */}
        <div className="relative mb-6">
          <input
            type="number"
            id="productInventory"
            name="productInventory"
            className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
          />
          <label
            htmlFor="name"
            className="absolute left-3 top-2 text-[0.7rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
          >
            Product Inventory
          </label>
        </div>


        {/* Product Images */}
        <div>
          <label htmlFor="productImages" className="block text-sm font-medium text-gray-700">
            Product Images
          </label>
          <div className="mt-1 flex flex-wrap gap-4">
            {productImages.map((image, index) => (
              <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md">
                <img
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            ))}
            <label
              htmlFor="imageUpload"
              className="flex items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition-colors"
            >
              <UploadCloud className="w-6 h-6 text-gray-400" />
              <input
                type="file"
                id="imageUpload"
                name="imageUpload"
                className="hidden"
                multiple
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex space-x-4 mt-4">
              <button
                type="button"
                onClick={() => navigate.push('/product')}
                className="w-full cursor-pointer bg-[#e9e9e9de] relative inline-flex items-center justify-center gap-2 rounded-md text-[0.9rem] md:text-lg lg:text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-200 h-9 rounded-md px-5"
              > Cancel </button>
              <button
                type="submit"
                className="w-full cursor-pointer bg-[#ffe5c9d9] relative inline-flex items-center justify-center gap-2 rounded-md text-[0.9rem] md:text-lg lg:text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#FFDAB3] h-9 rounded-md px-4"
              >
                Add Product
              </button>
            </div>
      </form>
    </div>
    </div>
    </div>
    </>
  );
};

export default AddProductForm;