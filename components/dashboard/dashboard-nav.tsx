"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Search,
  Briefcase,
  MessageSquare,
  CreditCard,
  Settings,
  Users,
  FileText,
  Bell,
  HelpCircle,
  Video,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export function DashboardNav() {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Find Work",
      href: "/dashboard/find-work",
      icon: <Search className="mr-2 h-4 w-4" />,
    },
    {
      title: "Meetings",
      href: "/dashboard/meetings",
      icon: <Video className="mr-2 h-4 w-4" />,
    },
    {
      title: "My Projects",
      href: "/dashboard/projects",
      icon: <Briefcase className="mr-2 h-4 w-4" />,
    },
    {
      title: "Messages",
      href: "/dashboard/messages",
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
    },
    {
      title: "Payments",
      href: "/dashboard/payments",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Proposals",
      href: "/dashboard/proposals",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      title: "Mentorship",
      href: "/dashboard/mentorship",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      title: "Notifications",
      href: "/dashboard/notifications",
      icon: <Bell className="mr-2 h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
    {
      title: "Help & Support",
      href: "/dashboard/support",
      icon: <HelpCircle className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <nav className="grid items-start gap-2 py-4">
      {navItems.map((item, index) => (
        <Button
          key={index}
          asChild
          variant={pathname === item.href ? "secondary" : "ghost"}
          className={cn("justify-start", pathname === item.href && "bg-muted font-medium")}
        >
          <Link href={item.href}>
            {item.icon}
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
