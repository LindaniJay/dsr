"use client";

import React, { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import ProductCard from '../../components/ProductCard';
import app from '../../utils/firebase';
import { defaultProducts, type ProductItem } from '../../utils/contentData';

const premiumHighlights = [
  {
    title: 'Starter Price Bands',
    text: 'Monthly ranges are surfaced early so renters can understand what level of room they are looking at.',
  },
  {
    title: 'Room Configurations',
    text: 'Compare furnished, shared, and private options without digging through inconsistent property descriptions.',
  },
  {
    title: 'Shortlist First',
    text: 'This page helps renters save promising options before they reach out about viewings and availability.',
  },
];

const shoppingAssurance = [
  'Ask whether rent includes Wi-Fi, water, and electricity before committing.',
  'Check walking or taxi access to your specific campus, not only central Durban.',
  'Confirm deposit, lease length, and house rules before move-in.',
];

function parseProduct(raw: Record<string, unknown>): ProductItem | null {
  const price = Number(raw.price);

  const sizes = Array.isArray(raw.sizes)
    ? raw.sizes.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    : [];

  if (
    typeof raw.image !== 'string' ||
    typeof raw.name !== 'string' ||
    Number.isNaN(price) ||
    sizes.length === 0 ||
    typeof raw.category !== 'string' ||
    typeof raw.edition !== 'string'
  ) {
    return null;
  }

  return {
    image: raw.image,
    name: raw.name,
    price,
    sizes,
    category: raw.category,
    edition: raw.edition,
  };
}

export default function ShopPage() {
  const [products, setProducts] = useState<ProductItem[]>(defaultProducts);
  const [contentLoading, setContentLoading] = useState(true);
  const [shortlist, setShortlist] = useState<Array<{ name: string; option: string; price: number }>>([]);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const db = getFirestore(app);
        const productsRef = collection(db, 'products');
        const productsSnapshot = await getDocs(query(productsRef, orderBy('createdAt', 'desc')));

        const fetchedProducts = productsSnapshot.docs
          .map((docItem) => parseProduct(docItem.data() as Record<string, unknown>))
          .filter((item): item is ProductItem => item !== null);

        if (fetchedProducts.length > 0) {
          setProducts(fetchedProducts);
        }
      } catch {
        // Keep default products when Firestore content is unavailable.
      } finally {
        setContentLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: ProductItem, selectedSize: string) => {
    setShortlist((prev) => [...prev, { name: product.name, option: selectedSize, price: product.price }]);
    setSuccess(`${product.name} (${selectedSize}) added to your shortlist.`);
    setTimeout(() => setSuccess(null), 2200);
  };

  return (
    <div className="app-shell section-spacing">
      {/* Hero Section with layered glassmorphism and animated floating shapes */}
      <section className="panel rise overflow-hidden p-6 md:p-10 relative">
        {/* Animated gradient background */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 animate-gradient-move bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#caa86a]/30 via-[#2e4f7a]/10 to-transparent opacity-80" />
        {/* Glassmorphism overlay */}
        <div aria-hidden="true" className="absolute left-1/2 top-0 z-0 h-[340px] w-[600px] -translate-x-1/2 rounded-3xl bg-white/30 shadow-2xl backdrop-blur-2xl blur-2xl" style={{ filter: 'blur(28px)' }} />
        {/* Floating shapes for depth */}
        <div aria-hidden="true" className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#caa86a]/30 blur-2xl animate-float-slow" />
        <div aria-hidden="true" className="absolute bottom-10 right-10 w-28 h-28 rounded-full bg-[#2e4f7a]/20 blur-2xl animate-float-medium" />
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end relative z-10">
          <div>
            <span className="kicker">Room Types</span>
            <h1
              className="architect-heading mt-5 text-4xl font-extrabold text-[#121522] md:text-6xl tracking-tight animate-fade-in-up"
              style={{ fontFamily: 'var(--font-space), sans-serif', letterSpacing: '-0.03em' }}
            >
              <span className="inline-block bg-gradient-to-r from-[#2e4f7a] via-[#caa86a] to-[#2e4f7a] bg-clip-text text-transparent animate-gradient-text drop-shadow-lg">Compare room formats after you pick a building</span>
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-muted md:text-xl animate-fade-in-up delay-200">
              The main journey now starts on the Buildings page. This page works as a secondary comparison layer for renters who already know the type of room they want to ask about.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d7dde7] bg-[linear-gradient(145deg,#f6f8fb,#ffffff)/80] p-5 glassmorphism">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Selection Promise</p>
            <h2
              className="mt-2 text-2xl font-semibold text-[#121522] animate-gradient-text"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              Compare before you enquire
            </h2>
            <p className="mt-3 text-base text-muted">
              Use this after browsing buildings when you want a tighter read on privacy level, furnishing, and rent band.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {premiumHighlights.map((item, idx) => (
          <article key={item.title} className="panel rise p-6" style={{ animationDelay: `${idx * 70}ms` }}>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Premium Standard</p>
            <h2
              className="mt-2 text-2xl font-semibold text-[#121522]"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              {item.title}
            </h2>
            <p className="mt-3 text-sm text-muted">{item.text}</p>
          </article>
        ))}
      </section>

      {success && (
        <section className="rise relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 animate-gradient-move bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#caa86a]/30 via-[#2e4f7a]/10 to-transparent opacity-80" />
          <span className="kicker">Shortlist</span>
          <h1
            className="architect-heading mt-5 text-4xl font-bold text-[#121522] md:text-6xl tracking-tight animate-fade-in-up"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            <span className="inline-block bg-gradient-to-r from-[#2e4f7a] via-[#caa86a] to-[#2e4f7a] bg-clip-text text-transparent animate-gradient-text">Shortlisted room options</span>
          </h1>
          <p className="mt-4 max-w-3xl text-base text-muted md:text-lg">
            {success}
          </p>
        </section>
      )}

      <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_330px] lg:items-start">
        <div>
          {contentLoading && (
            <p className="mb-4 text-sm text-muted">Loading latest room configurations from content manager...</p>
          )}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product, idx) => (
              <div key={product.name + product.edition} className="rise" style={{ animationDelay: `${idx * 70}ms` }}>
                <ProductCard
                  {...product}
                  onAddToCart={(selectedSize) => handleAddToCart(product, selectedSize)}
                  selectorLabel="Select Room Package"
                  actionLabel="Shortlist"
                />
              </div>
            ))}
          </div>
        </div>

        <aside className="panel rise p-6 lg:sticky lg:top-28" style={{ animationDelay: '120ms' }}>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Shortlist Summary</p>
          <h2
            className="mt-2 text-2xl font-semibold text-[#121522]"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            Saved Options
          </h2>

          {shortlist.length === 0 ? (
            <p className="mt-4 rounded-xl border border-[#d8dde6] bg-white px-4 py-5 text-sm text-muted">
              Your shortlist is empty. Add room packages here, then use the contact page to enquire.
            </p>
          ) : (
            <>
              <ul className="mt-4 space-y-2">
                {shortlist.map((item, idx) => (
                  <li key={`${item.name}-${idx}`} className="rounded-lg border border-[#dde2ea] bg-white px-3 py-2 text-sm text-[#2d3746]">
                    <div className="flex items-center justify-between gap-3">
                      <span>{item.name} ({item.option})</span>
                      <span className="font-semibold">R{item.price}/mo</span>
                    </div>
                  </li>
                ))}
              </ul>

              <ul className="mt-4 space-y-2 rounded-xl border border-[#d7dde6] bg-[#f7f9fc] p-3">
                {shoppingAssurance.map((item) => (
                  <li key={item} className="text-xs text-[#425066]">
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-5 rounded-xl border border-[#d7dde6] bg-[#f7f9fc] px-4 py-3 text-sm text-[#425066]">
                Use this shortlist after you browse buildings so the team knows both the property and room type you want first.
              </p>
            </>
          )}
        </aside>
      </section>

      <section className="mt-8 panel rise p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">
              Delivery and Fulfillment
            </span>
            <h2
              className="mt-2 text-3xl font-semibold text-[#121522] md:text-4xl"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              What to verify before taking a room
            </h2>
            <p className="mt-3 text-sm text-muted md:text-base">
              Durban rentals move quickly around semester peaks. Strong enquiries ask about utilities, transport, furnishing level, and deposits before a viewing is booked.
            </p>
          </div>

          <div className="grid gap-3">
            <article className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3 text-sm text-[#263244]">
              Ask whether the quote is per bed, per room, or for the whole unit.
            </article>
            <article className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3 text-sm text-[#263244]">
              Confirm whether Wi-Fi, water, and electricity are included or billed separately.
            </article>
            <article className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3 text-sm text-[#263244]">
              Check the route to your campus at the time you will actually travel.
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
