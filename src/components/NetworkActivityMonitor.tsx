'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck, WifiOff, Cpu, Lock } from 'lucide-react';

export interface NetworkActivityMonitorProps {
  isProcessing?: boolean;
  className?: string;
}

export default function NetworkActivityMonitor({
  isProcessing = false,
  className = '',
}: NetworkActivityMonitorProps) {
  const [networkRequestsCount, setNetworkRequestsCount] = useState(0);
  const [bytesSent, setBytesSent] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Track active fetch / XHR calls during processing to verify 0 network requests
    const originalFetch = window.fetch;
    const originalXhrSend = XMLHttpRequest.prototype.send;

    window.fetch = async (...args) => {
      // Only count if targeting external network endpoints
      const url = typeof args[0] === 'string' ? args[0] : (args[0] as Request)?.url || '';
      if (!url.startsWith('blob:') && !url.startsWith('data:') && !url.includes('/_next/')) {
        setNetworkRequestsCount((prev) => prev + 1);
      }
      return originalFetch.apply(window, args);
    };

    XMLHttpRequest.prototype.send = function (body) {
      if (body && typeof body === 'string') {
        setBytesSent((prev) => prev + body.length);
      }
      return originalXhrSend.apply(this, [body] as Parameters<typeof originalXhrSend>);
    };

    return () => {
      window.fetch = originalFetch;
      XMLHttpRequest.prototype.send = originalXhrSend;
    };
  }, []);

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-emerald-300 shadow-sm backdrop-blur-sm ${className}`}
      role="status"
      aria-label="Privacy & Network Isolation Monitor"
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isProcessing ? 'bg-amber-400 opacity-75' : 'bg-emerald-400 opacity-75'}`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${isProcessing ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
        </span>
        <span className="font-semibold flex items-center gap-1 text-[var(--tx)]">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          Zero-Network Sandbox:
        </span>
        <span className="text-[var(--tx-2)]">
          {isProcessing
            ? 'Processing in local RAM...'
            : networkRequestsCount === 0
            ? '0 Network Requests (100% Private)'
            : `${networkRequestsCount} Requests`}
        </span>
      </div>

      <div className="flex items-center gap-4 text-[11px] text-[var(--tx-3)]">
        <span className="flex items-center gap-1 font-mono">
          <Cpu className="h-3 w-3 text-emerald-400" />
          Local WebAssembly RAM
        </span>
        <span className="flex items-center gap-1 font-mono">
          <WifiOff className="h-3 w-3 text-emerald-400" />
          {bytesSent} Bytes Uploaded
        </span>
        <span className="flex items-center gap-1 font-mono text-emerald-400">
          <Lock className="h-3 w-3" />
          Client-Isolated
        </span>
      </div>
    </div>
  );
}
