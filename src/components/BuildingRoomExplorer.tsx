'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import type { BuildingItem, RoomMode } from '../utils/contentData';
import { getBuildingExperience, getAvailabilityClassName, getAvailabilityLabel, inferAvailabilityState } from '../utils/siteExperience';

type BuildingRoomExplorerProps = {
  building: BuildingItem;
};

export default function BuildingRoomExplorer({ building }: BuildingRoomExplorerProps) {
  const modes = Array.from(new Set(building.roomOptions.map((room) => room.mode))) as RoomMode[];
  const [activeMode, setActiveMode] = useState<RoomMode>(modes.includes('single') ? 'single' : modes[0]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [activeRoomImageIndex, setActiveRoomImageIndex] = useState(0);
  const detailRef = useRef<HTMLElement>(null);
  const experience = getBuildingExperience(building.slug);

  const visibleRooms = building.roomOptions.filter((room) => room.mode === activeMode);
  const selectedRoom = visibleRooms.find((room) => room.id === selectedRoomId) ?? null;

  const selectedRoomGallery = selectedRoom
    ? [
        { src: selectedRoom.image, alt: `${selectedRoom.title} main view`, caption: selectedRoom.summary },
        ...building.gallery.filter((item) => item.src !== building.heroImage),
      ].filter((item, index, items) => items.findIndex((entry) => entry.src === item.src) === index).slice(0, 6)
    : [];

  const activeRoomImage = selectedRoomGallery[activeRoomImageIndex] ?? selectedRoomGallery[0] ?? null;

  const handleSelectRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
    setActiveRoomImageIndex(0);
    setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  return (
    <div className="space-y-8">
      {/* Building hero gallery */}
      <section className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        <article className="panel overflow-hidden rounded-[1.8rem]">
          <div className="grid gap-3 p-3 md:grid-cols-[1.35fr_0.65fr]">
            <div className="relative min-h-[300px] overflow-hidden rounded-[1.4rem] md:min-h-[420px]">
              <Image
                src={building.gallery[0].src}
                alt={building.gallery[0].alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,16,24,0.05),rgba(11,16,24,0.72))]" />
              <div className="absolute inset-x-5 bottom-5 text-white">
                <p className="text-xs uppercase tracking-[0.14em] text-white/75">Photo Story</p>
                <p className="mt-2 max-w-xl text-lg font-medium">{building.gallery[0].caption}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 md:grid-cols-1">
              {building.gallery.slice(1).map((item) => (
                <div key={item.caption} className="relative min-h-[96px] overflow-hidden rounded-[1.1rem] border border-[#e0e4ec] md:min-h-[132px] md:rounded-[1.3rem]">
                  <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 22vw" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,16,24,0.04),rgba(11,16,24,0.6))]" />
                  <div className="absolute inset-x-3 bottom-3 text-xs font-medium text-white md:inset-x-4 md:bottom-4 md:text-sm">{item.caption}</div>
                </div>
              ))}
            </div>
          </div>
        </article>

        <aside className="editorial-card p-6 lg:sticky lg:top-28">
          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#5f7695]">Building Snapshot</p>
          <h2 className="mt-2 text-2xl font-semibold text-[#121522] md:text-3xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            {building.name}
          </h2>
          <p className="mt-3 text-sm text-muted">{building.headline}</p>

          <div className="mt-5 grid gap-3">
            <div className="stat-chip">
              <p className="stat-label">From</p>
              <p className="stat-value">R{building.priceFrom}/mo</p>
            </div>
            <div className="rounded-2xl border border-[#dde2ea] bg-white px-4 py-3 text-sm text-[#324052]">
              <span className="font-semibold text-[#162033]">UKZN:</span> {building.campusAccess.ukzn}
            </div>
            <div className="rounded-2xl border border-[#dde2ea] bg-white px-4 py-3 text-sm text-[#324052]">
              <span className="font-semibold text-[#162033]">DUT:</span> {building.campusAccess.dut}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {building.amenities.map((amenity) => (
              <span key={amenity} className="rounded-full border border-[#d4dae4] bg-[#f7f8fb] px-3 py-1 text-xs font-medium text-[#405066]">
                {amenity}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={`/contact?building=${building.slug}`} className="btn-primary w-full text-center sm:w-auto">
              Book a Viewing
            </Link>
            <Link href="/buildings" className="btn-secondary w-full text-center sm:w-auto">
              Back to Buildings
            </Link>
          </div>
        </aside>
      </section>

      {/* Room selector: compact clickable cards */}
      <section>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="kicker">Rooms Inside</span>
            <h2 className="mt-4 text-2xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Click a room to see photos and details
            </h2>
          </div>

          {modes.length > 1 && (
            <div className="flex w-full flex-col rounded-[1.2rem] border border-[#d7dde7] bg-white p-1 shadow-sm sm:inline-flex sm:w-auto sm:flex-row sm:rounded-full">
              {modes.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    setActiveMode(mode);
                    setSelectedRoomId(null);
                    setActiveRoomImageIndex(0);
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${
                    mode === activeMode ? 'bg-[#1f3350] text-white' : 'text-[#223147] hover:bg-[#f4f6f9]'
                  }`}
                >
                  {mode === 'single' ? 'Private rooms' : 'Sharing rooms'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Compact room cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleRooms.map((room) => {
            const isSelected = selectedRoom?.id === room.id;
            const availState = inferAvailabilityState(room.availability);

            return (
              <article
                key={room.id}
                role="button"
                tabIndex={0}
                onClick={() => handleSelectRoom(room.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSelectRoom(room.id); } }}
                className={`panel cursor-pointer overflow-hidden rounded-[1.5rem] transition-all ${isSelected ? 'ring-2 ring-[#2e4f7a] shadow-lg' : 'hover:-translate-y-1 hover:shadow-md'}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={room.image} alt={room.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,17,26,0.04),rgba(12,17,26,0.7))]" />
                  <div className="absolute left-3 top-3 flex gap-2">
                    <span className="rounded-full border border-white/35 bg-white/18 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-md">
                      {room.mode === 'single' ? 'Private' : 'Sharing'}
                    </span>
                    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] ${getAvailabilityClassName(availState)}`}>
                      {getAvailabilityLabel(availState)}
                    </span>
                  </div>
                  <div className="absolute inset-x-3 bottom-3 text-white">
                    <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                      {room.title}
                    </h3>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-xl font-bold">R{room.monthlyPrice}</span>
                      <span className="text-xs text-white/70">/mo</span>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3">
                  <p className="text-xs text-muted">{room.occupancy} &middot; {room.leaseTerm}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Expanded room detail: full gallery + all info + rent / ask to view */}
      {selectedRoom && activeRoomImage && (
        <section ref={detailRef} className="panel overflow-hidden rounded-[1.9rem] border-2 border-[#2e4f7a]/30 bg-white scroll-mt-24">
          <div className="p-4 md:p-6">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
              {/* Gallery */}
              <div>
                <div className="relative min-h-[320px] overflow-hidden rounded-[1.5rem] border border-[#e0e4ec] md:min-h-[480px]">
                  <Image
                    src={activeRoomImage.src}
                    alt={activeRoomImage.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,16,24,0.02),rgba(11,16,24,0.55))]" />
                  <div className="absolute inset-x-5 bottom-5 text-white">
                    <p className="text-xs uppercase tracking-[0.14em] text-white/75">{selectedRoom.title}</p>
                    <p className="mt-2 text-base font-medium md:text-lg">{activeRoomImage.caption}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 md:grid-cols-6">
                  {selectedRoomGallery.map((item, index) => (
                    <button
                      key={`${selectedRoom.id}-thumb-${index}`}
                      type="button"
                      onClick={() => setActiveRoomImageIndex(index)}
                      className={`relative aspect-square overflow-hidden rounded-[0.9rem] border-2 transition ${index === activeRoomImageIndex ? 'border-[#2e4f7a] shadow-md' : 'border-[#dde2ea] hover:border-[#9bb0cc]'}`}
                    >
                      <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="80px" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Room details */}
              <div className="space-y-5">
                <div>
                  <span className="kicker">Room Details</span>
                  <h3 className="mt-3 text-3xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                    {selectedRoom.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted md:text-base">{selectedRoom.summary}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="stat-chip">
                    <p className="stat-label">Monthly rent</p>
                    <p className="stat-value text-base">R{selectedRoom.monthlyPrice}</p>
                  </div>
                  <div className="stat-chip">
                    <p className="stat-label">Deposit</p>
                    <p className="stat-value text-base">R{selectedRoom.deposit}</p>
                  </div>
                  <div className="stat-chip">
                    <p className="stat-label">Occupancy</p>
                    <p className="stat-value text-base">{selectedRoom.occupancy}</p>
                  </div>
                  <div className="stat-chip">
                    <p className="stat-label">Lease</p>
                    <p className="stat-value text-base">{selectedRoom.leaseTerm}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5f7695]">What&apos;s inside this room</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedRoom.features.map((feature) => (
                      <span key={feature} className="rounded-full border border-[#d4dae4] bg-[#f7f8fb] px-3 py-1 text-xs font-medium text-[#405066]">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5f7695]">Included utilities</p>
                  <ul className="mt-3 grid gap-2">
                    {selectedRoom.utilities.map((utility) => (
                      <li key={utility} className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-2 text-sm text-[#324052]">
                        {utility}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5f7695]">Cost breakdown</p>
                  <div className="mt-3 grid gap-2">
                    <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-2 text-sm text-[#324052]">Monthly rate: R{selectedRoom.monthlyPrice}</div>
                    <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-2 text-sm text-[#324052]">Deposit: R{selectedRoom.deposit}</div>
                    <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-2 text-sm text-[#324052]">Utilities: {experience.costSummary.utilitiesPolicy}</div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href={{
                      pathname: '/contact',
                      query: {
                        building: building.slug,
                        roomMode: selectedRoom.mode === 'single' ? 'Single' : 'Sharing',
                        roomId: selectedRoom.id,
                        roomTitle: selectedRoom.title,
                      },
                    }}
                    className="btn-primary w-full text-center sm:w-auto"
                  >
                    Rent This Room
                  </Link>
                  <Link
                    href={`/contact?building=${building.slug}`}
                    className="btn-secondary w-full text-center sm:w-auto"
                  >
                    Ask to View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Resident review */}
      <section className="editorial-card p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5f7695]">Resident Signal</p>
        <blockquote className="mt-3 text-sm text-[#243041] md:text-base">&ldquo;{building.review.quote}&rdquo;</blockquote>
        <p className="mt-4 text-sm font-semibold text-[#162033]">{building.review.resident}</p>
        <p className="text-sm text-muted">{building.review.detail}</p>
      </section>
    </div>
  );
}
