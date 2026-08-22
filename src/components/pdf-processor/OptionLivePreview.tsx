"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { PDFProcessingMode, PDFProcessingOptions, renderPdfThumbnail } from '../../lib/pdf-processor';
import { Eye, Sparkles } from 'lucide-react';

interface OptionLivePreviewProps {
  file?: File | null;
  mode: PDFProcessingMode;
  options: PDFProcessingOptions;
}

export default function OptionLivePreview({ file, mode, options }: OptionLivePreviewProps) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (!file || (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf'))) {
      setThumbnailUrl(null);
      return;
    }

    setIsLoading(true);
    renderPdfThumbnail(file, 1, 600)
      .then((url) => {
        if (!cancelled && url) {
          setThumbnailUrl(url);
        }
      })
      .catch(() => {
        if (!cancelled) setThumbnailUrl(null);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [file]);

  // Determine filter style for Invert Colors mode
  const getInvertFilter = () => {
    if (mode !== 'invertColors') return '';
    const colorMode = options.invertColorMode ?? 'dark';
    switch (colorMode) {
      case 'dark':
        return 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(105%)';
      case 'sepia':
        return 'sepia(80%) brightness(95%) contrast(95%)';
      case 'grayscale':
        return 'grayscale(100%) contrast(110%)';
      case 'high-contrast':
        return 'contrast(150%) brightness(95%)';
      default:
        return '';
    }
  };

  // Watermark positioning styles
  const getWatermarkPositionStyle = () => {
    const pos = options.watermarkPosition || 'center';
    switch (pos) {
      case 'top-left':
        return 'top-4 left-4 items-start justify-start';
      case 'top-right':
        return 'top-4 right-4 items-start justify-end';
      case 'bottom-left':
        return 'bottom-4 left-4 items-end justify-start';
      case 'bottom-right':
        return 'bottom-4 right-4 items-end justify-end';
      case 'tile':
        return 'inset-0 items-center justify-center';
      case 'center':
      default:
        return 'inset-0 items-center justify-center';
    }
  };

  // Page Numbers positioning styles
  const getPageNumberPositionStyle = () => {
    const pos = options.pageNumberPosition || 'bottom-center';
    switch (pos) {
      case 'bottom-left':
        return 'bottom-3 left-4 text-left';
      case 'bottom-right':
        return 'bottom-3 right-4 text-right';
      case 'top-left':
        return 'top-3 left-4 text-left';
      case 'top-center':
        return 'top-3 inset-x-0 text-center';
      case 'top-right':
        return 'top-3 right-4 text-right';
      case 'bottom-center':
      default:
        return 'bottom-3 inset-x-0 text-center';
    }
  };

  const resolveMacroText = (template: string) => {
    const today = new Date().toISOString().split('T')[0];
    return template
      .replace(/\{page\}/gi, '1')
      .replace(/\{n\}/gi, '1')
      .replace(/\{total\}/gi, '8')
      .replace(/\{date\}/gi, today)
      .replace(/\{title\}/gi, file ? file.name.replace(/\.[^/.]+$/, '') : 'Document');
  };

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:p-5 space-y-3 shadow-xs">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[var(--tx)] flex items-center gap-1.5 uppercase tracking-wider">
          <Eye className="h-3.5 w-3.5 text-[var(--accent)]" />
          Live Preview (Page 1)
        </span>
        <span className="text-[11px] text-[var(--tx-3)] font-medium flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-[var(--accent)]" />
          Instant updates
        </span>
      </div>

      {/* Preview Canvas Container */}
      <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] aspect-[1/1.38] rounded-xl border border-[var(--border)] bg-white shadow-md overflow-hidden flex items-center justify-center select-none">
        {/* Base Page Canvas / Thumbnail */}
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt="PDF Page Preview"
            width={320}
            height={440}
            className="w-full h-full object-contain pointer-events-none transition-all duration-200"
            style={{ filter: getInvertFilter() }}
            unoptimized
          />
        ) : (
          <div
            className="w-full h-full p-6 flex flex-col justify-between bg-white text-slate-800 transition-all duration-200"
            style={{ filter: getInvertFilter() }}
          >
            <div className="space-y-2">
              <div className="h-3 w-2/3 bg-slate-300 rounded" />
              <div className="h-2 w-full bg-slate-200 rounded" />
              <div className="h-2 w-5/6 bg-slate-200 rounded" />
              <div className="h-2 w-4/6 bg-slate-200 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full bg-slate-200 rounded" />
              <div className="h-2 w-full bg-slate-200 rounded" />
              <div className="h-2 w-3/4 bg-slate-200 rounded" />
            </div>
            <div className="space-y-1">
              <div className="h-2 w-1/2 bg-slate-200 rounded" />
            </div>
          </div>
        )}

        {/* 1. Live Overlay: Watermark */}
        {mode === 'watermark' && (
          <div
            className={`absolute flex pointer-events-none ${getWatermarkPositionStyle()}`}
            style={{
              opacity: options.watermarkOpacity ?? 0.3,
            }}
          >
            <span
              className="font-extrabold uppercase whitespace-nowrap tracking-wider text-center"
              style={{
                transform: `rotate(${-(options.watermarkRotation ?? 45)}deg)`,
                color: options.watermarkColor || '#ff0000',
                fontSize: `${Math.min(32, Math.max(14, (options.watermarkFontSize || 48) / 2))}px`,
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              }}
            >
              {options.watermarkText || 'CONFIDENTIAL'}
            </span>
          </div>
        )}

        {/* 2. Live Overlay: Page Numbers */}
        {mode === 'pageNumbers' && (
          <div
            className={`absolute px-4 pointer-events-none ${getPageNumberPositionStyle()}`}
          >
            <span
              className="font-medium"
              style={{
                color: options.pageNumberColor || '#666666',
                fontSize: `${Math.min(14, Math.max(9, (options.pageNumberFontSize || 10) * 1.1))}px`,
              }}
            >
              {resolveMacroText(options.pageNumberFormat || 'Page {n} of {total}')}
            </span>
          </div>
        )}

        {/* 3. Live Overlay: Headers & Footers */}
        {mode === 'headersFooters' && (
          <>
            {/* Top Header */}
            <div className="absolute top-2 inset-x-3 flex items-center justify-between text-[8px] sm:text-[9px] font-medium text-slate-600 pointer-events-none border-b border-slate-200/60 pb-1">
              <span className="truncate max-w-[30%]">{resolveMacroText(options.headersFooters?.headerLeft || '')}</span>
              <span className="truncate max-w-[40%] text-center">{resolveMacroText(options.headersFooters?.headerCenter || '')}</span>
              <span className="truncate max-w-[30%] text-right">{resolveMacroText(options.headersFooters?.headerRight || '')}</span>
            </div>

            {/* Bottom Footer */}
            <div className="absolute bottom-2 inset-x-3 flex items-center justify-between text-[8px] sm:text-[9px] font-medium text-slate-600 pointer-events-none border-t border-slate-200/60 pt-1">
              <span className="truncate max-w-[30%]">{resolveMacroText(options.headersFooters?.footerLeft || '')}</span>
              <span className="truncate max-w-[40%] text-center">{resolveMacroText(options.headersFooters?.footerCenter || '')}</span>
              <span className="truncate max-w-[30%] text-right">{resolveMacroText(options.headersFooters?.footerRight || '')}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
