
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-green-900/20"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%234F46E5" fill-opacity="0.05"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Hero Icon */}
          <div className="mb-8 flex justify-center">
            <div className="p-6 bg-blue-500/20 rounded-full border border-blue-400/30 backdrop-blur-sm">
              <Shield size={80} className="text-blue-400" />
            </div>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Protect Your Business with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
              Advanced Cybersecurity
            </span>{" "}
            Solutions
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Comprehensive penetration testing, risk management, and security consulting 
            to safeguard your digital assets from evolving cyber threats.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={scrollToContact}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Contact Us Today
            </Button>
            <Button
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              variant="outline"
              className="border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Our Services
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <Shield size={20} className="text-green-400" />
              <span>24/7 Security Monitoring</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={20} className="text-blue-400" />
              <span>Certified Experts</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={20} className="text-green-400" />
              <span>Enterprise-Grade Protection</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
