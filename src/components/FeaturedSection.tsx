
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const featuredItems = [
  {
    name: "Shodan",
    category: "OSINT",
    description: "Search engine for Internet-connected devices",
    url: "https://shodan.io",
    tag: "IP Lookup"
  },
  {
    name: "Rapid7",
    category: "Provider",
    description: "Enterprise vulnerability management services",
    url: "https://rapid7.com",
    tag: "PenTest"
  },
  {
    name: "Maltego",
    category: "OSINT",
    description: "Link analysis and data mining platform",
    url: "https://maltego.com",
    tag: "Investigation"
  },
  {
    name: "CrowdStrike",
    category: "Provider",
    description: "AI-powered endpoint protection platform",
    url: "https://crowdstrike.com",
    tag: "Threat Detection"
  },
  {
    name: "Censys",
    category: "OSINT",
    description: "Internet-wide asset discovery platform",
    url: "https://censys.io",
    tag: "Asset Discovery"
  },
  {
    name: "Mandiant",
    category: "Provider",
    description: "Advanced threat intelligence and response",
    url: "https://mandiant.com",
    tag: "Threat Intel"
  }
];

const FeaturedSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4 font-inter">
            Featured Tools & Providers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-inter">
            Handpicked resources trusted by cybersecurity professionals worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featuredItems.map((item) => (
            <Card key={item.name} className="bg-white border border-gray-200 hover:shadow-soft-lg transition-all duration-300 group hover:border-gray-400">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2 py-1 bg-black text-white rounded font-inter">
                    {item.tag}
                  </span>
                  <span className="text-xs text-gray-500 uppercase tracking-wide font-inter">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-black mb-2 font-inter">{item.name}</h3>
                <p className="text-gray-600 mb-4 text-sm font-inter">{item.description}</p>
                <Button
                  size="sm"
                  className="w-full bg-black text-white hover:bg-gray-800 transition-colors duration-300 font-inter"
                  onClick={() => window.open(item.url, '_blank')}
                >
                  Visit Site
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
