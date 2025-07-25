'use client';

import { useState } from 'react';
import Header from '../../components/Header';

const posts = [
	{
		id: 1,
		title: 'How to Launch Your Startup Website in 7 Days',
		excerpt: 'A step-by-step guide to getting your MVP online fast, with tips for design, development, and launch.',
		content: `Launching your startup website quickly is crucial. In this guide, we cover everything from planning, design, development, to launch. 
1. Define your MVP features.
2. Choose the right tech stack.
3. Design with your audience in mind.
4. Develop fast, iterate faster.
5. Test, deploy, and get feedback.
With the right team and tools, you can go live in just 7 days!`,
		author: 'Mayur Bhargava',
		date: '2025-07-24',
		image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
		tags: ['Startup', 'Web Development'],
	},
	{
		id: 2,
		title: 'WordPress vs Shopify vs Custom Code: What Should You Choose?',
		excerpt: 'We break down the pros and cons of each platform for startups and small businesses.',
		content: `Choosing the right platform depends on your needs:
- WordPress: Great for content-heavy sites, blogs, and flexibility.
- Shopify: Best for ecommerce, easy setup, secure payments.
- Custom Code: Maximum flexibility, scalability, and unique features.
Consider your budget, timeline, and long-term goals before deciding.`,
		author: 'Priya Sharma',
		date: '2025-07-20',
		image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
		tags: ['Platforms', 'Ecommerce'],
	},
	{
		id: 3,
		title: 'Top 10 Mistakes Founders Make With Their First Website',
		excerpt: 'Avoid these common pitfalls and set your startup up for digital success from day one.',
		content: `Common mistakes include:
1. Not defining clear goals.
2. Ignoring mobile users.
3. Poor SEO setup.
4. Overcomplicating design.
5. Not tracking analytics.
6. Skipping user testing.
7. Weak CTAs.
8. Slow load times.
9. No backup plan.
10. Not planning for growth.
Avoid these to set your startup up for success!`,
		author: 'Rajesh Kumar',
		date: '2025-07-15',
		image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
		tags: ['Advice', 'Founders'],
	},
	{
		id: 4,
		title: 'SEO Basics for Startup Websites',
		excerpt: 'Simple, actionable SEO tips to help your new website get discovered on Google.',
		content: `SEO tips for startups:
- Use relevant keywords in your content.
- Optimize meta tags and descriptions.
- Make sure your site is mobile-friendly.
- Improve page speed.
- Build quality backlinks.
- Submit your sitemap to Google Search Console.
Start with these basics to boost your visibility!`,
		author: 'Sneha Reddy',
		date: '2025-07-10',
		image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
		tags: ['SEO', 'Marketing'],
	},
	{
		id: 5,
		title: 'How to Choose a Domain Name for Your Startup',
		excerpt: 'Tips for picking a memorable, brandable, and SEO-friendly domain name.',
		content: `Your domain name is your digital address. Tips:
- Keep it short and memorable.
- Avoid hyphens and numbers.
- Use keywords if possible.
- Check for trademarks.
- Choose the right extension (.com, .io, etc.).
A great domain sets the tone for your brand!`,
		author: 'Amit Verma',
		date: '2025-07-05',
		image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?auto=format&fit=crop&w=600&q=80',
		tags: ['Branding', 'Startup'],
	},
	{
		id: 6,
		title: 'Why Mobile-First Design Matters in 2025',
		excerpt: 'Mobile traffic dominates the web. Here’s why your site must be mobile-first.',
		content: `More than 60% of web traffic is mobile. Mobile-first design ensures:
- Better user experience.
- Higher Google rankings.
- Faster load times.
- Increased conversions.
Always design for mobile before desktop!`,
		author: 'Priya Sharma',
		date: '2025-06-28',
		image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
		tags: ['Mobile', 'UX'],
	},
	{
		id: 7,
		title: 'The Power of Landing Pages for Startups',
		excerpt: 'How focused landing pages can boost your conversions and validate ideas.',
		content: `Landing pages help you:
- Test ideas quickly.
- Capture leads.
- Focus user attention.
- Run A/B tests.
- Measure campaign success.
Every startup should use landing pages for growth!`,
		author: 'Rajesh Kumar',
		date: '2025-06-20',
		image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
		tags: ['Growth', 'Marketing'],
	},
	{
		id: 8,
		title: 'How to Write Copy That Converts',
		excerpt: 'Copywriting secrets for higher engagement and sales.',
		content: `Good copywriting:
- Focuses on benefits, not features.
- Uses clear CTAs.
- Builds trust.
- Addresses pain points.
- Is concise and scannable.
Great copy can double your conversions!`,
		author: 'Sneha Reddy',
		date: '2025-06-15',
		image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
		tags: ['Copywriting', 'Sales'],
	},
	{
		id: 9,
		title: 'Understanding Google Analytics for Beginners',
		excerpt: 'A simple guide to tracking your website’s performance.',
		content: `Google Analytics helps you:
- Track visitors and sources.
- Measure conversions.
- Identify top content.
- Spot issues early.
- Make data-driven decisions.
Install it from day one!`,
		author: 'Amit Verma',
		date: '2025-06-10',
		image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
		tags: ['Analytics', 'Tools'],
	},
	{
		id: 10,
		title: 'How to Collect and Use Customer Feedback',
		excerpt: 'Feedback is gold for startups. Here’s how to get and use it.',
		content: `Customer feedback:
- Reveals pain points.
- Inspires new features.
- Builds loyalty.
- Validates your roadmap.
- Helps you grow faster.
Ask for feedback early and often!`,
		author: 'Mayur Bhargava',
		date: '2025-06-01',
		image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?auto=format&fit=crop&w=600&q=80',
		tags: ['Feedback', 'Product'],
	},
	{
		id: 11,
		title: 'The Importance of Website Speed',
		excerpt: 'Why a fast website is critical for SEO and user experience.',
		content: `A slow website:
- Hurts SEO.
- Increases bounce rates.
- Lowers conversions.
- Frustrates users.
Use tools like Google PageSpeed Insights to optimize your site!`,
		author: 'Priya Sharma',
		date: '2025-05-25',
		image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
		tags: ['Performance', 'SEO'],
	},
	{
		id: 12,
		title: 'Building Trust With Your Website',
		excerpt: 'Trust signals that make visitors feel safe and ready to buy.',
		content: `To build trust:
- Use SSL (https).
- Show testimonials.
- Add clear contact info.
- Display certifications.
- Be transparent about pricing.
Trust is the foundation of online business!`,
		author: 'Sneha Reddy',
		date: '2025-05-18',
		image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
		tags: ['Trust', 'Conversion'],
	},
	{
		id: 13,
		title: 'How to Plan Your Website Content',
		excerpt: 'A content plan saves time and boosts SEO.',
		content: `Content planning:
- Define your audience.
- Map out key pages.
- Use keyword research.
- Plan a blog calendar.
- Reuse and repurpose content.
A plan keeps your site fresh and relevant!`,
		author: 'Amit Verma',
		date: '2025-05-10',
		image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
		tags: ['Content', 'Planning'],
	},
	{
		id: 14,
		title: 'What is a Minimum Viable Product (MVP)?',
		excerpt: 'Why MVPs are the best way to launch and learn fast.',
		content: `An MVP:
- Is the simplest version of your product.
- Lets you test ideas quickly.
- Reduces risk and cost.
- Gets real user feedback.
- Helps you iterate fast.
Start small, learn, and grow!`,
		author: 'Rajesh Kumar',
		date: '2025-05-01',
		image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
		tags: ['MVP', 'Startup'],
	},
	{
		id: 15,
		title: 'How to Use Social Proof on Your Website',
		excerpt: 'Social proof builds credibility and boosts conversions.',
		content: `Social proof includes:
- Testimonials and reviews.
- Client logos.
- Case studies.
- Social media mentions.
- User counts and stats.
Show proof to win trust and sales!`,
		author: 'Sneha Reddy',
		date: '2025-04-25',
		image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?auto=format&fit=crop&w=600&q=80',
		tags: ['Social Proof', 'Marketing'],
	},
];

function formatDate(dateStr: string) {
	return new Date(dateStr).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
}

export default function BlogPage() {
	const [openPost, setOpenPost] = useState<null | typeof posts[0]>(null);

	return (
		<>
			<Header />
			<main className="max-w-5xl mx-auto py-20 px-4">
				<div className="flex flex-col items-center mb-12">
					<h1 className="text-5xl font-extrabold mb-2 text-center">Blog</h1>
					<p className="text-xl text-gray-500 text-center">
						Insights, tips, and guides for startups, founders, and digital
						entrepreneurs.
					</p>
				</div>
				<div className="grid md:grid-cols-2 gap-10">
					{posts.map((post) => (
						<article
							key={post.id}
							className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
						>
							<img
								src={post.image}
								alt={post.title}
								className="w-full h-56 object-cover"
							/>
							<div className="p-6 flex flex-col flex-1">
								<div className="flex flex-wrap gap-2 mb-2">
									{post.tags.map((tag) => (
										<span
											key={tag}
											className="bg-[#e6f6f6] text-[#2A8B8A] px-3 py-1 rounded-full text-xs font-semibold"
										>
											{tag}
										</span>
									))}
								</div>
								<h2 className="text-2xl font-bold mb-2">{post.title}</h2>
								<p className="text-gray-600 mb-4 flex-1">{post.excerpt}</p>
								<div className="flex items-center justify-between mt-auto">
									<div className="flex items-center space-x-2">
										<span className="text-sm text-gray-500">
											By {post.author}
										</span>
										<span className="text-gray-300">•</span>
										<span className="text-sm text-gray-400">
											{formatDate(post.date)}
										</span>
									</div>
									<button
										className="text-[#2A8B8A] font-semibold hover:underline transition"
										onClick={() => setOpenPost(post)}
									>
										Read More &rarr;
									</button>
								</div>
							</div>
						</article>
					))}
				</div>

				{/* Blog Modal */}
				{openPost && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
						<div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 relative animate-fade-in">
							<button
								className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-[#2A8B8A] transition"
								onClick={() => setOpenPost(null)}
								aria-label="Close"
							>
								×
							</button>
							<img
								src={openPost.image}
								alt={openPost.title}
								className="w-full h-64 object-cover rounded-t-2xl"
							/>
							<div className="p-8">
								<div className="flex flex-wrap gap-2 mb-3">
									{openPost.tags.map((tag) => (
										<span
											key={tag}
											className="bg-[#e6f6f6] text-[#2A8B8A] px-3 py-1 rounded-full text-xs font-semibold"
										>
											{tag}
										</span>
									))}
								</div>
								<h2 className="text-3xl font-bold mb-2">{openPost.title}</h2>
								<div className="flex items-center space-x-2 mb-4">
									<span className="text-sm text-gray-500">
										By {openPost.author}
									</span>
									<span className="text-gray-300">•</span>
									<span className="text-sm text-gray-400">
										{formatDate(openPost.date)}
									</span>
								</div>
								<p className="text-gray-700 whitespace-pre-line mb-4">
									{openPost.content}
								</p>
								<button
									className="mt-2 px-6 py-2 rounded-lg bg-[#2A8B8A] text-white font-semibold hover:opacity-90 transition"
									onClick={() => setOpenPost(null)}
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