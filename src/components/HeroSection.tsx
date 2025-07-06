
import { Search, Shield, Eye, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToProviders = () => {
    const element = document.getElementById("providers");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/5 to-transparent rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-6 py-3 rounded-full text-sm font-medium mb-8">
              <Search size={16} />
              Open-Source Intelligence
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight text-white">
              Discover Trusted
              <span className="block bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                OSINT Service Providers
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto">
              Access comprehensive Open-Source Intelligence services to gather, analyze, and leverage 
              publicly available data for cybersecurity investigations, threat hunting, and strategic decision-making.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button
                onClick={scrollToProviders}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Find Providers
              </Button>
              <Button
                variant="outline"
                className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300"
              >
                Learn About OSINT
              </Button>
            </div>
            
            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-2xl mb-4">
                  <Database className="text-blue-400" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Data Collection</h3>
                <p className="text-gray-400">Comprehensive gathering from public sources</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-2xl mb-4">
                  <Eye className="text-green-400" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Threat Intelligence</h3>
                <p className="text-gray-400">Advanced analysis and threat detection</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-2xl mb-4">
                  <Shield className="text-purple-400" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Security Research</h3>
                <p className="text-gray-400">Professional investigative services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
