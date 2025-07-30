// src/data/tools.ts
import { supabase } from "@/lib/supabase";

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  created_at: string;
  type: "Free" | "Open Source" | "Paid" | "Freemium";
  trust_score: number;
  github_stars: number;
  website: string;
  github?: string;
  tags: string[];        
  last_updated: string;    
  submitted_by: string;   
  votes: number;          
  related_tools: string[]; 
  logo_url?: string;
  created_by: string; // User ID of the creator
  featured: boolean; // Indicates if the tool is featured
  average_rating?: number; // Optional average rating
  total_reviews?: number; // Optional total reviews count
}

// Supabase operations
export const fetchTools = async (): Promise<Tool[]> => {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select(`
        id,
        name,
        description,
        category,
        type,
        trust_score,
        github_stars,
        website,
        github,
        tags,
        last_updated,
        submitted_by,
        votes,
        related_tools,
        logo_url,
        created_by,
        featured,
        average_rating,
        total_reviews,
        created_at
      `)
      .order('trust_score', { ascending: false });

    if (error) {
      console.error('Error fetching tools:', error);
      throw error;
    }

    if (!data) {
      console.warn('No data returned from tools table');
      return [];
    }

    // Transform data to match the Tool interface
    const transformedData = data.map(tool => ({
      ...tool,
      // Ensure arrays are properly initialized
      tags: tool.tags || [],
      relatedTools: tool.related_tools || [],
      // Ensure optional fields are properly handled
      github: tool.github || undefined,
      logoUrl: tool.logo_url || undefined,
      averageRating: tool.average_rating || undefined,
      totalReviews: tool.total_reviews || undefined
    }));

    return transformedData as Tool[];
  } catch (error) {
    console.error('Failed to fetch tools:', error);
    throw error;
  }
};

export const getToolById = async (id: string): Promise<Tool> => {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching tool:', error);
    throw error;
  }

  return data as Tool;
};

export const getRelatedTools = async (toolId: string): Promise<Tool[]> => {
  // First get the current tool to find its related tools
  const { data: currentTool, error: currentToolError } = await supabase
    .from('tools')
    .select('relatedTools')
    .eq('id', toolId)
    .single();

  if (currentToolError) {
    console.error('Error fetching current tool:', currentToolError);
    throw currentToolError;
  }

  if (!currentTool?.relatedTools || currentTool.relatedTools.length === 0) {
    return [];
  }

  // Then fetch the related tools
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .in('id', currentTool.relatedTools);

  if (error) {
    console.error('Error fetching related tools:', error);
    throw error;
  }

  return data as Tool[];
};

export const toggleWishlist = async (userId: string, toolId: string, isWishlisted: boolean) => {
  if (isWishlisted) {
    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('user_id', userId)
      .eq('tool_id', toolId);
    return { error };
  } else {
    const { error } = await supabase
      .from('wishlist')
      .insert([{ user_id: userId, tool_id: toolId }]);
    return { error };
  }
};

export const fetchWishlistedTools = async (userId: string): Promise<string[]> => {
  const { data, error } = await supabase
    .from('wishlist')
    .select('tool_id')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }

  return data.map(item => item.tool_id);
};

export const upvoteTool = async (userId: string, toolId: string): Promise<{ error?: Error }> => {
  try {
    // Just increment the votes count directly
    const { error } = await supabase
      .from('tools')
      .update({ votes: supabase.rpc('increment') })
      .eq('id', toolId);

    if (error) throw error;

    return { error: undefined };
  } catch (error) {
    console.error('Error in upvoteTool:', error);
    return { 
      error: error instanceof Error ? error : new Error('Failed to upvote tool') 
    };
  }
};
