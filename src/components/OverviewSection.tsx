
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const overviewCards = [
  {
    icon: "🛡️",
    title: "Security Providers",
    description: "Discover trusted cybersecurity companies offering penetration testing, security consulting, and risk management services.",
    link: "/providers"
  },
  {
    icon: "🧰",
    title: "OSINT Tools",
    description: "Access powerful open-source intelligence tools for research, investigation, and security analysis.",
    link: "/osint"
  },
  {
    icon: "🔍",
    title: "Google Dorks",
    description: "Master advanced search operators to find hidden information and exposed data for ethical research.",
    link: "/google-dork"
  }
];

const OverviewSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">
            What You'll Find
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to navigate the cybersecurity landscape
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {overviewCards.map((card) => (
            <Card key={card.title} className="bg-white border-2 border-gray-200 hover:border-black transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-bold text-black mb-4">{card.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{card.description}</p>
                <Link to={card.link}>
                  <Button 
                    variant="outline" 
                    className="border-black text-black hover:bg-black hover:text-white transition-all duration-300"
                  >
                    Explore
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
