"use client";

import React, { useState, useRef, useCallback } from 'react';
import { useDictionary } from '../../i18n/LocaleProvider';
import { trackEvent } from '../../lib/analytics';
import { Upload, FileText, Image as ImageIcon, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

type FileUploaderProps = {
  onFilesSelectedAction: (files: File[]) => void;
  acceptedFileTypes?: string;
  maxFileSizeMB?: number;
  multiple?: boolean;
  acceptImages?: boolean;
};

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
  const inputRef = useRef<HTMLInputElement>(null);

  const fileTypes = acceptedFileTypes || (acceptImages
    ? ".jpg,.jpeg,.png,.webp,.tiff,.tif"
    : "application/pdf");

  const fileTypesLabel = acceptImages
    ? uploaderStrings.accepted.images
    : uploaderStrings.accepted.pdf;

  const maxFileSize = maxFileSizeMB * 1024 * 1024;

  const validateFiles = useCallback((files: File[]) => {
    if (files.length === 0) return null;

    const invalidType = files.find(file => {
      if (acceptImages) {
        const validExts = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif'];
        const fileName = file.name.toLowerCase();
        return !validExts.some(ext => fileName.endsWith(ext)) &&
          !file.type.startsWith('image/');
      } else {
        return file.type !== 'application/pdf' &&
          !file.name.toLowerCase().endsWith('.pdf');
      }
    });

    if (invalidType) {
      trackEvent({
        action: 'file_validation_error',
        category: 'file_upload',
        label: acceptImages ? 'images' : 'pdf',
        params: { reason: 'invalid_type' },
      });
      return errors.invalidType(invalidType.name, fileTypesLabel);
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
  }, [acceptImages, errors, fileTypesLabel, maxFileSize, maxFileSizeMB]);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const validationError = validateFiles(fileArray);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);

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
  }, [handleFiles]);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={`upload-area-container relative group cursor-pointer p-8 sm:p-12 text-center border-2 transition-all duration-200 ${
          dragActive ? 'upload-area-active' : 'border-[var(--border)] hover:border-[var(--accent)] hover:shadow-lg'
        } ${error ? 'border-[var(--err)] bg-[var(--err-soft)]' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleButtonClick}
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
          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border transition-all duration-300 ${
            dragActive 
              ? 'border-[var(--accent)] bg-[var(--accent)] text-white scale-110 shadow-md' 
              : 'border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--tx-2)] group-hover:scale-105 group-hover:border-[var(--accent-border)] group-hover:text-[var(--accent)] group-hover:bg-[var(--accent-soft)]'
          }`}>
            {acceptImages ? (
              <ImageIcon className="h-8 w-8 stroke-[1.5]" />
            ) : dragActive ? (
              <Sparkles className="h-8 w-8 stroke-[1.5] animate-spin-slow" />
            ) : (
              <Upload className="h-8 w-8 stroke-[1.5]" />
            )}
          </div>

          <div className="space-y-1.5 max-w-md mx-auto">
            <p className="text-base font-semibold text-[var(--tx)] group-hover:text-[var(--accent)] transition-colors">
              <span>{uploaderStrings.clickToSelect}</span>{' '}
              <span className="font-normal text-[var(--tx-2)]">
                {uploaderStrings.orDrop(acceptImages ? 'images' : 'pdf')}
              </span>
            </p>

            <p className="text-xs text-[var(--tx-3)] font-medium tracking-wide">
              {acceptImages ? uploaderStrings.accepted.images : uploaderStrings.accepted.pdf} &bull; Max {maxFileSizeMB}MB
            </p>
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
        <div className="mt-3 flex items-center gap-2 text-sm text-[var(--err)] bg-[var(--err-soft)] px-4 py-2.5 rounded-lg border border-[var(--err)]/20 animate-fade-in">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
