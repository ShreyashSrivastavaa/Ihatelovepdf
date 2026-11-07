import type { Metadata } from 'next';
import { BuyMeAChaiPageContent } from '../../../components/BuyMeAChaiPageContent';
import { METADATA_BASE, SHARED_ICONS } from '../../../lib/metadata-shared';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: 'Buy Me a Chai',
  description:
    'Support ihatelovepdf, a free and private in-browser PDF suite built by Shreyash Srivastava. Support via UPI or cards on Buy Me a Chai.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://www.ihatelovepdf.com/buy-me-a-chai',
  },
  icons: SHARED_ICONS,
  openGraph: {
    title: 'Buy Me a Chai | ihatelovepdf',
    description:
      'Support ihatelovepdf, a free and private in-browser PDF suite built by Shreyash Srivastava. Support via UPI or cards on Buy Me a Chai.',
    url: 'https://www.ihatelovepdf.com/buy-me-a-chai',
    siteName: 'ihatelovepdf',
    type: 'website',
    images: [{ url: 'https://www.ihatelovepdf.com/og-images/og-image-en.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buy Me a Chai | ihatelovepdf',
    description:
      'Support ihatelovepdf, a free and private in-browser PDF suite built by Shreyash Srivastava. Support via UPI or cards on Buy Me a Chai.',
    images: ['https://www.ihatelovepdf.com/og-images/og-image-en.png'],
  },
};

export default function BuyMeAChaiPage() {
  return <BuyMeAChaiPageContent />;
}
