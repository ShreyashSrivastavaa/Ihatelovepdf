import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ShieldCheck, Sparkles, Clock, Calendar, HelpCircle, ExternalLink } from 'lucide-react';
import { GUIDES_DATA } from '../../../_data/guides-data';

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

  return {
    title: `${guide.title} | ihatelovepdf Guides`,
    description: guide.description,
    alternates: {
      canonical: `https://ihatelovepdf.com/guides/${guide.slug}/`,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `https://ihatelovepdf.com/guides/${guide.slug}/`,
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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--tx)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14 space-y-10">
        {/* Back Link */}
        <div>
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--tx-2)] hover:text-[var(--tx)] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Guides</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-3 text-xs text-[var(--tx-3)]">
            <span className="px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-semibold border border-[var(--accent-border)]">
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

          <p className="text-base sm:text-lg text-[var(--tx-2)] leading-relaxed">
            {guide.description}
          </p>
        </header>

        {/* Key Takeaways Box */}
        <section className="surface-card p-6 rounded-2xl border border-[var(--accent-border)] bg-[var(--accent-soft)]/20 space-y-3">
          <h2 className="text-sm font-bold text-[var(--tx)] flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[var(--accent)]" />
            Key Takeaways
          </h2>
          <ul className="space-y-2">
            {guide.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--tx-2)]">
                <CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Interactive Tool Banner if applicable */}
        {guide.toolSlug && (
          <section className="p-5 rounded-2xl border border-[var(--success-border)] bg-[var(--success-soft)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[var(--tx)] flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[var(--success)]" />
                Ready to try this in your browser?
              </span>
              <p className="text-xs text-[var(--tx-2)]">
                Open our browser tool with no server uploads and no watermarks.
              </p>
            </div>
            <Link
              href={`/${guide.toolSlug}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold shadow-sm transition-colors shrink-0"
            >
              <span>Launch Tool</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </section>
        )}

        {/* Step-by-Step Walkthrough if applicable */}
        {guide.steps && guide.steps.length > 0 && (
          <section className="surface-card p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-[var(--accent)]" />
              Step-by-Step Instructions
            </h2>
            <ol className="space-y-4">
              {guide.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[var(--tx-2)]">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-bold text-[var(--accent)] border border-[var(--accent-border)]">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Main Content Paragraphs */}
        <section className="space-y-6 text-sm sm:text-base text-[var(--tx-2)] leading-relaxed">
          {guide.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </section>

        {/* Bottom CTA */}
        <section className="pt-8 border-t border-[var(--border)] text-center space-y-4">
          <h3 className="text-lg font-bold text-[var(--tx)]">
            Private PDF Processing with No Server Uploads
          </h3>
          <p className="text-xs sm:text-sm text-[var(--tx-2)] max-w-lg mx-auto">
            Try all 46 tools free with no file limits, no registration, and no tracking.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold shadow-md transition-colors"
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
