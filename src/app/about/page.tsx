import Image from 'next/image';
import Link from 'next/link';
import { type ReactNode } from 'react';

/* ── Stats ── */
const platformStats = [
  { figure: '6', label: 'Buildings Listed', accent: false },
  { figure: '30+', label: 'Room Options', accent: false },
  { figure: '5', label: 'Neighbourhoods', accent: false },
  { figure: '5+', label: 'Campus Anchors', accent: true },
];

/* ── Values ── */
const coreValues: { icon: ReactNode; title: string; text: string }[] = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-[#2e4f7a]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3 4.5h.008v.008H18v-.008Zm0 3h.008v.008H18v-.008Zm0 3h.008v.008H18v-.008Z" />
      </svg>
    ),
    title: 'Neighbourhood-first',
    text: 'We organise listings around where students actually live and commute — not by random price feeds.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-[#b99258]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
    title: 'Transparent Pricing',
    text: 'Every room shows monthly rent, deposit, and lease terms upfront so you can compare without guesswork.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-[#2e4f7a]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    title: 'Campus Proximity',
    text: 'Distance to nearby campuses — UKZN, DUT, Varsity College, Regent, Mancosa and more — is core to every listing because your commute shapes your year.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-[#b99258]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
    title: 'Quality Over Quantity',
    text: 'We verify building information before publishing it. Fewer listings, better decisions.',
  },
];

/* ── Timeline ── */
const milestones = [
  { marker: '01', phase: 'Research', text: 'Identified Durban as a high-demand student rental market with limited online discovery tools.' },
  { marker: '02', phase: 'First Build', text: 'Launched an initial version focusing on room types, building pages, and direct contact paths.' },
  { marker: '03', phase: 'Expansion', text: 'Added 6 verified buildings across Musgrave, Glenwood, Umbilo, City Centre, Point Waterfront, and Greyville.' },
  { marker: '04', phase: 'Maps & Context', text: 'Integrated neighbourhood maps, campus distances, nearby amenities, and richer room comparison.' },
  { marker: '05', phase: 'What\'s Next', text: 'Virtual tours, verified reviews from current tenants, and an expanded building network.' },
];

/* ── Why Durban ── */
const durbanFacts = [
  'Home to UKZN, DUT, Varsity College, Regent Business School, Mancosa, and other higher-learning institutions serving over 100,000 students.',
  'Warm coastal climate with strong public transport corridors along key student routes.',
  'Massive annual influx of students creates recurring demand that outpaces available quality housing.',
];

export default function AboutPage() {
  return (
    <div className="app-shell section-spacing">

      {/* ═══ HERO ═══ */}
      <section className="page-hero rise px-6 py-10 md:px-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="section-heading">
            <span className="kicker">About Us</span>
            <h1
              className="architect-heading text-4xl font-extrabold text-[#121522] md:text-6xl"
              style={{ fontFamily: 'var(--font-space), sans-serif', letterSpacing: '-0.03em' }}
            >
              Student accommodation built around how Durban actually works.
            </h1>
            <p className="text-base text-muted md:text-lg">
              We started this platform because finding a decent room near campus shouldn&apos;t mean scrolling through hundreds of irrelevant listings. We focus on verified buildings, honest pricing, and the neighbourhoods students really live in.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/buildings" className="btn-primary text-center shadow-lg">
                Explore Buildings
              </Link>
              <Link href="/contact" className="btn-secondary text-center">
                Get in Touch
              </Link>
            </div>
          </div>

          <div className="editorial-card overflow-hidden p-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem]">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80"
                alt="Students collaborating in a modern study space"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,16,24,0.05),rgba(11,16,24,0.55))]" />
              <div className="absolute inset-x-5 bottom-5 text-white">
                <p className="text-xs uppercase tracking-[0.14em] text-white/70">Our purpose</p>
                <p className="mt-2 max-w-md text-lg font-medium">Helping students find the right room, in the right area, at the right price.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {platformStats.map((stat, index) => (
          <article
            key={stat.label}
            className={`${stat.accent ? 'tonal-card text-white' : 'editorial-card'} p-6 text-center rise`}
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <p
              className={`text-4xl font-extrabold ${stat.accent ? 'text-white' : 'text-[#2e4f7a]'}`}
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              {stat.figure}
            </p>
            <p className={`mt-1 text-sm font-medium ${stat.accent ? 'text-white/75' : 'text-muted'}`}>
              {stat.label}
            </p>
          </article>
        ))}
      </section>

      {/* ═══ MISSION & VISION ═══ */}
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="editorial-card p-6 md:p-8 rise">
          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Mission</span>
          <h2
            className="mt-2 text-2xl font-semibold text-[#121522]"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            Simplify how students find and compare accommodation in Durban.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            We combine neighbourhood context, room-level detail, and campus proximity into one focused search experience — so renters and parents can make confident decisions without the usual friction.
          </p>
        </article>

        <article className="tonal-card p-6 text-white md:p-8 rise" style={{ animationDelay: '90ms' }}>
          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-white/60">Vision</span>
          <h2
            className="mt-2 text-2xl font-semibold text-white"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            Become Durban&apos;s most trusted student accommodation discovery layer.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/78">
            We aim to set a new standard for how student housing is presented online — prioritising transparency, verified information, and the real movement patterns that shape where students rent.
          </p>
        </article>
      </section>

      {/* ═══ OUR VALUES ═══ */}
      <section className="mt-8 panel p-6 md:p-8 rise">
        <div className="section-heading">
          <span className="kicker">What We Believe</span>
          <h2 className="text-3xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            Four principles that drive everything we build
          </h2>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {coreValues.map((value, idx) => (
            <article
              key={value.title}
              className="rounded-[1.2rem] border border-[#d9dee8] bg-white p-5 rise"
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5f3ee]">{value.icon}</span>
              <h3 className="mt-3 text-lg font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                {value.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ═══ WHY DURBAN ═══ */}
      <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <article className="editorial-card overflow-hidden rise" style={{ animationDelay: '40ms' }}>
          <div className="relative aspect-[4/3]">
            <Image
              src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=80"
              alt="Durban city skyline"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,16,24,0.02),rgba(11,16,24,0.5))]" />
            <div className="absolute inset-x-5 bottom-5 text-white">
              <p className="text-xs uppercase tracking-[0.14em] text-white/70">eThekwini Metro</p>
              <p className="mt-1 text-lg font-semibold">A coastal city with real student housing demand</p>
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm leading-relaxed text-muted">
              Durban is one of South Africa&apos;s largest metros — warm climate, major transport corridors, and multiple universities, colleges, and private institutions that draw over 100,000 students every year.
            </p>
          </div>
        </article>

        <article className="panel p-6 md:p-8 rise" style={{ animationDelay: '60ms' }}>
          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Why Durban</span>
          <h2 className="mt-2 text-3xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            The market reality
          </h2>
          <p className="mt-3 text-sm text-muted">
            Student demand for quality housing outpaces supply every intake cycle. We exist to make the available options clearer.
          </p>
          <ul className="mt-5 grid gap-3">
            {durbanFacts.map((fact) => (
              <li key={fact} className="flex items-start gap-3 rounded-xl border border-[#d9dee8] bg-white px-4 py-3 text-sm text-[#263244]">
                <span className="mt-0.5 shrink-0 text-[#2e4f7a]">&#8226;</span>
                {fact}
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="mt-8 tonal-card p-6 text-white md:p-10 rise" style={{ animationDelay: '40ms' }}>
        <div className="section-heading">
          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-white/60">How It Works</span>
          <h2 className="text-3xl font-semibold text-white" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            From browsing to booking — in four steps
          </h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { step: '01', title: 'Browse Buildings', desc: 'Explore verified student properties across Durban neighbourhoods.' },
            { step: '02', title: 'Compare Rooms', desc: 'See pricing, features, and availability side by side.' },
            { step: '03', title: 'Check Location', desc: 'Review campus distances, transport links, and nearby amenities.' },
            { step: '04', title: 'Enquire Directly', desc: 'Reach out to confirm availability and arrange a viewing.' },
          ].map((item) => (
            <div key={item.step} className="rounded-xl border border-white/12 bg-white/8 px-5 py-5">
              <span className="text-2xl font-extrabold text-white/30" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                {item.step}
              </span>
              <h3 className="mt-2 text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-white/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ MILESTONES ═══ */}
      <section className="mt-8 rise">
        <div className="section-heading">
          <span className="kicker">Our Journey</span>
          <h2
            className="text-3xl font-semibold text-[#121522] md:text-4xl"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            Milestones
          </h2>
        </div>
        <div className="mt-5 space-y-3">
          {milestones.map((item, idx) => (
            <article
              key={item.marker}
              className="panel flex flex-col gap-3 p-5 md:flex-row md:items-center md:gap-6"
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1f3a5a] text-sm font-bold text-white"
              >
                {item.marker}
              </span>
              <div>
                <span
                  className="text-base font-semibold text-[#2e4f7a]"
                  style={{ fontFamily: 'var(--font-space), sans-serif' }}
                >
                  {item.phase}
                </span>
                <p className="mt-1 text-sm text-muted">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="mt-8 editorial-card overflow-hidden rise" style={{ animationDelay: '60ms' }}>
        <div className="relative px-6 py-10 text-center md:px-12 md:py-14">
          <span className="kicker">Ready to find your room?</span>
          <h2
            className="mt-4 text-3xl font-bold text-[#121522] md:text-4xl"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            Start browsing student accommodation in Durban today.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted md:text-base">
            Compare rooms, check distances to campus, and contact buildings directly — no middlemen, no hidden fees.
          </p>
          <div className="mt-7 flex justify-center gap-3">
            <Link href="/buildings" className="btn-primary shadow-lg">
              Browse Buildings
            </Link>
            <Link href="/apply" className="btn-secondary">
              Apply Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
