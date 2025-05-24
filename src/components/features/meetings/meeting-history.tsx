"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Video, FileText, Star, Search, Filter } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function MeetingHistory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Mock meeting history data
  const meetingHistory = [
    {
      id: 1,
      title: "Project Requirements Discussion",
      participant: {
        name: "Priya Sharma",
        avatar: "/indian-woman-professional.png",
        initials: "PS",
        role: "Client",
        company: "TechCorp Solutions",
      },
      date: "May 20, 2025",
      time: "10:00 AM - 11:00 AM",
      duration: "1 hour",
      status: "completed",
      rating: 5,
      notes: "Discussed project scope, timeline, and budget. Client approved the initial proposal.",
      recordingAvailable: true,
    },
    {
      id: 2,
      title: "Design Feedback Session",
      participant: {
        name: "Rahul Mehta",
        avatar: "/indian-professional-man.png",
        initials: "RM",
        role: "Freelancer",
        company: "UI/UX Designer",
      },
      date: "May 18, 2025",
      time: "2:00 PM - 3:00 PM",
      duration: "1 hour",
      status: "completed",
      rating: 4,
      notes: "Reviewed wireframes and discussed user flow improvements. Need to iterate on the checkout process.",
      recordingAvailable: true,
    },
    {
      id: 3,
      title: "Content Strategy Planning",
      participant: {
        name: "Ananya Patel",
        avatar: "/indian-woman-professional-headshot.png",
        initials: "AP",
        role: "Client",
        company: "StartupXYZ",
      },
      date: "May 15, 2025",
      time: "4:00 PM - 4:30 PM",
      duration: "30 minutes",
      status: "completed",
      rating: 5,
      notes: "Planned content calendar for Q2. Discussed blog topics and social media strategy.",
      recordingAvailable: false,
    },
    {
      id: 4,
      title: "Technical Architecture Review",
      participant: {
        name: "Vikram Singh",
        avatar: "/indian-man-headshot.png",
        initials: "VS",
        role: "Freelancer",
        company: "Full Stack Developer",
      },
      date: "May 12, 2025",
      time: "11:00 AM - 12:00 PM",
      duration: "1 hour",
      status: "completed",
      rating: 5,
      notes: "Reviewed system architecture and database design. Approved technology stack choices.",
      recordingAvailable: true,
    },
    {
      id: 5,
      title: "Project Kickoff",
      participant: {
        name: "Priya Sharma",
        avatar: "/indian-woman-professional.png",
        initials: "PS",
        role: "Client",
        company: "TechCorp Solutions",
      },
      date: "May 10, 2025",
      time: "9:00 AM - 10:00 AM",
      duration: "1 hour",
      status: "no-show",
      rating: null,
      notes: "Client did not attend the scheduled meeting.",
      recordingAvailable: false,
    },
  ]

  const filteredMeetings = meetingHistory.filter((meeting) => {
    const matchesSearch =
      meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.participant.company.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = filterStatus === "all" || meeting.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const handleViewRecording = (meetingId: number) => {
    toast({
      title: "Opening recording",
      description: "Loading meeting recording...",
    })
  }

  const handleDownloadNotes = (meetingId: number) => {
    toast({
      title: "Downloading notes",
      description: "Meeting notes are being downloaded...",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Completed</Badge>
      case "no-show":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">No Show</Badge>
      case "cancelled":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const renderStars = (rating: number | null) => {
    if (!rating) return <span className="text-muted-foreground">No rating</span>

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-1 text-sm text-muted-foreground">({rating}/5)</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Meeting History</CardTitle>
          <CardDescription>View your past meetings and access recordings.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search meetings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Meetings</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="no-show">No Show</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredMeetings.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No meetings found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredMeetings.map((meeting) => (
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

                    {getStatusBadge(meeting.status)}
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
                      <span>Duration: {meeting.duration}</span>
                    </div>
                  </div>

                  {meeting.rating && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Meeting Rating:</span>
                      {renderStars(meeting.rating)}
                    </div>
                  )}

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Meeting Notes</h4>
                    <p className="text-sm text-muted-foreground">{meeting.notes}</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {meeting.recordingAvailable && (
                      <Button variant="outline" onClick={() => handleViewRecording(meeting.id)}>
                        <Video className="mr-2 h-4 w-4" />
                        View Recording
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => handleDownloadNotes(meeting.id)}>
                      <FileText className="mr-2 h-4 w-4" />
                      Download Notes
                    </Button>
                    <Button variant="outline">Schedule Follow-up</Button>
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
