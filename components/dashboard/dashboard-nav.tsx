"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
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
  ChevronRight,
  ListTodo,
  UserCircle,
  BarChart,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  variant?: "default" | "ghost" | "outline"
  badge?: string | number
  disabled?: boolean
}

interface NavSection {
  title: string
  items: NavItem[]
}

interface DashboardNavProps {
  isEmployer?: boolean
}

export function DashboardNav({ isEmployer = false }: DashboardNavProps) {
  const pathname = usePathname()

  // Freelancer navigation sections
  const freelancerNavSections: NavSection[] = [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: <LayoutDashboard className="h-4 w-4" />,
        },
        {
          title: "Profile",
          href: "/dashboard/profile",
          icon: <UserCircle className="h-4 w-4" />,
        },
        {
          title: "Analytics",
          href: "/dashboard/analytics",
          icon: <BarChart className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Freelancing",
      items: [
        {
          title: "Find Work",
          href: "/dashboard/find-work",
          icon: <Search className="h-4 w-4" />,
        },
        {
          title: "Find Jobs",
          href: "/dashboard/find-jobs",
          icon: <ListTodo className="h-4 w-4" />,
        },
        {
          title: "My Projects",
          href: "/dashboard/projects",
          icon: <Briefcase className="h-4 w-4" />,
        },
        {
          title: "Proposals",
          href: "/dashboard/proposals",
          icon: <FileText className="h-4 w-4" />,
          badge: 3,
        },
      ],
    },
    {
      title: "Communication",
      items: [
        {
          title: "Messages",
          href: "/dashboard/messages",
          icon: <MessageSquare className="h-4 w-4" />,
          badge: 5,
        },
        {
          title: "Meetings",
          href: "/dashboard/meetings",
          icon: <Video className="h-4 w-4" />,
        },
        {
          title: "Notifications",
          href: "/dashboard/notifications",
          icon: <Bell className="h-4 w-4" />,
          badge: 8,
        },
      ],
    },
    {
      title: "Financial",
      items: [
        {
          title: "Payments",
          href: "/dashboard/payments",
          icon: <CreditCard className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          title: "Mentorship",
          href: "/dashboard/mentorship",
          icon: <Users className="h-4 w-4" />,
        },
        {
          title: "Settings",
          href: "/dashboard/settings",
          icon: <Settings className="h-4 w-4" />,
        },
        {
          title: "Help & Support",
          href: "/dashboard/support",
          icon: <HelpCircle className="h-4 w-4" />,
        },
      ],
    },
  ]

  // Employer navigation sections
  const employerNavSections: NavSection[] = [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          href: "/dashboard/employer",
          icon: <LayoutDashboard className="h-4 w-4" />,
        },
        {
          title: "Profile",
          href: "/dashboard/employer/profile",
          icon: <UserCircle className="h-4 w-4" />,
        },
        {
          title: "Analytics",
          href: "/dashboard/employer/analytics",
          icon: <BarChart className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Hiring",
      items: [
        {
          title: "Post a Job",
          href: "/dashboard/employer/post-job",
          icon: <FileText className="h-4 w-4" />,
        },
        {
          title: "Jobs",
          href: "/dashboard/employer/jobs",
          icon: <Briefcase className="h-4 w-4" />,
        },
        {
          title: "Applicants",
          href: "/dashboard/employer/applicants",
          icon: <Users className="h-4 w-4" />,
          badge: 12,
        },
        {
          title: "Contracts",
          href: "/dashboard/employer/contracts",
          icon: <FileText className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Communication",
      items: [
        {
          title: "Messages",
          href: "/dashboard/employer/messages",
          icon: <MessageSquare className="h-4 w-4" />,
          badge: 3,
        },
        {
          title: "Meetings",
          href: "/dashboard/employer/meetings",
          icon: <Video className="h-4 w-4" />,
        },
        {
          title: "Notifications",
          href: "/dashboard/employer/notifications",
          icon: <Bell className="h-4 w-4" />,
          badge: 5,
        },
      ],
    },
    {
      title: "Financial",
      items: [
        {
          title: "Payments",
          href: "/dashboard/employer/payments",
          icon: <CreditCard className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          title: "Team Management",
          href: "/dashboard/employer/team",
          icon: <Users className="h-4 w-4" />,
        },
        {
          title: "Settings",
          href: "/dashboard/employer/settings",
          icon: <Settings className="h-4 w-4" />,
        },
        {
          title: "Help & Support",
          href: "/dashboard/employer/support",
          icon: <HelpCircle className="h-4 w-4" />,
        },
      ],
    },
  ]

  // Use the appropriate navigation sections based on user type
  const navSections = isEmployer ? employerNavSections : freelancerNavSections

  return (
    <ScrollArea className="h-full py-6 pl-3 pr-2">
      <div className="flex flex-col gap-4">
        {navSections.map((section: NavSection, sIndex: number) => (
          <div key={sIndex} className="pb-2">
            <h3 className="mb-1 px-4 text-xs font-semibold text-muted-foreground">
              {section.title}
            </h3>
            <div className="grid gap-1">
              {section.items.map((item, iIndex) => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                return (
                  <TooltipProvider key={iIndex} delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          asChild
                          variant={isActive ? "secondary" : "ghost"}
                          className={cn(
                            "h-9 justify-start px-4",
                            isActive && "bg-accent font-medium text-accent-foreground"
                          )}
                          disabled={item.disabled}
                        >
                          <Link href={item.disabled ? "#" : item.href} className="flex w-full items-center justify-between">
                            <div className="flex items-center gap-2">
                              {item.icon}
                              <span>{item.title}</span>
                            </div>
                            {item.badge && (
                              <Badge variant="outline" className="ml-auto h-5 px-1.5 py-0 font-normal">
                                {item.badge}
                              </Badge>
                            )}
                            {isActive && <ChevronRight className="ml-auto h-4 w-4 opacity-70" />}
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right" align="center" className="flex items-center gap-2">
                        {item.title}
                        {item.badge && (
                          <Badge variant="secondary" className="h-5 px-1 py-0">
                            {item.badge}
                          </Badge>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
