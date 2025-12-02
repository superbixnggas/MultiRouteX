import { Search, ArrowRightLeft, Zap, Shield, ArrowRight, Loader2 } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { CHAINS, TOKENS, estimateOutput } from '../lib/api';
import type { PriceEstimate } from '../types';

interface HeroProps {
  onCompare: (chain: string, fromToken: string, toToken: string, amount: number, toChain?: string) => void;
  isLoading: boolean;
}

export default function Hero({ onCompare, isLoading }: HeroProps) {
  const [chain, setChain] = useState('ethereum');
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDC');
  const [toChain, setToChain] = useState('');
  const [isBridge, setIsBridge] = useState(false);
  const [amount, setAmount] = useState<string>('1');
  const [estimate, setEstimate] = useState<PriceEstimate | null>(null);
  const [isEstimating, setIsEstimating] = useState(false);
  const [amountError, setAmountError] = useState<string | null>(null);

  const availableTokens = TOKENS[chain] || [];

  // Validate amount
  const validateAmount = (value: string): boolean => {
    const num = parseFloat(value);
    if (isNaN(num) || num < 0.0001) {
      setAmountError('Minimal 0.0001 token');
      return false;
    }
    setAmountError(null);
    return true;
  };

  // Calculate estimate with debounce
  const calculateEstimate = useCallback(async () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 0.0001 || fromToken === toToken) {
      setEstimate(null);
      return;
    }

    setIsEstimating(true);
    try {
      const result = await estimateOutput(fromToken, toToken, numAmount);
      setEstimate(result);
    } catch (error) {
      console.error('Estimation error:', error);
      setEstimate(null);
    } finally {
      setIsEstimating(false);
    }
  }, [amount, fromToken, toToken]);

  // Debounced estimate calculation
  useEffect(() => {
    const timer = setTimeout(() => {
      calculateEstimate();
    }, 300);

    return () => clearTimeout(timer);
  }, [calculateEstimate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!validateAmount(amount)) return;
    onCompare(chain, fromToken, toToken, numAmount, isBridge && toChain ? toChain : undefined);
  };

  const handleChainChange = (newChain: string) => {
    setChain(newChain);
    const tokens = TOKENS[newChain] || [];
    if (tokens.length > 0) {
      setFromToken(tokens[0].symbol);
      setToToken(tokens.length > 1 ? tokens[1].symbol : tokens[0].symbol);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty or valid decimal numbers
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      if (value !== '') {
        validateAmount(value);
      } else {
        setAmountError(null);
      }
    }
  };

  const formatEstimate = (value: number): string => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(2) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(2) + 'K';
    } else if (value < 0.0001) {
      return value.toExponential(4);
    } else if (value < 1) {
      return value.toFixed(6);
    }
    return value.toFixed(4);
  };

  return (
    <section id="hero" className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-800 border border-dark-600 mb-6">
            <Zap className="w-4 h-4 text-secondary-400" />
            <span className="text-sm text-dark-300">Analisis Fee Real-time</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Temukan Fee</span>
            <br />
            <span className="gradient-text">Swap & Bridge Termurah</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-dark-400 max-w-2xl mx-auto mb-8">
            Bandingkan fee dari Jupiter, 1inch, LI.FI, Rango, dan Socket dalam satu klik.
            Hemat waktu dan biaya dengan rekomendasi terbaik.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-dark-300">
              <Shield className="w-5 h-5 text-accent-500" />
              <span>5+ Platform DEX</span>
            </div>
            <div className="flex items-center gap-2 text-dark-300">
              <ArrowRightLeft className="w-5 h-5 text-secondary-400" />
              <span>Swap & Bridge</span>
            </div>
            <div className="flex items-center gap-2 text-dark-300">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>Hasil Instan</span>
            </div>
          </div>
        </div>

        {/* Comparison Form */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="card-glass p-6 md:p-8">
            {/* Swap/Bridge Toggle */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-dark-900 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setIsBridge(false)}
                  className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                    !isBridge
                      ? 'bg-secondary-500 text-white shadow-glow'
                      : 'text-dark-400 hover:text-white'
                  }`}
                >
                  Swap
                </button>
                <button
                  type="button"
                  onClick={() => setIsBridge(true)}
                  className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                    isBridge
                      ? 'bg-secondary-500 text-white shadow-glow'
                      : 'text-dark-400 hover:text-white'
                  }`}
                >
                  Bridge
                </button>
              </div>
            </div>

            {/* First Row: Chain and Tokens */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Source Chain */}
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Chain Asal
                </label>
                <select
                  value={chain}
                  onChange={(e) => handleChainChange(e.target.value)}
                  className="select-field"
                >
                  {CHAINS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* From Token */}
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Token Asal
                </label>
                <select
                  value={fromToken}
                  onChange={(e) => setFromToken(e.target.value)}
                  className="select-field"
                >
                  {availableTokens.map((t) => (
                    <option key={t.symbol} value={t.symbol}>
                      {t.symbol} - {t.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* To Token */}
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Token Tujuan
                </label>
                <select
                  value={toToken}
                  onChange={(e) => setToToken(e.target.value)}
                  className="select-field"
                >
                  {availableTokens.map((t) => (
                    <option key={t.symbol} value={t.symbol}>
                      {t.symbol} - {t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Second Row: Amount and Destination Chain (for Bridge) */}
            <div className={`grid grid-cols-1 ${isBridge ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-4 mb-4`}>
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Jumlah Token
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="0.0001"
                    className={`input-field pr-16 ${amountError ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : ''}`}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 font-medium">
                    {fromToken}
                  </span>
                </div>
                
                {/* Error message */}
                {amountError && (
                  <p className="mt-1 text-xs text-red-400">{amountError}</p>
                )}
                
                {/* Estimation Display */}
                {!amountError && parseFloat(amount) >= 0.0001 && fromToken !== toToken && (
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    {isEstimating ? (
                      <div className="flex items-center gap-2 text-dark-400">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Menghitung estimasi...</span>
                      </div>
                    ) : estimate ? (
                      <div className="flex items-center gap-2 text-dark-300">
                        <span className="text-dark-400">Estimasi:</span>
                        <span className="text-white font-medium">{amount} {fromToken}</span>
                        <ArrowRight className="w-3 h-3 text-secondary-400" />
                        <span className="text-accent-400 font-medium">
                          {formatEstimate(estimate.estimated_output)} {toToken}
                        </span>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

              {/* Destination Chain (for Bridge) */}
              {isBridge && (
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Chain Tujuan
                  </label>
                  <select
                    value={toChain}
                    onChange={(e) => setToChain(e.target.value)}
                    className="select-field"
                  >
                    <option value="">Pilih Chain</option>
                    {CHAINS.filter((c) => c.id !== chain).map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !!amountError || (isBridge && !toChain)}
              className="btn-primary w-full flex items-center justify-center gap-2 py-4"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              <span>
                {isLoading 
                  ? 'Mencari...' 
                  : isBridge 
                    ? 'Bandingkan Fee Bridge' 
                    : 'Bandingkan Fee'
                }
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
