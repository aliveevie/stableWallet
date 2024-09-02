"use client";
import Image from 'next/image';
import getCustomerDetails from '@/functions/getCustomer';
import useStore from '@/functions/main';
import { useState, useEffect, setState } from 'react';

const NewCustomer = () => {

    const { state, addCredential, renderCredential } = useStore();

    const [customerName, setCustomerName] = useState('');
    const [countryCode, setCoutryCode] = useState('');

    const [customerCredentials, setCustomerCredentials] = useState(null);

    const loadCredentials = () => {
      const storedCredentials = localStorage.getItem('customerCredentials');
      if (storedCredentials) {
        setCustomerCredentials(JSON.parse(storedCredentials));
      } else {
        console.log('No credentials exist');
      }
    };
  
    useEffect(() => {
      loadCredentials();
    }, []);
  
    // Use useEffect to call loadCredentials when the component mounts
    useEffect(() => {
      loadCredentials();
    }, []);
  

    const createCredential = async (e) => {
        e.preventDefault();
        const customerDid = await state.customerDid.uri;
        const credential = await fetch(
          `https://mock-idv.tbddev.org/kcc?name=${customerName}&country=${countryCode}&did=${customerDid}`
        ).then((r) => r.text());
      
        console.log(credential);

     //   addCredential(credential);
      
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

      <form className="w-full" onSubmit={createCredential} >
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-white mb-1">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            className="w-full px-3 py-2 rounded-md border border-green-500 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) =>  setCustomerName(e.target.value)}         
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
