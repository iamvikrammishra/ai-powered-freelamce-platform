"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bell, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/mode-toggle"
import { supabase } from "@/lib/supabase/client"
import { UserType } from "@/lib/types"

interface HeaderProps {
  user: any
  userType: UserType | null
}

export function Header({ user, userType }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    async function fetchProfileAndNotifications() {
      if (!user) return

      try {
        // Fetch profile based on user type
        const table = userType === 'employer' ? 'employer_profiles' : 'freelancer_profiles'
        const { data: profileData, error: profileError } = await supabase
          .from(table)
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (profileError) throw profileError
        setProfile(profileData)

        // Fetch unread notifications
        const { data: notifData, error: notifError } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .eq('is_read', false)
          .order('created_at', { ascending: false })
          .limit(5)

        if (notifError) throw notifError
        setNotifications(notifData || [])
        setUnreadCount(notifData?.length || 0)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchProfileAndNotifications()
  }, [user, userType])

  const getInitials = (name: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
      <div className="mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          <div className="flex-1 md:ml-8">
            <div className="md:hidden">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
                  GigIndia
                </span>
              </Link>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {userType === 'employer' ? 'Employer Dashboard' : 'Freelancer Dashboard'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white"
                  variant="secondary"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
            
            <ModeToggle />
            
            <div className="flex items-center">
              <Link href="/dashboard/profile">
                <Avatar className="h-8 w-8 border border-gray-200 dark:border-gray-700">
                  <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || user?.email} />
                  <AvatarFallback>
                    {getInitials(profile?.full_name || user?.email)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="space-y-1 px-4 py-4">
            {userType === 'employer' ? (
              <>
                <Link href="/dashboard" className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</Link>
                <Link href="/dashboard/post-job" className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Post a Job</Link>
                <Link href="/dashboard/my-jobs" className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">My Jobs</Link>
                <Link href="/dashboard/find-talent" className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Find Talent</Link>
                <Link href="/dashboard/messages" className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Messages</Link>
                <Link href="/dashboard/payments" className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Payments</Link>
                <Link href="/dashboard/profile" className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Company Profile</Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</Link>
                <Link href="/dashboard/find-jobs" className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Find Jobs</Link>
                <Link href="/dashboard/my-jobs" className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">My Jobs</Link>
                <Link href="/dashboard/proposals" className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Proposals</Link>
                <Link href="/dashboard/messages" className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Messages</Link>
                <Link href="/dashboard/earnings" className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Earnings</Link>
                <Link href="/dashboard/profile" className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">My Profile</Link>
              </>
            )}
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-600 px-3 py-2 text-base font-medium rounded-md hover:bg-red-50"
              onClick={async () => {
                await supabase.auth.signOut()
                window.location.href = "/"
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
