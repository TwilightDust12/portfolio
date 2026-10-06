import NavigationBar from "@/components/layout/NavigationBar";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AboutSection from "@/components/sections/AboutSection";
import TechStackSection from "@/components/sections/TechStackSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen text-ivory-100 selection:bg-zinc-800 selection:text-white">
      <NavigationBar />
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <TechStackSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
