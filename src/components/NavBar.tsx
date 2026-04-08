'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const primaryNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/buildings', label: 'Buildings' },
  { href: '/ambassadors', label: 'Rental Guide' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const moreNavLinks = [
  { href: '/shop', label: 'Room Types' },
  { href: '/gallery', label: 'Neighbourhoods' },
  { href: '/apply', label: 'Application Guide' },
  { href: '/testimonials', label: 'Reviews' },
  { href: '/faq', label: 'FAQ' },
  { href: '/admin', label: 'Dashboard' },
];

const authLinks = [
  { href: '/signin', label: 'Sign In' },
  { href: '/signup', label: 'Sign Up' },
];

const NavBar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsMoreMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 14);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 md:px-5">
      <nav
        className={`mx-auto w-full max-w-[1200px] rounded-[1.6rem] border transition-all duration-300 ${
          scrolled
            ? 'border-[#d2d6dc] bg-[rgba(251,249,244,0.94)] shadow-[0_16px_36px_rgba(18,24,33,0.10)] backdrop-blur-xl'
            : 'border-[rgba(216,214,207,0.65)] bg-[rgba(251,249,244,0.76)] backdrop-blur-md'
        }`}
        aria-label="Main navigation"
      >
        <div className="grid-fade flex items-center justify-between gap-3 px-3 py-3 md:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-3 rounded-xl transition focus-visible:ring-2 focus-visible:ring-[#caa86a]" onClick={closeAllMenus}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d3c2a7] bg-[linear-gradient(135deg,#18314d,#b99258)] text-sm font-bold text-white shadow-sm">
              DS
            </span>
            <span className="min-w-0">
              <span
                className="block truncate text-base font-semibold tracking-tight text-[#121522] sm:text-lg"
                style={{ fontFamily: 'var(--font-space), sans-serif' }}
              >
                Durban Student Stays
              </span>
              <span className="hidden text-[10px] uppercase tracking-[0.18em] text-[#64758b] sm:block">
                Student accommodation in Durban
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {primaryNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-2.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] focus-visible:ring-2 focus-visible:ring-[#caa86a] transition ${
                    isActive
                      ? 'bg-[#1f3a5a] text-white'
                      : 'text-[#2a2f37] hover:bg-white hover:text-[#1f3350]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute left-1/2 -bottom-1.5 h-1 w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#1f3a5a] to-[#b99258] opacity-80" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="relative flex items-center gap-2">
            <div className="hidden items-center gap-2 lg:flex">
              <Link href="/signin" className="rounded-full border border-[#d6dce6] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#1f3350] hover:border-[#8ca0ba]">
                Sign In
              </Link>

              <Link href="/contact" className="btn-primary px-4 py-2 text-xs uppercase tracking-[0.08em]">
                Book A Viewing
              </Link>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMoreMenuOpen((prev) => !prev);
                }}
                className="rounded-full border border-[#d6dce6] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#1f3350] hover:border-[#8ca0ba]"
                aria-expanded={isMoreMenuOpen}
                aria-label="Open more menu"
              >
                More {isMoreMenuOpen ? 'x' : '+'}
              </button>
            </div>

            {isMoreMenuOpen && (
              <div className="absolute right-0 top-14 z-50 hidden w-56 rounded-2xl border border-[#d6dae2] bg-white p-2 shadow-[0_12px_28px_rgba(20,25,35,0.14)] lg:block">
                <div className="grid gap-1">
                  {moreNavLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeAllMenus}
                        className={`rounded-xl px-3 py-2 text-sm font-medium ${
                          isActive ? 'bg-[#2e4f7a] text-white' : 'text-[#27303c] hover:bg-[#f4f7fb]'
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}

                  <div className="my-1 h-px bg-[#e3e7ee]" />

                  {authLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeAllMenus}
                      className={`rounded-xl px-3 py-2 text-sm font-medium ${
                        pathname === link.href ? 'bg-[#2e4f7a] text-white' : 'text-[#27303c] hover:bg-[#f4f7fb]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMoreMenuOpen((prev) => !prev);
                }}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-[#d6d9e0] bg-white px-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1f3350] sm:px-3 sm:text-xs"
                aria-label="Toggle more menu"
              >
                More {isMoreMenuOpen ? 'x' : '+'}
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsMoreMenuOpen(false);
                setIsMobileMenuOpen((prev) => !prev);
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#d6d9e0] bg-white text-[#1f3350] lg:hidden"
              aria-label="Toggle menu"
            >
              <span className="relative h-4 w-5">
                <span
                  className={`absolute left-0 top-0 h-[2px] w-5 rounded-full bg-[#1f3350] transition-transform duration-200 ${
                    isMobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-[#1f3350] transition-opacity duration-200 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 top-[14px] h-[2px] w-5 rounded-full bg-[#1f3350] transition-transform duration-200 ${
                    isMobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="app-shell mt-2 rounded-2xl border border-[#d6dae2] bg-[rgba(255,255,255,0.94)] p-4 shadow-[0_8px_30px_rgba(20,25,35,0.11)] backdrop-blur lg:hidden">
          <div className="grid gap-2">
            {[...primaryNavLinks, ...moreNavLinks].map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeAllMenus}
                  className={`rounded-xl px-3 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-[#2e4f7a] text-white' : 'bg-white text-[#27303c]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link href="/contact" onClick={closeAllMenus} className="btn-primary mt-2 text-center">
              Book A Viewing
            </Link>
            {authLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeAllMenus}
                className={link.href === '/signup' ? 'btn-primary mt-2 text-center' : 'btn-secondary mt-2 text-center'}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {isMoreMenuOpen && (
        <div className="app-shell mt-2 rounded-2xl border border-[#d6dae2] bg-[rgba(255,255,255,0.94)] p-4 shadow-[0_8px_30px_rgba(20,25,35,0.11)] backdrop-blur lg:hidden">
          <div className="grid gap-2">
            {[...moreNavLinks, ...authLinks].map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeAllMenus}
                  className={`rounded-xl px-3 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-[#2e4f7a] text-white' : 'bg-white text-[#27303c]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
