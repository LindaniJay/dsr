import Image from 'next/image';
import Link from 'next/link';
import { neighbourhoodGuides } from '../../utils/siteExperience';

const guideStats = [
  { label: 'Best Use', value: 'Shortlist by route, not only by rent.' },
  { label: 'Look For', value: 'Street feel, shared spaces, and travel rhythm.' },
  { label: 'Decision Trigger', value: 'A building that still works on busy class days.' },
];

type GalleryItem = {
  title: string;
  tag: string;
  image: string;
  description: string;
};

const galleryItems: GalleryItem[] = [
  {
    title: 'Musgrave and Berea Corridor',
    tag: 'Near campus routes',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80',
    description: 'A quieter, more residential tone that still keeps you close to the academic belt and daily essentials.',
  },
  {
    title: 'Glenwood Shared Housing Pocket',
    tag: 'Student house cluster',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
    description: 'Glenwood suits renters who want a more communal setup, lower costs, and practical access to Howard College corridors.',
  },
  {
    title: 'Umbilo Room Market',
    tag: 'Private and shared options',
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=80',
    description: 'Umbilo works for students and early-career renters who prefer a more independent studio or loft feel.',
  },
  {
    title: 'Howard College Access',
    tag: 'UKZN demand route',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=80',
    description: 'Travel time and route reliability matter more than straight-line distance when classes start early.',
  },
  {
    title: 'DUT City Movement',
    tag: 'Inner-city convenience',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
    description: 'Central access is useful, but the best value often comes from balancing city reach with quieter living pockets.',
  },
  {
    title: 'Beach-City Lifestyle Mix',
    tag: 'Durban context',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    description: 'Durban is shaped by its coast, climate, and movement between suburban neighbourhoods and campus-linked zones.',
  },
  {
    title: 'Everyday Essentials',
    tag: 'Shops, transport, and study life',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
    description: 'The most practical rental choices keep groceries, transport, and quiet study time within easy reach.',
  },
];

export default function GalleryPage() {
  return (
    <div className="app-shell section-spacing">
      <section className="page-hero rise px-6 py-8 md:px-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-end">
          <div className="section-heading">
            <span className="kicker">Neighbourhood Guide</span>
            <h1 className="architect-heading text-4xl font-semibold text-[#121522] md:text-6xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              See the places and living patterns behind the listings.
            </h1>
            <p className="text-base text-muted md:text-lg">
              A stronger search starts with the surroundings. Use this visual guide to read the areas, routes, and rental moods that shape student living in Durban.
            </p>
          </div>

          <div className="tonal-card overflow-hidden p-3 text-white">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem]">
              <Image src={galleryItems[3].image} alt={galleryItems[3].title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 45vw" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,16,24,0.05),rgba(11,16,24,0.62))]" />
              <div className="absolute inset-x-5 bottom-5">
                <p className="text-xs uppercase tracking-[0.14em] text-white/72">Movement matters</p>
                <p className="mt-2 text-lg font-medium">The right building feels better when the route to campus still works at the times you actually travel.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {guideStats.map((item, index) => (
          <article key={item.label} className="editorial-card rise p-6" style={{ animationDelay: `${index * 70}ms` }}>
            <p className="stat-label">{item.label}</p>
            <p className="mt-3 text-lg font-semibold text-[#162033]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              {item.value}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item, i) => (
          <article key={item.title} className="editorial-card rise overflow-hidden p-3" style={{ animationDelay: `${i * 70}ms` }}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.1rem]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,16,24,0.08),rgba(11,16,24,0.58))]" />
              <div className="absolute left-4 top-4 rounded-full border border-white/35 bg-white/18 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                {item.tag}
              </div>
            </div>
            <div className="p-5">
              <h2
                className="text-lg font-semibold text-[#1e3150]"
                style={{ fontFamily: 'var(--font-space), sans-serif' }}
              >
                {item.title}
              </h2>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-8 panel rise p-6 md:p-8">
        <div className="mb-6 section-heading">
          <span className="kicker">Area Pages</span>
          <h2 className="text-3xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            Open the neighbourhood pages for a more local decision view.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {neighbourhoodGuides.map((guide) => (
            <article key={guide.slug} className="rounded-[1.4rem] border border-[#d8dee8] bg-white p-5">
              <p className="text-xs uppercase tracking-[0.12em] text-[#6a7891]">Neighbourhood focus</p>
              <h3 className="mt-2 text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                {guide.name}
              </h3>
              <p className="mt-3 text-sm text-muted">{guide.strapline}</p>
              <Link href={`/neighbourhoods/${guide.slug}`} className="btn-secondary mt-5">
                Open Area Page
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 panel rise p-6 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className="kicker">How To Use This Guide</span>
            <h2 className="mt-4 text-3xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Read the area before you commit to the room.
            </h2>
          </div>
          <div className="grid gap-3">
            <div className="rounded-xl border border-[#d9dee8] bg-white px-4 py-4 text-sm text-[#263244]">
              Compare whether the neighbourhood suits your course schedule, transport habits, and budget tolerance.
            </div>
            <div className="rounded-xl border border-[#d9dee8] bg-white px-4 py-4 text-sm text-[#263244]">
              Use the photo sequence to understand the mood of the area, not just the finish level of a single room.
            </div>
            <div className="rounded-xl border border-[#d9dee8] bg-white px-4 py-4 text-sm text-[#263244]">
              Move back into the building pages once you know which surrounding context feels most practical for daily living.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
