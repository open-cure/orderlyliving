import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Menu, X, Phone, Mail } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: 'Home' },
    { name: 'Transitions', path: 'Transitions' },
    { name: 'Notary Services', path: 'NotaryServices' },
    { name: 'Organization', path: 'Organization' },
    { name: 'Results', path: 'Results' },
    { name: 'Contact', path: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center space-x-2">
              <h1 className="text-2xl font-serif text-sage-800">Orderly Living</h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={createPageUrl(item.path)}
                  className={`text-sm font-medium transition-colors ${
                    currentPageName === item.path
                      ? 'text-sage-700 border-b-2 border-sage-700'
                      : 'text-gray-700 hover:text-sage-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="tel:937-272-2344"
                className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md"
              >
                Call Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={createPageUrl(item.path)}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-md text-sm font-medium ${
                    currentPageName === item.path
                      ? 'bg-sage-100 text-sage-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="tel:937-272-2344"
                className="block text-center bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                Call Now
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-sage-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-serif mb-4">Orderly Living</h3>
              <p className="text-sage-200 text-sm leading-relaxed">
                Creating calm, comfort, and organization for life's big changes.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to={createPageUrl('Transitions')} className="text-sage-200 hover:text-white transition-colors">
                    Senior Transitions
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl('NotaryServices')} className="text-sage-200 hover:text-white transition-colors">
                    Notary Services
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl('Organization')} className="text-sage-200 hover:text-white transition-colors">
                    Home Organization
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl('Results')} className="text-sage-200 hover:text-white transition-colors">
                    Results & Testimonials
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
              <div className="space-y-3 text-sm">
                <a href="tel:937-272-2344" className="flex items-center space-x-2 text-sage-200 hover:text-white transition-colors">
                  <Phone className="h-4 w-4" />
                  <span>937-272-2344</span>
                </a>
                <a href="mailto:hello@orderly.living" className="flex items-center space-x-2 text-sage-200 hover:text-white transition-colors">
                  <Mail className="h-4 w-4" />
                  <span>hello@orderly.living</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-sage-800 mt-8 pt-8 text-center text-sm text-sage-300">
            <p>&copy; {new Date().getFullYear()} Orderly Living. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        :root {
          --cream-50: #FAF8F5;
          --sage-100: #E8EDE7;
          --sage-200: #D1DDD0;
          --sage-600: #6B8E6A;
          --sage-700: #567855;
          --sage-800: #3F5A3E;
          --sage-900: #2A3D29;
          --gold-500: #D4A574;
          --gold-600: #C18F5E;
        }

        .bg-cream-50 { background-color: var(--cream-50); }
        .bg-sage-100 { background-color: var(--sage-100); }
        .bg-sage-900 { background-color: var(--sage-900); }
        .bg-gold-500 { background-color: var(--gold-500); }
        .hover\\:bg-gold-600:hover { background-color: var(--gold-600); }
        
        .text-sage-200 { color: var(--sage-200); }
        .text-sage-300 { color: #B8C8B7; }
        .text-sage-600 { color: var(--sage-600); }
        .text-sage-700 { color: var(--sage-700); }
        .text-sage-800 { color: var(--sage-800); }
        
        .border-sage-700 { border-color: var(--sage-700); }
        .border-sage-800 { border-color: var(--sage-800); }
        
        .hover\\:text-sage-600:hover { color: var(--sage-600); }
      `}</style>
    </div>
  );
}