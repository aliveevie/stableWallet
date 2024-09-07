import React, { useState } from 'react';

const Wallet = ({ exchangeRate }) => {
    const [amountToSend, setAmountToSend] = useState('');
    const [amountInUSD, setAmountInUSD] = useState(0); // Simulated exchange rate to USD
    const [recipientAmount, setRecipientAmount] = useState(0); // Amount recipient will receive
    const [recipientAddress, setRecipientAddress] = useState(''); // Recipient address

    const handleAmountChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); // Ensures only numbers
        setAmountToSend(value);
        const convertedValue = value * exchangeRate; // Assuming exchangeRate converts to USD
        setAmountInUSD(convertedValue.toFixed(2));
        setRecipientAmount(convertedValue.toFixed(2)); // Simulating same for recipient
    };

    return (
        <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-md mx-auto">
            <div className="flex justify-between items-center mb-4">
                <button className="text-white text-lg">
                    &#8592;
                </button>
                <h2 className="text-xl font-bold">Send</h2>
                <div></div> {/* Placeholder for alignment */}
            </div>

            {/* Sending Section */}
            <div className="text-center mb-6">
                <div className="text-4xl font-bold relative">
                    <input
                        type="text"
                        value={amountToSend}
                        onChange={handleAmountChange}
                        className="bg-transparent text-center w-full focus:outline-none font-bold text-5xl text-white"
                        placeholder="0"
                        inputMode="numeric"
                        pattern="[0-9]*"
                    />
                    <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-px bg-gray-600 h-full"></div>
                </div>
                <div className="text-gray-400 mt-2">≈ {amountInUSD} USD</div>
            </div>

            {/* Recipient Amount Section */}
            <div className="text-center mb-6">
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Recipient will receive</h3>
                <div className="text-4xl font-bold relative">
                    <span className="text-white">{recipientAmount}</span>
                    <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-px bg-gray-600 h-full"></div>
                </div>
                <div className="text-gray-400 mt-2">≈ {recipientAmount} USD</div>
            </div>

            {/* Recipient Address Section */}
            <div className="mb-6">
                <label htmlFor="recipient" className="block text-sm font-bold text-gray-400 mb-2">Recipient Address</label>
                <input
                    type="text"
                    id="recipient"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter recipient address"
                />
            </div>

            {/* Send Button */}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                Send
            </button>
        </div>
    );
};

export default Wallet;
