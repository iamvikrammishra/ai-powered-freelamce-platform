import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, DollarSign, FileText, CheckCircle } from "lucide-react"

export function ActivityFeed() {
  const activities = [
    {
      id: 1,
      type: "message",
      title: "New message from Ananya",
      description: "Regarding the website project timeline",
      time: "10 minutes ago",
      icon: <MessageSquare className="h-4 w-4" />,
      iconColor: "text-blue-500",
      avatar: "/placeholder.svg?height=32&width=32&query=indian woman professional headshot",
      avatarFallback: "AP",
    },
    {
      id: 2,
      type: "payment",
      title: "Payment received",
      description: "₹12,500 for Logo Design project",
      time: "2 hours ago",
      icon: <DollarSign className="h-4 w-4" />,
      iconColor: "text-green-500",
    },
    {
      id: 3,
      type: "proposal",
      title: "Proposal viewed",
      description: "Tech Solutions viewed your proposal",
      time: "Yesterday",
      icon: <FileText className="h-4 w-4" />,
      iconColor: "text-purple-500",
    },
    {
      id: 4,
      type: "milestone",
      title: "Milestone completed",
      description: "Mobile App UI Design approved",
      time: "2 days ago",
      icon: <CheckCircle className="h-4 w-4" />,
      iconColor: "text-green-500",
      avatar: "/placeholder.svg?height=32&width=32&query=indian man professional headshot",
      avatarFallback: "VS",
    },
  ]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest interactions and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              {activity.avatar ? (
                <Avatar className="h-9 w-9">
                  <AvatarImage src={activity.avatar || "/placeholder.svg"} alt="Avatar" />
                  <AvatarFallback>{activity.avatarFallback}</AvatarFallback>
                </Avatar>
              ) : (
                <div className={`rounded-full p-2 ${activity.iconColor} bg-muted`}>{activity.icon}</div>
              )}
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
