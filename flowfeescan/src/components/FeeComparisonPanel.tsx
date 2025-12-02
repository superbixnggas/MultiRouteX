import { ExternalLink, TrendingDown, Fuel, Route, Award, Loader2, Coins, ArrowRight } from 'lucide-react';
import type { ComparisonResult } from '../types';
import { estimateOutput } from '../lib/api';
import { useState, useEffect } from 'react';

interface FeeComparisonPanelProps {
  result: ComparisonResult | null;
  isLoading: boolean;
  request?: {
    chain: string;
    from_token: string;
    to_token: string;
    to_chain?: string;
    amount?: number;
  };
}

export default function FeeComparisonPanel({ result, isLoading, request }: FeeComparisonPanelProps) {
  const [estimatedOutput, setEstimatedOutput] = useState<number | null>(null);

  useEffect(() => {
    async function getEstimate() {
      if (request && request.amount && request.from_token !== request.to_token) {
        const estimate = await estimateOutput(request.from_token, request.to_token, request.amount);
        setEstimatedOutput(estimate.estimated_output);
      }
    }
    getEstimate();
  }, [request]);

  const formatNumber = (value: number): string => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(2) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(2) + 'K';
    } else if (value < 0.0001 && value > 0) {
      return value.toExponential(4);
    } else if (value < 1) {
      return value.toFixed(6);
    }
    return value.toFixed(4);
  };

  if (isLoading) {
    return (
      <section id="comparison" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-glass p-8 md:p-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-12 h-12 text-secondary-400 animate-spin" />
              <p className="text-dark-300 text-lg">Menganalisis fee dari semua platform...</p>
              <p className="text-dark-500 text-sm">Memproses data dari Jupiter, 1inch, LI.FI, Rango, Socket</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!result) {
    return null;
  }

  const cheapestPlatform = result.all_platforms.find(p => p.platform === result.cheapest);
  const platformUrl = cheapestPlatform?.platform_url || result.platform_urls[result.cheapest.toLowerCase()];

  return (
    <section id="comparison" className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Result Card */}
        <div className="card-glass glow-border p-8 md:p-12 animate-in">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Platform Termurah</h2>
                <p className="text-dark-400">Rekomendasi terbaik untuk swap Anda</p>
              </div>
            </div>
            <span className="hidden md:inline-flex items-center gap-1 px-3 py-1 bg-accent-500/20 text-accent-400 rounded-full text-sm font-medium">
              <TrendingDown className="w-4 h-4" />
              Hemat Biaya
            </span>
          </div>

          {/* Request Info with Amount */}
          {request && (
            <div className="bg-dark-900/50 rounded-lg p-4 mb-8">
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-dark-400">Chain:</span>
                  <span className="text-white font-medium capitalize">{request.chain}</span>
                </div>
                
                {/* Amount & Swap Info */}
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-secondary-400" />
                  <span className="text-white font-medium">
                    {request.amount} {request.from_token}
                  </span>
                  <ArrowRight className="w-4 h-4 text-secondary-400" />
                  {estimatedOutput !== null ? (
                    <span className="text-accent-400 font-medium">
                      ~{formatNumber(estimatedOutput)} {request.to_token}
                    </span>
                  ) : (
                    <span className="text-white font-medium">{request.to_token}</span>
                  )}
                </div>

                {request.to_chain && (
                  <div className="flex items-center gap-2">
                    <span className="text-dark-400">Chain Tujuan:</span>
                    <span className="text-white font-medium capitalize">{request.to_chain}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Main Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* Input Amount */}
            {request?.amount && (
              <div className="bg-dark-900/50 rounded-xl p-4 text-center">
                <p className="text-dark-400 text-xs mb-1">Input</p>
                <p className="text-xl font-bold text-white">
                  {request.amount} <span className="text-secondary-400 text-base">{request.from_token}</span>
                </p>
              </div>
            )}

            {/* Cheapest Platform */}
            <div className="bg-dark-900/50 rounded-xl p-4 text-center">
              <p className="text-dark-400 text-xs mb-1">Platform</p>
              <p className="text-xl font-bold gradient-text">{result.cheapest}</p>
            </div>

            {/* Total Fee */}
            <div className="bg-dark-900/50 rounded-xl p-4 text-center">
              <p className="text-dark-400 text-xs mb-1">Total Fee</p>
              <p className="text-xl font-bold text-accent-400">
                ${result.fee_usd.toFixed(4)}
              </p>
            </div>

            {/* Estimated Output */}
            {estimatedOutput !== null && (
              <div className="bg-dark-900/50 rounded-xl p-4 text-center">
                <p className="text-dark-400 text-xs mb-1">Estimasi Output</p>
                <p className="text-xl font-bold text-white">
                  {formatNumber(estimatedOutput)} <span className="text-secondary-400 text-base">{request?.to_token}</span>
                </p>
              </div>
            )}
          </div>

          {/* Route Info */}
          <div className="bg-dark-900/50 rounded-lg p-4 mb-6">
            <p className="text-dark-400 text-sm mb-2">Route</p>
            <p className="text-white font-medium">
              {result.route.join(' → ') || 'Direct'}
            </p>
          </div>

          {/* Fee Breakdown */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 bg-dark-900/50 rounded-lg p-4">
              <Fuel className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-dark-400 text-sm">Gas Fee</p>
                <p className="text-white font-semibold">${result.gas_fee.toFixed(4)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-dark-900/50 rounded-lg p-4">
              <Route className="w-5 h-5 text-secondary-400" />
              <div>
                <p className="text-dark-400 text-sm">Route Fee</p>
                <p className="text-white font-semibold">${result.route_fee.toFixed(4)}</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href={platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-lg"
          >
            <span>Buka {result.cheapest}</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
