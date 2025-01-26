"use client";

import React from 'react';



const PaymentInfo = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
                <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Payment Information
                </h1>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    At <span className="font-semibold text-purple-600">Bazario</span>, we offer a variety of secure payment options to make your shopping experience seamless. Below are answers to common questions about payments on our platform.
                </p>

                {/* Section 1 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">1.</span>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            How do I pay for a Bazario purchase?
                        </span>
                    </h2>
                    <p className="text-gray-700 mb-4">
                        Bazario offers multiple payment methods. You can rest assured that our trusted payment gateway partners use secure encryption technology to keep your transaction details confidential at all times.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
                        <li><strong>Internet Banking</strong></li>
                        <li><strong>Gift Card</strong></li>
                        <li><strong>Cash on Delivery</strong></li>
                        <li><strong>Wallet</strong></li>
                    </ul>
                    <p className="text-gray-700 mt-4">
                        We also accept payments made using <strong>Visa</strong>, <strong>MasterCard</strong>, <strong>Maestro</strong>, and <strong>American Express</strong> credit/debit cards in India and 21 other countries.
                    </p>
                </div>

                {/* Section 2 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">2.</span>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Are there any hidden charges?
                        </span>
                    </h2>
                    <p className="text-gray-700 mb-4">
                        There are no hidden charges when you make a purchase on Bazario. The prices listed for all items are final and all-inclusive. Delivery charges may be extra depending on the seller policy. Please check individual seller details.
                    </p>
                    <p className="text-gray-700">
                        The price you see on the checkout page is the price you pay.
                    </p>
                </div>

                {/* Section 3 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">3.</span>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            What is Cash on Delivery?
                        </span>
                    </h2>
                    <p className="text-gray-700 mb-4">
                        If you are not comfortable making an online payment, you can opt for the <strong>Cash on Delivery (C-o-D)</strong> payment method. With C-o-D, you pay in cash at the time of actual delivery of the product at your doorstep.
                    </p>
                    <p className="text-gray-700">
                        Maximum order value for C-o-D is ₹50,000. Only Indian Rupees are accepted.
                    </p>
                </div>

                {/* Section 4 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">4.</span>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            How do I pay using a credit/debit card?
                        </span>
                    </h2>
                    <p className="text-gray-700 mb-4">
                        We accept payments made by credit/debit cards issued in India and 21 other countries.
                    </p>
                    <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">Credit Cards</h3>
                    <p className="text-gray-700 mb-4">
                        We accept <strong>Visa</strong>, <strong>MasterCard</strong>, and <strong>American Express</strong>. Enter your card details at checkout and follow the prompts to complete the payment.
                    </p>
                    <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">Debit Cards</h3>
                    <p className="text-gray-700">
                        We accept <strong>Visa</strong>, <strong>MasterCard</strong>, and <strong>Maestro</strong>. Enter your card details and complete the payment through your bank's secure page.
                    </p>
                </div>

                {/* Section 5 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">5.</span>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Is it safe to use my credit/debit card on Bazario?
                        </span>
                    </h2>
                    <p className="text-gray-700 mb-4">
                        Your online transaction on Bazario is secure with the highest levels of transaction security. We use <strong>256-bit encryption technology</strong> to protect your card information.
                    </p>
                </div>

                {/* Section 6 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">6.</span>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            What steps does Bazario take to prevent card fraud?
                        </span>
                    </h2>
                    <p className="text-gray-700 mb-4">
                        We monitor transactions continuously for suspicious activity and flag potentially fraudulent transactions for manual verification. In rare cases, we may request identity documents for verification.
                    </p>
                </div>

                {/* Section 7 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">7.</span>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            What is a 3D Secure password?
                        </span>
                    </h2>
                    <p className="text-gray-700 mb-4">
                        The <strong>3D Secure password</strong> adds an additional layer of security for your online transactions. You can register for it through your bank's website.
                    </p>
                </div>

                {/* Section 8 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">8.</span>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Can I use Internet Banking to make a payment?
                        </span>
                    </h2>
                    <p className="text-gray-700 mb-4">
                        Yes, you can use your bank's <strong>Internet Banking</strong> service to make a secure payment directly from your bank account.
                    </p>
                </div>

                {/* Section 9 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">9.</span>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Can I make a payment through my mobile?
                        </span>
                    </h2>
                    <p className="text-gray-700 mb-4">
                        Yes, you can make payments through the Bazario mobile site and app with secure encryption technology.
                    </p>
                </div>

                {/* Section 10 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">10.</span>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            How does 'Instant Cashback' work?
                        </span>
                    </h2>
                    <p className="text-gray-700 mb-4">
                        <strong>Cashback</strong> offers are instant and exclusive to Bazario. You only pay the final price displayed in your cart.
                    </p>
                </div>

                {/* Section 11 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">11.</span>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            How do I place a Cash on Delivery order?
                        </span>
                    </h2>
                    <p className="text-gray-700 mb-4">
                        Items with the <strong>"Cash on Delivery Available"</strong> icon are valid for C-o-D. Select <strong>"Pay By Cash on Delivery"</strong> at checkout, complete the CAPTCHA, and your order will be processed for shipment.
                    </p>
                </div>

                {/* Section 12 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">12.</span>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            What is Bazario's credit card EMI option?
                        </span>
                    </h2>
                    <p className="text-gray-700 mb-4">
                        With Bazario's credit card <strong>EMI</strong> option, you can pay in easy installments. Check with your bank for available plans and interest rates.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentInfo;