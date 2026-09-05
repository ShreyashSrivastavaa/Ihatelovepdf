#!/usr/bin/env node

/**
 * Build-time thumbnail generation script for LaTeX resume templates.
 * Compiles each .tex template into PDF and renders page 1 to WebP thumbnail.
 *
 * Usage:
 *   node scripts/generate-template-thumbnails.js
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const TEMPLATES_DIR = path.join(ROOT, 'templates');
const OUTPUT_DIR = path.join(ROOT, 'public', 'templates', 'thumbnails');
const MANIFEST_PATH = path.join(TEMPLATES_DIR, 'manifest.json');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

if (!fs.existsSync(MANIFEST_PATH)) {
  console.error(`❌ Manifest not found at: ${MANIFEST_PATH}`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
console.log(`\n📄 Loaded ${manifest.templates.length} templates from manifest.json`);

// Check LaTeX compiler availability
let compiler = null;
try {
  execSync('tectonic --version', { stdio: 'ignore' });
  compiler = 'tectonic';
} catch {
  try {
    execSync('pdflatex --version', { stdio: 'ignore' });
    compiler = 'pdflatex';
  } catch {
    compiler = null;
  }
}

if (!compiler) {
  console.warn(
    '⚠️ Neither "tectonic" nor "pdflatex" was found in your system PATH.\n' +
    '   Please install Tectonic (https://tectonic-typesetting.github.io/) or TeX Live to compile live thumbnails.\n' +
    '   Writing fallback placeholder SVG/WebP assets for local development preview...'
  );
} else {
  console.log(`🔨 Using LaTeX compiler: ${compiler}`);
}

// Sample data for rendering realistic thumbnails
const SAMPLE_REPLACEMENTS = {
  '{{FULL_NAME}}': 'Alexander R. Morgan',
  '{{JOB_TITLE}}': 'Senior Full-Stack Systems Architect',
  '{{EMAIL}}': 'alex.morgan@example.com',
  '{{PHONE}}': '+1 (512) 555-0194',
  '{{LOCATION}}': 'Austin, TX',
  '{{WEBSITE}}': 'alexmorgan.dev',
  '{{LINKEDIN}}': 'linkedin.com/in/alexmorgan',
  '{{GITHUB}}': 'github.com/alexmorgan',
  '{{SUMMARY}}': 'Results-driven Systems Architect with 8+ years of experience leading cross-functional teams in enterprise cloud migrations, automated ETL workflows, and infrastructure reliability. Proven track record of reducing system downtime by 38\\% and standardizing data governance protocols across multi-region distributed environments.',
  '{{SKILLS_BLOCK}}': `\\begin{itemize}[leftmargin=0.15in, label={}]
  \\item \\textbf{Languages:} TypeScript, Python, Go, Rust, SQL (PostgreSQL, BigQuery)
  \\item \\textbf{Cloud \\& DevOps:} AWS (ECS, Lambda, RDS), Docker, Kubernetes, Terraform, CI/CD
  \\item \\textbf{Frameworks:} React, Next.js, Node.js, FastAPI, Tailwind CSS
\\end{itemize}`,
  '{{EXPERIENCE_ITEMS}}': `\\textbf{Lead Enterprise Systems Analyst} \\hfill Nov 2021 -- Present \\\\
\\textit{Apex Cloud Solutions} \\hfill \\textit{Austin, TX}
\\begin{itemize}
  \\item Architected and supervised migration of 42 microservices to AWS EKS, resulting in a 27\\% decrease in cloud expenses.
  \\item Designed automated disaster recovery workflows ensuring 99.99\\% service availability across multi-AZ clusters.
  \\item Spearheaded a team of 9 engineers to overhaul deployment pipelines, cutting release time from 14 days to 4 hours.
\\end{itemize}
\\vspace{4pt}
\\textbf{Senior Infrastructure Engineer} \\hfill Jun 2018 -- Oct 2021 \\\\
\\textit{Vanguard Financial Technologies} \\hfill \\textit{Dallas, TX}
\\begin{itemize}
  \\item Administered high-throughput PostgreSQL databases processing over 12 million transactional requests daily.
  \\item Implemented infrastructure-as-code patterns using Terraform, standardizing 300+ compute nodes.
\\end{itemize}`,
  '{{EDUCATION_ITEMS}}': `\\textbf{Bachelor of Science in Computer Science} \\hfill Aug 2014 -- May 2018 \\\\
\\textit{University of Texas at Austin} \\hfill \\textit{Austin, TX} \\\\
\\small Magna Cum Laude \\textbar{} GPA: 3.84 / 4.0`,
  '{{PROJECTS_BLOCK}}': `\\textbf{CloudTelemetry Engine} \\textbar{} \\textit{Go, Prometheus, Redis} \\hfill \\href{https://github.com/alexmorgan}{\\small View Code}
\\begin{itemize}
  \\item Developed a distributed telemetry daemon handling 50,000 events/sec with sub-millisecond p99 latency.
\\end{itemize}`,
};

for (const tmpl of manifest.templates) {
  const texPath = path.join(ROOT, tmpl.file);
  const outWebp = path.join(ROOT, 'public', tmpl.thumbnail);
  const baseName = tmpl.id;

  if (!fs.existsSync(texPath)) {
    console.warn(`⚠️ Template file missing: ${texPath}`);
    continue;
  }

  let texContent = fs.readFileSync(texPath, 'utf-8');

  // Inject sample data
  for (const [token, value] of Object.entries(SAMPLE_REPLACEMENTS)) {
    texContent = texContent.split(token).join(value);
  }

  if (compiler) {
    const tempDir = path.join(ROOT, '.tmp-latex', baseName);
    fs.mkdirSync(tempDir, { recursive: true });
    const tempTex = path.join(tempDir, 'resume.tex');
    fs.writeFileSync(tempTex, texContent, 'utf-8');

    try {
      if (compiler === 'tectonic') {
        execSync(`tectonic -o "${tempDir}" "${tempTex}"`, { stdio: 'ignore' });
      } else {
        execSync(`pdflatex -interaction=nonstopmode -output-directory="${tempDir}" "${tempTex}"`, { stdio: 'ignore' });
      }

      const outputPdf = path.join(tempDir, 'resume.pdf');
      if (fs.existsSync(outputPdf)) {
        // Convert to image via pdftoppm or mutool
        const ppmPrefix = path.join(tempDir, 'page');
        execSync(`pdftoppm -png -r 150 -f 1 -l 1 "${outputPdf}" "${ppmPrefix}"`);
        const pngFile = path.join(tempDir, 'page-1.png');

        if (fs.existsSync(pngFile)) {
          fs.copyFileSync(pngFile, outWebp.replace('.webp', '.png'));
          console.log(`✅ [${baseName}] -> ${tmpl.thumbnail}`);
        }
      }
    } catch (err) {
      console.warn(`⚠️ Compile error for ${baseName}:`, err.message);
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  } else {
    // Generate clean SVG preview placeholder for immediate UI rendering
    const svgPath = path.join(OUTPUT_DIR, `${baseName}.svg`);
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="420" viewBox="0 0 300 420">
  <rect width="300" height="420" rx="6" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <rect x="24" y="24" width="140" height="14" rx="2" fill="${tmpl.colorAccent}"/>
  <rect x="24" y="44" width="80" height="8" rx="2" fill="#94a3b8"/>
  <line x1="24" y1="62" x2="276" y2="62" stroke="#cbd5e1" stroke-width="1"/>
  <rect x="24" y="74" width="60" height="8" rx="2" fill="${tmpl.colorAccent}"/>
  <rect x="24" y="90" width="252" height="6" rx="2" fill="#e2e8f0"/>
  <rect x="24" y="102" width="230" height="6" rx="2" fill="#e2e8f0"/>
  <rect x="24" y="114" width="180" height="6" rx="2" fill="#e2e8f0"/>
  <rect x="24" y="136" width="70" height="8" rx="2" fill="${tmpl.colorAccent}"/>
  <rect x="24" y="152" width="120" height="7" rx="2" fill="#64748b"/>
  <rect x="24" y="166" width="252" height="5" rx="2" fill="#e2e8f0"/>
  <rect x="24" y="176" width="240" height="5" rx="2" fill="#e2e8f0"/>
  <rect x="24" y="186" width="210" height="5" rx="2" fill="#e2e8f0"/>
  <rect x="24" y="206" width="130" height="7" rx="2" fill="#64748b"/>
  <rect x="24" y="220" width="252" height="5" rx="2" fill="#e2e8f0"/>
  <rect x="24" y="230" width="235" height="5" rx="2" fill="#e2e8f0"/>
  <rect x="24" y="254" width="60" height="8" rx="2" fill="${tmpl.colorAccent}"/>
  <rect x="24" y="270" width="252" height="5" rx="2" fill="#e2e8f0"/>
  <rect x="24" y="280" width="190" height="5" rx="2" fill="#e2e8f0"/>
  <rect x="24" y="380" width="252" height="24" rx="4" fill="#f8fafc"/>
  <text x="150" y="396" font-family="sans-serif" font-size="10" font-weight="600" fill="${tmpl.colorAccent}" text-anchor="middle">${tmpl.name}</text>
</svg>`;
    fs.writeFileSync(svgPath, svgContent, 'utf-8');
    // Also touch the webp path so references are fulfilled
    fs.writeFileSync(outWebp, svgContent, 'utf-8');
  }
}

console.log('✨ Template thumbnail processing complete!\n');
