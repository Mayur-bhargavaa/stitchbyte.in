'use client';

import { useState } from 'react';
import Header from '../../components/Header';

export default function SupportPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the form data to your backend or support system
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto py-20 px-4">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-5xl font-extrabold mb-2 text-center">Support</h1>
          <p className="text-xl text-gray-500 text-center">
            Need help? Reach out to our team and we’ll get back to you as soon as possible.
          </p>
        </div>
        {submitted ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold mb-2 text-[#2A8B8A]">Thank you!</h2>
            <p className="text-gray-700">Your support request has been received. We’ll get back to you soon.</p>
          </div>
        ) : (
          <form
            className="bg-white rounded-xl shadow-md p-8 space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A8B8A] outline-none"
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A8B8A] outline-none"
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="subject">
                Subject
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A8B8A] outline-none"
                type="text"
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A8B8A] outline-none"
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#2A8B8A] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
            >
              Submit
            </button>
          </form>
        )}
      </main>
    </>
  );
}