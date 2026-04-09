'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import app from '../utils/firebase';
import type { BuildingItem } from '../utils/contentData';
import { isPropertyPublicRecord, parsePropertyRecord } from '../utils/propertyRecords';
import { getBuildingExperience } from '../utils/siteExperience';
import BuildingRoomExplorer from './BuildingRoomExplorer';

type PropertyDetailClientProps = {
  slug: string;
  initialBuilding: BuildingItem | null;
};

export default function PropertyDetailClient({ slug, initialBuilding }: PropertyDetailClientProps) {
  const [building, setBuilding] = useState<BuildingItem | null>(initialBuilding);
  const [loading, setLoading] = useState(initialBuilding === null);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const db = getFirestore(app);
        const snapshot = await getDocs(query(collection(db, 'properties'), where('slug', '==', slug)));
        const property = snapshot.docs
          .map((item) => item.data() as Record<string, unknown>)
          .filter((item) => isPropertyPublicRecord(item))
          .map((item) => parsePropertyRecord(item))
          .find((item): item is BuildingItem => item !== null) ?? null;

        if (property) {
          setBuilding(property);
        }
      } catch {
        // Keep fallback state when Firestore content is unavailable.
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [slug]);

  if (loading && building === null) {
    return <p className="text-sm text-muted">Loading property details...</p>;
  }

  if (!building) {
    return (
      <section className="panel rise p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5f7695]">Property Not Found</p>
        <h1 className="mt-3 text-3xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
          This building is not available right now.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted md:text-base">
          The property may have been removed or is still being prepared in the admin dashboard.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/buildings" className="btn-primary">Back to Buildings</Link>
          <Link href="/contact" className="btn-secondary">Ask About Alternatives</Link>
        </div>
      </section>
    );
  }

  const experience = getBuildingExperience(building.slug);

  return (
    <>
      <section className="mb-8 rise">
        <div className="flex flex-wrap items-center gap-3 text-sm text-[#5f7695]">
          <Link href="/buildings" className="rounded-full border border-[#d7dde7] bg-white px-3 py-1.5 font-medium text-[#223147] hover:border-[#8ca0ba]">
            Back to Buildings
          </Link>
          <span>{building.area}</span>
          <span className="rounded-full border border-[#d7dde7] bg-white px-3 py-1.5 font-medium text-[#223147]">From R{building.priceFrom}/mo</span>
        </div>
        <h1 className="architect-heading mt-5 text-4xl font-semibold text-[#121522] md:text-6xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
          {building.name}
        </h1>
        <p className="mt-4 max-w-3xl text-base text-muted md:text-lg">{building.summary}</p>
      </section>

      <BuildingRoomExplorer building={building} />

      <section className="mt-10 panel rise p-6 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <span className="kicker">Architectural Notes</span>
            <h2 className="mt-4 text-3xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              What makes this building stand out
            </h2>
          </div>
          <div className="grid gap-3">
            {building.highlights.map((highlight) => (
              <article key={highlight} className="rounded-2xl border border-[#dde2ea] bg-white px-4 py-4 text-sm text-[#324052]">
                {highlight}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <article className="panel rise p-6 md:p-8">
          <span className="kicker">Resident Review</span>
          <blockquote className="mt-4 text-lg font-medium leading-relaxed text-[#1e2a3a] md:text-xl">
            &ldquo;{building.review.quote}&rdquo;
          </blockquote>
          <div className="mt-5 border-t border-[#e3e7ed] pt-4">
            <p className="text-sm font-semibold text-[#121522]">{building.review.resident}</p>
            <p className="mt-0.5 text-xs text-muted">{building.review.detail}</p>
          </div>
        </article>

        <article className="panel rise p-6 md:p-8">
          <span className="kicker">Operator Info</span>
          <h2 className="mt-4 text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
            What to expect when you enquire
          </h2>
          <div className="mt-5 grid gap-3">
            <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3 text-sm text-[#324052]">
              <span className="font-semibold text-[#162033]">Response time:</span> {experience.operator.responseTime}
            </div>
            <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3 text-sm text-[#324052]">
              <span className="font-semibold text-[#162033]">Viewing days:</span> {experience.operator.viewingDays}
            </div>
            <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3 text-sm text-[#324052]">
              <span className="font-semibold text-[#162033]">Deposit rule:</span> {experience.costSummary.depositRule}
            </div>
            <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3 text-sm text-[#324052]">
              <span className="font-semibold text-[#162033]">Move-in window:</span> {experience.costSummary.moveInWindow}
            </div>
          </div>
        </article>
      </section>

      <section className="mt-10 editorial-card rise p-6 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className="kicker">Next Step</span>
            <h2 className="mt-4 text-3xl font-semibold text-[#121522] md:text-4xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Ready to see this place in person?
            </h2>
            <p className="mt-3 text-sm text-muted md:text-base">
              Check the application guide to make sure you have what you need, then book a viewing.
            </p>
          </div>
          <div className="grid gap-3">
            <div className="rounded-xl border border-[#dde2ea] bg-white px-4 py-4 text-sm text-[#324052]">{experience.operator.verification}</div>
            <div className="rounded-xl border border-[#dde2ea] bg-white px-4 py-4 text-sm text-[#324052]">Viewing schedule: {experience.operator.viewingDays}</div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={`/contact?building=${building.slug}`} className="btn-primary w-full text-center sm:w-auto">Request a Viewing</Link>
              <Link href="/apply" className="btn-secondary w-full text-center sm:w-auto">Application Guide</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}