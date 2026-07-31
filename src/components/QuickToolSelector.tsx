'use client';

import { useState, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Layers, FileDown, Scissors, RotateCw, ArrowDownUp, Image as ImageIcon, Sparkles } from 'lucide-react';

const ICON_MAP = {
  merge: Layers,
  compress: FileDown,
  split: Scissors,
  extract: Sparkles,
  crop: Scissors,
  rotate: RotateCw,
  reorder: ArrowDownUp,
  pdfToImages: ImageIcon,
  imagesToPdf: ImageIcon,
};

export interface QuickToolLink {
  key: string;
  label: string;
  href: string;
}

export default function QuickToolSelector({ links }: { links: QuickToolLink[] }) {
  const router = useRouter();
  const [selectedTool, setSelectedTool] = useState('');

  const handleToolSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      setSelectedTool(value);
      router.push(value);
    }
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider" id="tool-selector-label">
          Quick Tool Selector
        </h2>
        <span className="text-xs text-[var(--tx-3)]">Select tool to start</span>
      </div>

      {/* Mobile Viewport Dropdown (< 768px) */}
      <div className="tool-selector-mobile md:hidden">
        <label htmlFor="tool-select" className="sr-only">
          Choose a PDF tool to get started...
        </label>
        <select
          id="tool-select"
          className="tool-selector-dropdown"
          aria-labelledby="tool-selector-label"
          value={selectedTool}
          onChange={handleToolSelect}
        >
          <option value="" disabled>
            Choose a PDF tool to get started...
          </option>
          {links.map((tool) => (
            <option key={tool.key} value={tool.href}>
              {tool.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Viewport Card Grid (>= 768px) */}
      <div className="tool-selector-desktop hidden md:grid md:grid-cols-5 lg:grid-cols-9 gap-2 text-center">
        {links.map((tool) => {
          const Icon = ICON_MAP[tool.key as keyof typeof ICON_MAP] || Layers;
          return (
            <Link
              key={tool.key}
              href={tool.href}
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent-border)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] transition-all duration-150 group text-center shadow-xs min-h-[54px]"
            >
              <Icon className="h-5 w-5 mb-1.5 text-[var(--tx-2)] group-hover:text-[var(--accent)] group-hover:scale-110 transition-transform shrink-0" />
              <span className="text-xs font-medium text-[var(--tx)] group-hover:text-[var(--accent)] truncate w-full">
                {tool.label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
