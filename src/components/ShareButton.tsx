"use client";

import { useState, useEffect, useCallback } from "react";
import { Share2, Copy, Check, Twitter, MessageCircle, X } from "lucide-react";
import { useDictionary } from "../i18n/LocaleProvider";

interface ShareButtonProps {
  /** URL to share. Defaults to the current page URL. */
  url?: string;
  /** Variant controls the visual style */
  variant?: "inline" | "banner";
  className?: string;
}

export function ShareButton({ url, variant = "inline", className = "" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [shareUrl, setShareUrl] = useState(url ?? "https://ihatelovepdf.com");
  const dictionary = useDictionary();
  const sharePrompt = dictionary.components.pdfProcessor.statusDialog.sharePrompt;

  useEffect(() => {
    if (!url && typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, [url]);
  const shareText = sharePrompt.shareText;

  const handleNativeShare = useCallback(async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "ihatelovepdf", text: shareText, url: shareUrl });
      } catch {
        // User cancelled, no-op
      }
    } else {
      setExpanded((prev) => !prev);
    }
  }, [shareText, shareUrl]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareUrl]);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;

  if (variant === "banner") {
    return (
      <div className={`surface-card p-5 sm:p-6 space-y-4 border border-[var(--accent-border)] ${className}`}>
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 shrink-0 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center">
            <Share2 className="h-4 w-4 text-[var(--accent)]" />
          </div>
          <div className="space-y-0.5 min-w-0">
            <p className="text-sm font-semibold text-[var(--tx)]">{sharePrompt.actionLabel}</p>
            <p className="text-xs text-[var(--tx-2)] leading-relaxed">{sharePrompt.dialogMessage}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Copy link */}
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-xs font-medium text-[var(--tx-2)] hover:border-[var(--accent-border)] hover:text-[var(--tx)] transition-all duration-150 cursor-pointer"
            aria-label="Copy link to clipboard"
            id="share-copy-link-btn"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-[var(--success)]" />
                <span className="text-[var(--success)]">{sharePrompt.copiedLabel}</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy Link
              </>
            )}
          </button>

          {/* Twitter/X */}
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="share-twitter-btn"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-xs font-medium text-[var(--tx-2)] hover:border-[#1d9bf0] hover:text-[#1d9bf0] transition-all duration-150"
            aria-label="Share on Twitter/X"
          >
            <Twitter className="h-3.5 w-3.5" />
            Twitter / X
          </a>

          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="share-whatsapp-btn"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-xs font-medium text-[var(--tx-2)] hover:border-[#25d366] hover:text-[#25d366] transition-all duration-150"
            aria-label="Share on WhatsApp"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </a>
        </div>
      </div>
    );
  }

  // inline variant
  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onClick={handleNativeShare}
        id="share-tool-btn"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-xs font-medium text-[var(--tx-2)] hover:border-[var(--accent-border)] hover:text-[var(--tx)] transition-all duration-150 cursor-pointer"
        aria-label={sharePrompt.actionLabel}
      >
        <Share2 className="h-3.5 w-3.5" />
        {sharePrompt.actionLabel}
      </button>

      {expanded && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setExpanded(false)}
            aria-hidden="true"
          />
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 z-50 w-56 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] shadow-lg p-1.5 space-y-0.5 animate-fade-in">
            <div className="flex items-center justify-between px-2 py-1.5 mb-1">
              <span className="text-xs font-semibold text-[var(--tx)]">Share ihatelovepdf</span>
              <button
                onClick={() => setExpanded(false)}
                className="text-[var(--tx-3)] hover:text-[var(--tx)] transition-colors cursor-pointer"
                aria-label="Close share menu"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <button
              onClick={() => { handleCopy(); setExpanded(false); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-[var(--tx-2)] hover:bg-[var(--bg)] hover:text-[var(--tx)] transition-colors cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-[var(--success)] shrink-0" /> : <Copy className="h-3.5 w-3.5 shrink-0" />}
              {copied ? sharePrompt.copiedLabel : "Copy Link"}
            </button>

            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setExpanded(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-[var(--tx-2)] hover:bg-[var(--bg)] hover:text-[#1d9bf0] transition-colors"
            >
              <Twitter className="h-3.5 w-3.5 shrink-0" />
              Share on Twitter / X
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setExpanded(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-[var(--tx-2)] hover:bg-[var(--bg)] hover:text-[#25d366] transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5 shrink-0" />
              Share on WhatsApp
            </a>
          </div>
        </>
      )}
    </div>
  );
}
