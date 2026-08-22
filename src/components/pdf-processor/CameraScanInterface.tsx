'use client';

import { useState, useRef, useEffect } from 'react';
import { Camera, Trash2, Download, Image as ImageIcon } from 'lucide-react';
import { convertImagesToPdf } from '../../lib/pdf-operations';
import { createPdfBlob } from '../../lib/pdf-processor';

interface CameraScanInterfaceProps {
  onScanComplete?: (blob: Blob) => void;
  onGenerated?: (blob: Blob) => void;
}

export default function CameraScanInterface({ onScanComplete, onGenerated }: CameraScanInterfaceProps) {
  const [capturedPages, setCapturedPages] = useState<string[]>([]);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<'bw' | 'grayscale' | 'color'>('bw');
  const [isCompiling, setIsCompiling] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });
      streamRef.current = mediaStream;
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Camera access failed:', err);
      setCameraError('Camera access was denied or not available. Please allow camera permissions.');
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d')!;

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

    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
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
        a.download = `camera_scan_${Date.now()}.pdf`;
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
    <div className="surface-card rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:p-7 space-y-6 shadow-sm animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <h3 className="text-lg font-bold text-[var(--tx)] flex items-center gap-2">
            <Camera className="h-5 w-5 text-[var(--accent)]" />
            Camera Document Scanner
          </h3>
          <p className="text-xs text-[var(--tx-2)] mt-0.5">
            Capture multi-page documents directly with your camera, apply clean scan filters, and export to PDF.
          </p>
        </div>

        {/* Filter Mode Selector */}
        <div className="flex items-center gap-2 bg-[var(--bg-subtle)] p-1 rounded-xl border border-[var(--border)] shrink-0">
          <button
            type="button"
            onClick={() => setFilterMode('bw')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterMode === 'bw' ? 'bg-[var(--accent)] text-white' : 'text-[var(--tx-2)] hover:text-[var(--tx)]'
            }`}
          >
            B&W Doc
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('grayscale')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterMode === 'grayscale' ? 'bg-[var(--accent)] text-white' : 'text-[var(--tx-2)] hover:text-[var(--tx)]'
            }`}
          >
            Grayscale
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('color')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterMode === 'color' ? 'bg-[var(--accent)] text-white' : 'text-[var(--tx-2)] hover:text-[var(--tx)]'
            }`}
          >
            Original
          </button>
        </div>
      </div>

      {/* Main Viewport & Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Viewfinder (Col 1-2) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center border border-[var(--border)] shadow-md">
            {cameraError ? (
              <div className="p-6 text-center text-rose-400 space-y-2">
                <Camera className="h-8 w-8 mx-auto opacity-60" />
                <p className="text-xs">{cameraError}</p>
                <button
                  type="button"
                  onClick={startCamera}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 text-xs font-semibold hover:bg-rose-500/30 transition-colors"
                >
                  Retry Camera
                </button>
              </div>
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            )}

            {/* Viewfinder Target Guidelines */}
            <div className="absolute inset-8 border border-white/20 rounded-xl pointer-events-none" />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={handleCapture}
              disabled={!!cameraError}
              className="px-8 py-3.5 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Camera className="h-5 w-5" />
              <span>Capture Page #{capturedPages.length + 1}</span>
            </button>
          </div>
        </div>

        {/* Captured Gallery & Compile (Col 3) */}
        <div className="space-y-4 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[var(--border)] lg:pl-6 pt-4 lg:pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[var(--tx)] uppercase tracking-wider">
                Scanned Pages ({capturedPages.length})
              </h4>
              {capturedPages.length > 0 && (
                <button
                  type="button"
                  onClick={() => setCapturedPages([])}
                  className="text-[11px] text-rose-500 hover:underline cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>

            {capturedPages.length === 0 ? (
              <div className="p-6 rounded-xl border border-dashed border-[var(--border)] text-center space-y-2">
                <ImageIcon className="h-6 w-6 text-[var(--tx-3)] mx-auto opacity-50" />
                <p className="text-xs text-[var(--tx-3)]">No pages captured yet. Click capture to begin.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
                {capturedPages.map((src, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-[var(--border)] shadow-xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`Scan page ${idx + 1}`} className="w-full h-24 object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCapturedPages((prev) => prev.filter((_, i) => i !== idx))}
                        className="p-1.5 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-white">
                      P. {idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[var(--border)]">
            <button
              type="button"
              onClick={handleCompile}
              disabled={capturedPages.length === 0 || isCompiling}
              className="w-full py-3.5 px-4 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
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
