"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import ProductCard from '../../components/ProductCard';
import { generateEFTCode } from '../../utils/generateEFTCode';
import app from '../../utils/firebase';
import { defaultProducts, type ProductItem } from '../../utils/contentData';

type PaymentMethod = 'eft' | 'payfast' | 'ozow' | 'yoco';

type CartItem = ProductItem & {
  selectedSize: string;
};

const premiumHighlights = [
  {
    title: 'Curated Drops',
    text: 'Every release is produced in limited quantities to preserve identity and value.',
  },
  {
    title: 'Purpose-Driven Commerce',
    text: 'Revenue supports IGHOST events, mentorship labs, and youth development programs.',
  },
  {
    title: 'Quality-First Finishing',
    text: 'We prioritize durable fabrics, sharp cuts, and premium embroidery/print execution.',
  },
];

const shoppingAssurance = [
  'Secure payment options for South Africa: EFT, PayFast, Ozow, Yoco.',
  'Order support and proof-of-payment handling through WhatsApp operations.',
  'Transparent confirmation flow with clear payment reference instructions.',
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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('eft');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [eftReference, setEftReference] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    setCart((prev) => [...prev, { ...product, selectedSize }]);
    setSuccess(`${product.name} (${selectedSize}) added to cart.`);
    setTimeout(() => setSuccess(null), 2200);
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    setError(null);
    setSuccess(null);
    setEftReference(null);

    try {
      if (cart.length === 0) {
        setError('Your cart is empty. Add at least one item before checkout.');
        setCheckoutLoading(false);
        return;
      }

      const paymentLinks: Record<Exclude<PaymentMethod, 'eft'>, string | undefined> = {
        payfast: process.env.NEXT_PUBLIC_PAYFAST_CHECKOUT_URL,
        ozow: process.env.NEXT_PUBLIC_OZOW_CHECKOUT_URL,
        yoco: process.env.NEXT_PUBLIC_YOCO_CHECKOUT_URL,
      };

      if (selectedPaymentMethod === 'eft') {
        const reference = generateEFTCode();
        setEftReference(reference);
        setSuccess('EFT instructions generated. Use the reference code below when making payment.');
        setCheckoutLoading(false);
        return;
      }

      const redirectUrl = paymentLinks[selectedPaymentMethod];

      if (!redirectUrl) {
        setError(`The ${selectedPaymentMethod.toUpperCase()} checkout link is not configured yet.`);
        setCheckoutLoading(false);
        return;
      }

      window.open(redirectUrl, '_blank', 'noopener,noreferrer');
      setSuccess(`Redirecting to ${selectedPaymentMethod.toUpperCase()} secure checkout.`);
      setCheckoutLoading(false);
    } catch {
      setError('Checkout could not start. Please try again.');
      setCheckoutLoading(false);
    }
  };

  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart]);

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
            <span className="kicker">IGHOST Premium Store</span>
            <h1
              className="architect-heading mt-5 text-4xl font-extrabold text-[#121522] md:text-6xl tracking-tight animate-fade-in-up"
              style={{ fontFamily: 'var(--font-space), sans-serif', letterSpacing: '-0.03em' }}
            >
              <span className="inline-block bg-gradient-to-r from-[#2e4f7a] via-[#caa86a] to-[#2e4f7a] bg-clip-text text-transparent animate-gradient-text drop-shadow-lg">Premium Merch Designed for Culture Builders</span>
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-muted md:text-xl animate-fade-in-up delay-200">
              Explore limited IGHOST apparel engineered with clean design language and production
              quality that reflects our professional standards.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d7dde7] bg-[linear-gradient(145deg,#f6f8fb,#ffffff)/80] p-5 glassmorphism">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Store Promise</p>
            <h2
              className="mt-2 text-2xl font-semibold text-[#121522] animate-gradient-text"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              Style With Social Return
            </h2>
            <p className="mt-3 text-base text-muted">
              Every purchase helps fund events, leadership pathways, and practical opportunities
              for youth creators.
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

      {(success || error) && (
        <section className="rise relative overflow-hidden">
          {/* Animated gradient background */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 animate-gradient-move bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#caa86a]/30 via-[#2e4f7a]/10 to-transparent opacity-80" />
          <span className="kicker">Shop</span>
          <h1
            className="architect-heading mt-5 text-4xl font-bold text-[#121522] md:text-6xl tracking-tight animate-fade-in-up"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            <span className="inline-block bg-gradient-to-r from-[#2e4f7a] via-[#caa86a] to-[#2e4f7a] bg-clip-text text-transparent animate-gradient-text">IGHOST Apparel & Merch</span>
          </h1>
          <p className="mt-4 max-w-3xl text-base text-muted md:text-lg">
            Shop our premium, purpose-driven apparel. Every purchase supports IGHOST events, mentorship, and youth development.
          </p>
        </section>
      )}

      <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_330px] lg:items-start">
        <div>
          {contentLoading && (
            <p className="mb-4 text-sm text-muted">Loading latest merch from content manager...</p>
          )}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product, idx) => (
              <div key={product.name + product.edition} className="rise" style={{ animationDelay: `${idx * 70}ms` }}>
                <ProductCard
                  {...product}
                  onAddToCart={(selectedSize) => handleAddToCart(product, selectedSize)}
                />
              </div>
            ))}
          </div>
        </div>

        <aside className="panel rise p-6 lg:sticky lg:top-28" style={{ animationDelay: '120ms' }}>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Cart Summary</p>
          <h2
            className="mt-2 text-2xl font-semibold text-[#121522]"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            Your Cart
          </h2>

          {cart.length === 0 ? (
            <p className="mt-4 rounded-xl border border-[#d8dde6] bg-white px-4 py-5 text-sm text-muted">
              Your cart is empty. Select a size and add items to begin checkout.
            </p>
          ) : (
            <>
              <ul className="mt-4 space-y-2">
                {cart.map((item, idx) => (
                  <li key={`${item.name}-${idx}`} className="rounded-lg border border-[#dde2ea] bg-white px-3 py-2 text-sm text-[#2d3746]">
                    <div className="flex items-center justify-between gap-3">
                      <span>{item.name} ({item.selectedSize})</span>
                      <span className="font-semibold">R{item.price}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5d6572]">Payment Method</p>
                <div className="mt-2 grid gap-2">
                  {[
                    { id: 'eft', label: 'EFT (Bank Transfer)' },
                    { id: 'payfast', label: 'PayFast' },
                    { id: 'ozow', label: 'Ozow Instant EFT' },
                    { id: 'yoco', label: 'Yoco Card Payment' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedPaymentMethod(method.id as PaymentMethod)}
                      className={`rounded-lg border px-3 py-2 text-left text-sm font-medium transition ${
                        selectedPaymentMethod === method.id
                          ? 'border-[#2e4f7a] bg-[#edf2f9] text-[#1f3353]'
                          : 'border-[#d7dde6] bg-white text-[#384558] hover:border-[#9ca8b9]'
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              <ul className="mt-4 space-y-2 rounded-xl border border-[#d7dde6] bg-[#f7f9fc] p-3">
                {shoppingAssurance.map((item) => (
                  <li key={item} className="text-xs text-[#425066]">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-between border-t border-[#d8dde6] pt-4">
                <span className="text-sm font-medium text-[#2d3746]">Total</span>
                <span
                  className="text-2xl font-semibold text-[#1e3150]"
                  style={{ fontFamily: 'var(--font-space), sans-serif' }}
                >
                  R{totalPrice}
                </span>
              </div>

              <button
                className="btn-primary mt-5 w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
                onClick={handleCheckout}
                disabled={checkoutLoading}
              >
                {checkoutLoading ? 'Processing...' : `Pay with ${selectedPaymentMethod.toUpperCase()}`}
              </button>

              {selectedPaymentMethod === 'eft' && (
                <div className="mt-3 rounded-xl border border-[#d7dde6] bg-[#f7f9fc] px-4 py-3 text-xs text-[#425066]">
                  <p className="font-semibold text-[#2d3c52]">EFT Banking Details</p>
                  <p className="mt-1">Bank: {process.env.NEXT_PUBLIC_BANK_NAME || 'Your Bank Name'}</p>
                  <p>Account Name: {process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME || 'IGHOST Edutainment'}</p>
                  <p>Account Number: {process.env.NEXT_PUBLIC_BANK_ACCOUNT_NUMBER || '0000000000'}</p>
                  <p>Branch Code: {process.env.NEXT_PUBLIC_BANK_BRANCH_CODE || '000000'}</p>
                  {eftReference && (
                    <p className="mt-2 rounded-md bg-white px-2 py-1 font-semibold text-[#1d2a3c]">
                      Payment Reference: IGH-{eftReference}
                    </p>
                  )}
                </div>
              )}
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
              Premium Handling, Local Reliability
            </h2>
            <p className="mt-3 text-sm text-muted md:text-base">
              Orders are packed by our local operations team with quality checks before dispatch.
              Confirmation updates and payment support are handled directly for a smooth process.
            </p>
          </div>

          <div className="grid gap-3">
            <article className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3 text-sm text-[#263244]">
              Standard delivery: 2-5 business days in major metros.
            </article>
            <article className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3 text-sm text-[#263244]">
              Proof of payment support for EFT and instant EFT channels.
            </article>
            <article className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3 text-sm text-[#263244]">
              Real-time support via WhatsApp for order issues and confirmations.
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
