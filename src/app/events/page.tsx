"use client";

import React from 'react';
import Link from 'next/link';
import EventCard from '@/components/EventCard';
import { getFirestore, collection, getDocs, orderBy, query } from 'firebase/firestore';
import app from '@/utils/firebase';

interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  stream?: string;
  format?: string;
  seatsLeft?: number;
}

const fallbackEvents: EventItem[] = [
  {
    id: 'open-day-2026',
    title: 'Durban Student Open Day',
    date: '2026-05-16',
    location: 'Musgrave Study Suites, Durban',
    description:
      'Tour available rooms, meet on-site managers, and ask about lease terms, deposits, and move-in timelines. No booking needed — just walk in.',
    stream: 'Open Day',
    format: 'In-Person',
    seatsLeft: 40,
  },
  {
    id: 'room-webinar-2026',
    title: 'How to Choose a Student Room — Webinar',
    date: '2026-06-07',
    location: 'Online (Zoom)',
    description:
      'A 30-minute walkthrough of what to look for when comparing student rooms: lease red flags, deposit terms, room modes, and campus proximity.',
    stream: 'Webinar',
    format: 'Online',
    seatsLeft: 100,
  },
  {
    id: 'mid-year-viewings-2026',
    title: 'Mid-Year Building Viewings',
    date: '2026-07-05',
    location: 'Multiple buildings — Glenwood, Umbilo, City Centre',
    description:
      'Book a slot to view rooms across three buildings in one day. Shuttle transport between locations included. Bring your student card.',
    stream: 'Viewings',
    format: 'In-Person',
    seatsLeft: 25,
  },
];

export default function EventsPage() {
  const [events, setEvents] = React.useState<EventItem[]>(fallbackEvents);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const db = getFirestore(app);
        const snap = await getDocs(query(collection(db, 'events'), orderBy('date', 'asc')));
        if (!snap.empty) {
          setEvents(
            snap.docs.map((d) => ({ id: d.id, ...d.data() } as EventItem)),
          );
        }
      } catch {
        /* use fallback */
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="app-shell section-spacing">
      <section className="rise">
        <span className="kicker">Upcoming Events</span>
        <h1
          className="architect-heading mt-5 text-4xl font-semibold text-[#121522] md:text-6xl"
          style={{ fontFamily: 'var(--font-space), sans-serif' }}
        >
          Open Days, Viewings &amp; Webinars
        </h1>
        <p className="mt-4 max-w-3xl text-base text-muted md:text-lg">
          Get a feel for the buildings before you commit. Join an open day, attend a webinar, or
          book a viewing slot.
        </p>
      </section>

      <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="panel animate-pulse p-6" style={{ minHeight: 220 }} />
            ))
          : events.map((ev) => (
              <EventCard
                key={ev.id}
                title={ev.title}
                date={ev.date}
                location={ev.location}
                description={ev.description}
                stream={ev.stream}
                format={ev.format}
                seatsLeft={ev.seatsLeft}
                actionLabel="Request a Spot"
                availabilityLabel="spaces left"
              />
            ))}
      </section>

      <section className="mt-14 rise">
        <div className="panel p-6 md:p-8 text-center">
          <h2
            className="text-2xl font-semibold text-[#121522]"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            Want to host an event with us?
          </h2>
          <p className="mt-2 text-sm text-muted">
            If you&apos;re a university society, campus rep, or accommodation operator, reach out and we&apos;ll
            co-host viewings or info sessions for your members.
          </p>
          <Link href="/contact" className="btn-primary mt-5 inline-flex">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
