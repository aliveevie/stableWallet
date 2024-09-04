"use client";
import React, { useEffect, useState } from 'react';
import useStore from '../../functions/main';  // Import your store functions
import Loader from './loader';  // Import the loader component

const Send = () => {
  const { state } = useStore();
  const [walletAddress, setWalletAddress] = useState('');
  const [currency, setCurrency] = useState('');
  const [crypto, setCrypto] = useState('USDT');
  const [payIn, setPayIn] = useState([]);
  const [payout, setPayout] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [ offerings, setOffering ] = useState([]);
  const [payoutOptions, setPayoutOptions] = useState([]); // List of Payout currencies based on PayIn



  const handleSend = () => {
    // Handle the send action, for example, trigger a transaction
    console.log('Sending:', {
      walletAddress,
      currency,
      crypto,
    });
  };

  useEffect(() => {
    async function getOffering() {
      if (state.payinCurrencies.length > 0 || state.payoutCurrencies.length > 0) {
        setPayIn(state.payinCurrencies);
      //  setPayout(state.payoutCurrencies);
        setLoading(false);  // Stop loading when data is fetched
        setOffering(state.offerings)
     //   console.log(offerings)
      }
    }

    getOffering();
  }, [state]);

    useEffect(() => {
    if (currency && offerings.length > 0) {
      const filteredOffering = offerings.find(
        (offering) => offering.data.payin.currencyCode === currency
      );
      console.log(filteredOffering)
      if (filteredOffering) {
        setPayout(filteredOffering.data.payout ? [filteredOffering.data.payout.currencyCode] : []);
      }
    }
  }, [currency, offerings]);

  if (loading) {
    return (
        <Loader /> 
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Send Funds</h2>
      
      <div className="mb-4">
        <label htmlFor="walletAddress" className="block text-sm font-medium mb-2">
          Wallet Address
        </label>
        <input
          type="text"
          id="walletAddress"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="Enter wallet address"
          className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="currency" className="block text-sm font-medium mb-2">
          From (Currency)
        </label>
        <select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {payIn.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="crypto" className="block text-sm font-medium mb-2">
          To (Cryptocurrency)
        </label>
        <select
          id="crypto"
          value={crypto}
          onChange={(e) => setCrypto(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {payout.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSend}
        className="w-full py-2 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 transition duration-300"
      >
        Send
      </button>
    </div>
  );
};

export default Send;
