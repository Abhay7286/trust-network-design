
import { Shield, Users, Lock } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">SecureShield</span>
            </h2>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              With over a decade of experience in cybersecurity, SecureShield is your trusted partner 
              in digital protection. We specialize in comprehensive security solutions that adapt 
              to the evolving threat landscape.
            </p>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Our team of certified security experts works around the clock to ensure your business 
              stays protected from cyber threats, data breaches, and compliance risks. We believe 
              in proactive security that prevents problems before they occur.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Shield size={24} className="text-blue-400" />
                </div>
                <span className="text-lg">10+ Years of Security Excellence</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Users size={24} className="text-green-400" />
                </div>
                <span className="text-lg">500+ Businesses Protected</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Lock size={24} className="text-blue-400" />
                </div>
                <span className="text-lg">99.9% Threat Prevention Rate</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600/20 to-green-600/20 rounded-2xl p-8 border border-blue-400/30 backdrop-blur-sm">
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop&crop=center"
                alt="Cybersecurity Technology"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Cutting-Edge Technology
                </h3>
                <p className="text-gray-300">
                  We leverage the latest cybersecurity technologies and methodologies 
                  to provide comprehensive protection for your digital infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
