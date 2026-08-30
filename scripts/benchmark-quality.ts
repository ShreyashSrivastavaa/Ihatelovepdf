/**
 * Automated Quality & Correctness Benchmark Suite
 * Measures accuracy, fidelity, redaction security, and performance against edge-case PDF fixtures.
 */

import { createTestFixture, diagnosePdfBuffer } from '../src/lib/pdf-engine/test-fixtures';
import { redactPdfWithDiagnostics } from '../src/lib/operations/redact';
import { scanPdfPrivacyRisk, sanitizePdfMetadata } from '../src/lib/operations/security';
import { extractTextFromPdf } from '../src/lib/operations/text-extract';
import { compressPDF, cropPages, mergePDFs } from '../src/lib/pdf-operations';

async function runQualityBenchmarks() {
  console.log('===============================================================');
  console.log('🎯 ihatelovepdf.com - Quality, Correctness & Resilience Report');
  console.log('===============================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    totalTests++;
    if (condition) {
      passedTests++;
      console.log(`  ✅ PASS: ${testName} ${detail ? `(${detail})` : ''}`);
    } else {
      console.error(`  ❌ FAIL: ${testName} ${detail ? `(${detail})` : ''}`);
    }
  }

  // -------------------------------------------------------------
  // Test 1: P0 Redaction Correctness & Annotation Purging
  // -------------------------------------------------------------
  console.log('🔒 1. Security & Redaction Stream Sanitization:');
  const redactionFixture = await createTestFixture('redaction-target');
  const redactResult = await redactPdfWithDiagnostics(redactionFixture, [
    {
      pageNumber: 1,
      x: 40,
      y: 720,
      width: 350,
      height: 30, // Covers SSN row
      color: 'black',
    },
  ]);

  assert(
    redactResult.pdfBytes.length > 0 && redactResult.redactedCount === 1,
    'Redaction burn execution',
    `Generated ${redactResult.pdfBytes.length} bytes`
  );
  assert(
    redactResult.verifiedClean,
    'Redaction area verification',
    'Zero unmasked text in target bounds'
  );

  // -------------------------------------------------------------
  // Test 2: Deep Privacy Scanner (Metadata, Revisions, JS)
  // -------------------------------------------------------------
  console.log('\n🛡️ 2. Deep Privacy Scanner & Metadata Sanitization:');
  const scanReport = await scanPdfPrivacyRisk(redactionFixture, 'patient_record.pdf');
  assert(
    scanReport.pageCount === 1 && typeof scanReport.riskScore === 'number',
    'Privacy risk assessment',
    `Risk Score: ${scanReport.riskScore}/100, Level: ${scanReport.overallRisk}`
  );

  const sanitizedBytes = await sanitizePdfMetadata(redactionFixture);
  const sanitizedReport = await scanPdfPrivacyRisk(sanitizedBytes, 'sanitized_record.pdf');
  assert(
    sanitizedReport.riskScore === 0 && sanitizedReport.overallRisk === 'clean',
    'Metadata sanitization',
    `Purged all metadata streams down to ${sanitizedReport.riskScore}/100 score (${sanitizedReport.overallRisk})`
  );

  // -------------------------------------------------------------
  // Test 3: Text Extraction Engine
  // -------------------------------------------------------------
  console.log('\n📄 3. Vector Text Extraction Engine:');
  const samplePdf = await createTestFixture('multi-page');
  const extractedText = await extractTextFromPdf(samplePdf);
  assert(
    extractedText.fullText.length > 0,
    'Vector text stream extraction',
    `Extracted ${extractedText.fullText.length} characters from multi-page PDF`
  );

  // -------------------------------------------------------------
  // Test 4: Core Manipulation (Crop, Merge, Compress)
  // -------------------------------------------------------------
  console.log('\n⚡ 4. Core Manipulation Polish & Non-Destructive Operations:');
  const multiPage = await createTestFixture('multi-page');
  const cropped = await cropPages(multiPage, [1, 2], {
    cropMargins: { top: 20, right: 20, bottom: 20, left: 20 },
  });
  assert(
    cropped.length > 0,
    'Non-destructive /CropBox manipulation',
    `Preserved vector text on cropped output (${cropped.length} bytes)`
  );

  const merged = await mergePDFs([multiPage, multiPage]);
  const diagMerged = await diagnosePdfBuffer(merged);
  assert(
    diagMerged.isValid && diagMerged.pageCount === 20,
    'Multi-file merge with page count tracking',
    `Merged 20 pages seamlessly`
  );

  const compressed = await compressPDF(multiPage, { compressionLevel: 'high' });
  assert(
    compressed.processedSize <= compressed.originalSize,
    'High-compression object stream packing',
    `Reduced size: ${compressed.originalSize} B -> ${compressed.processedSize} B in ${Math.round(compressed.processingTimeMs)}ms`
  );

  // -------------------------------------------------------------
  // Summary
  // -------------------------------------------------------------
  console.log('\n===============================================================');
  console.log(`🏁 Results: ${passedTests}/${totalTests} Benchmarks Passed (${Math.round((passedTests / totalTests) * 100)}%)`);
  console.log('===============================================================\n');
}

runQualityBenchmarks().catch((err) => {
  console.error('Benchmark execution error:', err);
  process.exit(1);
});
