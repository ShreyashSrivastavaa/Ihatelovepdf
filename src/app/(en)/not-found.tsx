import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { METADATA_BASE } from "../../lib/metadata-shared";

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: "404: Page Not Found | I Hate Love PDF",
  description: "The page you were looking for doesn't exist. Explore our free and private browser PDF tools.",
  robots: {
    index: false,
    follow: false,
  },
};

const POPULAR_TOOLS = [
  { label: "Merge PDF", href: "/merge", desc: "Combine multiple PDFs into one document" },
  { label: "Compress PDF", href: "/compress", desc: "Reduce file size without quality loss" },
  { label: "Split PDF", href: "/split", desc: "Separate pages or extract page ranges" },
  { label: "Extract Pages", href: "/extract", desc: "Pick specific pages into a new file" },
  { label: "Edit PDF", href: "/edit-pdf", desc: "Add text, annotations, and shapes" },
  { label: "Redact PDF", href: "/redact", desc: "Permanently black out sensitive data" },
  { label: "PDF to Word", href: "/pdf-to-word", desc: "Convert PDF text into editable DOCX" },
  { label: "Rotate PDF", href: "/rotate", desc: "Change page orientation permanently" },
  { label: "Crop & Resize", href: "/crop", desc: "Trim margins and adjust document size" },
  { label: "Images to PDF", href: "/images-to-pdf", desc: "Convert JPG and PNG images to PDF" },
  { label: "Sign PDF", href: "/sign-pdf", desc: "Draw or place digital signatures" },
  { label: "Protect PDF", href: "/protect-pdf", desc: "Encrypt with AES password protection" },
];

const LOCALES = [
  { label: "Español", href: "/es" },
  { label: "Deutsch", href: "/de" },
  { label: "Français", href: "/fr" },
  { label: "Italiano", href: "/it" },
  { label: "Português", href: "/pt" },
  { label: "Magyar", href: "/hu" },
  { label: "Română", href: "/ro" },
  { label: "Русский", href: "/ru" },
];

export default function NotFound() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
      {/* Visual Badge with Sticker */}
      <div className="relative mb-6">
        <Image
          src="/images/stickers/ihatelovepdf_logo_processed.webp"
          alt="ihatelovepdf mascot"
          width={100}
          height={100}
          className="w-24 h-auto drop-shadow-sm select-none"
          priority
          unoptimized
        />
        <span className="absolute -top-2 -right-3 inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-bold bg-[var(--color-primary)] text-[var(--color-main)] shadow-sm rotate-6">
          404
        </span>
      </div>

      {/* Main Heading & Message */}
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-main)] mb-3">
        Page Not Found
      </h1>
      <p className="text-sm md:text-base text-[var(--color-muted)] max-w-lg mb-8 leading-relaxed">
        The link you followed doesn&apos;t exist or was moved. Everything here still runs 100% locally in your browser — pick a tool below or head back home.
      </p>

      {/* Main Action CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-[var(--color-primary)] text-[var(--color-main)] hover:opacity-95 transition-all shadow-sm"
        >
          Back to Home
        </Link>
        <Link
          href="/tools"
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-main)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all shadow-sm"
        >
          Browse All 36 Tools
        </Link>
      </div>

      {/* Popular Tools Grid */}
      <div className="w-full border-t border-[var(--color-border)] pt-10 mb-10 text-left">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)]">
            Popular PDF Tools
          </h2>
          <span className="text-xs text-[var(--color-muted)]">Runs in browser RAM</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {POPULAR_TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group p-3.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-sm font-medium text-[var(--color-main)] group-hover:text-[var(--color-primary)] transition-colors">
                  {tool.label}
                </span>
                <p className="text-xs text-[var(--color-muted)] mt-1 line-clamp-1">
                  {tool.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Other Languages */}
      <div className="w-full pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--color-muted)]">
        <span>Available in other languages:</span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {LOCALES.map((locale) => (
            <Link
              key={locale.href}
              href={locale.href}
              className="px-2 py-1 rounded border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              {locale.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

