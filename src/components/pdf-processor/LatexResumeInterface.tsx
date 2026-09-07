'use client';

import React, { useState, useEffect, useRef, useTransition, useCallback } from 'react';
import {
  FileText,
  Code,
  Download,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Loader2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Wrench,
  Award,
  User,
  Upload,
} from 'lucide-react';
import {
  ResumeData,
  ResumeTemplateId,
  RESUME_TEMPLATES,
  SAMPLE_RESUME_DATA,
} from '../../lib/latex/resume-types';
import {
  generateLatexSource,
  generateResumePdf,
} from '../../lib/latex/resume-compiler';
import { createPdfBlob } from '../../lib/pdf-processor';
import {
  getCustomTemplates,
  deleteCustomTemplate,
  CustomTemplateRecord,
} from '../../lib/latex/custom-template-store';
import { injectPlaceholders, ResumeFormData } from '../../lib/latex-escape';
import TemplateUploadModal from './TemplateUploadModal';
import templateManifest from '../../../templates/manifest.json';

type PdfJsModule = typeof import('pdfjs-dist/legacy/build/pdf');
let pdfjsLibPromise: Promise<PdfJsModule> | null = null;

async function getPdfJs(): Promise<PdfJsModule> {
  if (typeof window === 'undefined') throw new Error('Browser required');
  if (!pdfjsLibPromise) {
    pdfjsLibPromise = import('pdfjs-dist/legacy/build/pdf').then((m) => {
      if (!m.GlobalWorkerOptions.workerSrc) {
        m.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      }
      return m;
    });
  }
  return pdfjsLibPromise;
}

interface LatexResumeInterfaceProps {
  onDone?: (blob: Blob) => void;
}

function formatCategoryLabel(cat: string): string {
  if (!cat) return '';
  if (cat.toLowerCase() === 'all') return 'All';
  const specialMap: Record<string, string> = {
    'ats-friendly': 'ATS-Friendly',
    'modern-twocolumn': 'Modern Two-Column',
    'minimalist': 'Minimalist',
    'academic-cv': 'Academic CV',
    'creative-designer': 'Creative Designer',
    'tech-developer': 'Tech Developer',
    'executive-senior': 'Executive Senior',
    'fresh-grad': 'Fresh Graduate',
    'compact-dense': 'Compact Dense',
    'timeline-style': 'Timeline Style',
    'international': 'International',
  };
  if (specialMap[cat.toLowerCase()]) {
    return specialMap[cat.toLowerCase()];
  }
  return cat
    .split(/[-_/\s]+/)
    .map((word) => {
      const lower = word.toLowerCase();
      if (lower === 'ats') return 'ATS';
      if (lower === 'cv') return 'CV';
      if (lower === 'ux') return 'UX';
      if (lower === 'mba') return 'MBA';
      if (lower === 'stem') return 'STEM';
      if (lower === 'sre') return 'SRE';
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

export default function LatexResumeInterface({ onDone }: LatexResumeInterfaceProps) {
  const manifestTemplates = templateManifest.templates;
  const [data, setData] = useState<ResumeData>(SAMPLE_RESUME_DATA);
  const [templateId, setTemplateId] = useState<string>(manifestTemplates[0]?.id || 'jakes');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [customTemplates, setCustomTemplates] = useState<CustomTemplateRecord[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<'form' | 'latex'>('form');
  const [activeFormTab, setActiveFormTab] = useState<'personal' | 'experience' | 'education' | 'projects' | 'skills' | 'certs'>('personal');
  const [latexCode, setLatexCode] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);

  // Derive distinct categories dynamically from manifest
  const categories = React.useMemo(() => {
    const distinct = Array.from(
      new Set(manifestTemplates.map((t) => t.category).filter(Boolean))
    );
    return ['all', ...distinct];
  }, [manifestTemplates]);

  // Filtered templates based on category filter
  const filteredTemplates = React.useMemo(() => {
    if (selectedCategory === 'all') return manifestTemplates;
    return manifestTemplates.filter((t) => t.category === selectedCategory);
  }, [selectedCategory, manifestTemplates]);

  // Auto-expand if the currently active template is beyond the first 8 in "All" view
  useEffect(() => {
    if (selectedCategory === 'all' && !isExpanded) {
      const idx = filteredTemplates.findIndex((t) => t.id === templateId);
      if (idx >= 8) {
        setIsExpanded(true);
      }
    }
  }, [templateId, selectedCategory, filteredTemplates, isExpanded]);

  // Visible templates (collapsible to 8 items in "All" view)
  const visibleTemplates = React.useMemo(() => {
    if (selectedCategory === 'all' && filteredTemplates.length > 8 && !isExpanded) {
      return filteredTemplates.slice(0, 8);
    }
    return filteredTemplates;
  }, [selectedCategory, filteredTemplates, isExpanded]);

  // Load custom templates from IndexedDB on component mount
  useEffect(() => {
    getCustomTemplates().then((templates) => {
      setCustomTemplates(templates);
    });
  }, []);

  // PDF Preview & Compilation State
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [isCompiling, setIsCompiling] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [, startTransition] = useTransition();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeRenderTaskRef = useRef<{ cancel: () => void; promise: Promise<unknown> } | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Convert ResumeData into ResumeFormData for custom template placeholder injection
  const resumeDataToFormData = useCallback((d: ResumeData): ResumeFormData => {
    return {
      fullName: d.personalInfo.name,
      email: d.personalInfo.email,
      phone: d.personalInfo.phone,
      location: d.personalInfo.location,
      linkedin: d.personalInfo.linkedin,
      github: d.personalInfo.github,
      website: d.personalInfo.portfolio,
      summary: d.summary || '',
      skills: d.skills.map((s) => ({
        category: s.name,
        list: s.skills.split(',').map((x) => x.trim()),
      })),
      experience: d.experience.map((e) => ({
        role: e.role,
        company: e.company,
        location: e.location,
        startDate: e.startDate,
        endDate: e.endDate,
        bullets: e.bullets,
      })),
      education: d.education.map((ed) => ({
        degree: ed.degree,
        institution: ed.institution,
        location: ed.location,
        startDate: ed.startDate,
        endDate: ed.endDate,
        details: ed.gpa ? `GPA: ${ed.gpa}` : undefined,
      })),
      projects: d.projects.map((p) => ({
        title: p.name,
        tech: p.technologies,
        link: p.link,
        bullets: p.bullets,
      })),
      certifications: d.certifications?.map((c) => `${c.name} (${c.issuer})`),
    };
  }, []);

  // Keep LaTeX code in sync when data or template changes in form mode
  useEffect(() => {
    let isCancelled = false;
    const custom = customTemplates.find((c) => c.id === templateId);
    if (custom) {
      const code = injectPlaceholders(custom.rawTex, resumeDataToFormData(data), custom.placeholders);
      setLatexCode(code);
      return;
    }

    const manifestEntry = manifestTemplates.find((t) => t.id === templateId);
    const templatePath = manifestEntry ? `/${manifestEntry.file}` : `/templates/${templateId}.tex`;

    fetch(templatePath)
      .then((res) => {
        if (!res.ok) throw new Error('Template fetch failed');
        return res.text();
      })
      .then((rawTex) => {
        if (!isCancelled) {
          const code = injectPlaceholders(rawTex, resumeDataToFormData(data), manifestEntry?.placeholders);
          setLatexCode(code);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          const fallbackCode = generateLatexSource(data, (templateId as ResumeTemplateId) || 'jakes');
          setLatexCode(fallbackCode);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [data, templateId, customTemplates, resumeDataToFormData, manifestTemplates]);

  // Compile PDF on change
  const triggerCompile = useCallback(() => {
    setIsCompiling(true);
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const isBuiltIn =
          manifestTemplates.some((t) => t.id === templateId) ||
          RESUME_TEMPLATES.some((t) => t.id === templateId);
        const activeTmplId = isBuiltIn ? (templateId as ResumeTemplateId) : 'jakes';
        const bytes = await generateResumePdf(data, activeTmplId);
        startTransition(() => {
          setPdfBytes(bytes);
          setIsCompiling(false);
        });
      } catch (err) {
        console.error('Resume PDF compilation failed:', err);
        setIsCompiling(false);
      }
    }, 180);
  }, [data, templateId, manifestTemplates]);

  useEffect(() => {
    triggerCompile();
  }, [triggerCompile]);

  // Render PDF page to canvas via PDF.js
  useEffect(() => {
    if (!pdfBytes || typeof window === 'undefined') return;
    let isCancelled = false;

    async function renderPreview() {
      // 1. Cancel in-flight render task and wait for PDF.js to release the canvas
      if (activeRenderTaskRef.current) {
        try {
          activeRenderTaskRef.current.cancel();
          await activeRenderTaskRef.current.promise.catch(() => {});
        } catch {
          // ignore
        }
      }
      if (isCancelled) return;

      try {
        const pdfjs = await getPdfJs();
        const baseUrl = window.location.origin;
        const loadingTask = pdfjs.getDocument({
          data: pdfBytes as Uint8Array,
          cMapUrl: `${baseUrl}/cmaps/`,
          cMapPacked: true,
          standardFontDataUrl: `${baseUrl}/standard_fonts/`,
        });

        const doc = await loadingTask.promise;
        if (isCancelled) return;
        setTotalPages(doc.numPages);

        const pageNum = Math.min(Math.max(1, currentPage), doc.numPages);
        const page = await doc.getPage(pageNum);
        if (isCancelled) return;

        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Double check in case another preview was queued while getting page
        if (activeRenderTaskRef.current) {
          try {
            activeRenderTaskRef.current.cancel();
            await activeRenderTaskRef.current.promise.catch(() => {});
          } catch {
            // ignore
          }
        }
        if (isCancelled) return;

        canvas.width = Math.round(viewport.width);
        canvas.height = Math.round(viewport.height);

        const renderTask = page.render({
          canvasContext: ctx,
          viewport,
          canvas,
        } as Parameters<typeof page.render>[0]);
        activeRenderTaskRef.current = renderTask;

        try {
          await renderTask.promise;
        } finally {
          if (activeRenderTaskRef.current === renderTask) {
            activeRenderTaskRef.current = null;
          }
        }
      } catch (renderErr: unknown) {
        const errorName = renderErr && typeof renderErr === 'object' && 'name' in renderErr ? (renderErr as { name: string }).name : '';
        if (!isCancelled && errorName !== 'RenderingCancelledException') {
          console.warn('Preview render error:', renderErr);
        }
      }
    }

    renderPreview();
    return () => {
      isCancelled = true;
      if (activeRenderTaskRef.current) {
        try {
          activeRenderTaskRef.current.cancel();
        } catch {
          // ignore
        }
      }
    };
  }, [pdfBytes, currentPage]);

  // Download PDF Handler
  const handleDownloadPdf = () => {
    if (!pdfBytes) return;
    const blob = createPdfBlob(pdfBytes);
    if (onDone) {
      onDone(blob);
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const cleanName = (data.personalInfo.name || 'Resume').replace(/\s+/g, '_');
      a.download = `${cleanName}_Resume.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleTemplateSaved = (saved: CustomTemplateRecord) => {
    setCustomTemplates((prev) => [saved, ...prev.filter((t) => t.id !== saved.id)]);
    setTemplateId(saved.id);
  };

  const handleDeleteCustomTemplate = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteCustomTemplate(id);
    setCustomTemplates((prev) => prev.filter((t) => t.id !== id));
    if (templateId === id) {
      setTemplateId('jakes');
    }
  };

  // Download LaTeX Source (.tex) Handler
  const handleDownloadTex = () => {
    const code = latexCode || generateLatexSource(data, templateId);
    const blob = new Blob([code], { type: 'text/x-tex;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const cleanName = (data.personalInfo.name || 'Resume').replace(/\s+/g, '_');
    a.download = `${cleanName}_Resume.tex`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Copy LaTeX code
  const handleCopyLatex = async () => {
    try {
      await navigator.clipboard.writeText(latexCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  // Helper mutations for arrays
  const updatePersonalInfo = (field: keyof typeof data.personalInfo, value: string) => {
    setData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  return (
    <div className="surface-card rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:p-6 space-y-6 shadow-sm animate-fade-in">
      {/* Header & Template Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[var(--tx)] flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-indigo-500" />
              LaTeX Resume Builder
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              ATS Optimized
            </span>
          </div>
          <p className="text-xs text-[var(--tx-2)] mt-0.5">
            Create industry-standard resumes formatted in genuine LaTeX with 100% in-browser vector PDF compilation.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadTex}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--bg-subtle)] text-xs font-semibold text-[var(--tx)] transition-all cursor-pointer shadow-2xs"
          >
            <Code className="w-3.5 h-3.5 text-indigo-500" />
            <span>Download .tex</span>
          </button>
          <button
            type="button"
            disabled={!pdfBytes || isCompiling}
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isCompiling ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Template Selection Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--tx-3)] flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              Select Resume Template
            </label>
            <span className="text-[11px] font-medium text-[var(--tx-3)] bg-[var(--bg-subtle)] px-2 py-0.5 rounded-full border border-[var(--border)]">
              {filteredTemplates.length} {filteredTemplates.length === 1 ? 'template' : 'templates'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-indigo-500 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 transition cursor-pointer self-start sm:self-auto"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Custom Template</span>
          </button>
        </div>

        {/* Category Filter Tabs / Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          {categories.map((cat) => {
            const isCatActive = selectedCategory === cat;
            const catLabel = formatCategoryLabel(cat);
            const count =
              cat === 'all'
                ? manifestTemplates.length
                : manifestTemplates.filter((t) => t.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isCatActive
                    ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                    : 'text-[var(--tx-2)] bg-[var(--bg-subtle)] hover:text-[var(--tx)] hover:bg-[var(--border)]/40 border border-[var(--border)]'
                }`}
              >
                <span>{catLabel}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isCatActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[var(--border)] text-[var(--tx-3)]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Custom Uploaded Templates (if any) */}
        {customTemplates.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
              My Saved Templates ({customTemplates.length})
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {customTemplates.map((tmpl) => {
                const isSelected = templateId === tmpl.id;
                return (
                  <div
                    key={tmpl.id}
                    onClick={() => setTemplateId(tmpl.id)}
                    className={`relative p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500/10 shadow-xs'
                        : 'border-indigo-500/30 bg-[var(--bg)] hover:border-indigo-500/60 hover:bg-[var(--bg-subtle)]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-[var(--tx)] truncate">{tmpl.name}</span>
                        <div className="flex items-center gap-1 shrink-0">
                          {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                          <button
                            type="button"
                            onClick={(e) => handleDeleteCustomTemplate(tmpl.id, e)}
                            className="p-1 rounded text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition opacity-0 group-hover:opacity-100"
                            title="Delete custom template"
                            aria-label="Delete custom template"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <span className="text-[10px] text-indigo-400 font-medium block mt-0.5">
                        Custom User Template
                      </span>
                    </div>
                    <p className="text-[10px] text-[var(--tx-3)] line-clamp-2 mt-1 leading-tight">
                      {tmpl.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Built-in Templates Grid: Responsive Multi-Row (4 on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 transition-all duration-200">
          {visibleTemplates.map((tmpl) => {
            const isSelected = templateId === tmpl.id;
            const categoryLabel =
              'tagline' in tmpl && tmpl.tagline
                ? (tmpl.tagline as string)
                : formatCategoryLabel(tmpl.category);

            return (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => setTemplateId(tmpl.id)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-500/10 shadow-xs'
                    : 'border-[var(--border)] bg-[var(--bg)] hover:border-indigo-500/40 hover:bg-[var(--bg-subtle)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--tx)]">{tmpl.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                  </div>
                  <span className="text-[10px] text-indigo-500 font-medium block mt-0.5">
                    {categoryLabel}
                  </span>
                </div>
                <p className="text-[10px] text-[var(--tx-3)] line-clamp-2 mt-1 leading-tight">
                  {tmpl.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Show More / Show Fewer Button for "All" view with > 8 templates */}
        {selectedCategory === 'all' && filteredTemplates.length > 8 && (
          <div className="flex justify-center pt-1">
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/60 dark:border-indigo-800/40 transition-all cursor-pointer shadow-2xs"
            >
              {isExpanded ? (
                <>
                  <span>Show Fewer Templates</span>
                  <ChevronUp className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <span>Show All {filteredTemplates.length} Templates</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Editor & Preview Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[680px]">
        {/* Left Column: Dual-Mode Editor (Cols 1-6) */}
        <div className="lg:col-span-6 flex flex-col border border-[var(--border)] rounded-2xl bg-[var(--bg)] overflow-hidden shadow-2xs">
          {/* Mode Switcher Header */}
          <div className="flex items-center justify-between p-2.5 border-b border-[var(--border)] bg-[var(--bg-card)]">
            <div className="flex items-center gap-1 bg-[var(--bg-subtle)] p-1 rounded-xl border border-[var(--border)]">
              <button
                type="button"
                onClick={() => setEditorMode('form')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  editorMode === 'form'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-[var(--tx-2)] hover:text-[var(--tx)]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Form Editor</span>
              </button>
              <button
                type="button"
                onClick={() => setEditorMode('latex')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  editorMode === 'latex'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-[var(--tx-2)] hover:text-[var(--tx)]'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Raw LaTeX (.tex)</span>
              </button>
            </div>

            {editorMode === 'latex' ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLatex}
                  className="px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--tx-2)] hover:text-[var(--tx)] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {isCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const code = generateLatexSource(data, templateId);
                    setLatexCode(code);
                  }}
                  title="Reset code to form data"
                  className="p-1 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--tx-3)] hover:text-[var(--tx)] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setData(SAMPLE_RESUME_DATA)}
                className="text-[11px] text-[var(--tx-3)] hover:text-indigo-500 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Sample</span>
              </button>
            )}
          </div>

          {/* Form Mode Sub-Tabs */}
          {editorMode === 'form' ? (
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-1 border-b border-[var(--border)] p-1.5 bg-[var(--bg)] overflow-x-auto text-xs">
                {[
                  { id: 'personal', label: 'Personal', icon: User },
                  { id: 'experience', label: 'Experience', icon: Briefcase },
                  { id: 'education', label: 'Education', icon: GraduationCap },
                  { id: 'projects', label: 'Projects', icon: FolderGit2 },
                  { id: 'skills', label: 'Skills', icon: Wrench },
                  { id: 'certs', label: 'Certifications', icon: Award },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeFormTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveFormTab(tab.id as typeof activeFormTab)}
                      className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[var(--bg-card)] text-indigo-600 shadow-2xs border border-[var(--border)]'
                          : 'text-[var(--tx-3)] hover:text-[var(--tx)]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Form Tab Content */}
              <div className="p-4 space-y-4 overflow-y-auto max-h-[580px] flex-1">
                {/* 1. Personal Tab */}
                {activeFormTab === 'personal' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-[var(--tx-2)] block mb-1">Full Name</label>
                        <input
                          type="text"
                          value={data.personalInfo.name}
                          onChange={(e) => updatePersonalInfo('name', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx)] focus:outline-indigo-500"
                          placeholder="e.g. Alex Rivera"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[var(--tx-2)] block mb-1">Email</label>
                        <input
                          type="email"
                          value={data.personalInfo.email}
                          onChange={(e) => updatePersonalInfo('email', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx)] focus:outline-indigo-500"
                          placeholder="alex@example.com"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[var(--tx-2)] block mb-1">Phone</label>
                        <input
                          type="text"
                          value={data.personalInfo.phone}
                          onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx)] focus:outline-indigo-500"
                          placeholder="+1 (555) 234-5678"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[var(--tx-2)] block mb-1">Location</label>
                        <input
                          type="text"
                          value={data.personalInfo.location}
                          onChange={(e) => updatePersonalInfo('location', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx)] focus:outline-indigo-500"
                          placeholder="San Francisco, CA"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[var(--tx-2)] block mb-1">LinkedIn</label>
                        <input
                          type="text"
                          value={data.personalInfo.linkedin || ''}
                          onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx)] focus:outline-indigo-500"
                          placeholder="linkedin.com/in/alex"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[var(--tx-2)] block mb-1">GitHub / Portfolio</label>
                        <input
                          type="text"
                          value={data.personalInfo.github || ''}
                          onChange={(e) => updatePersonalInfo('github', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx)] focus:outline-indigo-500"
                          placeholder="github.com/alex"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[var(--tx-2)] block mb-1">Professional Summary / Objective</label>
                      <textarea
                        rows={3}
                        value={data.summary || ''}
                        onChange={(e) => setData((prev) => ({ ...prev, summary: e.target.value }))}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx)] focus:outline-indigo-500"
                        placeholder="Concise overview of your professional background and core strengths..."
                      />
                    </div>
                  </div>
                )}

                {/* 2. Experience Tab */}
                {activeFormTab === 'experience' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--tx)] uppercase tracking-wider">Work History</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newExp = {
                            id: `exp_${Date.now()}`,
                            company: 'New Company',
                            role: 'Software Engineer',
                            location: 'City, State',
                            startDate: 'Jan 2023',
                            endDate: 'Present',
                            bullets: ['Implemented core business services, increasing customer engagement.'],
                          };
                          setData((prev) => ({ ...prev, experience: [...prev.experience, newExp] }));
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 hover:bg-indigo-100 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Job</span>
                      </button>
                    </div>

                    {data.experience.map((exp, expIdx) => (
                      <div key={exp.id} className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] space-y-2.5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[var(--tx)]">Job #{expIdx + 1}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setData((prev) => ({
                                ...prev,
                                experience: prev.experience.filter((_, i) => i !== expIdx),
                              }))
                            }
                            className="text-rose-500 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="text-[10px] font-semibold text-[var(--tx-3)] block mb-0.5">Role / Title</label>
                            <input
                              type="text"
                              value={exp.role}
                              onChange={(e) => {
                                const val = e.target.value;
                                setData((prev) => {
                                  const copy = [...prev.experience];
                                  copy[expIdx] = { ...copy[expIdx], role: val };
                                  return { ...prev, experience: copy };
                                });
                              }}
                              className="w-full px-2.5 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)]"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-semibold text-[var(--tx-3)] block mb-0.5">Company</label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => {
                                const val = e.target.value;
                                setData((prev) => {
                                  const copy = [...prev.experience];
                                  copy[expIdx] = { ...copy[expIdx], company: val };
                                  return { ...prev, experience: copy };
                                });
                              }}
                              className="w-full px-2.5 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)]"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-semibold text-[var(--tx-3)] block mb-0.5">Dates (e.g. Jun 2022 - Present)</label>
                            <div className="flex items-center gap-1.5">
                              <input
                                type="text"
                                value={exp.startDate}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setData((prev) => {
                                    const copy = [...prev.experience];
                                    copy[expIdx] = { ...copy[expIdx], startDate: val };
                                    return { ...prev, experience: copy };
                                  });
                                }}
                                placeholder="Start"
                                className="w-1/2 px-2.5 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)]"
                              />
                              <span className="text-xs text-[var(--tx-3)]">–</span>
                              <input
                                type="text"
                                value={exp.endDate}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setData((prev) => {
                                    const copy = [...prev.experience];
                                    copy[expIdx] = { ...copy[expIdx], endDate: val };
                                    return { ...prev, experience: copy };
                                  });
                                }}
                                placeholder="End"
                                className="w-1/2 px-2.5 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)]"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] font-semibold text-[var(--tx-3)] block mb-0.5">Location</label>
                            <input
                              type="text"
                              value={exp.location}
                              onChange={(e) => {
                                const val = e.target.value;
                                setData((prev) => {
                                  const copy = [...prev.experience];
                                  copy[expIdx] = { ...copy[expIdx], location: val };
                                  return { ...prev, experience: copy };
                                });
                              }}
                              className="w-full px-2.5 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)]"
                            />
                          </div>
                        </div>

                        {/* Bullets */}
                        <div className="space-y-1.5 pt-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--tx-3)]">Bullet Points</label>
                          {exp.bullets.map((b, bIdx) => (
                            <div key={bIdx} className="flex items-center gap-1.5">
                              <input
                                type="text"
                                value={b}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setData((prev) => {
                                    const copy = [...prev.experience];
                                    const bCopy = [...copy[expIdx].bullets];
                                    bCopy[bIdx] = val;
                                    copy[expIdx] = { ...copy[expIdx], bullets: bCopy };
                                    return { ...prev, experience: copy };
                                  });
                                }}
                                className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)]"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setData((prev) => {
                                    const copy = [...prev.experience];
                                    copy[expIdx] = {
                                      ...copy[expIdx],
                                      bullets: copy[expIdx].bullets.filter((_, i) => i !== bIdx),
                                    };
                                    return { ...prev, experience: copy };
                                  });
                                }}
                                className="text-rose-400 hover:text-rose-500 p-1"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              setData((prev) => {
                                const copy = [...prev.experience];
                                copy[expIdx] = {
                                  ...copy[expIdx],
                                  bullets: [...copy[expIdx].bullets, 'New achievement or responsibility.'],
                                };
                                return { ...prev, experience: copy };
                              });
                            }}
                            className="text-[11px] text-indigo-500 hover:underline font-semibold mt-1 block"
                          >
                            + Add Bullet Point
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. Education Tab */}
                {activeFormTab === 'education' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--tx)] uppercase tracking-wider">Degrees & Certs</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newEdu = {
                            id: `edu_${Date.now()}`,
                            institution: 'University Name',
                            degree: 'B.S. in Computer Science',
                            location: 'City, State',
                            startDate: '2018',
                            endDate: '2022',
                            gpa: '3.8 / 4.0',
                          };
                          setData((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 hover:bg-indigo-100 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Education</span>
                      </button>
                    </div>

                    {data.education.map((edu, eduIdx) => (
                      <div key={edu.id} className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] space-y-2.5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[var(--tx)]">School #{eduIdx + 1}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setData((prev) => ({
                                ...prev,
                                education: prev.education.filter((_, i) => i !== eduIdx),
                              }))
                            }
                            className="text-rose-500 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="text-[10px] font-semibold text-[var(--tx-3)] block mb-0.5">Institution</label>
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) => {
                                const val = e.target.value;
                                setData((prev) => {
                                  const copy = [...prev.education];
                                  copy[eduIdx] = { ...copy[eduIdx], institution: val };
                                  return { ...prev, education: copy };
                                });
                              }}
                              className="w-full px-2.5 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)]"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-semibold text-[var(--tx-3)] block mb-0.5">Degree / Major</label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => {
                                const val = e.target.value;
                                setData((prev) => {
                                  const copy = [...prev.education];
                                  copy[eduIdx] = { ...copy[eduIdx], degree: val };
                                  return { ...prev, education: copy };
                                });
                              }}
                              className="w-full px-2.5 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)]"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-semibold text-[var(--tx-3)] block mb-0.5">Dates</label>
                            <div className="flex items-center gap-1.5">
                              <input
                                type="text"
                                value={edu.startDate}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setData((prev) => {
                                    const copy = [...prev.education];
                                    copy[eduIdx] = { ...copy[eduIdx], startDate: val };
                                    return { ...prev, education: copy };
                                  });
                                }}
                                placeholder="Start"
                                className="w-1/2 px-2.5 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)]"
                              />
                              <span className="text-xs text-[var(--tx-3)]">–</span>
                              <input
                                type="text"
                                value={edu.endDate}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setData((prev) => {
                                    const copy = [...prev.education];
                                    copy[eduIdx] = { ...copy[eduIdx], endDate: val };
                                    return { ...prev, education: copy };
                                  });
                                }}
                                placeholder="End"
                                className="w-1/2 px-2.5 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)]"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] font-semibold text-[var(--tx-3)] block mb-0.5">GPA / Honors (Optional)</label>
                            <input
                              type="text"
                              value={edu.gpa || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setData((prev) => {
                                  const copy = [...prev.education];
                                  copy[eduIdx] = { ...copy[eduIdx], gpa: val };
                                  return { ...prev, education: copy };
                                });
                              }}
                              placeholder="e.g. 3.9 / 4.0"
                              className="w-full px-2.5 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)]"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. Projects Tab */}
                {activeFormTab === 'projects' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--tx)] uppercase tracking-wider">Projects</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newProj = {
                            id: `proj_${Date.now()}`,
                            name: 'Project Title',
                            technologies: 'React, Node.js, TypeScript',
                            link: 'github.com/user/project',
                            bullets: ['Engineered full-stack system serving active users.'],
                          };
                          setData((prev) => ({ ...prev, projects: [...prev.projects, newProj] }));
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 hover:bg-indigo-100 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Project</span>
                      </button>
                    </div>

                    {data.projects.map((proj, projIdx) => (
                      <div key={proj.id} className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] space-y-2.5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[var(--tx)]">Project #{projIdx + 1}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setData((prev) => ({
                                ...prev,
                                projects: prev.projects.filter((_, i) => i !== projIdx),
                              }))
                            }
                            className="text-rose-500 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="text-[10px] font-semibold text-[var(--tx-3)] block mb-0.5">Project Name</label>
                            <input
                              type="text"
                              value={proj.name}
                              onChange={(e) => {
                                const val = e.target.value;
                                setData((prev) => {
                                  const copy = [...prev.projects];
                                  copy[projIdx] = { ...copy[projIdx], name: val };
                                  return { ...prev, projects: copy };
                                });
                              }}
                              className="w-full px-2.5 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)]"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-semibold text-[var(--tx-3)] block mb-0.5">Technologies Used</label>
                            <input
                              type="text"
                              value={proj.technologies}
                              onChange={(e) => {
                                const val = e.target.value;
                                setData((prev) => {
                                  const copy = [...prev.projects];
                                  copy[projIdx] = { ...copy[projIdx], technologies: val };
                                  return { ...prev, projects: copy };
                                });
                              }}
                              className="w-full px-2.5 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)]"
                            />
                          </div>
                        </div>

                        {/* Bullets */}
                        <div className="space-y-1.5 pt-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--tx-3)]">Bullets</label>
                          {proj.bullets.map((b, bIdx) => (
                            <div key={bIdx} className="flex items-center gap-1.5">
                              <input
                                type="text"
                                value={b}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setData((prev) => {
                                    const copy = [...prev.projects];
                                    const bCopy = [...copy[projIdx].bullets];
                                    bCopy[bIdx] = val;
                                    copy[projIdx] = { ...copy[projIdx], bullets: bCopy };
                                    return { ...prev, projects: copy };
                                  });
                                }}
                                className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)]"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setData((prev) => {
                                    const copy = [...prev.projects];
                                    copy[projIdx] = {
                                      ...copy[projIdx],
                                      bullets: copy[projIdx].bullets.filter((_, i) => i !== bIdx),
                                    };
                                    return { ...prev, projects: copy };
                                  });
                                }}
                                className="text-rose-400 hover:text-rose-500 p-1"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              setData((prev) => {
                                const copy = [...prev.projects];
                                copy[projIdx] = {
                                  ...copy[projIdx],
                                  bullets: [...copy[projIdx].bullets, 'Engineered new feature delivering measurable performance gains.'],
                                };
                                return { ...prev, projects: copy };
                              });
                            }}
                            className="text-[11px] text-indigo-500 hover:underline font-semibold mt-1 block"
                          >
                            + Add Bullet Point
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 5. Skills Tab */}
                {activeFormTab === 'skills' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--tx)] uppercase tracking-wider">Skill Categories</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newSkill = {
                            id: `skill_${Date.now()}`,
                            name: 'Category',
                            skills: 'Skill 1, Skill 2, Skill 3',
                          };
                          setData((prev) => ({ ...prev, skills: [...prev.skills, newSkill] }));
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 hover:bg-indigo-100 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Category</span>
                      </button>
                    </div>

                    {data.skills.map((skill, skillIdx) => (
                      <div key={skill.id} className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] space-y-1.5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => {
                              const val = e.target.value;
                              setData((prev) => {
                                const copy = [...prev.skills];
                                copy[skillIdx] = { ...copy[skillIdx], name: val };
                                return { ...prev, skills: copy };
                              });
                            }}
                            className="text-xs font-bold text-[var(--tx)] bg-transparent border-b border-dashed border-[var(--border)] pb-0.5 focus:outline-hidden"
                            placeholder="e.g. Languages"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setData((prev) => ({
                                ...prev,
                                skills: prev.skills.filter((_, i) => i !== skillIdx),
                              }))
                            }
                            className="text-rose-500 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={skill.skills}
                          onChange={(e) => {
                            const val = e.target.value;
                            setData((prev) => {
                              const copy = [...prev.skills];
                              copy[skillIdx] = { ...copy[skillIdx], skills: val };
                              return { ...prev, skills: copy };
                            });
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)]"
                          placeholder="Comma-separated skills list"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* 6. Certifications Tab */}
                {activeFormTab === 'certs' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--tx)] uppercase tracking-wider">Certifications</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newCert = {
                            id: `cert_${Date.now()}`,
                            name: 'AWS Certified Cloud Practitioner',
                            issuer: 'Amazon Web Services',
                            date: '2024',
                          };
                          setData((prev) => ({
                            ...prev,
                            certifications: [...(prev.certifications || []), newCert],
                          }));
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 hover:bg-indigo-100 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Certification</span>
                      </button>
                    </div>

                    {(data.certifications || []).map((cert, certIdx) => (
                      <div key={cert.id} className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] space-y-2 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[var(--tx)]">Cert #{certIdx + 1}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setData((prev) => ({
                                ...prev,
                                certifications: (prev.certifications || []).filter((_, i) => i !== certIdx),
                              }))
                            }
                            className="text-rose-500 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="sm:col-span-2">
                            <label className="text-[10px] font-semibold text-[var(--tx-3)] block mb-0.5">Title</label>
                            <input
                              type="text"
                              value={cert.name}
                              onChange={(e) => {
                                const val = e.target.value;
                                setData((prev) => {
                                  const copy = [...(prev.certifications || [])];
                                  copy[certIdx] = { ...copy[certIdx], name: val };
                                  return { ...prev, certifications: copy };
                                });
                              }}
                              className="w-full px-2 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)]"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-semibold text-[var(--tx-3)] block mb-0.5">Year / Date</label>
                            <input
                              type="text"
                              value={cert.date}
                              onChange={(e) => {
                                const val = e.target.value;
                                setData((prev) => {
                                  const copy = [...(prev.certifications || [])];
                                  copy[certIdx] = { ...copy[certIdx], date: val };
                                  return { ...prev, certifications: copy };
                                });
                              }}
                              className="w-full px-2 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)]"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Raw LaTeX Editor */
            <div className="flex-1 flex flex-col p-3 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[var(--tx-3)]">
                <span>Standard Overleaf / pdflatex compatible source</span>
                <span>{latexCode.split('\n').length} lines</span>
              </div>
              <textarea
                rows={25}
                value={latexCode}
                onChange={(e) => setLatexCode(e.target.value)}
                spellCheck={false}
                className="w-full flex-1 p-3 text-xs font-mono rounded-xl border border-[var(--border)] bg-neutral-900 text-neutral-100 focus:outline-indigo-500 leading-relaxed resize-none"
              />
            </div>
          )}
        </div>

        {/* Right Column: Live PDF Preview Canvas (Cols 7-12) */}
        <div className="lg:col-span-6 flex flex-col border border-[var(--border)] rounded-2xl bg-[var(--bg)] overflow-hidden shadow-2xs">
          {/* Preview Toolbar */}
          <div className="flex items-center justify-between p-2.5 border-b border-[var(--border)] bg-[var(--bg-card)]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[var(--tx)] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                Live Preview
              </span>
              {isCompiling && (
                <span className="text-[10px] text-indigo-500 flex items-center gap-1 animate-pulse font-medium">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Updating...
                </span>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center gap-1 bg-[var(--bg-subtle)] p-0.5 rounded-lg border border-[var(--border)]">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-1 rounded text-[var(--tx)] hover:bg-[var(--bg)] disabled:opacity-30 cursor-pointer"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-semibold text-[var(--tx)] px-1">
                  {currentPage} / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="p-1 rounded text-[var(--tx)] hover:bg-[var(--bg)] disabled:opacity-30 cursor-pointer"
                  title="Next Page"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Canvas Scroll Area */}
          <div className="flex-1 p-4 bg-neutral-900/5 flex items-start justify-center overflow-auto max-h-[660px]">
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto bg-white rounded-lg shadow-md border border-neutral-200 block"
            />
          </div>
        </div>
      </div>

      {/* Upload Custom Template Modal */}
      <TemplateUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onTemplateSaved={handleTemplateSaved}
      />
    </div>
  );
}
