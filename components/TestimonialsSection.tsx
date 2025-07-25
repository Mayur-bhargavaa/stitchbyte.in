'use client';

import { useState } from 'react';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      title: 'Founder & CEO',
      company: 'TechStart Solutions',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20businessman%20ceo%20founder%20portrait%20confident%20smile%20modern%20office%20background&width=80&height=80&seq=testimonial-1&orientation=squarish',
      logo: 'https://readdy.ai/api/search-image?query=tech%20startup%20company%20logo%20modern%20minimalist%20design%20professional%20branding%20symbol&width=60&height=40&seq=company-1&orientation=landscape',
      content: 'Stitchbyte delivered our MVP in just 5 days! Their technical expertise and attention to detail exceeded our expectations. The team understood our vision perfectly and brought it to life.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      title: 'Co-founder',
      company: 'StyleHub Boutique',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20businesswoman%20entrepreneur%20portrait%20confident%20smile%20modern%20office%20background&width=80&height=80&seq=testimonial-2&orientation=squarish',
      logo: 'https://readdy.ai/api/search-image?query=fashion%20boutique%20company%20logo%20elegant%20design%20professional%20branding%20symbol&width=60&height=40&seq=company-2&orientation=landscape',
      content: 'Our Shopify store conversion rate increased by 40% after Stitchbyte\'s optimization. They not only built a beautiful store but also helped us with marketing strategies. Highly recommended!',
      rating: 5
    },
    {
      name: 'Ankit Patel',
      title: 'CTO',
      company: 'FinanceFlow App',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20tech%20cto%20portrait%20confident%20smile%20modern%20office%20background&width=80&height=80&seq=testimonial-3&orientation=squarish',
      logo: 'https://readdy.ai/api/search-image?query=finance%20app%20company%20logo%20modern%20minimalist%20design%20professional%20branding%20symbol&width=60&height=40&seq=company-3&orientation=landscape',
      content: 'The full-stack SaaS solution they built handles 10k+ users seamlessly. Professional team with excellent communication throughout the project. Worth every penny!',
      rating: 5
    },
    {
      name: 'Sneha Reddy',
      title: 'Founder',
      company: 'EcoTech Solutions',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20businesswoman%20founder%20portrait%20confident%20smile%20modern%20office%20background&width=80&height=80&seq=testimonial-4&orientation=squarish',
      logo: 'https://readdy.ai/api/search-image?query=eco%20tech%20company%20logo%20green%20sustainable%20design%20professional%20branding%20symbol&width=60&height=40&seq=company-4&orientation=landscape',
      content: 'Working with Stitchbyte was a game-changer for our startup. They delivered a WordPress site that perfectly captured our brand values and converted visitors into customers.',
      rating: 5
    },
    {
      name: 'Vikram Singh',
      title: 'CEO',
      company: 'FoodieExpress',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20businessman%20ceo%20portrait%20confident%20smile%20modern%20office%20background&width=80&height=80&seq=testimonial-5&orientation=squarish',
      logo: 'https://readdy.ai/api/search-image?query=food%20delivery%20company%20logo%20modern%20minimalist%20design%20professional%20branding%20symbol&width=60&height=40&seq=company-5&orientation=landscape',
      content: 'Fast delivery, excellent quality, and ongoing support. Stitchbyte helped us launch our food delivery platform in record time. Their expertise in startup needs is unmatched.',
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what founders and entrepreneurs say about working with Stitchbyte.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-yellow-400 text-2xl"></i>
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl text-gray-700 italic leading-relaxed">
                "{testimonials[activeIndex].content}"
              </blockquote>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <img
                src={testimonials[activeIndex].image}
                alt={testimonials[activeIndex].name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-left">
                <h4 className="font-bold text-black text-lg">{testimonials[activeIndex].name}</h4>
                <p className="text-gray-600">{testimonials[activeIndex].title}</p>
                <div className="flex items-center mt-1">
                  <img
                    src={testimonials[activeIndex].logo}
                    alt={testimonials[activeIndex].company}
                    className="h-6 mr-2"
                  />
                  <span className="text-sm text-[#2A8B8A]">{testimonials[activeIndex].company}</span>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              <i className="ri-arrow-left-line text-xl" style={{ color: '#2A8B8A' }}></i>
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              <i className="ri-arrow-right-line text-xl" style={{ color: '#2A8B8A' }}></i>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  index === activeIndex ? 'bg-[#2A8B8A]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Grid View for larger screens */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 mt-16">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-yellow-400 text-lg"></i>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.content.substring(0, 100)}..."</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <p className="font-semibold text-black">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                  <p className="text-sm text-[#2A8B8A]">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}