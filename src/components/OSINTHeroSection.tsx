
import { Search, Database, Eye } from "lucide-react";

const OSINTHeroSection = () => {
  const scrollToTools = () => {
    const element = document.getElementById("osint-tools");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="osint-home" className="pt-20 pb-16 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-6 py-3 rounded-full text-sm font-medium mb-8">
            <Search size={16} />
            Open-Source Intelligence
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight text-white">
            Professional
            <span className="block bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              OSINT Tools Directory
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto">
            Discover the most effective open-source intelligence tools for cybersecurity research, 
            threat hunting, and investigative analysis.
          </p>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-2xl mb-4">
                <Database className="text-blue-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Domain Analysis</h3>
              <p className="text-gray-400">Comprehensive domain and DNS investigation tools</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-2xl mb-4">
                <Search className="text-green-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Asset Discovery</h3>
              <p className="text-gray-400">Find and analyze internet-exposed assets</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-2xl mb-4">
                <Eye className="text-purple-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">People Search</h3>
              <p className="text-gray-400">Professional identity verification and research</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OSINTHeroSection;
