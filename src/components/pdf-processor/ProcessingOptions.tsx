import React, { useState } from 'react';
import { PDFProcessingMode, PDFProcessingOptions } from '../../lib/pdf-processor';
import { useDictionary } from '../../i18n/LocaleProvider';
import OptionLivePreview from './OptionLivePreview';
import {
  Image as ImageIcon,
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Sliders,
  Code,
  Table,
  Receipt,
  Type,
  Hash,
  Palette,
  Info,
  Scissors,
  Layers,
  CheckSquare,
} from 'lucide-react';

type ProcessingOptionsProps = {
  mode: PDFProcessingMode;
  options: PDFProcessingOptions;
  onOptionsChangeAction: (newOptions: PDFProcessingOptions) => void;
  file?: File | null;
};

type CompressionLevel = NonNullable<PDFProcessingOptions['compressionLevel']>;

const COMPRESSION_PRESETS: Record<CompressionLevel, Partial<PDFProcessingOptions>> = {
  low: {
    preserveMetadata: true,
    stripAnnotations: false,
    downscaleImages: true,
    downscaleImagesDpi: 200,
  },
  medium: {
    preserveMetadata: false,
    stripAnnotations: false,
    downscaleImages: true,
    downscaleImagesDpi: 120,
  },
  high: {
    preserveMetadata: false,
    stripAnnotations: true,
    downscaleImages: true,
    downscaleImagesDpi: 72,
  },
};

export default function ProcessingOptions({
  mode,
  options,
  onOptionsChangeAction,
  file,
}: ProcessingOptionsProps) {
  const dictionary = useDictionary();
  const processingStrings = dictionary.components.processingOptions;
  const update = <K extends keyof PDFProcessingOptions>(
    k: K,
    v: PDFProcessingOptions[K]
  ) => onOptionsChangeAction({ ...options, [k]: v });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOwnerPassword, setShowOwnerPassword] = useState(false);
  const [showAdvancedSecurity, setShowAdvancedSecurity] = useState(false);

  const evaluatePasswordStrength = (pwd: string) => {
    if (!pwd) {
      return {
        score: 0,
        label: 'Enter a password',
        color: 'bg-[var(--border)]',
        textColor: 'text-[var(--tx-3)]',
        percent: 0,
        checks: {
          length: false,
          long: false,
          upper: false,
          lower: false,
          number: false,
          special: false,
        },
      };
    }

    const checks = {
      length: pwd.length >= 8,
      long: pwd.length >= 12,
      upper: /[A-Z]/.test(pwd),
      lower: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[^A-Za-z0-9]/.test(pwd),
    };

    let points = 0;
    if (checks.length) points += 1;
    if (checks.long) points += 1;
    if (checks.upper && checks.lower) points += 1;
    if (checks.number) points += 1;
    if (checks.special) points += 1;

    if (points <= 1) {
      return {
        score: 1,
        label: 'Weak',
        color: 'bg-red-500',
        textColor: 'text-red-500',
        percent: 25,
        checks,
      };
    }
    if (points <= 2) {
      return {
        score: 2,
        label: 'Fair',
        color: 'bg-amber-500',
        textColor: 'text-amber-500',
        percent: 50,
        checks,
      };
    }
    if (points <= 4) {
      return {
        score: 3,
        label: 'Strong',
        color: 'bg-blue-500',
        textColor: 'text-blue-500',
        percent: 75,
        checks,
      };
    }
    return {
      score: 4,
      label: 'Very Strong',
      color: 'bg-emerald-500',
      textColor: 'text-emerald-500',
      percent: 100,
      checks,
    };
  };

  // 1. COMPRESS MODE
  if (mode === 'compress') {
    const compressStrings = processingStrings.compress;
    const currentLevel: CompressionLevel = options.compressionLevel ?? 'medium';

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

    return (
      <div className="mt-6 space-y-6 pt-4 border-t border-[var(--border)]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider">
              {compressStrings.title}
            </h3>
            <p className="mt-1 text-xs text-[var(--tx-2)]">{compressStrings.level}</p>
          </div>
          <span
            className="inline-flex items-center gap-1 text-[11px] text-[var(--tx-3)] cursor-help"
            title="Extreme compression downscales images to 72 DPI and removes annotations for maximum file size savings."
          >
            <Info className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span>Preset trade-offs</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label={compressStrings.title}>
          {(['low', 'medium', 'high'] as const).map((level) => {
            const selected = currentLevel === level;
            return (
              <label
                key={level}
                className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 shadow-xs ${
                  selected
                    ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] ring-1 ring-[var(--accent)]'
                    : 'border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx)] hover:border-[var(--border-hover)]'
                }`}
              >
                <input
                  type="radio"
                  name="compression-level"
                  className="sr-only"
                  checked={selected}
                  onChange={() => handleCompressionLevelChange(level)}
                />
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold capitalize">{compressStrings.levels[level]}</span>
                    {level === 'high' && (
                      <span className="px-1.5 py-0.5 rounded-full bg-[var(--accent)] text-white text-[10px] font-bold">
                        Smallest
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[var(--tx-2)] leading-relaxed">
                    {level === 'low'
                      ? 'Light compression, preserves maximum visual fidelity (200 DPI)'
                      : level === 'medium'
                      ? 'Optimal balance of compact file size & document sharpness (120 DPI)'
                      : 'Extreme compression for email & portal limits (72 DPI)'}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. SPLIT MODE
  if (mode === 'split') {
    const splitStrategy = options.splitMode === 'pageNumbers' ? 'ranges' : (options.splitMode || 'customPages');
    const pageRangeVal = options.pageRange || '';
    const pagesPerFileVal = options.pagesPerFile || 1;

    return (
      <div className="mt-6 space-y-6 pt-4 border-t border-[var(--border)]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider flex items-center gap-2">
              <Scissors className="h-4 w-4 text-[var(--accent)]" />
              Split Mode &amp; Page Selection
            </h3>
            <p className="mt-1 text-xs text-[var(--tx-2)]">
              Choose how you want to split your PDF: pick specific pages visually below, set custom ranges, or split by page count.
            </p>
          </div>
        </div>

        {/* Strategy Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Split Method">
          <label
            className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 shadow-xs ${
              splitStrategy === 'customPages'
                ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] ring-1 ring-[var(--accent)]'
                : 'border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx)] hover:border-[var(--border-hover)]'
            }`}
          >
            <input
              type="radio"
              name="split-strategy"
              className="sr-only"
              checked={splitStrategy === 'customPages'}
              onChange={() => {
                onOptionsChangeAction({
                  ...options,
                  splitMode: 'pageNumbers',
                  pageRange: undefined,
                });
              }}
            />
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                <span className="text-sm font-bold">Visual Page Picker</span>
              </div>
              <span className="text-[11px] text-[var(--tx-2)] leading-tight">
                Click pages in the grid below to choose which pages to split out.
              </span>
            </div>
          </label>

          <label
            className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 shadow-xs ${
              splitStrategy === 'ranges'
                ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] ring-1 ring-[var(--accent)]'
                : 'border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx)] hover:border-[var(--border-hover)]'
            }`}
          >
            <input
              type="radio"
              name="split-strategy"
              className="sr-only"
              checked={splitStrategy === 'ranges'}
              onChange={() => {
                onOptionsChangeAction({
                  ...options,
                  splitMode: 'pageNumbers',
                  pageRange: pageRangeVal || '1-2, 3-5',
                });
              }}
            />
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <span className="text-sm font-bold">Custom Page Ranges</span>
              </div>
              <span className="text-[11px] text-[var(--tx-2)] leading-tight">
                Define split ranges (e.g. 1-3, 4-5, 6) into separate PDF files.
              </span>
            </div>
          </label>

          <label
            className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 shadow-xs ${
              splitStrategy === 'pageCount'
                ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] ring-1 ring-[var(--accent)]'
                : 'border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx)] hover:border-[var(--border-hover)]'
            }`}
          >
            <input
              type="radio"
              name="split-strategy"
              className="sr-only"
              checked={splitStrategy === 'pageCount'}
              onChange={() => {
                onOptionsChangeAction({
                  ...options,
                  splitMode: 'pageCount',
                  pagesPerFile: 1,
                  pageRange: undefined,
                });
              }}
            />
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <Scissors className="h-4 w-4" />
                <span className="text-sm font-bold">Fixed Page Interval</span>
              </div>
              <span className="text-[11px] text-[var(--tx-2)] leading-tight">
                Split into single pages or every N pages per output file.
              </span>
            </div>
          </label>
        </div>

        {/* Dynamic Controls based on selected strategy */}
        {splitStrategy === 'ranges' && (
          <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-3">
            <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider block">
              Enter Split Ranges
            </span>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--tx)]">Page Ranges (comma-separated)</label>
              <input
                type="text"
                value={pageRangeVal}
                onChange={(e) => update('pageRange', e.target.value)}
                className="input-modern w-full font-mono text-sm"
                placeholder="e.g. 1-3, 4-6, 7-10"
              />
              <p className="text-[11px] text-[var(--tx-3)]">
                Example: <code className="px-1 py-0.5 rounded bg-[var(--bg-card-hover)]">1-2, 3-5</code> will split into two PDF documents: one with pages 1 to 2 and one with pages 3 to 5.
              </p>
            </div>
          </div>
        )}

        {splitStrategy === 'pageCount' && (
          <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-3">
            <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider block">
              Split Interval
            </span>
            <div className="flex items-center gap-4">
              <label className="text-xs font-semibold text-[var(--tx)]">Pages per Split Document:</label>
              <input
                type="number"
                min={1}
                max={500}
                value={pagesPerFileVal}
                onChange={(e) => update('pagesPerFile', Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="input-modern w-28 text-center font-bold text-sm"
              />
              <span className="text-xs text-[var(--tx-3)]">
                {pagesPerFileVal === 1 ? '(Creates a separate PDF for each single page)' : `(Splits into chunks of ${pagesPerFileVal} pages each)`}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. WATERMARK MODE
  if (mode === 'watermark') {
    const wm = options.watermark || {};
    const updateWm = (partial: Partial<typeof wm>) => {
      update('watermark', { ...wm, ...partial });
    };

    const currentText = wm.watermarkText ?? 'CONFIDENTIAL';
    const currentOpacity = wm.watermarkOpacity ?? 0.35;
    const currentRotation = wm.watermarkRotation ?? 45;
    const currentPosition = wm.watermarkPosition ?? 'center';
    const currentFontSize = wm.watermarkFontSize ?? 48;
    const currentColor = wm.watermarkColor ?? '#ff0000';

    return (
      <div className="mt-6 space-y-6 pt-4 border-t border-[var(--border)]">
        <div>
          <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider flex items-center gap-2">
            <Palette className="h-4 w-4 text-[var(--accent)]" />
            Watermark Customization
          </h3>
          <p className="mt-1 text-xs text-[var(--tx-2)]">
            Configure custom text, styling, rotation angle, opacity, and page placement with real-time preview.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-5">
            {/* Content Group */}
            <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-3">
              <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider block">
                1. Watermark Content
              </span>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--tx)]">Watermark Text</label>
                <input
                  type="text"
                  value={currentText}
                  onChange={(e) => updateWm({ watermarkText: e.target.value })}
                  className="input-modern w-full font-bold text-xs sm:text-sm"
                  placeholder="CONFIDENTIAL, DRAFT, DO NOT COPY"
                />
              </div>
            </div>

            {/* Position Group */}
            <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-3">
              <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider block">
                2. Position &amp; Layout
              </span>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--tx)]">Placement Grid</label>
                <select
                  value={currentPosition}
                  onChange={(e) => updateWm({ watermarkPosition: e.target.value as typeof currentPosition })}
                  className="input-modern w-full cursor-pointer font-medium text-xs"
                >
                  <option value="center">Center of Page (Diagonal)</option>
                  <option value="top-left">Top Left</option>
                  <option value="top-center">Top Center</option>
                  <option value="top-right">Top Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-center">Bottom Center</option>
                  <option value="bottom-right">Bottom Right</option>
                </select>
              </div>
            </div>

            {/* Style Group */}
            <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-4">
              <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider block">
                3. Style &amp; Appearance
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--tx)]">Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentColor}
                      onChange={(e) => updateWm({ watermarkColor: e.target.value })}
                      className="h-8 w-12 rounded-lg border border-[var(--border)] cursor-pointer bg-transparent"
                    />
                    <span className="text-xs font-mono text-[var(--tx-2)]">{currentColor}</span>
                  </div>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[var(--tx)]">Opacity</label>
                    <span className="text-xs font-mono text-[var(--accent)] font-bold">{Math.round(currentOpacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min={0.05}
                    max={1.0}
                    step={0.05}
                    value={currentOpacity}
                    onChange={(e) => updateWm({ watermarkOpacity: parseFloat(e.target.value) })}
                    className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[var(--tx)]">Rotation</label>
                    <span className="text-xs font-mono text-[var(--accent)] font-bold">{currentRotation}&deg;</span>
                  </div>
                  <input
                    type="range"
                    min={-90}
                    max={90}
                    step={15}
                    value={currentRotation}
                    onChange={(e) => updateWm({ watermarkRotation: parseInt(e.target.value, 10) })}
                    className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[var(--tx)]">Font Size</label>
                    <span className="text-xs font-mono text-[var(--accent)] font-bold">{currentFontSize} pt</span>
                  </div>
                  <input
                    type="range"
                    min={18}
                    max={96}
                    step={2}
                    value={currentFontSize}
                    onChange={(e) => updateWm({ watermarkFontSize: parseInt(e.target.value, 10) })}
                    className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview Column */}
          <div className="lg:col-span-5">
            <OptionLivePreview file={file} mode={mode} options={options} />
          </div>
        </div>
      </div>
    );
  }

  // 3. PAGE NUMBERS MODE
  if (mode === 'pageNumbers') {
    const pn = options.pageNumbers || {};
    const updatePn = (partial: Partial<typeof pn>) => {
      update('pageNumbers', { ...pn, ...partial });
    };

    const currentFormat = pn.pageNumberFormat ?? 'page_n_of_total';
    const currentPosition = pn.pageNumberPosition ?? 'bottom-center';
    const startNum = pn.pageNumberStartNumber ?? 1;
    const skipFirst = pn.skipFirstPage ?? false;
    const currentColor = pn.pageNumberColor ?? '#666666';

    return (
      <div className="mt-6 space-y-6 pt-4 border-t border-[var(--border)]">
        <div>
          <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider flex items-center gap-2">
            <Hash className="h-4 w-4 text-[var(--accent)]" />
            Page Numbering Options
          </h3>
          <p className="mt-1 text-xs text-[var(--tx-2)]">
            Format, position, and customize numbering across all pages with live preview.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--tx)]">Numbering Format</label>
                <select
                  value={currentFormat}
                  onChange={(e) => updatePn({ pageNumberFormat: e.target.value as typeof currentFormat })}
                  className="input-modern w-full cursor-pointer text-xs"
                >
                  <option value="page_n_of_total">Page 1 of 8 (Standard)</option>
                  <option value="n_of_total">1 / 8</option>
                  <option value="page_n">Page 1</option>
                  <option value="n">1 (Number only)</option>
                  <option value="dash_n_dash">- 1 -</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--tx)]">Alignment Position</label>
                <select
                  value={currentPosition}
                  onChange={(e) => updatePn({ pageNumberPosition: e.target.value as typeof currentPosition })}
                  className="input-modern w-full cursor-pointer text-xs"
                >
                  <option value="bottom-center">Bottom Center (Standard)</option>
                  <option value="bottom-right">Bottom Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="top-center">Top Center</option>
                  <option value="top-right">Top Right</option>
                  <option value="top-left">Top Left</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--tx)]">Start Number:</label>
                <input
                  type="number"
                  min={1}
                  value={startNum}
                  onChange={(e) => updatePn({ pageNumberStartNumber: Math.max(1, parseInt(e.target.value, 10) || 1) })}
                  className="input-modern w-full text-center font-bold text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--tx)]">Color:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentColor}
                    onChange={(e) => updatePn({ pageNumberColor: e.target.value })}
                    className="h-8 w-12 rounded-lg border border-[var(--border)] cursor-pointer bg-transparent"
                  />
                  <span className="text-xs font-mono text-[var(--tx-2)]">{currentColor}</span>
                </div>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[var(--tx)] p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
              <input
                type="checkbox"
                checked={skipFirst}
                onChange={(e) => updatePn({ skipFirstPage: e.target.checked })}
                className="rounded text-[var(--accent)] focus:ring-0"
              />
              <span>Skip First Page (Omit cover page)</span>
            </label>
          </div>

          <div className="lg:col-span-5">
            <OptionLivePreview file={file} mode={mode} options={options} />
          </div>
        </div>
      </div>
    );
  }

  // 4. HEADERS & FOOTERS MODE
  if (mode === 'headersFooters') {
    const hf = options.headersFooters || {};
    const updateHf = (partial: Partial<typeof hf>) => {
      update('headersFooters', { ...hf, ...partial });
    };

    return (
      <div className="mt-6 space-y-6 pt-4 border-t border-[var(--border)]">
        <div>
          <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider flex items-center gap-2">
            <Type className="h-4 w-4 text-[var(--accent)]" />
            Headers &amp; Footers Configuration
          </h3>
          <p className="mt-1 text-xs text-[var(--tx-2)]">
            Add custom running headers, timestamps, or page counters. Use macros: <code>{'{page}'}</code>, <code>{'{total}'}</code>, <code>{'{date}'}</code>, <code>{'{title}'}</code>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-2">
              <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider">Top Header</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Left header..."
                  value={hf.headerLeft || ''}
                  onChange={(e) => updateHf({ headerLeft: e.target.value })}
                  className="input-modern text-xs"
                />
                <input
                  type="text"
                  placeholder="Center (e.g. {title})..."
                  value={hf.headerCenter || ''}
                  onChange={(e) => updateHf({ headerCenter: e.target.value })}
                  className="input-modern text-xs text-center"
                />
                <input
                  type="text"
                  placeholder="Right (e.g. {date})..."
                  value={hf.headerRight || ''}
                  onChange={(e) => updateHf({ headerRight: e.target.value })}
                  className="input-modern text-xs text-right"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-2">
              <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider">Bottom Footer</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Left (e.g. Confidential)..."
                  value={hf.footerLeft || ''}
                  onChange={(e) => updateHf({ footerLeft: e.target.value })}
                  className="input-modern text-xs"
                />
                <input
                  type="text"
                  placeholder="Center (e.g. Page {page} of {total})..."
                  value={hf.footerCenter || ''}
                  onChange={(e) => updateHf({ footerCenter: e.target.value })}
                  className="input-modern text-xs text-center"
                />
                <input
                  type="text"
                  placeholder="Right footer..."
                  value={hf.footerRight || ''}
                  onChange={(e) => updateHf({ footerRight: e.target.value })}
                  className="input-modern text-xs text-right"
                />
              </div>
            </div>

            {/* Spacing, Margin & Overlap Prevention */}
            <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-3">
              <span className="text-xs font-bold text-[var(--tx)] uppercase tracking-wider block">
                Spacing &amp; Formatting
              </span>

              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-[var(--tx)] p-2.5 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-soft)]/20">
                <input
                  type="checkbox"
                  checked={hf.shrinkToFit ?? true}
                  onChange={(e) => updateHf({ shrinkToFit: e.target.checked })}
                  className="rounded text-[var(--accent)] focus:ring-0 cursor-pointer"
                />
                <div>
                  <span>Fit &amp; Space Content (Prevent Text Overlap)</span>
                  <p className="text-[11px] font-normal text-[var(--tx-2)] leading-tight">
                    Scales document slightly to create dedicated header &amp; footer margin bands.
                  </p>
                </div>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--tx-2)] font-medium">Page Edge Margin</span>
                    <span className="font-mono font-bold text-[var(--tx)]">{hf.margin ?? 25} pt</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={hf.margin ?? 25}
                    onChange={(e) => updateHf({ margin: Number(e.target.value) })}
                    className="w-full accent-[var(--accent)] cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--tx-2)] font-medium">Font Size</span>
                    <span className="font-mono font-bold text-[var(--tx)]">{hf.fontSize ?? 10} pt</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="16"
                    value={hf.fontSize ?? 10}
                    onChange={(e) => updateHf({ fontSize: Number(e.target.value) })}
                    className="w-full accent-[var(--accent)] cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[var(--border)]">
                <span className="text-xs text-[var(--tx-2)] font-medium">Text Color</span>
                <div className="flex items-center gap-1.5">
                  {['#4b5563', '#000000', '#2563EB', '#E24A24', '#059669', '#7C3AED'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => updateHf({ color: c })}
                      style={{ backgroundColor: c }}
                      className={`h-5 w-5 rounded-full border transition-all cursor-pointer ${
                        (hf.color || '#4b5563') === c ? 'ring-2 ring-[var(--accent)] ring-offset-1 scale-110' : 'border-neutral-300 dark:border-neutral-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[var(--tx)] p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
              <input
                type="checkbox"
                checked={hf.skipFirstPage || false}
                onChange={(e) => updateHf({ skipFirstPage: e.target.checked })}
                className="rounded text-[var(--accent)] focus:ring-0 cursor-pointer"
              />
              <span>Exclude Header/Footer on First Page</span>
            </label>
          </div>

          <div className="lg:col-span-5">
            <OptionLivePreview file={file} mode={mode} options={options} />
          </div>
        </div>
      </div>
    );
  }

  // 5. INVERT COLORS MODE
  if (mode === 'invertColors') {
    const currentMode = options.invertColorMode ?? 'dark';

    return (
      <div className="mt-6 space-y-6 pt-4 border-t border-[var(--border)]">
        <div>
          <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider flex items-center gap-2">
            <Palette className="h-4 w-4 text-[var(--accent)]" />
            Color Inversion / Dark Mode Theme
          </h3>
          <p className="mt-1 text-xs text-[var(--tx-2)]">
            Transform document colors for comfortable night reading or high-contrast viewing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 'dark', label: 'Dark Mode (Invert)', desc: 'White text on dark background' },
              { id: 'sepia', label: 'Sepia Reader', desc: 'Warm paper tone for eye comfort' },
              { id: 'grayscale', label: 'Grayscale', desc: 'Monochrome black & white' },
              { id: 'high-contrast', label: 'High Contrast', desc: 'Sharpened text clarity' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => update('invertColorMode', item.id as typeof currentMode)}
                className={`p-4 rounded-2xl border text-left space-y-1 transition-all cursor-pointer ${
                  currentMode === item.id
                    ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] ring-1 ring-[var(--accent)] shadow-xs'
                    : 'border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx)] hover:border-[var(--border-hover)]'
                }`}
              >
                <span className="text-xs font-bold block">{item.label}</span>
                <span className="text-[11px] text-[var(--tx-2)] block leading-tight">{item.desc}</span>
              </button>
            ))}
          </div>

          <div className="lg:col-span-5">
            <OptionLivePreview file={file} mode={mode} options={options} />
          </div>
        </div>
      </div>
    );
  }

  // 6. PDF TO IMAGES MODE
  if (mode === 'pdfToImages') {
    const currentFormat = options.imageOutputFormat ?? 'png';
    const currentDpi = options.imageRenderDpi ?? 144;

    return (
      <div className="mt-6 space-y-6 pt-4 border-t border-[var(--border)]">
        <div>
          <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-[var(--accent)]" />
            Image Conversion Settings
          </h3>
          <p className="mt-1 text-xs text-[var(--tx-2)]">
            Export PDF pages into high-resolution images. Downloads directly with individual image previews.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-2">
            <label className="text-xs font-bold text-[var(--tx)]">Image Output Format</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => update('imageOutputFormat', 'png')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  currentFormat === 'png'
                    ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                    : 'border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--tx-2)] hover:text-[var(--tx)]'
                }`}
              >
                PNG (Lossless)
              </button>
              <button
                type="button"
                onClick={() => update('imageOutputFormat', 'jpeg')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  currentFormat === 'jpeg'
                    ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                    : 'border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--tx-2)] hover:text-[var(--tx)]'
                }`}
              >
                JPEG (Compact)
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-2">
            <label className="text-xs font-bold text-[var(--tx)]">Render Clarity / Resolution</label>
            <select
              value={currentDpi}
              onChange={(e) => update('imageRenderDpi', Number(e.target.value))}
              className="input-modern w-full cursor-pointer text-xs"
            >
              <option value={72}>72 DPI (Standard Web Preview)</option>
              <option value={144}>144 DPI (High Resolution - Recommended)</option>
              <option value={200}>200 DPI (Ultra Crisp Print Quality)</option>
              <option value={300}>300 DPI (Maximum Quality)</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  // 6. ENCRYPT MODE
  if (mode === 'encrypt') {
    const userPassword = options.userPassword || options.password || '';
    const confirmPassword = options.confirmPassword || '';
    const ownerPassword = options.ownerPassword || '';
    const algorithm = options.encryptionAlgorithm || 'AES-256';
    const permissions = options.encryptionPermissions || {
      allowPrinting: true,
      allowCopying: true,
      allowModifying: false,
      allowAnnotating: true,
      allowFillingForms: true,
    };

    const strength = evaluatePasswordStrength(userPassword);
    const isMatch = Boolean(confirmPassword && userPassword && confirmPassword === userPassword);
    const isMismatch = Boolean(confirmPassword && userPassword && confirmPassword !== userPassword);

    const handleUserPasswordChange = (val: string) => {
      onOptionsChangeAction({
        ...options,
        userPassword: val,
        password: val,
      });
    };

    const updatePermission = (key: keyof typeof permissions, val: boolean) => {
      onOptionsChangeAction({
        ...options,
        encryptionPermissions: {
          ...permissions,
          [key]: val,
        },
      });
    };

    return (
      <div className="mt-6 space-y-6 pt-4 border-t border-[var(--border)]">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider flex items-center gap-2">
              <Lock className="h-4 w-4 text-emerald-500" />
              Client-Side PDF Protection &amp; Encryption
            </h3>
            <p className="mt-1 text-xs text-[var(--tx-2)]">
              Secure your PDF with bank-grade AES-256 encryption. Processed 100% locally in your browser.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <ShieldCheck className="h-3.5 w-3.5" />
            AES-256 Bit • Zero Server Uploads
          </span>
        </div>

        {/* Password Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Main / Open Password */}
          <div className="space-y-2 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[var(--tx)] flex items-center gap-1.5">
                <KeyRound className="h-3.5 w-3.5 text-[var(--accent)]" />
                Document Password (Required to Open)
              </label>
              <span className={`text-[11px] font-semibold ${strength.textColor}`}>
                {strength.label}
              </span>
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter strong password (e.g. 12+ chars)"
                value={userPassword}
                onChange={(e) => handleUserPasswordChange(e.target.value)}
                className="input-modern w-full font-mono text-xs pr-9"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--tx-3)] hover:text-[var(--tx)] transition-colors p-1"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* Password Strength Meter */}
            <div className="space-y-1.5 pt-1">
              <div className="h-1.5 w-full bg-[var(--ui-2)] rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${strength.color}`}
                  style={{ width: `${strength.percent}%` }}
                />
              </div>

              {/* Requirement Checkpoints */}
              <div className="flex flex-wrap gap-1.5 pt-1 text-[10px]">
                <span
                  className={`px-1.5 py-0.5 rounded ${
                    strength.checks.long
                      ? 'bg-emerald-500/10 text-emerald-500 font-medium'
                      : 'bg-[var(--ui-2)] text-[var(--tx-3)]'
                  }`}
                >
                  12+ Chars
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded ${
                    strength.checks.upper
                      ? 'bg-emerald-500/10 text-emerald-500 font-medium'
                      : 'bg-[var(--ui-2)] text-[var(--tx-3)]'
                  }`}
                >
                  Uppercase
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded ${
                    strength.checks.lower
                      ? 'bg-emerald-500/10 text-emerald-500 font-medium'
                      : 'bg-[var(--ui-2)] text-[var(--tx-3)]'
                  }`}
                >
                  Lowercase
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded ${
                    strength.checks.number
                      ? 'bg-emerald-500/10 text-emerald-500 font-medium'
                      : 'bg-[var(--ui-2)] text-[var(--tx-3)]'
                  }`}
                >
                  Number
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded ${
                    strength.checks.special
                      ? 'bg-emerald-500/10 text-emerald-500 font-medium'
                      : 'bg-[var(--ui-2)] text-[var(--tx-3)]'
                  }`}
                >
                  Symbol
                </span>
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[var(--tx)] flex items-center gap-1.5">
                  <KeyRound className="h-3.5 w-3.5 text-emerald-500" />
                  Confirm Password
                </label>
                {isMatch && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-500">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Matches
                  </span>
                )}
                {isMismatch && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-500">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Does not match
                  </span>
                )}
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter password to confirm"
                  value={confirmPassword}
                  onChange={(e) => update('confirmPassword', e.target.value)}
                  className={`input-modern w-full font-mono text-xs pr-9 ${
                    isMismatch ? 'border-amber-500/50 focus:border-amber-500' : ''
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--tx-3)] hover:text-[var(--tx)] transition-colors p-1"
                  title={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <p className="text-[11px] text-[var(--tx-3)] pt-2">
              Re-entering ensures there are no accidental typos before you lock the document.
            </p>
          </div>
        </div>

        {/* Algorithm Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[var(--tx-2)] uppercase tracking-wider">
            Encryption Standard
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => update('encryptionAlgorithm', 'AES-256')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                algorithm === 'AES-256'
                  ? 'border-emerald-500/60 bg-emerald-500/5 shadow-xs ring-1 ring-emerald-500/30'
                  : 'border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--border-hover)]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-[var(--tx)] flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  AES-256 (Recommended)
                </span>
                <span className="text-[10px] uppercase font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Military Grade
                </span>
              </div>
              <p className="mt-1 text-[11px] text-[var(--tx-2)]">
                256-bit encryption compliant with ISO 32000-2 (PDF 2.0). Supported by all modern PDF viewers.
              </p>
            </button>

            <button
              type="button"
              onClick={() => update('encryptionAlgorithm', 'RC4')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                algorithm === 'RC4'
                  ? 'border-[var(--accent)]/60 bg-[var(--accent-soft)]/20 shadow-xs ring-1 ring-[var(--accent)]/30'
                  : 'border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--border-hover)]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-[var(--tx)]">
                  RC4 128-Bit (Legacy)
                </span>
                <span className="text-[10px] uppercase font-bold text-[var(--tx-3)] bg-[var(--ui-2)] px-2 py-0.5 rounded">
                  Legacy
                </span>
              </div>
              <p className="mt-1 text-[11px] text-[var(--tx-2)]">
                Older 128-bit format for backwards compatibility with legacy PDF software (Acrobat 5.0+).
              </p>
            </button>
          </div>
        </div>

        {/* Advanced Permissions Accordion */}
        <div className="border border-[var(--border)] rounded-2xl bg-[var(--bg-card)] overflow-hidden">
          <button
            type="button"
            onClick={() => setShowAdvancedSecurity(!showAdvancedSecurity)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-[var(--ui-2)]/40 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-[var(--accent)]" />
              <span className="text-xs font-bold text-[var(--tx)]">
                Advanced Permissions &amp; Owner Password (Optional)
              </span>
            </div>
            {showAdvancedSecurity ? (
              <ChevronUp className="h-4 w-4 text-[var(--tx-3)]" />
            ) : (
              <ChevronDown className="h-4 w-4 text-[var(--tx-3)]" />
            )}
          </button>

          {showAdvancedSecurity && (
            <div className="p-4 pt-2 border-t border-[var(--border)] space-y-4">
              {/* Separate Owner Password */}
              <div className="space-y-1.5 max-w-md">
                <label className="text-xs font-semibold text-[var(--tx)] flex items-center gap-1.5">
                  <KeyRound className="h-3.5 w-3.5 text-[var(--tx-3)]" />
                  Owner / Master Password (To modify permissions)
                </label>
                <div className="relative">
                  <input
                    type={showOwnerPassword ? 'text' : 'password'}
                    placeholder="Optional separate owner password"
                    value={ownerPassword}
                    onChange={(e) => update('ownerPassword', e.target.value)}
                    className="input-modern w-full font-mono text-xs pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOwnerPassword(!showOwnerPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--tx-3)] hover:text-[var(--tx)] transition-colors p-1"
                    title={showOwnerPassword ? 'Hide password' : 'Show password'}
                  >
                    {showOwnerPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-[var(--tx-3)]">
                  If omitted, your document password will also act as the owner password.
                </p>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <label className="flex items-center gap-2.5 text-xs text-[var(--tx)] p-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissions.allowPrinting ?? true}
                    onChange={(e) => updatePermission('allowPrinting', e.target.checked)}
                    className="checkbox-modern"
                  />
                  <span>Allow Document Printing</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs text-[var(--tx)] p-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissions.allowCopying ?? true}
                    onChange={(e) => updatePermission('allowCopying', e.target.checked)}
                    className="checkbox-modern"
                  />
                  <span>Allow Copying Text &amp; Images</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs text-[var(--tx)] p-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissions.allowModifying ?? false}
                    onChange={(e) => updatePermission('allowModifying', e.target.checked)}
                    className="checkbox-modern"
                  />
                  <span>Allow Modifying Document</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs text-[var(--tx)] p-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissions.allowAnnotating ?? true}
                    onChange={(e) => updatePermission('allowAnnotating', e.target.checked)}
                    className="checkbox-modern"
                  />
                  <span>Allow Adding Annotations</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs text-[var(--tx)] p-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissions.allowFillingForms ?? true}
                    onChange={(e) => updatePermission('allowFillingForms', e.target.checked)}
                    className="checkbox-modern"
                  />
                  <span>Allow Filling Form Fields</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-[var(--tx-2)] flex items-start gap-2.5">
          <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-[var(--tx)] font-semibold">100% Client-Side Privacy:</strong> All
            encryption keys and password derivation algorithms run inside your local browser memory using the Web Crypto API. Your document and password never leave your device.
          </div>
        </div>
      </div>
    );
  }

  // 7. DECRYPT MODE
  if (mode === 'decrypt') {
    const password = options.password || options.decryptionPassword || '';

    const handlePasswordChange = (val: string) => {
      onOptionsChangeAction({
        ...options,
        password: val,
        decryptionPassword: val,
      });
    };

    return (
      <div className="mt-6 space-y-6 pt-4 border-t border-[var(--border)]">
        <div>
          <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider flex items-center gap-2">
            <Unlock className="h-4 w-4 text-emerald-500" />
            Client-Side PDF Decryption &amp; Unlock
          </h3>
          <p className="mt-1 text-xs text-[var(--tx-2)]">
            Enter the password to permanently unlock and export an unencrypted copy of your document.
          </p>
        </div>

        <div className="max-w-md space-y-2 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
          <label className="text-xs font-bold text-[var(--tx)] flex items-center gap-1.5">
            <KeyRound className="h-3.5 w-3.5 text-emerald-500" />
            Document Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password to unlock PDF"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              className="input-modern w-full font-mono text-xs pr-9"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--tx-3)] hover:text-[var(--tx)] transition-colors p-1"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <p className="text-[11px] text-[var(--tx-3)] pt-1">
            After entering the correct password, clicking process will remove all locks and download a clean, open PDF.
          </p>
        </div>

        {/* Privacy Note */}
        <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-[var(--tx-2)] flex items-start gap-2.5 max-w-xl">
          <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-[var(--tx)] font-semibold">Zero Server Uploads:</strong> Decryption
            happens locally in your device RAM. The password is never saved or transmitted to any server.
          </div>
        </div>
      </div>
    );
  }



  // 10. MARKDOWN TO PDF
  if (mode === 'markdownToPdf') {
    return (
      <div className="mt-6 space-y-4 pt-4 border-t border-[var(--border)]">
        <div>
          <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider flex items-center gap-2">
            <Code className="h-4 w-4 text-[var(--accent)]" />
            Markdown / Document Editor
          </h3>
          <p className="mt-1 text-xs text-[var(--tx-2)]">
            Type or paste markdown content directly, or upload a <code>.md</code> file.
          </p>
        </div>

        <textarea
          rows={10}
          value={options.markdownContent ?? '# Document Title\n\n## Summary\nEnter your markdown formatted text here.\n\n- Feature 1\n- Feature 2\n- Feature 3\n\n```ts\nconst local = true;\n```'}
          onChange={(e) => update('markdownContent', e.target.value)}
          className="w-full font-mono text-xs leading-relaxed p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)] resize-y focus:outline-none focus:border-[var(--accent)]"
        />
      </div>
    );
  }

  // 11. HTML TO PDF
  if (mode === 'htmlToPdf') {
    return (
      <div className="mt-6 space-y-4 pt-4 border-t border-[var(--border)]">
        <div>
          <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider flex items-center gap-2">
            <Code className="h-4 w-4 text-[var(--accent)]" />
            HTML Content Editor
          </h3>
          <p className="mt-1 text-xs text-[var(--tx-2)]">
            Paste HTML code or upload an <code>.html</code> file to compile into PDF.
          </p>
        </div>

        <textarea
          rows={10}
          value={options.htmlContent ?? '<h1>My Report</h1>\n<p>This is a paragraph generated from HTML.</p>\n<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>'}
          onChange={(e) => update('htmlContent', e.target.value)}
          className="w-full font-mono text-xs leading-relaxed p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)] resize-y focus:outline-none focus:border-[var(--accent)]"
        />
      </div>
    );
  }

  // 12. CSV TO PDF
  if (mode === 'csvToPdf') {
    return (
      <div className="mt-6 space-y-4 pt-4 border-t border-[var(--border)]">
        <div>
          <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider flex items-center gap-2">
            <Table className="h-4 w-4 text-[var(--accent)]" />
            CSV Table Data Editor
          </h3>
          <p className="mt-1 text-xs text-[var(--tx-2)]">
            Paste comma-separated or tab-separated data, or upload a <code>.csv</code> file.
          </p>
        </div>

        <textarea
          rows={8}
          value={options.csvContent ?? 'Product,Category,Price,Stock\nLaptop Pro,Electronics,1299,45\nWireless Mouse,Accessories,29,150\nUSB-C Cable,Accessories,15,300\nHD Monitor 27",Displays,249,20'}
          onChange={(e) => update('csvContent', e.target.value)}
          className="w-full font-mono text-xs leading-relaxed p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] text-[var(--tx)] resize-y focus:outline-none focus:border-[var(--accent)]"
        />
      </div>
    );
  }

  // 13. GST INVOICE GENERATOR
  if (mode === 'gstInvoice') {
    const gst = options.gstInvoice || {
      sellerName: 'Acme Technologies Pvt Ltd',
      sellerGstin: '27AAAAA0000A1Z5',
      sellerAddress: '101 Tech Park, Mumbai, MH - 400001',
      buyerName: 'Client Solutions Inc',
      buyerGstin: '29BBBBB1111B1Z2',
      buyerAddress: '202 Corporate Tower, Bengaluru, KA',
      invoiceNumber: 'INV-2026-001',
      invoiceDate: new Date().toISOString().split('T')[0],
      placeOfSupply: 'Karnataka (29)',
      items: [
        { description: 'Cloud Integration & Consulting', hsn: '998314', quantity: 1, rate: 35000, cgstRate: 0, sgstRate: 0, igstRate: 18 },
      ],
    };

    const updateGst = (partial: Partial<typeof gst>) => {
      update('gstInvoice', { ...gst, ...partial });
    };

    return (
      <div className="mt-6 space-y-6 pt-4 border-t border-[var(--border)]">
        <div>
          <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider flex items-center gap-2">
            <Receipt className="h-4 w-4 text-[var(--accent)]" />
            Indian GST Invoice Form
          </h3>
          <p className="mt-1 text-xs text-[var(--tx-2)]">
            Auto-calculates CGST/SGST/IGST and generates compliant tax invoice PDFs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
            <span className="text-xs font-bold text-[var(--accent)] uppercase">Seller / Supplier</span>
            <input
              type="text"
              placeholder="Business Name"
              value={gst.sellerName}
              onChange={(e) => updateGst({ sellerName: e.target.value })}
              className="input-modern w-full text-xs font-bold"
            />
            <input
              type="text"
              placeholder="Seller GSTIN (15-digit)"
              value={gst.sellerGstin}
              onChange={(e) => updateGst({ sellerGstin: e.target.value })}
              className="input-modern w-full text-xs font-mono"
            />
            <input
              type="text"
              placeholder="Seller Full Address"
              value={gst.sellerAddress}
              onChange={(e) => updateGst({ sellerAddress: e.target.value })}
              className="input-modern w-full text-xs"
            />
          </div>

          <div className="space-y-2 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
            <span className="text-xs font-bold text-[var(--accent)] uppercase">Buyer / Recipient</span>
            <input
              type="text"
              placeholder="Client / Buyer Name"
              value={gst.buyerName}
              onChange={(e) => updateGst({ buyerName: e.target.value })}
              className="input-modern w-full text-xs font-bold"
            />
            <input
              type="text"
              placeholder="Buyer GSTIN (or URP)"
              value={gst.buyerGstin}
              onChange={(e) => updateGst({ buyerGstin: e.target.value })}
              className="input-modern w-full text-xs font-mono"
            />
            <input
              type="text"
              placeholder="Buyer Address"
              value={gst.buyerAddress}
              onChange={(e) => updateGst({ buyerAddress: e.target.value })}
              className="input-modern w-full text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--tx)]">Invoice #</label>
            <input
              type="text"
              value={gst.invoiceNumber}
              onChange={(e) => updateGst({ invoiceNumber: e.target.value })}
              className="input-modern w-full text-xs font-bold"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--tx)]">Invoice Date</label>
            <input
              type="date"
              value={gst.invoiceDate}
              onChange={(e) => updateGst({ invoiceDate: e.target.value })}
              className="input-modern w-full text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--tx)]">Place of Supply</label>
            <input
              type="text"
              value={gst.placeOfSupply}
              onChange={(e) => updateGst({ placeOfSupply: e.target.value })}
              className="input-modern w-full text-xs"
            />
          </div>
        </div>
      </div>
    );
  }

  // 14. POS BILLING
  if (mode === 'posBilling') {
    const pos = options.posReceipt || {
      storeName: 'COFFEE & BAKERY POS',
      storeAddress: '42 Baker Street, Central Mall',
      receiptNumber: 'POS-7890',
      format: '80mm',
      items: [
        { name: 'Espresso Double', quantity: 2, price: 160 },
        { name: 'Croissant Butter', quantity: 1, price: 120 },
      ],
    };

    const updatePos = (partial: Partial<typeof pos>) => {
      update('posReceipt', { ...pos, ...partial });
    };

    return (
      <div className="mt-6 space-y-6 pt-4 border-t border-[var(--border)]">
        <div>
          <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider flex items-center gap-2">
            <Receipt className="h-4 w-4 text-[var(--accent)]" />
            Point-of-Sale (POS) Receipt Generator
          </h3>
          <p className="mt-1 text-xs text-[var(--tx-2)]">
            Generate 58mm/80mm thermal receipts and retail bills with instant 1-click export.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--tx)]">Store / Brand Name</label>
            <input
              type="text"
              value={pos.storeName}
              onChange={(e) => updatePos({ storeName: e.target.value })}
              className="input-modern w-full text-xs font-bold"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--tx)]">Store Address</label>
            <input
              type="text"
              value={pos.storeAddress}
              onChange={(e) => updatePos({ storeAddress: e.target.value })}
              className="input-modern w-full text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--tx)]">Receipt Format Width</label>
            <select
              value={pos.format || '80mm'}
              onChange={(e) => updatePos({ format: e.target.value as '58mm' | '80mm' | 'a4' })}
              className="input-modern w-full cursor-pointer text-xs"
            >
              <option value="80mm">80mm Thermal Receipt</option>
              <option value="58mm">58mm Mini Thermal Receipt</option>
              <option value="a4">Standard A4 Bill</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  // 15. PDF TO ZIP (Direct lossless PDF archiving)
  if (mode === 'pdfToZip') {
    const currentLevel = options.compressionLevel ?? 'medium';

    return (
      <div className="mt-6 space-y-6 pt-4 border-t border-[var(--border)]">
        <div>
          <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider">ZIP Packaging Settings</h3>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-semibold text-[var(--tx)]">Compression Level</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(['low', 'medium', 'high'] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => update('compressionLevel', lvl)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                  currentLevel === lvl
                    ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] shadow-xs font-bold'
                    : 'border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx-2)] hover:text-[var(--tx)] hover:border-[var(--accent-border)]'
                }`}
              >
                {lvl === 'low' ? '⚡ Fast (Level 1)' : lvl === 'medium' ? '⚖️ Standard (Level 6)' : '🔒 Maximum (Level 9)'}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-[var(--tx-3)] leading-relaxed mt-2">
            ℹ️ Original PDF bytes are packaged directly into the ZIP archive without rasterization or alteration. Since PDFs are already compressed internally, standard ZIP archiving packages them instantly with byte-for-byte fidelity.
          </p>
        </div>
      </div>
    );
  }



  if (mode === 'imagesToPdf') {
    const layoutStrings = processingStrings.imagesToPdf;
    const currentSize = options.pageSize ?? 'auto';
    const currentOrientation = options.pageOrientation ?? 'auto';

    return (
      <div className="mt-6 space-y-6 pt-4 border-t border-[var(--border)]">
        <div>
          <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider">{layoutStrings.title}</h3>
          <p className="mt-1 text-xs text-[var(--tx-2)]">{layoutStrings.layoutTitle}</p>
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
              onChange={(event) => update('pageSize', event.target.value as PDFProcessingOptions['pageSize'])}
            >
              <option value="auto">Auto (Match Image Dimension)</option>
              <option value="a4">Standard A4</option>
              <option value="letter">US Letter</option>
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
              onChange={(event) =>
                update('pageOrientation', event.target.value as PDFProcessingOptions['pageOrientation'])
              }
            >
              <option value="auto">Auto Orientation</option>
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
