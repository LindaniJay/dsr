export type AvailabilityState = 'available-now' | 'limited' | 'next-intake' | 'waitlist';

export type NeighbourhoodGuide = {
  slug: string;
  name: string;
  strapline: string;
  image: string;
  hero: string;
  commuteFocus: string;
  rentPositioning: string;
  atmosphere: string;
  bestFor: string[];
  watchFor: string[];
  landmarks: string[];
};

type BuildingExperience = {
  bestFor: string;
  neighbourhoodSlug: string;
  trustSignals: string[];
  costSummary: {
    depositRule: string;
    utilitiesPolicy: string;
    adminFee: string;
    moveInWindow: string;
  };
  operator: {
    responseTime: string;
    viewingDays: string;
    verification: string;
  };
};

export const neighbourhoodGuides: NeighbourhoodGuide[] = [
  {
    slug: 'musgrave-berea',
    name: 'Musgrave and Berea',
    strapline: 'Quieter residential streets with strong academic-corridor access.',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80',
    hero: 'Musgrave works best when you want a calmer building rhythm without losing practical access to the Berea student belt.',
    commuteFocus: 'Useful for Howard College routes, grocery access, and a more structured weekday routine.',
    rentPositioning: 'Usually mid-to-upper student budget, with a stronger emphasis on privacy and building quality.',
    atmosphere: 'More composed, quieter, and less house-share oriented than some nearby student pockets.',
    bestFor: ['Students prioritising privacy', 'Longer-stay renters', 'Study-focused routines'],
    watchFor: ['Confirm transport timing during peak hours', 'Check utility caps on premium single rooms', 'Ask how quiet-hours are managed'],
    landmarks: ['Musgrave Centre', 'Berea corridor', 'Howard College route'],
  },
  {
    slug: 'glenwood',
    name: 'Glenwood',
    strapline: 'House-share friendly streets with strong value for Howard College commuters.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
    hero: 'Glenwood suits renters who want a more communal pattern of living and a lower monthly entry point.',
    commuteFocus: 'Good for Howard College travel and renters comfortable with shared kitchens and collective house routines.',
    rentPositioning: 'Often better value than studio-style options, especially for sharing arrangements.',
    atmosphere: 'More social, house-based, and budget-aware than apartment-led blocks.',
    bestFor: ['Budget-first renters', 'Friends renting together', 'Shared-house living'],
    watchFor: ['Check guest policy and shared cleaning rules', 'Confirm whether pricing is per room or per bed', 'Inspect storage if sharing'],
    landmarks: ['Glenwood Village', 'Howard College approaches', 'Neighbourhood food strip'],
  },
  {
    slug: 'umbilo',
    name: 'Umbilo',
    strapline: 'Independent-feeling units with practical movement to city and campus routes.',
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=80',
    hero: 'Umbilo works for renters who want more privacy, studio-style layouts, or a setup that can flex beyond a traditional student house.',
    commuteFocus: 'Useful for students moving between UKZN, DUT, and healthcare-linked routes.',
    rentPositioning: 'Often slightly higher for true single occupancy, with sharing used as the lower-cost entry point.',
    atmosphere: 'More self-contained, more independent, and often better suited to structured weekday living.',
    bestFor: ['Studio-minded renters', 'Independent daily routines', 'Young professionals near student zones'],
    watchFor: ['Check prepaid electricity expectations', 'Confirm appliance provision', 'Ask about night access and transport options'],
    landmarks: ['Umbilo Road', 'City access corridor', 'Medical and university movement routes'],
  },
];

const buildingExperienceMap: Record<string, BuildingExperience> = {
  'musgrave-study-suites': {
    bestFor: 'Quiet study-focused living',
    neighbourhoodSlug: 'musgrave-berea',
    trustSignals: ['Verified building gallery', 'Controlled-access routine', 'Longer-stay lease options'],
    costSummary: {
      depositRule: 'Deposit usually matches one month of the chosen room rate.',
      utilitiesPolicy: 'Wi-Fi and water are included; electricity is capped by room type.',
      adminFee: 'No separate admin fee is shown unless confirmed during viewing.',
      moveInWindow: 'Best suited to semester planning or full academic-year move-ins.',
    },
    operator: {
      responseTime: 'Replies within one working day on weekdays.',
      viewingDays: 'Viewings typically run Monday to Saturday by appointment.',
      verification: 'Photos and room mix are reviewed before the property goes live.',
    },
  },
  'glenwood-shared-house': {
    bestFor: 'Budget-first shared living',
    neighbourhoodSlug: 'glenwood',
    trustSignals: ['Shared-house rules surfaced early', 'Room-by-room availability guidance', 'Howard College route focus'],
    costSummary: {
      depositRule: 'Deposit is usually one month of rent for either single or sharing occupancy.',
      utilitiesPolicy: 'Wi-Fi and water are included; electricity follows fair-use house rules.',
      adminFee: 'No separate admin fee is assumed unless the operator confirms one.',
      moveInWindow: 'Suitable for semester intake and lower-commitment shared occupancy.',
    },
    operator: {
      responseTime: 'Shortlist replies are typically sent the same day or next working day.',
      viewingDays: 'House tours usually happen in grouped weekday and Saturday slots.',
      verification: 'Shared spaces, gate access, and room mix are documented before publishing.',
    },
  },
  'umbilo-campus-lofts': {
    bestFor: 'Independent studio-style routines',
    neighbourhoodSlug: 'umbilo',
    trustSignals: ['Studio and loft layouts clarified', 'Prepaid utility policy surfaced', 'Suitable for mixed student-professional demand'],
    costSummary: {
      depositRule: 'Deposit generally matches the selected room rate.',
      utilitiesPolicy: 'Water is included and electricity is prepaid or billed by unit policy.',
      adminFee: 'Application costs should be confirmed before payment, not assumed.',
      moveInWindow: 'Commonly better for year-round move-ins and structured lease planning.',
    },
    operator: {
      responseTime: 'Expect viewing feedback inside one working day after an enquiry.',
      viewingDays: 'Viewings are usually scheduled around weekday and Saturday availability.',
      verification: 'Unit layouts and building access notes are checked before publishing.',
    },
  },
};

export const homepageProofSignals = [
  { label: 'Verified building stories', value: 'Every public property is shown as a full building journey, not a disconnected room tile.' },
  { label: 'Application-ready guidance', value: 'Deposits, utilities, lease timing, and viewing logic are surfaced before renters enquire.' },
  { label: 'Neighbourhood context', value: 'Students can compare Musgrave, Glenwood, and Umbilo with route and daily-living context.' },
];

export const applicationReadinessSteps = [
  {
    title: 'Prepare your core documents',
    text: 'Have your ID or passport, student confirmation, and emergency contact details ready before you request a final booking step.',
  },
  {
    title: 'Clarify your finances',
    text: 'Confirm monthly rent, deposit amount, payment method, and any utility caps or prepaid rules before paying anything.',
  },
  {
    title: 'Match your move-in timing',
    text: 'Ask whether the room is available for your exact semester or annual intake and whether early move-in is possible.',
  },
  {
    title: 'Confirm the building rules',
    text: 'Check guest policy, quiet-hours expectations, cleaning arrangements, and how maintenance requests are handled.',
  },
];

export const applicationFaq = [
  'Ask whether the quoted rate is per room, per bed, or per person in a shared room.',
  'Confirm whether Wi-Fi, water, and electricity are included, capped, or prepaid.',
  'Verify when the deposit is due and what secures the room during a busy intake period.',
  'Check whether the building supports semester stays, annual leases, or flexible move-in dates.',
];

export function inferAvailabilityState(availability: string): AvailabilityState {
  const value = availability.toLowerCase();

  if (value.includes('wait')) {
    return 'waitlist';
  }

  if (value.includes('next') || value.includes('soon') || value.includes('upcoming')) {
    return 'next-intake';
  }

  if (/\b1\b|\b2\b|limited/.test(value)) {
    return 'limited';
  }

  return 'available-now';
}

export function getAvailabilityLabel(state: AvailabilityState) {
  switch (state) {
    case 'limited':
      return 'Limited';
    case 'next-intake':
      return 'Next intake';
    case 'waitlist':
      return 'Waitlist';
    default:
      return 'Available now';
  }
}

export function getAvailabilityClassName(state: AvailabilityState) {
  switch (state) {
    case 'limited':
      return 'border-[#d6b06a] bg-[#fff7e8] text-[#8b6124]';
    case 'next-intake':
      return 'border-[#c7d8ee] bg-[#edf5ff] text-[#31557a]';
    case 'waitlist':
      return 'border-[#e0c5c5] bg-[#fff4f4] text-[#8d3f3f]';
    default:
      return 'border-[#c7dbc9] bg-[#eef8ef] text-[#2e6640]';
  }
}

export function getBuildingExperience(slug: string) {
  return buildingExperienceMap[slug] ?? {
    bestFor: 'Students who want clearer building-first rental decisions',
    neighbourhoodSlug: neighbourhoodGuides[0].slug,
    trustSignals: ['Verified location context', 'Clear room-mode presentation', 'Practical viewing guidance'],
    costSummary: {
      depositRule: 'Confirm the deposit before paying to secure the room.',
      utilitiesPolicy: 'Check what is included and what is capped or prepaid.',
      adminFee: 'Ask whether any once-off fees apply before move-in.',
      moveInWindow: 'Match the room timing with your academic calendar.',
    },
    operator: {
      responseTime: 'Expect a reply within one working day.',
      viewingDays: 'Viewing slots are arranged by appointment.',
      verification: 'Public details are checked before publishing.',
    },
  };
}

export function getNeighbourhoodBySlug(slug: string) {
  return neighbourhoodGuides.find((item) => item.slug === slug);
}
