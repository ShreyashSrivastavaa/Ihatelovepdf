'use client';

import { useState, useEffect, useRef } from 'react';
import {
  ResumeFormData,
  TemplateManifestEntry,
  injectPlaceholders,
} from '../lib/latex-escape';
import type { LatexWorkerResponse } from '../workers/latex-preview.worker';

export type LatexPreviewStatus = 'idle' | 'compiling' | 'success' | 'error';

export interface UseLatexPreviewState {
  status: LatexPreviewStatus;
  pdfUrl: string | null;
  lastSuccessfulPdfUrl: string | null;
  errorMessage: string | null;
  hasEverCompiled: boolean;
  clearError: () => void;
}

const DEBOUNCE_MS = 800;

export function useLatexPreview(
  template: TemplateManifestEntry | null | undefined,
  formData: ResumeFormData
): UseLatexPreviewState {
  const [status, setStatus] = useState<LatexPreviewStatus>('idle');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [lastSuccessfulPdfUrl, setLastSuccessfulPdfUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasEverCompiled, setHasEverCompiled] = useState<boolean>(false);

  // In-memory template source cache: templateId -> rawTexSource
  const templateCacheRef = useRef<Record<string, string>>({});

  // Worker instance
  const workerRef = useRef<Worker | null>(null);

  // Debounce and active request tracking
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const activeRequestIdRef = useRef<string | null>(null);

  // Object URL tracking for memory leak prevention
  const activeObjectUrlRef = useRef<string | null>(null);

  // Clear dismissible error
  const clearError = () => {
    setErrorMessage(null);
  };

  // Initialize Web Worker
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      workerRef.current = new Worker(
        new URL('../workers/latex-preview.worker.ts', import.meta.url)
      );

      workerRef.current.onmessage = (e: MessageEvent<LatexWorkerResponse>) => {
        const data = e.data;
        if (!data || data.id !== activeRequestIdRef.current) {
          // Stale response from a superseded compile request
          return;
        }

        if (data.status === 'success') {
          const blob = new Blob([data.pdfBlob], { type: 'application/pdf' });
          const newUrl = URL.createObjectURL(blob);

          // Revoke previous object URL to prevent memory leaks
          if (activeObjectUrlRef.current) {
            URL.revokeObjectURL(activeObjectUrlRef.current);
          }
          activeObjectUrlRef.current = newUrl;

          setPdfUrl(newUrl);
          setLastSuccessfulPdfUrl(newUrl);
          setStatus('success');
          setErrorMessage(null);
          setHasEverCompiled(true);
        } else if (data.status === 'error') {
          console.warn('LaTeX compilation error:', data.log);
          setStatus('error');
          setErrorMessage(data.friendlyMessage);
        }
      };

      workerRef.current.onerror = (err) => {
        console.error('LatexPreview Worker runtime error:', err);
        setStatus('error');
        setErrorMessage("Preview service encountered an error. Please try again.");
      };
    } catch (err) {
      console.error('Failed to initialize LaTeX preview worker:', err);
    }

    return () => {
      // Cleanup worker and revoke any active URLs on unmount
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
      if (activeObjectUrlRef.current) {
        URL.revokeObjectURL(activeObjectUrlRef.current);
        activeObjectUrlRef.current = null;
      }
    };
  }, []);

  // Debounced compilation effect when template or formData updates
  useEffect(() => {
    if (!template) {
      setStatus('idle');
      return;
    }

    // Clear previous pending debounce
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    setStatus('compiling');

    debounceTimerRef.current = setTimeout(async () => {
      try {
        // 1. Retrieve raw .tex source (use memory cache or fetch once)
        let rawTex = templateCacheRef.current[template.id];
        if (!rawTex) {
          const fetchUrl = template.file.startsWith('/') ? template.file : `/${template.file}`;
          const res = await fetch(fetchUrl);
          if (!res.ok) {
            throw new Error(`Failed to load template ${template.id} (${res.status})`);
          }
          rawTex = await res.text();
          templateCacheRef.current[template.id] = rawTex;
        }

        // 2. Safely escape and inject user form data
        const injectedSource = injectPlaceholders(rawTex, formData, template.placeholders);

        // 3. Dispatch to worker with unique request ID
        const requestId = `${template.id}_${Date.now()}_${Math.random()}`;
        activeRequestIdRef.current = requestId;

        if (workerRef.current) {
          workerRef.current.postMessage({
            id: requestId,
            texSource: injectedSource,
            templateId: template.id,
          });
        }
      } catch (err: unknown) {
        console.error('useLatexPreview compilation error:', err);
        setStatus('error');
        setErrorMessage(
          err instanceof Error ? err.message : "Couldn't render preview. Please check for unusual characters."
        );
      }
    }, DEBOUNCE_MS);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [template, formData]);

  return {
    status,
    pdfUrl,
    lastSuccessfulPdfUrl,
    errorMessage,
    hasEverCompiled,
    clearError,
  };
}
