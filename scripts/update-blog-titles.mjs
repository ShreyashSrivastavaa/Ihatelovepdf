import fs from 'node:fs';

let content = fs.readFileSync('src/app/_data/blog-data.ts', 'utf8');

const replacements = [
  ['How to Merge PDF Files Without Installing Software', 'How to Merge PDF Files for Free'],
  ['How to Compress a PDF File to Under 100KB Online', 'Compress PDF to Under 100KB, Step by Step'],
  ['How to Reduce PDF File Size for Email Attachments', 'Reduce PDF File Size for Email Free'],
  ['How to Remove Password Protection from a PDF You Own', 'PDF Password Forgotten? Your Real Options'],
  ['How to Convert PDF to JPG Images on Your Phone (iPhone & Android)', 'How to Convert PDF to JPG on Phone'],
  ['Is It Safe to Use Online PDF Tools? Security & Privacy Guide', 'Are Online PDF Tools Safe to Use?'],
  ['How to Sign a PDF Document on Your Phone for Free', 'How to Sign a PDF on Mobile Free'],
  ['How to Split a PDF into Separate Pages and Ranges', 'How to Split a PDF by Pages Free'],
  ['Best Free Online PDF Editors with No Watermark (2026)', 'Best Free PDF Editors With No Watermark'],
  ['How to Extract and Convert Scanned PDF Text to TXT', 'Extract Scanned PDF Text Online Free'],
  ['How to Permanently Redact Sensitive Data from a PDF', 'Permanently Redact PDF Online Free'],
  ['How to Fill PDF Forms Online Without Adobe Acrobat', 'Fill PDF Forms Online Free, No Acrobat']
];

for (const [oldT, newT] of replacements) {
  if (!content.includes(oldT)) {
    console.log('NOT FOUND in blog-data.ts:', oldT);
  } else {
    content = content.replace(oldT, newT);
  }
}

// Fix toolSlug in blog articles to valid route slugs
content = content.replace(/toolSlug:\s*'merge-pdf'/g, "toolSlug: 'merge'");
content = content.replace(/toolSlug:\s*'compress-pdf'/g, "toolSlug: 'compress'");
content = content.replace(/toolSlug:\s*'split-pdf'/g, "toolSlug: 'split'");
content = content.replace(/toolSlug:\s*'pdf-to-jpg'/g, "toolSlug: 'pdf-to-images'");
content = content.replace(/toolSlug:\s*'redact-pdf'/g, "toolSlug: 'redact'");
content = content.replace(/toolSlug:\s*'sign-pdf'/g, "toolSlug: 'sign-pdf'");
content = content.replace(/toolSlug:\s*'edit-pdf'/g, "toolSlug: 'edit-pdf'");
content = content.replace(/toolSlug:\s*'extract-text'/g, "toolSlug: 'extract-text'");
content = content.replace(/toolSlug:\s*'fill-pdf-form'/g, "toolSlug: 'fill-pdf-form'");

// Fix any /merge-pdf, /compress-pdf, /split-pdf, /redact-pdf links in text
content = content.replace(/\/merge-pdf/g, '/merge');
content = content.replace(/\/compress-pdf/g, '/compress');
content = content.replace(/\/split-pdf/g, '/split');
content = content.replace(/\/redact-pdf/g, '/redact');
content = content.replace(/\/pdf-to-jpg/g, '/pdf-to-images');

fs.writeFileSync('src/app/_data/blog-data.ts', content, 'utf8');
console.log('Successfully updated blog-data.ts');
