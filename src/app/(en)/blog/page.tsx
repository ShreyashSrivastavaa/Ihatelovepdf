import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Sparkles, User } from 'lucide-react';
import { BLOG_ARTICLES } from '../../_data/blog-data';
import { METADATA_BASE, SHARED_ICONS, SHARED_OPEN_GRAPH, SHARED_TWITTER } from '../../../lib/metadata-shared';
import { SITE_URL } from '../../../lib/site';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: 'PDF Guides and Tutorials Blog',
  description: 'In-depth, practical guides on merging, compressing, signing, redacting, and editing PDF files safely in your browser without software installations.',
  alternates: {
    canonical: `${SITE_URL}/blog/`,
  },
  icons: SHARED_ICONS,
  openGraph: {
    ...SHARED_OPEN_GRAPH,
    title: 'PDF Guides & Tutorials: Free In-Browser Workflows | I Hate Love PDF',
    description: 'In-depth, practical guides on merging, compressing, signing, redacting, and editing PDF files safely in your browser without software installations.',
    url: `${SITE_URL}/blog/`,
  },
  twitter: SHARED_TWITTER,
};

export default function BlogIndexPage() {
  const articles = Object.values(BLOG_ARTICLES);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--tx)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] text-xs font-semibold text-[var(--accent)]">
            <Sparkles className="h-4 w-4" />
            <span>Practical PDF Knowledge</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--tx)] leading-tight">
            PDF Guides, Tutorials & Tips
          </h1>
          <p className="text-base sm:text-lg text-[var(--tx-2)] leading-relaxed">
            Written by founder Shreyash Srivastava. Learn how to optimize, protect, and manipulate your documents cleanly and privately without paying for heavy desktop suites.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="surface-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between hover:border-[var(--accent-border)] transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[var(--tx-3)]">
                  <span className="px-2.5 py-1 rounded-md bg-[var(--bg-subtle)] font-medium text-[var(--tx)] border border-[var(--border)]">
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

                <h2 className="text-xl font-bold tracking-tight text-[var(--tx)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                  <Link href={`/blog/${article.slug}/`}>{article.title}</Link>
                </h2>

                <p className="text-sm text-[var(--tx-2)] leading-relaxed line-clamp-3">
                  {article.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[var(--tx-2)] font-medium">
                  <User className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span>By {article.author}</span>
                </div>
                <Link
                  href={`/blog/${article.slug}/`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent)] hover:underline"
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
