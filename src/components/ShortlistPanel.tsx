'use client';

import Link from 'next/link';
import type { BuildingItem } from '../utils/contentData';
import { useSavedBuildings } from '../hooks/useSavedBuildings';
import { getBuildingExperience } from '../utils/siteExperience';

type ShortlistPanelProps = {
  buildings: BuildingItem[];
};

export default function ShortlistPanel({ buildings }: ShortlistPanelProps) {
  const { shortlist, clearShortlist, toggleShortlist } = useSavedBuildings();
  const savedBuildings = shortlist
    .map((slug) => buildings.find((building) => building.slug === slug))
    .filter((building): building is BuildingItem => Boolean(building));

  return (
    <section className="panel rise p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="section-heading">
          <span className="kicker">Saved Shortlist</span>
          <h2 className="text-3xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            Keep your top buildings in one place.
          </h2>
          <p className="text-sm text-muted md:text-base">
            Save the buildings you want to revisit, then move into a sharper viewing request with your shortlist already decided.
          </p>
        </div>
        {savedBuildings.length > 0 && (
          <button type="button" onClick={clearShortlist} className="btn-secondary">
            Clear Shortlist
          </button>
        )}
      </div>

      {savedBuildings.length === 0 ? (
        <div className="mt-6 rounded-[1.4rem] border border-[#d8dee8] bg-white px-5 py-5 text-sm text-[#324052]">
          Save any building from the grid to keep it here while you compare room modes, commute fit, and move-in timing.
        </div>
      ) : (
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {savedBuildings.map((building) => {
            const experience = getBuildingExperience(building.slug);

            return (
              <article key={building.slug} className="rounded-[1.5rem] border border-[#d8dee8] bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.12em] text-[#6a7891]">{building.area}</p>
                <h3 className="mt-2 text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                  {building.name}
                </h3>
                <p className="mt-3 text-sm text-muted">{experience.bestFor}</p>
                <div className="mt-4 rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3 text-sm text-[#324052]">
                  <span className="font-semibold text-[#162033]">From:</span> R{building.priceFrom}/mo
                </div>
                <div className="mt-5 flex flex-col gap-3">
                  <Link href={`/buildings/${building.slug}`} className="btn-primary w-full text-center">
                    Reopen Building
                  </Link>
                  <Link href={`/contact?building=${building.slug}`} className="btn-secondary w-full text-center">
                    Request a Viewing
                  </Link>
                  <button type="button" onClick={() => toggleShortlist(building.slug)} className="btn-secondary">
                    Remove from shortlist
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
