import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Menu, X, Phone, Mail } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  /** false = full card, true = compact phone circle (tap to expand) */
  const [cornerPopUpCollapsed, setCornerPopUpCollapsed] = useState(false);

  const navItems = [
    { name: 'Home', path: 'Home' },
    { name: 'Loan Signing & Notary', path: 'NotaryServices' },
    { name: 'Senior Transitions', path: 'Transitions' },
    // { name: 'Results', path: 'Results' }, // re-enable when Results page is live
    { name: 'About Us', path: 'AboutUs' },
    { name: 'Contact', path: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="logo-link flex items-center space-x-2">
              <h1 className="text-2xl font-serif font-medium text-brand transition-colors tracking-widest">Orderly.Living</h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={createPageUrl(item.path)}
                  className={`text-sm font-medium transition-colors ${
                    currentPageName === item.path
                      ? 'text-azure border-b-2 border-azure'
                      : 'text-gray-700 hover:text-azure-dark'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <a href="tel:336-673-3759"
                className="bg-azure hover:bg-azure-dark text-white px-6 py-2 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md"
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
                href="tel:336-673-3759"
                className="block text-center bg-azure hover:bg-azure-dark text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                Call Now
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <main>{children}</main>

      {/* Corner pop-up: full card or compact phone circle (same brand styling) */}
      <div className="fixed bottom-6 right-6 z-40">
        {cornerPopUpCollapsed ? (
          <button
            type="button"
            onClick={() => setCornerPopUpCollapsed(false)}
            className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border-[6px] border-[#B7A89C] bg-[#EDCDBB]/65 backdrop-blur-md shadow-lg text-[#5c4a3d] hover:bg-[#EDCDBB]/85 hover:text-[#4a3c32] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B7A89C] focus-visible:ring-offset-2"
            aria-label="Expand call and contact info"
            aria-expanded={false}
          >
            <Phone className="h-6 w-6 sm:h-7 sm:w-7 shrink-0" aria-hidden />
          </button>
        ) : (
          <div
            className="relative w-[300px] overflow-visible rounded-full border-[6px] border-[#B7A89C] bg-[#EDCDBB]/65 backdrop-blur-md shadow-lg flex flex-col items-center justify-center text-center px-6 py-4 font-serif transition-all"
            style={{ fontFamily: 'EB Garamond, Garamond, Georgia, serif' }}
            role="dialog"
            aria-label="Contact Orderly.Living"
          >
            <button
              type="button"
              onClick={() => setCornerPopUpCollapsed(true)}
              className="absolute -top-0.5 -right-0.5 z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#B7A89C] bg-[#F5EBE3] text-[#5c4a3d] shadow-sm backdrop-blur-sm hover:bg-white hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B7A89C] focus-visible:ring-offset-2 transition-all"
              aria-label="Minimize to phone icon"
            >
              <X className="h-3 w-3" strokeWidth={2.5} aria-hidden />
            </button>
            <a
              href="tel:336-673-3759"
              className="text-[#5c4a3d] font-semibold hover:text-[#4a3c32] inline-flex items-center justify-center gap-1.5 text-base mb-0 whitespace-nowrap"
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden />
              <span>Call or Text 336-673-3759</span>
            </a>
            <p className="text-base font-medium italic leading-tight text-[#5c4a3d] text-center mt-0.5">
              Serving Southwest Ohio
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-azure-footer text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-serif font-medium text-brand-light mb-4 tracking-widest">Orderly.Living</h3>
              <p className="text-blue-100/90 text-sm leading-relaxed">
                Creating calm, comfort, and order for life's big changes.
              </p>
              <p className="text-blue-200/80 text-base mt-2">
                Serving Southwest Ohio
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to={createPageUrl('NotaryServices')} className="text-blue-100/90 hover:text-white transition-colors">
                    Loan Signing & Notary
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl('Transitions')} className="text-blue-100/90 hover:text-white transition-colors">
                    Senior Transitions
                  </Link>
                </li>
                {/* <li>
                  <Link to={createPageUrl('Results')} className="text-blue-100/90 hover:text-white transition-colors">
                    Results & Testimonials
                  </Link>
                </li> */}
                <li>
                  <Link to={createPageUrl('AboutUs')} className="text-blue-100/90 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
              <div className="space-y-3 text-sm">
                <a
                  href="tel:336-673-3759"
                  className="inline-flex flex-col items-start gap-0.5 text-blue-100/90 hover:text-white transition-colors"
                >
                  <span className="inline-flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>336-ORD-ERLY</span>
                  </span>
                  <span className="pl-6 text-sm text-blue-200/85">336-673-3759</span>
                </a>
                <a href="mailto:hello@orderly.living" className="flex items-center space-x-2 text-blue-100/90 hover:text-white transition-colors">
                  <Mail className="h-4 w-4" />
                  <span>hello@orderly.living</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-azure-darker/80 mt-8 pt-8 text-center text-sm text-blue-200/75">
            <p>&copy; {new Date().getFullYear()} Orderly.Living. All rights reserved.</p>
            {import.meta.env.DEV && (
              <p className="text-xs text-blue-300/50 mt-2">You're viewing the local dev build — your latest edits are here.</p>
            )}
          </div>
        </div>
      </footer>

      <style>{`
        :root {
          --cream-50: #FAF8F5;
          --sage-50: #F5F7F4;
          --sage-100: #E8EDE7;
          --sage-200: #D1DDD0;
          --sage-300: #9eb8c9;
          --sage-600: #6B8E6A;
          --sage-700: #567855;
          --sage-800: #3F5A3E;
          --sage-900: #2A3D29;
          --gold-500: #D4A574;
          --gold-600: #C18F5E;
          --brand: #b7a89c;
          --brand-dark: #9D8E82;
          --brand-light: #D4CCC4;
          --azure: #427898;
          --azure-dark: #35607a;
        }

        .bg-azure { background-color: var(--azure); }
        .hover\\:bg-azure-dark:hover { background-color: var(--azure-dark); }
        .bg-cream-50 { background-color: var(--cream-50); }
        .bg-sage-50 { background-color: var(--sage-50); }
        .bg-sage-100 { background-color: var(--sage-100); }
        .bg-sage-900 { background-color: var(--sage-900); }
        .bg-gold-500 { background-color: var(--gold-500); }
        .hover\\:bg-gold-600:hover { background-color: var(--gold-600); }
        
        .text-sage-200 { color: var(--sage-200); }
        .text-sage-300 { color: var(--sage-300); }
        .text-sage-600 { color: var(--sage-600); }
        .text-sage-700 { color: var(--sage-700); }
        .text-sage-800 { color: var(--sage-800); }
        .text-brand { color: var(--brand); }
        .text-brand-light { color: var(--brand-light); }
        .text-brand-dark { color: var(--brand-dark); }
        .hover\\:text-brand-dark:hover { color: var(--brand-dark); }
        .logo-link:hover h1 { color: var(--brand-dark); }
        
        .border-sage-700 { border-color: var(--sage-700); }
        .border-sage-800 { border-color: var(--sage-800); }
        .border-brand { border-color: var(--brand); }
        
        .hover\\:text-sage-600:hover { color: var(--sage-600); }
      `}</style>
    </div>
  );
}