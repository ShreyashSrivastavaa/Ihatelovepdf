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
  Unlock,
  Scan,
  Camera,
  Code,
  Table,
  Receipt,
  SplitSquareVertical,
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
  compare: SplitSquareVertical,
  pdfToZip: Archive,
  decrypt: Unlock,
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
  p2pShare: Share2,
  whiteboard: Palette,
  gstInvoice: Receipt,
  posBilling: Receipt,
};

export const TOOL_DESCRIPTIONS: Record<string, string> = {
  merge: "Combine multiple PDFs into one document",
  compress: "Reduce PDF file size without quality loss",
  split: "Separate PDF into individual pages or ranges",
  extract: "Extract specific pages into a new PDF",
  crop: "Trim margins and custom page areas visually",
  rotate: "Rotate pages 90°, 180°, or 270° degrees",
  reorder: "Rearrange page order with drag and drop",
  pdfToImages: "Convert PDF pages to PNG or JPEG images",
  imagesToPdf: "Convert photos and images into a single PDF",
  watermark: "Add text or image watermark stamps",
  pageNumbers: "Add formatted page numbers to headers/footers",
  headersFooters: "Add running headers and footers with macros",
  extractText: "Extract raw readable text from PDF pages",
  invertColors: "Dark mode reader & inverted contrast",
  redact: "Permanently erase and sanitize sensitive text",
  compare: "Side-by-side visual difference viewer",
  pdfToZip: "Package PDF assets into a ZIP archive",
  decrypt: "Remove passwords and export unlocked PDF",
  ocr: "Extract and recognize text from scanned PDFs with local WASM",
  editPdf: "Add text, signatures, and annotations",
  scanToPdf: "Scan paper documents using camera to PDF",
  markdownToPdf: "Compile markdown text and code blocks into PDF",
  htmlToPdf: "Convert HTML documents and web pages to PDF",
  csvToPdf: "Convert CSV tables and spreadsheets to PDF",
  createPdf: "Create blank or templated PDF documents",
  excelToPdf: "Convert Excel spreadsheets (.xlsx) to PDF",
  pdfToExcel: "Extract table data from PDF to Excel spreadsheets",
  powerpointToPdf: "Convert PowerPoint slides (.pptx) to PDF",
  pdfToPowerpoint: "Convert PDF slides to PowerPoint presentations",
  pdfToHtml: "Export PDF documents to HTML format",
  pdfToEpub: "Convert eBooks and documents to EPUB format",
  ebookToPdf: "Convert EPUB eBooks to PDF documents",
  p2pShare: "Direct encrypted P2P transfer between devices",
  whiteboard: "Collaborative whiteboard and visual sketches",
  gstInvoice: "Generate Indian GST tax invoices with auto-tax",
  posBilling: "Generate 58mm/80mm thermal receipts and bills",
};

import { Search, X as CloseIcon } from 'lucide-react';

export interface ToolLink {
  key: string;
  label: string;
  href: string;
  categoryName?: string;
}

interface ToolSwitcherProps {
  tools: ToolLink[];
  activeKey?: string | null;
}

export default function ToolSwitcher({ tools, activeKey = null }: ToolSwitcherProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const ref = useRef<HTMLDivElement>(null);

  const activeTool = tools.find((t) => t.key === activeKey) ?? null;
  const ActiveIcon = activeTool ? (ICON_MAP[activeTool.key] ?? Wrench) : Wrench;

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(tools.map((t) => t.categoryName).filter(Boolean))) as string[]];

  // Filter tools by query & category
  const filteredTools = tools.filter((tool) => {
    const matchesCategory = selectedCategory === 'All' || tool.categoryName === selectedCategory;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const label = tool.label.toLowerCase();
    const desc = (TOOL_DESCRIPTIONS[tool.key] || '').toLowerCase();
    return label.includes(q) || desc.includes(q) || tool.key.toLowerCase().includes(q);
  });

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
        prefetch={true}
        className="flex items-center gap-2 px-3.5 py-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent-border)] hover:bg-[var(--accent-soft)] transition-all duration-200 shadow-xs shrink-0 group cursor-pointer"
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
          className="flex w-full items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-left shadow-xs transition-all duration-200 hover:border-[var(--accent-border)] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)] transition-transform duration-200 group-hover:scale-105">
              <ActiveIcon className="h-4 w-4 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <span className="block truncate text-xs sm:text-sm font-bold text-[var(--tx)]">
                {activeTool ? activeTool.label : 'Select a PDF tool'}
              </span>
              <span className="block text-[11px] text-[var(--tx-3)] truncate hidden sm:block">
                {activeTool && TOOL_DESCRIPTIONS[activeTool.key]
                  ? TOOL_DESCRIPTIONS[activeTool.key]
                  : `All ${tools.length}+ tools 100% free & private in your browser`}
              </span>
            </div>
          </div>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-[var(--tx-3)] transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-[var(--accent)]' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu Popover */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-3 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150 space-y-2.5">
            {/* Search and Category Filter Bar */}
            <div className="space-y-2">
              <div className="relative flex items-center">
                <Search className="absolute left-3 h-3.5 w-3.5 text-[var(--tx-3)] pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${tools.length}+ PDF tools...`}
                  autoFocus
                  className="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--tx)] placeholder:text-[var(--tx-3)] focus:outline-none focus:border-[var(--accent-border)] focus:ring-1 focus:ring-[var(--accent)]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 text-[var(--tx-3)] hover:text-[var(--tx)]"
                  >
                    <CloseIcon className="h-3 w-3" />
                  </button>
                )}
              </div>

              {/* Category Filter Chips */}
              {categories.length > 2 && (
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition-colors cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-[var(--accent)] text-white font-bold'
                          : 'bg-[var(--bg-subtle)] text-[var(--tx-2)] hover:text-[var(--tx)] hover:bg-[var(--border)]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Scrollable Tool Grid */}
            <div className="max-h-80 overflow-y-auto pr-1 scrollbar-thin">
              {filteredTools.length === 0 ? (
                <div className="py-8 text-center text-xs text-[var(--tx-3)]">
                  No tools found matching &quot;{searchQuery}&quot;
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {filteredTools.map((tool) => {
                    const Icon = ICON_MAP[tool.key] ?? Wrench;
                    const isSelected = tool.key === activeKey;
                    const description = TOOL_DESCRIPTIONS[tool.key];

                    return (
                      <button
                        key={tool.key}
                        type="button"
                        onClick={() => handleSelect(tool)}
                        onMouseEnter={() => router.prefetch(tool.href)}
                        className={`flex items-start gap-3 rounded-2xl p-2.5 text-left transition-all duration-150 cursor-pointer ${
                          isSelected
                            ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-bold border border-[var(--accent-border)] shadow-xs'
                            : 'text-[var(--tx)] hover:bg-[var(--bg-subtle)] hover:text-[var(--accent)]'
                        }`}
                      >
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                            isSelected
                              ? 'border-[var(--accent-border)] bg-[var(--accent)] text-white shadow-xs'
                              : 'border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--tx-2)]'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="truncate text-xs font-bold block text-[var(--tx)]">
                              {tool.label}
                            </span>
                            {isSelected && <Check className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />}
                          </div>
                          {description && (
                            <span className="block text-[10px] text-[var(--tx-3)] truncate leading-tight mt-0.5">
                              {description}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
