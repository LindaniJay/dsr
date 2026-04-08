import React from 'react';

const overviewFacts = [
  { label: 'Focus', value: 'Student and young renter accommodation' },
  { label: 'Market', value: 'Durban, KwaZulu-Natal' },
  { label: 'Demand Anchors', value: 'UKZN and DUT' },
  { label: 'Model', value: 'Rooms, shared flats, and private studios' },
];

const focusAreas = [
  {
    title: 'Neighbourhood Fit',
    text: 'A good rental search starts with areas students actually travel through, not abstract city-wide inventory.',
  },
  {
    title: 'Budget Clarity',
    text: 'Monthly pricing needs to be readable enough for renters and parents to compare room types quickly.',
  },
  {
    title: 'Campus Demand',
    text: 'Durban University of Technology serves roughly 33,000 students, while UKZN remains one of Africa’s leading institutions with multiple campuses in KwaZulu-Natal.',
  },
  {
    title: 'Durban Context',
    text: 'Durban is a major coastal metro with warm weather, strong transport corridors, and a large student and working-age population.',
  },
];

const presentationSlides = [
  {
    title: 'Rebrand Direction',
    caption: 'The site now positions itself around Durban rooms and student-friendly rentals instead of the previous entertainment brand.',
  },
  {
    title: 'University Demand',
    caption: 'UKZN and DUT provide the clearest demand anchors for student accommodation in Durban.',
  },
  {
    title: 'Neighbourhood Priorities',
    caption: 'Berea, Musgrave, Glenwood, and Umbilo are practical starting points for a student-focused inventory strategy.',
  },
  {
    title: 'Positioning',
    caption: 'The product is framed as a cleaner discovery layer for rooms, shared flats, and compact studios.',
  },
];

const timeline = [
  { year: 'Research', text: 'Durban identified as a large coastal metro with major higher-education demand and active transport corridors.' },
  { year: 'Demand', text: 'UKZN and DUT positioned as the strongest local student-accommodation anchors.' },
  { year: 'Rebrand', text: 'The site was refocused from entertainment content to rooms and rental discovery.' },
  { year: 'Launch', text: 'Starter room types, building pages, and direct contact paths were added to the experience.' },
  { year: 'Next', text: 'Expand verified room information, maps, and richer property presentation.' },
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
        <span className="kicker">About</span>
        <h1
          className="architect-heading mt-5 text-4xl font-extrabold text-[#121522] md:text-6xl tracking-tight animate-fade-in-up"
          style={{ fontFamily: 'var(--font-space), sans-serif', letterSpacing: '-0.03em' }}
        >
          <span className="inline-block bg-gradient-to-r from-[#2e4f7a] via-[#caa86a] to-[#2e4f7a] bg-clip-text text-transparent animate-gradient-text drop-shadow-lg">Why Durban student accommodation</span>
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-muted md:text-xl animate-fade-in-up delay-200">
          Durban Student Stays is built around a clearer housing need: helping students and young renters find rooms and apartments in a city shaped by universities, coastal geography, and strong neighbourhood differences.
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
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Context</span>
            <h2
              className="mt-2 text-3xl font-semibold text-[#121522]"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              What informs the positioning
            </h2>
          </div>
          <p className="max-w-xl text-sm text-muted md:text-base">
            The current site direction is anchored in Durban city context and the scale of nearby university demand rather than the previous brand narrative.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {presentationSlides.map((slide, index) => (
            <article key={slide.title} className="rounded-[1.25rem] border border-[#d9dee8] bg-white p-4 rise transition-shadow duration-300 hover:shadow-2xl" style={{ animationDelay: `${index * 70}ms` }}>
              <div className="flex aspect-[4/5] items-end overflow-hidden rounded-[1rem] border border-[#d9dee8] bg-[linear-gradient(160deg,#1f3350,#d6a45d_55%,#f7f8fb)] p-5">
                <div className="rounded-2xl border border-white/40 bg-white/15 px-4 py-3 backdrop-blur-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">Durban Student Stays</p>
                  <p className="mt-2 max-w-[12rem] text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                    {slide.title}
                  </p>
                </div>
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
            Make Durban room discovery more useful for students and young renters by focusing on neighbourhood logic, room formats, and clearer enquiries.
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
            Become a sharper local accommodation layer for Durban, especially around UKZN, DUT, and the student movement patterns that shape where people actually rent.
          </p>
        </article>
      </section>

      <section className="mt-8 panel p-6 md:p-8 rise" style={{ animationDelay: '40ms' }}>
        <div className="grid gap-5 md:grid-cols-[0.85fr_1.15fr] md:items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Why Durban</span>
            <h2
              className="mt-2 text-3xl font-semibold text-[#121522]"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              A coastal city with real student housing pressure
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-muted md:text-base">
            Durban is one of South Africa’s largest cities on the Indian Ocean, with a warm humid climate, extensive urban sprawl, and major university traffic. That mix creates recurring demand for rentals that balance cost, transport, and campus access.
          </p>
        </div>
      </section>

      <section className="mt-8 panel p-6 md:p-8 rise" style={{ animationDelay: '60ms' }}>
        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Positioning</span>
        <h2
          className="mt-2 text-3xl font-semibold text-[#121522]"
          style={{ fontFamily: 'var(--font-space), sans-serif' }}
        >
          Stay closer. Commute smarter.
        </h2>
        <p className="mt-3 text-sm text-muted">
          The point is not just to show rooms, but to help renters make better decisions faster.
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
                The four operating ideas behind the site
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
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Business Direction</span>
            <h2
              className="mt-2 text-3xl font-semibold text-[#121522]"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              Built as a rental discovery product
            </h2>
            <p className="mt-3 text-sm text-muted md:text-base">
              The business is now oriented around accommodation discovery and room enquiries, not the previous entertainment programming model.
            </p>
          </div>
          <div className="rounded-xl border border-[#d9dee8] bg-white px-5 py-5 text-sm text-[#263244]">
            The strongest next step is expanding reliable Durban inventory while keeping the interface useful for students, parents, and young professionals comparing options remotely.
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

    </div>
  );
}
