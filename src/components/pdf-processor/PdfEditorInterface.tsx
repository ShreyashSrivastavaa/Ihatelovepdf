'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  MousePointer,
  Type,
  Square,
  Circle,
  Minus,
  ArrowUpRight,
  Image as ImageIcon,
  Eraser,
  Highlighter,
  Undo2,
  Redo2,
  Trash2,
  Copy,
  Download,
  RotateCw,
  Plus,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  ArrowUp,
  ArrowDown,
  Info,
  Crop,
  Lock,
  Unlock,
  Check,
  X,
  RotateCcw,
} from 'lucide-react';
import {
  applyPdfEdits,
  EditorToolType,
  EditorElement,
  TextElement,
  ShapeElement,
  ImageElement,
  DrawingElement,
  ExistingTextOverride,
  PageEditState,
  PageMetadata,
  DocumentEditState,
  EditorPoint,
} from '../../lib/operations/pdf-editor';
import { downloadBlob } from '../../lib/download-helper';
import { clampCanvasScale, cleanupPdfPage } from '../../lib/canvas-limits';

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

const PRESET_COLORS = [
  '#000000',
  '#E24A24',
  '#2563EB',
  '#059669',
  '#7C3AED',
  '#D97706',
  '#DC2626',
  '#FFFFFF',
  '#64748B',
];

interface ExtractedTextItem {
  id: string;
  str: string;
  x: number; // In unscaled PDF points
  y: number; // In unscaled PDF points (top-left origin)
  width: number;
  height: number;
  fontSize: number;
  fontName?: string;
}

interface CropBox {
  x: number; // Offset relative to image top-left (unscaled points)
  y: number;
  width: number;
  height: number;
}

type ResizeHandleType = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';

interface PdfEditorInterfaceProps {
  file: File;
  onDone?: (blob: Blob) => void;
}

export default function PdfEditorInterface({ file, onDone }: PdfEditorInterfaceProps) {
  const [pages, setPages] = useState<PageMetadata[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [currentTool, setCurrentTool] = useState<EditorToolType>('select');
  const [zoomLevel, setZoomLevel] = useState<number>(1.2);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [selectedTextOverrideId, setSelectedTextOverrideId] = useState<string | null>(null);

  // Styling state for current tool / selected element
  const [activeColor, setActiveColor] = useState<string>('#000000');
  const [activeFillColor, setActiveFillColor] = useState<string>('transparent');
  const [activeStrokeWidth, setActiveStrokeWidth] = useState<number>(2);
  const [activeFontSize, setActiveFontSize] = useState<number>(14);
  const [activeFontFamily, setActiveFontFamily] = useState<'Helvetica' | 'TimesRoman' | 'Courier'>('Helvetica');
  const [activeFontWeight, setActiveFontWeight] = useState<'normal' | 'bold'>('normal');
  const [activeFontStyle, setActiveFontStyle] = useState<'normal' | 'italic'>('normal');
  const [activeAlignment, setActiveAlignment] = useState<'left' | 'center' | 'right'>('left');
  const [activeOpacity, setActiveOpacity] = useState<number>(1);

  // Per-page edits
  const [pageEdits, setPageEdits] = useState<Record<number, PageEditState>>({});
  // Per-page extracted original text items for interactive text selection
  const [extractedTexts, setExtractedTexts] = useState<Record<number, ExtractedTextItem[]>>({});
  const [isScannedPdf, setIsScannedPdf] = useState<boolean>(false);

  // Undo / Redo history
  const [history, setHistory] = useState<Array<{ pages: PageMetadata[]; pageEdits: Record<number, PageEditState> }>>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Canvas drawing & shape creation states
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [drawStartPos, setDrawStartPos] = useState<EditorPoint | null>(null);
  const [drawCurrentPos, setDrawCurrentPos] = useState<EditorPoint | null>(null);
  const [currentDrawingPoints, setCurrentDrawingPoints] = useState<EditorPoint[]>([]);

  // Interactive Drag & Move state
  const [isDraggingElement, setIsDraggingElement] = useState<boolean>(false);
  const [dragStartMousePos, setDragStartMousePos] = useState<EditorPoint | null>(null);
  const [dragStartElemPos, setDragStartElemPos] = useState<{ x: number; y: number } | null>(null);

  // Interactive Resizing state (8-handle transformer)
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [activeResizeHandle, setActiveResizeHandle] = useState<ResizeHandleType | null>(null);
  const [resizeStartBounds, setResizeStartBounds] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    aspectRatio: number;
  } | null>(null);
  const [resizeStartMousePos, setResizeStartMousePos] = useState<EditorPoint | null>(null);

  // Interactive Cropping state (Non-destructive image crop overlay)
  const [isCropping, setIsCropping] = useState<boolean>(false);
  const [croppingElementId, setCroppingElementId] = useState<string | null>(null);
  const [cropBox, setCropBox] = useState<CropBox>({ x: 0, y: 0, width: 100, height: 100 });
  const [cropDragMode, setCropDragMode] = useState<'move' | ResizeHandleType | null>(null);
  const [cropStartMousePos, setCropStartMousePos] = useState<EditorPoint | null>(null);
  const [cropStartBox, setCropStartBox] = useState<CropBox | null>(null);

  // Export state
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const activeRenderTaskRef = useRef<{ cancel: () => void; promise: Promise<unknown> } | null>(null);

  // 1. Initial PDF Loading: extract page metadata and text items
  useEffect(() => {
    let isCancelled = false;

    async function loadPdf() {
      try {
        const pdfjs = await getPdfJs();
        const arrayBuffer = await file.arrayBuffer();
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
        const doc = await pdfjs.getDocument({
          data: arrayBuffer,
          cMapUrl: `${baseUrl}/cmaps/`,
          cMapPacked: true,
          standardFontDataUrl: `${baseUrl}/standard_fonts/`,
        }).promise;

        if (isCancelled) return;

        const loadedPages: PageMetadata[] = [];
        const initialEdits: Record<number, PageEditState> = {};
        const initialExtractedTexts: Record<number, ExtractedTextItem[]> = {};
        let totalCharsFound = 0;

        for (let i = 1; i <= doc.numPages; i++) {
          const page = await doc.getPage(i);
          const vp = page.getViewport({ scale: 1.0 });

          loadedPages.push({
            originalIndex: i - 1,
            pageNumber: i,
            width: vp.width,
            height: vp.height,
            rotation: page.rotate || 0,
          });

          initialEdits[i - 1] = {
            pageIndex: i - 1,
            width: vp.width,
            height: vp.height,
            rotation: page.rotate || 0,
            existingTextOverrides: [],
            elements: [],
          };

          // Extract text items from PDF.js
          const textContent = await page.getTextContent();
          const items: ExtractedTextItem[] = [];

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          textContent.items.forEach((item: any, itemIdx: number) => {
            if (!item.str || item.str.trim().length === 0) return;
            totalCharsFound += item.str.length;

            const tx = item.transform; // [scaleX, skewY, skewX, scaleY, transX, transY]
            const x = tx[4];
            const y = vp.height - tx[5] - (item.height || item.fontSize || 12);
            const w = Math.max(10, item.width || 50);
            const h = Math.max(10, item.height || item.fontSize || 14);

            items.push({
              id: `text_${i}_${itemIdx}`,
              str: item.str,
              x,
              y,
              width: w,
              height: h,
              fontSize: Math.round(item.transform[0] || item.fontSize || 12),
              fontName: item.fontName,
            });
          });

          initialExtractedTexts[i - 1] = items;
        }

        if (isCancelled) return;

        setPages(loadedPages);
        setPageEdits(initialEdits);
        setExtractedTexts(initialExtractedTexts);
        setIsScannedPdf(totalCharsFound === 0);

        // Initialize history stack
        setHistory([{ pages: loadedPages, pageEdits: initialEdits }]);
        setHistoryIndex(0);
      } catch (err) {
        console.error('Failed to load PDF for editing:', err);
      }
    }

    loadPdf();

    return () => {
      isCancelled = true;
    };
  }, [file]);

  // Record history snapshot on modifications
  const pushHistorySnapshot = useCallback(
    (newPages: PageMetadata[], newEdits: Record<number, PageEditState>) => {
      setHistory((prev) => {
        const next = prev.slice(0, historyIndex + 1);
        return [...next, { pages: newPages, pageEdits: newEdits }];
      });
      setHistoryIndex((prev) => prev + 1);
    },
    [historyIndex]
  );

  // Undo / Redo handlers
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const targetIndex = historyIndex - 1;
      const snapshot = history[targetIndex];
      setPages(snapshot.pages);
      setPageEdits(snapshot.pageEdits);
      setHistoryIndex(targetIndex);
      setSelectedElementId(null);
      setSelectedTextOverrideId(null);
      setIsCropping(false);
    }
  }, [historyIndex, history]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const targetIndex = historyIndex + 1;
      const snapshot = history[targetIndex];
      setPages(snapshot.pages);
      setPageEdits(snapshot.pageEdits);
      setHistoryIndex(targetIndex);
      setSelectedElementId(null);
      setSelectedTextOverrideId(null);
      setIsCropping(false);
    }
  }, [historyIndex, history]);

  // Render current PDF page on canvas via PDF.js
  useEffect(() => {
    if (pages.length === 0) return;
    const pageMeta = pages[currentPageIndex];
    if (!pageMeta) return;

    let isCancelled = false;

    async function renderPage() {
      // 1. Cancel and wait for previous render task to release the canvas
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
        const arrayBuffer = await file.arrayBuffer();
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
        const doc = await pdfjs.getDocument({
          data: arrayBuffer,
          cMapUrl: `${baseUrl}/cmaps/`,
          cMapPacked: true,
          standardFontDataUrl: `${baseUrl}/standard_fonts/`,
        }).promise;

        if (isCancelled || pageMeta.originalIndex >= doc.numPages) return;

        const page = await doc.getPage(pageMeta.originalIndex + 1);
        if (isCancelled) return;

        const baseVp = page.getViewport({ scale: 1.0, rotation: pageMeta.rotation });
        const { scale: safeScale } = clampCanvasScale(baseVp.width, baseVp.height, zoomLevel);
        const vp = page.getViewport({ scale: safeScale, rotation: pageMeta.rotation });

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Double-check if another render was queued
        if (activeRenderTaskRef.current) {
          try {
            activeRenderTaskRef.current.cancel();
            await activeRenderTaskRef.current.promise.catch(() => {});
          } catch {
            // ignore
          }
        }
        if (isCancelled) return;

        canvas.width = vp.width;
        canvas.height = vp.height;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, vp.width, vp.height);

        const renderTask = page.render({ canvasContext: ctx, viewport: vp, canvas } as Parameters<typeof page.render>[0]);
        activeRenderTaskRef.current = renderTask;

        try {
          await renderTask.promise;
        } finally {
          cleanupPdfPage(page);
          if (activeRenderTaskRef.current === renderTask) {
            activeRenderTaskRef.current = null;
          }
        }
      } catch (err: unknown) {
        const errorName = err && typeof err === 'object' && 'name' in err ? (err as { name: string }).name : '';
        if (!isCancelled && errorName !== 'RenderingCancelledException') {
          console.error('Failed to render current page:', err);
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
  }, [file, pages, currentPageIndex, zoomLevel]);

  // Current page state and active elements
  const currentPageMeta = pages[currentPageIndex];
  const currentOriginalIndex = currentPageMeta ? currentPageMeta.originalIndex : 0;
  const currentEdits = useMemo(() => {
    return pageEdits[currentOriginalIndex] || {
      pageIndex: currentOriginalIndex,
      width: 595,
      height: 842,
      rotation: 0,
      existingTextOverrides: [],
      elements: [],
    };
  }, [pageEdits, currentOriginalIndex]);

  const selectedElement = currentEdits.elements.find((el) => el.id === selectedElementId);
  const selectedTextOverride = currentEdits.existingTextOverrides.find((ov) => ov.id === selectedTextOverrideId);

  // Sync properties panel when element selection changes
  useEffect(() => {
    if (selectedElement) {
      if (selectedElement.type === 'text') {
        const txt = selectedElement as TextElement;
        setActiveFontSize(txt.fontSize);
        setActiveFontFamily(txt.fontFamily);
        setActiveFontWeight(txt.fontWeight);
        setActiveFontStyle(txt.fontStyle);
        setActiveColor(txt.color);
        setActiveAlignment(txt.alignment);
      } else if (
        selectedElement.type === 'rect' ||
        selectedElement.type === 'circle' ||
        selectedElement.type === 'line' ||
        selectedElement.type === 'arrow'
      ) {
        const shp = selectedElement as ShapeElement;
        setActiveColor(shp.strokeColor);
        setActiveFillColor(shp.fillColor || 'transparent');
        setActiveStrokeWidth(shp.strokeWidth);
      }
      setActiveOpacity(selectedElement.opacity !== undefined ? selectedElement.opacity : 1);
    } else if (selectedTextOverride) {
      setActiveColor(selectedTextOverride.color || '#000000');
      setActiveFontSize(selectedTextOverride.fontSize || 14);
    }
  }, [selectedElement, selectedTextOverride]);

  // Helper to get unscaled point coordinates from mouse event
  const getCanvasCoordinates = useCallback(
    (e: React.MouseEvent | MouseEvent): EditorPoint => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      const screenX = e.clientX - rect.left;
      const screenY = e.clientY - rect.top;
      return {
        x: screenX / zoomLevel,
        y: screenY / zoomLevel,
      };
    },
    [zoomLevel]
  );

  // ----------------------------------------------------
  // Selected Element Updates & Transformations
  // ----------------------------------------------------

  const updateSelectedElement = (updates: Partial<EditorElement>) => {
    if (!selectedElementId) return;

    const updatedElements = currentEdits.elements.map((el) => {
      if (el.id === selectedElementId) {
        return { ...el, ...updates };
      }
      return el;
    });

    const updatedEdits = {
      ...pageEdits,
      [currentOriginalIndex]: {
        ...currentEdits,
        elements: updatedElements as EditorElement[],
      },
    };

    setPageEdits(updatedEdits);
  };

  const commitSelectedElementChange = useCallback(() => {
    pushHistorySnapshot(pages, pageEdits);
  }, [pages, pageEdits, pushHistorySnapshot]);

  const handleDeleteSelected = useCallback(() => {
    if (selectedElementId) {
      const updatedElements = currentEdits.elements.filter((el) => el.id !== selectedElementId);
      const updatedEdits = {
        ...pageEdits,
        [currentOriginalIndex]: {
          ...currentEdits,
          elements: updatedElements,
        },
      };
      setPageEdits(updatedEdits);
      pushHistorySnapshot(pages, updatedEdits);
      setSelectedElementId(null);
      setIsCropping(false);
    } else if (selectedTextOverrideId) {
      const updatedOverrides = currentEdits.existingTextOverrides.map((ov) => {
        if (ov.id === selectedTextOverrideId) {
          return { ...ov, isDeleted: true, newText: '' };
        }
        return ov;
      });
      const updatedEdits = {
        ...pageEdits,
        [currentOriginalIndex]: {
          ...currentEdits,
          existingTextOverrides: updatedOverrides,
        },
      };
      setPageEdits(updatedEdits);
      pushHistorySnapshot(pages, updatedEdits);
      setSelectedTextOverrideId(null);
    }
  }, [selectedElementId, selectedTextOverrideId, currentEdits, pageEdits, currentOriginalIndex, pages, pushHistorySnapshot]);

  const handleDuplicateSelected = useCallback(() => {
    if (!selectedElement) return;
    const duplicate: EditorElement = {
      ...selectedElement,
      id: `${selectedElement.type}_${Date.now()}`,
      x: selectedElement.x + 15,
      y: selectedElement.y + 15,
    };

    const updatedEdits = {
      ...pageEdits,
      [currentOriginalIndex]: {
        ...currentEdits,
        elements: [...currentEdits.elements, duplicate],
      },
    };

    setPageEdits(updatedEdits);
    pushHistorySnapshot(pages, updatedEdits);
    setSelectedElementId(duplicate.id);
  }, [selectedElement, currentEdits, pageEdits, currentOriginalIndex, pages, pushHistorySnapshot]);

  const handleNudgeSelected = useCallback(
    (delta: EditorPoint) => {
      if (selectedElementId && selectedElement) {
        const updatedElements = currentEdits.elements.map((el) => {
          if (el.id === selectedElementId) {
            return { ...el, x: el.x + delta.x, y: el.y + delta.y };
          }
          return el;
        });

        const updatedEdits = {
          ...pageEdits,
          [currentOriginalIndex]: {
            ...currentEdits,
            elements: updatedElements,
          },
        };

        setPageEdits(updatedEdits);
      }
    },
    [selectedElementId, selectedElement, currentEdits, pageEdits, currentOriginalIndex]
  );

  const handleRotateSelected = () => {
    if (!selectedElement) return;
    const currentRot = selectedElement.rotation || 0;
    const nextRot = ((currentRot + 90) % 360);

    const updatedElements = currentEdits.elements.map((el) => {
      if (el.id === selectedElementId) {
        return { ...el, rotation: nextRot };
      }
      return el;
    });

    const updatedEdits = {
      ...pageEdits,
      [currentOriginalIndex]: {
        ...currentEdits,
        elements: updatedElements,
      },
    };

    setPageEdits(updatedEdits);
    pushHistorySnapshot(pages, updatedEdits);
  };

  const handleToggleLockRatio = () => {
    if (!selectedElement || selectedElement.type !== 'image') return;
    const img = selectedElement as ImageElement;
    const currentLock = img.lockAspectRatio !== false;
    updateSelectedElement({ lockAspectRatio: !currentLock } as Partial<ImageElement>);
    pushHistorySnapshot(pages, pageEdits);
  };

  const handleReorderLayer = (direction: 'up' | 'down') => {
    if (!selectedElementId) return;
    const idx = currentEdits.elements.findIndex((el) => el.id === selectedElementId);
    if (idx === -1) return;

    const newElements = [...currentEdits.elements];
    if (direction === 'up' && idx < newElements.length - 1) {
      const temp = newElements[idx];
      newElements[idx] = newElements[idx + 1];
      newElements[idx + 1] = temp;
    } else if (direction === 'down' && idx > 0) {
      const temp = newElements[idx];
      newElements[idx] = newElements[idx - 1];
      newElements[idx - 1] = temp;
    }

    const updatedEdits = {
      ...pageEdits,
      [currentOriginalIndex]: {
        ...currentEdits,
        elements: newElements,
      },
    };
    setPageEdits(updatedEdits);
    pushHistorySnapshot(pages, updatedEdits);
  };

  // Keyboard shortcuts (Ctrl+Z, Ctrl+Y, Delete, Arrow keys, Ctrl+D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        handleRedo();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedElementId && !isCropping) {
          e.preventDefault();
          handleDeleteSelected();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        if (selectedElementId && !isCropping) {
          e.preventDefault();
          handleDuplicateSelected();
        }
      } else if (e.key.startsWith('Arrow') && selectedElementId && !isCropping) {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        const delta = {
          x: e.key === 'ArrowLeft' ? -step : e.key === 'ArrowRight' ? step : 0,
          y: e.key === 'ArrowUp' ? -step : e.key === 'ArrowDown' ? step : 0,
        };
        handleNudgeSelected(delta);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo, handleDeleteSelected, handleDuplicateSelected, handleNudgeSelected, selectedElementId, isCropping]);

  // ----------------------------------------------------
  // Image Upload Handler
  // ----------------------------------------------------
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.[0];
    if (!imgFile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const mimeType = imgFile.type === 'image/jpeg' ? 'image/jpeg' : 'image/png';

      const img = new Image();
      img.onload = () => {
        const aspect = img.width / img.height;
        const width = Math.min(260, Math.max(120, img.width));
        const height = width / aspect;

        const newImageElement: ImageElement = {
          id: `img_${Date.now()}`,
          type: 'image',
          dataUrl,
          originalDataUrl: dataUrl,
          mimeType,
          x: 80,
          y: 80,
          width,
          height,
          rotation: 0,
          opacity: 1,
          lockAspectRatio: true,
        };

        const updatedEdits = {
          ...pageEdits,
          [currentOriginalIndex]: {
            ...currentEdits,
            elements: [...currentEdits.elements, newImageElement],
          },
        };

        setPageEdits(updatedEdits);
        pushHistorySnapshot(pages, updatedEdits);
        setSelectedElementId(newImageElement.id);
        setCurrentTool('select');
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(imgFile);
    if (imageUploadRef.current) imageUploadRef.current.value = '';
  };

  // ----------------------------------------------------
  // Interactive Image Cropping Engine
  // ----------------------------------------------------

  const handleStartCrop = () => {
    if (!selectedElement || selectedElement.type !== 'image') return;
    const img = selectedElement as ImageElement;
    setCroppingElementId(img.id);
    setIsCropping(true);
    setCropBox({
      x: 0,
      y: 0,
      width: img.width,
      height: img.height,
    });
  };

  const handleApplyCrop = () => {
    if (!croppingElementId || !selectedElement || selectedElement.type !== 'image') return;
    const imgElem = selectedElement as ImageElement;
    const sourceDataUrl = imgElem.originalDataUrl || imgElem.dataUrl;

    const image = new Image();
    image.onload = () => {
      const naturalWidth = image.naturalWidth;
      const naturalHeight = image.naturalHeight;

      // Scale factors from current element dimensions to source pixels
      const scaleX = naturalWidth / imgElem.width;
      const scaleY = naturalHeight / imgElem.height;

      const sourceCropX = Math.max(0, cropBox.x * scaleX);
      const sourceCropY = Math.max(0, cropBox.y * scaleY);
      const sourceCropW = Math.min(naturalWidth - sourceCropX, cropBox.width * scaleX);
      const sourceCropH = Math.min(naturalHeight - sourceCropY, cropBox.height * scaleY);

      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = Math.max(1, Math.round(sourceCropW));
      offscreenCanvas.height = Math.max(1, Math.round(sourceCropH));

      const ctx = offscreenCanvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(
          image,
          sourceCropX,
          sourceCropY,
          sourceCropW,
          sourceCropH,
          0,
          0,
          offscreenCanvas.width,
          offscreenCanvas.height
        );

        const newCroppedDataUrl = offscreenCanvas.toDataURL(imgElem.mimeType || 'image/png', 0.95);

        const updatedElements = currentEdits.elements.map((el) => {
          if (el.id === imgElem.id) {
            return {
              ...el,
              x: el.x + cropBox.x,
              y: el.y + cropBox.y,
              width: cropBox.width,
              height: cropBox.height,
              dataUrl: newCroppedDataUrl,
              originalDataUrl: sourceDataUrl,
              crop: {
                x: cropBox.x,
                y: cropBox.y,
                width: cropBox.width,
                height: cropBox.height,
              },
            } as ImageElement;
          }
          return el;
        });

        const updatedEdits = {
          ...pageEdits,
          [currentOriginalIndex]: {
            ...currentEdits,
            elements: updatedElements,
          },
        };

        setPageEdits(updatedEdits);
        pushHistorySnapshot(pages, updatedEdits);
      }

      setIsCropping(false);
      setCroppingElementId(null);
    };
    image.src = sourceDataUrl;
  };

  const handleCancelCrop = () => {
    setIsCropping(false);
    setCroppingElementId(null);
  };

  const handleResetCrop = () => {
    if (!selectedElement || selectedElement.type !== 'image') return;
    const imgElem = selectedElement as ImageElement;
    if (!imgElem.originalDataUrl) return;

    const image = new Image();
    image.onload = () => {
      const aspect = image.naturalWidth / image.naturalHeight;
      const width = imgElem.width;
      const height = width / aspect;

      const updatedElements = currentEdits.elements.map((el) => {
        if (el.id === imgElem.id) {
          return {
            ...el,
            width,
            height,
            dataUrl: imgElem.originalDataUrl!,
            crop: undefined,
          } as ImageElement;
        }
        return el;
      });

      const updatedEdits = {
        ...pageEdits,
        [currentOriginalIndex]: {
          ...currentEdits,
          elements: updatedElements,
        },
      };

      setPageEdits(updatedEdits);
      pushHistorySnapshot(pages, updatedEdits);
      setCropBox({ x: 0, y: 0, width, height });
    };
    image.src = imgElem.originalDataUrl;
  };

  // ----------------------------------------------------
  // Canvas Mouse & Interaction Engine
  // ----------------------------------------------------

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    const pt = getCanvasCoordinates(e);

    if (currentTool === 'select') {
      if (!isResizing && !isDraggingElement && !isCropping) {
        setSelectedElementId(null);
        setSelectedTextOverrideId(null);
      }
      return;
    }

    if (currentTool === 'addText') {
      const newTextElement: TextElement = {
        id: `text_${Date.now()}`,
        type: 'text',
        text: 'Click to edit text',
        x: pt.x,
        y: pt.y,
        width: 160,
        height: 36,
        fontSize: activeFontSize,
        fontFamily: activeFontFamily,
        fontWeight: activeFontWeight,
        fontStyle: activeFontStyle,
        color: activeColor,
        alignment: activeAlignment,
        opacity: activeOpacity,
      };

      const updatedEdits = {
        ...pageEdits,
        [currentOriginalIndex]: {
          ...currentEdits,
          elements: [...currentEdits.elements, newTextElement],
        },
      };

      setPageEdits(updatedEdits);
      pushHistorySnapshot(pages, updatedEdits);
      setSelectedElementId(newTextElement.id);
      setCurrentTool('select');
      return;
    }

    if (
      currentTool === 'rect' ||
      currentTool === 'circle' ||
      currentTool === 'line' ||
      currentTool === 'arrow' ||
      currentTool === 'whiteout' ||
      currentTool === 'highlight'
    ) {
      setIsDrawing(true);
      setDrawStartPos(pt);
      return;
    }

    if (currentTool === 'draw' || currentTool === 'signature') {
      setIsDrawing(true);
      setCurrentDrawingPoints([pt]);
      return;
    }
  };

  const handleElementMouseDown = (e: React.MouseEvent, elem: EditorElement) => {
    if (currentTool !== 'select' || isCropping) return;
    e.stopPropagation();

    setSelectedElementId(elem.id);
    setSelectedTextOverrideId(null);

    setIsDraggingElement(true);
    const pt = getCanvasCoordinates(e);
    setDragStartMousePos(pt);
    setDragStartElemPos({ x: elem.x, y: elem.y });
  };

  const handleResizeHandleMouseDown = (e: React.MouseEvent, handle: ResizeHandleType, elem: EditorElement) => {
    e.stopPropagation();
    setIsResizing(true);
    setActiveResizeHandle(handle);

    const pt = getCanvasCoordinates(e);
    setResizeStartMousePos(pt);
    setResizeStartBounds({
      x: elem.x,
      y: elem.y,
      width: elem.width,
      height: elem.height,
      aspectRatio: elem.width / elem.height,
    });
  };

  const handleCropHandleMouseDown = (e: React.MouseEvent, handle: ResizeHandleType | 'move') => {
    e.stopPropagation();
    setCropDragMode(handle);
    const pt = getCanvasCoordinates(e);
    setCropStartMousePos(pt);
    setCropStartBox({ ...cropBox });
  };

  // Global mousemove and mouseup listeners for drag, resize, and crop
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const pt = getCanvasCoordinates(e);

      // 1. Element Dragging / Move
      if (isDraggingElement && dragStartMousePos && dragStartElemPos && selectedElementId) {
        const dx = pt.x - dragStartMousePos.x;
        const dy = pt.y - dragStartMousePos.y;

        const updatedElements = currentEdits.elements.map((el) => {
          if (el.id === selectedElementId) {
            return {
              ...el,
              x: Math.round(dragStartElemPos.x + dx),
              y: Math.round(dragStartElemPos.y + dy),
            };
          }
          return el;
        });

        setPageEdits((prev) => ({
          ...prev,
          [currentOriginalIndex]: {
            ...currentEdits,
            elements: updatedElements,
          },
        }));
        return;
      }

      // 2. Element Resizing (8-handle directional / proportional)
      if (isResizing && activeResizeHandle && resizeStartBounds && resizeStartMousePos && selectedElementId) {
        const dx = pt.x - resizeStartMousePos.x;
        const dy = pt.y - resizeStartMousePos.y;

        let newX = resizeStartBounds.x;
        let newY = resizeStartBounds.y;
        let newWidth = resizeStartBounds.width;
        let newHeight = resizeStartBounds.height;

        const isImage = selectedElement?.type === 'image';
        const img = selectedElement as ImageElement | undefined;
        const shouldMaintainAspect = isImage
          ? (img?.lockAspectRatio !== false || e.shiftKey)
          : e.shiftKey;

        // Apply directional delta based on active handle
        if (activeResizeHandle.includes('e')) {
          newWidth = Math.max(20, resizeStartBounds.width + dx);
        } else if (activeResizeHandle.includes('w')) {
          const clampedDx = Math.min(dx, resizeStartBounds.width - 20);
          newWidth = resizeStartBounds.width - clampedDx;
          newX = resizeStartBounds.x + clampedDx;
        }

        if (activeResizeHandle.includes('s')) {
          newHeight = Math.max(20, resizeStartBounds.height + dy);
        } else if (activeResizeHandle.includes('n')) {
          const clampedDy = Math.min(dy, resizeStartBounds.height - 20);
          newHeight = resizeStartBounds.height - clampedDy;
          newY = resizeStartBounds.y + clampedDy;
        }

        // Maintain aspect ratio for corner handles when locked or Shift is pressed
        const isCorner = ['nw', 'ne', 'se', 'sw'].includes(activeResizeHandle);
        if (isCorner && shouldMaintainAspect && resizeStartBounds.aspectRatio > 0) {
          if (Math.abs(dx) > Math.abs(dy)) {
            newHeight = newWidth / resizeStartBounds.aspectRatio;
            if (activeResizeHandle.includes('n')) {
              newY = resizeStartBounds.y + (resizeStartBounds.height - newHeight);
            }
          } else {
            newWidth = newHeight * resizeStartBounds.aspectRatio;
            if (activeResizeHandle.includes('w')) {
              newX = resizeStartBounds.x + (resizeStartBounds.width - newWidth);
            }
          }
        }

        const updatedElements = currentEdits.elements.map((el) => {
          if (el.id === selectedElementId) {
            return {
              ...el,
              x: Math.round(newX),
              y: Math.round(newY),
              width: Math.round(newWidth),
              height: Math.round(newHeight),
            };
          }
          return el;
        });

        setPageEdits((prev) => ({
          ...prev,
          [currentOriginalIndex]: {
            ...currentEdits,
            elements: updatedElements,
          },
        }));
        return;
      }

      // 3. Crop Window Dragging & Resizing
      if (isCropping && cropDragMode && cropStartMousePos && cropStartBox && selectedElement) {
        const dx = pt.x - cropStartMousePos.x;
        const dy = pt.y - cropStartMousePos.y;

        const maxW = selectedElement.width;
        const maxH = selectedElement.height;

        const nextBox = { ...cropStartBox };

        if (cropDragMode === 'move') {
          nextBox.x = Math.max(0, Math.min(maxW - cropStartBox.width, cropStartBox.x + dx));
          nextBox.y = Math.max(0, Math.min(maxH - cropStartBox.height, cropStartBox.y + dy));
        } else {
          if (cropDragMode.includes('e')) {
            nextBox.width = Math.max(20, Math.min(maxW - cropStartBox.x, cropStartBox.width + dx));
          } else if (cropDragMode.includes('w')) {
            const clampedX = Math.max(0, Math.min(cropStartBox.x + cropStartBox.width - 20, cropStartBox.x + dx));
            nextBox.width = cropStartBox.width + (cropStartBox.x - clampedX);
            nextBox.x = clampedX;
          }

          if (cropDragMode.includes('s')) {
            nextBox.height = Math.max(20, Math.min(maxH - cropStartBox.y, cropStartBox.height + dy));
          } else if (cropDragMode.includes('n')) {
            const clampedY = Math.max(0, Math.min(cropStartBox.y + cropStartBox.height - 20, cropStartBox.y + dy));
            nextBox.height = cropStartBox.height + (cropStartBox.y - clampedY);
            nextBox.y = clampedY;
          }
        }

        setCropBox(nextBox);
        return;
      }

      // 4. Freehand drawing tracking
      if (isDrawing && (currentTool === 'draw' || currentTool === 'signature')) {
        setCurrentDrawingPoints((prev) => [...prev, pt]);
      }

      // 5. Shape drawing live tracking
      if (isDrawing && drawStartPos) {
        setDrawCurrentPos(pt);
      }
    };

    const handleGlobalMouseUp = (e: MouseEvent) => {
      // Release Dragging
      if (isDraggingElement) {
        setIsDraggingElement(false);
        setDragStartMousePos(null);
        setDragStartElemPos(null);
        commitSelectedElementChange();
      }

      // Release Resizing
      if (isResizing) {
        setIsResizing(false);
        setActiveResizeHandle(null);
        setResizeStartBounds(null);
        setResizeStartMousePos(null);
        commitSelectedElementChange();
      }

      // Release Crop Drag
      if (cropDragMode) {
        setCropDragMode(null);
        setCropStartMousePos(null);
        setCropStartBox(null);
      }

      // Release Shape / Drawing
      if (isDrawing) {
        setIsDrawing(false);
        const pt = getCanvasCoordinates(e);

        if (currentTool === 'draw' || currentTool === 'signature') {
          if (currentDrawingPoints.length > 1) {
            const newDrawing: DrawingElement = {
              id: `draw_${Date.now()}`,
              type: currentTool,
              points: currentDrawingPoints,
              color: activeColor,
              strokeWidth: activeStrokeWidth,
              x: Math.min(...currentDrawingPoints.map((p) => p.x)),
              y: Math.min(...currentDrawingPoints.map((p) => p.y)),
              width: Math.max(10, Math.max(...currentDrawingPoints.map((p) => p.x)) - Math.min(...currentDrawingPoints.map((p) => p.x))),
              height: Math.max(10, Math.max(...currentDrawingPoints.map((p) => p.y)) - Math.min(...currentDrawingPoints.map((p) => p.y))),
              opacity: activeOpacity,
            };

            const updatedEdits = {
              ...pageEdits,
              [currentOriginalIndex]: {
                ...currentEdits,
                elements: [...currentEdits.elements, newDrawing],
              },
            };
            setPageEdits(updatedEdits);
            pushHistorySnapshot(pages, updatedEdits);
            setSelectedElementId(newDrawing.id);
          }
          setCurrentDrawingPoints([]);
          setDrawCurrentPos(null);
          setCurrentTool('select');
        } else if (drawStartPos) {
          const minX = Math.min(drawStartPos.x, pt.x);
          const minY = Math.min(drawStartPos.y, pt.y);
          const width = Math.max(10, Math.abs(pt.x - drawStartPos.x));
          const height = Math.max(10, Math.abs(pt.y - drawStartPos.y));

          const shapeType = (
            ['rect', 'circle', 'line', 'arrow', 'whiteout', 'highlight', 'underline', 'strikethrough'].includes(currentTool)
              ? currentTool
              : 'rect'
          ) as ShapeElement['type'];

          const newShape: ShapeElement = {
            id: `shape_${Date.now()}`,
            type: shapeType,
            x: minX,
            y: minY,
            width,
            height,
            startX: drawStartPos.x,
            startY: drawStartPos.y,
            endX: pt.x,
            endY: pt.y,
            strokeColor: currentTool === 'whiteout' ? '#ffffff' : currentTool === 'highlight' ? '#FEF08A' : activeColor,
            fillColor: currentTool === 'whiteout' ? '#ffffff' : currentTool === 'highlight' ? '#FEF08A' : activeFillColor,
            strokeWidth: currentTool === 'whiteout' || currentTool === 'highlight' ? 0 : activeStrokeWidth,
            opacity: currentTool === 'highlight' ? 0.4 : activeOpacity,
          };

          const updatedEdits = {
            ...pageEdits,
            [currentOriginalIndex]: {
              ...currentEdits,
              elements: [...currentEdits.elements, newShape],
            },
          };

          setPageEdits(updatedEdits);
          pushHistorySnapshot(pages, updatedEdits);
          setSelectedElementId(newShape.id);
          setDrawStartPos(null);
          setDrawCurrentPos(null);
          setCurrentTool('select');
        }
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [
    isDraggingElement,
    dragStartMousePos,
    dragStartElemPos,
    isResizing,
    activeResizeHandle,
    resizeStartBounds,
    resizeStartMousePos,
    isCropping,
    cropDragMode,
    cropStartMousePos,
    cropStartBox,
    isDrawing,
    currentTool,
    currentDrawingPoints,
    drawStartPos,
    selectedElementId,
    selectedElement,
    currentEdits,
    currentOriginalIndex,
    pageEdits,
    pages,
    activeColor,
    activeFillColor,
    activeStrokeWidth,
    activeOpacity,
    getCanvasCoordinates,
    pushHistorySnapshot,
    commitSelectedElementChange,
  ]);

  // ----------------------------------------------------
  // Existing Text Selection & In-Place Editing
  // ----------------------------------------------------

  const handleSelectExistingText = (item: ExtractedTextItem) => {
    setSelectedElementId(null);
    const existing = currentEdits.existingTextOverrides.find((ov) => ov.id === item.id);

    if (!existing) {
      const newOverride: ExistingTextOverride = {
        id: item.id,
        originalText: item.str,
        newText: item.str,
        x: item.x,
        y: item.y,
        width: item.width,
        height: item.height,
        fontSize: item.fontSize,
        color: '#000000',
        backgroundColor: '#ffffff',
      };

      const updatedEdits = {
        ...pageEdits,
        [currentOriginalIndex]: {
          ...currentEdits,
          existingTextOverrides: [...currentEdits.existingTextOverrides, newOverride],
        },
      };

      setPageEdits(updatedEdits);
      setSelectedTextOverrideId(newOverride.id);
    } else {
      setSelectedTextOverrideId(existing.id);
    }
  };

  const updateExistingTextOverride = (id: string, newText: string) => {
    const updatedOverrides = currentEdits.existingTextOverrides.map((ov) => {
      if (ov.id === id) {
        return { ...ov, newText };
      }
      return ov;
    });

    const updatedEdits = {
      ...pageEdits,
      [currentOriginalIndex]: {
        ...currentEdits,
        existingTextOverrides: updatedOverrides,
      },
    };
    setPageEdits(updatedEdits);
  };

  // ----------------------------------------------------
  // Page Operations (Add, Delete, Rotate, Reorder)
  // ----------------------------------------------------

  const handleRotatePage = () => {
    const newPages = pages.map((p, idx) => {
      if (idx === currentPageIndex) {
        const nextRot = ((p.rotation + 90) % 360) as 0 | 90 | 180 | 270;
        return { ...p, rotation: nextRot };
      }
      return p;
    });

    setPages(newPages);
    pushHistorySnapshot(newPages, pageEdits);
  };

  const handleAddBlankPage = () => {
    const newPageIndex = pages.length;
    const newPage: PageMetadata = {
      originalIndex: newPageIndex,
      pageNumber: pages.length + 1,
      width: 595,
      height: 842,
      rotation: 0,
      isNewBlank: true,
    };

    const newPages = [...pages, newPage];
    const updatedEdits = {
      ...pageEdits,
      [newPageIndex]: {
        pageIndex: newPageIndex,
        width: 595,
        height: 842,
        rotation: 0,
        existingTextOverrides: [],
        elements: [],
      },
    };

    setPages(newPages);
    setPageEdits(updatedEdits);
    pushHistorySnapshot(newPages, updatedEdits);
    setCurrentPageIndex(newPages.length - 1);
  };

  const handleDeletePage = (pageIdxToDelete: number) => {
    if (pages.length <= 1) return;
    const newPages = pages.filter((_, idx) => idx !== pageIdxToDelete);
    setPages(newPages);
    pushHistorySnapshot(newPages, pageEdits);
    setCurrentPageIndex(Math.max(0, Math.min(currentPageIndex, newPages.length - 1)));
  };

  // ----------------------------------------------------
  // Save / Export Final PDF
  // ----------------------------------------------------

  const handleExportPdf = async () => {
    try {
      setIsExporting(true);
      const arrayBuffer = await file.arrayBuffer();

      const documentState: DocumentEditState = {
        pages,
        pageEdits,
      };

      const exportedBytes = await applyPdfEdits(arrayBuffer, documentState);
      const exportBlob = new Blob([exportedBytes as BlobPart], { type: 'application/pdf' });

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);

      if (onDone) {
        onDone(exportBlob);
      } else {
        await downloadBlob(exportBlob, `${file.name.replace(/\.[^/.]+$/, '')}_edited.pdf`);
      }
    } catch (err) {
      console.error('Failed to export edited PDF:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col h-[88vh] rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden shadow-2xl animate-in fade-in duration-300">
      {/* 1. TOP MAIN TOOLBAR - Polished, Consistent & Responsive */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-[var(--border)] bg-[var(--bg-subtle)]/80 backdrop-blur-md">
        {/* Tool Selector Group */}
        <div className="flex items-center gap-1 bg-[var(--bg-card)] p-1 rounded-2xl border border-[var(--border)] shadow-2xs overflow-x-auto no-scrollbar max-w-full">
          {[
            { id: 'select', label: 'Select', icon: MousePointer },
            { id: 'editText', label: 'Edit Text', icon: Sparkles },
            { id: 'addText', label: 'Add Text', icon: Type },
            { id: 'rect', label: 'Rectangle', icon: Square },
            { id: 'circle', label: 'Circle', icon: Circle },
            { id: 'line', label: 'Line', icon: Minus },
            { id: 'arrow', label: 'Arrow', icon: ArrowUpRight },
            { id: 'highlight', label: 'Highlight', icon: Highlighter },
            { id: 'whiteout', label: 'Whiteout / Redact', icon: Eraser },
          ].map((tool) => {
            const Icon = tool.icon;
            const isActive = currentTool === tool.id;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => {
                  setCurrentTool(tool.id as EditorToolType);
                  setSelectedElementId(null);
                  setSelectedTextOverrideId(null);
                  setIsCropping(false);
                }}
                title={tool.label}
                className={`h-9 inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer select-none shrink-0 ${
                  isActive
                    ? 'bg-[var(--accent)] text-white shadow-xs font-bold'
                    : 'text-[var(--tx-2)] hover:text-[var(--tx)] hover:bg-[var(--bg-subtle)]'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">{tool.label}</span>
              </button>
            );
          })}

          {/* Insert Image Button */}
          <button
            type="button"
            onClick={() => imageUploadRef.current?.click()}
            title="Upload Image to PDF"
            className="h-9 inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap text-[var(--tx-2)] hover:text-[var(--tx)] hover:bg-[var(--bg-subtle)] transition-all cursor-pointer select-none shrink-0"
          >
            <ImageIcon className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Image</span>
          </button>
          <input
            ref={imageUploadRef}
            type="file"
            accept="image/png,image/jpeg,image/svg+xml"
            className="hidden"
            onChange={handleImageFileChange}
          />
        </div>

        {/* History, Zoom & Save Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Undo / Redo */}
          <div className="flex items-center gap-0.5 bg-[var(--bg-card)] p-1 rounded-2xl border border-[var(--border)] shadow-2xs">
            <button
              type="button"
              disabled={historyIndex <= 0}
              onClick={handleUndo}
              title="Undo (Ctrl+Z)"
              className="h-7 w-7 flex items-center justify-center rounded-lg text-[var(--tx-2)] hover:text-[var(--tx)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <Undo2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              disabled={historyIndex >= history.length - 1}
              onClick={handleRedo}
              title="Redo (Ctrl+Y)"
              className="h-7 w-7 flex items-center justify-center rounded-lg text-[var(--tx-2)] hover:text-[var(--tx)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <Redo2 className="h-4 w-4" />
            </button>
          </div>

          {/* Zoom controls */}
          <div className="hidden md:flex items-center gap-1 bg-[var(--bg-card)] px-2 py-1 rounded-2xl border border-[var(--border)] shadow-2xs text-xs font-semibold text-[var(--tx-2)]">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(0.5, Number((z - 0.2).toFixed(1))))}
              className="p-1 hover:text-[var(--tx)] cursor-pointer"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="w-11 text-center text-xs font-mono font-bold text-[var(--tx)]">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(2.5, Number((z + 0.2).toFixed(1))))}
              className="p-1 hover:text-[var(--tx)] cursor-pointer"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(1.0)}
              title="Fit standard (100%)"
              className="p-1 ml-1 hover:text-[var(--tx)] border-l border-[var(--border)] pl-1.5 cursor-pointer"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Export PDF Action Button */}
          <button
            type="button"
            disabled={isExporting}
            onClick={handleExportPdf}
            className="h-9 inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-[var(--accent)] text-white text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer disabled:opacity-50 select-none whitespace-nowrap"
          >
            {isExporting ? (
              <>
                <div className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Exporting...</span>
              </>
            ) : exportSuccess ? (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                <span>Save & Export</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. BODY WORKSPACE: Thumbnails Sidebar + Center Document Canvas + Right Inspector */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR: Page Thumbnails & Page Operations */}
        <div className="w-44 sm:w-52 border-r border-[var(--border)] bg-[var(--bg-subtle)]/40 p-4 flex flex-col justify-between overflow-y-auto shrink-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[var(--tx-3)] uppercase tracking-wider">
                Pages ({pages.length})
              </span>
              <button
                type="button"
                onClick={handleAddBlankPage}
                title="Add blank page"
                className="p-1 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx-2)] hover:text-[var(--accent)] hover:border-[var(--accent)] text-xs flex items-center gap-1 cursor-pointer transition-all"
              >
                <Plus className="h-3 w-3" />
                <span className="text-[10px] font-bold">Add</span>
              </button>
            </div>

            {/* Thumbnail cards */}
            <div className="space-y-3">
              {pages.map((p, idx) => {
                const isCurrent = idx === currentPageIndex;
                return (
                  <div
                    key={`page_thumb_${idx}_${p.originalIndex}`}
                    onClick={() => {
                      setCurrentPageIndex(idx);
                      setSelectedElementId(null);
                      setSelectedTextOverrideId(null);
                      setIsCropping(false);
                    }}
                    className={`group relative p-2 rounded-2xl border transition-all cursor-pointer ${
                      isCurrent
                        ? 'border-[var(--accent)] bg-[var(--accent-soft)]/40 shadow-xs'
                        : 'border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent-border)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1 text-[11px] font-bold text-[var(--tx)]">
                      <span>Page {idx + 1}</span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRotatePage();
                          }}
                          title="Rotate 90°"
                          className="p-1 text-[var(--tx-3)] hover:text-[var(--tx)]"
                        >
                          <RotateCw className="h-3 w-3" />
                        </button>
                        {pages.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePage(idx);
                            }}
                            title="Delete page"
                            className="p-1 text-[var(--tx-3)] hover:text-red-500"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="aspect-[1/1.41] bg-white rounded-lg border border-[var(--border)] flex items-center justify-center text-xs text-neutral-400 font-semibold shadow-2xs">
                      {p.isNewBlank ? 'Blank Page' : `P. ${idx + 1}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {isScannedPdf && (
            <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <Info className="h-3.5 w-3.5" />
                <span>Scanned Document</span>
              </div>
              This PDF contains scanned imagery. You can add new text, whiteout areas, draw shapes, and embed images on top.
            </div>
          )}
        </div>

        {/* CENTER VIEWPORT: Document Canvas with Multi-Layer Interactive Elements */}
        <div
          ref={containerRef}
          className="flex-1 bg-neutral-900/10 dark:bg-neutral-950/60 p-6 sm:p-10 overflow-auto flex items-start justify-center relative select-none"
        >
          <div
            className="relative bg-white shadow-2xl rounded-sm transition-transform duration-75 touch-none"
            style={{
              width: (currentPageMeta?.width || 595) * zoomLevel,
              height: (currentPageMeta?.height || 842) * zoomLevel,
            }}
            onMouseDown={handleCanvasMouseDown}
          >
            {/* Layer 1: PDF.js High-DPI Base Page Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none rounded-sm" />

            {/* Layer 2: Existing Text Interaction Overlay (For editing original PDF text) */}
            {currentTool === 'editText' &&
              extractedTexts[currentOriginalIndex]?.map((item) => {
                const override = currentEdits.existingTextOverrides.find((ov) => ov.id === item.id);
                if (override?.isDeleted) return null;

                const isSelected = selectedTextOverrideId === item.id;
                const displayText = override ? override.newText : item.str;

                return (
                  <div
                    key={item.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectExistingText(item);
                    }}
                    style={{
                      left: item.x * zoomLevel,
                      top: item.y * zoomLevel,
                      width: item.width * zoomLevel,
                      height: item.height * zoomLevel,
                      fontSize: item.fontSize * zoomLevel,
                    }}
                    className={`absolute flex items-center px-0.5 rounded transition-all cursor-text font-sans ${
                      isSelected
                        ? 'ring-2 ring-[var(--accent)] bg-white shadow-md z-30'
                        : 'hover:bg-blue-500/20 hover:ring-1 hover:ring-blue-400 z-10'
                    }`}
                  >
                    {isSelected ? (
                      <input
                        type="text"
                        autoFocus
                        value={displayText}
                        onChange={(e) => updateExistingTextOverride(item.id, e.target.value)}
                        onBlur={commitSelectedElementChange}
                        className="w-full h-full bg-transparent outline-none font-sans text-neutral-900 border-none p-0 m-0"
                        style={{ fontSize: item.fontSize * zoomLevel }}
                      />
                    ) : (
                      <span className="opacity-0">{displayText}</span>
                    )}
                  </div>
                );
              })}

            {/* Layer 2b: Render Existing Text Overrides (Whiteout masks + vector replacements) */}
            {currentEdits.existingTextOverrides.map((override) => {
              if (override.isDeleted) {
                return (
                  <div
                    key={`mask_${override.id}`}
                    style={{
                      left: override.x * zoomLevel - 1,
                      top: override.y * zoomLevel - 1,
                      width: override.width * zoomLevel + 2,
                      height: override.height * zoomLevel + 2,
                      backgroundColor: override.backgroundColor || '#ffffff',
                    }}
                    className="absolute z-10 pointer-events-none"
                  />
                );
              }

              return (
                <div
                  key={`override_${override.id}`}
                  style={{
                    left: override.x * zoomLevel - 1,
                    top: override.y * zoomLevel - 1,
                    width: override.width * zoomLevel + 2,
                    height: override.height * zoomLevel + 2,
                    backgroundColor: override.backgroundColor || '#ffffff',
                    fontSize: override.fontSize * zoomLevel,
                    color: override.color || '#000000',
                  }}
                  className="absolute z-10 flex items-center px-0.5 font-sans pointer-events-none"
                >
                  <span>{override.newText}</span>
                </div>
              );
            })}

            {/* Layer 3: User Elements (Text, Shapes, Images, Drawings, Signatures, Highlights) */}
            {currentEdits.elements.map((elem) => {
              const isSelected = selectedElementId === elem.id;
              const isImage = elem.type === 'image';
              const isCurrentlyCropping = isCropping && croppingElementId === elem.id;

              return (
                <div
                  key={elem.id}
                  onMouseDown={(e) => handleElementMouseDown(e, elem)}
                  style={{
                    left: elem.x * zoomLevel,
                    top: elem.y * zoomLevel,
                    width: elem.width * zoomLevel,
                    height: elem.height * zoomLevel,
                    opacity: elem.opacity !== undefined ? elem.opacity : 1,
                    transform: elem.rotation ? `rotate(${elem.rotation}deg)` : undefined,
                    cursor: currentTool === 'select' ? 'move' : 'default',
                  }}
                  className={`absolute z-20 group transition-shadow ${
                    isSelected && !isCurrentlyCropping
                      ? 'ring-2 ring-[var(--accent)] shadow-xl'
                      : 'hover:ring-1 hover:ring-[var(--accent-border)]'
                  }`}
                >
                  {/* Floating Contextual Pill Bar for Selected Element */}
                  {isSelected && !isCurrentlyCropping && (
                    <div
                      onMouseDown={(e) => e.stopPropagation()}
                      style={{
                        transform: elem.rotation ? `rotate(-${elem.rotation}deg)` : undefined,
                        top: -46,
                        left: 0,
                      }}
                      className="absolute z-40 flex items-center gap-1 bg-neutral-900/95 text-white px-2 py-1 rounded-xl shadow-2xl border border-neutral-700/80 backdrop-blur-md text-xs font-semibold animate-in fade-in zoom-in-95 duration-150 whitespace-nowrap pointer-events-auto"
                    >
                      {isImage && (
                        <>
                          <button
                            type="button"
                            onClick={handleStartCrop}
                            title="Crop Image"
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/20 transition-colors text-white cursor-pointer"
                          >
                            <Crop className="h-3.5 w-3.5 text-amber-400" />
                            <span>Crop</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleRotateSelected}
                            title="Rotate 90°"
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/20 transition-colors text-white cursor-pointer"
                          >
                            <RotateCw className="h-3.5 w-3.5 text-blue-400" />
                            <span>Rotate</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleToggleLockRatio}
                            title={(elem as ImageElement).lockAspectRatio !== false ? 'Lock Aspect Ratio (Active)' : 'Free Stretch Mode (Active)'}
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                              (elem as ImageElement).lockAspectRatio !== false
                                ? 'bg-white/20 text-white'
                                : 'text-neutral-400 hover:text-white'
                            }`}
                          >
                            {(elem as ImageElement).lockAspectRatio !== false ? (
                              <>
                                <Lock className="h-3.5 w-3.5 text-emerald-400" />
                                <span>Locked</span>
                              </>
                            ) : (
                              <>
                                <Unlock className="h-3.5 w-3.5 text-amber-400" />
                                <span>Free Stretch</span>
                              </>
                            )}
                          </button>

                          <div className="h-4 w-px bg-neutral-700 mx-0.5" />
                        </>
                      )}

                      <button
                        type="button"
                        onClick={() => handleReorderLayer('up')}
                        title="Bring Forward"
                        className="p-1 rounded-lg hover:bg-white/20 transition-colors text-neutral-300 hover:text-white cursor-pointer"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleReorderLayer('down')}
                        title="Send Backward"
                        className="p-1 rounded-lg hover:bg-white/20 transition-colors text-neutral-300 hover:text-white cursor-pointer"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={handleDuplicateSelected}
                        title="Duplicate (Ctrl+D)"
                        className="p-1 rounded-lg hover:bg-white/20 transition-colors text-neutral-300 hover:text-white cursor-pointer"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={handleDeleteSelected}
                        title="Delete Element (Del)"
                        className="p-1 rounded-lg hover:bg-red-500/40 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Element Content Renderers */}
                  {elem.type === 'text' && (
                    <div
                      style={{
                        fontSize: (elem as TextElement).fontSize * zoomLevel,
                        color: (elem as TextElement).color,
                        fontFamily: (elem as TextElement).fontFamily,
                        fontWeight: (elem as TextElement).fontWeight,
                        fontStyle: (elem as TextElement).fontStyle,
                        textAlign: (elem as TextElement).alignment,
                      }}
                      className="w-full h-full p-1 whitespace-pre-wrap outline-none"
                    >
                      {isSelected ? (
                        <textarea
                          value={(elem as TextElement).text}
                          onChange={(e) => updateSelectedElement({ text: e.target.value })}
                          onBlur={commitSelectedElementChange}
                          className="w-full h-full bg-transparent resize-none outline-none border-none p-0 m-0 cursor-text"
                          style={{
                            fontSize: (elem as TextElement).fontSize * zoomLevel,
                            color: (elem as TextElement).color,
                            fontFamily: (elem as TextElement).fontFamily,
                            fontWeight: (elem as TextElement).fontWeight,
                            fontStyle: (elem as TextElement).fontStyle,
                            textAlign: (elem as TextElement).alignment,
                          }}
                        />
                      ) : (
                        (elem as TextElement).text
                      )}
                    </div>
                  )}

                  {elem.type === 'rect' && (
                    <div
                      style={{
                        borderColor: (elem as ShapeElement).strokeColor,
                        borderWidth: (elem as ShapeElement).strokeWidth * zoomLevel,
                        backgroundColor: (elem as ShapeElement).fillColor,
                        borderRadius: (elem as ShapeElement).borderRadius,
                      }}
                      className="w-full h-full border pointer-events-none"
                    />
                  )}

                  {elem.type === 'circle' && (
                    <div
                      style={{
                        borderColor: (elem as ShapeElement).strokeColor,
                        borderWidth: (elem as ShapeElement).strokeWidth * zoomLevel,
                        backgroundColor: (elem as ShapeElement).fillColor,
                      }}
                      className="w-full h-full border rounded-full pointer-events-none"
                    />
                  )}

                  {elem.type === 'whiteout' && (
                    <div className="w-full h-full bg-white shadow-2xs pointer-events-none" />
                  )}

                  {elem.type === 'highlight' && (
                    <div
                      style={{
                        backgroundColor: (elem as ShapeElement).fillColor || '#FEF08A',
                        opacity: 0.4,
                      }}
                      className="w-full h-full mix-blend-multiply pointer-events-none"
                    />
                  )}

                  {elem.type === 'line' && (() => {
                    const shp = elem as ShapeElement;
                    const x1 = ((shp.startX !== undefined ? shp.startX : elem.x) - elem.x) * zoomLevel;
                    const y1 = ((shp.startY !== undefined ? shp.startY : elem.y) - elem.y) * zoomLevel;
                    const x2 = ((shp.endX !== undefined ? shp.endX : elem.x + elem.width) - elem.x) * zoomLevel;
                    const y2 = ((shp.endY !== undefined ? shp.endY : elem.y + elem.height) - elem.y) * zoomLevel;

                    return (
                      <svg className="w-full h-full overflow-visible pointer-events-none">
                        <line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke={shp.strokeColor || '#000000'}
                          strokeWidth={(shp.strokeWidth || 2) * zoomLevel}
                          strokeLinecap="round"
                        />
                      </svg>
                    );
                  })()}

                  {elem.type === 'arrow' && (() => {
                    const shp = elem as ShapeElement;
                    const x1 = ((shp.startX !== undefined ? shp.startX : elem.x) - elem.x) * zoomLevel;
                    const y1 = ((shp.startY !== undefined ? shp.startY : elem.y) - elem.y) * zoomLevel;
                    const x2 = ((shp.endX !== undefined ? shp.endX : elem.x + elem.width) - elem.x) * zoomLevel;
                    const y2 = ((shp.endY !== undefined ? shp.endY : elem.y + elem.height) - elem.y) * zoomLevel;
                    const strokeWidth = (shp.strokeWidth || 2) * zoomLevel;
                    const markerId = `arrow_marker_${elem.id}`;

                    return (
                      <svg className="w-full h-full overflow-visible pointer-events-none">
                        <defs>
                          <marker
                            id={markerId}
                            viewBox="0 0 10 10"
                            refX="7"
                            refY="5"
                            markerWidth="6"
                            markerHeight="6"
                            orient="auto-start-reverse"
                          >
                            <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={shp.strokeColor || '#000000'} />
                          </marker>
                        </defs>
                        <line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke={shp.strokeColor || '#000000'}
                          strokeWidth={strokeWidth}
                          strokeLinecap="round"
                          markerEnd={`url(#${markerId})`}
                        />
                      </svg>
                    );
                  })()}

                  {elem.type === 'image' && (
                    <div className="relative w-full h-full overflow-hidden select-none">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={(elem as ImageElement).dataUrl}
                        alt="Embedded object"
                        className="w-full h-full object-fill pointer-events-none"
                        draggable={false}
                      />

                      {/* Interactive Crop Box Overlay */}
                      {isCurrentlyCropping && (
                        <div
                          className="absolute inset-0 z-30 pointer-events-auto select-none"
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          {/* Darkened mask outside crop box */}
                          <div
                            className="absolute bg-black/55"
                            style={{
                              top: 0,
                              left: 0,
                              right: 0,
                              height: cropBox.y * zoomLevel,
                            }}
                          />
                          <div
                            className="absolute bg-black/55"
                            style={{
                              top: (cropBox.y + cropBox.height) * zoomLevel,
                              left: 0,
                              right: 0,
                              bottom: 0,
                            }}
                          />
                          <div
                            className="absolute bg-black/55"
                            style={{
                              top: cropBox.y * zoomLevel,
                              left: 0,
                              width: cropBox.x * zoomLevel,
                              height: cropBox.height * zoomLevel,
                            }}
                          />
                          <div
                            className="absolute bg-black/55"
                            style={{
                              top: cropBox.y * zoomLevel,
                              left: (cropBox.x + cropBox.width) * zoomLevel,
                              right: 0,
                              height: cropBox.height * zoomLevel,
                            }}
                          />

                          {/* Active Crop Frame with Rule-of-Thirds Grid */}
                          <div
                            onMouseDown={(e) => handleCropHandleMouseDown(e, 'move')}
                            style={{
                              left: cropBox.x * zoomLevel,
                              top: cropBox.y * zoomLevel,
                              width: cropBox.width * zoomLevel,
                              height: cropBox.height * zoomLevel,
                            }}
                            className="absolute border-2 border-white shadow-2xl cursor-move select-none"
                          >
                            {/* Grid lines */}
                            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-40">
                              <div className="border-r border-b border-white/70" />
                              <div className="border-r border-b border-white/70" />
                              <div className="border-b border-white/70" />
                              <div className="border-r border-b border-white/70" />
                              <div className="border-r border-b border-white/70" />
                              <div className="border-b border-white/70" />
                              <div className="border-r border-white/70" />
                              <div className="border-r border-white/70" />
                              <div />
                            </div>

                            {/* 8 Draggable Crop Handles */}
                            {(['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'] as ResizeHandleType[]).map((handle) => {
                              const isCorner = handle.length === 2;
                              return (
                                <div
                                  key={handle}
                                  onMouseDown={(e) => handleCropHandleMouseDown(e, handle)}
                                  className={`absolute ${
                                    isCorner ? 'w-3.5 h-3.5 bg-white border-2 border-amber-500 rounded-xs' : 'w-4 h-2 bg-white border border-amber-500 rounded-xs'
                                  } shadow-md z-40 cursor-${
                                    handle === 'nw' || handle === 'se'
                                      ? 'nwse'
                                      : handle === 'ne' || handle === 'sw'
                                      ? 'nesw'
                                      : handle === 'n' || handle === 's'
                                      ? 'ns'
                                      : 'ew'
                                  }-resize`}
                                  style={{
                                    top: handle.includes('n') ? -5 : handle.includes('s') ? undefined : '50%',
                                    bottom: handle.includes('s') ? -5 : undefined,
                                    left: handle.includes('w') ? -5 : handle.includes('e') ? undefined : '50%',
                                    right: handle.includes('e') ? -5 : undefined,
                                    transform:
                                      handle === 'n' || handle === 's'
                                        ? 'translateX(-50%)'
                                        : handle === 'w' || handle === 'e'
                                        ? 'translateY(-50%)'
                                        : undefined,
                                  }}
                                />
                              );
                            })}

                            {/* Floating Action Buttons during Crop Mode */}
                            <div
                              onMouseDown={(e) => e.stopPropagation()}
                              className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-neutral-900 text-white px-3 py-1.5 rounded-xl shadow-2xl border border-neutral-700 text-xs font-bold whitespace-nowrap z-50 pointer-events-auto"
                            >
                              <button
                                type="button"
                                onClick={handleApplyCrop}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                              >
                                <Check className="h-3.5 w-3.5" />
                                <span>Apply Crop</span>
                              </button>
                              <button
                                type="button"
                                onClick={handleCancelCrop}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white transition-colors cursor-pointer"
                              >
                                <X className="h-3.5 w-3.5" />
                                <span>Cancel</span>
                              </button>
                              {(elem as ImageElement).originalDataUrl && (
                                <button
                                  type="button"
                                  onClick={handleResetCrop}
                                  title="Reset to Full Original Image"
                                  className="p-1 rounded-lg hover:bg-white/20 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                                >
                                  <RotateCcw className="h-3.5 w-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {(elem.type === 'draw' || elem.type === 'signature') && (
                    <svg className="w-full h-full overflow-visible pointer-events-none">
                      <polyline
                        points={(elem as DrawingElement).points
                          .map((p) => `${(p.x - elem.x) * zoomLevel},${(p.y - elem.y) * zoomLevel}`)
                          .join(' ')}
                        fill="none"
                        stroke={(elem as DrawingElement).color}
                        strokeWidth={(elem as DrawingElement).strokeWidth * zoomLevel}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}

                  {/* 8-Point Transformer Handles when Selected */}
                  {isSelected && !isCurrentlyCropping && (
                    <>
                      {/* Corner Handles (Proportional / Aspect Ratio Locked) */}
                      {(['nw', 'ne', 'se', 'sw'] as ResizeHandleType[]).map((handle) => (
                        <div
                          key={handle}
                          onMouseDown={(e) => handleResizeHandleMouseDown(e, handle, elem)}
                          className={`absolute w-3.5 h-3.5 bg-white border-2 border-[var(--accent)] rounded-full shadow-md z-30 touch-none select-none cursor-${
                            handle === 'nw' || handle === 'se' ? 'nwse' : 'nesw'
                          }-resize`}
                          style={{
                            top: handle.includes('n') ? -6 : undefined,
                            bottom: handle.includes('s') ? -6 : undefined,
                            left: handle.includes('w') ? -6 : undefined,
                            right: handle.includes('e') ? -6 : undefined,
                          }}
                        />
                      ))}

                      {/* Edge Handles (Horizontal / Vertical Stretch) */}
                      {(['n', 's', 'w', 'e'] as ResizeHandleType[]).map((handle) => {
                        const isHorizontal = handle === 'w' || handle === 'e';
                        return (
                          <div
                            key={handle}
                            onMouseDown={(e) => handleResizeHandleMouseDown(e, handle, elem)}
                            className={`absolute bg-white border-2 border-[var(--accent)] rounded-xs shadow-md z-30 touch-none select-none ${
                              isHorizontal ? 'w-2 h-4.5 cursor-ew-resize' : 'w-4.5 h-2 cursor-ns-resize'
                            }`}
                            style={{
                              top: handle === 'n' ? -4 : handle === 's' ? undefined : '50%',
                              bottom: handle === 's' ? -4 : undefined,
                              left: handle === 'w' ? -4 : handle === 'e' ? undefined : '50%',
                              right: handle === 'e' ? -4 : undefined,
                              transform:
                                handle === 'n' || handle === 's'
                                  ? 'translateX(-50%)'
                                  : 'translateY(-50%)',
                            }}
                          />
                        );
                      })}
                    </>
                  )}
                </div>
              );
            })}

            {/* Live Interactive Shape Drawing Preview */}
            {isDrawing && drawStartPos && drawCurrentPos && (
              <div className="absolute inset-0 pointer-events-none z-30 overflow-visible">
                {currentTool === 'arrow' && (
                  <svg className="w-full h-full overflow-visible">
                    <defs>
                      <marker
                        id="live_arrow_head"
                        viewBox="0 0 10 10"
                        refX="7"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                      >
                        <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={activeColor || '#000000'} />
                      </marker>
                    </defs>
                    <line
                      x1={drawStartPos.x * zoomLevel}
                      y1={drawStartPos.y * zoomLevel}
                      x2={drawCurrentPos.x * zoomLevel}
                      y2={drawCurrentPos.y * zoomLevel}
                      stroke={activeColor || '#000000'}
                      strokeWidth={activeStrokeWidth * zoomLevel}
                      strokeLinecap="round"
                      markerEnd="url(#live_arrow_head)"
                    />
                  </svg>
                )}

                {currentTool === 'line' && (
                  <svg className="w-full h-full overflow-visible">
                    <line
                      x1={drawStartPos.x * zoomLevel}
                      y1={drawStartPos.y * zoomLevel}
                      x2={drawCurrentPos.x * zoomLevel}
                      y2={drawCurrentPos.y * zoomLevel}
                      stroke={activeColor || '#000000'}
                      strokeWidth={activeStrokeWidth * zoomLevel}
                      strokeLinecap="round"
                    />
                  </svg>
                )}

                {currentTool === 'rect' && (
                  <div
                    style={{
                      left: Math.min(drawStartPos.x, drawCurrentPos.x) * zoomLevel,
                      top: Math.min(drawStartPos.y, drawCurrentPos.y) * zoomLevel,
                      width: Math.abs(drawCurrentPos.x - drawStartPos.x) * zoomLevel,
                      height: Math.abs(drawCurrentPos.y - drawStartPos.y) * zoomLevel,
                      borderColor: activeColor,
                      borderWidth: activeStrokeWidth * zoomLevel,
                      backgroundColor: activeFillColor,
                    }}
                    className="absolute border"
                  />
                )}

                {currentTool === 'circle' && (
                  <div
                    style={{
                      left: Math.min(drawStartPos.x, drawCurrentPos.x) * zoomLevel,
                      top: Math.min(drawStartPos.y, drawCurrentPos.y) * zoomLevel,
                      width: Math.abs(drawCurrentPos.x - drawStartPos.x) * zoomLevel,
                      height: Math.abs(drawCurrentPos.y - drawStartPos.y) * zoomLevel,
                      borderColor: activeColor,
                      borderWidth: activeStrokeWidth * zoomLevel,
                      backgroundColor: activeFillColor,
                    }}
                    className="absolute border rounded-full"
                  />
                )}

                {currentTool === 'whiteout' && (
                  <div
                    style={{
                      left: Math.min(drawStartPos.x, drawCurrentPos.x) * zoomLevel,
                      top: Math.min(drawStartPos.y, drawCurrentPos.y) * zoomLevel,
                      width: Math.abs(drawCurrentPos.x - drawStartPos.x) * zoomLevel,
                      height: Math.abs(drawCurrentPos.y - drawStartPos.y) * zoomLevel,
                      backgroundColor: '#ffffff',
                    }}
                    className="absolute shadow-xs"
                  />
                )}

                {currentTool === 'highlight' && (
                  <div
                    style={{
                      left: Math.min(drawStartPos.x, drawCurrentPos.x) * zoomLevel,
                      top: Math.min(drawStartPos.y, drawCurrentPos.y) * zoomLevel,
                      width: Math.abs(drawCurrentPos.x - drawStartPos.x) * zoomLevel,
                      height: Math.abs(drawCurrentPos.y - drawStartPos.y) * zoomLevel,
                      backgroundColor: activeFillColor && activeFillColor !== 'transparent' ? activeFillColor : '#FEF08A',
                      opacity: 0.4,
                    }}
                    className="absolute mix-blend-multiply"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT INSPECTOR PANEL: Properties for Selected Object */}
        <div className="w-64 sm:w-72 border-l border-[var(--border)] bg-[var(--bg-subtle)]/40 p-5 overflow-y-auto shrink-0 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-[var(--tx-3)] uppercase tracking-wider">
                {selectedElement
                  ? `${selectedElement.type.toUpperCase()} PROPERTIES`
                  : selectedTextOverride
                  ? 'EDIT ORIGINAL TEXT'
                  : 'DOCUMENT PROPERTIES'}
              </h4>
            </div>

            {/* Image Specific Controls */}
            {selectedElement?.type === 'image' && (
              <div className="space-y-4 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--tx)]">Image Actions</span>
                  <span className="text-[10px] font-mono text-[var(--tx-3)]">
                    {Math.round(selectedElement.width)} × {Math.round(selectedElement.height)} pt
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleStartCrop}
                    className="btn-secondary py-2 text-xs flex items-center justify-center gap-1.5 font-bold"
                  >
                    <Crop className="h-3.5 w-3.5 text-amber-500" />
                    <span>Crop Image</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRotateSelected}
                    className="btn-secondary py-2 text-xs flex items-center justify-center gap-1.5 font-bold"
                  >
                    <RotateCw className="h-3.5 w-3.5 text-blue-500" />
                    <span>Rotate 90°</span>
                  </button>
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="text-[11px] font-semibold text-[var(--tx-2)]">Resize Mode</label>
                  <button
                    type="button"
                    onClick={handleToggleLockRatio}
                    className="btn-secondary w-full py-2 text-xs flex items-center justify-center gap-2 font-medium"
                  >
                    {(selectedElement as ImageElement).lockAspectRatio !== false ? (
                      <>
                        <Lock className="h-3.5 w-3.5 text-emerald-500" />
                        <span>Maintain Aspect Ratio</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="h-3.5 w-3.5 text-amber-500" />
                        <span>Free Stretch Enabled</span>
                      </>
                    )}
                  </button>
                </div>

                {(selectedElement as ImageElement).originalDataUrl && (
                  <button
                    type="button"
                    onClick={handleResetCrop}
                    className="btn-secondary w-full py-1.5 text-xs text-[var(--tx-2)] hover:text-[var(--tx)] flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Reset to Original Image</span>
                  </button>
                )}
              </div>
            )}

            {/* Typography Controls (For Text & Original Text Replacement) */}
            {(selectedElement?.type === 'text' || selectedTextOverride) && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--tx)]">Font Family</label>
                  <select
                    value={activeFontFamily}
                    onChange={(e) => {
                      const fam = e.target.value as 'Helvetica' | 'TimesRoman' | 'Courier';
                      setActiveFontFamily(fam);
                      if (selectedElement) updateSelectedElement({ fontFamily: fam });
                    }}
                    className="input-modern w-full text-xs cursor-pointer"
                  >
                    <option value="Helvetica">Helvetica (Sans-Serif)</option>
                    <option value="TimesRoman">Times Roman (Serif)</option>
                    <option value="Courier">Courier (Monospace)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--tx)]">Size (pt)</label>
                    <input
                      type="number"
                      min={8}
                      max={72}
                      value={activeFontSize}
                      onChange={(e) => {
                        const sz = Number(e.target.value);
                        setActiveFontSize(sz);
                        if (selectedElement) updateSelectedElement({ fontSize: sz });
                        if (selectedTextOverride) {
                          updateExistingTextOverride(selectedTextOverride.id, selectedTextOverride.newText);
                        }
                      }}
                      className="input-modern w-full text-xs font-mono font-bold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--tx)]">Formatting</label>
                    <div className="flex items-center gap-1 bg-[var(--bg-card)] p-1 rounded-xl border border-[var(--border)]">
                      <button
                        type="button"
                        onClick={() => {
                          const w = activeFontWeight === 'bold' ? 'normal' : 'bold';
                          setActiveFontWeight(w);
                          if (selectedElement) updateSelectedElement({ fontWeight: w });
                        }}
                        className={`p-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                          activeFontWeight === 'bold'
                            ? 'bg-[var(--accent)] text-white shadow-2xs'
                            : 'text-[var(--tx-2)] hover:text-[var(--tx)]'
                        }`}
                      >
                        <Bold className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const s = activeFontStyle === 'italic' ? 'normal' : 'italic';
                          setActiveFontStyle(s);
                          if (selectedElement) updateSelectedElement({ fontStyle: s });
                        }}
                        className={`p-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                          activeFontStyle === 'italic'
                            ? 'bg-[var(--accent)] text-white shadow-2xs'
                            : 'text-[var(--tx-2)] hover:text-[var(--tx)]'
                        }`}
                      >
                        <Italic className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--tx)]">Alignment</label>
                  <div className="grid grid-cols-3 gap-1 bg-[var(--bg-card)] p-1 rounded-xl border border-[var(--border)]">
                    {(['left', 'center', 'right'] as const).map((align) => (
                      <button
                        key={align}
                        type="button"
                        onClick={() => {
                          setActiveAlignment(align);
                          if (selectedElement) updateSelectedElement({ alignment: align });
                        }}
                        className={`py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center cursor-pointer transition-all ${
                          activeAlignment === align
                            ? 'bg-[var(--accent)] text-white shadow-2xs'
                            : 'text-[var(--tx-2)] hover:text-[var(--tx)]'
                        }`}
                      >
                        {align === 'left' ? (
                          <AlignLeft className="h-3.5 w-3.5" />
                        ) : align === 'center' ? (
                          <AlignCenter className="h-3.5 w-3.5" />
                        ) : (
                          <AlignRight className="h-3.5 w-3.5" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Shape & Color Properties */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-[var(--tx)]">Color Palette</label>
              <div className="grid grid-cols-5 gap-2">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setActiveColor(c);
                      if (selectedElement) {
                        if (selectedElement.type === 'text') updateSelectedElement({ color: c });
                        else updateSelectedElement({ strokeColor: c } as Partial<ShapeElement>);
                      }
                    }}
                    style={{ backgroundColor: c }}
                    className={`h-7 rounded-xl border transition-all cursor-pointer ${
                      activeColor === c ? 'ring-2 ring-[var(--accent)] ring-offset-2 scale-110' : 'border-neutral-300 dark:border-neutral-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Layering & Management Controls */}
            {selectedElement && (
              <div className="space-y-2 pt-4 border-t border-[var(--border)]">
                <label className="text-xs font-semibold text-[var(--tx)]">Layer Order</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleReorderLayer('up')}
                    className="btn-secondary py-2 text-xs flex items-center justify-center gap-1"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                    <span>Bring Forward</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReorderLayer('down')}
                    className="btn-secondary py-2 text-xs flex items-center justify-center gap-1"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                    <span>Send Backward</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleDuplicateSelected}
                    className="btn-secondary py-2 text-xs flex items-center justify-center gap-1"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>Duplicate</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteSelected}
                    className="btn-secondary py-2 text-xs text-red-500 hover:text-red-600 flex items-center justify-center gap-1"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[var(--border)] text-[11px] text-[var(--tx-3)] space-y-1">
            <p className="font-semibold text-[var(--tx-2)]">Shortcuts & Gestures:</p>
            <p>• <kbd className="px-1 py-0.5 bg-[var(--bg-card)] rounded border border-[var(--border)]">Drag corners</kbd> Proportional scale</p>
            <p>• <kbd className="px-1 py-0.5 bg-[var(--bg-card)] rounded border border-[var(--border)]">Drag sides</kbd> Stretch width/height</p>
            <p>• <kbd className="px-1 py-0.5 bg-[var(--bg-card)] rounded border border-[var(--border)]">Shift + drag</kbd> Toggle free stretch</p>
            <p>• <kbd className="px-1 py-0.5 bg-[var(--bg-card)] rounded border border-[var(--border)]">Ctrl+Z / Y</kbd> Undo / Redo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
