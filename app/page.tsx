'use client';

import Header from '../components/Header';
import Hero from '../components/Hero';
import ProjectShowcase from '../components/ProjectShowcase';
import PricingSection from '../components/PricingSection';
import TestimonialsSection from '../components/TestimonialsSection';
import WhyChooseUs from '../components/WhyChooseUs';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ProjectShowcase />
      <PricingSection />
      <TestimonialsSection />
      <WhyChooseUs />
      <ContactSection />
      <Footer />
    </div>
  );
}