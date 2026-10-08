import { PortfolioConfig } from "@/types/portfolio";

export const portfolioData: PortfolioConfig = {
  personal: {
    name: "Jose Raphael Jaro",
    title: "Aspiring Full-Stack Developer",
    tagline: "Doing things, little by little. Building responsive web systems, intuitive interfaces, and clean code across modern full-stack frameworks and Wayland environments.",
    bioParagraphs: [
      "Aspiring full-stack developer based in Lucena City, Philippines. Passionate about clean architecture, responsive frontend systems, and Linux workstation customization.",
      "Experienced in building web applications with Next.js, React, TypeScript, and Supabase, alongside native Android development in Kotlin. Currently seeking On-the-Job Training (OJT) and internship opportunities."
    ],
    location: "Lucena City, Quezon Province, Philippines",
    email: "jyrum12@gmail.com",
    availability: "Seeking full-stack internship opportunities",
    avatars: [
      "/assets/profile.jpg",
      "/assets/profile2.jpg",
      "/assets/reze.jpg"
    ]
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
      url: "https://www.linkedin.com/in/jose-raphael-jaro-822b2b251/",
      username: "Jose Raphael Jaro"
    },
    {
      platform: "facebook",
      label: "Facebook",
      url: "https://www.facebook.com/Jyrum.JaroLuckyStar/",
      username: "Jyrum.JaroLuckyStar"
    },
    {
      platform: "instagram",
      label: "Instagram",
      url: "https://www.instagram.com/jy.twi/",
      username: "@jy.twi"
    },
    {
      platform: "discord",
      label: "Discord",
      url: "https://discord.com",
      username: "twilightdust"
    }
  ],

  experience: [
    {
      id: "thesis-webc",
      role: "Full-Stack Developer (Team Project)",
      company: "STI College Lucena (Capstone Thesis)",
      period: "2024 - Present",
      location: "Lucena City, Philippines",
      description: [
        "Engineered the WebC student clearance system for STI College Lucena with role-based routing.",
        "Integrated institutional Microsoft Azure MSAL authentication and Supabase PostgreSQL with Drizzle ORM.",
        "Built responsive clearance approval dashboards for students, departments, and administrators."
      ],
      technologies: ["Next.js 15", "TypeScript", "Supabase", "Drizzle ORM", "Azure MSAL", "Tailwind CSS"]
    },
    {
      id: "sphere8-dev",
      role: "Lead Frontend Developer",
      company: "Sphere8 Construction Company",
      period: "2024",
      location: "Remote / Lucena City",
      description: [
        "Designed and implemented modern corporate web portal and project showcase.",
        "Created streamlined quotation inquiry flows and responsive mobile layouts."
      ],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"]
    }
  ],

  education: [
    {
      id: "college",
      degree: "Bachelor of Science in Computer Science",
      institution: "STI College Lucena",
      period: "2023 - 2027",
      location: "Lucena City, Philippines",
      details: [
        "Major in Computer Science with a focus on Full-Stack Web Development, Systems Architecture, and Database Design.",
        "Actively seeking On-the-Job Training (OJT) and industry internship roles."
      ]
    },
    {
      id: "shs",
      degree: "Senior High School - Mobile App and Web Development (MAWD)",
      institution: "STI College Lucena",
      period: "2021 - 2023",
      location: "Lucena City, Philippines",
      honors: "Graduated with High Honors (95 Average)",
      details: [
        "Specialized in the Mobile App and Web Development (MAWD) technical track under TVL/ICT.",
        "Served as Vice President of CodeArts Online, leading student programming workshops and design initiatives."
      ]
    },
    {
      id: "jhs",
      degree: "Elementary & Junior High School",
      institution: "Saint Philomena School",
      period: "2012 - 2021",
      location: "Lucena City, Philippines",
      details: [
        "Foundational education and early exploration of computer technologies."
      ]
    }
  ],

  projects: [
    {
      id: "webc",
      title: "WebC - Student Clearance System",
      subtitle: "Capstone Thesis (Team Project)",
      problem: "Manual, paper-reliant academic clearance workflows cause delays, lost clearance filings, and administrative friction across college departments.",
      role: "Full-Stack Developer (Team Project)",
      stack: ["Next.js 15", "TypeScript", "Supabase", "Drizzle ORM", "Azure MSAL", "Tailwind CSS"],
      outcome: "Centralized multi-role web portal featuring role-based dashboards (Student, Department, Admin), automated clearance approval pipelines, and institutional Azure login.",
      isTeamProject: true,
      featured: true,
      description: "A modern web student clearance system built with Next.js 15, TypeScript, and Supabase for STI College Lucena.",
      longDescription: "WebC replaces fragmented physical clearance sign-offs with an automated, auditable digital workflow. The system features role-based access for students, department heads, and campus administration with real-time approval status updates.",
      tags: ["Next.js 15", "TypeScript", "Supabase", "Drizzle ORM", "Azure MSAL"],
      githubUrl: "https://github.com/sudosetnametoAsh/next-webc",
      screenshots: [
        {
          label: "Student Dashboard",
          desktopUrl: "/assets/project screenshots/WebC/Student Dashboard.png",
          mobileUrl: "/assets/project screenshots/WebC/Student Dashboard Mobile View.png",
        },
        {
          label: "Faculty Dashboard",
          desktopUrl: "/assets/project screenshots/WebC/Faculty Dashboard.png",
          mobileUrl: "/assets/project screenshots/WebC/Faculty Dashboard Mobile View.png",
        },
        {
          label: "Admin Dashboard",
          desktopUrl: "/assets/project screenshots/WebC/Admin Dashboard.png",
          mobileUrl: "/assets/project screenshots/WebC/Admin Dashboard Mobile View.png",
        },
      ],
      highlights: [
        "Role-based clearance routing for students, departments, and administrators",
        "Microsoft Azure MSAL single sign-on integration for institutional accounts",
        "High-performance database operations powered by Drizzle ORM and Supabase PostgreSQL"
      ]
    },
    {
      id: "sphere8",
      title: "Sphere8 Construction Company Website",
      subtitle: "Commercial Corporate Portal",
      problem: "Traditional construction contracting suffers from friction in client intake and fragmented offline project portfolios.",
      role: "Lead Frontend Developer",
      stack: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
      outcome: "Modern corporate web portal featuring structured showcase galleries and direct service inquiry funnels (In Active Development).",
      isTeamProject: false,
      featured: true,
      description: "Commercial corporate web portal featuring structured showcase galleries and service inquiry funnels.",
      longDescription: "A modern responsive corporate website built for Sphere8 Construction Company. Provides an elegant digital presence highlighting commercial projects and automating prospective customer quotes.",
      tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
      highlights: [
        "Fast responsive interface optimized for mobile and desktop",
        "Interactive project gallery and quotation inquiry flow",
        "Clean, corporate typography and architectural imagery"
      ]
    },
    {
      id: "lily-chou-chou",
      title: "All About Lily Chou-Chou Themed Portfolio",
      subtitle: "Atmospheric Web Experience",
      problem: "Conventional web portfolios often lack sensory atmosphere and emotional resonance.",
      role: "Creator & Designer",
      stack: ["Next.js", "Tailwind CSS", "Web Audio API", "TypeScript"],
      outcome: "Atmospheric web archive integrating real-time Web Audio API ambient sound synthesis, filmic scanlines, and retro typography.",
      isTeamProject: false,
      featured: true,
      description: "An experimental, atmospheric web portfolio immersing visitors in an ethereal ether of ambient sound, retro typography, and filmic grain.",
      longDescription: "A creative homage exploring digital connection and ethereal atmosphere. Features Web Audio API synthesis, scanline shaders, and responsive typographic columns.",
      tags: ["Next.js", "Tailwind CSS", "Web Audio API"],
      githubUrl: "https://github.com/TwilightDust12/lily-chou-chou-themed-portfolio",
      screenshots: [
        {
          label: "Atmospheric Web Archive",
          desktopUrl: "/assets/project screenshots/lily-chou-chou-themed-portfolio/lily-chou-chou-website.png",
          mobileUrl: "/assets/project screenshots/lily-chou-chou-themed-portfolio/lily chou chou mobile view.PNG",
        },
      ],
      highlights: [
        "Procedural Web Audio API ambient tone synthesizer",
        "Custom scanline textures and filmic typography",
        "Lightweight zero-dependency audio generation"
      ]
    },
    {
      id: "wayland-rice",
      title: "Wayland Rice & Dotfiles",
      subtitle: "Custom CachyOS & Hyprland Setup",
      problem: "Default desktop setups lack dynamic color coordination and low-latency audio tuning.",
      role: "Maintainer & Ricer",
      stack: ["CachyOS", "Hyprland", "Waybar", "Pywal", "Bash", "PipeWire"],
      outcome: "Automated Wayland rice environment with dynamic wallpaper-extracted color palettes, custom IPC status bars, and low-latency audio daemons.",
      isTeamProject: false,
      featured: true,
      description: "Personal Wayland environment on CachyOS featuring dynamic Pywal theming, GPU terminal setups, and PipeWire audio routing.",
      longDescription: "A finely tuned Wayland desktop workflow running on CachyOS. Features customized Waybar status bars, GPU-accelerated terminals (Alacritty/Kitty), dynamic Pywal theme extraction, and PipeWire latency optimization.",
      tags: ["Hyprland", "Waybar", "CachyOS", "Pywal", "Bash"],
      githubUrl: "https://github.com/TwilightDust12",
      videoUrl: "/assets/project screenshots/hyprland rice/hyprland rice.mp4",
      highlights: [
        "Real-time Pywal palette generation synced across Waybar, Mako, and Discord",
        "Fluid Wayland animations and tiling rules on Hyprland",
        "Low-latency PipeWire audio routing configuration"
      ]
    }
  ],

  skills: [
    {
      category: "Frontend",
      description: "Modern component architectures, typed applications, and responsive design systems.",
      tag: "FRONTEND",
      skills: [
        { name: "Next.js" },
        { name: "React" },
        { name: "TypeScript" },
        { name: "Tailwind CSS" },
        { name: "Vite" },
        { name: "Bootstrap" }
      ]
    },
    {
      category: "Backend & Data",
      description: "Server runtimes, relational databases, ORMs, and secure cloud storage.",
      tag: "BACKEND & DATA",
      skills: [
        { name: "Node.js" },
        { name: "Supabase" },
        { name: "Drizzle ORM" },
        { name: "SQL Server" },
        { name: "ASP.NET (Web Forms & MVC)" }
      ]
    },
    {
      category: "DevOps & QA",
      description: "Containerization, automated testing workflows, and continuous integration.",
      tag: "DEVOPS & QA",
      skills: [
        { name: "Docker" },
        { name: "GitHub Actions" },
        { name: "Playwright" },
        { name: "Git & GitHub" }
      ]
    },
    {
      category: "Mobile & Game Dev",
      description: "Native Android applications with MVVM architecture and C# game development in Unity.",
      tag: "MOBILE & GAME",
      skills: [
        { name: "Android (Kotlin)" },
        { name: "Jetpack Compose" },
        { name: "Room Database" },
        { name: "MVVM Architecture" },
        { name: "Unity (C#)" }
      ]
    },
    {
      category: "Linux & Tools",
      description: "Performance Linux environments, Wayland window management, and terminal tooling.",
      tag: "LINUX & TOOLS",
      skills: [
        { name: "CachyOS / Arch" },
        { name: "Hyprland (Wayland)" },
        { name: "Waybar" },
        { name: "Zsh / Bash" },
        { name: "Linux Administration" }
      ]
    }
  ],

  riceSpec: {
    os: "CachyOS (Arch Linux)",
    kernel: "Linux 6.x optimized kernel",
    wm: "Hyprland",
    bar: "Waybar (Pywal colors)",
    terminals: ["Alacritty", "Kitty"],
    shell: ["Zsh", "Bash"],
    launchers: ["Rofi", "Wofi"],
    daemonsAndTools: ["Hyprlock", "Hypridle", "Mako", "Fastfetch", "Waypaper", "Cava", "Spicetify"],
    audioTuning: "PipeWire low-latency routing"
  },

  animeInterests: {
    description: "Avid anime watcher with a deep love for slice-of-life and rom-com narratives.",
    favorites: ["Bocchi the Rock!", "Chainsaw Man", "Jujutsu Kaisen", "Neon Genesis Evangelion"],
    genres: ["Slice of Life", "Rom-Com", "Action", "Psychological"]
  },

  gamingInterests: {
    description: "Lifelong gaming enthusiast balancing competitive tactical shooters with immersive single-player stories.",
    genres: ["Competitive Shooters", "Single-Player Narrative", "Action RPGs", "Rhythm Games"]
  }
};
