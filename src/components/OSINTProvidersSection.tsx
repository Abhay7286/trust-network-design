
import { ExternalLink, Globe, Database, Eye, Shield, Search, Zap, Lock, FileText, Network, Server, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const osintTools = [
  {
    name: "Who.is",
    description: "Complete domain ownership lookup and registration information for any domain name worldwide.",
    icon: Globe,
    category: "Domain Analysis",
    url: "https://who.is",
    features: ["Domain Lookup", "WHOIS Data", "Registration History"]
  },
  {
    name: "ARIN Whois",
    description: "IP address and ASN lookup service providing network ownership and registration details.",
    icon: Network,
    category: "Network Analysis",
    url: "https://whois.arin.net",
    features: ["IP Lookup", "ASN Data", "Network Info"]
  },
  {
    name: "Shodan",
    description: "Search engine for Internet-connected devices. Discover exposed systems and vulnerabilities.",
    icon: Server,
    category: "Asset Discovery",
    url: "https://shodan.io",
    features: ["Device Discovery", "Vulnerability Scanning", "API Access"]
  },
  {
    name: "Censys",
    description: "Internet-wide scanning and asset discovery platform for cybersecurity professionals.",
    icon: Search,
    category: "Asset Discovery",
    url: "https://censys.io",
    features: ["Internet Scanning", "Asset Inventory", "Certificate Analysis"]
  },
  {
    name: "BuiltWith",
    description: "Website technology fingerprinting and competitive intelligence platform.",
    icon: Database,
    category: "Technology Analysis",
    url: "https://builtwith.com",
    features: ["Tech Stack Analysis", "Market Share", "Technology Trends"]
  },
  {
    name: "Pipl",
    description: "Professional people search engine for identity verification and investigation.",
    icon: UserCheck,
    category: "People Search",
    url: "https://pipl.com",
    features: ["Identity Verification", "People Search", "Professional Data"]
  },
  {
    name: "Maltego",
    description: "Powerful OSINT and graphical link analysis tool for investigations and intelligence gathering.",
    icon: Zap,
    category: "Link Analysis",
    url: "https://maltego.com",
    features: ["Data Mining", "Link Analysis", "Visualization"]
  },
  {
    name: "Have I Been Pwned",
    description: "Check if email addresses or usernames have been compromised in data breaches.",
    icon: Shield,
    category: "Breach Detection",
    url: "https://haveibeenpwned.com",
    features: ["Breach Monitoring", "Password Analysis", "API Integration"]
  },
  {
    name: "DarkSearch.io",
    description: "Dark web search engine for cybersecurity research and threat intelligence.",
    icon: Eye,
    category: "Dark Web Search",
    url: "https://darksearch.io",
    features: ["Dark Web Search", "Threat Intelligence", "Security Research"]
  },
  {
    name: "ExifTool",
    description: "Comprehensive metadata extraction and analysis tool for digital forensics.",
    icon: FileText,
    category: "Metadata Analysis",
    url: "https://exiftool.org",
    features: ["Metadata Extraction", "File Analysis", "Digital Forensics"]
  },
  {
    name: "DNSdumpster",
    description: "DNS reconnaissance tool for domain analysis and subdomain discovery.",
    icon: Database,
    category: "DNS Analysis",
    url: "https://dnsdumpster.com",
    features: ["DNS Mapping", "Subdomain Discovery", "Network Visualization"]
  },
  {
    name: "ThreatCrowd",
    description: "Search engine for threats with graphical visualization of connected infrastructure.",
    icon: Lock,
    category: "Threat Intelligence",
    url: "https://threatcrowd.org",
    features: ["Threat Research", "Infrastructure Mapping", "IOC Analysis"]
  }
];

const OSINTProvidersSection = () => {
  return (
    <section id="osint-tools" className="py-20 bg-gray-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            OSINT Tools & Services
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Professional open-source intelligence tools for cybersecurity research, 
            threat hunting, and investigative analysis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {osintTools.map((tool, index) => (
            <Card 
              key={tool.name} 
              className="bg-gray-900/50 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group h-full"
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                      <tool.icon className="text-blue-400" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{tool.name}</h3>
                      <span className="text-xs text-green-400 font-medium">{tool.category}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-400 mb-4 leading-relaxed text-sm flex-grow">
                  {tool.description}
                </p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {tool.features.map((feature) => (
                      <span 
                        key={feature}
                        className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded border border-gray-600"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 group-hover:shadow-md mt-auto"
                  onClick={() => window.open(tool.url, '_blank')}
                >
                  Visit Site
                  <ExternalLink size={14} className="ml-2" />
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
            Request Tool Addition
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OSINTProvidersSection;
