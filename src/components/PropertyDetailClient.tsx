'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import app from '../utils/firebase';
import type { BuildingItem } from '../utils/contentData';
import { parsePropertyRecord } from '../utils/propertyRecords';
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
          .map((item) => parsePropertyRecord(item.data() as Record<string, unknown>))
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
              Why this property reads clearly at decision time
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
    </>
  );
}