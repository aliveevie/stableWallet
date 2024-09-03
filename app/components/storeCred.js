import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

const StoreCredentials = ({ credentials }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(credentials).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    });
  };

  const handleContinue = () => {
   // history.push('/next-step'); // Replace with your next route
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-900 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-white text-2xl font-bold mb-4 text-center">Wallet Created Successfully!</h2>

      <div className="bg-gray-800 text-white p-4 rounded-lg w-full mb-4 flex items-center justify-between">
        <span>{credentials}</span>
        <FaCopy className="cursor-pointer text-green-500" onClick={handleCopy} />
      </div>

      {copied && <p className="text-green-500 mb-4 text-center">Credentials copied to clipboard!</p>}

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
