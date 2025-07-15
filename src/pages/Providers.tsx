
import Navigation from "@/components/Navigation";
import ProvidersHeroSection from "@/components/ProvidersHeroSection";
import ProvidersSection from "@/components/ProvidersSection";
import FeaturedProvidersSection from "@/components/FeaturedProvidersSection";
import Footer from "@/components/Footer";

const Providers = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      <ProvidersHeroSection />
      <FeaturedProvidersSection />
      <ProvidersSection />
      <Footer />
    </div>
  );
};

export default Providers;
