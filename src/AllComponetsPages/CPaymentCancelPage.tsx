"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const CPaymentCancelPage: React.FC = () => {
  const router = useRouter();

  const handleRetryPayment = () => {
    // Logic to retry payment or navigate to payment page
    router.push('/'); // Example path
  };

  const handleGoHome = () => {
    router.push('/'); // Navigate back to homepage
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h3 className="text-2xl font-semibold text-red-500 mb-4">
          Payment Canceled
        </h3>
        <p className="text-gray-600 mb-6">
          It seems that you canceled the payment. You can retry or go back to the homepage.
        </p>
        <div className="flex justify-between">
          <button
            onClick={handleRetryPayment}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
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

export default CPaymentCancelPage;
