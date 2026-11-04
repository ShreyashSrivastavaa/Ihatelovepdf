import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ShieldCheck, Sparkles, Clock, Calendar, HelpCircle, ExternalLink } from 'lucide-react';
import { GUIDES_DATA } from '../../../_data/guides-data';

import { METADATA_BASE } from '../../../../lib/metadata-shared';
import { SITE_URL } from '../../../../lib/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(GUIDES_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES_DATA[slug];

  if (!guide) {
    return {};
  }

  const canonicalUrl = `${SITE_URL}/guides/${guide.slug}/`;

  return {
    metadataBase: METADATA_BASE,
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: canonicalUrl,
      type: 'article',
    },
  };
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = GUIDES_DATA[slug];

  if (!guide) {
    notFound();
  }

  const howToSchema = guide.steps
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: guide.title,
        description: guide.description,
        step: guide.steps.map((step, idx) => ({
          '@type': 'HowToStep',
          position: idx + 1,
          text: step,
        })),
      }
    : null;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14 space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Guides</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-3.5">
          <div className="flex items-center gap-2.5 text-xs text-[var(--text-muted)]">
            <span className="px-2.5 py-0.5 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] font-semibold border border-[var(--brand)]/20">
              {guide.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {guide.readTime}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {guide.date}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            {guide.title}
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            {guide.description}
          </p>
        </header>

        {/* Key Takeaways Box */}
        <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5">
          <h2 className="text-xs sm:text-sm font-semibold text-[var(--text-main)] flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[var(--accent)]" />
            Key Takeaways
          </h2>
          <ul className="space-y-1.5">
            {guide.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--text-muted)]">
                <CheckCircle2 className="h-3.5 w-3.5 text-[var(--brand)] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Interactive Tool Banner if applicable */}
        {guide.toolSlug && (
          <section className="p-4 sm:p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-[var(--text-main)] flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                Ready to try this in your browser?
              </span>
              <p className="text-xs text-[var(--text-muted)]">
                Open our browser tool with no server uploads and no watermarks.
              </p>
            </div>
            <Link
              href={`/${guide.toolSlug}`}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--brand)] text-white text-xs font-medium hover:opacity-95 transition-opacity shrink-0"
            >
              <span>Launch Tool</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </section>
        )}

        {/* Step-by-Step Walkthrough if applicable */}
        {guide.steps && guide.steps.length > 0 && (
          <section className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-4">
            <h2 className="text-base sm:text-lg font-bold flex items-center gap-2 text-[var(--text-main)]">
              <HelpCircle className="h-4 w-4 text-[var(--brand)]" />
              Step-by-Step Instructions
            </h2>
            <ol className="space-y-3">
              {guide.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-muted)]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-soft)] text-xs font-bold text-[var(--brand)] border border-[var(--brand)]/20">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Main Content Paragraphs */}
        <section className="space-y-4 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
          {guide.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </section>

        {/* Bottom CTA */}
        <section className="pt-6 border-t border-[var(--border)] text-center space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)]">
            Private PDF Processing with No Server Uploads
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-lg mx-auto">
            Try all 46 tools free with no file limits, no registration, and no tracking.
          </p>
          <div className="pt-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--brand)] text-white text-xs font-medium hover:opacity-95 transition-opacity"
            >
              <span>Explore All PDF Tools</span>
            </Link>
          </div>
        </section>

        {howToSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
          />
        )}
      </div>
    </div>
  );
}
