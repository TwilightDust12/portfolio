import { PortfolioConfig } from "@/types/portfolio";

export const portfolioData: PortfolioConfig = {
  personal: {
    name: "Twilight",
    title: "Software Engineer & Systems Tinkerer",
    tagline: "Building responsive web systems, tailored Linux desktop suites, and low-latency audio tooling with clean editorial discipline.",
    bioParagraphs: [
      "I am a software engineer focused on building clean, high-performance web applications and exploring the Linux desktop ecosystem. My work pairs deep technical care with a strong respect for layout, typography, and tactile interface craft.",
      "Beyond modern web stacks, I spend substantial time configuring Wayland window managers, writing automation tools in Shell and Rust, and optimizing audio pipelines for rhythm games on Linux."
    ],
    location: "Manila, PH / Remote",
    email: "jyrum12@gmail.com",
    availability: "Available for select projects & full-time engineering roles",
  },

  socials: [
    {
      platform: "github",
      label: "GitHub",
      url: "https://github.com/TwilightDust12",
      username: "@TwilightDust12"
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      url: "https://linkedin.com",
      username: "Twilight"
    },
    {
      platform: "instagram",
      label: "Instagram",
      url: "https://instagram.com",
      username: "@twilight"
    },
    {
      platform: "facebook",
      label: "Facebook",
      url: "https://facebook.com",
      username: "Twilight"
    }
  ],

  experience: [
    {
      id: "exp-1",
      role: "Open Source Creator & Systems Engineer",
      company: "Independent Projects",
      period: "2023 — Present",
      location: "Manila, PH",
      description: [
        "Created osu-winello to resolve audio sync discrepancies and input latency for competitive rhythm gaming across Wine and PipeWire.",
        "Engineered the HyprNova suite, an aesthetic Wayland desktop environment with dynamic IPC socket listeners and status daemons.",
        "Authored modular shell scripts and configuration architectures adopted by desktop Linux enthusiasts."
      ],
      technologies: ["Linux", "Bash", "Rust", "Wayland", "PipeWire", "Git"]
    },
    {
      id: "exp-2",
      role: "Fullstack Web Developer",
      company: "Freelance & Collaborative Work",
      period: "2022 — 2024",
      location: "Remote",
      description: [
        "Architected and deployed responsive single-page applications and marketing frontends using Next.js, React, and TypeScript.",
        "Integrated Supabase backends with row-level security and relational PostgreSQL schemas.",
        "Refined accessibility, performance budgets, and typography hierarchies across diverse client web projects."
      ],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"]
    }
  ],

  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Science in Information Technology",
      institution: "College of Computer Studies",
      period: "2021 — 2025",
      location: "Philippines",
      honors: "Dean's Honor List",
      details: [
        "Specialized in Systems Analysis, Modern Web Architectures, and Relational Database Systems.",
        "Completed capstone engineering projects emphasizing secure REST API design and responsive frontends."
      ]
    }
  ],

  projects: [
    {
      id: "osu-winello",
      title: "osu-winello",
      subtitle: "Linux & Wine Runner Suite",
      tags: ["Shell", "Wine", "Linux", "PipeWire"],
      featured: true,
      description: "A specialized Wine runner and prefix manager optimizing low-latency audio pipelines and beatmap synchronization for rhythm gaming on Linux.",
      longDescription: "Built to overcome audio crackling and micro-stutters on modern Wayland desktop sessions. Automates Wine staging prefixes, PipeWire buffer configurations, and seamless beatmap storage mounting.",
      highlights: [
        "Low-latency audio tuning with PipeWire buffer management",
        "Automated Wine prefix configuration and DLL overrides",
        "Symlink management for seamless song library migration"
      ],
      githubUrl: "https://github.com/TwilightDust12/osu-winello",
      demoUrl: "https://github.com/TwilightDust12/osu-winello"
    },
    {
      id: "hyprnova",
      title: "HyprNova Desktop Suite",
      subtitle: "Minimalist Wayland Environment",
      tags: ["Hyprland", "Wayland", "Rust", "CSS"],
      featured: true,
      description: "A cohesive desktop suite for Hyprland featuring custom status bars, dynamic wallpaper palette extraction, and keyboard-centric productivity flows.",
      longDescription: "HyprNova focuses on visual restraint, rapid keyboard navigation, and lightweight resource utilization. Designed with custom IPC listeners, rofi application pickers, and minimal CPU overhead.",
      highlights: [
        "Dynamic palette synchronization across terminal and UI",
        "Custom status bar layouts with hardware monitoring",
        "Sub-1% idle CPU consumption on modern systems"
      ],
      githubUrl: "https://github.com/TwilightDust12",
      demoUrl: "https://github.com/TwilightDust12"
    },
    {
      id: "lily-chou-chou-portfolio",
      title: "The Ether / Lily Archive",
      subtitle: "Cinematic Web Experience",
      tags: ["Next.js", "Web Audio", "Tailwind CSS", "Typography"],
      featured: true,
      description: "A creative web archive inspired by Shunji Iwai's All About Lily Chou-Chou, pairing 35mm optical grain with interactive Web Audio sound design.",
      longDescription: "An exploration of early internet nostalgia and film cinematography. Incorporates interactive synthesized soundscapes, custom typeface pairings, and balanced editorial columns.",
      highlights: [
        "Web Audio API ambient sound generator",
        "Optical lens vignette and custom grain shaders",
        "Responsive editorial typography and zero layout shift"
      ],
      githubUrl: "https://github.com/TwilightDust12/lily-chou-chou-themed-portfolio",
      demoUrl: "https://twilightdust12.github.io/lily-chou-chou-themed-portfolio/"
    },
    {
      id: "accela-wired-cli",
      title: "Accela CLI Notes",
      subtitle: "Terminal Scratchpad & Vault",
      tags: ["Rust", "CLI", "TUI", "Linux"],
      featured: false,
      description: "A fast terminal scratchpad for snippets, notes, and workspace bookmarks with fuzzy finding and local file storage.",
      longDescription: "Engineered in Rust for instantaneous startup under 10 milliseconds. Provides keyboard-only workflows, tagging, and direct markdown export.",
      highlights: [
        "Instant startup under 10ms with zero runtime overhead",
        "Fuzzy search across local markdown vaults",
        "Vim-inspired navigation bindings"
      ],
      githubUrl: "https://github.com/TwilightDust12",
      demoUrl: "https://github.com/TwilightDust12"
    }
  ],

  skills: [
    {
      category: "Languages & Core",
      description: "Core programming languages and foundational web technologies.",
      skills: [
        { name: "TypeScript", level: "Advanced" },
        { name: "JavaScript (ESNext)", level: "Advanced" },
        { name: "Rust", level: "Proficient" },
        { name: "Python", level: "Proficient" },
        { name: "Bash / Shell", level: "Advanced" },
        { name: "HTML5 & CSS3", level: "Advanced" }
      ]
    },
    {
      category: "Frontend Architecture",
      description: "Modern component-driven frameworks and UI engineering.",
      skills: [
        { name: "Next.js (App Router)", level: "Advanced" },
        { name: "React 19", level: "Advanced" },
        { name: "Tailwind CSS", level: "Advanced" },
        { name: "Framer Motion", level: "Proficient" },
        { name: "Responsive Layouts", level: "Advanced" },
        { name: "Web Audio API", level: "Familiar" }
      ]
    },
    {
      category: "Backend & Systems",
      description: "Data persistence, cloud services, and runtime platforms.",
      skills: [
        { name: "Node.js", level: "Proficient" },
        { name: "Supabase", level: "Proficient" },
        { name: "PostgreSQL", level: "Proficient" },
        { name: "RESTful APIs", level: "Advanced" },
        { name: "Git & Version Control", level: "Advanced" }
      ]
    },
    {
      category: "Linux & Desktop",
      description: "Operating system tailoring, window managers, and tooling.",
      skills: [
        { name: "Linux (Arch / Debian)", level: "Advanced" },
        { name: "Hyprland & Wayland", level: "Advanced" },
        { name: "Wine & Proton Staging", level: "Advanced" },
        { name: "PipeWire Audio", level: "Proficient" },
        { name: "Docker", level: "Familiar" }
      ]
    }
  ],

  certifications: [
    {
      id: "meta-frontend",
      title: "Meta Front-End Developer Professional Certificate",
      issuer: "Meta / Coursera",
      issueDate: "2024",
      credentialId: "META-FE-9921",
      credentialUrl: "https://coursera.org"
    },
    {
      id: "aws-cloud-practitioner",
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      issueDate: "2024",
      credentialId: "AWS-CCP-4810",
      credentialUrl: "https://aws.amazon.com"
    },
    {
      id: "linux-sysadmin",
      title: "Linux Systems Administration & Scripting",
      issuer: "Linux Professional Institute",
      issueDate: "2023",
      credentialId: "LPI-SYS-1029",
      credentialUrl: "https://lpi.org"
    }
  ]
};
