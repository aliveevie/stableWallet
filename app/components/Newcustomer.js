"use client";
import Image from 'next/image';
import getCustomerDetails from '@/functions/getCustomer';
import useStore from '@/functions/main';
import { useState, useEffect } from 'react';

const NewCustomer = () => {

    const { state, addCredential, loadCredentials, renderCredential } = useStore();
    const [uri, setUri] = useState(null);

    const [customerName, setCustomerName] = useState('');
    const [countryCode, setCoutryCode] = useState('');
    const [error, setError] = useState('');

    const createCredential = async (e) => {
      e.preventDefault();
      
      const customerDid = await state.customerDid;
      if (customerDid) {
        setUri(customerDid.uri);
      }
    
      const response = await fetch(
        `https://mock-idv.tbddev.org/kcc?name=${customerName}&country=${countryCode}&did=${uri}`
      );
    
      const credential = await response.text();
      console.log(credential)
      
      addCredential(credential);
      if(credential){
              console.log(state.customerCredentials)
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

      <form className="w-full" onSubmit={createCredential}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-white mb-1">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            className="w-full px-3 py-2 rounded-md border border-green-500 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="countryCode" className="block text-sm font-medium text-white mb-1">Country Code</label>
          <input
            type="text"
            id="countryCode"
            placeholder="Enter your country code"
            className="w-full px-3 py-2 rounded-md border border-green-500 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setCoutryCode(e.target.value)}
          />
        </div>

        {error && (
          <div className="mb-4 text-red-500 text-sm font-semibold">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 transition duration-300"
        >
          Create Wallet
        </button>
      </form>

      <div className="mt-6 text-center">
        <span className="text-gray-400">or</span>
        <button className="block mt-2 text-green-500 font-semibold hover:underline">
          Import Existing Wallet
        </button>
      </div>
    </div>
  );
};

export default NewCustomer;