import { PortfolioConfig } from "@/types/portfolio";

export const portfolioData: PortfolioConfig = {
  personal: {
    name: "Jose Raphael Jaro",
    title: "Aspiring Full-Stack Developer",
    tagline: "Doing things, little by little. Building responsive web systems, intuitive user interfaces, and clean code at the intersection of modern full-stack development, Wayland Linux environments, and expressive personal aesthetics.",
    bioParagraphs: [
      "Doing things, little by little. Building responsive web systems, intuitive user interfaces, and clean code at the intersection of modern full-stack development, Wayland Linux environments, and expressive personal aesthetics.",
      "Actively seeking an On-the-Job Training (OJT) / internship role to contribute full-stack capabilities in a production software team."
    ],
    location: "Lucena City, Quezon Province, Philippines",
    email: "jyrum12@gmail.com",
    availability: "Seeking OJT / Internship Opportunities",
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
      username: "Jyrum Jaro"
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
      id: "exp-thesis",
      role: "Full-Stack Developer (Team Project)",
      company: "WebC Student Clearance System",
      period: "2024 — Present",
      location: "STI College Lucena",
      description: [
        "Architecting and developing centralized multi-role student clearance web portal using Next.js 15, Supabase, and Drizzle ORM.",
        "Engineering automated clearance approval pipelines across academic departments and integrating institutional Microsoft Azure MSAL login."
      ],
      technologies: ["Next.js 15", "TypeScript", "Supabase", "Drizzle ORM", "Microsoft Azure MSAL", "Tailwind CSS"]
    },
    {
      id: "exp-sphere8",
      role: "Lead Frontend & Full-Stack Developer",
      company: "Sphere8 Construction",
      period: "2024 — Present",
      location: "Lucena City, PH",
      description: [
        "Engineering modern corporate web portal featuring structured showcase galleries and direct service inquiry funnels.",
        "Refining responsive design, component performance, and client intake workflows using Next.js and Tailwind CSS."
      ],
      technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript"]
    },
    {
      id: "exp-codearts",
      role: "Vice President",
      company: "CodeArts Online",
      period: "2021 — 2023",
      location: "STI College Lucena",
      description: [
        "Led coding workshops, student digital arts collaborations, and technical showcases.",
        "Mentored peer members on web development fundamentals and creative programming."
      ],
      technologies: ["Web Development", "Leadership", "Creative Technology"]
    }
  ],

  education: [
    {
      id: "edu-cs",
      degree: "Bachelor of Science in Computer Science",
      institution: "STI College Lucena",
      period: "2023 — 2027",
      location: "Lucena City, Philippines",
      details: [
        "Focused on modern full-stack web architectures, algorithms, systems design, and database engineering.",
        "Developing WebC Thesis Capstone Portal as primary academic software engineering project."
      ]
    },
    {
      id: "edu-shs",
      degree: "Senior High School (STEM)",
      institution: "STI College Lucena",
      period: "2021 — 2023",
      location: "Lucena City, Philippines",
      honors: "Graduated with High Honors (95 average)",
      details: [
        "Served as Vice President of CodeArts Online (coding and digital arts club).",
        "Graduated with High Honors with an overall grade average of 95."
      ]
    },
    {
      id: "edu-sps",
      degree: "Elementary & Junior High School",
      institution: "Saint Philomena School",
      period: "2012 — 2021",
      location: "Lucena City, Philippines",
      details: [
        "Foundational education with early immersion in computing, mathematics, and logic."
      ]
    }
  ],

  projects: [
    {
      id: "webc",
      title: "WebC — Student Clearance System",
      subtitle: "Thesis Capstone Portal",
      isTeamProject: true,
      role: "Full-Stack Developer (Team Project)",
      problem: "Manual, paper-reliant academic clearance workflows cause bottlenecks, delayed graduation filings, and lost records between college departments.",
      stack: ["Next.js 15", "TypeScript", "Supabase", "Drizzle ORM", "Microsoft Azure MSAL", "Tailwind CSS"],
      outcome: "Centralized multi-role web portal featuring role-based dashboards (Student, Department, Admin), automated clearance approval pipelines, and institutional Azure login.",
      description: "Centralized multi-role web portal featuring role-based dashboards (Student, Department, Admin), automated clearance approval pipelines, and institutional Azure login.",
      longDescription: "Manual, paper-reliant academic clearance workflows cause bottlenecks, delayed graduation filings, and lost records between college departments. WebC provides a centralized multi-role web portal featuring role-based dashboards (Student, Department, Admin), automated clearance approval pipelines, and institutional Azure login.",
      tags: ["Next.js 15", "TypeScript", "Supabase", "Drizzle ORM", "Microsoft Azure MSAL", "Tailwind CSS"],
      featured: true,
      githubUrl: "https://github.com/sudosetnametoAsh/next-webc",
      highlights: [
        "Role-based dashboards tailored for Students, Academic Departments, and Administrators",
        "Automated clearance approval pipelines with real-time verification and record keeping",
        "Institutional single sign-on integration via Microsoft Azure MSAL"
      ]
    },
    {
      id: "sphere8",
      title: "Sphere8 Construction Company Website",
      subtitle: "Commercial Client Portal",
      isTeamProject: false,
      role: "Lead Frontend & Full-Stack Developer",
      problem: "Traditional construction contracting suffers from friction in client intake and fragmented offline project portfolios.",
      stack: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
      outcome: "Modern corporate web portal featuring structured showcase galleries and direct service inquiry funnels (In Active Development).",
      description: "Modern corporate web portal featuring structured showcase galleries and direct service inquiry funnels (In Active Development).",
      longDescription: "Traditional construction contracting suffers from friction in client intake and fragmented offline project portfolios. Developed a modern corporate web portal featuring structured showcase galleries and direct service inquiry funnels (In Active Development).",
      tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
      featured: true,
      highlights: [
        "Structured portfolio showcase galleries highlighting ongoing and completed construction contracts",
        "Interactive intake and inquiry funnels reducing client onboard friction",
        "High-performance responsive architecture built with Next.js and Tailwind CSS"
      ]
    },
    {
      id: "lily-chou-chou",
      title: "All About Lily Chou-Chou Themed Portfolio",
      subtitle: "Creative Ambient Sound Archive",
      isTeamProject: false,
      role: "Creator & Designer",
      problem: "Conventional portfolios lack sensory identity and emotional depth.",
      stack: ["Next.js", "Tailwind CSS", "Web Audio API", "TypeScript"],
      outcome: "Atmospheric web archive integrating real-time Web Audio API ambient sound synthesis, filmic scanlines, and retro typography.",
      description: "Atmospheric web archive integrating real-time Web Audio API ambient sound synthesis, filmic scanlines, and retro typography.",
      longDescription: "Conventional portfolios lack sensory identity and emotional depth. Engineered an atmospheric web archive integrating real-time Web Audio API ambient sound synthesis, filmic scanlines, and retro typography inspired by Shunji Iwai's film.",
      tags: ["Next.js", "Tailwind CSS", "Web Audio API", "TypeScript"],
      featured: true,
      githubUrl: "https://github.com/TwilightDust12/lily-chou-chou-themed-portfolio",
      demoUrl: "https://twilightdust12.github.io/lily-chou-chou-themed-portfolio/",
      artAttribution: "Inspired by Shunji Iwai's film All About Lily Chou-Chou (2001)",
      highlights: [
        "Real-time Web Audio API ambient sound synthesis and interactive soundscape player",
        "Custom CRT scanlines, optical vignette shader effects, and retro typography",
        "Fluid responsive design with zero layout shift"
      ]
    },
    {
      id: "wayland-rice",
      title: "Wayland Rice & Dotfiles",
      subtitle: "Dynamic CachyOS Environment",
      isTeamProject: false,
      role: "Maintainer & Ricer",
      problem: "Default desktop environments lack workflow efficiency and cohesive visual customization.",
      stack: ["CachyOS", "Hyprland", "Waybar", "Pywal", "Bash", "PipeWire"],
      outcome: "Automated Wayland rice environment with dynamic wallpaper-extracted color palettes, custom IPC status bars, and low-latency audio daemons.",
      description: "Automated Wayland rice environment with dynamic wallpaper-extracted color palettes, custom IPC status bars, and low-latency audio daemons.",
      longDescription: "Default desktop environments lack workflow efficiency and cohesive visual customization. Engineered an automated Wayland rice environment with dynamic wallpaper-extracted color palettes, custom IPC status bars, and low-latency audio daemons on CachyOS.",
      tags: ["CachyOS", "Hyprland", "Waybar", "Pywal", "Bash", "PipeWire"],
      featured: true,
      githubUrl: "https://github.com/TwilightDust12",
      highlights: [
        "Dynamic palette extraction across Waybar, Alacritty/Kitty, and system UI via Pywal",
        "Custom Waybar modules with dynamic IPC socket listeners and hardware telemetry",
        "Low-latency PipeWire audio daemon routing and custom system scripts"
      ]
    }
  ],

  skills: [
    {
      category: "Frontend",
      description: "Modern component-driven web architectures, typing systems, and utility styling.",
      skills: [
        { name: "Next.js", level: "Advanced" },
        { name: "React", level: "Advanced" },
        { name: "TypeScript", level: "Advanced" },
        { name: "Tailwind CSS", level: "Advanced" },
        { name: "Vite", level: "Proficient" },
        { name: "Bootstrap", level: "Proficient" }
      ]
    },
    {
      category: "Backend & Data",
      description: "Runtime environments, relational persistence, ORM tooling, and enterprise frameworks.",
      skills: [
        { name: "Node.js", level: "Proficient" },
        { name: "Supabase", level: "Proficient" },
        { name: "Drizzle ORM", level: "Proficient" },
        { name: "SQL Server", level: "Proficient" },
        { name: "ASP.NET (Web Forms & MVC)", level: "Familiar" }
      ]
    },
    {
      category: "DevOps & QA",
      description: "Containerization, automated CI/CD pipelines, end-to-end testing, and version control.",
      skills: [
        { name: "Docker", level: "Proficient" },
        { name: "GitHub Actions", level: "Proficient" },
        { name: "Playwright", level: "Proficient" },
        { name: "Git & GitHub", level: "Advanced" }
      ]
    },
    {
      category: "Mobile & Game Dev",
      description: "Native Android application engineering and interactive game development.",
      skills: [
        { name: "Android (Kotlin, Jetpack Compose, Room, MVVM)", level: "Proficient" },
        { name: "Unity (C#)", level: "Familiar" }
      ]
    },
    {
      category: "Tools & Linux",
      description: "Arch-based desktop distributions, Wayland compositors, IPC status bars, and shell automation.",
      skills: [
        { name: "CachyOS", level: "Advanced" },
        { name: "Hyprland", level: "Advanced" },
        { name: "Waybar", level: "Advanced" },
        { name: "Bash", level: "Advanced" },
        { name: "Linux Administration", level: "Proficient" }
      ]
    }
  ],

  certifications: [],

  riceSpec: {
    os: "CachyOS",
    kernel: "Arch Linux optimized kernel",
    wm: "Hyprland (Dynamic tiling Wayland compositor)",
    bar: "Waybar (Dynamic Pywal theming)",
    terminals: ["Alacritty", "Kitty (GPU-accelerated)"],
    shell: ["Zsh", "Bash"],
    launchers: ["Rofi (Wayland fork)", "Wofi"],
    daemonsAndTools: ["Hyprlock", "Hypridle", "Mako", "Fastfetch", "Waypaper", "Cava", "Spicetify"],
    audioTuning: "PipeWire low-latency configuration"
  },

  animeInterests: {
    description: "Avid anime watcher and reviewer with a deep appreciation for slice-of-life and rom-com narratives.",
    favorites: ["Bocchi the Rock!", "Chainsaw Man", "Jujutsu Kaisen", "Neon Genesis Evangelion"],
    genres: ["Slice of Life", "Romantic Comedy", "Psychological Thriller", "Supernatural / Action"]
  },

  gamingInterests: {
    description: "Lifelong gaming enthusiast balanced between high-focus competitive shooters and immersive single-player adventures.",
    genres: ["Competitive Tactical Shooters", "Immersive Single-Player Adventures", "Rhythm Games"],
    favorites: ["Tactical Shooters", "Story-driven RPGs", "Rhythm Games"]
  },

  artworkAttributions: [
    {
      asset: "bocchifunni.jpg",
      character: "Hitori Gotoh (Bocchi)",
      source: "Bocchi the Rock!",
      studio: "CloverWorks",
      copyrightNotice: "© Aki Hamaji / Houbunsha, Aniplex, CloverWorks",
      context: "Interactive mascot sticker with hover dialogue"
    },
    {
      asset: "reze.jpg",
      character: "Reze (Bomb Girl)",
      source: "Chainsaw Man",
      studio: "MAPPA",
      copyrightNotice: "© Tatsuki Fujimoto / Shueisha, MAPPA",
      context: "Visual accent and anime culture interest showcase"
    },
    {
      asset: "rika.png",
      character: "Rika Orimoto",
      source: "Jujutsu Kaisen 0",
      studio: "MAPPA",
      copyrightNotice: "© Gege Akutami / Shueisha, JUJUTSU KAISEN Project, MAPPA",
      context: "Visual accent and anime culture interest showcase"
    },
    {
      asset: "evangelion.jpg",
      character: "Rei Ayanami / Evangelion Unit-01",
      source: "Neon Genesis Evangelion",
      studio: "Studio Khara / Gainax",
      copyrightNotice: "© khara / Gainax",
      context: "Aesthetic inspiration for Swiss-Japanese typography and HUD framing"
    },
    {
      asset: "gojo.jpg",
      character: "Satoru Gojo",
      source: "Jujutsu Kaisen",
      studio: "MAPPA",
      copyrightNotice: "© Gege Akutami / Shueisha, MAPPA",
      context: "Aesthetic inspiration for high-contrast neon accents and typography"
    }
  ]
};
