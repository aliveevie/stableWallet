# StableWallet

StableWallet is a decentralized financial wallet application built with the [tbDEX SDK](https://developer.tbd.website/docs/tbdex/sdk/). It allows users to send and receive funds seamlessly between fiat and cryptocurrency offerings, leveraging multiple PFIs (Payment Financial Institutions) to provide flexible exchange rates and payment methods. 

## Live Demo

Visit the live application: [https://stablewallet.vercel.app/](https://stablewallet.vercel.app/)

## Repository

The source code is available on GitHub: [https://github.com/aliveevie/stableWallet](https://github.com/aliveevie/stableWallet)

## Running the Project Locally

To run StableWallet on your local machine, follow these steps:

1. Clone the repository:
    ```
    git clone https://github.com/aliveevie/stableWallet.git
    ```

2. Navigate to the project directory:
    ```
    cd stableWallet
    ```

3. Install dependencies:
    ```
    npm install
    ```
4. Run the Development Server
    ```
    npm run dev
    ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Key Features

### Profitability

StableWallet aims to generate profit through the following strategies:

1. **Transaction Fees**:After the first three transfers, StableWallet charges a small transaction fee (e.g., $0.30 per transaction), which could generate a consistent income as the platform grows in user base.
2. **Premium Features**: Offering advanced features or higher transaction limits for a subscription fee.
3. **Partnerships**: Collaborating with PFIs (Protocol for Financial Institutions) for referral bonuses or revenue sharing.
4. **Yield Farming**: Utilizing idle assets in DeFi protocols to generate additional revenue, with a portion shared with users.

## Optionality

StableWallet provides users with flexibility by offering multiple PFIs for their transactions. It handles matching offerings from multiple PFIs by:

1. **Comparing Exchange Rates**: StableWallet fetches real-time exchange rate offerings from different PFIs and displays the most favorable rates to users.

2. **Optionality for Users**: Users can select their preferred PFI based on various factors such as exchange rates, transaction speed, or available currencies.

3. **Automated Matching**: If a user does not select a specific PFI, StableWallet will automatically choose the best offering based on the user's preferences, such as the lowest fees or fastest transaction times.

### Customer Management

Decentralized identifiers (DIDs) and verifiable credentials are managed through:

1. **Secure Storage**: DIDs and VCs are stored locally on the user’s device or via secure decentralized storage, ensuring that the user remains in full control of their data.
2. **Backup Solutions**: Providing options for users to backup their DIDs and credentials securely.
3. **Integration with Identity Providers**: Supporting various decentralized identity providers for credential issuance and verification.
4. **Credential Requests**: Facilitating the process of requesting and receiving verifiable credentials from issuers.
5. **Seamless Verification**: Users can easily verify their credentials with PFIs through the platform, ensuring a smooth and secure transaction experience.
6. **Integration with tbDEX SDK**: Leveraging the tbDEX SDK ensures that interactions with decentralized credentials are secure, compliant, and interoperable across different PFIs.

### Customer Satisfaction

To track and improve customer satisfaction with PFIs, StableWallet implements:

1. **Rating System**: Allowing users to rate their experience with each PFI after transactions.
2. **Feedback Collection**: Providing a platform for users to submit detailed feedback and suggestions.
3. **Performance Metrics**: Tracking and displaying metrics such as transaction speed, success rate, and customer support responsiveness for each PFI.
4. **Dispute Resolution**: Offering a streamlined process for users to report issues and seek resolution with PFIs.


## License

This project is licensed under the [MIT License](LICENSE).

## Support

For support, please open an issue in the GitHub repository or contact our support team at support@stablewallet.com.