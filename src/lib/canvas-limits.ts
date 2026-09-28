/**
 * iOS Safari Canvas and Memory Constraint Utilities
 *
 * iOS WebKit enforces hard limits on HTML5 Canvas instances:
 * - Maximum single canvas area: ~16.7 million pixels (clamped to 12M pixels for safety margin on 3GB/4GB devices)
 * - Maximum single canvas dimension: 4096px
 * - Cumulative canvas backing store memory: tabs are killed by WebKit when exceeding ~384MB - 1GB.
 *
 * These helpers guarantee all PDF page rasterization, color inversion, slide rendering,
 * and thumbnail pipelines operate safely within WebKit thresholds and release memory immediately.
 */

export function isIOS(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  const userAgent = navigator.userAgent || navigator.vendor || '';
  const isIosDevice = /iPad|iPhone|iPod/.test(userAgent);
  const isIpadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  return isIosDevice || isIpadOS;
}

export function isMobile(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return isIOS() || /android|mobile|touch/i.test(navigator.userAgent || '');
}

// 12 million pixels max for iOS (WebKit fails around 16.7M, older devices lower)
export const IOS_MAX_CANVAS_AREA = 12_000_000;
export const IOS_MAX_CANVAS_DIMENSION = 4096;

// Desktop safe limits
export const DESKTOP_MAX_CANVAS_AREA = 25_000_000;
export const DESKTOP_MAX_CANVAS_DIMENSION = 8192;

export interface ClampedDimensions {
  scale: number;
  width: number;
  height: number;
}

/**
 * Calculates a safe render scale and pixel dimensions that never exceed WebKit limits.
 */
export function clampCanvasScale(
  unscaledWidth: number,
  unscaledHeight: number,
  targetScale: number = 1.0,
  forceIOSConstraint?: boolean
): ClampedDimensions {
  const isIos = forceIOSConstraint !== undefined ? forceIOSConstraint : isIOS();
  const maxArea = isIos ? IOS_MAX_CANVAS_AREA : DESKTOP_MAX_CANVAS_AREA;
  const maxDim = isIos ? IOS_MAX_CANVAS_DIMENSION : DESKTOP_MAX_CANVAS_DIMENSION;

  let scale = Math.max(0.1, targetScale);
  let w = Math.ceil(unscaledWidth * scale);
  let h = Math.ceil(unscaledHeight * scale);

  // 1. Clamp single dimension limit
  if (w > maxDim || h > maxDim) {
    const dimScale = Math.min(maxDim / (unscaledWidth || 1), maxDim / (unscaledHeight || 1));
    scale = Math.min(scale, dimScale);
    w = Math.ceil(unscaledWidth * scale);
    h = Math.ceil(unscaledHeight * scale);
  }

  // 2. Clamp total pixel area limit
  const area = w * h;
  if (area > maxArea) {
    const areaScale = Math.sqrt(maxArea / (area || 1));
    scale = scale * areaScale;
    w = Math.ceil(unscaledWidth * scale);
    h = Math.ceil(unscaledHeight * scale);
  }

  return {
    scale,
    width: Math.max(1, w),
    height: Math.max(1, h),
  };
}

/**
 * Completely zeroes out canvas backing store and frees graphics memory in WebKit.
 * Simply dropping the JS reference leaves the backing store allocated in GPU/RAM.
 */
export function releaseCanvas(canvas: HTMLCanvasElement | OffscreenCanvas | null | undefined): void {
  if (!canvas) return;
  try {
    if ('width' in canvas && 'height' in canvas) {
      canvas.width = 0;
      canvas.height = 0;
    }
  } catch {
    // ignore
  }
}

/**
 * Safely releases PDF.js page resources and caches.
 */
export function cleanupPdfPage(page: { cleanup?: () => void } | null | undefined): void {
  if (!page || typeof page.cleanup !== 'function') return;
  try {
    page.cleanup();
  } catch {
    // ignore
  }
}
