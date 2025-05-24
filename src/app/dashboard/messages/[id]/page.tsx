"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/features/dashboard/dashboard-header"
import { DashboardShell } from "@/components/features/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Paperclip, Send, Clock, Check, CheckCheck, ChevronLeft, Info, Video } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { supabase } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function MessagesPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const messageEndRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [sendingMessage, setSendingMessage] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [otherUser, setOtherUser] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [conversations, setConversations] = useState<any[]>([])
  const [contracts, setContracts] = useState<any[]>([])
  const [jobs, setJobs] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push("/auth/login")
          return
        }
        setCurrentUser(user)

        // Get the other user
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select(`
            *,
            freelancer_profiles(*),
            employer_profiles(*)
          `)
          .eq("id", params.id)
          .single()

        if (userError) throw userError
        setOtherUser(userData)

        // Get conversation
        const { data: conversationData, error: conversationError } = await supabase
          .from("conversations")
          .select("*")
          .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
          .or(`user1_id.eq.${params.id},user2_id.eq.${params.id}`)
          .single()

        let conversationId
        if (conversationError) {
          // Create a new conversation if it doesn't exist
          const { data: newConversation, error: newConversationError } = await supabase
            .from("conversations")
            .insert({
              user1_id: user.id,
              user2_id: params.id,
              last_message: null,
              last_message_time: new Date().toISOString(),
              unread_count: 0
            })
            .select()
            .single()

          if (newConversationError) throw newConversationError
          conversationId = newConversation.id
        } else {
          conversationId = conversationData.id
        }

        // Get messages
        const { data: messagesData, error: messagesError } = await supabase
          .from("messages")
          .select("*")
          .eq("conversation_id", conversationId)
          .order("created_at", { ascending: true })

        if (messagesError) throw messagesError
        setMessages(messagesData || [])

        // Get other conversations for the sidebar
        const { data: allConversations, error: conversationsError } = await supabase
          .from("conversations")
          .select(`
            *,
            user1:user1_id(id, email, role, freelancer_profiles(*), employer_profiles(*)),
            user2:user2_id(id, email, role, freelancer_profiles(*), employer_profiles(*))
          `)
          .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
          .order("last_message_time", { ascending: false })

        if (conversationsError) throw conversationsError
        setConversations(allConversations || [])

        // Get contracts
        const { data: contractsData, error: contractsError } = await supabase
          .from("contracts")
          .select(`
            *,
            jobs(title, id)
          `)
          .or(`employer_id.eq.${user.id},freelancer_id.eq.${user.id}`)
          .or(`employer_id.eq.${params.id},freelancer_id.eq.${params.id}`)

        if (contractsError) throw contractsError
        setContracts(contractsData || [])

        // Get jobs
        const { data: jobsData, error: jobsError } = await supabase
          .from("job_applications")
          .select(`
            *,
            jobs(title, id, employer_id)
          `)
          .or(`freelancer_id.eq.${user.id},jobs->employer_id.eq.${user.id}`)
          .or(`freelancer_id.eq.${params.id},jobs->employer_id.eq.${params.id}`)

        if (jobsError) throw jobsError
        setJobs(jobsData || [])

        // Set up a real-time subscription for new messages
        const messagesSubscription = supabase
          .channel('messages-channel')
          .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `conversation_id=eq.${conversationId}`
          }, payload => {
            const newMsg = payload.new as any
            if (newMsg.sender_id !== user.id) {
              setMessages(prev => [...prev, newMsg])
            }
          })
          .subscribe()

        // Mark messages as read
        await supabase
          .from("messages")
          .update({ read: true })
          .eq("conversation_id", conversationId)
          .eq("recipient_id", user.id)
          .eq("read", false)

        return () => {
          supabase.removeChannel(messagesSubscription)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Failed to load messages",
          description: "There was an error loading your conversation",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router, params.id, toast])

  useEffect(() => {
    // Scroll to bottom when messages change
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date)
  }

  const isToday = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
  }

  const isYesterday = (dateString: string) => {
    const date = new Date(dateString)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
  }

  const getDateLabel = (dateString: string) => {
    if (isToday(dateString)) return "Today"
    if (isYesterday(dateString)) return "Yesterday"
    return formatDate(dateString)
  }

  const shouldShowDate = (index: number, messages: any[]) => {
    if (index === 0) return true
    
    const currentDate = new Date(messages[index].created_at).toDateString()
    const prevDate = new Date(messages[index - 1].created_at).toDateString()
    
    return currentDate !== prevDate
  }

  const getOtherUserFromConversation = (conversation: any) => {
    if (!currentUser) return null
    
    const otherUser = conversation.user1_id === currentUser.id
      ? conversation.user2
      : conversation.user1

    return otherUser
  }

  const getDisplayName = (user: any) => {
    if (!user) return "User"
    
    if (user.role === "freelancer" && user.freelancer_profiles) {
      return user.freelancer_profiles.display_name || user.email
    } else if (user.role === "employer" && user.employer_profiles) {
      return user.employer_profiles.display_name || user.email
    }
    
    return user.email
  }

  const getAvatarUrl = (user: any) => {
    if (!user) return ""
    
    if (user.role === "freelancer" && user.freelancer_profiles) {
      return user.freelancer_profiles.avatar_url || ""
    } else if (user.role === "employer" && user.employer_profiles) {
      return user.employer_profiles.avatar_url || ""
    }
    
    return ""
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newMessage.trim() || !currentUser || !otherUser) return
    
    setSendingMessage(true)
    
    try {
      // Get conversation
      const { data: conversationData, error: conversationError } = await supabase
        .from("conversations")
        .select("*")
        .or(`user1_id.eq.${currentUser.id},user2_id.eq.${currentUser.id}`)
        .or(`user1_id.eq.${otherUser.id},user2_id.eq.${otherUser.id}`)
        .single()
      
      if (conversationError) throw conversationError
      
      // Insert new message
      const { data: messageData, error: messageError } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversationData.id,
          sender_id: currentUser.id,
          recipient_id: otherUser.id,
          content: newMessage,
          read: false
        })
        .select()
      
      if (messageError) throw messageError
      
      // Update conversation with last message
      const { error: updateError } = await supabase
        .from("conversations")
        .update({
          last_message: newMessage,
          last_message_time: new Date().toISOString(),
          unread_count: supabase.sql`unread_count + 1`
        })
        .eq("id", conversationData.id)
      
      if (updateError) throw updateError
      
      // Add the message to state
      setMessages(prev => [...prev, messageData[0]])
      setNewMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message",
        variant: "destructive",
      })
    } finally {
      setSendingMessage(false)
    }
  }

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex h-[calc(100vh-130px)] border rounded-md overflow-hidden">
          {/* Sidebar */}
          <div className="w-80 border-r hidden md:block">
            <div className="p-4 border-b">
              <Skeleton className="h-10 w-full mb-4" />
            </div>
            <div className="p-4 space-y-4">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-32 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-4">
              <div className="space-y-4">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className={`flex items-end gap-2 ${i % 2 === 0 ? 'justify-end' : ''}`}>
                    {i % 2 !== 0 && <Skeleton className="h-8 w-8 rounded-full" />}
                    <Skeleton className={`h-12 w-64 rounded-md ${i % 2 === 0 ? 'rounded-tr-none' : 'rounded-tl-none'}`} />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t">
              <Skeleton className="h-12 w-full rounded-md" />
            </div>
          </div>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <div className="flex h-[calc(100vh-130px)] border rounded-md overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 border-r hidden md:block">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-lg">Messages</h2>
          </div>
          <ScrollArea className="h-[calc(100%-57px)]">
            <div className="p-2">
              {conversations.length > 0 ? (
                conversations.map(conversation => {
                  const otherUserInConvo = getOtherUserFromConversation(conversation)
                  if (!otherUserInConvo) return null
                  
                  const isActive = otherUserInConvo.id === otherUser?.id
                  
                  return (
                    <Link key={conversation.id} href={`/dashboard/messages/${otherUserInConvo.id}`}>
                      <div className={`flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-muted ${isActive ? 'bg-muted' : ''}`}>
                        <Avatar>
                          <AvatarImage src={getAvatarUrl(otherUserInConvo)} />
                          <AvatarFallback>{getInitials(getDisplayName(otherUserInConvo))}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <p className="font-medium truncate">{getDisplayName(otherUserInConvo)}</p>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(conversation.last_message_time)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {conversation.last_message || "No messages yet"}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                })
              ) : (
                <div className="text-center p-4 text-muted-foreground">
                  No conversations yet
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link href="/dashboard/messages" className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <Avatar>
                  <AvatarImage src={getAvatarUrl(otherUser)} />
                  <AvatarFallback>{getInitials(getDisplayName(otherUser))}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{getDisplayName(otherUser)}</h2>
                  <p className="text-sm text-muted-foreground">
                    {otherUser?.role === "freelancer" ? "Freelancer" : "Employer"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/video-call/${otherUser?.id}`}>
                          <Video className="h-5 w-5" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Start video call</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/profile/${otherUser?.id}`}>
                          <Info className="h-5 w-5" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View profile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-4" style={{ maxHeight: 'calc(100% - 153px)' }}>
            {contracts.length > 0 && (
              <div className="mb-4 bg-muted p-3 rounded-md text-sm">
                <p className="font-medium mb-1">Contracts with this user:</p>
                <div className="space-y-1">
                  {contracts.map(contract => (
                    <div key={contract.id} className="flex items-center justify-between">
                      <Link href={`/dashboard/contracts/${contract.id}`} className="text-primary hover:underline">
                        {contract.jobs?.title}
                      </Link>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {contract.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">No messages yet</h3>
                  <p className="text-muted-foreground mb-4">Start the conversation by sending a message</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message, index) => {
                  const isCurrentUser = message.sender_id === currentUser?.id
                  const showDate = shouldShowDate(index, messages)
                  
                  return (
                    <div key={message.id}>
                      {showDate && (
                        <div className="flex justify-center my-4">
                          <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                            {getDateLabel(message.created_at)}
                          </span>
                        </div>
                      )}
                      
                      <div className={`flex items-end gap-2 ${isCurrentUser ? 'justify-end' : ''}`}>
                        {!isCurrentUser && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={getAvatarUrl(otherUser)} />
                            <AvatarFallback>{getInitials(getDisplayName(otherUser))}</AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div className="max-w-[75%]">
                          <div className={`p-3 rounded-md ${isCurrentUser 
                            ? 'bg-primary text-primary-foreground rounded-tr-none' 
                            : 'bg-muted rounded-tl-none'}`}>
                            {message.content}
                          </div>
                          <div className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${isCurrentUser ? 'justify-end' : ''}`}>
                            {formatTime(message.created_at)}
                            {isCurrentUser && (
                              message.read 
                                ? <CheckCheck className="h-3 w-3" /> 
                                : <Check className="h-3 w-3" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messageEndRef} />
              </div>
            )}
          </div>
          
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10"
                disabled={sendingMessage}
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={sendingMessage}
                className="flex-1"
              />
              <Button 
                type="submit" 
                disabled={!newMessage.trim() || sendingMessage}
                className="h-10"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardShell>
  )
}
