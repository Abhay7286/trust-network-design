
import Navigation from "@/components/Navigation";
import GoogleDorkHeroSection from "@/components/GoogleDorkHeroSection";
import GoogleDorkExamplesSection from "@/components/GoogleDorkExamplesSection";
import Footer from "@/components/Footer";

const GoogleDork = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <GoogleDorkHeroSection />
      <GoogleDorkExamplesSection />
      <Footer />
    </div>
  );
};

export default GoogleDork;
