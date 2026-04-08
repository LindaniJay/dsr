import Image from 'next/image';
import Link from 'next/link';
import type { BuildingItem } from '../utils/contentData';

type BuildingCardProps = {
  building: BuildingItem;
  priority?: boolean;
};

export default function BuildingCard({ building, priority = false }: BuildingCardProps) {
  return (
    <article className="panel rise overflow-hidden rounded-[1.7rem]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={building.heroImage}
          alt={building.name}
          fill
          priority={priority}
          className="object-cover transition-transform duration-700 hover:scale-[1.05]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,17,26,0.08),rgba(12,17,26,0.74))]" />
        <div className="absolute left-4 top-4 rounded-full border border-white/35 bg-white/18 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
          {building.badge}
        </div>
        <div className="absolute inset-x-4 bottom-4 text-white">
          <p className="text-xs uppercase tracking-[0.14em] text-white/80">{building.area}</p>
          <h2 className="mt-2 text-2xl font-semibold" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            {building.name}
          </h2>
          <p className="mt-2 max-w-sm text-sm text-white/80">{building.headline}</p>
        </div>
      </div>

      <div className="space-y-5 p-5 md:p-6">
        <p className="text-sm text-muted">{building.summary}</p>

        <div className="compact-meta-grid">
          <div className="compact-meta-item">
            <p className="compact-meta-label">From</p>
            <p className="compact-meta-value"><strong>R{building.priceFrom}</strong>/mo</p>
          </div>
          <div className="compact-meta-item">
            <p className="compact-meta-label">Room Mix</p>
            <p className="compact-meta-value">Single and sharing</p>
          </div>
        </div>

        <div className="grid gap-2 text-sm text-[#324052]">
          <div className="rounded-xl border border-[#e1e6ee] bg-white px-4 py-3">
            <span className="font-semibold text-[#162033]">UKZN:</span> {building.campusAccess.ukzn}
          </div>
          <div className="rounded-xl border border-[#e1e6ee] bg-white px-4 py-3">
            <span className="font-semibold text-[#162033]">DUT:</span> {building.campusAccess.dut}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {building.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="rounded-full border border-[#d4dae4] bg-[#f7f8fb] px-3 py-1 text-xs font-medium text-[#405066]"
            >
              {amenity}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href={`/buildings/${building.slug}`} className="btn-primary">
            View Rooms
          </Link>
          <Link href="/contact" className="btn-secondary">
            Ask About Availability
          </Link>
        </div>
      </div>
    </article>
  );
}