/**
 * Bridge Utility Functions
 * 
 * Common utilities for cross-chain bridging operations
 */

import { type MainnetChainId, MAINNET_CHAINS } from '@/config/mainnet-chains';

/**
 * Formats a token amount for display
 */
export function formatTokenAmount(
  amount: bigint | string | number,
  decimals: number = 6,
  displayDecimals: number = 2
): string {
  const value = typeof amount === 'bigint' 
    ? amount 
    : BigInt(amount.toString());

  const divisor = BigInt(10 ** decimals);
  const integerPart = value / divisor;
  const fractionalPart = value % divisor;

  const fractionalStr = fractionalPart.toString().padStart(decimals, '0');
  const displayFractional = fractionalStr.slice(0, displayDecimals);

  return `${integerPart.toLocaleString()}.${displayFractional}`;
}

/**
 * Parses a token amount string to BigInt
 */
export function parseTokenAmount(amount: string, decimals: number = 6): bigint {
  const [integerPart, fractionalPart = ''] = amount.split('.');
  const paddedFractional = fractionalPart.padEnd(decimals, '0').slice(0, decimals);
  const fullAmount = integerPart + paddedFractional;
  return BigInt(fullAmount);
}

/**
 * Truncates an EVM address for display
 */
export function truncateAddress(address: string, startChars: number = 6, endChars: number = 4): string {
  if (!address || address.length <= startChars + endChars) {
    return address;
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Gets the block explorer URL for a transaction
 */
export function getExplorerTxUrl(chainId: MainnetChainId, txHash: string): string {
  const chain = MAINNET_CHAINS[chainId];
  if (!chain) return '';
  
  return `${chain.blockExplorer}/tx/${txHash}`;
}

/**
 * Gets the block explorer URL for an address
 */
export function getExplorerAddressUrl(chainId: MainnetChainId, address: string): string {
  const chain = MAINNET_CHAINS[chainId];
  if (!chain) return '';
  
  return `${chain.blockExplorer}/address/${address}`;
}

/**
 * Calculates estimated bridge time based on chains
 */
export function getEstimatedBridgeTime(
  fromChain: MainnetChainId,
  toChain: MainnetChainId
): { min: number; max: number; unit: string } {
  // CCTP typically takes 13-30 minutes
  // xReserve adds additional time for Stacks finality
  
  if (toChain === 'Stacks') {
    // EVM → Stacks takes longer due to xReserve processing
    return { min: 15, max: 45, unit: 'minutes' };
  }

  if (fromChain === 'Stacks') {
    // Stacks → EVM
    return { min: 20, max: 60, unit: 'minutes' };
  }

  // EVM ↔ EVM via CCTP
  return { min: 13, max: 30, unit: 'minutes' };
}

/**
 * Calculates estimated bridge fee
 */
export function getEstimatedBridgeFee(
  amount: bigint,
  fromChain: MainnetChainId,
  toChain: MainnetChainId
): { fee: bigint; percentage: string } {
  // CCTP has minimal fees (mainly gas)
  // xReserve may have protocol fees
  
  let feePercentage = 0.001; // 0.1% default

  if (toChain === 'Stacks' || fromChain === 'Stacks') {
    feePercentage = 0.002; // 0.2% for xReserve
  }

  const fee = (amount * BigInt(Math.floor(feePercentage * 10000))) / BigInt(10000);
  
  return {
    fee,
    percentage: `${(feePercentage * 100).toFixed(2)}%`,
  };
}

/**
 * Determines the bridge route
 */
export function getBridgeRoute(
  fromChain: MainnetChainId,
  toChain: MainnetChainId
): {
  type: 'cctp' | 'xreserve' | 'cctp-xreserve';
  steps: { from: MainnetChainId; to: MainnetChainId; protocol: string }[];
} {
  // Direct EVM ↔ EVM
  if (fromChain !== 'Stacks' && toChain !== 'Stacks') {
    return {
      type: 'cctp',
      steps: [{ from: fromChain, to: toChain, protocol: 'CCTP' }],
    };
  }

  // EVM → Stacks (may need CCTP hop to Ethereum first)
  if (toChain === 'Stacks') {
    if (fromChain === 'Ethereum') {
      return {
        type: 'xreserve',
        steps: [{ from: 'Ethereum', to: 'Stacks', protocol: 'xReserve' }],
      };
    }
    
    // Other chains need to go through Ethereum first
    return {
      type: 'cctp-xreserve',
      steps: [
        { from: fromChain, to: 'Ethereum', protocol: 'CCTP' },
        { from: 'Ethereum', to: 'Stacks', protocol: 'xReserve' },
      ],
    };
  }

  // Stacks → EVM
  if (fromChain === 'Stacks') {
    if (toChain === 'Ethereum') {
      return {
        type: 'xreserve',
        steps: [{ from: 'Stacks', to: 'Ethereum', protocol: 'xReserve' }],
      };
    }
    
    // Stacks → Other EVM chains via Ethereum
    return {
      type: 'cctp-xreserve',
      steps: [
        { from: 'Stacks', to: 'Ethereum', protocol: 'xReserve' },
        { from: 'Ethereum', to: toChain, protocol: 'CCTP' },
      ],
    };
  }

  // Fallback
  return {
    type: 'cctp',
    steps: [{ from: fromChain, to: toChain, protocol: 'CCTP' }],
  };
}

/**
 * Validates bridge input
 */
export function validateBridgeInput(
  amount: string,
  balance: bigint,
  minAmount: bigint = BigInt(1000000) // $1 minimum
): { valid: boolean; error?: string } {
  if (!amount || amount === '0') {
    return { valid: false, error: 'Enter an amount' };
  }

  try {
    const parsedAmount = parseTokenAmount(amount);
    
    if (parsedAmount < minAmount) {
      return { valid: false, error: 'Minimum amount is $1.00' };
    }

    if (parsedAmount > balance) {
      return { valid: false, error: 'Insufficient balance' };
    }

    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid amount' };
  }
}
