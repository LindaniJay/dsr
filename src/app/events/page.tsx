"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { addDoc, collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import EventCard from '../../components/EventCard';
import app from '../../utils/firebase';
import { defaultEvents, type EventItem } from '../../utils/contentData';

const experienceStandards = [
  {
    title: 'Events, Awards and Camps',
    text: 'Our programs are built around live events, awards, and camps that help artists grow through exposure and participation.',
  },
  {
    title: 'Youth Development',
    text: 'Each event is designed to strengthen confidence, discipline, leadership, and practical experience.',
  },
  {
    title: 'Community Impact',
    text: 'We connect programs to wellness, empowerment, and awareness outcomes beyond the event day itself.',
  },
];

const registrationJourney = [
  'Choose your event and submit your registration.',
  'Receive confirmation and follow-up communication from IGHOST.',
  'Attend the event, camp, or activation and participate fully.',
  'Continue growing through future opportunities in the IGHOST network.',
];

function parseEvent(raw: Record<string, unknown>): EventItem | null {
  const seats = Number(raw.seatsLeft);
  if (
    typeof raw.title !== 'string' ||
    typeof raw.date !== 'string' ||
    typeof raw.location !== 'string' ||
    typeof raw.description !== 'string' ||
    typeof raw.stream !== 'string' ||
    typeof raw.format !== 'string' ||
    Number.isNaN(seats)
  ) {
    return null;
  }

  return {
    title: raw.title,
    date: raw.date,
    location: raw.location,
    description: raw.description,
    stream: raw.stream,
    format: raw.format,
    seatsLeft: seats,
  };
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>(defaultEvents);
  const [contentLoading, setContentLoading] = useState(true);
  const [registering, setRegistering] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const db = getFirestore(app);
        const eventsRef = collection(db, 'events');
        const eventsSnapshot = await getDocs(query(eventsRef, orderBy('createdAt', 'desc')));

        const fetchedEvents = eventsSnapshot.docs
          .map((docItem) => parseEvent(docItem.data() as Record<string, unknown>))
          .filter((item): item is EventItem => item !== null);

        if (fetchedEvents.length > 0) {
          setEvents(fetchedEvents);
        }
      } catch {
        // Keep default events when Firestore content is unavailable.
      } finally {
        setContentLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const metrics = useMemo(
    () => [
      { value: `${events.length}`, label: 'Current Program Listings' },
      { value: '2021', label: 'Operating Since' },
      { value: '4', label: 'Focus Areas Connected' },
    ],
    [events.length]
  );

  const handleRegister = async (eventTitle: string) => {
    setRegistering(eventTitle);
    setSuccess(null);
    setError(null);
    try {
      const db = getFirestore(app);
      await addDoc(collection(db, 'event_registrations'), {
        event: eventTitle,
        timestamp: new Date().toISOString(),
      });
      setSuccess(`Registered for ${eventTitle}. We will contact you soon.`);
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setRegistering(null);
    }
  };

  return (
    <div className="app-shell section-spacing">
      {/* Hero Section with layered glassmorphism and animated floating shapes */}
      <section className="panel rise overflow-hidden p-6 md:p-10 transition-shadow duration-300 hover:shadow-2xl relative">
        {/* Animated gradient background */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 animate-gradient-move bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#caa86a]/30 via-[#2e4f7a]/10 to-transparent opacity-80" />
        {/* Glassmorphism overlay */}
        <div aria-hidden="true" className="absolute left-1/2 top-0 z-0 h-[340px] w-[600px] -translate-x-1/2 rounded-3xl bg-white/30 shadow-2xl backdrop-blur-2xl blur-2xl" style={{ filter: 'blur(28px)' }} />
        {/* Floating shapes for depth */}
        <div aria-hidden="true" className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#caa86a]/30 blur-2xl animate-float-slow" />
        <div aria-hidden="true" className="absolute bottom-10 right-10 w-28 h-28 rounded-full bg-[#2e4f7a]/20 blur-2xl animate-float-medium" />
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end relative z-10">
          <div>
            <span className="kicker">Programs and Events</span>
            <h1
              className="architect-heading mt-5 text-4xl font-extrabold text-[#121522] md:text-6xl tracking-tight animate-fade-in-up"
              style={{ fontFamily: 'var(--font-space), sans-serif', letterSpacing: '-0.03em' }}
            >
              <span className="inline-block bg-gradient-to-r from-[#2e4f7a] via-[#caa86a] to-[#2e4f7a] bg-clip-text text-transparent animate-gradient-text drop-shadow-lg">Events That Develop Talent</span>
              <span className="block mt-2 animate-fade-in-up delay-150">and <span className="text-[#caa86a]">Build Community</span></span>
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-muted md:text-xl animate-fade-in-up delay-200">
              IGHOST hosts events, awards, and camps for artists and young people. Each program is
              built to create exposure, practical growth, and a sense of belonging within the brand.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d7dde7] bg-[linear-gradient(145deg,#f6f8fb,#ffffff)/80] p-5 glassmorphism">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">
              Experience Promise
            </p>
            <h2
              className="mt-2 text-2xl font-bold text-[#121522] tracking-tight animate-gradient-text"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              Built Around Real Participation
            </h2>
            <p className="mt-3 text-base text-muted">
              Our events combine entertainment, personal development, and community-centered impact
              in one accessible experience.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {metrics.map((item, idx) => (
          <article key={item.label} className="panel rise p-5" style={{ animationDelay: `${idx * 80}ms` }}>
            <p
              className="text-3xl font-semibold text-[#121522]"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              {item.value}
            </p>
            <p className="mt-1 text-sm text-muted">{item.label}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {experienceStandards.map((item, idx) => (
          <article key={item.title} className="panel rise p-6" style={{ animationDelay: `${idx * 80}ms` }}>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Standard</p>
            <h3
              className="mt-2 text-2xl font-semibold text-[#121522]"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              {item.title}
            </h3>
            <p className="mt-3 text-sm text-muted">{item.text}</p>
          </article>
        ))}
      </section>

      {(success || error) && (
        <section className="mt-8">
          {success && (
            <div className="rounded-xl border border-[#b9d8c7] bg-[#edf8f2] px-4 py-3 text-sm font-medium text-[#1f6946]">
              {success}
            </div>
          )}
          {error && (
            <div className="rounded-xl border border-[#e5c4c4] bg-[#fff4f4] px-4 py-3 text-sm font-medium text-[#8f2f2f]">
              {error}
            </div>
          )}
        </section>
      )}

      <section className="mt-8">
        {contentLoading && (
          <p className="mb-4 text-sm text-muted">Loading latest events from content manager...</p>
        )}
        <div className="grid gap-5 lg:grid-cols-3">
          {events.map((event, idx) => (
            <div key={`${event.title}-${event.date}`} className="rise" style={{ animationDelay: `${idx * 80}ms` }}>
              <EventCard
                title={event.title}
                date={event.date}
                location={event.location}
                description={event.description}
                stream={event.stream}
                format={event.format}
                seatsLeft={event.seatsLeft}
                onRegister={() => handleRegister(event.title)}
                disabled={registering === event.title}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 panel rise p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">
              Registration Journey
            </span>
            <h2
              className="mt-2 text-3xl font-semibold text-[#121522] md:text-4xl"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              What Happens After Registration
            </h2>
            <p className="mt-3 text-sm text-muted md:text-base">
              We use a simple process so participants can move from sign-up to attendance and then
              into longer-term engagement with IGHOST.
            </p>
          </div>

          <ol className="grid gap-3">
            {registrationJourney.map((step, idx) => (
              <li key={step} className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3 text-sm text-[#263244]">
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#edf2f9] text-xs font-semibold text-[#2e4f7a]">
                  {idx + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
