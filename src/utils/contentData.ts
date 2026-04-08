export type EventItem = {
  title: string;
  date: string;
  location: string;
  description: string;
  stream: string;
  format: string;
  seatsLeft: number;
};

export type ProductItem = {
  image: string;
  name: string;
  price: number;
  sizes: string[];
  category: string;
  edition: string;
};

export type RoomMode = 'single' | 'sharing';

export type BuildingGalleryItem = {
  src: string;
  alt: string;
  caption: string;
};

export type BuildingCoordinates = {
  latitude: number;
  longitude: number;
};

export type NearbyPlace = {
  id: string;
  name: string;
  category: 'grocery' | 'transport' | 'study' | 'food';
  distance: string;
  coordinates: BuildingCoordinates;
};

export type CampusAnchor = {
  id: 'ukzn' | 'dut';
  name: string;
  shortLabel: string;
  coordinates: BuildingCoordinates;
};

export type RoomOption = {
  id: string;
  title: string;
  mode: RoomMode;
  monthlyPrice: number;
  deposit: number;
  availability: string;
  leaseTerm: string;
  occupancy: string;
  image: string;
  summary: string;
  features: string[];
  utilities: string[];
};

export type BuildingItem = {
  slug: string;
  name: string;
  area: string;
  badge: string;
  priceFrom: number;
  coordinates: BuildingCoordinates;
  nearbyPlaces: NearbyPlace[];
  campusAccess: {
    ukzn: string;
    dut: string;
  };
  headline: string;
  summary: string;
  heroImage: string;
  gallery: BuildingGalleryItem[];
  amenities: string[];
  highlights: string[];
  workflowNotes: string[];
  roomOptions: RoomOption[];
  review: {
    quote: string;
    resident: string;
    detail: string;
  };
};

const propertyPhotography = {
  musgraveExterior: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80',
  musgraveStudy: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80',
  musgraveSingle: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
  glenwoodExterior: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
  glenwoodShared: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80',
  glenwoodCommon: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80',
  umbiloExterior: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=80',
  umbiloStudio: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
  umbiloKitchenette: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80',
  loftShared: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80',
};

export const defaultBuildingCoordinates: Record<string, BuildingCoordinates> = {
  'musgrave-study-suites': { latitude: -29.8417, longitude: 31.0134 },
  'glenwood-shared-house': { latitude: -29.8536, longitude: 31.0009 },
  'umbilo-campus-lofts': { latitude: -29.8678, longitude: 30.9904 },
};

export const campusAnchors: CampusAnchor[] = [
  {
    id: 'ukzn',
    name: 'UKZN Howard College',
    shortLabel: 'UKZN',
    coordinates: { latitude: -29.8675, longitude: 30.9799 },
  },
  {
    id: 'dut',
    name: 'DUT City Campus',
    shortLabel: 'DUT',
    coordinates: { latitude: -29.8574, longitude: 31.0292 },
  },
];

export const defaultNearbyPlaces: Record<string, NearbyPlace[]> = {
  'musgrave-study-suites': [
    {
      id: 'musgrave-checkers',
      name: 'Musgrave Centre Grocery Run',
      category: 'grocery',
      distance: '6 min walk',
      coordinates: { latitude: -29.8408, longitude: 31.0161 },
    },
    {
      id: 'musgrave-taxi',
      name: 'Berea Taxi Connection',
      category: 'transport',
      distance: '4 min walk',
      coordinates: { latitude: -29.8423, longitude: 31.0118 },
    },
    {
      id: 'musgrave-cafe',
      name: 'Quiet Study Cafe',
      category: 'study',
      distance: '8 min walk',
      coordinates: { latitude: -29.8401, longitude: 31.0142 },
    },
  ],
  'glenwood-shared-house': [
    {
      id: 'glenwood-spar',
      name: 'Glenwood Village Grocery',
      category: 'grocery',
      distance: '7 min walk',
      coordinates: { latitude: -29.8527, longitude: 31.0032 },
    },
    {
      id: 'glenwood-bus',
      name: 'Howard Route Stop',
      category: 'transport',
      distance: '3 min walk',
      coordinates: { latitude: -29.8544, longitude: 31.0017 },
    },
    {
      id: 'glenwood-food',
      name: 'Shared Dinner Strip',
      category: 'food',
      distance: '9 min walk',
      coordinates: { latitude: -29.8519, longitude: 31.0002 },
    },
  ],
  'umbilo-campus-lofts': [
    {
      id: 'umbilo-market',
      name: 'Umbilo Essentials Market',
      category: 'grocery',
      distance: '5 min walk',
      coordinates: { latitude: -29.867, longitude: 30.9924 },
    },
    {
      id: 'umbilo-rail',
      name: 'Campus Taxi Link',
      category: 'transport',
      distance: '4 min walk',
      coordinates: { latitude: -29.8687, longitude: 30.9892 },
    },
    {
      id: 'umbilo-study',
      name: 'Late Study Lounge',
      category: 'study',
      distance: '6 min walk',
      coordinates: { latitude: -29.8663, longitude: 30.9918 },
    },
  ],
};

export function createFallbackNearbyPlaces(area: string, coordinates: BuildingCoordinates): NearbyPlace[] {
  const slugBase = area.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return [
    {
      id: `${slugBase}-grocery`,
      name: `${area} grocery stop`,
      category: 'grocery',
      distance: '6 min walk',
      coordinates: { latitude: coordinates.latitude + 0.0012, longitude: coordinates.longitude + 0.0018 },
    },
    {
      id: `${slugBase}-transport`,
      name: `${area} transport link`,
      category: 'transport',
      distance: '4 min walk',
      coordinates: { latitude: coordinates.latitude - 0.001, longitude: coordinates.longitude + 0.0011 },
    },
    {
      id: `${slugBase}-study`,
      name: `${area} study spot`,
      category: 'study',
      distance: '8 min walk',
      coordinates: { latitude: coordinates.latitude + 0.0008, longitude: coordinates.longitude - 0.0014 },
    },
  ];
}

export const rentalWorkflowStages = [
  {
    title: 'Browse by building',
    text: 'Start with the property, not a disconnected room card. You can compare location, security, travel time, and the overall feel before deciding what type of room makes sense.',
  },
  {
    title: 'Switch between single and sharing',
    text: 'Each property page groups room stock into private and shared options so renters can compare privacy, price, and included extras without leaving the page.',
  },
  {
    title: 'Shortlist and enquire',
    text: 'Once a building feels right, the next step is to ask about availability, viewings, deposits, and lease timing with enough context to move the enquiry forward.',
  },
  {
    title: 'Prepare to apply',
    text: 'Common rental flows surface proof of payment expectations, application docs, and move-in readiness early so students do not waste time on mismatched options.',
  },
];

export const buildingCompareChecklist = [
  'Compare total rent, not only the base price. Ask what happens with Wi-Fi, electricity, and laundry access.',
  'Check how you will get to the specific UKZN or DUT campus you actually attend during your normal travel hours.',
  'Verify whether the quoted rate is per room, per bed, or per person in a shared setup.',
  'Ask whether the building supports semester leases, annual leases, or flexible move-in dates.',
];

export const defaultBuildings: BuildingItem[] = [
  {
    slug: 'musgrave-study-suites',
    name: 'Musgrave Study Suites',
    area: 'Musgrave, Durban',
    badge: 'Quiet academic block',
    priceFrom: 4200,
    coordinates: defaultBuildingCoordinates['musgrave-study-suites'],
    nearbyPlaces: defaultNearbyPlaces['musgrave-study-suites'],
    campusAccess: {
      ukzn: '12 minutes to Howard College corridor',
      dut: '18 minutes to city campus route',
    },
    headline: 'A calmer Berea base for students who want study structure and a cleaner daily routine.',
    summary:
      'Musgrave Study Suites is designed around focused student living: controlled access, strong desk setups, stable shared amenities, and practical movement to UKZN and DUT routes.',
    heroImage: propertyPhotography.musgraveExterior,
    gallery: [
      {
        src: propertyPhotography.musgraveExterior,
        alt: 'Musgrave Study Suites exterior mood',
        caption: 'A calmer residential edge with quick access to the Berea student corridor.',
      },
      {
        src: propertyPhotography.musgraveStudy,
        alt: 'Study-ready kitchen and shared work zone',
        caption: 'A brighter shared interior that supports longer study hours and quieter routines.',
      },
      {
        src: propertyPhotography.musgraveSingle,
        alt: 'Private single room with desk and natural light',
        caption: 'Single-room layouts prioritise a desk setup, storage, and a more private rhythm.',
      },
      {
        src: propertyPhotography.glenwoodShared,
        alt: 'Sharing room layout with twin beds',
        caption: 'Sharing options lower the monthly spend while keeping the building context in view.',
      },
    ],
    amenities: ['Wi-Fi ready floors', '24/7 controlled access', 'Shared study lounge', 'Laundry room', 'Water backup'],
    highlights: [
      'Fits students who want privacy without leaving the Berea student belt.',
      'Works well for Howard College commuters who want a quieter evening environment.',
      'Built around longer-stay tenants rather than short-term turnover.',
    ],
    workflowNotes: ['Book a viewing by building first', 'Choose room mode after the tour', 'Confirm desk and furnishing level before deposit'],
    roomOptions: [
      {
        id: 'musgrave-single-core',
        title: 'Single Study Room',
        mode: 'single',
        monthlyPrice: 4200,
        deposit: 4200,
        availability: '5 rooms available',
        leaseTerm: '12-month lease',
        occupancy: '1 tenant',
        image: propertyPhotography.musgraveSingle,
        summary: 'A private room with a study desk, wardrobe, bed base, and access to shared kitchen and lounge spaces.',
        features: ['Dedicated desk', 'Lockable room', 'Bed and wardrobe included', 'Weekly common-area cleaning'],
        utilities: ['Wi-Fi included', 'Water included', 'Electricity capped'],
      },
      {
        id: 'musgrave-single-premium',
        title: 'Premium Corner Single',
        mode: 'single',
        monthlyPrice: 4950,
        deposit: 4950,
        availability: '2 rooms available',
        leaseTerm: '12-month lease',
        occupancy: '1 tenant',
        image: propertyPhotography.musgraveStudy,
        summary: 'A larger private room on the quieter side of the building with stronger natural light and extra storage.',
        features: ['Larger floor area', 'Corner-window layout', 'Extra shelving', 'Closer to study lounge'],
        utilities: ['Wi-Fi included', 'Water included', 'Electricity capped'],
      },
      {
        id: 'musgrave-sharing-pair',
        title: 'Study Sharing Suite',
        mode: 'sharing',
        monthlyPrice: 2950,
        deposit: 2950,
        availability: '4 beds available',
        leaseTerm: 'Semester or 12-month lease',
        occupancy: '2 tenants',
        image: propertyPhotography.glenwoodShared,
        summary: 'A shared room setup for renters who want the location and amenities at a more accessible monthly price.',
        features: ['Split storage zones', 'Shared desk wall', 'Access to shared kitchen', 'Quiet hours policy'],
        utilities: ['Wi-Fi included', 'Water included', 'Electricity capped'],
      },
    ],
    review: {
      quote: 'What stood out was that I could judge the building first. Once I saw the travel time and the study spaces, choosing between sharing and a single room became much easier.',
      resident: 'Nomfundo, UKZN student',
      detail: 'Stayed for two semesters while commuting between Berea and campus.',
    },
  },
  {
    slug: 'glenwood-shared-house',
    name: 'Glenwood Shared House',
    area: 'Glenwood, Durban',
    badge: 'Community co-living',
    priceFrom: 3200,
    coordinates: defaultBuildingCoordinates['glenwood-shared-house'],
    nearbyPlaces: defaultNearbyPlaces['glenwood-shared-house'],
    campusAccess: {
      ukzn: '10 minutes to Howard College precinct',
      dut: '22 minutes to central DUT route',
    },
    headline: 'A sociable house-style setup for students who want affordability, shared routines, and easy Howard College access.',
    summary:
      'Glenwood Shared House groups students into a more communal living pattern with shared kitchens, furnished rooms, and practical budgets for semester-focused renters.',
    heroImage: propertyPhotography.glenwoodExterior,
    gallery: [
      {
        src: propertyPhotography.glenwoodExterior,
        alt: 'Glenwood Shared House exterior mood',
        caption: 'A house-style setting in a student-friendly pocket close to Howard College routes.',
      },
      {
        src: propertyPhotography.glenwoodShared,
        alt: 'Shared room with twin bed arrangement',
        caption: 'Shared layouts keep budgets lower while maintaining a comfortable common living rhythm.',
      },
      {
        src: propertyPhotography.glenwoodCommon,
        alt: 'Shared lounge and common area',
        caption: 'Common spaces matter here as much as the bedroom because the house is lived in collectively.',
      },
      {
        src: propertyPhotography.musgraveSingle,
        alt: 'Private room in a shared house setting',
        caption: 'Private rooms remain available for students who want the house feel with more privacy.',
      },
    ],
    amenities: ['Furnished bedrooms', 'Shared kitchen', 'Laundry corner', 'Weekly cleaning rota', 'Access-control gate'],
    highlights: [
      'Best for renters prioritising budget and community over complete privacy.',
      'Strong fit for Howard College students who want Glenwood proximity.',
      'House rules are surfaced clearly before move-in to reduce mismatched expectations.',
    ],
    workflowNotes: ['Tour the shared spaces first', 'Decide whether you need a single room or shared bed space', 'Ask for house rules and cleaning schedule'],
    roomOptions: [
      {
        id: 'glenwood-single-core',
        title: 'Private House Room',
        mode: 'single',
        monthlyPrice: 4100,
        deposit: 4100,
        availability: '3 rooms available',
        leaseTerm: 'Semester or 12-month lease',
        occupancy: '1 tenant',
        image: propertyPhotography.musgraveSingle,
        summary: 'A single bedroom inside the house for students who want privacy while still using shared kitchen and laundry spaces.',
        features: ['Furnished room', 'Study desk', 'House Wi-Fi', 'Shared kitchen access'],
        utilities: ['Wi-Fi included', 'Water included', 'Electricity fair-use'],
      },
      {
        id: 'glenwood-sharing-core',
        title: 'Twin Sharing Room',
        mode: 'sharing',
        monthlyPrice: 3200,
        deposit: 3200,
        availability: '6 beds available',
        leaseTerm: 'Semester lease',
        occupancy: '2 tenants',
        image: propertyPhotography.glenwoodShared,
        summary: 'A lower-cost shared room option with separate cupboards, study positions, and access to all house amenities.',
        features: ['Separate storage', 'Shared desk wall', 'Cleaning rota', 'Access-control gate'],
        utilities: ['Wi-Fi included', 'Water included', 'Electricity fair-use'],
      },
      {
        id: 'glenwood-sharing-premium',
        title: 'Garden Sharing Suite',
        mode: 'sharing',
        monthlyPrice: 3500,
        deposit: 3500,
        availability: '2 beds available',
        leaseTerm: 'Semester or 12-month lease',
        occupancy: '2 tenants',
        image: propertyPhotography.glenwoodCommon,
        summary: 'A sharing room with slightly more space and easier access to the outdoor courtyard for students who want breathing room.',
        features: ['Wider layout', 'Courtyard access', 'Extra shelving', 'Shared kitchen access'],
        utilities: ['Wi-Fi included', 'Water included', 'Electricity fair-use'],
      },
    ],
    review: {
      quote: 'Seeing the full building flow first helped. We compared the kitchen, the gate security, and the room types all on one page before deciding to share.',
      resident: 'Anele and Sibusiso, Howard College students',
      detail: 'Moved in together for a semester stay in Glenwood.',
    },
  },
  {
    slug: 'umbilo-campus-lofts',
    name: 'Umbilo Campus Lofts',
    area: 'Umbilo, Durban',
    badge: 'Independent studio living',
    priceFrom: 5100,
    coordinates: defaultBuildingCoordinates['umbilo-campus-lofts'],
    nearbyPlaces: defaultNearbyPlaces['umbilo-campus-lofts'],
    campusAccess: {
      ukzn: '14 minutes to medical and Howard College routes',
      dut: '16 minutes to city access route',
    },
    headline: 'Compact loft-style rooms for renters who want more privacy without losing access to Durban campus corridors.',
    summary:
      'Umbilo Campus Lofts is a more independent option with ensuite-style units, secure access, and a cleaner studio feel for students and young professionals.',
    heroImage: propertyPhotography.umbiloExterior,
    gallery: [
      {
        src: propertyPhotography.umbiloExterior,
        alt: 'Umbilo Campus Lofts exterior mood',
        caption: 'A more contemporary exterior feel for renters who want studio-style privacy.',
      },
      {
        src: propertyPhotography.umbiloStudio,
        alt: 'Compact studio sleeping area',
        caption: 'Studios here favour self-contained layouts and a more independent daily setup.',
      },
      {
        src: propertyPhotography.umbiloKitchenette,
        alt: 'Studio kitchenette and study zone',
        caption: 'Kitchenette and desk zones make the room work better for longer, self-managed stays.',
      },
      {
        src: propertyPhotography.loftShared,
        alt: 'Shared loft-style room',
        caption: 'Sharing loft options reduce the entry price without leaving the building entirely out of reach.',
      },
    ],
    amenities: ['Ensuite-style rooms', 'Laundry access', 'Controlled entry', 'Backup lighting', 'Furnished units'],
    highlights: [
      'Suited to renters who want a stronger private-living feel.',
      'Good fit for students moving between multiple campus or hospital-linked routes.',
      'Works for young professionals who still want student-area convenience.',
    ],
    workflowNotes: ['Start with the unit layout gallery', 'Check whether you want a studio feel or lower-cost sharing', 'Confirm utility caps before booking'],
    roomOptions: [
      {
        id: 'umbilo-single-studio',
        title: 'Compact Ensuite Studio',
        mode: 'single',
        monthlyPrice: 5100,
        deposit: 5100,
        availability: '4 rooms available',
        leaseTerm: '12-month lease',
        occupancy: '1 tenant',
        image: propertyPhotography.umbiloStudio,
        summary: 'A compact private room with ensuite setup, bed base, wardrobe, desk, and kitchenette zone for independent living.',
        features: ['Ensuite bathroom', 'Mini kitchenette zone', 'Desk and bed included', 'Laundry access'],
        utilities: ['Wi-Fi ready', 'Water included', 'Electricity prepaid'],
      },
      {
        id: 'umbilo-single-balcony',
        title: 'Balcony Studio',
        mode: 'single',
        monthlyPrice: 6200,
        deposit: 6200,
        availability: '1 room available',
        leaseTerm: '12-month lease',
        occupancy: '1 tenant',
        image: propertyPhotography.umbiloKitchenette,
        summary: 'A more premium single unit with stronger light, a balcony edge, and a bit more room for independent study and storage.',
        features: ['Balcony access', 'Larger floor area', 'Ensuite bathroom', 'Kitchenette zone'],
        utilities: ['Wi-Fi ready', 'Water included', 'Electricity prepaid'],
      },
      {
        id: 'umbilo-sharing-loft',
        title: 'Sharing Loft Pair',
        mode: 'sharing',
        monthlyPrice: 3600,
        deposit: 3600,
        availability: '2 beds available',
        leaseTerm: 'Semester or 12-month lease',
        occupancy: '2 tenants',
        image: propertyPhotography.loftShared,
        summary: 'A lower-cost way into the building for two tenants sharing a loft-style unit with split storage and a shared kitchenette.',
        features: ['Split storage', 'Shared ensuite', 'Kitchenette zone', 'Laundry access'],
        utilities: ['Wi-Fi ready', 'Water included', 'Electricity prepaid'],
      },
    ],
    review: {
      quote: 'The page made the image flow much clearer. We could compare the building feel, then the actual room mode, then what questions to ask before booking a viewing.',
      resident: 'Thando, DUT student',
      detail: 'Preferred Umbilo for flexibility between class and city movement.',
    },
  },
];

export function getBuildingBySlug(slug: string) {
  return defaultBuildings.find((building) => building.slug === slug);
}

export const defaultEvents: EventItem[] = [
  {
    title: 'Musgrave Study Suites',
    date: '2026-05-01',
    location: 'Musgrave, Durban',
    description:
      'Private rooms in a managed apartment block with Wi-Fi, study desks, security access, and straightforward access to DUT and the Berea transport corridor.',
    stream: 'Private Room',
    format: '12 Month Lease',
    seatsLeft: 6,
  },
  {
    title: 'Glenwood Shared House',
    date: '2026-04-20',
    location: 'Glenwood, Durban',
    description:
      'Student-focused co-living with furnished bedrooms, shared kitchen access, weekly cleaning, and a quieter setup popular with UKZN Howard College students.',
    stream: 'Shared Apartment',
    format: 'Semester Stay',
    seatsLeft: 4,
  },
  {
    title: 'Umbilo Campus Lofts',
    date: '2026-06-01',
    location: 'Umbilo, Durban',
    description:
      'Compact ensuite units built for independent renters who want privacy, secure entry, laundry access, and a practical route to both UKZN medical and DUT precincts.',
    stream: 'Ensuite Studio',
    format: 'Flexible Lease',
    seatsLeft: 3,
  },
];

export const defaultProducts: ProductItem[] = [
  {
    image: propertyPhotography.musgraveSingle,
    name: 'Standard Single Room',
    price: 4200,
    sizes: ['Room Only', 'Furnished', 'Furnished + Wi-Fi'],
    category: 'Private Room',
    edition: 'Monthly from',
  },
  {
    image: propertyPhotography.glenwoodShared,
    name: 'Shared Two-Bed Apartment',
    price: 5350,
    sizes: ['Sharing', 'Single Occupancy'],
    category: 'Shared Living',
    edition: 'Monthly from',
  },
  {
    image: propertyPhotography.umbiloStudio,
    name: 'Ensuite Studio',
    price: 6900,
    sizes: ['Standard', 'Balcony Unit'],
    category: 'Independent Studio',
    edition: 'Monthly from',
  },
];
