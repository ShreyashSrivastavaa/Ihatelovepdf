/**
 * Safe LaTeX Character Escaping, Input Sanitization & Template Placeholder Injection
 * 100% client-side, zero server dependencies.
 */

// Forbidden/dangerous raw LaTeX commands that must be stripped from user plain-text inputs
const FORBIDDEN_LATEX_COMMANDS = [
  /\\input(?![a-zA-Z])/gi,
  /\\include(?![a-zA-Z])/gi,
  /\\write18(?![a-zA-Z])/gi,
  /\\immediate(?![a-zA-Z])/gi,
  /\\openout(?![a-zA-Z])/gi,
  /\\newwrite(?![a-zA-Z])/gi,
  /\\def(?![a-zA-Z])/gi,
  /\\let(?![a-zA-Z])/gi,
  /\\catcode(?![a-zA-Z])/gi,
  /\\csname(?![a-zA-Z])/gi,
  /\\endcsname(?![a-zA-Z])/gi,
  /\\escapechar(?![a-zA-Z])/gi,
  /\\lowercase(?![a-zA-Z])/gi,
  /\\uppercase(?![a-zA-Z])/gi,
  /\\expandafter(?![a-zA-Z])/gi,
];

// LaTeX reserved characters and their proper text-mode escapes
const LATEX_SPECIAL_CHARS: Record<string, string> = {
  '\\': '\\textbackslash{}',
  '%': '\\%',
  '&': '\\&',
  '$': '\\$',
  '#': '\\#',
  '_': '\\_',
  '{': '\\{',
  '}': '\\}',
  '~': '\\textasciitilde{}',
  '^': '\\textasciicircum{}',
};

export const MAX_FIELD_LENGTH = 2000;

/**
 * Defense-in-depth sanitization:
 * 1. Enforces max character length per field (default 2000 chars) to prevent pathological compile times.
 * 2. Strips raw executable/file I/O LaTeX macro commands from plain-text inputs.
 */
export function sanitizeLatexInput(input: string | undefined | null, maxLen: number = MAX_FIELD_LENGTH): string {
  if (!input) return '';

  let sanitized = String(input);

  // 1. Truncate if field exceeds character threshold
  if (sanitized.length > maxLen) {
    sanitized = sanitized.slice(0, maxLen);
  }

  // 2. Strip dangerous/forbidden raw LaTeX commands
  for (const pattern of FORBIDDEN_LATEX_COMMANDS) {
    sanitized = sanitized.replace(pattern, '');
  }

  return sanitized;
}

/**
 * Safely escapes user-supplied text for LaTeX compilation:
 * - Sanitizes dangerous raw macros
 * - Escapes reserved characters (% & $ # _ { } ~ ^ \)
 * - Normalizes Unicode smart quotes (“ ” ‘ ’) and dashes (—, –)
 */
export function escapeLatex(text: string | undefined | null): string {
  if (!text) return '';

  // 1. First sanitize length & dangerous commands
  const sanitized = sanitizeLatexInput(text);

  // 2. Single-pass replacement for all special characters to prevent re-escaping
  let escaped = sanitized.replace(/\\|[%&$#_{}~^]/g, (char) => {
    if (char === '\\') return '\\textbackslash{}';
    return LATEX_SPECIAL_CHARS[char] || char;
  });

  // 4. Normalize typographical quotes and dashes to standard LaTeX equivalents
  escaped = escaped
    .replace(/“/g, "``")
    .replace(/”/g, "''")
    .replace(/‘/g, "`")
    .replace(/’/g, "'")
    .replace(/"/g, "''")
    .replace(/—/g, '---')
    .replace(/–/g, '--');

  return escaped;
}

/**
 * Structured form data passed into the template builder
 */
export interface ResumeFormData {
  fullName?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary?: string;
  skills?: Array<{ category: string; list: string[] }>;
  experience?: Array<{
    role: string;
    company: string;
    location?: string;
    startDate: string;
    endDate: string;
    bullets: string[];
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    location?: string;
    startDate?: string;
    endDate: string;
    details?: string;
  }>;
  projects?: Array<{
    title: string;
    tech?: string;
    link?: string;
    bullets: string[];
  }>;
  certifications?: string[];
}

export interface TemplateManifestEntry {
  id: string;
  name: string;
  category: string;
  description: string;
  file: string;
  thumbnail: string;
  colorAccent: string;
  fontFamily: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  sections: string[];
  placeholders: Record<string, string>;
}

/**
 * Standard LaTeX Block Generators with automatic escaping
 */
export function formatExperienceBlock(items?: ResumeFormData['experience']): string {
  if (!items || items.length === 0) return '';
  return items
    .map((exp) => {
      const role = escapeLatex(exp.role);
      const company = escapeLatex(exp.company);
      const location = escapeLatex(exp.location || '');
      const dates = `${escapeLatex(exp.startDate)} -- ${escapeLatex(exp.endDate)}`;
      const bullets = (exp.bullets || [])
        .map((b) => `  \\item ${escapeLatex(b)}`)
        .join('\n');

      return `\\textbf{${role}} \\hfill ${dates} \\\\
\\textit{${company}} ${location ? `\\hfill \\textit{${location}}` : ''}
\\begin{itemize}
${bullets}
\\end{itemize}`;
    })
    .join('\n\\vspace{4pt}\n');
}

export function formatEducationBlock(items?: ResumeFormData['education']): string {
  if (!items || items.length === 0) return '';
  return items
    .map((edu) => {
      const degree = escapeLatex(edu.degree);
      const inst = escapeLatex(edu.institution);
      const loc = escapeLatex(edu.location || '');
      const dates = edu.endDate ? escapeLatex(edu.endDate) : '';
      const details = edu.details ? `\\\\ \\small ${escapeLatex(edu.details)}` : '';

      return `\\textbf{${degree}} \\hfill ${dates} \\\\
\\textit{${inst}} ${loc ? `\\hfill \\textit{${loc}}` : ''}${details}`;
    })
    .join('\n\\vspace{4pt}\n');
}

export function formatSkillsBlock(skills?: ResumeFormData['skills']): string {
  if (!skills || skills.length === 0) return '';
  const lines = skills
    .map((s) => `  \\item \\textbf{${escapeLatex(s.category)}:} ${escapeLatex(s.list.join(', '))}`)
    .join('\n');

  return `\\begin{itemize}[leftmargin=0.15in, label={}]\n${lines}\n\\end{itemize}`;
}

export function formatProjectsBlock(projects?: ResumeFormData['projects']): string {
  if (!projects || projects.length === 0) return '';
  return projects
    .map((p) => {
      const title = escapeLatex(p.title);
      const tech = p.tech ? ` \\textbar{} \\textit{${escapeLatex(p.tech)}}` : '';
      const link = p.link ? ` \\hfill \\href{${escapeLatex(p.link)}}{\\small View Project}` : '';
      const bullets = (p.bullets || [])
        .map((b) => `  \\item ${escapeLatex(b)}`)
        .join('\n');

      return `\\textbf{${title}}${tech}${link}
\\begin{itemize}
${bullets}
\\end{itemize}`;
    })
    .join('\n\\vspace{4pt}\n');
}

/**
 * Injects user form data into raw LaTeX source based on template placeholder tokens.
 */
export function injectPlaceholders(
  texSource: string,
  formData: ResumeFormData,
  placeholdersMap?: Record<string, string>
): string {
  let output = texSource;

  // 1. Primitive scalar mappings
  const scalarReplacements: Record<string, string> = {
    '{{FULL_NAME}}': escapeLatex(formData.fullName || 'Candidate Name'),
    '{{JOB_TITLE}}': escapeLatex(formData.jobTitle || 'Software Engineer'),
    '{{EMAIL}}': escapeLatex(formData.email || 'candidate@example.com'),
    '{{PHONE}}': escapeLatex(formData.phone || '+1 (555) 000-0000'),
    '{{LOCATION}}': escapeLatex(formData.location || 'San Francisco, CA'),
    '{{WEBSITE}}': formData.website ? escapeLatex(formData.website) : '',
    '{{LINKEDIN}}': formData.linkedin ? escapeLatex(formData.linkedin) : '',
    '{{GITHUB}}': formData.github ? escapeLatex(formData.github) : '',
    '{{SUMMARY}}': escapeLatex(formData.summary || ''),
  };

  // 2. Complex block mappings
  const blockReplacements: Record<string, string> = {
    '{{EXPERIENCE_BLOCK}}': formatExperienceBlock(formData.experience),
    '{{EXPERIENCE_ITEMS}}': formatExperienceBlock(formData.experience),
    '{{EDUCATION_BLOCK}}': formatEducationBlock(formData.education),
    '{{EDUCATION_ITEMS}}': formatEducationBlock(formData.education),
    '{{SKILLS_BLOCK}}': formatSkillsBlock(formData.skills),
    '{{PROJECTS_BLOCK}}': formatProjectsBlock(formData.projects),
  };

  const allReplacements = { ...scalarReplacements, ...blockReplacements };

  // If a custom template mapping is provided from manifest.json, honor it
  if (placeholdersMap) {
    for (const token of Object.values(placeholdersMap)) {
      if (allReplacements[token] !== undefined) {
        output = output.split(token).join(allReplacements[token]);
      }
    }
  }

  for (const [token, value] of Object.entries(allReplacements)) {
    output = output.split(token).join(value);
  }

  return output;
}
