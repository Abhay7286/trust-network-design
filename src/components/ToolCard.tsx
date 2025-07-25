import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { Heart, Star, ExternalLink } from "lucide-react";
import type { Tool } from "@/lib/supabase";

interface ToolCardProps {
  tool: Tool;
  isWishlisted?: boolean;
  onWishlistChange?: () => void;
}

const ToolCard = ({ tool, isWishlisted = false, onWishlistChange }: ToolCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleWishlistToggle = async () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to add tools to your wishlist.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      if (isWishlisted) {
        const { error } = await supabase
          .from('wishlist')
          .delete()
          .eq('user_id', user.id)
          .eq('tool_id', tool.id);
        
        if (error) throw error;
        
        toast({
          title: "Removed from wishlist",
          description: `${tool.name} has been removed from your wishlist.`,
        });
      } else {
        const { error } = await supabase
          .from('wishlist')
          .insert([
            {
              user_id: user.id,
              tool_id: tool.id
            }
          ]);
        
        if (error) throw error;
        
        toast({
          title: "Added to wishlist",
          description: `${tool.name} has been added to your wishlist.`,
        });
      }
      
      onWishlistChange?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update wishlist. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {tool.logo_url && (
              <img 
                src={tool.logo_url} 
                alt={`${tool.name} logo`}
                className="w-12 h-12 rounded-lg object-cover"
              />
            )}
            <div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <Badge variant="secondary" className="text-xs">
                {tool.category}
              </Badge>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleWishlistToggle}
            disabled={isLoading}
            className="text-muted-foreground hover:text-primary"
          >
            <Heart 
              className={`h-5 w-5 ${isWishlisted ? 'fill-primary text-primary' : ''}`} 
            />
          </Button>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {tool.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">
                {tool.average_rating.toFixed(1)}
              </span>
              <span className="text-xs text-muted-foreground">
                ({tool.total_reviews} reviews)
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(tool.website_url, '_blank')}
            className="gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Visit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
