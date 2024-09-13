import React, { useEffect, useState } from 'react';
import useStore from '../functions/main';
import Link from 'next/link';



const View = () => {
  const { state, capitalizePfiName } = useStore();
  const [sign, setSign] = useState(true);

  useEffect(() => {
    const handleSign = async () => {
      const details = state.customerDid;
      if (details) {
        setSign(false);
      }
    };
    handleSign();
  }, [state.customerDid]);

  return (
    <div className="container">
      {/* Welcome Section */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome to StableWallet</h1>
        <p className="text-gray-400">Experience the future of decentralized finance with StableWallet.</p>
      </div>

      {/* Create Credentials or Continue Buttons */}
      <div className="flex flex-col items-center w-full mb-6">
        {sign ? (
          <Link href="/create">
            <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-6 rounded-full text-lg font-semibold shadow-lg hover:from-green-500 hover:to-blue-600 transition duration-300 w-full">
              Create Credentials
            </button>
          </Link>
        ) : (
          <Link href="/continue">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-full text-lg font-semibold shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 w-full">
              Continue
            </button>
          </Link>
        )}
      </div>

      {/* Offerings Section */}
      <div className="w-full">
        <h2 className="text-xl font-bold text-white mb-4 text-center">Available Offerings</h2>
        <div className="space-y-4">
          {state.pfiAllowlist?.map((pfi, index) => (
            <Link href={`/pfi/${pfi.pfiUri}`} key={index}>
              <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 transition duration-300">
                <p className="font-semibold">{capitalizePfiName(pfi.pfiName)}</p> {/* Capitalized name */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default View;
