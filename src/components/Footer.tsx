import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const socialLinks = [
  { href: 'https://www.instagram.com/', label: 'Instagram', icon: '/icons/instagram.svg' },
  { href: 'https://www.facebook.com/', label: 'Facebook', icon: '/icons/facebook.svg' },
  { href: 'https://www.tiktok.com/', label: 'TikTok', icon: '/icons/tiktok.svg' },
];

export default function Footer() {
  return (
    <footer className="w-full bg-white/80 backdrop-blur border-t border-[#e3e6ee] py-8 mt-16">
      <div className="mx-auto flex max-w-6xl flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#1f3350,#d6a45d)] text-sm font-bold text-white shadow-lg">DS</span>
          <div>
            <p className="text-xl font-extrabold text-[#2e4f7a] tracking-tight">Durban Student Stays</p>
            <p className="text-xs uppercase tracking-[0.14em] text-[#6b7a92]">Student-friendly rentals in Durban</p>
          </div>
        </div>
        <nav className="flex flex-wrap gap-5 text-sm font-medium text-[#5f7695]">
          <Link href="/about">About</Link>
          <Link href="/buildings">Buildings</Link>
          <Link href="/shop">Room Types</Link>
          <Link href="/ambassadors">Rental Guide</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="rounded-full bg-[#f7f8fa] p-2 shadow-md hover:bg-[#caa86a]/20 hover:scale-110 transition-transform border border-[#e3e6ee]"
            >
              <Image src={link.icon} alt={link.label} width={28} height={28} />
            </a>
          ))}
        </div>
      </div>
      <div className="mt-6 text-center text-xs text-[#8a98b6]">
        &copy; {new Date().getFullYear()} Durban Student Stays. All rights reserved.
      </div>
    </footer>
  );
}
