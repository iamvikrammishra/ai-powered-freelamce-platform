"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { UserType } from "@/lib/types"

// UI Components
import { DashboardHeader } from "@/components/features/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Icons
import { 
  Briefcase, 
  MessageSquare, 
  BarChart3,
  Bell,
  Search,
  LayoutDashboard,
  Wallet,
  TrendingUp,
  Calendar,
  Clock,
  Star,
  Trophy,
  CheckCircle,
  DollarSign,
  Users,
  ChevronRight
} from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [userType, setUserType] = useState<UserType>('freelancer')
  const [activeTab, setActiveTab] = useState("overview")
  
  // Freelancer dashboard metrics
  const [earnings, setEarnings] = useState({
    available: 2430,
    pending: 850,
    totalEarned: 14500
  })
  
  const [stats, setStats] = useState({
    jobSuccess: 92,
    completionRate: 95,
    onTimeDelivery: 98,
    responseRate: 90,
    proposalsSent: 24,
    activeProjects: 3,
    completedProjects: 18,
    invitesToInterview: 5
  })
  
  const [recommendedJobs, setRecommendedJobs] = useState([
    {
      id: "job-1",
      title: "React Developer for E-commerce Platform",
      budget: "₹20,000 - ₹40,000",
      duration: "2 months",
      posted: "2 hours ago",
      skills: ["React", "Next.js", "Tailwind CSS"],
      matchScore: 95
    },
    {
      id: "job-2",
      title: "Frontend Developer for Dashboard UI",
      budget: "₹25,000 - ₹35,000",
      duration: "3 months",
      posted: "4 hours ago",
      skills: ["React", "TypeScript", "UI/UX"],
      matchScore: 92
    },
    {
      id: "job-3",
      title: "Full Stack Developer for SaaS Product",
      budget: "₹50,000 - ₹70,000",
      duration: "6 months",
      posted: "1 day ago",
      skills: ["React", "Node.js", "MongoDB"],
      matchScore: 88
    }
  ])
  
  const [upcomingMeetings, setUpcomingMeetings] = useState([
    {
      id: "meeting-1",
      title: "Project Kickoff: E-commerce Redesign",
      client: "TechVision Inc.",
      time: "Today, 3:00 PM",
      duration: "45 minutes"
    },
    {
      id: "meeting-2",
      title: "Weekly Progress: Dashboard Project",
      client: "InnovateTech",
      time: "Tomorrow, 11:00 AM",
      duration: "30 minutes"
    }
  ])

  useEffect(() => {
    // Fetch user profile and determine user type
    const fetchUserProfile = async () => {
      try {
        // Get user from session
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          // Check user role from user metadata first (most reliable source)
          const userRole = user.user_metadata?.role as string || '';
          console.log('User role from metadata:', userRole);
          
          if (userRole === 'employer') {
            setUserType('employer');
            // Redirect to employer dashboard
            router.push('/dashboard/employer');
            return;
          }
          
          // If no metadata role, check employer_profiles table
          const { data: employerProfile } = await supabase
            .from('employer_profiles')
            .select('id')
            .eq('user_id', user.id)
            .single()
          
          if (employerProfile) {
            setUserType('employer');
            // Redirect to employer dashboard
            router.push('/dashboard/employer');
            return;
          }
          
          // If no employer profile, check freelancer_profiles table
          const { data: freelancerProfile } = await supabase
            .from('freelancer_profiles')
            .select('*')
            .eq('user_id', user.id)
            .single()
            
          if (freelancerProfile) {
            setProfile(freelancerProfile);
            setUserType('freelancer');
          }
        } else {
          // Fallback to demo data if no user is found
          setProfile({
            full_name: "John Doe",
            display_name: "John",
            title: "Senior Frontend Developer",
            hourlyRate: 25,
            avatarUrl: "https://github.com/shadcn.png",
            skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "UI/UX Design"]
          })
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
        // Fallback to demo data on error
        setProfile({
          full_name: "John Doe",
          display_name: "John",
          title: "Senior Frontend Developer",
          hourlyRate: 25,
          avatarUrl: "https://github.com/shadcn.png",
          skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "UI/UX Design"]
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [])

  return (
    <>
      {/* Freelancer Dashboard Header */}
      <div className="flex items-start justify-between mb-6">
        <DashboardHeader 
          heading={`Welcome back, ${profile?.display_name || 'there'}!`} 
          text="Here's an overview of your freelancing activities and opportunities."
        >
          <div className="mt-4 flex flex-wrap gap-2">
            {!loading && profile?.skills?.map((skill: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </DashboardHeader>
        
        {!loading && (
          <div className="hidden lg:flex items-center gap-4">
            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              <Search className="mr-2 h-4 w-4" />
              Find Work
            </Button>
            <Link href="/dashboard/proposals/create">
              <Button variant="outline" size="sm">
                <Briefcase className="mr-2 h-4 w-4" />
                Create Proposal
              </Button>
            </Link>
          </div>
        )}
      </div>
      
      <div className="grid gap-6">
        {loading ? (
          // Loading skeleton
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Array(4).fill(0).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-8 w-1/2 mb-4" />
                  <Skeleton className="h-14 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Earnings Card */}
              <Card className="overflow-hidden border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Available Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">₹{earnings.available.toLocaleString()}</div>
                    <Wallet className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <span className="font-medium">₹{earnings.pending.toLocaleString()}</span> pending payment
                  </div>
                </CardContent>
              </Card>
              
              {/* Job Success Score */}
              <Card className="overflow-hidden border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Job Success Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{stats.jobSuccess}%</div>
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                  </div>
                  <Progress value={stats.jobSuccess} className="mt-2 h-1.5 bg-blue-100" />
                  <div className="mt-2 text-xs text-muted-foreground">
                    Based on client satisfaction
                  </div>
                </CardContent>
              </Card>
              
              {/* Active Projects */}
              <Card className="overflow-hidden border-l-4 border-l-purple-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{stats.activeProjects}</div>
                    <Briefcase className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <span className="font-medium">{stats.completedProjects}</span> projects completed
                  </div>
                </CardContent>
              </Card>
              
              {/* Profile Completion */}
              <Card className="overflow-hidden border-l-4 border-l-amber-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Profile Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">85%</div>
                    <Users className="h-5 w-5 text-amber-500" />
                  </div>
                  <Progress value={85} className="mt-2 h-1.5 bg-amber-100" />
                  <div className="mt-2 text-xs text-muted-foreground">
                    Add portfolio items to reach 100%
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Left Column: AI Job Matches */}
              <div className="md:col-span-1 lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>AI-Matched Job Opportunities</CardTitle>
                      <Link href="/dashboard/find-work">
                        <Button variant="ghost" size="sm" className="text-sm">
                          View All
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                    <CardDescription>Jobs that match your skills and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {recommendedJobs.map((job) => (
                        <div key={job.id} className="p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <Link href={`/dashboard/jobs/${job.id}`} className="text-lg font-medium hover:text-primary hover:underline">
                              {job.title}
                            </Link>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                              {job.matchScore}% Match
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mb-2 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <DollarSign className="mr-1 h-4 w-4" />
                              {job.budget}
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-4 w-4" />
                              {job.duration}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            {job.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">Posted {job.posted}</p>
                            <Button size="sm" variant="outline">
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 py-3">
                    <div className="flex justify-between items-center w-full">
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">{recommendedJobs.length}</span> jobs shown of <span className="font-medium">28</span> matches
                      </div>
                      <Button size="sm" variant="ghost">
                        Refine Matches
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
                
                {/* Performance Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>Key stats that affect your visibility to clients</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Completion Rate</span>
                            <span className="text-sm font-medium">{stats.completionRate}%</span>
                          </div>
                          <Progress value={stats.completionRate} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">On-time Delivery</span>
                            <span className="text-sm font-medium">{stats.onTimeDelivery}%</span>
                          </div>
                          <Progress value={stats.onTimeDelivery} className="h-2" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Response Rate</span>
                            <span className="text-sm font-medium">{stats.responseRate}%</span>
                          </div>
                          <Progress value={stats.responseRate} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Proposals Sent</span>
                            <span className="text-sm font-medium">{stats.proposalsSent}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>5 interviews received ({Math.round(stats.invitesToInterview/stats.proposalsSent*100)}% conversion)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t">
                    <Button variant="outline" size="sm">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Detailed Analytics
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              {/* Right Column: Upcoming Meetings & Activity */}
              <div className="space-y-6">
                {/* Upcoming Meetings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Meetings</CardTitle>
                    <CardDescription>Scheduled client meetings</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    {upcomingMeetings.length > 0 ? (
                      <div className="divide-y">
                        {upcomingMeetings.map((meeting) => (
                          <div key={meeting.id} className="p-4 hover:bg-muted/50 transition-colors">
                            <p className="font-medium mb-1">{meeting.title}</p>
                            <p className="text-sm text-muted-foreground mb-2">With {meeting.client}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm">
                                <Calendar className="mr-1 h-4 w-4 text-blue-500" />
                                {meeting.time}
                              </div>
                              <div className="flex items-center text-sm">
                                <Clock className="mr-1 h-4 w-4 text-blue-500" />
                                {meeting.duration}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center">
                        <p className="text-muted-foreground">No upcoming meetings</p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="border-t">
                    <Button variant="outline" size="sm" className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Meeting
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Updates from your projects</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      <div className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="mt-1 bg-blue-100 p-1.5 rounded-full">
                            <MessageSquare className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">New message from TechVision Inc.</p>
                            <p className="text-sm text-muted-foreground">Regarding project milestone completion</p>
                            <p className="text-xs text-muted-foreground mt-1">10 minutes ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="mt-1 bg-green-100 p-1.5 rounded-full">
                            <DollarSign className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Payment received</p>
                            <p className="text-sm text-muted-foreground">₹12,500 for Dashboard Development</p>
                            <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="mt-1 bg-amber-100 p-1.5 rounded-full">
                            <Star className="h-4 w-4 text-amber-600" />
                          </div>
                          <div>
                            <p className="font-medium">New 5-star review</p>
                            <p className="text-sm text-muted-foreground">InnovateTech left you a 5-star review</p>
                            <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t">
                    <Button variant="ghost" size="sm" className="w-full">
                      View All Activity
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Earning Trend */}
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings</CardTitle>
                    <CardDescription>Your financial overview</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Total Earned</p>
                          <p className="text-2xl font-bold">₹{earnings.totalEarned.toLocaleString()}</p>
                        </div>
                        <div className="p-2 rounded-full bg-green-50">
                          <TrendingUp className="h-6 w-6 text-green-500" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Available</p>
                          <p className="text-lg font-semibold">₹{earnings.available.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Pending</p>
                          <p className="text-lg font-semibold">₹{earnings.pending.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t">
                    <Button variant="outline" size="sm" className="w-full">
                      <Wallet className="mr-2 h-4 w-4" />
                      Withdraw Funds
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
