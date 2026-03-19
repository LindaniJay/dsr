"use client";
import React from 'react';
import AmbassadorForm from '../../components/AmbassadorForm';

const requirements = [
  'R500 upfront contract payment',
  'A small professional ID picture',
  'Certified ID copy or birth certificate (below 18)',
  'Proof of residence',
  'Active TikTok or Facebook account',
  'Follow ALL our social media pages',
  'Active contact number (for calls and emergencies)',
  'Proof of account (banking details and address)',
];

const benefits = [
  'Black Ghost Membership T-shirt',
  'Leadership skills and training skills',
  'Opportunity to build character and life skills',
  'Free photoshoots',
  'Beneficiaries from our charity work',
  'Free Ghost items for 10+ customers monthly',
  'Free tickets to selected events and tournaments',
];

export default function AmbassadorsPage() {
  return (
    <div className="app-shell section-spacing">
      {/* Hero Section with layered glassmorphism and animated floating shapes */}
      <section className="rise relative overflow-hidden">
        {/* Animated gradient background */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 animate-gradient-move bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#caa86a]/30 via-[#2e4f7a]/10 to-transparent opacity-80" />
        {/* Glassmorphism overlay */}
        <div aria-hidden="true" className="absolute left-1/2 top-0 z-0 h-[320px] w-[540px] -translate-x-1/2 rounded-3xl bg-white/30 shadow-2xl backdrop-blur-2xl blur-2xl" style={{ filter: 'blur(24px)' }} />
        {/* Floating shapes for depth */}
        <div aria-hidden="true" className="absolute top-10 left-10 w-16 h-16 rounded-full bg-[#caa86a]/30 blur-2xl animate-float-slow" />
        <div aria-hidden="true" className="absolute bottom-10 right-10 w-20 h-20 rounded-full bg-[#2e4f7a]/20 blur-2xl animate-float-medium" />
        <span className="kicker">Ambassador Program</span>
        <h1
          className="architect-heading mt-5 text-4xl font-extrabold text-[#121522] md:text-6xl tracking-tight animate-fade-in-up"
          style={{ fontFamily: 'var(--font-space), sans-serif', letterSpacing: '-0.03em' }}
        >
          <span className="inline-block bg-gradient-to-r from-[#2e4f7a] via-[#caa86a] to-[#2e4f7a] bg-clip-text text-transparent animate-gradient-text drop-shadow-lg">Represent the Brand</span>
          <span className="block mt-2 animate-fade-in-up delay-150">With <span className="text-[#caa86a]">Purpose</span></span>
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-muted md:text-xl animate-fade-in-up delay-200">
          Our Brand Ambassador program gives girls and boys opportunities to grow leadership,
          confidence, and life skills while supporting IGHOST events and community initiatives.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="panel p-6 md:p-7 rise transition-shadow duration-300 hover:shadow-2xl">
          <h2
            className="text-2xl font-semibold text-[#121522]"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            Requirements
          </h2>
          <ul className="mt-4 space-y-2">
            {requirements.map((req, idx) => (
              <li key={idx} className="rounded-lg border border-[#d7dce5] bg-white px-3 py-2 text-sm text-[#2d3746]">
                {req}
              </li>
            ))}
          </ul>
        </article>

        <article className="panel p-6 md:p-7 rise transition-shadow duration-300 hover:shadow-2xl" style={{ animationDelay: '90ms' }}>
          <h2
            className="text-2xl font-semibold text-[#121522]"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            Benefits
          </h2>
          <ul className="mt-4 space-y-2">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="rounded-lg border border-[#d7dce5] bg-white px-3 py-2 text-sm text-[#2d3746]">
                {benefit}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-8 rise">
        <AmbassadorForm onSubmit={() => {}} />
      </section>

      <section className="mt-8 panel p-6 md:p-7 rise" style={{ animationDelay: '140ms' }}>
        <h2
          className="text-2xl font-semibold text-[#121522]"
          style={{ fontFamily: 'var(--font-space), sans-serif' }}
        >
          Terms and Commitments
        </h2>
        <div className="mt-4 space-y-3 text-sm text-muted">
          <p>
            This is a 1 year contract. You can apply again once your contract expires.
          </p>
          <p>
            By joining, you give IGHOST permission to use your pictures and video clips on social
            media for brand and campaign purposes.
          </p>
          <p className="font-medium text-[#243041]">
            Ambassadors are expected to attend events, photoshoots, meetings, and outings when
            available, and to represent the brand with integrity.
          </p>
        </div>
      </section>
    </div>
  );
}
