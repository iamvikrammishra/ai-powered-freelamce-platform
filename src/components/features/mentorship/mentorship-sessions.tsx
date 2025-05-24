"use client"

import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Calendar, Clock, MoreVertical, MessageSquare, Video, FileText } from "lucide-react"

export function MentorshipSessions() {
  const [activeTab, setActiveTab] = useState("upcoming")
  
  // Sample session data
  const upcomingSessions = [
    {
      id: 1,
      mentor: {
        name: "Rahul Sharma",
        role: "Senior Full Stack Developer",
        image: "/mentor-1.png"
      },
      date: "May 28, 2025",
      time: "10:00 AM - 11:00 AM",
      topic: "React Performance Optimization",
      type: "video"
    },
    {
      id: 2,
      mentor: {
        name: "Priya Patel",
        role: "UX/UI Design Lead",
        image: "/mentor-2.png"
      },
      date: "June 3, 2025",
      time: "2:00 PM - 3:00 PM",
      topic: "Portfolio Review & Career Guidance",
      type: "video"
    }
  ]
  
  const pastSessions = [
    {
      id: 3,
      mentor: {
        name: "Vikram Singh",
        role: "Senior Product Manager",
        image: "/mentor-3.png"
      },
      date: "May 15, 2025",
      time: "4:00 PM - 5:00 PM",
      topic: "Product Strategy Fundamentals",
      type: "video",
      rating: 5
    },
    {
      id: 4,
      mentor: {
        name: "Ananya Gupta",
        role: "Marketing Director",
        image: "/mentor-4.png"
      },
      date: "May 5, 2025",
      time: "11:00 AM - 12:00 PM",
      topic: "Digital Marketing Essentials",
      type: "chat",
      rating: 4
    }
  ]
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-6">
          {upcomingSessions.length > 0 ? (
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <Card key={session.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 border">
                          <AvatarImage src={session.mentor.image} alt={session.mentor.name} />
                          <AvatarFallback>{session.mentor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{session.mentor.name}</h3>
                          <p className="text-sm text-muted-foreground">{session.mentor.role}</p>
                          <div className="mt-1 text-sm font-medium">{session.topic}</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 md:items-end">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{session.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{session.time}</span>
                        </div>
                        <Badge className="mt-1 w-fit" variant="outline">
                          {session.type === "video" ? (
                            <Video className="mr-1 h-3 w-3" />
                          ) : (
                            <MessageSquare className="mr-1 h-3 w-3" />
                          )}
                          {session.type === "video" ? "Video Call" : "Chat Session"}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button>Join Session</Button>
                      <Button variant="outline">Reschedule</Button>
                      <Button variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">You don't have any upcoming mentorship sessions.</p>
                <Button className="mt-4">Find a Mentor</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="mt-6">
          {pastSessions.length > 0 ? (
            <div className="space-y-4">
              {pastSessions.map((session) => (
                <Card key={session.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 border">
                          <AvatarImage src={session.mentor.image} alt={session.mentor.name} />
                          <AvatarFallback>{session.mentor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{session.mentor.name}</h3>
                          <p className="text-sm text-muted-foreground">{session.mentor.role}</p>
                          <div className="mt-1 text-sm font-medium">{session.topic}</div>
                          
                          <div className="mt-2 flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < session.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                  }`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                              ))}
                            </div>
                            <span className="ml-2 text-xs text-muted-foreground">Your rating</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 md:items-end">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{session.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{session.time}</span>
                        </div>
                        <Badge className="mt-1 w-fit" variant="secondary">
                          {session.type === "video" ? (
                            <Video className="mr-1 h-3 w-3" />
                          ) : (
                            <MessageSquare className="mr-1 h-3 w-3" />
                          )}
                          {session.type === "video" ? "Video Call" : "Chat Session"}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        View Notes
                      </Button>
                      <Button variant="outline">
                        <Video className="mr-2 h-4 w-4" />
                        Book Again
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">You don't have any past mentorship sessions.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
