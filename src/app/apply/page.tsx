import Link from 'next/link';
import { applicationFaq, applicationReadinessSteps } from '../../utils/siteExperience';

export default function ApplyPage() {
  return (
    <div className="app-shell section-spacing">
      <section className="page-hero rise px-5 py-6 md:px-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-end">
          <div className="section-heading">
            <span className="kicker">Application Guide</span>
            <h1 className="architect-heading text-4xl font-semibold text-[#121522] md:text-6xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Prepare for the rental step before you pay anything.
            </h1>
            <p className="text-base text-muted md:text-lg">
              This guide helps students move from shortlist to application with the right documents, clearer payment expectations, and fewer rushed decisions.
            </p>
          </div>

          <div className="tonal-card p-5 text-white md:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">What this avoids</p>
            <div className="mt-4 grid gap-3 text-sm text-white/82">
              <div className="rounded-2xl border border-white/14 bg-white/10 px-4 py-3">Paying a deposit before you confirm what is included.</div>
              <div className="rounded-2xl border border-white/14 bg-white/10 px-4 py-3">Booking a room that does not match your academic calendar.</div>
              <div className="rounded-2xl border border-white/14 bg-white/10 px-4 py-3">Asking a weak enquiry without building, room mode, or budget context.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {applicationReadinessSteps.map((step, index) => (
          <article key={step.title} className="panel rise p-6" style={{ animationDelay: `${index * 70}ms` }}>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Step {index + 1}</p>
            <h2 className="mt-3 text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              {step.title}
            </h2>
            <p className="mt-3 text-sm text-muted">{step.text}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 editorial-card rise p-6 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className="kicker">Before You Commit</span>
            <h2 className="mt-4 text-3xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Questions worth asking before the money moves.
            </h2>
          </div>
          <ul className="grid gap-3">
            {applicationFaq.map((item) => (
              <li key={item} className="rounded-xl border border-[#d8dee8] bg-white px-4 py-4 text-sm text-[#324052]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-[1.8rem] border border-[#d4d9e2] bg-[linear-gradient(130deg,#17273b,#1f3a5a)] px-5 py-8 text-white md:px-10 md:py-10 shadow-[0_20px_50px_rgba(19,29,43,0.18)]">
        <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#d9e4f5]">Ready to enquire</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
          Choose the building first, then send a viewing request with real context.
        </h2>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/buildings" className="btn-secondary w-full text-center !border-white/35 !bg-white !text-[#1d2a3d] sm:w-auto">Browse Buildings</Link>
          <Link href="/contact" className="btn-secondary w-full text-center !border-white/35 !bg-transparent !text-white hover:!bg-white/10 sm:w-auto">Request a Viewing</Link>
        </div>
      </section>
    </div>
  );
}
