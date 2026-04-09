import Link from 'next/link';
import PropertyGrid from '../../components/PropertyGrid';
import { buildingCompareChecklist } from '../../utils/contentData';

export default function BuildingsPage() {
  return (
    <div className="app-shell section-spacing">
      <section className="page-hero rise px-5 py-6 md:px-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <div className="section-heading">
            <span className="kicker">Our Buildings</span>
            <h1 className="architect-heading mt-4 text-3xl font-semibold text-[#121522] md:text-6xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Choose a building, then explore the rooms inside.
            </h1>
            <p className="mt-5 max-w-3xl text-base text-muted md:text-lg">
              Each building has its own character, location, and room options. Click on a building to see all the rooms available, with photos, pricing, and what is included.
            </p>
          </div>

          <div className="tonal-card p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">How It Works</p>
            <h2 className="mt-3 text-2xl font-semibold" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Pick a building. See the rooms. Rent what fits.
            </h2>
            <p className="mt-4 text-sm text-white/78">
              Click any building below to see all room options inside it, with full photo galleries, pricing, and a direct way to rent or ask for a viewing.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8" id="buildings">
        <PropertyGrid />
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <article className="panel rise p-6 md:p-8">
          <span className="kicker">Before You Enquire</span>
          <h2 className="mt-4 text-3xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            Questions that shape your room choice
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
            Pick a building, explore the rooms, then arrange a viewing.
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted md:text-base">
            The strongest enquiries include the room you prefer and your expected move-in timing. That gives the next conversation a clearer starting point.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="#buildings" className="btn-primary w-full text-center sm:w-auto">Browse Buildings</Link>
            <Link href="/contact" className="btn-secondary w-full text-center sm:w-auto">Ask About Viewings</Link>
            <Link href="/apply" className="btn-secondary w-full text-center sm:w-auto">Application Guide</Link>
          </div>
        </article>
      </section>
    </div>
  );
}