
import { Shield, Lock, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Digital Security Icons */}
          <div className="flex justify-center items-center gap-8 mb-12">
            <div className="p-4 bg-blue-500/10 rounded-full border border-blue-500/20">
              <Shield size={48} className="text-blue-400" />
            </div>
            <div className="p-4 bg-green-500/10 rounded-full border border-green-500/20">
              <Lock size={48} className="text-green-400" />
            </div>
            <div className="p-4 bg-purple-500/10 rounded-full border border-purple-500/20">
              <Network size={48} className="text-purple-400" />
            </div>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl lg:text-8xl font-bold mb-8 leading-tight text-white">
            Explore the
            <span className="block bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent">
              Cybersecurity Web
            </span>
          </h1>
          
          <h2 className="text-2xl lg:text-4xl font-semibold mb-8 text-gray-300">
            Tools, Services & Intelligence, All in One Place
          </h2>
          
          {/* Subheadline */}
          <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-4xl mx-auto">
            Your comprehensive directory for discovering trusted cybersecurity service providers, 
            advanced OSINT tools, and powerful Google Dork techniques. Navigate the digital security landscape with confidence.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to="/providers">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-10 py-6 text-xl font-bold rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1">
                Discover Providers
              </Button>
            </Link>
            <Link to="/osint">
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-10 py-6 text-xl font-bold rounded-lg shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:-translate-y-1">
                Explore OSINT Tools
              </Button>
            </Link>
            <Link to="/google-dork">
              <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-10 py-6 text-xl font-bold rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-1">
                Master Google Dorks
              </Button>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
              <div className="text-3xl font-bold text-blue-400 mb-2">30+</div>
              <div className="text-gray-300">Trusted Providers</div>
            </div>
            <div className="text-center p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
              <div className="text-3xl font-bold text-green-400 mb-2">20+</div>
              <div className="text-gray-300">OSINT Tools</div>
            </div>
            <div className="text-center p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
              <div className="text-3xl font-bold text-purple-400 mb-2">20+</div>
              <div className="text-gray-300">Google Dorks</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
