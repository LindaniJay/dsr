import Link from 'next/link';
import PropertyGrid from '../../components/PropertyGrid';
import { buildingCompareChecklist, defaultBuildings, rentalWorkflowStages } from '../../utils/contentData';

export default function BuildingsPage() {
  return (
    <div className="app-shell section-spacing">
      <section className="panel rise overflow-hidden px-6 py-8 md:px-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <div>
            <span className="kicker">Browse Buildings</span>
            <h1 className="architect-heading mt-5 text-4xl font-semibold text-[#121522] md:text-6xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Start with the building, then choose the right room inside it
            </h1>
            <p className="mt-5 max-w-3xl text-base text-muted md:text-lg">
              This is the main rental flow now. Compare the building atmosphere, neighbourhood, campus access, and amenities first. Once a property fits your route and budget, switch between single and sharing rooms on its detail page.
            </p>
          </div>

          <div className="rounded-[1.6rem] border border-[#d7dde7] bg-[linear-gradient(145deg,#1f3350,#2f507a)] p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">Why this flow works</p>
            <h2 className="mt-3 text-2xl font-semibold" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Stronger rental decisions come from property context, not isolated room cards.
            </h2>
            <p className="mt-4 text-sm text-white/78">
              Rental platforms typically help people compare favourites, review property details, book viewings, and then move toward application. This page mirrors that pattern for Durban student accommodation.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8" id="top-buildings">
        <PropertyGrid />
      </section>

      <section className="mt-10 panel rise p-6 md:p-8">
        <div className="mb-6 max-w-2xl">
          <span className="kicker">Rental Workflow</span>
          <h2 className="mt-4 text-3xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            How the search should move from discovery to viewing
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {rentalWorkflowStages.map((stage, index) => (
            <article key={stage.title} className="rounded-[1.4rem] border border-[#dde2ea] bg-white p-5">
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
            Compare buildings with the questions renters actually ask
          </h2>
          <ul className="mt-6 grid gap-3">
            {buildingCompareChecklist.map((item) => (
              <li key={item} className="rounded-2xl border border-[#dde2ea] bg-[#fbfcfe] px-4 py-4 text-sm text-[#324052]">
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-[1.8rem] border border-[#d4dae4] bg-[linear-gradient(145deg,#f8fbff,#eef2f7)] p-6 md:p-8 shadow-[0_12px_32px_rgba(17,24,39,0.08)]">
          <span className="kicker">Next Step</span>
          <h2 className="mt-4 text-3xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            Open a building page, switch room mode, then ask for a viewing with context.
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted md:text-base">
            That is a stronger enquiry than sending a vague message about “a room in Durban.” It gives owners and managers a clear starting point, and it gives renters a better shot at the right fit.
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