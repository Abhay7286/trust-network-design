
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Shield, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";

interface ToolsListProps {
  searchQuery: string;
  selectedCategory: string;
  selectedType: string;
  sortBy: string;
  viewMode: "grid" | "list";
}

const ToolsList = ({ searchQuery, selectedCategory, selectedType, sortBy, viewMode }: ToolsListProps) => {
  // Mock data - in a real app this would come from an API
  const tools = [
    {
      id: "1",
      name: "Shodan",
      description: "Search engine for Internet-connected devices",
      category: "OSINT",
      type: "Freemium",
      trustScore: 4.8,
      githubStars: 0,
      website: "https://shodan.io",
      tags: ["network-scanning", "iot", "search"]
    },
    {
      id: "2",
      name: "Nmap",
      description: "Network discovery and security auditing tool",
      category: "Scanners",
      type: "Open Source",
      trustScore: 4.9,
      githubStars: 8500,
      website: "https://nmap.org",
      tags: ["network-scanning", "port-scanning"]
    },
    {
      id: "3",
      name: "Maltego",
      description: "Link analysis tool for data mining and visualization",
      category: "OSINT",
      type: "Freemium",
      trustScore: 4.6,
      githubStars: 0,
      website: "https://maltego.com",
      tags: ["data-mining", "visualization", "investigation"]
    }
  ];

  // Filter tools based on search and filters
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tool.category.toLowerCase().replace(" ", "-") === selectedCategory;
    const matchesType = selectedType === "all" || tool.type.toLowerCase().replace(" ", "-") === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  // Sort tools
  const sortedTools = [...filteredTools].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "trust-score":
        return b.trustScore - a.trustScore;
      case "popularity":
        return b.githubStars - a.githubStars;
      default:
        return 0;
    }
  });

  const ToolCard = ({ tool }: { tool: typeof tools[0] }) => (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">
              <Link to={`/tools/${tool.id}`} className="hover:text-primary">
                {tool.name}
              </Link>
            </CardTitle>
            <CardDescription className="mt-1">{tool.description}</CardDescription>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <Badge variant="secondary">{tool.category}</Badge>
            <Badge variant="outline" className="text-xs">{tool.type}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{tool.trustScore}</span>
            </div>
            {tool.githubStars > 0 && (
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">{tool.githubStars}</span>
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" asChild>
              <a href={tool.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
            <Button size="sm" asChild>
              <Link to={`/tools/${tool.id}`}>View</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Cybersecurity Tools</h2>
        <p className="text-muted-foreground">
          Found {sortedTools.length} tools
        </p>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}

      {sortedTools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tools found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ToolsList;
