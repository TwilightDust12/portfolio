export interface SocialLink {
  platform: 'github' | 'linkedin' | 'instagram' | 'facebook' | 'email' | string;
  label: string;
  url: string;
  username: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  featured: boolean;
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  highlights: string[];
}

export interface SkillItem {
  name: string;
  level?: 'Proficient' | 'Advanced' | 'Familiar';
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: SkillItem[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location?: string;
  honors?: string;
  details?: string[];
}

export interface PortfolioConfig {
  personal: {
    name: string;
    title: string;
    tagline: string;
    bioParagraphs: string[];
    location: string;
    email: string;
    availability: string;
  };
  socials: SocialLink[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: SkillCategory[];
  certifications: Certification[];
}
