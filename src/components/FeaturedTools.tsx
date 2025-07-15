
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, Github, Users } from "lucide-react";

const featuredTools = [
  {
    id: "nmap",
    name: "Nmap",
    description: "Network discovery and security auditing tool used by millions of IT professionals worldwide.",
    category: "Network Security",
    type: "Free",
    rating: 4.9,
    reviews: 1250,
    githubStars: 8400,
    website: "https://nmap.org",
    github: "https://github.com/nmap/nmap",
    tags: ["Network Scanning", "Port Discovery", "OS Detection"],
    trustScore: 98
  },
  {
    id: "burp-suite",
    name: "Burp Suite",
    description: "Leading toolkit for web application security testing, trusted by security professionals globally.",
    category: "Penetration Testing",
    type: "Freemium",
    rating: 4.8,
    reviews: 892,
    website: "https://portswigger.net/burp",
    tags: ["Web Security", "Vulnerability Scanner", "Proxy Tool"],
    trustScore: 96
  },
  {
    id: "wireshark",
    name: "Wireshark",
    description: "World's foremost network protocol analyzer for troubleshooting, analysis, and security assessment.",
    category: "Network Security",
    type: "Free",
    rating: 4.7,
    reviews: 2100,
    githubStars: 6200,
    website: "https://wireshark.org",
    github: "https://github.com/wireshark/wireshark",
    tags: ["Network Analysis", "Protocol Analyzer", "Traffic Inspection"],
    trustScore: 97
  }
];

const FeaturedTools = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Featured Tools
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the most trusted and widely-used cybersecurity tools, 
            vetted by our community and security experts.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {featuredTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{tool.name}</h3>
                      <Badge variant="secondary" className="mb-2">{tool.category}</Badge>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge 
                        variant={tool.type === 'Free' ? 'default' : 'outline'}
                        className={tool.type === 'Free' ? 'bg-green-500 text-white' : ''}
                      >
                        {tool.type}
                      </Badge>
                      <div className="text-sm font-medium text-primary">
                        Trust: {tool.trustScore}%
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-500 fill-current" size={16} />
                      <span className="font-medium">{tool.rating}</span>
                      <span>({tool.reviews})</span>
                    </div>
                    {tool.githubStars && (
                      <div className="flex items-center gap-1">
                        <Github size={16} />
                        <span>{tool.githubStars.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {tool.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <a href={tool.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} className="mr-2" />
                        Visit Site
                      </a>
                    </Button>
                    <Link to={`/tools/${tool.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/tools">
            <Button size="lg" variant="outline" className="px-8">
              View All Tools
              <Users className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTools;
