'use client';

import React, { useState, useEffect } from 'react';
import { Upload, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function StickyMobileCta() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 180px down
      if (window.scrollY > 180) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUploadClick = () => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="sm:hidden fixed bottom-3 inset-x-3 z-30 animate-in slide-in-from-bottom-2 duration-150">
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[var(--card)]/95 backdrop-blur-md border border-[var(--border)] shadow-xl">
        <button
          type="button"
          onClick={handleUploadClick}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-lg bg-[var(--brand)] text-white font-medium text-xs active:scale-95 transition-all cursor-pointer"
        >
          <Upload className="h-3.5 w-3.5" />
          <span>Select PDF</span>
        </button>
        <Link
          href="/tools"
          className="flex items-center justify-center p-2.5 rounded-lg border border-[var(--border)] bg-[var(--subtle)] text-[var(--text-main)] hover:border-[var(--brand)] active:scale-95 transition-colors"
          title="All Tools"
        >
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
