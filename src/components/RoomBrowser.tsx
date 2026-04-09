'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import app from '../utils/firebase';
import { defaultBuildings, type BuildingItem, type RoomOption } from '../utils/contentData';
import { isPropertyPublicRecord, parsePropertyRecord } from '../utils/propertyRecords';
import { getAvailabilityClassName, getAvailabilityLabel, inferAvailabilityState } from '../utils/siteExperience';

type RoomModeFilter = 'all' | 'single' | 'sharing';
type CampusFocus = 'all' | 'ukzn' | 'dut';

type FlatRoom = {
  room: RoomOption;
  building: BuildingItem;
};

function getCommuteMinutes(text: string) {
  const match = text.match(/(\d+)/);
  return match ? Number(match[1]) : 999;
}

export default function RoomBrowser() {
  const [buildings, setBuildings] = useState<BuildingItem[]>(defaultBuildings);
  const [roomModeFilter, setRoomModeFilter] = useState<RoomModeFilter>('all');
  const [areaFilter, setAreaFilter] = useState('all');
  const [maxPrice, setMaxPrice] = useState(7000);
  const [campusFocus, setCampusFocus] = useState<CampusFocus>('all');
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const db = getFirestore(app);
        const snapshot = await getDocs(query(collection(db, 'properties'), orderBy('createdAt', 'desc')));
        const parsed = snapshot.docs
          .map((item) => item.data() as Record<string, unknown>)
          .filter((item) => isPropertyPublicRecord(item))
          .map((item) => parsePropertyRecord(item))
          .filter((item): item is BuildingItem => item !== null);

        if (parsed.length > 0) {
          setBuildings(parsed);
        }
      } catch {
        // Keep fallback buildings when Firestore content is unavailable.
      }
    };

    loadProperties();
  }, []);

  const areas = useMemo(() => ['all', ...Array.from(new Set(buildings.map((b) => b.area)))], [buildings]);

  const priceCeiling = useMemo(
    () => Math.max(...buildings.flatMap((b) => b.roomOptions.map((r) => r.monthlyPrice)), 7000),
    [buildings],
  );

  const flatRooms = useMemo(() => {
    const rooms: FlatRoom[] = [];

    for (const building of buildings) {
      for (const room of building.roomOptions) {
        const matchesArea = areaFilter === 'all' || building.area === areaFilter;
        const matchesPrice = room.monthlyPrice <= maxPrice;
        const matchesMode = roomModeFilter === 'all' || room.mode === roomModeFilter;

        if (matchesArea && matchesPrice && matchesMode) {
          rooms.push({ room, building });
        }
      }
    }

    if (campusFocus !== 'all') {
      rooms.sort((a, b) =>
        getCommuteMinutes(a.building.campusAccess[campusFocus]) - getCommuteMinutes(b.building.campusAccess[campusFocus]),
      );
    } else {
      rooms.sort((a, b) => a.room.monthlyPrice - b.room.monthlyPrice);
    }

    return rooms;
  }, [buildings, areaFilter, maxPrice, roomModeFilter, campusFocus]);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <section className="panel rise p-5 md:p-8">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="section-heading">
            <span className="kicker">Filters</span>
            <h2 className="text-2xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Find the room that fits your budget and route.
            </h2>
          </div>

          <div className="rounded-[1.5rem] border border-[#d9dee8] bg-[#f8fafc] px-4 py-4 text-sm text-[#324052]">
            Showing {flatRooms.length} room{flatRooms.length === 1 ? '' : 's'} {roomModeFilter !== 'all' && `(${roomModeFilter})`} up to R{maxPrice}/mo
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <label className="grid gap-2 text-sm text-[#243041]">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Area</span>
            <select
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
              className="w-full rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#5f7695] focus:ring-2 focus:ring-[#d6dfec]"
            >
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area === 'all' ? 'All areas' : area}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm text-[#243041]">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Room Type</span>
            <select
              value={roomModeFilter}
              onChange={(e) => setRoomModeFilter(e.target.value as RoomModeFilter)}
              className="w-full rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#5f7695] focus:ring-2 focus:ring-[#d6dfec]"
            >
              <option value="all">All rooms</option>
              <option value="single">Single / Private</option>
              <option value="sharing">Sharing</option>
            </select>
          </label>

          <label className="grid gap-2 text-sm text-[#243041]">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Max price</span>
            <input
              type="range"
              min={2500}
              max={priceCeiling}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
            <span className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3 text-sm font-semibold text-[#1f3a5a]">Up to R{maxPrice}/mo</span>
          </label>
        </div>

        <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap">
          <button
            type="button"
            onClick={() => setCampusFocus('all')}
            className={campusFocus === 'all' ? 'btn-primary w-full justify-center text-center sm:w-auto' : 'btn-secondary w-full justify-center text-center sm:w-auto'}
          >
            All campuses
          </button>
          <button
            type="button"
            onClick={() => setCampusFocus('ukzn')}
            className={campusFocus === 'ukzn' ? 'btn-primary w-full justify-center text-center sm:w-auto' : 'btn-secondary w-full justify-center text-center sm:w-auto'}
          >
            Best for UKZN
          </button>
          <button
            type="button"
            onClick={() => setCampusFocus('dut')}
            className={campusFocus === 'dut' ? 'btn-primary w-full justify-center text-center sm:w-auto' : 'btn-secondary w-full justify-center text-center sm:w-auto'}
          >
            Best for DUT
          </button>
        </div>
      </section>

      {/* Room Grid */}
      {flatRooms.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {flatRooms.map(({ room, building }) => {
            const isExpanded = expandedRoomId === room.id;
            const availState = inferAvailabilityState(room.availability);

            return (
              <article
                key={room.id}
                className={`panel overflow-hidden rounded-[1.7rem] transition-all ${isExpanded ? 'ring-2 ring-[#2e4f7a] md:col-span-2 xl:col-span-3' : 'hover:-translate-y-1'}`}
              >
                <div className={isExpanded ? 'grid lg:grid-cols-[1fr_1fr]' : ''}>
                  {/* Room Image */}
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={room.image}
                      alt={room.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,17,26,0.06),rgba(12,17,26,0.72))]" />

                    {/* Badges */}
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/35 bg-white/18 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                        {room.mode === 'single' ? 'Private' : 'Sharing'}
                      </span>
                      <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${getAvailabilityClassName(availState)}`}>
                        {getAvailabilityLabel(availState)}
                      </span>
                    </div>

                    {/* Room title + price overlay */}
                    <div className="absolute inset-x-4 bottom-4 flex flex-col items-start gap-3 text-white sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.13em] text-white/80">{building.name} &middot; {building.area}</p>
                        <h3 className="mt-1 text-xl font-semibold sm:text-2xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                          {room.title}
                        </h3>
                      </div>
                      <div className="rounded-2xl border border-white/30 bg-white/14 px-4 py-2 text-left backdrop-blur-md sm:text-right">
                        <p className="text-[11px] uppercase tracking-[0.12em] text-white/70">From</p>
                        <p className="text-xl font-semibold">R{room.monthlyPrice}<span className="text-sm font-normal text-white/70">/mo</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Room Info */}
                  <div className="space-y-4 p-5">
                    <p className="text-sm text-muted">{room.summary}</p>

                    {/* Quick stats */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="stat-chip">
                        <p className="stat-label">Occupancy</p>
                        <p className="stat-value text-sm">{room.occupancy}</p>
                      </div>
                      <div className="stat-chip">
                        <p className="stat-label">Deposit</p>
                        <p className="stat-value text-sm">R{room.deposit}</p>
                      </div>
                    </div>

                    {/* Campus access */}
                    <div className="grid gap-2 text-sm text-[#324052]">
                      <div className="rounded-xl border border-[#e1e6ee] bg-white px-3 py-2">
                        <span className="font-semibold text-[#162033]">UKZN:</span> {building.campusAccess.ukzn}
                      </div>
                      <div className="rounded-xl border border-[#e1e6ee] bg-white px-3 py-2">
                        <span className="font-semibold text-[#162033]">DUT:</span> {building.campusAccess.dut}
                      </div>
                    </div>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="space-y-4 animate-fade-in-up">
                        <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3 text-sm text-[#324052]">
                          <span className="font-semibold text-[#162033]">Lease:</span> {room.leaseTerm}
                        </div>

                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5f7695]">Included Features</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {room.features.map((f) => (
                              <span key={f} className="rounded-full border border-[#d4dae4] bg-white px-3 py-1 text-xs font-medium text-[#405066]">
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5f7695]">Utilities</p>
                          <ul className="mt-2 grid gap-2">
                            {room.utilities.map((u) => (
                              <li key={u} className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-2 text-sm text-[#324052]">
                                {u}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5f7695]">Building Amenities</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {building.amenities.map((a) => (
                              <span key={a} className="rounded-full border border-[#d4dae4] bg-[#f7f8fb] px-3 py-1 text-xs font-medium text-[#405066]">
                                {a}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-[1.2rem] border border-[#dde2ea] bg-[#fbfcfe] px-4 py-3 text-sm text-[#324052]">
                          <span className="font-semibold text-[#162033]">How renting starts:</span> choose the room, send the rent request, then confirm viewing time, deposit terms, and move-in timing with the team.
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setExpandedRoomId(isExpanded ? null : room.id)}
                        className="btn-secondary"
                      >
                        {isExpanded ? 'Show Less' : 'View Details'}
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
                        className="btn-primary"
                      >
                        Rent This Room
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <section className="editorial-card rise p-6 md:p-8">
          <span className="kicker">No Match</span>
          <h2 className="mt-4 text-3xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            No rooms match the current filters.
          </h2>
          <p className="mt-3 text-sm text-muted md:text-base">
            Widen the price range or switch back to all room types to see more options.
          </p>
        </section>
      )}
    </div>
  );
}
