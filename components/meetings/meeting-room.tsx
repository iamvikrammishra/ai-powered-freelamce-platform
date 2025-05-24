"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Monitor,
  MessageSquare,
  Users,
  Camera,
  Volume2,
  VolumeX,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function MeetingRoom() {
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [meetingDuration, setMeetingDuration] = useState(0)
  const [chatMessage, setChatMessage] = useState("")
  const [isInMeeting, setIsInMeeting] = useState(false)

  // Mock meeting data
  const currentMeeting = {
    id: 1,
    title: "Project Kickoff Meeting",
    participant: {
      name: "Priya Sharma",
      avatar: "/indian-woman-professional.png",
      initials: "PS",
      role: "Client",
      company: "TechCorp Solutions",
    },
    startTime: "10:00 AM",
    duration: "1 hour",
  }

  const chatMessages = [
    {
      id: 1,
      sender: "Priya Sharma",
      message: "Hi! Looking forward to discussing the project details.",
      time: "10:01 AM",
      isMe: false,
    },
    {
      id: 2,
      sender: "You",
      message: "Hello! Yes, I've prepared the project proposal for review.",
      time: "10:02 AM",
      isMe: true,
    },
    {
      id: 3,
      sender: "Priya Sharma",
      message: "Great! Can you share your screen to show the mockups?",
      time: "10:05 AM",
      isMe: false,
    },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isInMeeting) {
      interval = setInterval(() => {
        setMeetingDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isInMeeting])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleJoinMeeting = () => {
    setIsInMeeting(true)
    toast({
      title: "Joined meeting",
      description: "You are now in the meeting room.",
    })
  }

  const handleLeaveMeeting = () => {
    setIsInMeeting(false)
    setMeetingDuration(0)
    toast({
      title: "Left meeting",
      description: "You have left the meeting room.",
    })
  }

  const handleToggleVideo = () => {
    setIsVideoOn(!isVideoOn)
    toast({
      title: isVideoOn ? "Camera turned off" : "Camera turned on",
      description: `Your camera is now ${isVideoOn ? "disabled" : "enabled"}.`,
    })
  }

  const handleToggleAudio = () => {
    setIsAudioOn(!isAudioOn)
    toast({
      title: isAudioOn ? "Microphone muted" : "Microphone unmuted",
      description: `Your microphone is now ${isAudioOn ? "muted" : "unmuted"}.`,
    })
  }

  const handleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing)
    toast({
      title: isScreenSharing ? "Screen sharing stopped" : "Screen sharing started",
      description: `Screen sharing is now ${isScreenSharing ? "disabled" : "enabled"}.`,
    })
  }

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      toast({
        title: "Message sent",
        description: "Your message has been sent to the chat.",
      })
      setChatMessage("")
    }
  }

  if (!isInMeeting) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Meeting Room</CardTitle>
            <CardDescription>Join or start a video meeting with clients and freelancers.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-6">
                <Video className="h-12 w-12 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ready to join a meeting?</h3>
              <p className="text-muted-foreground mb-6">Start an instant meeting or join a scheduled meeting room.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleJoinMeeting} className="bg-purple-600 hover:bg-purple-700">
                  <Video className="mr-2 h-4 w-4" />
                  Start Instant Meeting
                </Button>
                <Button variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Join with Meeting ID
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Meeting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={currentMeeting.participant.avatar || "/placeholder.svg"}
                  alt={currentMeeting.participant.name}
                />
                <AvatarFallback>{currentMeeting.participant.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-semibold">{currentMeeting.title}</h4>
                <p className="text-sm text-muted-foreground">
                  with {currentMeeting.participant.name} • {currentMeeting.startTime}
                </p>
              </div>
              <Button onClick={handleJoinMeeting} className="bg-purple-600 hover:bg-purple-700">
                Join Meeting
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{currentMeeting.title}</CardTitle>
              <CardDescription>
                Meeting with {currentMeeting.participant.name} • Duration: {formatDuration(meetingDuration)}
              </CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Live</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Area */}
            <div className="lg:col-span-2 space-y-4">
              <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {isVideoOn ? (
                    <div className="text-white text-center">
                      <Camera className="mx-auto h-12 w-12 mb-2" />
                      <p>Your video feed would appear here</p>
                    </div>
                  ) : (
                    <div className="text-white text-center">
                      <VideoOff className="mx-auto h-12 w-12 mb-2" />
                      <p>Camera is off</p>
                    </div>
                  )}
                </div>

                {/* Participant video overlay */}
                <div className="absolute top-4 right-4 w-32 h-24 bg-gray-800 rounded-lg border-2 border-white overflow-hidden">
                  <div className="flex items-center justify-center h-full">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={currentMeeting.participant.avatar || "/placeholder.svg"}
                        alt={currentMeeting.participant.name}
                      />
                      <AvatarFallback>{currentMeeting.participant.initials}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                {/* Meeting controls overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                    <Button
                      size="sm"
                      variant={isVideoOn ? "secondary" : "destructive"}
                      onClick={handleToggleVideo}
                      className="rounded-full h-10 w-10 p-0"
                    >
                      {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    </Button>

                    <Button
                      size="sm"
                      variant={isAudioOn ? "secondary" : "destructive"}
                      onClick={handleToggleAudio}
                      className="rounded-full h-10 w-10 p-0"
                    >
                      {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>

                    <Button
                      size="sm"
                      variant={isScreenSharing ? "default" : "secondary"}
                      onClick={handleScreenShare}
                      className="rounded-full h-10 w-10 p-0"
                    >
                      <Monitor className="h-4 w-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setIsChatOpen(!isChatOpen)}
                      className="rounded-full h-10 w-10 p-0"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={handleLeaveMeeting}
                      className="rounded-full h-10 w-10 p-0"
                    >
                      <PhoneOff className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Meeting info */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={currentMeeting.participant.avatar || "/placeholder.svg"}
                      alt={currentMeeting.participant.name}
                    />
                    <AvatarFallback>{currentMeeting.participant.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{currentMeeting.participant.name}</p>
                    <p className="text-sm text-muted-foreground">{currentMeeting.participant.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isAudioOn ? (
                    <Volume2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <VolumeX className="h-4 w-4 text-red-600" />
                  )}
                  {isVideoOn ? (
                    <Video className="h-4 w-4 text-green-600" />
                  ) : (
                    <VideoOff className="h-4 w-4 text-red-600" />
                  )}
                </div>
              </div>
            </div>

            {/* Chat Panel */}
            <div className={`${isChatOpen ? "block" : "hidden lg:block"}`}>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Meeting Chat</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-64 overflow-y-auto space-y-3 border rounded-lg p-3">
                    {chatMessages.map((message) => (
                      <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-lg p-2 ${
                            message.isMe ? "bg-purple-600 text-white" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p className={`text-xs mt-1 ${message.isMe ? "text-purple-100" : "text-muted-foreground"}`}>
                            {message.sender} • {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="min-h-[60px] resize-none"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!chatMessage.trim()}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Send
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
