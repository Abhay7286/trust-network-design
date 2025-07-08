
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight font-inter">
            Your Gateway to Cybersecurity Intelligence
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto font-inter">
            Explore trusted tools, verified service providers, and powerful OSINT techniques — all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/providers">
              <Button className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 min-w-[200px] font-inter shadow-soft-lg">
                🔍 Find Providers
              </Button>
            </Link>
            <Link to="/osint">
              <Button 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 min-w-[200px] font-inter"
              >
                🧠 Learn OSINT
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
