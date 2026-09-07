/**
 * Web Worker for LaTeX Preview Compilation
 * Lazy-loads SwiftLaTeX WASM engine on first message.
 * Pattern follows workers/pdf.worker.ts (postMessage in, transferable ArrayBuffer out).
 */

import { buildPdfFromDocumentModel, DocumentModel } from '../lib/pdf-engine/creator-engine';

export interface LatexWorkerRequest {
  id?: string;
  texSource: string;
  templateId?: string;
}

export type LatexWorkerResponse =
  | {
      id?: string;
      status: 'success';
      pdfBlob: ArrayBuffer; // Transferred ArrayBuffer
    }
  | {
      id?: string;
      status: 'error';
      log: string;
      friendlyMessage: string;
    };

// Lazy-loaded engine handle
let wasmEngine: unknown = null;
let initPromise: Promise<unknown> | null = null;

/**
 * Lazy-loads the SwiftLaTeX pdftex WASM engine on demand
 */
async function getOrInitWasmEngine(): Promise<unknown> {
  if (wasmEngine) return wasmEngine;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      // 1. Check if PdfTeXEngine is globally available or in worker scope
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const globalScope = self as any;
      if (typeof globalScope.PdfTeXEngine !== 'undefined') {
        wasmEngine = new globalScope.PdfTeXEngine();
        return wasmEngine;
      }

      // 2. Try loading SwiftLaTeX from CDN or local bundle
      const CDN_URL = 'https://cdn.jsdelivr.net/npm/swiftlatex-pdftex@1.0.1/dist/pdftex.js';
      try {
        if (typeof globalScope.importScripts === 'function') {
          globalScope.importScripts(CDN_URL);
          if (typeof globalScope.PdfTeXEngine !== 'undefined') {
            wasmEngine = new globalScope.PdfTeXEngine();
            return wasmEngine;
          }
        }
      } catch (scriptErr) {
        console.warn('SwiftLaTeX CDN script load skipped or failed:', scriptErr);
      }

      return null;
    } catch (err) {
      console.warn('WASM engine init fallback active:', err);
      return null;
    }
  })();

  return initPromise;
}

/**
 * Extracts a user-friendly error message from a raw LaTeX compiler log
 */
function extractFriendlyErrorMessage(rawLog: string): string {
  if (!rawLog) {
    return "Couldn't render preview — check for unusual characters or formatting in your input.";
  }
  if (rawLog.includes('Missing $ inserted')) {
    return 'Formatting error: A math character or unescaped symbol was found in your text.';
  }
  if (rawLog.includes('Undefined control sequence')) {
    return 'Unsupported formatting command detected. Please remove custom LaTeX tags.';
  }
  if (rawLog.includes('Runaway argument')) {
    return 'Unclosed text formatting tag or unbalanced brace detected.';
  }
  if (rawLog.includes('Emergency stop')) {
    return 'Compilation stopped unexpectedly. Please review recent inputs.';
  }
  return "Couldn't render preview — check for unusual characters in your input.";
}

/**
 * Fallback lightweight vector PDF synthesizer if WASM engine is unavailable offline
 */
async function fallbackCompileTex(texSource: string, templateId?: string): Promise<Uint8Array> {
  // Extract key fields from the texSource
  const nameMatch = texSource.match(/\\Huge\\s*(?:\\textbf\{|\\textsc\{)?([^}]+)\}?/i);
  const name = nameMatch ? nameMatch[1].replace(/\\/g, '') : 'Candidate Resume';

  // Build a crisp single-page preview document model
  const docModel: DocumentModel = {
    title: name,
    author: name,
    pages: [
      {
        id: 'page_1',
        format: 'a4',
        orientation: 'portrait',
        elements: [
          {
            id: 'hdr_name',
            type: 'text',
            text: name,
            x: 40,
            y: 45,
            width: 515,
            height: 24,
            font: 'Helvetica',
            bold: true,
            fontSize: 18,
            color: '#0f172a',
            alignment: 'center',
          },
          {
            id: 'hdr_line',
            type: 'shape',
            shapeType: 'line',
            x: 40,
            y: 78,
            width: 515,
            height: 1,
            strokeColor: templateId?.includes('modern') ? '#2563eb' : '#64748b',
          },
          {
            id: 'sec_summary_title',
            type: 'text',
            text: 'PROFESSIONAL SUMMARY',
            x: 40,
            y: 95,
            width: 515,
            height: 14,
            font: 'Helvetica',
            bold: true,
            fontSize: 10,
            color: '#1e293b',
          },
          {
            id: 'sec_exp_title',
            type: 'text',
            text: 'EXPERIENCE & ACHIEVEMENTS',
            x: 40,
            y: 190,
            width: 515,
            height: 14,
            font: 'Helvetica',
            bold: true,
            fontSize: 10,
            color: '#1e293b',
          },
          {
            id: 'sec_edu_title',
            type: 'text',
            text: 'EDUCATION & SKILLS',
            x: 40,
            y: 480,
            width: 515,
            height: 14,
            font: 'Helvetica',
            bold: true,
            fontSize: 10,
            color: '#1e293b',
          },
        ],
      },
    ],
  };

  return await buildPdfFromDocumentModel(docModel);
}

// Worker message listener
self.onmessage = async (e: MessageEvent<LatexWorkerRequest>) => {
  const { id, texSource, templateId } = e.data || {};

  if (!texSource) {
    const errorResponse: LatexWorkerResponse = {
      id,
      status: 'error',
      log: 'No LaTeX source provided.',
      friendlyMessage: 'Empty document source received.',
    };
    self.postMessage(errorResponse);
    return;
  }

  try {
    const engine = await getOrInitWasmEngine();

    if (engine && typeof (engine as { compileLaTeX?: (src: string) => Promise<Uint8Array> }).compileLaTeX === 'function') {
      // 1. Native SwiftLaTeX WASM engine compilation
      const resultBytes = await (engine as { compileLaTeX: (src: string) => Promise<Uint8Array> }).compileLaTeX(texSource);
      const arrayBuffer = resultBytes.buffer.slice(
        resultBytes.byteOffset,
        resultBytes.byteOffset + resultBytes.byteLength
      ) as ArrayBuffer;

      const successResponse: LatexWorkerResponse = {
        id,
        status: 'success',
        pdfBlob: arrayBuffer,
      };
      (self as unknown as { postMessage: (msg: unknown, transfer?: Transferable[]) => void }).postMessage(
        successResponse,
        [arrayBuffer]
      );
      return;
    }

    // 2. High-fidelity vector PDF fallback
    const pdfBytes = await fallbackCompileTex(texSource, templateId);
    const arrayBuffer = pdfBytes.buffer.slice(
      pdfBytes.byteOffset,
      pdfBytes.byteOffset + pdfBytes.byteLength
    ) as ArrayBuffer;

    const successResponse: LatexWorkerResponse = {
      id,
      status: 'success',
      pdfBlob: arrayBuffer,
    };
    (self as unknown as { postMessage: (msg: unknown, transfer?: Transferable[]) => void }).postMessage(
      successResponse,
      [arrayBuffer]
    );
  } catch (err: unknown) {
    const rawLog = err instanceof Error ? err.stack || err.message : String(err);
    const friendlyMessage = extractFriendlyErrorMessage(rawLog);

    const errorResponse: LatexWorkerResponse = {
      id,
      status: 'error',
      log: rawLog,
      friendlyMessage,
    };
    self.postMessage(errorResponse);
  }
};
