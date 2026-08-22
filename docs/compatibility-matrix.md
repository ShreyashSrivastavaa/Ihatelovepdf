# Edge-Case Compatibility Matrix

This document records the automated resilience and edge-case evaluation of **ihatelovepdf.com** across all **45 client-side tools** and **11 real-world document edge cases**.

## Test Corpus Specification

| Fixture Key | Name | Test Characteristics | Expected Behavior |
|---|---|---|---|
| `blank` | Blank 1-Page PDF | 0 content streams, minimal dictionary | Clean pass, non-zero byte output |
| `multi-page` | 10-Page Sequential | Sequential vector text and headings | Full page retention, linear indexing |
| `multi-column` | 2-Column Academic Paper | Multi-column narrative gutters | XY-cut reading order preserved |
| `table` | Complex Financial Table | Aligned columns with sparse rows | Centroid column clustering in Excel |
| `redaction-target` | Confidential PII Document | SSN, PAN, patient diagnosis | Complete stream and annotation purge |
| `bookmarked` | Bookmarked Outline PDF | Named destination trees | Preserves bookmark tree hierarchy |
| `heavy-doc` | Heavy Vector Layout | 25 pages of layered vector cards | Linearized object packing |
| `scanned-image-only` | Scanned Image (0 Text) | Zero font streams | Extract/AI auto-prompts OCR fallback |
| `non-standard-page-sizes` | Mixed Page Dimensions | US Letter, 80mm POS strip, A2 blueprint | Preserves individual page BBox dimensions |
| `500-plus-pages` | 500+ Page Large Report | High page count memory load | Client-side memory usage < 150MB |
| `corrupted-xref` | Malformed XRef / Corrupted | Missing EOF trailer stream | Auto-repair or graceful validation error |

## Compatibility Matrix (Key Tool Subsets)

| Tool | Blank | Multi-Col | Table | Scanned (0 Text) | Mixed Dimensions | 500+ Pages | Corrupted XRef |
|---|---|---|---|---|---|---|---|
| **Merge** | PASS | PASS | PASS | PASS | PASS | PASS | GRACEFUL_FALLBACK |
| **Compress** | PASS | PASS | PASS | PASS | PASS | PASS | GRACEFUL_FALLBACK |
| **Split / Extract** | PASS | PASS | PASS | PASS | PASS | PASS | GRACEFUL_FALLBACK |
| **Crop / Rotate** | PASS | PASS | PASS | PASS | PASS | PASS | GRACEFUL_FALLBACK |
| **Redact** | PASS | PASS | PASS | PASS | PASS | PASS | GRACEFUL_FALLBACK |
| **Extract Text** | PASS | PASS (XY-Cut) | PASS | GRACEFUL_FALLBACK (Suggest OCR) | PASS | PASS | GRACEFUL_FALLBACK |
| **PDF → Excel** | PASS | PASS | PASS (Centroid) | GRACEFUL_FALLBACK (Suggest OCR) | PASS | PASS | GRACEFUL_FALLBACK |
| **OCR** | PASS | PASS | PASS | PASS (Otsu Preprocessed) | PASS | PASS | GRACEFUL_FALLBACK |
| **Privacy Scanner** | PASS (0 Risk) | PASS | PASS | PASS | PASS | PASS | GRACEFUL_FALLBACK |
| **Repair** | PASS | PASS | PASS | PASS | PASS | PASS | PASS (Rebuilt) |
| **AI Summarize** | PASS | PASS (TextRank) | PASS | GRACEFUL_FALLBACK (Suggest OCR) | PASS | PASS | GRACEFUL_FALLBACK |

*Legend*:
- **PASS**: Normal client-side execution with complete fidelity.
- **GRACEFUL_FALLBACK**: Intelligent fallback triggered (e.g. prompt user to OCR when zero text detected, or clear validation modal on encryption/corruption).
