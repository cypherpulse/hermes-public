/**
 * Mainnet Chain Configuration
 * 
 * This configuration supports CCTP (Cross-Chain Transfer Protocol) bridging
 * between multiple mainnet chains and Stacks via xReserve.
 */

export type MainnetChainId = 
  | 'Ethereum'
  | 'Base'
  | 'Arbitrum'
  | 'Avalanche'
  | 'Polygon'
  | 'Optimism'
  | 'Linea'
  | 'Unichain'
  | 'World_Chain'
  | 'Stacks';

export interface MainnetChainConfig {
  id: MainnetChainId;
  name: string;
  displayName: string;
  chainId: number;
  icon: string;
  rpcUrl: string;
  blockExplorer: string;
  usdcAddress: `0x${string}` | string;
  isEVM: boolean;
  color: string;
  cctpDomain?: number;
}

// Mainnet USDC and chain configurations
export const MAINNET_CHAINS: Record<MainnetChainId, MainnetChainConfig> = {
  Ethereum: {
    id: 'Ethereum',
    name: 'Ethereum Mainnet',
    displayName: 'Ethereum',
    chainId: 1,
    icon: 'https://res.cloudinary.com/dg5rr4ntw/image/upload/v1768900941/download_6_b0zu0z.png',
    rpcUrl: 'https://ethereum.publicnode.com',
    blockExplorer: 'https://etherscan.io',
    usdcAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    isEVM: true,
    color: '#627EEA',
    cctpDomain: 0,
  },
  Base: {
    id: 'Base',
    name: 'Base',
    displayName: 'Base',
    chainId: 8453,
    icon: 'https://res.cloudinary.com/dg5rr4ntw/image/upload/v1768900372/download_hfl3h3.png',
    rpcUrl: 'https://mainnet.base.org',
    blockExplorer: 'https://basescan.org',
    usdcAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    isEVM: true,
    color: '#0052FF',
    cctpDomain: 6,
  },
  Arbitrum: {
    id: 'Arbitrum',
    name: 'Arbitrum One',
    displayName: 'Arbitrum',
    chainId: 42161,
    icon: 'https://res.cloudinary.com/dg5rr4ntw/image/upload/v1768900371/download_1_a5572s.png',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorer: 'https://arbiscan.io',
    usdcAddress: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    isEVM: true,
    color: '#28A0F0',
    cctpDomain: 3,
  },
  Avalanche: {
    id: 'Avalanche',
    name: 'Avalanche C-Chain',
    displayName: 'Avalanche',
    chainId: 43114,
    icon: 'https://res.cloudinary.com/dg5rr4ntw/image/upload/v1768900372/avalanche-avax-logo_nkju6o.png',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    blockExplorer: 'https://snowtrace.io',
    usdcAddress: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
    isEVM: true,
    color: '#E84142',
    cctpDomain: 1,
  },
  Polygon: {
    id: 'Polygon',
    name: 'Polygon PoS',
    displayName: 'Polygon',
    chainId: 137,
    icon: 'https://res.cloudinary.com/dg5rr4ntw/image/upload/v1768900372/download_3_pnzwd3.png',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
    usdcAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
    isEVM: true,
    color: '#8247E5',
    cctpDomain: 7,
  },
  Optimism: {
    id: 'Optimism',
    name: 'OP Mainnet',
    displayName: 'Optimism',
    chainId: 10,
    icon: 'https://res.cloudinary.com/dg5rr4ntw/image/upload/v1768900371/download_2_sv0thd.png',
    rpcUrl: 'https://mainnet.optimism.io',
    blockExplorer: 'https://optimistic.etherscan.io',
    usdcAddress: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
    isEVM: true,
    color: '#FF0420',
    cctpDomain: 2,
  },
  Linea: {
    id: 'Linea',
    name: 'Linea Mainnet',
    displayName: 'Linea',
    chainId: 59144,
    icon: 'https://res.cloudinary.com/dg5rr4ntw/image/upload/v1768900372/download_5_fwekae.png',
    rpcUrl: 'https://rpc.linea.build',
    blockExplorer: 'https://lineascan.build',
    usdcAddress: '0x176211869cA2b568f2A7D4EE941E073a821EE1ff',
    isEVM: true,
    color: '#61DFFF',
  },
  Unichain: {
    id: 'Unichain',
    name: 'Unichain',
    displayName: 'Unichain',
    chainId: 130,
    icon: 'https://res.cloudinary.com/dg5rr4ntw/image/upload/v1768900372/download_ppknwm.jpg',
    rpcUrl: 'https://mainnet.unichain.org',
    blockExplorer: 'https://uniscan.xyz',
    usdcAddress: '0x078D782b760474a361dDA0AF3839290b0EF57AD6',
    isEVM: true,
    color: '#FF007A',
  },
  World_Chain: {
    id: 'World_Chain',
    name: 'World Chain',
    displayName: 'World Chain',
    chainId: 480,
    icon: 'https://res.cloudinary.com/dg5rr4ntw/image/upload/v1769169925/worldcoin_mvuyxj.jpg',
    rpcUrl: 'https://worldchain-mainnet.g.alchemy.com/public',
    blockExplorer: 'https://worldchain.explorer.alchemy.com',
    usdcAddress: '0x79A02482A880bCe3F13E09da970dC34dB4cD24D1',
    isEVM: true,
    color: '#000000',
  },
  Stacks: {
    id: 'Stacks',
    name: 'Stacks Mainnet',
    displayName: 'Stacks',
    chainId: 1, // Stacks mainnet
    icon: 'https://res.cloudinary.com/dg5rr4ntw/image/upload/v1769170000/stacks_logo_ddkhwc.png',
    rpcUrl: 'https://stacks-node-api.mainnet.stacks.co',
    blockExplorer: 'https://explorer.stacks.co',
    usdcAddress: 'SP120SBRBQJ00MCWS7TM5R8WJNTTKD5K0HFRC2CNE.usdcx',
    isEVM: false,
    color: '#5546FF',
  },
} as const;

// xReserve Mainnet Configuration
export const XRESERVE_MAINNET_CONFIG = {
  contractAddress: '0x8888888199b2Df864bf678259607d6D5EBb4e3Ce' as `0x${string}`,
  usdcxToken: 'SP120SBRBQJ00MCWS7TM5R8WJNTTKD5K0HFRC2CNE.usdcx',
  usdcxProtocol: 'SP120SBRBQJ00MCWS7TM5R8WJNTTKD5K0HFRC2CNE.usdcx-v1',
  stacksDomain: 10003,
} as const;

// Helper functions
export const getMainnetEVMChains = (): MainnetChainConfig[] => {
  return Object.values(MAINNET_CHAINS).filter(chain => chain.isEVM);
};

export const getMainnetChainById = (id: MainnetChainId): MainnetChainConfig | undefined => {
  return MAINNET_CHAINS[id];
};

export const getMainnetChainByChainId = (chainId: number): MainnetChainConfig | undefined => {
  return Object.values(MAINNET_CHAINS).find(chain => chain.chainId === chainId);
};

export const getMainnetSourceChains = (): MainnetChainConfig[] => {
  return Object.values(MAINNET_CHAINS).filter(chain => chain.id !== 'Stacks');
};

export const getMainnetDestinationChains = (): MainnetChainConfig[] => {
  return Object.values(MAINNET_CHAINS);
};

// Bridge step types
export type MainnetBridgeStepType = 'cctp' | 'xreserve';

export interface MainnetBridgeStep {
  type: MainnetBridgeStepType;
  fromChain: MainnetChainId;
  toChain: MainnetChainId;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  txHash?: string;
  explorerUrl?: string;
}

// Wagmi mainnet chain configurations
export const MAINNET_WAGMI_CHAINS = {
  Ethereum: {
    id: 1,
    name: 'Ethereum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: { default: { http: ['https://ethereum.publicnode.com'] } },
    blockExplorers: { default: { name: 'Etherscan', url: 'https://etherscan.io' } },
  },
  Base: {
    id: 8453,
    name: 'Base',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: { default: { http: ['https://mainnet.base.org'] } },
    blockExplorers: { default: { name: 'BaseScan', url: 'https://basescan.org' } },
  },
  Arbitrum: {
    id: 42161,
    name: 'Arbitrum One',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: { default: { http: ['https://arb1.arbitrum.io/rpc'] } },
    blockExplorers: { default: { name: 'Arbiscan', url: 'https://arbiscan.io' } },
  },
  Avalanche: {
    id: 43114,
    name: 'Avalanche',
    nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
    rpcUrls: { default: { http: ['https://api.avax.network/ext/bc/C/rpc'] } },
    blockExplorers: { default: { name: 'Snowtrace', url: 'https://snowtrace.io' } },
  },
  Polygon: {
    id: 137,
    name: 'Polygon',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: { default: { http: ['https://polygon-rpc.com'] } },
    blockExplorers: { default: { name: 'Polygonscan', url: 'https://polygonscan.com' } },
  },
  Optimism: {
    id: 10,
    name: 'OP Mainnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: { default: { http: ['https://mainnet.optimism.io'] } },
    blockExplorers: { default: { name: 'Etherscan', url: 'https://optimistic.etherscan.io' } },
  },
  Linea: {
    id: 59144,
    name: 'Linea',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: { default: { http: ['https://rpc.linea.build'] } },
    blockExplorers: { default: { name: 'Lineascan', url: 'https://lineascan.build' } },
  },
  Unichain: {
    id: 130,
    name: 'Unichain',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: { default: { http: ['https://mainnet.unichain.org'] } },
    blockExplorers: { default: { name: 'Uniscan', url: 'https://uniscan.xyz' } },
  },
  World_Chain: {
    id: 480,
    name: 'World Chain',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: { default: { http: ['https://worldchain-mainnet.g.alchemy.com/public'] } },
    blockExplorers: { default: { name: 'World Chain Explorer', url: 'https://worldchain.explorer.alchemy.com' } },
  },
} as const;

// ERC20 ABI for USDC operations
export const MAINNET_ERC20_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: 'balance', type: 'uint256' }],
  },
  {
    name: 'allowance',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    outputs: [{ name: 'remaining', type: 'uint256' }],
  },
  {
    name: 'approve',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: 'success', type: 'bool' }],
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'decimals', type: 'uint8' }],
  },
  {
    name: 'symbol',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'symbol', type: 'string' }],
  },
] as const;
