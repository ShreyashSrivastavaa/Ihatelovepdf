/**
 * Central Tools Registry & Categorization System
 * Single source of truth for all 38 tools across dashboard navigation,
 * category groupings, metadata descriptions, visual accent themes, and localized routing.
 */

import React from 'react';
import { OperationKey } from '../types/operations';
import { ICON_MAP, TOOL_DESCRIPTIONS } from '../components/ToolSwitcher';
import {
  Scan,
  Layers,
  Edit3,
  FileSearch,
  ShieldCheck,
  ArrowRightLeft,
  FileText,
  Store,
} from 'lucide-react';

export interface ToolCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgSoft: string;
  borderAccent: string;
  tag: string;
  toolKeys: OperationKey[];
}

export interface ToolRegistryItem {
  key: OperationKey;
  name: string;
  description: string;
  category: string;
  icon: React.ElementType;
  isFeatured?: boolean;
}

export const FEATURED_TOOLS: OperationKey[] = [
  'merge',
  'compress',
  'split',
  'signPdf',
  'redact',
  'extractText',
  'scanToPdf',
];

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: 'scan-workflow',
    name: 'Scan & Workflow',
    description: 'Document capture, mobile camera scanner & visual sketch canvas',
    icon: Scan,
    color: '#D97706',
    bgSoft: 'rgba(217, 119, 6, 0.12)',
    borderAccent: 'rgba(217, 119, 6, 0.3)',
    tag: 'CAPTURE',
    toolKeys: ['scanToPdf', 'whiteboard'],
  },
  {
    id: 'page-management',
    name: 'Page Management',
    description: 'Merge, split, compress, crop, reorder and organize PDF documents',
    icon: Layers,
    color: '#E24A24',
    bgSoft: 'rgba(226, 74, 36, 0.12)',
    borderAccent: 'rgba(226, 74, 36, 0.3)',
    tag: 'ESSENTIALS',
    toolKeys: [
      'merge',
      'compress',
      'split',
      'extract',
      'rotate',
      'crop',
      'reorder',
      'pdfToImages',
      'imagesToPdf',
      'pdfToZip',
    ],
  },
  {
    id: 'edit-annotate',
    name: 'Edit & Annotate',
    description: 'Edit PDF text, stamps, page numbers, headers and running footers',
    icon: Edit3,
    color: '#7C3AED',
    bgSoft: 'rgba(124, 58, 237, 0.12)',
    borderAccent: 'rgba(124, 58, 237, 0.3)',
    tag: 'ANNOTATE',
    toolKeys: ['editPdf', 'fillPdfForm', 'watermark', 'pageNumbers', 'headersFooters'],
  },
  {
    id: 'extract-view',
    name: 'Extract & View',
    description: 'Reading-order vector text extraction & high-contrast dark mode',
    icon: FileSearch,
    color: '#0284C7',
    bgSoft: 'rgba(2, 132, 199, 0.12)',
    borderAccent: 'rgba(2, 132, 199, 0.3)',
    tag: 'EXTRACTION',
    toolKeys: ['extractText', 'invertColors'],
  },
  {
    id: 'security-privacy',
    name: 'Security & Privacy',
    description: 'Permanent redaction, metadata sanitization, and digital signatures',
    icon: ShieldCheck,
    color: '#059669',
    bgSoft: 'rgba(5, 150, 105, 0.12)',
    borderAccent: 'rgba(5, 150, 105, 0.3)',
    tag: 'SECURITY',
    toolKeys: ['signPdf', 'redact'],
  },
  {
    id: 'convert-to-pdf',
    name: 'Convert to PDF',
    description: 'Compile office spreadsheets, presentations, markdown, HTML & eBooks into PDF',
    icon: ArrowRightLeft,
    color: '#EA580C',
    bgSoft: 'rgba(234, 88, 12, 0.12)',
    borderAccent: 'rgba(234, 88, 12, 0.3)',
    tag: 'IMPORT',
    toolKeys: [
      'wordToPdf',
      'imagesToPdf',
      'csvToPdf',
      'excelToPdf',
      'powerpointToPdf',
      'markdownToPdf',
      'htmlToPdf',
      'ebookToPdf',
    ],
  },
  {
    id: 'convert-from-pdf',
    name: 'Convert from PDF',
    description: 'Export PDF files into structured Word, Excel, PowerPoint, HTML & EPUB formats',
    icon: FileText,
    color: '#2563EB',
    bgSoft: 'rgba(37, 99, 235, 0.12)',
    borderAccent: 'rgba(37, 99, 235, 0.3)',
    tag: 'EXPORT',
    toolKeys: ['pdfToImages', 'pdfToWord', 'pdfToExcel', 'pdfToPowerpoint', 'pdfToHtml', 'pdfToEpub'],
  },
  {
    id: 'document-utility',
    name: 'Document Utility',
    description: 'Side-by-side visual diff compare & blank document creator',
    icon: FileText,
    color: '#4F46E5',
    bgSoft: 'rgba(79, 70, 229, 0.12)',
    borderAccent: 'rgba(79, 70, 229, 0.3)',
    tag: 'UTILITIES',
    toolKeys: ['compare', 'createPdf'],
  },
  {
    id: 'business',
    name: 'Business',
    description: 'GST tax invoices and point-of-sale quick billing for Indian retail',
    icon: Store,
    color: '#0891B2',
    bgSoft: 'rgba(8, 145, 178, 0.12)',
    borderAccent: 'rgba(8, 145, 178, 0.3)',
    tag: 'GST & POS',
    toolKeys: ['gstInvoice', 'posBilling'],
  },
];

export const TOOL_NAMES: Record<OperationKey, string> = {
  merge: 'Merge PDF',
  compress: 'Compress PDF',
  split: 'Split PDF',
  extract: 'Extract Pages',
  crop: 'Crop & Resize',
  rotate: 'Rotate PDF',
  reorder: 'Organize Pages',
  pdfToImages: 'PDF to Images',
  imagesToPdf: 'Images to PDF',
  watermark: 'Watermark PDF',
  pageNumbers: 'Page Numbers',
  headersFooters: 'Headers & Footers',
  extractText: 'Extract Text',
  invertColors: 'Invert Colors (Dark Mode)',
  redact: 'Redact PDF',
  compare: 'Compare PDFs',
  pdfToZip: 'PDF to ZIP',
  encrypt: 'Protect & Encrypt',
  decrypt: 'Unlock & Decrypt',
  editPdf: 'Edit PDF & Annotate',
  scanToPdf: 'Scan Document (Camera)',
  markdownToPdf: 'Markdown to PDF',
  htmlToPdf: 'HTML to PDF',
  csvToPdf: 'CSV to PDF',
  createPdf: 'Create PDF',
  excelToPdf: 'Excel to PDF',
  pdfToExcel: 'PDF to Excel',
  pdfToWord: 'PDF to Word',
  wordToPdf: 'Word to PDF',
  powerpointToPdf: 'PowerPoint to PDF',
  pdfToPowerpoint: 'PDF to PowerPoint',
  pdfToHtml: 'PDF to HTML',
  pdfToEpub: 'PDF to EPUB',
  ebookToPdf: 'eBook to PDF',
  whiteboard: 'Visual Canvas & Sketch',
  gstInvoice: 'GST Invoice Generator',
  posBilling: 'POS Billing',
  signPdf: 'Sign PDF',
  fillPdfForm: 'Fill PDF Form',
  latexResume: 'LaTeX Resume Builder',
};

export function getToolMeta(key: OperationKey): ToolRegistryItem {
  const name = TOOL_NAMES[key] || key;
  const description = TOOL_DESCRIPTIONS[key] || 'Fast, private client-side PDF tool.';
  const icon = ICON_MAP[key] || FileText;
  const category =
    TOOL_CATEGORIES.find((cat) => cat.toolKeys.includes(key))?.name || 'General';
  const isFeatured = FEATURED_TOOLS.includes(key);

  return {
    key,
    name,
    description,
    category,
    icon,
    isFeatured,
  };
}
