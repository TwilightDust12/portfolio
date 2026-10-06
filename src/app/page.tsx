"use client";

import React, { useState, useEffect } from "react";
import SidebarNav from "@/components/layout/SidebarNav";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TechStackSection from "@/components/sections/TechStackSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";
import { ArrowUp } from "lucide-react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 400);

      const sections = ["home", "about", "projects", "stack", "certifications", "contact"];
      const scrollPos = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 flex flex-col lg:flex-row relative">
      {/* Persistent Left Sidebar */}
      <SidebarNav
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Scrollable Canvas with Dot Matrix Background */}
      <div className="flex-1 lg:pl-64 min-h-screen dot-matrix-bg pt-14 lg:pt-0">
        <main className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <TechStackSection />
          <CertificationsSection />
          <ContactSection />
        </main>

        {/* Floating Back to Top Button */}
        {showTopButton && (
          <button
            onClick={scrollToTop}
            className="btn-press fixed bottom-6 right-6 z-40 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-950/90 backdrop-blur text-zinc-400 hover:text-white font-mono text-[11px] flex items-center gap-1.5 shadow-2xl transition-all"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>TOP</span>
          </button>
        )}
      </div>
    </div>
  );
}
