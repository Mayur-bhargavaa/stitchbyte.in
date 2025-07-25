'use client';

import { useState, useRef } from 'react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: string;
}

export default function QuoteModal({ isOpen, onClose, selectedService }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: selectedService,
    budget: '',
    timeline: '',
    message: ''
  });

  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formPayload.append(key, value);
    });
    if (file) {
      formPayload.append('file', file);
    }

    try {
      const res = await fetch('http://localhost:5001/api/quotes', {
        method: 'POST',
        body: formPayload,
      });
      if (!res.ok) throw new Error('Failed to submit quote');
      setIsSubmitted(true);
    } catch (err) {
      alert('There was an error submitting your quote. Please try again.');
    }
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: selectedService,
        budget: '',
        timeline: '',
        message: ''
      });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 3000);
  };

  const handleClose = () => {
    onClose();
    // Reset form when closing
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: selectedService,
      budget: '',
      timeline: '',
      message: ''
    });
    setIsSubmitted(false);
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-black">Get Free Quote</h2>
            <button 
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-xl text-gray-500"></i>
            </button>
          </div>
          <p className="text-gray-600 mt-2">Tell us about your project and we'll get back to you within 24 hours.</p>
        </div>

        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-[#e6f6f6] rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-check-line text-3xl" style={{ color: '#2A8B8A' }}></i>
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">Quote Request Sent!</h3>
              <p className="text-gray-600 mb-4">
                Thank you for your interest. We'll review your requirements and send you a detailed quote within 24 hours.
              </p>
              <button
                onClick={handleClose}
                style={{ background: '#2A8B8A' }}
                className="text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2"
                    style={{ outlineColor: '#2A8B8A', boxShadow: '0 0 0 2px #2A8B8A33' }}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2"
                    style={{ outlineColor: '#2A8B8A', boxShadow: '0 0 0 2px #2A8B8A33' }}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2"
                    style={{ outlineColor: '#2A8B8A', boxShadow: '0 0 0 2px #2A8B8A33' }}
                    placeholder="+91 9876543210"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2"
                    style={{ outlineColor: '#2A8B8A', boxShadow: '0 0 0 2px #2A8B8A33' }}
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Required *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm pr-8"
                  >
                    <option value="">Select a service</option>
                    <option value="WordPress">WordPress Development</option>
                    <option value="Shopify">Shopify Store Setup</option>
                    <option value="Custom Code">Custom Web App</option>
                    <option value="Mobile App">Mobile App Development</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range *
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm pr-8"
                  >
                    <option value="">Select budget range</option>
                    <option value="10000-25000">₹10,000 - ₹25,000</option>
                    <option value="25000-50000">₹25,000 - ₹50,000</option>
                    <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                    <option value="100000+">₹1,00,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                  Timeline *
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm pr-8"
                >
                  <option value="">Select timeline</option>
                  <option value="ASAP">ASAP (Rush delivery)</option>
                  <option value="1-2 weeks">1-2 weeks</option>
                  <option value="2-4 weeks">2-4 weeks</option>
                  <option value="1-2 months">1-2 months</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2"
                  style={{ outlineColor: '#2A8B8A', boxShadow: '0 0 0 2px #2A8B8A33' }}
                  placeholder="Describe your project requirements, features needed, target audience, and any specific requests..."
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {formData.message.length}/500 characters
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attach File (optional)
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt,.rtf,.odt"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold"
                  style={{
                    // file input button
                    color: '#2A8B8A',
                    backgroundColor: '#e6f6f6',
                  }}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ background: '#2A8B8A' }}
                  className="flex-1 text-white py-4 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50 cursor-pointer whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <i className="ri-loader-line animate-spin mr-2"></i>
                      Sending...
                    </span>
                  ) : (
                    'Get Free Quote'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
