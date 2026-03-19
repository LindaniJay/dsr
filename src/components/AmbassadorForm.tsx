
"use client";
import React, { useState } from 'react';

interface AmbassadorFormProps {
  onSubmit: (data: { name: string; email: string; motivation: string }) => void;
}

const AmbassadorForm: React.FC<AmbassadorFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [motivation, setMotivation] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, motivation });
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setName('');
    setEmail('');
    setMotivation('');
  };

  return (
    <form className="panel mx-auto flex w-full max-w-3xl flex-col gap-5 p-6 md:p-8 rise transition-shadow duration-300 hover:shadow-2xl" onSubmit={handleSubmit}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.11em] text-[#5f7695]">Application Form</p>
        <h3
          className="mt-2 text-2xl font-bold text-[#121522] md:text-3xl tracking-tight"
          style={{ fontFamily: 'var(--font-space), sans-serif' }}
        >
          Ambassador Application
        </h3>
        <p className="mt-1 text-sm text-muted">
          Tell us about your motivation and how you want to live a true IGHOST life as a brand ambassador.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full rounded-2xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#2e4f7a] focus:ring-2 focus:ring-[#caa86a] transition"
          required
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full rounded-2xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#2e4f7a] focus:ring-2 focus:ring-[#caa86a] transition"
          required
        />
      </div>

      <textarea
        placeholder="Why do you want to become an IGHOST ambassador and represent the brand?"
        value={motivation}
        onChange={e => setMotivation(e.target.value)}
        className="min-h-32 w-full rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#2e4f7a] focus:ring-2 focus:ring-[#caa86a] transition"
        required
        aria-label="Motivation"
      />

      <button
        type="submit"
        className="rounded-xl bg-[#2e4f7a] px-5 py-3 text-sm font-semibold text-white hover:bg-[#243c5d] scale-100 hover:scale-105 active:scale-95 transition-transform duration-200"
        aria-disabled={sent}
        aria-busy={sent}
        disabled={sent}
      >
        {sent ? 'Submitted!' : 'Submit Application'}
      </button>

      {sent && (
        <div className="rounded-xl border border-[#b8d8c7] bg-[#eef9f1] px-4 py-3 text-sm font-medium text-[#1e6a45]">
          Application sent successfully. IGHOST will contact you soon.
        </div>
      )}
    </form>
  );
};

export default AmbassadorForm;
