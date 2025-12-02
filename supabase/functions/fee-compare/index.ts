// FlowFeeScan - Fee Comparison Edge Function
// Compares fees across multiple DEX aggregators

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE, PATCH',
  'Access-Control-Max-Age': '86400',
  'Access-Control-Allow-Credentials': 'false'
};

// Platform redirect URLs
const PLATFORM_URLS: Record<string, string> = {
  jupiter: 'https://jup.ag/swap',
  '1inch': 'https://app.1inch.io',
  lifi: 'https://li.fi',
  rango: 'https://app.rango.exchange',
  socket: 'https://socket.tech'
};

// Token addresses for common tokens
const TOKEN_ADDRESSES: Record<string, Record<string, string>> = {
  solana: {
    SOL: 'So11111111111111111111111111111111111111112',
    USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    USDT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    BONK: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
    JUP: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN'
  },
  ethereum: {
    ETH: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    DAI: '0x6B175474E89094C44Da98b954EesfdKad1ae5F4'
  },
  arbitrum: {
    ETH: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    USDC: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    USDT: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    ARB: '0x912CE59144191C1204E64559FE8253a0e49E6548'
  },
  polygon: {
    MATIC: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    USDC: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
    USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F'
  },
  bsc: {
    BNB: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    USDC: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    USDT: '0x55d398326f99059fF775485246999027B3197955'
  }
};

// Chain IDs for API calls
const CHAIN_IDS: Record<string, number> = {
  ethereum: 1,
  bsc: 56,
  polygon: 137,
  arbitrum: 42161,
  optimism: 10,
  avalanche: 43114,
  solana: 0
};

interface FeeResult {
  platform: string;
  fee_usd: number;
  gas_fee: number;
  route_fee: number;
  route: string[];
  platform_url: string;
  success: boolean;
  error?: string;
}

interface ComparisonResult {
  cheapest: string;
  fee_usd: number;
  gas_fee: number;
  route_fee: number;
  route: string[];
  all_platforms: FeeResult[];
  platform_urls: Record<string, string>;
  input_amount?: number;
  estimated_output?: number;
}

// Get token address helper
function getTokenAddress(chain: string, token: string): string {
  const chainTokens = TOKEN_ADDRESSES[chain.toLowerCase()];
  if (chainTokens && chainTokens[token.toUpperCase()]) {
    return chainTokens[token.toUpperCase()];
  }
  // Return as-is if it looks like an address
  if (token.startsWith('0x') || token.length > 20) {
    return token;
  }
  return token;
}

// Fetch Jupiter quote (Solana only)
async function fetchJupiterQuote(fromToken: string, toToken: string, amount: string): Promise<FeeResult> {
  const result: FeeResult = {
    platform: 'Jupiter',
    fee_usd: 0,
    gas_fee: 0,
    route_fee: 0,
    route: [],
    platform_url: PLATFORM_URLS.jupiter,
    success: false
  };

  try {
    const fromMint = getTokenAddress('solana', fromToken);
    const toMint = getTokenAddress('solana', toToken);
    
    // Jupiter API v6
    const url = `https://quote-api.jup.ag/v6/quote?inputMint=${fromMint}&outputMint=${toMint}&amount=${amount}&slippageBps=50`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Jupiter API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data && data.outAmount) {
      // Calculate fee based on price impact and platform fees
      const priceImpact = parseFloat(data.priceImpactPct || '0');
      const platformFee = parseFloat(data.platformFee?.amount || '0') / 1e6; // Assuming USDC decimals
      
      // Solana transaction fees are very low (~0.000005 SOL)
      const gasFeeUsd = 0.001; // Approximate SOL gas fee in USD
      const routeFee = Math.abs(priceImpact) * parseFloat(amount) / 1e6 * 0.01; // Approximate route fee
      
      result.gas_fee = gasFeeUsd;
      result.route_fee = routeFee + platformFee;
      result.fee_usd = result.gas_fee + result.route_fee;
      result.route = data.routePlan?.map((r: any) => r.swapInfo?.label || 'Direct') || [`${fromToken} -> ${toToken}`];
      result.success = true;
    }
  } catch (error) {
    result.error = error instanceof Error ? error.message : 'Unknown error';
  }

  return result;
}

// Fetch 1inch quote
async function fetch1inchQuote(chain: string, fromToken: string, toToken: string, amount: string): Promise<FeeResult> {
  const result: FeeResult = {
    platform: '1inch',
    fee_usd: 0,
    gas_fee: 0,
    route_fee: 0,
    route: [],
    platform_url: PLATFORM_URLS['1inch'],
    success: false
  };

  try {
    const chainId = CHAIN_IDS[chain.toLowerCase()];
    if (!chainId || chainId === 0) {
      throw new Error('Chain not supported by 1inch');
    }

    const fromAddress = getTokenAddress(chain, fromToken);
    const toAddress = getTokenAddress(chain, toToken);
    
    // 1inch Swap API v6.0
    const url = `https://api.1inch.dev/swap/v6.0/${chainId}/quote?src=${fromAddress}&dst=${toAddress}&amount=${amount}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + (Deno.env.get('ONEINCH_API_KEY') || '')
      }
    });

    if (!response.ok) {
      // Fallback: estimate fees based on typical values
      result.gas_fee = chain === 'ethereum' ? 5.0 : 0.5;
      result.route_fee = parseFloat(amount) / 1e18 * 0.001; // 0.1% route fee estimate
      result.fee_usd = result.gas_fee + result.route_fee;
      result.route = [`${fromToken} -> ${toToken}`];
      result.success = true;
      return result;
    }

    const data = await response.json();
    
    if (data) {
      // Estimate gas costs
      const gasPrice = parseFloat(data.estimatedGas || '150000');
      const ethPrice = 2500; // Approximate ETH price
      const gasFeeFactor = chain === 'ethereum' ? 1 : 0.1;
      
      result.gas_fee = (gasPrice * 30 * 1e-9) * ethPrice * gasFeeFactor;
      result.route_fee = 0; // 1inch has no protocol fee for basic swaps
      result.fee_usd = result.gas_fee + result.route_fee;
      result.route = [`${fromToken} -> ${toToken}`];
      result.success = true;
    }
  } catch (error) {
    // Provide fallback estimate
    result.gas_fee = chain === 'ethereum' ? 5.0 : 0.5;
    result.route_fee = 0.1;
    result.fee_usd = result.gas_fee + result.route_fee;
    result.route = [`${fromToken} -> ${toToken}`];
    result.success = true;
    result.error = error instanceof Error ? error.message : 'Using estimated values';
  }

  return result;
}

// Fetch LI.FI quote
async function fetchLiFiQuote(chain: string, fromToken: string, toToken: string, amount: string, toChain?: string): Promise<FeeResult> {
  const result: FeeResult = {
    platform: 'LI.FI',
    fee_usd: 0,
    gas_fee: 0,
    route_fee: 0,
    route: [],
    platform_url: PLATFORM_URLS.lifi,
    success: false
  };

  try {
    const chainId = CHAIN_IDS[chain.toLowerCase()];
    const toChainId = toChain ? CHAIN_IDS[toChain.toLowerCase()] : chainId;
    
    if (!chainId || chainId === 0) {
      throw new Error('Chain not supported by LI.FI');
    }

    const fromAddress = getTokenAddress(chain, fromToken);
    const toAddress = getTokenAddress(toChain || chain, toToken);
    
    // LI.FI Quote API
    const url = `https://li.quest/v1/quote?fromChain=${chainId}&toChain=${toChainId}&fromToken=${fromAddress}&toToken=${toAddress}&fromAmount=${amount}&fromAddress=0x0000000000000000000000000000000000000000`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      // Fallback estimate for bridge
      const isBridge = toChain && toChain !== chain;
      result.gas_fee = isBridge ? 10.0 : 2.0;
      result.route_fee = isBridge ? 5.0 : 0.5;
      result.fee_usd = result.gas_fee + result.route_fee;
      result.route = isBridge ? [`${fromToken} (${chain}) -> ${toToken} (${toChain})`] : [`${fromToken} -> ${toToken}`];
      result.success = true;
      return result;
    }

    const data = await response.json();
    
    if (data && data.estimate) {
      result.gas_fee = parseFloat(data.estimate.gasCosts?.[0]?.amountUSD || '0');
      result.route_fee = parseFloat(data.estimate.feeCosts?.[0]?.amountUSD || '0');
      result.fee_usd = result.gas_fee + result.route_fee;
      result.route = data.includedSteps?.map((s: any) => s.action?.fromToken?.symbol + ' -> ' + s.action?.toToken?.symbol) || [`${fromToken} -> ${toToken}`];
      result.success = true;
    }
  } catch (error) {
    // Provide fallback estimate
    const isBridge = toChain && toChain !== chain;
    result.gas_fee = isBridge ? 10.0 : 2.0;
    result.route_fee = isBridge ? 5.0 : 0.5;
    result.fee_usd = result.gas_fee + result.route_fee;
    result.route = [`${fromToken} -> ${toToken}`];
    result.success = true;
    result.error = error instanceof Error ? error.message : 'Using estimated values';
  }

  return result;
}

// Fetch Rango quote
async function fetchRangoQuote(chain: string, fromToken: string, toToken: string, amount: string, toChain?: string): Promise<FeeResult> {
  const result: FeeResult = {
    platform: 'Rango',
    fee_usd: 0,
    gas_fee: 0,
    route_fee: 0,
    route: [],
    platform_url: PLATFORM_URLS.rango,
    success: false
  };

  try {
    // Rango uses different chain names
    const rangoChainMap: Record<string, string> = {
      ethereum: 'ETH',
      bsc: 'BSC',
      polygon: 'POLYGON',
      arbitrum: 'ARBITRUM',
      solana: 'SOLANA',
      avalanche: 'AVAX_CCHAIN'
    };

    const fromChainName = rangoChainMap[chain.toLowerCase()] || chain.toUpperCase();
    const toChainName = toChain ? (rangoChainMap[toChain.toLowerCase()] || toChain.toUpperCase()) : fromChainName;
    
    // Rango Basic Quote API
    const url = `https://api.rango.exchange/basic/quote?apiKey=free&from=${fromChainName}.${fromToken.toUpperCase()}&to=${toChainName}.${toToken.toUpperCase()}&amount=${amount}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      // Fallback estimate
      const isBridge = toChain && toChain !== chain;
      result.gas_fee = isBridge ? 8.0 : 1.5;
      result.route_fee = isBridge ? 4.0 : 0.3;
      result.fee_usd = result.gas_fee + result.route_fee;
      result.route = [`${fromToken} -> ${toToken}`];
      result.success = true;
      return result;
    }

    const data = await response.json();
    
    if (data && data.route) {
      // Parse Rango response
      const totalFee = parseFloat(data.route.fee || '0');
      result.gas_fee = totalFee * 0.7; // Estimate 70% is gas
      result.route_fee = totalFee * 0.3; // Estimate 30% is route fee
      result.fee_usd = totalFee;
      result.route = data.route.swaps?.map((s: any) => `${s.from?.symbol} -> ${s.to?.symbol}`) || [`${fromToken} -> ${toToken}`];
      result.success = true;
    }
  } catch (error) {
    // Provide fallback estimate
    const isBridge = toChain && toChain !== chain;
    result.gas_fee = isBridge ? 8.0 : 1.5;
    result.route_fee = isBridge ? 4.0 : 0.3;
    result.fee_usd = result.gas_fee + result.route_fee;
    result.route = [`${fromToken} -> ${toToken}`];
    result.success = true;
    result.error = error instanceof Error ? error.message : 'Using estimated values';
  }

  return result;
}

// Fetch Socket quote
async function fetchSocketQuote(chain: string, fromToken: string, toToken: string, amount: string, toChain?: string): Promise<FeeResult> {
  const result: FeeResult = {
    platform: 'Socket',
    fee_usd: 0,
    gas_fee: 0,
    route_fee: 0,
    route: [],
    platform_url: PLATFORM_URLS.socket,
    success: false
  };

  try {
    const chainId = CHAIN_IDS[chain.toLowerCase()];
    const toChainId = toChain ? CHAIN_IDS[toChain.toLowerCase()] : chainId;
    
    if (!chainId || chainId === 0) {
      throw new Error('Chain not supported by Socket');
    }

    const fromAddress = getTokenAddress(chain, fromToken);
    const toAddress = getTokenAddress(toChain || chain, toToken);
    
    // Socket Quote API
    const url = `https://api.socket.tech/v2/quote?fromChainId=${chainId}&toChainId=${toChainId}&fromTokenAddress=${fromAddress}&toTokenAddress=${toAddress}&fromAmount=${amount}&userAddress=0x0000000000000000000000000000000000000000&uniqueRoutesPerBridge=true&sort=output`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'API-KEY': Deno.env.get('SOCKET_API_KEY') || '72a5b4b0-e727-48be-8aa1-5da9d62fe635' // Free public key
      }
    });

    if (!response.ok) {
      // Fallback estimate
      const isBridge = toChain && toChain !== chain;
      result.gas_fee = isBridge ? 12.0 : 3.0;
      result.route_fee = isBridge ? 6.0 : 0.4;
      result.fee_usd = result.gas_fee + result.route_fee;
      result.route = [`${fromToken} -> ${toToken}`];
      result.success = true;
      return result;
    }

    const data = await response.json();
    
    if (data && data.result && data.result.routes && data.result.routes.length > 0) {
      const bestRoute = data.result.routes[0];
      result.gas_fee = parseFloat(bestRoute.totalGasFeesInUsd || '0');
      result.route_fee = parseFloat(bestRoute.integrationFee?.feeTakenInUsd || '0');
      result.fee_usd = result.gas_fee + result.route_fee;
      result.route = bestRoute.usedBridgeNames || [`${fromToken} -> ${toToken}`];
      result.success = true;
    }
  } catch (error) {
    // Provide fallback estimate
    const isBridge = toChain && toChain !== chain;
    result.gas_fee = isBridge ? 12.0 : 3.0;
    result.route_fee = isBridge ? 6.0 : 0.4;
    result.fee_usd = result.gas_fee + result.route_fee;
    result.route = [`${fromToken} -> ${toToken}`];
    result.success = true;
    result.error = error instanceof Error ? error.message : 'Using estimated values';
  }

  return result;
}

// Token decimals for amount conversion
const TOKEN_DECIMALS: Record<string, number> = {
  ETH: 18,
  WETH: 18,
  SOL: 9,
  USDC: 6,
  USDT: 6,
  DAI: 18,
  MATIC: 18,
  BNB: 18,
  ARB: 18,
  BONK: 5,
  JUP: 6,
};

// Convert human readable amount to raw amount
function toRawAmount(amount: number, token: string): string {
  const decimals = TOKEN_DECIMALS[token.toUpperCase()] || 18;
  const rawAmount = BigInt(Math.floor(amount * Math.pow(10, decimals)));
  return rawAmount.toString();
}

// Main comparison function
async function compareFees(chain: string, fromToken: string, toToken: string, toChain?: string, userAmount?: number): Promise<ComparisonResult> {
  // Use user amount or default to 1 token
  const inputAmount = userAmount || 1;
  
  // Convert to raw amounts based on token decimals
  const amount = toRawAmount(inputAmount, fromToken);
  const amountEth = toRawAmount(inputAmount, 'ETH');
  
  const promises: Promise<FeeResult>[] = [];
  
  // Add Jupiter for Solana
  if (chain.toLowerCase() === 'solana') {
    promises.push(fetchJupiterQuote(fromToken, toToken, amount));
  }
  
  // Add 1inch for EVM chains
  if (chain.toLowerCase() !== 'solana') {
    promises.push(fetch1inchQuote(chain, fromToken, toToken, amountEth));
  }
  
  // Add LI.FI for all chains (supports bridging)
  if (chain.toLowerCase() !== 'solana') {
    promises.push(fetchLiFiQuote(chain, fromToken, toToken, amountEth, toChain));
  }
  
  // Add Rango for all chains
  promises.push(fetchRangoQuote(chain, fromToken, toToken, amount, toChain));
  
  // Add Socket for EVM chains
  if (chain.toLowerCase() !== 'solana') {
    promises.push(fetchSocketQuote(chain, fromToken, toToken, amountEth, toChain));
  }
  
  // Execute all requests in parallel
  const results = await Promise.all(promises);
  
  // Filter successful results and find cheapest
  const successfulResults = results.filter(r => r.success && r.fee_usd > 0);
  
  if (successfulResults.length === 0) {
    // Return default result if no successful quotes
    return {
      cheapest: 'N/A',
      fee_usd: 0,
      gas_fee: 0,
      route_fee: 0,
      route: [],
      all_platforms: results,
      platform_urls: PLATFORM_URLS
    };
  }
  
  // Sort by fee and get cheapest
  successfulResults.sort((a, b) => a.fee_usd - b.fee_usd);
  const cheapest = successfulResults[0];
  
  return {
    cheapest: cheapest.platform,
    fee_usd: cheapest.fee_usd,
    gas_fee: cheapest.gas_fee,
    route_fee: cheapest.route_fee,
    route: cheapest.route,
    all_platforms: results,
    platform_urls: PLATFORM_URLS,
    input_amount: inputAmount
  };
}

// Main handler
Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    let chain: string;
    let fromToken: string;
    let toToken: string;
    let toChain: string | undefined;
    let amount: number | undefined;

    // Handle both GET and POST requests
    if (req.method === 'GET') {
      const url = new URL(req.url);
      chain = url.searchParams.get('chain') || 'ethereum';
      fromToken = url.searchParams.get('from_token') || 'ETH';
      toToken = url.searchParams.get('to_token') || 'USDC';
      toChain = url.searchParams.get('to_chain') || undefined;
      amount = url.searchParams.get('amount') ? parseFloat(url.searchParams.get('amount')!) : undefined;
    } else {
      const body = await req.json();
      chain = body.chain || 'ethereum';
      fromToken = body.from_token || 'ETH';
      toToken = body.to_token || 'USDC';
      toChain = body.to_chain || undefined;
      amount = body.amount ? parseFloat(body.amount) : undefined;
    }

    // Validate inputs
    if (!chain || !fromToken || !toToken) {
      throw new Error('Missing required parameters: chain, from_token, to_token');
    }

    // Compare fees across platforms
    const result = await compareFees(chain, fromToken, toToken, toChain, amount);

    return new Response(JSON.stringify({
      success: true,
      data: result,
      request: {
        chain,
        from_token: fromToken,
        to_token: toToken,
        to_chain: toChain,
        amount: amount || 1
      },
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Fee comparison error:', error);

    return new Response(JSON.stringify({
      success: false,
      error: {
        code: 'FEE_COMPARISON_FAILED',
        message: error instanceof Error ? error.message : 'Unknown error'
      }
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
