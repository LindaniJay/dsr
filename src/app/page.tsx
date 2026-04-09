import Link from 'next/link';
import FeaturedRoomGrid from '../components/FeaturedRoomGrid';
import { defaultBuildings } from '../utils/contentData';
import { neighbourhoodGuides } from '../utils/siteExperience';

const residentQuotes = defaultBuildings.map((b) => ({
  quote: b.review.quote,
  resident: b.review.resident,
  detail: b.review.detail,
  building: b.name,
}));

const neighbourhoodPreviews = neighbourhoodGuides.map((ng) => ({
  slug: ng.slug,
  name: ng.name,
  strapline: ng.strapline,
  image: ng.image,
  bestFor: ng.bestFor.slice(0, 2),
}));

export default function Home() {
  return (
    <div>
      <section className="app-shell section-spacing pt-8 md:pt-16">
        <div className="page-hero px-5 py-6 md:px-10 md:py-12">
          <div className="relative z-10 grid gap-6 md:grid-cols-[1.25fr_0.85fr] md:items-end md:gap-8">
            <div className="rise">
            <span className="kicker">Durban Student Accommodation</span>
            <h1
              className="architect-heading mt-4 text-3xl font-extrabold text-[#121522] sm:text-5xl lg:text-7xl tracking-tight"
              style={{ fontFamily: 'var(--font-space), sans-serif', letterSpacing: '-0.03em' }}
            >
              Find well-located student accommodation with less guesswork.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-muted md:text-xl">
              Looking for a place near UKZN or DUT? Browse buildings in your area, check out the rooms inside, and pick the one that fits your budget and routine.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/buildings" className="btn-primary w-full text-center shadow-lg sm:w-auto">
                Browse Rooms
              </Link>
              <Link href="/contact" className="btn-secondary w-full text-center sm:w-auto">
                Ask About Availability
              </Link>
            </div>
            </div>

            <div className="tonal-card rise min-w-0 p-5 text-white md:p-6" style={{ animationDelay: '120ms' }}>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">City Snapshot</p>
              <h2
                className="mt-2 text-2xl font-semibold text-white"
                style={{ fontFamily: 'var(--font-space), sans-serif' }}
              >
                Stay closer to campus. Spend less time commuting.
              </h2>
              <div className="mt-3 flex min-w-0 flex-col gap-4">
                <p className="text-base text-white/80">
                  We list rooms in areas that actually make sense for students — close to campus, easy to get around, and honest about what you are paying for.
                </p>
                <div className="mt-2 grid gap-3 md:grid-cols-3">
                  <div className="min-w-0 rounded-2xl border border-white/12 bg-white/8 px-4 py-4">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-white/65">Focus</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-balance">Campus routes</p>
                  </div>
                  <div className="min-w-0 rounded-2xl border border-white/12 bg-white/8 px-4 py-4">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-white/65">Options</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-balance">Single and sharing</p>
                  </div>
                  <div className="min-w-0 rounded-2xl border border-white/12 bg-white/8 px-4 py-4">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-white/65">Priority</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-balance">Straightforward viewings</p>
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
            <p className="mt-3 text-lg font-semibold text-[#162033]">See how far each building is from your campus so you can plan your commute.</p>
          </div>
          <div className="editorial-card p-6">
            <p className="stat-label">Budget Clarity</p>
            <p className="mt-3 text-lg font-semibold text-[#162033]">Every room shows the price, deposit, and what is included — no hidden costs.</p>
          </div>
          <div className="editorial-card p-6">
            <p className="stat-label">Viewing Ready</p>
            <p className="mt-3 text-lg font-semibold text-[#162033]">Found something you like? Request a viewing or send a rent enquiry straight away.</p>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="app-shell section-spacing pt-2" id="featured-rooms">
        <div className="mb-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="section-heading">
            <span className="kicker">Featured Rooms</span>
            <h2 className="architect-heading mt-4 text-3xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Rooms ready to rent across Durban
            </h2>
            <p className="text-sm text-muted md:text-base">
              Each card shows you the building, price, and availability so you can compare without clicking around.
            </p>
          </div>
          <Link href="/buildings" className="btn-secondary hidden sm:inline-flex">
            See All Buildings
          </Link>
        </div>

        <FeaturedRoomGrid limit={6} />

        <div className="mt-6 flex justify-center sm:hidden">
          <Link href="/buildings" className="btn-secondary">See All Buildings</Link>
        </div>
      </section>

      {/* Neighbourhoods */}
      <section className="app-shell section-spacing pt-2">
        <div className="mb-7 section-heading">
          <span className="kicker">Neighbourhoods</span>
          <h2 className="architect-heading mt-4 text-3xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            Areas we cover
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-muted md:text-base">
            Different areas suit different people. Have a look at where our buildings are and what the vibe is like in each neighbourhood.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {neighbourhoodPreviews.map((ng, i) => (
            <article
              key={ng.slug}
              className="panel rise group overflow-hidden rounded-[1.7rem] transition hover:-translate-y-1"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={ng.image}
                  alt={ng.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,17,26,0.04),rgba(12,17,26,0.72))]" />
                <div className="absolute inset-x-4 bottom-4 text-white">
                  <h3 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                    {ng.name}
                  </h3>
                </div>
              </div>
              <div className="space-y-3 p-5">
                <p className="text-sm text-muted">{ng.strapline}</p>
                <div className="flex flex-wrap gap-2">
                  {ng.bestFor.map((tag) => (
                    <span key={tag} className="rounded-full border border-[#d4dae4] bg-[#f7f8fb] px-3 py-1 text-xs font-medium text-[#405066]">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href="/buildings" className="inline-flex text-xs font-semibold uppercase tracking-[0.1em] text-[#2e4f7a] hover:underline">
                  View buildings &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Resident Voices */}
      <section className="app-shell section-spacing pt-2">
        <div className="mb-7 section-heading">
          <span className="kicker">Resident Voices</span>
          <h2 className="architect-heading mt-4 text-3xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            Hear from students who found their room here
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {residentQuotes.map((rq, i) => (
            <article
              key={rq.resident}
              className="editorial-card rise flex flex-col justify-between p-6"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <blockquote className="text-base font-medium leading-relaxed text-[#1e2a3a]">
                &ldquo;{rq.quote}&rdquo;
              </blockquote>
              <div className="mt-5 border-t border-[#e3e7ed] pt-4">
                <p className="text-sm font-semibold text-[#121522]">{rq.resident}</p>
                <p className="mt-0.5 text-xs text-muted">{rq.building} &middot; {rq.detail}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Link href="/testimonials" className="btn-secondary">Read More Reviews</Link>
        </div>
      </section>

      {/* Renting Checklist */}
      <section className="app-shell section-spacing pt-2">
        <div className="editorial-card rise p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1.15fr_1fr] md:items-start">
            <div>
              <span className="kicker">Before You Enquire</span>
              <h2
                className="mt-4 text-3xl font-semibold text-[#121522] md:text-4xl"
                style={{ fontFamily: 'var(--font-space), sans-serif' }}
              >
                Good questions to ask before your first viewing
              </h2>
              <p className="mt-3 text-sm text-muted md:text-base">
                Knowing what to check saves you time and helps you spot the right place faster.
              </p>
            </div>

            <ul className="grid gap-3">
              <li className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3 text-sm text-[#263244]">
                Is the quoted price per room or per bed in a shared setup?
              </li>
              <li className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3 text-sm text-[#263244]">
                Are Wi-Fi, water, and electricity included, capped, or prepaid?
              </li>
              <li className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3 text-sm text-[#263244]">
                When is the deposit due and what secures the room during intake?
              </li>
              <li className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3 text-sm text-[#263244]">
                Does the building support semester stays or only annual leases?
              </li>
              <li className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3 text-sm text-[#263244]">
                What are the guest, quiet-hours, and cleaning policies?
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="app-shell section-spacing pt-2">
        <div className="rounded-[1.8rem] border border-[#d4d9e2] bg-[linear-gradient(130deg,#17273b,#1f3a5a)] px-5 py-8 text-white md:px-10 md:py-10 shadow-[0_20px_50px_rgba(19,29,43,0.18)]">
          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#d9e4f5]">Start Your Search</p>
          <h2
            className="mt-3 max-w-2xl text-3xl font-semibold md:text-4xl"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            Ready to find your room? Start browsing and see what is available right now.
          </h2>
          <p className="mt-4 max-w-xl text-sm text-[#d9e1ec] md:text-base">
            Pick a building, check out the rooms, and get in touch when you see something that works.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/buildings" className="btn-secondary w-full text-center !border-white/35 !bg-white !text-[#1d2a3d] sm:w-auto">
              Browse Buildings
            </Link>
            <Link href="/contact" className="btn-secondary w-full text-center !border-white/35 !bg-transparent !text-white hover:!bg-white/10 sm:w-auto">
              Ask About Availability
            </Link>
            <Link href="/apply" className="btn-secondary w-full text-center !border-white/35 !bg-transparent !text-white hover:!bg-white/10 sm:w-auto">
              Application Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
