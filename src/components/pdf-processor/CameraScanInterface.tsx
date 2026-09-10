'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, Trash2, Download, Image as ImageIcon, VideoOff, ShieldCheck, CheckCircle2, RefreshCw, SwitchCamera } from 'lucide-react';
import { convertImagesToPdf } from '../../lib/pdf-operations';
import { createPdfBlob } from '../../lib/pdf-processor';

interface CameraScanInterfaceProps {
  onScanComplete?: (blob: Blob) => void;
  onGenerated?: (blob: Blob) => void;
}

export default function CameraScanInterface({ onScanComplete, onGenerated }: CameraScanInterfaceProps) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [hasMultipleCameras, setHasMultipleCameras] = useState(true);
  const [capturedPages, setCapturedPages] = useState<string[]>([]);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<'bw' | 'grayscale' | 'color'>('bw');
  const [isCompiling, setIsCompiling] = useState(false);
  const [flashEffect, setFlashEffect] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {
          // ignore
        }
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  }, []);

  const startCamera = async (targetFacing?: 'environment' | 'user') => {
    const mode = targetFacing || facingMode;
    try {
      setCameraError(null);
      // Stop any existing stream first
      stopCamera();

      if (!navigator?.mediaDevices?.getUserMedia) {
        throw new Error('Camera API is not supported in this browser environment.');
      }

      let mediaStream: MediaStream;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: mode },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        });
      } catch (constraintErr: unknown) {
        const errName = (constraintErr as Error).name;
        if (errName === 'OverconstrainedError' || errName === 'NotReadableError') {
          console.warn('Falling back to default camera constraints...', constraintErr);
          mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
        } else {
          throw constraintErr;
        }
      }

      streamRef.current = mediaStream;
      setIsCameraActive(true);
      setFacingMode(mode);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play().catch(() => {});
      }

      // Check available video devices
      if (navigator.mediaDevices.enumerateDevices) {
        try {
          const devices = await navigator.mediaDevices.enumerateDevices();
          const videoInputs = devices.filter((d) => d.kind === 'videoinput');
          setHasMultipleCameras(videoInputs.length > 1);
        } catch {
          // ignore
        }
      }
    } catch (err: unknown) {
      console.error('Camera access failed:', err);
      stopCamera();
      
      const error = err as Error;
      const errorName = error?.name || '';
      const message = error?.message || String(err) || 'Camera access denied or unavailable.';

      if (errorName === 'NotAllowedError' || message.toLowerCase().includes('permission') || message.toLowerCase().includes('denied')) {
        setCameraError('Camera permission was denied. Please allow camera access in your browser settings and click Turn On Camera again.');
      } else if (errorName === 'NotFoundError' || message.toLowerCase().includes('not found')) {
        setCameraError('No camera found on this device. Please connect a camera and try again.');
      } else if (errorName === 'NotReadableError' || message.toLowerCase().includes('in use') || message.toLowerCase().includes('start video source')) {
        setCameraError('Camera is in use by another application or blocked by your OS privacy settings (e.g., Windows Camera Privacy). Please close other apps and try again.');
      } else {
        setCameraError(`Could not access camera: ${message} (${errorName})`);
      }
    }
  };

  const flipCamera = async () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    if (isCameraActive) {
      await startCamera(nextMode);
    }
  };

  // Re-attach video stream if ref mounts while camera is active
  useEffect(() => {
    if (isCameraActive && streamRef.current && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(() => {});
    }
  }, [isCameraActive]);

  // Clean up all hardware camera streams when unmounting
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const handleCapture = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;

    // Trigger visual shutter flash
    setFlashEffect(true);
    setTimeout(() => setFlashEffect(false), 200);

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // If front camera, mirror image back for standard orientation
    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Apply document filter
    if (filterMode === 'bw' || filterMode === 'grayscale') {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imgData.data;

      for (let i = 0; i < d.length; i += 4) {
        const gray = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
        if (filterMode === 'bw') {
          const val = gray > 128 ? 255 : 0;
          d[i] = val;
          d[i + 1] = val;
          d[i + 2] = val;
        } else {
          d[i] = gray;
          d[i + 1] = gray;
          d[i + 2] = gray;
        }
      }
      ctx.putImageData(imgData, 0, 0);
    }

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedPages((prev) => [...prev, dataUrl]);
  };

  const handleCompile = async () => {
    if (capturedPages.length === 0) return;
    setIsCompiling(true);
    try {
      const files: File[] = [];
      for (let i = 0; i < capturedPages.length; i++) {
        const res = await fetch(capturedPages[i]);
        const blob = await res.blob();
        files.push(new File([blob], `scan_page_${i + 1}.jpg`, { type: 'image/jpeg' }));
      }

      const bytes = await convertImagesToPdf(files, { pageSize: 'a4', imageFit: 'contain' });
      const blob = createPdfBlob(bytes);

      if (onScanComplete) {
        onScanComplete(blob);
      } else if (onGenerated) {
        onGenerated(blob);
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `document_scan_${Date.now()}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Failed to compile scans:', err);
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <div className="surface-card rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:p-6 lg:p-7 space-y-5 sm:space-y-6 shadow-sm animate-fade-in">
      {/* Top Header & Responsive Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--tx)] flex items-center gap-2">
            <Camera className="h-5 w-5 text-[var(--accent)]" />
            Camera Document Scanner
          </h3>
          <p className="text-xs text-[var(--tx-2)] mt-0.5">
            Capture multi-page documents directly with your camera, apply clean scan filters, and export to PDF.
          </p>
        </div>

        {/* Action Controls Bar */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Turn On / Turn Off Button */}
          {isCameraActive ? (
            <button
              type="button"
              onClick={stopCamera}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[38px] rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs font-bold text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-xs cursor-pointer"
            >
              <VideoOff className="h-3.5 w-3.5" />
              <span>Turn Off Camera</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => startCamera()}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[38px] rounded-xl border border-[var(--accent-border)] bg-[var(--accent-soft)] text-xs font-bold text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all shadow-xs cursor-pointer"
            >
              <Camera className="h-3.5 w-3.5" />
              <span>Turn On Camera</span>
            </button>
          )}

          {/* Flip Camera Button */}
          <button
            type="button"
            onClick={flipCamera}
            title={facingMode === 'environment' ? 'Switch to Front Camera' : 'Switch to Back Camera'}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 min-h-[38px] rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] hover:border-[var(--accent-border)] text-xs font-semibold text-[var(--tx)] hover:text-[var(--accent)] transition-all shadow-xs cursor-pointer"
          >
            <SwitchCamera className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{facingMode === 'environment' ? 'Back Cam' : 'Front Cam'}</span>
            <span className="sm:hidden">Flip</span>
          </button>

          {/* Filter Mode Selector */}
          <div className="flex items-center gap-1 bg-[var(--bg-subtle)] p-1 rounded-xl border border-[var(--border)] shrink-0">
            <button
              type="button"
              onClick={() => setFilterMode('bw')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterMode === 'bw' ? 'bg-[var(--accent)] text-white shadow-xs' : 'text-[var(--tx-2)] hover:text-[var(--tx)]'
              }`}
            >
              B&W
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('grayscale')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterMode === 'grayscale' ? 'bg-[var(--accent)] text-white shadow-xs' : 'text-[var(--tx-2)] hover:text-[var(--tx)]'
              }`}
            >
              Gray
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('color')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterMode === 'color' ? 'bg-[var(--accent)] text-white shadow-xs' : 'text-[var(--tx-2)] hover:text-[var(--tx)]'
              }`}
            >
              Original
            </button>
          </div>
        </div>
      </div>

      {/* Main Viewport & Gallery Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
        {/* Viewfinder (Cols 1 & 2) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-950 aspect-[4/3] sm:aspect-video flex items-center justify-center border border-[var(--border)] shadow-md">
            {/* Shutter flash animation */}
            {flashEffect && (
              <div className="absolute inset-0 bg-white z-30 pointer-events-none animate-out fade-out duration-200" />
            )}

            {!isCameraActive ? (
              /* Standby / Camera Off State */
              <div className="p-6 sm:p-8 text-center space-y-4 max-w-sm mx-auto">
                <div className="flex h-14 sm:h-16 w-14 sm:w-16 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)] mx-auto shadow-xs">
                  <Camera className="h-7 sm:h-8 w-7 sm:w-8 stroke-[1.75]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Camera is Turned Off</h4>
                  <p className="text-xs text-neutral-400">
                    Click the button below when you are ready to scan physical documents with your camera.
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>100% On-Device &bull; Never Sent to Cloud</span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => startCamera()}
                    className="w-full sm:w-auto btn-primary py-3 px-6 rounded-xl font-bold text-white text-xs shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                  >
                    <Camera className="h-4 w-4" />
                    <span>Turn On Camera</span>
                  </button>
                  <button
                    type="button"
                    onClick={flipCamera}
                    className="w-full sm:w-auto px-4 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                  >
                    <SwitchCamera className="h-4 w-4" />
                    <span>Mode: {facingMode === 'environment' ? 'Back' : 'Front'}</span>
                  </button>
                </div>

                {cameraError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium space-y-2 mt-2">
                    <p>{cameraError}</p>
                    <button
                      type="button"
                      onClick={() => startCamera()}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500 text-white text-[11px] font-bold hover:bg-rose-600 cursor-pointer"
                    >
                      <RefreshCw className="h-3 w-3" />
                      <span>Retry Permissions</span>
                    </button>
                  </div>
                )}
              </div>
            ) : cameraError ? (
              /* Camera Error State */
              <div className="p-6 text-center text-rose-400 space-y-3 max-w-sm">
                <Camera className="h-10 w-10 mx-auto opacity-60" />
                <p className="text-xs font-medium">{cameraError}</p>
                <button
                  type="button"
                  onClick={() => startCamera()}
                  className="px-4 py-2 rounded-xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-colors cursor-pointer"
                >
                  Retry Camera
                </button>
              </div>
            ) : (
              /* Active Live Camera Stream */
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                />

                {/* Document Target Framing Guidelines */}
                <div className="absolute inset-6 sm:inset-8 border border-white/25 rounded-2xl pointer-events-none flex flex-col justify-between p-4">
                  <div className="flex justify-between">
                    <div className="w-6 h-6 border-t-2 border-l-2 border-[var(--accent)]" />
                    <div className="w-6 h-6 border-t-2 border-r-2 border-[var(--accent)]" />
                  </div>
                  <div className="flex justify-between">
                    <div className="w-6 h-6 border-b-2 border-l-2 border-[var(--accent)]" />
                    <div className="w-6 h-6 border-b-2 border-r-2 border-[var(--accent)]" />
                  </div>
                </div>

                {/* Top Overlay Bar */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                  {/* Live Status Overlay Pill */}
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] font-medium pointer-events-auto">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{facingMode === 'environment' ? 'Back Camera' : 'Front Camera'}</span>
                  </div>

                  {/* Top Controls: Flip & Turn Off */}
                  <div className="flex items-center gap-1.5 pointer-events-auto">
                    {hasMultipleCameras && (
                      <button
                        type="button"
                        onClick={flipCamera}
                        title="Flip Camera"
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white text-[11px] font-medium transition-colors cursor-pointer"
                      >
                        <SwitchCamera className="h-3 w-3" />
                        <span className="hidden sm:inline">Flip</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={stopCamera}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 hover:bg-rose-600 backdrop-blur-md border border-white/10 text-white text-[11px] font-medium transition-colors cursor-pointer"
                    >
                      <VideoOff className="h-3 w-3" />
                      <span>Turn Off</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Primary Viewfinder Trigger Action */}
          <div className="flex items-center justify-center">
            {isCameraActive ? (
              <button
                type="button"
                onClick={handleCapture}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl sm:rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 min-h-[48px]"
              >
                <Camera className="h-5 w-5" />
                <span>Capture Page #{capturedPages.length + 1}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => startCamera()}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl sm:rounded-full bg-[var(--bg-subtle)] hover:bg-[var(--accent)] hover:text-white border border-[var(--border)] text-[var(--tx)] font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <Camera className="h-4 w-4 text-[var(--accent)]" />
                <span>Turn On Camera to Capture</span>
              </button>
            )}
          </div>
        </div>

        {/* Captured Pages Gallery & PDF Compilation (Col 3) */}
        <div className="space-y-4 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[var(--border)] lg:pl-6 pt-4 lg:pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[var(--tx)] uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent)]" />
                Scanned Pages ({capturedPages.length})
              </h4>
              {capturedPages.length > 0 && (
                <button
                  type="button"
                  onClick={() => setCapturedPages([])}
                  className="text-[11px] text-rose-500 hover:underline cursor-pointer font-medium"
                >
                  Clear all
                </button>
              )}
            </div>

            {capturedPages.length === 0 ? (
              <div className="p-6 sm:p-8 rounded-2xl border border-dashed border-[var(--border)] text-center space-y-2 bg-[var(--bg-subtle)]/50">
                <ImageIcon className="h-7 w-7 text-[var(--tx-3)] mx-auto opacity-40" />
                <p className="text-xs text-[var(--tx-3)] font-medium">No pages captured yet.<br />Turn on camera to snap pages.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
                {capturedPages.map((src, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-[var(--border)] shadow-xs bg-neutral-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`Scan page ${idx + 1}`} className="w-full h-24 object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCapturedPages((prev) => prev.filter((_, i) => i !== idx))}
                        className="p-1.5 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition-colors cursor-pointer"
                        title="Delete page"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-white">
                      P. {idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Compilation Download Button */}
          <div className="pt-4 border-t border-[var(--border)]">
            <button
              type="button"
              onClick={handleCompile}
              disabled={capturedPages.length === 0 || isCompiling}
              className="w-full py-3.5 px-4 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <Download className="h-4 w-4" />
              <span>{isCompiling ? 'Generating PDF...' : `Download PDF (${capturedPages.length} Pages)`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


