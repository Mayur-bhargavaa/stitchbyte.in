'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ProjectsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const projects = [
    {
      id: 1,
      title: 'EcoTech Solutions',
      description: 'Sustainable technology marketplace with advanced product filtering and eco-friendly shipping options',
      image: 'https://readdy.ai/api/search-image?query=modern%20ecommerce%20website%20sustainable%20technology%20products%20green%20clean%20interface%20minimalist%20design%20professional%20layout&width=600&height=400&seq=project-detail-1&orientation=landscape',
      tech: ['WordPress', 'WooCommerce', 'Custom Plugin'],
      category: 'WordPress',
      logo: 'https://readdy.ai/api/search-image?query=modern%20company%20logo%20eco%20tech%20green%20leaf%20symbol%20minimalist%20design%20professional%20branding&width=80&height=80&seq=logo-detail-1&orientation=squarish',
      caseStudy: true,
      deliveryTime: '5 days',
      client: 'EcoTech Solutions',
      features: ['Product Catalog', 'Payment Gateway', 'Inventory Management', 'Customer Reviews']
    },
    {
      id: 2,
      title: 'FitTrack Pro',
      description: 'Comprehensive fitness tracking web application with real-time analytics and progress monitoring',
      image: 'https://readdy.ai/api/search-image?query=fitness%20tracking%20dashboard%20web%20app%20modern%20interface%20charts%20analytics%20health%20metrics%20clean%20design&width=600&height=400&seq=project-detail-2&orientation=landscape',
      tech: ['Custom Code', 'React', 'Node.js', 'MongoDB'],
      category: 'Custom Code',
      logo: 'https://readdy.ai/api/search-image?query=fitness%20app%20logo%20dumbbell%20symbol%20modern%20minimalist%20design%20professional%20branding&width=80&height=80&seq=logo-detail-2&orientation=squarish',
      caseStudy: true,
      deliveryTime: '12 days',
      client: 'FitTrack Pro',
      features: ['User Dashboard', 'Progress Tracking', 'Workout Plans', 'Social Features']
    },
    {
      id: 3,
      title: 'StyleHub Boutique',
      description: 'Premium fashion ecommerce store with custom theme and advanced product visualization',
      image: 'https://readdy.ai/api/search-image?query=fashion%20ecommerce%20website%20elegant%20clothing%20store%20modern%20design%20product%20showcase%20clean%20interface&width=600&height=400&seq=project-detail-3&orientation=landscape',
      tech: ['Shopify', 'Custom Theme', 'Liquid'],
      category: 'Shopify',
      logo: 'https://readdy.ai/api/search-image?query=fashion%20boutique%20logo%20elegant%20script%20font%20minimalist%20design%20professional%20branding&width=80&height=80&seq=logo-detail-3&orientation=squarish',
      caseStudy: false,
      deliveryTime: '4 days',
      client: 'StyleHub Boutique',
      features: ['Product Variants', 'Size Guide', 'Wishlist', 'Quick View']
    },
    {
      id: 4,
      title: 'TechFlow CRM',
      description: 'Enterprise-grade customer relationship management system with advanced automation',
      image: 'https://readdy.ai/api/search-image?query=crm%20dashboard%20interface%20modern%20business%20application%20clean%20design%20data%20visualization%20professional%20layout&width=600&height=400&seq=project-detail-4&orientation=landscape',
      tech: ['Custom Code', 'Node.js', 'PostgreSQL', 'Redis'],
      category: 'Custom Code',
      logo: 'https://readdy.ai/api/search-image?query=tech%20company%20logo%20abstract%20geometric%20symbol%20modern%20minimalist%20design%20professional%20branding&width=80&height=80&seq=logo-detail-4&orientation=squarish',
      caseStudy: true,
      deliveryTime: '18 days',
      client: 'TechFlow Inc',
      features: ['Lead Management', 'Sales Pipeline', 'Email Automation', 'Reports & Analytics']
    },
    {
      id: 5,
      title: 'FoodieExpress',
      description: 'Complete food delivery platform with real-time order tracking and multiple payment options',
      image: 'https://readdy.ai/api/search-image?query=food%20delivery%20app%20interface%20modern%20design%20restaurant%20listings%20clean%20layout%20professional%20mobile%20first&width=600&height=400&seq=project-detail-5&orientation=landscape',
      tech: ['WordPress', 'Custom Plugin', 'WooCommerce'],
      category: 'WordPress',
      logo: 'https://readdy.ai/api/search-image?query=food%20delivery%20logo%20chef%20hat%20symbol%20modern%20minimalist%20design%20professional%20branding&width=80&height=80&seq=logo-detail-5&orientation=squarish',
      caseStudy: false,
      deliveryTime: '8 days',
      client: 'FoodieExpress',
      features: ['Restaurant Listings', 'Order Tracking', 'Multiple Payments', 'Reviews System']
    },
    {
      id: 6,
      title: 'LearnSpace Academy',
      description: 'Advanced online learning management system with interactive courses and progress tracking',
      image: 'https://readdy.ai/api/search-image?query=online%20learning%20platform%20interface%20modern%20education%20website%20clean%20design%20course%20layout%20professional&width=600&height=400&seq=project-detail-6&orientation=landscape',
      tech: ['Custom Code', 'LMS', 'React', 'Express'],
      category: 'Custom Code',
      logo: 'https://readdy.ai/api/search-image?query=education%20logo%20book%20graduation%20cap%20symbol%20modern%20minimalist%20design%20professional%20branding&width=80&height=80&seq=logo-detail-6&orientation=squarish',
      caseStudy: true,
      deliveryTime: '15 days',
      client: 'LearnSpace Academy',
      features: ['Course Management', 'Video Streaming', 'Quizzes & Tests', 'Certificates']
    },
    {
      id: 7,
      title: 'FinanceFlow',
      description: 'Personal finance management application with budgeting tools and expense tracking',
      image: 'https://readdy.ai/api/search-image?query=finance%20dashboard%20interface%20modern%20banking%20app%20clean%20design%20charts%20analytics%20professional%20layout&width=600&height=400&seq=project-detail-7&orientation=landscape',
      tech: ['Custom Code', 'React', 'Chart.js', 'Firebase'],
      category: 'Custom Code',
      logo: 'https://readdy.ai/api/search-image?query=finance%20app%20logo%20money%20graph%20symbol%20modern%20minimalist%20design%20professional%20branding&width=80&height=80&seq=logo-detail-7&orientation=squarish',
      caseStudy: false,
      deliveryTime: '10 days',
      client: 'FinanceFlow',
      features: ['Budget Planning', 'Expense Tracking', 'Investment Monitor', 'Financial Reports']
    },
    {
      id: 8,
      title: 'GreenGarden Store',
      description: 'Specialized plant and gardening ecommerce with care guides and delivery tracking',
      image: 'https://readdy.ai/api/search-image?query=gardening%20ecommerce%20website%20plant%20store%20modern%20design%20product%20showcase%20green%20theme%20clean%20interface&width=600&height=400&seq=project-detail-8&orientation=landscape',
      tech: ['Shopify', 'Apps', 'Custom Sections'],
      category: 'Shopify',
      logo: 'https://readdy.ai/api/search-image?query=gardening%20store%20logo%20plant%20leaf%20symbol%20modern%20minimalist%20design%20professional%20branding&width=80&height=80&seq=logo-detail-8&orientation=squarish',
      caseStudy: true,
      deliveryTime: '6 days',
      client: 'GreenGarden Store',
      features: ['Plant Care Guides', 'Delivery Tracking', 'Care Reminders', 'Expert Consultation']
    },
    {
      id: 9,
      title: 'PhotoStudio Pro',
      description: 'Professional photography portfolio with booking system and client galleries',
      image: 'https://readdy.ai/api/search-image?query=photography%20portfolio%20website%20modern%20design%20image%20gallery%20clean%20layout%20professional%20photographer%20showcase&width=600&height=400&seq=project-detail-9&orientation=landscape',
      tech: ['WordPress', 'Custom Theme', 'Booking System'],
      category: 'WordPress',
      logo: 'https://readdy.ai/api/search-image?query=photography%20logo%20camera%20lens%20symbol%20modern%20minimalist%20design%20professional%20branding&width=80&height=80&seq=logo-detail-9&orientation=squarish',
      caseStudy: false,
      deliveryTime: '7 days',
      client: 'PhotoStudio Pro',
      features: ['Portfolio Gallery', 'Booking System', 'Client Login', 'Payment Integration']
    },
    {
      id: 10,
      title: 'TaskMaster SaaS',
      description: 'Project management SaaS platform with team collaboration and time tracking features',
      image: 'https://readdy.ai/api/search-image?query=project%20management%20dashboard%20saas%20application%20modern%20interface%20task%20boards%20clean%20design%20team%20collaboration&width=600&height=400&seq=project-detail-10&orientation=landscape',
      tech: ['Custom Code', 'React', 'Node.js', 'WebSocket'],
      category: 'Custom Code',
      logo: 'https://readdy.ai/api/search-image?query=project%20management%20logo%20checkmark%20task%20symbol%20modern%20minimalist%20design%20professional%20branding&width=80&height=80&seq=logo-detail-10&orientation=squarish',
      caseStudy: true,
      deliveryTime: '20 days',
      client: 'TaskMaster SaaS',
      features: ['Task Management', 'Team Collaboration', 'Time Tracking', 'Project Reports']
    },
    {
      id: 11,
      title: 'MediCare Clinic',
      description: 'Healthcare clinic website with appointment booking and patient portal',
      image: 'https://readdy.ai/api/search-image?query=healthcare%20clinic%20website%20modern%20design%20medical%20services%20clean%20interface%20professional%20layout&width=600&height=400&seq=project-detail-11&orientation=landscape',
      tech: ['WordPress', 'Booking Plugin', 'Custom Forms'],
      category: 'WordPress',
      logo: 'https://readdy.ai/api/search-image?query=medical%20clinic%20logo%20cross%20heart%20symbol%20modern%20minimalist%20design%20professional%20branding&width=80&height=80&seq=logo-detail-11&orientation=squarish',
      caseStudy: false,
      deliveryTime: '9 days',
      client: 'MediCare Clinic',
      features: ['Appointment Booking', 'Patient Portal', 'Service Listings', 'Contact Forms']
    },
    {
      id: 12,
      title: 'ArtisanCraft Market',
      description: 'Handmade crafts marketplace with vendor management and custom product options',
      image: 'https://readdy.ai/api/search-image?query=handmade%20crafts%20marketplace%20website%20artisan%20products%20modern%20design%20clean%20interface%20professional%20layout&width=600&height=400&seq=project-detail-12&orientation=landscape',
      tech: ['Shopify', 'Multi-vendor', 'Custom Apps'],
      category: 'Shopify',
      logo: 'https://readdy.ai/api/search-image?query=artisan%20craft%20logo%20handmade%20symbol%20modern%20minimalist%20design%20professional%20branding&width=80&height=80&seq=logo-detail-12&orientation=squarish',
      caseStudy: true,
      deliveryTime: '11 days',
      client: 'ArtisanCraft Market',
      features: ['Vendor Dashboard', 'Custom Products', 'Commission System', 'Quality Reviews']
    }
  ];

  const categories = ['All', 'WordPress', 'Shopify', 'Custom Code'];

  const filteredProjects = selectedFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedFilter);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Header with spacing for fixed header */}
      <div className="pt-16 bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Our Project Portfolio
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our complete collection of successful projects. From startups to established businesses, 
              see how we've helped transform ideas into digital reality.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white py-8 sticky top-16 z-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="bg-gray-100 p-1 rounded-full">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedFilter(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    selectedFilter === category
                      ? 'bg-white text-black shadow-lg'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover object-top"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.deliveryTime}
                    </span>
                    {project.caseStudy && (
                      <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Case Study
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={project.logo} 
                      alt={`${project.title} logo`}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-black">{project.title}</h3>
                      <p className="text-sm text-gray-500">{project.client}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-black mb-2 text-sm">Key Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {project.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <i className="ri-check-line text-emerald-500 mr-2 text-xs"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button className="text-emerald-500 hover:text-emerald-600 font-medium text-sm cursor-pointer">
                      View Details
                    </button>
                    <div className="flex items-center gap-2">
                      <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
                        <i className="ri-external-link-line"></i>
                      </button>
                      {project.caseStudy && (
                        <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
                          <i className="ri-file-text-line"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto mb-8">
            Join our growing list of satisfied clients. Let's build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/#contact"
              className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              Get Started Today
            </Link>
            <Link 
              href="/#pricing"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-emerald-600 transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}