'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import app from '../utils/firebase';
import { defaultBuildings, type BuildingItem } from '../utils/contentData';
import { isPropertyPublicRecord, parsePropertyRecord } from '../utils/propertyRecords';
import BuildingCard from './BuildingCard';

type PropertyGridProps = {
  limit?: number;
  buildings?: BuildingItem[];
  activeSlug?: string;
};

export default function PropertyGrid({ limit, buildings: providedBuildings, activeSlug }: PropertyGridProps) {
  const [fetchedBuildings, setFetchedBuildings] = useState<BuildingItem[]>(defaultBuildings);

  useEffect(() => {
    if (providedBuildings) {
      return;
    }

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
          setFetchedBuildings(parsed);
        }
      } catch {
        // Keep default buildings when Firestore content is unavailable.
      }
    };

    loadProperties();
  }, [providedBuildings]);

  useEffect(() => {
    if (!activeSlug) {
      return;
    }

    const element = document.getElementById(`building-card-${activeSlug}`);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeSlug]);

  const buildings = providedBuildings ?? fetchedBuildings;
  const visibleBuildings = typeof limit === 'number' ? buildings.slice(0, limit) : buildings;

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {visibleBuildings.map((building, index) => (
        <BuildingCard key={building.slug} building={building} priority={index === 0} active={building.slug === activeSlug} />
      ))}
    </div>
  );
}