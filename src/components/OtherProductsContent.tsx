'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ExternalLink,
  CodeXml,
  Network,
  Sparkles,
  Trophy,
  ArrowRight,
  Heart,
  Search,
  CheckCircle2
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  url: string;
  badge: string;
  category: string;
  description: string;
  highlights: string[];
  gradient: string;
  borderHover: string;
  iconBg: string;
  iconColor: string;
  ctaClass: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PRODUCTS: Product[] = [
  {
    id: 'snapdevcode',
    name: 'SnapDevCode',
    url: 'https://www.snapdevcode.com/',
    badge: 'OA & DSA Platform',
    category: 'INTERVIEWS & VISUALIZERS',
    description:
      '4,200+ real Company Online Assessment questions from Google, Amazon & Meta with Gemini AI vision extractor and WebAudio DSA visualizers.',
    highlights: ['4,200+ OA Questions', 'AI Screenshot Parser', 'Code-to-Image 4x'],
    gradient: 'from-cyan-500/10 to-teal-500/10',
    borderHover: 'hover:border-cyan-500/50',
    iconBg: 'bg-cyan-500/15 border-cyan-500/30',
    iconColor: 'text-cyan-400',
    ctaClass: 'from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black',
    icon: CodeXml,
  },
  {
    id: 'systemdesign',
    name: 'SystemDesign.website',
    url: 'https://systemdesign.website/',
    badge: '61 Modules Live',
    category: 'DISTRIBUTED ARCHITECTURE',
    description:
      'The interactive masterclass for High-Level System Design: microservices, sharding, caching, and real case studies of Netflix, Uber & YouTube.',
    highlights: ['61+ Interactive Modules', 'Architecture Studio', 'Cloud Case Studies'],
    gradient: 'from-sky-500/10 to-indigo-500/10',
    borderHover: 'hover:border-sky-500/50',
    iconBg: 'bg-sky-500/15 border-sky-500/30',
    iconColor: 'text-sky-400',
    ctaClass: 'from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white',
    icon: Network,
  },
  {
    id: 'gitfc',
    name: 'GitFC ⚽',
    url: 'https://gitfc.vercel.app/',
    badge: 'EA FC Developer Cards',
    category: 'GAMIFIED GITHUB STATS',
    description:
      'Turn your GitHub stats into authentic EA FC Ultimate Team player cards with dynamic OVR ratings, radar stats, and 3D pack opening reveals.',
    highlights: ['EA FC Player Cards', '3D Pack Opening', 'Squad Leaderboards'],
    gradient: 'from-amber-500/10 to-emerald-500/10',
    borderHover: 'hover:border-amber-500/50',
    iconBg: 'bg-amber-500/15 border-amber-500/30',
    iconColor: 'text-amber-400',
    ctaClass: 'from-amber-500 via-yellow-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-black',
    icon: Trophy,
  },
];

export default function OtherProductsContent() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-150 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--brand-soft)] border border-[var(--brand)]/20 text-xs font-semibold text-[var(--brand)] uppercase tracking-wider">
            <Sparkles className="h-3 w-3" />
            <span>Developer Ecosystem Directory</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-main)]">
            Our Products
          </h1>

          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Developer platforms built by our team alongside <strong className="text-[var(--text-main)]">ihatelovepdf</strong>.
          </p>

          {/* Search & Counter Bar */}
          <div className="pt-2 max-w-md mx-auto relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-muted)] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, keywords, or topics..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand)] transition-colors"
            />
          </div>
        </header>

        {/* Matrix Grid: 3 Columns with Multiple Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredProducts.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 flex flex-col justify-between group transition-all duration-150 hover:border-[var(--brand)] relative overflow-hidden"
              >
                {/* Top Card Info */}
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${product.iconBg} ${product.iconColor}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono font-semibold tracking-wider text-[var(--text-muted)] uppercase block leading-none">
                          {product.category}
                        </span>
                        <h2 className="text-base font-bold text-[var(--text-main)] group-hover:text-[var(--brand)] transition-colors">
                          {product.name}
                        </h2>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[var(--subtle)] border border-[var(--border)] text-[var(--text-muted)] font-medium shrink-0">
                      {product.badge}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--text-muted)] line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Highlights Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {product.highlights.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-[var(--subtle)] border border-[var(--border)] text-[var(--text-muted)]"
                      >
                        <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Launch Link */}
                <div className="pt-3.5 mt-3 border-t border-[var(--border)] relative z-10">
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--subtle)] hover:border-[var(--brand)] hover:text-[var(--brand)] font-semibold text-xs transition-colors cursor-pointer text-[var(--text-main)]"
                  >
                    <span>Visit {product.name.replace(/ ⚽/, '')}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Philosophy & Return */}
        <footer className="rounded-xl p-6 border border-[var(--border)] bg-[var(--card)] text-center space-y-2.5 max-w-xl mx-auto">
          <div className="w-8 h-8 rounded-lg bg-[var(--brand-soft)] border border-[var(--brand)]/20 text-[var(--brand)] flex items-center justify-center mx-auto">
            <Heart className="h-4 w-4 fill-current" />
          </div>
          <h3 className="text-sm font-bold text-[var(--text-main)]">
            Privacy-Focused Developer Tools
          </h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-md mx-auto">
            Built for developers, students, and engineers around the world with no trackers, fast performance, and local processing.
          </p>
          <div className="pt-1">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--brand)] hover:underline"
            >
              <span>Back to ihatelovepdf tools</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </footer>

      </div>
    </div>
  );
}
