
import { ExternalLink, Shield, Search, Globe, Database, Eye, Zap, Instagram, MessageSquare, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const providers = [
  {
    name: "Maltego",
    description: "Powerful OSINT and graphical link analysis tool for investigations and intelligence gathering.",
    icon: Search,
    category: "Link Analysis",
    url: "https://maltego.com",
    features: ["Data Mining", "Link Analysis", "Visualization"],
    social: {
      instagram: "https://instagram.com/maltego",
      discord: "https://discord.gg/maltego",
      twitter: "https://twitter.com/maltego"
    }
  },
  {
    name: "Shodan",
    description: "Search engine for Internet-connected devices. Discover exposed systems and vulnerabilities.",
    icon: Globe,
    category: "IoT Search",
    url: "https://shodan.io",
    features: ["Device Discovery", "Vulnerability Scanning", "API Access"],
    social: {
      instagram: "https://instagram.com/shodan_io",
      discord: "https://discord.gg/shodan",
      twitter: "https://twitter.com/shodanhq"
    }
  },
  {
    name: "Have I Been Pwned",
    description: "Check if your email addresses or usernames have been compromised in data breaches.",
    icon: Shield,
    category: "Breach Detection",
    url: "https://haveibeenpwned.com",
    features: ["Breach Monitoring", "Password Analysis", "API Integration"],
    social: {
      instagram: "https://instagram.com/haveibeenpwned",
      discord: "https://discord.gg/hibp",
      twitter: "https://twitter.com/haveibeenpwned"
    }
  },
  {
    name: "Pipl",
    description: "Professional people search engine for identity verification and investigation.",
    icon: Eye,
    category: "People Search",
    url: "https://pipl.com",
    features: ["Identity Verification", "People Search", "Professional Data"],
    social: {
      instagram: "https://instagram.com/pipl",
      discord: "https://discord.gg/pipl",
      twitter: "https://twitter.com/pipl"
    }
  },
  {
    name: "ThreatCrowd",
    description: "Search engine for threats with graphical visualization of connected infrastructure.",
    icon: Zap,
    category: "Threat Intelligence",
    url: "https://threatcrowd.org",
    features: ["Threat Research", "Infrastructure Mapping", "IOC Analysis"],
    social: {
      instagram: "https://instagram.com/threatcrowd",
      discord: "https://discord.gg/threatcrowd",
      twitter: "https://twitter.com/threatcrowd"
    }
  },
  {
    name: "OSINT Framework",
    description: "Comprehensive collection of OSINT tools and resources organized by category.",
    icon: Database,
    category: "Tool Collection",
    url: "https://osintframework.com",
    features: ["Tool Directory", "Resource Collection", "Category Organization"],
    social: {
      instagram: "https://instagram.com/osintframework",
      discord: "https://discord.gg/osint",
      twitter: "https://twitter.com/osintframework"
    }
  }
];

const ProvidersSection = () => {
  return (
    <section id="providers" className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Trusted OSINT Providers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our curated selection of professional OSINT service providers and tools 
            to enhance your intelligence gathering capabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {providers.map((provider, index) => (
            <Card 
              key={provider.name} 
              className="bg-card border-2 border-border hover:border-foreground/20 transition-all duration-300 hover:shadow-xl group"
            >
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-foreground/5 hover:bg-foreground/10 rounded-xl transition-colors border border-border">
                      <provider.icon className="text-foreground" size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{provider.name}</h3>
                      <span className="text-sm text-muted-foreground font-medium border border-border px-2 py-1 rounded-md bg-muted/50">{provider.category}</span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {provider.description}
                </p>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {provider.features.map((feature) => (
                      <span 
                        key={feature}
                        className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full border border-border hover:bg-foreground/5 transition-colors"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full bg-foreground text-background hover:bg-foreground/90 font-semibold py-3 rounded-lg transition-all duration-300"
                    onClick={() => window.open(provider.url, '_blank')}
                  >
                    Visit Provider
                    <ExternalLink size={16} className="ml-2" />
                  </Button>
                  
                  <div className="flex justify-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border text-foreground hover:bg-muted"
                      onClick={() => window.open(provider.social.instagram, '_blank')}
                    >
                      <Instagram size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border text-foreground hover:bg-muted"
                      onClick={() => window.open(provider.social.discord, '_blank')}
                    >
                      <MessageSquare size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border text-foreground hover:bg-muted"
                      onClick={() => window.open(provider.social.twitter, '_blank')}
                    >
                      <Twitter size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">Looking for a specific OSINT solution?</p>
          <Button
            variant="outline"
            className="border-2 border-border text-foreground hover:bg-muted px-8 py-3 font-semibold rounded-lg transition-all duration-300"
          >
            Request Custom Recommendations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProvidersSection;
