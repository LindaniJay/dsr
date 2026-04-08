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
    campusAccess: {
      ukzn: '12 minutes to Howard College corridor',
      dut: '18 minutes to city campus route',
    },
    headline: 'A calmer Berea base for students who want study structure and a cleaner daily routine.',
    summary:
      'Musgrave Study Suites is designed around focused student living: controlled access, strong desk setups, stable shared amenities, and practical movement to UKZN and DUT routes.',
    heroImage: '/buildings/musgrave-exterior.svg',
    gallery: [
      {
        src: '/buildings/musgrave-exterior.svg',
        alt: 'Musgrave Study Suites exterior',
        caption: 'Street-facing arrival with controlled access and visible lighting.',
      },
      {
        src: '/buildings/room-study.svg',
        alt: 'Study lounge concept',
        caption: 'Shared study lounge for evening prep and quieter work sessions.',
      },
      {
        src: '/buildings/room-single.svg',
        alt: 'Private single room concept',
        caption: 'Single-room layout with desk, storage wall, and natural light.',
      },
      {
        src: '/buildings/room-sharing.svg',
        alt: 'Shared room concept',
        caption: 'Sharing setup with separated sleep zones and common utility storage.',
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
        image: '/buildings/room-single.svg',
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
        image: '/buildings/room-study.svg',
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
        image: '/buildings/room-sharing.svg',
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
    campusAccess: {
      ukzn: '10 minutes to Howard College precinct',
      dut: '22 minutes to central DUT route',
    },
    headline: 'A sociable house-style setup for students who want affordability, shared routines, and easy Howard College access.',
    summary:
      'Glenwood Shared House groups students into a more communal living pattern with shared kitchens, furnished rooms, and practical budgets for semester-focused renters.',
    heroImage: '/buildings/glenwood-exterior.svg',
    gallery: [
      {
        src: '/buildings/glenwood-exterior.svg',
        alt: 'Glenwood Shared House exterior',
        caption: 'Neighbourhood-facing entrance in a popular student housing pocket.',
      },
      {
        src: '/buildings/room-sharing.svg',
        alt: 'Sharing room concept',
        caption: 'Shared sleeping zone designed around storage and movement.',
      },
      {
        src: '/buildings/room-study.svg',
        alt: 'Communal desk area concept',
        caption: 'Common study nook close to the kitchen and laundry areas.',
      },
      {
        src: '/buildings/room-single.svg',
        alt: 'Private room concept in shared house',
        caption: 'Single occupancy room option inside the wider shared house layout.',
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
        image: '/buildings/room-single.svg',
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
        image: '/buildings/room-sharing.svg',
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
        image: '/buildings/room-study.svg',
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
    campusAccess: {
      ukzn: '14 minutes to medical and Howard College routes',
      dut: '16 minutes to city access route',
    },
    headline: 'Compact loft-style rooms for renters who want more privacy without losing access to Durban campus corridors.',
    summary:
      'Umbilo Campus Lofts is a more independent option with ensuite-style units, secure access, and a cleaner studio feel for students and young professionals.',
    heroImage: '/buildings/umbilo-exterior.svg',
    gallery: [
      {
        src: '/buildings/umbilo-exterior.svg',
        alt: 'Umbilo Campus Lofts exterior',
        caption: 'Modern block presence close to Durban health and education movement routes.',
      },
      {
        src: '/buildings/room-single.svg',
        alt: 'Studio sleeping area concept',
        caption: 'Compact single layout with private entry feel and integrated storage.',
      },
      {
        src: '/buildings/room-study.svg',
        alt: 'Loft study corner concept',
        caption: 'Desk and kitchenette zone built for independent daily routines.',
      },
      {
        src: '/buildings/room-sharing.svg',
        alt: 'Shared loft room concept',
        caption: 'Optional sharing loft format for tenants splitting a more premium building.',
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
        image: '/buildings/room-single.svg',
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
        image: '/buildings/room-study.svg',
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
        image: '/buildings/room-sharing.svg',
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
    image: '/buildings/room-single.svg',
    name: 'Standard Single Room',
    price: 4200,
    sizes: ['Room Only', 'Furnished', 'Furnished + Wi-Fi'],
    category: 'Private Room',
    edition: 'Monthly from',
  },
  {
    image: '/buildings/room-sharing.svg',
    name: 'Shared Two-Bed Apartment',
    price: 5350,
    sizes: ['Sharing', 'Single Occupancy'],
    category: 'Shared Living',
    edition: 'Monthly from',
  },
  {
    image: '/buildings/room-study.svg',
    name: 'Ensuite Studio',
    price: 6900,
    sizes: ['Standard', 'Balcony Unit'],
    category: 'Independent Studio',
    edition: 'Monthly from',
  },
];
