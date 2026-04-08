import Image from 'next/image';

const testimonials = [
  {
    name: 'Londiwe, UKZN student',
    text: 'What helps most is seeing room types and location context together. It cuts out a lot of guessing before you enquire.',
    lens: 'Private-room search',
  },
  {
    name: 'Akhona, DUT student',
    text: 'Shared apartments near the Berea route are usually where I start. This kind of site makes that much clearer than random classifieds.',
    lens: 'Shared-living comparison',
  },
  {
    name: 'Rental operator, Glenwood',
    text: 'A student-specific angle is stronger than advertising a house with no context about campuses, lease type, or what is included.',
    lens: 'Listing quality',
  }
];

export default function TestimonialsPage() {
  return (
    <div className="app-shell section-spacing">
      <section className="page-hero rise px-6 py-8 md:px-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-end">
          <div className="section-heading">
            <span className="kicker">Community Voices</span>
            <h1 className="architect-heading text-4xl font-semibold text-[#121522] md:text-6xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              What renters notice when the search is clearer.
            </h1>
            <p className="text-base text-muted md:text-lg">
              Reviews from students and rental teams who care about building context, room options, and more practical enquiries.
            </p>
          </div>

          <article className="tonal-card overflow-hidden p-3 text-white">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem]">
              <Image
                src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1400&q=80"
                alt="Students reviewing accommodation options together"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,16,24,0.1),rgba(11,16,24,0.7))]" />
              <div className="absolute inset-x-5 bottom-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">Featured insight</p>
                <blockquote className="mt-3 text-xl leading-relaxed text-white">
                  “Seeing the building, the route, and the room type together makes the final decision feel calmer.”
                </blockquote>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-white/70">Student renter perspective</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {testimonials.map((t, idx) => (
          <article key={idx} className="editorial-card rise p-6 md:p-8" style={{ animationDelay: `${idx * 80}ms` }}>
            <p className="stat-label">{t.lens}</p>
            <p className="mt-4 text-lg leading-relaxed text-[#263345] md:text-xl">&quot;{t.text}&quot;</p>
            <p
              className="mt-4 text-sm font-semibold uppercase tracking-[0.08em] text-[#2e4f7a]"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              {t.name}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-8 panel p-6 md:p-8 rise">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="stat-chip">
            <p className="stat-label">What people value</p>
            <p className="mt-2 text-sm text-[#263244]">Knowing the building atmosphere before choosing a room.</p>
          </div>
          <div className="stat-chip">
            <p className="stat-label">What reduces friction</p>
            <p className="mt-2 text-sm text-[#263244]">Clear pricing, utilities, and move-in timing before the first call.</p>
          </div>
          <div className="stat-chip">
            <p className="stat-label">What builds trust</p>
            <p className="mt-2 text-sm text-[#263244]">Honest images, direct neighbourhood context, and better room comparison.</p>
          </div>
        </div>
      </section>

      <section className="mt-8 editorial-card rise p-6 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className="kicker">Why It Matters</span>
            <h2 className="mt-4 text-3xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Better presentation leads to better enquiries.
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-muted md:text-base">
            When renters can read the neighbourhood, building, and room type in one flow, the first conversation becomes more specific. That improves trust for both the person searching and the team handling viewings.
          </p>
        </div>
      </section>
    </div>
  );
}
