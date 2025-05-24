"use client"

import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"

interface ConditionalNavbarProps {
  children: ReactNode
}

export function ConditionalNavbar({ children }: ConditionalNavbarProps) {
  const pathname = usePathname()
  const isDashboardPath = pathname?.startsWith("/dashboard")
  const isAuthPath = pathname?.startsWith("/auth")
  const isAdminPath = pathname?.startsWith("/admin")
  
  // Don't show the main navbar on dashboard, auth, or admin pages
  const shouldShowNavbar = !isDashboardPath && !isAuthPath && !isAdminPath
  
  return (
    <>
      {shouldShowNavbar && <Navbar />}
      {children}
    </>
  )
}
