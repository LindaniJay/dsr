import Image from 'next/image';

type GalleryItem = {
  title: string;
  tag: string;
  image?: string;
};

const galleryItems: GalleryItem[] = [
  {
    title: 'Musgrave and Berea Corridor',
    tag: 'Near campus routes',
  },
  { title: 'Glenwood Shared Housing Pocket', tag: 'Student house cluster' },
  { title: 'Umbilo Room Market', tag: 'Private and shared options' },
  { title: 'Howard College Access', tag: 'UKZN demand route' },
  { title: 'DUT City Movement', tag: 'Inner-city convenience' },
  { title: 'Beach-City Lifestyle Mix', tag: 'Durban context' },
  { title: 'Everyday Essentials', tag: 'Shops, transport, and study life' },
];

export default function GalleryPage() {
  return (
    <div className="app-shell section-spacing">
      <section className="rise">
        <span className="kicker">Visual Archive</span>
        <h1
          className="architect-heading mt-5 text-4xl font-semibold text-[#121522] md:text-6xl"
          style={{ fontFamily: 'var(--font-space), sans-serif' }}
        >
          Neighbourhood Guide
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted md:text-lg">
          A quick visual framing of the Durban areas and movement patterns that matter when choosing where to rent.
        </p>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item, i) => (
          <article key={item.title} className="panel rise overflow-hidden" style={{ animationDelay: `${i * 70}ms` }}>
            <div className="relative aspect-[4/3] bg-[linear-gradient(135deg,#dde5f1,#f0ebe2)] p-3">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="rounded-xl object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="h-full w-full rounded-xl border border-white/70 bg-[rgba(255,255,255,0.65)]" />
              )}
            </div>
            <div className="p-5">
              <h2
                className="text-lg font-semibold text-[#1e3150]"
                style={{ fontFamily: 'var(--font-space), sans-serif' }}
              >
                {item.title}
              </h2>
              <p className="mt-1 text-sm text-muted">{item.tag}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
