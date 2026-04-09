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
  category: 'grocery' | 'transport' | 'study' | 'food' | 'education';
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
  cityHighrise: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80',
  cityStudio: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80',
  cityCommon: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1400&q=80',
  cityLoft: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80',
  cityModern: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1400&q=80',
  cityShared: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80',
};

export const defaultBuildingCoordinates: Record<string, BuildingCoordinates> = {
  'musgrave-study-suites': { latitude: -29.8405, longitude: 31.0095 },
  'glenwood-shared-house': { latitude: -29.8530, longitude: 30.9980 },
  'umbilo-campus-lofts': { latitude: -29.8665, longitude: 30.9870 },
  'city-centre-towers': { latitude: -29.8568, longitude: 31.0230 },
  'point-waterfront-studios': { latitude: -29.8660, longitude: 31.0385 },
  'greyville-student-hub': { latitude: -29.8455, longitude: 31.0185 },
};

export const campusAnchors: CampusAnchor[] = [
  {
    id: 'ukzn',
    name: 'UKZN Howard College',
    shortLabel: 'UKZN Howard',
    coordinates: { latitude: -29.8672, longitude: 30.9792 },
  },
  {
    id: 'dut',
    name: 'DUT Steve Biko Campus',
    shortLabel: 'DUT Steve Biko',
    coordinates: { latitude: -29.8536, longitude: 31.0061 },
  },
];

export const defaultNearbyPlaces: Record<string, NearbyPlace[]> = {
  'musgrave-study-suites': [
    {
      id: 'musgrave-woolworths',
      name: 'Woolworths Musgrave Centre',
      category: 'grocery',
      distance: '5 min walk',
      coordinates: { latitude: -29.8385, longitude: 31.0082 },
    },
    {
      id: 'musgrave-berea-taxi',
      name: 'Berea Road Taxi Rank',
      category: 'transport',
      distance: '8 min walk',
      coordinates: { latitude: -29.8462, longitude: 31.0072 },
    },
    {
      id: 'musgrave-mugg-bean',
      name: 'Mugg & Bean Musgrave',
      category: 'food',
      distance: '5 min walk',
      coordinates: { latitude: -29.8386, longitude: 31.0084 },
    },
    {
      id: 'musgrave-dut-stevebiko',
      name: 'DUT Steve Biko Campus',
      category: 'education',
      distance: '15 min walk',
      coordinates: { latitude: -29.8536, longitude: 31.0061 },
    },
  ],
  'glenwood-shared-house': [
    {
      id: 'glenwood-superspar',
      name: 'SUPERSPAR Glenwood Village',
      category: 'grocery',
      distance: '3 min walk',
      coordinates: { latitude: -29.8544, longitude: 30.9974 },
    },
    {
      id: 'glenwood-umbilo-bus',
      name: 'Umbilo Road Bus Stop',
      category: 'transport',
      distance: '4 min walk',
      coordinates: { latitude: -29.8540, longitude: 30.9960 },
    },
    {
      id: 'glenwood-florida-rd',
      name: 'Florida Road Restaurants',
      category: 'food',
      distance: '12 min walk',
      coordinates: { latitude: -29.8430, longitude: 31.0040 },
    },
    {
      id: 'glenwood-ukzn',
      name: 'UKZN Howard College',
      category: 'education',
      distance: '18 min walk',
      coordinates: { latitude: -29.8672, longitude: 30.9792 },
    },
  ],
  'umbilo-campus-lofts': [
    {
      id: 'umbilo-pnp-moore',
      name: 'Pick n Pay Express Moore Road',
      category: 'grocery',
      distance: '6 min walk',
      coordinates: { latitude: -29.8580, longitude: 31.0026 },
    },
    {
      id: 'umbilo-taxi-rank',
      name: 'Umbilo Road Taxi Rank',
      category: 'transport',
      distance: '5 min walk',
      coordinates: { latitude: -29.8685, longitude: 30.9895 },
    },
    {
      id: 'umbilo-curries',
      name: 'Curries Fountain Food Stalls',
      category: 'food',
      distance: '8 min walk',
      coordinates: { latitude: -29.8640, longitude: 30.9935 },
    },
    {
      id: 'umbilo-ukzn-med',
      name: 'UKZN Medical School',
      category: 'education',
      distance: '10 min walk',
      coordinates: { latitude: -29.8730, longitude: 31.0003 },
    },
  ],
  'city-centre-towers': [
    {
      id: 'city-workshop-pnp',
      name: 'Pick n Pay The Workshop',
      category: 'grocery',
      distance: '4 min walk',
      coordinates: { latitude: -29.8560, longitude: 31.0262 },
    },
    {
      id: 'city-durban-station',
      name: 'Durban Station (Bus & Rail)',
      category: 'transport',
      distance: '6 min walk',
      coordinates: { latitude: -29.8607, longitude: 31.0190 },
    },
    {
      id: 'city-victoria-market',
      name: 'Victoria Street Market',
      category: 'food',
      distance: '5 min walk',
      coordinates: { latitude: -29.8565, longitude: 31.0230 },
    },
    {
      id: 'city-dut-mlsultan',
      name: 'DUT ML Sultan Campus',
      category: 'education',
      distance: '8 min walk',
      coordinates: { latitude: -29.8575, longitude: 31.0168 },
    },
    {
      id: 'city-coastal-tvet',
      name: 'Coastal KZN TVET College',
      category: 'education',
      distance: '10 min walk',
      coordinates: { latitude: -29.8555, longitude: 31.0220 },
    },
  ],
  'point-waterfront-studios': [
    {
      id: 'point-ushaka-shops',
      name: 'uShaka Village Walk Shops',
      category: 'grocery',
      distance: '5 min walk',
      coordinates: { latitude: -29.8668, longitude: 31.0438 },
    },
    {
      id: 'point-taxi-rank',
      name: 'Point Road Taxi Rank',
      category: 'transport',
      distance: '6 min walk',
      coordinates: { latitude: -29.8640, longitude: 31.0370 },
    },
    {
      id: 'point-wilsons-wharf',
      name: "Wilson's Wharf Restaurants",
      category: 'food',
      distance: '8 min walk',
      coordinates: { latitude: -29.8680, longitude: 31.0350 },
    },
    {
      id: 'point-bat-centre',
      name: 'BAT Centre (Arts & Study)',
      category: 'study',
      distance: '7 min walk',
      coordinates: { latitude: -29.8710, longitude: 31.0330 },
    },
  ],
  'greyville-student-hub': [
    {
      id: 'greyville-pnp-florida',
      name: 'Pick n Pay Florida Road',
      category: 'grocery',
      distance: '8 min walk',
      coordinates: { latitude: -29.8304, longitude: 31.0137 },
    },
    {
      id: 'greyville-station',
      name: 'Berea Road Station (Metrorail)',
      category: 'transport',
      distance: '6 min walk',
      coordinates: { latitude: -29.8475, longitude: 31.0135 },
    },
    {
      id: 'greyville-windermere-eats',
      name: 'Windermere Road Eateries',
      category: 'food',
      distance: '4 min walk',
      coordinates: { latitude: -29.8465, longitude: 31.0195 },
    },
    {
      id: 'greyville-elangeni-tvet',
      name: 'Elangeni TVET College',
      category: 'education',
      distance: '12 min walk',
      coordinates: { latitude: -29.8500, longitude: 31.0155 },
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
      ukzn: '20 min to UKZN Howard College by taxi',
      dut: '15 min walk to DUT Steve Biko Campus',
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
      ukzn: '18 min walk to UKZN Howard College',
      dut: '20 min to DUT Steve Biko by bus',
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
      ukzn: '10 min walk to UKZN Medical School',
      dut: '18 min to DUT Steve Biko by taxi',
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
  {
    slug: 'city-centre-towers',
    name: 'City Centre Towers',
    area: 'City Centre, Durban',
    badge: 'Urban high-rise living',
    priceFrom: 3800,
    coordinates: defaultBuildingCoordinates['city-centre-towers'],
    nearbyPlaces: defaultNearbyPlaces['city-centre-towers'],
    campusAccess: {
      ukzn: '25 min to UKZN Howard College by bus',
      dut: '8 min walk to DUT ML Sultan Campus',
    },
    headline: 'Right in the middle of Durban — walk to DUT, catch a bus to UKZN, and have everything you need on your doorstep.',
    summary:
      'City Centre Towers puts you in the heart of Durban CBD with easy DUT access, affordable rooms, and the energy of city living. Great if you want everything close by.',
    heroImage: propertyPhotography.cityHighrise,
    gallery: [
      {
        src: propertyPhotography.cityHighrise,
        alt: 'City Centre Towers exterior view',
        caption: 'A high-rise block in the CBD with views over the city and quick access to DUT.',
      },
      {
        src: propertyPhotography.cityStudio,
        alt: 'Compact city studio room',
        caption: 'Rooms are compact but functional — everything a student needs in a city setting.',
      },
      {
        src: propertyPhotography.cityCommon,
        alt: 'Shared common area and lounge',
        caption: 'Common spaces give you room to study or hang out without leaving the building.',
      },
      {
        src: propertyPhotography.cityLoft,
        alt: 'City centre shared room layout',
        caption: 'Sharing rooms keep the cost down while keeping you in the best location.',
      },
    ],
    amenities: ['24/7 security', 'Lift access', 'Wi-Fi ready', 'On-site laundry', 'Study lounge', 'CCTV'],
    highlights: [
      'Walk to DUT City Campus in under 10 minutes.',
      'Surrounded by shops, food spots, and public transport.',
      'Secure high-rise with controlled access and CCTV.',
    ],
    workflowNotes: ['Check the floor level preference', 'Confirm electricity metering type', 'Ask about parking if needed'],
    roomOptions: [
      {
        id: 'city-single-compact',
        title: 'City Compact Single',
        mode: 'single',
        monthlyPrice: 3800,
        deposit: 3800,
        availability: '6 rooms available',
        leaseTerm: '12-month lease',
        occupancy: '1 tenant',
        image: propertyPhotography.cityStudio,
        summary: 'A compact private room in the CBD with a desk, bed, and wardrobe. Shared kitchen and bathroom on your floor.',
        features: ['Furnished room', 'Study desk', 'Shared kitchen', 'Lift access'],
        utilities: ['Wi-Fi included', 'Water included', 'Electricity prepaid'],
      },
      {
        id: 'city-single-view',
        title: 'Upper Floor Single',
        mode: 'single',
        monthlyPrice: 4400,
        deposit: 4400,
        availability: '3 rooms available',
        leaseTerm: '12-month lease',
        occupancy: '1 tenant',
        image: propertyPhotography.cityHighrise,
        summary: 'A higher-floor single room with better views and natural light. Same amenities as compact singles with a bit more space.',
        features: ['City views', 'Larger window', 'Study desk', 'Shared kitchen'],
        utilities: ['Wi-Fi included', 'Water included', 'Electricity prepaid'],
      },
      {
        id: 'city-sharing-standard',
        title: 'City Sharing Room',
        mode: 'sharing',
        monthlyPrice: 2800,
        deposit: 2800,
        availability: '8 beds available',
        leaseTerm: 'Semester or 12-month lease',
        occupancy: '2 tenants',
        image: propertyPhotography.cityShared,
        summary: 'An affordable shared room in the city centre — split the cost and still be walking distance from DUT.',
        features: ['Separate storage', 'Shared desk space', 'Shared kitchen', 'Laundry access'],
        utilities: ['Wi-Fi included', 'Water included', 'Electricity prepaid'],
      },
    ],
    review: {
      quote: 'Being in the CBD meant I could walk to DUT and still grab everything I needed without catching a taxi. The rent is lower here too.',
      resident: 'Zanele, DUT student',
      detail: 'Stayed for a full year while studying at DUT City Campus.',
    },
  },
  {
    slug: 'point-waterfront-studios',
    name: 'Point Waterfront Studios',
    area: 'Point, Durban',
    badge: 'Waterfront lifestyle',
    priceFrom: 4800,
    coordinates: defaultBuildingCoordinates['point-waterfront-studios'],
    nearbyPlaces: defaultNearbyPlaces['point-waterfront-studios'],
    campusAccess: {
      ukzn: '30 min to UKZN Howard College by taxi',
      dut: '15 min to DUT Steve Biko by taxi',
    },
    headline: 'Waterfront living with a studio feel — a bit further from campus but a completely different lifestyle.',
    summary:
      'Point Waterfront Studios is for students who want a more independent, grown-up living experience near the harbour. Studios come furnished with ensuite bathrooms.',
    heroImage: propertyPhotography.cityModern,
    gallery: [
      {
        src: propertyPhotography.cityModern,
        alt: 'Point Waterfront Studios exterior',
        caption: 'A modern block near the harbour with secure parking and waterfront access.',
      },
      {
        src: propertyPhotography.cityStudio,
        alt: 'Furnished studio with ensuite',
        caption: 'Each studio is self-contained — your own bathroom, kitchenette, and study area.',
      },
      {
        src: propertyPhotography.cityCommon,
        alt: 'Building common area',
        caption: 'Common areas include a rooftop lounge and shared workspace.',
      },
      {
        src: propertyPhotography.cityLoft,
        alt: 'Sharing option at Point',
        caption: 'Sharing units reduce the cost while keeping the waterfront lifestyle.',
      },
    ],
    amenities: ['Ensuite rooms', 'Secure parking', 'Rooftop lounge', 'On-site gym', 'Wi-Fi ready', 'Controlled access'],
    highlights: [
      'Self-contained studios with your own bathroom and kitchenette.',
      'Waterfront location with harbour views from upper floors.',
      'Secure building with parking, gym, and rooftop common area.',
    ],
    workflowNotes: ['Confirm parking allocation', 'Check water pressure on upper floors', 'Ask about guest policy'],
    roomOptions: [
      {
        id: 'point-studio-standard',
        title: 'Standard Studio',
        mode: 'single',
        monthlyPrice: 4800,
        deposit: 4800,
        availability: '4 rooms available',
        leaseTerm: '12-month lease',
        occupancy: '1 tenant',
        image: propertyPhotography.cityStudio,
        summary: 'A fully furnished studio with ensuite bathroom, kitchenette, desk, and storage. Everything you need in one room.',
        features: ['Ensuite bathroom', 'Kitchenette', 'Study desk', 'Built-in storage'],
        utilities: ['Wi-Fi included', 'Water included', 'Electricity prepaid'],
      },
      {
        id: 'point-studio-premium',
        title: 'Harbour View Studio',
        mode: 'single',
        monthlyPrice: 5800,
        deposit: 5800,
        availability: '2 rooms available',
        leaseTerm: '12-month lease',
        occupancy: '1 tenant',
        image: propertyPhotography.cityModern,
        summary: 'A premium studio on a higher floor with harbour views, more natural light, and a slightly larger layout.',
        features: ['Harbour views', 'Ensuite bathroom', 'Kitchenette', 'Larger floor area'],
        utilities: ['Wi-Fi included', 'Water included', 'Electricity prepaid'],
      },
      {
        id: 'point-sharing-studio',
        title: 'Shared Studio',
        mode: 'sharing',
        monthlyPrice: 3400,
        deposit: 3400,
        availability: '4 beds available',
        leaseTerm: 'Semester or 12-month lease',
        occupancy: '2 tenants',
        image: propertyPhotography.cityShared,
        summary: 'Share a studio unit at the waterfront — split the rent and still get ensuite access and the full building amenities.',
        features: ['Shared ensuite', 'Kitchenette access', 'Split storage', 'Gym access'],
        utilities: ['Wi-Fi included', 'Water included', 'Electricity prepaid'],
      },
    ],
    review: {
      quote: 'Living at the Point was a different vibe. I had my own space, could walk along the harbour, and still got to DUT on time every morning.',
      resident: 'Sipho, DUT final-year student',
      detail: 'Chose Point for the independence and the waterfront lifestyle.',
    },
  },
  {
    slug: 'greyville-student-hub',
    name: 'Greyville Student Hub',
    area: 'Greyville, Durban',
    badge: 'Value student living',
    priceFrom: 2600,
    coordinates: defaultBuildingCoordinates['greyville-student-hub'],
    nearbyPlaces: defaultNearbyPlaces['greyville-student-hub'],
    campusAccess: {
      ukzn: '20 min to UKZN Howard College by taxi',
      dut: '12 min walk to DUT Steve Biko Campus',
    },
    headline: 'Affordable shared living in Greyville — close to the city, with good transport links and a student-friendly vibe.',
    summary:
      'Greyville Student Hub is built around affordability. Shared rooms start low, the location is central, and the building runs a strict but fair house structure for students on a budget.',
    heroImage: propertyPhotography.cityHighrise,
    gallery: [
      {
        src: propertyPhotography.cityHighrise,
        alt: 'Greyville Student Hub exterior',
        caption: 'A no-frills student building in Greyville focused on budget-friendly rooms.',
      },
      {
        src: propertyPhotography.cityShared,
        alt: 'Shared room at Greyville',
        caption: 'Shared rooms are the most popular option here — clean, simple, and affordable.',
      },
      {
        src: propertyPhotography.cityCommon,
        alt: 'Common study and kitchen area',
        caption: 'Shared kitchen and study spaces keep costs down and build community.',
      },
      {
        src: propertyPhotography.cityStudio,
        alt: 'Private room option',
        caption: 'Private rooms are available for students who want more space on a tighter budget.',
      },
    ],
    amenities: ['Gate access control', 'Wi-Fi included', 'Shared kitchen', 'Laundry room', 'Study corner', 'Cleaning schedule'],
    highlights: [
      'Some of the most affordable student rooms available near the city centre.',
      'Walking distance to DUT and easy taxi access to UKZN.',
      'Structured house rules keep things fair for everyone.',
    ],
    workflowNotes: ['Ask about the cleaning rota', 'Confirm bed allocation for sharing rooms', 'Check semester vs annual lease options'],
    roomOptions: [
      {
        id: 'greyville-single-basic',
        title: 'Basic Private Room',
        mode: 'single',
        monthlyPrice: 3200,
        deposit: 3200,
        availability: '5 rooms available',
        leaseTerm: 'Semester or 12-month lease',
        occupancy: '1 tenant',
        image: propertyPhotography.cityStudio,
        summary: 'A simple private room with a bed, desk, and cupboard. Shared kitchen and bathroom. No frills, but it works.',
        features: ['Bed and desk included', 'Lockable room', 'Shared kitchen', 'Shared bathroom'],
        utilities: ['Wi-Fi included', 'Water included', 'Electricity included'],
      },
      {
        id: 'greyville-sharing-standard',
        title: 'Standard Sharing Room',
        mode: 'sharing',
        monthlyPrice: 2600,
        deposit: 2600,
        availability: '10 beds available',
        leaseTerm: 'Semester or 12-month lease',
        occupancy: '2 tenants',
        image: propertyPhotography.cityShared,
        summary: 'The most affordable option — share a room with another student, use the shared kitchen and study areas, and keep your costs as low as possible.',
        features: ['Separate cupboards', 'Shared desk', 'Shared kitchen', 'Cleaning rota'],
        utilities: ['Wi-Fi included', 'Water included', 'Electricity included'],
      },
      {
        id: 'greyville-sharing-triple',
        title: 'Triple Sharing Room',
        mode: 'sharing',
        monthlyPrice: 2200,
        deposit: 2200,
        availability: '6 beds available',
        leaseTerm: 'Semester lease',
        occupancy: '3 tenants',
        image: propertyPhotography.cityCommon,
        summary: 'The lowest-cost option in the building. Three students share a larger room with individual storage and access to all common areas.',
        features: ['Individual storage', 'Larger room', 'Shared kitchen', 'Study corner access'],
        utilities: ['Wi-Fi included', 'Water included', 'Electricity included'],
      },
    ],
    review: {
      quote: 'I needed something affordable and close to DUT. Greyville was basic but clean, the Wi-Fi worked, and I could focus on my studies without stressing about rent.',
      resident: 'Nompumelelo, DUT student',
      detail: 'Stayed for two semesters on a tight NSFAS budget.',
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
