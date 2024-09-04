"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useStore from '../../functions/main';
import StoreCredentials from './storeCred';

const NewCustomer = () => {
  const { state, addCredential } = useStore();
  const [uri, setUri] = useState(null);
  const [showCred, setShowCred] = useState(false); // Used to toggle the view
  const [saveCred, setSaveCredit] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {

    if(state.customerDid && state.customerCredentials.length > 0){
          setShowCred(true);
          setSaveCredit(state.customerCredentials[0])
    }

  },[state.customerDid, state.customerCredentials])

  const createCredential = async (e) => {
    e.preventDefault();
    
    // Fetching customer DID
    const customerDid = await state.customerDid;
    if (customerDid) {
      setUri(customerDid.uri);
    }
    
    // Fetching the credential
    const response = await fetch(
      `https://mock-idv.tbddev.org/kcc?name=${customerName}&country=${countryCode}&did=${customerDid.uri}`
    );

    const credential = await response.text();
    
    if (credential) {
      await addCredential(credential); // Storing the credential
      setSaveCredit(credential);
      setShowCred(true); // Switch to show the credential
    } else {
      setError('Failed to create credential. Please try again.');
    }
  };

  return (
    <>
      {!showCred ? (
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
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="countryCode" className="block text-sm font-medium text-white mb-1">Country Code</label>
              <input
                type="text"
                id="countryCode"
                placeholder="Enter your country code"
                className="w-full px-3 py-2 rounded-md border border-green-500 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setCountryCode(e.target.value)}
                required
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
              Create Credentials
            </button>
          </form>
        </div>
      ) : (
        <StoreCredentials credentials={saveCred} />
      )}
    </>
  );
};

export default NewCustomer;
