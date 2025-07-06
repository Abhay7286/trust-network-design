
import { Shield, Mail, Phone, Linkedin, Twitter, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 border-t border-gray-800 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Shield size={32} className="text-blue-400" />
              <span className="text-2xl font-bold text-white">CyberDirectory</span>
            </div>
            <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
              Your trusted directory for cybersecurity tools, OSINT services, and security providers. 
              Connecting professionals with the best security solutions available.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail size={18} />
                <span>contact@cyberdirectory.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone size={18} />
                <span>+1 (555) 123-CYBER</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">Find Providers</Link></li>
              <li><Link to="/osint" className="text-gray-400 hover:text-blue-400 transition-colors">OSINT Tools</Link></li>
              <li><Link to="/google-dork" className="text-gray-400 hover:text-blue-400 transition-colors">Google Dork</Link></li>
              <li><a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Security Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Tool Reviews</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Best Practices</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        {/* Social Media & Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-6 md:mb-0">
            © 2024 CyberDirectory. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="p-3 bg-gray-800 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:shadow-md">
              <Linkedin size={20} className="text-gray-400 hover:text-white" />
            </a>
            <a href="#" className="p-3 bg-gray-800 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:shadow-md">
              <Twitter size={20} className="text-gray-400 hover:text-white" />
            </a>
            <a href="#" className="p-3 bg-gray-800 rounded-lg hover:bg-green-600 transition-all duration-300 hover:shadow-md">
              <Github size={20} className="text-gray-400 hover:text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
