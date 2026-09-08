/**
 * Safe multi-platform download and file-sharing helper
 * Optimized for iOS WebKit (Safari / Chrome on iOS), Android, and Desktop browsers.
 */

export function isIOS(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  const userAgent = navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || '';
  const isIosDevice = /iPad|iPhone|iPod/.test(userAgent);
  const isIpadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  return isIosDevice || isIpadOS;
}

export function isMobile(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  const userAgent = navigator.userAgent || navigator.vendor || '';
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) || isIOS();
}

export interface DownloadBlobOptions {
  /** If true, this is an automatic programmatic trigger without direct user interaction (e.g. at end of processing) */
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
 * - On iOS when user clicked: Uses Web Share API (`navigator.share({ files })`) which opens
 *   the native iOS Share Sheet ("Save to Files" / AirDrop / apps). If Web Share is cancelled
 *   or unsupported, falls back to opening the blob in a new tab with iOS Safari native PDF reader.
 * - On iOS when auto-triggered: iOS suppresses non-gesture programmatic downloads/popups. We gracefully
 *   avoid phantom blocked downloads and allow the UI dialog / result panel to offer direct tap actions.
 * - On Desktop / Android: Creates an anchor with `download` attribute and triggers download with safe URL cleanup.
 */
export async function downloadBlob(
  blob: Blob,
  fileName: string,
  options: DownloadBlobOptions = {}
): Promise<void> {
  if (typeof window === 'undefined') return;

  const mime = blob.type || options.mimeType || 'application/pdf';
  const ios = isIOS();

  // If this is an auto-trigger (post-processing completion without immediate user click)
  if (options.isAutoTrigger) {
    if (ios) {
      // iOS WebKit security sandbox actively blocks programmatic .click() on blob links
      // after asynchronous operations, or opens a blank about:blank.
      // We do not force a broken synthetic click on iOS; the UI will present the
      // prominent "Save PDF / Save to Files" button for the user to tap.
      return;
    }
  }

  // Handle iOS user-initiated action
  if (ios) {
    // 1. Try Web Share API with File if supported (best iOS experience: invokes "Save to Files")
    try {
      if (typeof File !== 'undefined' && navigator.share && navigator.canShare) {
        const file = new File([blob], fileName, { type: mime });
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
      // If user aborted/cancelled the share sheet (AbortError), exit cleanly
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      console.warn('[downloadBlob] Web Share API failed on iOS, falling back to new tab preview:', err);
    }

    // 2. iOS Fallback: Open in new tab so Safari's native PDF reader renders it with system Share/Save button
    try {
      openBlobInNewTab(blob, fileName);
      options.onSuccess?.();
      return;
    } catch (err) {
      console.error('[downloadBlob] Failed to open blob in new tab on iOS:', err);
    }
  }

  // Desktop and Android standard anchor download
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

    // Keep URL alive for 60 seconds so slow downloads don't fail, then safely revoke
    setTimeout(() => {
      try {
        URL.revokeObjectURL(url);
      } catch {
        // ignore
      }
    }, 60000);

    options.onSuccess?.();
  } catch (err) {
    console.error('[downloadBlob] Anchor download failed:', err);
    options.onError?.(err);
    // Ultimate fallback: open in window
    openBlobInNewTab(blob, fileName);
  }
}

/**
 * Safely opens a Blob in a new browser tab for viewing/saving.
 */
export function openBlobInNewTab(blob: Blob, fileName?: string): void {
  if (typeof window === 'undefined') return;
  const url = URL.createObjectURL(blob);
  const newWindow = window.open(url, '_blank');

  // If popup blocker intervened or opened synchronously
  if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
    // Attempt anchor with target="_blank"
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

  // Retain URL for 2 minutes to allow viewer to load
  setTimeout(() => {
    try {
      URL.revokeObjectURL(url);
    } catch {
      // ignore
    }
  }, 120000);
}
