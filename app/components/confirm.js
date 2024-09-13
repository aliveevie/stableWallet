import React, { useState, useEffect } from 'react';
import Loader from '../../components/loader'; // Import the existing loader component
import useStore from '../../functions/main';

const ConfirmTransaction = ({ currentData, amount, recipientAddress }) => {
  const [loading, setLoading] = useState(true);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const { state, addOrder, formatMessages, fetchExchanges, pollExchanges, createExchange } = useStore();
  const [exchange, setExchange] = useState(null);

  useEffect(() => {
    // Simulate a network request or transaction confirmation delay
    const fetchExchangeData = async () => {
  //   const result = await createExchange(currentData.offering, amount, { address: recipientAddress });
    
    }
  //  pollExchanges();
   
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full flex flex-col items-center text-center">
        {loading ? (
          <div className="flex flex-col items-center">
            {/* Eye-catching Confirming Transaction Text */}
            <p className="text-2xl font-semibold text-blue-600 mb-6 animate-pulse">
              Confirming Transaction...
            </p>
            {/* Centered Loader */}
            <div className="h-16 w-16 flex justify-center items-center">
              <Loader /> {/* Ensure the loader component is properly styled */}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* Success Message */}
            <p className="text-lg text-green-600 font-semibold">Transaction Successful!</p>
            <button
              onClick={() => window.location.reload()} // You can adjust this to close or navigate to another page
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmTransaction;
