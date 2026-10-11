import type { OperationKey } from '../types/operations';

export interface ToolFaqItem {
  question: string;
  answer: string;
}

export const TOOL_FAQS: Record<OperationKey, ToolFaqItem[]> = {
  merge: [
    {
      question: 'How does merging PDFs in the browser protect my privacy?',
      answer: 'Your files are merged entirely inside your web browser using client-side JavaScript. They are never uploaded to any remote server or cloud bucket.',
    },
    {
      question: 'Is there a limit on how many PDF files I can combine at once?',
      answer: 'You can combine as many PDF files as your device memory allows. Most modern computers and smartphones easily handle dozens of files simultaneously.',
    },
    {
      question: 'Can I reorder or rearrange documents before merging them?',
      answer: 'Yes. You can drag and drop documents into your preferred order or use arrow controls before clicking the Merge button.',
    },
    {
      question: 'Does merging multiple PDFs degrade document visual quality?',
      answer: 'No. The merge process preserves original vector outlines, fonts, color profiles, and image resolutions without recompressing your content.',
    },
    {
      question: 'Can I combine password protected PDF documents?',
      answer: 'If a PDF has an owner password that restricts copying, it will usually merge. If it requires an open password, unlock it first with your password before merging.',
    },
    {
      question: 'Can I merge PDF files on an iPhone or Android phone?',
      answer: 'Yes. The tool runs on all modern mobile web browsers including Safari, Chrome, Firefox, and Edge with zero app installation needed.',
    },
  ],
  compress: [
    {
      question: 'How does client-side PDF compression work?',
      answer: 'The compression engine optimizes embedded raster images, strips duplicate font subsets, removes redundant metadata streams, and packs object streams directly in your browser.',
    },
    {
      question: 'Will compressing my PDF make the text or diagrams blurry?',
      answer: 'No. Text content and vector diagrams remain pin-sharp because they are drawn with mathematical curves. Only high-resolution images are downsampled to target DPI levels.',
    },
    {
      question: 'How much file size reduction can I expect?',
      answer: 'Typical image-heavy documents, scans, and presentation slides reduce by 40% to 90%. Files that already contain compressed text only may see smaller reductions.',
    },
    {
      question: 'Can I compress a PDF to under 100KB or 200KB for portal uploads?',
      answer: 'Yes. You can adjust the compression strength slider to balance visual fidelity against file size to meet strict file size limits for email attachments and portal submissions.',
    },
    {
      question: 'Are my private tax forms and financial records safe during compression?',
      answer: 'Yes, 100%. Processing happens locally in your device RAM. No document bytes leave your computer, so sensitive personal and financial data remains completely confidential.',
    },
    {
      question: 'Does this tool add any watermark or branding after compression?',
      answer: 'Never. I Hate Love PDF produces clean, watermark-free output files with zero branding added.',
    },
  ],
  split: [
    {
      question: 'How do I split a large PDF into individual page files?',
      answer: 'Upload your document, select the Split mode, choose whether you want individual single-page files or custom page ranges, and download your separated files.',
    },
    {
      question: 'Can I specify custom page ranges such as pages 1-4 and 7-10?',
      answer: 'Yes. You can enter comma-separated numbers and ranges like 1-3, 5, 8-12 to isolate exactly the pages you need into separate documents.',
    },
    {
      question: 'Does splitting a document break embedded bookmarks or hyperlinks?',
      answer: 'Page-level internal links that point within the newly separated ranges remain functional. External hyperlinks to web addresses remain completely intact.',
    },
    {
      question: 'Can I split a scanned book or multi-page manual on my phone?',
      answer: 'Yes. The tool works smoothly in mobile browsers on iOS and Android without consuming cellular data for file uploads.',
    },
    {
      question: 'Is there any fee or daily cap on how many PDFs I can split?',
      answer: 'No. There are no daily usage limits, paywalls, or mandatory signups. You can split as many documents as you need for free.',
    },
  ],
  extract: [
    {
      question: 'What is the difference between extracting pages and splitting a PDF?',
      answer: 'Splitting breaks your entire document into multiple separate files. Extracting allows you to cherry-pick specific pages and bundle only those chosen pages into one clean new PDF.',
    },
    {
      question: 'Can I extract non-consecutive pages from different sections of a PDF?',
      answer: 'Yes. You can visually click thumbnails or enter page numbers like 2, 7, 14, 25 to combine non-adjacent pages into your new output file.',
    },
    {
      question: 'Does extracting pages keep the original text selectable and searchable?',
      answer: 'Yes. All extracted pages retain their original vector glyphs, embedded fonts, and searchable text layers without any conversion degradation.',
    },
    {
      question: 'Can I delete pages while extracting?',
      answer: 'Yes. Simply deselect or omit the pages you do not want, and the resulting file will contain only the pages you selected.',
    },
    {
      question: 'Are extracted documents saved anywhere on the internet?',
      answer: 'No. Everything is processed directly in your browser tab. Nothing is stored on any server or cloud database.',
    },
  ],
  crop: [
    {
      question: 'How do I crop margins on my PDF pages?',
      answer: 'Select your PDF, use the visual drag handles on the page preview to define your crop box, and apply the crop to your selected page or the entire document.',
    },
    {
      question: 'Does cropping reduce the physical file size of the PDF?',
      answer: 'Cropping adjusts the visible page bounding box (MediaBox and CropBox). While it conceals outside margins and content, it does not purge hidden vector data unless flattened.',
    },
    {
      question: 'Can I apply the same crop dimensions to all pages in a document?',
      answer: 'Yes. You can toggle the Apply to All Pages option to crop margins uniformly across an entire book, paper, or set of slides.',
    },
    {
      question: 'Can I crop different pages with custom dimensions independently?',
      answer: 'Yes. You can navigate between individual pages and adjust the crop boundaries for each page separately before downloading.',
    },
    {
      question: 'Does the crop tool work on scanned receipts and legal documents?',
      answer: 'Yes. It works with both native vector PDFs and scanned image documents, allowing you to remove black borders and scanner margins cleanly.',
    },
  ],
  rotate: [
    {
      question: 'How do I rotate upside down or sideways PDF pages permanently?',
      answer: 'Select the pages you want to adjust and click the 90 degree clockwise or counter-clockwise rotation buttons. The rotation metadata is saved permanently into the document.',
    },
    {
      question: 'Why do my rotations revert when opened in external readers?',
      answer: 'Many free viewers only rotate the screen view temporarily. Our tool updates the permanent internal page rotation dictionary so your changes stick across all PDF readers.',
    },
    {
      question: 'Can I rotate only odd pages or only even pages?',
      answer: 'Yes. You can select specific pages, odd pages, even pages, or the whole document with a single click before applying rotation.',
    },
    {
      question: 'Does rotating a PDF affect optical text clarity or quality?',
      answer: 'No. Rotating simply alters the page coordinate matrix angle. No pixels are resampled or compressed, keeping your document quality identical.',
    },
    {
      question: 'Is rotating PDF files completely free on this website?',
      answer: 'Yes. It is 100% free with no account required, no file limits, and no watermark added.',
    },
  ],
  reorder: [
    {
      question: 'How do I change the page order of my PDF document?',
      answer: 'Upload your document to see a visual thumbnail grid of all pages. Simply drag and drop thumbnails into your desired sequence, then download the reordered PDF.',
    },
    {
      question: 'Can I delete unwanted pages while reordering?',
      answer: 'Yes. Each page thumbnail includes a delete icon so you can remove blank or redundant pages in the same session.',
    },
    {
      question: 'Can I rotate individual pages while rearranging them?',
      answer: 'Yes. You can rotate individual pages 90 degrees directly from the thumbnail view before saving your final document.',
    },
    {
      question: 'How fast is reordering for large documents with hundreds of pages?',
      answer: 'Because thumbnails are rendered asynchronously using hardware-accelerated canvas routines, reordering even 200+ page documents feels instantaneous.',
    },
    {
      question: 'Does reordering preserve interactive form fields and signatures?',
      answer: 'Yes. Native form fields and annotation objects linked to each page move along with their respective page definitions.',
    },
  ],
  pdfToImages: [
    {
      question: 'Which image formats can I export my PDF pages into?',
      answer: 'You can convert PDF pages into high-resolution PNG format with crisp text transparency or space-saving JPG format for quick sharing.',
    },
    {
      question: 'What rendering resolution is used for converted images?',
      answer: 'You can choose between standard web resolution (150 DPI) and print-ready high definition (300 DPI) for sharp rasterization of text and charts.',
    },
    {
      question: 'Can I download all converted pages as a single ZIP archive?',
      answer: 'Yes. Once conversion finishes, you can download all page images bundled into a single organized ZIP file or save pages individually.',
    },
    {
      question: 'Are my converted images watermarked?',
      answer: 'No. All exported images are clean, original representations of your PDF pages with zero watermarks or promotional logos.',
    },
    {
      question: 'Does converting PDF to JPG upload my document to the cloud?',
      answer: 'No. Document rendering is performed locally inside your browser using the PDF.js canvas renderer. No data is sent over the internet.',
    },
  ],
  imagesToPdf: [
    {
      question: 'What image file formats can I convert into a PDF?',
      answer: 'You can upload JPG, JPEG, PNG, WebP, GIF, and BMP images to compile into a single structured multi-page PDF document.',
    },
    {
      question: 'Can I change the order of images before generating the PDF?',
      answer: 'Yes. You can drag and drop your uploaded images to set the exact chronological or sequential order for your PDF pages.',
    },
    {
      question: 'Can I configure page orientation, margins, and paper size?',
      answer: 'Yes. You can choose Portrait or Landscape orientation, select standard page sizes like A4, Letter, or fit-to-image dimensions, and customize margin spacing.',
    },
    {
      question: 'Does converting images to PDF reduce their sharpness?',
      answer: 'No. The converter embeds your images into the PDF document at their native pixel resolution unless you deliberately select a compression preset.',
    },
    {
      question: 'Is there a limit on how many photos I can convert at once?',
      answer: 'You can compile dozens of photos simultaneously. Processing speed depends entirely on your device local memory and processor.',
    },
  ],
  watermark: [
    {
      question: 'Can I add both text watermarks and image logos to my PDF?',
      answer: 'Yes. You can type custom text watermarks such as CONFIDENTIAL, DRAFT, or SAMPLE, or upload your company logo as a PNG image stamp.',
    },
    {
      question: 'Can I adjust the opacity and angle of the watermark?',
      answer: 'Yes. You have full control over opacity transparency (0% to 100%), rotation angle (diagonal 45 degrees or horizontal), font family, and color.',
    },
    {
      question: 'Can I position the watermark behind document text?',
      answer: 'Yes. You can choose whether the watermark appears as a background underlay behind existing text or as an overlay on top of page content.',
    },
    {
      question: 'Can I apply the watermark to selected pages only?',
      answer: 'Yes. You can apply the watermark across all pages, or restrict it to specific pages such as excluding the cover page.',
    },
    {
      question: 'Are my files kept private while adding watermarks?',
      answer: 'Yes. Watermark rendering runs completely on your local device. No documents are transmitted over external networks.',
    },
  ],
  pageNumbers: [
    {
      question: 'Where can I position page numbers on my PDF pages?',
      answer: 'You can place page numbers in six different positions: top-left, top-center, top-right, bottom-left, bottom-center, or bottom-right.',
    },
    {
      question: 'What numbering formats are supported?',
      answer: 'You can use simple numbers (1, 2, 3), Page X of Y formats (Page 1 of 24), Roman numerals (i, ii, iii), or custom prefixes like Doc-01.',
    },
    {
      question: 'Can I start numbering from page 2 to skip the cover sheet?',
      answer: 'Yes. You can specify a starting page offset so that title pages, cover sheets, and tables of contents remain unnumbered.',
    },
    {
      question: 'Can I customize font family, size, and text color?',
      answer: 'Yes. You can select standard typography, adjust font point size, choose text color, and tune margin offsets to match your document style.',
    },
    {
      question: 'Does adding page numbers modify existing document content?',
      answer: 'No. Page numbers are added as clean new vector text elements without altering or deleting any existing content.',
    },
  ],
  headersFooters: [
    {
      question: 'How do custom headers and footers work on PDF files?',
      answer: 'You can insert running titles, author names, confidentiality notices, dates, and page counters across page headers and footers automatically.',
    },
    {
      question: 'Can I use dynamic placeholders like date and page count?',
      answer: 'Yes. Macros like current date, page number, and total page count are automatically replaced with accurate dynamic values.',
    },
    {
      question: 'Can I specify different headers for odd and even pages?',
      answer: 'Yes. You can create alternating book-style headers where the document title sits on left pages and chapter titles appear on right pages.',
    },
    {
      question: 'Does this tool work on PDFs with mixed orientations?',
      answer: 'Yes. The engine detects portrait and landscape dimensions per page and computes header coordinates accurately for each page.',
    },
    {
      question: 'Is my document uploaded to a server to process headers?',
      answer: 'No. The entire process runs locally inside your browser with complete privacy and zero data transmission.',
    },
  ],
  extractText: [
    {
      question: 'How does in-browser text extraction work?',
      answer: 'The tool parses internal PDF character streams and font encodings using PDF.js, assembling glyphs into logical paragraphs and lines in natural reading order.',
    },
    {
      question: 'Can I extract text from scanned documents without an existing text layer?',
      answer: 'Scanned image-only PDFs require an OCR text layer. For documents with embedded text, extraction is instant and 100% accurate down to the character.',
    },
    {
      question: 'Does extracting text preserve paragraph breaks and table formatting?',
      answer: 'Yes. The extraction algorithm maintains whitespace structure, line breaks, and paragraph boundaries to keep your text easily readable.',
    },
    {
      question: 'Can I copy the extracted text or download it as a TXT file?',
      answer: 'Both options are available. You can copy extracted text directly to your clipboard with one click or download it as a clean UTF-8 text file.',
    },
    {
      question: 'Are sensitive contracts or personal notes exposed during extraction?',
      answer: 'Never. Extraction runs entirely in your device memory. No text or document bytes are transmitted to any server.',
    },
  ],
  invertColors: [
    {
      question: 'Why should I invert colors or enable dark mode on a PDF?',
      answer: 'Reading bright white PDFs in low-light environments causes severe eye fatigue. Inverting colors creates a comfortable dark background with high-contrast text.',
    },
    {
      question: 'Does color inversion affect embedded photos and diagrams?',
      answer: 'You can choose between full color inversion or smart reading mode that preserves natural photographic tones while darkening white backgrounds.',
    },
    {
      question: 'Can I save and download the dark mode PDF permanently?',
      answer: 'Yes. The generated PDF incorporates inverted color profiles so you can read it in dark mode across any PDF reader on desktop or mobile.',
    },
    {
      question: 'Can I invert only selected pages in a document?',
      answer: 'Yes. You can apply the high-contrast dark mode to all pages or select specific text-heavy pages to convert.',
    },
    {
      question: 'Is there any fee or account needed to use PDF dark mode?',
      answer: 'No. The dark mode tool is completely free and requires no registration or payment.',
    },
  ],
  redact: [
    {
      question: 'What makes true PDF redaction different from drawing a black box?',
      answer: 'Drawing a black rectangle only hides text visually; anyone can still copy the text beneath it. True redaction permanently purges the underlying text bytes and vector data from the file stream.',
    },
    {
      question: 'Can redacted text ever be recovered or uncovered?',
      answer: 'No. Once you apply redaction and download the file, the erased text and image pixels are completely removed from the PDF structure.',
    },
    {
      question: 'Is this redaction tool legally compliant for confidential documents?',
      answer: 'Yes. Because underlying byte sequences and search indices are destroyed, the document meets standard digital redaction requirements for legal, medical, and financial filings.',
    },
    {
      question: 'Can I redact both text and sensitive photos or signatures?',
      answer: 'Yes. You can drag rectangular redaction areas over text paragraphs, account numbers, passport photos, and handwritten signatures.',
    },
    {
      question: 'Does the redaction tool upload my confidential documents to the internet?',
      answer: 'Never. Redaction occurs 100% inside your local browser memory. Your confidential files never touch external servers.',
    },
  ],
  compare: [
    {
      question: 'How does side-by-side PDF comparison work?',
      answer: 'Upload two versions of a PDF document. The tool renders corresponding pages side-by-side with synchronized zoom and scroll so you can inspect differences visually.',
    },
    {
      question: 'Does it highlight text edits and layout changes?',
      answer: 'Yes. The comparison tool overlays visual difference masks that highlight added, deleted, or shifted text and design elements in contrasting colors.',
    },
    {
      question: 'Can I compare contracts with different numbers of pages?',
      answer: 'Yes. You can navigate pages independently or lock them in tandem to cross-reference multi-page agreements and technical specifications.',
    },
    {
      question: 'Are my confidential legal contracts uploaded to any cloud server?',
      answer: 'No. Both documents are parsed and rendered purely within your browser tab. Your files remain completely private.',
    },
    {
      question: 'Is this comparison tool free for commercial use?',
      answer: 'Yes. It is free for both personal and commercial use without subscription tiers or hidden costs.',
    },
  ],
  pdfToZip: [
    {
      question: 'Why would I convert or pack PDF files into a ZIP archive?',
      answer: 'Bundling multiple PDF files into a single compressed ZIP archive makes emailing, archiving, and sharing document collections fast and orderly.',
    },
    {
      question: 'Can I package multiple PDF files into one ZIP file?',
      answer: 'Yes. You can upload several PDF files simultaneously and compress them into a structured, organized ZIP archive with one click.',
    },
    {
      question: 'Can I open the generated ZIP file on Windows, macOS, and Linux?',
      answer: 'Yes. The resulting ZIP archive uses standard Deflate compression compatible with native archive utilities on Windows Explorer, macOS Finder, and mobile devices.',
    },
    {
      question: 'Is there a limit on total file size when creating a ZIP file?',
      answer: 'The only limit is your browser available memory. Most devices easily handle several hundred megabytes of documents.',
    },
    {
      question: 'Are any files uploaded or stored on remote servers?',
      answer: 'No. The ZIP archive is generated on the client side using pure browser JavaScript. Nothing is sent over the network.',
    },
  ],
  encrypt: [
    {
      question: 'How does client-side PDF password protection work?',
      answer: 'The tool uses standard AES encryption to encrypt the internal cross-reference table and content streams with your chosen password right in your browser.',
    },
    {
      question: 'What is the difference between an open password and permissions password?',
      answer: 'An open password prevents unauthorized users from opening the file. A permissions password restricts printing, copying text, and modifying content.',
    },
    {
      question: 'Can anyone open my encrypted PDF without the password?',
      answer: 'No. Strong AES encryption algorithms ensure that without the correct password, the document content cannot be read or decrypted.',
    },
    {
      question: 'Is my password sent to your servers?',
      answer: 'Never. Both the password and the encryption process stay entirely inside your browser. We never see your password or your files.',
    },
    {
      question: 'What happens if I forget the password I set?',
      answer: 'Because encryption is mathematically secure and runs locally, there is no master key. Keep your password in a safe place.',
    },
  ],
  decrypt: [
    {
      question: 'Can this tool remove password protection from my PDF?',
      answer: 'Yes. If you know the authorized password for an encrypted PDF, you can enter it once to permanently decrypt the file and save an unlocked copy.',
    },
    {
      question: 'Does this tool crack unknown passwords?',
      answer: 'No. This tool is designed for legitimate users who know their document password and want to remove protection permanently for easier access.',
    },
    {
      question: 'Are the decrypted documents saved anywhere online?',
      answer: 'No. Decryption takes place completely within your browser memory. Unlocked files are saved directly to your local download folder.',
    },
    {
      question: 'Will unlocking a PDF change its formatting or quality?',
      answer: 'No. Decrypting simply strips the encryption wrapper and permissions lock, leaving original formatting and quality untouched.',
    },
    {
      question: 'Does it work on mobile phones?',
      answer: 'Yes. You can unlock PDF documents on any modern mobile browser without downloading additional software.',
    },
  ],
  editPdf: [
    {
      question: 'What kinds of edits can I make on my PDF?',
      answer: 'You can insert new text blocks, add comments, highlight sections, draw freehand annotations, insert shapes, and place signature stamps.',
    },
    {
      question: 'Can I change existing text directly on the page?',
      answer: 'Because PDFs are fixed-layout vector documents, our editor lets you whiteout or cover outdated text and type new text cleanly in matching fonts.',
    },
    {
      question: 'Can I add handwritten signatures or initials?',
      answer: 'Yes. You can draw signatures using a mouse, stylus, or touchscreen, or type a clean calligraphic signature to position on any page.',
    },
    {
      question: 'Does editing flatten or degrade the original document quality?',
      answer: 'No. New annotations are rendered as vector elements, maintaining crisp sharpness for printing and viewing at any zoom level.',
    },
    {
      question: 'Is my document private while I edit it?',
      answer: 'Yes. The editor operates entirely inside your browser canvas. No files are transferred to remote servers.',
    },
  ],
  scanToPdf: [
    {
      question: 'How do I scan physical documents directly to PDF without a flatbed scanner?',
      answer: 'Open the tool on your laptop or smartphone, grant camera permissions, photograph your document pages, and the tool compiles them into a clean PDF.',
    },
    {
      question: 'Does the scanner enhance contrast and remove shadows from paper?',
      answer: 'Yes. Built-in filters let you enhance black-and-white contrast, sharpen text, and normalize brightness to make phone photos look like flatbed scans.',
    },
    {
      question: 'Can I scan multiple pages into a single document?',
      answer: 'Yes. You can snap consecutive pages one after another, reorder them if needed, and export them as a single multi-page PDF.',
    },
    {
      question: 'Is my camera video stream broadcast or recorded externally?',
      answer: 'Never. The camera feed is processed directly through your browser MediaDevices API. No images or streams leave your hardware.',
    },
    {
      question: 'Can I use this scanner on both iPhone and Android devices?',
      answer: 'Yes. The scanner works in Safari on iOS and Chrome on Android with zero app store downloads required.',
    },
  ],
  markdownToPdf: [
    {
      question: 'How do I convert Markdown notes into a PDF document?',
      answer: 'Paste or type your Markdown text into the editor. The tool compiles headers, bullet lists, blockquotes, tables, and code snippets into a formatted PDF.',
    },
    {
      question: 'Does it support syntax highlighting for programming code blocks?',
      answer: 'Yes. Code blocks with language tags (such as JavaScript, Python, HTML, CSS, SQL) are styled with clean syntax highlighting.',
    },
    {
      question: 'Can I preview the formatted PDF in real time before downloading?',
      answer: 'Yes. A live side-by-side preview shows your rendered document as you type so you can verify pagination and styling instantly.',
    },
    {
      question: 'Are custom CSS styles or themes available?',
      answer: 'You can choose between clean technical themes, modern serif academic layouts, and compact documentation formats.',
    },
    {
      question: 'Does this tool work completely offline once the page loads?',
      answer: 'Yes. The Markdown parser and PDF generation engine are packaged directly in the client bundle and execute offline.',
    },
  ],
  htmlToPdf: [
    {
      question: 'How does client-side HTML to PDF conversion work?',
      answer: 'Paste your HTML code or rich formatted text. The engine parses DOM elements, applies CSS styling, and draws vector layout pages into a downloadable PDF.',
    },
    {
      question: 'Does it support modern CSS features like flexbox and web fonts?',
      answer: 'Standard CSS typography, margins, padding, borders, tables, and flexbox containers are rendered cleanly into print pages.',
    },
    {
      question: 'Can I configure page orientation and print margins?',
      answer: 'Yes. You can select between Portrait and Landscape orientations, choose standard A4 or Letter sizes, and adjust page margins.',
    },
    {
      question: 'Will external scripts execute during the conversion?',
      answer: 'For security and stability, HTML is sanitized and rendered in an isolated sandbox to prevent malicious script execution.',
    },
    {
      question: 'Is my converted HTML code private?',
      answer: 'Yes. Everything is compiled in your local browser sandbox without sending HTML payloads to external servers.',
    },
  ],
  csvToPdf: [
    {
      question: 'How do I convert CSV spreadsheet data into a PDF table?',
      answer: 'Upload or paste your CSV file. The converter parses rows and columns, builds a clean data table with clear headers, and generates a formatted PDF.',
    },
    {
      question: 'Can I handle both comma-separated and tab-separated values (TSV)?',
      answer: 'Yes. The parser auto-detects common delimiters including commas, tabs, semicolons, and pipes.',
    },
    {
      question: 'What happens if my CSV has many columns?',
      answer: 'You can switch the page orientation to Landscape, enable text wrapping, or adjust column widths to keep wide financial datasets legible.',
    },
    {
      question: 'Can I add a custom document title and table headers?',
      answer: 'Yes. You can define a title header, subtitle, date stamp, and alternating row background shading for easy reading.',
    },
    {
      question: 'Is my confidential business data secure?',
      answer: 'Completely. Your CSV records are processed in client memory and are never uploaded to any remote server.',
    },
  ],
  createPdf: [
    {
      question: 'How do I create a blank PDF from scratch online?',
      answer: 'Select your preferred page size and orientation, add text blocks, images, lines, and shapes to the visual canvas, and click export to generate your PDF.',
    },
    {
      question: 'What standard page sizes can I create?',
      answer: 'You can select from popular international standards including A4, A3, A5, US Letter, Legal, and custom pixel dimensions.',
    },
    {
      question: 'Can I create multi-page PDF documents with this canvas?',
      answer: 'Yes. You can add new blank pages, duplicate existing pages, and arrange content across multiple sheets seamlessly.',
    },
    {
      question: 'Can I upload images to embed on my newly created pages?',
      answer: 'Yes. You can insert PNG, JPG, and SVG graphics, position them freely, and layer them behind or in front of text elements.',
    },
    {
      question: 'Does creating a PDF require any account or payment?',
      answer: 'No. The visual creator is completely free with zero subscription requirements or watermarks.',
    },
  ],
  excelToPdf: [
    {
      question: 'How do I convert Microsoft Excel spreadsheets (.xlsx, .xls) to PDF?',
      answer: 'Upload your spreadsheet. The client-side parser reads cell data, formulas, and sheet structures, formatting them into clean printable PDF pages.',
    },
    {
      question: 'Does it support multi-sheet Excel workbooks?',
      answer: 'Yes. You can select specific worksheets to print or compile all sheets into a single unified PDF document.',
    },
    {
      question: 'How are wide tables handled to avoid cut-off columns?',
      answer: 'You can enable Landscape orientation or auto-fit column scaling to ensure all spreadsheet columns fit comfortably within page margins.',
    },
    {
      question: 'Are formulas calculated accurately before PDF generation?',
      answer: 'Yes. The engine evaluates cached values and formulas so that totals, summaries, and calculated fields display accurately.',
    },
    {
      question: 'Are my financial spreadsheets uploaded to any third-party servers?',
      answer: 'No. The spreadsheet parsing and PDF layout occur exclusively inside your local browser. Your data remains strictly private.',
    },
  ],
  pdfToExcel: [
    {
      question: 'How does extracting tables from PDF to Excel work?',
      answer: 'The extractor analyzes vertical and horizontal text coordinates to detect tabular column grids, extracting structured data directly into an editable Excel workbook.',
    },
    {
      question: 'Does it output native .xlsx spreadsheet files?',
      answer: 'Yes. You can download your extracted data as a standard Microsoft Excel (.xlsx) file or clean CSV file ready for spreadsheet software.',
    },
    {
      question: 'Does it preserve numbers, currency symbols, and decimals?',
      answer: 'Yes. Numeric values are recognized and formatted cleanly so you can perform calculations, sums, and pivot tables in Excel right away.',
    },
    {
      question: 'Can I extract tables from multi-page PDF reports?',
      answer: 'Yes. You can process specific pages or entire multi-page financial statements, invoices, and audit reports in one pass.',
    },
    {
      question: 'Is my confidential financial statement sent to a server?',
      answer: 'No. Table recognition and workbook assembly run entirely in your local browser sandbox.',
    },
  ],
  powerpointToPdf: [
    {
      question: 'How do I convert PowerPoint slides (.pptx) to PDF?',
      answer: 'Upload your PowerPoint deck. The parser renders each presentation slide into an exact vector-sharp PDF page ready for printing or distribution.',
    },
    {
      question: 'Does it preserve modern 16:9 widescreen and 4:3 slide aspect ratios?',
      answer: 'Yes. The PDF page dimensions match your original PowerPoint slide aspect ratio perfectly without awkward letterboxing.',
    },
    {
      question: 'Are slide fonts and vector shapes preserved?',
      answer: 'Yes. Standard typography, shapes, diagrams, and photographic backgrounds are rendered faithfully into vector PDF streams.',
    },
    {
      question: 'How fast is slide conversion for large slide decks?',
      answer: 'Conversion is fast because processing happens locally on your computer hardware without waiting for slow upload and download queues.',
    },
    {
      question: 'Is there any watermark placed on converted presentation slides?',
      answer: 'None whatsoever. Your converted slides remain completely clean and professional.',
    },
  ],
  pdfToPowerpoint: [
    {
      question: 'Can I convert a PDF presentation back into PowerPoint (.pptx) slides?',
      answer: 'Yes. Each page of your PDF is converted into an individual slide in a standard PowerPoint presentation file ready to open in Microsoft PowerPoint, Google Slides, or Keynote.',
    },
    {
      question: 'Will each page become an independent presentation slide?',
      answer: 'Yes. Page sequences and slide aspect ratios are preserved so you can deliver or edit your presentation seamlessly.',
    },
    {
      question: 'Can I open and edit the output presentation in Google Slides?',
      answer: 'Yes. The generated .pptx format is universally compatible with PowerPoint, Google Slides, Apple Keynote, and LibreOffice Impress.',
    },
    {
      question: 'Does converting PDF to PowerPoint require MS Office installed?',
      answer: 'No. The conversion executes entirely in your web browser with no external office software or plugins needed.',
    },
    {
      question: 'Are my confidential pitch decks uploaded to any cloud server?',
      answer: 'No. All slide rendering takes place locally on your computer or smartphone.',
    },
  ],
  pdfToHtml: [
    {
      question: 'How does PDF to HTML conversion work?',
      answer: 'The converter extracts text, images, and styling rules from your PDF, compiling them into clean semantic HTML5 markup with responsive CSS styles.',
    },
    {
      question: 'Can I publish the converted HTML code directly on my website?',
      answer: 'Yes. The output HTML is clean, modern, and self-contained, making it easy to embed into web articles, blogs, or knowledge bases.',
    },
    {
      question: 'Does it preserve fonts and reading order for accessibility?',
      answer: 'Yes. Text blocks are ordered logically according to reading flow, making the HTML friendly for screen readers and search engine crawlers.',
    },
    {
      question: 'Can I copy text and code snippets from the generated HTML?',
      answer: 'Yes. Because content is rendered as genuine HTML elements, you can select, copy, and search text effortlessly.',
    },
    {
      question: 'Is the conversion process secure and private?',
      answer: 'Yes. Processing happens inside your browser tab without any network requests to remote processing services.',
    },
  ],
  pdfToEpub: [
    {
      question: 'Why should I convert a PDF document to EPUB format?',
      answer: 'PDFs have fixed page layouts that can be awkward to read on small screens. EPUB reflows text dynamically so you can read comfortably on e-readers and smartphones.',
    },
    {
      question: 'Can I read the converted EPUB on Kindle, Apple Books, and Kobo?',
      answer: 'Yes. The output is a standard EPUB 3 file compatible with Apple Books, Kindle (via Send to Kindle), Kobo, Google Play Books, and Calibre.',
    },
    {
      question: 'Does the EPUB preserve chapters and table of contents?',
      answer: 'Yes. The parser detects headings and major chapter breaks, generating a navigable navigation index for your e-reader.',
    },
    {
      question: 'Can I adjust font sizes and dark mode on my e-reader with this file?',
      answer: 'Yes. Because the text reflows naturally, you can change font sizes, margins, line spacing, and color themes directly in your reading app.',
    },
    {
      question: 'Are my eBooks uploaded to any cloud database?',
      answer: 'No. Document reflowing and EPUB packaging occur entirely on your local machine.',
    },
  ],
  ebookToPdf: [
    {
      question: 'How do I convert an EPUB eBook to a printable PDF document?',
      answer: 'Upload your DRM-free EPUB file. The engine formats the chapters into paginated sheets with consistent margins, running headers, and page numbers.',
    },
    {
      question: 'Can I customize font size, margins, and page dimensions?',
      answer: 'Yes. You can select standard book trim sizes (such as A5, 6x9 inch, or A4), adjust body font sizes, and configure margin widths for comfortable reading.',
    },
    {
      question: 'Does the converted PDF include chapter breaks and illustrations?',
      answer: 'Yes. Chapter titles start on fresh pages, and embedded illustrations, diagrams, and cover art are formatted neatly into the PDF pages.',
    },
    {
      question: 'Can I convert DRM-protected eBooks?',
      answer: 'This tool is designed for DRM-free EPUB files such as public domain classics, open-access textbooks, self-published manuscripts, and technical manuals.',
    },
    {
      question: 'Is my eBook file kept private during conversion?',
      answer: 'Yes. EPUB unpacking and PDF compilation occur entirely inside your browser without any server communication.',
    },
  ],
  whiteboard: [
    {
      question: 'What is the PDF Whiteboard and sketch canvas?',
      answer: 'The Whiteboard lets you draw, sketch, annotate, and brainstorm freely on a blank digital canvas or over existing PDF pages using interactive drawing tools.',
    },
    {
      question: 'What drawing tools and colors are available?',
      answer: 'You have access to smooth freehand pens, highlighters, geometric shapes (rectangles, circles, arrows, lines), text labels, and color palettes.',
    },
    {
      question: 'Can I export my finished whiteboard sketches as a vector PDF?',
      answer: 'Yes. When you finish brainstorming, click export to generate a crisp vector PDF document ready to share with colleagues or clients.',
    },
    {
      question: 'Does it work with touchscreens and graphic tablets?',
      answer: 'Yes. The canvas supports mouse input, touch gestures on tablets, and stylus pens with responsive stroke tracking.',
    },
    {
      question: 'Is my whiteboard drawing saved on your server?',
      answer: 'No. Canvas strokes and sketches exist only in your browser local session. We store zero user drawings or documents.',
    },
  ],
  gstInvoice: [
    {
      question: 'What is the GST Invoice Generator tool?',
      answer: 'It is a specialized billing tool designed for Indian businesses to create professional, GST-compliant tax invoice PDFs with auto-calculated taxes.',
    },
    {
      question: 'Does it calculate CGST, SGST, and IGST automatically?',
      answer: 'Yes. Enter your line items, prices, and GST rates (0%, 5%, 12%, 18%, 28%). The tool calculates central, state, and integrated taxes automatically based on supply location.',
    },
    {
      question: 'Can I add my company logo, GSTIN, and bank payment details?',
      answer: 'Yes. You can upload your business logo, enter your GSTIN, supplier and customer addresses, HSN codes, and bank account details for UPI/NEFT transfers.',
    },
    {
      question: 'Is the generated invoice legally compliant with Indian GST rules?',
      answer: 'Yes. The layout follows standard GST invoice requirements, including tax invoice titles, invoice numbering, dates, place of supply, and reverse charge declarations.',
    },
    {
      question: 'Are my customer records and billing totals stored on your servers?',
      answer: 'Never. Invoice calculations and PDF generation happen 100% inside your browser. No business financial data is ever collected or stored.',
    },
  ],
  posBilling: [
    {
      question: 'What receipt sizes does the POS Billing Generator support?',
      answer: 'The tool supports standard 58mm (2-inch) and 80mm (3-inch) thermal receipt printer formats commonly used in retail stores, cafes, and restaurants.',
    },
    {
      question: 'Can I print receipts directly to a thermal printer?',
      answer: 'Yes. You can trigger direct browser printing formatted precisely for thermal receipt rolls or download a compact vector PDF receipt.',
    },
    {
      question: 'Can I customize store names, contact details, and itemized bills?',
      answer: 'Yes. Enter your store name, address, phone number, cashier name, itemized products, quantities, rates, discounts, and payment methods.',
    },
    {
      question: 'Can I use this POS receipt generator on a smartphone or tablet at checkout?',
      answer: 'Yes. The interface is optimized for quick touch input on mobile phones, tablets, and POS counter terminals without needing special software.',
    },
    {
      question: 'Is this POS billing tool free for small retailers?',
      answer: 'Yes. It is completely free for all shops, cafes, kiosks, and freelance businesses with no monthly subscription fees.',
    },
  ],
  signPdf: [
    {
      question: 'How do I add an electronic signature to a PDF document?',
      answer: 'Upload your document, select Sign PDF, and choose whether to draw your signature by hand, type your name in a signature font, or upload a scanned signature image.',
    },
    {
      question: 'Are electronic signatures created here legally binding?',
      answer: 'In most jurisdictions including the US, EU, UK, and India, standard electronic signatures are recognized for general business agreements, contracts, and NDAs.',
    },
    {
      question: 'Is my handwritten signature kept private and safe from theft?',
      answer: 'Yes. Your signature stroke data never leaves your device memory. It is stamped directly into the local PDF stream without touching external networks.',
    },
    {
      question: 'Can I place multiple signatures or initials across different pages?',
      answer: 'Yes. You can place your signature, initials, date stamps, and name tags on as many pages as needed before downloading the completed agreement.',
    },
    {
      question: 'Can I sign documents on my smartphone screen?',
      answer: 'Yes. The touch-friendly signature pad allows you to sign smoothly with your finger or stylus directly on your phone or tablet screen.',
    },
  ],
  fillPdfForm: [
    {
      question: 'Does this tool automatically detect interactive form fields?',
      answer: 'Yes. The tool inspects native AcroForm structures in your PDF, automatically detecting text boxes, checkboxes, radio buttons, and dropdown menus.',
    },
    {
      question: 'What if my PDF is a scanned document with no interactive fields?',
      answer: 'You can use the click-to-type feature. Simply click anywhere on the page to insert custom text in your preferred font size and color.',
    },
    {
      question: 'Can I check boxes and select dropdown options easily?',
      answer: 'Yes. Click on any checkbox or radio field to toggle checkmarks, and click dropdown menus to select the appropriate option.',
    },
    {
      question: 'What does form flattening mean, and should I enable it?',
      answer: 'Flattening merges your entered answers and checkmarks permanently into the page canvas. This prevents recipients from modifying or tampering with your answers.',
    },
    {
      question: 'Is my sensitive application or tax information secure?',
      answer: 'Yes. All form completion and PDF compilation take place inside your device browser memory. Zero personal information is transmitted to external servers.',
    },
  ],
  latexResume: [
    {
      question: 'Why should I build my resume with LaTeX instead of Word or Canva?',
      answer: 'LaTeX produces mathematically balanced typography, precise margins, and clean single-column text trees that ATS (Applicant Tracking System) software can parse accurately.',
    },
    {
      question: 'Which popular LaTeX resume templates are included?',
      answer: 'The builder includes industry-proven templates such as Jake Resume, Classic Corporate, Modern Tech, and Academic CV.',
    },
    {
      question: 'Can I edit in a simple form mode without knowing LaTeX code?',
      answer: 'Yes. You can fill out straightforward visual forms for education, experience, and projects, or switch to direct LaTeX code editing whenever you want full control.',
    },
    {
      question: 'Can I download the raw .tex source code as well as the PDF?',
      answer: 'Yes. You can export both the compiled vector PDF and the full .tex source file to keep in your personal GitHub repository or Overleaf account.',
    },
    {
      question: 'Is my career history and personal contact information private?',
      answer: 'Yes. Vector PDF rendering occurs entirely in your browser. Your job history, address, and contact numbers never touch an external server.',
    },
  ],
};
