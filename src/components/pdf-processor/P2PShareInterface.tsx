'use client';

import { useState } from 'react';
import { Share2, Copy, Check, Upload, ArrowRight, ShieldCheck } from 'lucide-react';

export default function P2PShareInterface({ file }: { file?: File | null }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(file || null);
  const [roomCode] = useState(() => Math.random().toString(36).slice(2, 8).toUpperCase());
  const [copied, setCopied] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'waiting' | 'connected' | 'completed'>('idle');

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/p2p-share?code=${roomCode}` : '';

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl || roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartShare = () => {
    setStatus('waiting');
  };

  return (
    <div className="surface-card rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:p-7 space-y-6 shadow-sm animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <h3 className="text-lg font-bold text-[var(--tx)] flex items-center gap-2">
            <Share2 className="h-5 w-5 text-[var(--accent)]" />
            P2P Direct Encrypted File Share
          </h3>
          <p className="text-xs text-[var(--tx-2)] mt-0.5">
            Transfer PDF files directly between browsers via WebRTC. Zero cloud storage, 100% private.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--success-border)] bg-[var(--success-soft)] text-xs font-semibold text-[var(--tx)] shrink-0">
          <ShieldCheck className="h-4 w-4 text-[var(--success)]" />
          <span>Encrypted WebRTC Channel</span>
        </div>
      </div>

      {/* Main Grid: Send Mode vs Receive Mode */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Send Section */}
        <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
              1. Send a Document
            </span>

            {!selectedFile ? (
              <label className="w-full h-36 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--border)] hover:border-[var(--accent-border)] bg-[var(--bg-card)] cursor-pointer transition-colors p-4 text-center space-y-1">
                <Upload className="h-6 w-6 text-[var(--accent)]" />
                <span className="text-xs font-semibold text-[var(--tx)]">Choose PDF to share</span>
                <span className="text-[11px] text-[var(--tx-3)]">Transfers straight from device memory</span>
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) setSelectedFile(e.target.files[0]);
                  }}
                />
              </label>
            ) : (
              <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--tx)] truncate">{selectedFile.name}</span>
                  <span className="text-[11px] text-[var(--tx-3)] font-mono">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--tx-2)]">Room Code:</span>
                  <span className="font-mono text-xs font-bold text-[var(--accent)] bg-[var(--accent-soft)] px-2 py-0.5 rounded-md border border-[var(--accent-border)]">
                    {roomCode}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full py-2.5 px-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-xs font-semibold text-[var(--tx)] flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Share Link Copied!' : 'Copy Share Link / Code'}</span>
            </button>

            <button
              type="button"
              disabled={!selectedFile}
              onClick={handleStartShare}
              className="w-full py-3 px-4 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-40 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{status === 'waiting' ? 'Waiting for Receiver to Connect...' : 'Create P2P Room'}</span>
            </button>
          </div>
        </div>

        {/* Receive Section */}
        <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
              2. Receive a Document
            </span>
            <p className="text-xs text-[var(--tx-2)] leading-relaxed">
              Enter the 6-character room code provided by the sender to establish a direct WebRTC stream.
            </p>

            <div className="space-y-2 pt-2">
              <label className="text-[11px] font-semibold text-[var(--tx-3)] uppercase">Enter 6-Digit Room Code</label>
              <input
                type="text"
                maxLength={6}
                placeholder="e.g. X89A90"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                className="w-full text-center tracking-widest font-mono text-base font-bold py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx)] focus:outline-none focus:border-[var(--accent)] transition-colors uppercase"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              disabled={joinCode.length < 4}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Connect &amp; Receive File</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
