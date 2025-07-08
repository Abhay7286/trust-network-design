
import { ExternalLink, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const featuredProviders = [
  {
    name: "Rapid7",
    description: "Enterprise vulnerability management and penetration testing services",
    category: "Penetration Testing",
    url: "https://rapid7.com"
  },
  {
    name: "CrowdStrike",
    description: "AI-powered endpoint protection and threat hunting services",
    category: "Threat Detection",
    url: "https://crowdstrike.com"
  },
  {
    name: "Mandiant",
    description: "Advanced threat intelligence and incident response from Google Cloud",
    category: "Threat Intelligence",
    url: "https://mandiant.com"
  }
];

const FeaturedProvidersSection = () => {
  return (
    <section className="py-20 bg-gray-800/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Featured Cybersecurity Providers
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover top-rated cybersecurity service providers trusted by enterprises worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {featuredProviders.map((provider) => (
            <Card key={provider.name} className="bg-gray-900/50 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="text-blue-400" size={24} />
                  <span className="text-sm text-green-400 font-medium">{provider.category}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{provider.name}</h3>
                <p className="text-gray-400 mb-6">{provider.description}</p>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => window.open(provider.url, '_blank')}
                >
                  Visit Provider
                  <ExternalLink size={16} className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/providers">
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-8 py-3 text-lg font-semibold">
              View All Providers
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProvidersSection;
