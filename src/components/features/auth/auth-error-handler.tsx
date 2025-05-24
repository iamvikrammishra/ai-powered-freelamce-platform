"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { toast } from "@/components/ui/use-toast"

export function AuthErrorHandler() {
  const router = useRouter()
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          if (error.message.includes('Invalid Refresh Token')) {
            console.warn('Authentication error detected:', error.message)
            
            // Clear the invalid session
            await supabase.auth.signOut()
            
            // Notify the user
            toast({
              title: "Session expired",
              description: "Your session has expired. Please sign in again.",
              variant: "destructive",
            })
            
            // Redirect to login
            router.push('/auth/login')
          }
        }
      } catch (err) {
        console.error('Error checking auth:', err)
      } finally {
        setIsCheckingAuth(false)
      }
    }
    
    checkAuth()
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'TOKEN_REFRESHED') {
        console.log('Auth token refreshed successfully')
      } else if (event === 'SIGNED_OUT') {
        // Handle sign out - this is expected behavior
        console.log('User signed out')
      }
    })
    
    return () => {
      subscription.unsubscribe()
    }
  }, [router])
  
  // This component doesn't render anything
  return null
}
