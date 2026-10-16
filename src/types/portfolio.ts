export interface SocialLink {
  platform: 'github' | 'linkedin' | 'instagram' | 'facebook' | 'discord' | 'email' | string;
  label: string;
  url: string;
  username: string;
}

export interface ProjectScreenshot {
  label: string;
  desktopUrl: string;
  mobileUrl?: string;
}

export interface ProjectStory {
  contribution?: string;
  difficultDecision?: string;
  learned?: string;
  improvement?: string;
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
  description: string;
  longDescription?: string;
  tags: string[];
  featured: boolean;
  image?: string;
  screenshots?: ProjectScreenshot[];
  videoUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  highlights?: string[];
  story?: ProjectStory;
}

export interface SkillItem {
  name: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  tag: string;
  skills: SkillItem[];
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

export interface CuratedAnimeNote {
  title: string;
  reaction: string;
  spoilerContent?: string;
  quote?: string;
}

export interface AnimeInterests {
  description: string;
  favorites: string[];
  genres: string[];
  notes?: CuratedAnimeNote[];
}

export interface CuratedGameNote {
  title: string;
  note: string;
}

export interface GamingInterests {
  description: string;
  genres: string[];
  favorites?: string[];
  notes?: CuratedGameNote[];
}

export interface NowUpdate {
  note: string;
  updated: string;
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
    avatars: string[];
    now?: NowUpdate;
  };
  socials: SocialLink[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: SkillCategory[];
  riceSpec: RiceSpec;
  animeInterests: AnimeInterests;
  gamingInterests: GamingInterests;
}
