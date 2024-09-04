import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const StoreCredentials = ({ credentials }) => {
  const [copied, setCopied] = useState(false);
  const router = useRouter(); // Use Next.js router for redirection

  const handleCopy = () => {
    navigator.clipboard.writeText(credentials).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    });
  };

  const handleContinue = () => {
    router.push('/'); // Redirect to home page after clicking "Continue"
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-900 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-white text-2xl font-bold mb-4 text-center">Wallet Created Successfully!</h2>

      <div className="bg-gray-800 text-white p-4 rounded-lg w-full mb-4 flex flex-col items-center justify-between">
        <textarea
          readOnly
          value={credentials}
          className="w-full p-2 mb-2 bg-gray-800 text-white rounded-lg resize-none text-sm overflow-auto"
          style={{ maxHeight: '100px' }} // Ensure text doesn't overflow and is scrollable
        />
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-600 transition duration-300"
          onClick={handleCopy}
        >
          <FaCopy className="inline-block mr-2" /> {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <p className="text-yellow-500 mb-4 text-center">Please save your credentials securely before continuing.</p>

      <button
        className="bg-green-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-600 transition duration-300"
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
};

export default StoreCredentials;
