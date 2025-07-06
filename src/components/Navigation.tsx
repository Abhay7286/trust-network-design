
import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-gray-900/95 backdrop-blur-sm border-b border-gray-700" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Search size={24} className="text-blue-400" />
            <span className="text-xl font-bold text-white">OSINT Pro</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("providers")}
              className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium"
            >
              Find Providers
            </button>
            <button
              onClick={() => scrollToSection("osint")}
              className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium"
            >
              OSINT
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 bg-gray-800 rounded-lg border border-gray-700 p-4">
            <button
              onClick={() => scrollToSection("home")}
              className="block text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium w-full text-left"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("providers")}
              className="block text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium w-full text-left"
            >
              Find Providers
            </button>
            <button
              onClick={() => scrollToSection("osint")}
              className="block text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium w-full text-left"
            >
              OSINT
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium w-full text-left"
            >
              Contact
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
