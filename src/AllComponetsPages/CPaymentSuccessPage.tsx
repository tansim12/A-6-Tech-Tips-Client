"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa'; // Import Check Circle icon from Font Awesome

const CPaymentSuccessPage: React.FC = () => {
  const router = useRouter();

  const handleViewOrder = () => {
    // Logic to navigate to the user's order page
    router.push('/all-package'); // Change this path as needed
  };

  const handleContinueShopping = () => {
    router.push('/'); // Navigate to the shop page
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-md w-full">
        <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your payment was processed successfully.
        </p>
        <div className="flex justify-around">
          <button
            onClick={handleViewOrder}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          >
            Back payment
          </button>
          <button
            onClick={handleContinueShopping}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md"
          >
            See News Feed
          </button>
        </div>
      </div>
    </div>
  );
};

export default CPaymentSuccessPage;
