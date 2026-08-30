"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { PDFProcessingMode, PDFProcessingOptions, renderPdfThumbnail } from '../../lib/pdf-processor';
import { Eye, Sparkles, Loader2 } from 'lucide-react';

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

  // Watermark options (resolving nested object or flat props)
  const wm = options.watermark || {};
  const watermarkText = wm.watermarkText ?? options.watermarkText ?? 'CONFIDENTIAL';
  const watermarkColor = wm.watermarkColor ?? options.watermarkColor ?? '#ff0000';
  const watermarkOpacity = wm.watermarkOpacity ?? options.watermarkOpacity ?? 0.35;
  const watermarkRotation = wm.watermarkRotation ?? options.watermarkRotation ?? 45;
  const watermarkPosition = wm.watermarkPosition ?? options.watermarkPosition ?? 'center';
  const watermarkFontSize = wm.watermarkFontSize ?? options.watermarkFontSize ?? 48;

  // Watermark positioning flex alignment classes
  const getWatermarkPositionClasses = () => {
    switch (watermarkPosition) {
      case 'top-left':
        return 'items-start justify-start text-left';
      case 'top-center':
        return 'items-start justify-center text-center';
      case 'top-right':
        return 'items-start justify-end text-right';
      case 'bottom-left':
        return 'items-end justify-start text-left';
      case 'bottom-center':
        return 'items-end justify-center text-center';
      case 'bottom-right':
        return 'items-end justify-end text-right';
      case 'tile':
      case 'center':
      default:
        return 'items-center justify-center text-center';
    }
  };

  // Page Numbers options (resolving nested object or flat props)
  const pn = options.pageNumbers || {};
  const pageNumberFormat = pn.pageNumberFormat ?? options.pageNumberFormat ?? 'page_n_of_total';
  const pageNumberPosition = pn.pageNumberPosition ?? options.pageNumberPosition ?? 'bottom-center';
  const pageNumberColor = pn.pageNumberColor ?? options.pageNumberColor ?? '#666666';
  const pageNumberFontSize = pn.pageNumberFontSize ?? options.pageNumberFontSize ?? 11;
  const pageNumberStart = pn.pageNumberStartNumber ?? options.pageNumberStart ?? 1;
  const pageNumberSkipFirst = pn.skipFirstPage ?? options.pageNumberSkipFirst ?? false;

  // Page Numbers positioning styles
  const getPageNumberPositionStyle = () => {
    switch (pageNumberPosition) {
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

  const resolveMacroText = (template: string, pageNum: number = 1, totalPages: number = 8) => {
    const today = new Date().toISOString().split('T')[0];
    return template
      .replace(/\{page\}/gi, String(pageNum))
      .replace(/\{n\}/gi, String(pageNum))
      .replace(/\{total\}/gi, String(totalPages))
      .replace(/\{date\}/gi, today)
      .replace(/\{title\}/gi, file ? file.name.replace(/\.[^/.]+$/, '') : 'Document');
  };

  const formatPageNumberText = (fmt: string, n: number, total: number) => {
    switch (fmt) {
      case 'page_n_of_total':
        return `Page ${n} of ${total}`;
      case 'n_of_total':
        return `${n} / ${total}`;
      case 'page_n':
        return `Page ${n}`;
      case 'n':
        return `${n}`;
      case 'dash_n_dash':
        return `- ${n} -`;
      default:
        return resolveMacroText(fmt, n, total);
    }
  };

  // Headers & Footers options
  const hf = options.headersFooters || {};

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:p-5 space-y-3 shadow-xs">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[var(--tx)] flex items-center gap-1.5 uppercase tracking-wider">
          <Eye className="h-3.5 w-3.5 text-[var(--accent)]" />
          Live Preview (Page 1)
        </span>
        <span className="text-[11px] text-[var(--tx-3)] font-medium flex items-center gap-1">
          {isLoading ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin text-[var(--accent)]" />
              <span>Rendering...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-3 w-3 text-[var(--accent)]" />
              <span>Instant updates</span>
            </>
          )}
        </span>
      </div>

      {/* Preview Canvas Container */}
      <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] aspect-[1/1.38] rounded-xl border border-[var(--border)] bg-white shadow-md overflow-hidden flex items-center justify-center select-none">
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex flex-col items-center justify-center z-10 gap-2 text-slate-700">
            <Loader2 className="h-6 w-6 animate-spin text-[var(--accent)]" />
            <span className="text-[11px] font-semibold">Generating Preview...</span>
          </div>
        )}

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
          watermarkPosition === 'tile' ? (
            <div
              className="absolute inset-0 p-3 grid grid-cols-2 grid-rows-3 gap-2 pointer-events-none"
              style={{ opacity: watermarkOpacity }}
            >
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center justify-center overflow-hidden">
                  <span
                    className="font-extrabold uppercase whitespace-nowrap tracking-wider text-center"
                    style={{
                      transform: `rotate(${-(watermarkRotation)}deg)`,
                      color: watermarkColor,
                      fontSize: `${Math.round(Math.max(10, Math.min(36, watermarkFontSize * 0.35)))}px`,
                      textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    }}
                  >
                    {watermarkText}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div
              className={`absolute inset-0 p-5 flex pointer-events-none ${getWatermarkPositionClasses()}`}
              style={{
                opacity: watermarkOpacity,
              }}
            >
              <span
                className="font-extrabold uppercase whitespace-nowrap tracking-wider text-center transition-transform duration-150 inline-block"
                style={{
                  transform: `rotate(${-(watermarkRotation)}deg)`,
                  color: watermarkColor,
                  fontSize: `${Math.round(Math.max(12, Math.min(52, watermarkFontSize * 0.48)))}px`,
                  textShadow: '0 1px 2px rgba(0,0,0,0.12)',
                }}
              >
                {watermarkText}
              </span>
            </div>
          )
        )}

        {/* 2. Live Overlay: Page Numbers */}
        {mode === 'pageNumbers' && (
          pageNumberSkipFirst ? (
            <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-slate-100/80 text-[9px] font-mono text-slate-500 border border-slate-200">
              Page 1 (Cover - Skipped)
            </div>
          ) : (
            <div
              className={`absolute px-4 pointer-events-none ${getPageNumberPositionStyle()}`}
            >
              <span
                className="font-medium font-mono"
                style={{
                  color: pageNumberColor,
                  fontSize: `${Math.min(14, Math.max(9, pageNumberFontSize * 1.1))}px`,
                }}
              >
                {formatPageNumberText(pageNumberFormat, pageNumberStart, 8)}
              </span>
            </div>
          )
        )}

        {/* 3. Live Overlay: Headers & Footers */}
        {mode === 'headersFooters' && (
          hf.skipFirstPage ? (
            <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-slate-100/80 text-[9px] font-mono text-slate-500 border border-slate-200">
              Page 1 (Header/Footer Excluded)
            </div>
          ) : (
            <>
              {/* Top Header */}
              <div
                style={{
                  top: `${Math.max(4, Math.round((hf.margin ?? 25) / 4))}px`,
                  color: hf.color || '#4b5563',
                  fontSize: `${Math.min(12, Math.max(7, Math.round((hf.fontSize ?? 10) * 0.85)))}px`,
                }}
                className="absolute inset-x-3 flex items-center justify-between font-medium pointer-events-none border-b border-slate-200/60 pb-0.5"
              >
                <span className="truncate max-w-[30%]">{resolveMacroText(hf.headerLeft || '')}</span>
                <span className="truncate max-w-[40%] text-center">{resolveMacroText(hf.headerCenter || '')}</span>
                <span className="truncate max-w-[30%] text-right">{resolveMacroText(hf.headerRight || '')}</span>
              </div>

              {/* Bottom Footer */}
              <div
                style={{
                  bottom: `${Math.max(4, Math.round((hf.margin ?? 25) / 4))}px`,
                  color: hf.color || '#4b5563',
                  fontSize: `${Math.min(12, Math.max(7, Math.round((hf.fontSize ?? 10) * 0.85)))}px`,
                }}
                className="absolute inset-x-3 flex items-center justify-between font-medium pointer-events-none border-t border-slate-200/60 pt-0.5"
              >
                <span className="truncate max-w-[30%]">{resolveMacroText(hf.footerLeft || '')}</span>
                <span className="truncate max-w-[40%] text-center">{resolveMacroText(hf.footerCenter || '')}</span>
                <span className="truncate max-w-[30%] text-right">{resolveMacroText(hf.footerRight || '')}</span>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}
