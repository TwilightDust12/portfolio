export interface SocialLink {
  platform: 'github' | 'linkedin' | 'instagram' | 'facebook' | 'discord' | 'email' | string;
  label: string;
  url: string;
  username: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  problem: string;
  role: string;
  stack: string[];
  outcome: string;
  isTeamProject?: boolean;
  artAttribution?: string;
  description: string;
  longDescription?: string;
  tags: string[];
  featured: boolean;
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  highlights?: string[];
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

export interface RiceSpec {
  os: string;
  kernel: string;
  wm: string;
  bar: string;
  terminals: string[];
  shell: string[];
  launchers?: string[];
  daemonsAndTools?: string[];
  audioTuning: string;
}

export interface AnimeInterests {
  description: string;
  favorites: string[];
  genres: string[];
}

export interface GamingInterests {
  description: string;
  genres: string[];
  favorites?: string[];
}

export interface ArtworkAttribution {
  asset: string;
  character?: string;
  source: string;
  studio: string;
  copyrightNotice: string;
  context: string;
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
  riceSpec: RiceSpec;
  animeInterests: AnimeInterests;
  gamingInterests: GamingInterests;
  artworkAttributions: ArtworkAttribution[];
}
