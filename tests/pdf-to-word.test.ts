/**
 * Unit tests for PDF to Word structure reconstruction and error resilience
 * Run with: npx tsx tests/pdf-to-word.test.ts
 */

import fs from 'fs';
import path from 'path';
import {
  groupItemsIntoLines,
  calculateBodyFontSize,
  groupLinesIntoBlocks,
  isFontBold,
  isFontItalic,
  convertPdfToWord,
  ExtractedTextItem,
} from '../src/lib/operations/pdf-to-word';
import { HeadingLevel } from 'docx';

function assertEqual(actual: unknown, expected: unknown, testName: string) {
  if (actual !== expected) {
    console.error(`❌ FAIL: ${testName}\n  Expected: ${JSON.stringify(expected)}\n  Received: ${JSON.stringify(actual)}`);
    process.exit(1);
  } else {
    console.log(`✅ PASS: ${testName}`);
  }
}

function assertTrue(condition: boolean, testName: string, detail?: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${testName} ${detail ? `(${detail})` : ''}`);
    process.exit(1);
  } else {
    console.log(`✅ PASS: ${testName} ${detail ? `(${detail})` : ''}`);
  }
}

console.log('🧪 Starting PDF to Word (.docx) Unit Tests...\n');

// 1. Font Style Detection
assertEqual(isFontBold('Helvetica-Bold'), true, 'Detects Helvetica-Bold as bold');
assertEqual(isFontBold('TimesNewRoman-Black'), true, 'Detects TimesNewRoman-Black as bold');
assertEqual(isFontBold('Arial-Regular'), false, 'Detects Arial-Regular as not bold');
assertEqual(isFontItalic('Helvetica-Oblique'), true, 'Detects Helvetica-Oblique as italic');
assertEqual(isFontItalic('Georgia-Italic'), true, 'Detects Georgia-Italic as italic');
assertEqual(isFontItalic('Calibri'), false, 'Detects Calibri as not italic');

// 2. Line Grouping & Spacing
const sampleItems: ExtractedTextItem[] = [
  { text: 'Hello', x: 50, y: 700, width: 30, height: 12, fontSize: 12, fontName: 'Arial', isBold: false, isItalic: false },
  { text: 'World', x: 88, y: 700, width: 32, height: 12, fontSize: 12, fontName: 'Arial', isBold: true, isItalic: false },
  { text: 'Second line here.', x: 50, y: 680, width: 100, height: 12, fontSize: 12, fontName: 'Arial', isBold: false, isItalic: false },
];

const lines = groupItemsIntoLines(sampleItems);
assertEqual(lines.length, 2, 'Groups items into exactly 2 lines');
assertEqual(lines[0].rawText.trim(), 'Hello World', 'Preserves horizontal spacing between words');
assertEqual(lines[0].runs.length, 2, 'Keeps separate styling runs for normal and bold text');
assertEqual(lines[1].rawText.trim(), 'Second line here.', 'Correctly parses second line');

// 3. Body Font Size Calculation
const bodySize = calculateBodyFontSize(lines);
assertEqual(bodySize, 12, 'Accurately computes body font size as 12pt');

// 4. Heading Classification
const headingItems: ExtractedTextItem[] = [
  { text: 'Document Title', x: 50, y: 750, width: 150, height: 24, fontSize: 24, fontName: 'Arial-Bold', isBold: true, isItalic: false },
  { text: 'Section 1: Introduction', x: 50, y: 710, width: 120, height: 16, fontSize: 17, fontName: 'Arial-Bold', isBold: true, isItalic: false },
  { text: 'This is standard paragraph text that describes the section.', x: 50, y: 670, width: 300, height: 11, fontSize: 11, fontName: 'Arial', isBold: false, isItalic: false },
  { text: '• First bullet point with information', x: 50, y: 640, width: 220, height: 11, fontSize: 11, fontName: 'Arial', isBold: false, isItalic: false },
  { text: '• Second bullet point with more notes', x: 50, y: 620, width: 220, height: 11, fontSize: 11, fontName: 'Arial', isBold: false, isItalic: false },
  { text: '1. Numbered step one', x: 50, y: 590, width: 180, height: 11, fontSize: 11, fontName: 'Arial', isBold: false, isItalic: false },
];

const structuredLines = groupItemsIntoLines(headingItems);
const blocks = groupLinesIntoBlocks(structuredLines, 11);

assertEqual(blocks.length, 6, 'Detects 6 distinct structured blocks');
assertEqual(blocks[0].type, 'heading', 'First block is a heading');
assertEqual(blocks[0].headingLevel, HeadingLevel.HEADING_1, 'First block is Heading 1 (24pt vs 11pt)');
assertEqual(blocks[1].type, 'heading', 'Second block is a heading');
assertEqual(blocks[1].headingLevel, HeadingLevel.HEADING_2, 'Second block is Heading 2 (17pt vs 11pt)');
assertEqual(blocks[2].type, 'paragraph', 'Third block is standard paragraph');
assertEqual(blocks[3].type, 'list-bullet', 'Fourth block is bullet list item');
assertEqual(blocks[4].type, 'list-bullet', 'Fifth block is bullet list item');
assertEqual(blocks[5].type, 'list-number', 'Sixth block is numbered list item');

// 5. Fixture Tests: small.pdf
async function runFixtureTests() {
  const fixturesDir = path.resolve(process.cwd(), 'tests/fixtures');

  // Test with small.pdf
  const smallPdfBytes = fs.readFileSync(path.join(fixturesDir, 'small.pdf'));
  const wordBlob = await convertPdfToWord(smallPdfBytes, { documentTitle: 'Test Document' });
  assertTrue(wordBlob.size > 2000, 'small.pdf successfully converted to .docx', `${wordBlob.size} bytes`);
  assertEqual(
    wordBlob.type,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'Correct DOCX MIME type generated'
  );

  // Test with password-protected.pdf
  const pwPdfBytes = fs.readFileSync(path.join(fixturesDir, 'password-protected.pdf'));
  let caughtPassword = false;
  try {
    await convertPdfToWord(pwPdfBytes);
  } catch (err: any) {
    caughtPassword = true;
    assertTrue(err.message.includes('password'), 'Detects password-protected PDF and provides helpful message');
  }
  assertTrue(caughtPassword, 'Password protected PDF rejected as required');

  // Test with scanned-image.pdf (should detect lack of selectable text)
  const scannedPdfBytes = fs.readFileSync(path.join(fixturesDir, 'scanned-image.pdf'));
  let caughtScanned = false;
  try {
    await convertPdfToWord(scannedPdfBytes);
  } catch (err: any) {
    caughtScanned = true;
    assertTrue(err.message.includes('scanned') || err.message.includes('selectable text'), 'Detects scanned/image-only PDF with actionable message');
  }
  assertTrue(caughtScanned, 'Scanned PDF caught and handled gracefully');

  // Test with corrupted.pdf
  const corruptPdfBytes = fs.readFileSync(path.join(fixturesDir, 'corrupted.pdf'));
  let caughtCorrupted = false;
  try {
    await convertPdfToWord(corruptPdfBytes);
  } catch (err: any) {
    caughtCorrupted = true;
    assertTrue(err.message.includes('corrupted') || err.message.includes('parse'), 'Detects corrupted PDF without crashing');
  }
  assertTrue(caughtCorrupted, 'Corrupted PDF caught and handled gracefully');

  console.log('\n🎉 All PDF to Word unit tests passed successfully!\n');
}

runFixtureTests().catch((err) => {
  console.error('Fixture test error:', err);
  process.exit(1);
});
