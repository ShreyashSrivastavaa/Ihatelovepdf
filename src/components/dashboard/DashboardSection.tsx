'use client';

import React from 'react';
import Link from 'next/link';
import { ToolCategory, FEATURED_TOOLS } from '../../lib/tools-registry';
import { ICON_MAP, TOOL_DESCRIPTIONS } from '../ToolSwitcher';
import { ArrowRight, Sparkles } from 'lucide-react';

interface DashboardSectionProps {
  category: ToolCategory;
  routes: Record<string, string>;
  labels: Record<string, string>;
  searchQuery?: string;
}

export default function DashboardSection({
  category,
  routes,
  labels,
  searchQuery = '',
}: DashboardSectionProps) {
  const CategoryIcon = category.icon;

  const matchingTools = category.toolKeys.filter((key) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const label = labels[key] || key;
    const desc = TOOL_DESCRIPTIONS[key] || '';
    return label.toLowerCase().includes(q) || desc.toLowerCase().includes(q) || category.name.toLowerCase().includes(q);
  });

  if (matchingTools.length === 0) return null;

  return (
    <section
      id={`category-${category.id}`}
      className="space-y-4 scroll-mt-24"
      aria-labelledby={`heading-${category.id}`}
    >
      {/* Category Section Eyebrow & Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-[var(--border)]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-mono font-black uppercase tracking-widest px-2 py-0.5 rounded-md"
              style={{
                backgroundColor: category.bgSoft,
                color: category.color,
              }}
            >
              {category.tag}
            </span>
            <span className="text-xs text-[var(--tx-3)] font-mono">
              {matchingTools.length} {matchingTools.length === 1 ? 'Tool' : 'Tools'}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg shadow-xs"
              style={{
                backgroundColor: category.bgSoft,
                color: category.color,
              }}
            >
              <CategoryIcon className="h-4 w-4" />
            </div>
            <h2
              id={`heading-${category.id}`}
              className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--tx)]"
            >
              {category.name}
            </h2>
          </div>
        </div>

        <p className="text-xs text-[var(--tx-2)] max-w-md">
          {category.description}
        </p>
      </div>

      {/* Modern Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {matchingTools.map((toolKey) => {
          const ToolIcon = ICON_MAP[toolKey] || CategoryIcon;
          const name = labels[toolKey] || toolKey;
          const description = TOOL_DESCRIPTIONS[toolKey] || 'Fast client-side PDF tool with zero uploads.';
          const href = routes[toolKey] || `/${toolKey}`;
          const isFeatured = FEATURED_TOOLS.includes(toolKey);

          return (
            <Link
              key={toolKey}
              href={href}
              prefetch={true}
              className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl border transition-all duration-200 select-none shadow-xs hover:-translate-y-1 ${
                isFeatured
                  ? 'border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] hover:shadow-md'
                  : 'border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] hover:shadow-sm'
              }`}
            >
              <div className="space-y-3">
                {/* Header: Icon & Category Indicator */}
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-105 shadow-xs"
                    style={{
                      backgroundColor: category.bgSoft,
                      color: category.color,
                      border: `1px solid ${category.borderAccent}`,
                    }}
                  >
                    <ToolIcon className="h-5 w-5 stroke-[1.8]" />
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isFeatured && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider uppercase bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)]">
                        <Sparkles className="h-2.5 w-2.5" />
                        Core
                      </span>
                    )}
                    <div className="h-7 w-7 rounded-lg flex items-center justify-center text-[var(--tx-3)] group-hover:text-[var(--accent)] group-hover:bg-[var(--accent-soft)] transition-colors">
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>

                {/* Content: Bold Title + Description */}
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-[var(--tx)] group-hover:text-[var(--accent)] transition-colors tracking-tight">
                    {name}
                  </h3>
                  <p className="text-xs text-[var(--tx-2)] leading-relaxed line-clamp-2">
                    {description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
