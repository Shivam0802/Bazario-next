import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          At <span className="font-semibold text-purple-600">Bazario</span>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our e-commerce website. By using our website, you agree to the terms outlined in this policy.
        </p>

        {/* Section 1 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">1.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Information We Collect
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            We collect various types of information to provide and improve our services:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
            <li><span className="font-medium">Personal Information:</span> Name, email address, phone number, shipping address, billing address, and payment details.</li>
            <li><span className="font-medium">Account Information:</span> Username, password, and preferences when you create an account.</li>
            <li><span className="font-medium">Transaction Data:</span> Details about purchases, order history, and payment methods.</li>
            <li><span className="font-medium">Usage Data:</span> Information about how you interact with our website, such as IP address, browser type, pages visited, and time spent on the site.</li>
            <li><span className="font-medium">Cookies and Tracking Technologies:</span> We use cookies, web beacons, and similar technologies to enhance your experience and analyze site traffic.</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">2.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              How We Use Your Information
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            Your information is used for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
            <li>To process and fulfill your orders, including shipping and payment processing.</li>
            <li>To personalize your experience and provide tailored product recommendations.</li>
            <li>To communicate with you about your orders, account updates, and promotional offers.</li>
            <li>To improve our website, services, and customer support.</li>
            <li>To detect and prevent fraud, security breaches, and other illegal activities.</li>
            <li>To comply with legal obligations and enforce our terms and conditions.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">3.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Sharing Your Information
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            We may share your information in the following circumstances:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
            <li><span className="font-medium">Service Providers:</span> With third-party vendors who assist us in operating our website, processing payments, and delivering orders.</li>
            <li><span className="font-medium">Legal Requirements:</span> When required by law or to protect our rights, property, or safety.</li>
            <li><span className="font-medium">Business Transfers:</span> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new owner.</li>
            <li><span className="font-medium">With Your Consent:</span> We may share your information with third parties if you give us explicit permission.</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">4.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Data Security
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            We take data security seriously and implement the following measures:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
            <li>Encryption of sensitive data during transmission and storage.</li>
            <li>Regular security audits and vulnerability assessments.</li>
            <li>Access controls to limit who can view or process your information.</li>
            <li>Employee training on data protection best practices.</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Despite these measures, no system is completely secure. We cannot guarantee absolute security but will notify you of any breaches as required by law.
          </p>
        </div>

        {/* Section 5 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">5.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Your Rights
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            You have the following rights regarding your personal information:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
            <li><span className="font-medium">Access:</span> Request a copy of the data we hold about you.</li>
            <li><span className="font-medium">Correction:</span> Update or correct inaccurate information.</li>
            <li><span className="font-medium">Deletion:</span> Request deletion of your data, subject to legal obligations.</li>
            <li><span className="font-medium">Opt-Out:</span> Unsubscribe from marketing communications at any time.</li>
            <li><span className="font-medium">Data Portability:</span> Request your data in a machine-readable format.</li>
          </ul>
          <p className="text-gray-700 mt-4">
            To exercise these rights, please contact us at <a href="mailto:privacy@bazario.com" className="text-blue-500 hover:text-blue-600 hover:underline transition duration-300">privacy@bazario.com</a>.
          </p>
        </div>

        {/* Section 6 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">6.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Changes to This Policy
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            We may update this Privacy Policy periodically. Changes will be posted on this page with an updated revision date. We encourage you to review this policy regularly to stay informed about how we protect your information.
          </p>
        </div>

        {/* Section 7 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">7.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at:
          </p>
          <p className="text-gray-700">
            Email: <a href="mailto:privacy@bazario.com" className="text-blue-500 hover:text-blue-600 hover:underline transition duration-300">privacy@bazario.com</a>
          </p>
          <p className="text-gray-700 mt-2">
            Address: [Insert Your Company Address]
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;