"use client";

import { addProduct, getProductById, updateProduct } from "@/services/product.service";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/layout/sidebar";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import Select from "react-select";
import { stockdetails } from "@/assets/data";
import { X } from "lucide-react";


export default function ProductForm() {

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useRouter();
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subCategory: "",
    brand: "",
    sku: "",
    price: "",
    discountedPrice: "",
    stock: "",
    availability: "in-stock",
    images: [],
    imageUrls: [],
    videos: [],
    weight: "",
    dimensions: { length: "", width: "", height: "" },
    shippingOptions: [],
    returnPolicy: "",
    colors: [],
    sizes: [],
    material: "",
    warranty: "",
    tags: [],
    additionalInfo: [],
  });

  const handleChange = (e: any, field?: string) => {
    if (field) {
      setFormData({ ...formData, [field]: e.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return; // Ensure files exist

    const files: File[] = Array.from(e.target.files); // Convert FileList to an array of File objects

    const imageUrls = files.map((file: File) => URL.createObjectURL(file)); // Create preview URLs

    setFormData((prev: any) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ...imageUrls], // Store preview URLs (only for UI)
      images: [...prev.images, ...files], // Store File objects (for backend submission)
    }));
  };
  
  
  const getProductDetails = async (productId: string) => {
    try {
      const response = await getProductById(productId);
      //console.log(response, "response");
      setFormData(response);
    }
    catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getProductDetails(id);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const token = Cookies.get("authToken");
  
      if (!token) {
        throw new Error("No token found. Please log in.");
      }
  
      const decodeToken = jwtDecode(token);
  
      // Create FormData object to handle file uploads
      const formDataToSend = new FormData();
  
      formDataToSend.append("userId", (decodeToken as any)?.userId);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("subCategory", formData.subCategory);
      formDataToSend.append("brand", formData.brand);
      formDataToSend.append("sku", formData.sku);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("discountedPrice", formData.discountedPrice);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("availability", formData.availability);
      formDataToSend.append("weight", formData.weight);
      formDataToSend.append("returnPolicy", formData.returnPolicy);
  
      // ✅ Append optional fields only if they exist
      if (formData.colors?.length) {
        formData.colors.forEach((color: string) => {
          formDataToSend.append("color", color);
        });
      }
  
      if (formData.material) {
        formDataToSend.append("material", formData.material);
      }
  
      if (formData.warranty) {
        formDataToSend.append("warranty", formData.warranty);
      }
  
      if (formData.sizes?.length) {
        formData.sizes.forEach((size: string) => {
          formDataToSend.append("size", size);
        });
      }
  
      if (formData.tags?.length) {
        formData.tags.forEach((tag: string) => {
          formDataToSend.append("tag", tag);
        });
      }
  
      if (formData.dimensions) {
        if (formData.dimensions.length) {
          formDataToSend.append("dimensions[length]", formData.dimensions.length);
        }
        if (formData.dimensions.width) {
          formDataToSend.append("dimensions[width]", formData.dimensions.width);
        }
        if (formData.dimensions.height) {
          formDataToSend.append("dimensions[height]", formData.dimensions.height);
        }
      }
  
      if (formData.images?.length) {
        formData.images.forEach((file: File) => {
          formDataToSend.append("images", file);
        });
      }
  
      console.log([...formDataToSend.entries()], "formDataToSend");
  
      let result;
      if (id) {
        result = await updateProduct(id, formDataToSend);
      } else {
        result = await addProduct(formDataToSend);
      }
  
      console.log(result, "result");
  
      if (result?.message) {
        navigate.push("/product");
        toast.success(result.message, {
          duration: 5000,
          position: "top-center",
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    }
  };
  

  const handleRemoveImage = (index: number) => {
    const updatedImagePreviews = [...formData.imageUrls];
    updatedImagePreviews.splice(index, 1);
    setFormData({ ...formData, imageUrls: updatedImagePreviews });

    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
  };

  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="px-8 py-6 bg-gradient-to-r from-[#f0a75b] to-[#e09b4f]">
            <h2 className="text-3xl font-bold text-white">Add New Product</h2>
            <p className="mt-2 text-white/80">
              Fill in the details below to add a new product to your inventory
            </p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Basic Information Section */}
              <div className="col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative col-span-2">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="peer w-full rounded-lg border-2 border-gray-300 bg-transparent px-4 pt-6 pb-2 text-gray-900 transition-all focus:border-[#f0a75b] focus:outline-none"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs"
                    >
                      Product Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="peer w-full rounded-lg border-2 border-gray-300 bg-transparent px-4 pt-6 pb-2 text-gray-900 transition-all focus:border-[#f0a75b] focus:outline-none"
                    />
                    <label
                      htmlFor="category"
                      className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs"
                    >
                      Category
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      id="subCategory"
                      name="subCategory"
                      value={formData.subCategory}
                      onChange={handleChange}
                      required
                      className="peer w-full rounded-lg border-2 border-gray-300 bg-transparent px-4 pt-6 pb-2 text-gray-900 transition-all focus:border-[#f0a75b] focus:outline-none"
                    />
                    <label
                      htmlFor="subCategory"
                      className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs"
                    >
                      Sub-Category
                    </label>
                  </div>

                  <div className="relative col-span-2">
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description} // Bind value to state
                      onChange={(e) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      } // Update state on change
                      rows={5} // Adjust height
                      className="peer w-full rounded-lg border-2 border-gray-300 bg-transparent px-4 pt-6 pb-2 text-gray-900 transition-all focus:border-[#f0a75b] focus:outline-none"
                    />
                    <label
                      htmlFor="description"
                      className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs"
                    >
                      Product Description
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      id="brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      required
                      className="peer w-full rounded-lg border-2 border-gray-300 bg-transparent px-4 pt-6 pb-2 text-gray-900 transition-all focus:border-[#f0a75b] focus:outline-none"
                    />
                    <label
                      htmlFor="brand"
                      className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs"
                    >
                      Brand
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      id="sku"
                      name="sku"
                      value={formData.sku}
                      onChange={handleChange}
                      required
                      className="peer w-full rounded-lg border-2 border-gray-300 bg-transparent px-4 pt-6 pb-2 text-gray-900 transition-all focus:border-[#f0a75b] focus:outline-none"
                    />
                    <label
                      htmlFor="sku"
                      className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs"
                    >
                      SKU
                    </label>
                  </div>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="col-span-2 md:col-span-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Pricing
                </h3>
                <div className="space-y-6">
                  <div className="relative">
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      className="peer w-full rounded-lg border-2 border-gray-300 bg-transparent px-4 pt-6 pb-2 text-gray-900 transition-all focus:border-[#f0a75b] focus:outline-none"
                    />
                    <label
                      htmlFor="price"
                      className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs"
                    >
                      Price
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="number"
                      id="discountedPrice"
                      name="discountedPrice"
                      value={formData.discountedPrice}
                      onChange={handleChange}
                      className="peer w-full rounded-lg border-2 border-gray-300 bg-transparent px-4 pt-6 pb-2 text-gray-900 transition-all focus:border-[#f0a75b] focus:outline-none"
                    />
                    <label
                      htmlFor="discountedPrice"
                      className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs"
                    >
                      Discounted Price
                    </label>
                  </div>
                </div>
              </div>

              {/* Stock & Availability Section */}
              <div className="col-span-2 md:col-span-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Stock & Availability
                </h3>
                <div className="space-y-6">
                  <div className="relative">
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      required
                      className="peer w-full rounded-lg border-2 border-gray-300 bg-transparent px-4 pt-6 pb-2 text-gray-900 transition-all focus:border-[#f0a75b] focus:outline-none"
                    />
                    <label
                      htmlFor="stock"
                      className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs"
                    >
                      Stock
                    </label>
                  </div>

                  <div className="relative">
                    <Select
                      id="availablity"
                      options={stockdetails as any}
                      placeholder="Select"
                      value={
                        stockdetails.find(
                          (s: any) => s.value === formData.availability
                        ) || null
                      }
                      onChange={(selectedOption) =>
                        handleChange(selectedOption, "availability")
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
                          marginLeft: "6px",
                        }),
                        singleValue: (styles) => ({
                          ...styles,
                          color: "darkslategrey",
                          fontSize: "0.9rem",
                          fontWeight: "600",
                          marginLeft: "6px",
                        }),
                      }}
                    />
                    <label
                      htmlFor="availability"
                      className="absolute left-4 top-2 text-xs font-medium text-gray-500"
                    >
                      Availability
                    </label>
                  </div>
                </div>
              </div>

              {/* Dimensions Section */}
              <div className="col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Dimensions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      id="dimensions.length"
                      name="dimensions.length"
                      value={formData.dimensions.length}
                      onChange={handleChange}
                      className="peer w-full rounded-lg border-2 border-gray-300 bg-transparent px-4 pt-6 pb-2 text-gray-900 transition-all focus:border-[#f0a75b] focus:outline-none"
                    />
                    <label
                      htmlFor="dimensions.length"
                      className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs"
                    >
                      Length
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      id="dimensions.width"
                      name="dimensions.width"
                      value={formData.dimensions.width}
                      onChange={handleChange}
                      className="peer w-full rounded-lg border-2 border-gray-300 bg-transparent px-4 pt-6 pb-2 text-gray-900 transition-all focus:border-[#f0a75b] focus:outline-none"
                    />
                    <label
                      htmlFor="dimensions.width"
                      className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs"
                    >
                      Width
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      id="dimensions.height"
                      name="dimensions.height"
                      value={formData.dimensions.height}
                      onChange={handleChange}
                      className="peer w-full rounded-lg border-2 border-gray-300 bg-transparent px-4 pt-6 pb-2 text-gray-900 transition-all focus:border-[#f0a75b] focus:outline-none"
                    />
                    <label
                      htmlFor="dimensions.height"
                      className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs"
                    >
                      Height
                    </label>
                  </div>
                </div>
              </div>

              {/* SEO Section */}
              <div className="col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Additional Information
                </h3>

                {/* Predefined Fields */}
                <div className="grid grid-cols-1 md:frid-cols-3 lg:grid-cols-3 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.returnPolicy}
                      onChange={(e) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          returnPolicy: e.target.value,
                        }))
                      }
                      className="peer w-full rounded-lg border-2 border-gray-300 bg-transparent px-4 pt-6 pb-2 text-gray-900 transition-all focus:border-[#f0a75b] focus:outline-none"
                    />
                    <label className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs">
                      Return Policy
                    </label>
                  </div>

                  {/* Sizes (Array) */}
                  <div className="relative">
                    <input
                      type="text"
                      value={formData?.sizes?.join(", ")}
                      onChange={(e) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          sizes: e.target.value
                            .split(",")
                            .map((item) => item.trim()),
                        }))
                      }
                      className="peer w-full rounded-lg border-2 border-gray-300 bg-transparent px-4 pt-6 pb-2 text-gray-900 transition-all focus:border-[#f0a75b] focus:outline-none"
                    />
                    <label className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs">
                      Sizes
                    </label>
                  </div>

                  {/* Material */}
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.material}
                      onChange={(e) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          material: e.target.value,
                        }))
                      }
                      className="peer w-full rounded-lg border-2 border-gray-300 bg-transparent px-4 pt-6 pb-2 text-gray-900 transition-all focus:border-[#f0a75b] focus:outline-none"
                    />
                    <label className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs">
                      Material
                    </label>
                  </div>

                  {/* Warranty */}
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.warranty}
                      onChange={(e) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          warranty: e.target.value,
                        }))
                      }
                      className="peer w-full rounded-lg border-2 border-gray-300 bg-transparent px-4 pt-6 pb-2 text-gray-900 transition-all focus:border-[#f0a75b] focus:outline-none"
                    />
                    <label className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs">
                      Warranty
                    </label>
                  </div>

                  {/* Tags (Array) */}
                  <div className="relative">
                    <input
                      type="text"
                      value={formData?.tags?.join(", ")}
                      onChange={(e) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          tags: e.target.value
                            .split(",")
                            .map((item) => item.trim()),
                        }))
                      }
                      className="peer w-full rounded-lg border-2 border-gray-300 bg-transparent px-4 pt-6 pb-2 text-gray-900 transition-all focus:border-[#f0a75b] focus:outline-none"
                    />
                    <label className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs">
                      Tags
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-3">
                  {formData?.colors?.map(
                    (color: { name: string; hex: string }, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        {/* Color Name Input (Only for UI, not sent to backend) */}
                        <div className="relative peer w-full rounded-lg border-2 border-gray-300 bg-transparent px-4 pt-6 pb-2 text-gray-900 transition-all focus:border-[#f0a75b] focus:outline-none">
                          <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={color.name}
                          onChange={(e) => {
                            const updatedColors = [...formData.colors] as Array<{name: string, hex: string}>;
                            updatedColors[index].name = e.target.value;
                            setFormData((prev: any) => ({
                              ...prev,
                              colors: updatedColors,
                            }));
                          }}
                          placeholder="Enter color name"
                          className="w-[90%] py-2 focus:outline-none"
                        />

                        {/* Hex Code Input */}
                        <input
                          type="color"
                          value={color.hex}
                          onChange={(e) => {
                            const updatedColors = [...formData.colors] as Array<{name: string, hex: string}>;
                            updatedColors[index].hex = e.target.value;
                            setFormData((prev: any) => ({
                              ...prev,
                              colors: updatedColors,
                            }));
                          }}
                          className="w-[10%] cursor-pointer border-none rounded-full"
                        />
                        </div>
                        <label
                        className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs"
                        >
                          Color
                        </label>

                        </div>

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev: any) => ({
                              ...prev,
                              colors: prev.colors.filter(
                                (_: any, i: number) => i !== index
                              ),
                            }));
                          }}
                          className="px-1 py-1 text-red-900 rounded-full border-[0.15rem] border-red-500"
                        >
                          <X size={24} strokeWidth={2} />
                        </button>
                      </div>
                    )
                  )}

                  {/* Add More Colors Button */}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev: any) => ({
                        ...prev,
                        colors: [...prev.colors, { name: "", hex: "#000000" }],
                      }))
                    }
                    className="mt-4 px-4 py-2 bg-gradient-to-r from-[#f0a75b] to-[#e09b4f] text-white rounded-lg hover:from-[#e09b4f] hover:to-[#d08e42] transition"
                  >
                    + Add Color
                  </button>
                </div>

                {/* Custom Key-Value Fields */}
                <div className="mt-6">
                  <h4 className="text-md font-semibold text-gray-800 mb-2">
                    Custom Fields
                  </h4>
                  { formData.additionalInfo && formData.additionalInfo.map(
                    (info: { key: string; value: string }, index: number) => (
                      <div
                        key={index}
                        className="grid grid-cols-2 gap-4 items-center mb-2"
                      >
                        <div className="relative">
                          <input
                            id="key"
                            type="text"
                            value={info.key}
                            onChange={(e) => {
                              const updatedInfo = [
                                ...formData.additionalInfo,
                              ] as Array<{ key: string; value: string }>;
                              updatedInfo[index].key = e.target.value;
                              setFormData((prev: any) => ({
                                ...prev,
                                additionalInfo: updatedInfo,
                              }));
                            }}
                            className="peer w-full rounded-lg border-2 border-gray-300 bg-transparent px-4 pt-6 pb-2 text-gray-900 transition-all focus:border-[#f0a75b] focus:outline-none"
                          />
                          <label
                            htmlFor="key"
                            className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs"
                          >
                            New Field
                          </label>
                        </div>
                        <div className="relative">
                          <input
                            id="value"
                            type="text"
                            value={info.value}
                            onChange={(e) => {
                              const updatedInfo = [
                                ...formData.additionalInfo,
                              ] as Array<{ key: string; value: string }>;
                              updatedInfo[index].value = e.target.value;
                              setFormData((prev: any) => ({
                                ...prev,
                                additionalInfo: updatedInfo,
                              }));
                            }}
                            className="peer w-full rounded-lg border-2 border-gray-300 bg-transparent px-4 pt-6 pb-2 text-gray-900 transition-all focus:border-[#f0a75b] focus:outline-none"
                          />
                          <label
                            htmlFor="value"
                            className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs"
                          >
                            Value
                          </label>
                        </div>

                        <button
                          onClick={() => {
                            const updatedInfo = formData.additionalInfo.filter(
                              (_, i) => i !== index
                            );
                            setFormData((prev: any) => ({
                              ...prev,
                              additionalInfo: updatedInfo,
                            }));
                          }}
                          className="col-span-2 text-red-500 text-sm underline hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    )
                  )}
                </div>

                {/* Add More Button */}
                <button
                  onClick={() =>
                    setFormData((prev: any) => ({
                      ...prev,
                      additionalInfo: [
                        ...prev.additionalInfo,
                        { key: "", value: "" },
                      ],
                    }))
                  }
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-[#f0a75b] to-[#e09b4f] text-white rounded-lg hover:from-[#e09b4f] hover:to-[#d08e42] transition"
                >
                  + Add More
                </button>
              </div>

              {/* Image Upload Section */}
              <div className="col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Product Images
                </h3>
                <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg">
                  <input
                    type="file"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span className="mt-2 text-sm text-gray-500">
                      Click to upload images
                    </span>
                  </label>
                </div>

                {/* Image Preview */}
                {formData.imageUrls &&  formData.imageUrls?.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Image Previews
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {formData.imageUrls.map((imageUrl, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={imageUrl}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg shadow-sm"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="text-white bg-red-500 p-1.5 rounded-full hover:bg-red-600 focus:outline-none transform transition hover:scale-110"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-[#f0a75b] to-[#e09b4f] text-white font-semibold rounded-lg hover:from-[#e09b4f] hover:to-[#d08e42] focus:outline-none focus:ring-2 focus:ring-[#f0a75b] focus:ring-opacity-50 transform transition hover:scale-105"
              >
                Add Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
