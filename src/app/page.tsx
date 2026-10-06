import NavigationBar from "@/components/layout/NavigationBar";
import HeroSection from "@/components/sections/HeroSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen text-slate-100 selection:bg-ethereal-violet/30">
      <NavigationBar />
      <HeroSection />
      <Footer />
    </main>
  );
}
