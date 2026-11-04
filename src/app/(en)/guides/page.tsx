import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar, BookOpen } from 'lucide-react';
import { GUIDES_DATA } from '../../_data/guides-data';

export const metadata: Metadata = {
  title: 'PDF How-To Guides and Tutorials',
  description:
    'Step by step tutorials and practical guides for merging, compressing, splitting, redacting, and converting PDFs with private in-browser tools.',
  alternates: {
    canonical: 'https://www.ihatelovepdf.com/guides/',
  },
};

export default function GuidesIndexPage() {
  const guides = Object.values(GUIDES_DATA);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16 space-y-10">
        {/* Header */}
        <section className="space-y-3 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--brand)]/20 bg-[var(--brand-soft)] text-xs font-semibold text-[var(--brand)]">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Step-by-Step PDF Tutorials</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            How-To Guides &amp; Walkthroughs
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            Practical, step-by-step tutorials on how to process, optimize, protect, and manage your PDF files directly in your browser with zero server uploads.
          </p>
        </section>

        {/* How-To Panels Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {guides.map((guide) => (
            <article
              key={guide.slug}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 flex flex-col justify-between space-y-4 hover:border-[var(--brand)] transition-all duration-150 group"
            >
              <div className="space-y-3.5">
                {/* Meta Badge Bar */}
                <div className="flex items-center justify-between gap-2 text-xs text-[var(--text-muted)]">
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] font-semibold border border-[var(--brand)]/20">
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
                <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] group-hover:text-[var(--brand)] transition-colors leading-snug">
                  <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  {guide.description}
                </p>

                {/* Quick Step Preview Panel */}
                {guide.steps && guide.steps.length > 0 && (
                  <div className="p-3 rounded-lg bg-[var(--subtle)] border border-[var(--border)] space-y-1.5">
                    <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                      Quick Steps
                    </span>
                    <ol className="space-y-1 text-xs text-[var(--text-muted)]">
                      {guide.steps.slice(0, 3).map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-soft)] text-[10px] font-bold text-[var(--brand)]">
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
              <div className="pt-3.5 border-t border-[var(--border)] flex items-center justify-between gap-3">
                <Link
                  href={`/guides/${guide.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand)] group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <Link
                  href={`/${guide.toolSlug}`}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--subtle)] text-xs font-medium text-[var(--text-main)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-all"
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
