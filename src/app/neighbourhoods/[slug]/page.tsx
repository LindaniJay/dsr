import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getNeighbourhoodBySlug, neighbourhoodGuides } from '../../../utils/siteExperience';

type NeighbourhoodPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return neighbourhoodGuides.map((guide) => ({ slug: guide.slug }));
}

export default async function NeighbourhoodPage({ params }: NeighbourhoodPageProps) {
  const { slug } = await params;
  const guide = getNeighbourhoodBySlug(slug);

  if (!guide) {
    notFound();
  }

  return (
    <div className="app-shell section-spacing">
      <section className="page-hero rise overflow-hidden px-5 py-6 md:px-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-[1fr_0.95fr] md:items-end">
          <div className="section-heading">
            <span className="kicker">Neighbourhood Focus</span>
            <h1 className="architect-heading text-4xl font-semibold text-[#121522] md:text-6xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              {guide.name}
            </h1>
            <p className="text-base text-muted md:text-lg">{guide.hero}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] border border-[#d8dee8]">
            <Image src={guide.image} alt={guide.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 45vw" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,16,24,0.08),rgba(11,16,24,0.6))]" />
            <div className="absolute inset-x-5 bottom-5 text-white">
              <p className="text-xs uppercase tracking-[0.13em] text-white/75">Rental pattern</p>
              <p className="mt-2 text-lg font-medium">{guide.strapline}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <article className="editorial-card p-6">
          <p className="stat-label">Commute focus</p>
          <p className="mt-3 text-lg font-semibold text-[#162033]">{guide.commuteFocus}</p>
        </article>
        <article className="editorial-card p-6">
          <p className="stat-label">Rent positioning</p>
          <p className="mt-3 text-lg font-semibold text-[#162033]">{guide.rentPositioning}</p>
        </article>
        <article className="editorial-card p-6">
          <p className="stat-label">Atmosphere</p>
          <p className="mt-3 text-lg font-semibold text-[#162033]">{guide.atmosphere}</p>
        </article>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        <article className="panel p-6">
          <span className="kicker">Best For</span>
          <div className="mt-4 grid gap-3">
            {guide.bestFor.map((item) => (
              <div key={item} className="rounded-xl border border-[#d8dee8] bg-white px-4 py-3 text-sm text-[#324052]">{item}</div>
            ))}
          </div>
        </article>
        <article className="panel p-6">
          <span className="kicker">Watch For</span>
          <div className="mt-4 grid gap-3">
            {guide.watchFor.map((item) => (
              <div key={item} className="rounded-xl border border-[#d8dee8] bg-white px-4 py-3 text-sm text-[#324052]">{item}</div>
            ))}
          </div>
        </article>
        <article className="panel p-6">
          <span className="kicker">Local Markers</span>
          <div className="mt-4 grid gap-3">
            {guide.landmarks.map((item) => (
              <div key={item} className="rounded-xl border border-[#d8dee8] bg-white px-4 py-3 text-sm text-[#324052]">{item}</div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-8 rounded-[1.8rem] border border-[#d4d9e2] bg-[linear-gradient(130deg,#17273b,#1f3a5a)] px-5 py-8 text-white md:px-10 md:py-10 shadow-[0_20px_50px_rgba(19,29,43,0.18)]">
        <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#d9e4f5]">Next move</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
          Use the neighbourhood context, then return to the buildings with a clearer filter.
        </h2>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/buildings" className="btn-secondary w-full text-center !border-white/35 !bg-white !text-[#1d2a3d] sm:w-auto">Browse Buildings</Link>
          <Link href="/contact" className="btn-secondary w-full text-center !border-white/35 !bg-transparent !text-white hover:!bg-white/10 sm:w-auto">Request a Viewing</Link>
        </div>
      </section>
    </div>
  );
}
