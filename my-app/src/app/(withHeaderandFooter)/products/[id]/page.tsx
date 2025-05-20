"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Footer } from "@/layout/footer";
import Navbar from "@/layout/navbar";
import Select from "react-select";
import { getProductById, getAllProducts } from "@/services/product.services";
import { addToCart } from "@/services/poductCart.services";
import { jwtDecode } from "jwt-decode";
import ProductCard from "@/component/productCard";
import toast from "react-hot-toast";
import { addReview, getReviewsByProductId } from "@/services/review.services";

interface Product {
  id: string;
  name: string;
  category: string;
  imageUrls: string[];
  discountedPrice: number;
  price: number;
  businessName: string;
  description: string;
  rating: number;
  reviewCount: number;
}

interface Review {
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  images: string[];
  imageUrls: string[];
}

export default function ProductInfo() {
  const { id } = useParams();
  const navigate = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  const [formData, setFormData] = useState<{
    rating: number;
    review: string;
    images: File[];
    imageUrls: string[];
  }>({
    rating: 0,
    review: "",
    images: [],
    imageUrls: [],
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Ensure id is a string
    const productId = Array.isArray(id) ? id[0] : id;
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId);
        setProduct(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  //console.log(product);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const response = await getAllProducts(product?.category);
        setSimilarProducts(response);
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    };
    fetchSimilarProducts();
  }, []);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleAddToCart = async (e: any) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate.push("/signin");
      }

      const decodedtoken = jwtDecode(localStorage.getItem("token") as string);

      const userId = (decodedtoken as any)?.userId;

      const cartProduct = {
        userId: userId,
        productId: id,
        quantity: 1,
      };
      const response = await addToCart(cartProduct);
      toast.success("Product added to cart successfully!");
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  };

  //const [productCart, setProductCart] = useState<Product[]>([]);

  const handlePlaceOrder = () => {
    const productItem = { ...product, quantity: 1 };
    console.log(productItem);
    navigate.push(
      `/cart/checkOut?cart=${encodeURIComponent(JSON.stringify(productItem))}`
    );
  };

  useEffect(() => {
    if (product?.imageUrls && product.imageUrls.length > 0) {
      setSelectedImage(product?.imageUrls[0]);
    }
  }, [product]);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate.push("/signin");
      }

      const decodedtoken = jwtDecode(localStorage.getItem("token") as string);

      //console.log(decodedtoken);

      const userId = (decodedtoken as any)?.userId;

      setDeliveryAddress((decodedtoken as any)?.user?.address);
    } catch (error) {
      console.error("Error fetching similar products:", error);
    }
  }, []);

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

  const handleSubmitReview = async (e: any) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate.push("/signin");
      }

      const decodedtoken = jwtDecode(localStorage.getItem("token") as string);

      const userId = (decodedtoken as any)?.userId;

      const formDataToSend = new FormData();

      formDataToSend.append("rating", formData.rating.toString());
      formDataToSend.append("review", formData.review);
      formDataToSend.append("productId", id as string);
      formDataToSend.append("userId", userId as string);

      formData.images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      console.log(formDataToSend, "FormDataToSend");

      const response = await addReview(formDataToSend);
      toast.success("Review submitted successfully!");
      setFormData({
        rating: 0,
        review: "",
        images: [],
        imageUrls: [],
      });
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await getReviewsByProductId(id as string);
      console.log(response.data, "hdsgf");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, [id]);

  console.log(reviews, "reviews");

  return (
    <>
      <Navbar />
      <section className="flex flex-col items-center justify-between m-6 rounded-[2.5rem] p-10">
        <div className="flex flex-col sm:flex-row justify-between gap-16 mx-0 sm:mx-72">
          <div className="flex flex-col gap-10 px-10 sm:px-0">
            {loading || !product ? (
              <div className="w-[40rem] h-[30rem] bg-gray-200 animate-pulse"></div>
            ) : (
              <img
                src={selectedImage || product.imageUrls[0]}
                alt={product.name}
                className="w-[35rem] h-[25rem] sm:w-[45rem] sm:h-[40rem] object-contain shadow-slate-500 shadow-lg rounded-md p-10"
              />
            )}

            {/* Thumbnail Images */}
            {product && product.imageUrls.length > 1 && (
              <div className="flex flex-row gap-4">
                {product.imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Product ${index + 1}`}
                    className={`w-[9rem] h-[9rem] object-contain shadow-slate-500 shadow-lg rounded-md cursor-pointer 
              ${selectedImage === url ? "border-4 border-blue-500" : ""}`} // Highlight selected image
                    onClick={() => setSelectedImage(url)} // Set selected image on click
                  />
                ))}
              </div>
            )}

            <div className="flex flex-row gap-4">
              <button
                onClick={handlePlaceOrder}
                className={`flex items-center gap-4 justify-center h-12 hover:bg-[#A35C7A] text-[1rem] text-gray-50 font-semibold uppercase bg-[#C890A7] py-2 w-full ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-hand-coins"
                >
                  <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
                  <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
                  <path d="m2 16 6 6" />
                  <circle cx="16" cy="9" r="2.9" />
                  <circle cx="6" cy="5" r="3" />
                </svg>
                Buy now
              </button>
              <button
                onClick={handleAddToCart}
                className={`flex items-center gap-4 justify-center hover:bg-[#E16A54] text-[1rem] uppercase text-gray-50 font-semibold bg-[#DF9755] py-2 w-full ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-baggage-claim"
                >
                  <path d="M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2" />
                  <path d="M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10" />
                  <rect width="13" height="8" x="8" y="6" rx="1" />
                  <circle cx="18" cy="20" r="2" />
                  <circle cx="9" cy="20" r="2" />
                </svg>
                Add to cart
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full h-auto sm:max-h-[56rem] overflow-y-auto bg-gray-100 custom-scrollbar">
            <div className="py-6 bg-white">
              <h1 className="text-lg font-semibold">{product?.businessName}</h1>
              <p className="text-gray-700 font-medium">{product?.name}</p>
              <p className="text-[#dc7f1d] font-bold mt-3">Special price</p>
              <div className="flex items-center text-2xl font-semibold">
                <span className="mr-1">₹</span>
                {product?.discountedPrice}{" "}
                <span className="text-gray-500 text-sm line-through ml-2">
                  ₹{product?.price}
                </span>{" "}
                <span className="text-[#dc7f1d] text-sm ml-2">
                  {product &&
                    Math.round(
                      ((product.price - product.discountedPrice) /
                        product.price) *
                        100
                    )}
                  % off
                </span>
              </div>
              <div className="flex items-center mt-4">
                {product && (
                  <div className="bg-[#FFDAB3] text-gray-900 px-3 py-1 rounded text-sm font-semibold">
                    20
                    <span className="text-gray-700 ml-1">★</span>
                  </div>
                )}
                <span className="text-gray-600 ml-2 text-sm">20 reviews</span>
                <span className="text-blue-600 ml-2 text-sm font-bold">
                  Assured
                </span>
              </div>

              <div className="mt-4">
                <p className="font-semibold mb-2">Size</p>
                <div className="flex space-x-2">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      className="border border-gray-300 px-4 py-2 rounded hover:border-[#dc7f1d] focus:border-blue-500"
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="text-blue-600 text-sm mt-2">Size Chart</p>
              </div>

              {/*<div className="mt-4 flex items-center gap-32">
                <div>
                  <p className="font-semibold mb-2">Color</p>
                  <div className="flex space-x-2">
                    {["#000000", "#D39D55", "#8EB486", "#F9C0AB"].map(
                      (color) => (
                        <button
                          key={color}
                          style={{ backgroundColor: color }}
                          className="w-8 h-8 rounded-full border border-gray-300 hover:border-[#dc7f1d] focus:border-[#dc7f1d]"
                        ></button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <p className="font-semibold mb-2">Quantity</p>
                  <Select
                    options={[
                      { value: 1, label: 1 },
                      { value: 2, label: 2 },
                      { value: 3, label: 3 },
                      { value: 4, label: 4 },
                      { value: 5, label: 5 },
                    ]}
                    defaultValue={{ value: 1, label: 1 }}
                    className="w-[10rem]"
                    styles={{
                      control: (styles) => ({
                        ...styles,
                        backgroundColor: "#F9F9F9",
                        border: "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        height: "2.5rem",
                      }),
                      option: (styles, { isFocused }) => ({
                        ...styles,
                        backgroundColor: isFocused ? "#D1D5DB" : "white",
                        color: isFocused ? "white" : "black",
                      }),
                    }}
                  />
                </div>
              </div>*/}
              <div className="mt-4">
                <p className="font-semibold">Available offers</p>
                <ul className="list-disc list-inside text-gray-700">
                  <li>
                    Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank
                    Credit Card <span className="text-blue-600">T&C</span>
                  </li>
                  <li>
                    Bank Offer 10% off up to ₹1250 on HDFC Bank Credit Card
                    Transactions. Min Txn Value: ₹4,999{" "}
                    <span className="text-blue-600">T&C</span>
                  </li>
                  <li>
                    Bank Offer 10% off up to ₹1,500 on HDFC Bank Credit Card EMI
                    Transactions. Min Txn Value: ₹4,999{" "}
                    <span className="text-blue-600">T&C</span>
                  </li>
                  <li>
                    Special Price Get at flat ₹739{" "}
                    <span className="text-blue-600">T&C</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 flex flex-col gap-4">
                <p className="font-semibold flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#dc7f1d"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-map-pinned"
                  >
                    <path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0" />
                    <circle cx="12" cy="8" r="2" />
                    <path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712" />
                  </svg>
                  Deliver to
                </p>
                <div className="border border-gray-300 px-3 py-2 rounded flex items-center justify-between gap-4 w-[90%] sm:w-[60%] ">
                  <p>{deliveryAddress}</p>
                  <div className="text-gray-600 text-xs flex items-center">
                    <span className="bg-gray-200 px-3 py-1 rounded-full">
                      HOME
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 my-4 font-semibold flex items-center gap-2">
                Cash on Delivery available
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-help"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
              </p>

              <div className="mt-4">
                <p className="font-medium text-[0.8rem] flex items-center gap-1">
                  Delivery by 19 Jan, Sunday{" "}
                  <span className="text-[1.17rem] text-gray-300 font-light ml-2">
                    |
                  </span>{" "}
                  <span className="text-[#dc7f1d] text-[1.16rem] ml-2 mr-1">
                    Free
                  </span>{" "}
                  <span className="text-[1rem]">₹40</span>{" "}
                </p>
                <button className="text-blue-600 text-sm font-bold mt-1">
                  View Details
                </button>
              </div>

              <div className="mt-4 flex items-start gap-16 text-gray-400">
                Seller
                <div className="flex flex-col items-start gap-1">
                  <p className="text-[#dc7f1d] font-semibold">
                    {product?.businessName}
                    <span className="bg-[#FFDAB3] text-gray-900 px-2 py-1 rounded-full text-sm font-semibold ml-2">
                      3.8 <span>★</span>
                    </span>
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    10 Days Return Policy
                  </p>
                  <button className="text-blue-600 text-sm font-bold">
                    See other sellers
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white">
              <div className="flex items-center justify-between border-b py-4 px-2">
                <div className="flex flex-col items-start gap-2">
                  <h2 className="text-xl font-semibold">Ratings & Reviews</h2>
                  {/* <div className="flex items-center">
                    <div className="bg-[#FFDAB3] text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                      20 <span>★</span>
                    </div>
                    <span className="text-gray-600 ml-2 text-sm font-medium">
                      20 reviews
                    </span>
                  </div> */}
                </div>
                <button
                  className="bg-[#ffe5c9d9] text-gray-900 px-4 py-1 rounded text-md font-semibold"
                  onClick={() => setOpen(true)}
                >
                  Rate Product
                </button>
              </div>

              {/* <div className="mt-4">
                <p className="font-semibold">Images uploaded by customers:</p>
                <div className="flex space-x-2 mt-2">
                  {reviews[0].images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Customer upload ${index + 1}`}
                      className="w-20 h-20 sm:w-32 sm:h-32 object-cover rounded"
                    />
                  ))}
                </div>
              </div> */}

              <div className="mt-4 space-y-6">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b pb-6">
                    <div className="flex items-center space-x-2">
                      <div className="bg-[#FFDAB3] text-gray-900 px-3 py-[0.15rem] rounded-full text-sm font-semibold">
                        {review.rating}
                        <span className="ml-1">★</span>{" "}
                      </div>
                      <p>{review.comment}</p>
                    </div>
                    <div className="mt-2 flex items-center gap-2 ml-12">
                      {review.images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Customer upload ${index + 1}`}
                          className="w-20 h-20 sm:w-32 sm:h-32 object-cover rounded"
                        />
                      ))}
                    </div>
                    {/* <div className="flex items-center justify-between">
                      <p className="text-gray-600 text-sm mt-2">
                        {review.name}{" "}
                        <span className="ml-2">{review.daysAgo}</span>
                      </p>
                      <div className="flex items-center mt-2 space-x-2 text-sm text-gray-600">
                        <button className="flex items-center space-x-1">
                          <span>👍</span>
                          <span>{review.helpful}</span>
                        </button>
                        <button className="flex items-center space-x-1">
                          <span>👎</span>
                          <span>{review.notHelpful}</span>
                        </button>
                        <span>...</span>
                      </div> 
                    </div> */}
                  </div>
                ))}
              </div>

              <div className="mt-4 text-blue-600 text-sm">
                <a href="#">All {reviews.length} reviews</a>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between">
                <p className="font-semibold sm:w-auto">
                  Have doubts regarding this product?
                </p>
                <button className="bg-[#FFDAB3] text-gray-900 font-semibold px-4 py-1 rounded w-[50%] sm:w-auto">
                  Post Your Question
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-between m-6 py-4 px-6 sm:mx-64 bg-gray-100 gap-6">
        <div className="flex flex-col">
          <h2 className="text-[1.4rem] text-[#dc7f1d] font-bold uppercase">
            Similar Products
          </h2>
          <p className="text-gray-600 leading-5">
            Customers who viewed this item also viewed
          </p>
        </div>
        <div className="grid gris-cols-1 sm:grid-cols-5 gap-4 mt-6">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="w-[20rem] h-[30rem] bg-gray-200 animate-pulse"
                ></div>
              ))
            : Array.from({ length: 5 }).map((_, index) => (
                <ProductCard key={index} product={similarProducts[index]} />
              ))}
        </div>
      </section>
      <Footer />

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-[90%] max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Write a Review</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleChange({ value: star }, "rating")}
                    className={`text-2xl ${
                      formData.rating >= star
                        ? "text-yellow-400"
                        : "text-gray-300"
                    } hover:text-yellow-500 transition-colors`}
                  >
                    ★
                  </button>
                ))}
                <span className="ml-2 text-gray-600">
                  {formData.rating
                    ? `${formData.rating} out of 5`
                    : "Select rating"}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Your Review
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={4}
                name="review"
                placeholder="Write your review here..."
                value={formData.review}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Add Photos
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
              />
            </div>

            {formData.imageUrls.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.imageUrls.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`preview-${index}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            )}

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  handleSubmitReview(e);
                  setOpen(false);
                }}
                className="px-4 py-2 bg-[#dc7f1d] text-white rounded hover:bg-[#c97218]"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
