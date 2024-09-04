import React, { useEffect, useState } from 'react';
import { FaBars, FaArrowUp, FaArrowDown, FaWallet, FaPaperPlane, FaDownload, FaHistory } from 'react-icons/fa';
import Image from 'next/image';
import Footer from './footer';
import useStore from '@/functions/main';
import Link from 'next/link';

const View = () => {
  const { state, addCredential } = useStore();
  const [sign, setSign] = useState(true);

  useEffect(() => {
    const handleSign = async () => {
      const details = state.customerDid;
      if (details) {
        setSign(false);
        console.log(details)
      }
    };
    handleSign();
  }, [state.customerDid]);

  const transactions = [
    { id: 1, type: 'Sent', amount: '-$200', date: '2024-01-01' },
    { id: 2, type: 'Received', amount: '+$500', date: '2024-01-02' },
    { id: 3, type: 'Sent', amount: '-$150', date: '2024-01-03' },
  ];

  return (
    <div className="min-h-screen flex flex-col text-white p-4 overflow-y-auto">
      {/* Get Credential Button */}
      {sign && (
        <div className="flex justify-center mt-6">
          <Link href="/create">
            <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-6 rounded-full text-lg font-semibold shadow-lg hover:from-green-500 hover:to-blue-600 transition duration-300">
              Get Credential
            </button>
          </Link>
        </div>
      )}

      {/* Balance Section */}
      <div className="flex justify-center items-center mt-10 mb-6">
        <div className="text-center bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xs">
          <h2 className="text-xl font-bold mb-2">Balance</h2>
          <p className="text-3xl font-semibold">$3,450</p> {/* Replace with actual balance */}
        </div>
      </div>

      {/* Send/Receive Section */}
      <div className="flex justify-between items-center mb-6">
        <button className="flex items-center justify-center w-1/2 bg-green-500 p-4 rounded-lg shadow-lg mr-2 hover:bg-green-600 transition duration-300">
          <FaPaperPlane className="text-2xl mr-2" />
          <span>Send</span>
        </button>
        <button className="flex items-center justify-center w-1/2 bg-blue-500 p-4 rounded-lg shadow-lg ml-2 hover:bg-blue-600 transition duration-300">
          <FaDownload className="text-2xl mr-2" />
          <span>Receive</span>
        </button>
      </div>

      {/* Transaction History Section */}
      <div>
        <h3 className="text-xl font-bold mb-4">Transaction History</h3>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow-md"
            >
              <div className="flex items-center">
                {transaction.type === 'Sent' ? (
                  <FaArrowUp className="text-red-500 mr-3" />
                ) : (
                  <FaArrowDown className="text-green-500 mr-3" />
                )}
                <div>
                  <p className="font-semibold">{transaction.type}</p>
                  <p className="text-sm text-gray-400">{transaction.date}</p>
                </div>
              </div>
              <p className="text-lg font-semibold">{transaction.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default View;
