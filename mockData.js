const mockPFIs = [
    {
      pfiName: "GlobalBank",
      pfiUri: "https://globalbank.com",
      offerings: [
        {
          payin: {
            currencyCode: "USD",
            currencyName: "US Dollar",
          },
          payout: {
            currencyCode: "EUR",
            currencyName: "Euro",
            methods: [
              {
                requiredPaymentDetails: {
                  properties: {
                    accountNumber: { type: "string", description: "Recipient account number" },
                    bankName: { type: "string", description: "Recipient bank name" },
                  },
                },
              },
            ],
          },
          payoutUnitsPerPayinUnit: 0.85,
          description: "Convert USD to EUR with competitive rates.",
        },
        {
          payin: {
            currencyCode: "USD",
            currencyName: "US Dollar",
          },
          payout: {
            currencyCode: "GBP",
            currencyName: "British Pound",
            methods: [
              {
                requiredPaymentDetails: {
                  properties: {
                    accountNumber: { type: "string", description: "Recipient account number" },
                    bankName: { type: "string", description: "Recipient bank name" },
                  },
                },
              },
            ],
          },
          payoutUnitsPerPayinUnit: 0.75,
          description: "Convert USD to GBP with a reliable service.",
        },
      ],
    },
    {
      pfiName: "FinancePlus",
      pfiUri: "https://financeplus.com",
      offerings: [
        {
          payin: {
            currencyCode: "USD",
            currencyName: "US Dollar",
          },
          payout: {
            currencyCode: "NGN",
            currencyName: "Nigerian Naira",
            methods: [
              {
                requiredPaymentDetails: {
                  properties: {
                    accountNumber: { type: "string", description: "Recipient account number" },
                    bankName: { type: "string", description: "Recipient bank name" },
                  },
                },
              },
            ],
          },
          payoutUnitsPerPayinUnit: 765.0,
          description: "Quick conversion of USD to NGN at the best rates.",
        },
        {
          payin: {
            currencyCode: "GBP",
            currencyName: "British Pound",
          },
          payout: {
            currencyCode: "NGN",
            currencyName: "Nigerian Naira",
            methods: [
              {
                requiredPaymentDetails: {
                  properties: {
                    accountNumber: { type: "string", description: "Recipient account number" },
                    bankName: { type: "string", description: "Recipient bank name" },
                  },
                },
              },
            ],
          },
          payoutUnitsPerPayinUnit: 980.0,
          description: "Reliable GBP to NGN transfers.",
        },
      ],
    },
    {
      pfiName: "CryptoEx",
      pfiUri: "https://cryptoex.com",
      offerings: [
        {
          payin: {
            currencyCode: "BTC",
            currencyName: "Bitcoin",
          },
          payout: {
            currencyCode: "ETH",
            currencyName: "Ethereum",
            methods: [
              {
                requiredPaymentDetails: {
                  properties: {
                    walletAddress: { type: "string", description: "Recipient Ethereum wallet address" },
                  },
                },
              },
            ],
          },
          payoutUnitsPerPayinUnit: 14.5,
          description: "Exchange BTC to ETH instantly.",
        },
        {
          payin: {
            currencyCode: "ETH",
            currencyName: "Ethereum",
          },
          payout: {
            currencyCode: "USDT",
            currencyName: "Tether",
            methods: [
              {
                requiredPaymentDetails: {
                  properties: {
                    walletAddress: { type: "string", description: "Recipient Tether wallet address" },
                  },
                },
              },
            ],
          },
          payoutUnitsPerPayinUnit: 1800.0,
          description: "Convert ETH to USDT with low fees.",
        },
      ],
    },
  ];
  
  export default mockPFIs;  