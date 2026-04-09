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

type EnquiryStatus = 'new' | 'contacted' | 'viewing-booked' | 'closed';

type AdminTab = 'overview' | 'buildings' | 'rooms' | 'renters' | 'enquiries';

type RenterStatus = 'active' | 'pending' | 'moved-out' | 'cancelled';

type Renter = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  buildingSlug: string;
  buildingName: string;
  roomMode: string;
  leaseStart: string;
  leaseEnd: string;
  monthlyRent: number;
  depositPaid: boolean;
  status: RenterStatus;
  notes: string;
  createdAtLabel: string;
};

type ViewingRequest = {
  id: string;
  buildingSlug: string;
  buildingName: string;
  roomTitle: string;
  fullName: string;
  email: string;
  phone: string;
  roomMode: string;
  campus: string;
  moveInMonth: string;
  budget: string;
  preferredViewingDate: string;
  notes: string;
  assignee: string;
  internalNotes: string;
  status: EnquiryStatus;
  createdAtLabel: string;
  statusUpdatedAtLabel: string;
};

type ManagedProperty = BuildingItem & {
  id: string;
  published: boolean;
  enquiryCount: number;
  publishedAtLabel: string | null;
  scheduledPublishAt: string;
  scheduledPublishAtLabel: string | null;
  lastEditedBy: string;
  lastEditedAtLabel: string | null;
};

const ACCESS_STORAGE_KEY = 'durban-stays-admin-unlocked';

const enquiryStatuses: Array<{ value: EnquiryStatus; label: string }> = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'viewing-booked', label: 'Viewing booked' },
  { value: 'closed', label: 'Closed' },
];

function formatStatusLabel(status: EnquiryStatus) {
  return enquiryStatuses.find((item) => item.value === status)?.label ?? 'New';
}

function getStatusBadgeClass(status: EnquiryStatus) {
  switch (status) {
    case 'contacted':
      return 'bg-[#edf5ff] text-[#31557a]';
    case 'viewing-booked':
      return 'bg-[#eef8ef] text-[#2e6640]';
    case 'closed':
      return 'bg-[#f4f6f9] text-[#556477]';
    default:
      return 'bg-[#fff4e8] text-[#8b6124]';
  }
}

const renterStatuses: Array<{ value: RenterStatus; label: string }> = [
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'moved-out', label: 'Moved Out' },
  { value: 'cancelled', label: 'Cancelled' },
];

function getRenterStatusBadgeClass(status: RenterStatus) {
  switch (status) {
    case 'active':
      return 'bg-[#eef8ef] text-[#2e6640]';
    case 'pending':
      return 'bg-[#fff4e8] text-[#8b6124]';
    case 'moved-out':
      return 'bg-[#f4f6f9] text-[#556477]';
    case 'cancelled':
      return 'bg-[#fff4f4] text-[#8b3535]';
    default:
      return 'bg-[#f4f6f9] text-[#556477]';
  }
}

function parseRenter(raw: Record<string, unknown>, id: string): Renter | null {
  if (typeof raw.fullName !== 'string' || typeof raw.email !== 'string') return null;
  const status = ['active', 'pending', 'moved-out', 'cancelled'].includes(raw.status as string)
    ? (raw.status as RenterStatus)
    : 'pending';
  return {
    id,
    fullName: raw.fullName,
    email: raw.email,
    phone: typeof raw.phone === 'string' ? raw.phone : '',
    buildingSlug: typeof raw.buildingSlug === 'string' ? raw.buildingSlug : '',
    buildingName: typeof raw.buildingName === 'string' ? raw.buildingName : '',
    roomMode: typeof raw.roomMode === 'string' ? raw.roomMode : 'single',
    leaseStart: typeof raw.leaseStart === 'string' ? raw.leaseStart : '',
    leaseEnd: typeof raw.leaseEnd === 'string' ? raw.leaseEnd : '',
    monthlyRent: typeof raw.monthlyRent === 'number' ? raw.monthlyRent : 0,
    depositPaid: raw.depositPaid === true,
    status,
    notes: typeof raw.notes === 'string' ? raw.notes : '',
    createdAtLabel:
      typeof raw.createdAtText === 'string' && raw.createdAtText.trim().length > 0
        ? raw.createdAtText
        : 'Recent entry',
  };
}

type RenterFormValues = {
  fullName: string;
  email: string;
  phone: string;
  buildingSlug: string;
  buildingName: string;
  roomMode: string;
  leaseStart: string;
  leaseEnd: string;
  monthlyRent: number;
  depositPaid: boolean;
  status: RenterStatus;
  notes: string;
};

const emptyRenterForm: RenterFormValues = {
  fullName: '',
  email: '',
  phone: '',
  buildingSlug: '',
  buildingName: '',
  roomMode: 'single',
  leaseStart: '',
  leaseEnd: '',
  monthlyRent: 0,
  depositPaid: false,
  status: 'pending',
  notes: '',
};

function getPropertyVisibilityState(property: ManagedProperty) {
  if (!property.published) {
    return 'draft' as const;
  }

  if (property.scheduledPublishAt) {
    const scheduledTime = new Date(property.scheduledPublishAt).getTime();
    if (!Number.isNaN(scheduledTime) && scheduledTime > Date.now()) {
      return 'scheduled' as const;
    }
  }

  return 'published' as const;
}

function getPropertyVisibilityBadgeClass(state: 'draft' | 'scheduled' | 'published') {
  switch (state) {
    case 'scheduled':
      return 'bg-[#edf5ff] text-[#31557a]';
    case 'published':
      return 'bg-[#eef8ef] text-[#2e6640]';
    default:
      return 'bg-[#fff4e8] text-[#8b6124]';
  }
}

function getPropertyVisibilityLabel(state: 'draft' | 'scheduled' | 'published') {
  switch (state) {
    case 'scheduled':
      return 'Scheduled';
    case 'published':
      return 'Published';
    default:
      return 'Draft';
  }
}

function splitMultiline(value: string) {
  return value.split(/\r?\n/);
}

function setMultilineValue(value: string, index: number, nextValue: string) {
  const entries = splitMultiline(value);

  while (entries.length < 4) {
    entries.push('');
  }

  entries[index] = nextValue;
  return entries.join('\n');
}

function propertyToFormValues(property: BuildingItem & { published?: boolean }): PropertyFormValues {
  const singleRoom = property.roomOptions.find((room) => room.mode === 'single');
  const sharingRoom = property.roomOptions.find((room) => room.mode === 'sharing');

  return {
    slug: property.slug,
    name: property.name,
    area: property.area,
    badge: property.badge,
    published: property.published !== false,
    scheduledPublishAt:
      'scheduledPublishAt' in property && typeof property.scheduledPublishAt === 'string' ? property.scheduledPublishAt : '',
    lastEditedBy:
      'lastEditedBy' in property && typeof property.lastEditedBy === 'string' ? property.lastEditedBy : 'Admin team',
    priceFrom: property.priceFrom,
    latitude: property.coordinates.latitude,
    longitude: property.coordinates.longitude,
    ukznAccess: property.campusAccess.ukzn,
    dutAccess: property.campusAccess.dut,
    headline: property.headline,
    summary: property.summary,
    heroImage: property.heroImage,
    galleryImageUrls: property.gallery.map((item) => item.src).join('\n'),
    galleryCaptions: property.gallery.map((item) => item.caption).join('\n'),
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

function parseManagedProperty(raw: Record<string, unknown>, id: string, enquiryCount: number): ManagedProperty | null {
  const property = parsePropertyRecord(raw);

  if (!property) {
    return null;
  }

  return {
    ...property,
    id,
    published: raw.published !== false,
    enquiryCount,
    publishedAtLabel:
      typeof raw.publishedAtText === 'string' && raw.publishedAtText.trim().length > 0 ? raw.publishedAtText : null,
    scheduledPublishAt: typeof raw.scheduledPublishAtIso === 'string' ? raw.scheduledPublishAtIso : '',
    scheduledPublishAtLabel:
      typeof raw.scheduledPublishAtText === 'string' && raw.scheduledPublishAtText.trim().length > 0
        ? raw.scheduledPublishAtText
        : null,
    lastEditedBy: typeof raw.lastEditedBy === 'string' && raw.lastEditedBy.trim().length > 0 ? raw.lastEditedBy : 'Admin team',
    lastEditedAtLabel:
      typeof raw.lastEditedAtText === 'string' && raw.lastEditedAtText.trim().length > 0 ? raw.lastEditedAtText : null,
  };
}

function parseViewingRequest(raw: Record<string, unknown>, id: string): ViewingRequest | null {
  if (
    typeof raw.buildingSlug !== 'string' ||
    typeof raw.buildingName !== 'string' ||
    typeof raw.fullName !== 'string' ||
    typeof raw.phone !== 'string' ||
    typeof raw.roomMode !== 'string' ||
    typeof raw.moveInMonth !== 'string' ||
    typeof raw.budget !== 'string'
  ) {
    return null;
  }

  const status =
    raw.status === 'contacted' || raw.status === 'viewing-booked' || raw.status === 'closed' || raw.status === 'new'
      ? raw.status
      : 'new';

  const createdAtLabel =
    typeof raw.createdAtText === 'string' && raw.createdAtText.trim().length > 0
      ? raw.createdAtText
      : 'Recent enquiry';

  return {
    id,
    buildingSlug: raw.buildingSlug,
    buildingName: raw.buildingName,
    roomTitle: typeof raw.roomTitle === 'string' ? raw.roomTitle : '',
    fullName: raw.fullName,
    email: typeof raw.email === 'string' ? raw.email : 'Not provided',
    phone: raw.phone,
    roomMode: raw.roomMode,
    campus: typeof raw.campus === 'string' ? raw.campus : 'Not provided',
    moveInMonth: raw.moveInMonth,
    budget: raw.budget,
    preferredViewingDate: typeof raw.preferredViewingDate === 'string' ? raw.preferredViewingDate : '',
    notes: typeof raw.notes === 'string' ? raw.notes : '',
    assignee: typeof raw.assignee === 'string' ? raw.assignee : '',
    internalNotes: typeof raw.internalNotes === 'string' ? raw.internalNotes : '',
    status,
    createdAtLabel,
    statusUpdatedAtLabel:
      typeof raw.statusUpdatedAtText === 'string' && raw.statusUpdatedAtText.trim().length > 0
        ? raw.statusUpdatedAtText
        : createdAtLabel,
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
  type?: 'text' | 'number' | 'datetime-local';
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
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [properties, setProperties] = useState<ManagedProperty[]>([]);
  const [viewingRequests, setViewingRequests] = useState<ViewingRequest[]>([]);
  const [renters, setRenters] = useState<Renter[]>([]);
  const [renterForm, setRenterForm] = useState<RenterFormValues>(emptyRenterForm);
  const [renterEditId, setRenterEditId] = useState<string | null>(null);
  const [renterFilter, setRenterFilter] = useState<'all' | RenterStatus>('all');
  const [requestDrafts, setRequestDrafts] = useState<Record<string, { assignee: string; internalNotes: string }>>({});
  const [requestFilter, setRequestFilter] = useState<'all' | EnquiryStatus>('all');
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
    const publishedCount = properties.filter((property) => property.published).length;
    const scheduledCount = properties.filter((property) => getPropertyVisibilityState(property) === 'scheduled').length;
    const totalEnquiries = viewingRequests.length;
    const enquiryByStatus = enquiryStatuses.reduce<Record<EnquiryStatus, number>>((accumulator, status) => {
      accumulator[status.value] = viewingRequests.filter((request) => request.status === status.value).length;
      return accumulator;
    }, {
      new: 0,
      contacted: 0,
      'viewing-booked': 0,
      closed: 0,
    });
    const mostEnquired = properties.reduce<ManagedProperty | null>((currentBest, property) => {
      if (!currentBest || property.enquiryCount > currentBest.enquiryCount) {
        return property;
      }

      return currentBest;
    }, null);

    return { singleOptions, sharingOptions, lowestPrice, publishedCount, scheduledCount, totalEnquiries, enquiryByStatus, mostEnquired };
  }, [properties, viewingRequests]);

  const filteredViewingRequests = useMemo(() => {
    if (requestFilter === 'all') return viewingRequests;
    return viewingRequests.filter((request) => request.status === requestFilter);
  }, [requestFilter, viewingRequests]);

  const filteredRenters = useMemo(() => {
    if (renterFilter === 'all') return renters;
    return renters.filter((r) => r.status === renterFilter);
  }, [renterFilter, renters]);

  const renterStats = useMemo(() => {
    const activeCount = renters.filter((r) => r.status === 'active').length;
    const pendingCount = renters.filter((r) => r.status === 'pending').length;
    const totalMonthly = renters.filter((r) => r.status === 'active').reduce((sum, r) => sum + r.monthlyRent, 0);
    return { activeCount, pendingCount, totalMonthly };
  }, [renters]);

  function defaultBuildingsAsManagedProperties(enquiryCounts: Record<string, number>): ManagedProperty[] {
    return defaultBuildings.map((b) => ({
      ...b,
      id: `local-${b.slug}`,
      published: true,
      enquiryCount: enquiryCounts[b.slug] ?? 0,
      publishedAtLabel: null,
      scheduledPublishAt: '',
      scheduledPublishAtLabel: null,
      lastEditedBy: 'Local data',
      lastEditedAtLabel: null,
    }));
  }

  const loadContent = async () => {
    setLoading(true);
    setError(null);

    try {
      const db = getFirestore(app);
      const [propertySnapshot, requestSnapshot, renterSnapshot] = await Promise.all([
        getDocs(query(collection(db, 'properties'), orderBy('createdAt', 'desc'))),
        getDocs(query(collection(db, 'viewingRequests'), orderBy('createdAt', 'desc'))),
        getDocs(query(collection(db, 'renters'), orderBy('createdAt', 'desc'))),
      ]);

      const parsedRequests = requestSnapshot.docs
        .map((item) => parseViewingRequest(item.data() as Record<string, unknown>, item.id))
        .filter((item): item is ViewingRequest => item !== null);

      const enquiryCountBySlug = parsedRequests.reduce<Record<string, number>>((accumulator, request) => {
        accumulator[request.buildingSlug] = (accumulator[request.buildingSlug] ?? 0) + 1;
        return accumulator;
      }, {});

      const parsedProperties = propertySnapshot.docs
        .map((item) => {
          const data = item.data() as Record<string, unknown>;
          const slug = typeof data.slug === 'string' ? data.slug : '';
          return parseManagedProperty(data, item.id, enquiryCountBySlug[slug] ?? 0);
        })
        .filter((item): item is ManagedProperty => item !== null);

      const parsedRenters = renterSnapshot.docs
        .map((item) => parseRenter(item.data() as Record<string, unknown>, item.id))
        .filter((item): item is Renter => item !== null);

      setViewingRequests(parsedRequests);
      setProperties(parsedProperties.length > 0 ? parsedProperties : defaultBuildingsAsManagedProperties(enquiryCountBySlug));
      setRenters(parsedRenters);
    } catch {
      setProperties(defaultBuildingsAsManagedProperties({}));
      setError('Could not reach Firestore — showing local building data.');
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

  useEffect(() => {
    setRequestDrafts((current) => {
      const nextDrafts = viewingRequests.reduce<Record<string, { assignee: string; internalNotes: string }>>((accumulator, request) => {
        accumulator[request.id] = current[request.id] ?? {
          assignee: request.assignee,
          internalNotes: request.internalNotes,
        };
        return accumulator;
      }, {});

      const currentKeys = Object.keys(current);
      const nextKeys = Object.keys(nextDrafts);
      const unchanged =
        currentKeys.length === nextKeys.length &&
        nextKeys.every(
          (key) =>
            current[key]?.assignee === nextDrafts[key]?.assignee &&
            current[key]?.internalNotes === nextDrafts[key]?.internalNotes,
        );

      return unchanged ? current : nextDrafts;
    });
  }, [viewingRequests]);

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
      const scheduledPublishAtIso =
        propertyForm.scheduledPublishAt && !Number.isNaN(new Date(propertyForm.scheduledPublishAt).getTime())
          ? new Date(propertyForm.scheduledPublishAt).toISOString()
          : '';
      const scheduledPublishAtText = scheduledPublishAtIso
        ? new Date(scheduledPublishAtIso).toLocaleString('en-ZA', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          })
        : '';
      const lastEditedBy = propertyForm.lastEditedBy.trim();
      const lastEditedAtText = new Date().toLocaleString('en-ZA', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
      const record = buildPropertyRecord({
        ...propertyForm,
        slug: propertyForm.slug.trim() || slugifyPropertyName(propertyForm.name),
        priceFrom: Number(propertyForm.priceFrom),
        latitude: Number(propertyForm.latitude),
        longitude: Number(propertyForm.longitude),
        singlePrice: Number(propertyForm.singlePrice),
        singleDeposit: Number(propertyForm.singleDeposit),
        sharingPrice: Number(propertyForm.sharingPrice),
        sharingDeposit: Number(propertyForm.sharingDeposit),
      });

      const payload = {
        ...record,
        published: propertyForm.published,
        publishedAt: propertyForm.published ? serverTimestamp() : null,
        publishedAtText: propertyForm.published
          ? new Date().toLocaleString('en-ZA', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
          : '',
        scheduledPublishAtIso,
        scheduledPublishAtText,
        lastEditedBy,
        lastEditedAt: serverTimestamp(),
        lastEditedAtText,
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

  const handleTogglePublished = async (property: ManagedProperty) => {
    setError(null);
    setMessage(null);

    try {
      const db = getFirestore(app);
      const nextPublished = !property.published;
      await updateDoc(doc(db, 'properties', property.id), {
        published: nextPublished,
        publishedAt: nextPublished ? serverTimestamp() : null,
        publishedAtText: nextPublished
          ? new Date().toLocaleString('en-ZA', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
          : '',
        scheduledPublishAtIso: nextPublished ? '' : property.scheduledPublishAt,
        scheduledPublishAtText: nextPublished ? '' : property.scheduledPublishAtLabel,
        updatedAt: serverTimestamp(),
        lastEditedAt: serverTimestamp(),
        lastEditedAtText: new Date().toLocaleString('en-ZA', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        }),
      });
      setMessage(nextPublished ? 'Property published.' : 'Property moved to draft.');
      await loadContent();
    } catch {
      setError('Could not update publishing status.');
    }
  };

  const handleUpdateRequestStatus = async (requestId: string, status: EnquiryStatus) => {
    setError(null);
    setMessage(null);

    try {
      const db = getFirestore(app);
      await updateDoc(doc(db, 'viewingRequests', requestId), {
        status,
        statusUpdatedAt: serverTimestamp(),
        statusUpdatedAtText: new Date().toLocaleString('en-ZA', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        }),
      });
      setMessage(`Enquiry marked as ${formatStatusLabel(status).toLowerCase()}.`);
      await loadContent();
    } catch {
      setError('Could not update enquiry status.');
    }
  };

  const handleSaveRequestNotes = async (requestId: string) => {
    const draft = requestDrafts[requestId];

    if (!draft) {
      return;
    }

    setError(null);
    setMessage(null);

    try {
      const db = getFirestore(app);
      await updateDoc(doc(db, 'viewingRequests', requestId), {
        assignee: draft.assignee.trim(),
        internalNotes: draft.internalNotes.trim(),
        updatedAt: serverTimestamp(),
      });
      setMessage('Enquiry notes updated.');
      await loadContent();
    } catch {
      setError('Could not save enquiry notes.');
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
          published: true,
          publishedAt: serverTimestamp(),
          publishedAtText: new Date().toLocaleString('en-ZA', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
          scheduledPublishAtIso: '',
          scheduledPublishAtText: '',
          lastEditedBy: 'Admin seed',
          lastEditedAt: serverTimestamp(),
          lastEditedAtText: new Date().toLocaleString('en-ZA', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
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

  const resetRenterForm = () => {
    setRenterEditId(null);
    setRenterForm(emptyRenterForm);
  };

  const handleSaveRenter = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const db = getFirestore(app);
      const payload = {
        fullName: renterForm.fullName.trim(),
        email: renterForm.email.trim(),
        phone: renterForm.phone.trim(),
        buildingSlug: renterForm.buildingSlug,
        buildingName: renterForm.buildingName,
        roomMode: renterForm.roomMode,
        leaseStart: renterForm.leaseStart,
        leaseEnd: renterForm.leaseEnd,
        monthlyRent: renterForm.monthlyRent,
        depositPaid: renterForm.depositPaid,
        status: renterForm.status,
        notes: renterForm.notes.trim(),
        updatedAt: serverTimestamp(),
      };
      if (renterEditId) {
        await updateDoc(doc(db, 'renters', renterEditId), payload);
        setMessage('Renter updated.');
      } else {
        await addDoc(collection(db, 'renters'), {
          ...payload,
          createdAt: serverTimestamp(),
          createdAtText: new Date().toLocaleString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' }),
        });
        setMessage('Renter added.');
      }
      resetRenterForm();
      await loadContent();
    } catch {
      setError('Could not save renter.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteRenter = async (id: string) => {
    setError(null);
    setMessage(null);
    try {
      const db = getFirestore(app);
      await deleteDoc(doc(db, 'renters', id));
      setMessage('Renter removed.');
      if (renterEditId === id) resetRenterForm();
      await loadContent();
    } catch {
      setError('Could not delete renter.');
    }
  };

  const handleQuickRoomUpdate = async (propertyId: string, roomMode: 'single' | 'sharing', field: 'availability' | 'monthlyPrice', value: string) => {
    setError(null);
    setMessage(null);
    try {
      const db = getFirestore(app);
      const property = properties.find((p) => p.id === propertyId);
      if (!property) return;
      const updatedRooms = property.roomOptions.map((room) => {
        if (room.mode !== roomMode) return room;
        if (field === 'availability') return { ...room, availability: value };
        return { ...room, monthlyPrice: Number(value) };
      });
      await updateDoc(doc(db, 'properties', propertyId), {
        roomOptions: updatedRooms.map((r) => ({ ...r })),
        updatedAt: serverTimestamp(),
        lastEditedAt: serverTimestamp(),
        lastEditedAtText: new Date().toLocaleString('en-ZA', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
      });
      setMessage('Room updated.');
      await loadContent();
    } catch {
      setError('Could not update room.');
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

  const tabs: Array<{ value: AdminTab; label: string; count?: number }> = [
    { value: 'overview', label: 'Overview' },
    { value: 'buildings', label: 'Buildings', count: properties.length },
    { value: 'rooms', label: 'Rooms' },
    { value: 'renters', label: 'Renters', count: renters.length },
    { value: 'enquiries', label: 'Enquiries', count: viewingRequests.length },
  ];

  return (
    <div className="app-shell section-spacing">
      {/* ── Header ── */}
      <section className="panel rise overflow-hidden p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="kicker">Property Studio</span>
            <h1
              className="architect-heading mt-3 text-3xl font-semibold text-[#121522] md:text-4xl"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              Admin Dashboard
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {properties.length === 0 && (
              <button type="button" onClick={seedDefaults} className="btn-secondary text-sm" disabled={saving}>
                {saving ? 'Seeding...' : 'Seed Starter Buildings'}
              </button>
            )}
            <button type="button" onClick={() => { resetForm(); setActiveTab('buildings'); }} className="btn-primary text-sm">
              + New Building
            </button>
            <button type="button" onClick={() => { resetRenterForm(); setActiveTab('renters'); }} className="btn-secondary text-sm">
              + New Renter
            </button>
          </div>
        </div>

        {/* ── Tab bar ── */}
        <div className="mt-6 flex flex-wrap gap-1 rounded-xl border border-[#d9dee8] bg-[#f3f5f8] p-1">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className="rounded-lg px-4 py-2 text-xs font-semibold transition-all"
              style={{
                background: activeTab === tab.value ? '#1f3a5a' : 'transparent',
                color: activeTab === tab.value ? '#fff' : '#3b4963',
              }}
            >
              {tab.label}
              {typeof tab.count === 'number' && (
                <span className="ml-1.5 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]"
                  style={{ background: activeTab === tab.value ? 'rgba(255,255,255,0.2)' : '#e2e6ec' }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Status messages ── */}
        {(message || error) && (
          <div className="mt-4">
            {message && <p className="rounded-xl border border-[#b9d8c7] bg-[#edf8f2] px-4 py-3 text-sm text-[#1f6946]">{message}</p>}
            {error && <p className="rounded-xl border border-[#e5c4c4] bg-[#fff4f4] px-4 py-3 text-sm text-[#8f2f2f]">{error}</p>}
          </div>
        )}
      </section>

      {/* ═══════════ OVERVIEW TAB ═══════════ */}
      {activeTab === 'overview' && (
        <section className="mt-6 space-y-6">
          {/* Stats grid */}
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8">
            {[
              { label: 'Buildings', value: properties.length },
              { label: 'Published', value: stats.publishedCount },
              { label: 'Scheduled', value: stats.scheduledCount },
              { label: 'Single Rooms', value: stats.singleOptions },
              { label: 'Sharing Rooms', value: stats.sharingOptions },
              { label: 'Active Renters', value: renterStats.activeCount },
              { label: 'Pending Renters', value: renterStats.pendingCount },
              { label: 'Open Enquiries', value: stats.enquiryByStatus.new },
            ].map((s) => (
              <div key={s.label} className="panel p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5f7695]">{s.label}</p>
                <p className="mt-1 text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Revenue + top building */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="panel p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Monthly Rent Revenue (Active)</p>
              <p className="mt-2 text-3xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                R{renterStats.totalMonthly.toLocaleString('en-ZA')}
              </p>
              <p className="mt-1 text-xs text-muted">From {renterStats.activeCount} active renter{renterStats.activeCount !== 1 ? 's' : ''}</p>
            </div>
            {stats.mostEnquired && stats.mostEnquired.enquiryCount > 0 && (
              <div className="panel p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Most Enquired Building</p>
                <p className="mt-2 text-xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                  {stats.mostEnquired.name}
                </p>
                <p className="mt-1 text-xs text-muted">{stats.mostEnquired.enquiryCount} viewing request{stats.mostEnquired.enquiryCount !== 1 ? 's' : ''}</p>
              </div>
            )}
          </div>

          {/* Quick buildings overview */}
          <div className="panel overflow-hidden">
            <div className="border-b border-[#e2e6ec] px-5 py-4">
              <h2 className="text-lg font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                All Buildings at a Glance
              </h2>
            </div>
            {loading ? (
              <div className="p-5 text-sm text-muted">Loading...</div>
            ) : properties.length === 0 ? (
              <div className="p-5 text-sm text-muted">No buildings yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#e8ecf1] bg-[#f7f9fc] text-left text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5f7695]">
                      <th className="px-5 py-3">Building</th>
                      <th className="px-5 py-3">Area</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3">Single</th>
                      <th className="px-5 py-3">Sharing</th>
                      <th className="px-5 py-3">Price From</th>
                      <th className="px-5 py-3">Enquiries</th>
                      <th className="px-5 py-3">Renters</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((property) => {
                      const singleRoom = property.roomOptions.find((r) => r.mode === 'single');
                      const sharingRoom = property.roomOptions.find((r) => r.mode === 'sharing');
                      const buildingRenters = renters.filter((r) => r.buildingSlug === property.slug && r.status === 'active').length;
                      const visState = getPropertyVisibilityState(property);
                      return (
                        <tr key={property.id} className="border-b border-[#f0f2f5] hover:bg-[#fafbfc]">
                          <td className="px-5 py-3 font-medium text-[#162033]">{property.name}</td>
                          <td className="px-5 py-3 text-[#556477]">{property.area}</td>
                          <td className="px-5 py-3">
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${getPropertyVisibilityBadgeClass(visState)}`}>
                              {getPropertyVisibilityLabel(visState)}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-[#324052]">{singleRoom ? `R${singleRoom.monthlyPrice} · ${singleRoom.availability}` : '—'}</td>
                          <td className="px-5 py-3 text-[#324052]">{sharingRoom ? `R${sharingRoom.monthlyPrice} · ${sharingRoom.availability}` : '—'}</td>
                          <td className="px-5 py-3 font-medium text-[#162033]">R{property.priceFrom}</td>
                          <td className="px-5 py-3 text-[#324052]">{property.enquiryCount}</td>
                          <td className="px-5 py-3 text-[#324052]">{buildingRenters}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Recent enquiries preview */}
          {viewingRequests.length > 0 && (
            <div className="panel overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#e2e6ec] px-5 py-4">
                <h2 className="text-lg font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                  Recent Enquiries
                </h2>
                <button type="button" onClick={() => setActiveTab('enquiries')} className="text-xs font-semibold text-[#2e4f7a] hover:text-[#1f3a5a]">
                  View All →
                </button>
              </div>
              <div className="divide-y divide-[#f0f2f5]">
                {viewingRequests.slice(0, 5).map((req) => (
                  <div key={req.id} className="flex items-center justify-between gap-4 px-5 py-3">
                    <div>
                      <p className="font-medium text-[#162033]">{req.fullName}</p>
                      <p className="text-xs text-[#6a7891]">{req.buildingName} · {req.roomMode} · {req.moveInMonth}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${getStatusBadgeClass(req.status)}`}>
                      {formatStatusLabel(req.status)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ═══════════ BUILDINGS TAB ═══════════ */}
      {activeTab === 'buildings' && (
        <section className="mt-6 space-y-6">
          <div className="panel rise p-6 md:p-8">
            <form className="grid gap-6" onSubmit={handleSaveProperty}>
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <span className="kicker">Property Form</span>
                  <h2 className="mt-3 text-3xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                    {propertyEditId ? 'Edit Building' : 'Create Building'}
                  </h2>
                </div>
                <p className="max-w-xl text-sm text-muted">
                  Use this as the master record for the public building page. Slug is auto-generated from the name if left blank.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                <PropertyInput label="Building Name" value={propertyForm.name}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, name: value, slug: prev.slug ? prev.slug : slugifyPropertyName(value) }))}
                  placeholder="Musgrave Study Suites" />
                <PropertyInput label="Slug" value={propertyForm.slug}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, slug: value }))}
                  placeholder="musgrave-study-suites" required={false} />
                <PropertyInput label="Area" value={propertyForm.area}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, area: value }))}
                  placeholder="Musgrave, Durban" />
                <PropertyInput label="Badge" value={propertyForm.badge}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, badge: value }))}
                  placeholder="Quiet academic block" />
                <label className="grid gap-2 text-sm text-[#243041]">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Publishing Status</span>
                  <select value={propertyForm.published ? 'published' : 'draft'}
                    onChange={(event) => setPropertyForm((prev) => ({ ...prev, published: event.target.value === 'published' }))}
                    className="w-full rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#5f7695] focus:ring-2 focus:ring-[#d6dfec]">
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </label>
                <PropertyInput label="Scheduled Publish" type="datetime-local" value={propertyForm.scheduledPublishAt}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, scheduledPublishAt: value }))}
                  placeholder="" required={false} />
                <PropertyInput label="Price From" type="number" min={0} value={propertyForm.priceFrom}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, priceFrom: Number(value) }))}
                  placeholder="4200" />
                <PropertyInput label="Hero Image" value={propertyForm.heroImage}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, heroImage: value }))}
                  placeholder="/buildings/musgrave-exterior.svg" />
                <PropertyInput label="Latitude" type="number" value={propertyForm.latitude}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, latitude: Number(value) }))}
                  placeholder="-29.8417" required={false} />
                <PropertyInput label="Longitude" type="number" value={propertyForm.longitude}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, longitude: Number(value) }))}
                  placeholder="31.0134" required={false} />
                <PropertyInput label="Last Edited By" value={propertyForm.lastEditedBy}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, lastEditedBy: value }))}
                  placeholder="Lungile" required={false} />
              </div>

              <div className="grid gap-4">
                <div>
                  <span className="kicker">Gallery Slots</span>
                  <p className="mt-2 text-sm text-muted">Each slot controls both the image order and the caption.</p>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  {Array.from({ length: 4 }, (_, index) => {
                    const imageValue = splitMultiline(propertyForm.galleryImageUrls)[index] ?? '';
                    const captionValue = splitMultiline(propertyForm.galleryCaptions)[index] ?? '';
                    return (
                      <div key={`gallery-slot-${index + 1}`} className="rounded-[1.4rem] border border-[#dde2ea] bg-[#fbfcfe] p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Slot {index + 1}</p>
                        <div className="mt-4 grid gap-4">
                          <PropertyInput label="Image URL" value={imageValue}
                            onChange={(value) => setPropertyForm((prev) => ({ ...prev, galleryImageUrls: setMultilineValue(prev.galleryImageUrls, index, value) }))}
                            placeholder={index === 0 ? 'Leading image URL' : 'Additional gallery image URL'} required={false} />
                          <PropertyTextarea label="Caption" value={captionValue}
                            onChange={(value) => setPropertyForm((prev) => ({ ...prev, galleryCaptions: setMultilineValue(prev.galleryCaptions, index, value) }))}
                            placeholder={index === 0 ? 'Lead photo caption' : 'Caption for this gallery slot'} rows={3} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <PropertyInput label="UKZN Access" value={propertyForm.ukznAccess}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, ukznAccess: value }))}
                  placeholder="12 minutes to Howard College corridor" />
                <PropertyInput label="DUT Access" value={propertyForm.dutAccess}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, dutAccess: value }))}
                  placeholder="18 minutes to city campus route" />
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <PropertyTextarea label="Headline" value={propertyForm.headline}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, headline: value }))}
                  placeholder="A calmer Berea base for students who want study structure." rows={3} />
                <PropertyTextarea label="Summary" value={propertyForm.summary}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, summary: value }))}
                  placeholder="Describe the building, the feel, and the practical daily use." rows={3} />
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                <PropertyTextarea label="Amenities" value={propertyForm.amenities}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, amenities: value }))}
                  placeholder="One amenity per line" rows={5} />
                <PropertyTextarea label="Highlights" value={propertyForm.highlights}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, highlights: value }))}
                  placeholder="One highlight per line" rows={5} />
                <PropertyTextarea label="Workflow Notes" value={propertyForm.workflowNotes}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, workflowNotes: value }))}
                  placeholder="One workflow note per line" rows={5} />
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-[1.4rem] border border-[#dde2ea] bg-[#fbfcfe] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Single Rooms</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <PropertyInput label="Monthly Price" type="number" min={0} value={propertyForm.singlePrice}
                      onChange={(value) => setPropertyForm((prev) => ({ ...prev, singlePrice: Number(value) }))} placeholder="4200" />
                    <PropertyInput label="Deposit" type="number" min={0} value={propertyForm.singleDeposit}
                      onChange={(value) => setPropertyForm((prev) => ({ ...prev, singleDeposit: Number(value) }))} placeholder="4200" />
                    <PropertyInput label="Availability" value={propertyForm.singleAvailability}
                      onChange={(value) => setPropertyForm((prev) => ({ ...prev, singleAvailability: value }))} placeholder="3 rooms available" />
                    <PropertyInput label="Lease Term" value={propertyForm.singleLeaseTerm}
                      onChange={(value) => setPropertyForm((prev) => ({ ...prev, singleLeaseTerm: value }))} placeholder="12-month lease" />
                  </div>
                </div>
                <div className="rounded-[1.4rem] border border-[#dde2ea] bg-[#fbfcfe] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Sharing Rooms</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <PropertyInput label="Monthly Price" type="number" min={0} value={propertyForm.sharingPrice}
                      onChange={(value) => setPropertyForm((prev) => ({ ...prev, sharingPrice: Number(value) }))} placeholder="2950" />
                    <PropertyInput label="Deposit" type="number" min={0} value={propertyForm.sharingDeposit}
                      onChange={(value) => setPropertyForm((prev) => ({ ...prev, sharingDeposit: Number(value) }))} placeholder="2950" />
                    <PropertyInput label="Availability" value={propertyForm.sharingAvailability}
                      onChange={(value) => setPropertyForm((prev) => ({ ...prev, sharingAvailability: value }))} placeholder="4 beds available" />
                    <PropertyInput label="Lease Term" value={propertyForm.sharingLeaseTerm}
                      onChange={(value) => setPropertyForm((prev) => ({ ...prev, sharingLeaseTerm: value }))} placeholder="Semester or 12-month lease" />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_1fr]">
                <PropertyTextarea label="Resident Quote" value={propertyForm.reviewQuote}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, reviewQuote: value }))}
                  placeholder="A short quote." rows={4} />
                <PropertyInput label="Resident Name" value={propertyForm.reviewResident}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, reviewResident: value }))}
                  placeholder="Nomfundo, Durban student" />
                <PropertyInput label="Resident Detail" value={propertyForm.reviewDetail}
                  onChange={(value) => setPropertyForm((prev) => ({ ...prev, reviewDetail: value }))}
                  placeholder="Stayed for two semesters while commuting from Berea." />
              </div>

              <div className="flex flex-wrap gap-3">
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : propertyEditId ? 'Update Property' : 'Create Property'}
                </button>
                <button type="button" onClick={resetForm} className="btn-secondary">Clear Form</button>
              </div>
            </form>
          </div>

          {/* Buildings list */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                All Buildings ({properties.length})
              </h2>
            </div>
            {loading ? (
              <p className="text-sm text-muted">Loading...</p>
            ) : properties.length === 0 ? (
              <div className="panel p-6 text-sm text-muted">No properties yet. Use <strong>Seed Starter Buildings</strong> or create one above.</div>
            ) : (
              <div className="grid gap-4 xl:grid-cols-2">
                {properties.map((property) => {
                  const visState = getPropertyVisibilityState(property);
                  return (
                    <article key={property.id} className="panel rise overflow-hidden">
                      <div className="h-1 bg-[linear-gradient(90deg,#2e4f7a,#caa86a)]" />
                      <div className="grid gap-5 p-5 md:grid-cols-[1.05fr_0.95fr] md:p-6">
                        <div>
                          <div className="mb-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-[#edf2f9] px-2.5 py-0.5 text-[11px] font-semibold text-[#2e4f7a]">{property.badge}</span>
                            <span className="rounded-full bg-[#f4f6f9] px-2.5 py-0.5 text-[11px] font-semibold text-[#4d6580]">{property.area}</span>
                            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${getPropertyVisibilityBadgeClass(visState)}`}>
                              {getPropertyVisibilityLabel(visState)}
                            </span>
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
                          <div className="rounded-xl border border-[#dde2ea] bg-white px-4 py-3 text-sm text-[#324052]">
                            <span className="font-semibold text-[#162033]">Enquiries:</span> {property.enquiryCount}
                          </div>
                          {(property.lastEditedBy || property.lastEditedAtLabel) && (
                            <div className="rounded-xl border border-[#dde2ea] bg-white px-4 py-3 text-sm text-[#324052]">
                              <span className="font-semibold text-[#162033]">Last edited:</span>{' '}
                              {[property.lastEditedBy, property.lastEditedAtLabel].filter(Boolean).join(' · ')}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 border-t border-[#e8ecf1] bg-[#f7f9fc] px-5 py-3 md:px-6">
                        <button type="button" className="rounded-lg bg-[#2e4f7a] px-3 py-2 text-xs font-semibold text-white hover:bg-[#243c5d]"
                          onClick={() => { setPropertyEditId(property.id); setPropertyForm(propertyToFormValues(property)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                          Edit
                        </button>
                        <button type="button"
                          className={`rounded-lg px-3 py-2 text-xs font-semibold ${property.published ? 'border border-[#d6b06a] bg-[#fff7e8] text-[#8b6124] hover:bg-[#ffefcb]' : 'bg-[#1f6946] text-white hover:bg-[#175236]'}`}
                          onClick={() => handleTogglePublished(property)}>
                          {property.published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button type="button" className="rounded-lg border border-[#e3caca] bg-white px-3 py-2 text-xs font-semibold text-[#8b3535] hover:bg-[#fff4f4]"
                          onClick={() => handleDeleteProperty(property.id)}>
                          Delete
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══════════ ROOMS TAB ═══════════ */}
      {activeTab === 'rooms' && (
        <section className="mt-6 space-y-6">
          <div className="panel p-5 md:p-6">
            <h2 className="text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Room Availability &amp; Pricing
            </h2>
            <p className="mt-2 text-sm text-muted">Quick-edit room details per building without opening the full property form.</p>
          </div>

          {loading ? (
            <p className="text-sm text-muted">Loading...</p>
          ) : properties.length === 0 ? (
            <div className="panel p-6 text-sm text-muted">No buildings to manage rooms for.</div>
          ) : (
            <div className="grid gap-4">
              {properties.map((property) => (
                <article key={property.id} className="panel overflow-hidden">
                  <div className="flex items-center justify-between border-b border-[#e2e6ec] bg-[#f7f9fc] px-5 py-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                        {property.name}
                      </h3>
                      <p className="text-xs text-[#6a7891]">{property.area} · From R{property.priceFrom}/mo</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${getPropertyVisibilityBadgeClass(getPropertyVisibilityState(property))}`}>
                      {getPropertyVisibilityLabel(getPropertyVisibilityState(property))}
                    </span>
                  </div>
                  <div className="grid gap-4 p-5 md:grid-cols-2">
                    {property.roomOptions.map((room) => (
                      <div key={room.id} className="rounded-[1.2rem] border border-[#dde2ea] bg-[#fbfcfe] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">
                          {room.mode === 'single' ? 'Single Room' : 'Sharing Room'}
                        </p>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          <label className="grid gap-1.5 text-sm">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Monthly Price</span>
                            <input type="number" min={0} defaultValue={room.monthlyPrice}
                              onBlur={(e) => handleQuickRoomUpdate(property.id, room.mode as 'single' | 'sharing', 'monthlyPrice', e.target.value)}
                              className="w-full rounded-xl border border-[#d2d7e0] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#5f7695] focus:ring-2 focus:ring-[#d6dfec]" />
                          </label>
                          <label className="grid gap-1.5 text-sm">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Availability</span>
                            <input type="text" defaultValue={room.availability}
                              onBlur={(e) => handleQuickRoomUpdate(property.id, room.mode as 'single' | 'sharing', 'availability', e.target.value)}
                              className="w-full rounded-xl border border-[#d2d7e0] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#5f7695] focus:ring-2 focus:ring-[#d6dfec]" />
                          </label>
                        </div>
                        <div className="mt-2 flex gap-4 text-xs text-[#6a7891]">
                          <span>Deposit: R{room.deposit}</span>
                          <span>Lease: {room.leaseTerm}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ═══════════ RENTERS TAB ═══════════ */}
      {activeTab === 'renters' && (
        <section className="mt-6 space-y-6">
          {/* Renter stats */}
          <div className="grid gap-3 sm:grid-cols-4">
            {[
              { label: 'Total Renters', value: renters.length },
              { label: 'Active', value: renterStats.activeCount },
              { label: 'Pending', value: renterStats.pendingCount },
              { label: 'Monthly Revenue', value: `R${renterStats.totalMonthly.toLocaleString('en-ZA')}` },
            ].map((s) => (
              <div key={s.label} className="panel p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5f7695]">{s.label}</p>
                <p className="mt-1 text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Renter form */}
          <div className="panel rise p-6 md:p-8">
            <form className="grid gap-5" onSubmit={handleSaveRenter}>
              <div>
                <span className="kicker">Renter Form</span>
                <h2 className="mt-3 text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                  {renterEditId ? 'Edit Renter' : 'Add New Renter'}
                </h2>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                <PropertyInput label="Full Name" value={renterForm.fullName}
                  onChange={(v) => setRenterForm((p) => ({ ...p, fullName: v }))} placeholder="Sipho Ndlovu" />
                <PropertyInput label="Email" value={renterForm.email}
                  onChange={(v) => setRenterForm((p) => ({ ...p, email: v }))} placeholder="sipho@example.com" />
                <PropertyInput label="Phone" value={renterForm.phone}
                  onChange={(v) => setRenterForm((p) => ({ ...p, phone: v }))} placeholder="+27 61 000 0000" required={false} />
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                <label className="grid gap-2 text-sm text-[#243041]">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Building</span>
                  <select value={renterForm.buildingSlug}
                    onChange={(e) => {
                      const slug = e.target.value;
                      const bld = properties.find((p) => p.slug === slug);
                      setRenterForm((p) => ({ ...p, buildingSlug: slug, buildingName: bld?.name ?? slug }));
                    }}
                    className="w-full rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#5f7695] focus:ring-2 focus:ring-[#d6dfec]"
                    required>
                    <option value="" disabled>Select building</option>
                    {properties.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
                  </select>
                </label>
                <label className="grid gap-2 text-sm text-[#243041]">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Room Mode</span>
                  <select value={renterForm.roomMode}
                    onChange={(e) => setRenterForm((p) => ({ ...p, roomMode: e.target.value }))}
                    className="w-full rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#5f7695] focus:ring-2 focus:ring-[#d6dfec]">
                    <option value="single">Single</option>
                    <option value="sharing">Sharing</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm text-[#243041]">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Status</span>
                  <select value={renterForm.status}
                    onChange={(e) => setRenterForm((p) => ({ ...p, status: e.target.value as RenterStatus }))}
                    className="w-full rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#5f7695] focus:ring-2 focus:ring-[#d6dfec]">
                    {renterStatuses.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </label>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                <PropertyInput label="Lease Start" type="datetime-local" value={renterForm.leaseStart}
                  onChange={(v) => setRenterForm((p) => ({ ...p, leaseStart: v }))} required={false} />
                <PropertyInput label="Lease End" type="datetime-local" value={renterForm.leaseEnd}
                  onChange={(v) => setRenterForm((p) => ({ ...p, leaseEnd: v }))} required={false} />
                <PropertyInput label="Monthly Rent" type="number" min={0} value={renterForm.monthlyRent}
                  onChange={(v) => setRenterForm((p) => ({ ...p, monthlyRent: Number(v) }))} placeholder="4200" />
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <label className="flex items-center gap-3 text-sm text-[#243041]">
                  <input type="checkbox" checked={renterForm.depositPaid}
                    onChange={(e) => setRenterForm((p) => ({ ...p, depositPaid: e.target.checked }))}
                    className="h-4 w-4 rounded border-[#c9d1dc]" />
                  <span>Deposit paid</span>
                </label>
                <PropertyTextarea label="Notes" value={renterForm.notes}
                  onChange={(v) => setRenterForm((p) => ({ ...p, notes: v }))} placeholder="Internal notes about this renter" rows={3} />
              </div>

              <div className="flex flex-wrap gap-3">
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : renterEditId ? 'Update Renter' : 'Add Renter'}
                </button>
                <button type="button" onClick={resetRenterForm} className="btn-secondary">Clear</button>
              </div>
            </form>
          </div>

          {/* Renter filter + list */}
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <button type="button" onClick={() => setRenterFilter('all')}
                className={renterFilter === 'all' ? 'btn-primary' : 'btn-secondary'}>
                All ({renters.length})
              </button>
              {renterStatuses.map((s) => (
                <button key={s.value} type="button" onClick={() => setRenterFilter(s.value)}
                  className={renterFilter === s.value ? 'btn-primary' : 'btn-secondary'}>
                  {s.label} ({renters.filter((r) => r.status === s.value).length})
                </button>
              ))}
            </div>

            {filteredRenters.length === 0 ? (
              <div className="panel p-6 text-sm text-muted">
                {renters.length === 0 ? 'No renters yet. Add one using the form above.' : 'No renters match the current filter.'}
              </div>
            ) : (
              <div className="grid gap-4 xl:grid-cols-2">
                {filteredRenters.map((renter) => (
                  <article key={renter.id} className="panel overflow-hidden">
                    <div className="h-1" style={{ background: renter.status === 'active' ? '#2e6640' : renter.status === 'pending' ? '#caa86a' : '#d2d7e0' }} />
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                            {renter.fullName}
                          </h3>
                          <p className="mt-1 text-xs text-[#6a7891]">{renter.email} · {renter.phone || 'No phone'}</p>
                        </div>
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${getRenterStatusBadgeClass(renter.status)}`}>
                          {renterStatuses.find((s) => s.value === renter.status)?.label}
                        </span>
                      </div>

                      <div className="mt-4 grid gap-2 text-sm text-[#324052]">
                        <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3">
                          <span className="font-semibold text-[#162033]">Building:</span> {renter.buildingName}
                        </div>
                        <div className="grid gap-2 sm:grid-cols-3">
                          <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3">
                            <span className="font-semibold text-[#162033]">Mode:</span> {renter.roomMode}
                          </div>
                          <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3">
                            <span className="font-semibold text-[#162033]">Rent:</span> R{renter.monthlyRent}
                          </div>
                          <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3">
                            <span className="font-semibold text-[#162033]">Deposit:</span> {renter.depositPaid ? 'Paid' : 'Unpaid'}
                          </div>
                        </div>
                        {(renter.leaseStart || renter.leaseEnd) && (
                          <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3">
                            <span className="font-semibold text-[#162033]">Lease:</span>{' '}
                            {renter.leaseStart ? new Date(renter.leaseStart).toLocaleDateString('en-ZA') : '?'} → {renter.leaseEnd ? new Date(renter.leaseEnd).toLocaleDateString('en-ZA') : '?'}
                          </div>
                        )}
                        {renter.notes && (
                          <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3">
                            <span className="font-semibold text-[#162033]">Notes:</span> {renter.notes}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 border-t border-[#e8ecf1] bg-[#f7f9fc] px-5 py-3">
                      <button type="button" className="rounded-lg bg-[#2e4f7a] px-3 py-2 text-xs font-semibold text-white hover:bg-[#243c5d]"
                        onClick={() => {
                          setRenterEditId(renter.id);
                          setRenterForm({
                            fullName: renter.fullName,
                            email: renter.email,
                            phone: renter.phone,
                            buildingSlug: renter.buildingSlug,
                            buildingName: renter.buildingName,
                            roomMode: renter.roomMode,
                            leaseStart: renter.leaseStart,
                            leaseEnd: renter.leaseEnd,
                            monthlyRent: renter.monthlyRent,
                            depositPaid: renter.depositPaid,
                            status: renter.status,
                            notes: renter.notes,
                          });
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}>
                        Edit
                      </button>
                      <button type="button" className="rounded-lg border border-[#e3caca] bg-white px-3 py-2 text-xs font-semibold text-[#8b3535] hover:bg-[#fff4f4]"
                        onClick={() => handleDeleteRenter(renter.id)}>
                        Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══════════ ENQUIRIES TAB ═══════════ */}
      {activeTab === 'enquiries' && (
        <section className="mt-6 space-y-6">
          <div className="panel p-5 md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="kicker">Enquiry Inbox</span>
                <h2 className="mt-3 text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                  Viewing Requests
                </h2>
              </div>
              <p className="max-w-xl text-sm text-muted">
                Captured from the contact page. Track status and assign team members.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button type="button" onClick={() => setRequestFilter('all')} className={requestFilter === 'all' ? 'btn-primary' : 'btn-secondary'}>
                All ({viewingRequests.length})
              </button>
              {enquiryStatuses.map((status) => (
                <button key={status.value} type="button" onClick={() => setRequestFilter(status.value)}
                  className={requestFilter === status.value ? 'btn-primary' : 'btn-secondary'}>
                  {status.label} ({stats.enquiryByStatus[status.value]})
                </button>
              ))}
            </div>
          </div>

          {filteredViewingRequests.length === 0 ? (
            <div className="panel p-6 text-sm text-muted">
              {viewingRequests.length === 0 ? 'No viewing requests yet.' : 'No enquiries match the current filter.'}
            </div>
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {filteredViewingRequests.map((request) => (
                <article key={request.id} className="panel overflow-hidden p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-[#6a7891]">{request.createdAtLabel}</p>
                      <h3 className="mt-2 text-xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                        {request.fullName}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#edf2f9] px-3 py-1 text-[11px] font-semibold text-[#2e4f7a]">
                        {request.buildingName}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${getStatusBadgeClass(request.status)}`}>
                        {formatStatusLabel(request.status)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2 text-sm text-[#324052]">
                    <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3"><span className="font-semibold text-[#162033]">Email:</span> {request.email}</div>
                    <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3"><span className="font-semibold text-[#162033]">Phone:</span> {request.phone}</div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3"><span className="font-semibold text-[#162033]">Room mode:</span> {request.roomMode}</div>
                      <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3"><span className="font-semibold text-[#162033]">Campus:</span> {request.campus}</div>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3"><span className="font-semibold text-[#162033]">Move-in:</span> {request.moveInMonth}</div>
                      <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3"><span className="font-semibold text-[#162033]">Budget:</span> {request.budget}</div>
                    </div>
                    {request.roomTitle && (
                      <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3"><span className="font-semibold text-[#162033]">Room:</span> {request.roomTitle}</div>
                    )}
                    {request.preferredViewingDate && (
                      <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3"><span className="font-semibold text-[#162033]">Preferred date:</span> {request.preferredViewingDate}</div>
                    )}
                    {request.notes && (
                      <div className="rounded-xl border border-[#e1e6ee] bg-[#fbfcfe] px-4 py-3"><span className="font-semibold text-[#162033]">Notes:</span> {request.notes}</div>
                    )}
                  </div>

                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <PropertyInput label="Assignee" value={requestDrafts[request.id]?.assignee ?? request.assignee}
                      onChange={(value) => setRequestDrafts((prev) => ({
                        ...prev,
                        [request.id]: { ...(prev[request.id] ?? { assignee: request.assignee, internalNotes: request.internalNotes }), assignee: value },
                      }))}
                      placeholder="Team member name" required={false} />
                    <PropertyTextarea label="Internal Notes" value={requestDrafts[request.id]?.internalNotes ?? request.internalNotes}
                      onChange={(value) => setRequestDrafts((prev) => ({
                        ...prev,
                        [request.id]: { ...(prev[request.id] ?? { assignee: request.assignee, internalNotes: request.internalNotes }), internalNotes: value },
                      }))}
                      placeholder="Follow-up context, call notes, blockers" rows={3} />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {enquiryStatuses.map((status) => (
                      <button key={`${request.id}-${status.value}`} type="button"
                        onClick={() => handleUpdateRequestStatus(request.id, status.value)}
                        className={request.status === status.value ? 'btn-primary' : 'btn-secondary'}>
                        {status.label}
                      </button>
                    ))}
                    <button type="button" onClick={() => handleSaveRequestNotes(request.id)} className="btn-secondary">
                      Save Notes
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
