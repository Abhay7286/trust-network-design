
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, Shield, Github } from "lucide-react";

const ToolDetail = () => {
  const { id } = useParams();

  // Mock tool data - in a real app this would come from an API
  const tool = {
    id: id,
    name: "Example Tool",
    description: "A comprehensive cybersecurity tool for threat detection and analysis.",
    category: "OSINT",
    type: "Open Source",
    trustScore: 4.5,
    githubStars: 1250,
    website: "https://example.com",
    github: "https://github.com/example/tool",
    tags: ["threat-intelligence", "osint", "analysis"],
    lastUpdated: "2024-01-15"
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-3xl mb-2">{tool.name}</CardTitle>
                  <CardDescription className="text-lg">{tool.description}</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{tool.category}</Badge>
                  <Badge variant="outline">{tool.type}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="font-medium">Trust Score: {tool.trustScore}/5</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>{tool.githubStars} stars</span>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button asChild>
                  <a href={tool.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href={tool.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    View on GitHub
                  </a>
                </Button>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ToolDetail;
