"use client";

import React, { useState, useRef, useCallback } from 'react';
import { useDictionary } from '../../i18n/LocaleProvider';
import { trackEvent } from '../../lib/analytics';
import { Upload, Image as ImageIcon, ShieldCheck, AlertCircle, AlertTriangle, Sparkles } from 'lucide-react';

type FileUploaderProps = {
  onFilesSelectedAction: (files: File[]) => void;
  acceptedFileTypes?: string;
  maxFileSizeMB?: number;
  multiple?: boolean;
  acceptImages?: boolean;
};

const LARGE_FILE_THRESHOLD_BYTES = 100 * 1024 * 1024; // 100MB

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export default function FileUploader({
  onFilesSelectedAction,
  acceptedFileTypes,
  maxFileSizeMB = 2000,
  multiple = true,
  acceptImages = false
}: FileUploaderProps) {
  const dictionary = useDictionary();
  const uploaderStrings = dictionary.components.fileUploader;
  const { errors } = uploaderStrings;
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [largeFileWarning, setLargeFileWarning] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fileTypes = acceptedFileTypes || (acceptImages
    ? ".jpg,.jpeg,.png,.webp,.tiff,.tif"
    : "application/pdf,.pdf");

  const fileTypesLabel = acceptImages
    ? uploaderStrings.accepted.images
    : uploaderStrings.accepted.pdf;

  const maxFileSize = maxFileSizeMB * 1024 * 1024;

  const validateFiles = useCallback((files: File[]) => {
    if (files.length === 0) return null;

    const invalidType = files.find(file => {
      const fileName = file.name.toLowerCase();
      if (acceptedFileTypes) {
        const allowed = acceptedFileTypes.split(',').map(s => s.trim().toLowerCase());
        return !allowed.some(rule => {
          if (rule.startsWith('.')) {
            return fileName.endsWith(rule);
          }
          return file.type === rule || file.type.startsWith(rule.replace('/*', ''));
        });
      }
      if (acceptImages) {
        const validExts = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif', '.bmp', '.svg'];
        return !validExts.some(ext => fileName.endsWith(ext)) &&
          !file.type.startsWith('image/');
      } else {
        return !fileName.endsWith('.pdf') &&
          file.type !== 'application/pdf' &&
          !file.type.includes('pdf');
      }
    });

    if (invalidType) {
      const fileExt = invalidType.name.includes('.')
        ? `.${invalidType.name.split('.').pop()}`
        : 'unknown format';

      trackEvent({
        action: 'file_validation_error',
        category: 'file_upload',
        label: acceptImages ? 'images' : 'pdf',
        params: { reason: 'invalid_type', attempted_ext: fileExt },
      });

      if (acceptedFileTypes) {
        return `Unsupported file format ("${invalidType.name}"). Please upload: ${acceptedFileTypes}`;
      }
      if (acceptImages) {
        return `This tool requires image files (JPG, PNG, WebP) — you added a ${fileExt} file ("${invalidType.name}").`;
      }
      return `This tool requires a PDF file — you added a ${fileExt} file ("${invalidType.name}").`;
    }

    const oversizedFile = files.find(file => file.size > maxFileSize);
    if (oversizedFile) {
      trackEvent({
        action: 'file_validation_error',
        category: 'file_upload',
        label: acceptImages ? 'images' : 'pdf',
        params: {
          reason: 'too_large',
          max_bytes: maxFileSize,
          attempted_bytes: oversizedFile.size,
        },
      });
      return errors.tooLarge(oversizedFile.name, maxFileSizeMB);
    }

    return null;
  }, [acceptImages, acceptedFileTypes, errors, maxFileSize, maxFileSizeMB]);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const validationError = validateFiles(fileArray);

    if (validationError) {
      setError(validationError);
      setLargeFileWarning(null);
      return;
    }

    setError(null);

    // Check for large files warning (>100MB)
    const largeFiles = fileArray.filter(f => f.size > LARGE_FILE_THRESHOLD_BYTES);
    if (largeFiles.length > 0) {
      const names = largeFiles.map(f => `${f.name} (${formatBytes(f.size)})`).join(', ');
      setLargeFileWarning(
        `Large file detected: ${names}. Client-side browser processing may require extra memory and time.`
      );
    } else {
      setLargeFileWarning(null);
    }

    const totalBytes = fileArray.reduce((sum, file) => sum + file.size, 0);
    trackEvent({
      action: 'file_upload',
      category: 'file_upload',
      label: acceptImages ? 'images' : 'pdf',
      params: {
        file_count: fileArray.length,
        total_bytes: totalBytes,
        multiple: multiple ? 1 : 0,
      },
    });
    onFilesSelectedAction(fileArray);
  }, [acceptImages, multiple, onFilesSelectedAction, validateFiles]);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const { files } = e.dataTransfer;
    handleFiles(files);
  }, [handleFiles]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    handleFiles(files);
    // Reset file input value so selecting the same file again triggers change
    e.target.value = '';
  }, [handleFiles]);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full space-y-3">
      <div
        className={`upload-area-container relative group cursor-pointer p-8 sm:p-14 text-center rounded-3xl border-2 border-dashed transition-all duration-300 ${
          dragActive
            ? 'border-[var(--accent)] bg-[var(--accent-soft)] ring-4 ring-[var(--accent-border)] scale-[1.01] shadow-xl'
            : 'border-[var(--border)] bg-[var(--bg-card)]/50 hover:border-[var(--accent)] hover:bg-[var(--bg-card)] hover:shadow-lg'
        } ${error ? 'border-[var(--err)] bg-[var(--err-soft)]' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleButtonClick}
        role="button"
        tabIndex={0}
        aria-label="Upload files area"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleButtonClick();
          }
        }}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={fileTypes}
          multiple={multiple}
          onChange={handleChange}
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div
            className={`flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl border transition-all duration-300 ${
              dragActive
                ? 'border-[var(--accent)] bg-[var(--accent)] text-white scale-110 shadow-lg animate-pulse'
                : 'border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--tx-2)] group-hover:scale-105 group-hover:border-[var(--accent-border)] group-hover:text-[var(--accent)] group-hover:bg-[var(--accent-soft)]'
            }`}
          >
            {acceptImages ? (
              <ImageIcon className="h-8 w-8 sm:h-10 sm:w-10 stroke-[1.5]" />
            ) : dragActive ? (
              <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 stroke-[1.5]" />
            ) : (
              <Upload className="h-8 w-8 sm:h-10 sm:w-10 stroke-[1.5]" />
            )}
          </div>

          <div className="space-y-1.5 max-w-md mx-auto">
            <p className="text-base sm:text-lg font-bold text-[var(--tx)] group-hover:text-[var(--accent)] transition-colors">
              <span>{uploaderStrings.clickToSelect}</span>{' '}
              <span className="font-normal text-[var(--tx-2)] hidden sm:inline">
                {uploaderStrings.orDrop(acceptImages ? 'images' : 'pdf')}
              </span>
            </p>

            <p className="text-xs sm:text-sm text-[var(--tx-3)] font-medium">
              {fileTypesLabel} &bull; Max {maxFileSizeMB}MB
            </p>
          </div>

          <div className="pt-2 w-full max-w-[260px] sm:hidden">
            <button
              type="button"
              className="btn-primary w-full py-3 text-sm font-semibold min-h-[44px] rounded-xl shadow-sm flex items-center justify-center gap-2"
            >
              <Upload className="h-4 w-4" />
              <span>{uploaderStrings.clickToSelect}</span>
            </button>
          </div>

          <div className="pt-2 flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] text-xs text-[var(--tx-2)] font-medium group-hover:border-[var(--accent-border)] transition-colors">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--success)]" />
              End-to-End Local Execution
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2.5 text-sm text-[var(--err)] bg-[var(--err-soft)] px-4 py-3 rounded-xl border border-[var(--err)]/30 animate-in fade-in duration-200"
        >
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{error}</div>
        </div>
      )}

      {largeFileWarning && (
        <div
          role="status"
          className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--warning)] bg-[var(--warning-soft)] px-4 py-3 rounded-xl border border-[var(--warning)]/30 animate-in fade-in duration-200"
        >
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5 text-[var(--warning)]" />
          <div className="flex-1 leading-relaxed">{largeFileWarning}</div>
        </div>
      )}
    </div>
  );
}
