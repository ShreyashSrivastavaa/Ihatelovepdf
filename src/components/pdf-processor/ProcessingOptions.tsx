"use client";

import React from 'react';
import { PDFProcessingMode, PDFProcessingOptions } from '../../lib/pdf-processor';
import { useDictionary } from '../../i18n/LocaleProvider';

type ProcessingOptionsProps = {
  mode: PDFProcessingMode;
  options: PDFProcessingOptions;
  onOptionsChangeAction: (newOptions: PDFProcessingOptions) => void;
};

type OptionToggleProps = {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

type CompressionLevel = NonNullable<PDFProcessingOptions['compressionLevel']>;

const COMPRESSION_PRESETS: Record<CompressionLevel, Partial<PDFProcessingOptions>> = {
  low: {
    preserveMetadata: true,
    stripAnnotations: false,
    downscaleImages: false,
    downscaleImagesDpi: 150,
  },
  medium: {
    preserveMetadata: true,
    stripAnnotations: false,
    downscaleImages: true,
    downscaleImagesDpi: 150,
  },
  high: {
    preserveMetadata: false,
    stripAnnotations: true,
    downscaleImages: true,
    downscaleImagesDpi: 72,
  },
};

function OptionToggle({ label, description, checked, onChange }: OptionToggleProps) {
  return (
    <label className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-3.5 transition-all duration-150 hover:border-[var(--border-hover)] cursor-pointer shadow-xs">
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)] cursor-pointer"
        style={{ accentColor: 'var(--accent)' }}
        checked={checked}
        onChange={event => onChange(event.target.checked)}
      />
      <span className="flex flex-col">
        <span className="text-xs sm:text-sm font-semibold text-[var(--tx)]">{label}</span>
        {description ? (
          <span className="mt-0.5 text-xs text-[var(--tx-2)] leading-relaxed">{description}</span>
        ) : null}
      </span>
    </label>
  );
}

export default function ProcessingOptions({ mode, options, onOptionsChangeAction }: ProcessingOptionsProps) {
  const dictionary = useDictionary();
  const processingStrings = dictionary.components.processingOptions;
  const update = <K extends keyof PDFProcessingOptions>(
    k: K,
    v: PDFProcessingOptions[K]
  ) => onOptionsChangeAction({ ...options, [k]: v });

  if (mode === 'compress') {
    const compressStrings = processingStrings.compress;
    const currentLevel: CompressionLevel = options.compressionLevel ?? 'medium';
    const currentPreset = COMPRESSION_PRESETS[currentLevel];

    const removeMetadataSelected = options.preserveMetadata === false;
    const stripAnnotationsSelected = options.stripAnnotations === true;
    const downscaleSelected = options.downscaleImages === true;

    const downscaleLabel = downscaleSelected
      ? `${compressStrings.downscaleImages} (${options.downscaleImagesDpi ?? currentPreset.downscaleImagesDpi ?? 150} DPI)`
      : compressStrings.downscaleImages;

    const handleCompressionLevelChange = (level: CompressionLevel) => {
      const preset = COMPRESSION_PRESETS[level];
      onOptionsChangeAction({
        ...options,
        compressionLevel: level,
        preserveMetadata: preset.preserveMetadata,
        stripAnnotations: preset.stripAnnotations,
        downscaleImages: preset.downscaleImages,
        downscaleImagesDpi: preset.downscaleImagesDpi,
      });
    };

    const activeEnhancements = [
      removeMetadataSelected ? compressStrings.removeMetadata : null,
      stripAnnotationsSelected ? compressStrings.stripAnnotations : null,
      downscaleSelected ? downscaleLabel : null,
    ].filter(Boolean) as string[];

    return (
      <div className="mt-6 space-y-6 pt-4 border-t border-[var(--border)]">
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider">{compressStrings.title}</h3>
          <div
            className="grid gap-2.5 sm:grid-cols-3"
            role="radiogroup"
            aria-label={compressStrings.level}
          >
            {(['low', 'medium', 'high'] as const).map(level => {
              const selected = options.compressionLevel === level;
              return (
                <label
                  key={level}
                  className={`cursor-pointer rounded-xl border p-3.5 text-xs sm:text-sm transition-all duration-150 shadow-xs ${
                    selected
                      ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] font-semibold shadow-xs'
                      : 'border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx-2)] hover:border-[var(--border-hover)] hover:text-[var(--tx)]'
                  }`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-medium">{compressStrings.levels[level]}</span>
                    <input
                      type="radio"
                      className="sr-only"
                      name="compression-level"
                      checked={selected}
                      onChange={() => handleCompressionLevelChange(level)}
                    />
                    <span
                      aria-hidden
                      className={`h-2.5 w-2.5 rounded-full transition-colors ${
                        selected ? 'bg-[var(--accent)]' : 'border border-[var(--border)] bg-transparent'
                      }`}
                    />
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4 space-y-4">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-bold text-[var(--tx)]">{compressStrings.advancedTitle}</p>
            {activeEnhancements.length > 0 ? (
              <p className="text-xs font-medium text-[var(--accent)]">
                {compressStrings.activeLabel} {activeEnhancements.join(' • ')}
              </p>
            ) : (
              <p className="text-xs text-[var(--tx-3)]">{compressStrings.advancedDescription}</p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            <OptionToggle
              checked={removeMetadataSelected}
              label={compressStrings.removeMetadata}
              description={compressStrings.removeMetadataHint}
              onChange={value => update('preserveMetadata', value ? false : true)}
            />
            <OptionToggle
              checked={stripAnnotationsSelected}
              label={compressStrings.stripAnnotations}
              description={compressStrings.stripAnnotationsHint}
              onChange={value => update('stripAnnotations', value)}
            />
            <OptionToggle
              checked={downscaleSelected}
              label={downscaleLabel}
              description={compressStrings.downscaleHint}
              onChange={value =>
                onOptionsChangeAction({
                  ...options,
                  downscaleImages: value,
                  downscaleImagesDpi: value
                    ? options.downscaleImagesDpi ?? currentPreset.downscaleImagesDpi ?? 150
                    : undefined,
                })
              }
            />
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'merge') {
    const mergeStrings = processingStrings.merge;
    const metadataTitle = options.metadata?.title ?? '';
    const metadataAuthor = options.metadata?.author ?? '';
    const handleMetadataChange = (field: 'title' | 'author', value: string) => {
      const nextMeta = {
        ...options.metadata,
        [field]: value,
      };
      const cleanedEntries = Object.entries(nextMeta)
        .filter(([, val]) => typeof val === 'string' && val.length > 0);

      onOptionsChangeAction({
        ...options,
        metadata: cleanedEntries.length > 0
          ? (Object.fromEntries(cleanedEntries) as Record<string, string>)
          : undefined,
      });
    };

    return (
      <div className="mt-6 space-y-4 pt-4 border-t border-[var(--border)]">
        <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider">{mergeStrings.title}</h3>
        <div>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
              style={{ accentColor: 'var(--accent)' }}
              checked={options.addPageDividers ?? false}
              onChange={e => update('addPageDividers', e.target.checked)}
            />
            <span className="text-xs sm:text-sm font-medium text-[var(--tx)]">{mergeStrings.pageDivider}</span>
          </label>
        </div>
        <div className="space-y-3 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4">
          <p className="text-xs font-medium text-[var(--tx-2)]">{mergeStrings.metadataHint}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-[var(--tx-2)]" htmlFor="merge-metadata-title">
                {mergeStrings.metadataTitle}
              </label>
              <input
                id="merge-metadata-title"
                type="text"
                value={metadataTitle}
                onChange={event => handleMetadataChange('title', event.target.value)}
                className="input-modern w-full"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-[var(--tx-2)]" htmlFor="merge-metadata-author">
                {mergeStrings.metadataAuthor}
              </label>
              <input
                id="merge-metadata-author"
                type="text"
                value={metadataAuthor}
                onChange={event => handleMetadataChange('author', event.target.value)}
                className="input-modern w-full"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'split') {
    const splitStrings = processingStrings.split;
    return (
      <div className="mt-6 space-y-4 pt-4 border-t border-[var(--border)]">
        <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider">{splitStrings.title}</h3>
        <div className="space-y-1.5 max-w-xs">
          <label className="block text-xs sm:text-sm font-medium text-[var(--tx)]" htmlFor="split-pages-per-file">
            {splitStrings.pagesPerFile}
          </label>
          <input
            id="split-pages-per-file"
            type="number"
            min={1}
            className="input-modern w-full"
            value={options.pagesPerFile ?? 1}
            onChange={event => update('pagesPerFile', Math.max(1, Number(event.target.value) || 1))}
          />
          <p className="text-xs text-[var(--tx-3)]">{splitStrings.pagesPerFileHint}</p>
        </div>
      </div>
    );
  }

  if (mode === 'extract') {
    const extractStrings = processingStrings.extract;
    return (
      <div className="mt-6 space-y-4 pt-4 border-t border-[var(--border)]">
        <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider">{extractStrings.title}</h3>
        <OptionToggle
          checked={options.preserveMetadata !== false}
          label={extractStrings.preserveMetadata}
          description={extractStrings.preserveMetadataHint}
          onChange={value => update('preserveMetadata', value)}
        />
      </div>
    );
  }

  if (mode === 'crop') {
    const cropStrings = processingStrings.crop;
    return (
      <div className="mt-6 space-y-4 pt-4 border-t border-[var(--border)]">
        <OptionToggle
          checked={options.preserveMetadata !== false}
          label={cropStrings.preserveMetadata}
          description={cropStrings.preserveMetadataHint}
          onChange={value => update('preserveMetadata', value)}
        />
      </div>
    );
  }

  if (mode === 'reorder') {
    const reorderStrings = processingStrings.reorder;
    return (
      <div className="mt-6 space-y-1 pt-4 border-t border-[var(--border)]">
        <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider">{reorderStrings.title}</h3>
        <p className="text-xs text-[var(--tx-2)]">{reorderStrings.hint}</p>
      </div>
    );
  }

  if (mode === 'pdfToImages') {
    const exportStrings = processingStrings.pdfToImages;
    const currentFormat = options.imageOutputFormat ?? 'png';
    const zipSelected = options.bundleAsZip !== false;
    const quality = options.imageOutputQuality ?? 0.9;
    const dpi = options.imageRenderDpi ?? 144;
    const baseName = options.imageBaseName ?? '';

    return (
      <div className="mt-6 space-y-6 pt-4 border-t border-[var(--border)]">
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider">{exportStrings.title}</h3>
          <p className="text-xs text-[var(--tx-2)]">{exportStrings.formatHint}</p>
          <div className="flex flex-wrap gap-2.5 pt-1" role="radiogroup" aria-label={exportStrings.formatLabel}>
            {(['png', 'jpeg'] as const).map(format => {
              const selected = currentFormat === format;
              return (
                <label
                  key={format}
                  className={`cursor-pointer rounded-xl border px-4 py-2.5 text-xs sm:text-sm font-medium transition-all shadow-xs ${
                    selected
                      ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] font-semibold'
                      : 'border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx-2)] hover:border-[var(--border-hover)]'
                  }`}
                >
                  <input
                    type="radio"
                    name="image-format"
                    className="sr-only"
                    checked={selected}
                    onChange={() =>
                      onOptionsChangeAction({
                        ...options,
                        imageOutputFormat: format,
                        imageOutputQuality: format === 'jpeg' ? quality : undefined,
                      })
                    }
                  />
                  <span>{format === 'png' ? exportStrings.pngLabel : exportStrings.jpegLabel}</span>
                </label>
              );
            })}
          </div>
        </div>

        {currentFormat === 'jpeg' && (
          <div className="space-y-2 max-w-sm">
            <label className="flex items-center justify-between text-xs font-medium text-[var(--tx-2)]" htmlFor="jpeg-quality">
              <span>{exportStrings.qualityLabel}</span>
              <span className="rounded-md bg-[var(--accent-soft)] px-2 py-0.5 text-xs font-bold text-[var(--accent)] border border-[var(--accent-border)]">
                {Math.round((quality ?? 0.9) * 100)}%
              </span>
            </label>
            <input
              id="jpeg-quality"
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={quality}
              onChange={event => update('imageOutputQuality', Number(event.target.value))}
              className="w-full cursor-pointer"
            />
            <p className="text-xs text-[var(--tx-3)]">{exportStrings.qualityHint}</p>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-xs font-medium text-[var(--tx-2)]">{exportStrings.dpiLabel}</p>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={exportStrings.dpiLabel}>
            {([72, 144, 300] as const).map(preset => {
              const selected = dpi === preset;
              const presetLabel = preset === 72 ? exportStrings.dpiPresets.screen
                : preset === 144 ? exportStrings.dpiPresets.balanced
                  : exportStrings.dpiPresets.print;
              return (
                <label
                  key={preset}
                  className={`cursor-pointer rounded-xl border px-3.5 py-2 text-xs font-medium transition-all shadow-xs ${
                    selected
                      ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] font-semibold'
                      : 'border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx-2)] hover:border-[var(--border-hover)]'
                  }`}
                >
                  <input
                    type="radio"
                    name="render-dpi"
                    className="sr-only"
                    checked={selected}
                    onChange={() => update('imageRenderDpi', preset)}
                  />
                  <span>{presetLabel}</span>
                </label>
              );
            })}
          </div>
          <p className="text-xs text-[var(--tx-3)]">{exportStrings.dpiHint}</p>
        </div>

        <div className="space-y-3 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4">
          <OptionToggle
            checked={zipSelected}
            label={exportStrings.zipLabel}
            description={exportStrings.zipHint}
            onChange={value => update('bundleAsZip', value ? true : false)}
          />
          <div className="space-y-1">
            <label className="block text-xs font-medium text-[var(--tx-2)]" htmlFor="base-name">
              {exportStrings.baseNameLabel}
            </label>
            <input
              id="base-name"
              type="text"
              placeholder={exportStrings.baseNamePlaceholder}
              value={baseName}
              onChange={event => update('imageBaseName', event.target.value)}
              className="input-modern w-full"
            />
            <p className="text-xs text-[var(--tx-3)]">{exportStrings.baseNameHint}</p>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'imagesToPdf') {
    const layoutStrings = processingStrings.imagesToPdf;
    const currentFit = options.imageFit ?? 'contain';
    const currentSize = options.pageSize ?? 'auto';
    const currentOrientation = options.pageOrientation ?? 'auto';
    const margin = options.pageMarginPoints ?? 18;
    const backgroundColor = options.backgroundColor ?? '#ffffff';

    return (
      <div className="mt-6 space-y-6 pt-4 border-t border-[var(--border)]">
        <div>
          <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider">{layoutStrings.title}</h3>
          <p className="mt-1 text-xs text-[var(--tx-2)]">{layoutStrings.layoutTitle}</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-[var(--tx-2)]">{layoutStrings.fitLabel}</p>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={layoutStrings.fitLabel}>
            {(['contain', 'cover'] as const).map(fit => {
              const selected = currentFit === fit;
              return (
                <label
                  key={fit}
                  className={`cursor-pointer rounded-xl border px-3.5 py-2 text-xs font-medium transition-all shadow-xs ${
                    selected
                      ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] font-semibold'
                      : 'border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx-2)] hover:border-[var(--border-hover)]'
                  }`}
                >
                  <input
                    type="radio"
                    name="image-fit"
                    className="sr-only"
                    checked={selected}
                    onChange={() => update('imageFit', fit)}
                  />
                  <span>{layoutStrings.fitOptions[fit]}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-[var(--tx-2)]" htmlFor="page-size">
              {layoutStrings.sizeLabel}
            </label>
            <select
              id="page-size"
              className="input-modern w-full cursor-pointer"
              value={currentSize}
              onChange={event => update('pageSize', event.target.value as PDFProcessingOptions['pageSize'])}
            >
              {(Object.keys(layoutStrings.sizeOptions) as Array<'auto' | 'a4' | 'letter'>).map(key => (
                <option key={key} value={key}>
                  {layoutStrings.sizeOptions[key]}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-[var(--tx-2)]" htmlFor="page-orientation">
              {layoutStrings.orientationLabel}
            </label>
            <select
              id="page-orientation"
              className="input-modern w-full cursor-pointer"
              value={currentOrientation}
              onChange={event =>
                update('pageOrientation', event.target.value as PDFProcessingOptions['pageOrientation'])
              }
            >
              {(Object.keys(layoutStrings.orientationOptions) as Array<'auto' | 'portrait' | 'landscape'>).map(key => (
                <option key={key} value={key}>
                  {layoutStrings.orientationOptions[key]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-[var(--tx-2)]" htmlFor="page-margin">
              {layoutStrings.marginLabel}
            </label>
            <input
              id="page-margin"
              type="number"
              min={0}
              max={144}
              step={6}
              value={margin}
              onChange={event => update('pageMarginPoints', Math.max(0, Number(event.target.value) || 0))}
              className="input-modern w-full"
            />
            <p className="text-xs text-[var(--tx-3)]">{layoutStrings.marginHint}</p>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-[var(--tx-2)]" htmlFor="background-color">
              {layoutStrings.backgroundLabel}
            </label>
            <div className="flex items-center gap-2">
              <input
                id="background-color"
                type="color"
                value={backgroundColor}
                onChange={event => update('backgroundColor', event.target.value)}
                className="h-9 w-10 cursor-pointer rounded-lg border border-[var(--border)] bg-transparent p-0.5"
              />
              <input
                type="text"
                value={backgroundColor}
                onChange={event => update('backgroundColor', event.target.value)}
                className="input-modern flex-1"
              />
            </div>
            <p className="text-xs text-[var(--tx-3)]">{layoutStrings.backgroundHint}</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
