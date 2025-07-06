
import { Shield, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
                <Shield size={16} />
                Cybersecurity Excellence
              </div>
              
              {/* Main Headline */}
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
                Protect Your Business with
                <span className="block text-blue-600">Advanced Security</span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                Comprehensive penetration testing, risk management, and security consulting 
                to safeguard your digital assets from cyber threats.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  onClick={scrollToContact}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300 inline-flex items-center gap-2"
                >
                  Get Started Today
                  <ArrowRight size={20} />
                </Button>
                <Button
                  onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                  variant="outline"
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 inline-flex items-center gap-2"
                >
                  <Play size={20} />
                  Watch Demo
                </Button>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-8 text-gray-600">
                <div>
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm">Businesses Protected</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">99.9%</div>
                  <div className="text-sm">Uptime Guarantee</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm">Support Available</div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Visual */}
            <div className="relative">
              <div className="relative z-10">
                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Shield size={32} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">SecureShield</h3>
                      <p className="text-gray-600">Cybersecurity Dashboard</p>
                    </div>
                  </div>
                  
                  {/* Mock Dashboard Elements */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-green-800 font-medium">Security Status</span>
                      <span className="text-green-600 font-bold">PROTECTED</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">0</div>
                        <div className="text-sm text-gray-600">Active Threats</div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">24/7</div>
                        <div className="text-sm text-gray-600">Monitoring</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Last scan: 2 minutes ago
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Background decorative elements */}
              <div className="absolute top-4 right-4 w-24 h-24 bg-blue-200 rounded-full opacity-20"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-green-200 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
