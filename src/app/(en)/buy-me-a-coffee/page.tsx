import type { Metadata } from 'next';
import { BuyMeACoffeePageContent } from '../../../components/BuyMeACoffeePageContent';
import { METADATA_BASE, SHARED_ICONS } from '../../../lib/metadata-shared';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: 'Buy Me a Coffee',
  description:
    'Support ihatelovepdf, a free, private browser PDF suite built and maintained by Shreyash Srivastava.',
  alternates: {
    canonical: 'https://www.ihatelovepdf.com/buy-me-a-coffee',
  },
  icons: SHARED_ICONS,
  openGraph: {
    title: 'Buy Me a Coffee | ihatelovepdf',
    description:
      'Support ihatelovepdf, a free, private browser PDF suite built and maintained by Shreyash Srivastava.',
    url: 'https://www.ihatelovepdf.com/buy-me-a-coffee',
    siteName: 'ihatelovepdf',
    type: 'website',
    images: [{ url: 'https://www.ihatelovepdf.com/og-images/og-image-en.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buy Me a Coffee | ihatelovepdf',
    description:
      'Support ihatelovepdf, a free, private browser PDF suite built and maintained by Shreyash Srivastava.',
    images: ['https://www.ihatelovepdf.com/og-images/og-image-en.png'],
  },
};

export default function BuyMeACoffeePage() {
  return <BuyMeACoffeePageContent />;
}
