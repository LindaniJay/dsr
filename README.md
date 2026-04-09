# Durban Student Accommodation

A modern Next.js site for browsing student accommodation in Durban, South Africa. Compare buildings near UKZN and DUT, explore room modes, and book viewings.

## Features

- **Buildings browser** with interactive Leaflet map, filters, and side-by-side comparison
- **Room explorer** — toggle between single and sharing modes per building
- **Events page** — open days, webinar announcements, and viewing slots (Firestore-backed)
- **Shop / products** — room listings with category and edition filtering
- **Rental Guide** — step-by-step guide to choosing and securing a room
- **Application Guide** — readiness steps and before-you-commit checklist
- **Neighbourhood profiles** — Musgrave-Berea, Glenwood, Umbilo, City Centre
- **Contact form** — sends viewing requests to Firestore
- **FAQ, Testimonials, Gallery** pages
- **Firebase Authentication** — sign-in and sign-up with email/password
- **Admin dashboard** (`/admin`) — manage buildings, rooms, and enquiries via Firestore

## Tech Stack

- **Next.js 16** (App Router, static export)
- **React 19**, **TypeScript 5**
- **Tailwind CSS 4**
- **Firebase** (Firestore, Authentication)
- **Leaflet + react-leaflet** (interactive maps)

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in your Firebase keys
npm run dev                   # http://localhost:3000
```

### Production build

```bash
npm run build
npm start
```

## Environment Variables

See `.env.example` for the full list. At minimum you need:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firestore project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | FCM sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase App ID |
| `NEXT_PUBLIC_ADMIN_ACCESS_CODE` | Admin unlock code for `/admin` |

## Folder Structure

```
src/
  app/          — Pages (Home, Buildings, Events, Shop, About, Contact, etc.)
  components/   — UI components (NavBar, Footer, EventCard, BuildingMap, etc.)
  hooks/        — Custom React hooks (useSavedBuildings)
  utils/        — Firebase init, content data, property records, site experience
public/
  about/        — About page images
  buildings/    — Building exterior & room SVGs
  icons/        — Social media SVG icons
```

## Admin Dashboard

1. Navigate to `/admin`
2. Enter the admin access code
3. Manage buildings, rooms, and viewing requests
4. Changes sync to Firestore and appear on public pages

### Firestore Collections

| Collection | Purpose |
|------------|---------|
| `properties` | Building records with rooms, images, coordinates |
| `events` | Open days, webinars, viewings |
| `products` | Room type listings for the shop |
| `viewingRequests` | Contact form submissions |

## License

MIT
