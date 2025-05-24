import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { type CookieOptions } from '@supabase/ssr'

// For server components only
export function createServerSupabaseClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          try {
            // Using synchronous access to cookies() in a server component context
            return cookies().get(name)?.value
          } catch (error) {
            console.error('Error getting cookie:', error)
            return undefined
          }
        },
        set(name: string, value: string, options: CookieOptions) {
          // No-op in server components - cookies are immutable here
          // This would be used in middleware or server actions
        },
        remove(name: string, options: CookieOptions) {
          // No-op in server components - cookies are immutable here
          // This would be used in middleware or server actions
        },
      },
    }
  )
}
