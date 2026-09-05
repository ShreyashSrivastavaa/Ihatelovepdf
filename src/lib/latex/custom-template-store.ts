/**
 * IndexedDB Persistence for User-Uploaded LaTeX Resume Templates
 * 100% Client-Side Storage: Zero Server Uploads, Unlimited Local Storage
 */

import { TemplateManifestEntry } from '../latex-escape';

export interface CustomTemplateRecord extends TemplateManifestEntry {
  rawTex: string;
  isCustom: true;
  createdAt: number;
  updatedAt: number;
}

const DB_NAME = 'pdf_lince_latex_db';
const STORE_NAME = 'custom_templates';
const DB_VERSION = 1;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this environment.'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Saves or updates a custom user template in IndexedDB
 */
export async function saveCustomTemplate(template: CustomTemplateRecord): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(template);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

/**
 * Retrieves all saved custom templates from IndexedDB
 */
export async function getCustomTemplates(): Promise<CustomTemplateRecord[]> {
  try {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Failed to load custom templates from IndexedDB:', err);
    return [];
  }
}

/**
 * Deletes a custom template by ID
 */
export async function deleteCustomTemplate(id: string): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

/**
 * Exports all custom templates as a downloadable JSON backup
 */
export async function exportCustomTemplatesJson(): Promise<string> {
  const templates = await getCustomTemplates();
  return JSON.stringify({ version: '1.0', exportedAt: Date.now(), templates }, null, 2);
}

/**
 * Imports templates from a previously exported JSON backup
 */
export async function importCustomTemplatesJson(jsonString: string): Promise<number> {
  const parsed = JSON.parse(jsonString);
  const items: CustomTemplateRecord[] = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed?.templates)
    ? parsed.templates
    : [];

  let importedCount = 0;
  for (const item of items) {
    if (item && item.id && item.rawTex) {
      await saveCustomTemplate({
        ...item,
        isCustom: true,
        updatedAt: Date.now(),
        createdAt: item.createdAt || Date.now(),
      });
      importedCount++;
    }
  }

  return importedCount;
}
