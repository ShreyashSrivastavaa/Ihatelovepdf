/**
 * LaTeX Resume Data Types & Sample Models
 * Supports ATS-friendly resumes: Jake's Resume, Classic Corporate, Modern Tech, and Academic CV
 */

export type ResumeTemplateId = 'jakes' | 'corporate' | 'modern' | 'academic' | string;

export interface ResumeTemplateMeta {
  id: ResumeTemplateId;
  name: string;
  tagline?: string;
  description: string;
  font?: 'Helvetica' | 'Times' | string;
  accentColor?: string;
  category: string;
}

export const RESUME_TEMPLATES: ResumeTemplateMeta[] = [
  {
    id: 'jakes',
    name: "Jake's Resume",
    tagline: 'The Gold Standard for Tech & SWE',
    description: 'Ultra ATS-friendly layout with horizontal section dividers, bold highlights, and clean bullet points.',
    font: 'Helvetica',
    accentColor: '#1e293b',
    category: 'Tech / Software',
  },
  {
    id: 'corporate',
    name: 'Classic Corporate',
    tagline: 'Executive, Consulting & Finance',
    description: 'Timeless single-column typography with serif elegance, balanced margins, and distinguished section headers.',
    font: 'Times',
    accentColor: '#0f172a',
    category: 'Corporate / Finance',
  },
  {
    id: 'modern',
    name: 'Modern Tech',
    tagline: 'Crisp, Contemporary & Dense',
    description: 'Clean sans-serif structure highlighting skills, impact metrics, and project links with modern spacing.',
    font: 'Helvetica',
    accentColor: '#2563eb',
    category: 'Modern Creative',
  },
  {
    id: 'academic',
    name: 'Academic CV',
    tagline: 'Research, Faculty & Publications',
    description: 'Structured layout emphasizing education, peer-reviewed publications, awards, and teaching appointments.',
    font: 'Times',
    accentColor: '#334155',
    category: 'Research / Academic',
  },
];

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  highlights?: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  technologies: string;
  link?: string;
  bullets: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary?: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillCategory[];
  certifications?: CertificationItem[];
}

export const SAMPLE_RESUME_DATA: ResumeData = {
  personalInfo: {
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexrivera',
    github: 'github.com/alexrivera',
    portfolio: 'alexrivera.dev',
  },
  summary: 'Senior Software Engineer with 6+ years of experience designing scalable distributed systems, high-throughput cloud microservices, and modern web applications. Proven track record reducing latency by 45% and mentoring junior engineering talent.',
  education: [
    {
      id: 'edu_1',
      institution: 'University of California, Berkeley',
      degree: 'B.S. in Computer Science, Magna Cum Laude',
      location: 'Berkeley, CA',
      startDate: 'Aug 2016',
      endDate: 'May 2020',
      gpa: '3.88 / 4.00',
      highlights: ['Dean\'s Honors List', 'Teaching Assistant for Data Structures & Algorithms'],
    },
  ],
  experience: [
    {
      id: 'exp_1',
      company: 'TechFlow Systems',
      role: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: 'Jun 2022',
      endDate: 'Present',
      bullets: [
        'Architected real-time event streaming pipeline processing 150M+ events/day using Apache Kafka and Go, decreasing p99 latency from 240ms to 42ms.',
        'Led migration of monolithic payment services to containerized Kubernetes microservices on AWS, achieving 99.99% system availability.',
        'Mentored 5 associate engineers through structured code reviews, automated testing workshops, and agile engineering practices.',
      ],
    },
    {
      id: 'exp_2',
      company: 'Nexis Data Labs',
      role: 'Software Engineer',
      location: 'Palo Alto, CA',
      startDate: 'Jul 2020',
      endDate: 'May 2022',
      bullets: [
        'Engineered responsive React/Next.js dashboard utilized by 45,000+ daily active enterprise users.',
        'Implemented optimized PostgreSQL indexing and database partitioning, reducing complex analytical query times by 65%.',
        'Designed secure OAuth 2.0 and SAML authentication modules with multi-factor authentication.',
      ],
    },
  ],
  projects: [
    {
      id: 'proj_1',
      name: 'Distributed Key-Value Store',
      technologies: 'Rust, Raft Consensus, gRPC, Tokio',
      link: 'github.com/alexrivera/raft-kv',
      bullets: [
        'Implemented Raft consensus algorithm in Rust supporting leader election, log replication, and safe cluster state transitions.',
        'Benchmarked throughput reaching 85,000 requests/sec with sub-5ms commit latency under simulated network partitions.',
      ],
    },
    {
      id: 'proj_2',
      name: 'Cloud Infrastructure Visualizer',
      technologies: 'TypeScript, React, WebGL, GraphQL, Terraform',
      link: 'github.com/alexrivera/cloud-graph',
      bullets: [
        'Developed interactive 3D topology visualizer parsing Terraform state files into dynamic resource dependency graphs.',
        'Featured on Hacker News front page and gained 2,400+ GitHub stars.',
      ],
    },
  ],
  skills: [
    {
      id: 'skill_1',
      name: 'Languages',
      skills: 'TypeScript, Go, Rust, Python, Java, SQL, C++',
    },
    {
      id: 'skill_2',
      name: 'Frameworks & Libs',
      skills: 'React, Next.js, Node.js, Express, Tailwind CSS, Tokio, gRPC',
    },
    {
      id: 'skill_3',
      name: 'Cloud & DevOps',
      skills: 'AWS (ECS, S3, RDS, Lambda), Docker, Kubernetes, Terraform, GitHub Actions, Kafka',
    },
    {
      id: 'skill_4',
      name: 'Databases & Tools',
      skills: 'PostgreSQL, Redis, MongoDB, Elasticsearch, Git, Linux, Vim',
    },
  ],
  certifications: [
    {
      id: 'cert_1',
      name: 'AWS Certified Solutions Architect - Associate',
      issuer: 'Amazon Web Services',
      date: '2023',
    },
    {
      id: 'cert_2',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Linux Foundation',
      date: '2024',
    },
  ],
};
