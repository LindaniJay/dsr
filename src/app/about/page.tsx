import Image from 'next/image';

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
    title: 'Market Direction',
    caption: 'Durban Student Stays focuses on student-friendly rooms, shared flats, and compact apartments across key neighbourhoods.',
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
  { year: 'Direction', text: 'The platform was reshaped around rooms, shared flats, and rental discovery for Durban students.' },
  { year: 'Launch', text: 'Starter room types, building pages, and direct contact paths were added to the experience.' },
  { year: 'Next', text: 'Expand verified room information, maps, and richer property presentation.' },
];

const storyImages = [
  {
    title: 'Study-led interiors',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80',
    text: 'The strongest student rentals make room for work, cooking, storage, and a calmer evening rhythm.',
  },
  {
    title: 'Neighbourhood logic',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=80',
    text: 'Where you stay matters because it shapes travel cost, safety, and how your day starts and ends.',
  },
  {
    title: 'Building character',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80',
    text: 'Good rental decisions come from seeing the building properly, not only the cheapest room in the list.',
  },
];

const cityPriorities = [
  'Neighbourhoods that reduce transport friction during early and late class hours.',
  'Building layouts that support study, rest, and a predictable weekly routine.',
  'Room options that make rent bands and privacy tradeoffs easier to compare.',
];

export default function AboutPage() {
  return (
    <div className="app-shell section-spacing">
      <section className="page-hero rise px-6 py-8 md:px-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-end">
          <div className="section-heading">
            <span className="kicker">About</span>
            <h1
              className="architect-heading text-4xl font-extrabold text-[#121522] md:text-6xl"
              style={{ fontFamily: 'var(--font-space), sans-serif', letterSpacing: '-0.03em' }}
            >
              A more focused way to search for student accommodation in Durban.
            </h1>
            <p className="text-base text-muted md:text-lg">
              Durban Student Stays is built around the realities that shape student renting here: transport pressure, neighbourhood fit, campus access, and the need to compare building quality before you commit to a room.
            </p>
          </div>

          <div className="editorial-card overflow-hidden p-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem]">
              <Image
                src="https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80"
                alt="Apartment building exterior for student rental context"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,16,24,0.08),rgba(11,16,24,0.58))]" />
              <div className="absolute inset-x-5 bottom-5 text-white">
                <p className="text-xs uppercase tracking-[0.14em] text-white/70">Durban rental context</p>
                <p className="mt-2 max-w-md text-lg font-medium">The strongest student homes balance price, privacy, and a route that still feels manageable every day.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewFacts.map((fact, index) => (
          <article key={fact.label} className="editorial-card p-5 rise" style={{ animationDelay: `${index * 60}ms` }}>
            <p className="stat-label">{fact.label}</p>
            <p className="mt-2 text-lg font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              {fact.value}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-8 editorial-card p-6 md:p-8 rise" style={{ animationDelay: '20ms' }}>
        <div className="section-heading">
          <span className="kicker">Context</span>
          <h2 className="text-3xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            What shapes the way this platform presents rentals
          </h2>
          <p className="text-sm text-muted md:text-base">
            The search experience is built around building quality, travel logic, and everyday use rather than a long feed of disconnected room cards.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {storyImages.map((item, index) => (
            <article key={item.title} className="rounded-[1.4rem] border border-[#d9dee8] bg-white p-3 rise" style={{ animationDelay: `${index * 70}ms` }}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.1rem]">
                <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 30vw" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="editorial-card p-6 md:p-8 rise">
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

        <article className="tonal-card p-6 text-white md:p-8 rise" style={{ animationDelay: '90ms' }}>
          <h2
            className="text-2xl font-semibold text-white"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            Vision
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/78">
            Become a sharper local accommodation layer for Durban, especially around UKZN, DUT, and the student movement patterns that shape where people actually rent.
          </p>
        </article>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <article className="panel p-6 md:p-8 rise" style={{ animationDelay: '40ms' }}>
          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Why Durban</span>
          <h2
            className="mt-2 text-3xl font-semibold text-[#121522]"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            A coastal city with real student housing pressure
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
            Durban is one of South Africa’s largest cities on the Indian Ocean, with a warm humid climate, extensive urban sprawl, and major university traffic. That mix creates recurring demand for rentals that balance cost, transport, and campus access.
          </p>
          <ul className="mt-5 grid gap-3">
            {cityPriorities.map((item) => (
              <li key={item} className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3 text-sm text-[#263244]">
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="editorial-card p-6 md:p-8 rise" style={{ animationDelay: '60ms' }}>
          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Positioning</span>
          <h2 className="mt-2 text-3xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            Stay closer. Commute smarter.
          </h2>
          <p className="mt-3 text-sm text-muted">
            The goal is not only to list rooms. It is to help renters make better choices faster by understanding the building, the route, and the room type together.
          </p>
          <div className="mt-5 grid gap-3">
            {presentationSlides.map((slide) => (
              <div key={slide.title} className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3 text-sm text-[#263244]">
                <span className="font-semibold text-[#121522]">{slide.title}:</span> {slide.caption}
              </div>
            ))}
          </div>
        </article>
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

      <section className="mt-8 editorial-card p-6 md:p-8 rise" style={{ animationDelay: '90ms' }}>
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
              The product is shaped around accommodation discovery, room comparison, and better viewing enquiries for students and young professionals.
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
