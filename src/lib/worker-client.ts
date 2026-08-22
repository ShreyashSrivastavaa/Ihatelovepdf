import { PDFProcessingMode, PDFProcessingOptions } from './pdf-operations';

export type WorkerMessage = {
  id: string;
  mode: string;
  files: File[];
  options: unknown;
};

export type WorkerResponse = {
  id: string;
  success: boolean;
  result?: unknown;
  error?: string;
  progress?: number;
  statusMessage?: string;
};

class PDFWorkerClient {
  private worker: Worker | null = null;
  private pendingRequests: Map<
    string,
    {
      resolve: (val: unknown) => void;
      reject: (err: unknown) => void;
      onProgress?: (progress: number, status: string) => void;
    }
  > = new Map();

  private getWorker(): Worker {
    if (!this.worker) {
      if (typeof window === 'undefined') {
        throw new Error('Web Workers require a browser environment');
      }
      this.worker = new Worker(new URL('../workers/pdf.worker.ts', import.meta.url));
      this.worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
        const { id, success, result, error, progress, statusMessage } = e.data;
        const pending = this.pendingRequests.get(id);
        if (!pending) return;

        if (progress !== undefined && pending.onProgress) {
          pending.onProgress(progress, statusMessage || '');
          return;
        }

        if (success) {
          pending.resolve(result);
        } else {
          pending.reject(new Error(error || 'Worker operation failed'));
        }
        this.pendingRequests.delete(id);
      };

      this.worker.onerror = (e) => {
        console.error('PDF Worker error:', e);
      };
    }
    return this.worker;
  }

  public run(
    mode: PDFProcessingMode,
    files: File[],
    options: PDFProcessingOptions = {},
    signal?: AbortSignal,
    onProgress?: (progress: number, status: string) => void
  ): Promise<unknown> {
    if (signal?.aborted) {
      return Promise.reject(new DOMException('Operation aborted by user', 'AbortError'));
    }

    const worker = this.getWorker();

    return new Promise((resolve, reject) => {
      const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
      this.pendingRequests.set(id, { resolve, reject, onProgress });

      if (signal) {
        signal.addEventListener('abort', () => {
          this.pendingRequests.delete(id);
          // If aborted, terminate worker to immediately halt background CPU execution and respawn clean
          this.terminate();
          reject(new DOMException('Operation aborted by user', 'AbortError'));
        });
      }

      worker.postMessage({ id, mode, files, options });
    });
  }

  terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    this.pendingRequests.clear();
  }
}

export const pdfWorkerClient = new PDFWorkerClient();
