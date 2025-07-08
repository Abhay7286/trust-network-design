
import { ExternalLink, Network, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const osintTools = [
  {
    name: "Shodan",
    description: "Search engine for Internet-connected devices and services",
    category: "Asset Discovery",
    url: "https://shodan.io",
    icon: Network
  },
  {
    name: "Censys",
    description: "Internet-wide asset discovery and attack surface management",
    category: "Asset Discovery", 
    url: "https://censys.io",
    icon: Network
  },
  {
    name: "Maltego",
    description: "Link analysis and data mining platform for investigations",
    category: "Investigation",
    url: "https://maltego.com",
    icon: Network
  },
  {
    name: "Pipl",
    description: "Deep people search engine for identity verification",
    category: "People Search",
    url: "https://pipl.com",
    icon: Shield
  },
  {
    name: "DNSdumpster",
    description: "Free domain research tool for DNS mapping",
    category: "DNS Analysis",
    url: "https://dnsdumpster.com",
    icon: Network
  },
  {
    name: "BuiltWith",
    description: "Website technology fingerprinting and analysis",
    category: "Technology Profiling",
    url: "https://builtwith.com",
    icon: Network
  },
  {
    name: "HaveIBeenPwned",
    description: "Check if email addresses have been compromised in data breaches",
    category: "Breach Monitoring",
    url: "https://haveibeenpwned.com",
    icon: Shield
  },
  {
    name: "Dehashed",
    description: "Search engine for leaked databases and credentials",
    category: "Breach Analysis",
    url: "https://dehashed.com",
    icon: Lock
  },
  {
    name: "ExifTool",
    description: "Metadata extraction from images and documents",
    category: "Forensics",
    url: "https://exiftool.org",
    icon: Lock
  },
  {
    name: "SecurityTrails",
    description: "DNS and IP history research platform",
    category: "DNS Analysis",
    url: "https://securitytrails.com",
    icon: Network
  },
  {
    name: "WhoisXML API",
    description: "Comprehensive domain and IP intelligence platform",
    category: "Domain Intelligence",
    url: "https://whoisxmlapi.com",
    icon: Network
  },
  {
    name: "Wayback Machine",
    description: "Internet archive for historical website snapshots",
    category: "Web Archive",
    url: "https://web.archive.org",
    icon: Network
  },
  {
    name: "TinEye",
    description: "Reverse image search engine",
    category: "Image Search",
    url: "https://tineye.com",
    icon: Network
  },
  {
    name: "Hunter.io",
    description: "Email finder and verification tool",
    category: "Email Intelligence",
    url: "https://hunter.io",
    icon: Shield
  },
  {
    name: "Spyse",
    description: "Internet assets search engine and cybersecurity platform",
    category: "Asset Discovery",
    url: "https://spyse.com",
    icon: Network
  },
  {
    name: "ZoomEye",
    description: "Cyberspace search engine for network devices",
    category: "Asset Discovery",
    url: "https://zoomeye.org",
    icon: Network
  },
  {
    name: "Fofa.so",
    description: "Cyberspace mapping and asset discovery platform",
    category: "Asset Discovery",
    url: "https://fofa.so",
    icon: Network
  },
  {
    name: "Recon-ng",
    description: "Web reconnaissance framework with independent modules",
    category: "Framework",
    url: "https://github.com/lanmaster53/recon-ng",
    icon: Shield
  },
  {
    name: "theHarvester",
    description: "Email, subdomain and people names harvester",
    category: "Information Gathering",
    url: "https://github.com/laramies/theHarvester",
    icon: Shield
  },
  {
    name: "OSINT Framework",
    description: "Collection of OSINT tools organized by category",
    category: "Resource Directory",
    url: "https://osintframework.com",
    icon: Network
  },
  {
    name: "IntelTechniques",
    description: "OSINT tools and resources by Michael Bazzell",
    category: "Resource Directory",
    url: "https://inteltechniques.com",
    icon: Network
  },
  {
    name: "Wigle.net",
    description: "Wireless network mapping and wardriving database",
    category: "Wireless Intelligence",
    url: "https://wigle.net",
    icon: Network
  }
];

const OSINTProvidersSection = () => {
  const categories = [...new Set(osintTools.map(tool => tool.category))];

  return (
    <section id="osint-tools" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Professional OSINT Tools Directory
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive collection of open-source intelligence tools for cybersecurity research, 
            threat hunting, and investigative analysis.
          </p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              {category}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {osintTools
                .filter(tool => tool.category === category)
                .map((tool) => (
                  <Card 
                    key={tool.name}
                    className="bg-gray-900/50 border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 group"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-colors">
                            <tool.icon className="text-green-400" size={28} />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                              {tool.name}
                            </h4>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-400 mb-6 leading-relaxed">
                        {tool.description}
                      </p>

                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                        onClick={() => window.open(tool.url, '_blank')}
                      >
                        Visit Tool
                        <ExternalLink size={16} className="ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OSINTProvidersSection;
