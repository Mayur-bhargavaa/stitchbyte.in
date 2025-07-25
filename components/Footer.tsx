'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Our Work', href: '#projects' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    { name: 'WordPress Development', href: '#' },
    { name: 'Shopify Store Setup', href: '#' },
    { name: 'Custom Web Apps', href: '#' },
    { name: 'Mobile App Development', href: '#' }
  ];

  const resources = [
    { name: 'Blog', href: '/blog' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Support', href: '/support' }
  ];

  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSubscribed(false);

    try {
      const res = await fetch('https://api.stitchbyte.in/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubscribed(true);
        setEmail('');
      } else {
        setError(data.error || 'Subscription failed. Try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold font-pacifico">
                <span className="text-white">Stitch</span>
                <span style={{ color: '#2A8B8A' }}>Byte</span>
              </h3>
              <p className="text-gray-300 mt-2">
                Digital agency for startups. We help entrepreneurs launch their digital identity in record time.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#2A8B8A] transition-colors cursor-pointer">
                <i className="ri-twitter-fill text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#2A8B8A] transition-colors cursor-pointer">
                <i className="ri-linkedin-fill text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#2A8B8A] transition-colors cursor-pointer">
                <i className="ri-instagram-line text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#2A8B8A] transition-colors cursor-pointer">
                <i className="ri-github-fill text-lg"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-300 hover:text-[#2A8B8A] transition-colors cursor-pointer">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a href={service.href} className="text-gray-300 hover:text-[#2A8B8A] transition-colors cursor-pointer">
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <Link href={resource.href} className="text-gray-300 hover:text-[#2A8B8A] transition-colors cursor-pointer">
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold mb-2">Stay Updated</h4>
              <p className="text-gray-300">
                Get the latest insights on web development, startup tips, and industry trends.
              </p>
            </div>
            <form className="flex" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:ring-2"
                style={{ borderColor: '#2A8B8A', outlineColor: '#2A8B8A' }}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={submitting}
              />
              <button
                type="submit"
                className="text-white px-6 py-3 rounded-r-lg hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
                style={{ backgroundColor: '#2A8B8A' }}
                disabled={submitting}
              >
                {submitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
          {subscribed && (
            <div className="text-[#2A8B8A] mt-4 font-semibold">Thank you for subscribing!</div>
          )}
          {error && (
            <div className="text-red-400 mt-4 font-semibold">{error}</div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} Stitchbyte. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-[#2A8B8A] text-sm transition-colors cursor-pointer">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-[#2A8B8A] text-sm transition-colors cursor-pointer">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-[#2A8B8A] text-sm transition-colors cursor-pointer">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}