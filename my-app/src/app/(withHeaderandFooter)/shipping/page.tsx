"use client";

import React from 'react';


const ShippingInfo = () => {
    return (

        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
                <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Shipping Information
                </h1>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    At <span className="font-semibold text-purple-600">Bazario</span>, we strive to make your shopping experience seamless. Below are answers to common questions about shipping and delivery on our platform.
                </p>

                {/* Section 1 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">1.</span>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            What are the delivery charges?
                        </span>
                    </h2>
                    <p className="text-gray-700 mb-4">
                        Delivery charges are the costs undertaken by the seller to deliver your order. The delivery charges are calculated based on the weight of the product and the delivery location. To know the delivery charges, please add the product to the cart and proceed to checkout. The delivery charges will be displayed on the checkout page.
                    </p>
                    <p className="text-gray-700">
                        <strong>Note:</strong> For orders above a certain value, we offer free delivery. Please check the product page for more details.
                    </p>
                </div>

                {/* Section 2 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">2.</span>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            What is the estimated delivery time?
                        </span>
                    </h2>
                    <p className="text-gray-700 mb-4">
                        The estimated delivery time is the time taken for the product to be delivered to your doorstep after the product has been dispatched from our warehouse. The estimated delivery time varies from product to product. Please check the product page for more details.
                    </p>
                    <p className="text-gray-700">
                        <strong>Note:</strong> The estimated delivery time is calculated based on business days (excluding Sundays and public holidays).
                    </p>
                </div>

                {/* Section 3 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">3.</span>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            What is the difference between delivery time and dispatch time?
                        </span>
                    </h2>
                    <p className="text-gray-700 mb-4">
                        <strong>Dispatch time</strong> is the time taken for the seller to hand over the product to the courier for delivery. The dispatch time varies from product to product. Please check the product page for more details.
                    </p>
                    <p className="text-gray-700">
                        <strong>Delivery time</strong> is the time taken for the product to be delivered to your doorstep after the product has been dispatched from our warehouse. The delivery time varies from product to product. Please check the product page for more details.
                    </p>
                </div>

                {/* Section 4 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">4.</span>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            What should I do if my order is delayed?
                        </span>
                    </h2>
                    <p className="text-gray-700 mb-4">
                        If your order is delayed, please check the estimated delivery time on the product page. If the estimated delivery time has passed and you have not received the product, please contact us at <a href="mailto:bazarioinfo@yopmail.com" className="text-blue-500 hover:text-blue-600 hover:underline transition duration-300">bazarioinfo@yopmail.com</a> or call us at <strong>+91-1234567890</strong>. Our customer support team will assist you in tracking your order.
                    </p>
                    <p className="text-gray-700">
                        <strong>Note:</strong> The estimated delivery time is calculated based on business days (excluding Sundays and public holidays).
                    </p>
                    <p className="text-gray-700">
                        <strong>Note:</strong> The estimated delivery time is the time taken for the product to be delivered to your doorstep after the product has been dispatched from our warehouse.
                    </p>
                </div>

                {/* Section 5 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">5.</span>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            What should I do if the product is damaged during delivery?
                        </span>
                    </h2>
                    <p className="text-gray-700 mb-4">
                        If the product is damaged during delivery, please contact us at <a href="mailto:bazarioinfo@yopmail.com" className="text-blue-500 hover:text-blue-600 hover:underline transition duration-300">bazarioinfo@yopmail.com</a> or call us at <strong>+91-1234567890</strong> within 24 hours of receiving the product. Our customer support team will assist you in processing your request for a replacement or refund. Please provide your order details and a photo of the damaged product for verification.
                    </p>
                    <p className="text-gray-700">
                        <strong>Note:</strong> Please do not accept the delivery if the product is damaged. Please check the product before accepting the delivery.
                    </p>
                </div>

                {/* Section 6 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">6.</span>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            What should I do if the product is missing from the delivery?
                        </span>
                    </h2>
                    <p className="text-gray-700 mb-4">
                        If the product is missing from the delivery, please contact us at <a href="mailto:bazarioinfo@yopmail.com" className="text-blue-500 hover:text-blue-600 hover:underline transition duration-300">bazarioinfo@yopmail.com</a> or call us at <strong>+91-1234567890</strong> within 24 hours of receiving the product. Our customer support team will assist you in processing your request for a replacement or refund. Please provide your order details for verification.
                    </p>
                    <p className="text-gray-700">
                        <strong>Note:</strong> Please check the package contents before accepting the delivery.
                    </p>
                </div>

                {/* Section 7 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">7.</span>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Seller does not/cannot ship to my area. Why?
                        </span>
                    </h2>
                    <p className="text-gray-700 mb-4">
                        Please enter your pincode on the product page (you don't have to enter it every single time) to know whether the product can be delivered to your location.
                    </p>
                    <p className="text-gray-700 mb-4">
                        If you haven't provided your pincode until the checkout stage, the pincode in your shipping address will be used to check for serviceability.
                    </p>
                    <p className="text-gray-700 mb-4">
                        Whether your location can be serviced or not depends on:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
                        <li>Whether the seller ships to your location</li>
                        <li>Legal restrictions, if any, in shipping particular products to your location</li>
                        <li>The availability of reliable courier partners in your location</li>
                    </ul>
                </div>

                {/* Section 8 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">8.</span>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Why is the COD option not available for my order?
                        </span>
                    </h2>
                    <p className="text-gray-700 mb-4">
                        The COD option may not be available for your order due to one or more of the following reasons:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
                        <li>The product is not eligible for COD</li>
                        <li>The COD option is not available for your location</li>
                        <li>The COD option is not available for the product</li>
                        <li>The order value exceeds the maximum COD limit</li>
                    </ul>
                </div>

                {/* Section 9 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">9.</span>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            What do the different tags like "In Stock", "Available" mean?
                        </span>
                    </h2>
                    <p className="text-gray-700 mb-4">
                        <strong>In Stock:</strong> The product is available in the seller’s warehouse and can be dispatched within the estimated delivery time.
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong>Available:</strong> The product is available in the seller’s warehouse and can be dispatched within the estimated delivery time.
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong>Out of Stock:</strong> The product is not available in the seller’s warehouse and cannot be dispatched. You can add the product to your wishlist and we will notify you when it is back in stock.
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong>Preorder:</strong> The product is available for preorder. You can place an order for the product and it will be dispatched once it is available in the seller’s warehouse.
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong>Upcoming:</strong> The product is not available in the seller’s warehouse and cannot be dispatched. You can add the product to your wishlist and we will notify you when it is back in stock.
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong>Sold Out:</strong> The product is not available in the seller’s warehouse and cannot be dispatched. You can add the product to your wishlist and we will notify you when it is back in stock.
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong>Discontinued:</strong> The product is no longer available for sale. You can add the product to your wishlist and we will notify you if it is back in stock.
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong>Temporarily Unavailable:</strong> The product is not available in the seller’s warehouse and cannot be dispatched. You can add the product to your wishlist and we will notify you when it is back in stock.
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong>Back in Stock Soon:</strong> The product is not available in the seller’s warehouse and cannot be dispatched. You can add the product to your wishlist and we will notify you when it is back in stock.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShippingInfo;