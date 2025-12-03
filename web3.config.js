/**
 * Web3 Configuration untuk MultiRouteX
 * Berisi daftar chain ID dan RPC endpoints
 */

const chains = {
  // Ethereum Mainnet
  mainnet: {
    chainId: 1,
    name: "Ethereum Mainnet",
    rpc: [
      "https://mainnet.infura.io/v3/${INFURA_KEY}",
      "https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}",
      "https://ethereum.publicnode.com"
    ],
    explorer: "https://etherscan.io",
    symbol: "ETH",
    decimals: 18
  },
  
  // Sepolia Testnet
  sepolia: {
    chainId: 11155111,
    name: "Sepolia",
    rpc: [
      "https://sepolia.infura.io/v3/${INFURA_KEY}",
      "https://eth-sepolia.alchemyapi.io/v2/${ALCHEMY_KEY}",
      "https://sepolia.publicnode.com"
    ],
    explorer: "https://sepolia.etherscan.io",
    symbol: "ETH",
    decimals: 18
  },
  
  // Polygon Mainnet
  polygon: {
    chainId: 137,
    name: "Polygon",
    rpc: [
      "https://polygon-rpc.com",
      "https://mainnet-polygon.ankr.com",
      "https://polygon.publicnode.com"
    ],
    explorer: "https://polygonscan.com",
    symbol: "MATIC",
    decimals: 18
  },
  
  // Polygon Mumbai Testnet
  mumbai: {
    chainId: 80001,
    name: "Polygon Mumbai",
    rpc: [
      "https://polygon-testnet.publicnode.com",
      "https://rpc-mumbai.maticvigil.com",
      "https://rpc-mumbai.matic.network"
    ],
    explorer: "https://mumbai.polygonscan.com",
    symbol: "MATIC",
    decimals: 18
  },
  
  // BSC Mainnet
  bsc: {
    chainId: 56,
    name: "Binance Smart Chain",
    rpc: [
      "https://bsc-dataseed1.binance.org",
      "https://bsc-dataseed2.binance.org",
      "https://bsc-dataseed3.binance.org"
    ],
    explorer: "https://bscscan.com",
    symbol: "BNB",
    decimals: 18
  },
  
  // BSC Testnet
  bsctestnet: {
    chainId: 97,
    name: "BSC Testnet",
    rpc: [
      "https://data-seed-prebsc-1-s1.binance.org:8545",
      "https://data-seed-prebsc-2-s1.binance.org:8545"
    ],
    explorer: "https://testnet.bscscan.com",
    symbol: "BNB",
    decimals: 18
  },
  
  // Arbitrum One
  arbitrum: {
    chainId: 42161,
    name: "Arbitrum One",
    rpc: [
      "https://arb1.arbitrum.io/rpc",
      "https://arbitrum-mainnet.infura.io/v3/${INFURA_KEY}"
    ],
    explorer: "https://arbiscan.io",
    symbol: "ETH",
    decimals: 18
  },
  
  // Arbitrum Sepolia (Testnet)
  arbitrum_sepolia: {
    chainId: 421614,
    name: "Arbitrum Sepolia",
    rpc: [
      "https://sepolia-rollup.arbitrum.io/rpc"
    ],
    explorer: "https://sepolia.arbiscan.io",
    symbol: "ETH",
    decimals: 18
  },
  
  // Solana
  solana: {
    chainId: 101,
    name: "Solana",
    rpc: [
      "https://api.mainnet-beta.solana.com",
      "https://solana-api.projectserum.com",
      "https://rpc.ankr.com/solana"
    ],
    explorer: "https://explorer.solana.com",
    symbol: "SOL",
    decimals: 9
  },
  
  // Solana Devnet
  solana_devnet: {
    chainId: 103,
    name: "Solana Devnet",
    rpc: [
      "https://api.devnet.solana.com",
      "https://devnet.solana.com"
    ],
    explorer: "https://explorer.solana.com/?cluster=devnet",
    symbol: "SOL",
    decimals: 9
  }
};

// Provider configurations untuk library Web3
const providers = {
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    baseUrl: "https://api.etherscan.io"
  },
  polygonscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
    baseUrl: "https://api.polygonscan.com"
  },
  bscscan: {
    apiKey: process.env.BSCSCAN_API_KEY,
    baseUrl: "https://api.bscscan.com"
  }
};

// Gas price configurations
const gasConfig = {
  ethereum: {
    standard: 20000000000, // 20 gwei
    fast: 30000000000,     // 30 gwei
    instant: 50000000000   // 50 gwei
  },
  polygon: {
    standard: 30000000000,  // 30 gwei
    fast: 50000000000,      // 50 gwei
    instant: 100000000000   // 100 gwei
  },
  bsc: {
    standard: 5000000000,   // 5 gwei
    fast: 10000000000,      // 10 gwei
    instant: 20000000000    // 20 gwei
  }
};

module.exports = {
  chains,
  providers,
  gasConfig,
  
  // Helper functions
  getChainById(chainId) {
    return Object.values(chains).find(chain => chain.chainId === chainId);
  },
  
  getChainByName(chainName) {
    return chains[chainName];
  },
  
  getRpcUrl(chainName, fallback = 0) {
    const chain = chains[chainName];
    if (!chain || !chain.rpc || chain.rpc.length === 0) return null;
    return chain.rpc[fallback] || chain.rpc[0];
  }
};