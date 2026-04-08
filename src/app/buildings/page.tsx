import Link from 'next/link';
import PropertyBrowser from '../../components/PropertyBrowser';
import { buildingCompareChecklist, rentalWorkflowStages } from '../../utils/contentData';

export default function BuildingsPage() {
  return (
    <div className="app-shell section-spacing">
      <section className="page-hero rise px-6 py-8 md:px-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <div className="section-heading">
            <span className="kicker">Browse Buildings</span>
            <h1 className="architect-heading mt-5 text-4xl font-semibold text-[#121522] md:text-6xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Find the right building before you narrow down to the room.
            </h1>
            <p className="mt-5 max-w-3xl text-base text-muted md:text-lg">
              Start with location, building character, campus access, security, and shared amenities. Once a property feels right, compare the single and sharing options inside it.
            </p>
          </div>

          <div className="tonal-card p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">Shortlist With More Confidence</p>
            <h2 className="mt-3 text-2xl font-semibold" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              A good room makes more sense inside the right building.
            </h2>
            <p className="mt-4 text-sm text-white/78">
              Seeing the property first makes it easier to judge your route, the overall setting, and the value of the room options available there.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8" id="top-buildings">
        <PropertyBrowser />
      </section>

      <section className="mt-10 editorial-card rise p-6 md:p-8">
        <div className="mb-6 max-w-2xl section-heading">
          <span className="kicker">Rental Workflow</span>
          <h2 className="mt-4 text-3xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            From shortlist to viewing day
          </h2>
          <p className="text-sm text-muted md:text-base">
            A clearer search starts with the property, then moves into room choice, availability, and the details you need before you visit.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {rentalWorkflowStages.map((stage, index) => (
            <article key={stage.title} className="rounded-[1.4rem] border border-[#dde2ea] bg-white p-5 shadow-[0_12px_30px_rgba(18,24,33,0.04)]">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5f7695]">Stage {index + 1}</p>
              <h3 className="mt-2 text-xl font-semibold text-[#162033]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                {stage.title}
              </h3>
              <p className="mt-3 text-sm text-muted">{stage.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <article className="panel rise p-6 md:p-8">
          <span className="kicker">Before You Enquire</span>
          <h2 className="mt-4 text-3xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            Compare buildings with the questions that shape daily living
          </h2>
          <ul className="mt-6 grid gap-3">
            {buildingCompareChecklist.map((item) => (
              <li key={item} className="rounded-2xl border border-[#dde2ea] bg-[#fbfcfe] px-4 py-4 text-sm text-[#324052]">
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-[1.8rem] border border-[#d4dae4] bg-[linear-gradient(145deg,#f8fbff,#f1ece3)] p-6 md:p-8 shadow-[0_12px_32px_rgba(17,24,39,0.08)]">
          <span className="kicker">Next Step</span>
          <h2 className="mt-4 text-3xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            Choose a building, review the room mix, then arrange a viewing.
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted md:text-base">
            The strongest enquiries include the building you prefer, the room type you want, and your expected move-in timing. That gives the next conversation a clearer starting point.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#top-buildings" className="btn-primary">Compare Buildings</Link>
            <Link href="/contact" className="btn-secondary">Ask About Viewings</Link>
          </div>
        </article>
      </section>
    </div>
  );
}