// This file exports configuration variables and re-exports the client Supabase client
// For server components, import from './supabase/server.ts' instead
import { createClient } from '@supabase/supabase-js'

// These environment variables need to be set in your .env.local file
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create a default Supabase client for client components
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Re-export the client for convenience
export { supabase as default } from './supabase/client'

// Note: For server components, use the following import instead:
// import { createServerSupabaseClient } from './supabase/server'
