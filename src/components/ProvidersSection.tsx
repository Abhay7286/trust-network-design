
import { ExternalLink, Shield, Search, Globe, Database, Eye, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const providers = [
  {
    name: "Maltego",
    description: "Powerful OSINT and graphical link analysis tool for investigations and intelligence gathering.",
    icon: Search,
    category: "Link Analysis",
    url: "https://maltego.com",
    features: ["Data Mining", "Link Analysis", "Visualization"]
  },
  {
    name: "Shodan",
    description: "Search engine for Internet-connected devices. Discover exposed systems and vulnerabilities.",
    icon: Globe,
    category: "IoT Search",
    url: "https://shodan.io",
    features: ["Device Discovery", "Vulnerability Scanning", "API Access"]
  },
  {
    name: "Have I Been Pwned",
    description: "Check if your email addresses or usernames have been compromised in data breaches.",
    icon: Shield,
    category: "Breach Detection",
    url: "https://haveibeenpwned.com",
    features: ["Breach Monitoring", "Password Analysis", "API Integration"]
  },
  {
    name: "Pipl",
    description: "Professional people search engine for identity verification and investigation.",
    icon: Eye,
    category: "People Search",
    url: "https://pipl.com",
    features: ["Identity Verification", "People Search", "Professional Data"]
  },
  {
    name: "ThreatCrowd",
    description: "Search engine for threats with graphical visualization of connected infrastructure.",
    icon: Zap,
    category: "Threat Intelligence",
    url: "https://threatcrowd.org",
    features: ["Threat Research", "Infrastructure Mapping", "IOC Analysis"]
  },
  {
    name: "OSINT Framework",
    description: "Comprehensive collection of OSINT tools and resources organized by category.",
    icon: Database,
    category: "Tool Collection",
    url: "https://osintframework.com",
    features: ["Tool Directory", "Resource Collection", "Category Organization"]
  }
];

const ProvidersSection = () => {
  return (
    <section id="providers" className="py-20 bg-gray-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Trusted OSINT Providers
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore our curated selection of professional OSINT service providers and tools 
            to enhance your intelligence gathering capabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {providers.map((provider, index) => (
            <Card 
              key={provider.name} 
              className="bg-gray-900/50 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group"
            >
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                      <provider.icon className="text-blue-400" size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{provider.name}</h3>
                      <span className="text-sm text-green-400 font-medium">{provider.category}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  {provider.description}
                </p>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {provider.features.map((feature) => (
                      <span 
                        key={feature}
                        className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full border border-gray-600"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 group-hover:shadow-md"
                  onClick={() => window.open(provider.url, '_blank')}
                >
                  Visit Provider
                  <ExternalLink size={16} className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">Looking for a specific OSINT solution?</p>
          <Button
            variant="outline"
            className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 px-8 py-3 font-semibold rounded-lg transition-all duration-300"
          >
            Request Custom Recommendations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProvidersSection;
