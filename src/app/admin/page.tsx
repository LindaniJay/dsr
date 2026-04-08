"use client";

import React, { useEffect, useMemo, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import app from '../../utils/firebase';
import { defaultBuildings, type BuildingItem } from '../../utils/contentData';
import {
  buildPropertyRecord,
  emptyPropertyForm,
  parsePropertyRecord,
  slugifyPropertyName,
  type PropertyFormValues,
} from '../../utils/propertyRecords';

type ManagedProperty = BuildingItem & { id: string };

const ACCESS_STORAGE_KEY = 'durban-stays-admin-unlocked';

function propertyToFormValues(property: BuildingItem): PropertyFormValues {
  const singleRoom = property.roomOptions.find((room) => room.mode === 'single');
  const sharingRoom = property.roomOptions.find((room) => room.mode === 'sharing');

  return {
    slug: property.slug,
    name: property.name,
    area: property.area,
    badge: property.badge,
    priceFrom: property.priceFrom,
    ukznAccess: property.campusAccess.ukzn,
    dutAccess: property.campusAccess.dut,
    headline: property.headline,
    summary: property.summary,
    heroImage: property.heroImage,
    amenities: property.amenities.join('\n'),
    highlights: property.highlights.join('\n'),
    workflowNotes: property.workflowNotes.join('\n'),
    singlePrice: singleRoom?.monthlyPrice ?? 0,
    singleDeposit: singleRoom?.deposit ?? singleRoom?.monthlyPrice ?? 0,
    singleAvailability: singleRoom?.availability ?? '',
    singleLeaseTerm: singleRoom?.leaseTerm ?? '',
    sharingPrice: sharingRoom?.monthlyPrice ?? 0,
    sharingDeposit: sharingRoom?.deposit ?? sharingRoom?.monthlyPrice ?? 0,
    sharingAvailability: sharingRoom?.availability ?? '',
    sharingLeaseTerm: sharingRoom?.leaseTerm ?? '',
    reviewQuote: property.review.quote,
    reviewResident: property.review.resident,
    reviewDetail: property.review.detail,
  };
}

function parseManagedProperty(raw: Record<string, unknown>, id: string): ManagedProperty | null {
  const property = parsePropertyRecord(raw);

  if (!property) {
    return null;
  }

  return {
    ...property,
    id,
  };
}

function PropertyInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  min,
  required = true,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'number';
  min?: number;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm text-[#243041]">
      <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">{label}</span>
      <input
        type={type}
        min={min}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#5f7695] focus:ring-2 focus:ring-[#d6dfec]"
      />
    </label>
  );
}

function PropertyTextarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="grid gap-2 text-sm text-[#243041]">
      <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#5f7695] focus:ring-2 focus:ring-[#d6dfec]"
      />
    </label>
  );
}

export default function AdminPage() {
  const [properties, setProperties] = useState<ManagedProperty[]>([]);
  const [propertyForm, setPropertyForm] = useState<PropertyFormValues>(emptyPropertyForm);
  const [propertyEditId, setPropertyEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [accessInput, setAccessInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  const adminCode = process.env.NEXT_PUBLIC_ADMIN_ACCESS_CODE;

  const stats = useMemo(() => {
    const singleOptions = properties.reduce(
      (count, property) => count + property.roomOptions.filter((room) => room.mode === 'single').length,
      0,
    );
    const sharingOptions = properties.reduce(
      (count, property) => count + property.roomOptions.filter((room) => room.mode === 'sharing').length,
      0,
    );
    const lowestPrice = properties.length > 0 ? Math.min(...properties.map((property) => property.priceFrom)) : 0;

    return { singleOptions, sharingOptions, lowestPrice };
  }, [properties]);

  const loadContent = async () => {
    setLoading(true);
    setError(null);

    try {
      const db = getFirestore(app);
      const propertySnapshot = await getDocs(query(collection(db, 'properties'), orderBy('createdAt', 'desc')));
      const parsedProperties = propertySnapshot.docs
        .map((item) => parseManagedProperty(item.data() as Record<string, unknown>, item.id))
        .filter((item): item is ManagedProperty => item !== null);

      setProperties(parsedProperties);
    } catch {
      setError('Failed to load properties. Check Firebase settings and Firestore rules.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!adminCode) {
      setUnlocked(true);
      return;
    }

    const wasUnlocked = typeof window !== 'undefined' && localStorage.getItem(ACCESS_STORAGE_KEY) === 'true';
    setUnlocked(wasUnlocked);
  }, [adminCode]);

  useEffect(() => {
    if (!unlocked) {
      return;
    }

    loadContent();
  }, [unlocked]);

  const handleUnlock = () => {
    if (!adminCode) {
      setUnlocked(true);
      return;
    }

    if (accessInput.trim() === adminCode) {
      setUnlocked(true);
      localStorage.setItem(ACCESS_STORAGE_KEY, 'true');
      setError(null);
      return;
    }

    setError('Invalid admin access code.');
  };

  const resetForm = () => {
    setPropertyEditId(null);
    setPropertyForm(emptyPropertyForm);
  };

  const handleSaveProperty = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const db = getFirestore(app);
      const record = buildPropertyRecord({
        ...propertyForm,
        slug: propertyForm.slug.trim() || slugifyPropertyName(propertyForm.name),
        priceFrom: Number(propertyForm.priceFrom),
        singlePrice: Number(propertyForm.singlePrice),
        singleDeposit: Number(propertyForm.singleDeposit),
        sharingPrice: Number(propertyForm.sharingPrice),
        sharingDeposit: Number(propertyForm.sharingDeposit),
      });

      const payload = {
        ...record,
        updatedAt: serverTimestamp(),
      };

      if (propertyEditId) {
        await updateDoc(doc(db, 'properties', propertyEditId), payload);
        setMessage('Property updated successfully.');
      } else {
        await addDoc(collection(db, 'properties'), {
          ...payload,
          createdAt: serverTimestamp(),
        });
        setMessage('Property created successfully.');
      }

      resetForm();
      await loadContent();
    } catch {
      setError('Could not save property.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProperty = async (id: string) => {
    setError(null);
    setMessage(null);

    try {
      const db = getFirestore(app);
      await deleteDoc(doc(db, 'properties', id));
      setMessage('Property deleted.');

      if (propertyEditId === id) {
        resetForm();
      }

      await loadContent();
    } catch {
      setError('Could not delete property.');
    }
  };

  const seedDefaults = async () => {
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const db = getFirestore(app);

      for (const property of defaultBuildings) {
        await addDoc(collection(db, 'properties'), {
          ...property,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }

      setMessage('Seeded starter buildings into the property studio.');
      await loadContent();
    } catch {
      setError('Could not seed default properties.');
    } finally {
      setSaving(false);
    }
  };

  if (!unlocked) {
    return (
      <div className="app-shell section-spacing">
        <section className="panel rise mx-auto max-w-lg p-6 md:p-8">
          <span className="kicker">Admin Access</span>
          <h1
            className="architect-heading mt-5 text-4xl font-semibold text-[#121522]"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            Unlock Property Studio
          </h1>
          <p className="mt-3 text-sm text-muted">
            Enter the admin access code to manage buildings, room mixes, pricing bands, and public property presentation.
          </p>

          <div className="mt-5">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#5e6673]">
              Access Code
            </label>
            <input
              type="password"
              value={accessInput}
              onChange={(event) => setAccessInput(event.target.value)}
              className="w-full rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#5f7695] focus:ring-2 focus:ring-[#d6dfec]"
              placeholder="Enter admin code"
            />
          </div>

          <button type="button" onClick={handleUnlock} className="btn-primary mt-5 w-full justify-center">
            Unlock Admin
          </button>

          {error && (
            <p className="mt-4 rounded-xl border border-[#e5c4c4] bg-[#fff4f4] px-4 py-3 text-sm text-[#8f2f2f]">
              {error}
            </p>
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="app-shell section-spacing">
      <section className="panel rise overflow-hidden p-6 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <span className="kicker">Property Studio</span>
            <h1
              className="architect-heading mt-5 text-4xl font-semibold text-[#121522] md:text-5xl"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              Admin now adds full buildings, not disconnected room cards
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted">
              This studio feeds the same properties collection used by the Buildings pages. Each save updates the building narrative, commute notes, amenities, image lead, and the single-versus-sharing split renters see on the public site.
            </p>
          </div>

          <div className="rounded-[1.6rem] border border-[#d7dde7] bg-[linear-gradient(145deg,#1f3350,#2f507a)] p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">Editorial Direction</p>
            <h2 className="mt-3 text-2xl font-semibold" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              The public experience should read like a composed presentation board.
            </h2>
            <p className="mt-4 text-sm text-white/78">
              Start with the building story, then expose room mode, then let renters ask sharper viewing questions. This removes the old event-product structure and keeps the browsing flow coherent.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Live Buildings</p>
            <p className="mt-1 text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>{properties.length}</p>
          </div>
          <div className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Single Options</p>
            <p className="mt-1 text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>{stats.singleOptions}</p>
          </div>
          <div className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Sharing Options</p>
            <p className="mt-1 text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>{stats.sharingOptions}</p>
          </div>
          <div className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Price From</p>
            <p className="mt-1 text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              {stats.lowestPrice > 0 ? `R${stats.lowestPrice}` : 'Not set'}
            </p>
          </div>
        </div>

        {(message || error) && (
          <div className="mt-5">
            {message && <p className="rounded-xl border border-[#b9d8c7] bg-[#edf8f2] px-4 py-3 text-sm text-[#1f6946]">{message}</p>}
            {error && <p className="rounded-xl border border-[#e5c4c4] bg-[#fff4f4] px-4 py-3 text-sm text-[#8f2f2f]">{error}</p>}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {properties.length === 0 && (
            <button type="button" onClick={seedDefaults} className="btn-secondary" disabled={saving}>
              {saving ? 'Seeding...' : 'Seed Starter Buildings'}
            </button>
          )}
          <button type="button" onClick={resetForm} className="btn-primary">
            + New Property
          </button>
        </div>
      </section>

      <section className="mt-6 panel rise p-6 md:p-8">
        <form className="grid gap-6" onSubmit={handleSaveProperty}>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="kicker">Property Form</span>
              <h2 className="mt-3 text-3xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                {propertyEditId ? 'Edit Building' : 'Create Building'}
              </h2>
            </div>
            <p className="max-w-xl text-sm text-muted">
              Use this as the master record for the public building page. If you leave the slug blank, it will be generated from the building name.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <PropertyInput
              label="Building Name"
              value={propertyForm.name}
              onChange={(value) =>
                setPropertyForm((prev) => ({
                  ...prev,
                  name: value,
                  slug: prev.slug ? prev.slug : slugifyPropertyName(value),
                }))
              }
              placeholder="Musgrave Study Suites"
            />
            <PropertyInput
              label="Slug"
              value={propertyForm.slug}
              onChange={(value) => setPropertyForm((prev) => ({ ...prev, slug: value }))}
              placeholder="musgrave-study-suites"
              required={false}
            />
            <PropertyInput
              label="Area"
              value={propertyForm.area}
              onChange={(value) => setPropertyForm((prev) => ({ ...prev, area: value }))}
              placeholder="Musgrave, Durban"
            />
            <PropertyInput
              label="Badge"
              value={propertyForm.badge}
              onChange={(value) => setPropertyForm((prev) => ({ ...prev, badge: value }))}
              placeholder="Quiet academic block"
            />
            <PropertyInput
              label="Price From"
              type="number"
              min={0}
              value={propertyForm.priceFrom}
              onChange={(value) => setPropertyForm((prev) => ({ ...prev, priceFrom: Number(value) }))}
              placeholder="4200"
            />
            <PropertyInput
              label="Hero Image"
              value={propertyForm.heroImage}
              onChange={(value) => setPropertyForm((prev) => ({ ...prev, heroImage: value }))}
              placeholder="/buildings/musgrave-exterior.svg"
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <PropertyInput
              label="UKZN Access"
              value={propertyForm.ukznAccess}
              onChange={(value) => setPropertyForm((prev) => ({ ...prev, ukznAccess: value }))}
              placeholder="12 minutes to Howard College corridor"
            />
            <PropertyInput
              label="DUT Access"
              value={propertyForm.dutAccess}
              onChange={(value) => setPropertyForm((prev) => ({ ...prev, dutAccess: value }))}
              placeholder="18 minutes to city campus route"
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <PropertyTextarea
              label="Headline"
              value={propertyForm.headline}
              onChange={(value) => setPropertyForm((prev) => ({ ...prev, headline: value }))}
              placeholder="A calmer Berea base for students who want study structure and a cleaner daily routine."
              rows={3}
            />
            <PropertyTextarea
              label="Summary"
              value={propertyForm.summary}
              onChange={(value) => setPropertyForm((prev) => ({ ...prev, summary: value }))}
              placeholder="Describe the building, the feel, and the practical daily use."
              rows={3}
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <PropertyTextarea
              label="Amenities"
              value={propertyForm.amenities}
              onChange={(value) => setPropertyForm((prev) => ({ ...prev, amenities: value }))}
              placeholder="One amenity per line"
              rows={5}
            />
            <PropertyTextarea
              label="Highlights"
              value={propertyForm.highlights}
              onChange={(value) => setPropertyForm((prev) => ({ ...prev, highlights: value }))}
              placeholder="One highlight per line"
              rows={5}
            />
            <PropertyTextarea
              label="Workflow Notes"
              value={propertyForm.workflowNotes}
              onChange={(value) => setPropertyForm((prev) => ({ ...prev, workflowNotes: value }))}
              placeholder="One workflow note per line"
              rows={5}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.4rem] border border-[#dde2ea] bg-[#fbfcfe] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Single Rooms</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <PropertyInput
                  label="Monthly Price"
                  type="number"
                  min={0}
                  value={propertyForm.singlePrice}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, singlePrice: Number(value) }))}
                  placeholder="4200"
                />
                <PropertyInput
                  label="Deposit"
                  type="number"
                  min={0}
                  value={propertyForm.singleDeposit}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, singleDeposit: Number(value) }))}
                  placeholder="4200"
                />
                <PropertyInput
                  label="Availability"
                  value={propertyForm.singleAvailability}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, singleAvailability: value }))}
                  placeholder="3 rooms available"
                />
                <PropertyInput
                  label="Lease Term"
                  value={propertyForm.singleLeaseTerm}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, singleLeaseTerm: value }))}
                  placeholder="12-month lease"
                />
              </div>
            </div>

            <div className="rounded-[1.4rem] border border-[#dde2ea] bg-[#fbfcfe] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Sharing Rooms</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <PropertyInput
                  label="Monthly Price"
                  type="number"
                  min={0}
                  value={propertyForm.sharingPrice}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, sharingPrice: Number(value) }))}
                  placeholder="2950"
                />
                <PropertyInput
                  label="Deposit"
                  type="number"
                  min={0}
                  value={propertyForm.sharingDeposit}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, sharingDeposit: Number(value) }))}
                  placeholder="2950"
                />
                <PropertyInput
                  label="Availability"
                  value={propertyForm.sharingAvailability}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, sharingAvailability: value }))}
                  placeholder="4 beds available"
                />
                <PropertyInput
                  label="Lease Term"
                  value={propertyForm.sharingLeaseTerm}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, sharingLeaseTerm: value }))}
                  placeholder="Semester or 12-month lease"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_1fr]">
            <PropertyTextarea
              label="Resident Quote"
              value={propertyForm.reviewQuote}
              onChange={(value) => setPropertyForm((prev) => ({ ...prev, reviewQuote: value }))}
              placeholder="A short quote that explains what made this building clear to choose."
              rows={4}
            />
            <PropertyInput
              label="Resident Name"
              value={propertyForm.reviewResident}
              onChange={(value) => setPropertyForm((prev) => ({ ...prev, reviewResident: value }))}
              placeholder="Nomfundo, UKZN student"
            />
            <PropertyInput
              label="Resident Detail"
              value={propertyForm.reviewDetail}
              onChange={(value) => setPropertyForm((prev) => ({ ...prev, reviewDetail: value }))}
              placeholder="Stayed for two semesters while commuting from Berea."
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Saving...' : propertyEditId ? 'Update Property' : 'Create Property'}
            </button>
            <button type="button" onClick={resetForm} className="btn-secondary">
              Clear Form
            </button>
          </div>
        </form>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Live on Website</p>
            <h2 className="mt-1 text-3xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Buildings ({properties.length})
            </h2>
          </div>
          <button type="button" onClick={resetForm} className="btn-secondary text-sm">
            + Add Building
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-muted">Loading buildings...</p>
        ) : properties.length === 0 ? (
          <div className="panel rise p-6 text-sm text-muted">
            No properties yet. Use <strong>Seed Starter Buildings</strong> or create one manually above.
          </div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {properties.map((property) => (
              <article key={property.id} className="panel rise overflow-hidden">
                <div className="h-1 bg-[linear-gradient(90deg,#2e4f7a,#caa86a)]" />
                <div className="grid gap-5 p-5 md:grid-cols-[1.05fr_0.95fr] md:p-6">
                  <div>
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#edf2f9] px-2.5 py-0.5 text-[11px] font-semibold text-[#2e4f7a]">{property.badge}</span>
                      <span className="rounded-full bg-[#f4f6f9] px-2.5 py-0.5 text-[11px] font-semibold text-[#4d6580]">{property.area}</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                      {property.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{property.summary}</p>

                    <div className="mt-4 grid gap-2 text-sm text-[#324052]">
                      <div className="rounded-xl border border-[#e1e6ee] bg-white px-4 py-3">
                        <span className="font-semibold text-[#162033]">UKZN:</span> {property.campusAccess.ukzn}
                      </div>
                      <div className="rounded-xl border border-[#e1e6ee] bg-white px-4 py-3">
                        <span className="font-semibold text-[#162033]">DUT:</span> {property.campusAccess.dut}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-[#dde2ea] bg-[#f7f9fc] px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5f7695]">Price From</p>
                      <p className="mt-1 text-2xl font-semibold text-[#162033]">R{property.priceFrom}/mo</p>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {property.roomOptions.map((room) => (
                        <div key={room.id} className="rounded-xl border border-[#dde2ea] bg-white px-4 py-3 text-sm text-[#324052]">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5f7695]">
                            {room.mode === 'single' ? 'Single' : 'Sharing'}
                          </p>
                          <p className="mt-1 font-semibold text-[#162033]">R{room.monthlyPrice}</p>
                          <p className="mt-1 text-xs text-muted">{room.availability}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {property.amenities.slice(0, 3).map((amenity) => (
                        <span key={amenity} className="rounded-full border border-[#d4dae4] bg-[#f7f8fb] px-3 py-1 text-xs font-medium text-[#405066]">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 border-t border-[#e8ecf1] bg-[#f7f9fc] px-5 py-3 md:px-6">
                  <button
                    type="button"
                    className="rounded-lg bg-[#2e4f7a] px-3 py-2 text-xs font-semibold text-white hover:bg-[#243c5d]"
                    onClick={() => {
                      setPropertyEditId(property.id);
                      setPropertyForm(propertyToFormValues(property));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Edit Property
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-[#e3caca] bg-white px-3 py-2 text-xs font-semibold text-[#8b3535] hover:bg-[#fff4f4]"
                    onClick={() => handleDeleteProperty(property.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
