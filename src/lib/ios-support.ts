/**
 * Comprehensive iOS Safari & WebKit Compatibility Layer
 *
 * Provides shared utilities for:
 * 1. Safe worker execution with transparent main-thread fallback
 * 2. Mobile image normalization (Camera Roll photos, HEIC, large JPEGs)
 * 3. iOS memory and canvas boundary guards
 */

import { isIOS, isMobile, clampCanvasScale, releaseCanvas, cleanupPdfPage } from './canvas-limits';

export { isIOS, isMobile, clampCanvasScale, releaseCanvas, cleanupPdfPage };

/**
 * Runs a worker operation with timeout and transparent fallback to the main thread.
 * If WebKit blocks the worker, worker startup hangs, or OffscreenCanvas throws,
 * execution gracefully continues on the main thread without failing the user's action.
 */
export async function runWithWorkerFallback<T>(
  workerFn: () => Promise<T>,
  fallbackFn: () => Promise<T>,
  timeoutMs = 15000
): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  try {
    const workerPromise = workerFn();

    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error(`Worker execution timed out after ${timeoutMs}ms; falling back to main thread.`));
      }, timeoutMs);
    });

    const result = await Promise.race([workerPromise, timeoutPromise]);
    if (timeoutId) clearTimeout(timeoutId);
    return result;
  } catch (err) {
    if (timeoutId) clearTimeout(timeoutId);
    console.warn('[iOS Support] Worker execution failed or timed out, executing main-thread fallback:', err);
    return fallbackFn();
  }
}

/**
 * Normalizes an image for PDF embedding on iOS Safari.
 * Clamps dimensions if an iPhone 48MP photo exceeds maximum canvas texture sizes,
 * and converts to a clean JPEG or PNG Uint8Array.
 */
export async function normalizeImageForPdf(
  fileOrData: File | ArrayBuffer | Uint8Array
): Promise<{ bytes: Uint8Array; format: 'png' | 'jpeg' }> {
  // If already standard PNG or JPEG File
  if (fileOrData instanceof File) {
    const lowerName = fileOrData.name.toLowerCase();
    const mime = (fileOrData.type || '').toLowerCase();

    // Direct embed if standard format under 15MB
    if (fileOrData.size < 15 * 1024 * 1024) {
      if (mime === 'image/png' || lowerName.endsWith('.png')) {
        return { bytes: new Uint8Array(await fileOrData.arrayBuffer()), format: 'png' };
      }
      if (mime === 'image/jpeg' || mime === 'image/jpg' || lowerName.endsWith('.jpg') || lowerName.endsWith('.jpeg')) {
        return { bytes: new Uint8Array(await fileOrData.arrayBuffer()), format: 'jpeg' };
      }
    }
  }

  const data = fileOrData instanceof File ? fileOrData : new Blob([fileOrData as BlobPart]);

  // Attempt createImageBitmap
  if (typeof createImageBitmap === 'function') {
    try {
      const bitmap = await createImageBitmap(data);
      const { width: origW, height: origH } = bitmap;

      // Clamp dimensions to iOS safe bounds (max 3840px on longest edge)
      const maxDim = isIOS() ? 3840 : 6000;
      let w = origW;
      let h = origH;
      if (w > maxDim || h > maxDim) {
        const ratio = Math.min(maxDim / w, maxDim / h);
        w = Math.round(w * ratio);
        h = Math.round(h * ratio);
      }

      let canvas: HTMLCanvasElement | OffscreenCanvas;
      if (typeof OffscreenCanvas !== 'undefined') {
        canvas = new OffscreenCanvas(w, h);
      } else if (typeof document !== 'undefined') {
        canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
      } else {
        throw new Error('Canvas unavailable');
      }

      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
      ctx.drawImage(bitmap, 0, 0, w, h);
      bitmap.close();

      let blob: Blob;
      if (canvas instanceof OffscreenCanvas) {
        blob = await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.92 });
      } else {
        blob = await new Promise<Blob>((resolve, reject) => {
          (canvas as HTMLCanvasElement).toBlob(
            (b) => (b ? resolve(b) : reject(new Error('Canvas toBlob failed'))),
            'image/jpeg',
            0.92
          );
        });
      }

      releaseCanvas(canvas);
      return { bytes: new Uint8Array(await blob.arrayBuffer()), format: 'jpeg' };
    } catch (bitmapErr) {
      console.warn('[iOS Support] createImageBitmap failed, attempting <img> fallback:', bitmapErr);
    }
  }

  // HTML Image element fallback for mobile browsers
  if (typeof document !== 'undefined') {
    const url = URL.createObjectURL(data);
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.onerror = (e) => reject(e);
        el.src = url;
      });

      const maxDim = isIOS() ? 3840 : 6000;
      let w = img.naturalWidth || img.width;
      let h = img.naturalHeight || img.height;
      if (w > maxDim || h > maxDim) {
        const ratio = Math.min(maxDim / w, maxDim / h);
        w = Math.round(w * ratio);
        h = Math.round(h * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, w, h);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error('HTMLCanvasElement toBlob failed'))),
          'image/jpeg',
          0.92
        );
      });

      releaseCanvas(canvas);
      return { bytes: new Uint8Array(await blob.arrayBuffer()), format: 'jpeg' };
    } finally {
      setTimeout(() => {
        try {
          URL.revokeObjectURL(url);
        } catch {
          // ignore
        }
      }, 5000);
    }
  }

  // Raw buffer fallback
  const buffer = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  return { bytes: new Uint8Array(buffer as ArrayBuffer), format: 'jpeg' };
}
