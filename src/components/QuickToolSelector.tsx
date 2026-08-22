'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Check, Wrench } from 'lucide-react';
import { ICON_MAP } from './ToolSwitcher';

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
  const ActiveIcon = activeTool ? (ICON_MAP[activeTool.key] || Wrench) : Wrench;

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
    <section className="space-y-3 max-w-4xl mx-auto">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider" id="tool-selector-label">
          46+ Free &amp; Private PDF Tools
        </h2>
        <span className="text-xs text-[var(--tx-3)]">100% Local Browser Processing</span>
      </div>

      {/* DROPDOWN CONTAINER */}
      <div className="relative w-full" ref={dropdownRef}>
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-labelledby="tool-selector-label"
          className="flex w-full min-h-[52px] items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-left shadow-xs transition-all duration-200 hover:border-[var(--accent-border)] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)] transition-transform group-hover:scale-105">
              <ActiveIcon className="h-4 w-4" />
            </div>
            <div>
              <span className="block truncate text-sm font-bold text-[var(--tx)]">
                {activeTool ? activeTool.label : 'Choose a PDF tool from 46+ free tools...'}
              </span>
            </div>
          </div>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-[var(--tx-2)] transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-[var(--accent)]' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu Popover */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-2 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5">
              {links.map((tool) => {
                const Icon = ICON_MAP[tool.key] || Wrench;
                const isSelected = tool.key === selectedKey;
                return (
                  <button
                    key={tool.key}
                    type="button"
                    onClick={() => handleSelect(tool)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition-colors cursor-pointer min-h-[44px] ${
                      isSelected
                        ? 'bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)] font-bold'
                        : 'text-[var(--tx)] hover:bg-[var(--bg-subtle)] hover:text-[var(--accent)]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--tx-2)]">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
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
