
import { Shield, Network, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Shield size={32} className="text-blue-400" />
              <span className="text-2xl font-bold text-white">CyberDirectory</span>
            </div>
            <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
              Your comprehensive directory for cybersecurity tools, services, and intelligence resources. 
              Connecting you with trusted providers and powerful research tools.
            </p>
            <p className="text-sm text-gray-500">
              CyberDirectory is an informational aggregator showcasing third-party cybersecurity resources. 
              We do not provide services directly but guide you to qualified professionals and tools.
            </p>
          </div>
          
          {/* Quick Access */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Access</h4>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/providers" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                <Shield size={16} />
                Service Providers
              </Link>
              <Link to="/osint" className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2">
                <Network size={16} />
                OSINT Tools
              </Link>
              <Link to="/google-dork" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2">
                <Lock size={16} />
                Google Dorks
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-6 md:mb-0">
            © 2024 CyberDirectory. Informational directory only.
          </div>
          <div className="flex space-x-4">
            <div className="p-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-500/20">
              <Shield size={20} className="text-blue-400" />
            </div>
            <div className="p-3 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg border border-green-500/20">
              <Network size={20} className="text-green-400" />
            </div>
            <div className="p-3 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-lg border border-purple-500/20">
              <Lock size={20} className="text-purple-400" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
