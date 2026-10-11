import type { Metadata } from 'next';
import { BuyMeACoffeePageContent } from '../../../components/BuyMeACoffeePageContent';

export const metadata: Metadata = {
  title: 'Buy Me a Coffee',
  description:
    'Support I Hate Love PDF, a free, private browser PDF suite built and maintained by Shreyash Srivastava. Tips keep it free and ad-light.',
  alternates: {
    canonical: 'https://www.ihatelovepdf.com/buy-me-a-coffee/',
  },
  openGraph: {
    title: 'Buy Me a Coffee | I Hate Love PDF',
    description:
      'Support I Hate Love PDF, a free, private browser PDF suite built and maintained by Shreyash Srivastava. Tips keep it free and ad-light.',
    url: 'https://www.ihatelovepdf.com/buy-me-a-coffee/',
    siteName: 'I Hate Love PDF',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buy Me a Coffee | I Hate Love PDF',
    description:
      'Support I Hate Love PDF, a free, private browser PDF suite built and maintained by Shreyash Srivastava. Tips keep it free and ad-light.',
  },
};

export default function BuyMeACoffeePage() {
  return <BuyMeACoffeePageContent />;
}
