'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Camera,
  Trash2,
  Download,
  Image as ImageIcon,
  VideoOff,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  SwitchCamera,
  AlertTriangle,
  Settings,
  HelpCircle,
  Monitor,
  Smartphone,
  ChevronDown,
} from 'lucide-react';
import { convertImagesToPdf } from '../../lib/pdf-operations';
import { createPdfBlob } from '../../lib/pdf-processor';
import { downloadBlob } from '../../lib/download-helper';

function dataUrlToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(',');
  const mimeMatch = parts[0]?.match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  const bstr = atob(parts[1] || '');
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

interface CameraScanInterfaceProps {
  onScanComplete?: (blob: Blob) => void;
  onGenerated?: (blob: Blob) => void;
}

export default function CameraScanInterface({ onScanComplete, onGenerated }: CameraScanInterfaceProps) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('user');
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'prompt' | 'denied' | 'unknown'>('unknown');
  const [showPermissionGuide, setShowPermissionGuide] = useState(false);
  const [capturedPages, setCapturedPages] = useState<string[]>([]);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [compileError, setCompileError] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<'bw' | 'grayscale' | 'color'>('bw');
  const [isCompiling, setIsCompiling] = useState(false);
  const [flashEffect, setFlashEffect] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Detect device type & query initial permission status
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (mobile) {
        setFacingMode('environment'); // default to rear document camera on mobile
      } else {
        setFacingMode('user'); // default to front/webcam on desktop/laptop
      }

      // Check permissions API if available
      if (navigator.permissions?.query) {
        navigator.permissions
          .query({ name: 'camera' as PermissionName })
          .then((res) => {
            setPermissionStatus(res.state as 'granted' | 'prompt' | 'denied');
            res.onchange = () => {
              setPermissionStatus(res.state as 'granted' | 'prompt' | 'denied');
              if (res.state === 'granted') {
                setCameraError(null);
                setShowPermissionGuide(false);
              }
            };
          })
          .catch(() => {
            setPermissionStatus('unknown');
          });
      }
    }
  }, []);

  // Enumerate cameras (available with labels once permission is granted)
  const refreshDevices = useCallback(async () => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.enumerateDevices) return;
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = devices.filter((d) => d.kind === 'videoinput');
      setAvailableCameras(videoInputs);
      if (videoInputs.length > 0 && !selectedDeviceId) {
        setSelectedDeviceId(videoInputs[0].deviceId);
      }
    } catch {
      // ignore
    }
  }, [selectedDeviceId]);

  // Stop camera tracks and release hardware back to the system OS
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

  // Error classifier for precise user feedback
  const handleCameraError = useCallback((err: unknown) => {
    stopCamera();
    const error = err as Error;
    const errorName = error?.name || '';
    const message = error?.message || String(err) || 'Camera access denied or unavailable.';

    if (
      errorName === 'NotAllowedError' ||
      errorName === 'PermissionDeniedError' ||
      message.toLowerCase().includes('permission') ||
      message.toLowerCase().includes('denied')
    ) {
      setPermissionStatus('denied');
      setShowPermissionGuide(true);
      setCameraError(
        'Camera permission was blocked by your browser or operating system. Click below for step-by-step instructions to enable permission.'
      );
    } else if (errorName === 'NotFoundError' || errorName === 'DevicesNotFoundError') {
      setCameraError('No camera found on this device. Please connect a webcam and click Turn On Camera.');
    } else if (
      errorName === 'NotReadableError' ||
      errorName === 'TrackStartError' ||
      message.toLowerCase().includes('in use') ||
      message.toLowerCase().includes('start video source')
    ) {
      setCameraError(
        'Camera is currently in use by another application (e.g. Zoom, Teams, Skype, Windows Camera) or blocked by Windows Camera Privacy. Close other apps and try again.'
      );
    } else if (errorName === 'OverconstrainedError') {
      setCameraError('Requested camera resolution or constraints are not supported by this hardware.');
    } else {
      setCameraError(`Could not access camera: ${message} (${errorName || 'Error'})`);
    }
  }, [stopCamera]);

  // Request camera stream with automatic fallback tiers
  const startCamera = async (targetFacing?: 'environment' | 'user', targetDeviceId?: string) => {
    const mode = targetFacing || facingMode;
    const devId = targetDeviceId !== undefined ? targetDeviceId : selectedDeviceId;

    try {
      setCameraError(null);
      stopCamera();

      if (typeof window !== 'undefined' && !window.isSecureContext) {
        throw new Error('Camera access requires a secure HTTPS connection or localhost.');
      }

      if (!navigator?.mediaDevices?.getUserMedia) {
        throw new Error('Camera API is not supported in this browser environment.');
      }

      let mediaStream: MediaStream | null = null;

      // Tier 1: Ideal HD scan resolution with preferred device/facing mode
      try {
        const videoConstraints: MediaTrackConstraints = devId
          ? { deviceId: { exact: devId }, width: { ideal: 1920 }, height: { ideal: 1080 } }
          : { facingMode: { ideal: mode }, width: { ideal: 1920 }, height: { ideal: 1080 } };

        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: videoConstraints,
          audio: false,
        });
      } catch (tier1Err: unknown) {
        const errorName = (tier1Err as Error)?.name;
        if (errorName === 'NotAllowedError') {
          handleCameraError(tier1Err);
          return;
        }
        console.warn('Tier 1 constraints failed, attempting Tier 2...', tier1Err);
      }

      // Tier 2: Without strict resolution constraints
      if (!mediaStream) {
        try {
          const fallbackConstraints: MediaTrackConstraints = devId
            ? { deviceId: devId }
            : { facingMode: { ideal: mode } };

          mediaStream = await navigator.mediaDevices.getUserMedia({
            video: fallbackConstraints,
            audio: false,
          });
        } catch (tier2Err: unknown) {
          const errorName = (tier2Err as Error)?.name;
          if (errorName === 'NotAllowedError') {
            handleCameraError(tier2Err);
            return;
          }
          console.warn('Tier 2 constraints failed, attempting Tier 3 standard video...', tier2Err);
        }
      }

      // Tier 3: Universal unconstrained video { video: true }
      if (!mediaStream) {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      streamRef.current = mediaStream;
      setIsCameraActive(true);
      setFacingMode(mode);
      setPermissionStatus('granted');
      setShowPermissionGuide(false);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play().catch(() => {});
      }

      // Refresh camera devices with labels now that permission has been granted
      await refreshDevices();
    } catch (err: unknown) {
      console.error('Camera access failed:', err);
      handleCameraError(err);
    }
  };

  // Flip front/rear camera
  const flipCamera = async () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    setSelectedDeviceId(''); // clear exact device id to allow facing mode switch
    if (isCameraActive) {
      await startCamera(nextMode, '');
    }
  };

  // Switch to specific camera device (e.g. laptop webcam vs external USB camera)
  const handleDeviceChange = async (newDeviceId: string) => {
    setSelectedDeviceId(newDeviceId);
    if (isCameraActive) {
      await startCamera(facingMode, newDeviceId);
    }
  };

  // Clean up all hardware camera streams on component unmount
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
    if (capturedPages.length === 0 || isCompiling) return;
    setIsCompiling(true);
    setCompileError(null);
    try {
      const files: File[] = [];
      for (let i = 0; i < capturedPages.length; i++) {
        const blob = dataUrlToBlob(capturedPages[i]);
        files.push(new File([blob], `scan_page_${i + 1}.jpg`, { type: blob.type || 'image/jpeg' }));
      }

      const bytes = await convertImagesToPdf(files, { pageSize: 'a4', imageFit: 'contain' });
      const blob = createPdfBlob(bytes);
      const downloadName = `camera_scan_${Date.now()}.pdf`;

      // Trigger download using universal cross-platform downloadBlob (Web Share on iOS, anchor on desktop)
      await downloadBlob(blob, downloadName, { isAutoTrigger: false });

      if (onScanComplete) {
        onScanComplete(blob);
      }
      if (onGenerated) {
        onGenerated(blob);
      }
    } catch (err: unknown) {
      console.error('Failed to compile scans:', err);
      const msg = err instanceof Error ? err.message : 'Error generating PDF';
      setCompileError(`Could not generate PDF: ${msg}. Please try capturing again.`);
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <div className="surface-card rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:p-6 lg:p-7 space-y-5 sm:space-y-6 shadow-sm animate-fade-in">
      {/* Top Header & Responsive Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-[var(--tx)] flex items-center gap-2">
              <Camera className="h-5 w-5 text-[var(--accent)]" />
              Camera Document Scanner
            </h3>
            {/* System Permission Badge */}
            {permissionStatus === 'granted' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Permission Granted
              </span>
            )}
            {permissionStatus === 'prompt' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Permission Needed
              </span>
            )}
            {permissionStatus === 'denied' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/10 text-rose-500 border border-rose-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                Permission Blocked
              </span>
            )}
          </div>
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

          {/* Camera Selection Dropdown (if multiple video inputs exist) */}
          {availableCameras.length > 1 ? (
            <div className="relative">
              <select
                value={selectedDeviceId}
                onChange={(e) => handleDeviceChange(e.target.value)}
                aria-label="Select Camera Device"
                className="appearance-none pl-3 pr-7 py-2 min-h-[38px] rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] text-xs font-semibold text-[var(--tx)] hover:border-[var(--accent-border)] focus:outline-none cursor-pointer"
              >
                {availableCameras.map((device, idx) => (
                  <option key={device.deviceId || idx} value={device.deviceId}>
                    {device.label || `Camera ${idx + 1}`}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none opacity-50" />
            </div>
          ) : (
            /* Flip Camera Button */
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
          )}

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

          {/* Help Toggle */}
          <button
            type="button"
            onClick={() => setShowPermissionGuide((prev) => !prev)}
            title="Permission Troubleshooting & Tips"
            className={`p-2 min-h-[38px] min-w-[38px] rounded-xl border transition-colors cursor-pointer flex items-center justify-center ${
              showPermissionGuide
                ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                : 'border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--tx-2)] hover:text-[var(--tx)]'
            }`}
          >
            <HelpCircle className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Permission Troubleshooting Guide Banner */}
      {showPermissionGuide && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border)] text-xs space-y-3 animate-fade-in">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 font-bold text-[var(--tx)]">
              <Settings className="h-4 w-4 text-[var(--accent)]" />
              <span>Camera Permission Troubleshooting Guide</span>
            </div>
            <button
              type="button"
              onClick={() => setShowPermissionGuide(false)}
              className="text-[var(--tx-3)] hover:text-[var(--tx)] cursor-pointer"
            >
              &times;
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[var(--tx-2)] leading-relaxed">
            <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] space-y-1.5">
              <div className="font-semibold text-[var(--tx)] flex items-center gap-1.5">
                <Monitor className="h-3.5 w-3.5 text-blue-500" />
                <span>1. Browser Permission (Chrome / Edge / Firefox)</span>
              </div>
              <ul className="list-disc pl-4 space-y-1">
                <li>Click the <strong>tune / lock icon 🔒</strong> at the left of the website address bar.</li>
                <li>Find <strong>Camera</strong> and toggle it to <strong>Allow</strong> or <strong>Ask</strong>.</li>
                <li>If set to &quot;Ask&quot;, your browser will prompt you for permission each time you turn on the camera.</li>
              </ul>
            </div>
            <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] space-y-1.5">
              <div className="font-semibold text-[var(--tx)] flex items-center gap-1.5">
                <Smartphone className="h-3.5 w-3.5 text-emerald-500" />
                <span>2. Windows System Privacy (Windows 10 / 11)</span>
              </div>
              <ul className="list-disc pl-4 space-y-1">
                <li>Open <strong>Windows Settings</strong> &rarr; <strong>Privacy & security</strong> &rarr; <strong>Camera</strong>.</li>
                <li>Ensure <strong>&quot;Camera access&quot;</strong> is switched <strong>ON</strong>.</li>
                <li>Ensure <strong>&quot;Let desktop apps access your camera&quot;</strong> is switched <strong>ON</strong> for your browser.</li>
              </ul>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => startCamera()}
              className="px-3.5 py-1.5 rounded-lg bg-[var(--accent)] text-white font-bold hover:bg-[var(--accent-hover)] transition-colors cursor-pointer flex items-center gap-1.5 text-xs shadow-xs"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Request System Permission Now</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Viewport & Gallery Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
        {/* Viewfinder (Cols 1 & 2) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-950 aspect-[4/3] sm:aspect-video flex items-center justify-center border border-[var(--border)] shadow-md">
            {/* Shutter flash animation */}
            {flashEffect && (
              <div className="absolute inset-0 bg-white z-30 pointer-events-none animate-out fade-out duration-200" />
            )}

            {/* Video Element (ALWAYS mounted to eliminate ref race conditions) */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isCameraActive && !cameraError ? 'opacity-100 block' : 'opacity-0 hidden'
              } ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
              onLoadedMetadata={() => {
                videoRef.current?.play().catch(() => {});
              }}
            />

            {/* Standby / Camera Off State */}
            {!isCameraActive && (
              <div className="p-6 sm:p-8 text-center space-y-4 max-w-sm mx-auto z-10">
                <div className="flex h-14 sm:h-16 w-14 sm:w-16 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)] mx-auto shadow-xs">
                  <Camera className="h-7 sm:h-8 w-7 sm:w-8 stroke-[1.75]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Camera is Ready</h4>
                  <p className="text-xs text-neutral-400">
                    Click Turn On Camera. Your system or browser will prompt you for camera permission.
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
                    <span>{facingMode === 'environment' ? 'Back Cam' : 'Front Cam'}</span>
                  </button>
                </div>

                {cameraError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium space-y-2 mt-2">
                    <p>{cameraError}</p>
                    <div className="flex items-center justify-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => startCamera()}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500 text-white text-[11px] font-bold hover:bg-rose-600 cursor-pointer"
                      >
                        <RefreshCw className="h-3 w-3" />
                        <span>Retry Permission</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowPermissionGuide(true)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 text-white text-[11px] font-bold hover:bg-white/20 cursor-pointer"
                      >
                        <Settings className="h-3 w-3" />
                        <span>How to Allow</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Active Live Camera Stream Overlays */}
            {isCameraActive && !cameraError && (
              <>
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
                <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-20">
                  {/* Live Status Overlay Pill */}
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] font-medium pointer-events-auto">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>
                      {selectedDeviceId && availableCameras.length > 0
                        ? availableCameras.find((d) => d.deviceId === selectedDeviceId)?.label || 'Live Camera'
                        : facingMode === 'environment'
                        ? 'Back Camera'
                        : 'Front Camera'}
                    </span>
                  </div>

                  {/* Top Controls: Flip & Turn Off */}
                  <div className="flex items-center gap-1.5 pointer-events-auto">
                    {availableCameras.length > 1 ? (
                      <button
                        type="button"
                        onClick={flipCamera}
                        title="Switch Camera"
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white text-[11px] font-medium transition-colors cursor-pointer"
                      >
                        <SwitchCamera className="h-3 w-3" />
                        <span className="hidden sm:inline">Switch</span>
                      </button>
                    ) : null}

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

            {/* In-Viewfinder Camera Error State */}
            {isCameraActive && cameraError && (
              <div className="p-6 text-center text-rose-400 space-y-3 max-w-sm z-20">
                <AlertTriangle className="h-10 w-10 mx-auto opacity-70" />
                <p className="text-xs font-medium">{cameraError}</p>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => startCamera()}
                    className="px-4 py-2 rounded-xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-colors cursor-pointer"
                  >
                    Retry Permission
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPermissionGuide(true)}
                    className="px-4 py-2 rounded-xl border border-white/20 bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    Settings Guide
                  </button>
                </div>
              </div>
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
            {compileError && (
              <div className="p-3 mb-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span className="leading-tight">{compileError}</span>
              </div>
            )}
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
