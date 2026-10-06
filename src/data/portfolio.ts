import { PortfolioConfig } from '@/types/portfolio';

export const portfolioData: PortfolioConfig = {
  personal: {
    name: "Twilight",
    title: "Fullstack Engineer & Systems Enthusiast",
    tagline: "Architecting ethereal digital experiences, linux environments, and performant web systems.",
    bioParagraphs: [
      "Crafting software at the crossroads of ethereal aesthetics and robust systems engineering. Specializing in responsive modern web applications, low-latency tooling, and expressive user interfaces.",
      "Beyond the browser, deeply immersed in the Linux ecosystem, crafting custom window manager rices (Hyprland), Wine prefix optimization for rhythm games, and minimal terminal utilities."
    ],
    location: "Manila / Remote",
    email: "twilight@example.com",
    availability: "Available for select opportunities"
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
      id: "oss-lead",
      role: "Lead Systems & Web Tinkerer",
      company: "Open Source Projects",
      period: "2023 - Present",
      location: "Remote",
      description: [
        "Engineered osu-winello to streamline Wine audio latency and beatmap sync on Wayland/Linux.",
        "Designed HyprNova, an aesthetic desktop rice with custom IPC daemons and status bars."
      ],
      technologies: ["Linux", "Rust", "Bash", "Wayland", "Next.js", "TypeScript"]
    },
    {
      id: "freelance-frontend",
      role: "Fullstack Frontend Developer",
      company: "Freelance / Web Projects",
      period: "2022 - 2024",
      location: "Remote",
      description: [
        "Built responsive, high-performance web applications using React, Next.js, Tailwind CSS, and Supabase.",
        "Implemented fluid micro-interactions, accessible design systems, and SEO best practices."
      ],
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Framer Motion"]
    }
  ],
  education: [
    {
      id: "bs-it",
      degree: "Bachelor of Science in Information Technology",
      institution: "University / Institute of Technology",
      period: "2021 - 2025",
      location: "Manila, Philippines",
      honors: "Dean's Honor List",
      details: [
        "Focused on Web Architectures, Database Systems, Linux OS, and Software Engineering."
      ]
    }
  ],
  projects: [
    {
      id: "osu-winello",
      title: "osu-winello",
      subtitle: "Linux & Wine Runner Suite",
      tags: ["Shell", "Wine", "Linux", "Audio"],
      featured: true,
      description: "A high-performance runner and prefix manager optimizing low-latency audio and beatmap synchronizations for rhythm gamers on Wayland.",
      longDescription: "Designed to solve audio crackling and input latency on Linux desktop environments, osu-winello automates Wine staging configurations, PulseAudio/PipeWire latency tuning, and fast asset mounting.",
      highlights: [
        "Sub-5ms audio latency tuning with PipeWire",
        "Automated prefix isolation & wine-tkg integration",
        "Seamless beatmap directory symlinking"
      ],
      githubUrl: "https://github.com/TwilightDust12/osu-winello"
    },
    {
      id: "hyprnova",
      title: "HyprNova Rice",
      subtitle: "Ethereal Wayland Desktop Suite",
      tags: ["Hyprland", "Wayland", "Rust", "CSS"],
      featured: true,
      description: "An ethereal cyberpunk aesthetic environment for Hyprland featuring custom glass status bars, dynamic wallpaper palette extraction, and quick launchers.",
      longDescription: "HyprNova transforms the Linux desktop into an ambient workstation inspired by Serial Experiments Lain and ambient aesthetics. Includes customized IPC hooks, rofi launchers, and audio visualizers.",
      highlights: [
        "Real-time ambient color palette switching",
        "Custom Waybar glassmorphism styling",
        "Low resource consumption (< 1% CPU idle)"
      ],
      githubUrl: "https://github.com/TwilightDust12/hyprnova"
    },
    {
      id: "lily-chou-chou-portfolio",
      title: "Lily Chou-Chou Space",
      subtitle: "Atmospheric Web Archive",
      tags: ["Next.js", "Tailwind CSS", "Web Audio"],
      featured: true,
      description: "An experimental, atmospheric web portfolio immersing visitors in an ethereal ether of ambient sound, retro typography, and filmic grain.",
      longDescription: "A creative homage exploring digital loneliness and ethereal connection. Features Web Audio API synthesis, scanline shaders, and responsive typographic columns.",
      highlights: [
        "Web Audio ambient generator",
        "Custom CSS scanline & noise textures",
        "Zero-dependency responsive layout"
      ],
      demoUrl: "https://lily-chou-chou.example.com",
      githubUrl: "https://github.com/TwilightDust12/lily-chou-chou-portfolio"
    },
    {
      id: "accela-wired-cli",
      title: "Accela CLI",
      subtitle: "Fast Terminal Scratchpad & Vault",
      tags: ["Rust", "CLI", "Linux"],
      featured: false,
      description: "A terminal user interface for instant fuzzy notes, code snippets, and workspace bookmarks with encryption.",
      longDescription: "Built with Rust and ratatui for instant startup times under 10ms. Allows quick keyboard-only tagging and export to markdown.",
      highlights: [
        "Sub-10ms instant startup",
        "Fuzzy-finding across thousands of notes",
        "Vim-style keybindings"
      ],
      githubUrl: "https://github.com/TwilightDust12/accela-wired-cli"
    }
  ],
  skills: [
    {
      category: "Languages & Core",
      description: "Core programming languages and web fundamentals",
      skills: [
        { name: "TypeScript", level: "Proficient" },
        { name: "JavaScript", level: "Proficient" },
        { name: "Python", level: "Advanced" },
        { name: "Rust", level: "Advanced" },
        { name: "Bash / Shell", level: "Proficient" },
        { name: "HTML5 & CSS3", level: "Proficient" }
      ]
    },
    {
      category: "Frontend & UI",
      description: "Modern frameworks and interactive interface development",
      skills: [
        { name: "Next.js 15", level: "Proficient" },
        { name: "React 19", level: "Proficient" },
        { name: "Tailwind CSS", level: "Proficient" },
        { name: "Framer Motion", level: "Advanced" },
        { name: "Responsive UX", level: "Proficient" },
        { name: "Web Audio", level: "Familiar" }
      ]
    },
    {
      category: "Backend & Storage",
      description: "Server-side services, APIs, and data layers",
      skills: [
        { name: "Node.js", level: "Proficient" },
        { name: "Express", level: "Advanced" },
        { name: "Supabase", level: "Proficient" },
        { name: "PostgreSQL", level: "Advanced" },
        { name: "REST APIs", level: "Proficient" },
        { name: "JSON-RPC", level: "Familiar" }
      ]
    },
    {
      category: "Systems & DevOps",
      description: "Linux environments, desktop orchestration, and container tooling",
      skills: [
        { name: "Linux (Arch / Debian)", level: "Proficient" },
        { name: "Hyprland / Wayland", level: "Proficient" },
        { name: "Git & GitHub", level: "Proficient" },
        { name: "Docker", level: "Advanced" },
        { name: "Wine / Proton", level: "Proficient" },
        { name: "Vercel", level: "Proficient" }
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
      title: "Linux Systems & Shell Administration",
      issuer: "Linux Professional Institute",
      issueDate: "2023",
      credentialId: "LPI-SYS-1029",
      credentialUrl: "https://lpi.org"
    }
  ]
};
