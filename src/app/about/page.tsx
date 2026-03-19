import Image from 'next/image';
import React from 'react';

const overviewFacts = [
  { label: 'Founder', value: 'Miss A. Mhlongo (iGhostikazi)' },
  { label: 'Established', value: 'September 2021' },
  { label: 'Company Type', value: 'Non-profit company' },
  { label: 'Reach', value: 'Supporting artists and talent nationally' },
];

const focusAreas = [
  {
    title: 'Talent Development',
    text: 'We host events, awards, and camps for artists so they can grow, perform, and be seen.',
  },
  {
    title: 'Artists Health',
    text: 'We focus on physical, emotional, and mental wellness because personal wellness matters for every artist.',
  },
  {
    title: 'Women Empowerment',
    text: 'We support women in different areas, including practical community support such as pad donations to local schools.',
  },
  {
    title: 'Drug Awareness',
    text: 'We educate young people about the dangers of drugs and support healthier ways of resolving social challenges.',
  },
];

const presentationSlides = [
  {
    src: '/about/overview-cover.png',
    title: 'Overview Cover',
    caption: 'The company overview deck introduces the IGHOST name and presentation identity.',
  },
  {
    src: '/about/overview-founder.png',
    title: 'Founder and Origin',
    caption: 'This page connects the brand directly to Miss A. Mhlongo (iGhostikazi) and the 2021 launch.',
  },
  {
    src: '/about/overview-focus-areas.png',
    title: 'Focus Areas',
    caption: 'The presentation outlines the four operational focus areas that shape IGHOST programming.',
  },
  {
    src: '/about/overview-slogan.png',
    title: 'Slogan and Positioning',
    caption: 'This page reinforces the non-profit positioning and the slogan: Ungaphiki Nathi, Phila Nathi.',
  },
];

const workHistory = [
  'Onetime',
  'Westcoast',
  'Community events, awards, and camps across our growth journey',
];

const historySlides = [
  {
    src: '/about/history-onetime.png',
    title: 'Onetime',
  },
  {
    src: '/about/history-westcoast.png',
    title: 'Westcoast',
  },
];

const timeline = [
  { year: 'Sep 2021', text: 'IGHOST launched by Miss A. Mhlongo (iGhostikazi).' },
  { year: '2022', text: 'Expanded events, awards, and camps for artists and youth.' },
  { year: '2023', text: 'Strengthened women empowerment and artist wellness programs.' },
  { year: '2024', text: 'Scaled awareness campaigns and ambassador activities.' },
  { year: 'Today', text: 'Operating nationally as a non-profit creative development platform.' },
];

export default function AboutPage() {
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
        <span className="kicker">About IGHOST</span>
        <h1
          className="architect-heading mt-5 text-4xl font-extrabold text-[#121522] md:text-6xl tracking-tight animate-fade-in-up"
          style={{ fontFamily: 'var(--font-space), sans-serif', letterSpacing: '-0.03em' }}
        >
          <span className="inline-block bg-gradient-to-r from-[#2e4f7a] via-[#caa86a] to-[#2e4f7a] bg-clip-text text-transparent animate-gradient-text drop-shadow-lg">Company Overview</span>
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-muted md:text-xl animate-fade-in-up delay-200">
          IGHOST Edutainment is a non-profit company founded by Miss A. Mhlongo (iGhostikazi).
          Since September 2021, the organization has been building a home for artists and talent
          to grow, learn, and be supported through structured entertainment and community programs.
        </p>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewFacts.map((fact, index) => (
          <article key={fact.label} className="panel p-5 rise transition-shadow duration-300 hover:shadow-2xl" style={{ animationDelay: `${index * 60}ms` }}>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">{fact.label}</p>
            <p
              className="mt-2 text-lg font-semibold text-[#121522]"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              {fact.value}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-8 panel p-6 md:p-8 rise" style={{ animationDelay: '20ms' }}>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Presentation Archive</span>
            <h2
              className="mt-2 text-3xl font-semibold text-[#121522]"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              Source pages from the IGHOST presentation
            </h2>
          </div>
          <p className="max-w-xl text-sm text-muted md:text-base">
            These visuals are rendered directly from the PDF presentation used to inform the website content.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {presentationSlides.map((slide, index) => (
            <article key={slide.src} className="rounded-[1.25rem] border border-[#d9dee8] bg-white p-4 rise transition-shadow duration-300 hover:shadow-2xl" style={{ animationDelay: `${index * 70}ms` }}>
              <div className="relative overflow-hidden rounded-[1rem] border border-[#d9dee8] bg-[#f7f8fb] aspect-[4/5]">
                <Image
                  src={slide.src}
                  alt={slide.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3
                className="mt-4 text-lg font-semibold text-[#121522]"
                style={{ fontFamily: 'var(--font-space), sans-serif' }}
              >
                {slide.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{slide.caption}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="panel p-6 md:p-8 rise">
          <h2
            className="text-2xl font-semibold text-[#121522]"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            Mission
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Create real opportunities for artists and youth through events, awards, camps, and
            mentorship that help them grow in confidence, skill, and leadership.
          </p>
        </article>

        <article className="panel p-6 md:p-8 rise" style={{ animationDelay: '90ms' }}>
          <h2
            className="text-2xl font-semibold text-[#121522]"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            Vision
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Be recognized nationally as a trusted home for talent development, artist wellness,
            women empowerment, and drug awareness education.
          </p>
        </article>
      </section>

      <section className="mt-8 panel p-6 md:p-8 rise" style={{ animationDelay: '40ms' }}>
        <div className="grid gap-5 md:grid-cols-[0.85fr_1.15fr] md:items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">What IGHOST Means</span>
            <h2
              className="mt-2 text-3xl font-semibold text-[#121522]"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              Spectacular Talent. I Am A Great Host.
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-muted md:text-base">
            The company presentation frames IGHOST as a brand built around hosting artists and
            talent with confidence and purpose. The name captures both the founder's identity and
            the company belief that artists deserve a platform where they can be seen, developed,
            and treated like they belong.
          </p>
        </div>
      </section>

      <section className="mt-8 panel p-6 md:p-8 rise" style={{ animationDelay: '60ms' }}>
        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Slogan</span>
        <h2
          className="mt-2 text-3xl font-semibold text-[#121522]"
          style={{ fontFamily: 'var(--font-space), sans-serif' }}
        >
          Ungaphiki Nathi, Phila Nathi
        </h2>
        <p className="mt-3 text-sm text-muted">
          We focus on delivery over empty promises and create a culture where people feel at home
          with IGHOST.
        </p>
      </section>

      <section className="mt-8 panel p-6 md:p-8 rise">
        <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Focus Areas</span>
            <h2
              className="mt-2 text-3xl font-semibold text-[#121522]"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              Talent. Wellness. Empowerment. Awareness.
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {focusAreas.map((area) => (
              <div key={area.title} className="rounded-xl border border-[#d9dee8] bg-white px-4 py-4">
                <h3
                  className="text-base font-semibold text-[#121522]"
                  style={{ fontFamily: 'var(--font-space), sans-serif' }}
                >
                  {area.title}
                </h3>
                <p className="mt-2 text-sm text-[#263244]">{area.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 panel p-6 md:p-8 rise" style={{ animationDelay: '90ms' }}>
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Company Type</span>
            <h2
              className="mt-2 text-3xl font-semibold text-[#121522]"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              Built as a non-profit company
            </h2>
            <p className="mt-3 text-sm text-muted md:text-base">
              The presentation makes it clear that IGHOST is focused on its four core areas and on
              delivering its best to everyone it serves.
            </p>
          </div>
          <div className="rounded-xl border border-[#d9dee8] bg-white px-5 py-5 text-sm text-[#263244]">
            We believe in doing the work instead of making empty promises. That promise of action,
            care, and consistency is central to how IGHOST presents itself to artists, ambassadors,
            and the community.
          </div>
        </div>
      </section>

      <section className="mt-8 rise">
        <h2
          className="text-3xl font-semibold text-[#121522] md:text-4xl"
          style={{ fontFamily: 'var(--font-space), sans-serif' }}
        >
          Milestones
        </h2>
        <div className="mt-5 space-y-3">
          {timeline.map((item, idx) => (
            <article key={item.year} className="panel flex flex-col gap-2 p-5 md:flex-row md:items-center md:gap-5" style={{ animationDelay: `${idx * 70}ms` }}>
              <span
                className="text-lg font-semibold text-[#2e4f7a]"
                style={{ fontFamily: 'var(--font-space), sans-serif' }}
              >
                {item.year}
              </span>
              <p className="text-sm text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 panel p-6 md:p-8 rise" style={{ animationDelay: '120ms' }}>
        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">History of Our Work</span>
        <h2
          className="mt-2 text-3xl font-semibold text-[#121522]"
          style={{ fontFamily: 'var(--font-space), sans-serif' }}
        >
          Past work and activity references
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {workHistory.map((item) => (
            <div key={item} className="rounded-xl border border-[#d9dee8] bg-white px-4 py-4 text-sm text-[#263244]">
              {item}
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {historySlides.map((slide, index) => (
            <article key={slide.src} className="rounded-[1.25rem] border border-[#d9dee8] bg-white p-4 rise" style={{ animationDelay: `${index * 80}ms` }}>
              <div className="relative overflow-hidden rounded-[1rem] border border-[#d9dee8] bg-[#f7f8fb] aspect-[4/5]">
                <Image
                  src={slide.src}
                  alt={slide.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3
                className="mt-4 text-lg font-semibold text-[#121522]"
                style={{ fontFamily: 'var(--font-space), sans-serif' }}
              >
                {slide.title}
              </h3>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
