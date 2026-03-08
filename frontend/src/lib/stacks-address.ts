/**
 * Stacks Address Utilities
 * 
 * Helper functions for validating and encoding Stacks addresses
 * for cross-chain bridge operations via xReserve.
 */

/**
 * Validates if a string is a valid Stacks address
 * Mainnet addresses start with SP, testnet addresses start with ST
 */
export function isValidStacksAddress(address: string, isMainnet: boolean = true): boolean {
  if (!address || typeof address !== 'string') {
    return false;
  }

  const prefix = isMainnet ? 'SP' : 'ST';
  
  // Stacks addresses are typically 40-45 characters
  // Format: SP/ST + 33+ alphanumeric characters
  const regex = new RegExp(`^${prefix}[0-9A-Z]{33,}$`, 'i');
  
  return regex.test(address);
}

/**
 * Gets the network type from a Stacks address
 */
export function getStacksNetworkFromAddress(address: string): 'mainnet' | 'testnet' | 'invalid' {
  if (!address || typeof address !== 'string') {
    return 'invalid';
  }

  if (address.startsWith('SP')) {
    return 'mainnet';
  }

  if (address.startsWith('ST')) {
    return 'testnet';
  }

  return 'invalid';
}

/**
 * Truncates a Stacks address for display
 */
export function truncateStacksAddress(address: string, startChars: number = 6, endChars: number = 4): string {
  if (!address || address.length <= startChars + endChars) {
    return address;
  }

  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Gets the Stacks explorer URL for an address or transaction
 */
export function getStacksExplorerUrl(
  identifier: string, 
  type: 'address' | 'tx' = 'address',
  isMainnet: boolean = true
): string {
  const baseUrl = isMainnet 
    ? 'https://explorer.stacks.co' 
    : 'https://explorer.stacks.co/?chain=testnet';

  if (type === 'tx') {
    return `${baseUrl}/txid/${identifier}`;
  }

  return `${baseUrl}/address/${identifier}`;
}

/**
 * Validates if an address matches the expected network
 */
export function validateAddressForNetwork(address: string, isMainnet: boolean): {
  valid: boolean;
  error?: string;
} {
  if (!address) {
    return { valid: false, error: 'Address is required' };
  }

  const network = getStacksNetworkFromAddress(address);

  if (network === 'invalid') {
    return { valid: false, error: 'Invalid Stacks address format' };
  }

  if (isMainnet && network !== 'mainnet') {
    return { valid: false, error: 'Please use a mainnet address (starts with SP)' };
  }

  if (!isMainnet && network !== 'testnet') {
    return { valid: false, error: 'Please use a testnet address (starts with ST)' };
  }

  return { valid: true };
}
