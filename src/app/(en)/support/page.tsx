import type { Metadata } from 'next';
import { PermanentRedirect } from '../../../components/PermanentRedirect';
import { METADATA_BASE } from '../../../lib/metadata-shared';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: 'Redirecting to Buy Me a Coffee',
  description: 'This page has moved permanently to /buy-me-a-coffee.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.ihatelovepdf.com/buy-me-a-coffee/',
  },
};

export default function SupportRedirectPage() {
  return <PermanentRedirect destination="/buy-me-a-coffee" />;
}
