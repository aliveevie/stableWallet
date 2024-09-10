import React, { useEffect, useState } from 'react';
import useStore from '../../functions/main';
import ConfirmTransaction from './confirm';
import { useRouter } from 'next/navigation'; // For navigation on success
import styles from '../styles/Wallet.module.css';


const Wallet = ({ currentData }) => {
    console.log(currentData)
    const { state, formatAmount, createExchange, pollExchanges, fetchExchanges, addOrder } = useStore();
    const [amountToSend, setAmountToSend] = useState('');
    const [amount, setAmount] = useState(''); // Simulated exchange rate to USD
    const [recipientAmount, setRecipientAmount] = useState(''); // Amount recipient will receive
    const [recipientAddress, setRecipientAddress] = useState(''); // Recipient address
    const [isConfirming, setIsConfirming] = useState(false); // State to show confirmation section
    const [showTransactions, setTransactions] = useState(false);
    const [exchange, setExchange] = useState(null);
    const [currentExc, setCurrentExc] = useState(null);
    const [confirmMessage, setConfirmMessage] = useState('');
    const router = useRouter(); // Hook for navigation

    const handleAmountChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); // Ensures only numbers
        setAmountToSend(value);
        const convertedValue = formatAmount(value * currentData.payPerUnit);
        setAmount(convertedValue);
        setRecipientAmount(convertedValue); // Simulating same for recipient
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (amountToSend && recipientAddress) {
            setIsConfirming(true); // Show confirmation section if fields are filled
        } else {
            alert("Please fill in all required fields.");
        }
    };

    const handleConfirm = () => {
        setAmountToSend('');
        setRecipientAddress('');
        setRecipientAmount('');
        setAmount('');
        setIsConfirming(false);
        const dataFetch = async () => {
            await createExchange(currentData.offering, amount, { address: recipientAddress }).then(async () => {
                const data = await fetchExchanges(currentData.offering.metadata.from);
                if (data) {
                    setExchange(data);
                }
            });
        };
        setTransactions(true);
        setConfirmMessage("Transactions in process...");
        dataFetch();
    };

    const handleCancel = () => {
        // Cancel the transaction and go back to the form
        setIsConfirming(false);
    };

    useEffect(() => {
        if (exchange) {
            setCurrentExc(exchange[exchange.length - 1]);
        }

        const sendCurrency = async () => {
            if (currentExc) {
                await addOrder(currentExc.id, currentExc.pfiDid).then(() => {
                    setConfirmMessage("Payment Success!");
                    setTimeout(() => {
                        router.push('/'); // Redirect to the homepage after 2 seconds
                    }, 2000); // 2-second delay before redirect
                });
            }
        };
        sendCurrency();
    }, [exchange, currentExc, router]);

    return (
        <>
            <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-md mx-auto">
                <form onSubmit={handleSend}>
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
                                required
                            />
                        </div>
                        <div className="text-gray-400 mt-2">≈ {amount} {currentData.currency}</div>
                    </div>

                    {/* Recipient Amount Section */}
                    <div className="text-center mb-6">
                        <h3 className="text-sm font-semibold text-gray-400 mb-1">Recipient will receive</h3>
                        <div className="text-4xl font-bold relative">
                            <span className="text-white">{recipientAmount}</span>
                        </div>
                        <div className="text-gray-400 mt-2">≈ {recipientAmount} {currentData.payoutcurr}</div>
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
                            required
                        />
                    </div>

                    {/* Send Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Send
                    </button>
                </form>

                {/* Confirmation Section */}
                {isConfirming && !showTransactions && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                        <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center max-w-sm mx-auto">
                            <h3 className="text-lg font-bold text-white mb-4">Confirm Transaction</h3>

                            <p className="text-gray-400 mb-4 leading-relaxed">
                                Are you sure you want to send <strong>{amountToSend} {currentData.currency}</strong> (≈ <strong>{amount} {currentData.payoutcurr}</strong>) to:
                            </p>

                            {/* Center the recipient address */}
                            <p className="text-gray-200 font-mono break-all mb-6 text-center">
                                {recipientAddress}
                            </p>

                            <div className="flex justify-center space-x-4">
                                <button
                                    onClick={handleConfirm}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {!isConfirming && showTransactions && (
                 <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                 <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg text-center max-w-sm mx-auto">
                     <h3 className="text-lg font-bold">{confirmMessage}</h3>
                     {confirmMessage === "Transactions in process..." && (
                         <div className="flex justify-center mt-4">
                             <span className={`${styles.dot} bg-blue-500`}></span>
                             <span className={`${styles.dot} bg-green-500`}></span>
                             <span className={`${styles.dot} bg-red-500`}></span>
                         </div>
                     )}
                     {confirmMessage === "Payment Success!" && (
                         <p className="text-gray-400 mt-2">Redirecting to the homepage...</p>
                     )}
                 </div>
             </div>
             
                )}
            </div>
        </>
    );
};

export default Wallet;
