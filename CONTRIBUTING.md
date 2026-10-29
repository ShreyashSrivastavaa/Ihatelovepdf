# Contributing to ihatelovepdf 🚀

First off, thank you for considering contributing to **ihatelovepdf**! Open source projects thrive because of community members like you.

Whether you're fixing a bug, adding a new PDF tool, translating into a new language, improving accessibility, or writing documentation, all contributions are warmly welcomed.

---

## 📋 Table of Contents
1. [Core Principles](#-core-principles)
2. [Getting Started & Local Dev Setup](#-getting-started--local-dev-setup)
3. [Branch & Git Workflow](#-branch--git-workflow)
4. [Commit Style (Conventional Commits)](#-commit-style-conventional-commits)
5. [Step-by-Step: Adding a New PDF Tool](#-step-by-step-adding-a-new-pdf-tool)
6. [Testing & Quality Verification](#-testing--quality-verification)
7. [Pull Request Checklist](#-pull-request-checklist)

---

## 🔒 Core Principles

Before writing code, keep these non-negotiable architectural pillars in mind:
1. **100% Client-Side Privacy**: All document processing must happen strictly inside the user's browser. Files must **never** be sent to an external server or cloud API.
2. **Lean Dependencies**: Do not introduce heavy third-party packages without prior discussion. PDF operations should leverage `pdf-lib` and `pdfjs-dist` whenever possible.
3. **Non-Blocking Execution**: Intensive PDF operations must be offloaded to Web Workers (`src/workers/pdf.worker.ts`) with graceful fallbacks.
4. **Accessible by Default (WCAG AA)**: UI controls must be keyboard-accessible, have visible focus states, use semantic HTML, and pass contrast requirements.

---

## 🛠️ Getting Started & Local Dev Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **Package Manager**: `npm` (v9+) or `bun` (v1.0+)
- **Git**

### Installation

```bash
# 1. Fork the repo on GitHub, then clone your fork:
git clone https://github.com/YOUR_USERNAME/Ihatelovepdf.git
cd Ihatelovepdf

# 2. Install dependencies (this also copies PDF.js workers and standard fonts):
npm install
# or: bun install

# 3. Create local environment configuration:
cp .env.example .env.local

# 4. Start the Next.js development server:
npm run dev
# or: bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌿 Branch & Git Workflow

Always create a new feature or fix branch from `main`:

```bash
git checkout -b feat/watermark-opacity-slider
# or
git checkout -b fix/safari-blob-download
```

### Branch Naming Conventions:
- `feat/feature-name` - New feature or PDF tool
- `fix/bug-description` - Bug fix or patch
- `perf/optimization` - Performance optimization (e.g. Web Worker offload)
- `docs/page-or-guide` - Documentation updates
- `style/visual-cleanup` - Formatting or UI styling polish
- `test/test-suite` - Adding or improving tests

---

## 💬 Commit Style (Conventional Commits)

We follow [Conventional Commits](https://www.conventionalcommits.org/) for clear changelogs and automated release notes:

```
<type>(<scope>): <short description in imperative present tense>
```

### Examples:
* `feat(worker): add rotation degree support to pdf worker`
* `fix(download): resolve iOS Safari Blob file naming issue`
* `perf(compression): enable stream-level object packing`
* `docs(readme): add architecture diagram and badges`
* `style(a11y): improve color contrast ratio for secondary labels`

---

## 🧩 Step-by-Step: Adding a New PDF Tool

To add a new tool (e.g. `invertColors`, `watermark`, `protectPdf`), follow these five steps:

### 1. Register the Operation Key
In [`src/types/operations.ts`](src/types/operations.ts), add your tool key to `OperationKey`:
```typescript
export type OperationKey =
  | "merge"
  | "compress"
  // ...
  | "myNewTool";
```

### 2. Implement the Engine Operation
In [`src/lib/operations/`](src/lib/operations/), write the core logic using `pdf-lib`:
```typescript
// src/lib/operations/my-tool.ts
import { PDFDocument } from 'pdf-lib';

export async function processMyNewTool(file: File, options: MyToolOptions): Promise<Uint8Array> {
  const bytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(bytes);
  // Perform document manipulation...
  return pdfDoc.save();
}
```

### 3. Add to Central Registry & Processor Dispatcher
1. Add metadata in [`src/lib/tools-registry.ts`](src/lib/tools-registry.ts) (`TOOL_NAMES`, `TOOL_CATEGORIES`, and icon).
2. Offload the operation to [`src/workers/pdf.worker.ts`](src/workers/pdf.worker.ts) and wire dispatcher handling in [`src/lib/pdf-processor.ts`](src/lib/pdf-processor.ts).

### 4. Provide Option Controls & Localized Strings
1. In [`src/components/pdf-processor/ProcessingOptions.tsx`](src/components/pdf-processor/ProcessingOptions.tsx), render the configuration controls for your tool.
2. Add route slugs in [`content/i18n-route-map.json`](content/i18n-route-map.json) and translations in [`content/dictionaries/`](content/dictionaries/).

### 5. Write Tests
Add automated unit or integration verification in `tests/` or `scripts/audit-all-tools.ts`.

---

## 🧪 Testing & Quality Verification

Before submitting a Pull Request, verify that all quality checks pass locally:

```bash
# 1. Lint and code style validation:
npm run lint

# 2. Run unit tests, tool audits, and locale routing verification:
npm test

# 3. Verify static HTML export build:
npm run build
```

---

## ✅ Pull Request Checklist

When opening your PR, verify that:
- [ ] Your branch is rebased onto the latest `main`.
- [ ] Code follows TypeScript strict typing without `any` overrides where avoidable.
- [ ] Files are processed 100% locally in-browser with zero telemetry leaks.
- [ ] `npm run lint` passes without errors.
- [ ] `npm test` passes without errors.
- [ ] `npm run build` succeeds cleanly.
- [ ] Changes are covered by a clear Conventional Commit message.

Thank you for helping make **ihatelovepdf** the best private PDF utility on the web! ❤️
