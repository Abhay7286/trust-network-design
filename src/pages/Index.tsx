
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProvidersSection from "@/components/ProvidersSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      <HeroSection />
      <ProvidersSection />
      <Footer />
    </div>
  );
};

export default Index;
