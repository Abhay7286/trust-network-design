
import { Shield, Mail, Phone, Link } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={32} className="text-blue-400" />
              <span className="text-2xl font-bold text-white">SecureShield</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Leading cybersecurity firm providing comprehensive protection solutions 
              for businesses of all sizes. Your security is our mission.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <Mail size={16} />
                <span>contact@secureshield.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Penetration Testing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Risk Management</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Security Consulting</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Data Protection</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-green-400 transition-colors">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-green-400 transition-colors">Our Services</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-green-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        {/* Social Media & Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © 2024 SecureShield Cybersecurity. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors">
              <Link size={20} className="text-gray-400 hover:text-white" />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors">
              <Mail size={20} className="text-gray-400 hover:text-white" />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-green-600 transition-colors">
              <Phone size={20} className="text-gray-400 hover:text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
