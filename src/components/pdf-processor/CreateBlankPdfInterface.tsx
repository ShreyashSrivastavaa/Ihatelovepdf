'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Download,
  Type,
  Image as ImageIcon,
  Square,
  Circle,
  Minus,
  Table as TableIcon,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Layers,
  Plus,
  RotateCw,
  Sparkles,
  Layout,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Pencil,
  Check,
} from 'lucide-react';
import {
  DocumentModel,
  PageModel,
  CanvasElement,
  TextElement,
  ImageElement,
  ShapeElement,
  TableElement,
  PageFormat,
  PageOrientation,
  FontFamily,
  TextAlignment,
  ShapeType,
  getPageSize,
  createEmptyPage,
  DOCUMENT_PRESETS,
  buildPdfFromDocumentModel,
} from '../../lib/pdf-engine/creator-engine';
import { createPdfBlob } from '../../lib/pdf-processor';
import type { BlankPdfPageSize, BlankPdfOrientation } from '../../lib/operations/converters';

export interface CreateBlankPdfInterfaceProps {
  initialPageCount?: number;
  initialPageSize?: BlankPdfPageSize;
  initialOrientation?: BlankPdfOrientation;
  isProcessing?: boolean;
  onGenerate?: (options: {
    pageCount: number;
    pageSize: BlankPdfPageSize;
    orientation: BlankPdfOrientation;
    documentModel?: DocumentModel;
  }) => void;
  onDone?: (blob: Blob) => void;
}

const COLOR_SWATCHES = [
  '#000000',
  '#1e293b',
  '#475569',
  '#2563eb',
  '#0f766e',
  '#059669',
  '#d97706',
  '#dc2626',
  '#7c3aed',
  '#ffffff',
];

export default function CreateBlankPdfInterface({
  initialPageSize = 'a4',
  initialOrientation = 'portrait',
  isProcessing = false,
  onGenerate,
  onDone,
}: CreateBlankPdfInterfaceProps) {
  // Document state initialized with blank preset
  const [doc, setDoc] = useState<DocumentModel>(() =>
    DOCUMENT_PRESETS.blank(initialPageSize as PageFormat, initialOrientation as PageOrientation)
  );
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [editingElementId, setEditingElementId] = useState<string | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(0.85);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<string>('blank');

  // Double-tap tracking for touch devices
  const lastTapRef = useRef<{ id: string; time: number }>({ id: '', time: 0 });

  // Dragging & Resizing tracking state
  const [dragInfo, setDragInfo] = useState<{
    elementId: string;
    action: 'move' | 'resize';
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
    initialW: number;
    initialH: number;
  } | null>(null);

  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentPage: PageModel = doc.pages[activePageIndex] || doc.pages[0];
  const pageSize = getPageSize(currentPage.format, currentPage.orientation);
  const selectedElement = currentPage.elements.find((el) => el.id === selectedElementId);

  // Switch presets
  const handleSelectPreset = (presetKey: string) => {
    setActivePreset(presetKey);
    const builder = DOCUMENT_PRESETS[presetKey];
    if (builder) {
      const newDoc = builder(currentPage.format, currentPage.orientation);
      setDoc(newDoc);
      setActivePageIndex(0);
      setSelectedElementId(null);
      setEditingElementId(null);
    }
  };

  // Change format or orientation for current page
  const updatePageFormat = (format: PageFormat) => {
    setDoc((prev) => ({
      ...prev,
      pages: prev.pages.map((p, idx) =>
        idx === activePageIndex ? { ...p, format } : p
      ),
    }));
  };

  const updatePageOrientation = (orientation: PageOrientation) => {
    setDoc((prev) => ({
      ...prev,
      pages: prev.pages.map((p, idx) =>
        idx === activePageIndex ? { ...p, orientation } : p
      ),
    }));
  };

  // Page management
  const addPage = () => {
    const newPage = createEmptyPage(currentPage.format, currentPage.orientation);
    setDoc((prev) => ({
      ...prev,
      pages: [...prev.pages, newPage],
    }));
    setActivePageIndex(doc.pages.length);
    setSelectedElementId(null);
    setEditingElementId(null);
  };

  const duplicatePage = () => {
    const clonedElements = currentPage.elements.map((el) => ({
      ...el,
      id: `el_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    }));
    const newPage: PageModel = {
      ...createEmptyPage(currentPage.format, currentPage.orientation),
      elements: clonedElements,
      backgroundColor: currentPage.backgroundColor,
    };
    setDoc((prev) => ({
      ...prev,
      pages: [...prev.pages.slice(0, activePageIndex + 1), newPage, ...prev.pages.slice(activePageIndex + 1)],
    }));
    setActivePageIndex(activePageIndex + 1);
    setSelectedElementId(null);
    setEditingElementId(null);
  };

  const removePage = () => {
    if (doc.pages.length <= 1) return;
    setDoc((prev) => ({
      ...prev,
      pages: prev.pages.filter((_, idx) => idx !== activePageIndex),
    }));
    setActivePageIndex(Math.max(0, activePageIndex - 1));
    setSelectedElementId(null);
    setEditingElementId(null);
  };

  // Add Elements
  const addTextElement = () => {
    const newEl: TextElement = {
      id: `text_${Date.now()}`,
      type: 'text',
      text: 'Type your text here',
      font: 'Helvetica',
      fontSize: 16,
      color: '#1e293b',
      alignment: 'left',
      x: 60,
      y: 80,
      width: 320,
      height: 44,
    };
    setDoc((prev) => ({
      ...prev,
      pages: prev.pages.map((p, idx) =>
        idx === activePageIndex ? { ...p, elements: [...p.elements, newEl] } : p
      ),
    }));
    setSelectedElementId(newEl.id);
    setEditingElementId(newEl.id);
  };

  const addShapeElement = (shapeType: ShapeType) => {
    const newEl: ShapeElement = {
      id: `shape_${Date.now()}`,
      type: 'shape',
      shapeType,
      x: 60,
      y: 100,
      width: shapeType === 'line' ? 300 : 160,
      height: shapeType === 'line' ? 0 : 100,
      fillColor: shapeType === 'line' ? 'transparent' : '#e2e8f0',
      strokeColor: '#64748b',
      strokeWidth: 1.5,
      borderRadius: shapeType === 'rectangle' ? 4 : 0,
      opacity: 1,
    };
    setDoc((prev) => ({
      ...prev,
      pages: prev.pages.map((p, idx) =>
        idx === activePageIndex ? { ...p, elements: [...p.elements, newEl] } : p
      ),
    }));
    setSelectedElementId(newEl.id);
  };

  const addTableElement = () => {
    const newEl: TableElement = {
      id: `table_${Date.now()}`,
      type: 'table',
      x: 54,
      y: 120,
      width: Math.min(480, pageSize.width - 108),
      height: 90,
      rows: [
        ['Item', 'Quantity', 'Rate', 'Amount'],
        ['Standard License', '1', '$99.00', '$99.00'],
        ['Custom Integration', '4 hrs', '$65.00', '$260.00'],
      ],
      columnWidths: [180, 80, 100, 120],
      headerBackground: '#1e293b',
      headerTextColor: '#ffffff',
      cellBorders: true,
      borderColor: '#cbd5e1',
      fontSize: 10,
    };
    setDoc((prev) => ({
      ...prev,
      pages: prev.pages.map((p, idx) =>
        idx === activePageIndex ? { ...p, elements: [...p.elements, newEl] } : p
      ),
    }));
    setSelectedElementId(newEl.id);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const aspect = img.naturalWidth / (img.naturalHeight || 1);
        const w = Math.min(260, pageSize.width - 120);
        const h = w / aspect;

        const newEl: ImageElement = {
          id: `img_${Date.now()}`,
          type: 'image',
          dataUrl,
          x: 60,
          y: 80,
          width: Math.round(w),
          height: Math.round(h),
          opacity: 1,
        };
        setDoc((prev) => ({
          ...prev,
          pages: prev.pages.map((p, idx) =>
            idx === activePageIndex ? { ...p, elements: [...p.elements, newEl] } : p
          ),
        }));
        setSelectedElementId(newEl.id);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Element mutations
  const updateElement = useCallback(
    (id: string, updates: Partial<CanvasElement>) => {
      setDoc((prev) => ({
        ...prev,
        pages: prev.pages.map((p, idx) => {
          if (idx !== activePageIndex) return p;
          return {
            ...p,
            elements: p.elements.map((el) => (el.id === id ? ({ ...el, ...updates } as CanvasElement) : el)),
          };
        }),
      }));
    },
    [activePageIndex]
  );

  const deleteElement = useCallback(
    (id: string) => {
      setDoc((prev) => ({
        ...prev,
        pages: prev.pages.map((p, idx) =>
          idx === activePageIndex ? { ...p, elements: p.elements.filter((el) => el.id !== id) } : p
        ),
      }));
      if (selectedElementId === id) setSelectedElementId(null);
      if (editingElementId === id) setEditingElementId(null);
    },
    [activePageIndex, selectedElementId, editingElementId]
  );

  // Global keyboard shortcuts (Delete, Backspace, Escape, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If user is actively editing, Esc cancels/finishes edit
      if (editingElementId) {
        if (e.key === 'Escape') {
          setEditingElementId(null);
        }
        return;
      }

      // Check if target is an input or textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (selectedElementId) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          e.preventDefault();
          deleteElement(selectedElementId);
        } else if (e.key === 'Escape') {
          setSelectedElementId(null);
          setEditingElementId(null);
        } else if (e.key === 'Enter') {
          const el = currentPage.elements.find((item) => item.id === selectedElementId);
          if (el && el.type === 'text') {
            e.preventDefault();
            setEditingElementId(el.id);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElementId, editingElementId, currentPage.elements, deleteElement]);

  const duplicateElement = (id: string) => {
    const el = currentPage.elements.find((e) => e.id === id);
    if (!el) return;
    const cloned: CanvasElement = {
      ...el,
      id: `el_${Date.now()}`,
      x: el.x + 20,
      y: el.y + 20,
    };
    setDoc((prev) => ({
      ...prev,
      pages: prev.pages.map((p, idx) =>
        idx === activePageIndex ? { ...p, elements: [...p.elements, cloned] } : p
      ),
    }));
    setSelectedElementId(cloned.id);
  };

  const changeElementLayer = (id: string, direction: 'forward' | 'backward') => {
    setDoc((prev) => ({
      ...prev,
      pages: prev.pages.map((p, idx) => {
        if (idx !== activePageIndex) return p;
        const index = p.elements.findIndex((e) => e.id === id);
        if (index === -1) return p;
        const newElements = [...p.elements];
        const [target] = newElements.splice(index, 1);
        const newIndex =
          direction === 'forward'
            ? Math.min(newElements.length, index + 1)
            : Math.max(0, index - 1);
        newElements.splice(newIndex, 0, target);
        return { ...p, elements: newElements };
      }),
    }));
  };

  // Element click / double tap handler
  const handleElementClick = (e: React.MouseEvent, el: CanvasElement) => {
    e.stopPropagation();
    const isAlreadySelected = selectedElementId === el.id;
    setSelectedElementId(el.id);

    if (el.type === 'text') {
      const now = Date.now();
      const isDoubleTap = lastTapRef.current.id === el.id && now - lastTapRef.current.time < 380;

      // Enter editing mode on double tap OR if clicked while already selected
      if (isDoubleTap || isAlreadySelected) {
        setEditingElementId(el.id);
        lastTapRef.current = { id: '', time: 0 };
      } else {
        lastTapRef.current = { id: el.id, time: now };
      }
    }
  };

  // Drag and Resize Pointer Events
  const handlePointerDown = (
    e: React.PointerEvent,
    elementId: string,
    action: 'move' | 'resize'
  ) => {
    e.stopPropagation();
    // If currently editing text and trying to select/drag inside textarea, ignore move drag
    if (editingElementId === elementId && action === 'move') {
      return;
    }

    setSelectedElementId(elementId);
    const el = currentPage.elements.find((item) => item.id === elementId);
    if (!el) return;

    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    setDragInfo({
      elementId,
      action,
      startX: e.clientX,
      startY: e.clientY,
      initialX: el.x,
      initialY: el.y,
      initialW: el.width,
      initialH: el.height,
    });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragInfo) return;
    if (editingElementId === dragInfo.elementId && dragInfo.action === 'move') {
      return;
    }
    const dx = (e.clientX - dragInfo.startX) / zoomScale;
    const dy = (e.clientY - dragInfo.startY) / zoomScale;

    if (dragInfo.action === 'move') {
      const newX = Math.round(Math.max(0, Math.min(pageSize.width - 20, dragInfo.initialX + dx)));
      const newY = Math.round(Math.max(0, Math.min(pageSize.height - 20, dragInfo.initialY + dy)));
      updateElement(dragInfo.elementId, { x: newX, y: newY });
    } else if (dragInfo.action === 'resize') {
      const newW = Math.round(Math.max(30, dragInfo.initialW + dx));
      const newH = Math.round(Math.max(15, dragInfo.initialH + dy));
      updateElement(dragInfo.elementId, { width: newW, height: newH });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragInfo) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Ignore if pointer capture already lost
      }
      setDragInfo(null);
    }
  };

  // Export PDF Handler
  const handleExportPdf = async () => {
    setIsExporting(true);
    try {
      if (onGenerate) {
        onGenerate({
          pageCount: doc.pages.length,
          pageSize: currentPage.format as BlankPdfPageSize,
          orientation: currentPage.orientation as BlankPdfOrientation,
          documentModel: doc,
        });
      } else {
        const bytes = await buildPdfFromDocumentModel(doc);
        const blob = createPdfBlob(bytes);
        if (onDone) {
          onDone(blob);
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${doc.title || 'document'}.pdf`;
          a.click();
          URL.revokeObjectURL(url);
        }
      }
    } catch (err) {
      console.error('[PDFPipeline] Export failed:', err);
      alert('Failed to generate PDF: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 select-none">
      {/* Hidden File Input for Image Insertion */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
      />

      {/* 1. Header Toolbar: Presets, Page Sizing, Export */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] shrink-0">
            <Layout className="h-5 w-5 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[var(--tx)] flex items-center gap-2">
              <span>PDF Canvas Studio</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                Shared Engine
              </span>
            </h2>
            <p className="text-xs text-[var(--tx-2)]">
              Design pages with text, images, shapes, and tables. 100% private in your browser.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Preset Picker */}
          <div className="flex items-center gap-1.5 bg-[var(--bg-subtle)] px-2.5 py-1.5 rounded-xl border border-[var(--border)] text-xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span className="font-medium text-[var(--tx-2)]">Preset:</span>
            <select
              value={activePreset}
              onChange={(e) => handleSelectPreset(e.target.value)}
              className="bg-transparent font-semibold text-[var(--tx)] focus:outline-hidden cursor-pointer"
            >
              <option value="blank">Blank Document</option>
              <option value="invoice">Commercial Invoice</option>
              <option value="letterhead">Executive Letterhead</option>
              <option value="certificate">Certificate of Achievement</option>
            </select>
          </div>

          {/* Format Selector */}
          <div className="flex items-center gap-1 bg-[var(--bg-subtle)] p-1 rounded-xl border border-[var(--border)]">
            {(['a4', 'letter', 'legal'] as PageFormat[]).map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => updatePageFormat(fmt)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase transition-colors ${
                  currentPage.format === fmt
                    ? 'bg-[var(--accent)] text-white shadow-xs'
                    : 'text-[var(--tx-2)] hover:text-[var(--tx)]'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>

          {/* Orientation Toggle */}
          <button
            type="button"
            onClick={() =>
              updatePageOrientation(currentPage.orientation === 'portrait' ? 'landscape' : 'portrait')
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--bg-subtle)] text-xs font-semibold text-[var(--tx)] transition-colors cursor-pointer"
            title="Toggle orientation"
          >
            <RotateCw className="h-3.5 w-3.5" />
            <span className="capitalize">{currentPage.orientation}</span>
          </button>

          {/* Export Action */}
          <button
            type="button"
            disabled={isExporting || isProcessing}
            onClick={handleExportPdf}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-50 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>{isExporting ? 'Generating PDF...' : 'Export PDF'}</span>
          </button>
        </div>
      </div>

      {/* 2. Main Studio Grid: Left Thumbnails, Center Canvas, Right Properties */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT: Page Navigation (Col 1-2) */}
        <div className="lg:col-span-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-3 space-y-3 flex flex-col justify-between max-h-[720px] overflow-y-auto">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--tx-2)]">
                Pages ({doc.pages.length})
              </span>
              <button
                type="button"
                onClick={addPage}
                className="flex items-center gap-1 text-[11px] font-semibold text-[var(--accent)] hover:underline cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            </div>

            {/* Thumbnail Cards */}
            <div className="space-y-2">
              {doc.pages.map((p, idx) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setActivePageIndex(idx);
                    setSelectedElementId(null);
                  }}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    idx === activePageIndex
                      ? 'border-[var(--accent)] bg-[var(--accent-soft)]/20 shadow-xs'
                      : 'border-[var(--border)] bg-[var(--bg)] hover:border-[var(--tx-3)]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-medium text-[var(--tx)] mb-1">
                    <span>Page {idx + 1}</span>
                    <span className="text-[10px] text-[var(--tx-3)] uppercase">{p.format}</span>
                  </div>
                  {/* Miniature Page Placeholder */}
                  <div
                    className="w-full h-16 bg-white border border-gray-200 rounded-md overflow-hidden relative shadow-inner flex items-center justify-center text-[10px] text-gray-400"
                  >
                    <span>{p.elements.length} elements</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Page Actions */}
          <div className="pt-2 border-t border-[var(--border)] space-y-1">
            <button
              type="button"
              onClick={duplicatePage}
              className="w-full py-1.5 px-2 rounded-lg text-xs font-medium text-[var(--tx)] hover:bg-[var(--bg-subtle)] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>Duplicate Page</span>
            </button>
            <button
              type="button"
              disabled={doc.pages.length <= 1}
              onClick={removePage}
              className="w-full py-1.5 px-2 rounded-lg text-xs font-medium text-rose-500 hover:bg-rose-500/10 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete Page</span>
            </button>
          </div>
        </div>

        {/* CENTER: Canvas Workspace (Col 3-9) */}
        <div className="lg:col-span-7 flex flex-col space-y-3">
          {/* Top Element Toolbar */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-2 flex items-center justify-between gap-2 overflow-x-auto">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={addTextElement}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] text-xs font-semibold text-[var(--tx)] transition-all cursor-pointer"
              >
                <Type className="h-3.5 w-3.5" />
                <span>Text</span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] text-xs font-semibold text-[var(--tx)] transition-all cursor-pointer"
              >
                <ImageIcon className="h-3.5 w-3.5" />
                <span>Image</span>
              </button>
              <button
                type="button"
                onClick={() => addShapeElement('rectangle')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] text-xs font-semibold text-[var(--tx)] transition-all cursor-pointer"
              >
                <Square className="h-3.5 w-3.5" />
                <span>Rect</span>
              </button>
              <button
                type="button"
                onClick={() => addShapeElement('circle')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] text-xs font-semibold text-[var(--tx)] transition-all cursor-pointer"
              >
                <Circle className="h-3.5 w-3.5" />
                <span>Circle</span>
              </button>
              <button
                type="button"
                onClick={() => addShapeElement('line')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] text-xs font-semibold text-[var(--tx)] transition-all cursor-pointer"
              >
                <Minus className="h-3.5 w-3.5" />
                <span>Line</span>
              </button>
              <button
                type="button"
                onClick={addTableElement}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] text-xs font-semibold text-[var(--tx)] transition-all cursor-pointer"
              >
                <TableIcon className="h-3.5 w-3.5" />
                <span>Table</span>
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-[var(--bg-subtle)] p-1 rounded-lg border border-[var(--border)] text-xs">
              <button
                type="button"
                onClick={() => setZoomScale((z) => Math.max(0.4, Number((z - 0.1).toFixed(2))))}
                className="p-1 rounded hover:bg-[var(--bg)] text-[var(--tx-2)] hover:text-[var(--tx)] cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="font-semibold text-[var(--tx)] px-1.5">
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoomScale((z) => Math.min(1.5, Number((z + 0.1).toFixed(2))))}
                className="p-1 rounded hover:bg-[var(--bg)] text-[var(--tx-2)] hover:text-[var(--tx)] cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomScale(0.85)}
                className="p-1 rounded hover:bg-[var(--bg)] text-[var(--tx-2)] hover:text-[var(--tx)] cursor-pointer"
                title="Reset Zoom"
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Canvas Viewport */}
          <div
            ref={canvasContainerRef}
            onClick={() => {
              setSelectedElementId(null);
              setEditingElementId(null);
            }}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="w-full h-[620px] bg-neutral-900/5 dark:bg-neutral-950/40 rounded-2xl border border-[var(--border)] p-8 overflow-auto flex items-center justify-center relative cursor-default"
          >
            {/* The Page Sheet */}
            <div
              style={{
                width: pageSize.width * zoomScale,
                height: pageSize.height * zoomScale,
                backgroundColor: currentPage.backgroundColor || '#ffffff',
              }}
              className="relative shadow-2xl rounded-xs border border-gray-300 dark:border-neutral-700 select-none overflow-hidden transition-all duration-75"
            >
              {/* Elements on this page */}
              {currentPage.elements.map((el) => {
                const isSelected = el.id === selectedElementId;
                const left = el.x * zoomScale;
                const top = el.y * zoomScale;
                const width = el.width * zoomScale;
                const height = el.height * zoomScale;

                return (
                  <div
                    key={el.id}
                    onPointerDown={(e) => handlePointerDown(e, el.id, 'move')}
                    onClick={(e) => handleElementClick(e, el)}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      if (el.type === 'text') {
                        setEditingElementId(el.id);
                      }
                    }}
                    style={{
                      position: 'absolute',
                      left,
                      top,
                      width,
                      height: el.type === 'shape' && (el as ShapeElement).shapeType === 'line' ? Math.max(12, height) : height,
                      cursor: dragInfo ? 'grabbing' : (editingElementId === el.id ? 'default' : (el.type === 'text' ? 'text' : 'grab')),
                    }}
                    className={`group ${
                      isSelected
                        ? 'ring-2 ring-[var(--accent)] ring-offset-1 z-30 shadow-md'
                        : 'hover:ring-1 hover:ring-blue-400/60 z-10'
                    }`}
                  >
                    {/* Floating Quick Action Bar for Selected Element */}
                    {isSelected && (
                      <div
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          top: -38,
                          left: 0,
                        }}
                        className="absolute z-50 flex items-center gap-1 bg-neutral-900/95 text-white px-2 py-1 rounded-xl shadow-xl border border-neutral-700/80 backdrop-blur-md text-xs font-semibold whitespace-nowrap pointer-events-auto select-none"
                      >
                        {el.type === 'text' && (
                          editingElementId === el.id ? (
                            <button
                              type="button"
                              onClick={() => setEditingElementId(null)}
                              className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition-colors cursor-pointer"
                            >
                              <Check className="h-3 w-3" />
                              <span>Done</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setEditingElementId(el.id)}
                              className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[11px] font-semibold transition-colors cursor-pointer"
                              title="Click to type text directly"
                            >
                              <Pencil className="h-3 w-3" />
                              <span>Type / Edit</span>
                            </button>
                          )
                        )}

                        <button
                          type="button"
                          onClick={() => duplicateElement(el.id)}
                          title="Duplicate"
                          className="p-1 rounded-lg hover:bg-white/20 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                        >
                          <Copy className="h-3 w-3" />
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteElement(el.id)}
                          title="Delete"
                          className="p-1 rounded-lg hover:bg-rose-500/30 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    )}

                    {/* Element-specific content renderer */}
                    {el.type === 'text' && (
                      editingElementId === el.id ? (
                        <textarea
                          autoFocus
                          ref={(textarea) => {
                            if (textarea) {
                              textarea.focus();
                              if (
                                textarea.value === 'Double click to edit text' ||
                                textarea.value === 'Type your text here' ||
                                textarea.value === 'Untitled Document' ||
                                textarea.value.startsWith('Start typing your document')
                              ) {
                                textarea.select();
                              }
                            }
                          }}
                          value={(el as TextElement).text}
                          onChange={(e) => updateElement(el.id, { text: e.target.value })}
                          onBlur={() => setEditingElementId(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                              setEditingElementId(null);
                            }
                            e.stopPropagation();
                          }}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            fontFamily: (el as TextElement).font || 'Helvetica',
                            fontSize: ((el as TextElement).fontSize || 14) * zoomScale,
                            color: (el as TextElement).color || '#000000',
                            textAlign: (el as TextElement).alignment || 'left',
                            fontWeight: (el as TextElement).bold ? 'bold' : 'normal',
                            fontStyle: (el as TextElement).italic ? 'italic' : 'normal',
                            lineHeight: (el as TextElement).lineHeight || 1.25,
                          }}
                          className="w-full h-full resize-none border-2 border-dashed border-[var(--accent)] bg-white/95 dark:bg-neutral-900/95 rounded-xs p-0.5 outline-none shadow-sm cursor-text selection:bg-[var(--accent-soft)]"
                          placeholder="Type your text..."
                        />
                      ) : (
                        <div
                          style={{
                            fontFamily: (el as TextElement).font || 'Helvetica',
                            fontSize: ((el as TextElement).fontSize || 14) * zoomScale,
                            color: (el as TextElement).color || '#000000',
                            textAlign: (el as TextElement).alignment || 'left',
                            fontWeight: (el as TextElement).bold ? 'bold' : 'normal',
                            fontStyle: (el as TextElement).italic ? 'italic' : 'normal',
                            lineHeight: (el as TextElement).lineHeight || 1.25,
                          }}
                          className="w-full h-full overflow-hidden break-words whitespace-pre-wrap select-none p-0.5 cursor-text"
                          title="Double click or click to type"
                        >
                          {(el as TextElement).text}
                        </div>
                      )
                    )}

                    {el.type === 'image' && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={(el as ImageElement).dataUrl}
                        alt="Canvas item"
                        style={{ opacity: (el as ImageElement).opacity ?? 1 }}
                        className="w-full h-full object-contain pointer-events-none"
                      />
                    )}

                    {el.type === 'shape' && (
                      <div className="w-full h-full">
                        {(el as ShapeElement).shapeType === 'rectangle' && (
                          <div
                            style={{
                              backgroundColor: (el as ShapeElement).fillColor || 'transparent',
                              borderColor: (el as ShapeElement).strokeColor || '#000',
                              borderWidth: (el as ShapeElement).strokeWidth ?? 1,
                              borderRadius: (el as ShapeElement).borderRadius ?? 0,
                              opacity: (el as ShapeElement).opacity ?? 1,
                            }}
                            className="w-full h-full border-solid"
                          />
                        )}
                        {(el as ShapeElement).shapeType === 'circle' && (
                          <div
                            style={{
                              backgroundColor: (el as ShapeElement).fillColor || 'transparent',
                              borderColor: (el as ShapeElement).strokeColor || '#000',
                              borderWidth: (el as ShapeElement).strokeWidth ?? 1,
                              opacity: (el as ShapeElement).opacity ?? 1,
                            }}
                            className="w-full h-full rounded-full border-solid"
                          />
                        )}
                        {(el as ShapeElement).shapeType === 'line' && (
                          <div
                            style={{
                              backgroundColor: (el as ShapeElement).strokeColor || '#000',
                              height: Math.max(1, ((el as ShapeElement).strokeWidth ?? 1) * zoomScale),
                              opacity: (el as ShapeElement).opacity ?? 1,
                            }}
                            className="w-full my-auto mt-[5px]"
                          />
                        )}
                      </div>
                    )}

                    {el.type === 'table' && (
                      <div className="w-full h-full overflow-hidden text-neutral-800 text-[10px] pointer-events-none border border-neutral-300">
                        <table className="w-full h-full border-collapse">
                          <tbody>
                            {(el as TableElement).rows.map((row, rI) => (
                              <tr
                                key={rI}
                                style={{
                                  backgroundColor:
                                    rI === 0 ? (el as TableElement).headerBackground || '#1e293b' : 'transparent',
                                  color:
                                    rI === 0 ? (el as TableElement).headerTextColor || '#fff' : '#1e293b',
                                }}
                              >
                                {row.map((cell, cI) => (
                                  <td
                                    key={cI}
                                    style={{
                                      border: (el as TableElement).cellBorders !== false ? '1px solid #cbd5e1' : 'none',
                                      fontSize: ((el as TableElement).fontSize || 10) * zoomScale,
                                      padding: '3px 5px',
                                    }}
                                    className="truncate font-medium"
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Resize Handle (Bottom-Right) */}
                    {isSelected && (
                      <div
                        onPointerDown={(e) => handlePointerDown(e, el.id, 'resize')}
                        className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-[var(--accent)] border-2 border-white rounded-xs cursor-nwse-resize z-40 shadow-xs"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT: Properties Inspector Panel (Col 10-12) */}
        <div className="lg:col-span-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4 space-y-4 max-h-[720px] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--tx)]">
              {selectedElement ? `${selectedElement.type.toUpperCase()} Properties` : 'Inspector'}
            </h3>
            {selectedElement && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => duplicateElement(selectedElement.id)}
                  className="p-1 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--tx-2)] hover:text-[var(--tx)] transition-colors cursor-pointer"
                  title="Duplicate Element"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => deleteElement(selectedElement.id)}
                  className="p-1 rounded-md hover:bg-rose-500/10 text-rose-500 transition-colors cursor-pointer"
                  title="Delete Element"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Context-aware Controls */}
          {selectedElement ? (
            <div className="space-y-4 text-xs">
              {/* Text Element Properties */}
              {selectedElement.type === 'text' && (
                <>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="font-semibold text-[var(--tx-2)]">Text Content</label>
                      <button
                        type="button"
                        onClick={() => setEditingElementId(selectedElement.id)}
                        className="text-[11px] font-semibold text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Pencil className="h-3 w-3" />
                        <span>Type on Canvas</span>
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={(selectedElement as TextElement).text}
                      onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
                      placeholder="Type text here..."
                      className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)] focus:border-[var(--accent)] focus:outline-hidden font-mono text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-semibold text-[var(--tx-2)] block mb-1">Font</label>
                      <select
                        value={(selectedElement as TextElement).font || 'Helvetica'}
                        onChange={(e) =>
                          updateElement(selectedElement.id, { font: e.target.value as FontFamily })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)] font-medium"
                      >
                        <option value="Helvetica">Helvetica</option>
                        <option value="Times">Times Roman</option>
                        <option value="Courier">Courier</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-[var(--tx-2)] block mb-1">
                        Size: {(selectedElement as TextElement).fontSize || 14}pt
                      </label>
                      <input
                        type="range"
                        min={8}
                        max={64}
                        value={(selectedElement as TextElement).fontSize || 14}
                        onChange={(e) =>
                          updateElement(selectedElement.id, { fontSize: Number(e.target.value) })
                        }
                        className="w-full accent-[var(--accent)]"
                      />
                    </div>
                  </div>

                  {/* Formatting Buttons: Bold, Italic, Alignment */}
                  <div className="flex items-center justify-between gap-1 pt-1">
                    <div className="flex items-center gap-1 bg-[var(--bg-subtle)] p-1 rounded-lg border border-[var(--border)]">
                      <button
                        type="button"
                        onClick={() =>
                          updateElement(selectedElement.id, {
                            bold: !(selectedElement as TextElement).bold,
                          })
                        }
                        className={`p-1.5 rounded-md ${
                          (selectedElement as TextElement).bold
                            ? 'bg-[var(--accent)] text-white'
                            : 'text-[var(--tx-2)] hover:text-[var(--tx)]'
                        }`}
                      >
                        <Bold className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          updateElement(selectedElement.id, {
                            italic: !(selectedElement as TextElement).italic,
                          })
                        }
                        className={`p-1.5 rounded-md ${
                          (selectedElement as TextElement).italic
                            ? 'bg-[var(--accent)] text-white'
                            : 'text-[var(--tx-2)] hover:text-[var(--tx)]'
                        }`}
                      >
                        <Italic className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 bg-[var(--bg-subtle)] p-1 rounded-lg border border-[var(--border)]">
                      {(['left', 'center', 'right'] as TextAlignment[]).map((align) => (
                        <button
                          key={align}
                          type="button"
                          onClick={() => updateElement(selectedElement.id, { alignment: align })}
                          className={`p-1.5 rounded-md ${
                            (selectedElement as TextElement).alignment === align
                              ? 'bg-[var(--accent)] text-white'
                              : 'text-[var(--tx-2)] hover:text-[var(--tx)]'
                          }`}
                        >
                          {align === 'left' && <AlignLeft className="h-3.5 w-3.5" />}
                          {align === 'center' && <AlignCenter className="h-3.5 w-3.5" />}
                          {align === 'right' && <AlignRight className="h-3.5 w-3.5" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Swatches */}
                  <div className="space-y-1.5 pt-1">
                    <label className="font-semibold text-[var(--tx-2)] block">Text Color</label>
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {COLOR_SWATCHES.map((hex) => (
                        <button
                          key={hex}
                          type="button"
                          onClick={() => updateElement(selectedElement.id, { color: hex })}
                          style={{ backgroundColor: hex }}
                          className={`w-5 h-5 rounded-full border border-black/20 shrink-0 transition-transform ${
                            (selectedElement as TextElement).color === hex ? 'scale-125 ring-2 ring-[var(--accent)]' : ''
                          }`}
                        />
                      ))}
                      <input
                        type="color"
                        value={(selectedElement as TextElement).color || '#000000'}
                        onChange={(e) => updateElement(selectedElement.id, { color: e.target.value })}
                        className="w-6 h-6 rounded-md border border-[var(--border)] cursor-pointer"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Shape Properties */}
              {selectedElement.type === 'shape' && (
                <>
                  <div className="space-y-1.5">
                    <label className="font-semibold text-[var(--tx-2)] block">Fill Color</label>
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <button
                        type="button"
                        onClick={() => updateElement(selectedElement.id, { fillColor: 'transparent' })}
                        className={`px-2 py-1 rounded-md text-[10px] font-bold border ${
                          (selectedElement as ShapeElement).fillColor === 'transparent'
                            ? 'bg-[var(--accent)] text-white'
                            : 'border-[var(--border)] text-[var(--tx)]'
                        }`}
                      >
                        Transparent
                      </button>
                      {COLOR_SWATCHES.slice(0, 8).map((hex) => (
                        <button
                          key={hex}
                          type="button"
                          onClick={() => updateElement(selectedElement.id, { fillColor: hex })}
                          style={{ backgroundColor: hex }}
                          className="w-5 h-5 rounded-full border border-black/20 shrink-0"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <label className="font-semibold text-[var(--tx-2)] block mb-1">
                        Border: {(selectedElement as ShapeElement).strokeWidth ?? 1}px
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={10}
                        value={(selectedElement as ShapeElement).strokeWidth ?? 1}
                        onChange={(e) =>
                          updateElement(selectedElement.id, { strokeWidth: Number(e.target.value) })
                        }
                        className="w-full accent-[var(--accent)]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[var(--tx-2)] block mb-1">
                        Opacity: {Math.round(((selectedElement as ShapeElement).opacity ?? 1) * 100)}%
                      </label>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={Math.round(((selectedElement as ShapeElement).opacity ?? 1) * 100)}
                        onChange={(e) =>
                          updateElement(selectedElement.id, { opacity: Number(e.target.value) / 100 })
                        }
                        className="w-full accent-[var(--accent)]"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Table Properties */}
              {selectedElement.type === 'table' && (
                <div className="space-y-3">
                  <p className="text-[11px] text-[var(--tx-2)]">
                    Rows: {(selectedElement as TableElement).rows.length} • Cols:{' '}
                    {(selectedElement as TableElement).rows[0]?.length || 0}
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const table = selectedElement as TableElement;
                        const numCols = table.rows[0]?.length || 2;
                        const newRow = Array(numCols).fill('New cell');
                        updateElement(table.id, { rows: [...table.rows, newRow] });
                      }}
                      className="flex-1 py-1.5 px-2 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-lg text-[11px] font-semibold text-[var(--tx)] hover:bg-[var(--accent-soft)] transition-colors cursor-pointer"
                    >
                      + Row
                    </button>
                    <button
                      type="button"
                      disabled={(selectedElement as TableElement).rows.length <= 1}
                      onClick={() => {
                        const table = selectedElement as TableElement;
                        if (table.rows.length <= 1) return;
                        updateElement(table.id, { rows: table.rows.slice(0, -1) });
                      }}
                      className="py-1.5 px-2 bg-rose-500/10 text-rose-500 rounded-lg text-[11px] font-semibold hover:bg-rose-500/20 disabled:opacity-30 cursor-pointer"
                    >
                      - Row
                    </button>
                  </div>
                </div>
              )}

              {/* General Bounds & Layer Ordering */}
              <div className="pt-3 border-t border-[var(--border)] space-y-2">
                <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--tx-2)]">
                  <span>Layer Order</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => changeElementLayer(selectedElement.id, 'forward')}
                      className="p-1 rounded hover:bg-[var(--bg-subtle)] text-[var(--tx)] cursor-pointer"
                      title="Bring Forward"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => changeElementLayer(selectedElement.id, 'backward')}
                      className="p-1 rounded hover:bg-[var(--bg-subtle)] text-[var(--tx)] cursor-pointer"
                      title="Send Backward"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-[var(--tx-2)]">
                  <div>X: {selectedElement.x}pt</div>
                  <div>Y: {selectedElement.y}pt</div>
                  <div>W: {selectedElement.width}pt</div>
                  <div>H: {selectedElement.height}pt</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-[var(--tx-3)] space-y-2">
              <Layers className="h-8 w-8 mx-auto opacity-40" />
              <p className="text-xs">Select any element on the page canvas to inspect and customize styles.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
