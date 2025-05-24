"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// UI Components
import { DashboardHeader } from "@/components/features/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

// Icons
import { 
  Search, 
  MessageSquare, 
  MoreVertical, 
  Paperclip, 
  Send, 
  Clock, 
  CheckCircle, 
  Video, 
  Phone, 
  Image, 
  File,
  ArrowRight,
  Plus,
  User,
  Users,
  FileText,
  Filter
} from "lucide-react"

// Sample data for conversations
const conversationsData = [
  {
    id: "conv-1",
    user: {
      id: "user-1",
      name: "Rahul Mehra",
      avatar: "/avatars/avatar-1.png",
      title: "Senior Frontend Developer",
      online: true
    },
    lastMessage: {
      text: "I've completed the first milestone and uploaded the files for your review.",
      time: "10:42 AM",
      isRead: false,
      sender: "user"
    },
    unreadCount: 2,
    job: "Frontend Developer with React Experience",
    status: "active",
    pinned: true
  },
  {
    id: "conv-2",
    user: {
      id: "user-2",
      name: "Priya Sharma",
      avatar: "/avatars/avatar-2.png",
      title: "UX/UI Designer",
      online: true
    },
    lastMessage: {
      text: "Thank you for your feedback! I'll implement those changes and share an updated design.",
      time: "Yesterday",
      isRead: true,
      sender: "user"
    },
    unreadCount: 0,
    job: "UI/UX Designer for Mobile App",
    status: "active",
    pinned: false
  },
  {
    id: "conv-3",
    user: {
      id: "user-3",
      name: "Vikram Singh",
      avatar: "/avatars/avatar-3.png",
      title: "Full Stack Developer",
      online: false
    },
    lastMessage: {
      text: "When would be a good time to discuss the project requirements in detail?",
      time: "Yesterday",
      isRead: true,
      sender: "me"
    },
    unreadCount: 0,
    job: "Full Stack Developer for E-commerce Site",
    status: "active",
    pinned: false
  },
  {
    id: "conv-4",
    user: {
      id: "user-4",
      name: "Ananya Patel",
      avatar: "/avatars/avatar-4.png",
      title: "Frontend Engineer",
      online: false
    },
    lastMessage: {
      text: "I'm interested in your project. Could you provide more details about the requirements?",
      time: "May 20",
      isRead: true,
      sender: "user"
    },
    unreadCount: 0,
    job: "Frontend Developer with React Experience",
    status: "archived",
    pinned: false
  }
]

// Sample data for messages in a conversation
const messagesData = [
  {
    id: "msg-1",
    text: "Hello, I'm interested in your project and would like to discuss it further.",
    time: "May 19, 10:30 AM",
    sender: "user",
    isRead: true
  },
  {
    id: "msg-2",
    text: "Hi Rahul, thanks for your interest! I'd be happy to discuss the project details.",
    time: "May 19, 11:15 AM",
    sender: "me",
    isRead: true
  },
  {
    id: "msg-3",
    text: "Great! Could you tell me more about your specific requirements for the React frontend?",
    time: "May 19, 11:22 AM",
    sender: "user",
    isRead: true
  },
  {
    id: "msg-4",
    text: "Of course. We need a complete redesign of our e-commerce platform. The main features include product listings, shopping cart, user authentication, and payment integration. Are you familiar with these components?",
    time: "May 19, 11:45 AM",
    sender: "me",
    isRead: true
  },
  {
    id: "msg-5",
    text: "Yes, I've worked on similar projects before. I have experience with all these components and have integrated various payment gateways.",
    time: "May 19, 12:10 PM",
    sender: "user",
    isRead: true
  },
  {
    id: "msg-6",
    text: "Perfect! I've attached the detailed project brief. Please take a look and let me know if you have any questions.",
    time: "May 19, 2:30 PM",
    sender: "me",
    isRead: true,
    attachments: [
      {
        name: "Project_Brief.pdf",
        size: "2.4 MB",
        type: "pdf"
      }
    ]
  },
  {
    id: "msg-7",
    text: "I've reviewed the brief and I'm definitely interested. I think I can deliver what you're looking for within the timeline.",
    time: "May 20, 9:15 AM",
    sender: "user",
    isRead: true
  },
  {
    id: "msg-8",
    text: "I've completed the first milestone and uploaded the files for your review. Please let me know if any changes are needed.",
    time: "Today, 10:42 AM",
    sender: "user",
    isRead: false,
    attachments: [
      {
        name: "frontend_milestone_1.zip",
        size: "15.7 MB",
        type: "zip"
      },
      {
        name: "implementation_notes.pdf",
        size: "1.2 MB",
        type: "pdf"
      }
    ]
  }
]

export default function MessagesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<string>("conv-1")
  const [newMessage, setNewMessage] = useState("")
  const [conversations, setConversations] = useState(conversationsData)
  const [messages, setMessages] = useState(messagesData)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conv => 
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.job.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])
  
  // Get current conversation
  const currentConversation = conversations.find(conv => conv.id === selectedConversation)
  
  // Handle send message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    
    const newMsg = {
      id: `msg-${messages.length + 1}`,
      text: newMessage,
      time: "Just now",
      sender: "me",
      isRead: true
    }
    
    setMessages([...messages, newMsg])
    
    // Update conversation with last message
    setConversations(conversations.map(conv => 
      conv.id === selectedConversation
        ? {
            ...conv,
            lastMessage: {
              text: newMessage,
              time: "Just now",
              isRead: true,
              sender: "me"
            },
            unreadCount: 0
          }
        : conv
    ))
    
    setNewMessage("")
    
    // Simulate response after delay (for demo purposes)
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "Your message has been delivered.",
      })
    }, 500)
  }
  
  // Mark conversation as read when selected
  const handleSelectConversation = (convId: string) => {
    setSelectedConversation(convId)
    
    // Mark messages as read
    setConversations(conversations.map(conv => 
      conv.id === convId
        ? { ...conv, unreadCount: 0, lastMessage: { ...conv.lastMessage, isRead: true } }
        : conv
    ))
  }
  
  // Format attachment icon based on file type
  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4" />
      case "image":
      case "jpg":
      case "png":
        return <Image className="h-4 w-4" />
      default:
        return <File className="h-4 w-4" />
    }
  }

  return (
    <>
      <DashboardHeader
        heading="Messages"
        text="Communicate with freelancers and manage your conversations"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Conversations List */}
        <Card className="md:col-span-1 border rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search messages..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-muted/30">
            <div className="text-sm font-medium px-2">
              {filteredConversations.length} Conversations
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" title="New Message">
                <Plus className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>All Messages</DropdownMenuItem>
                  <DropdownMenuItem>Unread</DropdownMenuItem>
                  <DropdownMenuItem>Active Contracts</DropdownMenuItem>
                  <DropdownMenuItem>Archived</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="divide-y max-h-[600px] overflow-y-auto">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  className={`w-full text-left p-3 hover:bg-muted/50 transition-colors relative ${
                    selectedConversation === conv.id ? "bg-muted/60" : ""
                  }`}
                  onClick={() => handleSelectConversation(conv.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conv.user.avatar} alt={conv.user.name} />
                        <AvatarFallback>{conv.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conv.user.online && (
                        <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 border-2 border-background"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="font-medium truncate">{conv.user.name}</p>
                        <span className="text-xs text-muted-foreground">{conv.lastMessage.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conv.lastMessage.sender === "me" && "You: "}
                        {conv.lastMessage.text}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {conv.job}
                      </p>
                    </div>
                  </div>
                  
                  {conv.unreadCount > 0 && (
                    <Badge 
                      className="absolute top-3 right-3 bg-primary text-primary-foreground"
                    >
                      {conv.unreadCount}
                    </Badge>
                  )}
                  
                  {conv.pinned && (
                    <div className="absolute bottom-2 right-3">
                      <Badge variant="outline" className="h-5 px-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4V12M12 12L16 8M12 12L8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Badge>
                    </div>
                  )}
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No conversations found
              </div>
            )}
          </div>
        </Card>
        
        {/* Messages Panel */}
        <Card className="md:col-span-2 flex flex-col h-[700px] border rounded-lg overflow-hidden">
          {currentConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={currentConversation.user.avatar} alt={currentConversation.user.name} />
                    <AvatarFallback>{currentConversation.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{currentConversation.user.name}</h3>
                      {currentConversation.user.online && (
                        <Badge variant="outline" className="bg-green-100 text-green-800 text-xs h-5">
                          Online
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{currentConversation.user.title}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" title="Voice Call">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Video Call">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="View Profile">
                    <User className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Contract</DropdownMenuItem>
                      <DropdownMenuItem>View Job Details</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Archive Conversation</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Block User</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "me" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted"
                      }`}
                    >
                      <div className="text-sm">{message.text}</div>
                      
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {message.attachments.map((attachment, index) => (
                            <div 
                              key={index}
                              className={`flex items-center gap-2 rounded-md p-2 ${
                                message.sender === "me" 
                                  ? "bg-primary-foreground/10 text-primary-foreground" 
                                  : "bg-background"
                              }`}
                            >
                              {getAttachmentIcon(attachment.type)}
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium truncate">{attachment.name}</p>
                                <p className="text-xs opacity-70">{attachment.size}</p>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className={`h-6 w-6 rounded-full ${
                                  message.sender === "me" 
                                    ? "text-primary-foreground hover:bg-primary-foreground/20" 
                                    : ""
                                }`}
                              >
                                <ArrowRight className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div 
                        className={`text-xs mt-1 ${
                          message.sender === "me" 
                            ? "text-primary-foreground/70" 
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.time}
                        {message.sender === "me" && (
                          <span className="ml-1">
                            {message.isRead ? (
                              <CheckCircle className="inline h-3 w-3 ml-1" />
                            ) : (
                              <Clock className="inline h-3 w-3 ml-1" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Message Input */}
              <div className="p-3 border-t">
                <div className="flex items-end gap-2">
                  <Textarea
                    placeholder="Type your message..."
                    className="flex-1 min-h-[60px] max-h-[120px]"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <div className="flex flex-col gap-2">
                    <Button variant="ghost" size="icon" title="Attach File">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
              <p className="text-muted-foreground text-center mb-4">
                Select a conversation from the list or start a new one
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Message
              </Button>
            </div>
          )}
        </Card>
      </div>
    </>
  )
}
