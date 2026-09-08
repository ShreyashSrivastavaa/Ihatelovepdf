import { localeLabels } from "../../config";
import { getRoutePath } from "../../routing";
import { operationsEn } from "./operations";
import { faqsEn } from "./faqs";
import type { Dictionary } from "../dictionary-types";
import { getOperationsRoutes, getOperationsFooterLabels, getOperationsModeLabels, getOperationsDownloadNames } from "../../operations-catalog";

const locale = "en" as const;
const { label, nativeName, htmlLang, hrefLang } = localeLabels[locale];
const siteUrl = "https://ihatelovepdf.com";
const homePath = getRoutePath(locale, "home");

const operationsRoutes = getOperationsRoutes(locale);

export const enDictionary: Dictionary = {
  locale,
  localeLabel: label,
  nativeName,
  htmlLang,
  hrefLang,
  routes: {
    home: homePath,
    faq: getRoutePath(locale, "faq"),
    support: getRoutePath(locale, "support"),
    privacy: getRoutePath(locale, "privacy"),
    terms: getRoutePath(locale, "terms"),
    contact: getRoutePath(locale, "contact"),
    operations: operationsRoutes,
  },
  metadata: {
    site: {
      title: "ihatelovepdf: Fast, Private & Free PDF Tools in Your Browser",
      description:
        "ihatelovepdf is a private, free web toolkit to merge, compress, split, extract, rotate, reorder, crop, and convert PDFs directly on your device. No file uploads, no tracking, and no accounts required.",
      keywords: [
        "merge pdf",
        "compress pdf",
        "split pdf",
        "extract pdf pages",
        "rotate pdf pages",
        "reorder pdf",
        "crop pdf",
        "pdf to images",
        "images to pdf",
        "convert pdf online",
        "convert pdf to png",
        "jpg to pdf",
        "edit pdf offline",
        "pdf toolkit",
        "privacy first pdf",
      ],
      canonical: `${siteUrl}${homePath}`,
      openGraph: {
        title: "ihatelovepdf: Merge, Compress, Split & Convert PDFs Privately",
        description:
          "Work with PDFs privately. Files are processed right inside your browser with no server uploads. Fast, free, and completely private.",
        url: `${siteUrl}${homePath}`,
        locale: "en_US",
        type: "website",
        imageUrl: "https://ihatelovepdf.com/og-images/og-image-en.png",
        imageAlt: "ihatelovepdf - Private and free PDF processing toolkit",
      },
    },
    faq: {
      title: "Frequently Asked Questions | ihatelovepdf Toolkit",
      description:
        "Find answers to common questions about ihatelovepdf. Learn how to merge, compress, split, extract, rotate, crop, and convert PDFs securely without uploading files.",
      keywords: [
        "ihatelovepdf faq",
        "pdf questions",
        "pdf help",
        "merge pdf help",
        "compress pdf help",
        "split pdf help",
        "rotate pdf pages",
        "reorder pdf",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "faq")}`,
    },
    support: {
      title: "Support ihatelovepdf | Keep the Toolkit Free and Private",
      description:
        "Your support keeps ihatelovepdf independent, ad-free, and privacy-focused. Help us cover hosting and ongoing enhancements.",
      keywords: [
        "donate to ihatelovepdf",
        "support pdf toolkit",
        "fund privacy projects",
        "ihatelovepdf stripe donations",
        "keep ihatelovepdf free",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "support")}`,
    },
    operations: operationsEn,
  },
  brand: {
    name: "ihatelovepdf",
    tagline: "Local Processing • 100% Private",
  },
  components: {
    nav: {
      home: "Home",
      faq: "FAQ",
      support: "Support",
      languageLabel: "Language",
      menuLabel: "Toggle navigation menu",
    },
    footer: {
      privacy: "Local Processing • 100% Private • Open Licenses",
      rights: "© 2026 ihatelovepdf. Fast, private PDF utilities that keep your documents on your device.",
      links: {
        home: "Home",
        faq: "FAQ",
        support: "Support",
        contact: "Contact",
      },
      capabilitiesLabel: "Popular Actions",
      operations: getOperationsFooterLabels(locale),
      license: "PDF Processing: PDF-lib (MIT), PDF.js (Apache 2.0) • Font: Geist (MIT)",
      disclaimer: "This service is provided 'as is' without warranty of any kind. The user accepts full responsibility for using generated files.",
    },
    notifications: {
      labels: {
        success: "Success",
        error: "Error",
        info: "Notice",
        warning: "Warning",
      },
      closeLabel: "Close",
    },
    fotolinceBanner: {
      eyebrow: "",
      title: "",
      description: "",
      ctaLabel: "",
      ctaHref: "",
      imageAlt: "",
    },
    feedback: {
      question: "Was this helpful?",
      thanks: "Thank you for your feedback!",
      whatWrong: "Tell us how we can improve",
      emailSubject: "Feedback for ihatelovepdf",
    },
    pdfProcessor: {
      title: "Choose an Operation",
      modes: getOperationsModeLabels(locale),
      upload: {
        title: "Select your files",
        clearAll: "Clear all",
        listHeadings: {
          merge: "Files to merge (drag to adjust final sequence):",
          extract: "Select a file to manage its pages:",
          crop: "Select a file to manage its pages:",
          rotate: "Select a file to manage its pages:",
          reorder: "Select a file to manage its pages:",
          pdfToImages: "PDFs to convert (processed sequentially):",
          imagesToPdf: "Images to combine (drag to adjust final sequence):",
          default: "Selected files (reorder or remove as needed):",
        },
        hints: {
          compress: "Each file is optimized individually for the best balance of size and resolution.",
          split: "PDFs will be split according to the options specified in the next step.",
          crop: "Select target pages and set margin crop parameters in the options panel.",
          pdfToImages: "Renders one PDF at a time. Adjust format and DPI settings before exporting.",
          imagesToPdf: "Upload JPG, PNG, WEBP, or TIFF images. Customize page size, margins, and background color.",
        },
      },
      downloadNames: getOperationsDownloadNames(locale),
      processButton: {
        idleSingle: "Process 1 File",
        idleMultiple: (count: number) => `Process ${count} Files`,
        processing: "Processing...",
        extract: (count: number) => `Extract ${count} ${count === 1 ? "Page" : "Pages"}`,
        crop: (count: number) =>
          count > 0 ? `Crop ${count} ${count === 1 ? "Page" : "Pages"}` : "Crop PDF",
        rotate: (count: number) =>
          count > 0 ? `Rotate ${count} ${count === 1 ? "Page" : "Pages"}` : "Rotate PDF",
        reorder: "Save New Page Order",
        pdfToImages: {
          single: "Export Images",
          multiple: (count: number) => `Export ${count} PDFs`,
        },
        imagesToPdf: {
          single: "Create PDF",
          multiple: (count: number) => `Create PDF from ${count} Images`,
        },
      },
      statusMessages: {
        info: (mode: string) => `Processing (${mode})...`,
        compressed: (reduction: string, original: string, next: string, seconds: string) =>
          `Compressed! Reduction: ${reduction}% (${original} → ${next}) in ${seconds}s`,
        merged: "Merging complete!",
        split: (count: number) =>
          count > 1
            ? `Generated ${count} files. Downloading first file...`
            : "Splitting complete!",
        extracted: (count: number) => `Extracted ${count} ${count === 1 ? "page" : "pages"}`,
        cropped: (count: number) => `Cropped ${count} ${count === 1 ? "page" : "pages"}`,
        rotated: (count: number) => `Rotated ${count} ${count === 1 ? "page" : "pages"}`,
        reordered: "Reordering complete!",
        pdfToImages: (count: number, format: "png" | "jpeg", zipped: boolean) => {
          const label = format === "png" ? "PNG" : "JPEG";
          return zipped
            ? `Exported ${count} ${label} ${count === 1 ? "image" : "images"} inside a ZIP archive`
            : `Downloaded ${count} ${label} ${count === 1 ? "image" : "images"}`;
        },
        imagesToPdf: (count: number) =>
          `Successfully created PDF from ${count} ${count === 1 ? "image" : "images"}`,
        imageFormatLabels: {
          png: "PNG",
          jpeg: "JPEG",
        },
      },
      errors: {
        noFiles: "No output generated",
        mergeRequiresTwo: "Select at least two PDF files to merge",
        noPagesSelected: "Select at least one page to proceed",
        invalidFile: "Please upload a valid file format",
        reorderEmpty: "No page sequence changes detected",
        unknown: "An unexpected error occurred",
        modeNotSupported: "Unsupported operation mode",
      },
      labels: {
        pagesToExtract: "Select pages to extract:",
        pagesToCrop: "Select pages to crop:",
        pagesToRotate: "Select pages to rotate:",
        reorderPages: "Drag thumbnails to reorder pages:",
      },
      compressionPreview: {
        title: "Compression Estimate Preview",
        description:
          "Adjust settings to preview estimated output size prior to running compression.",
        running: "Calculating preview estimate…",
        readyLabel: "Estimated Output Size",
        ratio: (percent: string) => `${percent}% smaller`,
        saved: (size: string) => `${size} saved`,
        time: (seconds: string) => `≈ ${seconds}s`,
        original: "Original Size",
        result: "Estimated Size",
        notice:
          "Preview calculation runs locally in your browser. Clicking Process reuses this result with no file uploads.",
        error: "Compression preview could not be generated.",
        retry: "Retry Preview",
        universalBadge: "Universal Optimization Engine",
      },
      compressionSummary: {
        title: "Compression Summary",
        ratio: (percent: string) => `${percent}% smaller`,
        saved: (size: string) => `${size} saved`,
        original: "Original",
        result: "Compressed",
        duration: (seconds: string) => `Completed in ${seconds}s`,
        download: "Download Again",
        clear: "Clear Summary",
      },
      donationReminder: {
        message: "Did ihatelovepdf save you time today? Your support keeps this tool free and private.",
        actionLabel: "Support ihatelovepdf",
        withSavings: (percent: string, saved: string) =>
          `Saved ${saved} (${percent}% reduction)? Help us keep ihatelovepdf private, ad free, and open.`,
      },
      statusDialog: {
        processingTitle: "Processing Locally",
        successTitle: "Processing Complete!",
        successDescription:
          "Your download will start automatically. You can also redownload files below.",
        resultsLabel: "Output Files",
        filesProcessedLabel: (count: number) =>
          `${count} ${count === 1 ? "file processed" : "files processed"}`,
        downloadAgainLabel: "Download Again",
        errorTitle: "Processing Failed",
        errorDescription: "We couldn't complete this operation. Please check your input files and try again.",
        retryLabel: "Retry",
        closeLabel: "Close",
        sharePrompt: {
          dialogMessage: "ihatelovepdf is completely free and private. Help others discover it by sharing with friends or colleagues!",
          shareText: "I just used ihatelovepdf to process my PDFs! It is a fast, free, and private browser toolkit to compress, merge, split, and convert PDFs without server uploads.",
          actionLabel: "Share ihatelovepdf",
          copiedLabel: "Link Copied!",
        },
      },
      compressionTotal: {
        title: "Total Storage Saved",
        savings: (size: string) => `${size} total space saved`,
        count: (count: number) => `${count} files optimized`,
      },
    },
    fileUploader: {
      clickToSelect: "Click to upload",
      orDrop: (type: "pdf" | "images") =>
        type === "images" ? "or drag & drop images here" : "or drag & drop PDF files here",
      accepted: {
        pdf: "PDF documents",
        images: "Supported formats: JPG, PNG, WEBP, TIFF",
      },
      maxSize: (sizeMb: number) => `Recommended max file size: < ${sizeMb}MB`,
      errors: {
        invalidType: (fileName: string, label: string) =>
          `Invalid file format: ${fileName}. Only ${label} are supported.`,
        tooLarge: (fileName: string, sizeMb: number) =>
          `File size exceeds limit: ${fileName}. Maximum supported size is ${sizeMb}MB.`,
      },
      dropImagesAlt: "PDF document upload zone",
    },
    fileList: {
      moveUp: "Move up",
      moveDown: "Move down",
      remove: "Remove",
      removeAll: "Remove all",
      imageLabel: "Image",
      fileLabel: "File",
      selected: "Selected",
      pdfLabel: "PDF",
      deselect: "Deselect",
      pagesLabel: (count: number) => `${count} ${count === 1 ? "page" : "pages"}`,
      previewLoading: "Generating thumbnail preview…",
    },
    pageSelector: {
      loading: "Loading PDF pages...",
      error: "Unable to parse PDF page metadata",
      summary: (total: number, selected: number) =>
        `${total} total pages (${selected} selected)`,
      selectAll: "Select All",
      deselectAll: "Deselect All",
      pageLabel: (pageNumber: number) => `Page ${pageNumber}`,
      extraPages: (shown: number, total: number) =>
        `Showing ${shown} of ${total} pages. Enter page ranges below to extract additional pages.`,
      manualLabel: "Enter page ranges manually (e.g. 1-5, 8, 12-15):",
      manualPlaceholder: "1-5, 8, 12-15",
    },
    pageOrderer: {
      loading: "Loading PDF pages...",
      error: "Unable to parse PDF page metadata",
      limitReached: (count: number) =>
        `This document contains ${count} pages. For peak browser performance, reorder up to 120 pages at a time.`,
      limitHint:
        "Tip: Split large documents into smaller sections first, then reorder each section.",
      summary: (count: number) => `${count} pages ready to reorder`,
      reset: "Reset to Original Order",
      dragHint: "Drag thumbnails to reorder pages",
      pageLabel: (pageNumber: number) => `Page ${pageNumber}`,
      originalLabel: (pageNumber: number) => `Original: Page ${pageNumber}`,
      instructions:
        'Drag thumbnails or use action arrows to reorder. Once satisfied, click "Save New Page Order".',
    },
    processingOptions: {
      compress: {
        title: "Compression Settings",
        level: "Preset Level",
        levels: {
          low: "Low (Subtle)",
          medium: "Recommended (Balanced)",
          high: "High (Maximum Size Reduction)",
        },
        removeMetadata: "Remove document metadata",
        removeMetadataHint: "Strips author name, creation date, modification history, and hidden tags.",
        stripAnnotations: "Remove comments & form fields",
        stripAnnotationsHint: "Strips user notes, interactive form fields, signatures, and annotations.",
        downscaleImages: "Optimize & downscale embedded images",
        downscaleHint: "Ideal for photo-heavy PDFs and scans. Shrinks embedded imagery while preserving sharp text.",
        advancedTitle: "Advanced Cleanup Tools",
        advancedDescription: "Customize optimization features to match your workflow requirements.",
        activeLabel: "Active Options:",
      },
      merge: {
        title: "Merge Settings",
        pageDivider: "Insert blank page between merged files",
        metadataTitle: "Document Title (Optional)",
        metadataAuthor: "Author Name (Optional)",
        metadataHint: "Specify metadata for the merged PDF output file.",
      },
      split: {
        title: "Split Settings",
        pagesPerFile: "Pages per individual file",
        pagesPerFileHint: "A new PDF file will be created every N pages.",
      },
      extract: {
        title: "Extraction Settings",
        preserveMetadata: "Preserve original document metadata",
        preserveMetadataHint: "Retains original document title, author, and creation properties.",
      },
      crop: {
        title: "Crop Settings",
        hint: "Select pages and define margin crop distances in points (72 pt = 1 inch).",
        inputModeLabel: "Crop Method",
        inputModes: {
          margins: "Set Margins",
          manual: "Visual Selection",
        },
        marginsTitle: "Margin Cutoffs",
        marginLabels: {
          top: "Top Margin (pt)",
          right: "Right Margin (pt)",
          bottom: "Bottom Margin (pt)",
          left: "Left Margin (pt)",
        },
        marginHint: "72 points ≈ 1 inch. Start with small values to prevent accidental content trimming.",
        preserveMetadata: "Preserve original document metadata",
        preserveMetadataHint: "Retains original document metadata in cropped file output.",
        manual: {
          title: "Visual Crop Selection",
          hint: "Drag the bounding box on the preview to specify the visible crop area.",
          loading: "Loading crop preview...",
          error: "Unable to load crop preview.",
          reset: "Reset Selection",
          pagePreview: (pageNumber: number) => `Previewing Page ${pageNumber}`,
        },
      },
      rotate: {
        title: "Rotation Settings",
        hint: "Choose rotation angle and select the target pages.",
        rotateRight90: "Rotate Right 90°",
        rotate180: "Rotate 180°",
        rotateLeft90: "Rotate Left 90°",
      },
      reorder: {
        title: "Reorder Settings",
        hint: "Drag thumbnails to arrange your desired sequence.",
      },
      pdfToImages: {
        title: "Image Export Settings",
        formatLabel: "Output Format",
        formatHint: "Choose PNG for lossless crispness or JPEG for compact file sizes.",
        pngLabel: "PNG (Lossless Quality)",
        jpegLabel: "JPEG (Compact Size)",
        qualityLabel: "JPEG Image Quality",
        qualityHint: "Higher quality delivers sharper detail at slightly larger file sizes.",
        dpiLabel: "Render Resolution (DPI)",
        dpiHint: "Higher DPI enhances clarity. 144 DPI is ideal for digital screens; 300 DPI for printing.",
        dpiPresets: {
          screen: "72 DPI · Web & Mobile",
          balanced: "144 DPI · High Definition",
          print: "300 DPI · Professional Print",
        },
        zipLabel: "Bundle images into a ZIP file",
        zipHint: "Download all exported images in a single compressed archive.",
        baseNameLabel: "Output File Prefix",
        baseNamePlaceholder: "ihatelovepdf_export",
        baseNameHint: "Filename prefix for exported images. Leave blank to default to original document name.",
      },
      imagesToPdf: {
        title: "Page Layout Settings",
        layoutTitle: "Layout Configuration",
        fitLabel: "Image Scaling",
        fitOptions: {
          contain: "Fit to Page (Show Entire Image)",
          cover: "Fill Page (Cover Entire Canvas)",
        },
        sizeLabel: "Paper Size",
        sizeOptions: {
          auto: "Auto (Match Source Resolution)",
          a4: "Standard A4",
          letter: "US Letter",
        },
        orientationLabel: "Page Orientation",
        orientationOptions: {
          auto: "Auto-detect",
          portrait: "Portrait",
          landscape: "Landscape",
        },
        marginLabel: "Page Margins (pt)",
        marginHint: "Adds uniform white margins around images (72 pt ≈ 1 inch).",
        backgroundLabel: "Canvas Background Color",
        backgroundHint: "Fills empty background space around fitted images.",
      },
    },
    cookieBanner: {
      message: "We use essential privacy friendly analytics to improve ihatelovepdf. We never sell or track personal data.",
      accept: "Accept",
      decline: "Decline",
    },
  },
  pages: {
    home: {
      hero: {
        title: "ihatelovepdf: Fast, Private & Free PDF Tools in Your Browser",
        subtitle:
          "Merge, split, compress, crop, rotate, and convert PDFs directly inside your browser. Your files stay on your device: private, fast, and completely free.",
        badges: [
          "Fast PDF Compression",
          "Unlimited PDF Merging",
          "100% Local Privacy",
          "No Server Uploads",
        ],
        imageAlt: "ihatelovepdf mascot icon illustration",
        ctaLinks: [
          {
            label: "PDF to Images",
            href: operationsRoutes.pdfToImages,
            description: "Export pages as PNG or JPEG",
          },
          {
            label: "Images to PDF",
            href: operationsRoutes.imagesToPdf,
            description: "Convert JPG, PNG, or WEBP",
          },
        ],
      },
      why: {
        title: "Why People Use ihatelovepdf",
        cards: [
          {
            title: "Private by Default",
            description:
              "Your files never leave your device. All processing happens locally inside your browser.",
            icon: "🔒",
          },
          {
            title: "Fast and Direct",
            description:
              "Processes your files right away using your device hardware. There are no server queues or upload delays.",
            icon: "⚡",
          },
          {
            title: "Works Everywhere",
            description:
              "Runs directly in your browser on desktop, tablet, or phone without installing any software or app.",
            icon: "📱",
          },
        ],
      },
      callout: {
        title: "Support Independent Private Tools",
        description:
          "Every contribution covers server infrastructure, maintenance, and helps keep ihatelovepdf free, private, and ad free.",
        ctaLabel: "Support the Project",
        ctaUrl: getRoutePath(locale, "support"),
        secondaryLabel: "Learn How Funds Are Used",
        secondaryUrl: getRoutePath(locale, "support") + "#support-transparency",
      },
    },
    faq: {
      title: "Frequently Asked Questions",
      intro: "Everything you need to know about ihatelovepdf and how it works.",
      cta: {
        title: "Ready to process your PDFs?",
        description:
          "Merge, compress, split, extract, rotate, and convert PDFs directly on your device. No sign ups or server uploads required.",
        ctaLabel: "Open ihatelovepdf Toolkit",
      },
    },
    support: {
      hero: {
        eyebrow: "Independent Open Source Project",
        title: "Help Keep ihatelovepdf Free and Private",
        subtitle:
          "ihatelovepdf is an independent project built to respect user privacy. Your support covers hosting costs and continuous improvements.",
        highlight: "Simple, powerful tools that keep your documents in your hands.",
      },
      reasons: {
        title: "Why Support ihatelovepdf?",
        cards: [
          {
            title: "Keep It Free for Everyone",
            description:
              "Your contributions ensure ihatelovepdf remains 100% free with no paywalls, premium tiers, or hidden limits.",
            icon: "💚",
          },
          {
            title: "Accelerate Development",
            description:
              "Directly fund new PDF utilities, performance optimizations, and continuous feature updates.",
            icon: "✨",
          },
          {
            title: "Champion Digital Privacy",
            description:
              "Support local, on-device document processing and help build a web free from intrusive data tracking.",
            icon: "🔒",
          },
        ],
      },
      tiers: {
        title: "Support the Project",
        description: "Every contribution makes a difference. Safe & secure payment via Stripe.",
        cards: [
          {
            id: "coffee",
            title: "Buy us a coffee",
            amount: "€3",
            description: "Covers hosting and infrastructure for a few weeks.",
            ctaLabel: "Donate €3",
            ctaHref: "#stripe-checkout-coffee",
          },
          {
            id: "monthly",
            title: "Monthly Supporter",
            amount: "€10/mo",
            description: "Provides steady backing to dedicate time weekly to ihatelovepdf.",
            ctaLabel: "Give €10/mo",
            ctaHref: "#stripe-checkout-monthly",
            badge: "Recommended",
          },
          {
            id: "custom",
            title: "Custom Contribution",
            amount: "Flexible",
            description: "Choose any amount that fits your budget.",
            ctaLabel: "Choose Amount",
            ctaHref: "#stripe-checkout-custom",
          },
        ],
        note: "Secure payment processing powered by UPI.",
      },
      transparency: {
        title: "How Contributions Are Allocated",
        items: [
          "Global CDN and hosting infrastructure for high-speed delivery worldwide",
          "Dedicated development time for bug fixes and new PDF features",
          "UI/UX design enhancements for a seamless user experience",
          "Multi-language translations and comprehensive documentation",
        ],
      },
      faq: {
        title: "Support FAQ",
        entries: [
          {
            question: "What if I'm unable to contribute financially?",
            answer:
              "No problem at all! ihatelovepdf will always remain 100% free. Sharing ihatelovepdf with friends, colleagues, or social media is incredible support.",
          },
        ],
      },
      closing: {
        title: "Thank You for Supporting Privacy",
        description:
          "Every supporter helps keep a fast, reliable, and privacy-respecting PDF toolkit accessible to everyone around the world.",
        ctaLabel: "Get in Touch",
        ctaHref: "mailto:info@ihatelovepdf.com?subject=Hello%20ihatelovepdf%20team",
      },
      legalNotice: {
        title: "Legal & Financial Transparency Notes",
        points: [
          "ihatelovepdf is an independent project maintained by open-source contributors.",
          "Contributions are voluntary and help support hosting, maintenance, and software development.",
          "The service is provided 'as is' without warranties. For inquiries, contact info@ihatelovepdf.com.",
        ],
      },
    },
  },
  faqs: faqsEn,
  operations: operationsEn,
};
