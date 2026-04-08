'use client';

import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import app from '../utils/firebase';
import { defaultBuildings, type BuildingItem } from '../utils/contentData';
import { parsePropertyRecord } from '../utils/propertyRecords';
import BuildingMap from './BuildingMap';
import PropertyGrid from './PropertyGrid';

type RoomModeFilter = 'all' | 'single' | 'sharing';

export default function PropertyBrowser() {
  const [buildings, setBuildings] = useState<BuildingItem[]>(defaultBuildings);
  const [activeSlug, setActiveSlug] = useState(defaultBuildings[0]?.slug ?? '');
  const [roomModeFilter, setRoomModeFilter] = useState<RoomModeFilter>('all');
  const [areaFilter, setAreaFilter] = useState('all');
  const [maxPrice, setMaxPrice] = useState(7000);
  const [showNearbyPlaces, setShowNearbyPlaces] = useState(true);
  const [commuteTargets, setCommuteTargets] = useState<Array<'ukzn' | 'dut'>>(['ukzn', 'dut']);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const db = getFirestore(app);
        const snapshot = await getDocs(query(collection(db, 'properties'), orderBy('createdAt', 'desc')));
        const parsed = snapshot.docs
          .map((item) => parsePropertyRecord(item.data() as Record<string, unknown>))
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

  const areas = useMemo(() => ['all', ...Array.from(new Set(buildings.map((building) => building.area)))], [buildings]);

  const priceCeiling = useMemo(
    () => Math.max(...buildings.map((building) => building.priceFrom), 7000),
    [buildings],
  );

  const filteredBuildings = useMemo(() => {
    return buildings.filter((building) => {
      const matchesArea = areaFilter === 'all' || building.area === areaFilter;
      const matchesPrice = building.priceFrom <= maxPrice;
      const matchesRoomMode =
        roomModeFilter === 'all' || building.roomOptions.some((room) => room.mode === roomModeFilter);

      return matchesArea && matchesPrice && matchesRoomMode;
    });
  }, [areaFilter, buildings, maxPrice, roomModeFilter]);

  const resolvedActiveSlug = useMemo(() => {
    if (filteredBuildings.length === 0) {
      return '';
    }

    return filteredBuildings.some((building) => building.slug === activeSlug)
      ? activeSlug
      : filteredBuildings[0].slug;
  }, [activeSlug, filteredBuildings]);

  const toggleCommuteTarget = (target: 'ukzn' | 'dut') => {
    setCommuteTargets((prev) =>
      prev.includes(target) ? prev.filter((item) => item !== target) : [...prev, target],
    );
  };

  return (
    <div className="space-y-8">
      <section className="panel rise p-6 md:p-8">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="section-heading">
            <span className="kicker">Map Filters</span>
            <h2 className="text-3xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Narrow the map before you open a building.
            </h2>
            <p className="text-sm text-muted md:text-base">
              Filter by room type, area, and price band, then switch commute and nearby-place overlays on or off.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-[#d9dee8] bg-[#f8fafc] px-5 py-4 text-sm text-[#324052]">
            Showing {filteredBuildings.length} building{filteredBuildings.length === 1 ? '' : 's'} with {roomModeFilter === 'all' ? 'all room types' : `${roomModeFilter} rooms`} up to R{maxPrice}/mo.
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <label className="grid gap-2 text-sm text-[#243041]">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Area</span>
            <select
              value={areaFilter}
              onChange={(event) => setAreaFilter(event.target.value)}
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
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Room Mode</span>
            <select
              value={roomModeFilter}
              onChange={(event) => setRoomModeFilter(event.target.value as RoomModeFilter)}
              className="w-full rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#5f7695] focus:ring-2 focus:ring-[#d6dfec]"
            >
              <option value="all">All room types</option>
              <option value="single">Single rooms</option>
              <option value="sharing">Sharing rooms</option>
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
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              className="w-full"
            />
            <span className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3 text-sm font-semibold text-[#1f3a5a]">Up to R{maxPrice}/mo</span>
          </label>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setShowNearbyPlaces((prev) => !prev)}
            className={showNearbyPlaces ? 'btn-primary' : 'btn-secondary'}
          >
            {showNearbyPlaces ? 'Hide nearby places' : 'Show nearby places'}
          </button>
          <button
            type="button"
            onClick={() => toggleCommuteTarget('ukzn')}
            className={commuteTargets.includes('ukzn') ? 'btn-primary' : 'btn-secondary'}
          >
            UKZN overlay
          </button>
          <button
            type="button"
            onClick={() => toggleCommuteTarget('dut')}
            className={commuteTargets.includes('dut') ? 'btn-primary' : 'btn-secondary'}
          >
            DUT overlay
          </button>
        </div>
      </section>

      {filteredBuildings.length > 0 ? (
        <>
          <BuildingMap
            buildings={filteredBuildings}
            activeSlug={resolvedActiveSlug}
            onActiveSlugChange={setActiveSlug}
            showNearbyPlaces={showNearbyPlaces}
            commuteTargets={commuteTargets}
          />
          <PropertyGrid buildings={filteredBuildings} />
        </>
      ) : (
        <section className="editorial-card rise p-6 md:p-8">
          <span className="kicker">No Match</span>
          <h2 className="mt-4 text-3xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            No buildings match the current filters.
          </h2>
          <p className="mt-3 text-sm text-muted md:text-base">
            Widen the price range or switch back to all room types to see more buildings on the map.
          </p>
        </section>
      )}
    </div>
  );
}