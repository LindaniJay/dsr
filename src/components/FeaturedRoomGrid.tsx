'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import app from '../utils/firebase';
import { defaultBuildings, type BuildingItem, type RoomOption } from '../utils/contentData';
import { isPropertyPublicRecord, parsePropertyRecord } from '../utils/propertyRecords';
import { getAvailabilityClassName, getAvailabilityLabel, inferAvailabilityState } from '../utils/siteExperience';

type FeaturedRoomGridProps = {
  limit?: number;
};

type FlatRoom = {
  room: RoomOption;
  building: BuildingItem;
};

export default function FeaturedRoomGrid({ limit = 6 }: FeaturedRoomGridProps) {
  const [buildings, setBuildings] = useState<BuildingItem[]>(defaultBuildings);

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
        // Keep default buildings when Firestore content is unavailable.
      }
    };

    loadProperties();
  }, []);

  const flatRooms: FlatRoom[] = [];
  for (const building of buildings) {
    for (const room of building.roomOptions) {
      flatRooms.push({ room, building });
    }
  }

  const visible = flatRooms.sort((a, b) => a.room.monthlyPrice - b.room.monthlyPrice).slice(0, limit);

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {visible.map(({ room, building }) => {
        const availState = inferAvailabilityState(room.availability);

        return (
          <article key={room.id} className="panel rise overflow-hidden rounded-[1.7rem] transition hover:-translate-y-1">
            <div className="relative aspect-[16/11] overflow-hidden">
              <Image
                src={room.image}
                alt={room.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,17,26,0.06),rgba(12,17,26,0.72))]" />

              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/35 bg-white/18 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                  {room.mode === 'single' ? 'Private' : 'Sharing'}
                </span>
                <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${getAvailabilityClassName(availState)}`}>
                  {getAvailabilityLabel(availState)}
                </span>
              </div>

              <div className="absolute inset-x-4 bottom-4 flex flex-col items-start gap-2 text-white sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.13em] text-white/80">{building.name}</p>
                  <h3 className="mt-1 text-lg font-semibold sm:text-xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                    {room.title}
                  </h3>
                </div>
                <div className="rounded-2xl border border-white/30 bg-white/14 px-3 py-2 backdrop-blur-md">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-white/70">From</p>
                  <p className="text-lg font-semibold">R{room.monthlyPrice}<span className="text-xs font-normal text-white/70">/mo</span></p>
                </div>
              </div>
            </div>

            <div className="space-y-3 p-4">
              <p className="text-sm text-muted line-clamp-2">{room.summary}</p>

              <div className="flex flex-wrap gap-3">
                <Link href={`/buildings/${building.slug}`} className="btn-secondary text-sm">
                  View Details
                </Link>
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
                  className="btn-primary text-sm"
                >
                  Rent This Room
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
