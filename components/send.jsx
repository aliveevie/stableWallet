"use client";
import React, { useEffect, useState } from 'react';
import useStore from '../functions/main';  // Import your store functions
import Loader from './loader';  // Import the loader component
import Wallet from './wallet';
import Header from './Header';
import { Footer } from './footer';


export function Send() {
  const { state, capitalizePfiName } = useStore();
  const [walletAddress, setWalletAddress] = useState(false);
  const [currency, setCurrency] = useState('');  // PayIn currency
  const [crypto, setCrypto] = useState('');  // Payout currency
  const [payIn, setPayIn] = useState([]);  // PayIn currencies list
  const [payout, setPayout] = useState([]);  // Payout currencies list
  const [loading, setLoading] = useState(true); // Track loading state
  const [offerings, setOfferings] = useState([]);  // Offerings from state
  const [description, setDescription] = useState('');  // Description for selected currency
  const [payoutCurr, setPayoutCurr] = useState('');  // Selected Payout currency
  const [newSetOfOfferings, setNewSetOfOffering] = useState([]);  // Filtered offerings for the selected currency;
  const [showPFI, setShowPFI] = useState([]);
  const [uri, setUri] = useState('');
  const [payPerUnit, setPayPerUnit] = useState([]);
  const [outcurr, setOurcurr] = useState('');
  const [activeIndex, setActiveIndex] = useState(false);
  const [activeData, setActiveData] = useState(null);
  const [bgColor, setBgColor] = useState("bg-gray-700"); // To track background color of the clicked item


  const handleSend = () => {
        if(activeData){
          setWalletAddress(true)
        }else{
          alert("Select Offerings to continue!")
        }
  };

    // Function to handle item click
    const handleItemClick = (pfi, index) => {
        setActiveIndex(index); // Set the active index
        setActiveData(pfi)
        setBgColor("bg-green-500");
    };

    const handleCurrencyChange = (e) => {
      setCurrency(e.target.value); // Set the selected currency
      setActiveIndex(null); // Reset the active PFI
      setBgColor("bg-gray-700"); // Reset background color to default
      setActiveData(null)
  };

  useEffect(() => {
    async function getOffering() {
      if (state.payinCurrencies.length > 0 || state.payoutCurrencies.length > 0) {
        setPayIn(state.payinCurrencies);  // Set PayIn currencies
        setOfferings(state.offerings);  // Set all offerings
        setLoading(false);  // Stop loading when data is fetched
      }
    }

    getOffering();
  }, [state]);

  useEffect(() => {
    if (currency && offerings.length > 0) {
      // Filter the offerings based on the selected PayIn currency
      const filteredOffering = offerings.filter(
        (offering) => offering.data.payin.currencyCode === currency
      );
  
      // Map the filtered offering to get the payouts
      const payouts = filteredOffering.map((offering) => offering.data.payout.currencyCode);
  
      // Ensure unique payout options and set the payout state
      if (payouts.length > 0) {
        setPayout([...new Set(payouts)]);  // Set the unique payout options
      }
  
      // Set filtered offerings for further use if needed
      if (filteredOffering.length > 0) {
        setNewSetOfOffering(filteredOffering);
     //   console.log('Filtered Offering:', filteredOffering);  // Debug log to check the filtered offering
      }
    }
  }, [currency, offerings]);  // Trigger this when currency or offerings change


  useEffect(() => {
    // When both PayIn and Payout currencies are selected, find the correct description
    if (currency && payoutCurr && newSetOfOfferings.length > 0) {
      const selectedOffering = newSetOfOfferings.filter(
        (offering) => 
          offering.data.payout.currencyCode === payoutCurr &&  // Match Payout currency
        offering.data.payin.currencyCode === currency        // Match PayIn currency
      );
      if (selectedOffering.length > 0) {
      //  console.log(selectedOffering)
      //  setDescription(selectedOffering.data.description);  // Set the description for the matching offering
     //  console.log('Description:', selectedOffering.data.description);  // Log the description
     //   setPayPerUnit(selectedOffering.data.payoutUnitsPerPayinUnit)
     //   setUri(selectedOffering.metadata.from)
     const matchedPFIs = selectedOffering.map((offering) => {
          const matchedPFI = state.pfiAllowlist.find(
            (pfi) => pfi.pfiUri === offering.metadata.from
          )

        if(matchedPFI){
          return {
            pfiName: matchedPFI.pfiName,  // PFI Name
            payPerUnit: offering.data.payoutUnitsPerPayinUnit,  // Set PayPerUnit
            currency: currency,
            payoutcurr: payoutCurr,
            offering: offering

          };
        }
     }).filter(Boolean);

        const uniquePFIs = matchedPFIs.filter((pfi, index, self) =>
          index === self.findIndex((t) => t.pfiName === pfi.pfiName)
        );
        setShowPFI(uniquePFIs);  // Set unique PFIs to show
        // Set the description for the first offering
        setDescription(selectedOffering[0].data.description);
        setOurcurr(payoutCurr)
  }
  
      else{
        const matchedPFIs = newSetOfOfferings.map((offering) => {
            const matchedPFI = state.pfiAllowlist.find(
              (pfi) => pfi.pfiUri === offering.metadata.from
            )
  
          if(matchedPFI){
            return {
              pfiName: matchedPFI.pfiName,  // PFI Name
              payPerUnit: offering.data.payoutUnitsPerPayinUnit,  // Set PayPerUnit
              currency: currency,
              payoutcurr: payout[0],
              offering: offering
            };
          }
       }).filter(Boolean);
  
     if(matchedPFIs.length > 0){
          
      setDescription(newSetOfOfferings[0].data.description);
      setOurcurr(payout[0]);
   //   console.log(payout, payoutCurr);
      const uniquePFIs = matchedPFIs.filter((pfi, index, self) =>
        index === self.findIndex((t) => t.pfiName === pfi.pfiName)
      );
      setShowPFI(uniquePFIs);  // Set unique PFIs to show
    
    }
      }
    }
  }, [newSetOfOfferings, uri, payPerUnit, state.pfiAllowlist, currency, payoutCurr]);  // Trigger this when payoutCurr or newSetOfOfferings change


  if (loading) {
    return (
        <Loader /> 
    );
  }
  return (
    <>
      <Header />
      <div className="w-full p-5 bg-gray-900 text-white rounded-lg shadow-lg max-w-md mx-auto mt-10">
         <h2 className="text-xl font-bold mb-4">Send Funds</h2>

      {!walletAddress ? (
        <>
          <div className="mb-4">
            <label htmlFor="currency" className="block text-sm font-medium mb-2">
              Choose Currency
            </label>
            <select
              id="currency"
              value={currency}
              onChange={handleCurrencyChange}
              className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option disabled value="" key="selectCurrency">Select currency</option>
              {payIn.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="crypto" className="block text-sm font-medium mb-2">
              To (Cryptocurrency/Currency)
            </label>
            <select
              id="crypto"
              value={payoutCurr}
              onChange={(e) => setPayoutCurr(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option disabled value="" key="selectPayout">Select currency</option>
              {payout.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {description && (
            <div className="p-2 bg-gray-800 rounded-lg shadow-lg overflow-y-auto max-h-80 mb-25 p-2 pb-10">
            <h3 className="text-lg font-bold mb-2">Description:</h3>
              <p>{description}</p>

              {showPFI.length > 0 && (
                <>
                  <h4 className="text-md font-semibold mt-4">Exchange Rate Offerings:</h4>
                  <div className="mt-2">
                    <ul>
                      {showPFI.map((pfi, index) => (
                        <li
                          key={index}
                          className={`p-4 bg-gray-700 rounded-lg mb-2  cursor-pointer ${activeIndex === index
                              ?  bgColor
                              : 'bg-gray-700 hover:bg-gray-600'}`} // Conditional class for active or hover state
                          onClick={() => handleItemClick(pfi, index)} // Set item as active on click
                        >
                          <div className="font-semibold">{capitalizePfiName(pfi.pfiName)}</div>
                          <div className="text-sm text-blue-400">
                            {pfi.payPerUnit} {outcurr} for 1 {currency}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
              <button
                onClick={handleSend}
                className="w-full py-2 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 transition duration-300"
              >
                Continue
              </button>
            </div>
          )}
        </>
      ) : (
        // Show the Wallet component when the form is hidden
        <Wallet currentData={activeData} walletAddress={walletAddress} setWalletAddress={setWalletAddress} /> // Passing exchange rate from the first PFI as an example
      )}
    </div>
    <Footer />
    </>
);
};