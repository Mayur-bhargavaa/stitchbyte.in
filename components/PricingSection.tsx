'use client';

import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import QuoteModal from './QuoteModal';

export default function PricingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [activeTab, setActiveTab] = useState('WordPress');
  const [userCurrency, setUserCurrency] = useState('INR');
  const [userLocale, setUserLocale] = useState('en-IN');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [country, setCountry] = useState('IN');

  const europeanCountries = [
    'AL','AD','AT','BY','BE','BA','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT','LV','LI','LT','LU','MT','MD','MC','ME','NL','MK','NO','PL','PT','RO','SM','RS','SK','SI','ES','SE','CH','UA','VA'
  ];

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setUserLocale(data.languages?.split(',')[0] || 'en-IN');
        setCountry(data.country_code || 'IN' || 'RU');
        if (data.country_code === 'AE') {
          setUserCurrency('AED');
        } else if (data.country_code === 'US') {
          setUserCurrency('USD');
        } else if (data.country_code === 'IN' || data.country_code === 'RU') {
          setUserCurrency('INR');
        } else if (europeanCountries.includes(data.country_code)) {
          setUserCurrency('EUR');
        } else {
          setUserCurrency('USD');
        }
      });
  }, []);

  useEffect(() => {
    if (userCurrency === 'AED') {
      // Hardcoded fallback rate for AED (update as needed)
      setExchangeRate(0.044); // 1 INR ≈ 0.044 AED (as of July 2025)
    } else if (userCurrency !== 'INR') {
      fetch(`https://api.frankfurter.app/latest?amount=1&from=INR&to=${userCurrency}`)
        .then(res => res.json())
        .then(data => {
          if (data.rates && data.rates[userCurrency]) {
            setExchangeRate(data.rates[userCurrency]);
          }
        });
    } else {
      setExchangeRate(1);
    }
  }, [userCurrency]);

  const handleGetQuote = (service: string) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  // ✅ Custom 500-based Rounding
  const roundUpToNearest500 = (amount: number) => {
    return Math.ceil(amount / 500) * 500;
  };

  // ✅ Adjusted Price Logic by Country
  const getAdjustedPrice = (basePrice: number) => {
    // Helper for rounding to nearest 100
    const roundToNearest100 = (amount: number) => Math.round(amount / 100) * 100;

    if (country === 'IN' || country === 'RU') {
      // India and Russia: Round to nearest 100
      return roundToNearest100(basePrice);
    }

    if (country === 'AE') {
      // UAE: 3x, convert to AED, then round to nearest 100
      let aedPriceINR = basePrice * 3;
      return roundToNearest100(aedPriceINR * exchangeRate);
    }

    if (country === 'US') {
      // US: 2x, convert to USD, then round to nearest 100
      let usdPriceINR = basePrice * 2;
      let converted = usdPriceINR * exchangeRate;
      return roundToNearest100(converted);
    }

    if (userCurrency === 'EUR') {
      // Europe: 2x, convert to EUR, round to nearest 100
      let eurPriceINR = basePrice * 2;
      let converted = eurPriceINR * exchangeRate;
      return Math.round(converted / 100) * 100;
    }

    // Other countries: 2x, convert to USD, then round to nearest 100
    let fallbackPrice = basePrice * 2;
    let fallbackConverted = fallbackPrice * exchangeRate;
    return roundToNearest100(fallbackConverted);
  };

  const formatPrice = (amountInINR: number) => {
    let displayPrice = getAdjustedPrice(amountInINR);
    let currency = userCurrency;
    let locale = userLocale;

    if (country === 'AE') currency = 'AED';
    else if (country === 'IN' || country === 'RU') {
      currency = 'INR';
      locale = 'en-IN'; // Force INR symbol before price for India and Russia
    }
    else if (userCurrency === 'EUR') {
      currency = 'EUR';
      locale = 'en-IE'; // Force Euro symbol before price
    }
    else currency = 'USD';

    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
      }).format(displayPrice);
    } catch (err) {
      return `${currency} ${displayPrice}`;
    }
  };

  // Update the color property for all pricingData to use your theme color
  const pricingData = {
    WordPress: {
      icon: 'ri-wordpress-line',
      color: 'from-[#2A8B8A] to-[#2A8B8A]', // theme color
      plans: [
        { name: 'Starter', price: 15000, description: 'Perfect for personal websites and blogs', features: ['Theme installation', 'Basic customization', 'Content upload', 'SSL certificate', 'Mobile responsive'], tooltip: 'Great for personal blogs and portfolios' },
        { name: 'Business Site', price: 25000, description: '5-7 pages, mobile responsive', features: ['Custom design', 'Mobile optimization', 'Contact forms', 'SEO setup', 'Analytics integration'], tooltip: 'Best for small businesses', popular: true },
        { name: 'Ecommerce', price: 40000, description: 'Complete online store solution', features: ['WooCommerce setup', 'Payment gateway', 'Product catalog', 'Order management', 'Shipping integration'], tooltip: 'Perfect for online stores' }
      ]
    },
    Shopify: {
      icon: 'ri-shopping-bag-line',
      color: 'from-[#2A8B8A] to-[#2A8B8A]', // theme color
      plans: [
        { name: 'Starter Store', price: 20000, description: 'Quick store setup and launch', features: ['Theme customization', 'Product upload', 'Basic branding', 'Mobile optimization', 'Payment setup'], tooltip: 'Quick store launch' },
        { name: 'Standard Store', price: 30000, description: 'Complete store with gateway', features: ['Custom sections', 'Payment integration', 'Shipping setup', 'Tax configuration', 'Order tracking'], tooltip: 'Best for early-stage startups', popular: true },
        { name: 'Advanced Shopify', price: 40000, description: 'Advanced features and customization', features: ['Custom sections', 'Advanced analytics', 'Marketing automation', 'Multi-channel selling', 'Custom apps'], tooltip: 'For growing businesses' }
      ]
    },
    'Custom Code': {
      icon: 'ri-code-line',
      color: 'from-[#2A8B8A] to-[#2A8B8A]', // theme color
      plans: [
        { name: 'MVP Web App', price: 50000, description: 'Minimum viable product', features: ['Custom development', 'Responsive design', 'Core features', 'Testing', 'Basic deployment'], tooltip: 'Best for early-stage startups' },
        { name: 'Admin Panel + API', price: 80000, description: 'Scalable web application', features: ['Admin dashboard', 'User management', 'API development', 'Database design', 'Security features'], tooltip: 'Perfect for growing startups', popular: true },
        { name: 'Full-stack SaaS', price: 100000, description: 'Complete SaaS solution', features: ['Authentication system', 'Cloud deployment', 'Auto-scaling', 'Monitoring', 'Ongoing support'], tooltip: 'Enterprise-ready solution' }
      ]
    },
    'Design & Marketing': {
      icon: 'ri-palette-line',
      color: 'from-[#2A8B8A] to-[#2A8B8A]', // theme color
      plans: [
        { name: 'Logo Design', price: 25000, description: 'Professional brand identity package', features: ['Logo concepts', 'Brand guidelines', 'Color palette', 'Typography selection', 'File formats'], tooltip: 'Complete brand identity' },
        { name: 'Graphic Design', price: 35000, description: 'Complete visual design solution', features: ['Marketing materials', 'Social media graphics', 'Print designs', 'Brand collateral', 'Design system'], tooltip: 'All your design needs', popular: true },
        { name: 'Digital Marketing', price: 50000, description: 'Comprehensive marketing strategy', features: ['SEO optimization', 'Social media strategy', 'Content marketing', 'PPC campaigns', 'Analytics setup'], tooltip: 'Growth-focused marketing' }
      ]
    },
    'Website Enhancement & Rebuild': {
      icon: 'ri-code-line',
      color: 'from-[#2A8B8A] to-[#2A8B8A]', // theme color
      plans: [
        { name: 'Bug Fix & Optimization', price: 10000, description: 'Fix issues and improve performance', features: ['Bug fixing', 'Security patching', 'Speed optimization', 'Cross-browser testing', 'Minor UI fixes'], tooltip: 'Best for existing sites needing fixes' },
        { name: 'Add Functionality', price: 25000, description: 'Add new features or integrations', features: ['Feature development', 'API integration', 'UI/UX improvements', 'Performance optimization', 'Basic deployment'], tooltip: 'Ideal for adding or upgrading features', popular: true },
        { name: 'Full Website Rebuild', price: 40000, description: 'Complete redesign & redevelopment', features: ['Custom redesign', 'Modern tech stack', 'Mobile responsive', 'SEO optimization', 'End-to-end deployment'], tooltip: 'For outdated or broken websites' }
      ]
    },
  };

  const tabs = Object.keys(pricingData);

  return (
    <section id="pricing" className="py-16 sm:py-20 bg-white">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-pink-50"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#2A8B8A] via-[#2A8B8A] to-[#2A8B8A] bg-clip-text text-transparent">
            Transparent Pricing
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your project. No hidden fees, no surprises. 
            Professional development services at startup-friendly rates.
          </p>
        </div>

        <div className="flex justify-center mb-8 sm:mb-12 min-w-0">
          <div className="bg-gray-100 rounded-full flex flex-row gap-x-3 px-3 py-3 max-w-full sm:w-auto overflow-x-auto whitespace-nowrap scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-5 py-2 rounded-2xl font-semibold transition-all duration-200
                  ${activeTab === tab
                    ? 'bg-white text-black shadow-sm'
                    : 'text-gray-600 hover:bg-white/80'}
                `}
                style={{
                  boxShadow: activeTab === tab ? '0 2px 8px 0 rgba(168,85,247,0.08)' : undefined,
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20">
          {pricingData[activeTab as keyof typeof pricingData].plans.map((plan, index) => (
            <div className="relative group" key={index}>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 via-pink-400 to-purple-400 opacity-0 group-hover:opacity-100 blur-lg transition duration-500"></div>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border-2 border-gray-100 group`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span
                      className="text-white px-6 py-2 rounded-full text-sm font-semibold animate-bounce"
                      style={{ backgroundColor: '#2A8B8A' }}
                    >
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="p-6 sm:p-8">
                  <div className="text-center mb-4 sm:mb-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${pricingData[activeTab as keyof typeof pricingData].color} mb-3 sm:mb-4`}>
                      <i className={`${pricingData[activeTab as keyof typeof pricingData].icon} text-xl sm:text-2xl text-white`}></i>
                    </div>
                    <h4 className="text-lg sm:text-2xl font-bold text-black mb-1 sm:mb-2">{plan.name}</h4>
                    <div className="flex items-center justify-center mb-1 sm:mb-2">
                      <span className="text-2xl sm:text-4xl font-bold text-black">
                        {formatPrice(plan.price)}
                        {activeTab === 'Website Enhancement & Rebuild' && '+'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2 sm:mb-4 text-sm sm:text-base">{plan.description}</p>
                    {plan.tooltip && (
                      <div
                        className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
                        style={{ backgroundColor: '#e6f6f6', color: '#2A8B8A' }}
                      >
                        <i className="ri-information-line mr-1"></i>
                        {plan.tooltip}
                      </div>
                    )}
                  </div>
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm sm:text-base">
                        <i className="ri-check-line mr-2 sm:mr-3" style={{ color: '#2A8B8A' }}></i>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleGetQuote(activeTab)}
                    className="w-full text-white py-3 sm:py-4 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-sm sm:text-base"
                    style={{ backgroundColor: '#2A8B8A' }}
                  >
                    Get Quote
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Trusted by 100+ startups and businesses across India</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 opacity-60">
            <div className="bg-gray-50 px-4 sm:px-6 py-2 sm:py-3 rounded-lg">
              <span className="font-semibold text-black text-xs sm:text-base">7 Day Delivery</span>
            </div>
            <div className="bg-gray-50 px-4 sm:px-6 py-2 sm:py-3 rounded-lg">
              <span className="font-semibold text-black text-xs sm:text-base">24/7 Support</span>
            </div>
            <div className="bg-gray-50 px-4 sm:px-6 py-2 sm:py-3 rounded-lg">
              <span className="font-semibold text-black text-xs sm:text-base">Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      <QuoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        selectedService={selectedService}
      />
    </section>
  );
}
