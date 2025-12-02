import { Activity, Github, Twitter, MessageCircle, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const platforms = [
    { name: 'Jupiter', url: 'https://jup.ag/swap' },
    { name: '1inch', url: 'https://app.1inch.io' },
    { name: 'LI.FI', url: 'https://li.fi' },
    { name: 'Rango', url: 'https://app.rango.exchange' },
    { name: 'Socket', url: 'https://socket.tech' },
  ];

  return (
    <footer className="bg-dark-900 border-t border-dark-700/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary-500 to-secondary-700 flex items-center justify-center shadow-glow">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-white">Flow</span>
                <span className="gradient-text">FeeScan</span>
              </span>
            </a>
            <p className="text-dark-400 mb-4 max-w-md">
              Platform analisis fee termurah untuk swap dan bridge lintas blockchain. 
              Bandingkan fee dari berbagai aggregator dalam satu klik.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-dark-800 hover:bg-dark-700 flex items-center justify-center text-dark-400 hover:text-secondary-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-dark-800 hover:bg-dark-700 flex items-center justify-center text-dark-400 hover:text-secondary-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-dark-800 hover:bg-dark-700 flex items-center justify-center text-dark-400 hover:text-secondary-400 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Platform DEX</h4>
            <ul className="space-y-2">
              {platforms.map((platform) => (
                <li key={platform.name}>
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-dark-400 hover:text-secondary-400 transition-colors"
                  >
                    {platform.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Sumber Daya</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-dark-400 hover:text-secondary-400 transition-colors">
                  Dokumentasi
                </a>
              </li>
              <li>
                <a href="#" className="text-dark-400 hover:text-secondary-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-dark-400 hover:text-secondary-400 transition-colors">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="#" className="text-dark-400 hover:text-secondary-400 transition-colors">
                  Syarat dan Ketentuan
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-dark-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-dark-500 text-sm">
              {currentYear} FlowFeeScan. Semua hak dilindungi.
            </p>
            <p className="text-dark-500 text-sm">
              Data fee bersumber dari API resmi masing-masing platform
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
