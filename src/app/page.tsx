import { PortfolioExperience } from "@/components/providers/PortfolioExperience";
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
    <PortfolioExperience
      personal={<><GithubSection /><MoodSection /></>}
      contact={<ContactSection />}
      footer={<ColophonFooter />}
    >
        <HeroSection />
        <ProjectsSection />
        <ArsenalSection />
        <ChronicleSection />
    </PortfolioExperience>
  );
}
