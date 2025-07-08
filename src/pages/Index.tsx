
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedProvidersSection from "@/components/FeaturedProvidersSection";
import TopOSINTSection from "@/components/TopOSINTSection";
import PopularGoogleDorksSection from "@/components/PopularGoogleDorksSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      <HeroSection />
      <FeaturedProvidersSection />
      <TopOSINTSection />
      <PopularGoogleDorksSection />
      <Footer />
    </div>
  );
};

export default Index;
