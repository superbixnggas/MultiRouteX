export interface FeeResult {
  platform: string;
  fee_usd: number;
  gas_fee: number;
  route_fee: number;
  route: string[];
  platform_url: string;
  success: boolean;
  error?: string;
  estimated_output?: number;
}

export interface ComparisonResult {
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

export interface FeeCompareResponse {
  success: boolean;
  data: ComparisonResult;
  request: {
    chain: string;
    from_token: string;
    to_token: string;
    to_chain?: string;
    amount?: number;
  };
  timestamp: string;
  error?: {
    code: string;
    message: string;
  };
}

export interface ChainOption {
  id: string;
  name: string;
  icon: string;
}

export interface TokenOption {
  symbol: string;
  name: string;
  chains: string[];
}

export interface PriceEstimate {
  from_token: string;
  to_token: string;
  input_amount: number;
  estimated_output: number;
  rate: number;
}
