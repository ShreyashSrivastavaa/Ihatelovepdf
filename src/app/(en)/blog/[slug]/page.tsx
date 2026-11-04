import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { Calendar, Clock, ArrowLeft, ArrowRight, ShieldCheck, HelpCircle, Sparkles } from 'lucide-react';
import { BLOG_ARTICLES } from '../../../_data/blog-data';
import { METADATA_BASE, SHARED_ICONS, SHARED_OPEN_GRAPH, SHARED_TWITTER } from '../../../../lib/metadata-shared';
import { SITE_URL } from '../../../../lib/site';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(BLOG_ARTICLES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = BLOG_ARTICLES[slug];

  if (!article) {
    return {};
  }

  const canonicalUrl = `${SITE_URL}/blog/${article.slug}/`;

  return {
    metadataBase: METADATA_BASE,
    title: article.title,
    description: article.description,
    authors: [{ name: article.author, url: article.authorUrl }],
    alternates: {
      canonical: canonicalUrl,
    },
    icons: SHARED_ICONS,
    openGraph: {
      ...SHARED_OPEN_GRAPH,
      title: `${article.title} | I Hate Love PDF`,
      description: article.description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: article.date,
      authors: [article.authorUrl],
    },
    twitter: SHARED_TWITTER,
  };
}

export default async function BlogDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = BLOG_ARTICLES[slug];

  if (!article) {
    notFound();
  }

  const articleUrl = `${SITE_URL}/blog/${article.slug}/`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: `${SITE_URL}/og-image.png`,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: article.author,
      url: article.authorUrl,
      sameAs: [
        'https://www.shreyashsrivastava.in/',
        'https://github.com/ShreyashSrivastavaa',
        'https://www.linkedin.com/in/shreyashsrivastavaa',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'I Hate Love PDF',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Guides</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-3.5">
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-[var(--text-muted)]">
            <span className="px-2.5 py-0.5 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] font-semibold border border-[var(--brand)]/20">
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--text-main)] leading-[1.2]">
            {article.title}
          </h1>

          <div className="flex items-center gap-3 pt-1">
            <div className="h-9 w-9 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center font-bold text-xs border border-[var(--brand)]/20">
              SS
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[var(--text-main)]">
                By{' '}
                <a
                  href={article.authorUrl}
                  target="_blank"
                  rel="noopener noreferrer author"
                  className="hover:underline text-[var(--brand)]"
                >
                  {article.author}
                </a>
              </p>
              <p className="text-[11px] text-[var(--text-muted)]">Founder and developer of I Hate Love PDF</p>
            </div>
          </div>
        </header>

        {/* Above-the-fold Tool CTA Banner */}
        <div className="p-4 sm:p-5 rounded-xl border border-[var(--brand)]/30 bg-[var(--brand-soft)]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--brand)]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Recommended In-Browser Tool</span>
            </div>
            <p className="text-sm font-semibold text-[var(--text-main)]">
              Process your files right now with {article.toolName}
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              100% free, private in-browser processing with zero server uploads.
            </p>
          </div>
          <Link
            href={`/${article.toolSlug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--brand)] text-white font-medium text-xs sm:text-sm hover:opacity-95 transition-opacity shrink-0"
          >
            <span>Open {article.toolName}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Intro */}
        <div className="text-sm sm:text-base text-[var(--text-main)] leading-relaxed font-normal bg-[var(--card)] p-5 sm:p-6 rounded-xl border border-[var(--border)]">
          {article.intro}
        </div>

        {/* Article Sections */}
        <div className="space-y-8 text-[var(--text-main)] leading-relaxed text-sm sm:text-base">
          {article.sections.map((section) => (
            <section key={section.heading} className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-main)] pt-2 border-b border-[var(--border)] pb-2">
                {section.heading}
              </h2>

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-[var(--text-muted)] leading-relaxed">
                  {p}
                </p>
              ))}

              {section.steps && section.steps.length > 0 && (
                <div className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] my-4 space-y-3">
                  <h3 className="font-semibold text-sm sm:text-base text-[var(--text-main)]">Step-by-step instructions:</h3>
                  <ol className="space-y-2.5">
                    {section.steps.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-muted)]">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-soft)] text-xs font-bold text-[var(--brand)] border border-[var(--brand)]/20">
                          {sIdx + 1}
                        </span>
                        <span className="pt-0.5 leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* End of article Tool Callout */}
        <div className="p-6 sm:p-7 rounded-xl space-y-3.5 text-center max-w-lg mx-auto border border-[var(--border)] bg-[var(--card)]">
          <div className="h-10 w-10 rounded-xl bg-[var(--brand-soft)] text-[var(--brand)] mx-auto flex items-center justify-center border border-[var(--brand)]/20">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">Ready to Try {article.toolName}?</h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            Fast, private, and unlimited. Process your files directly in your browser with zero signups or watermarks.
          </p>
          <div className="pt-1">
            <Link
              href={`/${article.toolSlug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--brand)] text-white font-medium text-xs sm:text-sm hover:opacity-95 transition-opacity"
            >
              <span>Launch {article.toolName}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* FAQs */}
        {article.faqs && article.faqs.length > 0 && (
          <section className="p-6 sm:p-7 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-4">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--text-main)] flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-[var(--brand)]" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {article.faqs.map((faq, fIdx) => (
                <div key={fIdx} className="border border-[var(--border)] rounded-lg p-4 bg-[var(--subtle)] space-y-1">
                  <h3 className="font-semibold text-xs sm:text-sm text-[var(--text-main)]">{faq.question}</h3>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Structured Data */}
        <Script
          id={`schema-article-${article.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <Script
          id={`schema-breadcrumb-${article.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <Script
          id={`schema-faq-${article.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </div>
    </div>
  );
}
