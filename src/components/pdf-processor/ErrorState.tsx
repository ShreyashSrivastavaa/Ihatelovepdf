"use client";

import React from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, Lock, FileQuestion, ShieldAlert, Cpu, Home } from 'lucide-react';

export type ErrorType = 'general' | 'password' | 'corrupt' | 'memory' | 'unsupported';

interface ErrorStateProps {
  title?: string;
  message: string;
  type?: ErrorType;
  suggestedAction?: string;
  onRetry?: () => void;
  onReset?: () => void;
  onGoHome?: boolean;
}

export default function ErrorState({
  title = "Processing Error",
  message,
  type = 'general',
  suggestedAction,
  onRetry,
  onReset,
  onGoHome,
}: ErrorStateProps) {
  const getIcon = () => {
    switch (type) {
      case 'password':
        return <Lock className="h-6 w-6 text-[var(--warning)]" />;
      case 'corrupt':
        return <FileQuestion className="h-6 w-6 text-[var(--err)]" />;
      case 'memory':
        return <Cpu className="h-6 w-6 text-[var(--warning)]" />;
      case 'unsupported':
        return <ShieldAlert className="h-6 w-6 text-[var(--err)]" />;
      default:
        return <AlertCircle className="h-6 w-6 text-[var(--err)]" />;
    }
  };

  const getBorderAndBg = () => {
    if (type === 'password' || type === 'memory') {
      return 'border-[var(--warning)]/30 bg-[var(--warning-soft)] text-[var(--tx)]';
    }
    return 'border-[var(--err)]/30 bg-[var(--err-soft)] text-[var(--tx)]';
  };

  return (
    <div
      role="alert"
      className={`rounded-2xl border p-5 sm:p-6 space-y-4 shadow-sm animate-in fade-in duration-200 ${getBorderAndBg()}`}
    >
      <div className="flex items-start gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--bg-card)] border border-[var(--border)] shadow-xs">
          {getIcon()}
        </div>

        <div className="space-y-1 flex-1 min-w-0">
          <h4 className="font-bold text-sm sm:text-base text-[var(--tx)]">
            {title}
          </h4>
          <p className="text-xs sm:text-sm text-[var(--tx-2)] leading-relaxed">
            {message}
          </p>

          {suggestedAction && (
            <p className="text-xs font-semibold text-[var(--tx)] pt-1">
              💡 Suggestion: {suggestedAction}
            </p>
          )}
        </div>
      </div>

      {(onRetry || onReset || onGoHome) && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--border)]/50">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="btn-primary px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Try Again</span>
            </button>
          )}

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx)] hover:bg-[var(--bg-subtle)] transition-colors cursor-pointer"
            >
              Choose another file
            </button>
          )}

          {onGoHome && (
            <Link
              href="/"
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx)] hover:bg-[var(--bg-subtle)] transition-colors flex items-center gap-1.5"
            >
              <Home className="h-3.5 w-3.5" />
              Go to Home
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
