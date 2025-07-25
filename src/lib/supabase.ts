import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Tool {
  id: string
  name: string
  description: string
  category: string
  website_url: string
  logo_url?: string
  created_at: string
  created_by: string
  featured: boolean
  average_rating: number
  total_reviews: number
}

export interface Review {
  id: string
  tool_id: string
  user_id: string
  rating: number
  comment: string
  created_at: string
  user_name: string
}

export interface Wishlist {
  id: string
  user_id: string
  tool_id: string
  created_at: string
}

export interface UserProfile {
  id: string
  email: string
  full_name: string
  bio?: string
  avatar_url?: string
  organization?: string
  role?: string
  created_at: string
}