'use client';

import { useState } from 'react';
import Header from '../../components/Header';

const caseStudies = [
  {
    id: 1,
    title: 'TechStart Solutions: MVP in 5 Days',
    excerpt: 'How we delivered a robust MVP for a SaaS startup in record time, enabling them to secure funding.',
    content: `TechStart Solutions approached us with a tight deadline and a clear vision. We built their MVP in just 5 days using React, Node.js, and MongoDB. The result? A successful product demo and their first round of funding secured.`,
    client: 'TechStart Solutions',
    industry: 'SaaS',
    date: '2025-06-10',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
    tags: ['MVP', 'SaaS', 'Startup'],
  },
  {
    id: 2,
    title: 'StyleHub Boutique: 40% Conversion Boost',
    excerpt: 'Our Shopify optimization led to a dramatic increase in sales for this fashion boutique.',
    content: `StyleHub Boutique wanted to improve their online sales. We revamped their Shopify store, optimized the checkout flow, and implemented targeted marketing popups. The result was a 40% increase in conversion rate within the first month.`,
    client: 'StyleHub Boutique',
    industry: 'Ecommerce',
    date: '2025-05-22',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
    tags: ['Shopify', 'Ecommerce', 'Optimization'],
  },
  {
    id: 3,
    title: 'FinanceFlow App: Scaling to 10k+ Users',
    excerpt: 'A scalable SaaS platform for personal finance, built to handle rapid user growth.',
    content: `FinanceFlow needed a secure, scalable app for thousands of users. We architected a cloud-native solution with AWS, React, and Node.js. The platform now supports over 10,000 active users with 99.9% uptime.`,
    client: 'FinanceFlow App',
    industry: 'Fintech',
    date: '2025-04-15',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    tags: ['Fintech', 'SaaS', 'Cloud'],
  },
  {
    id: 4,
    title: 'EcoTech Solutions: Green Brand Online',
    excerpt: 'A WordPress site that captures the brand values and drives eco-conscious conversions.',
    content: `EcoTech Solutions wanted a website that reflected their commitment to sustainability. We delivered a custom WordPress theme with green branding, SEO optimization, and a blog to share their mission.`,
    client: 'EcoTech Solutions',
    industry: 'Sustainability',
    date: '2025-03-30',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    tags: ['WordPress', 'Sustainability', 'Branding'],
  },
  {
    id: 5,
    title: 'FoodieExpress: Launching a Food Delivery Platform',
    excerpt: 'From idea to launch, we built a robust food delivery web app for a growing startup.',
    content: `FoodieExpress needed a fast, reliable food delivery platform. We built a custom web app with real-time order tracking, payment integration, and a mobile-first design. The platform launched on time and is now serving thousands of customers.`,
    client: 'FoodieExpress',
    industry: 'Food Delivery',
    date: '2025-02-18',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?auto=format&fit=crop&w=600&q=80',
    tags: ['Web App', 'Delivery', 'Startup'],
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function CaseStudiesPage() {
  const [openCase, setOpenCase] = useState<null | typeof caseStudies[0]>(null);

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto py-20 px-4">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-5xl font-extrabold mb-2 text-center">Case Studies</h1>
          <p className="text-xl text-gray-500 text-center">
            Real results for real clients. Explore how Stitchbyte helps startups and businesses grow.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {caseStudies.map((cs) => (
            <article
              key={cs.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              <img
                src={cs.image}
                alt={cs.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  {cs.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#e6f6f6] text-[#2A8B8A] px-3 py-1 rounded-full text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl font-bold mb-2">{cs.title}</h2>
                <p className="text-gray-600 mb-4 flex-1">{cs.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{cs.client}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-400">{formatDate(cs.date)}</span>
                  </div>
                  <button
                    className="text-[#2A8B8A] font-semibold hover:underline transition"
                    onClick={() => setOpenCase(cs)}
                  >
                    Read More &rarr;
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Modal */}
        {openCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 relative animate-fade-in">
              <button
                className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-[#2A8B8A] transition"
                onClick={() => setOpenCase(null)}
                aria-label="Close"
              >
                ×
              </button>
              <img
                src={openCase.image}
                alt={openCase.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-3">
                  {openCase.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#e6f6f6] text-[#2A8B8A] px-3 py-1 rounded-full text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-3xl font-bold mb-2">{openCase.title}</h2>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm text-gray-500">{openCase.client}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-400">{formatDate(openCase.date)}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-400">{openCase.industry}</span>
                </div>
                <p className="text-gray-700 whitespace-pre-line mb-4">{openCase.content}</p>
                <button
                  className="mt-2 px-6 py-2 rounded-lg bg-[#2A8B8A] text-white font-semibold hover:opacity-90 transition"
                  onClick={() => setOpenCase(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}