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
  Palette,
  Hash,
  Type,
  FileText,
  ShieldAlert,
  Lock,
  Unlock,
  Scan,
  Camera,
  Code,
  Table,
  Receipt,
  Fingerprint,
  Bot,
  SplitSquareVertical,
  Volume2,
  Mic,
  Share2,
  FileSpreadsheet,
  Presentation,
  BookOpen,
  Archive,
} from 'lucide-react';

export const ICON_MAP: Record<string, React.ElementType> = {
  merge: Layers,
  compress: FileDown,
  split: ScissorsLineDashed,
  extract: Sparkles,
  crop: Crop,
  rotate: RotateCw,
  reorder: ArrowDownUp,
  pdfToImages: ImageIcon,
  imagesToPdf: ImageIcon,
  watermark: Palette,
  pageNumbers: Hash,
  headersFooters: Type,
  extractText: FileText,
  invertColors: Palette,
  redact: ShieldAlert,
  flatten: Layers,
  compare: SplitSquareVertical,
  pdfToZip: Archive,
  encrypt: Lock,
  decrypt: Unlock,
  privacyScanner: ShieldAlert,
  ocr: Scan,
  editPdf: Type,
  scanToPdf: Camera,
  markdownToPdf: Code,
  htmlToPdf: Code,
  csvToPdf: Table,
  createPdf: FileText,
  excelToPdf: FileSpreadsheet,
  pdfToExcel: FileSpreadsheet,
  powerpointToPdf: Presentation,
  pdfToPowerpoint: Presentation,
  pdfToHtml: Code,
  pdfToEpub: BookOpen,
  ebookToPdf: BookOpen,
  pdfToAudio: Volume2,
  audioToPdf: Mic,
  repair: Wrench,
  p2pShare: Share2,
  whiteboard: Palette,
  gstInvoice: Receipt,
  posBilling: Receipt,
  fingerprint: Fingerprint,
  aiSummarize: Bot,
  aiChat: Bot,
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
            <div className="min-w-0">
              <span className="block truncate text-xs sm:text-sm font-bold text-[var(--tx)]">
                {activeTool ? activeTool.label : 'Select a PDF tool'}
              </span>
              <span className="block text-[11px] text-[var(--tx-3)] truncate hidden sm:block">
                All 46+ tools 100% free &amp; private in your browser
              </span>
            </div>
          </div>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-[var(--tx-3)] transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-[var(--accent)]' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-2 shadow-xl backdrop-blur-lg animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {tools.map((tool) => {
                const Icon = ICON_MAP[tool.key] ?? Wrench;
                const isSelected = tool.key === activeKey;
                return (
                  <button
                    key={tool.key}
                    type="button"
                    onClick={() => handleSelect(tool)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-bold border border-[var(--accent-border)]'
                        : 'text-[var(--tx)] hover:bg-[var(--bg-subtle)] hover:text-[var(--accent)]'
                    }`}
                  >
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                        isSelected
                          ? 'border-[var(--accent-border)] bg-[var(--accent)] text-white'
                          : 'border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--tx-2)]'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="flex-1 truncate">{tool.label}</span>
                    {isSelected && <Check className="h-4 w-4 shrink-0 text-[var(--accent)]" />}
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
