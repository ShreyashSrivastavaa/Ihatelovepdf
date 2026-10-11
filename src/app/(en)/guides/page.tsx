import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar, BookOpen } from 'lucide-react';
import { GUIDES_DATA } from '../../_data/guides-data';

export const metadata: Metadata = {
  title: 'PDF How-To Guides and Tutorials',
  description:
    'Step by step tutorials and practical guides for merging, compressing, splitting, redacting, and converting PDFs with private in-browser tools.',
  alternates: {
    canonical: 'https://ihatelovepdf.com/guides/',
  },
};

export default function GuidesIndexPage() {
  const guides = Object.values(GUIDES_DATA);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--tx)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        {/* Header */}
        <section className="space-y-4 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] text-xs font-semibold text-[var(--accent)]">
            <BookOpen className="h-4 w-4" />
            <span>Step-by-Step PDF Tutorials</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            How-To Guides &amp; Walkthroughs
          </h1>
          <p className="text-base sm:text-lg text-[var(--tx-2)] leading-relaxed">
            Practical, step-by-step tutorials on how to process, optimize, protect, and manage your PDF files directly in your browser with zero server uploads.
          </p>
        </section>

        {/* How-To Panels Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <article
              key={guide.slug}
              className="surface-card rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 sm:p-7 flex flex-col justify-between space-y-5 hover:border-[var(--accent-border)] hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                {/* Meta Badge Bar */}
                <div className="flex items-center justify-between gap-2 text-xs text-[var(--tx-3)]">
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-semibold border border-[var(--accent-border)]">
                    {guide.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {guide.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {guide.date}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-lg sm:text-xl font-bold text-[var(--tx)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                  <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[var(--tx-2)] leading-relaxed">
                  {guide.description}
                </p>

                {/* Quick Step Preview Panel */}
                {guide.steps && guide.steps.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] space-y-2">
                    <span className="text-[11px] font-bold text-[var(--tx-3)] uppercase tracking-wider block">
                      Quick Steps
                    </span>
                    <ol className="space-y-1.5 text-xs text-[var(--tx-2)]">
                      {guide.steps.slice(0, 3).map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[10px] font-bold text-[var(--accent)]">
                            {idx + 1}
                          </span>
                          <span className="line-clamp-1">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between gap-3">
                <Link
                  href={`/guides/${guide.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent)] group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <Link
                  href={`/${guide.toolSlug}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-xs font-semibold text-[var(--tx)] hover:border-[var(--accent-border)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] transition-all"
                >
                  <span>Launch Tool</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
