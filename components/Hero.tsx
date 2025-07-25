'use client';

import { useState } from 'react';
import QuoteModal from './QuoteModal';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 sm:opacity-10"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20digital%20agency%20workspace%20with%20laptops%20computers%20coding%20development%20minimalist%20clean%20white%20background%20professional%20team%20collaboration%20startup%20office%20environment&width=1920&height=1080&seq=hero-bg&orientation=landscape')`
        }}
      />
      {/* Overlay for mobile */}
      <div className="absolute inset-0 bg-white/95 sm:bg-transparent z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
            Launch your startup's<br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(to right, #2A8B8A, #2A8B8A)'
              }}
            >
              digital identity
            </span>
            <br />in 7 days
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            Starting at ₹10,000. Professional websites, ecommerce stores, and custom web apps built for startups.
          </p>
          <div className="text-lg text-gray-500 mb-12">
            <span className="inline-flex items-center">
              <i className="ri-check-line mr-2" style={{ color: '#2A8B8A' }}></i>
              7-day delivery guarantee
            </span>
            <span className="mx-4">•</span>
            <span className="inline-flex items-center">
              <i className="ri-smartphone-line mr-2" style={{ color: '#2A8B8A' }}></i>
              Mobile-first design
            </span>
            <span className="mx-4">•</span>
            <span className="inline-flex items-center">
              <i className="ri-search-line mr-2" style={{ color: '#2A8B8A' }}></i>
              SEO-ready
            </span>
          </div>
        </div>

        <div className="flex flex-row gap-3 justify-center items-center mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              background: 'linear-gradient(to right, #2A8B8A, #2A8B8A)'
            }}
            className="text-white px-4 py-2 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer shadow-lg"
          >
            Get a Free Quote
          </button>
          <button className="border-2 border-black text-black px-4 py-2 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-black hover:text-white transition-all duration-300 whitespace-nowrap cursor-pointer">
            See Our Work
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex items-center justify-center space-x-8 opacity-60">
          <div className="text-center">
            <div className="text-2xl font-bold text-black">100+</div>
            <div className="text-sm text-gray-600">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-black">7 Days</div>
            <div className="text-sm text-gray-600">Average Delivery</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-black">24/7</div>
            <div className="text-sm text-gray-600">Support</div>
          </div>
        </div>
      </div>

      <QuoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        selectedService=""
      />
    </div>
  );
}