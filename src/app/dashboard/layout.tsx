"use client"

import React, { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { DashboardShell } from "@/components/features/dashboard/dashboard-shell"
import { Toaster } from "@/components/ui/toaster"
import { supabase } from "@/lib/supabase/client"
import { UserType } from "@/lib/types"

// Metadata is defined in metadata.ts file in the same directory

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [userType, setUserType] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  
  // Check if current path is in the employer section
  const isEmployerRoute = pathname?.includes('/dashboard/employer')
  
  useEffect(() => {
    // Fetch user type from profile
    const fetchUserType = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          // First check user metadata (most reliable source)
          const userRole = user.user_metadata?.role as string || '';
          console.log('User role from metadata:', userRole);
          
          if (userRole === 'employer') {
            setUserType('employer');
            setLoading(false);
            return;
          } else if (userRole === 'freelancer') {
            setUserType('freelancer');
            setLoading(false);
            return;
          }
          
          // If no metadata role, check employer_profiles
          const { data: employerProfile, error: employerError } = await supabase
            .from('employer_profiles')
            .select('id')
            .eq('user_id', user.id)
            .single();
          
          if (employerProfile) {
            setUserType('employer');
            setLoading(false);
            return;
          }
          
          // Check freelancer_profiles
          const { data: freelancerProfile, error: freelancerError } = await supabase
            .from('freelancer_profiles')
            .select('id')
            .eq('user_id', user.id)
            .single();
          
          if (freelancerProfile) {
            setUserType('freelancer');
          } else {
            // Default to freelancer if no profiles found
            setUserType('freelancer');
            console.warn('No user profiles found, defaulting to freelancer');
          }
        }
      } catch (error) {
        console.error('Error fetching user type:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserType()
  }, [])
  
  return (
    <>
      <DashboardShell isEmployer={isEmployerRoute}>
        {children}
      </DashboardShell>
      <Toaster />
    </>
  )
}
