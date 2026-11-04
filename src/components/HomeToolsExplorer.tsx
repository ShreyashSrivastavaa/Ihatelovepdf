'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ICON_MAP } from './ToolSwitcher';
import { Search, X, Wrench } from 'lucide-react';

export interface ToolExplorerItem {
  key: string;
  name: string;
  description: string;
  href: string;
  category: string;
  badge?: string;
}

const CATEGORIES = [
  'All',
  'Organize',
  'Optimize',
  'Convert',
  'Edit',
  'Security',
  'AI-Powered',
  'Workflows',
] as const;

const CATEGORY_MAP: Record<string, string[]> = {
  Organize: ['merge', 'split', 'compress', 'extract', 'crop', 'rotate', 'reorder', 'pdfToZip'],
  Optimize: ['compress', 'crop', 'invertColors'],
  Convert: [
    'pdfToWord',
    'wordToPdf',
    'imagesToPdf',
    'pdfToImages',
    'excelToPdf',
    'pdfToExcel',
    'powerpointToPdf',
    'pdfToPowerpoint',
    'htmlToPdf',
    'pdfToHtml',
    'markdownToPdf',
    'csvToPdf',
    'pdfToEpub',
    'ebookToPdf',
  ],
  Edit: ['editPdf', 'fillPdfForm', 'watermark', 'pageNumbers', 'headersFooters'],
  Security: ['signPdf', 'redact', 'compare'],
  'AI-Powered': ['extractText', 'latexResume'],
  Workflows: ['scanToPdf', 'whiteboard', 'createPdf', 'gstInvoice', 'posBilling'],
};

interface HomeToolsExplorerProps {
  tools: ToolExplorerItem[];
}

export default function HomeToolsExplorer({ tools }: HomeToolsExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Press "/" to focus search, "Escape" to blur
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        const activeTag = document.activeElement?.tagName.toLowerCase();
        if (activeTag !== 'input' && activeTag !== 'textarea') {
          e.preventDefault();
          searchInputRef.current?.focus();
        }
      } else if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        searchInputRef.current?.blur();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter tools based on query and category
  const filteredTools = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return tools.filter((tool) => {
      // Category filter
      if (selectedCategory !== 'All') {
        const categoryKeys = CATEGORY_MAP[selectedCategory] || [];
        if (!categoryKeys.includes(tool.key)) {
          return false;
        }
      }

      // Search query filter
      if (!q) return true;
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.key.toLowerCase().includes(q)
      );
    });
  }, [tools, searchQuery, selectedCategory]);

  return (
    <div id="tools" className="pt-2 sm:pt-4" style={{ scrollMarginTop: 'var(--app-header-height)' }}>
      {/* TOOLBAR: Search Input + Category Filter Pills */}
      <section className="mb-8 md:mb-10">
        <div className="flex flex-col items-stretch justify-center gap-3 sm:items-center sm:gap-4 xl:flex-row">
          
          {/* Search Bar with "/" hint */}
          <div className="relative w-full sm:w-[320px] lg:w-[360px] sm:shrink-0">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary"
            />
            <input
              ref={searchInputRef}
              type="search"
              aria-label="Search PDF tools"
              aria-controls="tool-results"
              aria-describedby="tool-search-status"
              placeholder="Search by task or format..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full appearance-none pl-10 pr-10 py-2.5 border border-border rounded-[8px] bg-main text-primary text-sm placeholder:text-secondary focus:outline-none focus:border-brand transition-colors duration-150"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary p-0.5 rounded cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="-mx-4 w-auto min-w-0 overflow-x-auto scrollbar-none px-4 sm:mx-0 sm:w-full sm:overflow-visible sm:px-0 xl:w-auto xl:flex-1">
            <div
              className="flex w-max gap-1.5 sm:w-full sm:flex-wrap sm:justify-center xl:mx-auto xl:w-max xl:flex-nowrap"
              role="group"
              aria-label="Tool categories"
            >
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedCategory(category)}
                    className={`shrink-0 whitespace-nowrap px-3 py-2 text-sm font-medium rounded-[8px] border transition-colors duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-main border-primary'
                        : 'bg-main text-secondary border-border hover:border-hover hover:text-primary'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Tool Count Status Line */}
        <p
          id="tool-search-status"
          aria-live="polite"
          className="mt-3 min-h-5 text-center text-xs text-secondary"
        >
          {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} available
          <span className="hidden md:inline">
            {' '}· Press{' '}
            <kbd className="px-1.5 py-0.5 rounded border border-border bg-alt text-[10px] font-mono text-secondary">
              /
            </kbd>{' '}
            to search
          </span>
        </p>
      </section>

      {/* TOOL GRID: Uniform Minimal Cards */}
      <section id="tool-results" className="mb-14 md:mb-20" aria-label="Tool results">
        {filteredTools.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-[12px] bg-main p-8 max-w-md mx-auto">
            <p className="text-base font-semibold text-primary mb-1">No tools matched your search</p>
            <p className="text-xs text-secondary mb-4">
              Try a different keyword or switch to another category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-alt text-xs font-medium text-primary hover:border-hover transition-colors cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {filteredTools.map((tool) => {
              const ToolIcon = ICON_MAP[tool.key] ?? Wrench;
              return (
                <Link
                  key={tool.key}
                  href={tool.href}
                  className="group relative flex flex-row items-start gap-3.5 p-4 border border-border rounded-[12px] bg-main transition-colors duration-150 hover:border-hover sm:flex-col sm:gap-3 sm:p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  {/* Tool Icon Box */}
                  <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 border border-border bg-alt text-primary group-hover:border-hover group-hover:text-brand transition-colors">
                    <ToolIcon className="w-5 h-5 stroke-[1.75]" />
                  </div>

                  {/* Tool Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-[15px] font-semibold text-primary tracking-tight group-hover:text-brand transition-colors">
                        {tool.name}
                      </h2>
                      {tool.badge && (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border border-border bg-alt text-secondary">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-secondary mt-0.5 leading-snug line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

