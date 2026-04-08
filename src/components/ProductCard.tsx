
"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { CartIcon } from './Icons';

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  sizes: string[];
  category?: string;
  edition?: string;
  onAddToCart?: (selectedSize: string) => void;
  selectorLabel?: string;
  actionLabel?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  image, 
  name, 
  price, 
  sizes, 
  category,
  edition,
  onAddToCart,
  selectorLabel = 'Select Option',
  actionLabel = 'Add to Shortlist',
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    if (onAddToCart && selectedSize) {
      setIsAdding(true);
      onAddToCart(selectedSize);
      setTimeout(() => setIsAdding(false), 1500);
    }
  };

  return (
    <article className="panel group relative overflow-hidden p-5 md:p-6 rise transition-shadow duration-300 hover:shadow-2xl hover:scale-[1.025]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2e4f7a] to-[#caa86a]" />

      <div className="relative mb-5 aspect-square overflow-hidden rounded-2xl border border-[#d7dbe2] bg-[#eef1f5] shadow-sm">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute left-3 top-3 rounded-full bg-[rgba(18,21,34,0.82)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.09em] text-white shadow">
          {edition || 'Core Edition'}
        </div>
      </div>

      <div className="mb-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.11em] text-[#62728a]">
          {category || 'Student Accommodation'}
        </p>
        <h3
          className="mt-1 text-xl font-bold text-[#121522] tracking-tight group-hover:text-[#2e4f7a] transition-colors"
          style={{ fontFamily: 'var(--font-space), sans-serif' }}
        >
          {name}
        </h3>
        <div className="mt-2 flex items-end justify-between gap-3">
          <p className="text-2xl font-semibold text-[#2e4f7a]">R{price}</p>
          <span className="rounded-full border border-[#e0d4be] bg-[#fbf6ec] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#765b2f]">
            Move-In Ready
          </span>
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#5d6572]">
          {selectorLabel}
        </label>
        <div className="flex flex-wrap gap-2">
          {sizes.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold focus-visible:ring-2 focus-visible:ring-[#caa86a] scale-100 hover:scale-105 active:scale-95 transition-transform duration-200 ${
                selectedSize === size
                  ? 'border-[#2e4f7a] bg-[#2e4f7a] text-white shadow'
                  : 'border-[#d1d7e0] bg-white text-[#27303c] hover:border-[#8191a8]'
              }`}
              aria-pressed={selectedSize === size}
              aria-label={`Select size ${size}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {onAddToCart && (
        <button
          className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold scale-100 hover:scale-105 active:scale-95 transition-transform duration-200 ${
            selectedSize && !isAdding
              ? 'bg-[#2e4f7a] text-white hover:bg-[#243c5d] group-hover:shadow-[0_8px_20px_rgba(36,60,93,0.24)]'
              : 'cursor-not-allowed bg-[#d8dde6] text-[#616a79]'
          }`}
          onClick={handleAddToCart}
          disabled={!selectedSize || isAdding}
          aria-disabled={!selectedSize || isAdding}
          aria-busy={isAdding}
        >
          {isAdding ? (
            <span>Adding...</span>
          ) : (
            <>
              <CartIcon size={17} />
              <span>{selectedSize ? `${actionLabel}: ${selectedSize}` : 'Select an Option First'}</span>
            </>
          )}
        </button>
      )}
    </article>
  );
};

export default ProductCard;
