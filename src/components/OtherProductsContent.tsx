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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--tx)] transition-colors duration-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[11px] font-bold text-[var(--accent)] uppercase tracking-wider">
            <Sparkles className="h-3 w-3" />
            <span>Developer Ecosystem Directory</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--tx)]">
            Our Products
          </h1>

          <p className="text-sm text-[var(--tx-2)] leading-relaxed">
            Developer platforms built by our team alongside <strong className="text-[var(--tx)]">ihatelovepdf</strong>.
          </p>

          {/* Search & Counter Bar */}
          <div className="pt-2 max-w-md mx-auto relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--tx-3)] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, keywords, or topics..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx)] placeholder:text-[var(--tx-3)] focus:outline-none focus:border-[var(--accent)] transition-colors shadow-xs"
            />
          </div>
        </header>

        {/* Matrix Grid: 3 Columns with Multiple Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                className={`surface-card rounded-2xl border border-[var(--border)] p-5 flex flex-col justify-between group transition-all duration-200 shadow-md ${product.borderHover} hover:shadow-lg relative overflow-hidden`}
              >
                {/* Background Glow */}
                <div
                  className={`absolute -right-12 -top-12 w-36 h-36 bg-gradient-to-br ${product.gradient} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform`}
                />

                {/* Top Card Info */}
                <div className="space-y-3.5 relative z-10">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${product.iconBg} ${product.iconColor}`}>
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono font-bold tracking-wider text-[var(--tx-3)] uppercase block leading-none">
                          {product.category}
                        </span>
                        <h2 className="text-base font-bold text-[var(--tx)] group-hover:text-[var(--accent)] transition-colors">
                          {product.name}
                        </h2>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--tx-2)] font-semibold shrink-0">
                      {product.badge}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--tx-2)] line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Highlights Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {product.highlights.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-[var(--bg)] border border-[var(--border)] text-[var(--tx-2)]"
                      >
                        <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Launch Link */}
                <div className="pt-4 mt-3 border-t border-[var(--border)] relative z-10">
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${product.ctaClass} font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer`}
                  >
                    <span>Visit {product.name.replace(/ ⚽/, '')}</span>
                    <ExternalLink className="h-3.5 w-3.5 stroke-[2.5]" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Philosophy & Return */}
        <footer className="surface-card rounded-2xl p-6 border border-[var(--border)] text-center space-y-3 max-w-2xl mx-auto">
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="h-4 w-4 fill-current" />
          </div>
          <h3 className="text-sm font-bold text-[var(--tx)]">
            Privacy-First Developer Tools
          </h3>
          <p className="text-xs text-[var(--tx-2)] leading-relaxed max-w-lg mx-auto">
            Built for developers, students, and engineers worldwide — zero trackers, high performance, and client compute.
          </p>
          <div className="pt-1">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:underline"
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
