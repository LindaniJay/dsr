"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirebaseAuth } from '@/utils/firebase';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [interest, setInterest] = React.useState('');
  const [error, setError] = React.useState('');
  const [busy, setBusy] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setBusy(true);
    try {
      const cred = await createUserWithEmailAndPassword(getFirebaseAuth(), email, password);
      await updateProfile(cred.user, { displayName: name });
      router.push('/buildings');
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      if (code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (code === 'auth/weak-password') {
        setError('Password is too weak. Use at least 6 characters.');
      } else {
        setError('Unable to create account. Check your connection and try again.');
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="app-shell section-spacing">
      <section className="rise">
        <span className="kicker">Get Started</span>
        <h1
          className="architect-heading mt-5 text-4xl font-semibold text-[#121522] md:text-6xl"
          style={{ fontFamily: 'var(--font-space), sans-serif' }}
        >
          Create Your Rental Account
        </h1>
        <p className="mt-4 max-w-3xl text-base text-muted md:text-lg">
          Create an account to save rooms, manage enquiries, and receive alerts when new Durban room options fit your search.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-[1fr_0.9fr]">
        <form
          className="panel rise flex flex-col gap-5 p-6 md:p-8"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#5e6673]">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your full name"
              className="w-full rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#5f7695] focus:ring-2 focus:ring-[#d6dfec]"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#5e6673]">
                Password
              </label>
              <input
                type="password"
                placeholder="Create password"
                className="w-full rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#5f7695] focus:ring-2 focus:ring-[#d6dfec]"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#5e6673]">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#5f7695] focus:ring-2 focus:ring-[#d6dfec]"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#5e6673]">
              Primary Interest
            </label>
            <select
              className="w-full rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#5f7695] focus:ring-2 focus:ring-[#d6dfec]"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              required
            >
              <option value="" disabled>
                Select one option
              </option>
              <option value="student">Looking for student accommodation</option>
              <option value="young-professional">Looking for a room as a young professional</option>
              <option value="support">Need search support</option>
            </select>
          </div>

          <button type="submit" className="btn-primary w-full justify-center" disabled={busy}>
            {busy ? 'Creating account…' : 'Create Account'}
          </button>

          {error && (
            <div className="rounded-xl border border-[#e8b4b4] bg-[#fdf2f2] px-4 py-3 text-sm font-medium text-[#991b1b]">
              {error}
            </div>
          )}

          <p className="text-sm text-[#4a596e]">
            Already have an account?{' '}
            <Link href="/signin" className="font-semibold text-[#2e4f7a] hover:text-[#233c5f]">
              Sign in here
            </Link>
          </p>
        </form>

        <aside className="grid gap-4 rise" style={{ animationDelay: '90ms' }}>
          <article className="panel p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">What You Unlock</p>
            <h2
              className="mt-2 text-2xl font-semibold text-[#121522]"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              Membership Benefits
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>Save preferred room types and Durban areas.</li>
              <li>Get updates when new room options match your search.</li>
              <li>Keep your renter profile and building preferences in one place.</li>
            </ul>
          </article>

          <article className="panel p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Data and Privacy</p>
            <p className="mt-2 text-sm text-muted">
              Your information is used only for program communication and account operations.
              Connect your production backend for full compliance workflows and consent logs.
            </p>
          </article>
        </aside>
      </section>
    </div>
  );
}
