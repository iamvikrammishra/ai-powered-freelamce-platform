'use client'

import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { type SupabaseClient, type AuthError } from '@supabase/supabase-js'

export const useSupabase = () => {
  const router = useRouter()
  const [authError, setAuthError] = useState<AuthError | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<any>(null)

  // Check current auth state and set up listener for changes
  useEffect(() => {
    const checkUser = async () => {
      try {
        setIsLoading(true)
        
        // Get current user
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error) {
          if (error.message.includes('Invalid Refresh Token')) {
            console.warn('Invalid refresh token detected, signing out')
            await supabase.auth.signOut()
            router.push('/login')
          }
          setAuthError(error)
        } else {
          setUser(user)
          setAuthError(null)
        }
      } catch (err) {
        console.error('Error checking auth state:', err)
      } finally {
        setIsLoading(false)
      }
    }
    
    checkUser()
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event)
        
        if (event === 'SIGNED_IN') {
          setUser(session?.user || null)
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          router.push('/login')
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed successfully')
        } else if (event === 'USER_UPDATED') {
          setUser(session?.user || null)
        }
      }
    )
    
    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  return { supabase, user, authError, isLoading }
}

export default useSupabase
