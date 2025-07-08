
import { Button } from "@/components/ui/button";

const ProvidersHeroSection = () => {
  const scrollToProviders = () => {
    const element = document.getElementById("providers");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            Trusted Cybersecurity Service Providers
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Connect with verified cybersecurity professionals and companies offering specialized 
            services across penetration testing, risk management, and security consulting.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              onClick={scrollToProviders}
              className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 min-w-[200px]"
            >
              🛡️ Browse Providers
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 min-w-[200px]"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              📊 View Categories
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProvidersHeroSection;
