"use client";

import { useState, useEffect, useCallback } from 'react';

const mockProviderDids = {
  aquafinance_capital: {
    uri: 'did:dht:3fkz5ssfxbriwks3iy5nwys3q5kyx64ettp9wfn1yfekfkiguj1y',
    name: 'aquafinance_capital',
    description: `🏦 AquaFinance Capital

DID: did:dht:3fkz5ssfxbriwks3iy5nwys3q5kyx64ettp9wfn1yfekfkiguj1y

Offerings:
- GHS to USDC
- NGN to KES
- KES to USD
- USD to KES`,
  },
  flowback_financial: {
    uri: 'did:dht:zkp5gbsqgzn69b3y5dtt5nnpjtdq6sxyukpzo68npsf79bmtb9zy',
    name: 'flowback_financial',
    description: `🏦 Flowback Financial

DID: did:dht:zkp5gbsqgzn69b3y5dtt5nnpjtdq6sxyukpzo68npsf79bmtb9zy

Offerings:
- USD to EUR
- EUR to USD
- USD to GBP
- USD to BTC`,
  },
  vertex_liquid_assets: {
    uri: 'did:dht:enwguxo8uzqexq14xupe4o9ymxw3nzeb9uug5ijkj9rhfbf1oy5y',
    name: 'vertex_liquid_assets',
    description: `🏦 Vertex Liquid Assets

DID: did:dht:enwguxo8uzqexq14xupe4o9ymxw3nzeb9uug5ijkj9rhfbf1oy5y

Offerings:
- EUR to USD
- EUR to USDC
- USD to EUR
- EUR to GBP`,
  },
  titanium_trust: {
    uri: 'did:dht:ozn5c51ruo7z63u1h748ug7rw5p1mq3853ytrd5gatu9a8mm8f1o',
    name: 'titanium_trust',
    description: `🏦 Titanium Trust

DID: did:dht:ozn5c51ruo7z63u1h748ug7rw5p1mq3853ytrd5gatu9a8mm8f1o

Offerings:
- USD to AUD
- USD to GBP
- USD to KES
- USD to MXN`,
  },
};

const useStore = () => {
  const [state, setState] = useState({
    balance: 100, // default balance
    transactions: [],
    transactionsLoading: true,
    pfiAllowlist: Object.keys(mockProviderDids).map((key) => ({
      pfiUri: mockProviderDids[key].uri,
      pfiName: mockProviderDids[key].name,
      pfiDescription: mockProviderDids[key].description,
    })),
    selectedTransaction: null,
    offering: null,
    payinCurrencies: [],
    payoutCurrencies: [],
    offerings: [],
    customerDid: null,
    customerCredentials: [],
  });

  useEffect(() => {
    function setBalance() {
      if (typeof window !== 'undefined') {
        const savedBalance = localStorage.getItem('walletBalance');
        if (savedBalance) {
          setState((prevState) => ({
            ...prevState,
            balance: parseFloat(savedBalance) || 100,
          }));
        }
      }
    }
    setBalance();
  }, []);

  const fetchOfferings = useCallback(async () => {
    try {
      const { TbdexHttpClient } = await import('@tbdex/http-client');
      const allOfferings = [];
      for (const pfi of state.pfiAllowlist) {
        const pfiUri = pfi.pfiUri;
        const offerings = await TbdexHttpClient.getOfferings({
          pfiDid: pfiUri,
        });
        allOfferings.push(...offerings);
      }

      setState((prevState) => ({
        ...prevState,
        offerings: allOfferings,
      }));
      updateCurrencies(allOfferings);
    } catch (error) {
      console.error('Failed to fetch offerings:', error);
    }
  }, [state.pfiAllowlist]);

  const createExchange = async (offering, amount, payoutPaymentDetails) => {
  //  console.log(offering, amount, payoutPaymentDetails)
    const { Rfq, TbdexHttpClient } = await import('@tbdex/http-client');
    const { PresentationExchange } = await import('@web5/credentials')

    const selectedCredentials = PresentationExchange.selectCredentials({
      vcJwts: state.customerCredentials,
      presentationDefinition: offering.data.requiredClaims,
    });

    const rfq = Rfq.create({
      metadata: {
        from: state.customerDid.uri,
        to: offering.metadata.from,
        protocol: '1.0',
      },
      data: {
        offeringId: offering.id,
        payin: {
          amount: amount.toString(),
          kind: offering.data.payin.methods[0].kind,
          paymentDetails: {},
        },
        payout: {
          kind: offering.data.payout.methods[0].kind,
          paymentDetails: payoutPaymentDetails,
        },
        claims: selectedCredentials,
      },
    });

    try {
        await rfq.verifyOfferingRequirements(offering);
     
    } catch (e) {
      console.log('Offering requirements not met', e);
    }

     await rfq.sign(state.customerDid);

    try {
       await TbdexHttpClient.createExchange(rfq);
    } catch (error) {
      console.error('Failed to create exchange:', error);
    }
  };

  const fetchExchanges = async (pfiUri) => {
    try {
      const { TbdexHttpClient } = await import('@tbdex/http-client');
      const exchanges = await TbdexHttpClient.getExchanges({
        pfiDid: pfiUri,
        did: state.customerDid,
      });

      const mappedExchanges =  formatMessages(exchanges);
      if(mappedExchanges){
        console.log("Transfer Success!")
      }
      return mappedExchanges;
    } catch (error) {
      console.error('Failed to fetch exchanges:', error);
    }
  };

  const addClose = async (exchangeId, pfiUri, reason) => {
    const { Close, TbdexHttpClient } = await import('@tbdex/http-client');

    const close = Close.create({
      metadata: {
        from: state.customerDid.uri,
        to: pfiUri,
        exchangeId,
      },
      data: {
        reason,
      },
    });

    await close.sign(state.customerDid);
    try {
      await TbdexHttpClient.submitClose(close);
    } catch (error) {
      console.error('Failed to close exchange:', error);
    }
  };

  const addOrder = async (exchangeId, pfiUri) => {
  const { Order, TbdexHttpClient } = await import('@tbdex/http-client');

    const order = Order.create({
      metadata: {
        from: state.customerDid.uri,
        to: pfiUri,
        exchangeId,
      },
    });

    await order.sign(state.customerDid);
    try {
        await TbdexHttpClient.submitOrder(order);
    } catch (error) {
      console.error('Failed to submit order:', error);
    }
  };

  const pollExchanges = useCallback(() => {
    const fetchAllExchanges = async () => {
      if (!state.customerDid) return;
      const allExchanges = [];
      try {
        if(state.pfiAllowlist){
          for (const pfi of state.pfiAllowlist) {
            const exchanges = await fetchExchanges(pfi.pfiUri);
            allExchanges.push(...exchanges);
          }
          updateExchanges(allExchanges.reverse());
          setState((prevState) => ({
            ...prevState,
            transactionsLoading: false,
          }));
        }
       
      } catch (error) {
        console.error('Failed to fetch exchanges:', error);
      }
    };

    fetchAllExchanges();
    const intervalId = setInterval(fetchAllExchanges, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, [state.pfiAllowlist, state.customerDid]);

  const initializeDid = useCallback(async () => {
    const { DidDht } = await import('@web5/dids');

    try {
      const storedDid = localStorage.getItem('customerDid');
      let customerDid;
      if (storedDid) {
        customerDid = await DidDht.import({
          portableDid: JSON.parse(storedDid),
        });
      } else {
        customerDid = await DidDht.create({
          options: { publish: true },
        });
        const exportedDid = await customerDid.export();
        localStorage.setItem('customerDid', JSON.stringify(exportedDid));
      }
      setState((prevState) => ({
        ...prevState,
        customerDid,
      }));
    } catch (error) {
      console.error('Failed to initialize DID:', error);
    }
  }, []);

  const formatMessages = (exchanges) => {
    const formattedMessages = exchanges.map((exchange) => {
      const latestMessage = exchange[exchange.length - 1];
      const rfqMessage = exchange.find((message) => message.kind === 'rfq');
      const quoteMessage = exchange.find((message) => message.kind === 'quote');
      const status = generateExchangeStatusValues(latestMessage);
      const fee = quoteMessage?.data['payin']?.['fee'];
      const payinAmount = quoteMessage?.data['payin']?.['amount'];
      const payoutPaymentDetails = rfqMessage.privateData?.payout.paymentDetails;
      return {
        id: latestMessage.metadata.exchangeId,
        payinAmount:
          (fee ? Number(payinAmount) + Number(fee) : Number(payinAmount)).toString() ||
          rfqMessage.data['payinAmount'],
        payinCurrency: quoteMessage.data['payin']?.['currencyCode'] ?? null,
        payoutAmount: quoteMessage?.data['payout']?.['amount'] ?? null,
        payoutCurrency: quoteMessage.data['payout']?.['currencyCode'],
        status,
        createdTime: rfqMessage.createdAt,
        ...(latestMessage.kind === 'quote' && {
          expirationTime: quoteMessage.data['expiresAt'] ?? null,
        }),
        from: 'You',
        to:
          payoutPaymentDetails?.address ||
          payoutPaymentDetails?.accountNumber + ', ' + payoutPaymentDetails?.bankName ||
          payoutPaymentDetails?.phoneNumber + ', ' + payoutPaymentDetails?.networkProvider ||
          'Unknown',
        pfiDid: rfqMessage.metadata.to,
      };
    });

    return formattedMessages;
  };

  const selectTransaction = (transaction) => {
    setState((prevState) => ({
      ...prevState,
      selectedTransaction: transaction,
    }));
  };

  const setOffering = (offering) => {
    setState((prevState) => ({
      ...prevState,
      offering,
    }));
  };

  const deductAmount = (amount) => {
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      setState((prevState) => ({
        ...prevState,
        balance: prevState.balance - numericAmount,
      }));
      localStorage.setItem('walletBalance', (state.balance - numericAmount).toString());
    }
  };

  const formatAmount = (amount) => {
    if (Math.abs(amount) >= 1) {
      return amount.toFixed(2);
    }

    const precision = Math.abs(amount) >= 0.01 ? 4 : 6;
    return parseFloat(amount.toFixed(precision)).toString();
  };

  const getOfferingById = (offeringId) => {
    const selectedOffering = state.offerings.find((offering) => offering.id === offeringId);
    return selectedOffering;
  };

  const updateCurrencies = (offerings) => {
    const payinCurrencies = new Set();
    const payoutCurrencies = new Set();

    offerings.forEach((offering) => {
      payinCurrencies.add(offering.data.payin.currencyCode);
      payoutCurrencies.add(offering.data.payout.currencyCode);
    });

    setState((prevState) => ({
      ...prevState,
      payinCurrencies: Array.from(payinCurrencies),
      payoutCurrencies: Array.from(payoutCurrencies),
    }));
  };

  const filterOfferings = (payinCurrency, payoutCurrency) => {
    return state.offerings.filter(
      (offering) =>
        offering.data.payin.currencyCode === payinCurrency &&
        offering.data.payout.currencyCode === payoutCurrency
    );
  };

  const satisfiesOfferingRequirements = async (offering, credentials) => {
    const { PresentationExchange } = await import('@web5/credentials');
    if (credentials.length === 0 || !offering.data.requiredClaims) {
      return false;
    }

    try {
      PresentationExchange.satisfiesPresentationDefinition({
        vcJwts: credentials,
        presentationDefinition: offering.data.requiredClaims,
      });
      return true;
    } catch (e) {
      return false;
    }
  };

  const addCredential = (credential) => {
    const updatedCredentials = [...state.customerCredentials, credential];
    setState((prevState) => ({
      ...prevState,
      customerCredentials: updatedCredentials,
    }));
    localStorage.setItem('customerCredentials', JSON.stringify(updatedCredentials));
  };

  const renderCredential = async (credentialJwt) => {
    const { Jwt } = await import('@web5/credentials');
    if(Jwt){
      const vc = await Jwt.parse({ jwt: credentialJwt }).decoded.payload['vc'];
      return {
        title: vc.type[vc.type.length - 1].replace(/(?<!^)(?<![A-Z])[A-Z](?=[a-z])/g, ' $&'),
        name: vc.credentialSubject['name'],
        countryCode: vc.credentialSubject['countryOfResidence'],
        issuanceDate: new Date(vc.issuanceDate).toLocaleDateString(undefined, {
          dateStyle: 'medium',
        }),
      };
    }
  };

  const loadCredentials = () => {
    const storedCredentials = localStorage.getItem('customerCredentials');
    if (storedCredentials) {
      setState((prevState) => ({
        ...prevState,
        customerCredentials: JSON.parse(storedCredentials),
      }));
    } else {
      console.log('No credentials exist');
    }
  };

  const generateExchangeStatusValues = async (exchangeMessage) => {

    const { Close } = await import("@tbdex/http-client")

    if (exchangeMessage instanceof Close) {
      if (exchangeMessage.data.reason.toLowerCase().includes('complete') || exchangeMessage.data.reason.toLowerCase().includes('success') ) {
        return 'completed'
      } else if (exchangeMessage.data.reason.toLowerCase().includes('expired')) {
        return exchangeMessage.data.reason.toLowerCase()
      } else if (exchangeMessage.data.reason.toLowerCase().includes('cancelled')) {
        return 'cancelled'
      } else {
        return 'failed'
      }
    }
    return exchangeMessage.kind
  }

  const renderOrderStatus = (exchange) => {
    const status = generateExchangeStatusValues(exchange);
    switch (status) {
      case 'rfq':
        return 'Requested';
      case 'quote':
        return 'Quoted';
      case 'order':
      case 'orderstatus':
        return 'Pending';
      case 'completed':
        return 'Completed';
      case 'expired':
        return 'Expired';
      case 'cancelled':
        return 'Cancelled';
      case 'failed':
        return 'Failed';
      default:
        return status;
    }
  };

  const updateExchanges = (newTransactions) => {
    const existingExchangeIds = state.transactions.map((tx) => tx.id);
    const updatedExchanges = [...state.transactions];

    newTransactions.forEach((newTx) => {
      const existingTxIndex = updatedExchanges.findIndex((tx) => tx.id === newTx.id);
      if (existingTxIndex > -1) {
        updatedExchanges[existingTxIndex] = newTx;
      } else {
        updatedExchanges.push(newTx);
      }
    });

    setState((prevState) => ({
      ...prevState,
      transactions: updatedExchanges,
    }));
  };

  const capitalizePfiName = (pfiName) => {
    return pfiName
      .replace(/_/g, ' ') // Replace underscores with spaces
      .split(' ')         // Split the name into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word
      .join(' ');         // Join the words back into a single string
  };
  

  const formatDate = (date) => {
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    const year = date.getFullYear();
  
    // Function to get the ordinal suffix (st, nd, rd, th)
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return 'th'; // covers 11th-19th
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
  
    const suffix = getOrdinalSuffix(day);
    
    return `${day}${suffix} ${month}, ${year}`;
  };
  
  useEffect(() => {
    const init = async () => {
    await initializeDid();
    loadCredentials();
    await fetchOfferings();
    // localStorage.clear();
    };
    init();
  }, [fetchOfferings, initializeDid]);

  return {
    state,
    selectTransaction,
    setOffering,
    deductAmount,
    formatAmount,
    fetchOfferings,
    filterOfferings,
    satisfiesOfferingRequirements,
    addCredential,
    renderCredential,
    loadCredentials,
    createExchange,
    fetchExchanges,
    renderOrderStatus,
    addOrder,
    addClose,
    getOfferingById,
    pollExchanges,
    capitalizePfiName,
    formatDate,
    initializeDid,
  };
};

export default useStore;