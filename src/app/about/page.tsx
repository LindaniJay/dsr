import Image from 'next/image';
import Link from 'next/link';

/* ── Stats ── */
const platformStats = [
  { figure: '6', label: 'Buildings Listed', accent: false },
  { figure: '30+', label: 'Room Options', accent: false },
  { figure: '5', label: 'Neighbourhoods', accent: false },
  { figure: '2', label: 'University Anchors', accent: true },
];

/* ── Values ── */
const coreValues = [
  {
    icon: '🏘️',
    title: 'Neighbourhood-first',
    text: 'We organise listings around where students actually live and commute — not by random price feeds.',
  },
  {
    icon: '💡',
    title: 'Transparent Pricing',
    text: 'Every room shows monthly rent, deposit, and lease terms upfront so you can compare without guesswork.',
  },
  {
    icon: '🗺️',
    title: 'Campus Proximity',
    text: 'Distance to UKZN and DUT campuses is core to every listing — because your commute shapes your year.',
  },
  {
    icon: '🔍',
    title: 'Quality Over Quantity',
    text: 'We verify building information before publishing it. Fewer listings, better decisions.',
  },
];

/* ── Team ── */
const teamMembers = [
  {
    name: 'Lindani Jay',
    role: 'Founder & Lead Developer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bio: 'Built the platform from scratch to solve the accommodation discovery problem he saw first-hand as a Durban student.',
  },
  {
    name: 'Operations Team',
    role: 'Property & Renter Relations',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    bio: 'Handles building onboarding, renter enquiries, and property verification across all listed neighbourhoods.',
  },
  {
    name: 'Community Advisors',
    role: 'Student Feedback Network',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
    bio: 'Current and former Durban students who test listings, rate neighbourhoods, and shape the search experience.',
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
  'Home to UKZN (one of Africa\'s leading universities) and DUT (33,000+ students).',
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
              <span className="text-2xl">{value.icon}</span>
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
              Durban is one of South Africa&apos;s largest metros — warm climate, major transport corridors, and two anchor universities that draw tens of thousands of students every year.
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

      {/* ═══ TEAM ═══ */}
      <section className="mt-8 editorial-card p-6 md:p-8 rise" style={{ animationDelay: '20ms' }}>
        <div className="section-heading">
          <span className="kicker">Our Team</span>
          <h2 className="text-3xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            The people behind the platform
          </h2>
          <p className="text-sm text-muted md:text-base">
            A small, focused group working to make Durban student accommodation easier to discover and compare.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {teamMembers.map((member, idx) => (
            <article
              key={member.name}
              className="rounded-[1.4rem] border border-[#d9dee8] bg-white p-3 rise"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.1rem]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
              </div>
              <div className="p-3">
                <h3 className="text-lg font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                  {member.name}
                </h3>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#2e4f7a]">
                  {member.role}
                </p>
                <p className="mt-2 text-sm text-muted">{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
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
