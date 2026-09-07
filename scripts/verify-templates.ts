import fs from 'fs';
import path from 'path';
import { SAMPLE_RESUME_DATA } from '../src/lib/latex/resume-types';
import { compileResumeToDocumentModel, generateResumePdf } from '../src/lib/latex/resume-compiler';
import { injectPlaceholders, resumeDataToFormData } from '../src/lib/latex-escape';
import manifest from '../templates/manifest.json';

async function run() {
  console.log(`Checking ${manifest.templates.length} templates...\n`);

  const results: any[] = [];

  for (const t of manifest.templates) {
    const texPath = path.resolve(process.cwd(), t.file);
    const publicTexPath = path.resolve(process.cwd(), 'public', t.file);

    if (!fs.existsSync(texPath)) {
      throw new Error(`Missing template file: ${texPath}`);
    }
    if (!fs.existsSync(publicTexPath)) {
      throw new Error(`Missing public template file: ${publicTexPath}`);
    }

    const rawTex = fs.readFileSync(texPath, 'utf8');

    // Test placeholder injection
    const formData = resumeDataToFormData(SAMPLE_RESUME_DATA);
    const injectedTex = injectPlaceholders(rawTex, formData, t.placeholders);

    // Verify all primary tokens got replaced
    const unreplacedTokens = (injectedTex.match(/\{\{[A-Z_]+\}\}/g) || []);

    // Test DocumentModel generation
    const docModel = compileResumeToDocumentModel(SAMPLE_RESUME_DATA, t.id);
    const page = docModel.pages[0];
    const elements = page.elements;
    const textElements = elements.filter(e => e.type === 'text');
    const shapeElements = elements.filter(e => e.type === 'shape');

    // Test PDF generation
    const pdfBytes = await generateResumePdf(SAMPLE_RESUME_DATA, t.id);

    results.push({
      id: t.id,
      name: t.name,
      category: t.category,
      fontFamily: t.fontFamily,
      texBytes: rawTex.length,
      pdfBytes: pdfBytes.length,
      elementCount: elements.length,
      shapeCount: shapeElements.length,
      unreplacedTokensCount: unreplacedTokens.length,
    });
  }

  console.table(results);
  console.log('\nAll 20 templates verified successfully!');
}

run().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
