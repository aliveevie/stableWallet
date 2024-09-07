"use client";
import React, { useEffect, useState } from 'react';
import useStore from '../../functions/main';  // Import your store functions
import Loader from './loader';  // Import the loader component

const Send = () => {
  const { state } = useStore();
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
  const [activeData, setActiveData] = useState('');

  console.log(activeData)

  const handleSend = () => {

  };


    // Function to handle item click
    const handleItemClick = (index) => {
        setActiveIndex(true); // Set the active index
        setActiveData(index)
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

      /* 
      *
      * if(newSetOfOfferings[0].data.description){
          setDescription(newSetOfOfferings[0].data.description)
          setPayPerUnit(newSetOfOfferings[0].data.paypayoutUnitsPerPayinUnit)
          setUri(newSetOfOfferings[0].metadata.from)
          if(uri){
            for(const pfi of state.pfiAllowlist){
                if(pfi.pfiUri == uri){
                setShowPFI(pfi)
                console.log(showPFI)
              }
            }
          }
        } */

        const matchedPFIs = newSetOfOfferings.map((offering) => {
            const matchedPFI = state.pfiAllowlist.find(
              (pfi) => pfi.pfiUri === offering.metadata.from
            )
  
          if(matchedPFI){
            return {
              pfiName: matchedPFI.pfiName,  // PFI Name
              payPerUnit: offering.data.payoutUnitsPerPayinUnit,  // Set PayPerUnit
            
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
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Send Funds</h2>
  
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
  <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-lg">
    <h3 className="text-lg font-bold mb-2">Description:</h3>
    <p>{description}</p>

    {showPFI.length > 0 && (
                <>
                    <h4 className="text-md font-semibold mt-4">Exchange Rate Offerings:</h4>
                    <div className="mt-4">
                        <ul>
                            {showPFI.map((pfi, index) => (
                                <li 
                                    key={index} 
                                    className={`p-4 bg-gray-700 rounded-lg mb-2 cursor-pointer ${
                                       activeIndex ? 'bg-green-500' : 'bg-gray-700 hover:bg-gray-600'
                                    }`} // Conditional class for active or hover state
                                    onClick={() => handleItemClick(pfi)} // Set item as active on click
                                >
                                    <div className="font-semibold">{pfi.pfiName}</div>
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
    </div>
  );
};

export default Send;