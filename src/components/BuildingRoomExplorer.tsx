'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { BuildingItem, RoomMode } from '../utils/contentData';
import { getBuildingExperience, getAvailabilityClassName, getAvailabilityLabel, inferAvailabilityState } from '../utils/siteExperience';

type BuildingRoomExplorerProps = {
  building: BuildingItem;
};

export default function BuildingRoomExplorer({ building }: BuildingRoomExplorerProps) {
  const modes = Array.from(new Set(building.roomOptions.map((room) => room.mode))) as RoomMode[];
  const [activeMode, setActiveMode] = useState<RoomMode>(modes.includes('single') ? 'single' : modes[0]);
  const [selectedRoomIds, setSelectedRoomIds] = useState<Record<RoomMode, string>>({
    single: building.roomOptions.find((room) => room.mode === 'single')?.id ?? '',
    sharing: building.roomOptions.find((room) => room.mode === 'sharing')?.id ?? '',
  });
  const [activeRoomImageIndex, setActiveRoomImageIndex] = useState(0);
  const experience = getBuildingExperience(building.slug);

  const visibleRooms = building.roomOptions.filter((room) => room.mode === activeMode);
  const selectedRoom = visibleRooms.find((room) => room.id === selectedRoomIds[activeMode]) ?? visibleRooms[0] ?? null;

  const selectedRoomGallery = selectedRoom
    ? [
        {
          src: selectedRoom.image,
          alt: `${selectedRoom.title} main view`,
          caption: selectedRoom.summary,
        },
        ...building.gallery.filter((item) => item.src !== building.heroImage),
      ].filter((item, index, items) => items.findIndex((entry) => entry.src === item.src) === index).slice(0, 4)
    : [];

  const activeRoomImage = selectedRoomGallery[activeRoomImageIndex] ?? selectedRoomGallery[0] ?? null;

  const roomEnquiryHref = selectedRoom
    ? {
        pathname: '/contact',
        query: {
          building: building.slug,
          roomMode: selectedRoom.mode === 'single' ? 'Single' : 'Sharing',
          roomId: selectedRoom.id,
          roomTitle: selectedRoom.title,
        },
      }
    : {
        pathname: '/contact',
        query: { building: building.slug },
      };

  return (
    <div className="space-y-8">
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
              <span
                key={amenity}
                className="rounded-full border border-[#d4dae4] bg-[#f7f8fb] px-3 py-1 text-xs font-medium text-[#405066]"
              >
                {amenity}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={`/contact?building=${building.slug}`} className="btn-primary w-full text-center sm:w-auto">
              Book a Viewing
            </Link>
            <Link href="/shop" className="btn-secondary w-full text-center sm:w-auto">
              Compare Room Formats
            </Link>
          </div>

          <div className="soft-divider my-6" />

          <div className="grid gap-3 text-sm text-[#324052]">
            <div className="rounded-2xl border border-[#dde2ea] bg-white px-4 py-3">
              <span className="font-semibold text-[#162033]">Best for:</span> {experience.bestFor}
            </div>
            <div className="rounded-2xl border border-[#dde2ea] bg-white px-4 py-3">
              <span className="font-semibold text-[#162033]">Reply expectation:</span> {experience.operator.responseTime}
            </div>
          </div>

          <div className="soft-divider my-6" />

          <div className="space-y-3 text-sm text-[#324052]">
            {building.workflowNotes.map((note, index) => (
              <div key={note} className="flex gap-3 rounded-2xl border border-[#dde2ea] bg-white px-4 py-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e9eef6] font-semibold text-[#1c3354]">
                  {index + 1}
                </span>
                <span>{note}</span>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="kicker">Room Selector</span>
              <h2 className="mt-4 text-2xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                Room options inside this building
              </h2>
              <p className="mt-3 max-w-3xl text-sm text-muted md:text-base">
                Compare private and shared options while keeping the building details, amenities, and commute information in view.
              </p>
            </div>

            <div className="flex w-full flex-col rounded-[1.2rem] border border-[#d7dde7] bg-white p-1 shadow-sm sm:inline-flex sm:w-auto sm:flex-row sm:rounded-full">
              {modes.map((mode) => {
                const active = mode === activeMode;

                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => {
                      setActiveMode(mode);
                      setActiveRoomImageIndex(0);
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${
                      active ? 'bg-[#1f3350] text-white' : 'text-[#223147] hover:bg-[#f4f6f9]'
                    }`}
                  >
                    {mode === 'single' ? 'Single rooms' : 'Sharing rooms'}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {visibleRooms.map((room) => (
              <article
                key={room.id}
                className={`panel overflow-hidden rounded-[1.7rem] transition ${selectedRoom?.id === room.id ? 'ring-2 ring-[#2e4f7a]' : 'hover:-translate-y-1'}`}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setSelectedRoomIds((prev) => ({ ...prev, [room.mode]: room.id }));
                  setActiveRoomImageIndex(0);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedRoomIds((prev) => ({ ...prev, [room.mode]: room.id }));
                    setActiveRoomImageIndex(0);
                  }
                }}
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image src={room.image} alt={room.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,21,31,0.04),rgba(15,21,31,0.68))]" />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <div className="rounded-full border border-white/35 bg-white/18 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                      {room.availability}
                    </div>
                    <div className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${getAvailabilityClassName(inferAvailabilityState(room.availability))}`}>
                      {getAvailabilityLabel(inferAvailabilityState(room.availability))}
                    </div>
                  </div>
                  <div className="absolute inset-x-4 bottom-4 flex flex-col items-start gap-3 text-white sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.13em] text-white/80">{room.leaseTerm}</p>
                      <h3 className="mt-2 text-2xl font-semibold" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                        {room.title}
                      </h3>
                    </div>
                    <div className="rounded-2xl border border-white/30 bg-white/14 px-4 py-2 text-left backdrop-blur-md sm:text-right">
                      <p className="text-[11px] uppercase tracking-[0.12em] text-white/70">From</p>
                      <p className="text-xl font-semibold">R{room.monthlyPrice}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-5">
                  <p className="text-sm text-muted">{room.summary}</p>

                  <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3 text-sm text-[#324052]">
                    <span className="font-semibold text-[#162033]">Best for:</span> {room.mode === 'single' ? 'More privacy and quieter study time' : 'Lower monthly spend and shared daily routines'}
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="stat-chip">
                      <p className="stat-label">Occupancy</p>
                      <p className="stat-value text-base">{room.occupancy}</p>
                    </div>
                    <div className="stat-chip">
                      <p className="stat-label">Deposit</p>
                      <p className="stat-value text-base">R{room.deposit}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5f7695]">Included Features</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {room.features.map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full border border-[#d4dae4] bg-white px-3 py-1 text-xs font-medium text-[#405066]"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5f7695]">Utilities</p>
                    <ul className="mt-3 grid gap-2">
                      {room.utilities.map((utility) => (
                        <li key={utility} className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3 text-sm text-[#324052]">
                          {utility}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5f7695]">Cost breakdown</p>
                    <div className="mt-3 grid gap-2">
                      <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3 text-sm text-[#324052]">Monthly rate: R{room.monthlyPrice}</div>
                      <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3 text-sm text-[#324052]">Deposit: R{room.deposit}</div>
                      <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3 text-sm text-[#324052]">Utilities policy: {experience.costSummary.utilitiesPolicy}</div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <button
                      type="button"
                      className="btn-secondary w-full sm:w-auto"
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedRoomIds((prev) => ({ ...prev, [room.mode]: room.id }));
                        setActiveRoomImageIndex(0);
                      }}
                    >
                      View Room Details
                    </button>
                    <Link
                      href={{
                        pathname: '/contact',
                        query: {
                          building: building.slug,
                          roomMode: room.mode === 'single' ? 'Single' : 'Sharing',
                          roomId: room.id,
                          roomTitle: room.title,
                        },
                      }}
                      className="btn-primary w-full text-center sm:w-auto"
                      onClick={(event) => event.stopPropagation()}
                    >
                      Rent This Room
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {selectedRoom && activeRoomImage && (
            <section className="panel overflow-hidden rounded-[1.9rem] border border-[#d7dde7] bg-white">
              <div className="grid gap-6 p-4 md:grid-cols-[1.2fr_0.8fr] md:p-6">
                <div>
                  <div className="relative min-h-[320px] overflow-hidden rounded-[1.5rem] border border-[#e0e4ec] md:min-h-[440px]">
                    <Image
                      src={activeRoomImage.src}
                      alt={activeRoomImage.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,16,24,0.02),rgba(11,16,24,0.68))]" />
                    <div className="absolute inset-x-5 bottom-5 text-white">
                      <p className="text-xs uppercase tracking-[0.14em] text-white/75">Selected room</p>
                      <p className="mt-2 text-lg font-medium">{activeRoomImage.caption}</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                    {selectedRoomGallery.map((item, index) => (
                      <button
                        key={`${selectedRoom.id}-${item.src}`}
                        type="button"
                        onClick={() => setActiveRoomImageIndex(index)}
                        className={`relative min-h-[92px] overflow-hidden rounded-[1.1rem] border ${index === activeRoomImageIndex ? 'border-[#2e4f7a]' : 'border-[#dde2ea]'}`}
                      >
                        <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 14vw" />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,16,24,0.08),rgba(11,16,24,0.54))]" />
                        <span className="absolute inset-x-3 bottom-3 text-left text-[11px] font-medium text-white">Photo {index + 1}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <aside className="space-y-5">
                  <div>
                    <span className="kicker">Room details</span>
                    <h3 className="mt-3 text-3xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                      {selectedRoom.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted md:text-base">{selectedRoom.summary}</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
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
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5f7695]">What this room has</p>
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
                        <li key={utility} className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3 text-sm text-[#324052]">
                          {utility}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[1.4rem] border border-[#dde2ea] bg-[#fbfcfe] px-5 py-4 text-sm text-[#324052]">
                    <span className="font-semibold text-[#162033]">How renting starts:</span> choose the room, send the rent request, then confirm viewing time, deposit terms, and move-in timing with the team.
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link href={roomEnquiryHref} className="btn-primary w-full text-center sm:w-auto">
                      Rent This Room
                    </Link>
                    <Link href={`/contact?building=${building.slug}`} className="btn-secondary w-full text-center sm:w-auto">
                      Ask About Another Room
                    </Link>
                  </div>
                </aside>
              </div>
            </section>
          )}
        </div>

        <aside className="editorial-card p-6 lg:sticky lg:top-28">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5f7695]">Resident Signal</p>
          <blockquote className="mt-3 text-sm text-[#243041] md:text-base">“{building.review.quote}”</blockquote>
          <p className="mt-4 text-sm font-semibold text-[#162033]">{building.review.resident}</p>
          <p className="text-sm text-muted">{building.review.detail}</p>

          <div className="soft-divider my-6" />

          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5f7695]">What to verify</p>
          <ul className="mt-4 grid gap-2">
            <li className="rounded-xl border border-[#dde2ea] bg-white px-4 py-3 text-sm text-[#324052]">{experience.costSummary.depositRule}</li>
            <li className="rounded-xl border border-[#dde2ea] bg-white px-4 py-3 text-sm text-[#324052]">{experience.costSummary.adminFee}</li>
            <li className="rounded-xl border border-[#dde2ea] bg-white px-4 py-3 text-sm text-[#324052]">{experience.costSummary.moveInWindow}</li>
          </ul>

          <div className="soft-divider my-6" />

          <Link href={`/neighbourhoods/${experience.neighbourhoodSlug}`} className="btn-secondary w-full justify-center text-center">
            Explore This Neighbourhood
          </Link>
        </aside>
      </section>
    </div>
  );
}