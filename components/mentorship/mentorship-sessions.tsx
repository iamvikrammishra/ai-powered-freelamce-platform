"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video, MessageSquare, FileText } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export function MentorshipSessions() {
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState("")

  // Mock sessions data
  const upcomingSessions = [
    {
      id: 1,
      mentor: {
        name: "Vikram Singh",
        avatar: "/placeholder.svg?key=k5b0k",
        initials: "VS",
        title: "Senior Full Stack Developer",
      },
      date: "May 25, 2025",
      time: "10:00 AM - 11:00 AM",
      topic: "React Performance Optimization",
      status: "confirmed",
    },
    {
      id: 2,
      mentor: {
        name: "Priya Sharma",
        avatar: "/placeholder.svg?key=dldwe",
        initials: "PS",
        title: "UI/UX Design Lead",
      },
      date: "May 28, 2025",
      time: "2:00 PM - 3:00 PM",
      topic: "Portfolio Review & Feedback",
      status: "pending",
    },
  ]

  const pastSessions = [
    {
      id: 3,
      mentor: {
        name: "Rahul Mehta",
        avatar: "/placeholder.svg?key=idnr1",
        initials: "RM",
        title: "DevOps & Cloud Architect",
      },
      date: "May 10, 2025",
      time: "11:00 AM - 12:00 PM",
      topic: "Introduction to AWS Services",
      status: "completed",
      feedbackGiven: true,
    },
    {
      id: 4,
      mentor: {
        name: "Ananya Patel",
        avatar: "/placeholder.svg?height=40&width=40&query=indian woman professional headshot 2",
        initials: "AP",
        title: "Content Strategy Specialist",
      },
      date: "May 5, 2025",
      time: "3:00 PM - 4:00 PM",
      topic: "SEO Best Practices for Content",
      status: "completed",
      feedbackGiven: false,
    },
  ]

  const handleJoinSession = (sessionId: number) => {
    toast({
      title: "Joining session",
      description: "Opening video conference...",
    })
  }

  const handleCancelSession = (sessionId: number) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Session cancelled",
        description: "The mentorship session has been cancelled.",
      })
    }, 1000)
  }

  const handleSubmitFeedback = (sessionId: number) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setFeedback("")
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback!",
      })
    }, 1000)
  }

  return (
    <Tabs defaultValue="upcoming">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
        <TabsTrigger value="past">Past Sessions</TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Mentorship Sessions</CardTitle>
            <CardDescription>Your scheduled mentorship sessions.</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingSessions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">You don't have any upcoming sessions.</p>
                <Button className="mt-4 bg-purple-600 hover:bg-purple-700">Find a Mentor</Button>
              </div>
            ) : (
              <div className="space-y-6">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarImage src={session.mentor.avatar || "/placeholder.svg"} alt={session.mentor.name} />
                          <AvatarFallback>{session.mentor.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{session.mentor.name}</h4>
                          <p className="text-sm text-muted-foreground">{session.mentor.title}</p>
                        </div>
                      </div>

                      <Badge
                        variant={session.status === "confirmed" ? "default" : "outline"}
                        className={
                          session.status === "confirmed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : ""
                        }
                      >
                        {session.status === "confirmed" ? "Confirmed" : "Pending Confirmation"}
                      </Badge>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{session.time}</span>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>Topic: {session.topic}</span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      {session.status === "confirmed" && (
                        <Button onClick={() => handleJoinSession(session.id)}>
                          <Video className="mr-2 h-4 w-4" />
                          Join Session
                        </Button>
                      )}
                      <Button variant="outline" onClick={() => handleCancelSession(session.id)} disabled={isLoading}>
                        Cancel Session
                      </Button>
                      <Button variant="outline">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message Mentor
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="past" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Past Mentorship Sessions</CardTitle>
            <CardDescription>Your completed mentorship sessions.</CardDescription>
          </CardHeader>
          <CardContent>
            {pastSessions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">You don't have any past sessions.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {pastSessions.map((session) => (
                  <div key={session.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarImage src={session.mentor.avatar || "/placeholder.svg"} alt={session.mentor.name} />
                          <AvatarFallback>{session.mentor.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{session.mentor.name}</h4>
                          <p className="text-sm text-muted-foreground">{session.mentor.title}</p>
                        </div>
                      </div>

                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        Completed
                      </Badge>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{session.time}</span>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>Topic: {session.topic}</span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <Button variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        View Notes
                      </Button>

                      {!session.feedbackGiven ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="bg-purple-600 hover:bg-purple-700">Provide Feedback</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Session Feedback</DialogTitle>
                              <DialogDescription>
                                Share your feedback about the mentorship session with {session.mentor.name}.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <Textarea
                                placeholder="What did you learn? Was the session helpful? Any suggestions for improvement?"
                                className="min-h-32 resize-none"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                              />
                            </div>
                            <DialogFooter>
                              <Button
                                className="bg-purple-600 hover:bg-purple-700"
                                onClick={() => handleSubmitFeedback(session.id)}
                                disabled={isLoading || !feedback.trim()}
                              >
                                {isLoading ? "Submitting..." : "Submit Feedback"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Button variant="outline" disabled>
                          Feedback Submitted
                        </Button>
                      )}

                      <Button variant="outline">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message Mentor
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
