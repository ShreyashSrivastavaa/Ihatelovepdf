"use client";

import Image from 'next/image';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useDictionary } from '../../i18n/LocaleProvider';
import { getPdfPageCount, renderPdfThumbnail } from '../../lib/pdf-processor';
import { Trash2, GripVertical, ChevronUp, ChevronDown, Lock, Unlock, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

type FileListProps = {
  files: File[];
  onMoveFileAction?: (index: number, direction: 'up' | 'down') => void;
  onRemoveFileAction: (index: number) => void;
  onClearAllAction?: () => void;
  currentIndex?: number;
  onFileSelectAction?: (index: number) => void;
  onFileUnlockAction?: (index: number, password: string) => void;
};

export default function FileList({ 
  files, 
  onMoveFileAction, 
  onRemoveFileAction,
  onClearAllAction,
  currentIndex,
  onFileSelectAction,
  onFileUnlockAction,
}: FileListProps) {
  const dictionary = useDictionary();
  const fileListStrings = dictionary.components.fileList;
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [draggedOverItem, setDraggedOverItem] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const lastSwappedRef = useRef<{ from: number; to: number } | null>(null);

  // Password prompt state for encrypted files
  const [passwords, setPasswords] = useState<Record<number, string>>({});
  const [unlockedFiles, setUnlockedFiles] = useState<Record<number, boolean>>({});

  const previewsMapRef = useRef(new WeakMap<File, string>());
  const [, setPreviewsUpdated] = useState(0);
  const [pdfMetaState, setPdfMetaState] = useState<Record<string, { 
    thumbnail?: string; 
    pageCount?: number; 
    isEncrypted?: boolean;
    error?: boolean; 
    loading?: boolean; 
    loaded?: boolean 
  }>>({});
  const pdfMetaStateRef = useRef(pdfMetaState);

  const buildFileKey = useCallback((file: File) => `${file.name}_${file.size}_${file.lastModified}`, []);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, files.length);
  }, [files.length]);

  useEffect(() => {
    const filesSnapshot = [...files];
    const previewsMap = previewsMapRef.current;

    return () => {
      filesSnapshot.forEach(file => {
        const url = previewsMap.get(file);
        if (url) {
          URL.revokeObjectURL(url);
          previewsMap.delete(file);
        }
      });
    };
  }, [files, buildFileKey]);

  useEffect(() => {
    files.forEach(file => {
      if (isImageFile(file) && !previewsMapRef.current.has(file)) {
        const url = URL.createObjectURL(file);
        previewsMapRef.current.set(file, url);
        setPreviewsUpdated(prev => prev + 1);
      }
    });
  }, [files]);

  const isPdfFile = (file: File): boolean => {
    if (file.type === 'application/pdf') return true;
    return file.name.toLowerCase().endsWith('.pdf');
  };

  const isImageFile = (file: File): boolean => {
    const imageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/tiff'];
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif'];
    if (imageTypes.includes(file.type)) return true;
    const fileName = file.name.toLowerCase();
    return imageExtensions.some(ext => fileName.endsWith(ext));
  };

  useEffect(() => {
    setPdfMetaState(prev => {
      const next: typeof prev = {};
      files.forEach(file => {
        const key = buildFileKey(file);
        if (prev[key]) {
          next[key] = prev[key];
        }
      });

      const prevKeys = Object.keys(prev);
      const nextKeys = Object.keys(next);
      if (prevKeys.length === nextKeys.length && nextKeys.every(key => prev[key] === next[key])) {
        return prev;
      }

      return next;
    });
  }, [files, buildFileKey]);

  useEffect(() => {
    pdfMetaStateRef.current = pdfMetaState;
  }, [pdfMetaState]);

  useEffect(() => {
    let cancelled = false;

    const loadPdfMeta = async (file: File, key: string) => {
      try {
        const [thumbnail, pageCount] = await Promise.all([
          renderPdfThumbnail(file, 1).catch((err: unknown) => {
            const isPassword = String(err).toLowerCase().includes('password') || String(err).toLowerCase().includes('encrypted');
            if (isPassword) {
              setPdfMetaState(prev => ({
                ...prev,
                [key]: { ...prev[key], isEncrypted: true, loading: false, loaded: true }
              }));
            }
            return undefined;
          }),
          getPdfPageCount(file).catch(() => undefined),
        ]);

        if (cancelled) return;

        setPdfMetaState(prev => ({
          ...prev,
          [key]: {
            ...prev[key],
            thumbnail: thumbnail ?? prev[key]?.thumbnail,
            pageCount: pageCount ?? prev[key]?.pageCount,
            error: undefined,
            loading: false,
            loaded: true,
          },
        }));
      } catch {
        if (cancelled) return;

        setPdfMetaState(prev => ({
          ...prev,
          [key]: {
            ...prev[key],
            error: true,
            loading: false,
            loaded: true,
          },
        }));
      }
    };

    files.forEach(file => {
      if (!isPdfFile(file)) return;

      const key = buildFileKey(file);
      const entry = pdfMetaStateRef.current[key];
      if (entry?.loading || entry?.loaded) return;

      setPdfMetaState(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          loading: true,
          loaded: prev[key]?.loaded ?? false,
        },
      }));

      void loadPdfMeta(file, key);
    });

    return () => {
      cancelled = true;
    };
  }, [files, buildFileKey]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const truncateFilename = (filename: string, maxLength: number = 32): string => {
    if (filename.length <= maxLength) return filename;
    const lastDotIndex = filename.lastIndexOf('.');
    const extension = lastDotIndex !== -1 ? filename.substring(lastDotIndex) : '';
    const nameWithoutExtension = lastDotIndex !== -1 ? filename.substring(0, lastDotIndex) : filename;
    const availableChars = maxLength - 3 - extension.length;
    const startChars = Math.ceil(availableChars * 0.6);
    const endChars = availableChars - startChars;
    return `${nameWithoutExtension.substring(0, startChars)}...${nameWithoutExtension.substring(nameWithoutExtension.length - endChars)}${extension}`;
  };

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.stopPropagation();
    setIsDragging(true);
    setDraggedItem(index);
    if (itemRefs.current[index]) {
      itemRefs.current[index]?.classList.add('opacity-50', 'scale-[0.98]');
    }
    e.dataTransfer.effectAllowed = 'move';
    lastSwappedRef.current = null;
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    if (!isDragging || draggedItem === null || draggedItem === index) return;
    setDraggedOverItem(index);

    if (lastSwappedRef.current && 
        lastSwappedRef.current.from === draggedItem && 
        lastSwappedRef.current.to === index) {
      return;
    }

    const targetRect = e.currentTarget.getBoundingClientRect();
    const targetMidY = targetRect.top + targetRect.height / 2;
    const shouldReorder = 
      (draggedItem < index && e.clientY > targetMidY) || 
      (draggedItem > index && e.clientY < targetMidY);

    if (shouldReorder && onMoveFileAction) {
      lastSwappedRef.current = { from: draggedItem, to: index };
      if (draggedItem < index) {
        onMoveFileAction(draggedItem, 'down');
        setDraggedItem(draggedItem + 1);
      } else {
        onMoveFileAction(draggedItem, 'up');
        setDraggedItem(draggedItem - 1);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    setDraggedOverItem(null);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedItem(null);
    setDraggedOverItem(null);
    lastSwappedRef.current = null;
    itemRefs.current.forEach(item => {
      item?.classList.remove('opacity-50', 'scale-[0.98]');
    });
  };

  const totalBytes = files.reduce((acc, f) => acc + f.size, 0);

  const handleUnlockSubmit = (e: React.FormEvent, index: number) => {
    e.preventDefault();
    const password = passwords[index];
    if (!password) return;
    if (onFileUnlockAction) {
      onFileUnlockAction(index, password);
    }
    setUnlockedFiles(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="w-full space-y-3">
      {/* File List Header */}
      <div className="flex items-center justify-between px-1 text-xs text-[var(--tx-2)]">
        <div className="flex items-center gap-2 font-semibold">
          <span>Files ({files.length})</span>
          <span>&bull;</span>
          <span>Total {formatFileSize(totalBytes)}</span>
        </div>

        {onClearAllAction && files.length > 1 && (
          <button
            type="button"
            onClick={onClearAllAction}
            className="inline-flex items-center gap-1 text-[var(--err)] hover:underline font-semibold cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      {/* List Container */}
      <ul 
        ref={listRef}
        className="space-y-2.5 max-h-[380px] overflow-y-auto overflow-x-hidden scrollbar-thin pr-1"
        aria-label="Uploaded file list"
      >
        {files.map((file, index) => {
          const isImage = isImageFile(file);
          const previewUrl = isImage ? previewsMapRef.current.get(file) : null;
          const isPdf = isPdfFile(file);
          const fileKey = buildFileKey(file);
          const pdfMeta = isPdf ? pdfMetaState[fileKey] : undefined;
          const pdfThumbnail = pdfMeta?.thumbnail;
          const pageCount = isPdf && typeof pdfMeta?.pageCount === 'number' ? pdfMeta.pageCount : undefined;
          const isEncrypted = pdfMeta?.isEncrypted;
          const isSelected = currentIndex === index;

          return (
            <li 
              key={`${file.name}-${index}`}
              ref={el => {
                itemRefs.current[index] = el;
              }}
              className={`relative flex flex-col p-3 rounded-2xl border transition-all duration-200 ${
                isSelected 
                  ? 'border-[var(--accent)] bg-[var(--accent-soft)]/50 ring-1 ring-[var(--accent)]' 
                  : 'border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] shadow-xs'
              } ${draggedItem === index ? 'opacity-50' : ''} ${draggedOverItem === index ? 'ring-2 ring-[var(--accent)]' : ''}`}
              draggable={Boolean(onMoveFileAction)}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
              onClick={() => onFileSelectAction && onFileSelectAction(index)}
            >
              <div className="flex items-center justify-between gap-3">
                {/* Drag Handle & Order Badge */}
                <div className="flex items-center gap-2">
                  {onMoveFileAction && (
                    <div 
                      className="cursor-grab active:cursor-grabbing text-[var(--tx-3)] hover:text-[var(--accent)] p-1 rounded-lg hover:bg-[var(--bg-subtle)]"
                      title="Drag to reorder"
                    >
                      <GripVertical className="h-4 w-4" />
                    </div>
                  )}

                  {files.length > 1 && (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--bg-subtle)] text-[10px] font-bold text-[var(--tx-2)]">
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Thumbnail Preview */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] overflow-hidden shadow-xs">
                  {isImage && previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt={file.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  ) : isPdf && pdfThumbnail ? (
                    <Image
                      src={pdfThumbnail}
                      alt={file.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  ) : isEncrypted ? (
                    <Lock className="h-5 w-5 text-[var(--warning)]" />
                  ) : (
                    <FileText className="h-5 w-5 text-[var(--accent)]" />
                  )}
                </div>

                {/* File Details */}
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="font-semibold text-xs sm:text-sm text-[var(--tx)] truncate" title={file.name}>
                    {truncateFilename(file.name)}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--tx-3)]">
                    <span className="font-medium">{formatFileSize(file.size)}</span>
                    {pageCount !== undefined && (
                      <>
                        <span>&bull;</span>
                        <span className="font-medium text-[var(--tx-2)]">{pageCount} {pageCount === 1 ? 'page' : 'pages'}</span>
                      </>
                    )}
                    {isEncrypted && (
                      <>
                        <span>&bull;</span>
                        <span className="text-[var(--warning)] font-semibold flex items-center gap-1">
                          <Lock className="h-3 w-3" /> Password-protected
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Reorder Buttons & Remove Action */}
                <div className="flex items-center gap-1">
                  {onMoveFileAction && files.length > 1 && (
                    <>
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (index > 0) onMoveFileAction(index, 'up');
                        }}
                        className="p-1.5 rounded-lg text-[var(--tx-3)] hover:text-[var(--tx)] hover:bg-[var(--bg-subtle)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Move up"
                      >
                        <ChevronUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        disabled={index === files.length - 1}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (index < files.length - 1) onMoveFileAction(index, 'down');
                        }}
                        className="p-1.5 rounded-lg text-[var(--tx-3)] hover:text-[var(--tx)] hover:bg-[var(--bg-subtle)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Move down"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const previewUrl = previewsMapRef.current.get(file);
                      if (previewUrl) {
                        URL.revokeObjectURL(previewUrl);
                        previewsMapRef.current.delete(file);
                      }
                      onRemoveFileAction(index);
                    }}
                    className="p-1.5 rounded-lg text-[var(--tx-3)] hover:text-[var(--err)] hover:bg-[var(--err-soft)] transition-colors cursor-pointer"
                    title={fileListStrings.remove}
                    aria-label={`Remove ${file.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Inline Password Unlock Form for Encrypted Files */}
              {isEncrypted && !unlockedFiles[index] && (
                <form
                  onSubmit={(e) => handleUnlockSubmit(e, index)}
                  className="mt-2.5 pt-2.5 border-t border-[var(--border)] flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2 flex-1">
                    <Lock className="h-4 w-4 text-[var(--warning)] shrink-0" />
                    <input
                      type="password"
                      placeholder="Enter password to unlock..."
                      value={passwords[index] || ''}
                      onChange={(e) => setPasswords(prev => ({ ...prev, [index]: e.target.value }))}
                      className="input-modern py-1.5 px-3 text-xs flex-1"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary py-1.5 px-3 rounded-lg text-xs font-semibold text-white flex items-center justify-center gap-1.5"
                  >
                    <Unlock className="h-3.5 w-3.5" />
                    <span>Unlock</span>
                  </button>
                </form>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
