"use client";

import React from "react";
import WaybarHeader from "@/components/layout/WaybarHeader";
import HeroSection from "@/components/sections/HeroSection";
import ChronicleSection from "@/components/sections/ChronicleSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ArsenalSection from "@/components/sections/ArsenalSection";
import ContactSection from "@/components/sections/ContactSection";
import ColophonFooter from "@/components/layout/ColophonFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-ink dot-matrix-bg selection:bg-accent-pink/30 selection:text-ink relative transition-colors duration-200">
      {/* Waybar Floating Top Bar (Desktop) & Bottom Dock (Mobile) */}
      <WaybarHeader />

      {/* Main Accessible Content Region */}
      <main id="main-content" className="w-full">
        {/* Chapter 01: Hero & Identity Telemetry */}
        <HeroSection />

        {/* Chapter 02: Chronicle, Academia & Wayland Rice Environment */}
        <ChronicleSection />

        {/* Chapter 03: Selected Works & Case Study Modals */}
        <ProjectsSection />

        {/* Chapter 04: Verified Tech Arsenal & Instruments */}
        <ArsenalSection />

        {/* Chapter 05: Transmission & Social Matrix */}
        <ContactSection />
      </main>

      {/* Terminal Colophon & Palette Specs */}
      <ColophonFooter />
    </div>
  );
}
