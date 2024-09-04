"use client";
import React, { useState } from 'react';

const Send = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [crypto, setCrypto] = useState('USDT');

  const handleSend = () => {
    // Handle the send action, for example, trigger a transaction
    console.log('Sending:', {
      walletAddress,
      currency,
      crypto,
    });
  };

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
          Choose Currency
        </label>
        <select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="NGN">NGN</option>
          <option value="GHC">GHC</option>
          <option value="USD">USD</option>
          {/* Add more currencies as needed */}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="crypto" className="block text-sm font-medium mb-2">
          Choose Cryptocurrency
        </label>
        <select
          id="crypto"
          value={crypto}
          onChange={(e) => setCrypto(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="USDT">USDT</option>
          <option value="BTC">BTC</option>
          <option value="ZED">ZED</option>
          {/* Add more cryptocurrencies as needed */}
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
