'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Layers, FileDown, Scissors, RotateCw, ArrowDownUp, Image as ImageIcon, Sparkles, ChevronDown, Check, Wrench } from 'lucide-react';

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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeTool = links.find((t) => t.key === selectedKey);
  const ActiveIcon = activeTool ? (ICON_MAP[activeTool.key as keyof typeof ICON_MAP] || Wrench) : Wrench;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (tool: QuickToolLink) => {
    setSelectedKey(tool.key);
    setIsOpen(false);
    router.push(tool.href);
  };

  return (
    <section className="space-y-3 max-w-3xl mx-auto">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider" id="tool-selector-label">
          Quick Tool Selector
        </h2>
        <span className="text-xs text-[var(--tx-3)]">Select tool to start</span>
      </div>

      {/* DROPDOWN CONTAINER */}
      <div className="relative w-full" ref={dropdownRef}>
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-labelledby="tool-selector-label"
          className="flex w-full min-h-[50px] items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-left shadow-xs transition-all duration-200 hover:border-[var(--accent-border)] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)]">
              <ActiveIcon className="h-4 w-4" />
            </div>
            <span className="truncate text-sm font-semibold text-[var(--tx)]">
              {activeTool ? activeTool.label : 'Choose a PDF tool to get started...'}
            </span>
          </div>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-[var(--tx-2)] transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-[var(--accent)]' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu Popover */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-2 shadow-2xl backdrop-blur-md animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {links.map((tool) => {
                const Icon = ICON_MAP[tool.key as keyof typeof ICON_MAP] || Wrench;
                const isSelected = tool.key === selectedKey;
                return (
                  <button
                    key={tool.key}
                    type="button"
                    onClick={() => handleSelect(tool)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors cursor-pointer min-h-[44px] ${
                      isSelected
                        ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-semibold'
                        : 'text-[var(--tx)] hover:bg-[var(--bg-subtle)] hover:text-[var(--accent)]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`h-4 w-4 shrink-0 ${isSelected ? 'text-[var(--accent)]' : 'text-[var(--tx-2)]'}`} />
                      <span className="truncate">{tool.label}</span>
                    </div>
                    {isSelected && <Check className="h-4 w-4 shrink-0 text-[var(--accent)]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
