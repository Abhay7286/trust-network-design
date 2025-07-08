
import { Search, Database, Eye } from "lucide-react";

const OSINTHeroSection = () => {
  const scrollToTools = () => {
    const element = document.getElementById("osint-tools");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="osint-home" className="pt-20 pb-16 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gray-800 border border-gray-700 text-white px-6 py-3 rounded-full text-sm font-medium mb-8 font-inter">
            <Search size={16} />
            Open-Source Intelligence
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight text-white font-inter">
            Professional
            <span className="block text-gray-300">
              OSINT Tools Directory
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto font-inter">
            Discover the most effective open-source intelligence tools for cybersecurity research, 
            threat hunting, and investigative analysis.
          </p>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-2xl mb-4 border border-gray-700">
                <Database className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 font-inter">Domain Analysis</h3>
              <p className="text-gray-400 font-inter">Comprehensive domain and DNS investigation tools</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-2xl mb-4 border border-gray-700">
                <Search className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 font-inter">Asset Discovery</h3>
              <p className="text-gray-400 font-inter">Find and analyze internet-exposed assets</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-2xl mb-4 border border-gray-700">
                <Eye className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 font-inter">People Search</h3>
              <p className="text-gray-400 font-inter">Professional identity verification and research</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OSINTHeroSection;
