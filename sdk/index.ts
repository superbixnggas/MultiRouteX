/**
 * MultiRouteX SDK
 * A comprehensive SDK for interacting with MultiRouteX smart contracts
 * @version 1.0.0
 * @author MultiRouteX Team
 */

import { ethers, Contract, Wallet, JsonRpcProvider } from 'ethers';
import { web3Config } from '../web3.config.js';
import sampleAbi from '../abi/sample.json';

/**
 * MultiRouteX SDK Class
 * Provides easy-to-use methods for interacting with MultiRouteX contract
 */
export class MultiRouteXSDK {
  private contract: Contract | null = null;
  private provider: JsonRpcProvider | null = null;
  private wallet: Wallet | null = null;
  private chainId: number = 1;

  /**
   * Initialize SDK with provider
   * @param providerUrl RPC provider URL or provider instance
   * @param privateKey Optional private key for write operations
   * @param chainId Network chain ID
   */
  constructor(
    providerUrl: string | JsonRpcProvider,
    privateKey?: string,
    chainId: number = 1
  ) {
    this.chainId = chainId;
    this.initializeProvider(providerUrl);
    
    if (privateKey) {
      this.initializeWallet(privateKey);
    }
  }

  /**
   * Initialize provider
   * @param providerUrl RPC provider URL
   */
  private initializeProvider(providerUrl: string | JsonRpcProvider): void {
    if (typeof providerUrl === 'string') {
      this.provider = new JsonRpcProvider(providerUrl);
    } else {
      this.provider = providerUrl;
    }
  }

  /**
   * Initialize wallet with private key
   * @param privateKey Private key for the wallet
   */
  private initializeWallet(privateKey: string): void {
    if (!this.provider) {
      throw new Error('Provider must be initialized before wallet');
    }
    
    this.wallet = new Wallet(privateKey, this.provider);
  }

  /**
   * Initialize contract instance
   * @param contractAddress Contract address
   * @param abi Contract ABI (optional, uses sample ABI if not provided)
   */
  async initializeContract(
    contractAddress: string,
    abi: any[] = sampleAbi.abi
  ): Promise<void> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    this.contract = new Contract(contractAddress, abi, this.wallet || this.provider);
  }

  /**
   * Get contract instance
   * @returns Contract instance
   */
  getContract(): Contract | null {
    return this.contract;
  }

  /**
   * Get provider instance
   * @returns Provider instance
   */
  getProvider(): JsonRpcProvider | null {
    return this.provider;
  }

  /**
   * Get wallet instance
   * @returns Wallet instance
   */
  getWallet(): Wallet | null {
    return this.wallet;
  }

  /**
   * Get current network information
   * @returns Network information
   */
  async getNetwork() {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }
    
    const network = await this.provider.getNetwork();
    return {
      chainId: Number(network.chainId),
      name: network.name,
      network: network
    };
  }

  /**
   * Get current gas price
   * @returns Gas price in wei
   */
  async getGasPrice(): Promise<bigint> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }
    
    return await this.provider.getFeeData();
  }

  /**
   * Get account balance
   * @param address Account address (optional, uses wallet if not provided)
   * @returns Balance in ETH
   */
  async getBalance(address?: string): Promise<string> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    const targetAddress = address || this.wallet?.address;
    if (!targetAddress) {
      throw new Error('Address not provided and wallet not available');
    }

    const balance = await this.provider.getBalance(targetAddress);
    return ethers.formatEther(balance);
  }

  // Contract read methods
  
  /**
   * Get stored value from contract
   * @returns Current stored value
   */
  async getValue(): Promise<string> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    const value = await this.contract.getValue();
    return value.toString();
  }

  /**
   * Get contract owner
   * @returns Contract owner address
   */
  async getOwner(): Promise<string> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    return await this.contract.owner();
  }

  // Contract write methods
  
  /**
   * Set new value in contract (requires wallet)
   * @param newValue New value to store
   * @returns Transaction response
   */
  async setValue(newValue: string | number): Promise<any> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    if (!this.wallet) {
      throw new Error('Wallet not initialized for write operations');
    }

    const contractWithSigner = this.contract.connect(this.wallet);
    
    // Validate input
    if (typeof newValue === 'string') {
      const numValue = BigInt(newValue);
      if (numValue < 0) {
        throw new Error('Value must be non-negative');
      }
    }

    return await contractWithSigner.setValue(newValue);
  }

  /**
   * Transfer contract ownership (requires wallet)
   * @param newOwner New owner address
   * @returns Transaction response
   */
  async transferOwnership(newOwner: string): Promise<any> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    if (!this.wallet) {
      throw new Error('Wallet not initialized for write operations');
    }

    if (!ethers.isAddress(newOwner)) {
      throw new Error('Invalid address format');
    }

    const contractWithSigner = this.contract.connect(this.wallet);
    return await contractWithSigner.transferOwnership(newOwner);
  }

  // Event listening methods
  
  /**
   * Listen for ValueChanged events
   * @param fromBlock Block number to start listening from
   * @param callback Event callback function
   */
  async listenToValueChanged(
    fromBlock: number | string = 'latest',
    callback: (event: any) => void
  ): Promise<void> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    this.contract.on('ValueChanged', callback);
  }

  /**
   * Listen for OwnershipTransferred events
   * @param fromBlock Block number to start listening from
   * @param callback Event callback function
   */
  async listenToOwnershipTransferred(
    fromBlock: number | string = 'latest',
    callback: (event: any) => void
  ): Promise<void> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    this.contract.on('OwnershipTransferred', callback);
  }

  /**
   * Stop listening to all events
   */
  stopListening(): void {
    if (this.contract) {
      this.contract.removeAllListeners();
    }
  }

  // Utility methods
  
  /**
   * Wait for transaction confirmation
   * @param txHash Transaction hash
   * @param confirmations Number of confirmations to wait for
   * @returns Transaction receipt
   */
  async waitForTransaction(
    txHash: string,
    confirmations: number = 1
  ): Promise<any> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    return await this.provider.waitForTransaction(txHash, confirmations);
  }

  /**
   * Estimate gas for a transaction
   * @param method Contract method name
   * @param args Method arguments
   * @returns Estimated gas amount
   */
  async estimateGas(method: string, ...args: any[]): Promise<bigint> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    if (!this.wallet) {
      throw new Error('Wallet not initialized for gas estimation');
    }

    const contractWithSigner = this.contract.connect(this.wallet);
    return await contractWithSigner[method].estimateGas(...args);
  }
}

// Utility functions
export const utils = {
  /**
   * Convert wei to ETH
   * @param wei Amount in wei
   * @returns Amount in ETH
   */
  weiToEth(wei: string | bigint): string {
    return ethers.formatEther(wei);
  },

  /**
   * Convert ETH to wei
   * @param eth Amount in ETH
   * @returns Amount in wei
   */
  ethToWei(eth: string | number): string {
    return ethers.parseEther(eth.toString()).toString();
  },

  /**
   * Validate Ethereum address
   * @param address Address to validate
   * @returns True if valid
   */
  isValidAddress(address: string): boolean {
    return ethers.isAddress(address);
  },

  /**
   * Get network by chain ID
   * @param chainId Chain ID
   * @returns Network configuration
   */
  getNetworkById(chainId: number) {
    return Object.values(web3Config.chains).find(chain => chain.chainId === chainId);
  }
};

// Constants
export const constants = {
  /**
   * Default gas limits
   */
  GAS_LIMITS: {
    VALUE_CHANGE: 50000,
    OWNERSHIP_TRANSFER: 60000
  },

  /**
   * Default confirmation blocks
   */
  CONFIRMATION_BLOCKS: {
    TESTNET: 1,
    MAINNET: 5
  }
};

export default MultiRouteXSDK;