const testimonials = [
  {
    name: 'Londiwe, UKZN student',
    text: 'What helps most is seeing room types and location context together. It cuts out a lot of guessing before you enquire.'
  },
  {
    name: 'Akhona, DUT student',
    text: 'Shared apartments near the Berea route are usually where I start. This kind of site makes that much clearer than random classifieds.'
  },
  {
    name: 'Rental operator, Glenwood',
    text: 'A student-specific angle is stronger than advertising a house with no context about campuses, lease type, or what is included.'
  }
];

export default function TestimonialsPage() {
  return (
    <div className="app-shell section-spacing">
      <section className="rise">
        <span className="kicker">Community Voices</span>
        <h1
          className="architect-heading mt-5 text-4xl font-semibold text-[#121522] md:text-6xl"
          style={{ fontFamily: 'var(--font-space), sans-serif' }}
        >
          Reviews
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted md:text-lg">
          Example feedback from the kinds of renters and operators this rebrand is meant to serve.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        {testimonials.map((t, idx) => (
          <article key={idx} className="panel rise p-6 md:p-8" style={{ animationDelay: `${idx * 80}ms` }}>
            <p className="text-lg leading-relaxed text-[#263345] md:text-xl">&quot;{t.text}&quot;</p>
            <p
              className="mt-4 text-sm font-semibold uppercase tracking-[0.08em] text-[#2e4f7a]"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              {t.name}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
