export interface GuideItem {
  slug: string;
  title: string;
  description: string;
  category: 'How-To' | 'Security' | 'Optimization' | 'Organization';
  date: string;
  readTime: string;
  toolSlug: string;
  content: string[];
  keyTakeaways: string[];
  steps: string[];
}

export const GUIDES_DATA: Record<string, GuideItem> = {
  'how-to-redact-pdf-free': {
    slug: 'how-to-redact-pdf-free',
    title: 'How to Permanently Redact a PDF Online for Free (Zero Uploads)',
    description: 'Learn how to black out sensitive information, PII, and financial data from PDF files directly in your web browser with zero server uploads.',
    category: 'Security',
    date: '2026-08-20',
    readTime: '4 min read',
    toolSlug: 'redact',
    keyTakeaways: [
      'Visual redaction burns vector rectangles directly into the PDF byte stream rather than drawing temporary annotations.',
      '100% client-side execution ensures confidential medical, legal, or financial files never touch external servers.',
      'Metadata and hidden form field data are scrubbed alongside visual text blackouts.'
    ],
    steps: [
      'Open the ihatelovepdf PDF Redactor in your browser.',
      'Drag and drop your confidential PDF into the secure editor.',
      'Click and drag over sensitive text or numbers you wish to permanently redact.',
      'Choose black or white redaction styling and click "Burn Redactions".',
      'Download your sanitized PDF instantly with zero watermarks.'
    ],
    content: [
      'Redacting sensitive documents is a critical security task for attorneys, healthcare providers, HR departments, and individuals sharing bank statements or tax returns.',
      'Traditional online PDF converters often perform pseudo-redaction by placing a translucent overlay box over text. If an attacker copies the text underneath or opens the file in a raw text viewer, the sensitive information is still fully accessible.',
      'With ihatelovepdf, redaction is permanent and irreversible. The underlying vector paths and text streams are rewritten directly inside your browser memory using WebAssembly, ensuring that redacted data cannot be recovered by any software.'
    ]
  },
  'how-to-merge-pdf-files': {
    slug: 'how-to-merge-pdf-files',
    title: 'How to Merge Multiple PDF Files into One Combined Document',
    description: 'Combine reports, contracts, invoices, and receipts into a single organized PDF with drag-and-drop page reordering.',
    category: 'Organization',
    date: '2026-08-21',
    readTime: '3 min read',
    toolSlug: 'merge',
    keyTakeaways: [
      'Fast client-side merging allows combining dozens of PDFs in seconds.',
      'Easily reorder input documents before generating the final combined file.',
      'Retains original vector typography, bookmarks, and embedded high-resolution graphics.'
    ],
    steps: [
      'Navigate to the ihatelovepdf Merge PDF tool.',
      'Drop 2 or more PDF files into the upload area.',
      'Drag cards to reorder your documents into the desired sequence.',
      'Click "Merge PDF" to combine all files instantly.',
      'Download your consolidated PDF file.'
    ],
    content: [
      'Merging multiple separate documents into a single PDF makes files easier to distribute, print, and archive.',
      'Unlike cloud uploaders with strict 10MB or 20-file limits, in-browser merging runs locally on your device without file size limits.',
      'The engine preserves bookmarks, color profiles, and internal vector structures seamlessly.'
    ]
  },
  'how-to-compress-pdf-without-losing-quality': {
    slug: 'how-to-compress-pdf-without-losing-quality',
    title: 'How to Compress Large PDFs for Email & Portals Without Quality Loss',
    description: 'Shrink oversized PDF files down to target megabyte limits while preserving crisp vector text, diagrams, and readable images.',
    category: 'Optimization',
    date: '2026-08-21',
    readTime: '4 min read',
    toolSlug: 'compress',
    keyTakeaways: [
      'Choose between Low, Medium, and High compression presets tailored for email or web portal limits.',
      'Re-packs object streams and downscales redundant high-DPI imagery without rasterizing text.',
      'Real-time savings preview calculates exact byte reduction before saving.'
    ],
    steps: [
      'Open the Compress PDF tool in ihatelovepdf.',
      'Upload your large PDF file.',
      'Select your desired compression preset (Recommended: Medium for balanced quality).',
      'Click "Compress PDF" to process directly in your browser.',
      'Download your optimized lightweight document.'
    ],
    content: [
      'Government portals, university application systems, and email providers routinely reject PDF attachments larger than 5MB or 10MB.',
      'Our compression engine uses lossless font stream deduplication and adaptive DCT image quantization to strip unneeded bloat without making text blurry.',
      'All processing executes locally, keeping sensitive financial or legal documents 100% confidential.'
    ]
  },
  'how-to-split-pdf-pages': {
    slug: 'how-to-split-pdf-pages',
    title: 'How to Choose and Split Specific Pages or Ranges from a PDF',
    description: 'Visually select exact pages, enter custom ranges (e.g. 1-3, 4-6), or extract all single pages into individual PDF files.',
    category: 'Organization',
    date: '2026-08-22',
    readTime: '3 min read',
    toolSlug: 'split',
    keyTakeaways: [
      'Interactive visual thumbnail picker makes selecting split pages intuitive.',
      'Supports custom comma-separated range expressions like "1-3, 4-5, 6".',
      'Optionally split every N pages into uniform document batches.'
    ],
    steps: [
      'Open the Split PDF tool in ihatelovepdf.',
      'Upload the multi-page PDF document you want to divide.',
      'Choose your split method: Visual Page Picker, Custom Ranges, or Fixed Page Intervals.',
      'Click the thumbnail pages or type your desired page ranges.',
      'Click "Split PDF" and download your generated documents.'
    ],
    content: [
      'Extracting specific chapters, single invoices, or individual pages from large combined documents is simple with the split tool.',
      'Our visual page picker gives you a thumbnail overview of each page so you can verify exactly what you are splitting.',
      'You can export the selected pages as their own standalone document, leaving the remainder intact.'
    ]
  },
  'how-to-ocr-scanned-pdf-offline': {
    slug: 'how-to-ocr-scanned-pdf-offline',
    title: 'How to OCR Scanned PDFs & Receipts into Searchable Text',
    description: 'Convert scanned documents, physical receipts, and images into searchable, copyable PDF text using in-browser WebAssembly OCR.',
    category: 'How-To',
    date: '2026-08-22',
    readTime: '5 min read',
    toolSlug: 'ocr',
    keyTakeaways: [
      'Optical Character Recognition (OCR) converts raster image scans into searchable, selectable text.',
      'Downloads the Tesseract neural model locally to execute recognition without external API calls.',
      'Export searchable PDF transcripts, structured markdown text, or raw text directly.'
    ],
    steps: [
      'Navigate to the ihatelovepdf OCR tool.',
      'Upload your scanned PDF, receipt image, or document photo.',
      'Select your document language (English, Spanish, German, French, etc.).',
      'Click "Run OCR" and watch the live recognition progress.',
      'Download your searchable PDF document with full text indexing.'
    ],
    content: [
      'Scanned documents and smartphone photos of physical paperwork contain pixel data rather than selectable characters. This prevents users from searching, highlighting, or copying information.',
      'By utilizing Tesseract compiled to WebAssembly, ihatelovepdf executes high-accuracy neural OCR directly on your machine.',
      'No third-party cloud vision APIs or subscription keys are required for OCR operations.'
    ]
  },
  'how-to-convert-images-to-pdf': {
    slug: 'how-to-convert-images-to-pdf',
    title: 'How to Convert Photos, PNGs, and JPEGs into a PDF Document',
    description: 'Turn smartphone photos, ID cards, receipts, and graphic images into a clean, multi-page PDF document in seconds.',
    category: 'How-To',
    date: '2026-08-22',
    readTime: '3 min read',
    toolSlug: 'imagesToPdf',
    keyTakeaways: [
      'Supports JPG, PNG, WEBP, TIFF, and BMP image formats.',
      'Drag and drop multiple images to arrange page order before conversion.',
      'Auto-scales image dimensions to fit standard A4 or Letter page layouts.'
    ],
    steps: [
      'Open the Images to PDF tool in ihatelovepdf.',
      'Upload one or more images from your phone or computer.',
      'Reorder images by dragging thumbnails into your preferred sequence.',
      'Choose page orientation (Portrait or Landscape).',
      'Click "Convert to PDF" and download your newly created PDF.'
    ],
    content: [
      'Converting photos into PDF format is the standard way to submit expense receipts, ID verification documents, and multi-page scanned forms.',
      'Our in-browser converter preserves high image clarity while compressing image containers into standard PDF page geometry.',
      'No files are uploaded to any server, making it safe for sensitive photo documents like passports and driver licenses.'
    ]
  },
  'how-to-ocr-scanned-pdf-free': {
    slug: 'how-to-ocr-scanned-pdf-free',
    title: 'How to Recognize and Extract Text from Scanned PDFs (Client-Side OCR)',
    description: 'Convert scanned PDF documents and photo receipts into searchable PDFs and editable text using in-browser Tesseract WebAssembly with zero server uploads.',
    category: 'Optimization',
    date: '2026-08-23',
    readTime: '3 min read',
    toolSlug: 'ocr',
    keyTakeaways: [
      'Executes 100% in your browser using local Tesseract WebAssembly.',
      'Generates a dual-layer Searchable PDF with selectable, copyable text over original scans.',
      'Provides an editable plain-text transcript with word counts and confidence scoring.'
    ],
    steps: [
      'Open the OCR PDF tool on ihatelovepdf.',
      'Upload your scanned PDF document or photo scan.',
      'Select your document language (English, Spanish, French, German, etc.).',
      'Click "Run OCR Recognition" to process all pages locally.',
      'Download your Searchable PDF or copy the extracted text transcript.'
    ],
    content: [
      'Scanned documents, paper contracts, and photo receipts are saved as static images inside PDF containers, making text impossible to select, copy, or search.',
      'Our client-side OCR engine uses Tesseract compiled to WebAssembly to perform optical character recognition directly inside your device memory.',
      'No documents or images are transmitted across the internet, ensuring full privacy and compliance for financial records, IDs, medical charts, and legal agreements.'
    ]
  }
};
