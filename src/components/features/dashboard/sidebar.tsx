"use client"

import Link from "next/link"
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  MessageSquare, 
  FileText, 
  Settings, 
  LogOut, 
  Search,
  BarChart4,
  CreditCard,
  Bell,
  BookOpen,
  Star
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { UserType } from "@/lib/types"

interface SidebarProps {
  userType: UserType | null
  pathname: string
}

export function Sidebar({ userType, pathname }: SidebarProps) {
  const router = useRouter()

  const freelancerLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/find-jobs", label: "Find Jobs", icon: Search },
    { href: "/dashboard/my-jobs", label: "My Jobs", icon: Briefcase },
    { href: "/dashboard/proposals", label: "Proposals", icon: FileText },
    { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
    { href: "/dashboard/earnings", label: "Earnings", icon: CreditCard },
    { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
    { href: "/dashboard/skills", label: "Skills & Tests", icon: Star },
    { href: "/dashboard/profile", label: "My Profile", icon: Users },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ]

  const employerLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/post-job", label: "Post a Job", icon: FileText },
    { href: "/dashboard/my-jobs", label: "My Jobs", icon: Briefcase },
    { href: "/dashboard/find-talent", label: "Find Talent", icon: Search },
    { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
    { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart4 },
    { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
    { href: "/dashboard/profile", label: "Company Profile", icon: Users },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ]

  const links = userType === "employer" ? employerLinks : freelancerLinks

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
            GigIndia
          </span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {links.map((link) => {
            const isActive = pathname === link.href
            const Icon = link.icon
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-purple-50 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
                )}
              >
                <Icon className={cn("mr-3 h-5 w-5", isActive ? "text-purple-600 dark:text-purple-400" : "text-gray-500 dark:text-gray-400")} />
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/30"
          onClick={handleSignOut}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
