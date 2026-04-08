'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import app from '../utils/firebase';
import { defaultBuildings, type BuildingItem } from '../utils/contentData';
import { parsePropertyRecord } from '../utils/propertyRecords';
import BuildingCard from './BuildingCard';

type PropertyGridProps = {
  limit?: number;
};

export default function PropertyGrid({ limit }: PropertyGridProps) {
  const [buildings, setBuildings] = useState<BuildingItem[]>(defaultBuildings);

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
        // Keep default buildings when Firestore content is unavailable.
      }
    };

    loadProperties();
  }, []);

  const visibleBuildings = typeof limit === 'number' ? buildings.slice(0, limit) : buildings;

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {visibleBuildings.map((building, index) => (
        <BuildingCard key={building.slug} building={building} priority={index === 0} />
      ))}
    </div>
  );
}