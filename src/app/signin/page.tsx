"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirebaseAuth } from '@/utils/firebase';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [busy, setBusy] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
      router.push('/buildings');
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.');
      } else if (code === 'auth/too-many-requests') {
        setError('Too many attempts. Please wait a moment and try again.');
      } else {
        setError('Unable to sign in. Check your connection and try again.');
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="app-shell section-spacing">
      <section className="rise">
        <span className="kicker">Member Access</span>
        <h1
          className="architect-heading mt-5 text-4xl font-semibold text-[#121522] md:text-6xl"
          style={{ fontFamily: 'var(--font-space), sans-serif' }}
        >
          Sign In to Your Rental Account
        </h1>
        <p className="mt-4 max-w-3xl text-base text-muted md:text-lg">
          Access your shortlisted rooms, enquiry history, and saved details in one place.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-[1fr_0.9fr]">
        <form
          className="panel rise flex flex-col gap-5 p-6 md:p-8"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#5e6673]">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#5f7695] focus:ring-2 focus:ring-[#d6dfec]"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#5e6673]">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#5f7695] focus:ring-2 focus:ring-[#d6dfec]"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between gap-3 text-sm">
            <label className="inline-flex items-center gap-2 text-[#425066]">
              <input type="checkbox" className="h-4 w-4 rounded border-[#c9d1dc]" />
              Keep me signed in
            </label>
          </div>

          <button type="submit" className="btn-primary w-full justify-center" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign In'}
          </button>

          {error && (
            <div className="rounded-xl border border-[#e8b4b4] bg-[#fdf2f2] px-4 py-3 text-sm font-medium text-[#991b1b]">
              {error}
            </div>
          )}

          <p className="text-sm text-[#4a596e]">
            New here?{' '}
            <Link href="/signup" className="font-semibold text-[#2e4f7a] hover:text-[#233c5f]">
              Create an account
            </Link>
          </p>
        </form>

        <aside className="grid gap-4 rise" style={{ animationDelay: '90ms' }}>
          <article className="panel p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Why Sign In</p>
            <h2
              className="mt-2 text-2xl font-semibold text-[#121522]"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              Everything in One Place
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>Track room enquiries and shortlist history.</li>
              <li>Return to saved buildings and compare room modes faster.</li>
              <li>Save your renter profile for faster follow-up.</li>
            </ul>
          </article>

          <article className="panel p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Account Security</p>
            <p className="mt-2 text-sm text-muted">
              We recommend strong passwords and periodic updates. Two-factor authentication can be
              enabled when your backend auth provider is connected.
            </p>
          </article>
        </aside>
      </section>
    </div>
  );
}
