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
    text: 'Build a shortlist of room options before you ask about viewings and availability.',
  },
];

const shoppingAssurance = [
  'Ask whether rent includes Wi-Fi, water, and electricity before committing.',
  'Check walking or taxi access to your specific campus, not only central Durban.',
  'Confirm deposit, lease length, and house rules before move-in.',
];

const roomSignals = [
  {
    title: 'Single rooms',
    text: 'Best when privacy, storage, and longer study hours matter more than the lowest monthly rate.',
  },
  {
    title: 'Shared rooms',
    text: 'Useful when lowering monthly spend matters most and the building itself already suits your route.',
  },
  {
    title: 'Studios',
    text: 'A stronger fit for renters who want an independent routine and self-contained daily living.',
  },
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
      <section className="page-hero rise px-6 py-8 md:px-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end relative z-10">
          <div>
            <span className="kicker">Room Types</span>
            <h1
              className="architect-heading mt-5 text-4xl font-extrabold text-[#121522] md:text-6xl tracking-tight"
              style={{ fontFamily: 'var(--font-space), sans-serif', letterSpacing: '-0.03em' }}
            >
              Compare room formats after you shortlist the building.
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-muted md:text-xl">
              Use this space to compare privacy, layout, furnishing, and rent band once you already know which buildings suit your route and budget.
            </p>
          </div>

          <div className="tonal-card p-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/70">Selection Promise</p>
            <h2
              className="mt-2 text-2xl font-semibold text-white"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              Compare before you enquire
            </h2>
            <p className="mt-3 text-base text-white/78">
              Narrow your choices by room style, then reach out with a clearer idea of what you want.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {premiumHighlights.map((item, idx) => (
          <article key={item.title} className="editorial-card rise p-6" style={{ animationDelay: `${idx * 70}ms` }}>
            <p className="stat-label">Premium Standard</p>
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

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {roomSignals.map((item, idx) => (
          <article key={item.title} className="panel rise p-6" style={{ animationDelay: `${idx * 70}ms` }}>
            <p className="stat-label">Room Signal</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              {item.title}
            </h2>
            <p className="mt-3 text-sm text-muted">{item.text}</p>
          </article>
        ))}
      </section>

      {success && (
        <section className="mt-8 editorial-card rise px-6 py-5">
          <span className="kicker">Shortlist</span>
          <p className="mt-3 text-base text-[#243041] md:text-lg">{success}</p>
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

        <aside className="editorial-card rise p-6 lg:sticky lg:top-28" style={{ animationDelay: '120ms' }}>
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
