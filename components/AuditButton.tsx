'use client';

import { useState } from 'react';
import AuditModal from './AuditModal';

export default function AuditButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="fixed z-50 bottom-6 right-6 text-white px-6 py-3 rounded-full shadow-lg font-semibold text-base transition-all duration-300"
        style={{ backgroundColor: '#2A8B8A' }}
        onClick={() => setOpen(true)}
      >
        Get Free Website Audit
      </button>
      <AuditModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}