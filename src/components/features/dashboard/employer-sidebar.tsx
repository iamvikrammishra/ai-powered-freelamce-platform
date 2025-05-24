"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/index"
import { 
  Plus, 
  Briefcase, 
  Users, 
  FileText, 
  MessageSquare, 
  CreditCard, 
  Search,
  Calendar,
  Settings,
  BarChart3,
  HelpCircle
} from "lucide-react"

export function EmployerSidebar() {
  const pathname = usePathname()
  
  const quickActions = [
    {
      title: "Post a Job",
      href: "/dashboard/employer/post-job",
      icon: <Plus className="h-5 w-5" />,
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Find Talent",
      href: "/dashboard/employer/find-talent",
      icon: <Search className="h-5 w-5" />,
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      title: "Schedule Interview",
      href: "/dashboard/employer/schedule",
      icon: <Calendar className="h-5 w-5" />,
      color: "bg-green-500 hover:bg-green-600"
    }
  ]
  
  const mainNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard/employer",
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      title: "Jobs",
      href: "/dashboard/employer/jobs",
      icon: <Briefcase className="h-5 w-5" />
    },
    {
      title: "Applicants",
      href: "/dashboard/employer/applicants",
      icon: <Users className="h-5 w-5" />
    },
    {
      title: "Contracts",
      href: "/dashboard/employer/contracts",
      icon: <FileText className="h-5 w-5" />
    },
    {
      title: "Messages",
      href: "/dashboard/employer/messages",
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      title: "Payments",
      href: "/dashboard/employer/payments",
      icon: <CreditCard className="h-5 w-5" />
    }
  ]
  
  const bottomNavItems = [
    {
      title: "Settings",
      href: "/dashboard/employer/settings",
      icon: <Settings className="h-5 w-5" />
    },
    {
      title: "Help & Support",
      href: "/dashboard/employer/support",
      icon: <HelpCircle className="h-5 w-5" />
    }
  ]

  return (
    <div className="flex h-full flex-col justify-between">
      {/* Quick Action Buttons */}
      <div className="space-y-3 px-3 py-2">
        <h3 className="px-4 text-sm font-semibold text-muted-foreground">Quick Actions</h3>
        <div className="grid gap-2">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="block"
            >
              <Button 
                className={cn(
                  "w-full justify-start text-white", 
                  action.color
                )}
              >
                {action.icon}
                <span className="ml-2">{action.title}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Main Navigation */}
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <h3 className="px-4 py-2 text-sm font-semibold text-muted-foreground">Main Menu</h3>
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  isActive 
                    ? "bg-muted font-medium text-primary" 
                    : "text-muted-foreground"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>
      
      {/* Bottom Navigation */}
      <div className="mt-auto px-2 py-2">
        <nav className="grid items-start px-2 text-sm font-medium border-t pt-4">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  isActive 
                    ? "bg-muted font-medium text-primary" 
                    : "text-muted-foreground"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
