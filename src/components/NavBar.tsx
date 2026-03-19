'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const primaryNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/shop', label: 'Shop' },
  { href: '/ambassadors', label: 'Ambassadors' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const moreNavLinks = [
  { href: '/gallery', label: 'Gallery' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/faq', label: 'FAQ' },
  { href: '/admin', label: 'Admin' },
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
        className={`mx-auto w-full max-w-[1200px] rounded-2xl border transition-all duration-300 ${
          scrolled
            ? 'border-[#d6dae2] bg-[rgba(250,250,248,0.92)] shadow-[0_10px_30px_rgba(18,24,33,0.10)] backdrop-blur-xl'
            : 'border-transparent bg-[rgba(250,250,248,0.64)] backdrop-blur-md'
        }`}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link href="/" className="flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-[#caa86a] rounded-xl transition" onClick={closeAllMenus}>
            <span className="relative h-10 w-10 overflow-hidden rounded-xl border border-[#cad0d9] bg-white">
              <Image
                src="/ighost-logo.png"
                alt="IGHOST logo"
                fill
                className="object-cover"
                sizes="40px"
                priority
              />
            </span>
            <span>
              <span
                className="block text-lg font-semibold tracking-tight text-[#121522]"
                style={{ fontFamily: 'var(--font-space), sans-serif' }}
              >
                IGHOST
              </span>
              <span className="block text-[10px] uppercase tracking-[0.18em] text-[#64758b]">
                Architecture of Culture
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
                      ? 'bg-[#2e4f7a] text-white'
                      : 'text-[#2a2f37] hover:bg-white hover:text-[#1f3350]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute left-1/2 -bottom-1.5 h-1 w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#2e4f7a] to-[#caa86a] opacity-80 animate-pulse" />
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
              <div className="absolute right-0 top-12 z-50 hidden w-56 rounded-2xl border border-[#d6dae2] bg-white p-2 shadow-[0_12px_28px_rgba(20,25,35,0.14)] lg:block">
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
                className="inline-flex h-10 items-center justify-center rounded-xl border border-[#d6d9e0] bg-white px-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#1f3350]"
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
