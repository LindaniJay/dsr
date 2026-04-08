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
    <footer className="mt-20 border-t border-[#ddd8cf] bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(247,244,238,0.92))] py-10 backdrop-blur">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1.2fr_0.8fr_0.7fr] md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#18314d,#b99258)] text-sm font-bold text-white shadow-lg">DS</span>
            <div>
              <p className="text-xl font-extrabold tracking-tight text-[#1f3a5a]">Durban Student Stays</p>
              <p className="text-xs uppercase tracking-[0.14em] text-[#6b7a92]">Student accommodation in Durban</p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-[#566476]">
            Browse well-located student rentals near UKZN and DUT, compare private and sharing options, and enquire with a clearer picture of the building before you book a viewing.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b7a92]">Explore</p>
          <nav className="mt-4 grid gap-3 text-sm font-medium text-[#334155]">
            <Link href="/buildings">Buildings</Link>
            <Link href="/shop">Room Types</Link>
            <Link href="/gallery">Neighbourhoods</Link>
            <Link href="/apply">Application Guide</Link>
            <Link href="/ambassadors">Rental Guide</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b7a92]">Follow</p>
          <div className="mt-4 flex gap-4">
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
          <div className="mt-5 grid gap-3 text-sm text-[#566476]">
            <p>For viewings and availability, use the contact page to send your preferred area, room type, and move-in timing.</p>
            <p>WhatsApp: +27 00 000 0000</p>
            <p>Viewing hours: Monday to Saturday, 09:00 to 17:00</p>
            <p>Response time: usually within one working day</p>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-[#8a98b6]">
        &copy; {new Date().getFullYear()} Durban Student Stays. All rights reserved.
      </div>
    </footer>
  );
}
