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
    title: 'How to Permanently Redact a PDF Online for Free with No Uploads',
    description: 'Learn how to black out sensitive information, personal details, and financial data from PDF files directly in your web browser without server uploads.',
    category: 'Security',
    date: '2026-08-20',
    readTime: '4 min read',
    toolSlug: 'redact',
    keyTakeaways: [
      'Visual redaction burns rectangles directly into the PDF document instead of drawing temporary annotations.',
      'Running directly in your browser ensures confidential medical, legal, or financial files never touch external servers.',
      'Metadata and hidden form field data are scrubbed alongside visual text blackouts.'
    ],
    steps: [
      'Open the ihatelovepdf PDF Redactor in your browser.',
      'Drag and drop your confidential PDF into the secure editor.',
      'Click and drag over sensitive text or numbers you wish to permanently redact.',
      'Choose black or white redaction styling and click "Burn Redactions".',
      'Download your sanitized PDF instantly without watermarks.'
    ],
    content: [
      'Redacting sensitive documents is an important task for lawyers, doctors, accountants, and anyone sharing bank statements or tax forms.',
      'Some online tools only place a dark box on top of the text. If someone copies the text underneath or opens the file in a text reader, the sensitive words are still there.',
      'With ihatelovepdf, redaction is permanent and cannot be undone. The text and visual paths are removed directly in your browser memory, so redacted information cannot be recovered by any software.'
    ]
  },
  'how-to-merge-pdf-files': {
    slug: 'how-to-merge-pdf-files',
    title: 'How to Merge Multiple PDF Files into One Combined Document',
    description: 'Combine reports, contracts, invoices, and receipts into a single organized PDF with drag and drop page reordering.',
    category: 'Organization',
    date: '2026-08-21',
    readTime: '3 min read',
    toolSlug: 'merge',
    keyTakeaways: [
      'Fast in-browser merging lets you combine dozens of PDFs in seconds.',
      'Easily reorder input documents before generating the final combined file.',
      'Retains original vector typography, bookmarks, and embedded high resolution graphics.'
    ],
    steps: [
      'Navigate to the ihatelovepdf Merge PDF tool.',
      'Drop 2 or more PDF files into the upload area.',
      'Drag cards to reorder your documents into the desired sequence.',
      'Click "Merge PDF" to combine all files instantly.',
      'Download your consolidated PDF file.'
    ],
    content: [
      'Merging multiple separate documents into a single PDF makes files easier to share, print, and archive.',
      'Unlike cloud services that cap file sizes or total pages, in-browser merging runs locally on your device without file size limits.',
      'The engine preserves bookmarks, color profiles, and internal vector structures cleanly.'
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
      'Re-packs object streams and optimizes redundant imagery without rasterizing text.',
      'Live savings preview calculates exact byte reduction before saving.'
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
      'Our compression engine strips unneeded metadata and optimizes images without making your text blurry.',
      'All processing runs locally, keeping sensitive financial or legal documents completely private.'
    ]
  },
  'how-to-split-pdf-pages': {
    slug: 'how-to-split-pdf-pages',
    title: 'How to Choose and Split Specific Pages or Ranges from a PDF',
    description: 'Visually select exact pages, enter custom ranges (such as 1-3, 4-6), or extract all single pages into individual PDF files.',
    category: 'Organization',
    date: '2026-08-22',
    readTime: '3 min read',
    toolSlug: 'split',
    keyTakeaways: [
      'Interactive visual thumbnail picker makes selecting split pages intuitive.',
      'Supports custom comma separated range expressions like "1-3, 4-5, 6".',
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
    description: 'Convert scanned documents, physical receipts, and images into searchable, copyable PDF text using OCR directly in your browser.',
    category: 'How-To',
    date: '2026-08-22',
    readTime: '5 min read',
    toolSlug: 'extractText',
    keyTakeaways: [
      'Optical Character Recognition (OCR) converts raster image scans into searchable, selectable text.',
      'Loads Tesseract locally to perform text recognition without external API calls.',
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
      'Scanned documents and phone photos of paperwork contain image pixels instead of selectable characters. That stops you from searching or copying text.',
      'Using Tesseract right inside your browser, ihatelovepdf reads text directly on your machine.',
      'No third party cloud vision APIs or subscription keys are needed for OCR operations.'
    ]
  },
  'how-to-convert-images-to-pdf': {
    slug: 'how-to-convert-images-to-pdf',
    title: 'How to Convert Photos, PNGs, and JPEGs into a PDF Document',
    description: 'Turn smartphone photos, ID cards, receipts, and graphic images into a clean PDF document in seconds.',
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
      'Converting photos into PDF format is the standard way to submit expense receipts, ID verification documents, and multi-page forms.',
      'Our in-browser converter preserves high image clarity while sizing pages cleanly.',
      'No files are uploaded to any server, making it safe for sensitive photos like passports and driving licenses.'
    ]
  },
  'how-to-ocr-scanned-pdf-free': {
    slug: 'how-to-ocr-scanned-pdf-free',
    title: 'How to Recognize and Extract Text from Scanned PDFs (Browser OCR)',
    description: 'Convert scanned PDF documents and photo receipts into searchable PDFs and editable text using local OCR in your browser without uploading files.',
    category: 'Optimization',
    date: '2026-08-23',
    readTime: '3 min read',
    toolSlug: 'extractText',
    keyTakeaways: [
      'Runs completely in your browser on your own device.',
      'Generates a dual-layer Searchable PDF with selectable, copyable text over original scans.',
      'Provides an editable plain text transcript with word counts and confidence scoring.'
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
      'Our browser OCR engine uses Tesseract to read text directly inside your device memory.',
      'No documents or images are transmitted across the internet, ensuring full privacy for financial records, IDs, and agreements.'
    ]
  }
};
