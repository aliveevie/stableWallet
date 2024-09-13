"use client";

import useStore from "@/functions/main";
import { useEffect, useState } from "react";
import { Footer } from "./footer";

export function Transactions() {
  const { state, pollExchanges, fetchExchanges } = useStore();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch the latest transactions from the state or trigger polling for updates
    const fetchTransactionData = async () => {
      // Poll exchanges or fetch exchanges if required.
      await pollExchanges();
      setTransactions(state.transactions); // Update the transactions from state
    };

    fetchTransactionData();

    // Optionally you could setup an interval to poll the transactions every few seconds
    const interval = setInterval(() => {
      fetchTransactionData();
    }, 10000); // Fetch transactions every 10 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [state.transactions]);

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Transactions</h2>
      
      {transactions.length > 0 ? (
        <div className="space-y-4">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  Transaction #{index + 1}: {transaction.status}
                </p>
                <p className="text-sm text-gray-400">Amount: {transaction.payinAmount}</p>
                <p className="text-sm text-gray-400">From: {transaction.payinCurrency}</p>
                <p className="text-sm text-gray-400">To: {transaction.payoutCurrency}</p>
                <p className="text-sm text-gray-400">Date: {new Date(transaction.createdTime).toLocaleString()}</p>
              </div>
              <div>
                <p className={`font-semibold ${transaction.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                  {transaction.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">No transactions available.</p>
      )}
         <Footer />
    </div>
  );
}
