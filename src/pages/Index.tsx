
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import OverviewSection from "@/components/OverviewSection";
import FeaturedSection from "@/components/FeaturedSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <OverviewSection />
      <FeaturedSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
};

export default Index;
