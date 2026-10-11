import { Metadata } from 'next';
import OtherProductsContent from '../../../components/OtherProductsContent';

export const metadata: Metadata = {
  title: 'More Free Tools by Shreyash Srivastava',
  description:
    'Discover developer tools built by Shreyash Srivastava: GitFC, SnapDevCode, and SystemDesign.website.',
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
