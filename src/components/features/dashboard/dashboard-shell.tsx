"use client"

import React, { useState, useEffect } from "react"
import { DashboardNav } from "@/components/features/dashboard/dashboard-nav"
import { EmployerSidebar } from "@/components/features/dashboard/employer-sidebar"
import { UserNav } from "@/components/features/dashboard/user-nav"
import { ModeToggle } from "@/components/common/mode-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils/index"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, Search, Bell } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface DashboardShellProps {
  children: React.ReactNode
  isEmployer?: boolean
}

export function DashboardShell({ children, isEmployer = false }: DashboardShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showShadow, setShowShadow] = useState(false)
  const [notifications, setNotifications] = useState(3) // Example notification count

  // Add scroll shadow effect to the header
  useEffect(() => {
    const handleScroll = () => {
      setShowShadow(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
        showShadow && "shadow-sm"
      )}>
        <div className="container flex h-16 items-center justify-between py-4">
          {/* Mobile menu trigger and logo */}
          <div className="flex items-center gap-4">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0">
                <div className="flex h-16 items-center border-b px-4">
                  <Link 
                    href="/" 
                    className="flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                      GigIndia
                    </span>
                  </Link>
                </div>
                <div className="py-4">
                  {isEmployer ? (
                    <EmployerSidebar />
                  ) : (
                    <DashboardNav isEmployer={isEmployer} />
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Logo */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="hidden items-center space-x-2 md:flex">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                  GigIndia
                </span>
              </Link>
            </motion.div>

            {/* Global Search */}
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Button
                variant="outline"
                className="group inline-flex items-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-9 w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
              >
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 group-hover:opacity-100" />
                <span className="hidden lg:inline-flex">Search everything...</span>
                <span className="inline-flex lg:hidden">Search...</span>
                <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
            </div>
          </div>

          {/* Header Right Items */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {notifications}
                </span>
              )}
            </Button>

            <ModeToggle />
            <UserNav />
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Desktop Sidebar - Different for employer and freelancer */}
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <div className="h-full py-6 pl-8 pr-6">
            {isEmployer ? (
              <EmployerSidebar />
            ) : (
              <DashboardNav isEmployer={isEmployer} />
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex w-full flex-col overflow-hidden px-4 md:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div 
              key="dashboard-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
