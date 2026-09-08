import { Metadata } from 'next';
import OtherProductsContent from '../../../components/OtherProductsContent';

export const metadata: Metadata = {
  title: 'Our Other Products | GitFC, SnapDevCode & SystemDesign.website | ihatelovepdf',
  description:
    'Discover our other developer tools: GitFC (Turn GitHub stats into EA FC cards), SnapDevCode (Company OA questions and DSA visualizer), and SystemDesign.website (Distributed systems masterclass).',
  keywords: [
    'GitFC',
    'GitHub EA FC card',
    'developer stats card',
    'SnapDevCode',
    'SystemDesign.website',
    'system design interactive',
    'company oa questions',
    'dsa visualizer',
    'developer tools',
    'ihatelovepdf ecosystem',
  ],
  alternates: {
    canonical: 'https://ihatelovepdf.com/products',
  },
  openGraph: {
    title: 'Support Our Other Products | GitFC, SnapDevCode & SystemDesign.website',
    description:
      'Explore developer platforms created by our team: GitFC, SnapDevCode, and SystemDesign.website.',
    url: 'https://ihatelovepdf.com/products',
  },
};

export default function ProductsPage() {
  return <OtherProductsContent />;
}
