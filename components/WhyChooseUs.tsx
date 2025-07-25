'use client';

import { useState } from 'react';
import QuoteModal from './QuoteModal';

export default function WhyChooseUs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const features = [
    {
      icon: 'ri-rocket-line',
      title: 'Fast Delivery',
      description: '7-day delivery guarantee for all projects. We understand startups need to move fast.',
      color: 'text-[#2A8B8A]'
    },
    {
      icon: 'ri-money-dollar-circle-line',
      title: 'Startup Pricing',
      description: 'Transparent, startup-friendly pricing with no hidden costs. Pay only for what you need.',
      color: 'text-[#2A8B8A]'
    },
    {
      icon: 'ri-smartphone-line',
      title: 'Mobile-First Design',
      description: 'Every website and app we build is mobile-first and responsive across all devices.',
      color: 'text-[#2A8B8A]'
    },
    {
      icon: 'ri-code-s-slash-line',
      title: 'Latest Technology',
      description: 'We use cutting-edge technologies and frameworks to build scalable, future-proof solutions.',
      color: 'text-[#2A8B8A]'
    },
    {
      icon: 'ri-search-line',
      title: 'SEO-Ready',
      description: 'All our websites come with built-in SEO optimization to help you rank higher on search engines.',
      color: 'text-[#2A8B8A]'
    },
    {
      icon: 'ri-customer-service-2-line',
      title: '24/7 Support',
      description: 'Round-the-clock support and maintenance to ensure your website runs smoothly.',
      color: 'text-[#2A8B8A]'
    }
  ];

  const handleStartProject = () => {
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Why Choose Stitchbyte?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just another web development agency. We're your startup's digital partner, 
            committed to helping you succeed in the digital world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                <div className={`w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`${feature.icon} text-3xl ${feature.color}`}></i>
                </div>
                
                <h3 className="text-2xl font-bold text-black mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div
          className="mt-20 rounded-3xl p-8 md:p-12"
          style={{ background: 'linear-gradient(to right, #2A8B8A, #2A8B8A)' }}
        >
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100+</div>
              <div className="text-[#e6f6f6]">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-[#e6f6f6]">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">7</div>
              <div className="text-[#e6f6f6]">Days Average Delivery</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">99%</div>
              <div className="text-[#e6f6f6]">Client Satisfaction</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold text-black mb-4">
            Ready to Launch Your Digital Identity?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join 100+ startups who trust Stitchbyte for their digital needs. 
            Let's build something amazing together.
          </p>
          <button 
            onClick={handleStartProject}
            style={{ background: '#2A8B8A' }}
            className="text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer shadow-lg"
          >
            Start Your Project Today
          </button>
        </div>
      </div>

      <QuoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        selectedService=""
      />
    </section>
  );
}
