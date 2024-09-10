const nextConfig = {
  // ... other config options
  webpack: (config, { isServer }) => {
    // ... existing webpack config

    if (!isServer) {
      config.externals = [...(config.externals || []), 'secp256k1', 'ethers'];
    }

    return config;
  },
};