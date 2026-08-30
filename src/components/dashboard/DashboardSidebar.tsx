'use client';

import React from 'react';
import Link from 'next/link';
import { Search, X, LayoutGrid } from 'lucide-react';
import { TOOL_CATEGORIES, ToolCategory } from '../../lib/tools-registry';
import { ICON_MAP } from '../ToolSwitcher';

interface DashboardSidebarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
  routes: Record<string, string>;
  labels: Record<string, string>;
  className?: string;
  onCloseMobile?: () => void;
}

export default function DashboardSidebar({
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
  routes,
  labels,
  className = '',
  onCloseMobile,
}: DashboardSidebarProps) {
  const handleCategoryClick = (e: React.MouseEvent, categoryId: string) => {
    e.preventDefault();
    onSelectCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const yOffset = -90; // offset for sticky navigation
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    if (onCloseMobile) onCloseMobile();
  };

  const filterCategory = (category: ToolCategory) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    if (category.name.toLowerCase().includes(q) || category.tag.toLowerCase().includes(q)) return true;
    return category.toolKeys.some((key) => {
      const label = labels[key] || key;
      return label.toLowerCase().includes(q);
    });
  };

  const filteredCategories = TOOL_CATEGORIES.filter(filterCategory);

  return (
    <aside
      className={`flex flex-col h-full bg-[var(--bg-card)] border-r border-[var(--border)] select-none ${className}`}
      aria-label="Tools Dashboard Sidebar"
    >
      {/* 1. Sidebar Top Header */}
      <div className="p-4 border-b border-[var(--border)] space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-extrabold text-sm tracking-tight text-[var(--tx)]">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)] shadow-xs">
              <LayoutGrid className="h-4 w-4 stroke-[2.2]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span>Catalog</span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-[var(--bg-subtle)] text-[var(--tx-2)] border border-[var(--border)]">
                45 TOOLS
              </span>
            </div>
          </div>

          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-[var(--tx-3)] hover:text-[var(--tx)] hover:bg-[var(--bg-subtle)]"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Search input with sleek keyboard hint */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--tx-3)]" />
          <input
            type="text"
            placeholder="Search tools or category..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-[var(--bg)] border border-[var(--border)] text-[var(--tx)] placeholder:text-[var(--tx-3)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent-border)] transition-all font-medium"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-[var(--tx-3)] hover:text-[var(--tx)]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Scrollable Category & Tool Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-5 scrollbar-thin">
        {filteredCategories.map((category) => {
          const isActive = activeCategory === category.id;
          const matchingTools = category.toolKeys.filter((key) => {
            if (!searchQuery.trim()) return true;
            const q = searchQuery.toLowerCase();
            const label = labels[key] || key;
            return label.toLowerCase().includes(q) || category.name.toLowerCase().includes(q);
          });

          if (matchingTools.length === 0) return null;

          return (
            <div key={category.id} className="space-y-1">
              {/* Category Anchor Heading with category color indicator pip */}
              <button
                type="button"
                onClick={(e) => handleCategoryClick(e, category.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all text-left ${
                  isActive
                    ? 'text-[var(--tx)] bg-[var(--bg-subtle)] shadow-xs'
                    : 'text-[var(--tx-3)] hover:text-[var(--tx)] hover:bg-[var(--bg-subtle)]/60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: category.color }}
                  />
                  <span>{category.name}</span>
                </div>
                <span className="text-[10px] font-mono text-[var(--tx-3)] opacity-60">
                  {category.toolKeys.length}
                </span>
              </button>

              {/* Compact Tool Items with active blade indicator */}
              <ul className="space-y-0.5 pl-1.5 pt-0.5 border-l border-[var(--border)]/50 ml-3" role="list">
                {matchingTools.map((toolKey) => {
                  const Icon = ICON_MAP[toolKey] || category.icon;
                  const label = labels[toolKey] || toolKey;
                  const href = routes[toolKey] || `/${toolKey}`;

                  return (
                    <li key={toolKey}>
                      <Link
                        href={href}
                        onClick={() => {
                          if (onCloseMobile) onCloseMobile();
                        }}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-[var(--tx-2)] hover:text-[var(--tx)] hover:bg-[var(--bg-subtle)] transition-colors group"
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--tx-3)] group-hover:text-[var(--accent)] transition-colors" />
                        <span className="truncate font-medium">{label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        {filteredCategories.length === 0 && (
          <div className="py-10 text-center text-xs text-[var(--tx-3)] space-y-2">
            <p>No tools found for &quot;{searchQuery}&quot;</p>
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="text-[var(--accent)] hover:underline font-bold"
            >
              Reset search
            </button>
          </div>
        )}
      </nav>
    </aside>
  );
}
