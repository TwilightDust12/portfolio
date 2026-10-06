import NavigationBar from "@/components/layout/NavigationBar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TechStackSection from "@/components/sections/TechStackSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen text-slate-100 selection:bg-ethereal-violet/30">
      <NavigationBar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <TechStackSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

