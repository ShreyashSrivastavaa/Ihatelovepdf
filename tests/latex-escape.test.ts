/**
 * Unit tests for LaTeX Character Escaping, Sanitization, and Placeholder Injection
 * Run with: npx tsx tests/latex-escape.test.ts
 */

import {
  escapeLatex,
  sanitizeLatexInput,
  injectPlaceholders,
  MAX_FIELD_LENGTH,
  ResumeFormData,
} from '../src/lib/latex-escape';

function assertEqual(actual: unknown, expected: unknown, testName: string) {
  if (actual !== expected) {
    console.error(`❌ FAIL: ${testName}\n  Expected: ${JSON.stringify(expected)}\n  Received: ${JSON.stringify(actual)}`);
    process.exit(1);
  } else {
    console.log(`✅ PASS: ${testName}`);
  }
}

function assertTrue(condition: boolean, testName: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${testName}`);
    process.exit(1);
  } else {
    console.log(`✅ PASS: ${testName}`);
  }
}

console.log('🧪 Starting LaTeX Escaping & Sanitization Test Suite...\n');

// 1. Ampersands
assertEqual(
  escapeLatex('Barnes & Noble'),
  'Barnes \\& Noble',
  'Escapes ampersand (&) to \\&'
);
assertEqual(
  escapeLatex('M&A and R&D'),
  'M\\&A and R\\&D',
  'Escapes multiple ampersands'
);

// 2. Underscores in emails & identifiers
assertEqual(
  escapeLatex('john_doe_2024@example_mail.com'),
  'john\\_doe\\_2024@example\\_mail.com',
  'Escapes underscores in email addresses'
);
assertEqual(
  escapeLatex('user_id_v2'),
  'user\\_id\\_v2',
  'Escapes code identifiers with underscores'
);

// 3. Percent signs
assertEqual(
  escapeLatex('Increased throughput by 100% and reduced latency by 35%'),
  'Increased throughput by 100\\% and reduced latency by 35\\%',
  'Escapes percent signs (%) to prevent LaTeX comment truncation'
);

// 4. Backslashes
assertEqual(
  escapeLatex('C:\\Users\\Admin\\Documents'),
  'C:\\textbackslash{}Users\\textbackslash{}Admin\\textbackslash{}Documents',
  'Escapes file path backslashes to \\textbackslash{}'
);

// 5. Empty and optional fields
assertEqual(escapeLatex(''), '', 'Handles empty string gracefully');
assertEqual(escapeLatex(null), '', 'Handles null gracefully');
assertEqual(escapeLatex(undefined), '', 'Handles undefined gracefully');

// 6. Pasted smart quotes and Unicode em-dashes
assertEqual(
  escapeLatex('“Smart Quotes” and ‘Single Quotes’'),
  "``Smart Quotes'' and `Single Quotes'",
  'Normalizes Unicode smart quotes to valid TeX quote pairs'
);
assertEqual(
  escapeLatex('Engineering Lead — Platform Team – Systems'),
  'Engineering Lead --- Platform Team -- Systems',
  'Converts Unicode em-dash (—) and en-dash (–) to TeX dashes'
);

// 7. Stripping dangerous LaTeX commands (Defense-in-depth)
assertEqual(
  sanitizeLatexInput('\\input{/etc/passwd}'),
  '{/etc/passwd}',
  'Strips dangerous \\input macro command'
);
assertEqual(
  sanitizeLatexInput('\\write18{rm -rf /}'),
  '{rm -rf /}',
  'Strips dangerous \\write18 shell execution command'
);
assertEqual(
  sanitizeLatexInput('\\immediate\\openout\\write18 payload'),
  ' payload',
  'Strips chained dangerous macro primitives'
);

// 8. Field length truncation
const longInput = 'A'.repeat(2500);
const sanitizedLong = sanitizeLatexInput(longInput);
assertEqual(sanitizedLong.length, MAX_FIELD_LENGTH, `Truncates inputs exceeding ${MAX_FIELD_LENGTH} characters`);

// 9. Full Template Injection Test
const sampleTemplate = `\\documentclass{article}
\\begin{document}
\\textbf{{{FULL_NAME}}}
\\href{mailto:{{EMAIL}}}{{{EMAIL}}}
{{SUMMARY}}
{{EXPERIENCE_ITEMS}}
\\end{document}`;

const sampleForm: ResumeFormData = {
  fullName: 'Jane & Joe Doe',
  email: 'jane_doe@tech.co',
  summary: 'Engineered 100% uptime with 0% downtime “at scale”.',
  experience: [
    {
      role: 'Staff SRE & Architect',
      company: 'High_Scale Corp',
      location: 'New York, NY',
      startDate: '2020',
      endDate: 'Present',
      bullets: ['Reduced AWS bills by 40% & automated 99.99% failover.'],
    },
  ],
};

const injectedTex = injectPlaceholders(sampleTemplate, sampleForm);
assertTrue(injectedTex.includes('Jane \\& Joe Doe'), 'Injects escaped full name');
assertTrue(injectedTex.includes('jane\\_doe@tech.co'), 'Injects escaped email address');
assertTrue(injectedTex.includes('100\\% uptime with 0\\% downtime ``at scale\'\''), 'Injects escaped summary with quotes and %');
assertTrue(injectedTex.includes('Staff SRE \\& Architect'), 'Injects structured experience role with escaped &');
assertTrue(injectedTex.includes('High\\_Scale Corp'), 'Injects structured company with escaped _');
assertTrue(injectedTex.includes('Reduced AWS bills by 40\\% \\& automated 99.99\\% failover'), 'Injects bullets with escaped % and &');

console.log('\n🎉 All 15 LaTeX Escaping & Injection unit tests passed successfully!\n');
