import Link from 'next/link';
import PropertyGrid from '../components/PropertyGrid';

const servicePillars = [
  {
    title: 'Browse By Building',
    text: 'See the property, neighbourhood, commute logic, and amenities before you choose between private and shared room stock.',
  },
  {
    title: 'Student-Friendly Terms',
    text: 'Rental ranges, furnishing detail, lease patterns, and utility notes are surfaced earlier so enquiries are more useful.',
  },
  {
    title: 'Single or Sharing',
    text: 'Each property page lets renters switch between single rooms and sharing options without losing the wider building context.',
  },
  {
    title: 'Viewing Workflow',
    text: 'The journey now mirrors common rental flows: compare, shortlist, ask for a viewing, then prepare for application.',
  },
];

const operatingModel = [
  {
    title: 'Choose a Building',
    text: 'Compare Musgrave, Glenwood, and Umbilo based on building feel, commute time, and the type of living setup you want.',
  },
  {
    title: 'Switch Room Mode',
    text: 'Inside the building page, toggle between single and sharing rooms to compare privacy, price, and included utilities.',
  },
  {
    title: 'Book and Prepare',
    text: 'Use the building and room context to ask for viewings, check deposits, and confirm move-in timing with less back-and-forth.',
  },
];

const focusAreas = [
  'Building-first discovery around UKZN and DUT movement routes',
  'Single-room and sharing toggles on each property page',
  'Clearer image presentation for rooms, lounges, and arrival views',
  'Shortlist, viewing, and application-ready rental guidance',
];

export default function Home() {
  return (
    <div>
      {/* Hero Section with layered glassmorphism and animated floating shapes */}
      <section className="app-shell section-spacing pt-12 md:pt-16 relative overflow-hidden">
        {/* Animated gradient background */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 animate-gradient-move bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#caa86a]/30 via-[#2e4f7a]/10 to-transparent opacity-80" />
        {/* Glassmorphism overlay */}
        <div aria-hidden="true" className="absolute left-1/2 top-0 z-0 h-[420px] w-[700px] -translate-x-1/2 rounded-3xl bg-white/30 shadow-2xl backdrop-blur-2xl blur-2xl" style={{ filter: 'blur(32px)' }} />
        {/* Floating shapes for depth */}
        <div aria-hidden="true" className="absolute top-10 left-10 w-24 h-24 rounded-full bg-[#caa86a]/30 blur-2xl animate-float-slow" />
        <div aria-hidden="true" className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-[#2e4f7a]/20 blur-2xl animate-float-medium" />
        <div className="grid gap-8 md:grid-cols-[1.3fr_0.9fr] md:items-end relative z-10">
          <div className="rise">
            <div className="flex items-center gap-3 mb-2">
              <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="18" fill="#caa86a" fillOpacity="0.18" />
                <path d="M12 20l6 6 6-6" stroke="#2e4f7a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xl font-bold text-[#2e4f7a] tracking-tight" style={{ fontFamily: 'var(--font-space), sans-serif' }}>Durban Student Accommodation</span>
            </div>
            <h1
              className="architect-heading mt-5 text-4xl font-extrabold text-[#121522] sm:text-6xl lg:text-7xl tracking-tight animate-fade-in-up"
              style={{ fontFamily: 'var(--font-space), sans-serif', letterSpacing: '-0.03em' }}
            >
              <span className="inline-block bg-gradient-to-r from-[#2e4f7a] via-[#caa86a] to-[#2e4f7a] bg-clip-text text-transparent animate-gradient-text drop-shadow-lg">Find the right room in Durban</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted md:text-xl animate-fade-in-up delay-200">
              Durban Student Stays is a building-first rental concept for student-friendly accommodation in Durban.
              Instead of throwing isolated room cards at you first, the site starts with the building, then lets you switch between single and sharing rooms inside each property.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 animate-fade-in-up delay-300">
              <Link href="/buildings" className="btn-primary scale-100 hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg">
                <span className="inline-flex items-center gap-2">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" stroke="#caa86a" strokeWidth="2" /><path d="M7 10l3 3 3-3" stroke="#2e4f7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Explore Buildings
                </span>
              </Link>
              <Link href="/shop" className="btn-secondary scale-100 hover:scale-105 active:scale-95 transition-transform duration-200">
                <span className="inline-flex items-center gap-2">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="3" y="3" width="14" height="14" rx="3" stroke="#2e4f7a" strokeWidth="2" /><path d="M7 10h6" stroke="#caa86a" strokeWidth="2" strokeLinecap="round"/></svg>
                  Compare Room Formats
                </span>
              </Link>
            </div>
          </div>

          <div className="panel rise p-6 transition-shadow duration-300 hover:shadow-2xl glassmorphism" style={{ animationDelay: '120ms' }}>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5f7695]">Slogan</p>
            <h2
              className="mt-2 text-2xl font-semibold text-[#121522] animate-gradient-text"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              Stay closer. Commute smarter.
            </h2>
            <div className="mt-3 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                  <circle cx="16" cy="16" r="16" fill="#caa86a" fillOpacity="0.15" />
                  <path d="M10 18l4 4 8-8" stroke="#2e4f7a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-lg font-semibold text-[#2e4f7a]">Student rooms shaped around real Durban living.</span>
              </div>
              <p className="text-base text-[#243041]">
                Durban is one of South Africa&apos;s largest coastal metros, with a humid subtropical climate,
                major university demand, and movement across Berea, Glenwood, Umbilo, and central campus zones.
                This site reframes that into a cleaner rental search experience for students and young professionals.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="rounded-full bg-[#caa86a]/20 px-4 py-2 text-sm font-medium text-[#2e4f7a] shadow-sm hover:bg-[#caa86a]/30 transition">Buildings First</span>
                <span className="rounded-full bg-[#2e4f7a]/10 px-4 py-2 text-sm font-medium text-[#caa86a] shadow-sm hover:bg-[#2e4f7a]/20 transition">Single and Sharing</span>
                <span className="rounded-full bg-[#caa86a]/10 px-4 py-2 text-sm font-medium text-[#2e4f7a] shadow-sm hover:bg-[#caa86a]/20 transition">Near UKZN and DUT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="app-shell section-spacing pt-0">
        <div className="relative overflow-hidden rounded-3xl border border-[#d4d9e2] bg-gradient-to-r from-[#caa86a]/30 via-[#2e4f7a]/10 to-[#fff] px-8 py-12 flex flex-col items-center justify-center shadow-xl">
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute left-0 top-0 w-40 h-40 rounded-full bg-[#caa86a]/20 blur-2xl animate-float-slow" />
            <div className="absolute right-0 bottom-0 w-56 h-56 rounded-full bg-[#2e4f7a]/15 blur-2xl animate-float-medium" />
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#2e4f7a] tracking-tight animate-fade-in-up" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Durban rooms with student demand in mind
            </h2>
            <p className="mt-4 text-lg md:text-xl text-[#243041] max-w-2xl text-center animate-fade-in-up delay-150">
              UKZN and DUT pull steady accommodation demand into Durban. The stronger product is not a generic classifieds feed, but a cleaner rental journey that shows the building first, the rooms second, and the enquiry path with more confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#caa86a]/20 px-6 py-3 text-lg font-semibold text-[#2e4f7a] shadow-md animate-fade-in-up delay-200">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#caa86a" fillOpacity="0.15" /><path d="M7 13l3 3 7-7" stroke="#2e4f7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Campus Access
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#2e4f7a]/10 px-6 py-3 text-lg font-semibold text-[#caa86a] shadow-md animate-fade-in-up delay-250">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#2e4f7a" fillOpacity="0.15" /><path d="M12 7v10" stroke="#caa86a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Budget Visibility
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#caa86a]/10 px-6 py-3 text-lg font-semibold text-[#2e4f7a] shadow-md animate-fade-in-up delay-300">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#caa86a" fillOpacity="0.15" /><path d="M7 12h10" stroke="#2e4f7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Viewings With Context
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="app-shell section-spacing pt-2" id="top-buildings">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <span className="kicker">Featured Buildings</span>
            <h2 className="architect-heading mt-4 text-3xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Start with the property that fits your route and lifestyle
            </h2>
          </div>
          <Link href="/buildings" className="btn-secondary hidden sm:inline-flex">
            See All Buildings
          </Link>
        </div>

        <PropertyGrid limit={3} />
      </section>

      <section className="app-shell section-spacing">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <span className="kicker">What We Build</span>
            <h2
              className="architect-heading mt-4 text-3xl font-semibold text-[#121522] md:text-4xl"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              Four signals that matter when choosing where to rent
            </h2>
          </div>
          <Link href="/contact" className="btn-secondary hidden sm:inline-flex">
            Ask About a Viewing
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {servicePillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className="panel rise p-6 transition-shadow duration-300 hover:shadow-2xl animate-fade-in-up animate-scale-in"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <h3
                className="text-xl font-semibold text-[#121522]"
                style={{ fontFamily: 'var(--font-space), sans-serif' }}
              >
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm text-muted">{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="app-shell section-spacing pt-2">
        <div className="mb-7">
          <span className="kicker">How We Operate</span>
          <h2
            className="architect-heading mt-4 text-3xl font-semibold text-[#121522] md:text-4xl"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            A simpler rental flow for Durban students
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-muted md:text-base">
            The experience now moves from building fit to room choice to viewing enquiry without making renters decode scattered property ads.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {operatingModel.map((step, index) => (
            <article key={step.title} className="panel rise p-6" style={{ animationDelay: `${index * 85}ms` }}>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">
                Stage {index + 1}
              </p>
              <h3
                className="mt-2 text-2xl font-semibold text-[#121522]"
                style={{ fontFamily: 'var(--font-space), sans-serif' }}
              >
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-muted">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="app-shell section-spacing pt-2">
        <div className="panel rise p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1.15fr_1fr] md:items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">
                2026 Strategic Priorities
              </span>
              <h2
                className="mt-2 text-3xl font-semibold text-[#121522] md:text-4xl"
                style={{ fontFamily: 'var(--font-space), sans-serif' }}
              >
                  What this rebrand is now built to do
              </h2>
              <p className="mt-3 text-sm text-muted md:text-base">
                    The site now points at Durban rental demand with a stronger browsing pattern: compare buildings, inspect room modes, and enquire with clearer expectations.
              </p>
            </div>

            <ul className="grid gap-3">
              {focusAreas.map((area) => (
                <li
                  key={area}
                  className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3 text-sm text-[#263244]"
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="app-shell section-spacing pt-2">
        <div className="rounded-[1.6rem] border border-[#d4d9e2] bg-[linear-gradient(130deg,#1d2a3d,#2e4f7a)] px-6 py-10 text-white md:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#d9e4f5]">Start Your Search</p>
          <h2
            className="mt-3 max-w-2xl text-3xl font-semibold md:text-4xl"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            Find a Durban building that fits your budget, campus route, and move-in timeline.
          </h2>
          <p className="mt-4 max-w-xl text-sm text-[#d9e1ec] md:text-base">
            Start with the building, switch between single and sharing rooms, and use the guide and contact flow to move from browsing into a serious viewing request.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/buildings" className="btn-secondary !border-white/35 !bg-white !text-[#1d2a3d]">
              Browse Buildings
            </Link>
            <Link href="/ambassadors" className="btn-secondary !border-white/35 !bg-transparent !text-white hover:!bg-white/10">
              Rental Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
