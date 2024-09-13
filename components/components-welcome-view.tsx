'use client'

import React from 'react';
import Link from 'next/link';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import useStore from '../functions/main';

const WelcomeView = () => {
  const { state } = useStore();

  return (
    <div className="flex flex-col justify-start items-center w-full h-full bg-gray-900 text-white p-6 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-4">Welcome to StableWallet</h1>
      
      <p className="text-center mb-8">
        Your secure gateway to decentralized finance. Start your journey with us today!
      </p>

      <div className="flex flex-col w-full gap-4 mb-8">
        <Link href="/create" passHref>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center">
            <FaUserPlus className="mr-2" />
            Create Credentials
          </button>
        </Link>
        <Link href="/sign" passHref>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center">
            <FaSignInAlt className="mr-2" />
            Sign In
          </button>
        </Link>
      </div>

      <h2 className="text-xl font-semibold mb-4">Available Offerings</h2>
      <div className="grid grid-cols-2 gap-4 w-full">
        {state.Allowlist.pfiName.map((pfi, index) => (
          <Link key={index} href={`/pfi/${encodeURIComponent(pfi)}`} passHref>
            <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 text-sm">
              {pfi}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WelcomeView;