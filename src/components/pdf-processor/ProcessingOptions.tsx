import React from 'react';
import { PDFProcessingMode, PDFProcessingOptions } from '../../lib/pdf-processor';
import { useDictionary } from '../../i18n/LocaleProvider';
import OptionLivePreview from './OptionLivePreview';
import {
  Lock,
  Unlock,
  Fingerprint,
  Code,
  Table,
  Receipt,
  Scan,
  Type,
  Hash,
  Palette,
  Info,
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

  // 2. WATERMARK MODE
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

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[var(--tx)] p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
              <input
                type="checkbox"
                checked={hf.skipFirstPage || false}
                onChange={(e) => updateHf({ skipFirstPage: e.target.checked })}
                className="rounded text-[var(--accent)] focus:ring-0"
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

  // 6. ENCRYPT MODE
  if (mode === 'encrypt') {
    return (
      <div className="mt-6 space-y-6 pt-4 border-t border-[var(--border)]">
        <div>
          <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider flex items-center gap-2">
            <Lock className="h-4 w-4 text-[var(--accent)]" />
            Password Protection &amp; Permissions
          </h3>
          <p className="mt-1 text-xs text-[var(--tx-2)]">
            Encrypt your PDF directly in your browser. The file is locked before leaving memory.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[var(--tx)]">Document Open Password *</label>
              <span className="text-[10px] text-[var(--accent)] font-semibold uppercase">Required</span>
            </div>
            <input
              type="password"
              placeholder="Required to open the PDF"
              value={options.userPassword || ''}
              onChange={(e) => update('userPassword', e.target.value)}
              className="input-modern w-full font-mono text-xs"
            />
          </div>

          <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[var(--tx)]">Owner Password (Optional)</label>
              <span className="text-[10px] text-[var(--tx-3)] font-medium">Master key</span>
            </div>
            <input
              type="password"
              placeholder="Required to edit permissions"
              value={options.ownerPassword || ''}
              onChange={(e) => update('ownerPassword', e.target.value)}
              className="input-modern w-full font-mono text-xs"
            />
          </div>
        </div>
      </div>
    );
  }

  // 7. DECRYPT MODE
  if (mode === 'decrypt') {
    return (
      <div className="mt-6 space-y-6 pt-4 border-t border-[var(--border)]">
        <div>
          <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider flex items-center gap-2">
            <Unlock className="h-4 w-4 text-emerald-500" />
            Client-Side PDF Decryption
          </h3>
          <p className="mt-1 text-xs text-[var(--tx-2)]">
            Enter the password to unlock and export an unencrypted copy of your document.
          </p>
        </div>

        <div className="max-w-md space-y-2 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
          <label className="text-xs font-bold text-[var(--tx)]">Document Password</label>
          <input
            type="password"
            placeholder="Enter document password"
            value={options.password || ''}
            onChange={(e) => update('password', e.target.value)}
            className="input-modern w-full font-mono text-xs"
          />
        </div>
      </div>
    );
  }

  // 8. FINGERPRINT MODE
  if (mode === 'fingerprint') {
    return (
      <div className="mt-6 space-y-6 pt-4 border-t border-[var(--border)]">
        <div>
          <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider flex items-center gap-2">
            <Fingerprint className="h-4 w-4 text-[var(--accent)]" />
            Invisible Leak-Tracking Steganography
          </h3>
          <p className="mt-1 text-xs text-[var(--tx-2)]">
            Embeds invisible zero-width unicode identifiers into the document stream to trace leak origins without altering visual layout.
          </p>
        </div>

        <div className="max-w-md space-y-2 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
          <label className="text-xs font-bold text-[var(--tx)]">Recipient Identifier / Name</label>
          <input
            type="text"
            placeholder="e.g. John Doe / Board Member A"
            value={options.fingerprintRecipient || ''}
            onChange={(e) => update('fingerprintRecipient', e.target.value)}
            className="input-modern w-full text-xs font-semibold"
          />
        </div>
      </div>
    );
  }

  // 9. OCR MODE
  if (mode === 'ocr') {
    const currentLang = options.ocrLanguage ?? 'eng';

    return (
      <div className="mt-6 space-y-6 pt-4 border-t border-[var(--border)]">
        <div>
          <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider flex items-center gap-2">
            <Scan className="h-4 w-4 text-[var(--accent)]" />
            Client-Side WASM OCR Engine
          </h3>
          <p className="mt-1 text-xs text-[var(--tx-2)]">
            Recognize text in scanned documents using local Tesseract WASM with zero server calls.
          </p>
        </div>

        <div className="max-w-md space-y-2 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
          <label className="text-xs font-bold text-[var(--tx)]">Document Language</label>
          <select
            value={currentLang}
            onChange={(e) => update('ocrLanguage', e.target.value)}
            className="input-modern w-full cursor-pointer text-xs"
          >
            <option value="eng">English (eng)</option>
            <option value="spa">Spanish / Español (spa)</option>
            <option value="fra">French / Français (fra)</option>
            <option value="deu">German / Deutsch (deu)</option>
            <option value="ita">Italian / Italiano (ita)</option>
            <option value="por">Portuguese / Português (por)</option>
            <option value="rus">Russian / Русский (rus)</option>
            <option value="hun">Hungarian / Magyar (hun)</option>
            <option value="ron">Romanian / Română (ron)</option>
          </select>
        </div>
      </div>
    );
  }

  // 10. MARKDOWN / CREATE PDF
  if (mode === 'markdownToPdf' || mode === 'createPdf') {
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

  // 15. PDF TO IMAGES / IMAGES TO PDF
  if (mode === 'pdfToImages' || mode === 'pdfToZip') {
    const imageStrings = processingStrings.pdfToImages;
    const currentFormat = options.imageOutputFormat ?? 'png';
    const currentDpi = options.imageRenderDpi ?? 144;
    const currentQuality = Math.round((options.imageOutputQuality ?? 0.9) * 100);

    return (
      <div className="mt-6 space-y-6 pt-4 border-t border-[var(--border)]">
        <div>
          <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-wider">{imageStrings.title}</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--tx)]">Format</label>
            <select
              value={currentFormat}
              onChange={(e) => update('imageOutputFormat', e.target.value as 'png' | 'jpeg')}
              className="input-modern w-full cursor-pointer text-xs"
            >
              <option value="png">PNG (Lossless High Quality)</option>
              <option value="jpeg">JPEG (Compressed)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--tx)]">Resolution (DPI)</label>
            <select
              value={currentDpi}
              onChange={(e) => update('imageRenderDpi', Number(e.target.value))}
              className="input-modern w-full cursor-pointer text-xs"
            >
              <option value={72}>72 DPI (Web Screen)</option>
              <option value={144}>144 DPI (Crisp / Balanced)</option>
              <option value={300}>300 DPI (High Resolution Print)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--tx)]">Quality ({currentQuality}%)</label>
            <input
              type="range"
              min={30}
              max={100}
              step={5}
              value={currentQuality}
              onChange={(e) => update('imageOutputQuality', Number(e.target.value) / 100)}
              className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[var(--accent)] mt-3"
            />
          </div>
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
