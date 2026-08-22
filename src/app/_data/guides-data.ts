export interface GuideItem {
  slug: string;
  title: string;
  description: string;
  category: 'Privacy' | 'How-To' | 'Comparison';
  date: string;
  readTime: string;
  toolSlug?: string;
  content: string[];
  keyTakeaways: string[];
  steps?: string[];
}

export const GUIDES_DATA: Record<string, GuideItem> = {
  'how-to-redact-pdf-free': {
    slug: 'how-to-redact-pdf-free',
    title: 'How to Permanently Redact a PDF Online for Free (Zero Uploads)',
    description: 'Learn how to black out sensitive information, PII, and financial data from PDF files directly in your web browser with zero server uploads.',
    category: 'How-To',
    date: '2026-08-20',
    readTime: '4 min read',
    toolSlug: 'redact',
    keyTakeaways: [
      'Visual redaction in ihatelovepdf burns vector rectangles into the PDF byte stream rather than drawing temporary annotations.',
      '100% client-side execution ensures confidential medical, legal, or financial files never touch external servers.',
      'Metadata and hidden form field data are scrubbed alongside visual text blackouts.'
    ],
    steps: [
      'Open the ihatelovepdf PDF Redactor in your browser.',
      'Drag and drop your confidential PDF into the secure editor.',
      'Click and drag over the sensitive text or numbers you wish to permanently redact.',
      'Choose black or white redaction styling and click "Burn Redactions".',
      'Download your sanitized PDF instantly with zero watermarks.'
    ],
    content: [
      'Redacting sensitive documents is a critical security task for attorneys, healthcare providers, HR departments, and individuals sharing bank statements or tax returns.',
      'Traditional online PDF converters often perform pseudo-redaction by placing a translucent overlay box over text. If an attacker copies the text underneath or opens the file in a raw text viewer, the sensitive information is still fully accessible.',
      'With ihatelovepdf, redaction is permanent and irreversible. The underlying vector paths and text streams are rewritten directly inside your browser memory using WebAssembly, ensuring that redacted data cannot be recovered by any software.'
    ]
  },
  'ihatelovepdf-vs-ilovepdf': {
    slug: 'ihatelovepdf-vs-ilovepdf',
    title: 'ihatelovepdf vs iLovePDF: Complete 2026 Feature & Privacy Comparison',
    description: 'A deep-dive technical comparison between ihatelovepdf.com and iLovePDF. Discover the difference between 100% browser-local processing vs cloud server uploads.',
    category: 'Comparison',
    date: '2026-08-21',
    readTime: '6 min read',
    keyTakeaways: [
      'iLovePDF uploads documents to remote cloud servers for processing; ihatelovepdf processes 100% locally via WebAssembly.',
      'ihatelovepdf has zero artificial file size limits or daily task quotas.',
      'Both platforms offer extensive tool sets (46 tools), but ihatelovepdf eliminates third-party data exposure risk.'
    ],
    content: [
      'For years, iLovePDF has been a popular web-based PDF utility. However, users frequently express concern regarding where their confidential files are uploaded, who has access to the servers, and compliance with strict data protection regulations such as GDPR and HIPAA.',
      'ihatelovepdf was created as a modern, privacy-first alternative. By running WebAssembly engines directly on your computer or phone, files are never transmitted across the network.',
      'Furthermore, ihatelovepdf does not throttle free users with task counters, artificial file size tiers, or intrusive watermark paywalls.'
    ]
  },
  'how-to-ocr-scanned-pdf-offline': {
    slug: 'how-to-ocr-scanned-pdf-offline',
    title: 'How to OCR Scanned PDFs in Your Browser Using WebAssembly',
    description: 'Convert scanned documents, physical receipts, and images into searchable, copyable PDF text using in-browser Tesseract.js WebAssembly OCR.',
    category: 'How-To',
    date: '2026-08-22',
    readTime: '5 min read',
    toolSlug: 'ocr',
    keyTakeaways: [
      'Optical Character Recognition (OCR) converts raster image scans into searchable, selectable text.',
      'Our engine downloads the Tesseract.js neural language model locally to execute recognition without API calls.',
      'Export searchable PDF transcripts, markdown text, or raw text directly.'
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
      'By utilizing Tesseract.js compiled to WebAssembly, ihatelovepdf executes high-accuracy neural OCR directly on your machine.',
      'No third-party cloud vision APIs or subscription keys are required for basic OCR operations.'
    ]
  },
  'ihatelovepdf-vs-smallpdf': {
    slug: 'ihatelovepdf-vs-smallpdf',
    title: 'ihatelovepdf vs Smallpdf: Unlimited Free Local Tools vs Paid Subscriptions',
    description: 'Compare ihatelovepdf and Smallpdf. Understand why client-side WebAssembly allows free, unlimited processing without subscriptions or 2-task daily limits.',
    category: 'Comparison',
    date: '2026-08-22',
    readTime: '5 min read',
    keyTakeaways: [
      'Smallpdf restricts free users to 2 documents per day before demanding a paid subscription.',
      'ihatelovepdf leverages client-side computing to offer 100% free, unlimited document conversions.',
      'Zero server infrastructure costs mean ihatelovepdf never needs to gate basic features behind paywalls.'
    ],
    content: [
      'Smallpdf is well-known for its clean design, but free users quickly encounter strict paywalls that block usage after just two operations per day.',
      'Smallpdf relies on expensive server farms to process PDFs remotely, passing those costs onto users via premium recurring plans.',
      'ihatelovepdf shifts the computation to modern client-side browser engines. Because your device does the processing, our operational costs remain virtually zero—allowing us to offer all 46 tools completely free and unlimited.'
    ]
  }
};
