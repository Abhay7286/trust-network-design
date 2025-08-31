import Navigation from "@/components/Navigation";
import GoogleDorkHeroSection from "@/components/GoogleDorkHeroSection";
import GoogleDorkExamplesSection from "@/components/GoogleDorkExamplesSection";
import GoogleDorkPlaygroundSection from "@/components/GoogleDorkPlaygroundSection";
import GoogleDorkTipsSection from "@/components/GoogleDorkTipsSection";
import Footer from "@/components/Footer";

const GoogleDork = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-muted/20 flex flex-col items-center">
      <Navigation />
      <main className="flex-grow w-full px-2 sm:px-4">
        <GoogleDorkHeroSection />
        <GoogleDorkPlaygroundSection />
        <GoogleDorkExamplesSection />
        <GoogleDorkTipsSection />
      </main>
      <Footer />
    </div>
  );
};

export default GoogleDork;
