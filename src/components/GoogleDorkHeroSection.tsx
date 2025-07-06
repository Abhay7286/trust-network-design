
import { Search, Shield, Eye } from "lucide-react";

const GoogleDorkHeroSection = () => {
  const scrollToExamples = () => {
    const element = document.getElementById("google-dork-examples");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="google-dork-home" className="pt-20 pb-16 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-6 py-3 rounded-full text-sm font-medium mb-8">
            <Search size={16} />
            Advanced Search Techniques
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight text-white">
            Master
            <span className="block bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Google Dorking
            </span>
            for OSINT & Ethical Hacking
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto">
            Learn advanced Google search operators to find hidden or exposed information 
            indexed by search engines. Master these techniques for ethical OSINT research 
            and cybersecurity investigations.
          </p>
          
          {/* CTA Button */}
          <button
            onClick={scrollToExamples}
            className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 mb-16"
          >
            Explore Google Dorks
          </button>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-2xl mb-4">
                <Search className="text-blue-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Advanced Search</h3>
              <p className="text-gray-400">Use powerful operators to find specific information</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-2xl mb-4">
                <Eye className="text-green-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">OSINT Research</h3>
              <p className="text-gray-400">Gather intelligence from publicly available data</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-2xl mb-4">
                <Shield className="text-purple-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Ethical Hacking</h3>
              <p className="text-gray-400">Discover vulnerabilities and exposed information</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleDorkHeroSection;
