'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { BuildingItem, RoomMode } from '../utils/contentData';

type BuildingRoomExplorerProps = {
  building: BuildingItem;
};

export default function BuildingRoomExplorer({ building }: BuildingRoomExplorerProps) {
  const modes = Array.from(new Set(building.roomOptions.map((room) => room.mode))) as RoomMode[];
  const [activeMode, setActiveMode] = useState<RoomMode>(modes.includes('single') ? 'single' : modes[0]);

  const visibleRooms = building.roomOptions.filter((room) => room.mode === activeMode);

  return (
    <div className="space-y-8">
      <section className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        <article className="panel overflow-hidden">
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

            <div className="grid gap-3">
              {building.gallery.slice(1).map((item) => (
                <div key={item.caption} className="relative min-h-[132px] overflow-hidden rounded-[1.3rem] border border-[#e0e4ec]">
                  <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 22vw" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,16,24,0.04),rgba(11,16,24,0.6))]" />
                  <div className="absolute inset-x-4 bottom-4 text-sm font-medium text-white">{item.caption}</div>
                </div>
              ))}
            </div>
          </div>
        </article>

        <aside className="panel p-6 lg:sticky lg:top-28">
          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#5f7695]">Building Snapshot</p>
          <h2 className="mt-2 text-3xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            {building.name}
          </h2>
          <p className="mt-3 text-sm text-muted">{building.headline}</p>

          <div className="mt-5 grid gap-3">
            <div className="rounded-2xl border border-[#dde2ea] bg-[#f7f9fc] px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5f7695]">From</p>
              <p className="mt-1 text-2xl font-semibold text-[#162033]">R{building.priceFrom}/mo</p>
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

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Book a Viewing
            </Link>
            <Link href="/shop" className="btn-secondary">
              Compare Room Formats
            </Link>
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
              <h2 className="mt-4 text-3xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                Choose how you want to stay in this building
              </h2>
              <p className="mt-3 max-w-3xl text-sm text-muted md:text-base">
                Switch between private and shared room stock without leaving the building page. That keeps the location, gallery, amenities, and commute context visible while you compare price and privacy.
              </p>
            </div>

            <div className="inline-flex rounded-full border border-[#d7dde7] bg-white p-1 shadow-sm">
              {modes.map((mode) => {
                const active = mode === activeMode;

                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setActiveMode(mode)}
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
              <article key={room.id} className="panel overflow-hidden">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image src={room.image} alt={room.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,21,31,0.04),rgba(15,21,31,0.68))]" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/35 bg-white/18 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                    {room.availability}
                  </div>
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white">
                    <div>
                      <p className="text-xs uppercase tracking-[0.13em] text-white/80">{room.leaseTerm}</p>
                      <h3 className="mt-2 text-2xl font-semibold" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                        {room.title}
                      </h3>
                    </div>
                    <div className="rounded-2xl border border-white/30 bg-white/14 px-4 py-2 text-right backdrop-blur-md">
                      <p className="text-[11px] uppercase tracking-[0.12em] text-white/70">From</p>
                      <p className="text-xl font-semibold">R{room.monthlyPrice}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-5">
                  <p className="text-sm text-muted">{room.summary}</p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-[#dde2ea] bg-[#f7f9fc] px-4 py-3 text-sm text-[#324052]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5f7695]">Occupancy</p>
                      <p className="mt-1 font-semibold text-[#162033]">{room.occupancy}</p>
                    </div>
                    <div className="rounded-2xl border border-[#dde2ea] bg-[#f7f9fc] px-4 py-3 text-sm text-[#324052]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5f7695]">Deposit</p>
                      <p className="mt-1 font-semibold text-[#162033]">R{room.deposit}</p>
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

                  <div className="flex flex-wrap gap-3">
                    <Link href="/contact" className="btn-primary">
                      Enquire About This Room
                    </Link>
                    <Link href="/signin" className="btn-secondary">
                      Save and Return
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="panel p-6 lg:sticky lg:top-28">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5f7695]">Resident Signal</p>
          <blockquote className="mt-3 text-base text-[#243041]">“{building.review.quote}”</blockquote>
          <p className="mt-4 text-sm font-semibold text-[#162033]">{building.review.resident}</p>
          <p className="text-sm text-muted">{building.review.detail}</p>

          <div className="soft-divider my-6" />

          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5f7695]">What to verify</p>
          <ul className="mt-4 grid gap-2">
            <li className="rounded-xl border border-[#dde2ea] bg-white px-4 py-3 text-sm text-[#324052]">Ask whether the quoted rent is per bed or per room.</li>
            <li className="rounded-xl border border-[#dde2ea] bg-white px-4 py-3 text-sm text-[#324052]">Confirm utilities, house rules, and viewing slots before paying a deposit.</li>
            <li className="rounded-xl border border-[#dde2ea] bg-white px-4 py-3 text-sm text-[#324052]">Check whether the move-in window matches semester timing.</li>
          </ul>
        </aside>
      </section>
    </div>
  );
}