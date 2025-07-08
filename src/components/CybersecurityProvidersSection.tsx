
import { ExternalLink, Shield, Search, Users, Lock, Eye, FileText, AlertTriangle, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const providers = [
  {
    name: "Rapid7",
    description: "Comprehensive vulnerability management and penetration testing services for enterprise security.",
    icon: Shield,
    category: "Penetration Testing",
    url: "https://rapid7.com",
    features: ["Vulnerability Assessment", "Penetration Testing", "Security Consulting"]
  },
  {
    name: "Mandiant",
    description: "Advanced threat intelligence and incident response services from Google Cloud security experts.",
    icon: AlertTriangle,
    category: "Threat Intelligence",
    url: "https://mandiant.com",
    features: ["Incident Response", "Threat Intelligence", "Security Consulting"]
  },
  {
    name: "CrowdStrike",
    description: "Cloud-native endpoint protection and threat hunting services with AI-powered detection.",
    icon: Eye,
    category: "Threat Detection",
    url: "https://crowdstrike.com",
    features: ["Endpoint Protection", "Threat Hunting", "Incident Response"]
  },
  {
    name: "Trustwave",
    description: "Managed security services including SIEM, vulnerability management, and compliance solutions.",
    icon: Database,
    category: "Managed Security",
    url: "https://trustwave.com",
    features: ["SIEM Management", "Compliance", "Security Monitoring"]
  },
  {
    name: "Recorded Future",
    description: "Real-time threat intelligence platform providing actionable security insights and risk analysis.",
    icon: Search,
    category: "Threat Intelligence",
    url: "https://recordedfuture.com",
    features: ["Threat Intelligence", "Risk Analysis", "Security Research"]
  },
  {
    name: "SecureWorks",
    description: "Cloud-based security solutions with 24/7 threat detection and incident response services.",
    icon: Lock,
    category: "Managed Security",
    url: "https://secureworks.com",
    features: ["24/7 Monitoring", "Incident Response", "Cloud Security"]
  },
  {
    name: "Coalfire",
    description: "Cybersecurity consulting and compliance services specializing in risk assessments and audits.",
    icon: FileText,
    category: "Security Consulting",
    url: "https://coalfire.com",
    features: ["Risk Assessment", "Compliance Audits", "Security Consulting"]
  },
  {
    name: "Bugcrowd",
    description: "Crowdsourced security testing platform connecting organizations with ethical hackers worldwide.",
    icon: Users,
    category: "Bug Bounty",
    url: "https://bugcrowd.com",
    features: ["Bug Bounty Programs", "Penetration Testing", "Vulnerability Discovery"]
  },
  {
    name: "HackerOne",
    description: "Leading bug bounty and vulnerability coordination platform for continuous security testing.",
    icon: Search,
    category: "Bug Bounty",
    url: "https://hackerone.com",
    features: ["Bug Bounty", "Vulnerability Coordination", "Security Testing"]
  }
];

const CybersecurityProvidersSection = () => {
  return (
    <section id="providers" className="py-20 bg-gray-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Trusted Cybersecurity Service Providers
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Connect with verified cybersecurity professionals and companies offering specialized 
            services in penetration testing, threat intelligence, managed security, and consulting.
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
          <p className="text-gray-400 mb-6">Looking for a specific cybersecurity service?</p>
          <Button
            variant="outline"
            className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 px-8 py-3 font-semibold rounded-lg transition-all duration-300"
          >
            Request Provider Recommendations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CybersecurityProvidersSection;
