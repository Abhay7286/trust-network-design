import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'


/**
 * This is context interface
 * here you would see all the context related to the user 
 * whether they are logged in signed out,etc
 * Interface provides us structure for state management.
 * 
 * <promise.void> means nothing is to be returned even thogh function mighe be returned in future.
 */
interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('Internal error: Fix your useAuth')
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    /**
     * Here we either get our user's session and id to log in 
     * or we create one.
     */
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )
    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) 
      {
        // Show a toast notification for failed login
        toast.error("Login failed: ");
        throw error
      }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    })
    if (error) throw error
  }

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}`
      }
    })
    if (error) throw error
  }

 const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error)
    {
    toast.error("Logout failed: ")
    }
    // Clear user state
    setUser(null)

    // Optional: Clear any local storage
    localStorage.removeItem('sb-auth-token')
    
    // Optional: Redirect after logout
    window.location.href = '/' 
  } catch (error) {
    console.error('Logout error:', error)
    throw error // Re-throw to handle in components
  }
}

/**
 * Whatever value the auth provides I pass it down as context to other pages.
 */

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
