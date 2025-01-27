import React from "react";
import Sidebar from "@/layout/sidebar";

// Sample data for customer reviews grouped by product
const productReviews = [
  {
    productId: 1,
    productName: "Wireless Bluetooth Earbuds",
    reviews: [
      {
        id: 1,
        customerName: "John Doe",
        rating: 5,
        comment: "Great sound quality! Comfortable to wear.",
        date: "2023-10-15",
      },
      {
        id: 2,
        customerName: "Jane Smith",
        rating: 4,
        comment: "Good battery life, but the case feels cheap.",
        date: "2023-10-10",
      },
    ],
  },
  {
    productId: 2,
    productName: "Smartwatch Pro",
    reviews: [
      {
        id: 3,
        customerName: "Alice Johnson",
        rating: 3,
        comment: "Average performance. The screen scratches easily.",
        date: "2023-10-05",
      },
      {
        id: 4,
        customerName: "Bob Brown",
        rating: 5,
        comment: "Excellent fitness tracking features!",
        date: "2023-10-01",
      },
    ],
  },
  {
    productId: 3,
    productName: "Noise-Canceling Headphones",
    reviews: [
      {
        id: 5,
        customerName: "Charlie Davis",
        rating: 5,
        comment: "Amazing noise cancellation! Worth every penny.",
        date: "2023-09-28",
      },
    ],
  },
  {
    productId: 4,
    productName: "Gaming Keyboard",
    reviews: [
      {
        id: 6,
        customerName: "Eve Wilson",
        rating: 4,
        comment: "Great for gaming, but the keys are a bit loud.",
        date: "2023-09-25",
      },
    ],
  },
];

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={`text-lg ${
        index < rating ? "text-yellow-400" : "text-gray-300"
      }`}
    >
      ★
    </span>
  ));
  return <div className="flex">{stars}</div>;
};

// Customer Reviews component
const CustomerReviews = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-[#fff5eb]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Customer Reviews by Product
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productReviews.map((product) => (
              <div
                key={product.productId}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {product.productName}
                </h3>
                <div className="space-y-3">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-t pt-3">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-md font-medium text-gray-800">
                          {review.customerName}
                        </h4>
                        <p className="text-xs text-gray-500">{review.date}</p>
                      </div>
                      <StarRating rating={review.rating} />
                      <p className="mt-1 text-sm text-gray-600 leading-tight">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;