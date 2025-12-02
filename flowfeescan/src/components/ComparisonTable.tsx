import { ExternalLink, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import type { FeeResult } from '../types';

interface ComparisonTableProps {
  platforms: FeeResult[];
  cheapest: string;
}

export default function ComparisonTable({ platforms, cheapest }: ComparisonTableProps) {
  // Sort by fee (cheapest first)
  const sortedPlatforms = [...platforms].sort((a, b) => {
    if (!a.success) return 1;
    if (!b.success) return -1;
    return a.fee_usd - b.fee_usd;
  });

  const getPlatformLogo = (platform: string): string => {
    const logos: Record<string, string> = {
      'Jupiter': 'JUP',
      '1inch': '1"',
      'LI.FI': 'LFI',
      'Rango': 'RNG',
      'Socket': 'SKT',
    };
    return logos[platform] || platform.substring(0, 3).toUpperCase();
  };

  const getPlatformColor = (platform: string): string => {
    const colors: Record<string, string> = {
      'Jupiter': 'from-purple-500 to-purple-600',
      '1inch': 'from-red-500 to-red-600',
      'LI.FI': 'from-blue-500 to-blue-600',
      'Rango': 'from-green-500 to-green-600',
      'Socket': 'from-orange-500 to-orange-600',
    };
    return colors[platform] || 'from-gray-500 to-gray-600';
  };

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Perbandingan Semua Platform
          </h2>
          <p className="text-dark-400">
            Lihat detail fee dari setiap aggregator
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block card-glass overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-dark-900/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-300">Platform</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-300">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-dark-300">Gas Fee</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-dark-300">Route Fee</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-dark-300">Total Fee</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-dark-300">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700/50">
              {sortedPlatforms.map((platform, index) => (
                <tr
                  key={platform.platform}
                  className={`transition-colors hover:bg-dark-700/30 ${
                    platform.platform === cheapest ? 'bg-accent-500/10' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getPlatformColor(platform.platform)} flex items-center justify-center text-white font-bold text-xs`}>
                        {getPlatformLogo(platform.platform)}
                      </div>
                      <div>
                        <p className="font-medium text-white flex items-center gap-2">
                          {platform.platform}
                          {platform.platform === cheapest && (
                            <span className="px-2 py-0.5 bg-accent-500/20 text-accent-400 text-xs rounded-full">
                              Termurah
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-dark-400 truncate max-w-[150px]">
                          {platform.route.join(' → ') || 'Direct'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {platform.success ? (
                      <span className="flex items-center gap-1 text-accent-400 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Tersedia
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-400 text-sm">
                        <XCircle className="w-4 h-4" />
                        Error
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-dark-200">${platform.gas_fee.toFixed(4)}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-dark-200">${platform.route_fee.toFixed(4)}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`font-semibold ${platform.platform === cheapest ? 'text-accent-400' : 'text-white'}`}>
                      ${platform.fee_usd.toFixed(4)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <a
                      href={platform.platform_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-secondary-500/20 text-secondary-400 rounded-lg hover:bg-secondary-500/30 transition-colors text-sm font-medium"
                    >
                      Buka
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {sortedPlatforms.map((platform, index) => (
            <div
              key={platform.platform}
              className={`card-glass p-4 ${
                platform.platform === cheapest ? 'glow-border' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getPlatformColor(platform.platform)} flex items-center justify-center text-white font-bold text-xs`}>
                    {getPlatformLogo(platform.platform)}
                  </div>
                  <div>
                    <p className="font-medium text-white flex items-center gap-2">
                      {platform.platform}
                      {platform.platform === cheapest && (
                        <span className="px-2 py-0.5 bg-accent-500/20 text-accent-400 text-xs rounded-full">
                          Termurah
                        </span>
                      )}
                    </p>
                    {platform.success ? (
                      <span className="flex items-center gap-1 text-accent-400 text-xs">
                        <CheckCircle className="w-3 h-3" />
                        Tersedia
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-400 text-xs">
                        <XCircle className="w-3 h-3" />
                        Error
                      </span>
                    )}
                  </div>
                </div>
                <a
                  href={platform.platform_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary-500/20 text-secondary-400 rounded-lg hover:bg-secondary-500/30 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-dark-900/50 rounded-lg p-2">
                  <p className="text-xs text-dark-400">Gas Fee</p>
                  <p className="text-sm font-medium text-white">${platform.gas_fee.toFixed(4)}</p>
                </div>
                <div className="bg-dark-900/50 rounded-lg p-2">
                  <p className="text-xs text-dark-400">Route Fee</p>
                  <p className="text-sm font-medium text-white">${platform.route_fee.toFixed(4)}</p>
                </div>
                <div className="bg-dark-900/50 rounded-lg p-2">
                  <p className="text-xs text-dark-400">Total</p>
                  <p className={`text-sm font-semibold ${platform.platform === cheapest ? 'text-accent-400' : 'text-white'}`}>
                    ${platform.fee_usd.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
