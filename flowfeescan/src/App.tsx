import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import FeeComparisonPanel from './components/FeeComparisonPanel';
import ComparisonTable from './components/ComparisonTable';
import EducationCards from './components/EducationCards';
import Footer from './components/Footer';
import Resources from './pages/Resources';
import { compareFees } from './lib/api';
import type { ComparisonResult } from './types';
import './App.css';

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [request, setRequest] = useState<{
    chain: string;
    from_token: string;
    to_token: string;
    to_chain?: string;
    amount?: number;
  } | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = useCallback(async (
    chain: string,
    fromToken: string,
    toToken: string,
    amount: number,
    toChain?: string
  ) => {
    setIsLoading(true);
    setError(null);
    setRequest({ 
      chain, 
      from_token: fromToken, 
      to_token: toToken, 
      to_chain: toChain,
      amount: amount 
    });

    try {
      const response = await compareFees(chain, fromToken, toToken, toChain, amount);
      
      if (response.success && response.data) {
        setResult({
          ...response.data,
          input_amount: amount,
        });
        // Scroll to results
        setTimeout(() => {
          document.getElementById('comparison')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        setError(response.error?.message || 'Gagal mengambil data fee');
      }
    } catch (err) {
      console.error('Comparison error:', err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <Hero onCompare={handleCompare} isLoading={isLoading} />
      
      {error && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-center">
            {error}
          </div>
        </div>
      )}
      
      <FeeComparisonPanel 
        result={result} 
        isLoading={isLoading}
        request={request}
      />
      
      {result && result.all_platforms && result.all_platforms.length > 0 && (
        <ComparisonTable 
          platforms={result.all_platforms} 
          cheapest={result.cheapest}
        />
      )}
      
      <EducationCards />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
