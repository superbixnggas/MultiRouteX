import type { FeeCompareResponse, PriceEstimate } from '../types';

const SUPABASE_URL = 'https://fhwywghnhfrlndivdigl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZod3l3Z2huaGZybG5kaXZkaWdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NzU4NDksImV4cCI6MjA4MDI1MTg0OX0.lYQf_KplLp8X6d9SYS_WnUxZ95umcpnKZOFjGw_8Fm4';

export async function compareFees(
  chain: string,
  fromToken: string,
  toToken: string,
  toChain?: string,
  amount?: number
): Promise<FeeCompareResponse> {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/fee-compare`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'apikey': SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({
      chain,
      from_token: fromToken,
      to_token: toToken,
      to_chain: toChain,
      amount: amount || 1,
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

// Token prices in USD (approximate values for estimation)
const TOKEN_PRICES: Record<string, number> = {
  // Native tokens
  ETH: 2500,
  WETH: 2500,
  SOL: 180,
  MATIC: 0.85,
  BNB: 600,
  ARB: 1.2,
  
  // Stablecoins
  USDC: 1,
  USDT: 1,
  DAI: 1,
  
  // Others
  BONK: 0.000025,
  JUP: 1.5,
};

export async function estimateOutput(
  fromToken: string,
  toToken: string,
  amount: number
): Promise<PriceEstimate> {
  // Get prices
  const fromPrice = TOKEN_PRICES[fromToken.toUpperCase()] || 1;
  const toPrice = TOKEN_PRICES[toToken.toUpperCase()] || 1;
  
  // Calculate estimated output based on price ratio
  const inputValueUsd = amount * fromPrice;
  const estimatedOutput = inputValueUsd / toPrice;
  const rate = fromPrice / toPrice;
  
  return {
    from_token: fromToken,
    to_token: toToken,
    input_amount: amount,
    estimated_output: estimatedOutput,
    rate: rate,
  };
}

// Get token price
export function getTokenPrice(token: string): number {
  return TOKEN_PRICES[token.toUpperCase()] || 1;
}

export const CHAINS = [
  { id: 'ethereum', name: 'Ethereum', icon: 'ETH' },
  { id: 'arbitrum', name: 'Arbitrum', icon: 'ARB' },
  { id: 'polygon', name: 'Polygon', icon: 'MATIC' },
  { id: 'bsc', name: 'BNB Chain', icon: 'BNB' },
  { id: 'solana', name: 'Solana', icon: 'SOL' },
];

export const TOKENS: Record<string, Array<{ symbol: string; name: string }>> = {
  ethereum: [
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'USDC', name: 'USD Coin' },
    { symbol: 'USDT', name: 'Tether' },
    { symbol: 'WETH', name: 'Wrapped ETH' },
    { symbol: 'DAI', name: 'Dai' },
  ],
  arbitrum: [
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'USDC', name: 'USD Coin' },
    { symbol: 'USDT', name: 'Tether' },
    { symbol: 'ARB', name: 'Arbitrum' },
  ],
  polygon: [
    { symbol: 'MATIC', name: 'Polygon' },
    { symbol: 'USDC', name: 'USD Coin' },
    { symbol: 'USDT', name: 'Tether' },
  ],
  bsc: [
    { symbol: 'BNB', name: 'BNB' },
    { symbol: 'USDC', name: 'USD Coin' },
    { symbol: 'USDT', name: 'Tether' },
  ],
  solana: [
    { symbol: 'SOL', name: 'Solana' },
    { symbol: 'USDC', name: 'USD Coin' },
    { symbol: 'USDT', name: 'Tether' },
    { symbol: 'BONK', name: 'Bonk' },
    { symbol: 'JUP', name: 'Jupiter' },
  ],
};
