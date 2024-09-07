import React, { useState } from 'react';

const Wallet = ({ exchangeRate }) => {
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');

    const handleSend = () => {
        console.log(`Sending ${amount} to ${recipient}`);
        // Add your sending logic here
    };

    return (
        <div className="p-4 shadow-lg rounded-lg bg-white max-w-md mx-auto my-5">
            <div className="mb-4">
                <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
                    Amount to Send
                </label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <div className="underline decoration-gray-900 decoration-2">
                    {amount ? `${amount}` : 'Enter an amount'}
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Exchange Rate
                </label>
                <div className="p-2 bg-gray-100 rounded">
                    {exchangeRate ? `${exchangeRate}` : 'N/A'}
                </div>
            </div>
            <div className="mb-6">
                <label htmlFor="recipient" className="block text-gray-700 text-sm font-bold mb-2">
                    Recipient's Address
                </label>
                <input
                    type="text"
                    id="recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <button
                onClick={handleSend}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Send
            </button>
        </div>
    );
};

export default Wallet;