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
    ],
    now: {
      note: "Lately, I’m learning to trust the process—coding whatever comes to mind, playing games, and watching a few anime. Taking things little by little and following my curiosity.",
      updated: "October 2026"
    }
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
          desktopUrl: "/assets/project screenshots/WebC/student new UI.png",
        },
        {
          label: "Faculty Dashboard",
          desktopUrl: "/assets/project screenshots/WebC/faculty⁄staff NEW UI.png",
        },
        {
          label: "Admin Dashboard",
          desktopUrl: "/assets/project screenshots/WebC/admin NEW UI.png",
        },
      ],
      highlights: [
        "Role-based clearance routing for students, departments, and administrators",
        "Microsoft Azure MSAL single sign-on integration for institutional accounts",
        "High-performance database operations powered by Drizzle ORM and Supabase PostgreSQL"
      ],
      story: {
        contribution: "I spent a lot of time trying out features and reworking WebC’s UI/UX. The visual style kept bothering me, so I kept changing it. I’m kind of satisfied with where it is now—for now.",
        learned: "Every time I thought I was satisfied, I eventually found something else to improve. WebC taught me that being happy with a version doesn’t mean there’s nothing left to work on."
      }
    },
    {
      id: "owlset",
      title: "OwlSet",
      subtitle: "Android app / Hackathon team project",
      problem: "Freelancers lose track of deliverables and revision terms scattered across client conversations, making additional requests difficult to assess.",
      role: "Frontend & application logic developer (Team Project)",
      stack: [
        "React Native",
        "Expo",
        "TypeScript",
        "SQLite",
        "Zod",
        "llama.rn"
      ],
      outcome: "An Android test build that drafts project scope, stores confirmed agreements, compares new requests, and prepares editable change proposals.",
      isTeamProject: true,
      featured: true,
      description: "A hackathon Android app helping freelancers turn client conversations into clear scope and review new requests against it.",
      longDescription: "Built with a hackathon team. Projects and versioned agreements stay in a local SQLite database. On-device AI suggests scope and request classifications for the freelancer to review; the user confirms terms and supplies prices and deadlines. The website presents a prepared interactive demo.",
      tags: [
        "React Native",
        "Expo",
        "SQLite",
        "On-device AI"
      ],
      githubUrl: "https://github.com/chimkenchrls/appbuildersph-hackathon",
      demoUrl: "https://owlsetph.vercel.app/",
      screenshots: [
        {
          label: "Product website",
          desktopUrl: "/assets/project screenshots/OwlSetPH/OwlSetPH Landing.png"
        }
      ],
      videoUrl: "/assets/project screenshots/OwlSetPH/OwlSetDemo.mp4",
      highlights: [
        "Local SQLite storage for projects and versioned agreements",
        "On-device inference with llama.rn and validated model output",
        "Request findings cite recorded scope and require human review"
      ]
    },
    {
      id: "sphere8",
      title: "Sphere8 Construction",
      subtitle: "Live client website",
      problem: "A construction company needed a clear digital presence for its services, project work, and prospective client inquiries.",
      role: "Lead Frontend Developer",
      stack: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Netlify Forms"
      ],
      outcome: "A live company website with 25 project images, category filters, a lightbox, and an inquiry form with an email fallback.",
      featured: true,
      description: "A design-and-build company website showcasing real projects and making client inquiries easier.",
      longDescription: "Built for Sphere8 Construction Corp. in Lucena City. The static site is prerendered at build time, includes company structured data, and uses Netlify Forms without a custom server.",
      tags: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS"
      ],
      githubUrl: "https://github.com/TwilightDust12/Sphere8",
      demoUrl: "https://spehere8construction.netlify.app/",
      screenshots: [
        {
          label: "Company website",
          desktopUrl: "/assets/project screenshots/Sphere8/Sphere8 Landing.png",
          mobileUrl: "/assets/project screenshots/Sphere8/Sphere8 Mobile.png"
        }
      ],
      highlights: [
        "Filterable project gallery with keyboard-accessible lightbox",
        "Netlify inquiry form with validation and email-draft fallback",
        "Prerendered HTML, structured data, sitemap, and responsive images"
      ]
    },
    {
      id: "lily-chou-chou",
      title: "The Ether — Lily Chou-Chou",
      subtitle: "Interactive film tribute",
      problem: "A film tribute needed to convey the atmosphere of All About Lily Chou-Chou through more than a conventional information page.",
      role: "Creator & Designer",
      stack: [
        "HTML",
        "CSS",
        "JavaScript",
        "Web Audio API"
      ],
      outcome: "An interactive film tribute with a still gallery, nine-track Discman listening room, and real-time audio visualizations.",
      featured: true,
      description: "A cinematic fan tribute exploring film landscapes, music, and imagined message-board conversations.",
      longDescription: "Built with native browser features and no runtime JavaScript dependencies. Visitors can change the opening landscape, explore film stills, and control a Discman-style HTML5 audio player with waveform and frequency views.",
      tags: [
        "HTML",
        "CSS",
        "JavaScript",
        "Web Audio API"
      ],
      githubUrl: "https://github.com/TwilightDust12/Lily-Chou-Chou-Fan-Tribute",
      demoUrl: "https://twilightdust12.github.io/Lily-Chou-Chou-Fan-Tribute/",
      screenshots: [
        {
          label: "Film tribute",
          desktopUrl: "/assets/project screenshots/lily-chou-chou-themed-portfolio/new UI.png",
          mobileUrl: "/assets/project screenshots/lily-chou-chou-themed-portfolio/UI REDESIGN MOBILE.PNG"
        }
      ],
      highlights: [
        "Discman player with seeking, volume, and Web Audio visualizations",
        "Keyboard-accessible still gallery with remembered landscape selection",
        "Theme switching, reduced-motion support, and motion pause control"
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
      featured: false,
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
        { name: "React Native / Expo" },
        { name: "SQLite" },
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
    genres: ["Slice of Life", "Rom-Com", "Action", "Psychological"],
    notes: [
      {
        title: "Re:Zero",
        reaction: "Just finished watching, and honestly, it was peak.",
        spoilerContent: "Seeing Subaru begin to accept himself and try to love himself more really stayed with me.",
        quote: "“You really are an amazing guy, Natsuki Subaru.”"
      }
    ]
  },

  gamingInterests: {
    description: "Lifelong gaming enthusiast balancing competitive tactical shooters with immersive single-player stories.",
    genres: ["Competitive Shooters", "Single-Player Narrative", "Action RPGs", "Rhythm Games"],
    notes: [
      {
        title: "Apex Legends",
        note: "I keep coming back for the ranked climb, even if I’ve been hardstuck for a while. Lately, I’m learning when to step back and give myself a break. The rank can wait."
      }
    ]
  }
};
