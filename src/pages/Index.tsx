
import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import BenefitsSection from "@/components/BenefitsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <BenefitsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
