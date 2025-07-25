'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import QuoteModal from './QuoteModal';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Services', href: '/#pricing' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center cursor-pointer select-none">
              <span className="text-2xl font-bold font-pacifico">
                <span className="text-black">Stitch</span>
                <span style={{ color: '#2A8B8A' }}>Byte</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-[#2A8B8A] font-medium transition-colors cursor-pointer"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => setIsModalOpen(true)}
                style={{ backgroundColor: '#2A8B8A' }}
                className="text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                Get Quote
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-700 hover:text-[#2A8B8A] font-medium py-2 cursor-pointer"
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  style={{ backgroundColor: '#2A8B8A' }}
                  className="text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 whitespace-nowrap cursor-pointer mt-4"
                >
                  Get Quote
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <QuoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        selectedService=""
      />
    </>
  );
}