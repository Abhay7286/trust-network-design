
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm" : "bg-white"
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">CD</span>
            </div>
            <span className="text-xl font-bold text-black">CyberDirectory</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-black hover:text-gray-600 transition-colors duration-300 font-semibold"
            >
              Home
            </Link>
            <Link
              to="/providers"
              className="text-black hover:text-gray-600 transition-colors duration-300 font-semibold"
            >
              Find Providers
            </Link>
            <Link
              to="/osint"
              className="text-black hover:text-gray-600 transition-colors duration-300 font-semibold"
            >
              OSINT
            </Link>
            <Link
              to="/google-dork"
              className="text-black hover:text-gray-600 transition-colors duration-300 font-semibold"
            >
              Google Dork
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-black"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 bg-white rounded-lg border border-gray-200 p-4 shadow-lg">
            <Link
              to="/"
              className="block text-black hover:text-gray-600 transition-colors duration-300 font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/providers"
              className="block text-black hover:text-gray-600 transition-colors duration-300 font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Find Providers
            </Link>
            <Link
              to="/osint"
              className="block text-black hover:text-gray-600 transition-colors duration-300 font-semibold"
              onClick={() => setIsOpen(false)}
            >
              OSINT
            </Link>
            <Link
              to="/google-dork"
              className="block text-black hover:text-gray-600 transition-colors duration-300 font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Google Dork
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
