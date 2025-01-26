import React from 'react';

const TermsAndConditions = () => {
  return (

    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Terms and Conditions
        </h1>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          Welcome to <span className="font-semibold text-purple-600">Bazario</span>! These Terms and Conditions govern your use of our e-commerce website. By accessing or using our site, you agree to comply with these terms. Please read them carefully.
        </p>

        {/* Section 1 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">1.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Acceptance of Terms
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            By using Bazario, you agree to these Terms and Conditions, our Privacy Policy, and all applicable laws. If you do not agree, please do not use our website.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">2.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Account Registration
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            To access certain features, you may need to create an account. You agree to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
            <li>Provide accurate and complete information.</li>
            <li>Maintain the security of your account credentials.</li>
            <li>Notify us immediately of any unauthorized use of your account.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">3.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Orders and Payments
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            When you place an order on Bazario, you agree to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
            <li>Provide valid payment information.</li>
            <li>Pay all charges incurred, including taxes and shipping fees.</li>
            <li>Acknowledge that prices are subject to change without notice.</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">4.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Shipping and Delivery
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            We strive to deliver your orders promptly. However:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
            <li>Delivery times are estimates and not guaranteed.</li>
            <li>You are responsible for providing accurate shipping information.</li>
            <li>Risk of loss or damage passes to you upon delivery.</li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">5.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Returns and Refunds
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            Our return and refund policy is as follows:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
            <li>Items must be returned in their original condition within 30 days.</li>
            <li>Refunds will be processed within 7-10 business days.</li>
            <li>Shipping costs are non-refundable unless the return is due to our error.</li>
          </ul>
        </div>

        {/* Section 6 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">6.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Intellectual Property
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            All content on Bazario, including text, images, logos, and software, is the property of Bazario or its licensors and is protected by intellectual property laws. You may not use, reproduce, or distribute any content without our prior written consent.
          </p>
        </div>

        {/* Section 7 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">7.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Prohibited Activities
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            You agree not to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
            <li>Use the website for any illegal purpose.</li>
            <li>Attempt to gain unauthorized access to our systems.</li>
            <li>Interfere with the website's functionality or security.</li>
            <li>Post false, misleading, or harmful content.</li>
          </ul>
        </div>

        {/* Section 8 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">8.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Limitation of Liability
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            Bazario is not liable for:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
            <li>Any indirect, incidental, or consequential damages.</li>
            <li>Losses resulting from unauthorized access to your account.</li>
            <li>Errors or omissions in the website's content.</li>
          </ul>
        </div>

        {/* Section 9 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">9.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Governing Law
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            These Terms and Conditions are governed by the laws of [Your Country/State]. Any disputes will be resolved in the courts of [Your Jurisdiction].
          </p>
        </div>

        {/* Section 10 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">10.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Changes to These Terms
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            We may update these Terms and Conditions from time to time. Changes will be posted on this page, and your continued use of the website constitutes acceptance of the updated terms.
          </p>
        </div>

        {/* Contact Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">11.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about these Terms and Conditions, please contact us at:
          </p>
          <p className="text-gray-700">
            Email: <a href="mailto:support@bazario.com" className="text-blue-500 hover:text-blue-600 hover:underline transition duration-300">support@bazario.com</a>
          </p>
          <p className="text-gray-700 mt-2">
            Address: [Insert Your Company Address]
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;