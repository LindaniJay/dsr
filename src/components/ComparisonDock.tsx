'use client';

import Link from 'next/link';
import type { BuildingItem } from '../utils/contentData';
import { getBuildingExperience, getAvailabilityClassName, getAvailabilityLabel, inferAvailabilityState } from '../utils/siteExperience';
import { useSavedBuildings } from '../hooks/useSavedBuildings';

type ComparisonDockProps = {
  buildings: BuildingItem[];
};

function getStartingDeposit(building: BuildingItem) {
  return Math.min(...building.roomOptions.map((room) => room.deposit));
}

export default function ComparisonDock({ buildings }: ComparisonDockProps) {
  const { compare, clearCompare, toggleCompare } = useSavedBuildings();
  const comparedBuildings = compare
    .map((slug) => buildings.find((building) => building.slug === slug))
    .filter((building): building is BuildingItem => Boolean(building));

  return (
    <section className="editorial-card rise p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="section-heading">
          <span className="kicker">Compare Buildings</span>
          <h2 className="text-3xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            Review key rental differences side by side.
          </h2>
          <p className="text-sm text-muted md:text-base">
            Save up to two buildings for direct comparison across commute, pricing, deposit shape, and daily-living fit.
          </p>
        </div>
        {comparedBuildings.length > 0 && (
          <button type="button" onClick={clearCompare} className="btn-secondary">
            Clear Comparison
          </button>
        )}
      </div>

      {comparedBuildings.length === 0 ? (
        <div className="mt-6 rounded-[1.4rem] border border-[#d8dee8] bg-white px-5 py-5 text-sm text-[#324052]">
          Use the Compare action on any building card to keep two options here while you narrow down the best fit.
        </div>
      ) : (
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {comparedBuildings.map((building) => {
            const experience = getBuildingExperience(building.slug);
            const state = inferAvailabilityState(building.roomOptions.map((room) => room.availability).join(' '));

            return (
              <article key={building.slug} className="rounded-[1.5rem] border border-[#d8dee8] bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-[#6a7891]">{building.area}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                      {building.name}
                    </h3>
                  </div>
                  <button type="button" onClick={() => toggleCompare(building.slug)} className="btn-secondary">
                    Remove
                  </button>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="compact-meta-item">
                    <p className="compact-meta-label">From</p>
                    <p className="compact-meta-value">R{building.priceFrom}/mo</p>
                  </div>
                  <div className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${getAvailabilityClassName(state)}`}>
                    {getAvailabilityLabel(state)}
                  </div>
                </div>

                <div className="mt-4 grid gap-3 text-sm text-[#324052]">
                  <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3">
                    <span className="font-semibold text-[#162033]">Best for:</span> {experience.bestFor}
                  </div>
                  <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3">
                    <span className="font-semibold text-[#162033]">Starting deposit:</span> R{getStartingDeposit(building)}
                  </div>
                  <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3">
                    <span className="font-semibold text-[#162033]">UKZN:</span> {building.campusAccess.ukzn}
                  </div>
                  <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3">
                    <span className="font-semibold text-[#162033]">DUT:</span> {building.campusAccess.dut}
                  </div>
                  <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3">
                    <span className="font-semibold text-[#162033]">Utilities:</span> {experience.costSummary.utilitiesPolicy}
                  </div>
                  <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3">
                    <span className="font-semibold text-[#162033]">Lease flow:</span> {experience.costSummary.moveInWindow}
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href={`/buildings/${building.slug}`} className="btn-primary w-full text-center sm:w-auto">
                    Open Building
                  </Link>
                  <Link href={`/contact?building=${building.slug}`} className="btn-secondary w-full text-center sm:w-auto">
                    Ask About This One
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
