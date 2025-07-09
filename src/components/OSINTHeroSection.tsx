
import { Search, Database, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const OSINTHeroSection = () => {
  const scrollToTools = () => {
    const element = document.getElementById("osint-tools");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white pt-20 pb-20">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            Professional OSINT Tools Directory
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto mt-4">
            Discover the most effective open-source intelligence tools for cybersecurity research, 
            threat hunting, and investigative analysis.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 mt-8">
            <Button 
              onClick={scrollToTools}
              className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 min-w-[200px]"
            >
              🧰 Explore Tools
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 min-w-[200px]"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              📋 Browse Categories
            </Button>
          </div>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4">
                <Database className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Domain Analysis</h3>
              <p className="text-gray-300">Comprehensive domain and DNS investigation tools</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4">
                <Search className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Asset Discovery</h3>
              <p className="text-gray-300">Find and analyze internet-exposed assets</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4">
                <Eye className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">People Search</h3>
              <p className="text-gray-300">Professional identity verification and research</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OSINTHeroSection;
