import type { BuildingGalleryItem, BuildingItem, RoomOption } from './contentData';

export type PropertyFormValues = {
  slug: string;
  name: string;
  area: string;
  badge: string;
  priceFrom: number;
  ukznAccess: string;
  dutAccess: string;
  headline: string;
  summary: string;
  heroImage: string;
  amenities: string;
  highlights: string;
  workflowNotes: string;
  singlePrice: number;
  singleDeposit: number;
  singleAvailability: string;
  singleLeaseTerm: string;
  sharingPrice: number;
  sharingDeposit: number;
  sharingAvailability: string;
  sharingLeaseTerm: string;
  reviewQuote: string;
  reviewResident: string;
  reviewDetail: string;
};

export const emptyPropertyForm: PropertyFormValues = {
  slug: '',
  name: '',
  area: '',
  badge: 'Architectural student address',
  priceFrom: 4200,
  ukznAccess: '',
  dutAccess: '',
  headline: '',
  summary: '',
  heroImage: '/buildings/musgrave-exterior.svg',
  amenities: 'Wi-Fi ready floors\nControlled access\nLaundry room\nWater backup',
  highlights: 'Near key student routes\nClear rental structure\nStrong day-to-day practicality',
  workflowNotes: 'Review the building first\nCompare single and sharing options\nAsk about utilities before deposit',
  singlePrice: 4200,
  singleDeposit: 4200,
  singleAvailability: '3 rooms available',
  singleLeaseTerm: '12-month lease',
  sharingPrice: 2950,
  sharingDeposit: 2950,
  sharingAvailability: '4 beds available',
  sharingLeaseTerm: 'Semester or 12-month lease',
  reviewQuote: 'The building page made the decision easier because the space, commute logic, and room mode were explained in one place.',
  reviewResident: 'Durban renter',
  reviewDetail: 'Use a real resident name and detail when this property goes live.',
};

function splitTextList(value: string) {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function slugifyPropertyName(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function createGallery(name: string, area: string, heroImage: string): BuildingGalleryItem[] {
  return [
    {
      src: heroImage,
      alt: `${name} exterior`,
      caption: `Arrival view of ${name} in ${area}.`,
    },
    {
      src: '/buildings/room-study.svg',
      alt: `${name} study zone`,
      caption: 'Study-oriented common area with a calmer, more structured layout.',
    },
    {
      src: '/buildings/room-single.svg',
      alt: `${name} single room`,
      caption: 'Private room arrangement with desk space, storage, and better light control.',
    },
    {
      src: '/buildings/room-sharing.svg',
      alt: `${name} sharing room`,
      caption: 'Sharing layout planned around circulation, storage, and everyday practicality.',
    },
  ];
}

function createRoomOptions(form: PropertyFormValues): RoomOption[] {
  const options: RoomOption[] = [];

  if (form.singlePrice > 0) {
    options.push({
      id: `${form.slug || slugifyPropertyName(form.name)}-single`,
      title: `${form.name} Single Suite`,
      mode: 'single',
      monthlyPrice: Number(form.singlePrice),
      deposit: Number(form.singleDeposit || form.singlePrice),
      availability: form.singleAvailability.trim() || 'Single rooms available',
      leaseTerm: form.singleLeaseTerm.trim() || '12-month lease',
      occupancy: '1 tenant',
      image: '/buildings/room-single.svg',
      summary: `A private room offering stronger personal control, quieter study conditions, and access to the wider ${form.name} shared amenities.`,
      features: ['Private sleeping zone', 'Study desk', 'Storage included', 'Access to shared amenities'],
      utilities: ['Wi-Fi included', 'Water included', 'Electricity terms on request'],
    });
  }

  if (form.sharingPrice > 0) {
    options.push({
      id: `${form.slug || slugifyPropertyName(form.name)}-sharing`,
      title: `${form.name} Sharing Suite`,
      mode: 'sharing',
      monthlyPrice: Number(form.sharingPrice),
      deposit: Number(form.sharingDeposit || form.sharingPrice),
      availability: form.sharingAvailability.trim() || 'Sharing beds available',
      leaseTerm: form.sharingLeaseTerm.trim() || 'Semester or 12-month lease',
      occupancy: '2 tenants',
      image: '/buildings/room-sharing.svg',
      summary: `A more cost-aware sharing option inside ${form.name}, balancing budget with the same building access, transport logic, and daily essentials.`,
      features: ['Shared storage zones', 'Study positions', 'Access to shared amenities', 'Lower monthly entry point'],
      utilities: ['Wi-Fi included', 'Water included', 'Electricity terms on request'],
    });
  }

  return options;
}

export function buildPropertyRecord(form: PropertyFormValues): BuildingItem {
  const slug = form.slug.trim() || slugifyPropertyName(form.name);
  const roomOptions = createRoomOptions({ ...form, slug });

  return {
    slug,
    name: form.name.trim(),
    area: form.area.trim(),
    badge: form.badge.trim(),
    priceFrom: Number(form.priceFrom),
    campusAccess: {
      ukzn: form.ukznAccess.trim(),
      dut: form.dutAccess.trim(),
    },
    headline: form.headline.trim(),
    summary: form.summary.trim(),
    heroImage: form.heroImage.trim(),
    gallery: createGallery(form.name.trim(), form.area.trim(), form.heroImage.trim()),
    amenities: splitTextList(form.amenities),
    highlights: splitTextList(form.highlights),
    workflowNotes: splitTextList(form.workflowNotes),
    roomOptions,
    review: {
      quote: form.reviewQuote.trim(),
      resident: form.reviewResident.trim(),
      detail: form.reviewDetail.trim(),
    },
  };
}

function parseGallery(raw: unknown) {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw
    .map((item) => {
      if (
        typeof item === 'object' &&
        item !== null &&
        typeof item.src === 'string' &&
        typeof item.alt === 'string' &&
        typeof item.caption === 'string'
      ) {
        return { src: item.src, alt: item.alt, caption: item.caption };
      }

      return null;
    })
    .filter((item): item is BuildingGalleryItem => item !== null);
}

function parseRoomOptions(raw: unknown) {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw
    .map((item) => {
      const monthlyPrice = Number(typeof item === 'object' && item !== null ? item.monthlyPrice : NaN);
      const deposit = Number(typeof item === 'object' && item !== null ? item.deposit : NaN);

      if (
        typeof item !== 'object' ||
        item === null ||
        typeof item.id !== 'string' ||
        typeof item.title !== 'string' ||
        (item.mode !== 'single' && item.mode !== 'sharing') ||
        Number.isNaN(monthlyPrice) ||
        Number.isNaN(deposit) ||
        typeof item.availability !== 'string' ||
        typeof item.leaseTerm !== 'string' ||
        typeof item.occupancy !== 'string' ||
        typeof item.image !== 'string' ||
        typeof item.summary !== 'string' ||
        !Array.isArray(item.features) ||
        !Array.isArray(item.utilities)
      ) {
        return null;
      }

      const features = item.features.filter(
        (feature: unknown): feature is string => typeof feature === 'string' && feature.trim().length > 0,
      );
      const utilities = item.utilities.filter(
        (utility: unknown): utility is string => typeof utility === 'string' && utility.trim().length > 0,
      );

      if (features.length === 0 || utilities.length === 0) {
        return null;
      }

      return {
        id: item.id,
        title: item.title,
        mode: item.mode,
        monthlyPrice,
        deposit,
        availability: item.availability,
        leaseTerm: item.leaseTerm,
        occupancy: item.occupancy,
        image: item.image,
        summary: item.summary,
        features,
        utilities,
      } satisfies RoomOption;
    })
    .filter((item): item is RoomOption => item !== null);
}

export function parsePropertyRecord(raw: Record<string, unknown>): BuildingItem | null {
  const priceFrom = Number(raw.priceFrom);
  const gallery = parseGallery(raw.gallery);
  const roomOptions = parseRoomOptions(raw.roomOptions);
  const campusAccess = raw.campusAccess;
  const review = raw.review;
  const amenities = Array.isArray(raw.amenities)
    ? raw.amenities.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    : [];
  const highlights = Array.isArray(raw.highlights)
    ? raw.highlights.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    : [];
  const workflowNotes = Array.isArray(raw.workflowNotes)
    ? raw.workflowNotes.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    : [];

  if (
    typeof raw.slug !== 'string' ||
    typeof raw.name !== 'string' ||
    typeof raw.area !== 'string' ||
    typeof raw.badge !== 'string' ||
    Number.isNaN(priceFrom) ||
    typeof raw.headline !== 'string' ||
    typeof raw.summary !== 'string' ||
    typeof raw.heroImage !== 'string' ||
    typeof campusAccess !== 'object' ||
    campusAccess === null ||
    !('ukzn' in campusAccess) ||
    !('dut' in campusAccess) ||
    typeof campusAccess.ukzn !== 'string' ||
    typeof campusAccess.dut !== 'string' ||
    gallery.length === 0 ||
    amenities.length === 0 ||
    highlights.length === 0 ||
    workflowNotes.length === 0 ||
    roomOptions.length === 0 ||
    typeof review !== 'object' ||
    review === null ||
    !('quote' in review) ||
    !('resident' in review) ||
    !('detail' in review) ||
    typeof review.quote !== 'string' ||
    typeof review.resident !== 'string' ||
    typeof review.detail !== 'string'
  ) {
    return null;
  }

  return {
    slug: raw.slug,
    name: raw.name,
    area: raw.area,
    badge: raw.badge,
    priceFrom,
    campusAccess: {
      ukzn: campusAccess.ukzn,
      dut: campusAccess.dut,
    },
    headline: raw.headline,
    summary: raw.summary,
    heroImage: raw.heroImage,
    gallery,
    amenities,
    highlights,
    workflowNotes,
    roomOptions,
    review: {
      quote: review.quote,
      resident: review.resident,
      detail: review.detail,
    },
  };
}