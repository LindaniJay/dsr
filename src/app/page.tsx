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
      <section className="app-shell section-spacing pt-12 md:pt-16">
        <div className="page-hero px-6 py-8 md:px-10 md:py-12">
          <div className="grid gap-8 md:grid-cols-[1.25fr_0.85fr] md:items-end relative z-10">
          <div className="rise">
            <span className="kicker">Durban Student Accommodation</span>
            <h1
              className="architect-heading mt-5 text-4xl font-extrabold text-[#121522] sm:text-6xl lg:text-7xl tracking-tight"
              style={{ fontFamily: 'var(--font-space), sans-serif', letterSpacing: '-0.03em' }}
            >
              Find a well-located student stay with less guesswork.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted md:text-xl">
              Explore student accommodation near UKZN and DUT by building, compare the atmosphere and daily convenience, then choose between single and sharing rooms inside the property that suits you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/buildings" className="btn-primary shadow-lg">
                Explore Buildings
              </Link>
              <Link href="/contact" className="btn-secondary">
                Ask About Availability
              </Link>
            </div>
          </div>

          <div className="tonal-card rise p-6 text-white" style={{ animationDelay: '120ms' }}>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">City Snapshot</p>
            <h2
              className="mt-2 text-2xl font-semibold text-white"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              Stay closer. Move through Durban with more ease.
            </h2>
            <div className="mt-3 flex flex-col gap-4">
              <p className="text-base text-white/80">
                From Berea to Glenwood and Umbilo, the best student rentals balance security, transport convenience, study-friendly interiors, and a manageable route to campus.
              </p>
              <div className="grid gap-3 sm:grid-cols-3 mt-2">
                <div className="rounded-2xl border border-white/12 bg-white/8 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-white/65">Focus</p>
                  <p className="mt-2 text-sm font-semibold">Campus routes</p>
                </div>
                <div className="rounded-2xl border border-white/12 bg-white/8 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-white/65">Options</p>
                  <p className="mt-2 text-sm font-semibold">Single and sharing</p>
                </div>
                <div className="rounded-2xl border border-white/12 bg-white/8 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-white/65">Priority</p>
                  <p className="mt-2 text-sm font-semibold">Straightforward viewings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className="app-shell section-spacing pt-0">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="editorial-card p-6">
            <p className="stat-label">Campus Access</p>
            <p className="mt-3 text-lg font-semibold text-[#162033]">Shortlist properties around the routes you actually use every week.</p>
          </div>
          <div className="editorial-card p-6">
            <p className="stat-label">Budget Clarity</p>
            <p className="mt-3 text-lg font-semibold text-[#162033]">See price starting points, deposits, and room formats before you enquire.</p>
          </div>
          <div className="editorial-card p-6">
            <p className="stat-label">Viewing Ready</p>
            <p className="mt-3 text-lg font-semibold text-[#162033]">Move from browsing to a serious viewing request with better building context.</p>
          </div>
        </div>
      </section>

      <section className="app-shell section-spacing pt-2" id="top-buildings">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div className="section-heading">
            <span className="kicker">Featured Buildings</span>
            <h2 className="architect-heading mt-4 text-3xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Start with the property that fits your route and lifestyle
            </h2>
            <p className="text-sm text-muted md:text-base">
              Compare the setting, commute, and overall feel of each building before narrowing down to the room option that makes sense for your budget.
            </p>
          </div>
          <Link href="/buildings" className="btn-secondary hidden sm:inline-flex">
            See All Buildings
          </Link>
        </div>

        <PropertyGrid limit={3} />
      </section>

      <section className="app-shell section-spacing">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div className="section-heading">
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
          <div className="mb-7 section-heading">
          <span className="kicker">How We Operate</span>
          <h2
            className="architect-heading mt-4 text-3xl font-semibold text-[#121522] md:text-4xl"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            A simpler rental flow for Durban students
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-muted md:text-base">
            Move from neighbourhood and building fit to room choice and viewing without sorting through scattered, inconsistent listings.
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
        <div className="editorial-card rise p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1.15fr_1fr] md:items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">
                What Matters Most
              </span>
              <h2
                className="mt-2 text-3xl font-semibold text-[#121522] md:text-4xl"
                style={{ fontFamily: 'var(--font-space), sans-serif' }}
              >
                  What renters usually want to know first
              </h2>
              <p className="mt-3 text-sm text-muted md:text-base">
                    Clear pricing, practical building detail, and room options that are easy to compare before you reach out.
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
        <div className="rounded-[1.8rem] border border-[#d4d9e2] bg-[linear-gradient(130deg,#17273b,#1f3a5a)] px-6 py-10 text-white md:px-10 shadow-[0_20px_50px_rgba(19,29,43,0.18)]">
          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#d9e4f5]">Start Your Search</p>
          <h2
            className="mt-3 max-w-2xl text-3xl font-semibold md:text-4xl"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            Find a Durban building that fits your budget, campus route, and move-in timeline.
          </h2>
          <p className="mt-4 max-w-xl text-sm text-[#d9e1ec] md:text-base">
            Start with the building, compare room types, and move into a viewing enquiry with more confidence.
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
