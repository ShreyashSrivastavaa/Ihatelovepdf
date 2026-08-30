'use client';

import React, { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardSection from './DashboardSection';
import { TOOL_CATEGORIES } from '../../lib/tools-registry';
import FaqSection from '../faq-section';
import {
  Zap,
  Laptop,
  Lock,
  Menu,
  Shield,
  Infinity as InfinityIcon,
  Sparkles,
  Layers,
} from 'lucide-react';

export interface DashboardLayoutProps {
  hero: {
    title: string;
    subtitle: string;
    badges: string[];
  };
  why: {
    title: string;
    cards: Array<{ title: string; description: string }>;
  };
  routes: Record<string, string>;
  labels: Record<string, string>;
}

export default function DashboardLayout({
  hero,
  why,
  routes,
  labels,
}: DashboardLayoutProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Filter category sections based on active category selection
  const displayedCategories =
    activeCategory === 'all'
      ? TOOL_CATEGORIES
      : TOOL_CATEGORIES.filter((c) => c.id === activeCategory);

  const totalToolsCount = TOOL_CATEGORIES.reduce((acc, cat) => acc + cat.toolKeys.length, 0);

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (categoryId !== 'all') {
      const el = document.getElementById(`category-${categoryId}`);
      if (el) {
        const yOffset = -120;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--tx)]">
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* 1. DESKTOP PERSISTENT LEFT SIDEBAR */}
        <div className="hidden lg:block w-72 shrink-0 border-r border-[var(--border)] sticky top-16 h-[calc(100vh-64px)] bg-[var(--bg-card)]">
          <DashboardSidebar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeCategory={activeCategory}
            onSelectCategory={handleCategorySelect}
            routes={routes}
            labels={labels}
          />
        </div>

        {/* 2. MOBILE DRAWER OVERLAY */}
        {mobileDrawerOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileDrawerOpen(false)}
            />
            <div className="relative w-4/5 max-w-xs h-full z-10 animate-in slide-in-from-left duration-200 shadow-2xl">
              <DashboardSidebar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeCategory={activeCategory}
                onSelectCategory={handleCategorySelect}
                routes={routes}
                labels={labels}
                onCloseMobile={() => setMobileDrawerOpen(false)}
              />
            </div>
          </div>
        )}

        {/* 3. MAIN DASHBOARD CONTENT AREA */}
        <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-12 space-y-10 sm:space-y-14 max-w-6xl mx-auto">
          {/* Mobile Category Trigger Bar */}
          <div className="lg:hidden flex items-center justify-between p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-xs">
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              className="flex items-center gap-2 text-xs font-bold text-[var(--tx)] hover:text-[var(--accent)]"
            >
              <Menu className="h-4 w-4" />
              <span>Browse Catalog & Filter</span>
            </button>
            <span className="text-[10px] font-mono font-bold text-[var(--accent)] bg-[var(--accent-soft)] border border-[var(--accent-border)] px-2.5 py-1 rounded-lg">
              {totalToolsCount} TOOLS
            </span>
          </div>

          {/* DASHBOARD HERO HEADER */}
          <section className="space-y-6 pt-2">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--accent-border)] text-xs font-mono font-bold uppercase tracking-widest text-[var(--accent)]">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <span>Client-Side WebAssembly Toolkit &bull; 45 Tools</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--tx)] leading-[1.08]">
                {hero.title || 'All PDF Tools'}
              </h1>
              
              <p className="text-base sm:text-lg text-[var(--tx-2)] max-w-2.5xl font-normal leading-relaxed">
                {hero.subtitle || 'Complete suite of free, private, and client-side PDF tools running directly in your browser.'}
              </p>
            </div>

            {/* EDITORIAL TRUST STRIP (4 Pillars) */}
            <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-xs">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                <div className="flex items-center gap-3 pt-2 md:pt-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    <Zap className="h-4 w-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[var(--tx)]">100% Local WASM</div>
                    <div className="text-[11px] text-[var(--tx-3)]">Fast zero-wait engine</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 md:pt-0 md:pl-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <Shield className="h-4 w-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[var(--tx)]">Zero Network Uploads</div>
                    <div className="text-[11px] text-[var(--tx-3)]">Strict local memory</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 md:pt-0 md:pl-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20">
                    <InfinityIcon className="h-4 w-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[var(--tx)]">Unlimited Operations</div>
                    <div className="text-[11px] text-[var(--tx-3)]">No size or page caps</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 md:pt-0 md:pl-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
                    <Sparkles className="h-4 w-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[var(--tx)]">Zero Watermarks</div>
                    <div className="text-[11px] text-[var(--tx-3)]">100% free forever</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* INTERACTIVE CATEGORY QUICK FILTER BAR */}
          <div className="space-y-3 sticky top-16 z-20 py-2 -mx-4 px-4 sm:mx-0 sm:px-0 bg-[var(--bg)]/90 backdrop-blur-md border-y sm:border-y-0 border-[var(--border)]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <button
                  type="button"
                  onClick={() => handleCategorySelect('all')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shadow-xs ${
                    activeCategory === 'all'
                      ? 'bg-[var(--accent)] text-white'
                      : 'bg-[var(--bg-card)] border border-[var(--border)] text-[var(--tx-2)] hover:text-[var(--tx)] hover:border-[var(--border-hover)]'
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>All ({totalToolsCount})</span>
                </button>

                {TOOL_CATEGORIES.map((cat) => {
                  const isSelected = activeCategory === cat.id;
                  const CatIcon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shadow-xs ${
                        isSelected
                          ? 'bg-[var(--tx)] text-[var(--bg)] font-bold'
                          : 'bg-[var(--bg-card)] border border-[var(--border)] text-[var(--tx-2)] hover:text-[var(--tx)] hover:border-[var(--border-hover)]'
                      }`}
                    >
                      <CatIcon
                        className="h-3.5 w-3.5 shrink-0"
                        style={{ color: isSelected ? 'inherit' : cat.color }}
                      />
                      <span>{cat.name}</span>
                      <span className="text-[10px] opacity-60 font-mono">({cat.toolKeys.length})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* GROUPED CATEGORY SECTIONS WITH RESPONSIVE TOOL CARDS */}
          <div className="space-y-12 sm:space-y-16">
            {displayedCategories.map((category) => (
              <DashboardSection
                key={category.id}
                category={category}
                routes={routes}
                labels={labels}
                searchQuery={searchQuery}
              />
            ))}
          </div>

          {/* WHY ihatelovepdf / VALUE PROPOSITION */}
          <section className="py-8 border-t border-[var(--border)] space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--tx)]">
                {why.title}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--tx-2)] leading-relaxed">
                Designed for professionals who demand total data sovereignty, zero speed bottlenecks, and privacy guarantees across 45+ PDF tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {why.cards.map((card, idx) => {
                const icons = [Lock, Zap, Laptop];
                const CardIcon = icons[idx % icons.length];
                return (
                  <div
                    key={card.title}
                    className="surface-card p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-3 hover:border-[var(--accent-border)] transition-all duration-200 shadow-xs"
                  >
                    <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center border border-[var(--accent-border)] shadow-xs">
                      <CardIcon className="h-5 w-5 stroke-[1.8]" />
                    </div>
                    <h3 className="text-base font-bold text-[var(--tx)]">{card.title}</h3>
                    <p className="text-xs text-[var(--tx-2)] leading-relaxed">{card.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* FAQ ACCORDION */}
          <section className="py-8 border-t border-[var(--border)]">
            <FaqSection />
          </section>
        </main>
      </div>
    </div>
  );
}
