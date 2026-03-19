"use client";

import React from 'react';

export default function ContactPage() {
  const [sent, setSent] = React.useState(false);

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
        <span className="kicker">Contact</span>
        <h1
          className="architect-heading mt-5 text-4xl font-extrabold text-[#121522] md:text-6xl tracking-tight animate-fade-in-up"
          style={{ fontFamily: 'var(--font-space), sans-serif', letterSpacing: '-0.03em' }}
        >
          <span className="inline-block bg-gradient-to-r from-[#2e4f7a] via-[#caa86a] to-[#2e4f7a] bg-clip-text text-transparent animate-gradient-text drop-shadow-lg">Contact IGHOST</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted md:text-xl animate-fade-in-up delay-200">
          Reach out for event information, ambassador support, or general questions. The PDF lists
          WhatsApp as the primary contact point for the organization.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-[1.25fr_0.75fr]">
        <form
          className="panel rise flex flex-col gap-5 p-6 md:p-8 transition-shadow duration-300 hover:shadow-2xl"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            setTimeout(() => setSent(false), 3000);
          }}
        >
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#5e6673]">
              Name
            </label>
            <input
              type="text"
              placeholder="Your full name"
              className="w-full rounded-2xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#2e4f7a] focus:ring-2 focus:ring-[#caa86a] transition"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#5e6673]">
              Email
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full rounded-2xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#2e4f7a] focus:ring-2 focus:ring-[#caa86a] transition"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#5e6673]">
              Message
            </label>
            <textarea
              placeholder="Tell us how IGHOST can help you."
              rows={6}
              className="w-full rounded-2xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#2e4f7a] focus:ring-2 focus:ring-[#caa86a] transition"
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full justify-center">
            Send Message
          </button>

          {sent && (
            <div className="rounded-xl border border-[#b9d8c7] bg-[#edf8f2] px-4 py-3 text-sm font-medium text-[#1f6946]">
              Message sent successfully. We will contact you shortly.
            </div>
          )}
        </form>

        <aside className="grid gap-4 rise" style={{ animationDelay: '90ms' }}>
          <article className="panel p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">WhatsApp</p>
            <a
              href="https://wa.me/27652523189"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-lg font-semibold text-[#1e3150]"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              +27 65 252 3189
            </a>
            <p className="mt-1 text-sm text-muted">Primary contact number listed in the IGHOST presentation.</p>
          </article>

          <article className="panel p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Social</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { label: 'TikTok', href: 'https://tiktok.com' },
                { label: 'Facebook', href: 'https://facebook.com' },
                { label: 'Instagram', href: 'https://instagram.com' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#d3d8e2] bg-white px-3 py-1.5 text-sm font-medium text-[#27303d] hover:border-[#6f829e]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </article>

          <article className="panel p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Note</p>
            <p className="mt-2 text-sm text-muted">Follow all IGHOST social media pages for ambassador and event updates.</p>
          </article>
        </aside>
      </section>
    </div>
  );
}
