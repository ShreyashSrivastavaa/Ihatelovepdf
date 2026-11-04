import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Sparkles, User } from 'lucide-react';
import { BLOG_ARTICLES } from '../../_data/blog-data';
import { METADATA_BASE, SHARED_ICONS } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: 'PDF Guides and Tutorials Blog | ihatelovepdf',
  description: 'In-depth, practical guides on merging, compressing, signing, redacting, and editing PDF files safely in your browser without software installations.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  icons: SHARED_ICONS,
  openGraph: {
    siteName: 'ihatelovepdf',
    title: 'PDF Guides and Tutorials Blog | ihatelovepdf',
    description: 'In-depth, practical guides on merging, compressing, signing, redacting, and editing PDF files safely in your browser without software installations.',
    url: `${SITE_URL}/blog`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og-images/og-image-en.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Guides and Tutorials Blog | ihatelovepdf',
    description: 'In-depth, practical guides on merging, compressing, signing, redacting, and editing PDF files safely in your browser without software installations.',
    creator: '@YesShrey',
    site: '@YesShrey',
    images: [`${SITE_URL}/og-images/og-image-en.png`],
  },
};

export default function BlogIndexPage() {
  const articles = Object.values(BLOG_ARTICLES);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--brand)]/20 bg-[var(--brand-soft)] text-xs font-semibold text-[var(--brand)]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Practical PDF Knowledge</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--text-main)] leading-tight">
            PDF Guides, Tutorials &amp; Tips
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            Written by founder Shreyash Srivastava. Learn how to optimize, protect, and manipulate your documents cleanly and privately without paying for heavy desktop suites.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="p-6 sm:p-7 rounded-xl border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between hover:border-[var(--brand)] transition-all duration-150 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span className="px-2.5 py-0.5 rounded-md bg-[var(--subtle)] font-medium text-[var(--text-main)] border border-[var(--border)]">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--text-main)] group-hover:text-[var(--brand)] transition-colors leading-snug">
                  <Link href={`/blog/${article.slug}/`}>{article.title}</Link>
                </h2>

                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed line-clamp-3">
                  {article.description}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-medium">
                  <User className="h-3.5 w-3.5 text-[var(--brand)]" />
                  <span>By {article.author}</span>
                </div>
                <Link
                  href={`/blog/${article.slug}/`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand)] hover:underline"
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
