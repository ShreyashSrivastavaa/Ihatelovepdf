/**
 * LaTeX Template Parsing, Placeholder Auto-Detection & Validation
 */

import { sanitizeLatexInput } from '../latex-escape';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  detectedPlaceholders: Record<string, string>;
  sanitizedTex: string;
}

/**
 * Scans raw LaTeX code for existing {{TOKEN}} placeholders or section markers
 */
export function detectPlaceholdersInTex(rawTex: string): Record<string, string> {
  const detected: Record<string, string> = {};

  // 1. Find all {{UPPERCASE_TOKENS}}
  const tokenMatches = rawTex.match(/\{\{([A-Z0-9_]+)\}\}/g);
  if (tokenMatches) {
    for (const match of tokenMatches) {
      const key = match.replace(/[{}]/g, '').toLowerCase();
      detected[key] = match;
    }
  }

  // 2. Map standard token mappings if found in text
  return {
    name: detected.full_name || detected.name || '{{FULL_NAME}}',
    title: detected.job_title || detected.title || '{{JOB_TITLE}}',
    email: detected.email || '{{EMAIL}}',
    phone: detected.phone || '{{PHONE}}',
    location: detected.location || '{{LOCATION}}',
    website: detected.website || '{{WEBSITE}}',
    linkedin: detected.linkedin || '{{LINKEDIN}}',
    github: detected.github || '{{GITHUB}}',
    summary: detected.summary || '{{SUMMARY}}',
    skills: detected.skills_block || detected.skills || '{{SKILLS_BLOCK}}',
    experience: detected.experience_items || detected.experience_block || detected.experience || '{{EXPERIENCE_ITEMS}}',
    education: detected.education_items || detected.education_block || detected.education || '{{EDUCATION_ITEMS}}',
    projects: detected.projects_block || detected.projects || '{{PROJECTS_BLOCK}}',
  };
}

/**
 * Validates user-uploaded LaTeX template source code
 */
export function validateCustomTex(rawTex: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!rawTex || rawTex.trim().length === 0) {
    return {
      isValid: false,
      errors: ['Template source code is empty.'],
      warnings: [],
      detectedPlaceholders: {},
      sanitizedTex: '',
    };
  }

  if (rawTex.length > 500000) {
    errors.push('File exceeds 500 KB limit for client-side compilation.');
  }

  if (!rawTex.includes('\\documentclass')) {
    errors.push('Missing \\documentclass declaration. Custom templates must be valid standalone LaTeX files.');
  }

  if (!rawTex.includes('\\begin{document}') || !rawTex.includes('\\end{document}')) {
    errors.push('Missing \\begin{document} or \\end{document} environment.');
  }

  // Check for dangerous commands
  if (/\\write18/i.test(rawTex)) {
    warnings.push('Dangerous command \\write18 was automatically stripped for security.');
  }
  if (/\\openout|\\newwrite/i.test(rawTex)) {
    warnings.push('File output commands (\\openout/\\newwrite) were automatically stripped.');
  }

  const sanitizedTex = sanitizeLatexInput(rawTex, 500000);
  const detectedPlaceholders = detectPlaceholdersInTex(sanitizedTex);

  const tokenCount = Object.keys(detectedPlaceholders).filter((k) => sanitizedTex.includes(detectedPlaceholders[k])).length;
  if (tokenCount < 2) {
    warnings.push(
      'Few standard {{PLACEHOLDERS}} detected in template. You can insert tokens like {{FULL_NAME}}, {{EMAIL}}, and {{EXPERIENCE_ITEMS}} to enable automated form filling.'
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    detectedPlaceholders,
    sanitizedTex,
  };
}
