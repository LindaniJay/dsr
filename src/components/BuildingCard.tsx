import Image from 'next/image';
import Link from 'next/link';
import type { BuildingItem } from '../utils/contentData';

type BuildingCardProps = {
  building: BuildingItem;
  priority?: boolean;
};

export default function BuildingCard({ building, priority = false }: BuildingCardProps) {
  return (
    <article className="panel rise overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={building.heroImage}
          alt={building.name}
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,17,26,0.05),rgba(12,17,26,0.62))]" />
        <div className="absolute left-4 top-4 rounded-full border border-white/35 bg-white/18 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
          {building.badge}
        </div>
        <div className="absolute inset-x-4 bottom-4 text-white">
          <p className="text-xs uppercase tracking-[0.14em] text-white/80">{building.area}</p>
          <h2 className="mt-2 text-2xl font-semibold" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            {building.name}
          </h2>
        </div>
      </div>

      <div className="space-y-5 p-5 md:p-6">
        <p className="text-sm text-muted">{building.summary}</p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#dce1ea] bg-[#f8fafc] px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5f7695]">From</p>
            <p className="mt-1 text-2xl font-semibold text-[#162033]">R{building.priceFrom}/mo</p>
          </div>
          <div className="rounded-2xl border border-[#dce1ea] bg-[#f8fafc] px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5f7695]">Room Mix</p>
            <p className="mt-1 text-sm font-medium text-[#162033]">Single and sharing options</p>
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