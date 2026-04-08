"use client";

import React, { useEffect } from 'react';
import { addDoc, collection, getDocs, getFirestore, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import app from '../utils/firebase';
import { defaultBuildings, type BuildingItem } from '../utils/contentData';
import { isPropertyPublicRecord, parsePropertyRecord } from '../utils/propertyRecords';

const monthOptions = ['May 2026', 'June 2026', 'July 2026', 'August 2026', 'September 2026', 'Flexible'];

export default function ContactPageClient() {
  const searchParams = useSearchParams();
  const [buildings, setBuildings] = React.useState<BuildingItem[]>(defaultBuildings);
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [form, setForm] = React.useState({
    fullName: '',
    phone: '',
    email: '',
    buildingSlug: '',
    roomId: '',
    roomTitle: '',
    roomMode: 'Not sure yet',
    campus: 'UKZN',
    moveInMonth: 'Flexible',
    budget: 'R3500 - R5000',
    preferredViewingDate: '',
    notes: '',
  });

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
        // Keep fallback buildings when Firestore content is unavailable.
      }
    };

    loadProperties();
  }, []);

  useEffect(() => {
    const buildingSlug = searchParams.get('building');
    const roomMode = searchParams.get('roomMode');
    const roomId = searchParams.get('roomId');
    const roomTitle = searchParams.get('roomTitle');

    setForm((current) => ({
      ...current,
      buildingSlug: buildingSlug ?? current.buildingSlug,
      roomId: roomId ?? current.roomId,
      roomTitle: roomTitle ?? current.roomTitle,
      roomMode: roomMode ?? current.roomMode,
    }));
  }, [searchParams]);

  const selectedBuilding = buildings.find((building) => building.slug === form.buildingSlug) ?? null;
  const selectedRoom =
    selectedBuilding?.roomOptions.find((room) => room.id === form.roomId) ??
    selectedBuilding?.roomOptions.find((room) => room.title === form.roomTitle) ??
    null;

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSending(true);
    setError(null);
    setSent(false);

    try {
      const db = getFirestore(app);
      await addDoc(collection(db, 'viewingRequests'), {
        ...form,
        buildingName: selectedBuilding?.name ?? 'Not selected',
        roomTitle: selectedRoom?.title ?? form.roomTitle,
        status: 'new',
        createdAt: serverTimestamp(),
        createdAtText: new Date().toLocaleString('en-ZA', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        }),
        statusUpdatedAt: serverTimestamp(),
        statusUpdatedAtText: 'New enquiry',
      });

      setSent(true);
      setForm((current) => ({
        ...current,
        fullName: '',
        phone: '',
        email: '',
        notes: '',
        preferredViewingDate: '',
      }));
    } catch {
      setError('Could not submit the viewing request. Check Firebase settings or try again shortly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="app-shell section-spacing">
      <section className="page-hero rise px-5 py-6 md:px-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <div className="section-heading">
            <span className="kicker">Viewing Request</span>
            <h1 className="architect-heading text-4xl font-semibold text-[#121522] md:text-6xl" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Send a proper rental enquiry, not a vague message.
            </h1>
            <p className="text-base text-muted md:text-lg">
              Tell us the building you want, the room mode you prefer, your move-in month, and your budget. That makes the next response much more useful.
            </p>
          </div>

          <div className="tonal-card p-5 text-white md:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">Response standard</p>
            <h2 className="mt-3 text-2xl font-semibold" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Sharper inputs lead to faster viewing coordination.
            </h2>
            <div className="mt-4 grid gap-3 text-sm text-white/82">
              <div className="rounded-2xl border border-white/14 bg-white/10 px-4 py-3">Weekday replies are usually handled within one working day.</div>
              <div className="rounded-2xl border border-white/14 bg-white/10 px-4 py-3">Include the building, room type, and move-in timing to avoid slow back-and-forth.</div>
              <div className="rounded-2xl border border-white/14 bg-white/10 px-4 py-3">Viewings are usually scheduled Monday to Saturday by appointment.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
        <form className="panel rise flex flex-col gap-5 p-6 md:p-8" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-[#243041]">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Full name</span>
              <input type="text" value={form.fullName} onChange={(event) => handleChange('fullName', event.target.value)} placeholder="Your full name" className="w-full rounded-2xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#2e4f7a] focus:ring-2 focus:ring-[#caa86a]" required />
            </label>
            <label className="grid gap-2 text-sm text-[#243041]">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Phone / WhatsApp</span>
              <input type="text" value={form.phone} onChange={(event) => handleChange('phone', event.target.value)} placeholder="+27 ..." className="w-full rounded-2xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#2e4f7a] focus:ring-2 focus:ring-[#caa86a]" required />
            </label>
          </div>

          <label className="grid gap-2 text-sm text-[#243041]">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Email</span>
            <input type="email" value={form.email} onChange={(event) => handleChange('email', event.target.value)} placeholder="name@example.com" className="w-full rounded-2xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#2e4f7a] focus:ring-2 focus:ring-[#caa86a]" required />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-[#243041]">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Building</span>
              <select value={form.buildingSlug} onChange={(event) => handleChange('buildingSlug', event.target.value)} className="w-full rounded-2xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#2e4f7a] focus:ring-2 focus:ring-[#caa86a]" required>
                <option value="">Select a building</option>
                {buildings.map((building) => (
                  <option key={building.slug} value={building.slug}>{building.name}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm text-[#243041]">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Room mode</span>
              <select value={form.roomMode} onChange={(event) => handleChange('roomMode', event.target.value)} className="w-full rounded-2xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#2e4f7a] focus:ring-2 focus:ring-[#caa86a]">
                <option>Single</option>
                <option>Sharing</option>
                <option>Not sure yet</option>
              </select>
            </label>
          </div>

          {(selectedRoom || form.roomTitle) && (
            <div className="rounded-[1.4rem] border border-[#d8dee8] bg-[#fbfcfe] px-5 py-4 text-sm text-[#324052]">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5f7695]">Selected room</p>
              <p className="mt-2 text-lg font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                {selectedRoom?.title ?? form.roomTitle}
              </p>
              <p className="mt-1 text-sm text-muted">
                {selectedRoom?.summary ?? 'This rent request will be routed with the exact room choice you selected on the building page.'}
              </p>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-2 text-sm text-[#243041]">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Campus</span>
              <select value={form.campus} onChange={(event) => handleChange('campus', event.target.value)} className="w-full rounded-2xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#2e4f7a] focus:ring-2 focus:ring-[#caa86a]">
                <option>UKZN</option>
                <option>DUT</option>
                <option>Both / flexible</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm text-[#243041]">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Move-in month</span>
              <select value={form.moveInMonth} onChange={(event) => handleChange('moveInMonth', event.target.value)} className="w-full rounded-2xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#2e4f7a] focus:ring-2 focus:ring-[#caa86a]">
                {monthOptions.map((month) => (
                  <option key={month}>{month}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm text-[#243041]">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Budget band</span>
              <select value={form.budget} onChange={(event) => handleChange('budget', event.target.value)} className="w-full rounded-2xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#2e4f7a] focus:ring-2 focus:ring-[#caa86a]">
                <option>Under R3500</option>
                <option>R3500 - R5000</option>
                <option>R5000 - R6500</option>
                <option>Above R6500</option>
              </select>
            </label>
          </div>

          <label className="grid gap-2 text-sm text-[#243041]">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Preferred viewing date</span>
            <input type="date" value={form.preferredViewingDate} onChange={(event) => handleChange('preferredViewingDate', event.target.value)} className="w-full rounded-2xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#2e4f7a] focus:ring-2 focus:ring-[#caa86a]" />
          </label>

          <label className="grid gap-2 text-sm text-[#243041]">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Notes</span>
            <textarea value={form.notes} onChange={(event) => handleChange('notes', event.target.value)} placeholder="Mention your preferred building, whether you need furnished space, and any timing details that matter." rows={6} className="w-full rounded-2xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#2e4f7a] focus:ring-2 focus:ring-[#caa86a]" />
          </label>

          <button type="submit" className="btn-primary w-full justify-center" disabled={sending}>
            {sending ? 'Sending request...' : selectedRoom ? 'Request this room' : 'Submit viewing request'}
          </button>

          {sent && (
            <div className="rounded-xl border border-[#b9d8c7] bg-[#edf8f2] px-4 py-3 text-sm font-medium text-[#1f6946]">
              Viewing request sent. We now have your building, room mode, budget, and move-in timing.
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-[#e5c4c4] bg-[#fff4f4] px-4 py-3 text-sm font-medium text-[#8f2f2f]">
              {error}
            </div>
          )}
        </form>

        <aside className="grid gap-4 rise" style={{ animationDelay: '90ms' }}>
          <article className="panel p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Selected building</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              {selectedBuilding?.name ?? 'Choose a building above'}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {selectedBuilding?.headline ?? 'Once you choose a building, the request becomes easier to route and schedule.'}
            </p>
          </article>

          <article className="panel p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Room you want</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              {(selectedRoom?.title ?? form.roomTitle) || 'Pick a room from a building page'}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {selectedRoom?.summary ?? 'When a room is selected from the building page, the rent request includes that exact room so follow-up is specific.'}
            </p>
            {selectedRoom && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedRoom.features.slice(0, 3).map((feature) => (
                  <span key={feature} className="rounded-full border border-[#d9dee8] bg-white px-3 py-1 text-xs font-medium text-[#405066]">
                    {feature}
                  </span>
                ))}
              </div>
            )}
          </article>

          <article className="panel p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">What helps most</p>
            <div className="mt-3 grid gap-3 text-sm text-[#324052]">
              <div className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3">Name the building you actually want to see.</div>
              <div className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3">State whether you prefer a single or sharing room.</div>
              <div className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3">Include your budget and expected move-in date.</div>
            </div>
          </article>

          <article className="panel p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Direct channels</p>
            <div className="mt-3 grid gap-3 text-sm text-[#324052]">
              <a href="https://wa.me/270000000000" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3 font-semibold text-[#1e3150]">WhatsApp: +27 00 000 0000</a>
              <div className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3">Viewing hours: Monday to Saturday, 09:00 to 17:00</div>
              <div className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3">Reply expectation: within one working day for complete requests</div>
            </div>
          </article>
        </aside>
      </section>
    </div>
  );
}
