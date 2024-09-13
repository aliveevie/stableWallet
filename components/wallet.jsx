import React, { useEffect, useState } from 'react';
import useStore from '../functions/main';
import ConfirmTransaction from '../app/components/confirm';
import { useRouter } from 'next/navigation'; // For navigation on success
import styles from '../app/styles/Wallet.module.css';

const Wallet = ({ currentData, walletAddress, setWalletAddress }) => {
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
    const searchParams = new URLSearchParams(window.location.search);
    const customer_id = searchParams.get('customer_id');
    const [paymentDetails, setPaymentDetails] = useState({});

    console.log(currentData);

  useEffect(() => {
    if (currentData?.offering?.data?.payout?.methods[0]?.requiredPaymentDetails?.properties) {
        const details = currentData.offering.data.payout.methods[0].requiredPaymentDetails.properties;
        // Initialize paymentDetails with keys from the payout method
        const initializedDetails = Object.keys(details).reduce((acc, key) => {
            acc[key] = ''; // Set default empty string for each key
            return acc;
        }, {});
        setPaymentDetails(initializedDetails);
    }
}, [currentData]);

    const handlePaymentDetailChange = (key, value) => {
     setPaymentDetails((prevDetails) => ({
        ...prevDetails,
        [key]: value,
    }));
     setRecipientAddress(value)
    };


    const handleBackButton = () => {
          setWalletAddress(false)
    }

    const handleAmountChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); // Ensures only numbers
        setAmountToSend(value);
        const convertedValue = formatAmount(value * currentData.payPerUnit);
        setAmount(convertedValue);
        setRecipientAmount(convertedValue); // Simulating same for recipient
    };

  
    const handleSend = (e) => {
        e.preventDefault();
        
        if (amountToSend) {
            setIsConfirming(true); // Show confirmation section if fields are filled
        } else {
            alert("Please fill in all required fields.");
        }
    };

    const handleConfirm = () => {
     //   setAmountToSend('');
     //   setRecipientAddress('');
     //   setRecipientAmount('');
     //   setAmount('');
        setIsConfirming(false);

        try {
            const dataFetch = async () => {
                if(paymentDetails){
                    await createExchange(currentData.offering, amount, paymentDetails).then(async () => {
                        const data = await fetchExchanges(currentData.offering.metadata.from);
                        if (data) {
                            setExchange(data);
                      }else{
                        setConfirmMessage("Transaction Failed, please try again");
                        setTimeout(() => {
                          window.location.reload(); // Reload the page after 3 seconds
                        }, 3000);
                      }
                    });
                }
         
            };
            setTransactions(true);
            setConfirmMessage("Transactions in process...");
            dataFetch();
        }catch  {
            console.error("Error creating exchange or fetching exchanges:", error);
            setConfirmMessage("Transaction Failed, please try again");
            setTimeout(() => {
              window.location.reload(); // Reload the page after 3 seconds
            }, 3000);
        }
    };

    const handleCancel = () => {
        // Cancel the transaction and go back to the form
        setIsConfirming(false);
    };

    useEffect(() => {
        if (exchange) {
         //   console.log(exchange)
            setCurrentExc(exchange[exchange.length - 1]);
        }

        const sendCurrency = async () => {
            if (currentExc) {
                await addOrder(currentExc.id, currentExc.pfiDid).then(async () => {
                 
                    setConfirmMessage("Payment Success!");
                    setTimeout(() => {
                      router.push(`/pages/home`); // Redirect to the homepage after 2 seconds
                    }, 2000); // 2-second delay before redirect

               /*   try {
                        const apiResponse = await fetch('/api/transactions', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            customer_id: customer_id,
                            PFIS_name: currentData.pfiName, // Assuming PFIS_name is fetched from currentData.offering
                            recipient_address: recipientAddress, // Address from the form input
                            from_currency: currentData.currency, // From currency from currentData
                            to_currency: currentData.payoutcurr, // To currency from currentData
                            amount: amountToSend, // Amount to send from the form input
                            date: new Date().toISOString() // Optional: current date
                          }),
                        });
                      
                     const response = await apiResponse.json();
                        if (response.message == 'Transaction inserted successfully') {
                          setConfirmMessage("Payment Success!");
                          setTimeout(() => {
                            router.push(`/home?customer_id=${customer_id}`); // Redirect to the homepage after 2 seconds
                          }, 2000); // 2-second delay before redirect
                        }else{
                            setConfirmMessage("Transaction Failed please try again");
                            setTimeout(() => {
                                window.reload(); // Redirect to the homepage after 2 seconds
                              }, 3000); // 2-second delay before redirect
                        }
                      
                        if (!apiResponse.ok) {
                          throw new Error('Failed to create transaction');
                        }
                      } catch (err) {
                        console.error('Error sending POST request:', err);
                      } */ 
                });
            }
        };
        sendCurrency();
    }, [exchange, currentExc, router]);

    return (
        <>
        {walletAddress  && (
              <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-md mx-auto">
              <form onSubmit={handleSend}>
                  <div className="flex justify-between items-center mb-4">
                      <button 
                      onClick={handleBackButton}
                      className="text-white text-lg">
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

                <div className='overflow-y-auto' >
                {currentData?.offering?.data?.payout?.methods[0]?.requiredPaymentDetails?.properties && (
                      Object.entries(paymentDetails).map(([key, value]) => (
                          <div key={key} className="mb-2">
                              <label htmlFor={key} className="block text-sm font-bold text-gray-400 mb-2">
                                  {currentData.offering.data.payout.methods[0].requiredPaymentDetails.properties[key].title}
                              </label>
                              <input
                                  type={currentData.offering.data.payout.methods[0].requiredPaymentDetails.properties[key].type}
                                  value={value}
                                  onChange={(e) => handlePaymentDetailChange(key, e.target.value)}
                                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                  placeholder={`Enter ${currentData.offering.data.payout.methods[0].requiredPaymentDetails.properties[key].description}`}
                                  required
                              />
                              <small className="block text-gray-500">
                                  {currentData.offering.data.payout.methods[0].requiredPaymentDetails.properties[key].description}
                              </small>
                          </div>
                      ))
                  )}
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
                       <p className="text-gray-400 mt-2">Redirecting Home...</p>
                   )}
               </div>
           </div>
           
              )}
          </div>
        )}
          
        </>
    );
};

export default Wallet;
