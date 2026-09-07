import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Heart, ShieldCheck, ArrowRight, Sparkles, Layers, FileDown, ScissorsLineDashed } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Thank You | ihatelovepdf',
  description: 'Thank you for using ihatelovepdf. Your privacy is always protected with 100% local in-browser processing.',
  alternates: {
    canonical: 'https://ihatelovepdf.com/thank-you',
  },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-xl w-full text-center space-y-8 surface-card p-8 sm:p-12 rounded-3xl border border-[var(--border)] shadow-xl animate-fade-in">
        
        {/* Animated Badge Icon */}
        <div className="relative mx-auto w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center shadow-inner">
          <CheckCircle2 className="h-8 w-8" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500" />
          </span>
        </div>

        {/* Headings */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-xs font-bold uppercase tracking-wider">
            <Heart className="h-3.5 w-3.5 fill-current text-rose-500" />
            <span>We appreciate you</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--tx)]">
            Thank You!
          </h1>
          <p className="text-sm sm:text-base text-[var(--tx-2)] leading-relaxed max-w-md mx-auto">
            Your message, feedback, or support means the world to our independent project. We are constantly working to deliver the best free, privacy-first PDF tools.
          </p>
        </div>

        {/* Privacy Reassurance Card */}
        <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] text-left flex items-start gap-3 text-xs text-[var(--tx-2)]">
          <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-[var(--tx)] block">100% Private, Always</span>
            <p className="leading-normal">
              Remember that all PDF tasks run entirely on your device with zero cloud uploads and zero telemetry tracking.
            </p>
          </div>
        </div>

        {/* Quick Return Actions */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <span>Back to Home</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] hover:bg-[var(--bg-subtle)] text-[var(--tx)] font-semibold text-sm transition-all"
            >
              <Sparkles className="h-4 w-4 text-[var(--accent)]" />
              <span>Explore All Tools</span>
            </Link>
          </div>
        </div>

        {/* Top Tools Grid */}
        <div className="pt-6 border-t border-[var(--border)] space-y-3">
          <span className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider block">
            Popular Free Tools
          </span>
          <div className="grid grid-cols-3 gap-2 text-xs font-medium text-[var(--tx-2)]">
            <Link href="/merge" className="p-2.5 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex flex-col items-center gap-1.5">
              <Layers className="h-4 w-4" />
              <span>Merge PDF</span>
            </Link>
            <Link href="/compress" className="p-2.5 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex flex-col items-center gap-1.5">
              <FileDown className="h-4 w-4" />
              <span>Compress</span>
            </Link>
            <Link href="/split" className="p-2.5 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex flex-col items-center gap-1.5">
              <ScissorsLineDashed className="h-4 w-4" />
              <span>Split PDF</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
