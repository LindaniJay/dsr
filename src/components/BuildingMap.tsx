'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Map, { Layer, Marker, NavigationControl, Popup, Source, type ViewState } from 'react-map-gl/maplibre';
import type { Feature, FeatureCollection, LineString } from 'geojson';
import { campusAnchors, type BuildingItem } from '../utils/contentData';

type BuildingMapProps = {
  buildings: BuildingItem[];
  activeSlug: string;
  onActiveSlugChange: (slug: string) => void;
  showNearbyPlaces: boolean;
  commuteTargets: Array<'ukzn' | 'dut'>;
};

const mapStyle = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

const linePaint = {
  'line-color': '#1f3a5a',
  'line-opacity': 0.65,
  'line-width': 3,
};

function getRoomCount(building: BuildingItem, mode: 'single' | 'sharing') {
  return building.roomOptions.filter((room) => room.mode === mode).length;
}

function getBounds(buildings: BuildingItem[]) {
  const latitudes = buildings.map((building) => building.coordinates.latitude);
  const longitudes = buildings.map((building) => building.coordinates.longitude);

  return {
    minLatitude: Math.min(...latitudes),
    maxLatitude: Math.max(...latitudes),
    minLongitude: Math.min(...longitudes),
    maxLongitude: Math.max(...longitudes),
  };
}

function getInitialView(buildings: BuildingItem[]): ViewState {
  const { minLatitude, maxLatitude, minLongitude, maxLongitude } = getBounds(buildings);

  return {
    latitude: (minLatitude + maxLatitude) / 2,
    longitude: (minLongitude + maxLongitude) / 2,
    zoom: 12.3,
    bearing: 0,
    pitch: 0,
    padding: { top: 48, bottom: 48, left: 48, right: 48 },
  };
}

export default function BuildingMap({ buildings, activeSlug, onActiveSlugChange, showNearbyPlaces, commuteTargets }: BuildingMapProps) {
  const [selectedNearbyId, setSelectedNearbyId] = useState<string | null>(null);

  const activeBuilding = useMemo(
    () => buildings.find((building) => building.slug === activeSlug) ?? buildings[0] ?? null,
    [activeSlug, buildings],
  );

  const selectedNearbyPlace = useMemo(
    () => activeBuilding?.nearbyPlaces.find((place) => place.id === selectedNearbyId) ?? null,
    [activeBuilding, selectedNearbyId],
  );

  const initialViewState = useMemo(() => getInitialView(buildings), [buildings]);

  const commuteFeatures = useMemo<FeatureCollection<LineString>>(() => {
    if (!activeBuilding || commuteTargets.length === 0) {
      return { type: 'FeatureCollection', features: [] };
    }

    const features: Feature<LineString>[] = campusAnchors
      .filter((campus) => commuteTargets.includes(campus.id))
      .map((campus) => ({
        type: 'Feature',
        properties: {
          id: campus.id,
          name: campus.name,
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [activeBuilding.coordinates.longitude, activeBuilding.coordinates.latitude],
            [campus.coordinates.longitude, campus.coordinates.latitude],
          ],
        },
      }));

    return {
      type: 'FeatureCollection',
      features,
    };
  }, [activeBuilding, commuteTargets]);

  if (buildings.length === 0 || !activeBuilding) {
    return null;
  }

  return (
    <section className="editorial-card rise p-5 md:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div>
          <div className="section-heading">
            <span className="kicker">Interactive Map</span>
            <h2 className="text-2xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Compare buildings, room mixes, and nearby essentials on a live map.
            </h2>
            <p className="text-sm text-muted md:text-base">
              Click a building marker to inspect room availability, nearby essentials, and the commute links to key campuses.
            </p>
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.8rem] border border-[#d8dde6]">
            <Map
              initialViewState={initialViewState}
              mapStyle={mapStyle}
              style={{ width: '100%', height: 420 }}
            >
              <NavigationControl position="top-right" showCompass={false} />

              {commuteFeatures.features.length > 0 && (
                <Source id="commute-lines" type="geojson" data={commuteFeatures}>
                  <Layer id="commute-line" type="line" paint={linePaint} />
                </Source>
              )}

              {campusAnchors
                .filter((campus) => commuteTargets.includes(campus.id))
                .map((campus) => (
                  <Marker
                    key={campus.id}
                    longitude={campus.coordinates.longitude}
                    latitude={campus.coordinates.latitude}
                    anchor="bottom"
                  >
                    <div className="rounded-full border border-[#d9dee8] bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#1f3a5a] shadow-[0_8px_20px_rgba(19,29,43,0.14)]">
                      {campus.shortLabel}
                    </div>
                  </Marker>
                ))}

              {buildings.map((building) => {
                const active = building.slug === activeBuilding.slug;

                return (
                  <Marker
                    key={building.slug}
                    longitude={building.coordinates.longitude}
                    latitude={building.coordinates.latitude}
                    anchor="bottom"
                  >
                    <button
                      type="button"
                      onClick={() => onActiveSlugChange(building.slug)}
                      className={`max-w-[132px] truncate rounded-full border-2 px-2.5 py-1.5 text-[11px] font-semibold shadow-[0_10px_22px_rgba(19,29,43,0.18)] md:max-w-none md:px-3 md:py-2 md:text-xs ${
                        active ? 'border-[#1f3a5a] bg-[#1f3a5a] text-white' : 'border-white bg-[#b99258] text-white'
                      }`}
                    >
                      {building.name}
                    </button>
                  </Marker>
                );
              })}

              {showNearbyPlaces &&
                activeBuilding.nearbyPlaces.map((place) => (
                  <Marker
                    key={place.id}
                    longitude={place.coordinates.longitude}
                    latitude={place.coordinates.latitude}
                    anchor="bottom"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedNearbyId(place.id)}
                      className="rounded-full border border-[#d9dee8] bg-white px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#435267] shadow-[0_8px_20px_rgba(19,29,43,0.12)]"
                    >
                      {place.category}
                    </button>
                  </Marker>
                ))}

              <Popup
                longitude={activeBuilding.coordinates.longitude}
                latitude={activeBuilding.coordinates.latitude}
                closeButton={false}
                closeOnClick={false}
                anchor="top"
                offset={24}
                className="[&_.maplibregl-popup-content]:!rounded-2xl [&_.maplibregl-popup-content]:!border [&_.maplibregl-popup-content]:!border-[#d9dee8] [&_.maplibregl-popup-content]:!bg-white [&_.maplibregl-popup-content]:!p-0 [&_.maplibregl-popup-tip]:!border-t-white"
              >
                <div className="min-w-[180px] max-w-[220px] p-4 text-sm text-[#243041] md:min-w-[240px] md:max-w-none">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">{activeBuilding.area}</p>
                  <p className="mt-2 text-lg font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                    {activeBuilding.name}
                  </p>
                  <p className="mt-3 text-xs text-muted">
                    {getRoomCount(activeBuilding, 'single')} single rooms · {getRoomCount(activeBuilding, 'sharing')} sharing rooms
                  </p>
                </div>
              </Popup>

              {showNearbyPlaces && selectedNearbyPlace && (
                <Popup
                  longitude={selectedNearbyPlace.coordinates.longitude}
                  latitude={selectedNearbyPlace.coordinates.latitude}
                  anchor="top"
                  onClose={() => setSelectedNearbyId(null)}
                  className="[&_.maplibregl-popup-content]:!rounded-2xl [&_.maplibregl-popup-content]:!border [&_.maplibregl-popup-content]:!border-[#d9dee8] [&_.maplibregl-popup-content]:!bg-white [&_.maplibregl-popup-content]:!p-0 [&_.maplibregl-popup-tip]:!border-t-white"
                >
                  <div className="min-w-[180px] max-w-[220px] p-4 text-sm text-[#243041] md:min-w-[220px] md:max-w-none">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">{selectedNearbyPlace.category}</p>
                    <p className="mt-2 text-base font-semibold text-[#121522]">{selectedNearbyPlace.name}</p>
                    <p className="mt-2 text-sm text-muted">{selectedNearbyPlace.distance}</p>
                  </div>
                </Popup>
              )}
            </Map>
          </div>
        </div>

        <aside className="panel p-6 lg:sticky lg:top-28">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5f7695]">Selected Building</p>
          <h3 className="mt-3 text-2xl font-semibold text-[#121522] md:text-3xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            {activeBuilding.name}
          </h3>
          <p className="mt-3 text-sm text-muted">{activeBuilding.headline}</p>

          <div className="mt-5 grid gap-3">
            <div className="stat-chip">
              <p className="stat-label">From</p>
              <p className="stat-value">R{activeBuilding.priceFrom}/mo</p>
            </div>
            <div className="stat-chip">
              <p className="stat-label">Commute</p>
              <p className="mt-2 text-sm text-[#243041]">{activeBuilding.campusAccess.ukzn} · {activeBuilding.campusAccess.dut}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {activeBuilding.roomOptions.map((room) => (
              <article key={room.id} className="rounded-2xl border border-[#dde2ea] bg-white px-4 py-4 text-sm text-[#324052]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#162033]">{room.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.1em] text-[#5f7695]">
                      {room.mode === 'single' ? 'Single room' : 'Sharing room'} · {room.availability}
                    </p>
                  </div>
                  <span className="rounded-full border border-[#d9dee8] bg-[#f7f9fc] px-2.5 py-1 text-xs font-semibold text-[#1f3a5a]">
                    R{room.monthlyPrice}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {showNearbyPlaces && (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5f7695]">Nearby Places</p>
              <div className="mt-3 space-y-2">
                {activeBuilding.nearbyPlaces.map((place) => (
                  <article key={place.id} className="rounded-xl border border-[#dde2ea] bg-white px-4 py-3 text-sm text-[#324052]">
                    <p className="font-semibold text-[#162033]">{place.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.1em] text-[#5f7695]">{place.category} · {place.distance}</p>
                  </article>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={`/buildings/${activeBuilding.slug}`} className="btn-primary w-full text-center sm:w-auto">
              Open Building
            </Link>
            <Link href="/contact" className="btn-secondary w-full text-center sm:w-auto">
              Ask About Rooms
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}