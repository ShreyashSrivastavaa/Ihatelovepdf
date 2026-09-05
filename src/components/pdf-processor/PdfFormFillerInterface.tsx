'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  FileText,
  Type,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  Loader2,
  Trash2,
  RotateCcw,
  Info,
  Bold,
  Italic,
} from 'lucide-react';
import {
  inspectPdfForm,
  fillPdfForm,
  PdfFormFieldMeta,
  FreeformTextPlacement,
} from '../../lib/operations/form-filler';
import { createPdfBlob } from '../../lib/pdf-processor';

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

export interface PdfFormFillerInterfaceProps {
  file: File;
  onDone?: (blob: Blob) => void;
  isProcessing?: boolean;
}

interface PageMeta {
  pageNumber: number;
  width: number;
  height: number;
  rotation: number;
}

const FONT_FAMILIES = ['Helvetica', 'Times', 'Courier'] as const;
const FONT_SIZES = [9, 10, 11, 12, 14, 16, 18, 24, 30];
const TEXT_COLORS = ['#000000', '#1e3a8a', '#2563eb', '#dc2626', '#059669', '#7c3aed'];

export default function PdfFormFillerInterface({
  file,
  onDone,
  isProcessing: externalProcessing = false,
}: PdfFormFillerInterfaceProps) {
  // Form inspection state
  const [isInspecting, setIsInspecting] = useState<boolean>(true);
  const [fields, setFields] = useState<PdfFormFieldMeta[]>([]);
  const [fieldValues, setFieldValues] = useState<Record<string, string | boolean>>({});
  const [flatten, setFlatten] = useState<boolean>(true);

  // Mode: 'acroForm' or 'clickToType'
  const [activeTab, setActiveTab] = useState<'acroForm' | 'clickToType'>('acroForm');

  // Click-to-Type Placements
  const [textPlacements, setTextPlacements] = useState<FreeformTextPlacement[]>([]);
  const [selectedPlacementId, setSelectedPlacementId] = useState<string | null>(null);

  // PDF.js rendering state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pdfDocument, setPdfDocument] = useState<any>(null);
  const [pages, setPages] = useState<PageMeta[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.0);
  const [isLoadingPdf, setIsLoadingPdf] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const pageCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeRenderTaskRef = useRef<{ cancel: () => void; promise: Promise<unknown> } | null>(null);
  const pageContainerRef = useRef<HTMLDivElement | null>(null);

  // 1. Inspect PDF for AcroForm fields
  useEffect(() => {
    let isCancelled = false;
    async function inspect() {
      setIsInspecting(true);
      try {
        const foundFields = await inspectPdfForm(file);
        if (isCancelled) return;

        setFields(foundFields);
        const initialVals: Record<string, string | boolean> = {};
        foundFields.forEach((f) => {
          if (f.value !== undefined && f.value !== null) {
            initialVals[f.name] = f.value;
          } else if (f.type === 'checkbox') {
            initialVals[f.name] = false;
          } else {
            initialVals[f.name] = '';
          }
        });
        setFieldValues(initialVals);

        if (foundFields.length === 0) {
          setActiveTab('clickToType');
        } else {
          setActiveTab('acroForm');
        }
      } catch (err) {
        console.warn('Form inspection error:', err);
      } finally {
        if (!isCancelled) setIsInspecting(false);
      }
    }
    inspect();
    return () => {
      isCancelled = true;
    };
  }, [file]);

  // 2. Load PDF document for visual rendering
  useEffect(() => {
    let isCancelled = false;
    async function loadPdf() {
      setIsLoadingPdf(true);
      try {
        const pdfjs = await getPdfJs();
        const arrayBuffer = await file.arrayBuffer();
        const doc = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        if (isCancelled) return;

        setPdfDocument(doc);
        const metaList: PageMeta[] = [];
        for (let i = 1; i <= doc.numPages; i++) {
          const page = await doc.getPage(i);
          const vp = page.getViewport({ scale: 1.0 });
          metaList.push({
            pageNumber: i,
            width: vp.width,
            height: vp.height,
            rotation: page.rotate || 0,
          });
        }
        if (isCancelled) return;
        setPages(metaList);
        setCurrentPageIndex(0);

        const defaultWidth = metaList[0]?.width || 595;
        const availableWidth = Math.min(window.innerWidth - 100, 750);
        const autoScale = Math.min(1.1, Math.max(0.6, availableWidth / defaultWidth));
        setScale(autoScale);
      } catch (err) {
        if (!isCancelled) {
          console.error('Failed to load PDF in PdfFormFillerInterface:', err);
        }
      } finally {
        if (!isCancelled) setIsLoadingPdf(false);
      }
    }
    loadPdf();
    return () => {
      isCancelled = true;
    };
  }, [file]);

  // 3. Render current page onto canvas
  useEffect(() => {
    if (!pdfDocument || pages.length === 0) return;
    let isCancelled = false;

    async function renderPage() {
      // 1. If another render task is currently in flight, cancel it and WAIT for PDF.js to release the canvas
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
        const page = await pdfDocument.getPage(currentPageIndex + 1);
        if (isCancelled) return;

        const viewport = page.getViewport({ scale });
        const canvas = pageCanvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Double check if another render was started while getting page
        if (activeRenderTaskRef.current) {
          try {
            activeRenderTaskRef.current.cancel();
            await activeRenderTaskRef.current.promise.catch(() => {});
          } catch {
            // ignore
          }
        }
        if (isCancelled) return;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderTask = page.render({
          canvasContext: ctx,
          viewport,
        });
        activeRenderTaskRef.current = renderTask;

        try {
          await renderTask.promise;
        } finally {
          if (activeRenderTaskRef.current === renderTask) {
            activeRenderTaskRef.current = null;
          }
        }
      } catch (err: unknown) {
        const errorName = err && typeof err === 'object' && 'name' in err ? (err as { name: string }).name : '';
        if (!isCancelled && errorName !== 'RenderingCancelledException') {
          console.warn('Page rendering interrupted:', err);
        }
      }
    }

    renderPage();
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
  }, [pdfDocument, currentPageIndex, scale, pages]);

  // Click-to-Type: Add text block where user clicks on the page
  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeTab !== 'clickToType') return;
    if ((e.target as HTMLElement).closest('.text-placement-item')) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) / scale;
    const clickY = (e.clientY - rect.top) / scale;

    const newPlacement: FreeformTextPlacement = {
      id: `text_${Date.now()}`,
      pageIndex: currentPageIndex,
      x: Math.max(10, Math.round(clickX)),
      y: Math.max(10, Math.round(clickY)),
      text: 'Type text here',
      fontSize: 12,
      fontFamily: 'Helvetica',
      color: '#000000',
      bold: false,
      italic: false,
    };

    setTextPlacements((prev) => [...prev, newPlacement]);
    setSelectedPlacementId(newPlacement.id);
  };

  // Dragging placement
  const activeDragRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    initX: number;
    initY: number;
  } | null>(null);

  const handlePointerDown = (e: React.PointerEvent, id: string) => {
    e.stopPropagation();
    const target = textPlacements.find((p) => p.id === id);
    if (!target) return;

    setSelectedPlacementId(id);
    activeDragRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      initX: target.x,
      initY: target.y,
    };

    const handlePointerMove = (moveEvt: PointerEvent) => {
      if (!activeDragRef.current) return;
      const { id, startX, startY, initX, initY } = activeDragRef.current;
      const deltaX = (moveEvt.clientX - startX) / scale;
      const deltaY = (moveEvt.clientY - startY) / scale;

      setTextPlacements((prev) =>
        prev.map((p) => (p.id === id ? { ...p, x: Math.max(0, initX + deltaX), y: Math.max(0, initY + deltaY) } : p))
      );
    };

    const handlePointerUp = () => {
      activeDragRef.current = null;
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  // Selected placement update helpers
  const updateSelectedPlacement = (partial: Partial<FreeformTextPlacement>) => {
    if (!selectedPlacementId) return;
    setTextPlacements((prev) =>
      prev.map((p) => (p.id === selectedPlacementId ? { ...p, ...partial } : p))
    );
  };

  const deleteSelectedPlacement = () => {
    if (!selectedPlacementId) return;
    setTextPlacements((prev) => prev.filter((p) => p.id !== selectedPlacementId));
    setSelectedPlacementId(null);
  };

  const selectedPlacement = useMemo(
    () => textPlacements.find((p) => p.id === selectedPlacementId),
    [textPlacements, selectedPlacementId]
  );

  const currentPageTextPlacements = useMemo(
    () => textPlacements.filter((p) => p.pageIndex === currentPageIndex),
    [textPlacements, currentPageIndex]
  );

  // Export Action
  const handleExport = async () => {
    setIsExporting(true);
    try {
      const filledBytes = await fillPdfForm(file, {
        acroValues: fieldValues,
        flatten,
        textPlacements,
      });

      const blob = createPdfBlob(filledBytes);
      if (onDone) {
        onDone(blob);
      } else {
        const outName = `${file.name.replace(/\.[^/.]+$/, '')}_filled.pdf`;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = outName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      }
    } catch (err) {
      console.error('Failed to fill and export PDF form:', err);
      alert('Failed to generate filled PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl shadow-xl overflow-hidden text-[var(--tx)]">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-[var(--border)] bg-[var(--bg-2)]/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)] shadow-xs">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold flex items-center gap-2">
              <span>Fill PDF Form</span>
              {fields.length > 0 ? (
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                  {fields.length} Interactive Fields
                </span>
              ) : (
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 font-semibold border border-blue-500/20">
                  Click-to-Type Mode
                </span>
              )}
            </h2>
            <p className="text-xs text-[var(--tx-3)] truncate max-w-xs sm:max-w-md">{file.name}</p>
          </div>
        </div>

        {/* Tab Selector & Export Action */}
        <div className="flex items-center gap-3">
          {fields.length > 0 && (
            <div className="flex items-center p-1 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('acroForm')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'acroForm'
                    ? 'bg-[var(--accent)] text-white shadow-xs'
                    : 'text-[var(--tx-2)] hover:text-[var(--tx)]'
                }`}
              >
                Form Fields ({fields.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('clickToType')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'clickToType'
                    ? 'bg-[var(--accent)] text-white shadow-xs'
                    : 'text-[var(--tx-2)] hover:text-[var(--tx)]'
                }`}
              >
                Click-to-Type ({textPlacements.length})
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={handleExport}
            disabled={isExporting || externalProcessing}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span>Save & Download PDF</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex flex-col lg:flex-row min-h-[640px]">
        {/* Left Side: Form Fields Panel (or Click-to-Type instructions) */}
        <div className="w-full lg:w-96 border-b lg:border-b-0 lg:border-r border-[var(--border)] p-4 bg-[var(--bg)] flex flex-col gap-4 overflow-y-auto max-h-[600px] lg:max-h-none">
          {isInspecting ? (
            <div className="flex flex-col items-center justify-center p-8 text-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
              <p className="text-xs font-semibold text-[var(--tx-2)]">Detecting interactive PDF form fields...</p>
            </div>
          ) : activeTab === 'acroForm' && fields.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--tx-2)] uppercase tracking-wider">
                  Fill Document Fields
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const cleared: Record<string, string | boolean> = {};
                    fields.forEach((f) => (cleared[f.name] = f.type === 'checkbox' ? false : ''));
                    setFieldValues(cleared);
                  }}
                  className="text-xs text-[var(--tx-3)] hover:text-red-500 font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              </div>

              {/* Form Fields Generator */}
              <div className="space-y-3.5">
                {fields.map((field) => {
                  const val = fieldValues[field.name];

                  return (
                    <div
                      key={field.name}
                      className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] space-y-1.5 shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-[var(--tx)] truncate max-w-[200px]" title={field.name}>
                          {field.name}
                        </label>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-2)] text-[var(--tx-3)] font-mono uppercase">
                          {field.type}
                        </span>
                      </div>

                      {/* Text Input */}
                      {field.type === 'text' && (
                        field.isMultiline ? (
                          <textarea
                            rows={3}
                            value={String(val || '')}
                            onChange={(e) => setFieldValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
                            className="input-modern w-full text-xs font-normal"
                            placeholder="Enter text..."
                          />
                        ) : (
                          <input
                            type="text"
                            value={String(val || '')}
                            onChange={(e) => setFieldValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
                            className="input-modern w-full text-xs"
                            placeholder="Enter text..."
                          />
                        )
                      )}

                      {/* Checkbox Input */}
                      {field.type === 'checkbox' && (
                        <label className="flex items-center gap-2 cursor-pointer pt-1">
                          <input
                            type="checkbox"
                            checked={Boolean(val)}
                            onChange={(e) => setFieldValues((prev) => ({ ...prev, [field.name]: e.target.checked }))}
                            className="w-4 h-4 rounded text-blue-600 border-[var(--border)] cursor-pointer"
                          />
                          <span className="text-xs text-[var(--tx-2)] font-medium">Checked</span>
                        </label>
                      )}

                      {/* Dropdown Input */}
                      {field.type === 'dropdown' && (
                        <select
                          value={String(val || '')}
                          onChange={(e) => setFieldValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
                          className="input-modern w-full text-xs cursor-pointer"
                        >
                          <option value="">Select option...</option>
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      )}

                      {/* Radio Input */}
                      {field.type === 'radio' && (
                        <div className="space-y-1.5 pt-1">
                          {field.options?.map((opt) => (
                            <label key={opt} className="flex items-center gap-2 text-xs text-[var(--tx-2)] cursor-pointer">
                              <input
                                type="radio"
                                name={field.name}
                                value={opt}
                                checked={val === opt}
                                onChange={() => setFieldValues((prev) => ({ ...prev, [field.name]: opt }))}
                                className="cursor-pointer"
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Flatten Option Toggle */}
              <div className="pt-3 border-t border-[var(--border)]">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={flatten}
                    onChange={(e) => setFlatten(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-blue-600 border-[var(--border)] cursor-pointer"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-[var(--tx)] block">Flatten form fields</span>
                    <span className="text-[var(--tx-3)] block leading-snug">
                      Permanently burns values into document streams, making responses final across all viewers.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          ) : (
            /* Click-to-Type Toolbar and Property Inspector */
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300 text-xs leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <Info className="w-4 h-4 text-blue-500" />
                  <span>Click-to-Type Mode</span>
                </div>
                Click anywhere on the preview page on the right to position a typewriter text box.
              </div>

              {selectedPlacement ? (
                <div className="space-y-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
                      Selected Text Box
                    </span>
                    <button
                      type="button"
                      onClick={deleteSelectedPlacement}
                      className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer"
                      title="Delete text"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Text Content Input */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-[var(--tx-2)]">Text Content</label>
                    <textarea
                      rows={3}
                      value={selectedPlacement.text}
                      onChange={(e) => updateSelectedPlacement({ text: e.target.value })}
                      className="input-modern w-full text-xs"
                      autoFocus
                    />
                  </div>

                  {/* Font Family & Size */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[var(--tx-2)]">Font</label>
                      <select
                        value={selectedPlacement.fontFamily}
                        onChange={(e) =>
                          updateSelectedPlacement({ fontFamily: e.target.value as typeof FONT_FAMILIES[number] })
                        }
                        className="input-modern w-full text-xs"
                      >
                        {FONT_FAMILIES.map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[var(--tx-2)]">Size (pt)</label>
                      <select
                        value={selectedPlacement.fontSize}
                        onChange={(e) => updateSelectedPlacement({ fontSize: Number(e.target.value) })}
                        className="input-modern w-full text-xs"
                      >
                        {FONT_SIZES.map((s) => (
                          <option key={s} value={s}>
                            {s} pt
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Styling Toggles & Colors */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => updateSelectedPlacement({ bold: !selectedPlacement.bold })}
                        className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
                          selectedPlacement.bold
                            ? 'bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--accent)] font-bold'
                            : 'border-[var(--border)] text-[var(--tx-2)]'
                        }`}
                        title="Bold"
                      >
                        <Bold className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => updateSelectedPlacement({ italic: !selectedPlacement.italic })}
                        className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
                          selectedPlacement.italic
                            ? 'bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--accent)] font-bold'
                            : 'border-[var(--border)] text-[var(--tx-2)]'
                        }`}
                        title="Italic"
                      >
                        <Italic className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      {TEXT_COLORS.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => updateSelectedPlacement({ color: c })}
                          style={{ backgroundColor: c }}
                          className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer ${
                            selectedPlacement.color === c ? 'scale-125 border-white shadow-xs' : 'border-transparent'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-dashed border-[var(--border)] text-center text-xs text-[var(--tx-3)] space-y-1">
                  <Type className="w-6 h-6 mx-auto text-[var(--tx-3)] opacity-60" />
                  <p className="font-medium">No text box selected.</p>
                  <p className="text-[11px]">Click anywhere on the document to add a text box.</p>
                </div>
              )}

              {/* List of Placed Text Blocks */}
              {textPlacements.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-[var(--border)]">
                  <span className="text-[11px] font-bold text-[var(--tx-3)] uppercase tracking-wider">
                    All Placed Text ({textPlacements.length})
                  </span>
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {textPlacements.map((p, idx) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setCurrentPageIndex(p.pageIndex);
                          setSelectedPlacementId(p.id);
                        }}
                        className={`p-2 rounded-lg text-xs flex items-center justify-between cursor-pointer transition-colors ${
                          p.id === selectedPlacementId
                            ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-semibold'
                            : 'hover:bg-[var(--bg-2)] text-[var(--tx-2)]'
                        }`}
                      >
                        <span className="truncate max-w-[180px]">
                          #{idx + 1}: {p.text}
                        </span>
                        <span className="text-[10px] text-[var(--tx-3)]">P.{p.pageIndex + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Visual Document Viewer */}
        <div className="flex-1 flex flex-col bg-slate-900/10 dark:bg-slate-950/40 relative min-h-[500px]">
          {/* Zoom and Navigation Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between gap-3 px-4 py-2 bg-[var(--bg-card)]/90 backdrop-blur-md border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPageIndex <= 0}
                onClick={() => setCurrentPageIndex((prev) => Math.max(0, prev - 1))}
                className="p-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--bg-2)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-semibold text-[var(--tx)]">
                Page {currentPageIndex + 1} of {pages.length || 1}
              </span>
              <button
                type="button"
                disabled={currentPageIndex >= pages.length - 1}
                onClick={() => setCurrentPageIndex((prev) => Math.min(pages.length - 1, prev + 1))}
                className="p-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--bg-2)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setScale((s) => Math.max(0.4, Number((s - 0.15).toFixed(2))))}
                className="p-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--bg-2)] cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-mono font-semibold px-2">{Math.round(scale * 100)}%</span>
              <button
                type="button"
                onClick={() => setScale((s) => Math.min(2.5, Number((s + 0.15).toFixed(2))))}
                className="p-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--bg-2)] cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setScale(1.0)}
                className="px-2 py-1 rounded-lg border border-[var(--border)] text-[11px] font-medium hover:bg-[var(--bg-2)] cursor-pointer"
              >
                100%
              </button>
            </div>
          </div>

          {/* Canvas Scroll Area */}
          <div
            ref={pageContainerRef}
            onClick={() => setSelectedPlacementId(null)}
            className="flex-1 overflow-auto p-6 flex items-center justify-center relative select-none"
          >
            {isLoadingPdf ? (
              <div className="flex flex-col items-center gap-3 text-[var(--tx-3)]">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" />
                <span className="text-xs font-medium">Loading document pages...</span>
              </div>
            ) : (
              <div
                onClick={handlePageClick}
                className="relative bg-white shadow-2xl rounded-sm transition-all"
                style={{
                  width: (pages[currentPageIndex]?.width || 595) * scale,
                  height: (pages[currentPageIndex]?.height || 842) * scale,
                  cursor: activeTab === 'clickToType' ? 'crosshair' : 'default',
                }}
              >
                {/* PDF Background Canvas */}
                <canvas ref={pageCanvasRef} className="block w-full h-full pointer-events-none" />

                {/* Overlaid Click-to-Type Text Placements */}
                {currentPageTextPlacements.map((placement) => {
                  const isSelected = placement.id === selectedPlacementId;
                  const left = placement.x * scale;
                  const top = placement.y * scale;

                  return (
                    <div
                      key={placement.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlacementId(placement.id);
                      }}
                      onPointerDown={(e) => handlePointerDown(e, placement.id)}
                      style={{
                        position: 'absolute',
                        left: `${left}px`,
                        top: `${top}px`,
                        color: placement.color,
                        fontSize: `${(placement.fontSize || 12) * scale}px`,
                        fontFamily: placement.fontFamily || 'Helvetica',
                        fontWeight: placement.bold ? 'bold' : 'normal',
                        fontStyle: placement.italic ? 'italic' : 'normal',
                        cursor: 'move',
                      }}
                      className={`text-placement-item px-1 py-0.5 rounded leading-tight whitespace-pre-wrap select-none ${
                        isSelected
                          ? 'ring-2 ring-blue-500 bg-blue-500/10 z-30'
                          : 'hover:ring-1 hover:ring-blue-300 z-20'
                      }`}
                    >
                      {placement.text}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
