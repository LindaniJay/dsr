'use client';

import { useMemo, useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { campusAnchors, type BuildingItem } from '../utils/contentData';

/* ── types ─────────────────────────────────────────── */

type BuildingMapProps = {
  buildings: BuildingItem[];
  activeSlug: string;
  onActiveSlugChange: (slug: string) => void;
};

type TileStyle = 'light' | 'dark' | 'street' | 'satellite';
type LayerKey = 'campuses' | 'nearby' | 'commute';

const TILE_URLS: Record<TileStyle, string> = {
  light: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  street: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
};

const TILE_LABELS: Record<TileStyle, string> = {
  light: 'Light',
  dark: 'Dark',
  street: 'Street',
  satellite: 'Satellite',
};

const CATEGORY_STYLES: Record<string, { color: string; label: string }> = {
  grocery: { color: '#16a34a', label: 'G' },
  transport: { color: '#2563eb', label: 'T' },
  study: { color: '#7c3aed', label: 'S' },
  food: { color: '#ea580c', label: 'F' },
  education: { color: '#0891b2', label: 'E' },
};

/* ── SVG pin builder ───────────────────────────────── */

function pinSvg(fill: string, letter: string, size = 32): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size + 8}" viewBox="0 0 ${size} ${size + 8}"><path d="M${size / 2} ${size + 8}L${size / 2 - 5} ${size - 2}A${size / 2} ${size / 2} 0 1 1 ${size / 2 + 5} ${size - 2}Z" fill="${fill}" stroke="white" stroke-width="1.5"/><text x="${size / 2}" y="${size / 2}" text-anchor="middle" dominant-baseline="central" font-size="${size * 0.38}" font-weight="bold" font-family="system-ui,sans-serif" fill="white">${letter}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/* ── Leaflet map (imperative) ──────────────────────── */

function LeafletMap({
  buildings,
  activeBuilding,
  onActiveSlugChange,
  layers,
  tileStyle,
}: {
  buildings: BuildingItem[];
  activeBuilding: BuildingItem;
  onActiveSlugChange: (slug: string) => void;
  layers: Record<LayerKey, boolean>;
  tileStyle: TileStyle;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import('leaflet').Map | null>(null);
  const tileRef = useRef<import('leaflet').TileLayer | null>(null);

  /* swap tiles without destroying the map */
  useEffect(() => {
    if (!mapRef.current || !tileRef.current) return;
    tileRef.current.setUrl(TILE_URLS[tileStyle]);
  }, [tileStyle]);

  /* full rebuild when data / layers change */
  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const L = (await import('leaflet')).default;

      /* inject CSS once */
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      if (cancelled || !containerRef.current) return;

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        zoomControl: false,
        attributionControl: false,
      });
      mapRef.current = map;

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      const tileOpts: Record<string, unknown> = { maxZoom: 19 };
      if (tileStyle !== 'satellite') tileOpts.subdomains = 'abcd';
      const tile = L.tileLayer(TILE_URLS[tileStyle], tileOpts).addTo(map);
      tileRef.current = tile;

      const allPoints: [number, number][] = [];

      /* ── building pins ── */
      buildings.forEach((b) => {
        const isActive = b.slug === activeBuilding.slug;
        const fill = isActive ? '#1f3a5a' : '#b99258';

        const icon = L.divIcon({
          className: '',
          html: `<div style="display:flex;align-items:center;gap:4px;cursor:pointer;transform:${isActive ? 'scale(1.08)' : 'scale(1)'};transition:transform .2s;">
            <div style="width:12px;height:12px;border-radius:50%;background:${fill};border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.25);flex-shrink:0;"></div>
            <span style="background:${fill};color:#fff;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:600;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,.18);line-height:1.3;">${b.name}</span>
          </div>`,
          iconAnchor: [6, 6],
        });

        const marker = L.marker([b.coordinates.latitude, b.coordinates.longitude], { icon }).addTo(map);
        marker.on('click', () => onActiveSlugChange(b.slug));

        if (isActive) {
          marker.bindPopup(
            `<div style="font-family:system-ui;min-width:150px;">
              <strong style="font-size:13px;">${b.name}</strong>
              <div style="margin-top:4px;color:#5f7695;font-size:11px;">${b.area}</div>
              <div style="margin-top:4px;font-size:12px;font-weight:600;color:#1f3a5a;">From R${b.priceFrom}/mo</div>
            </div>`,
            { closeButton: false, className: 'map-popup' },
          ).openPopup();
        }

        allPoints.push([b.coordinates.latitude, b.coordinates.longitude]);
      });

      /* ── campus pins + commute dashes ── */
      if (layers.campuses) {
        campusAnchors.forEach((campus) => {
          const src = pinSvg('#1f3a5a', 'U', 28);
          const icon = L.divIcon({
            className: '',
            html: `<div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
              <img src="${src}" width="28" height="36" style="filter:drop-shadow(0 2px 4px rgba(0,0,0,.25));" />
              <span style="background:#1f3a5a;color:#fff;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:700;letter-spacing:.04em;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,.15);">${campus.shortLabel}</span>
            </div>`,
            iconAnchor: [14, 36],
          });
          L.marker([campus.coordinates.latitude, campus.coordinates.longitude], { icon }).addTo(map);
          allPoints.push([campus.coordinates.latitude, campus.coordinates.longitude]);
        });
      }

      if (layers.commute) {
        campusAnchors.forEach((campus) => {
          L.polyline(
            [
              [activeBuilding.coordinates.latitude, activeBuilding.coordinates.longitude],
              [campus.coordinates.latitude, campus.coordinates.longitude],
            ],
            { color: '#1f3a5a', weight: 2.5, opacity: 0.45, dashArray: '6 8', lineCap: 'round' },
          ).addTo(map);
        });
      }

      /* ── nearby place pins ── */
      if (layers.nearby) {
        activeBuilding.nearbyPlaces.forEach((place) => {
          const style = CATEGORY_STYLES[place.category] ?? { color: '#64748b', label: '?' };
          const src = pinSvg(style.color, style.label, 24);

          const icon = L.divIcon({
            className: '',
            html: `<img src="${src}" width="24" height="32" style="filter:drop-shadow(0 2px 3px rgba(0,0,0,.2));" />`,
            iconAnchor: [12, 32],
          });

          L.marker([place.coordinates.latitude, place.coordinates.longitude], { icon })
            .addTo(map)
            .bindPopup(
              `<div style="font-family:system-ui;min-width:130px;">
                <strong style="font-size:12px;">${place.name}</strong>
                <div style="margin-top:3px;display:flex;align-items:center;gap:4px;">
                  <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${style.color};flex-shrink:0;"></span>
                  <span style="font-size:11px;color:#64748b;text-transform:capitalize;">${place.category}</span>
                  <span style="font-size:11px;color:#94a3b8;">·</span>
                  <span style="font-size:11px;color:#64748b;">${place.distance}</span>
                </div>
              </div>`,
              { closeButton: false, className: 'map-popup' },
            );
        });
      }

      map.fitBounds(L.latLngBounds(allPoints), { padding: [50, 50], maxZoom: 15 });
    };

    init();
    return () => {
      cancelled = true;
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildings, activeBuilding, onActiveSlugChange, layers.campuses, layers.nearby, layers.commute]);

  return <div ref={containerRef} className="absolute inset-0" style={{ zIndex: 0 }} />;
}

/* ── toggle chip (layer / tile) ────────────────────── */

function Chip({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all"
      style={{
        background: active ? '#1f3a5a' : 'rgba(255,255,255,.92)',
        color: active ? '#f0f4f8' : '#3b4963',
        borderColor: active ? '#1f3a5a' : '#d2d7e0',
        boxShadow: active ? '0 2px 8px rgba(31,58,90,.25)' : '0 1px 3px rgba(0,0,0,.06)',
      }}
    >
      {label}
    </button>
  );
}

/* ── main export ───────────────────────────────────── */

export default function BuildingMap({ buildings, activeSlug, onActiveSlugChange }: BuildingMapProps) {
  const [tileStyle, setTileStyle] = useState<TileStyle>('light');
  const [layers, setLayers] = useState<Record<LayerKey, boolean>>({
    campuses: true,
    nearby: true,
    commute: true,
  });

  const toggleLayer = useCallback((key: LayerKey) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const activeBuilding = useMemo(
    () => buildings.find((b) => b.slug === activeSlug) ?? buildings[0] ?? null,
    [activeSlug, buildings],
  );

  if (!buildings.length || !activeBuilding) return null;

  return (
    <section className="editorial-card rise overflow-hidden">
      {/* ── Map container ── */}
      <div className="relative" style={{ height: 'clamp(380px, 50vw, 540px)' }}>
        <LeafletMap
          buildings={buildings}
          activeBuilding={activeBuilding}
          onActiveSlugChange={onActiveSlugChange}
          layers={layers}
          tileStyle={tileStyle}
        />

        {/* ── floating layer controls (top-left) ── */}
        <div className="absolute top-3 left-3 z-[400] flex flex-col gap-2">
          <div className="flex flex-wrap gap-1.5 rounded-xl border border-white/40 bg-white/80 px-2.5 py-2 shadow-lg backdrop-blur-sm">
            <Chip active={layers.campuses} label="Campuses" onClick={() => toggleLayer('campuses')} />
            <Chip active={layers.nearby} label="Nearby" onClick={() => toggleLayer('nearby')} />
            <Chip active={layers.commute} label="Commute" onClick={() => toggleLayer('commute')} />
          </div>
        </div>

        {/* ── tile style switcher (top-right) ── */}
        <div className="absolute top-3 right-3 z-[400] flex gap-1 rounded-xl border border-white/40 bg-white/80 px-2 py-1.5 shadow-lg backdrop-blur-sm">
          {(['light', 'dark', 'street', 'satellite'] as TileStyle[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setTileStyle(s)}
              className="rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all"
              style={{
                background: tileStyle === s ? '#1f3a5a' : 'transparent',
                color: tileStyle === s ? '#fff' : '#4b5e74',
              }}
            >
              {TILE_LABELS[s]}
            </button>
          ))}
        </div>

        {/* ── legend (bottom-left) ── */}
        {layers.nearby && (
          <div className="absolute bottom-3 left-3 z-[400] flex flex-wrap gap-2 rounded-xl border border-white/40 bg-white/80 px-3 py-2 shadow-lg backdrop-blur-sm">
            {Object.entries(CATEGORY_STYLES).map(([cat, s]) => (
              <span key={cat} className="flex items-center gap-1 text-[10px] font-semibold capitalize text-[#3b4963]">
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: s.color }} />
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── sidebar panel (below map on mobile, beside on lg) ── */}
      <div className="border-t border-[#e2e6ec] bg-gradient-to-b from-white to-[#faf9f6] p-5 md:p-7">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* left: selected building info */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5f7695]">
              Selected Building
            </p>
            <h3 className="mt-2 text-xl font-semibold text-[#121522] md:text-2xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              {activeBuilding.name}
            </h3>
            <p className="mt-2 text-sm text-muted">{activeBuilding.headline}</p>

            <div className="mt-4 flex flex-wrap gap-3">
              <div className="stat-chip flex-1">
                <p className="stat-label">From</p>
                <p className="stat-value">R{activeBuilding.priceFrom}/mo</p>
              </div>
              <div className="stat-chip flex-1">
                <p className="stat-label">UKZN</p>
                <p className="mt-1 text-sm text-[#243041]">{activeBuilding.campusAccess.ukzn}</p>
              </div>
              <div className="stat-chip flex-1">
                <p className="stat-label">DUT</p>
                <p className="mt-1 text-sm text-[#243041]">{activeBuilding.campusAccess.dut}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Link href={`/buildings/${activeBuilding.slug}`} className="btn-primary text-center">
                Open Building
              </Link>
              <Link href="/contact" className="btn-secondary text-center">
                Ask About Rooms
              </Link>
            </div>
          </div>

          {/* right: rooms + nearby */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5f7695]">
              Rooms ({activeBuilding.roomOptions.length})
            </p>
            <div className="space-y-2">
              {activeBuilding.roomOptions.map((room) => (
                <article key={room.id} className="flex items-center justify-between gap-3 rounded-xl border border-[#e2e6ec] bg-white px-4 py-3 text-sm">
                  <div>
                    <p className="font-semibold text-[#162033]">{room.title}</p>
                    <p className="text-[11px] uppercase tracking-[0.08em] text-[#5f7695]">
                      {room.mode === 'single' ? 'Single' : 'Sharing'} · {room.availability}
                    </p>
                  </div>
                  <span className="rounded-full border border-[#d9dee8] bg-[#f7f9fc] px-2.5 py-1 text-xs font-semibold text-[#1f3a5a]">
                    R{room.monthlyPrice}
                  </span>
                </article>
              ))}
            </div>

            {layers.nearby && activeBuilding.nearbyPlaces.length > 0 && (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5f7695]">
                  Nearby
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {activeBuilding.nearbyPlaces.map((place) => {
                    const style = CATEGORY_STYLES[place.category] ?? { color: '#64748b', label: '?' };
                    return (
                      <div key={place.id} className="flex items-start gap-2 rounded-xl border border-[#e8ebf0] bg-white px-3 py-2.5 text-sm">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold" style={{ background: `${style.color}18`, color: style.color }}>
                          {style.label}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-[#162033] text-[12px]">{place.name}</p>
                          <p className="text-[10px] text-[#5f7695]">{place.distance}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
