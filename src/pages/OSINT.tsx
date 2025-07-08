
import Navigation from "@/components/Navigation";
import OSINTHeroSection from "@/components/OSINTHeroSection";
import OSINTProvidersSection from "@/components/OSINTProvidersSection";
import Footer from "@/components/Footer";

const OSINT = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <OSINTHeroSection />
      <OSINTProvidersSection />
      <Footer />
    </div>
  );
};

export default OSINT;
