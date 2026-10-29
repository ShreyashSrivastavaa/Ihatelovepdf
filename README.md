<div align="center">

# ihatelovepdf 🚀

> **Fast, beautiful, and privacy-first PDF utility suite running 100% locally in your browser.**  
> Zero file uploads. Zero servers. Free forever.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/ShreyashSrivastavaa/Ihatelovepdf/actions)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)

[**Explore Live Demo**](https://www.ihatelovepdf.com) · [**Report a Bug**](https://github.com/ShreyashSrivastavaa/Ihatelovepdf/issues/new?template=bug_report.yml) · [**Request a Feature**](https://github.com/ShreyashSrivastavaa/Ihatelovepdf/issues/new?template=feature_request.yml) · [**Contributing Guide**](CONTRIBUTING.md)

</div>

---

## 📖 About ihatelovepdf

**ihatelovepdf** is a modern, free, open-source alternative to proprietary online PDF tools that limit daily tasks or upload private documents to third-party cloud servers.

Built with **Next.js 15**, **`pdf-lib`**, **`pdfjs-dist`**, and **Web Workers**, ihatelovepdf executes binary transformations directly in client browser memory. Your documents never touch a remote server, ensuring absolute confidentiality for legal agreements, medical records, financial statements, and personal identity files.

---

## ✨ Key Highlights

- 🔒 **100% In-Browser Privacy**: Zero file uploads. All operations are sandboxed in local browser memory.
- ⚡ **Web Worker Acceleration**: CPU-intensive operations (compression, conversion, watermarking, archiving) execute on dedicated background threads to keep the UI smooth and responsive.
- 🎨 **Modern Design & Dark Mode**: Handcrafted responsive UI with dark mode, high-contrast typography, and WCAG AA accessibility compliance.
- 📱 **Mobile & Tablet Friendly**: Full touch support for reordering, cropping, visual annotation, and signing.
- 🌐 **9 Supported Languages**: Fully translated into English, Spanish, Portuguese, German, French, Italian, Romanian, Russian, and Hungarian with automated localized routing.
- 🚀 **Offline Ready**: Exported as static HTML/JS (`output: "export"`), capable of running offline in local environments.

---

## 🛠️ Comprehensive PDF Tool Suite (35+ Tools)

| Category | Available Tools |
| :--- | :--- |
| **📑 Page Management** | **Merge PDF**, **Split PDF**, **Compress PDF**, **Organize / Reorder Pages**, **Extract Pages**, **Rotate PDF**, **Crop & Resize**, **PDF to Images**, **Images to PDF**, **PDF to ZIP Archive** |
| **✏️ Edit & Annotate** | **Edit PDF Text**, **Fill PDF Forms**, **Watermark PDF**, **Add Page Numbers**, **Headers & Running Footers** |
| **🔍 Extract & View** | **Extract Plain Text**, **Invert Colors (High-Contrast Dark Mode)** |
| **🛡️ Security & Privacy** | **Permanent Blackout Redaction**, **Digital Signature & Placement** |
| **🔄 Convert to PDF** | **Images to PDF**, **Excel to PDF**, **PowerPoint to PDF**, **Markdown to PDF**, **HTML to PDF**, **CSV to PDF**, **eBook to PDF** |
| **📤 Convert from PDF** | **PDF to Excel**, **PDF to PowerPoint**, **PDF to HTML**, **PDF to EPUB**, **PDF to Images** |
| **💼 Document Utilities** | **Side-by-Side PDF Compare**, **Create Blank Document**, **Camera Document Scanner**, **Visual Whiteboard Canvas** |
| **🧾 Business Utilities** | **GST Tax Invoice Generator**, **Point of Sale (POS) Quick Receipt Billing** |

---

## 🏗️ Architecture & Privacy Model

Unlike traditional web converters that require uploading files via `multipart/form-data` to remote backend servers:
1. Files selected by the user are loaded as native in-memory `ArrayBuffer` objects in the browser.
2. The UI dispatcher delegates the task to a dedicated Web Worker via [`src/lib/worker-client.ts`](src/lib/worker-client.ts).
3. The worker parses, manipulates, and serializes the PDF using `pdf-lib` and `pdfjs-dist`.
4. The output is streamed directly to a download `Blob` saved to the user's local disk.

Read our complete [Architecture Overview](docs/architecture.md) for detailed sequence diagrams and worker lifecycle explanations.

---

## 🚀 Quick Start & Development Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- `npm` (v9+) or `bun` (v1.0+)

### Clone & Run

```bash
# 1. Clone the repository
git clone https://github.com/ShreyashSrivastavaa/Ihatelovepdf.git
cd Ihatelovepdf

# 2. Install dependencies (copies PDF.js workers and standard fonts automatically)
npm install
# or: bun install

# 3. Create your local environment configuration
cp .env.example .env.local

# 4. Start the development server
npm run dev
# or: bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 📂 Project Directory Structure

```
ihatelovepdf/
├── .github/
│   ├── ISSUE_TEMPLATE/     # Interactive YAML issue forms (bugs, features, tools)
│   ├── workflows/          # GitHub Actions CI for linting, testing, and build
│   └── pull_request_template.md
├── content/
│   ├── dictionaries/       # Localized strings for all 9 languages
│   └── i18n-route-map.json # Operation slugs & static route mappings
├── docs/                   # Architecture docs, tool audit benchmarks, contributor guides
├── public/                 # Static assets, icons, fonts, and PDF.js worker binaries
├── scripts/                # Automated tool audit suites, benchmarks, and locale checks
├── src/
│   ├── app/                # Next.js 15 App Router pages & localized route groups
│   ├── components/         # React UI components, navigation, and layout
│   │   └── pdf-processor/  # Tool interfaces, options panels, uploaders, and progress bars
│   ├── hooks/              # Custom React hooks (previews, responsive states)
│   ├── i18n/               # Dictionary loaders and localized path helpers
│   ├── lib/                # Core operations (pdf-lib, pdfjs-dist, business, security)
│   │   ├── operations/     # Modular tool engine implementations
│   │   ├── pdf-processor.ts# Central dispatcher & main-thread fallbacks
│   │   └── worker-client.ts# Web Worker request/response manager
│   ├── styles/             # Global CSS tokens, dark mode variables, and animations
│   ├── types/              # TypeScript declarations and OperationKey definitions
│   └── workers/            # Web Worker scripts (pdf.worker.ts, latex-preview.worker.ts)
└── tests/                  # Unit tests and Playwright E2E suites
```

---

## 🗺️ Roadmap & Upcoming Features

- [ ] **PDF Metadata Editor**: Edit Author, Subject, Title, Keywords, and Creator tags.
- [ ] **Bates Numbering**: Legal document sequential indexing and prefixing.
- [ ] **Client-Side OCR**: Local text recognition on scanned PDFs via lightweight WASM.
- [ ] **Grayscale Converter**: Convert color documents to 8-bit grayscale to conserve printer toner.
- [ ] **Modularized Tool Option Panels**: Further decompose monolithic option components.
- [ ] **PWA / Desktop App**: Offline Progressive Web App installation with desktop shortcuts.

---

## 🤝 Contributing

We welcome contributions of all kinds! Please read our [**Contributing Guide**](CONTRIBUTING.md) to learn how to set up your environment, follow our branch and commit standards, and add a new tool step by step.

All contributors are expected to uphold our [**Code of Conduct**](CODE_OF_CONDUCT.md).

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

Crafted with ❤️ by **[Shreyash Srivastava](https://shreyashsrivastava.vercel.app/)**  
[GitHub](https://github.com/ShreyashSrivastavaa) · [LinkedIn](https://linkedin.com/in/shreyashsrivastavaa) · [Twitter / X](https://x.com/YesShrey) · [Buy Me a Coffee](https://buymeacoffee.com/shreyashsrivastavaa)

</div>
