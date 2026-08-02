'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Layers,
  FileDown,
  ScissorsLineDashed,
  RotateCw,
  ArrowDownUp,
  Image as ImageIcon,
  Sparkles,
  ChevronDown,
  Check,
  Wrench,
  Crop,
  Home,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  merge: Layers,
  compress: FileDown,
  split: ScissorsLineDashed,
  extract: Sparkles,
  crop: Crop,
  rotate: RotateCw,
  reorder: ArrowDownUp,
  pdfToImages: ImageIcon,
  imagesToPdf: ImageIcon,
};

export interface ToolLink {
  key: string;
  label: string;
  href: string;
}

interface ToolSwitcherProps {
  tools: ToolLink[];
  activeKey?: string | null;
}

export default function ToolSwitcher({ tools, activeKey = null }: ToolSwitcherProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const activeTool = tools.find((t) => t.key === activeKey) ?? null;
  const ActiveIcon = activeTool ? (ICON_MAP[activeTool.key] ?? Wrench) : Wrench;

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (tool: ToolLink) => {
    setIsOpen(false);
    router.push(tool.href);
  };

  return (
    <div className="flex items-center gap-2 w-full" ref={ref}>
      {/* Home Logo Button */}
      <Link
        href="/"
        className="flex items-center gap-2 px-3.5 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent-border)] hover:bg-[var(--accent-soft)] transition-all duration-200 shadow-xs shrink-0 group"
        title="Go to Home"
      >
        <Image
          src="/images/stickers/ihatelove.png"
          alt="ihatelovepdf logo"
          width={28}
          height={28}
          className="object-contain h-7 w-7 transition-transform group-hover:scale-110"
          unoptimized
        />
        <span className="hidden sm:inline text-xs font-bold text-[var(--tx)]">Home</span>
      </Link>

      {/* Main Switcher Dropdown Container */}
      <div className="relative flex-1">
        {/* Trigger */}
        <button
          type="button"
          onClick={() => setIsOpen((p) => !p)}
          aria-expanded={isOpen}
          aria-label="Switch PDF tool"
          className="flex w-full items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-left shadow-xs transition-all duration-200 hover:border-[var(--accent-border)] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)] transition-transform duration-200 group-hover:scale-105">
              <ActiveIcon className="h-4 w-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--tx-3)]">
                Current Tool
              </span>
              <span className="truncate text-sm font-semibold text-[var(--tx)]">
                {activeTool ? activeTool.label : 'Choose a PDF tool…'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            <span className="hidden sm:inline text-xs font-medium text-[var(--tx-3)] bg-[var(--bg-subtle)] border border-[var(--border)] px-2 py-0.5 rounded-md">
              Switch tool
            </span>
            <ChevronDown
              className={`h-5 w-5 text-[var(--tx-2)] transition-transform duration-200 ${
                isOpen ? 'rotate-180 text-[var(--accent)]' : ''
              }`}
            />
          </div>
        </button>

        {/* Dropdown Popover */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-2 shadow-2xl backdrop-blur-md animate-fade-in">
            <div className="flex items-center justify-between px-3 pb-2 pt-1 border-b border-[var(--border)] mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--tx-3)]">
                All PDF Tools
              </span>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer"
              >
                <Home className="h-3.5 w-3.5" />
                <span>Home</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
              {tools.map((tool) => {
                const Icon = ICON_MAP[tool.key] ?? Wrench;
                const isActive = tool.key === activeKey;
                return (
                  <button
                    key={tool.key}
                    type="button"
                    onClick={() => handleSelect(tool)}
                    disabled={isActive}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors cursor-pointer min-h-[44px] ${
                      isActive
                        ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-semibold cursor-default'
                        : 'text-[var(--tx)] hover:bg-[var(--bg-subtle)] hover:text-[var(--accent)]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`h-4 w-4 shrink-0 ${
                          isActive ? 'text-[var(--accent)]' : 'text-[var(--tx-2)]'
                        }`}
                      />
                      <span className="truncate">{tool.label}</span>
                    </div>
                    {isActive && <Check className="h-4 w-4 shrink-0 text-[var(--accent)]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
