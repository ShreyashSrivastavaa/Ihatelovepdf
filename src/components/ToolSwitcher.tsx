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
  Camera,
  Code,
  Table,
  Receipt,
  SplitSquareVertical,
  FileSpreadsheet,
  Presentation,
  BookOpen,
  Archive,
  PenLine,
  CheckSquare,
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
  editPdf: Type,
  scanToPdf: Camera,
  markdownToPdf: Code,
  htmlToPdf: Code,
  csvToPdf: Table,
  createPdf: FileText,
  excelToPdf: FileSpreadsheet,
  pdfToExcel: FileSpreadsheet,
  pdfToWord: FileText,
  wordToPdf: FileText,
  powerpointToPdf: Presentation,
  pdfToPowerpoint: Presentation,
  pdfToHtml: Code,
  pdfToEpub: BookOpen,
  ebookToPdf: BookOpen,
  whiteboard: Palette,
  gstInvoice: Receipt,
  posBilling: Receipt,
  signPdf: PenLine,
  fillPdfForm: CheckSquare,
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
  editPdf: "Add text, signatures, and annotations",
  scanToPdf: "Scan paper documents using camera to PDF",
  markdownToPdf: "Compile markdown text and code blocks into PDF",
  htmlToPdf: "Convert HTML documents and web pages to PDF",
  csvToPdf: "Convert CSV tables and spreadsheets to PDF",
  createPdf: "Create blank or templated PDF documents",
  excelToPdf: "Convert Excel spreadsheets (.xlsx) to PDF",
  pdfToExcel: "Extract table data from PDF to Excel spreadsheets",
  pdfToWord: "Convert PDF documents to editable Microsoft Word (.docx) files",
  wordToPdf: "Convert Word documents (.docx) to PDF with selectable text",
  powerpointToPdf: "Convert PowerPoint slides (.pptx) to PDF",
  pdfToPowerpoint: "Convert PDF slides to PowerPoint presentations",
  pdfToHtml: "Export PDF documents to HTML format",
  pdfToEpub: "Convert eBooks and documents to EPUB format",
  ebookToPdf: "Convert EPUB eBooks to PDF documents",
  whiteboard: "Collaborative whiteboard and visual sketches",
  gstInvoice: "Generate Indian GST tax invoices with auto-tax",
  posBilling: "Generate 58mm/80mm thermal receipts and bills",
  signPdf: "Draw, type, or upload electronic signatures on PDF",
  fillPdfForm: "Complete interactive PDF forms or click-to-type anywhere",
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
        className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--brand)] transition-all duration-150 shrink-0 group cursor-pointer"
        title="Go to Home"
      >
        <Image
          src="/images/stickers/ihatelove.png"
          alt="ihatelovepdf logo"
          width={24}
          height={24}
          className="object-contain h-6 w-6 transition-transform group-hover:scale-105"
          unoptimized
        />
        <span className="hidden sm:inline text-xs font-semibold text-[var(--text-main)]">Home</span>
      </Link>

      {/* Main Switcher Dropdown Container */}
      <div className="relative flex-1">
        {/* Trigger */}
        <button
          type="button"
          onClick={() => setIsOpen((p) => !p)}
          aria-expanded={isOpen}
          aria-label="Switch PDF tool"
          className="flex w-full items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 py-2.5 text-left transition-all duration-150 hover:border-[var(--brand)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--brand)] cursor-pointer group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-soft)] text-[var(--brand)] border border-[var(--brand)]/20 transition-transform duration-150 group-hover:scale-105">
              <ActiveIcon className="h-3.5 w-3.5 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <span className="block truncate text-xs sm:text-sm font-semibold text-[var(--text-main)]">
                {activeTool ? activeTool.label : 'Select a PDF tool'}
              </span>
              <span className="block text-[11px] text-[var(--text-muted)] truncate hidden sm:block">
                {activeTool && TOOL_DESCRIPTIONS[activeTool.key]
                  ? TOOL_DESCRIPTIONS[activeTool.key]
                  : `All ${tools.length}+ tools 100% free & private in your browser`}
              </span>
            </div>
          </div>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform duration-150 ${
              isOpen ? 'rotate-180 text-[var(--brand)]' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu Popover */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 shadow-xl animate-in fade-in slide-in-from-top-1 duration-150 space-y-2.5">
            {/* Search and Category Filter Bar */}
            <div className="space-y-2">
              <div className="relative flex items-center">
                <Search className="absolute left-3 h-3.5 w-3.5 text-[var(--text-muted)] pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${tools.length}+ PDF tools...`}
                  autoFocus
                  className="w-full pl-9 pr-8 py-1.5 rounded-lg text-xs bg-[var(--subtle)] border border-[var(--border)] text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 text-[var(--text-muted)] hover:text-[var(--text-main)]"
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
                      className={`px-2.5 py-0.5 rounded-md shrink-0 font-medium transition-colors cursor-pointer text-xs ${
                        selectedCategory === cat
                          ? 'bg-[var(--brand)] text-white font-semibold'
                          : 'bg-[var(--subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--border)]'
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
                <div className="py-8 text-center text-xs text-[var(--text-muted)]">
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
                        className={`flex items-start gap-2.5 rounded-xl p-2 text-left transition-all duration-150 cursor-pointer ${
                          isSelected
                            ? 'bg-[var(--brand-soft)] text-[var(--brand)] font-semibold border border-[var(--brand)]/30'
                            : 'text-[var(--text-main)] hover:bg-[var(--subtle)] hover:text-[var(--brand)] border border-transparent'
                        }`}
                      >
                        <div
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                            isSelected
                              ? 'border-[var(--brand)]/30 bg-[var(--brand)] text-white'
                              : 'border-[var(--border)] bg-[var(--subtle)] text-[var(--text-muted)]'
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="truncate text-xs font-semibold block text-[var(--text-main)]">
                              {tool.label}
                            </span>
                            {isSelected && <Check className="h-3.5 w-3.5 shrink-0 text-[var(--brand)]" />}
                          </div>
                          {description && (
                            <span className="block text-[11px] text-[var(--text-muted)] truncate leading-tight mt-0.5">
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
