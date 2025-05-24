"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, DollarSign, FileText, CheckCircle, Bell, ArrowRight, Calendar, Briefcase, Star, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Activity {
  id: number
  type: string
  title: string
  description: string
  time: string
  date?: string
  icon?: React.ReactNode
  iconColor?: string
  avatar?: string
  avatarFallback?: string
  isNew?: boolean
  link?: string
  status?: string
  priority?: 'high' | 'medium' | 'low'
}

interface ActivityFeedProps {
  className?: string
  maxItems?: number
  showViewAll?: boolean
  title?: string
  description?: string
  activeTab?: string
  onTabChange?: (value: string) => void
}

export function ActivityFeed({
  className,
  maxItems = 5,
  showViewAll = true,
  title = "Recent Activity",
  description = "Your latest interactions and updates",
  activeTab,
  onTabChange,
}: ActivityFeedProps) {
  const [selectedTab, setSelectedTab] = useState(activeTab || "all")
  const [expandedActivityId, setExpandedActivityId] = useState<number | null>(null)

  // Handler for tab changes
  const handleTabChange = (value: string) => {
    setSelectedTab(value)
    if (onTabChange) {
      onTabChange(value)
    }
  }

  // Toggle activity expansion
  const toggleActivityExpansion = (id: number) => {
    setExpandedActivityId(expandedActivityId === id ? null : id)
  }

  // Mock activities data
  const allActivities: Activity[] = [
    {
      id: 1,
      type: "message",
      title: "New message from Ananya",
      description: "Hi there! Just following up on the website project timeline. When do you think we can have the first draft ready?",
      time: "10 minutes ago",
      date: "2025-05-24",
      icon: <MessageSquare className="h-4 w-4" />,
      iconColor: "text-blue-500",
      avatar: "/placeholder.svg?height=32&width=32&query=indian woman professional headshot",
      avatarFallback: "AP",
      isNew: true,
      link: "/dashboard/messages/12345",
      priority: "high"
    },
    {
      id: 2,
      type: "payment",
      title: "Payment received",
      description: "₹12,500 payment for Logo Design project has been processed and added to your account balance",
      time: "2 hours ago",
      date: "2025-05-24",
      icon: <DollarSign className="h-4 w-4" />,
      iconColor: "text-green-500",
      isNew: true,
      link: "/dashboard/payments",
      status: "success"
    },
    {
      id: 3,
      type: "proposal",
      title: "Proposal viewed",
      description: "Tech Solutions viewed your proposal for Web Application Development. They've spent approximately 5 minutes reviewing your detailed proposal.",
      time: "Yesterday",
      date: "2025-05-23",
      icon: <FileText className="h-4 w-4" />,
      iconColor: "text-purple-500",
      link: "/dashboard/proposals/789"
    },
    {
      id: 4,
      type: "milestone",
      title: "Milestone completed",
      description: "Mobile App UI Design has been approved by the client. The milestone payment of ₹25,000 has been released to your pending balance.",
      time: "2 days ago",
      date: "2025-05-22",
      icon: <CheckCircle className="h-4 w-4" />,
      iconColor: "text-green-500",
      avatar: "/placeholder.svg?height=32&width=32&query=indian man professional headshot",
      avatarFallback: "VS",
      link: "/dashboard/projects/456",
      status: "completed"
    },
    {
      id: 5,
      type: "meeting",
      title: "Meeting scheduled",
      description: "Project kickoff meeting with InnovateTech scheduled for tomorrow at 3:00 PM",
      time: "3 days ago",
      date: "2025-05-21",
      icon: <Calendar className="h-4 w-4" />,
      iconColor: "text-amber-500",
      link: "/dashboard/meetings"
    },
    {
      id: 6,
      type: "job",
      title: "New job matches",
      description: "5 new jobs matching your skills have been posted in the last 24 hours",
      time: "4 days ago",
      date: "2025-05-20",
      icon: <Briefcase className="h-4 w-4" />,
      iconColor: "text-blue-500",
      link: "/dashboard/find-jobs"
    },
    {
      id: 7,
      type: "review",
      title: "New review received",
      description: "MindScape Solutions gave you a 5-star review for Logo Design project",
      time: "5 days ago",
      date: "2025-05-19",
      icon: <Star className="h-4 w-4" />,
      iconColor: "text-yellow-500",
      link: "/dashboard/profile#reviews"
    },
  ]

  // Filter activities based on selected tab
  const filteredActivities = allActivities.filter(activity => {
    if (selectedTab === "all") return true
    return activity.type === selectedTab
  })

  // Limit the number of activities shown
  const visibleActivities = filteredActivities.slice(0, maxItems)

  // Get activity icon based on type
  const getActivityIcon = (activity: Activity) => {
    if (activity.icon) return activity.icon

    switch (activity.type) {
      case "message":
        return <MessageSquare className="h-4 w-4" />
      case "payment":
        return <DollarSign className="h-4 w-4" />
      case "proposal":
        return <FileText className="h-4 w-4" />
      case "milestone":
        return <CheckCircle className="h-4 w-4" />
      case "notification":
        return <Bell className="h-4 w-4" />
      case "meeting":
        return <Calendar className="h-4 w-4" />
      case "job":
        return <Briefcase className="h-4 w-4" />
      case "review":
        return <Star className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  // Get activity icon color based on type or status
  const getActivityIconColor = (activity: Activity) => {
    if (activity.iconColor) return activity.iconColor

    switch (activity.type) {
      case "message":
        return "text-blue-500"
      case "payment":
        return "text-green-500"
      case "proposal":
        return "text-purple-500"
      case "milestone":
        return "text-green-500"
      case "notification":
        return "text-red-500"
      case "meeting":
        return "text-amber-500"
      case "job":
        return "text-blue-500"
      case "review":
        return "text-yellow-500"
      default:
        return "text-gray-500"
    }
  }

  // Get activity status badge
  const getActivityStatusBadge = (activity: Activity) => {
    if (!activity.status) return null

    const statusConfig: Record<string, { color: string, label: string }> = {
      success: { color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300", label: "Success" },
      pending: { color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300", label: "Pending" },
      completed: { color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300", label: "Completed" },
      cancelled: { color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300", label: "Cancelled" },
    }

    const config = statusConfig[activity.status] || statusConfig.pending

    return (
      <Badge variant="outline" className={`ml-2 ${config.color}`}>
        {config.label}
      </Badge>
    )
  }

  return (
    <Card className={cn("col-span-1", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={handleTabChange} className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="message">Messages</TabsTrigger>
            <TabsTrigger value="payment">Payments</TabsTrigger>
            <TabsTrigger value="proposal">Proposals</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[380px] pr-4">
          <AnimatePresence initial={false} mode="popLayout">
            {visibleActivities.length > 0 ? (
              <motion.div layout className="space-y-4">
                {visibleActivities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "relative flex items-start gap-4 rounded-lg border p-4 transition-colors",
                      activity.isNew ? "border-blue-100 bg-blue-50/50 dark:border-blue-900/50 dark:bg-blue-900/20" : "border-transparent hover:bg-accent",
                      activity.link && "cursor-pointer",
                      expandedActivityId === activity.id && "border-muted-foreground/20"
                    )}
                    onClick={() => activity.link && toggleActivityExpansion(activity.id)}
                  >
                    {activity.isNew && (
                      <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary" />
                    )}

                    {activity.avatar ? (
                      <Avatar className="h-9 w-9 border">
                        <AvatarImage src={activity.avatar} alt="Avatar" />
                        <AvatarFallback>{activity.avatarFallback}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className={`flex h-9 w-9 items-center justify-center rounded-full ${getActivityIconColor(activity)} bg-muted/80`}>
                        {getActivityIcon(activity)}
                      </div>
                    )}

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center">
                        <p className="text-sm font-medium leading-none">{activity.title}</p>
                        {getActivityStatusBadge(activity)}
                      </div>
                      
                      <AnimatePresence>
                        {expandedActivityId === activity.id ? (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <p className="pt-2 text-sm text-foreground">{activity.description}</p>
                          </motion.div>
                        ) : (
                          <p className="text-sm text-muted-foreground line-clamp-1">{activity.description}</p>
                        )}
                      </AnimatePresence>
                      
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                        {activity.priority === "high" && (
                          <Badge variant="outline" className="h-5 px-1 py-0 text-xs font-normal text-red-500 bg-red-50 dark:bg-red-900/20">
                            Urgent
                          </Badge>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="flex h-[300px] items-center justify-center">
                <p className="text-center text-sm text-muted-foreground">
                  No activities found
                </p>
              </div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
      
      {showViewAll && filteredActivities.length > maxItems && (
        <CardFooter className="border-t px-6 py-4">
          <Button variant="ghost" className="w-full justify-center" asChild>
            <a href="/dashboard/notifications">
              View all activities
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
