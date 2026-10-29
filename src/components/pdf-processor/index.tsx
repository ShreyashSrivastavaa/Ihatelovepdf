"use client";

import dynamic from 'next/dynamic';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Link from 'next/link';
import FileUploader from './FileUploader';
import FileList from './FileList';
import PageSelector from './PageSelector';
import PageOrderer from './PageOrderer';
import UnifiedCropInterface from './UnifiedCropInterface';
import ProcessingOptions from './ProcessingOptions';
import { ProcessingStatusDialog } from './ProcessingStatusDialog';
import type {
  DialogAction,
  DialogHighlight,
  DonationPrompt,
} from './ProcessingStatusDialog';
import { useNotification } from '../ui/Notification';
import {
  PDFProcessingOptions,
  ProcessingResult,
  createPdfBlob,
  getPdfPageCount,
  processPDF,
  type PdfToImagesArchiveResult,
} from '../../lib/pdf-processor';
import * as PDFOps from '../../lib/pdf-operations';
import { downloadBlob, openBlobInNewTab, isIOS } from '../../lib/download-helper';
import { useDictionary } from '../../i18n/LocaleProvider';
import CompressionPreviewCard, { PreviewStatus } from './CompressionPreviewCard';
import CompressionSummaryCard from './CompressionSummaryCard';
import type { OperationKey } from '../../types/operations';
import { trackEvent } from '../../lib/analytics';

// Heavy tool interfaces, lazy-loaded so only the active tool's bundle is fetched
const TextExtractionViewer = dynamic(() => import('./TextExtractionViewer'), { ssr: false });
const PdfRedactionEditor = dynamic(() => import('./PdfRedactionEditor'), { ssr: false });
const PdfCompareViewer = dynamic(() => import('./PdfCompareViewer'), { ssr: false });
const CameraScanInterface = dynamic(() => import('./CameraScanInterface'), { ssr: false });
const PdfWhiteboardInterface = dynamic(() => import('./PdfWhiteboardInterface'), { ssr: false });
const PdfEditorInterface = dynamic(() => import('./PdfEditorInterface'), { ssr: false });
const PosBillingInterface = dynamic(() => import('./PosBillingInterface'), { ssr: false });
const CreateBlankPdfInterface = dynamic(() => import('./CreateBlankPdfInterface'), { ssr: false });
const SignPdfInterface = dynamic(() => import('./SignPdfInterface'), { ssr: false });
const PdfFormFillerInterface = dynamic(() => import('./PdfFormFillerInterface'), { ssr: false });
const LatexResumeInterface = dynamic(() => import('./LatexResumeInterface'), { ssr: false });
import { ToolErrorBoundary } from '../ToolErrorBoundary';

import StepIndicator, { type ToolStep } from '../StepIndicator';
import ProcessingProgress from './ProcessingProgress';
import StickyActionBar from './StickyActionBar';
import ResultPanel, { type OutputFileItem } from './ResultPanel';
import ErrorState from './ErrorState';
import { ICON_MAP } from '../ToolSwitcher';
import { Layers, ShieldCheck } from 'lucide-react';

type ProcessingMode = OperationKey;

const cloneOptions = (options: PDFProcessingOptions): PDFProcessingOptions => ({
  ...options,
  metadata: options.metadata ? { ...options.metadata } : undefined,
  cropMargins: options.cropMargins ? { ...options.cropMargins } : undefined,
});

const DEFAULT_IMAGE_BASE_NAME = 'ihatelovepdf_pages';

const MODE_DEFAULTS: Record<ProcessingMode, PDFProcessingOptions> = {
  merge: {
    addPageDividers: false,
  },
  compress: {
    compressionLevel: 'medium',
    preserveMetadata: false,
    stripAnnotations: false,
    downscaleImages: true,
    downscaleImagesDpi: 150,
  },
  split: {
    pagesPerFile: 1,
  },
  extract: {
    preserveMetadata: true,
  },
  crop: {
    preserveMetadata: true,
    cropMargins: {
      top: 18,
      right: 18,
      bottom: 18,
      left: 18,
    },
  },
  reorder: {
    preserveMetadata: true,
  },
  rotate: {
    preserveMetadata: true,
    rotationDegrees: 90,
  },
  pdfToImages: {
    imageOutputFormat: 'png',
    imageOutputQuality: 0.9,
    imageRenderDpi: 144,
    bundleAsZip: true,
    imageBaseName: DEFAULT_IMAGE_BASE_NAME,
  },
  imagesToPdf: {
    imageFit: 'contain',
    pageSize: 'auto',
    pageOrientation: 'auto',
    pageMarginPoints: 18,
    backgroundColor: '#ffffff',
  },
  watermark: {
    watermarkType: 'text',
    watermarkText: 'CONFIDENTIAL',
    watermarkColor: '#ff0000',
    watermarkOpacity: 0.3,
    watermarkRotation: 45,
    watermarkPosition: 'center',
    watermarkFontSize: 48,
  },
  pageNumbers: {
    pageNumberFormat: 'Page {n} of {total}',
    pageNumberPosition: 'bottom-center',
    pageNumberStart: 1,
    pageNumberSkipFirst: false,
    pageNumberFontSize: 10,
    pageNumberColor: '#666666',
  },
  headersFooters: {
    headersFooters: {
      headerCenter: '{title}',
      footerLeft: '{date}',
      footerRight: 'Page {page} of {total}',
      margin: 25,
      fontSize: 10,
      color: '#4b5563',
      shrinkToFit: true,
    },
  },
  extractText: {},
  invertColors: {
    colorMode: 'dark-mode',
  },
  redact: {
    redactColor: '#000000',
  },
  compare: {},
  pdfToZip: {
    imageOutputFormat: 'png',
    imageOutputQuality: 0.9,
    imageRenderDpi: 144,
    bundleAsZip: true,
    imageBaseName: DEFAULT_IMAGE_BASE_NAME,
  },
  encrypt: {
    userPassword: '',
    confirmPassword: '',
    ownerPassword: '',
    encryptionAlgorithm: 'AES-256',
    encryptionPermissions: {
      allowPrinting: true,
      allowCopying: true,
      allowModifying: false,
      allowAnnotating: true,
      allowFillingForms: true,
    },
  },
  decrypt: {
    password: '',
    decryptionPassword: '',
  },
  editPdf: {},
  scanToPdf: {},
  markdownToPdf: {
    markdownTheme: 'github',
  },
  htmlToPdf: {},
  csvToPdf: {
    csvDelimiter: ',',
  },
  createPdf: {
    blankPageCount: 1,
    blankPageSize: 'a4',
    blankPageOrientation: 'portrait',
  },
  excelToPdf: {},
  pdfToExcel: {},
  powerpointToPdf: {},
  pdfToPowerpoint: {},
  pdfToHtml: {},
  pdfToEpub: {},
  ebookToPdf: {},
  whiteboard: {},
  gstInvoice: {
    invoiceNumber: 'INV-001',
    taxRate: 18,
  },
  posBilling: {},
  signPdf: {},
  fillPdfForm: {},
  latexResume: {},
};




const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif'];
const IMAGE_MIME_PREFIX = 'image/';

const isPdfFile = (file: File) =>
  file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

const isImageFile = (file: File) => {
  if (file.type.startsWith(IMAGE_MIME_PREFIX)) {
    return true;
  }
  const lower = file.name.toLowerCase();
  return IMAGE_EXTENSIONS.some(ext => lower.endsWith(ext));
};

type CompressionPreviewEntry = {
  result: ProcessingResult;
  fileSignature: string;
  optionsSignature: string;
  generatedAt: number;
};

type CompressionSummaryEntry = {
  id: string;
  fileName: string;
  result: ProcessingResult;
  blob: Blob;
  elapsedSeconds: number;
  originalFile: File;
};

type PreviewStateEntry = {
  status: PreviewStatus;
  error?: string;
};

type PreviewStateMap = Record<string, PreviewStateEntry>;

type DownloadEntry = {
  blob: Blob;
  fileName: string;
};

type ProcessingDialogState = {
  isOpen: boolean;
  status: 'processing' | 'success' | 'error';
  title: string;
  description?: string;
  progress?: number;
  highlights: DialogHighlight[];
  downloads: DownloadEntry[];
  donationPrompt: DonationPrompt | null;
};

const createSummaryId = () =>
  typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

const serializeOptions = (options: PDFProcessingOptions) =>
  JSON.stringify(
    Object.entries(options)
      .filter(([, value]) => value !== undefined)
      .sort(([a], [b]) => a.localeCompare(b))
  );

const stripPdfExtension = (name: string) => name.replace(/\.pdf$/i, '');

const ensurePdfExtension = (name: string) =>
  name.toLowerCase().endsWith('.pdf') ? name : `${name}.pdf`;

const areSelectionsEqual = (a: Record<number, boolean>, b: Record<number, boolean>) => {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  for (let index = 0; index < aKeys.length; index += 1) {
    const key = aKeys[index];
    if (!Object.prototype.hasOwnProperty.call(b, key)) {
      return false;
    }

    const numericKey = Number(key);
    if (!!a[numericKey] !== !!b[numericKey]) {
      return false;
    }
  }

  return true;
};

const areOrdersEqual = (a: number[], b: number[]) => {
  if (a.length !== b.length) {
    return false;
  }

  for (let index = 0; index < a.length; index += 1) {
    if (a[index] !== b[index]) {
      return false;
    }
  }

  return true;
};

export default function PDFProcessor({ initialMode = 'merge' }: { initialMode?: ProcessingMode }) {
  const dictionary = useDictionary();
  const processorStrings = dictionary.components.pdfProcessor;
  const processingOptionsStrings = dictionary.components.processingOptions;
  const ordererStrings = dictionary.components.pageOrderer;
  const fileListStrings = dictionary.components.fileList;
  const { error, NotificationContainer } = useNotification();

  const [files, setFiles] = useState<File[]>([]);
  const filesRef = useRef(files);
  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mode, setMode] = useState<ProcessingMode>(initialMode);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPages, setSelectedPages] = useState<Record<number, boolean>>({});
  const [pageOrder, setPageOrder] = useState<number[]>([]);
  const [extractSelectionsByFile, setExtractSelectionsByFile] = useState<Record<string, Record<number, boolean>>>({});
  const [reorderOrdersByFile, setReorderOrdersByFile] = useState<Record<string, number[]>>({});
  const [currentFileIndex, setCurrentFileIndex] = useState<number>(0);
  const [compressionPreviewCache, setCompressionPreviewCache] = useState<Record<string, CompressionPreviewEntry>>({});
  const [compressionPreviewStates, setCompressionPreviewStates] = useState<PreviewStateMap>({});
  const [compressionSummary, setCompressionSummary] = useState<CompressionSummaryEntry[]>([]);
  const [statusDialogState, setStatusDialogState] = useState<ProcessingDialogState>({
    isOpen: false,
    status: 'processing',
    title: '',
    description: undefined,
    highlights: [],
    downloads: [],
    donationPrompt: null,
  });
  const [completedResult, setCompletedResult] = useState<{
    title: string;
    summaryText?: string;
    beforeSizeBytes?: number;
    afterSizeBytes?: number;
    wordCount?: number;
    pageCount?: number;
    primaryFileName: string;
    primaryBlob?: Blob;
    outputFiles?: OutputFileItem[];
    textContent?: string;
  } | null>(null);
  const actionButtonRef = useRef<HTMLDivElement | null>(null);
  const modeOptionsRef = useRef<Record<ProcessingMode, PDFProcessingOptions>>(
    Object.fromEntries(
      Object.entries(MODE_DEFAULTS).map(([k, v]) => [k, cloneOptions(v)])
    ) as Record<ProcessingMode, PDFProcessingOptions>
  );
  const [processingOptions, setProcessingOptions] = useState<PDFProcessingOptions>(() =>
    cloneOptions(
      modeOptionsRef.current[initialMode] ?? MODE_DEFAULTS[initialMode] ?? MODE_DEFAULTS.merge
    )
  );

  const {
    modes,
    upload,
    downloadNames,
    processButton,
    statusMessages,
    errors: errorStrings,
    labels,
    compressionPreview: compressionPreviewStrings,
    compressionSummary: compressionSummaryStrings,
    statusDialog: statusDialogStrings,
  } = processorStrings;

  const listHeadings = upload.listHeadings;

  const listHeading = useMemo(() => {
    const candidate = (listHeadings as Record<string, string>)[mode];
    return candidate ?? listHeadings.default;
  }, [mode, listHeadings]);

  const currentFile =
    mode === 'extract' || mode === 'split' || mode === 'crop' || mode === 'reorder' || mode === 'rotate'
      ? files[currentFileIndex] ?? null
      : files[0] ?? null;

  const trackProcessorEvent = useCallback(
    (action: string, params?: Record<string, unknown>) => {
      trackEvent({
        action,
        category: 'processor',
        label: mode,
        params,
      });
    },
    [mode]
  );

  const buildFileSignature = useCallback(
    (file: File) => `${file.name}_${file.size}_${file.lastModified}`,
    []
  );

  const buildOptionsSignature = useCallback(
    (options: PDFProcessingOptions) => serializeOptions(options),
    []
  );

  const buildPreviewKey = useCallback(
    (file: File, options: PDFProcessingOptions) =>
      `compress_${buildFileSignature(file)}_${buildOptionsSignature(options)}`,
    [buildFileSignature, buildOptionsSignature]
  );

  const buildFileName = useCallback(
    (operation: ProcessingMode, originalName?: string, index?: number) => {
      if (operation === 'merge' && processingOptions.metadata?.title) {
        const customTitle = processingOptions.metadata.title.trim();
        if (customTitle) {
          const sanitizedTitle = customTitle.replace(/[^\p{L}\p{N}\-_ &()]/gu, '').trim();
          if (sanitizedTitle) {
            return ensurePdfExtension(sanitizedTitle);
          }
        }
      }

      const base = downloadNames[operation] ?? `ihatelovepdf_${operation}`;

      if (!originalName) {
        if (operation === 'split' && typeof index === 'number') {
          return ensurePdfExtension(`${base}_${index + 1}`);
        }
        return ensurePdfExtension(base);
      }

      const sanitized = operation === 'imagesToPdf'
        ? originalName.replace(/\.[^/.]+$/, '')
        : stripPdfExtension(originalName);

      if (operation === 'split') {
        const suffix = typeof index === 'number' ? `_${index + 1}` : '';
        return ensurePdfExtension(`${sanitized}${suffix}`);
      }

      return ensurePdfExtension(`${sanitized}_${base}`);
    },
    [downloadNames, processingOptions.metadata]
  );

  const currentFileKey = currentFile ? buildFileSignature(currentFile) : null;
  const currentCropPreviewPage = useMemo(() => {
    if (mode !== 'crop') {
      return 1;
    }

    const selected = Object.keys(selectedPages)
      .map(page => parseInt(page, 10))
      .filter(page => selectedPages[page])
      .sort((a, b) => a - b);

    return selected[0] ?? 1;
  }, [mode, selectedPages]);

  const previewItems = useMemo(() => {
    if (mode !== 'compress' || files.length === 0) {
      return [] as Array<{
        key: string;
        file: File;
        index: number;
        status: PreviewStatus;
        error?: string;
        result?: ProcessingResult;
      }>;
    }

    const entries: Array<{
      key: string;
      file: File;
      index: number;
      status: PreviewStatus;
      error?: string;
      result?: ProcessingResult;
    }> = [];

    files.forEach((file, index) => {
      const key = buildPreviewKey(file, processingOptions);
      const state = key ? compressionPreviewStates[key] : undefined;
      const cacheEntry = key ? compressionPreviewCache[key] : undefined;

      if (!key) {
        return;
      }

      const hasResult = Boolean(cacheEntry?.result);
      const status = !hasResult && state?.status === 'ready'
        ? 'running'
        : state?.status ?? 'idle';

      entries.push({
        key,
        file,
        index,
        status,
        error: state?.error,
        result: cacheEntry?.result,
      });
    });

    return entries;
  }, [mode, files, processingOptions, compressionPreviewStates, compressionPreviewCache, buildPreviewKey]);

  useEffect(() => {
    if (mode !== 'compress') {
      if (Object.keys(compressionPreviewStates).length > 0) {
        setCompressionPreviewStates({});
      }
      return;
    }

    setCompressionPreviewStates(prev => {
      const next: PreviewStateMap = {};
      files.forEach(file => {
        const key = buildPreviewKey(file, processingOptions);
        if (key && prev[key]) {
          next[key] = prev[key];
        }
      });

      const prevKeys = Object.keys(prev);
      const nextKeys = Object.keys(next);
      const sameSize = prevKeys.length === nextKeys.length;
      const sameEntries = sameSize && nextKeys.every(key => prev[key] === next[key]);
      return sameEntries ? prev : next;
    });
  }, [mode, files, processingOptions, buildPreviewKey, compressionPreviewStates]);

  const ensurePreviewForFile = useCallback(
    async (
      file: File,
      key: string,
      cachedEntry: CompressionPreviewEntry | undefined,
      isCancelled: () => boolean
    ) => {
      if (cachedEntry) {
        setCompressionPreviewStates(prev => ({
          ...prev,
          [key]: { status: 'ready' },
        }));
        return cachedEntry.result;
      }

      let shouldSkip = false;
      setCompressionPreviewStates(prev => {
        const existing = prev[key];
        if (existing?.status === 'running') {
          shouldSkip = true;
          return prev;
        }
        return {
          ...prev,
          [key]: { status: 'running' },
        };
      });

      if (shouldSkip) {
        return cachedEntry?.result;
      }

      try {
        const result = await processPDF('compress', [file], processingOptions);
        if (isCancelled()) {
          return undefined;
        }

        setCompressionPreviewCache(prev => ({
          ...prev,
          [key]: {
            result,
            fileSignature: buildFileSignature(file),
            optionsSignature: buildOptionsSignature(processingOptions),
            generatedAt: Date.now(),
          },
        }));
        setCompressionPreviewStates(prev => ({
          ...prev,
          [key]: { status: 'ready' },
        }));
        return result;
      } catch (err) {
        if (isCancelled()) {
          return undefined;
        }
        const message = err instanceof Error && err.message ? err.message : errorStrings.unknown;
        setCompressionPreviewStates(prev => ({
          ...prev,
          [key]: { status: 'error', error: message },
        }));
        return undefined;
      }
    },
    [processingOptions, buildFileSignature, buildOptionsSignature, errorStrings.unknown]
  );

  const compressionPreviewStatesRef = useRef(compressionPreviewStates);
  useEffect(() => {
    compressionPreviewStatesRef.current = compressionPreviewStates;
  }, [compressionPreviewStates]);

  const compressionPreviewCacheRef = useRef(compressionPreviewCache);
  useEffect(() => {
    compressionPreviewCacheRef.current = compressionPreviewCache;
  }, [compressionPreviewCache]);

  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const requestPreview = useCallback(
    (file: File) => {
      const key = buildPreviewKey(file, processingOptions);
      if (!key) {
        return;
      }

      const stateEntry = compressionPreviewStatesRef.current[key];
      const cacheEntry = compressionPreviewCacheRef.current[key];

      if (stateEntry?.status === 'running') {
        return;
      }

      if (stateEntry?.status === 'ready' && cacheEntry) {
        return;
      }

      void ensurePreviewForFile(file, key, cacheEntry, () => !isMountedRef.current);
    },
    [buildPreviewKey, ensurePreviewForFile, processingOptions]
  );

  useEffect(() => {
    if (mode !== 'compress' || files.length === 0 || isProcessing) {
      return;
    }

    files.forEach(requestPreview);
  }, [mode, files, requestPreview, isProcessing]);

  const handleRetryPreviewAction = (retryKey: string) => {
    setCompressionPreviewCache(prev => {
      if (!prev[retryKey]) {
        return prev;
      }

      const next = { ...prev };
      delete next[retryKey];
      return next;
    });

    setCompressionPreviewStates(prev => ({
      ...prev,
      [retryKey]: { status: 'idle' },
    }));

    const targetFile = files.find(file => buildPreviewKey(file, processingOptions) === retryKey);
    const targetIndex = targetFile ? files.findIndex(candidate => candidate === targetFile) : -1;
    trackProcessorEvent('compression_preview_retry', {
      has_target: Boolean(targetFile),
      file_index: targetIndex >= 0 ? targetIndex : undefined,
    });
    if (targetFile) {
      requestPreview(targetFile);
    }
  };

  const handleSummaryDownloadAction = (entry: CompressionSummaryEntry) => {
    triggerDownloadAction(entry.blob, entry.fileName);
    trackProcessorEvent('summary_download', {
      size_bytes: entry.blob.size ?? undefined,
    });
  };

  const handleClearSummaryAction = (entryId: string) => {
    setCompressionSummary(prev => {
      const next = prev.filter(item => item.id !== entryId);
      trackProcessorEvent('summary_entry_removed', {
        remaining: next.length,
      });
      return next;
    });
  };

  const handleFilesSelected = (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) {
      return;
    }

    trackProcessorEvent('files_selected', {
      selection_count: selectedFiles.length,
    });

    if (mode === 'pdfToImages') {
      const pdfCandidates = selectedFiles.filter(isPdfFile);
      if (pdfCandidates.length === 0) {
        trackProcessorEvent('file_rejected', {
          reason: 'invalid_pdf',
          selection_count: selectedFiles.length,
        });
        error(errorStrings.invalidFile);
        return;
      }

      trackProcessorEvent('files_added', {
        accepted_count: pdfCandidates.length,
        previous_total: files.length,
        new_total: files.length + pdfCandidates.length,
      });
      setFiles(prevFiles => [...prevFiles, ...pdfCandidates]);
      setCompressionSummary([]);
      setCompletedResult(null);
      return;
    }

    if (mode === 'imagesToPdf') {
      const imageCandidates = selectedFiles.filter(isImageFile);
      if (imageCandidates.length === 0) {
        trackProcessorEvent('file_rejected', {
          reason: 'invalid_image',
          selection_count: selectedFiles.length,
        });
        error(errorStrings.invalidFile);
        return;
      }
      trackProcessorEvent('files_added', {
        accepted_count: imageCandidates.length,
        previous_total: files.length,
        new_total: files.length + imageCandidates.length,
      });
      setFiles(prevFiles => [...prevFiles, ...imageCandidates]);
      setCompressionSummary([]);
      setCompletedResult(null);
      return;
    }

    if (uploaderConfig.acceptedFileTypes && uploaderConfig.acceptedFileTypes !== 'application/pdf,.pdf') {
      const allowedRules = uploaderConfig.acceptedFileTypes.split(',').map(s => s.trim().toLowerCase());
      const customCandidates = selectedFiles.filter(file => {
        const lowerName = file.name.toLowerCase();
        return allowedRules.some(rule => {
          if (rule.startsWith('.')) return lowerName.endsWith(rule);
          return file.type === rule || file.type.startsWith(rule.replace('/*', ''));
        });
      });

      if (customCandidates.length === 0) {
        trackProcessorEvent('file_rejected', {
          reason: 'invalid_format',
          selection_count: selectedFiles.length,
        });
        error(`Please upload valid ${uploaderConfig.acceptedFileTypes} files.`);
        return;
      }

      trackProcessorEvent('files_added', {
        accepted_count: customCandidates.length,
        previous_total: files.length,
        new_total: files.length + customCandidates.length,
      });
      setFiles(prevFiles => uploaderConfig.multiple ? [...prevFiles, ...customCandidates] : customCandidates);
      setCompressionSummary([]);
      setCompletedResult(null);
      return;
    }

    const pdfCandidates = selectedFiles.filter(isPdfFile);
    if (pdfCandidates.length === 0) {
      trackProcessorEvent('file_rejected', {
        reason: 'invalid_pdf',
        selection_count: selectedFiles.length,
      });
      error(errorStrings.invalidFile);
      return;
    }

    trackProcessorEvent('files_added', {
      accepted_count: pdfCandidates.length,
      previous_total: files.length,
      new_total: files.length + pdfCandidates.length,
    });
    setFiles(prevFiles => [...prevFiles, ...pdfCandidates]);
    setCompressionSummary([]);
    setCompletedResult(null);
  };

  useEffect(() => {
    const activeKeys = new Set(files.map(file => buildFileSignature(file)));

    setExtractSelectionsByFile(prev => {
      const entries = Object.entries(prev).filter(([key]) => activeKeys.has(key));
      if (entries.length === Object.keys(prev).length) {
        return prev;
      }
      return entries.length === 0 ? {} : Object.fromEntries(entries);
    });

    setReorderOrdersByFile(prev => {
      const entries = Object.entries(prev).filter(([key]) => activeKeys.has(key));
      if (entries.length === Object.keys(prev).length) {
        return prev;
      }
      return entries.length === 0 ? {} : Object.fromEntries(entries);
    });
  }, [files, buildFileSignature]);

  useEffect(() => {
    modeOptionsRef.current[mode] = cloneOptions(processingOptions);
  }, [mode, processingOptions]);






  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const buildDonationPrompt = (): DonationPrompt | null => {
    return null;
  };

  const openProcessingDialog = (description: string, progress?: number) => {
    if (!statusDialogStrings) {
      return;
    }

    setStatusDialogState({
      isOpen: true,
      status: 'processing',
      title: statusDialogStrings.processingTitle,
      description,
      progress,
      highlights: [],
      downloads: [],
      donationPrompt: null,
    });
  };

  const updateProcessingDialog = (description: string, progress?: number) => {
    setStatusDialogState((prev) => ({
      ...prev,
      description,
      progress: progress !== undefined ? progress : prev.progress,
    }));
  };

  const showSuccessDialog = ({
    description,
    highlights,
    downloads,
    donationPrompt,
  }: {
    description?: string;
    highlights?: DialogHighlight[];
    downloads: DownloadEntry[];
    donationPrompt?: DonationPrompt | null;
  }) => {
    if (!statusDialogStrings) {
      return;
    }

    const resolvedPrompt = donationPrompt ?? buildDonationPrompt();

    if (resolvedPrompt) {
      trackProcessorEvent('donation_prompt_shown', {
        prompt_source: donationPrompt ? 'explicit' : 'auto',
        download_count: downloads.length,
      });
    }

    const beforeBytes = filesRef.current.reduce((acc, f) => acc + f.size, 0);
    const afterBytes = downloads[0]?.blob?.size;
    const firstDownload = downloads[0];

    setCompletedResult({
      title: `${modes[mode]?.label ?? mode} Complete!`,
      summaryText: description ?? statusDialogStrings.successDescription,
      beforeSizeBytes: beforeBytes > 0 ? beforeBytes : undefined,
      afterSizeBytes: afterBytes,
      primaryFileName: firstDownload?.fileName ?? 'processed_document.pdf',
      primaryBlob: firstDownload?.blob,
      outputFiles: downloads.map(d => ({
        name: d.fileName,
        blob: d.blob,
        sizeBytes: d.blob.size,
      })),
    });

    setStatusDialogState({
      isOpen: true,
      status: 'success',
      title: statusDialogStrings.successTitle,
      description: description ?? statusDialogStrings.successDescription,
      highlights: highlights ?? [],
      downloads,
      donationPrompt: resolvedPrompt,
    });
  };

  const showErrorDialog = (message?: string) => {
    if (!statusDialogStrings) {
      return;
    }

    setStatusDialogState({
      isOpen: true,
      status: 'error',
      title: statusDialogStrings.errorTitle,
      description: message ?? statusDialogStrings.errorDescription,
      highlights: [],
      downloads: [],
      donationPrompt: null,
    });
  };

  const activeObjectUrlsRef = useRef<Set<string>>(new Set());

  const triggerDownloadAction = useCallback((blob: Blob, fileName: string, isAutoTrigger: boolean = true) => {
    if (typeof window === 'undefined') return;
    downloadBlob(blob, fileName, { isAutoTrigger });
  }, []);

  useEffect(() => {
    const urlsToCleanup = activeObjectUrlsRef.current;
    return () => {
      urlsToCleanup.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch {
          // ignore
        }
      });
      urlsToCleanup.clear();
    };
  }, []);

  const handleProcess = async () => {
    if (isProcessing) {
      return;
    }

    if (!statusDialogStrings) {
      trackProcessorEvent('operation_error', { reason: 'missing_status_strings' });
      error(errorStrings.unknown);
      return;
    }

    const currentFiles = filesRef.current;

    if (currentFiles.length === 0) {
      trackProcessorEvent('operation_blocked', { reason: 'no_files' });
      return;
    }

    const modeLabel = modes[mode]?.label ?? mode;
    const downloads: DownloadEntry[] = [];
    const compressionEntriesBuffer: CompressionSummaryEntry[] = [];
    const extractPlan: Array<{ file: File; pages: number[] }> = [];
    const cropPlan: Array<{ file: File; pages: number[] }> = [];
    const rotatePlan: Array<{ file: File; pages: number[] }> = [];

    switch (mode) {
      case 'redact':
      case 'signPdf':
      case 'fillPdfForm':
      case 'latexResume':
      case 'createPdf':
        // Interactive studio modes handle their own processing via their studio interfaces
        return;
      case 'merge':
        if (currentFiles.length < 2) {
          trackProcessorEvent('operation_blocked', {
            reason: 'merge_requires_two',
            file_count: currentFiles.length,
          });
          error(errorStrings.mergeRequiresTwo);
          return;
        }
        break;
      case 'split':
        if (currentFiles.length === 0) {
          trackProcessorEvent('operation_blocked', {
            reason: 'split_no_files',
          });
          error(errorStrings.noFiles);
          return;
        }
        break;
      case 'extract': {
        const activeKey = currentFileKey;
        currentFiles.forEach(file => {
          const key = buildFileSignature(file);
          const selectionRecord =
            key === activeKey ? selectedPages : extractSelectionsByFile[key] ?? {};
          const pages = Object.keys(selectionRecord)
            .map(page => parseInt(page, 10))
            .filter(page => selectionRecord[page])
            .sort((a, b) => a - b);
          if (pages.length > 0) {
            extractPlan.push({ file, pages });
          }
        });

        if (extractPlan.length === 0) {
          trackProcessorEvent('operation_blocked', { reason: 'extract_no_pages' });
          error(errorStrings.noPagesSelected);
          return;
        }
        break;
      }
      case 'crop': {
        const activeKey = currentFileKey;
        currentFiles.forEach(file => {
          const key = buildFileSignature(file);
          const selectionRecord =
            key === activeKey ? selectedPages : extractSelectionsByFile[key] ?? {};
          const pages = Object.keys(selectionRecord)
            .map(page => parseInt(page, 10))
            .filter(page => selectionRecord[page])
            .sort((a, b) => a - b);
          if (pages.length > 0) {
            cropPlan.push({ file, pages });
          }
        });

        if (cropPlan.length === 0) {
          trackProcessorEvent('operation_blocked', { reason: 'crop_no_pages' });
          error(errorStrings.noPagesSelected);
          return;
        }
        break;
      }
      case 'rotate': {
        const activeKey = currentFileKey;
        currentFiles.forEach(file => {
          const key = buildFileSignature(file);
          const selectionRecord =
            key === activeKey ? selectedPages : extractSelectionsByFile[key] ?? {};
          const pages = Object.keys(selectionRecord)
            .map(page => parseInt(page, 10))
            .filter(page => selectionRecord[page])
            .sort((a, b) => a - b);
          if (pages.length > 0) {
            rotatePlan.push({ file, pages });
          }
        });

        if (rotatePlan.length === 0) {
          trackProcessorEvent('operation_blocked', { reason: 'rotate_no_pages' });
          error(errorStrings.noPagesSelected);
          return;
        }
        break;
      }
      case 'reorder':
        if (currentFiles.length === 0) {
          trackProcessorEvent('operation_blocked', { reason: 'reorder_no_files' });
          error(errorStrings.noFiles);
          return;
        }
        break;
      case 'pdfToImages': {
        if (currentFiles.length === 0) {
          trackProcessorEvent('operation_blocked', { reason: 'pdf_to_images_no_files' });
          error(errorStrings.noFiles);
          return;
        }
        if (currentFiles.find(file => !isPdfFile(file))) {
          trackProcessorEvent('operation_blocked', { reason: 'pdf_to_images_invalid_source' });
          error(errorStrings.invalidFile);
          return;
        }
        break;
      }
      case 'imagesToPdf':
        if (currentFiles.length === 0) {
          trackProcessorEvent('operation_blocked', { reason: 'images_to_pdf_no_files' });
          error(errorStrings.noFiles);
          return;
        }
        if (currentFiles.find(file => !isImageFile(file))) {
          trackProcessorEvent('operation_blocked', { reason: 'images_to_pdf_invalid_source' });
          error(errorStrings.invalidFile);
          return;
        }
        break;
      case 'encrypt': {
        if (currentFiles.length === 0) {
          trackProcessorEvent('operation_blocked', { reason: 'encrypt_no_files' });
          error(errorStrings.noFiles);
          return;
        }
        const userPass = (processingOptions.userPassword || processingOptions.password || '').trim();
        const ownerPass = (processingOptions.ownerPassword || '').trim();
        if (!userPass && !ownerPass) {
          trackProcessorEvent('operation_blocked', { reason: 'encrypt_missing_password' });
          error('Please enter a password to encrypt your PDF.');
          return;
        }
        if (processingOptions.confirmPassword && userPass !== processingOptions.confirmPassword.trim()) {
          trackProcessorEvent('operation_blocked', { reason: 'encrypt_password_mismatch' });
          error('Passwords do not match. Please verify your password confirmation.');
          return;
        }
        break;
      }
      case 'decrypt': {
        if (currentFiles.length === 0) {
          trackProcessorEvent('operation_blocked', { reason: 'decrypt_no_files' });
          error(errorStrings.noFiles);
          return;
        }
        const pass = (processingOptions.password || processingOptions.decryptionPassword || '').trim();
        if (!pass) {
          trackProcessorEvent('operation_blocked', { reason: 'decrypt_missing_password' });
          error('Please enter the document password to unlock your PDF.');
          return;
        }
        break;
      }
      default:
        break;
    }

    setIsProcessing(true);
    openProcessingDialog(statusMessages.info(modeLabel));
    trackProcessorEvent('operation_start', {
      file_count: currentFiles.length,
    });

    try {
      switch (mode) {
        case 'compress': {
          setCompressionSummary([]);
          let totalOriginalBytes = 0;
          let totalProcessedBytes = 0;
          let totalElapsedSeconds = 0;

          for (let index = 0; index < currentFiles.length; index += 1) {
            await new Promise(resolve => setTimeout(resolve, 0));

            const targetFile = currentFiles[index];
            if (!targetFile) {
              continue;
            }

            try {
              const key = buildPreviewKey(targetFile, processingOptions);
              const startedAt = Date.now();
              let compressResult: ProcessingResult;

              const cachedEntry = compressionPreviewCache[key];
              if (cachedEntry) {
                compressResult = cachedEntry.result;
              } else {
                compressResult = await processPDF('compress', [targetFile], processingOptions);
                setCompressionPreviewCache(prev => ({
                  ...prev,
                  [key]: {
                    result: compressResult,
                    fileSignature: buildFileSignature(targetFile),
                    optionsSignature: buildOptionsSignature(processingOptions),
                    generatedAt: Date.now(),
                  },
                }));
              }

              if (key) {
                setCompressionPreviewStates(prev => ({
                  ...prev,
                  [key]: { status: 'ready' },
                }));
              }

              const compressedBlob = createPdfBlob(compressResult.data);
              const downloadName = buildFileName('compress', targetFile.name);
              downloads.push({ blob: compressedBlob, fileName: downloadName });
              triggerDownloadAction(compressedBlob, downloadName);

              const elapsedSeconds =
                typeof compressResult.processingTimeMs === 'number' && compressResult.processingTimeMs > 0
                  ? compressResult.processingTimeMs / 1000
                  : (Date.now() - startedAt) / 1000;

              totalOriginalBytes += compressResult.originalSize;
              totalProcessedBytes += compressResult.processedSize;
              totalElapsedSeconds += elapsedSeconds;

              compressionEntriesBuffer.push({
                id: createSummaryId(),
                fileName: downloadName,
                result: compressResult,
                blob: compressedBlob,
                elapsedSeconds,
                originalFile: targetFile,
              });
            } catch (fileErr) {
              console.error(`Error compressing file ${targetFile.name}:`, fileErr);
              trackProcessorEvent('file_processing_error', {
                mode: 'compress',
                file_name: targetFile.name,
                error: fileErr instanceof Error ? fileErr.message : 'unknown',
              });
            }
          }

          if (compressionEntriesBuffer.length === 0) {
            showErrorDialog(errorStrings.noFiles);
            trackProcessorEvent('operation_error', { reason: 'compress_no_results' });
            return;
          }

          const savedBytesTotal = Math.max(0, totalOriginalBytes - totalProcessedBytes);
          const reductionPercentTotal =
            totalOriginalBytes > 0
              ? (((totalOriginalBytes - totalProcessedBytes) / totalOriginalBytes) * 100).toFixed(1)
              : undefined;
          const reductionPercentValue =
            typeof reductionPercentTotal === 'string' ? parseFloat(reductionPercentTotal) : undefined;

          setCompressionSummary([...compressionEntriesBuffer]);

          const highlightEntries: DialogHighlight[] = [];
          const savingsLabel = compressionSummaryStrings.saved(formatFileSize(savedBytesTotal));
          if (reductionPercentTotal) {
            highlightEntries.push({
              label: statusDialogStrings.resultsLabel,
              value: `${compressionSummaryStrings.ratio(reductionPercentTotal)} · ${savingsLabel}`,
            });
          } else {
            highlightEntries.push({
              label: statusDialogStrings.resultsLabel,
              value: savingsLabel,
            });
          }

          if (files.length > 1) {
            highlightEntries.push({
              label: statusDialogStrings.filesProcessedLabel(files.length),
            });
          }

          if (totalElapsedSeconds > 0) {
            const totalLabel = totalElapsedSeconds.toFixed(1);
            highlightEntries.push({
              label: compressionSummaryStrings.duration(totalLabel),
            });
          }

          showSuccessDialog({
            highlights: highlightEntries,
            downloads,
            donationPrompt: buildDonationPrompt(),
          });
          trackProcessorEvent('operation_success', {
            file_count: currentFiles.length,
            saved_bytes: savedBytesTotal,
            reduction_percent: reductionPercentValue,
            duration_seconds: Number(totalElapsedSeconds.toFixed(2)),
          });
          return;
        }

        case 'merge': {
          const outputBlob = await processPDF('merge', currentFiles as [File, ...File[]], processingOptions);
          const fileName = buildFileName('merge');
          downloads.push({ blob: outputBlob, fileName });
          triggerDownloadAction(outputBlob, fileName);

          const highlightEntries: DialogHighlight[] = [
            { label: statusDialogStrings.resultsLabel, value: statusMessages.merged },
          ];
          if (currentFiles.length > 0) {
            highlightEntries.push({
              label: statusDialogStrings.filesProcessedLabel(files.length),
            });
          }

          showSuccessDialog({
            highlights: highlightEntries,
            downloads,
            donationPrompt: buildDonationPrompt(),
          });
          trackProcessorEvent('operation_success', {
            file_count: currentFiles.length,
          });
          return;
        }

        case 'split': {
          let processedSources = 0;
          let latestMessage = '';

          for (const sourceFile of currentFiles) {
            const fileKey = buildFileSignature(sourceFile);
            const rawSelection = fileKey === currentFileKey ? selectedPages : (extractSelectionsByFile[fileKey] ?? {});
            const selectedPageNumbers = Object.entries(rawSelection)
              .filter(([, isSelected]) => isSelected)
              .map(([page]) => Number(page));

            const optionsForFile: PDFProcessingOptions = {
              ...processingOptions,
              pagesToExtract: selectedPageNumbers.length > 0 ? selectedPageNumbers : undefined,
            };

            const parts = await processPDF('split', [sourceFile], optionsForFile);
            if (!parts || parts.length === 0) {
              continue;
            }

            processedSources += 1;
            latestMessage = `${sourceFile.name}: ${statusMessages.split(parts.length)}`;

            if (parts.length > 1) {
              if (isIOS()) {
                // On iOS WebKit, multiple setTimeout downloads are blocked by Safari's popup blocker.
                // Bundle parts into a single ZIP archive for seamless iOS Files saving.
                const { default: JSZip } = await import('jszip');
                const zip = new JSZip();
                for (let i = 0; i < parts.length; i++) {
                  const pName = buildFileName('split', sourceFile.name, i);
                  zip.file(pName, await parts[i].arrayBuffer());
                  downloads.push({ blob: parts[i], fileName: pName });
                }
                const zipBlob = await zip.generateAsync({ type: 'blob' });
                const zipName = `${stripPdfExtension(sourceFile.name)}_split.zip`;
                downloads.unshift({ blob: zipBlob, fileName: zipName });
                triggerDownloadAction(zipBlob, zipName);
              } else {
                const firstName = buildFileName('split', sourceFile.name, 0);
                downloads.push({ blob: parts[0], fileName: firstName });
                triggerDownloadAction(parts[0], firstName);

                const remainingParts = parts.slice(1);
                remainingParts.forEach((blob, idx) => {
                  const partName = buildFileName('split', sourceFile.name, idx + 1);
                  downloads.push({ blob, fileName: partName });
                  window.setTimeout(() => {
                    triggerDownloadAction(blob, partName);
                  }, 600 * (idx + 1));
                });
              }
            } else {
              const firstName = buildFileName('split', sourceFile.name, 0);
              downloads.push({ blob: parts[0], fileName: firstName });
              triggerDownloadAction(parts[0], firstName);
            }
          }

          if (processedSources === 0) {
            showErrorDialog(errorStrings.noFiles);
            trackProcessorEvent('operation_error', { reason: 'split_no_results' });
            return;
          }

          const highlightEntries: DialogHighlight[] = [
            { label: statusDialogStrings.resultsLabel, value: latestMessage },
          ];
          if (processedSources > 1) {
            highlightEntries.push({
              label: statusDialogStrings.filesProcessedLabel(processedSources),
            });
          }

          showSuccessDialog({
            highlights: highlightEntries,
            downloads,
            donationPrompt: buildDonationPrompt(),
          });
          trackProcessorEvent('operation_success', {
            file_count: processedSources,
            output_count: downloads.length,
          });
          return;
        }

        case 'extract': {
          let processedSources = 0;
          let latestMessage = '';
          let totalPagesExtracted = 0;

          for (const entry of extractPlan) {
            const extractOptions: PDFProcessingOptions = {
              ...processingOptions,
              pagesToExtract: entry.pages,
            };
            const blob = await processPDF('extract', [entry.file], extractOptions);
            const fileName = buildFileName('extract', entry.file.name);
            downloads.push({ blob, fileName });
            triggerDownloadAction(blob, fileName);

            processedSources += 1;
            latestMessage = `${entry.file.name}: ${statusMessages.extracted(entry.pages.length)}`;
            totalPagesExtracted += entry.pages.length;
          }

          if (processedSources === 0) {
            showErrorDialog(errorStrings.noPagesSelected);
            trackProcessorEvent('operation_error', { reason: 'extract_no_results' });
            return;
          }

          const highlightEntries: DialogHighlight[] = [
            { label: statusDialogStrings.resultsLabel, value: latestMessage },
          ];
          if (processedSources > 1) {
            highlightEntries.push({
              label: statusDialogStrings.filesProcessedLabel(processedSources),
            });
          }

          showSuccessDialog({
            highlights: highlightEntries,
            downloads,
            donationPrompt: buildDonationPrompt(),
          });
          trackProcessorEvent('operation_success', {
            file_count: processedSources,
            total_pages: totalPagesExtracted,
          });
          return;
        }

        case 'crop': {
          let processedSources = 0;
          let latestMessage = '';
          let totalPagesCropped = 0;

          for (const entry of cropPlan) {
            const cropOptions: PDFProcessingOptions = {
              ...processingOptions,
              pagesToCrop: entry.pages,
            };
            const blob = await processPDF('crop', [entry.file], cropOptions);
            const fileName = buildFileName('crop', entry.file.name);
            downloads.push({ blob, fileName });
            triggerDownloadAction(blob, fileName);

            processedSources += 1;
            latestMessage = `${entry.file.name}: ${statusMessages.cropped(entry.pages.length)}`;
            totalPagesCropped += entry.pages.length;
          }

          if (processedSources === 0) {
            showErrorDialog(errorStrings.noPagesSelected);
            trackProcessorEvent('operation_error', { reason: 'crop_no_results' });
            return;
          }

          const highlightEntries: DialogHighlight[] = [
            { label: statusDialogStrings.resultsLabel, value: latestMessage },
          ];
          if (processedSources > 1) {
            highlightEntries.push({
              label: statusDialogStrings.filesProcessedLabel(processedSources),
            });
          }

          showSuccessDialog({
            highlights: highlightEntries,
            downloads,
            donationPrompt: buildDonationPrompt(),
          });
          trackProcessorEvent('operation_success', {
            file_count: processedSources,
            total_pages: totalPagesCropped,
          });
          return;
        }

        case 'rotate': {
          let processedSources = 0;
          let latestMessage = '';
          let totalPagesRotated = 0;

          for (const entry of rotatePlan) {
            const rotateOptions: PDFProcessingOptions = {
              ...processingOptions,
              pagesToRotate: entry.pages,
              rotationDegrees: processingOptions.rotationDegrees ?? 90,
            };
            const blob = await processPDF('rotate', [entry.file], rotateOptions);
            const fileName = buildFileName('rotate', entry.file.name);
            downloads.push({ blob, fileName });
            triggerDownloadAction(blob, fileName);

            processedSources += 1;
            latestMessage = `${entry.file.name}: ${statusMessages.rotated(entry.pages.length)}`;
            totalPagesRotated += entry.pages.length;
          }

          if (processedSources === 0) {
            showErrorDialog(errorStrings.noPagesSelected);
            trackProcessorEvent('operation_error', { reason: 'rotate_no_results' });
            return;
          }

          const highlightEntries: DialogHighlight[] = [
            { label: statusDialogStrings.resultsLabel, value: latestMessage },
          ];
          if (processedSources > 1) {
            highlightEntries.push({
              label: statusDialogStrings.filesProcessedLabel(processedSources),
            });
          }

          showSuccessDialog({
            highlights: highlightEntries,
            downloads,
            donationPrompt: buildDonationPrompt(),
          });
          trackProcessorEvent('operation_success', {
            file_count: processedSources,
            total_pages: totalPagesRotated,
            rotation_degrees: processingOptions.rotationDegrees ?? 90,
          });
          return;
        }

        case 'reorder': {
          let processedSources = 0;
          let latestMessage = '';

          for (const sourceFile of currentFiles) {
            const key = buildFileSignature(sourceFile);
            let order = reorderOrdersByFile[key];

            if (!order || order.length === 0) {
              const pageTotal = await getPdfPageCount(sourceFile);
              if (!pageTotal || pageTotal <= 0) {
                continue;
              }
              const identityOrder = Array.from({ length: pageTotal }, (_, idx) => idx + 1);
              order = identityOrder;
              setReorderOrdersByFile(prev => ({
                ...prev,
                [key]: [...identityOrder],
              }));
            }

            if (!order || order.length === 0) {
              continue;
            }

            const reorderOptions: PDFProcessingOptions = {
              ...processingOptions,
              pageOrder: order,
            };
            const blob = await processPDF('reorder', [sourceFile], reorderOptions);
            const fileName = buildFileName('reorder', sourceFile.name);
            downloads.push({ blob, fileName });
            triggerDownloadAction(blob, fileName);

            processedSources += 1;
            latestMessage = `${sourceFile.name}: ${statusMessages.reordered}`;
          }

          if (processedSources === 0) {
            showErrorDialog(errorStrings.noFiles);
            trackProcessorEvent('operation_error', { reason: 'reorder_no_results' });
            return;
          }

          const highlightEntries: DialogHighlight[] = [
            { label: statusDialogStrings.resultsLabel, value: latestMessage },
          ];
          if (processedSources > 1) {
            highlightEntries.push({
              label: statusDialogStrings.filesProcessedLabel(processedSources),
            });
          }

          showSuccessDialog({
            highlights: highlightEntries,
            downloads,
            donationPrompt: buildDonationPrompt(),
          });
          trackProcessorEvent('operation_success', {
            file_count: processedSources,
          });
          return;
        }

        case 'pdfToZip': {
          openProcessingDialog('Packaging PDF files into ZIP archive...', 10);

          const onProgress = (prog: number, msg: string) => {
            updateProcessingDialog(msg, prog);
          };

          const zipBlob = (await processPDF(
            'pdfToZip',
            currentFiles,
            processingOptions,
            onProgress
          )) as Blob;

          const fileName =
            currentFiles.length === 1
              ? `${stripPdfExtension(currentFiles[0].name)}.zip`
              : 'documents.zip';

          downloads.push({ blob: zipBlob, fileName });
          triggerDownloadAction(zipBlob, fileName);

          const modeSummary =
            currentFiles.length === 1
              ? 'Packaged PDF document directly into ZIP archive'
              : `Packaged ${currentFiles.length} PDF documents directly into ZIP archive`;

          showSuccessDialog({
            highlights: [
              {
                label: statusDialogStrings.resultsLabel,
                value: modeSummary,
              },
              {
                label: statusDialogStrings.filesProcessedLabel(currentFiles.length),
              },
            ],
            downloads,
            donationPrompt: buildDonationPrompt(),
          });

          trackProcessorEvent('operation_success', {
            file_count: currentFiles.length,
          });
          return;
        }

        case 'pdfToImages': {
          let processedSources = 0;
          let totalImages = 0;
          const imageOutputs: OutputFileItem[] = [];

          for (const source of currentFiles) {
            if (!isPdfFile(source)) {
              continue;
            }

            const onProgress = (prog: number, msg: string) => {
              updateProcessingDialog(msg, prog);
            };

            const isZip = processingOptions.bundleAsZip === true;
            const result = (await processPDF(
              'pdfToImages',
              [source],
              {
                ...processingOptions,
                bundleAsZip: isZip,
                imageBaseName: `${stripPdfExtension(source.name)}_${downloadNames.pdfToImages || 'image'}`,
              },
              onProgress
            )) as PdfToImagesArchiveResult;

            processedSources += 1;
            totalImages += result.imageCount;

            if (result.kind === 'zip') {
              downloads.push({ blob: result.blob, fileName: result.suggestedName });
              triggerDownloadAction(result.blob, result.suggestedName);
            } else {
              if (result.files.length > 0) {
                result.files.forEach((file) => {
                  downloads.push({ blob: file.blob, fileName: file.name });
                  imageOutputs.push({
                    name: file.name,
                    blob: file.blob,
                    sizeBytes: file.blob.size,
                  });
                });

                // If single page, trigger direct download immediately
                if (result.files.length === 1) {
                  triggerDownloadAction(result.files[0].blob, result.files[0].name);
                }
              }
            }

            await new Promise((resolve) => setTimeout(resolve, 200));
          }

          if (processedSources === 0) {
            showErrorDialog(errorStrings.invalidFile);
            return;
          }

          if (imageOutputs.length > 0) {
            const firstImg = imageOutputs[0];
            setCompletedResult({
              title: 'PDF to Images Converted!',
              summaryText: `Successfully converted ${imageOutputs.length} page(s) into high-resolution ${processingOptions.imageOutputFormat === 'jpeg' ? 'JPEG' : 'PNG'} images.`,
              primaryFileName: firstImg.name,
              primaryBlob: firstImg.blob,
              outputFiles: imageOutputs,
              pageCount: imageOutputs.length,
            });
          }

          showSuccessDialog({
            highlights: [
              {
                label: statusDialogStrings.resultsLabel,
                value: statusMessages.pdfToImages(
                  totalImages,
                  processingOptions.imageOutputFormat || 'png',
                  false
                ),
              },
              {
                label: statusDialogStrings.filesProcessedLabel(processedSources),
              },
            ],
            downloads,
            donationPrompt: buildDonationPrompt(),
          });

          trackProcessorEvent('operation_success', {
            file_count: processedSources,
            image_count: totalImages,
          });
          return;
        }



        case 'imagesToPdf': {
          const output = await processPDF('imagesToPdf', currentFiles as [File, ...File[]], processingOptions);
          const baseSource = currentFiles[0];
          const fileLabel = buildFileName('imagesToPdf', baseSource?.name);
          downloads.push({ blob: output, fileName: fileLabel });
          triggerDownloadAction(output, fileLabel);

          showSuccessDialog({
            highlights: [
              {
                label: statusDialogStrings.resultsLabel,
                value: statusMessages.imagesToPdf(currentFiles.length),
              },
            ],
            downloads,
            donationPrompt: buildDonationPrompt(),
          });
          trackProcessorEvent('operation_success', {
            file_count: currentFiles.length,
          });
          return;
        }

        default: {
          let processedSources = 0;
          for (const sourceFile of currentFiles) {
            const result = await processPDF(mode, [sourceFile], processingOptions);
            const baseName = sourceFile.name.replace(/\.[^/.]+$/, '');

            let ext = '.pdf';
            if (mode === 'pdfToExcel') ext = '.xlsx';
            else if (mode === 'pdfToPowerpoint') ext = '.pptx';
            else if (mode === 'pdfToHtml') ext = '.html';
            else if (mode === 'pdfToEpub') ext = '.epub';
            else if (mode === 'extractText') ext = '.txt';

            let suffix = '';
            if (mode === 'encrypt') suffix = '_protected';
            else if (mode === 'decrypt') suffix = '_unlocked';

            const fileName = `${baseName}${suffix}${ext}`;
            const blob =
              result instanceof Blob
                ? result
                : typeof result === 'string'
                ? new Blob([result], { type: 'text/plain;charset=utf-8' })
                : result instanceof Uint8Array || result instanceof ArrayBuffer
                ? new Blob([result as BlobPart], {
                    type:
                      mode === 'pdfToExcel'
                        ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        : mode === 'pdfToPowerpoint'
                        ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
                        : 'application/pdf',
                  })
                : new Blob([JSON.stringify(result)], { type: 'application/json' });

            downloads.push({ blob, fileName });
            triggerDownloadAction(blob, fileName);
            processedSources += 1;
          }

          if (processedSources === 0) {
            showErrorDialog(errorStrings.invalidFile);
            return;
          }

          if (downloads.length > 0) {
            const primary = downloads[0];
            const isSingle = downloads.length === 1;
            setCompletedResult({
              title: `${modeLabel} Complete!`,
              summaryText: isSingle
                ? `Generated ${primary.fileName}`
                : `Successfully processed ${downloads.length} files.`,
              primaryBlob: primary.blob,
              primaryFileName: primary.fileName,
              outputFiles: downloads.map((d) => ({
                name: d.fileName,
                blob: d.blob,
                sizeBytes: d.blob.size,
              })),
            });
          }

          showSuccessDialog({
            highlights: [
              {
                label: statusDialogStrings.resultsLabel,
                value: `${modeLabel} completed successfully.`,
              },
              {
                label: statusDialogStrings.filesProcessedLabel(processedSources),
              },
            ],
            downloads,
            donationPrompt: buildDonationPrompt(),
          });

          trackProcessorEvent('operation_success', {
            file_count: processedSources,
            mode,
          });
          return;
        }
      }
    } catch (err) {
      if (compressionEntriesBuffer.length > 0) {
        setCompressionSummary([...compressionEntriesBuffer]);
      }
      console.error('Error processing PDF', err);
      const fallbackMessage = err instanceof Error && err.message ? err.message : errorStrings.unknown;
      trackProcessorEvent('operation_error', {
        reason: 'exception',
        error_name: err instanceof Error ? err.name : undefined,
      });
      showErrorDialog(fallbackMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDialogClose = () => {
    if (statusDialogState.isOpen) {
      trackProcessorEvent('status_dialog_close', {
        status: statusDialogState.status,
        download_count: statusDialogState.downloads.length,
        has_donation_prompt: Boolean(statusDialogState.donationPrompt),
      });
    }

    setStatusDialogState(prev => ({
      ...prev,
      isOpen: false,
    }));
  };

  const handleDownloadAgain = () => {
    trackProcessorEvent('download_again', {
      download_count: statusDialogState.downloads.length,
    });
    statusDialogState.downloads.forEach(entry => {
      triggerDownloadAction(entry.blob, entry.fileName, false);
    });
  };

  const handlePreviewFromDialog = () => {
    const primary = statusDialogState.downloads[0];
    if (primary?.blob) {
      openBlobInNewTab(primary.blob, primary.fileName);
    }
  };

  const handleRetry = () => {
    trackProcessorEvent('operation_retry');
    handleDialogClose();
    window.setTimeout(() => {
      handleProcess();
    }, 0);
  };

  const handlePageSelection = useCallback(
    (file: File, pageNumber: number, selected: boolean) => {
      const fileKey = buildFileSignature(file);
      const activeFile = files[currentFileIndex];
      const activeKey = activeFile ? buildFileSignature(activeFile) : null;
      const applySelectionChange = (currentSelection: Record<number, boolean>) => {
        const nextSelection = { ...currentSelection };

        if (selected) {
          nextSelection[pageNumber] = true;
        } else if (nextSelection[pageNumber]) {
          delete nextSelection[pageNumber];
        }

        return nextSelection;
      };

      const fileIndex = files.findIndex(candidate => candidate === file);
      trackProcessorEvent(selected ? 'page_selected' : 'page_deselected', {
        page_number: pageNumber,
        file_index: fileIndex >= 0 ? fileIndex : undefined,
      });

      if (fileIndex !== -1 && fileIndex !== currentFileIndex) {
        setCurrentFileIndex(fileIndex);
      }

      setExtractSelectionsByFile(prevMap => {
        const previousSelection = prevMap[fileKey] ?? {};
        const nextSelectionForFile = applySelectionChange(previousSelection);
        const hasPages = Object.keys(nextSelectionForFile).length > 0;

        if (!hasPages) {
          if (!prevMap[fileKey]) {
            return prevMap;
          }

          const rest = { ...prevMap };
          delete rest[fileKey];
          return Object.keys(rest).length === 0 ? {} : rest;
        }

        if (prevMap[fileKey] && areSelectionsEqual(prevMap[fileKey], nextSelectionForFile)) {
          return prevMap;
        }

        return { ...prevMap, [fileKey]: nextSelectionForFile };
      });

      if (activeKey === fileKey) {
        setSelectedPages(prevSelectedPages => {
          const nextSelectionForFile = applySelectionChange(prevSelectedPages);
          return Object.keys(nextSelectionForFile).length > 0 ? nextSelectionForFile : {};
        });
      }
    },
    [buildFileSignature, files, currentFileIndex, trackProcessorEvent]
  );

  const handlePageOrderChange = useCallback(
    (file: File, newOrder: number[]) => {
      const fileKey = buildFileSignature(file);
      const activeFile = files[currentFileIndex];
      const activeKey = activeFile ? buildFileSignature(activeFile) : null;

      const fileIndex = files.findIndex(candidate => candidate === file);
      trackProcessorEvent('page_order_updated', {
        file_index: fileIndex >= 0 ? fileIndex : undefined,
        page_count: newOrder.length,
      });

      if (fileIndex !== -1 && fileIndex !== currentFileIndex) {
        setCurrentFileIndex(fileIndex);
      }

      setReorderOrdersByFile(prev => {
        if (newOrder.length === 0) {
          if (!prev[fileKey]) {
            return prev;
          }

          const rest = { ...prev };
          delete rest[fileKey];
          return Object.keys(rest).length === 0 ? {} : rest;
        }

        if (prev[fileKey] && areOrdersEqual(prev[fileKey], newOrder)) {
          return prev;
        }

        return { ...prev, [fileKey]: [...newOrder] };
      });

      if (mode === 'reorder' && activeKey === fileKey) {
        setPageOrder(newOrder.length === 0 ? [] : [...newOrder]);
      }
    },
    [buildFileSignature, files, currentFileIndex, mode, trackProcessorEvent]
  );

  useEffect(() => {
    if (mode !== 'extract' && mode !== 'split' && mode !== 'crop' && mode !== 'rotate') {
      if (Object.keys(selectedPages).length > 0) {
        setSelectedPages({});
      }
      return;
    }

    const activeFile = files[currentFileIndex] ?? files[0];
    if (!activeFile) {
      if (Object.keys(selectedPages).length > 0) {
        setSelectedPages({});
      }
      return;
    }

    const key = buildFileSignature(activeFile);
    const storedSelection = extractSelectionsByFile[key] ?? {};

    if (!areSelectionsEqual(selectedPages, storedSelection)) {
      setSelectedPages(Object.keys(storedSelection).length === 0 ? {} : { ...storedSelection });
    }
  }, [mode, files, currentFileIndex, extractSelectionsByFile, buildFileSignature, selectedPages]);

  useEffect(() => {
    if (mode !== 'reorder') {
      if (pageOrder.length > 0) {
        setPageOrder([]);
      }
      return;
    }

    const activeFile = files[currentFileIndex] ?? files[0];
    if (!activeFile) {
      if (pageOrder.length > 0) {
        setPageOrder([]);
      }
      return;
    }

    const key = buildFileSignature(activeFile);
    const storedOrder = reorderOrdersByFile[key];

    if (!storedOrder) {
      if (pageOrder.length > 0) {
        setPageOrder([]);
      }
      return;
    }

    if (!areOrdersEqual(pageOrder, storedOrder)) {
      setPageOrder(storedOrder.length === 0 ? [] : [...storedOrder]);
    }
  }, [mode, files, currentFileIndex, reorderOrdersByFile, buildFileSignature, pageOrder]);

  const moveFile = (index: number, direction: 'up' | 'down') => {
    setFiles(prevFiles => {
      if (
        (direction === 'up' && index === 0) ||
        (direction === 'down' && index === prevFiles.length - 1)
      ) {
        return prevFiles;
      }

      const next = [...prevFiles];
      const nextIndex = direction === 'up' ? index - 1 : index + 1;
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      trackProcessorEvent('file_reordered', {
        direction,
        from_index: index,
        to_index: nextIndex,
      });
      return next;
    });
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => {
      const target = prevFiles[index];
      const next = prevFiles.filter((_, i) => i !== index);

      if (target) {
        trackProcessorEvent('file_removed', {
          index,
          previous_total: prevFiles.length,
          new_total: next.length,
        });
        const signature = buildFileSignature(target);
        setExtractSelectionsByFile(prev => {
          if (!prev[signature]) {
            return prev;
          }
          const rest = { ...prev };
          delete rest[signature];
          return Object.keys(rest).length === 0 ? {} : rest;
        });

        setReorderOrdersByFile(prev => {
          if (!prev[signature]) {
            return prev;
          }
          const rest = { ...prev };
          delete rest[signature];
          return Object.keys(rest).length === 0 ? {} : rest;
        });

        if (compressionPreviewStates[signature]) {
          setCompressionPreviewStates(prev => {
            if (!prev[signature]) {
              return prev;
            }
            const nextStates = { ...prev };
            delete nextStates[signature];
            return nextStates;
          });
        }
        if (compressionPreviewCache[signature]) {
          setCompressionPreviewCache(prev => {
            if (!prev[signature]) {
              return prev;
            }
            const nextCache = { ...prev };
            delete nextCache[signature];
            return nextCache;
          });
        }
      }

      if (next.length === 0) {
        setSelectedPages({});
        setPageOrder([]);
        setCurrentFileIndex(0);
        setCompressionPreviewStates({});
        setCompressionPreviewCache({});
        setCompressionSummary([]);
      } else if (mode === 'extract' || mode === 'split' || mode === 'crop' || mode === 'reorder' || mode === 'rotate') {
        setCurrentFileIndex(prevIndex => {
          if (prevIndex === index) {
            return 0;
          }
          if (prevIndex > index) {
            return prevIndex - 1;
          }
          return prevIndex;
        });
      }
      return next;
    });
  };

  const clearFiles = () => {
    if (files.length > 0) {
      trackProcessorEvent('files_cleared', {
        previous_total: files.length,
      });
    }
    setFiles([]);
    setSelectedPages({});
    setPageOrder([]);
    setExtractSelectionsByFile({});
    setReorderOrdersByFile({});
    setCurrentFileIndex(0);
    setCompressionPreviewStates({});
    setCompressionPreviewCache({});
    setCompressionSummary([]);
    setCompletedResult(null);
  };

  const handleFileChange = (index: number) => {
    const targetFile = files[index];
    const targetKey = targetFile ? buildFileSignature(targetFile) : null;

    trackProcessorEvent('active_file_changed', {
      index,
      has_target: Boolean(targetFile),
      changed: index !== currentFileIndex,
    });

    if (mode === 'extract' || mode === 'split' || mode === 'crop' || mode === 'rotate') {
      setSelectedPages(targetKey ? { ...(extractSelectionsByFile[targetKey] ?? {}) } : {});
    }

    if (mode === 'reorder') {
      setPageOrder(
        targetKey && reorderOrdersByFile[targetKey]
          ? [...(reorderOrdersByFile[targetKey] ?? [])]
          : []
      );
    }

    setCurrentFileIndex(index);
  };



  const showProcessingOptions = files.length > 0 && !isProcessing;

  const uploaderConfig = useMemo(() => {
    if (mode === 'imagesToPdf') {
      return { multiple: true, acceptImages: true, acceptedFileTypes: 'image/*,.jpg,.jpeg,.png,.webp,.heic,.heif,.tiff,.tif,.bmp' };
    }
    if (mode === 'signPdf' || mode === 'fillPdfForm') {
      return { multiple: false, acceptImages: false, acceptedFileTypes: 'application/pdf,.pdf' };
    }
    if (mode === 'excelToPdf') {
      return { multiple: false, acceptImages: false, acceptedFileTypes: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,.xlsx,.xls,.csv' };
    }
    if (mode === 'csvToPdf') {
      return { multiple: false, acceptImages: false, acceptedFileTypes: 'text/csv,text/comma-separated-values,application/vnd.ms-excel,.csv' };
    }
    if (mode === 'powerpointToPdf') {
      return { multiple: false, acceptImages: false, acceptedFileTypes: 'application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint,.pptx,.ppt' };
    }
    if (mode === 'markdownToPdf') {
      return { multiple: false, acceptImages: false, acceptedFileTypes: 'text/markdown,text/plain,.md,.markdown,.txt' };
    }
    if (mode === 'htmlToPdf') {
      return { multiple: false, acceptImages: false, acceptedFileTypes: 'text/html,application/xhtml+xml,.html,.htm' };
    }
    if (mode === 'ebookToPdf') {
      return { multiple: false, acceptImages: false, acceptedFileTypes: 'application/epub+zip,.epub' };
    }
    return { multiple: true, acceptImages: false, acceptedFileTypes: 'application/pdf,.pdf' };
  }, [mode]);

  const totalExtractPageSelections = useMemo(() => {
    let total = 0;
    const activeKey = mode === 'extract' || mode === 'split' || mode === 'crop' || mode === 'rotate' ? currentFileKey : null;

    Object.entries(extractSelectionsByFile).forEach(([key, selection]) => {
      if ((mode === 'extract' || mode === 'split' || mode === 'crop' || mode === 'rotate') && key === activeKey) {
        return;
      }

      total += Object.keys(selection).reduce((count, page) => {
        const pageNumber = parseInt(page, 10);
        return selection[pageNumber] ? count + 1 : count;
      }, 0);
    });

    if (mode === 'extract' || mode === 'split' || mode === 'crop' || mode === 'rotate') {
      total += Object.keys(selectedPages).reduce((count, page) => {
        const pageNumber = parseInt(page, 10);
        return selectedPages[pageNumber] ? count + 1 : count;
      }, 0);
    }

    return total;
  }, [mode, currentFileKey, extractSelectionsByFile, selectedPages]);

  const hasExtractSelection = totalExtractPageSelections > 0;

  const handleProcessingOptionsChange = useCallback(
    (nextOptions: PDFProcessingOptions) => {
      const serialize = (value: unknown) =>
        typeof value === 'undefined' ? 'undefined' : JSON.stringify(value);

      const keys = new Set(
        [...Object.keys(processingOptions ?? {}), ...Object.keys(nextOptions ?? {})]
      );

      const changedKeys = Array.from(keys).filter(key => {
        const prevValue = processingOptions[key as keyof PDFProcessingOptions];
        const nextValue = nextOptions[key as keyof PDFProcessingOptions];
        return serialize(prevValue) !== serialize(nextValue);
      });

      if (changedKeys.length > 0) {
        trackProcessorEvent('options_change', {
          changed_keys: changedKeys.join(','),
          changed_count: changedKeys.length,
        });
      }

      setProcessingOptions(nextOptions);
    },
    [processingOptions, trackProcessorEvent]
  );

  const dialogActions: DialogAction[] = [];
  if (statusDialogState.isOpen && statusDialogStrings) {
    if (statusDialogState.status === 'success' && statusDialogState.downloads.length > 0) {
      const primary = statusDialogState.downloads[0];
      const isIos = isIOS();
      const primaryDownloadLabel = isIos
        ? `Save / Share ${primary?.fileName || 'PDF'}`
        : (statusDialogState.downloads.length === 1
            ? `Download ${primary?.fileName || 'PDF'}`
            : statusDialogStrings.downloadAgainLabel);

      dialogActions.push({
        label: primaryDownloadLabel,
        onClick: handleDownloadAgain,
        variant: 'primary',
      });

      if (isIos && primary?.blob) {
        dialogActions.push({
          label: 'Open / View PDF',
          onClick: handlePreviewFromDialog,
          variant: 'secondary',
        });
      }
    }

    if (statusDialogState.status === 'error') {
      dialogActions.push({
        label: statusDialogStrings.retryLabel,
        onClick: handleRetry,
        variant: 'primary',
        disabled: isProcessing,
      });
    }
  }

  const resolveIdleButtonLabel = () => {
    if (mode === 'extract') {
      return processButton.extract(totalExtractPageSelections);
    }

    if (mode === 'split') {
      if (totalExtractPageSelections > 0) {
        return `Split ${totalExtractPageSelections} Selected Page${totalExtractPageSelections === 1 ? '' : 's'}`;
      }
      if (processingOptions.pageRange) {
        return `Split by Range (${processingOptions.pageRange})`;
      }
      if (processingOptions.pagesPerFile && processingOptions.pagesPerFile > 1) {
        return `Split Every ${processingOptions.pagesPerFile} Pages`;
      }
      return 'Split PDF into Single Pages';
    }

    if (mode === 'crop') {
      return processButton.crop(totalExtractPageSelections);
    }

    if (mode === 'rotate') {
      return processButton.rotate(totalExtractPageSelections);
    }

    if (mode === 'reorder') {
      return processButton.reorder;
    }

    if (mode === 'pdfToImages' && processButton.pdfToImages) {
      return files.length <= 1
        ? processButton.pdfToImages.single
        : processButton.pdfToImages.multiple(files.length);
    }

    if (mode === 'imagesToPdf' && processButton.imagesToPdf) {
      return files.length <= 1
        ? processButton.imagesToPdf.single
        : processButton.imagesToPdf.multiple(files.length);
    }

    if (mode === 'encrypt') {
      return files.length <= 1 ? 'Protect & Encrypt PDF' : `Protect & Encrypt ${files.length} PDFs`;
    }

    if (mode === 'decrypt') {
      return files.length <= 1 ? 'Unlock & Decrypt PDF' : `Unlock & Decrypt ${files.length} PDFs`;
    }

    return files.length === 1
      ? processButton.idleSingle
      : processButton.idleMultiple(files.length);
  };

  const isGeneratorTool = mode === 'createPdf' || mode === 'posBilling';

  const currentStep: ToolStep = completedResult
    ? 'result'
    : isProcessing
    ? 'process'
    : isGeneratorTool || files.length > 0
    ? 'options'
    : 'upload';

  const ActiveToolIcon = ICON_MAP[mode] ?? Layers;
  const activeToolName = dictionary.components.footer.operations[mode as keyof typeof dictionary.components.footer.operations] || mode;

  return (
    <>
      <div className="p-6 sm:p-8 surface-card rounded-3xl shadow-sm border border-[var(--border)] space-y-6" id="pdf-processor">

        {/* Active Tool Identifier Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)] shadow-xs">
              <ActiveToolIcon className="h-5 w-5 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
                  Selected Tool
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md font-mono bg-[var(--bg-subtle)] text-[var(--tx-3)] border border-[var(--border)]">
                  {isGeneratorTool
                    ? (currentStep === 'options' ? 'STEP 1: OPTIONS' : currentStep === 'process' ? 'STEP 2: GENERATING' : 'STEP 3: COMPLETE')
                    : (currentStep === 'upload' ? 'STEP 1: UPLOAD' : currentStep === 'options' ? 'STEP 2: OPTIONS' : currentStep === 'process' ? 'STEP 3: PROCESSING' : 'STEP 4: COMPLETE')}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-[var(--tx)] leading-tight">
                {activeToolName}
              </h2>
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 pt-0.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span>100% Client-Side &bull; Your files never leave your device</span>
              </div>
            </div>
          </div>

          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[var(--bg-subtle)] text-[var(--tx-2)] hover:text-[var(--tx)] hover:border-[var(--accent-border)] border border-[var(--border)] transition-all shadow-xs"
          >
            <span>Change Tool (45+)</span>
          </Link>
        </div>

        {/* Step Indicator */}
        <StepIndicator
          currentStep={currentStep}
          hasFiles={files.length > 0}
          isProcessing={isProcessing}
          hasResult={Boolean(completedResult)}
          isGenerator={isGeneratorTool}
          onStepClick={(step) => {
            if (step === 'upload') {
              setCompletedResult(null);
              clearFiles();
            } else if (step === 'options') {
              setCompletedResult(null);
            }
          }}
        />

        {/* 1. Completed Result Panel */}
        {completedResult && (
          <div className="mb-8">
            <ResultPanel
              title={completedResult.title}
              summaryText={completedResult.summaryText}
              beforeSizeBytes={completedResult.beforeSizeBytes}
              afterSizeBytes={completedResult.afterSizeBytes}
              pageCount={completedResult.pageCount}
              wordCount={completedResult.wordCount}
              primaryFileName={completedResult.primaryFileName}
              primaryDownloadBlob={completedResult.primaryBlob}
              outputFiles={completedResult.outputFiles}
              textContent={completedResult.textContent}
              onDownloadPrimary={
                completedResult.primaryBlob
                  ? () => triggerDownloadAction(completedResult.primaryBlob!, completedResult.primaryFileName)
                  : undefined
              }
              onDownloadZip={
                completedResult.outputFiles && completedResult.outputFiles.length > 1
                  ? () => {
                      if (completedResult.primaryBlob) {
                        triggerDownloadAction(completedResult.primaryBlob, `${completedResult.primaryFileName.replace(/\.[^/.]+$/, '')}_all.zip`);
                      }
                    }
                  : undefined
              }
              onEditOptions={() => {
                setCompletedResult(null);
              }}
              onStartOver={() => {
                setCompletedResult(null);
                clearFiles();
              }}
            />
          </div>
        )}

        {mode === 'scanToPdf' && (
          <div className="mb-6">
            <CameraScanInterface
              onScanComplete={(scannedPdf) => {
                showSuccessDialog({
                  highlights: [
                    {
                      label: statusDialogStrings?.resultsLabel || 'Status',
                      value: 'Document scanned and compiled into PDF successfully',
                    },
                    {
                      label: statusDialogStrings?.filesProcessedLabel?.(1) || '1 File',
                    },
                  ],
                  downloads: [{ blob: scannedPdf, fileName: 'camera_scan.pdf' }],
                  donationPrompt: buildDonationPrompt(),
                });
              }}
            />
          </div>
        )}

        {mode === 'whiteboard' && (
          <div className="mb-6">
            <PdfWhiteboardInterface
              file={files[0] || null}
              onDone={(blob) => {
                triggerDownloadAction(blob, files[0] ? `${files[0].name.replace(/\.[^/.]+$/, '')}_whiteboard.pdf` : 'whiteboard_export.pdf');
              }}
            />
          </div>
        )}

        {mode === 'compare' && (
          <div className="mb-6">
            <PdfCompareViewer />
          </div>
        )}

        {mode === 'posBilling' && (
          <div className="mb-6">
            <PosBillingInterface
              onCheckout={(blob, fileName) => {
                triggerDownloadAction(blob, fileName);
              }}
            />
          </div>
        )}

        {mode === 'editPdf' && files[0] && !completedResult && (
          <div className="mb-6">
            <PdfEditorInterface
              file={files[0]}
              onDone={(blob) => {
                const outFileName = `${files[0].name.replace(/\.[^/.]+$/, '')}_edited.pdf`;
                triggerDownloadAction(blob, outFileName);
                showSuccessDialog({
                  highlights: [
                    {
                      label: statusDialogStrings?.resultsLabel || 'Status',
                      value: 'PDF edited and vector elements saved successfully',
                    },
                    {
                      label: statusDialogStrings?.filesProcessedLabel?.(1) || '1 File',
                    },
                  ],
                  downloads: [{ blob, fileName: outFileName }],
                  donationPrompt: buildDonationPrompt(),
                });
              }}
            />
          </div>
        )}

        {mode === 'signPdf' && files[0] && !completedResult && (
          <div className="mb-6">
            <SignPdfInterface
              file={files[0]}
              onDone={(blob) => {
                const outFileName = `${files[0].name.replace(/\.[^/.]+$/, '')}_signed.pdf`;
                triggerDownloadAction(blob, outFileName);
                showSuccessDialog({
                  highlights: [
                    {
                      label: statusDialogStrings?.resultsLabel || 'Status',
                      value: 'PDF document signed and verified successfully',
                    },
                    {
                      label: statusDialogStrings?.filesProcessedLabel?.(1) || '1 File',
                    },
                  ],
                  downloads: [{ blob, fileName: outFileName }],
                  donationPrompt: buildDonationPrompt(),
                });
              }}
            />
          </div>
        )}

        {mode === 'fillPdfForm' && files[0] && !completedResult && (
          <div className="mb-6">
            <PdfFormFillerInterface
              file={files[0]}
              onDone={(blob) => {
                const outFileName = `${files[0].name.replace(/\.[^/.]+$/, '')}_filled.pdf`;
                triggerDownloadAction(blob, outFileName);
                showSuccessDialog({
                  highlights: [
                    {
                      label: statusDialogStrings?.resultsLabel || 'Status',
                      value: 'PDF form completed and saved successfully',
                    },
                    {
                      label: statusDialogStrings?.filesProcessedLabel?.(1) || '1 File',
                    },
                  ],
                  downloads: [{ blob, fileName: outFileName }],
                  donationPrompt: buildDonationPrompt(),
                });
              }}
            />
          </div>
        )}

        {mode === 'redact' && files[0] && !completedResult && (
          <div className="mb-6">
            <ToolErrorBoundary toolName="PDF Redaction Studio">
              <PdfRedactionEditor
                file={files[0]}
                onDone={(burnedBlob) => {
                  const outFileName = `${files[0].name.replace(/\.[^/.]+$/, '')}_redacted.pdf`;
                  triggerDownloadAction(burnedBlob, outFileName);
                  showSuccessDialog({
                    highlights: [
                      {
                        label: statusDialogStrings?.resultsLabel || 'Status',
                        value: 'PDF document redacted with zero forensic leakage',
                      },
                      {
                        label: statusDialogStrings?.filesProcessedLabel?.(1) || '1 File',
                      },
                    ],
                    downloads: [{ blob: burnedBlob, fileName: outFileName }],
                    donationPrompt: buildDonationPrompt(),
                  });
                }}
                onBurnRedactions={(burnedBlob) => {
                  const outFileName = `${files[0].name.replace(/\.[^/.]+$/, '')}_redacted.pdf`;
                  triggerDownloadAction(burnedBlob, outFileName);
                  showSuccessDialog({
                    highlights: [
                      {
                        label: statusDialogStrings?.resultsLabel || 'Status',
                        value: 'PDF document redacted with zero forensic leakage',
                      },
                      {
                        label: statusDialogStrings?.filesProcessedLabel?.(1) || '1 File',
                      },
                    ],
                    downloads: [{ blob: burnedBlob, fileName: outFileName }],
                    donationPrompt: buildDonationPrompt(),
                  });
                }}
              />
            </ToolErrorBoundary>
          </div>
        )}

        {mode === 'latexResume' && !completedResult && (
          <div className="mb-6">
            <LatexResumeInterface
              onDone={(blob) => {
                const outFileName = 'Resume_ATS.pdf';
                triggerDownloadAction(blob, outFileName);
                showSuccessDialog({
                  highlights: [
                    {
                      label: statusDialogStrings?.resultsLabel || 'Status',
                      value: 'LaTeX ATS resume compiled successfully',
                    },
                    {
                      label: statusDialogStrings?.filesProcessedLabel?.(1) || '1 File',
                    },
                  ],
                  downloads: [{ blob, fileName: outFileName }],
                  donationPrompt: buildDonationPrompt(),
                });
              }}
            />
          </div>
        )}

        {mode === 'createPdf' && !completedResult && (
          <div className="mb-6">
            <CreateBlankPdfInterface
              initialPageCount={processingOptions.blankPageCount ?? 1}
              initialPageSize={processingOptions.blankPageSize ?? 'a4'}
              initialOrientation={processingOptions.blankPageOrientation ?? 'portrait'}
              isProcessing={isProcessing}
              onGenerate={async ({ pageCount, pageSize, orientation, documentModel }) => {
                setIsProcessing(true);
                openProcessingDialog(statusMessages.info(activeToolName));
                trackProcessorEvent('operation_start', {
                  mode: 'createPdf',
                  page_count: pageCount,
                  page_size: pageSize,
                  orientation,
                });

                try {
                  const bytes = documentModel
                    ? await PDFOps.buildPdfFromDocumentModel(documentModel)
                    : await PDFOps.createBlankPdf({ pageCount, pageSize, orientation });
                  const blob = createPdfBlob(bytes);
                  const docTitle = documentModel?.title
                    ? documentModel.title.toLowerCase().replace(/[^a-z0-9_-]/g, '_')
                    : 'document';
                  const fileName = `${docTitle}_${pageCount}_page${pageCount > 1 ? 's' : ''}.pdf`;

                  triggerDownloadAction(blob, fileName);

                  const summaryStr = `${pageCount} ${pageCount === 1 ? 'page' : 'pages'} • ${pageSize.toUpperCase()} • ${orientation === 'portrait' ? 'Portrait' : 'Landscape'}`;

                  setCompletedResult({
                    title: 'PDF Document Created!',
                    summaryText: summaryStr,
                    pageCount,
                    primaryBlob: blob,
                    primaryFileName: fileName,
                    outputFiles: [
                      {
                        name: fileName,
                        blob,
                        sizeBytes: blob.size,
                      },
                    ],
                  });

                  showSuccessDialog({
                    highlights: [
                      {
                        label: statusDialogStrings?.resultsLabel || 'Status',
                        value: summaryStr,
                      },
                      {
                        label: 'Document Type',
                        value: `Genuine Blank PDF (${pageSize.toUpperCase()} ${orientation === 'portrait' ? 'Portrait' : 'Landscape'})`,
                      },
                    ],
                    downloads: [{ blob, fileName }],
                    donationPrompt: buildDonationPrompt(),
                  });

                  trackProcessorEvent('operation_success', {
                    mode: 'createPdf',
                    page_count: pageCount,
                    page_size: pageSize,
                    orientation,
                  });
                } catch (err) {
                  const message = err instanceof Error ? err.message : errorStrings.unknown;
                  showErrorDialog(message);
                  trackProcessorEvent('operation_error', { reason: message });
                } finally {
                  setIsProcessing(false);
                }
              }}
            />
          </div>
        )}

        {mode !== 'createPdf' && mode !== 'latexResume' && mode !== 'scanToPdf' && mode !== 'whiteboard' && mode !== 'compare' && mode !== 'posBilling' && ((mode !== 'editPdf' && mode !== 'signPdf' && mode !== 'fillPdfForm' && mode !== 'redact') || files.length === 0) && !completedResult && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{upload.title}</h2>
              {files.length > 0 && (
                <button
                  className="text-sm text-[var(--tx-3)] hover:text-[var(--accent)] transition-colors"
                  onClick={clearFiles}
                >
                  {upload.clearAll}
                </button>
              )}
            </div>

            <FileUploader
              onFilesSelectedAction={handleFilesSelected}
              multiple={uploaderConfig.multiple}
              acceptImages={uploaderConfig.acceptImages}
              acceptedFileTypes={uploaderConfig.acceptedFileTypes}
            />
          </div>
        )}

        {files.length > 0 && !completedResult && mode !== 'editPdf' && mode !== 'signPdf' && mode !== 'fillPdfForm' && mode !== 'latexResume' && mode !== 'redact' && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">{listHeading}</h3>
              <button
                className="text-xs text-[var(--tx-3)] hover:text-[var(--accent)] transition-colors"
                onClick={clearFiles}
              >
                {upload.clearAll}
              </button>
            </div>
            <FileList
              files={files}
              onMoveFileAction={mode === 'merge' || mode === 'imagesToPdf' ? moveFile : undefined}
              onRemoveFileAction={removeFile}
              onClearAllAction={clearFiles}
              currentIndex={mode === 'extract' || mode === 'split' || mode === 'crop' || mode === 'reorder' || mode === 'rotate' ? currentFileIndex : undefined}
              onFileSelectAction={
                mode === 'extract' || mode === 'split' || mode === 'crop' || mode === 'reorder' || mode === 'rotate' ? handleFileChange : undefined
              }
            />

            {(mode === 'extract' || mode === 'split') && (
              <div className="mt-6 space-y-8">
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold">
                    {mode === 'split' ? 'Choose Pages to Split' : labels.pagesToExtract}
                  </h3>
                  {mode === 'split' && (
                    <p className="text-xs text-[var(--tx-2)]">
                      Click any page thumbnail below to choose which pages you want to split out into a separate PDF file.
                    </p>
                  )}
                </div>
                {files.map((file, index) => {
                  const fileKey = buildFileSignature(file);
                  const selection =
                    fileKey === currentFileKey
                      ? selectedPages
                      : extractSelectionsByFile[fileKey] ?? {};
                  const selectedCount = Object.values(selection).filter(Boolean).length;
                  const isActive = currentFileIndex === index;

                  return (
                    <section
                      key={`extract-panel-${fileKey}`}
                      className={`rounded-lg border border-[var(--ui-2)] bg-[var(--bg-2)]/60 shadow-sm transition hover:border-[var(--accent)] ${isActive ? 'ring-1 ring-[var(--accent)]/60' : ''
                        }`}
                    >
                      <header
                        className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--ui-2)] bg-white/70 px-4 py-3 cursor-pointer"
                        onClick={() => handleFileChange(index)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={event => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            handleFileChange(index);
                          }
                        }}
                      >
                        <div>
                          <p className="font-medium text-[var(--tx)] truncate max-w-[280px] sm:max-w-none">
                            {file.name}
                          </p>
                          <p className="text-xs text-[var(--tx-3)]">
                            {selectedCount > 0
                              ? `${fileListStrings.pagesLabel(selectedCount)} • ${fileListStrings.selected}`
                              : mode === 'split'
                              ? 'Split into single pages or pick specific pages below'
                              : errorStrings.noPagesSelected}
                          </p>
                        </div>
                        {isActive ? (
                          <span className="text-xs font-medium text-[var(--accent)]">
                            {fileListStrings.selected}
                          </span>
                        ) : null}
                      </header>
                      <div className="px-4 pb-4 pt-3">
                        <PageSelector
                          key={`selector-${fileKey}`}
                          file={file}
                          selectedPages={selection}
                          onPageSelectAction={(page, value) => handlePageSelection(file, page, value)}
                        />
                      </div>
                    </section>
                  );
                })}
              </div>
            )}

            {mode === 'rotate' && (
              <div className="mt-6 space-y-8">
                <div className="space-y-3">
                  <h3 className="font-bold">{labels.pagesToRotate}</h3>
                  <p className="text-sm text-[var(--tx-3)]">{processingOptionsStrings.rotate.hint}</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-lg border ${
                        (processingOptions.rotationDegrees ?? 90) === 90
                          ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                          : 'bg-white text-[var(--tx)] border-[var(--ui-2)]'
                      }`}
                      onClick={() =>
                        setProcessingOptions(prev => ({
                          ...prev,
                          rotationDegrees: 90,
                        }))
                      }
                    >
                      {processingOptionsStrings.rotate.rotateRight90}
                    </button>

                    <button
                      type="button"
                      className={`px-4 py-2 rounded-lg border ${
                        (processingOptions.rotationDegrees ?? 90) === 180
                          ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                          : 'bg-white text-[var(--tx)] border-[var(--ui-2)]'
                      }`}
                      onClick={() =>
                        setProcessingOptions(prev => ({
                          ...prev,
                          rotationDegrees: 180,
                        }))
                      }
                    >
                      {processingOptionsStrings.rotate.rotate180}
                    </button>

                    <button
                      type="button"
                      className={`px-4 py-2 rounded-lg border ${
                        (processingOptions.rotationDegrees ?? 90) === -90
                          ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                          : 'bg-white text-[var(--tx)] border-[var(--ui-2)]'
                      }`}
                      onClick={() =>
                        setProcessingOptions(prev => ({
                          ...prev,
                          rotationDegrees: -90,
                        }))
                      }
                    >
                      {processingOptionsStrings.rotate.rotateLeft90}
                    </button>
                  </div>
                </div>

                {files.map((file, index) => {
                  const fileKey = buildFileSignature(file);
                  const selection =
                    fileKey === currentFileKey
                      ? selectedPages
                      : extractSelectionsByFile[fileKey] ?? {};
                  const selectedCount = Object.values(selection).filter(Boolean).length;
                  const isActive = currentFileIndex === index;

                  return (
                    <section
                      key={`rotate-panel-${fileKey}`}
                      className={`rounded-lg border border-[var(--ui-2)] bg-[var(--bg-2)]/60 shadow-sm transition hover:border-[var(--accent)] ${isActive ? 'ring-1 ring-[var(--accent)]/60' : ''
                        }`}
                    >
                      <header
                        className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--ui-2)] bg-white/70 px-4 py-3 cursor-pointer"
                        onClick={() => handleFileChange(index)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={event => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            handleFileChange(index);
                          }
                        }}
                      >
                        <div>
                          <p className="font-medium text-[var(--tx)] truncate max-w-[280px] sm:max-w-none">
                            {file.name}
                          </p>
                          <p className="text-xs text-[var(--tx-3)]">
                            {selectedCount > 0
                              ? `${fileListStrings.pagesLabel(selectedCount)} • ${fileListStrings.selected}`
                              : errorStrings.noPagesSelected}
                          </p>
                        </div>
                        {isActive ? (
                          <span className="text-xs font-medium text-[var(--accent)]">
                            {fileListStrings.selected}
                          </span>
                        ) : null}
                      </header>
                      <div className="px-4 pb-4 pt-3">
                        <PageSelector
                          key={`rotate-selector-${fileKey}`}
                          file={file}
                          selectedPages={selection}
                          onPageSelectAction={(page, value) => handlePageSelection(file, page, value)}
                          selectedPageRotationDegrees={processingOptions.rotationDegrees ?? 90}
                        />
                      </div>
                    </section>
                  );
                })}
              </div>
            )}

            {mode === 'crop' && (
              <div className="mt-6 space-y-8">
                <h3 className="font-bold">{labels.pagesToCrop}</h3>
                {files.map((file, index) => {
                  const fileKey = buildFileSignature(file);
                  const selection =
                    fileKey === currentFileKey
                      ? selectedPages
                      : extractSelectionsByFile[fileKey] ?? {};
                  const selectedCount = Object.values(selection).filter(Boolean).length;
                  const isActive = currentFileIndex === index;

                  return (
                    <section
                      key={`crop-panel-${fileKey}`}
                      className={`rounded-lg border border-[var(--ui-2)] bg-[var(--bg-2)]/60 shadow-sm transition hover:border-[var(--accent)] ${isActive ? 'ring-1 ring-[var(--accent)]/60' : ''
                        }`}
                    >
                      <header
                        className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--ui-2)] bg-white/70 px-4 py-3 cursor-pointer"
                        onClick={() => handleFileChange(index)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={event => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            handleFileChange(index);
                          }
                        }}
                      >
                        <div>
                          <p className="font-medium text-[var(--tx)] truncate max-w-[280px] sm:max-w-none">
                            {file.name}
                          </p>
                          <p className="text-xs text-[var(--tx-3)]">
                            {selectedCount > 0
                              ? `${fileListStrings.pagesLabel(selectedCount)} • ${fileListStrings.selected}`
                              : errorStrings.noPagesSelected}
                          </p>
                        </div>
                        {isActive ? (
                          <span className="text-xs font-medium text-[var(--accent)]">
                            {fileListStrings.selected}
                          </span>
                        ) : null}
                      </header>
                      <div className="px-4 pb-4 pt-3">
                        <PageSelector
                          key={`crop-selector-${fileKey}`}
                          file={file}
                          selectedPages={selection}
                          onPageSelectAction={(page, value) => handlePageSelection(file, page, value)}
                        />
                      </div>
                    </section>
                  );
                })}

                {mode === 'crop' && currentFile && hasExtractSelection ? (
                  <UnifiedCropInterface
                    file={currentFile}
                    pageNumber={currentCropPreviewPage}
                    cropMargins={processingOptions.cropMargins ?? { top: 0, right: 0, bottom: 0, left: 0 }}
                    onCropChangeAction={nextMargins =>
                      setProcessingOptions(prev => ({
                        ...prev,
                        cropMargins: nextMargins,
                      }))
                    }
                  />
                ) : null}
              </div>
            )}

            {mode === 'reorder' && (
              <div className="mt-6 space-y-8">
                <h3 className="font-bold">{labels.reorderPages}</h3>
                {files.map((file, index) => {
                  const fileKey = buildFileSignature(file);
                  const order =
                    fileKey === currentFileKey
                      ? pageOrder
                      : reorderOrdersByFile[fileKey] ?? [];
                  const isActive = currentFileIndex === index;

                  return (
                    <section
                      key={`reorder-panel-${fileKey}`}
                      className={`rounded-lg border border-[var(--ui-2)] bg-[var(--bg-2)]/60 shadow-sm transition hover:border-[var(--accent)] ${isActive ? 'ring-1 ring-[var(--accent)]/60' : ''
                        }`}
                    >
                      <header
                        className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--ui-2)] bg-white/70 px-4 py-3 cursor-pointer"
                        onClick={() => handleFileChange(index)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={event => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            handleFileChange(index);
                          }
                        }}
                      >
                        <div>
                          <p className="font-medium text-[var(--tx)] truncate max-w-[280px] sm:max-w-none">
                            {file.name}
                          </p>
                          <p className="text-xs text-[var(--tx-3)]">
                            {order.length > 0
                              ? ordererStrings.summary(order.length)
                              : ordererStrings.loading}
                          </p>
                        </div>
                        {isActive ? (
                          <span className="text-xs font-medium text-[var(--accent)]">
                            {fileListStrings.selected}
                          </span>
                        ) : null}
                      </header>
                      <div className="px-4 pb-4 pt-3">
                        <PageOrderer
                          key={`orderer-${fileKey}`}
                          file={file}
                          onOrderChangeAction={orderValues => handlePageOrderChange(file, orderValues)}
                          initialOrder={order.length > 0 ? order : undefined}
                        />
                      </div>
                    </section>
                  );
                })}
              </div>
            )}

            {mode === 'extractText' && (files[currentFileIndex] || files[0]) && (
              <div className="mt-6">
                <ToolErrorBoundary toolName="Text Extractor">
                  <TextExtractionViewer file={files[currentFileIndex] || files[0]} />
                </ToolErrorBoundary>
              </div>
            )}


            {showProcessingOptions && (
              <ProcessingOptions
                mode={mode}
                options={processingOptions}
                onOptionsChangeAction={handleProcessingOptionsChange}
                file={files[currentFileIndex] || files[0]}
              />
            )}

            {isProcessing && (
              <div className="mt-6">
                <ProcessingProgress
                  status="processing"
                  statusMessage="Processing your files 100% locally in your browser..."
                  onCancel={() => setIsProcessing(false)}
                />
              </div>
            )}

            {statusDialogState.status === 'error' && statusDialogState.isOpen && (
              <div className="mt-6">
                <ErrorState
                  title={statusDialogState.title}
                  message={statusDialogState.description}
                  type="general"
                  onRetry={() => {
                    setStatusDialogState(prev => ({ ...prev, isOpen: false }));
                    handleProcess();
                  }}
                  onReset={() => {
                    setStatusDialogState(prev => ({ ...prev, isOpen: false }));
                    clearFiles();
                  }}
                />
              </div>
            )}



            {mode === 'compress' && previewItems.length > 0 && !completedResult && (
              <div className="mt-6 space-y-4">
                {previewItems.map(item => (
                  <CompressionPreviewCard
                    key={item.key}
                    strings={compressionPreviewStrings}
                    status={item.status}
                    result={item.result}
                    formatFileSizeAction={formatFileSize}
                    errorMessage={item.status === 'error' ? item.error : undefined}
                    retryAction={
                      item.status === 'error'
                        ? () => handleRetryPreviewAction(item.key)
                        : undefined
                    }
                    fileName={item.file.name}
                    order={item.index}
                  />
                ))}
              </div>
            )}

            {mode === 'compress' && previewItems.length > 1 && previewItems.every(i => i.status === 'ready') && !completedResult && (
              <div className="mt-8 overflow-hidden rounded-xl border border-[var(--accent)] bg-[var(--accent)]/5 p-5 shadow-sm ring-1 ring-[var(--accent)]/20">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-[var(--tx)] uppercase tracking-wider">
                      {processorStrings.compressionTotal.title}
                    </h4>
                    <p className="text-xs text-[var(--tx-3)]">
                      {processorStrings.compressionTotal.count(files.length)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-[var(--accent)]">
                      {processorStrings.compressionTotal.savings(
                        formatFileSize(previewItems.reduce((acc, i) => acc + ((i.result?.originalSize ?? 0) - (i.result?.processedSize ?? 0)), 0))
                      )}
                    </p>
                    <p className="text-xs font-medium text-[var(--tx-3)]">
                      {formatFileSize(previewItems.reduce((acc, i) => acc + (i.result?.originalSize ?? 0), 0))} →{' '}
                      <span className="text-[var(--tx)]">
                        {formatFileSize(previewItems.reduce((acc, i) => acc + (i.result?.processedSize ?? 0), 0))}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {mode === 'compress' && (
              <div className="mt-4 p-3 bg-[var(--bg-2)] rounded-lg text-sm text-[var(--tx-2)]">
                <p>{upload.hints.compress}</p>
              </div>
            )}

            {mode === 'split' && (
              <div className="mt-4 p-3 bg-[var(--bg-2)] rounded-lg text-sm text-[var(--tx-2)]">
                <p>{upload.hints.split}</p>
              </div>
            )}
            {mode === 'pdfToImages' && upload.hints.pdfToImages && (
              <div className="mt-4 p-3 bg-[var(--bg-2)] rounded-lg text-sm text-[var(--tx-2)]">
                <p>{upload.hints.pdfToImages}</p>
              </div>
            )}
            {mode === 'imagesToPdf' && upload.hints.imagesToPdf && (
              <div className="mt-4 p-3 bg-[var(--bg-2)] rounded-lg text-sm text-[var(--tx-2)]">
                <p>{upload.hints.imagesToPdf}</p>
              </div>
            )}
          </div>
        )}

        {!completedResult && mode !== 'createPdf' && mode !== 'latexResume' && mode !== 'scanToPdf' && mode !== 'whiteboard' && mode !== 'compare' && mode !== 'posBilling' && ((mode !== 'editPdf' && mode !== 'signPdf' && mode !== 'fillPdfForm' && mode !== 'redact') || files.length === 0) && (
          <div className="flex justify-center pt-2" ref={actionButtonRef}>
            <button
              className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white shadow-md text-sm sm:text-base tracking-tight disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              disabled={
                files.length === 0 ||
                isProcessing ||
                ((mode === 'extract' || mode === 'crop' || mode === 'rotate') && !hasExtractSelection) ||
                (mode === 'encrypt' && (!processingOptions.userPassword && !processingOptions.password && !processingOptions.ownerPassword)) ||
                (mode === 'decrypt' && (!processingOptions.password && !processingOptions.decryptionPassword))
              }
              onClick={handleProcess}
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>{processButton.processing}</span>
                </span>
              ) : (
                resolveIdleButtonLabel()
              )}
            </button>
          </div>
        )}

        {!completedResult && mode !== 'createPdf' && mode !== 'latexResume' && mode !== 'editPdf' && mode !== 'signPdf' && mode !== 'fillPdfForm' && mode !== 'redact' && files.length > 0 && (
          <StickyActionBar
            buttonLabel={typeof resolveIdleButtonLabel() === 'string' ? (resolveIdleButtonLabel() as string) : 'Process Document'}
            isProcessing={isProcessing}
            disabled={
              files.length === 0 ||
              isProcessing ||
              ((mode === 'extract' || mode === 'crop' || mode === 'rotate') && !hasExtractSelection) ||
              (mode === 'encrypt' && (!processingOptions.userPassword && !processingOptions.password && !processingOptions.ownerPassword)) ||
              (mode === 'decrypt' && (!processingOptions.password && !processingOptions.decryptionPassword))
            }
            fileCount={files.length}
            totalSizeLabel={formatFileSize(files.reduce((sum, f) => sum + f.size, 0))}
            onClick={handleProcess}
            targetRef={actionButtonRef}
          />
        )}

        {mode === 'compress' && compressionSummary.length > 0 && (
          <div className="mt-8 space-y-4">
            {compressionSummary.map(entry => (
              <CompressionSummaryCard
                key={entry.id}
                strings={compressionSummaryStrings}
                result={entry.result}
                fileName={entry.fileName}
                elapsedSeconds={entry.elapsedSeconds}
                formatFileSizeAction={formatFileSize}
                downloadAction={() => handleSummaryDownloadAction(entry)}
                clearAction={() => handleClearSummaryAction(entry.id)}
              />
            ))}
          </div>
        )}
      </div>
      {statusDialogStrings ? (
        <ProcessingStatusDialog
          open={statusDialogState.isOpen}
          status={statusDialogState.status}
          title={statusDialogState.title}
          description={statusDialogState.description}
          progress={statusDialogState.progress}
          highlights={statusDialogState.highlights}
          donationPrompt={statusDialogState.donationPrompt}
          sharePrompt={statusDialogStrings.sharePrompt}
          actions={dialogActions}
          closeLabel={statusDialogStrings.closeLabel}
          onClose={handleDialogClose}
          analyticsContext={{ mode }}
        />
      ) : null}
      <NotificationContainer />
    </>
  );
}
