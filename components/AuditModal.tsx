'use client';

import { useState } from 'react';

export default function AuditModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [form, setForm] = useState({
    name: '',
    website: '',
    category: '',
    company: '',
    email: '',
    phone: '',
    location: '',
    traffic: '',
    goal: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    try {
      const res = await fetch('https://api.stitchbyte.in/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setSuccess(true);
      setForm({
        name: '',
        website: '',
        category: '',
        company: '',
        email: '',
        phone: '',
        location: '',
        traffic: '',
        goal: '',
        notes: '',
      });
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      alert('There was an error submitting your audit request. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-emerald-100/80 via-white/80 to-emerald-200/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg mx-auto rounded-2xl shadow-2xl border border-emerald-100 bg-white p-8 animate-fade-in"
        style={{ maxHeight: '90vh' }}
      >
        <button
          className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-emerald-500 transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-extrabold text-emerald-700 mb-2 text-center tracking-tight">
          Get <span className="bg-emerald-100 px-2 rounded">Free Website Audit</span>
        </h2>
        <p className="text-gray-500 text-center mb-6">Fill out the form below and our experts will review your website for free!</p>
        <form
          className="space-y-4 overflow-y-auto"
          style={{ maxHeight: '60vh' }}
          onSubmit={handleSubmit}
        >
          <input className="w-full border border-emerald-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <input className="w-full border border-emerald-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" placeholder="Website Link" value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} />
          <input className="w-full border border-emerald-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" placeholder="Category (e.g. Ecommerce, Blog, Portfolio)" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
          <input className="w-full border border-emerald-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" placeholder="Company Name" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
          <input className="w-full border border-emerald-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" placeholder="Email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          <input className="w-full border border-emerald-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" placeholder="Phone Number" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
          <input className="w-full border border-emerald-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" placeholder="Business Location" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
          <input className="w-full border border-emerald-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" placeholder="Monthly Traffic (estimate)" value={form.traffic} onChange={e => setForm(f => ({ ...f, traffic: e.target.value }))} />
          <input className="w-full border border-emerald-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" placeholder="Main Goal for Audit (e.g. SEO, Speed, UX)" value={form.goal} onChange={e => setForm(f => ({ ...f, goal: e.target.value }))} />
          <textarea className="w-full border border-emerald-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition resize-none" rows={3} placeholder="Additional Notes (optional)" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
          <button
            type="submit"
            style={{ backgroundColor: '#2A8B8A' }}
            className="w-full text-white py-2 rounded-lg font-bold text-lg shadow-md transition-all duration-200 hover:brightness-110"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
          {success && (
            <div className="text-center text-emerald-600 font-semibold mt-2">
              Thank you! Your request has been submitted.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}