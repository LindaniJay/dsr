import { Suspense } from 'react';
import ContactPageClient from '../../components/ContactPageClient';

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="app-shell section-spacing text-sm text-muted">Loading viewing form...</div>}>
      <ContactPageClient />
    </Suspense>
  );
}
