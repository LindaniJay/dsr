import Link from 'next/link';

const faqs = [
  {
    question: 'What kinds of rentals are listed here?',
    answer: 'We list student-friendly rooms, shared apartments, and private studios in areas around Durban that work well for students — and we are adding more all the time.'
  },
  {
    question: 'Which areas in Durban are a good starting point for students?',
    answer: 'We currently have buildings in a few key areas close to UKZN and DUT, with more being added. Each area has a different travel rhythm and price range.'
  },
  {
    question: 'How do I find a room?',
    answer: 'Start on the Buildings page, choose a building based on location and feel, then click into it to see all available rooms with photos, pricing, and features. Click any room for full details.'
  },
  {
    question: 'Can I choose between private and sharing rooms?',
    answer: 'Yes. Inside each building page you can toggle between private and sharing room modes. Each mode shows different pricing, occupancy, and what is included.'
  },
  {
    question: 'What is included in the monthly rent?',
    answer: 'Most rooms include Wi-Fi and water. Electricity policies vary — some buildings include it, some cap usage, and others use prepaid meters. Each room listing spells out exactly what is covered.'
  },
  {
    question: 'How much deposit is required?',
    answer: 'Deposit usually matches one month of rent for the chosen room. The exact amount is shown on each room card so there are no surprises.'
  },
  {
    question: 'Can I do a semester lease or only a full year?',
    answer: 'It depends on the building. Some rooms offer a semester lease, while others require a 12-month commitment. The lease term is shown on every room listing.'
  },
  {
    question: 'How do I book a viewing?',
    answer: 'From any room detail page, click "Ask to View" to send a viewing request. You can also use the Contact page and select the building and room you are interested in.'
  },
  {
    question: 'Are these rentals only for students?',
    answer: 'The positioning is student-focused, but the buildings also work for young professionals looking for affordable, well-located accommodation near Durban campuses.'
  },
  {
    question: 'How does new property inventory get added?',
    answer: 'Property inventory is managed from the admin dashboard. New buildings and rooms appear on the site after photos and details are verified.'
  },
  {
    question: 'Is there a way to compare buildings?',
    answer: 'The Buildings page shows all properties side by side with key stats like price range, campus distance, and neighbourhood. You can shortlist and compare before clicking in.'
  },
  {
    question: 'What documents do I need to apply?',
    answer: 'Generally you will need an ID or passport, proof of student registration, and emergency contact details. Check the Application Guide page for a full checklist.'
  },
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

      <section className="mt-10 editorial-card rise p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
          Still have questions?
        </h2>
        <p className="mt-3 text-sm text-muted md:text-base">
          Get in touch and we will help you find the right building and room for your situation.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/contact" className="btn-primary w-full text-center sm:w-auto">Contact Us</Link>
          <Link href="/buildings" className="btn-secondary w-full text-center sm:w-auto">Browse Buildings</Link>
        </div>
      </section>
    </div>
  );
}
