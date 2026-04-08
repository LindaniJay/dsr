'use client';

import { useCallback, useEffect, useState } from 'react';

const SHORTLIST_KEY = 'durban-stays-shortlist';
const COMPARE_KEY = 'durban-stays-compare';
const UPDATE_EVENT = 'durban-stays-lists-updated';

function readStoredList(key: string) {
  if (typeof window === 'undefined') {
    return [] as string[];
  }

  try {
    const value = window.localStorage.getItem(key);
    const parsed = value ? (JSON.parse(value) as unknown) : [];

    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

function writeStoredList(key: string, value: string[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
}

export function useSavedBuildings() {
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => {
      setShortlist(readStoredList(SHORTLIST_KEY));
      setCompare(readStoredList(COMPARE_KEY));
    };

    sync();
    window.addEventListener('storage', sync);
    window.addEventListener(UPDATE_EVENT, sync);

    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener(UPDATE_EVENT, sync);
    };
  }, []);

  const toggleShortlist = useCallback((slug: string) => {
    const current = readStoredList(SHORTLIST_KEY);
    writeStoredList(
      SHORTLIST_KEY,
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    );
  }, []);

  const toggleCompare = useCallback((slug: string) => {
    const current = readStoredList(COMPARE_KEY);

    if (current.includes(slug)) {
      writeStoredList(COMPARE_KEY, current.filter((item) => item !== slug));
      return;
    }

    writeStoredList(COMPARE_KEY, [...current.slice(-1), slug]);
  }, []);

  const clearShortlist = useCallback(() => writeStoredList(SHORTLIST_KEY, []), []);
  const clearCompare = useCallback(() => writeStoredList(COMPARE_KEY, []), []);

  return {
    shortlist,
    compare,
    toggleShortlist,
    toggleCompare,
    clearShortlist,
    clearCompare,
  };
}
