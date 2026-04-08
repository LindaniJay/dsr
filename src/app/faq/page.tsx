const faqs = [
  {
    question: 'What kinds of rentals are listed here?',
    answer: 'The site is currently set up for student-friendly rooms, shared apartments, and private studios around Durban.'
  },
  {
    question: 'Which areas in Durban are a good starting point for students?',
    answer: 'Musgrave, Glenwood, and Umbilo are practical starter zones because they sit within common routes to UKZN and DUT precincts.'
  },
  {
    question: 'How does new property inventory get added?',
    answer: 'Property inventory is managed from the admin dashboard, so the public site stays focused on renters and the building-first search flow.'
  },
  {
    question: 'Are these rentals only for students?',
    answer: 'The positioning is student-focused, but the concept also works for young professionals looking for room rentals in Durban.'
  },
  {
    question: 'Why does the site mention UKZN and DUT so often?',
    answer: 'Those institutions are the clearest demand anchors for student accommodation in Durban, so the product is designed around that reality.'
  }
];

export default function FAQPage() {
  return (
    <div className="app-shell section-spacing">
      <section className="rise">
        <span className="kicker">FAQ</span>
        <h1
          className="architect-heading mt-5 text-4xl font-semibold text-[#121522] md:text-6xl"
          style={{ fontFamily: 'var(--font-space), sans-serif' }}
        >
          Frequently Asked Questions
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted md:text-lg">
          Common questions about Durban student accommodation, room types, and the building-first rental flow.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        {faqs.map((faq, idx) => (
          <article key={idx} className="panel rise p-5 md:p-6" style={{ animationDelay: `${idx * 70}ms` }}>
            <h2
              className="text-lg font-semibold text-[#1d2f4a]"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              {faq.question}
            </h2>
            <p className="mt-2 text-sm text-muted">{faq.answer}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
