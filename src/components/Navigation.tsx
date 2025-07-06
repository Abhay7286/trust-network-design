
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

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
      isScrolled ? "bg-gray-900/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-400">
            SecureShield
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-blue-400 transition-colors duration-300"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="hover:text-green-400 transition-colors duration-300"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-blue-400 transition-colors duration-300"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-green-400 transition-colors duration-300"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <button
              onClick={() => scrollToSection("home")}
              className="block hover:text-blue-400 transition-colors duration-300"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="block hover:text-green-400 transition-colors duration-300"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block hover:text-blue-400 transition-colors duration-300"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block hover:text-green-400 transition-colors duration-300"
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
