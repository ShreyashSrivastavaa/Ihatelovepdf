import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  ALL_GUIDE_SLUGS,
  LOCALIZED_GUIDES_DATA,
} from '../../../_data/localized-guides-data';
import { GuideDetailPageContent } from '../../../../components/guides/GuideDetailPageContent';
import { METADATA_BASE } from '../../../../lib/metadata-shared';
import { SITE_URL } from '../../../../lib/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return ALL_GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = LOCALIZED_GUIDES_DATA.en[slug];

  if (!guide) {
    return {};
  }

  const canonicalUrl = `${SITE_URL}/guides/${guide.slug}`;

  return {
    metadataBase: METADATA_BASE,
    title: guide.title,
    description: guide.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/guides/${guide.slug}`,
        es: `${SITE_URL}/es/guides/${guide.slug}`,
        pt: `${SITE_URL}/pt/guides/${guide.slug}`,
        de: `${SITE_URL}/de/guides/${guide.slug}`,
        it: `${SITE_URL}/it/guides/${guide.slug}`,
        fr: `${SITE_URL}/fr/guides/${guide.slug}`,
        ro: `${SITE_URL}/ro/guides/${guide.slug}`,
        ru: `${SITE_URL}/ru/guides/${guide.slug}`,
        hu: `${SITE_URL}/hu/guides/${guide.slug}`,
        'x-default': `${SITE_URL}/guides/${guide.slug}`,
      },
    },
    openGraph: {
      siteName: 'ihatelovepdf',
      title: guide.title,
      description: guide.metaDescription,
      url: canonicalUrl,
      type: 'article',
      locale: 'en_US',
      publishedTime: `${guide.datePublished}T08:00:00+00:00`,
      modifiedTime: `${guide.dateModified}T12:00:00+00:00`,
      authors: [guide.author],
      images: [{ url: `${SITE_URL}/og-images/og-image-en.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.metaDescription,
      creator: '@YesShrey',
      site: '@YesShrey',
      images: [`${SITE_URL}/og-images/og-image-en.png`],
    },
  };
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = LOCALIZED_GUIDES_DATA.en[slug];

  if (!guide) {
    notFound();
  }

  return <GuideDetailPageContent guide={guide} />;
}
