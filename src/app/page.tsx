import { ScrollEffects } from "@/components/ui/ScrollEffects";
import { BackgroundPixelStars } from "@/components/ui/background-pixel-stars";
import WaybarHeader from "@/components/layout/WaybarHeader";
import HeroSection from "@/components/sections/HeroSection";
import ChronicleSection from "@/components/sections/ChronicleSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import GithubSection from "@/components/sections/GithubSection";
import ArsenalSection from "@/components/sections/ArsenalSection";
import { MoodSection } from "@/components/sections/MoodSection";
import ContactSection from "@/components/sections/ContactSection";
import ColophonFooter from "@/components/layout/ColophonFooter";

export default function Home() {
  return (
    <div className="page-shell">
      <div className="page-stars" aria-hidden="true">
        <BackgroundPixelStars />
      </div>
      <ScrollEffects />
      <WaybarHeader />
      <main id="main-content">
        <HeroSection />
        <div className="creative-interlude" aria-hidden="true">
          <div className="interlude-track"><span>Build for people.</span><span className="interlude-outline">Make it personal.</span></div>
        </div>
        <ProjectsSection />
        <GithubSection />
        <ArsenalSection />
        <ChronicleSection />
        <MoodSection />
        <ContactSection />
      </main>
      <ColophonFooter />
    </div>
  );
}
