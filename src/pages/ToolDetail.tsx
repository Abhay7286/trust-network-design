import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Tool } from "@/data/tools";
import Loader from "@/components/Loader";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  ExternalLink, 
  Github, 
  Heart, 
  Star, 
  Calendar, 
  User,
  Flag,
  ArrowLeft,
  Share2,
  MessageCircle
} from "lucide-react";

const ToolDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedTools, setRelatedTools] = useState<Tool[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [votes, setVotes] = useState(0);

useEffect(() => {
  const fetchTools = async () => {
    const { data, error } = await supabase.from("tools").select("*");

    if (error) {
      console.error("Error fetching tools:", error);
      return;
    }

    const parsePgArray = (str: string | null | undefined) =>
      str?.startsWith("{") ? str.replace(/^{|}$/g, "").split(",") : [];

    const fixedTools = data.map((tool) => ({
      ...tool,
      tags: Array.isArray(tool.tags)
        ? tool.tags
        : parsePgArray(tool.tags),
    }));

    const foundTool = fixedTools.find((t) => String(t.id) === String(id));
    if (foundTool) {
      setTool(foundTool);
      setVotes(foundTool.votes || 0);
      setIsLiked(false); // Optionally, set based on user/session
      setError(null);
    } else {
      setTool(null);
      setError("Tool not found");
    }
    setLoading(false);
  };

  fetchTools();
}, [id]);


const handleLikeToggle = async () => {
  if (!tool) return;

  try {
    const newLikeStatus = !isLiked;
    const updatedVotes = newLikeStatus ? votes + 1 : votes - 1;

    setIsLiked(newLikeStatus);
    setVotes(updatedVotes);

    const { error } = await supabase
      .from("tools")
      .update({ votes: updatedVotes })
      .eq("id", tool.id);

    if (error) throw error;
  } catch (error) {
    console.error("Error updating votes:", error);
    // Revert UI in case of failure
    setIsLiked((prev) => !prev);
    setVotes((prev) => prev); // or reset to previous value if tracked
  }
};


  const getTypeColor = (type: string) => {
    switch (type) {
      case "Free":
        return "bg-green-100 text-green-800 border-green-200";
      case "Open Source":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Paid":
        return "bg-red-100 text-red-800 border-red-200";
      case "Freemium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <Loader />
        <Footer />
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 pb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Tool Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The tool you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/tools">Browse All Tools</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button variant="outline" asChild>
              <Link to="/tools">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tools
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-3xl mb-2">{tool.name}</CardTitle>
                      <p className="text-muted-foreground text-lg mb-4">
                        {tool.description}
                      </p>
                      <div className="flex items-center space-x-4 mb-4">
                        <Badge variant="secondary" className="text-sm">
                          {tool.category}
                        </Badge>
                        <Badge variant="outline" className={`text-sm ${getTypeColor(tool.type)}`}>
                          {tool.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/report?tool=${tool.id}`}>
                          <Flag className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="font-semibold mb-2">Trust Score</h3>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-primary" />
                        <span className="text-xl font-bold">{tool.trust_score}</span>
                        <span className="text-muted-foreground">out of 5</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Community Support</h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Heart className={`h-4 w-4 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                          <span>{votes} votes</span>
                        </div>
                        {tool.github_stars > 0 && (
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{tool.github_stars.toLocaleString()} stars</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {tool.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="font-semibold mb-2">Last Updated</h3>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(tool.last_updated).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Submitted By</h3>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="capitalize">{tool.submitted_by}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button 
                      onClick={handleLikeToggle}
                      variant={isLiked ? "default" : "outline"}
                      className={isLiked ? 'bg-red-500 hover:bg-red-600' : ''}
                    >
                      <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                      {isLiked ? 'Liked' : 'Like'}
                    </Button>
                    <Button asChild>
                      <a href={tool.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit Website
                      </a>
                    </Button>
                    {tool.github && (
                      <Button variant="outline" asChild>
                        <a href={tool.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          View on GitHub
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" asChild>
                    <a href={tool.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Official Site
                    </a>
                  </Button>
                  <Button className="w-full"asChild>
                    <Link to={`/tools/${tool.id}/ai`}>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Ask AI
                    </Link>
                  </Button>
                  <Button asChild>
                  {tool.github && (
                    <Button variant="outline" className="w-full" asChild>
                      <a href={tool.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        View Source Code
                      </a>
                    </Button>
                  )}
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/report?tool=${tool.id}`}>
                      <Flag className="mr-2 h-4 w-4" />
                      Report Issue
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {relatedTools.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Related Tools</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {relatedTools.slice(0, 5).map((relatedTool) => (
                        <div key={relatedTool.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <h4 className="font-medium">
                              <Link to={`/tools/${relatedTool.id}`} className="hover:text-primary">
                                {relatedTool.name}
                              </Link>
                            </h4>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {relatedTool.description}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Shield className="h-3 w-3 text-primary" />
                            <span className="text-sm">{relatedTool.trust_score}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ToolDetail;