"use client";

import Image from 'next/image';
import { useState } from 'react';
import StoreCredentials from './storeCred';

export function Newcustomer() {
  const [showCred, setShowCred] = useState(false); // Used to toggle the view
  const [saveCred, setSaveCredit] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [error, setError] = useState('');

  const generateMockDID = () => {
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 15);
    return `did:example:${timestamp}${randomSuffix}`;
  };

  const customerDid = { uri: generateMockDID() }; // Using the mock DID generator

  

  const createCredential = async (e) => {
    e.preventDefault();
    const newCred = {
      type: 'KYCCredential',
      issuer: 'mock-issuer',
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        name: customerName,
        countryOfResidence: countryCode
      },
      proof: {
        type: 'MockProof2023',
        created: new Date().toISOString(),
        verificationMethod: customerDid.uri + "#key-" + (Math.floor(Math.random() * 3) + 1),
        proofPurpose: 'assertionMethod',
        proofValue: 'mockSignatureABC123'
      }
    };

    if (newCred) {
     // addCredential(newCred); // Storing the credential
      setSaveCredit(newCred.proof.verificationMethod);
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
          <div className="text-white text-2xl font-bold mb-2 text-center">
            Explore Web3
          </div>
          <div className="text-gray-400 text-center mb-6">
            Step into the Future with StableWallet
          </div>
          <form className="w-full" onSubmit={createCredential}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white mb-1"
              >
                Name
              </label>
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
              <label
                htmlFor="countryCode"
                className="block text-sm font-medium text-white mb-1"
              >
                Country Code
              </label>
              <select
                id="countryCode"
                className="w-full px-3 py-2 rounded-md border border-green-500 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                required
              >
                <option value="">Select Country</option>
                <option value="NG">Nigeria</option>
                <option value="GH">Ghana</option>
                <option value="KE">Kenya</option>
                <option value="NE">Niger</option>
                <option value="TG">Togo</option>
                <option value="ZA">South Africa</option>
                <option value="EG">Egypt</option>
                <option value="DZ">Algeria</option>
                <option value="ET">Ethiopia</option>
                <option value="SN">Senegal</option>
              </select>
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
        <StoreCredentials credentials={saveCred} customer_id={12} />
      )}
    </>
  );
}
