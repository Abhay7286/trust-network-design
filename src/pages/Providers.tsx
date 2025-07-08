
import Navigation from "@/components/Navigation";
import ProvidersHeroSection from "@/components/ProvidersHeroSection";
import CybersecurityProvidersSection from "@/components/CybersecurityProvidersSection";
import Footer from "@/components/Footer";

const Providers = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <ProvidersHeroSection />
      <CybersecurityProvidersSection />
      <Footer />
    </div>
  );
};

export default Providers;
