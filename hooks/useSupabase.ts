'use client'

import { createBrowserSupabaseClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { type SupabaseClient } from '@supabase/supabase-js'

export const useSupabase = () => {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null)

  useEffect(() => {
    const client = createBrowserSupabaseClient()
    setSupabase(client)

    return () => {
      // Nothing to cleanup
    }
  }, [])

  return supabase
}

export default useSupabase
