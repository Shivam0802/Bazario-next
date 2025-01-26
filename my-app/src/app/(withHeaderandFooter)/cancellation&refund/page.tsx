import React from 'react';

const CancellationReturn = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Cancellation & Return Policy
        </h1>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          At <span className="font-semibold text-purple-600">Bazario</span>, we want you to be completely satisfied with your purchase. If you are not satisfied, you can cancel your order or return the product as per our policy. Please read the following information carefully to understand our cancellation and return process.
        </p>

        {/* Section 1 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">1.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Cancellation Policy
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            You can cancel your order under the following conditions:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
            <li><strong>Before Dispatch:</strong> If your order has not been dispatched, you can cancel it directly from your account or by contacting our customer support team.</li>
            <li><strong>After Dispatch:</strong> Once the order has been dispatched, you cannot cancel it. However, you can return the product after delivery as per our return policy.</li>
          </ul>
          <p className="text-gray-700 mt-4">
            <strong>Note:</strong> If you cancel an order before dispatch, the refund will be processed within 7-10 business days. The refund will be credited to the original payment method used during the purchase.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">2.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Return Policy
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            We accept returns under the following conditions:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
            <li><strong>Defective or Damaged Products:</strong> If the product is defective or damaged during delivery, you can return it within 7 days of receiving the order.</li>
            <li><strong>Wrong Product Delivered:</strong> If you receive a product that is different from what you ordered, you can return it within 7 days of receiving the order.</li>
            <li><strong>Change of Mind:</strong> If you are not satisfied with the product, you can return it within 7 days of receiving the order, provided the product is unused, unwashed, and in its original packaging with all tags intact.</li>
          </ul>
          <p className="text-gray-700 mt-4">
            <strong>Note:</strong> Some products may not be eligible for return due to hygiene or safety reasons. Please check the product page for details.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">3.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              How to Initiate a Return
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            To initiate a return, follow these steps:
          </p>
          <ol className="list-decimal list-inside text-gray-700 space-y-2 pl-5">
            <li>Log in to your Bazario account and go to the "My Orders" section.</li>
            <li>Select the order you want to return and click on "Return Item."</li>
            <li>Choose the reason for the return and provide any additional details if required.</li>
            <li>Submit the return request and wait for confirmation.</li>
            <li>Once the return request is approved, you will receive a return label and instructions for shipping the product back to us.</li>
          </ol>
          <p className="text-gray-700 mt-4">
            <strong>Note:</strong> Please ensure the product is securely packed to avoid damage during transit.
          </p>
        </div>

        {/* Section 4 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">4.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Refund Policy
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            Refunds are processed as follows:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
            <li><strong>Refund Timeline:</strong> Refunds are processed within 7-10 business days after we receive the returned product.</li>
            <li><strong>Refund Method:</strong> The refund will be credited to the original payment method used during the purchase.</li>
            <li><strong>Partial Refunds:</strong> If only part of your order is returned, you will receive a partial refund for the returned items.</li>
          </ul>
          <p className="text-gray-700 mt-4">
            <strong>Note:</strong> Shipping charges are non-refundable unless the return is due to a defect or error on our part.
          </p>
        </div>

        {/* Section 5 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">5.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Exceptions to Returns
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            The following products are not eligible for return:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
            <li>Products marked as "Non-Returnable" on the product page.</li>
            <li>Personal care items, such as cosmetics, skincare, and haircare products.</li>
            <li>Underwear, lingerie, and swimwear for hygiene reasons.</li>
            <li>Customized or personalized products.</li>
            <li>Gift cards and vouchers.</li>
          </ul>
          <p className="text-gray-700 mt-4">
            <strong>Note:</strong> If you receive a defective or damaged product, you can still return it even if it falls under the non-returnable category.
          </p>
        </div>

        {/* Section 6 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">6.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Return Shipping Costs
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            The return shipping costs depend on the reason for the return:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
            <li><strong>Defective or Damaged Products:</strong> We will cover the return shipping costs.</li>
            <li><strong>Wrong Product Delivered:</strong> We will cover the return shipping costs.</li>
            <li><strong>Change of Mind:</strong> You are responsible for the return shipping costs.</li>
          </ul>
          <p className="text-gray-700 mt-4">
            <strong>Note:</strong> If you choose a premium return method (e.g., expedited shipping), you will be responsible for the additional costs.
          </p>
        </div>

        {/* Section 7 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">7.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              International Returns
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            If you are returning a product from outside India, please note the following:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
            <li>You are responsible for the return shipping costs.</li>
            <li>Customs duties and taxes are non-refundable.</li>
            <li>Please ensure the product is securely packed and includes all necessary documentation.</li>
          </ul>
          <p className="text-gray-700 mt-4">
            <strong>Note:</strong> International returns may take longer to process due to customs clearance.
          </p>
        </div>

        {/* Section 8 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">8.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Replacement Policy
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            If you receive a defective, damaged, or wrong product, you can request a replacement instead of a refund. The replacement process is as follows:
          </p>
          <ol className="list-decimal list-inside text-gray-700 space-y-2 pl-5">
            <li>Initiate a return request as described in Section 3.</li>
            <li>Select "Replacement" as the preferred resolution.</li>
            <li>Once the returned product is received and verified, we will ship the replacement product.</li>
          </ol>
          <p className="text-gray-700 mt-4">
            <strong>Note:</strong> Replacements are subject to product availability. If the product is out of stock, we will issue a refund instead.
          </p>
        </div>

        {/* Section 9 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">9.</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about our cancellation and return policy, please contact us at:
          </p>
          <p className="text-gray-700">
            Email: <a href="mailto:support@bazario.com" className="text-blue-500 hover:text-blue-600 hover:underline transition duration-300">support@bazario.com</a>
          </p>
          <p className="text-gray-700 mt-2">
            Phone: <a href="tel:+911234567890" className="text-blue-500 hover:text-blue-600 hover:underline transition duration-300">+91-1234567890</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CancellationReturn;