"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video, MessageSquare, Users } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function UpcomingMeetings() {
  const [isLoading, setIsLoading] = useState(false)

  // Mock upcoming meetings data
  const upcomingMeetings = [
    {
      id: 1,
      title: "Project Kickoff Meeting",
      participant: {
        name: "Priya Sharma",
        avatar: "/indian-woman-professional.png",
        initials: "PS",
        role: "Client",
        company: "TechCorp Solutions",
      },
      date: "May 25, 2025",
      time: "10:00 AM - 11:00 AM",
      duration: "1 hour",
      type: "video",
      status: "confirmed",
      agenda: "Discuss project requirements, timeline, and deliverables for the e-commerce website development.",
      meetingLink: "https://meet.gigindia.com/room/abc123",
    },
    {
      id: 2,
      title: "Design Review Session",
      participant: {
        name: "Rahul Mehta",
        avatar: "/indian-professional-man.png",
        initials: "RM",
        role: "Freelancer",
        company: "UI/UX Designer",
      },
      date: "May 26, 2025",
      time: "2:00 PM - 3:00 PM",
      duration: "1 hour",
      type: "video",
      status: "pending",
      agenda: "Review wireframes and mockups for the mobile app design project.",
      meetingLink: "https://meet.gigindia.com/room/def456",
    },
    {
      id: 3,
      title: "Weekly Progress Update",
      participant: {
        name: "Ananya Patel",
        avatar: "/indian-woman-professional-headshot.png",
        initials: "AP",
        role: "Client",
        company: "StartupXYZ",
      },
      date: "May 27, 2025",
      time: "4:00 PM - 4:30 PM",
      duration: "30 minutes",
      type: "video",
      status: "confirmed",
      agenda: "Weekly check-in on content writing project progress and next steps.",
      meetingLink: "https://meet.gigindia.com/room/ghi789",
    },
  ]

  const handleJoinMeeting = (meetingId: number, meetingLink: string) => {
    setIsLoading(true)

    // Simulate joining meeting
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Joining meeting",
        description: "Opening meeting room...",
      })
      // In a real app, this would open the meeting room
      window.open(meetingLink, "_blank")
    }, 1000)
  }

  const handleCancelMeeting = (meetingId: number) => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Meeting cancelled",
        description: "The meeting has been cancelled and participants have been notified.",
      })
    }, 1000)
  }

  const handleRescheduleMeeting = (meetingId: number) => {
    toast({
      title: "Reschedule meeting",
      description: "Redirecting to reschedule form...",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Meetings</CardTitle>
          <CardDescription>Your scheduled meetings with clients and freelancers.</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingMeetings.length === 0 ? (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No upcoming meetings scheduled.</p>
              <Button className="mt-4 bg-purple-600 hover:bg-purple-700">Schedule a Meeting</Button>
            </div>
          ) : (
            <div className="space-y-6">
              {upcomingMeetings.map((meeting) => (
                <div key={meeting.id} className="border rounded-lg p-6 space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="flex gap-3 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={meeting.participant.avatar || "/placeholder.svg"}
                          alt={meeting.participant.name}
                        />
                        <AvatarFallback>{meeting.participant.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{meeting.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          with {meeting.participant.name} • {meeting.participant.role}
                        </p>
                        <p className="text-sm text-muted-foreground">{meeting.participant.company}</p>
                      </div>
                    </div>

                    <Badge
                      variant={meeting.status === "confirmed" ? "default" : "outline"}
                      className={
                        meeting.status === "confirmed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }
                    >
                      {meeting.status === "confirmed" ? "Confirmed" : "Pending Confirmation"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{meeting.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-muted-foreground" />
                      <span>Video Call ({meeting.duration})</span>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Meeting Agenda</h4>
                    <p className="text-sm text-muted-foreground">{meeting.agenda}</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {meeting.status === "confirmed" && (
                      <Button
                        onClick={() => handleJoinMeeting(meeting.id, meeting.meetingLink)}
                        disabled={isLoading}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <Video className="mr-2 h-4 w-4" />
                        Join Meeting
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => handleRescheduleMeeting(meeting.id)}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Reschedule
                    </Button>
                    <Button variant="outline" onClick={() => handleCancelMeeting(meeting.id)} disabled={isLoading}>
                      Cancel Meeting
                    </Button>
                    <Button variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
