import { Metadata } from 'next';
import OtherProductsContent from '../../../components/OtherProductsContent';

export const metadata: Metadata = {
  title: 'More Free Tools by Shreyash Srivastava',
  description:
    'Discover developer tools built by Shreyash Srivastava: GitFC, SnapDevCode, and SystemDesign.website.',
  alternates: {
    canonical: 'https://www.ihatelovepdf.com/products',
  },
  openGraph: {
    title: 'Support Our Other Products | GitFC, SnapDevCode & SystemDesign.website',
    description:
      'Explore developer platforms created by our team: GitFC, SnapDevCode, and SystemDesign.website.',
    url: 'https://www.ihatelovepdf.com/products',
    images: [{ url: 'https://www.ihatelovepdf.com/og-images/og-image-en.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Support Our Other Products | GitFC, SnapDevCode & SystemDesign.website',
    description:
      'Explore developer platforms created by our team: GitFC, SnapDevCode, and SystemDesign.website.',
    images: ['https://www.ihatelovepdf.com/og-images/og-image-en.png'],
  },
};

export default function ProductsPage() {
  return <OtherProductsContent />;
}
