import WaybarHeader from "@/components/layout/WaybarHeader";
import HeroSection from "@/components/sections/HeroSection";
import ChronicleSection from "@/components/sections/ChronicleSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ArsenalSection from "@/components/sections/ArsenalSection";
import { MoodSection } from "@/components/sections/MoodSection";
import ContactSection from "@/components/sections/ContactSection";
import ColophonFooter from "@/components/layout/ColophonFooter";

export default function Home() {
  return (
    <div className="page-shell">
      <WaybarHeader />
      <main id="main-content">
        <HeroSection />
        <ProjectsSection />
        <ArsenalSection />
        <ChronicleSection />
        <MoodSection />
        <ContactSection />
      </main>
      <ColophonFooter />
    </div>
  );
}
