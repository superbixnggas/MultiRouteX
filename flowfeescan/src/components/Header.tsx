import { Activity, FileText, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/90 backdrop-blur-xl border-b border-dark-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary-500 to-secondary-700 flex items-center justify-center shadow-glow">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-white">Flow</span>
              <span className="gradient-text">FeeScan</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {location.pathname === '/' ? (
              <>
                <a
                  href="#hero"
                  className="text-dark-300 hover:text-secondary-400 transition-colors duration-200 font-medium"
                >
                  Beranda
                </a>
                <a
                  href="#comparison"
                  className="text-dark-300 hover:text-secondary-400 transition-colors duration-200 font-medium"
                >
                  Bandingkan
                </a>
                <a
                  href="#education"
                  className="text-dark-300 hover:text-secondary-400 transition-colors duration-200 font-medium"
                >
                  Pelajari
                </a>
              </>
            ) : (
              <Link
                to="/"
                className="text-dark-300 hover:text-secondary-400 transition-colors duration-200 font-medium"
              >
                Beranda
              </Link>
            )}
            <Link
              to="/resources"
              className={`flex items-center gap-2 transition-colors duration-200 font-medium ${
                location.pathname === '/resources'
                  ? 'text-secondary-400'
                  : 'text-dark-300 hover:text-secondary-400'
              }`}
            >
              <FileText className="w-4 h-4" />
              Sumber Daya
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-dark-300 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-dark-700/50">
            <div className="flex flex-col gap-4">
              {location.pathname === '/' ? (
                <>
                  <a
                    href="#hero"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-dark-300 hover:text-secondary-400 transition-colors duration-200 font-medium py-2"
                  >
                    Beranda
                  </a>
                  <a
                    href="#comparison"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-dark-300 hover:text-secondary-400 transition-colors duration-200 font-medium py-2"
                  >
                    Bandingkan
                  </a>
                  <a
                    href="#education"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-dark-300 hover:text-secondary-400 transition-colors duration-200 font-medium py-2"
                  >
                    Pelajari
                  </a>
                </>
              ) : (
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-dark-300 hover:text-secondary-400 transition-colors duration-200 font-medium py-2"
                >
                  Beranda
                </Link>
              )}
              <Link
                to="/resources"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 transition-colors duration-200 font-medium py-2 ${
                  location.pathname === '/resources'
                    ? 'text-secondary-400'
                    : 'text-dark-300 hover:text-secondary-400'
                }`}
              >
                <FileText className="w-4 h-4" />
                Sumber Daya
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
