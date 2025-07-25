'use client';

import { useState } from 'react';
import Header from '../../components/Header';

const faqs = [
	{
		question: 'What services does Stitchbyte offer?',
		answer: 'We offer web development, mobile app development, UI/UX design, e-commerce solutions, SEO, and ongoing support for startups and businesses.',
	},
	{
		question: 'How fast can you deliver my project?',
		answer: 'Most MVPs and websites are delivered within 7 days, depending on complexity. We pride ourselves on rapid delivery without sacrificing quality.',
	},
	{
		question: 'What technologies do you use?',
		answer: 'We use modern technologies like React, Next.js, Node.js, Shopify, WordPress, MongoDB, and more, depending on your project needs.',
	},
	{
		question: 'Do you provide post-launch support?',
		answer: 'Yes! We offer ongoing support, maintenance, and updates to ensure your product runs smoothly after launch.',
	},
	{
		question: 'How do I get a quote?',
		answer: 'Click the "Get Free Quote" button anywhere on our site, fill out the form, and our team will get back to you within 24 hours.',
	},
	{
		question: 'Can you help with SEO and marketing?',
		answer: 'Absolutely. All our websites are SEO-ready, and we offer digital marketing guidance to help you grow your business.',
	},
	{
		question: 'Is my data and idea safe with you?',
		answer: 'Yes, we treat your data and ideas with strict confidentiality. NDAs are available upon request.',
	},
	{
		question: 'Can you redesign my existing website?',
		answer: 'Yes, we specialize in redesigning and optimizing existing websites for better performance, UX, and conversions.',
	},
	{
		question: 'Do you work with international clients?',
		answer: 'Yes, we work with startups and businesses worldwide. Our team is experienced in remote collaboration and communication.',
	},
	{
		question: 'What is your payment structure?',
		answer: 'We offer flexible payment options, including milestone-based payments and pay-as-you-go for ongoing work.',
	},
	{
		question: 'Will my website be mobile-friendly?',
		answer: 'Definitely! Every project we deliver is mobile-first and fully responsive across all devices.',
	},
	{
		question: 'Can you integrate third-party APIs?',
		answer: 'Yes, we have experience integrating a wide range of APIs, including payment gateways, CRMs, analytics, and more.',
	},
	{
		question: 'How do you ensure project quality?',
		answer: 'We follow best practices, conduct thorough testing, and keep you updated throughout the project to ensure top quality.',
	},
	{
		question: 'What if I need urgent changes after launch?',
		answer: 'We offer fast turnaround for urgent updates and support requests, so your business never misses a beat.',
	},
];

export default function FAQPage() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<>
			<Header />
			<main className="max-w-3xl mx-auto py-20 px-4">
				<div className="flex flex-col items-center mb-12">
					<h1 className="text-5xl font-extrabold mb-2 text-center">
						Frequently Asked Questions
					</h1>
					<p className="text-xl text-gray-500 text-center">
						Everything you need to know about working with Stitchbyte.
					</p>
				</div>
				<div className="space-y-6">
					{faqs.map((faq, idx) => (
						<div
							key={faq.question}
							className="bg-white rounded-xl shadow-md transition-all"
						>
							<button
								className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
								onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
								aria-expanded={openIndex === idx}
								aria-controls={`faq-answer-${idx}`}
							>
								<span className="text-lg font-semibold text-black">
									{faq.question}
								</span>
								<span
									className={`ml-4 text-2xl transition-transform ${
										openIndex === idx
											? 'rotate-45 text-[#2A8B8A]'
											: 'rotate-0 text-gray-400'
									}`}
								>
									+
								</span>
							</button>
							{openIndex === idx && (
								<div
									id={`faq-answer-${idx}`}
									className="px-6 pb-5 text-gray-700 text-base animate-fade-in"
								>
									{faq.answer}
								</div>
							)}
						</div>
					))}
				</div>
			</main>
		</>
	);
}