import React, { useState, useEffect } from 'react';
import Loader from './loader'; // Import the existing loader component
import useStore from '../../functions/main';


const ConfirmTransaction = ({ currentData }) => {
  const [loading, setLoading] = useState(true);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const { addOrder, formatMessages, fetchExchanges } = useStore();
  
  useEffect(() => {
    // Simulate a network request or transaction confirmation delay
    const fetchExchangeData = async () => {
        const data = await fetchExchanges(currentData.offering.metadata.from)
        if(data){
            console.log(data)
        }
    }
    fetchExchangeData();
    const confirmTransaction = setTimeout(() => {
      setLoading(false);  // Stop the loader
    //  setTransactionSuccess(true); // Show success message
    }, 3000); // Adjust to your transaction time

    return () => clearTimeout(confirmTransaction);
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
