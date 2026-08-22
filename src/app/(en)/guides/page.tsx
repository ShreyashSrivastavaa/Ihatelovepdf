import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, Clock, Calendar } from 'lucide-react';
import { GUIDES_DATA } from '../../_data/guides-data';

export const metadata: Metadata = {
  title: 'PDF Privacy Guides & Tool Comparisons | ihatelovepdf',
  description:
    'Step-by-step guides on PDF redaction, in-browser OCR, and deep-dive comparisons between ihatelovepdf vs iLovePDF and Smallpdf.',
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--success-border)] bg-[var(--success-soft)] text-xs font-semibold text-[var(--tx)]">
            <ShieldCheck className="h-4 w-4 text-[var(--success)]" />
            <span>Privacy-First Guides & Tutorials</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            PDF Guides & Comparisons
          </h1>
          <p className="text-base sm:text-lg text-[var(--tx-2)] leading-relaxed">
            In-depth tutorials, privacy walkthroughs, and honest technical comparisons for managing documents with zero server uploads.
          </p>
        </section>

        {/* Guides Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <article
              key={guide.slug}
              className="surface-card p-6 sm:p-7 flex flex-col justify-between space-y-4 hover:border-[var(--accent-border)] transition-all group"
            >
              <div className="space-y-3">
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

                <h2 className="text-lg sm:text-xl font-bold text-[var(--tx)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                  <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
                </h2>

                <p className="text-xs sm:text-sm text-[var(--tx-2)] leading-relaxed line-clamp-3">
                  {guide.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between">
                <Link
                  href={`/guides/${guide.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent)] group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                {guide.toolSlug && (
                  <Link
                    href={`/${guide.toolSlug}`}
                    className="text-xs text-[var(--tx-3)] hover:text-[var(--tx)] transition-colors"
                  >
                    Open Tool &rarr;
                  </Link>
                )}
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
