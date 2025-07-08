
import { Shield, Search, Users } from "lucide-react";

const ProvidersHeroSection = () => {
  const scrollToProviders = () => {
    const element = document.getElementById("providers");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="providers-home" className="pt-20 pb-16 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-6 py-3 rounded-full text-sm font-medium mb-8">
            <Shield size={16} />
            Trusted Directory
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight text-white">
            Find the Right
            <span className="block bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Cybersecurity Service
            </span>
            Provider
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto">
            Discover vetted cybersecurity professionals and companies specializing in penetration testing, 
            OSINT, risk management, security consulting, and data protection services.
          </p>
          
          {/* CTA Button */}
          <button
            onClick={scrollToProviders}
            className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 mb-16"
          >
            Browse Providers
          </button>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-2xl mb-4">
                <Shield className="text-blue-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Vetted Providers</h3>
              <p className="text-gray-400">Carefully screened cybersecurity professionals</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-2xl mb-4">
                <Search className="text-green-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Multiple Specializations</h3>
              <p className="text-gray-400">Comprehensive range of security services</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-2xl mb-4">
                <Users className="text-purple-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Trusted Network</h3>
              <p className="text-gray-400">Connect with reputable security experts</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProvidersHeroSection;
