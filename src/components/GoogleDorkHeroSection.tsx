
import { Search, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const GoogleDorkHeroSection = () => {
  const scrollToDorks = () => {
    const element = document.getElementById("google-dorks");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white pt-20">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            Master Google Dork Techniques
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Learn advanced search operators to find hidden information and exposed data 
            for ethical cybersecurity research and penetration testing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              onClick={scrollToDorks}
              className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 min-w-[200px]"
            >
              🔍 Browse Dorks
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 min-w-[200px]"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              📚 Learn Techniques
            </Button>
          </div>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4">
                <Search className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Advanced Search</h3>
              <p className="text-gray-300">Powerful operators for targeted information discovery</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Security Research</h3>
              <p className="text-gray-300">Ethical techniques for vulnerability assessment</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4">
                <Lock className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Data Discovery</h3>
              <p className="text-gray-300">Find exposed files and sensitive information</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleDorkHeroSection;
