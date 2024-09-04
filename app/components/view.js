import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown, FaPaperPlane } from 'react-icons/fa';
import useStore from '../../functions/main';
import Link from 'next/link';

const View = () => {
  const { state } = useStore();
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

  const transactions = [
    { id: 1, type: 'Sent', amount: '-$200', date: '2024-01-01' },
    { id: 2, type: 'Received', amount: '+$500', date: '2024-01-02' },
    { id: 3, type: 'Sent', amount: '-$150', date: '2024-01-03' },
  ];

  return (
    <div  className="flex flex-col justify-center items-center bg-blue-900 rounded-lg p-6 w-full max-w-md mx-auto shadow-lg">
      {/* Get Credential Button */}
      {sign && (
        <div className="flex justify-center mt-4">
          <Link href="/create">
            <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-6 rounded-full text-lg font-semibold shadow-lg hover:from-green-500 hover:to-blue-600 transition duration-300">
              Get Credential
            </button>
          </Link>
        </div>
      )}

      {/* Balance Section */}
      <div className="w-full rounded-lg shadow-lg p-6 text-center mb-6">
        <h2 className="text-xl font-bold mb-2">Balance</h2>
        <p className="text-4xl font-semibold">${state.balance}</p> {/* Replace with actual balance */}
      </div>

      {/* Send/Receive Section */}
      <div className="w-full bg-gray-800 rounded-lg shadow-lg p-6 mb-6 flex flex-col items-center justify-center">
      
        <button className="bg-green-500 w-full py-3 text-white rounded-md font-semibold hover:bg-green-600 transition duration-300 flex justify-center items-center">
          <FaPaperPlane className="text-xl mr-2" />
          <Link href="/send" >
          Send
      </Link>
        
        </button>
      </div>

      {/* Transaction History Section */}
      <div className="w-full">
        <h3 className="text-xl font-bold mb-4">Transaction History</h3>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md"
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
