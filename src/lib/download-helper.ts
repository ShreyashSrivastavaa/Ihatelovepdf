/**
 * Safe multi-platform download and file-sharing helper
 * Optimized for iOS WebKit (Safari / Chrome on iOS / In-App Browsers), Android, and Desktop browsers.
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
  const userAgent = navigator.userAgent || navigator.vendor || '';
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) || isIOS();
}

/**
 * Resolves standard MIME types across iOS WebKit and Android
 */
export function resolveMimeType(fileName: string, explicitMime?: string): string {
  if (explicitMime && explicitMime !== 'application/octet-stream' && explicitMime !== '') {
    return explicitMime;
  }
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf':
      return 'application/pdf';
    case 'zip':
      return 'application/zip';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'txt':
      return 'text/plain;charset=utf-8';
    case 'html':
      return 'text/html;charset=utf-8';
    case 'csv':
      return 'text/csv;charset=utf-8';
    case 'xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    case 'pptx':
      return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    case 'epub':
      return 'application/epub+zip';
    case 'json':
      return 'application/json';
    default:
      return explicitMime || 'application/octet-stream';
  }
}

export interface DownloadBlobOptions {
  /** If true, this is an automatic programmatic trigger without direct user interaction */
  isAutoTrigger?: boolean;
  /** Fallback MIME type if blob type is empty */
  mimeType?: string;
  /** Called if share/download completes successfully */
  onSuccess?: () => void;
  /** Called if an error occurs */
  onError?: (err: unknown) => void;
}

/**
 * Universally downloads or shares a Blob across iOS, Android, and Desktop browsers.
 *
 * - On iOS when user clicked: Uses Web Share API (`navigator.share({ files })`) which invokes
 *   the native iOS Share Sheet ("Save to Files" / AirDrop / apps). If Web Share is cancelled
 *   or unsupported, falls back to opening the blob in a new tab with iOS Safari native viewer.
 * - On iOS when auto-triggered: WebKit blocks programmatic downloads after async operations.
 *   Avoids broken phantom clicks and allows UI dialogs to present a direct tap action.
 * - On Desktop / Android: Creates an anchor with `download` attribute and triggers download
 *   with safe, delayed URL cleanup (retained for 60 seconds, NEVER revoked synchronously).
 */
export async function downloadBlob(
  blob: Blob,
  fileName: string,
  options: DownloadBlobOptions = {}
): Promise<void> {
  if (typeof window === 'undefined') return;

  const mime = resolveMimeType(fileName, blob.type || options.mimeType);
  const ios = isIOS();

  // If this is an auto-trigger without direct immediate user tap
  if (options.isAutoTrigger) {
    if (ios) {
      // iOS WebKit security sandbox blocks programmatic .click() after asynchronous tasks.
      // We gracefully yield so the UI presents the prominent "Save to Files / Download" button for user tap.
      console.info(`[DownloadHelper] iOS auto-download bypassed for ${fileName}; awaiting user tap.`);
      return;
    }
  }

  // Handle iOS user-initiated action
  if (ios) {
    // 1. Try Web Share API with File (Invokes native iOS "Save to Files" / Share sheet)
    try {
      if (typeof File !== 'undefined' && typeof navigator !== 'undefined' && navigator.share && navigator.canShare) {
        const file = new File([blob], fileName, { type: mime, lastModified: Date.now() });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: fileName,
          });
          options.onSuccess?.();
          return;
        }
      }
    } catch (err: unknown) {
      // If user dismissed/cancelled share sheet (AbortError), exit cleanly without error
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      console.warn('[DownloadHelper] Web Share API failed on iOS, falling back to tab preview/anchor:', err);
    }

    // 2. iOS Fallback: Open in new tab or standard anchor with target="_blank"
    try {
      openBlobInNewTab(blob, fileName);
      options.onSuccess?.();
      return;
    } catch (err) {
      console.error('[DownloadHelper] Failed to open blob in new tab on iOS:', err);
    }
  }

  // Desktop, Android, and universal fallback anchor download
  try {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.rel = 'noopener noreferrer';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Keep URL alive for 90 seconds so slow downloads don't fail, then safely revoke
    setTimeout(() => {
      try {
        URL.revokeObjectURL(url);
      } catch {
        // ignore
      }
    }, 90000);

    options.onSuccess?.();
  } catch (err) {
    console.error('[DownloadHelper] Anchor download failed:', err);
    options.onError?.(err);
    openBlobInNewTab(blob, fileName);
  }
}

/**
 * Safely opens a Blob in a new browser tab for viewing or saving on mobile.
 */
export function openBlobInNewTab(blob: Blob, fileName?: string): void {
  if (typeof window === 'undefined') return;
  const url = URL.createObjectURL(blob);
  const newWindow = window.open(url, '_blank');

  // If popup blocker intervened or opened synchronously
  if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    if (fileName) {
      link.setAttribute('title', fileName);
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Retain URL for 2 minutes to allow mobile reader to complete rendering
  setTimeout(() => {
    try {
      URL.revokeObjectURL(url);
    } catch {
      // ignore
    }
  }, 120000);
}
