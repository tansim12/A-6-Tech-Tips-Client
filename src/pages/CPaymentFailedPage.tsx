"use client"
import React from "react";
import { useRouter } from "next/navigation"; // Use Next.js router for navigation
import { FaExclamationCircle } from "react-icons/fa"; // Importing an icon for failure

const CPaymentFailedPage: React.FC = () => {
  const router = useRouter();

  const handleRetryPayment = () => {
    // Logic to retry payment or navigate to payment page
    router.push("/all-package"); // Example path to retry payment
  };

  const handleGoHome = () => {
    router.push("/"); // Navigate back to homepage
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-md w-full">
        <FaExclamationCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Payment Failed
        </h2>
        <p className="text-gray-600 mb-6">
          It seems that you failed the payment. You can retry or go back to the
          homepage.
        </p>
        <div className="flex justify-around">
          <button
            onClick={handleRetryPayment}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md"
          >
            Retry Payment
          </button>
          <button
            onClick={handleGoHome}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default CPaymentFailedPage;
