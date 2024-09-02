"use client";

import Image from 'next/image';
import { useState } from 'react';
import getCustomerDetails from '@/functions/getCustomer';

const NewCustomer = () => {
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const customerDid = 'did:example:123456789abcdefghi'; // Example DID, replace with actual DID
    try {
      const data = await getCustomerDetails(name, countryCode, customerDid);
      console.log('Customer Details:', data);
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-900 rounded-lg p-6 w-full max-w-md mx-auto shadow-lg">
      <div className="w-full text-center mb-6">
        <Image
          src="/astronut.webp"
          alt="Astronaut"
          width={150}
          height={150}
          priority={true}
          className="mx-auto"
        />
      </div>
      <div className="text-white text-2xl font-bold mb-2 text-center">Explore Web3</div>
      <div className="text-gray-400 text-center mb-6">Step into the Future with StableWallet</div>

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-white mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-3 py-2 rounded-md border border-green-500 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="countryCode" className="block text-sm font-medium text-white mb-1">Country Code</label>
          <input
            type="text"
            id="countryCode"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            placeholder="Enter your country code"
            className="w-full px-3 py-2 rounded-md border border-green-500 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 transition duration-300"
        >
          Create Wallet
        </button>
      </form>
    </div>
  );
};

export default NewCustomer;