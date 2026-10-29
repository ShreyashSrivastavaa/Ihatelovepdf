'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Layers,
  Edit3,
  ArrowRightLeft,
  FileText,
  ShieldCheck,
  Camera,
  FileSearch,
  Receipt,
  ChevronDown,
  ArrowRight,
  X,
  Sparkles,
} from 'lucide-react';
import { OperationKey } from '../types/operations';
import { ICON_MAP, TOOL_DESCRIPTIONS } from './ToolSwitcher';
import { TOOL_NAMES } from '../lib/tools-registry';

interface CategoryHeroGridProps {
  routes: {
    operations: Record<string, string>;
  };
  footerOperations?: Record<string, string>;
}

interface CategoryDefinition {
  id: string;
  name: string;
  tag: string;
  shortDesc: string;
  icon: React.ElementType;
  color: string;
  bgSoft: string;
  borderAccent: string;
  tools: OperationKey[];
  primaryTool: OperationKey;
}

const CATEGORIES: CategoryDefinition[] = [
  {
    id: 'organize',
    name: 'Organize & Pages',
    tag: 'ESSENTIALS',
    shortDesc: 'Merge, split, compress, extract & rotate',
    icon: Layers,
    color: '#E24A24',
    bgSoft: 'rgba(226, 74, 36, 0.08)',
    borderAccent: 'rgba(226, 74, 36, 0.25)',
    primaryTool: 'merge',
    tools: ['merge', 'split', 'compress', 'extract', 'crop', 'rotate', 'reorder', 'pdfToZip'],
  },
  {
    id: 'edit',
    name: 'Edit & Annotate',
    tag: 'EDITOR',
    shortDesc: 'Edit text, fill forms, stamp watermarks & numbers',
    icon: Edit3,
    color: '#7C3AED',
    bgSoft: 'rgba(124, 58, 237, 0.08)',
    borderAccent: 'rgba(124, 58, 237, 0.25)',
    primaryTool: 'editPdf',
    tools: ['editPdf', 'fillPdfForm', 'watermark', 'pageNumbers', 'headersFooters'],
  },
  {
    id: 'convert-to',
    name: 'Convert to PDF',
    tag: 'IMPORT',
    shortDesc: 'Images, Excel, PowerPoint & Markdown to PDF',
    icon: ArrowRightLeft,
    color: '#EA580C',
    bgSoft: 'rgba(234, 88, 12, 0.08)',
    borderAccent: 'rgba(234, 88, 12, 0.25)',
    primaryTool: 'imagesToPdf',
    tools: ['imagesToPdf', 'excelToPdf', 'powerpointToPdf', 'markdownToPdf', 'htmlToPdf', 'csvToPdf', 'ebookToPdf'],
  },
  {
    id: 'convert-from',
    name: 'Convert from PDF',
    tag: 'EXPORT',
    shortDesc: 'PDF to Word, Images, Excel, PowerPoint, HTML & EPUB',
    icon: FileText,
    color: '#2563EB',
    bgSoft: 'rgba(37, 99, 235, 0.08)',
    borderAccent: 'rgba(37, 99, 235, 0.25)',
    primaryTool: 'pdfToWord',
    tools: ['pdfToWord', 'pdfToImages', 'pdfToExcel', 'pdfToPowerpoint', 'pdfToHtml', 'pdfToEpub'],
  },
  {
    id: 'security',
    name: 'Security & Privacy',
    tag: 'CONFIDENTIAL',
    shortDesc: 'Sign PDF, permanently redact & sanitize data',
    icon: ShieldCheck,
    color: '#059669',
    bgSoft: 'rgba(5, 150, 105, 0.08)',
    borderAccent: 'rgba(5, 150, 105, 0.25)',
    primaryTool: 'signPdf',
    tools: ['signPdf', 'redact', 'compare'],
  },
  {
    id: 'scan-create',
    name: 'Scan & Create',
    tag: 'CAPTURE',
    shortDesc: 'Mobile camera scanner, canvas & blank PDF',
    icon: Camera,
    color: '#D97706',
    bgSoft: 'rgba(217, 119, 6, 0.08)',
    borderAccent: 'rgba(217, 119, 6, 0.25)',
    primaryTool: 'scanToPdf',
    tools: ['scanToPdf', 'createPdf', 'whiteboard'],
  },
  {
    id: 'view-extract',
    name: 'View & Extract',
    tag: 'READER',
    shortDesc: 'Extract raw text, dark mode & diff compare',
    icon: FileSearch,
    color: '#0284C7',
    bgSoft: 'rgba(2, 132, 199, 0.08)',
    borderAccent: 'rgba(2, 132, 199, 0.25)',
    primaryTool: 'extractText',
    tools: ['extractText', 'invertColors', 'compare'],
  },
  {
    id: 'business',
    name: 'Business & Billing',
    tag: 'INVOICE & POS',
    shortDesc: 'GST tax invoices & POS thermal receipts',
    icon: Receipt,
    color: '#0891B2',
    bgSoft: 'rgba(8, 145, 178, 0.08)',
    borderAccent: 'rgba(8, 145, 178, 0.25)',
    primaryTool: 'gstInvoice',
    tools: ['gstInvoice', 'posBilling'],
  },
];

export function CategoryHeroGrid({ routes, footerOperations }: CategoryHeroGridProps) {
  const router = useRouter();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [mobileActiveCategory, setMobileActiveCategory] = useState<CategoryDefinition | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Lock background scrolling when mobile sheet is open
  useEffect(() => {
    if (mobileActiveCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileActiveCategory]);

  const handleMouseEnter = (catId: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredCategory(catId);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 120);
  };

  const handleCardClick = (e: React.MouseEvent, cat: CategoryDefinition) => {
    // If on mobile / touch screen (< 768px), open the mobile modal
    if (window.innerWidth < 768) {
      e.preventDefault();
      setMobileActiveCategory(cat);
      return;
    }
    // On desktop, clicking the card navigates directly to the primary tool in that category
    const targetUrl = routes.operations[cat.primaryTool] || `/tools`;
    router.push(targetUrl);
  };

  const getToolLabel = (key: OperationKey) => {
    return footerOperations?.[key] || TOOL_NAMES[key] || key;
  };

  const getToolHref = (key: OperationKey) => {
    return routes.operations[key] || `/tools`;
  };

  return (
    <div className="pt-6 sm:pt-8 w-full max-w-4xl mx-auto">
      {/* Visual Subtitle / Prompt */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-semibold tracking-wider text-[var(--tx-3)] uppercase flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
          Browse by Category • 38+ Private Tools
        </span>
        <span className="hidden sm:inline text-xs text-[var(--tx-3)]">
          Hover to view tools &bull; Process 100% on device
        </span>
        <span className="sm:hidden text-xs text-[var(--accent)] font-medium">
          Tap category to view
        </span>
      </div>

      {/* 8-CATEGORY RESPONSIVE GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 relative">
        {CATEGORIES.map((cat, idx) => {
          const Icon = cat.icon;
          const isHovered = hoveredCategory === cat.id;
          const colIndex = idx % 4;
          const isRightCol = colIndex >= 2;

          return (
            <div
              key={cat.id}
              className={`relative ${isHovered ? 'z-40' : 'z-10'}`}
              onMouseEnter={() => handleMouseEnter(cat.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* CATEGORY CARD */}
              <button
                type="button"
                onClick={(e) => handleCardClick(e, cat)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center text-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                  isHovered
                    ? 'border-[var(--accent-border)] bg-[var(--bg-subtle)] shadow-md -translate-y-1'
                    : 'border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent-border)] hover:bg-[var(--bg-subtle)] hover:-translate-y-1 shadow-xs'
                }`}
              >
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
                  style={{ backgroundColor: cat.bgSoft }}
                >
                  <Icon className="h-6 w-6 sm:h-6 sm:w-6 transition-colors" style={{ color: cat.color }} strokeWidth={1.75} />
                </div>

                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-sm sm:text-base font-bold text-[var(--tx)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                      {cat.name}
                    </span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-[var(--tx-3)] transition-transform duration-200 ${
                        isHovered ? 'rotate-180 text-[var(--accent)]' : ''
                      }`}
                    />
                  </div>
                  <p className="text-[11px] sm:text-xs text-[var(--tx-3)] font-medium">
                    {cat.tools.length} private tools
                  </p>
                </div>
              </button>

              {/* DESKTOP HOVER FLYOUT POPOVER */}
              {isHovered && (
                <div
                  className={`hidden md:block absolute top-full mt-1.5 z-50 animate-fade-in ${
                    isRightCol ? 'right-0' : 'left-0'
                  } w-[360px] max-w-[calc(100vw-32px)]`}
                  onMouseEnter={() => handleMouseEnter(cat.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Invisible padding bridge to prevent hover drop */}
                  <div className="h-2 w-full" />

                  <div
                    className="rounded-2xl border border-[var(--border)] bg-white dark:bg-[#131720] shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-3.5 space-y-2.5"
                    style={{
                      borderTopColor: cat.color,
                      borderTopWidth: '3px',
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--border)] px-1">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: cat.bgSoft }}
                        >
                          <Icon className="h-3.5 w-3.5" style={{ color: cat.color }} strokeWidth={2} />
                        </div>
                        <span className="text-xs font-bold text-[var(--tx)] tracking-wide">
                          {cat.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--bg-subtle)] text-[var(--tx-2)] border border-[var(--border)] uppercase">
                        {cat.tag}
                      </span>
                    </div>

                    {/* Tool list grid */}
                    <div className="grid grid-cols-1 gap-1 max-h-[320px] overflow-y-auto pr-0.5 custom-scrollbar">
                      {cat.tools.map((toolKey) => {
                        const ToolIcon = ICON_MAP[toolKey] || FileText;
                        const label = getToolLabel(toolKey);
                        const desc = TOOL_DESCRIPTIONS[toolKey] || 'Process locally in your browser';
                        const href = getToolHref(toolKey);

                        return (
                          <Link
                            key={toolKey}
                            href={href}
                            prefetch={false}
                            className="group/item flex items-center gap-2.5 p-2 rounded-xl hover:bg-[var(--bg-subtle)] transition-all text-left"
                          >
                            <div className="w-8 h-8 rounded-lg bg-[var(--bg-subtle)] group-hover/item:bg-[var(--bg-card)] flex items-center justify-center shrink-0 border border-[var(--border)] group-hover/item:border-[var(--accent-border)] transition-colors">
                              <ToolIcon className="h-4 w-4 text-[var(--accent)] transition-colors" strokeWidth={1.75} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[var(--tx)] group-hover/item:text-[var(--accent)] transition-colors truncate">
                                  {label}
                                </span>
                                <ArrowRight className="h-3 w-3 text-[var(--tx-3)] group-hover/item:text-[var(--accent)] opacity-0 group-hover/item:opacity-100 transition-all -translate-x-1 group-hover/item:translate-x-0 shrink-0" />
                              </div>
                              <p className="text-[11px] text-[var(--tx-2)] truncate leading-tight mt-0.5">
                                {desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* MOBILE DRAWER / BOTTOM SHEET (< 768px) */}
      {mobileActiveCategory && (
        <div className="fixed inset-0 z-50 md:hidden flex items-end justify-center bg-black/60 backdrop-blur-xs animate-fade-in">
          {/* Backdrop tap to close */}
          <div
            className="absolute inset-0"
            onClick={() => setMobileActiveCategory(null)}
            aria-hidden="true"
          />

          {/* Bottom sheet content */}
          <div className="relative w-full max-w-lg bg-white dark:bg-[#131720] border-t border-[var(--border)] rounded-t-3xl shadow-2xl p-5 max-h-[85vh] flex flex-col z-10 animate-slide-up">
            {/* Grab handle */}
            <div className="w-12 h-1.5 bg-[var(--border)] rounded-full mx-auto mb-4" />

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: mobileActiveCategory.bgSoft }}
                >
                  <mobileActiveCategory.icon
                    className="h-5 w-5"
                    style={{ color: mobileActiveCategory.color }}
                    strokeWidth={2}
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--tx)]">
                    {mobileActiveCategory.name}
                  </h3>
                  <p className="text-xs text-[var(--tx-3)]">
                    {mobileActiveCategory.tools.length} client-side private tools
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileActiveCategory(null)}
                className="w-9 h-9 rounded-full bg-[var(--bg-subtle)] border border-[var(--border)] flex items-center justify-center text-[var(--tx-2)] hover:text-[var(--tx)] focus:outline-none"
                aria-label="Close tools menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable tool list */}
            <div className="overflow-y-auto space-y-1.5 pr-1 py-1 max-h-[60vh]">
              {mobileActiveCategory.tools.map((toolKey) => {
                const ToolIcon = ICON_MAP[toolKey] || FileText;
                const label = getToolLabel(toolKey);
                const desc = TOOL_DESCRIPTIONS[toolKey] || 'Runs 100% locally in browser';
                const href = getToolHref(toolKey);

                return (
                  <Link
                    key={toolKey}
                    href={href}
                    prefetch={false}
                    onClick={() => setMobileActiveCategory(null)}
                    className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] active:bg-[var(--accent-soft)] active:border-[var(--accent-border)] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[var(--bg-subtle)] flex items-center justify-center shrink-0 border border-[var(--border)]">
                      <ToolIcon className="h-4 w-4 text-[var(--accent)]" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-[var(--tx)]">
                          {label}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 text-[var(--tx-3)] shrink-0 ml-2" />
                      </div>
                      <p className="text-xs text-[var(--tx-2)] truncate mt-0.5">
                        {desc}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
