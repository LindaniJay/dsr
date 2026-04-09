const guideStages = [
  {
    step: '01',
    title: 'Read the building before the room',
    text: 'Treat the building like the main drawing set. The room is only one layer. First judge the location, access, security, movement, and tone of the whole property.',
  },
  {
    step: '02',
    title: 'Compare single against sharing with discipline',
    text: 'Do not compare only the cheapest number. Compare privacy, storage, desk quality, transport costs, and what you give up or gain each month.',
  },
  {
    step: '03',
    title: 'Use image sequences, not random photos',
    text: 'A strong rental decision comes from seeing arrival, common areas, room layout, and utility spaces in a coherent order, almost like walking the building.',
  },
  {
    step: '04',
    title: 'Ask sharper viewing questions',
    text: 'Good enquiries ask about deposits, utilities, move-in timing, route to campus, and what the quoted rate actually includes.',
  },
];

const decisionLayers = [
  'Neighbourhood and travel logic to UKZN or DUT',
  'Arrival quality, access control, and daily safety signals',
  'Kitchen, laundry, and shared-space condition',
  'Single-room versus sharing tradeoff at the exact building',
  'Deposit, utilities, lease term, and move-in window',
  'Whether the page feels truthful, complete, and well-sequenced',
];

const viewingChecklist = [
  'Ask whether rent is per bed, per room, or for the whole unit.',
  'Check what happens with electricity, Wi-Fi, and water before you pay a deposit.',
  'Walk the route from arrival gate to room, kitchen, and study areas in your head using the image sequence.',
  'Confirm semester timing, admin fees, and notice period before you commit.',
];

const designSignals = [
  {
    title: 'Calm visual hierarchy',
    text: 'Important rental facts should appear before decorative language. Price, route, and room mode should never be buried.',
  },
  {
    title: 'Editorial image rhythm',
    text: 'Exterior first, then the main shared spaces, then the room itself. That order helps renters understand scale and daily experience.',
  },
  {
    title: 'Architectural clarity',
    text: 'The strongest property pages feel composed, measured, and intentional rather than crowded or sales-heavy.',
  },
];

export default function AmbassadorsPage() {
  return (
    <div className="app-shell section-spacing">
      <section className="rise relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 animate-gradient-move bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#caa86a]/30 via-[#2e4f7a]/10 to-transparent opacity-80" />
        <div aria-hidden="true" className="absolute left-1/2 top-0 z-0 h-[320px] w-[540px] -translate-x-1/2 rounded-3xl bg-white/30 shadow-2xl backdrop-blur-2xl blur-2xl" style={{ filter: 'blur(24px)' }} />
        <div aria-hidden="true" className="absolute top-10 left-10 w-16 h-16 rounded-full bg-[#caa86a]/30 blur-2xl animate-float-slow" />
        <div aria-hidden="true" className="absolute bottom-10 right-10 w-20 h-20 rounded-full bg-[#2e4f7a]/20 blur-2xl animate-float-medium" />
        <span className="kicker">Rental Guide</span>
        <h1
          className="architect-heading mt-5 text-4xl font-extrabold text-[#121522] md:text-6xl tracking-tight animate-fade-in-up"
          style={{ fontFamily: 'var(--font-space), sans-serif', letterSpacing: '-0.03em' }}
        >
          <span className="inline-block bg-gradient-to-r from-[#2e4f7a] via-[#caa86a] to-[#2e4f7a] bg-clip-text text-transparent animate-gradient-text drop-shadow-lg">Rent like the building matters</span>
          <span className="block mt-2 animate-fade-in-up delay-150">because it <span className="text-[#caa86a]">does</span></span>
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-muted md:text-xl animate-fade-in-up delay-200">
          Use this guide to compare location, room setup, shared spaces, and monthly costs with a clearer eye before you book a viewing.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="panel p-6 md:p-7 rise transition-shadow duration-300 hover:shadow-2xl">
          <h2
            className="text-2xl font-semibold text-[#121522]"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            How to compare with confidence
          </h2>
          <ul className="mt-4 space-y-2">
            {decisionLayers.map((req, idx) => (
              <li key={idx} className="rounded-lg border border-[#d7dce5] bg-white px-3 py-2 text-sm text-[#2d3746]">
                {req}
              </li>
            ))}
          </ul>
        </article>

        <article className="panel p-6 md:p-7 rise transition-shadow duration-300 hover:shadow-2xl" style={{ animationDelay: '90ms' }}>
          <h2
            className="text-2xl font-semibold text-[#121522]"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            What to check on every listing
          </h2>
          <ul className="mt-4 space-y-2">
            {[
              'Read the building first, then compare the rooms inside it.',
              'Use photo order to understand arrival, shared spaces, and the room itself.',
              'Check what is included in rent before you ask about availability.',
              'Keep your shortlist focused on places that suit your route and budget.',
            ].map((benefit, idx) => (
              <li key={idx} className="rounded-lg border border-[#d7dce5] bg-white px-3 py-2 text-sm text-[#2d3746]">
                {benefit}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-8 panel p-6 md:p-8 rise" style={{ animationDelay: '110ms' }}>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Decision Workflow</span>
            <h2
              className="mt-2 text-3xl font-semibold text-[#121522]"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              A practical way to compare options
            </h2>
          </div>
          <p className="max-w-xl text-sm text-muted md:text-base">
            Start with the building, narrow down the room type, and ask the questions that affect your monthly cost and day-to-day comfort.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {guideStages.map((item, idx) => (
            <article key={item.title} className="rounded-xl border border-[#d9dee8] bg-white p-4 rise" style={{ animationDelay: `${idx * 70}ms` }}>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#edf2f9] text-sm font-semibold text-[#2e4f7a]">
                {item.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
        <article className="panel p-6 md:p-7 rise">
          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Senior Design Signals</span>
          <h2 className="mt-2 text-3xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            What makes a rental page feel composed
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {designSignals.map((item) => (
              <div key={item.title} className="rounded-xl border border-[#d9dee8] bg-white px-4 py-4">
                <h3 className="text-base font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[#263244]">{item.text}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel p-6 md:p-7 rise" style={{ animationDelay: '80ms' }}>
          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Viewing Checklist</span>
          <h2 className="mt-2 text-3xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            Questions to ask before you commit
          </h2>
          <ul className="mt-5 space-y-3">
            {viewingChecklist.map((item) => (
              <li key={item} className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3 text-sm text-[#263244]">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-8 panel p-6 md:p-7 rise" style={{ animationDelay: '140ms' }}>
        <h2
          className="text-2xl font-semibold text-[#121522]"
          style={{ fontFamily: 'var(--font-space), sans-serif' }}
        >
          Why building context matters
        </h2>
        <div className="mt-4 space-y-3 text-sm text-muted">
          <p>
            A room can look good on its own and still be in the wrong building for your routine. Location, access, and shared spaces shape the experience just as much as the room itself.
          </p>
          <p>
            Looking at the full property first helps you judge the details that affect everyday living, from travel time to kitchen quality and study space.
          </p>
          <p className="font-medium text-[#243041]">
            Good rental decisions come from clear information, honest photos, and a room choice that fits your budget.
          </p>
        </div>
      </section>

      <section className="mt-8 panel p-6 md:p-7 rise" style={{ animationDelay: '170ms' }}>
        <div className="grid gap-6 md:grid-cols-[0.95fr_1.05fr] md:items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Next Move</span>
            <h2 className="mt-2 text-3xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Use the guide, then shortlist a building
            </h2>
            <p className="mt-3 text-sm text-muted md:text-base">
              Pick a building that suits your route, compare the room options inside it, and then send a viewing request with the details already in mind.
            </p>
          </div>

          <div className="grid gap-3">
            {[
              'Browse a building with a route that makes sense for your campus.',
              'Compare single and sharing without leaving that property page.',
              'Check utilities, deposit, and move-in timing.',
              'Only then send the enquiry so the conversation starts at the right level.',
            ].map((item) => (
              <div key={item} className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3 text-sm text-[#263244]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
