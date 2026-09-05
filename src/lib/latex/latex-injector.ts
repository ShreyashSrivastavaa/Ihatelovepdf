/**
 * Safe LaTeX character escaping and placeholder injection engine.
 * 100% client-side, zero-dependency.
 */

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

/**
 * Safely escapes user-supplied text for LaTeX compilation.
 */
export function escapeLatex(text: string | undefined | null): string {
  if (!text) return '';

  return String(text)
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/[%&$#_{}~^]/g, (char) => LATEX_SPECIAL_CHARS[char] || char)
    .replace(/"/g, "''")
    .replace(/—/g, '---')
    .replace(/–/g, '--');
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

/**
 * Standard LaTeX Block Generators
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
      const link = p.link ? ` \\hfill \\href{${p.link}}{\\small View Project}` : '';
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

export function formatCertificationsBlock(certs?: string[]): string {
  if (!certs || certs.length === 0) return '';
  const bullets = certs.map((c) => `  \\item ${escapeLatex(c)}`).join('\n');
  return `\\begin{itemize}\n${bullets}\n\\end{itemize}`;
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
    '{{CERTIFICATIONS_BLOCK}}': formatCertificationsBlock(formData.certifications),
  };

  const allReplacements = { ...scalarReplacements, ...blockReplacements };

  // If a custom template mapping is provided from manifest.json, apply it
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
