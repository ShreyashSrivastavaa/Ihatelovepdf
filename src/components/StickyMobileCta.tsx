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
    <div className="sm:hidden fixed bottom-3 inset-x-3 z-30 animate-in slide-in-from-bottom-3 duration-300">
      <div className="flex items-center gap-2 p-2 rounded-2xl bg-[var(--bg)]/95 backdrop-blur-xl border border-[var(--border)] shadow-2xl">
        <button
          type="button"
          onClick={handleUploadClick}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[var(--accent)] text-white font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <Upload className="h-3.5 w-3.5 stroke-[2.5]" />
          <span>Select PDF</span>
        </button>
        <Link
          href="/tools"
          className="flex items-center justify-center p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--tx)] active:scale-95 transition-all"
          title="All Tools"
        >
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
