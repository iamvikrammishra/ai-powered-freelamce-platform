"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase/client"
import { UserType } from "@/lib/types"

// UI Components
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Icons
import {
  Star, 
  ChevronRight, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  Briefcase, 
  Clock, 
  Users, 
  FileText,
  BarChart3,
  Bell,
  Zap,
  Calendar,
  MessageSquare,
  UserCheck,
  Eye,
  User,
  ThumbsUp,
  Search,
  LayoutDashboard
} from "lucide-react"

// Metadata is moved to layout.tsx for client components

export default function DashboardPage() {
  const [user, setUser] = useState<any | null>(null)
  const [userType, setUserType] = useState<UserType | null>(null)
  const [profile, setProfile] = useState<any | null>(null)
  const [stats, setStats] = useState<any>(null)
  const [recentJobs, setRecentJobs] = useState<any[]>([])
  const [recommendedJobs, setRecommendedJobs] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('User not found')
        
        setUser(user)
        
        // Determine user type from metadata
        const userRole = user.user_metadata?.role || 'freelancer'
        setUserType(userRole as UserType)
        
        // Fetch profile data
        const table = userRole === 'employer' ? 'employer_profiles' : 'freelancer_profiles'
        const { data: profileData, error: profileError } = await supabase
          .from(table)
          .select('*')
          .eq('user_id', user.id)
          .single()
          
        if (profileError) throw profileError
        setProfile(profileData)
        
        // Fetch mock notifications data
        setNotifications([
          { id: 1, title: "New proposal", message: "You received a new proposal for your project", time: "2h ago", read: false },
          { id: 2, title: "Payment received", message: "Payment for Project X has been processed", time: "5h ago", read: true },
          { id: 3, title: "Message from client", message: "John Smith sent you a message", time: "Yesterday", read: true },
        ])
        
        // Fetch mock messages data
        setMessages([
          { id: 1, name: "Sarah Wilson", message: "Hi! Just checking in on the project progress.", time: "2h ago", avatar: "/avatars/01.png" },
          { id: 2, name: "Michael Chen", message: "I've reviewed your proposal and have some questions.", time: "Yesterday", avatar: "/avatars/02.png" },
          { id: 3, name: "Emma Davis", message: "Can we schedule a call this week?", time: "2d ago", avatar: "/avatars/03.png" },
        ])
        
        // Fetch stats and recent activity based on user type
        if (userRole === 'employer') {
          // Employer dashboard data
          const { data: jobsData } = await supabase
            .from('jobs')
            .select('*')
            .eq('employer_id', user.id)
            .order('created_at', { ascending: false })
            .limit(5)
          
          const { data: applicationsCount } = await supabase
            .from('job_applications')
            .select('id', { count: 'exact' })
            .in('job_id', jobsData?.map(job => job.id) || [])
          
          setRecentJobs(jobsData || [])
          setStats({
            jobsPosted: profileData?.jobs_posted || 0,
            activeJobs: jobsData?.filter(job => job.status === 'open').length || 0,
            totalApplications: applicationsCount?.length || 0,
            hiredFreelancers: jobsData?.filter(job => job.status === 'in-progress').length || 0
          })
          
          // Mock recommended talent data
          setRecommendedJobs([
            { id: 1, name: "Alex Johnson", title: "Senior UI/UX Designer", rating: 4.9, hourlyRate: "$45", jobsCompleted: 37, avatar: "/avatars/04.png", skills: ["UI/UX Design", "Figma", "Wireframing"] },
            { id: 2, name: "Maya Patel", title: "Full Stack Developer", rating: 4.8, hourlyRate: "$55", jobsCompleted: 42, avatar: "/avatars/05.png", skills: ["React", "Node.js", "MongoDB"] },
            { id: 3, name: "David Kim", title: "Mobile App Developer", rating: 4.7, hourlyRate: "$50", jobsCompleted: 29, avatar: "/avatars/06.png", skills: ["Flutter", "React Native", "Swift"] },
          ])
        } else {
          // Freelancer dashboard data
          const { data: applicationsData } = await supabase
            .from('job_applications')
            .select('*, jobs(*)')
            .eq('freelancer_id', user.id)
            .order('created_at', { ascending: false })
            .limit(5)
          
          const { data: availableJobs } = await supabase
            .from('jobs')
            .select('count')
            .eq('status', 'open')
            .contains('skills_required', profileData?.skills || [])
          
          setRecentJobs(applicationsData?.map(app => app.jobs) || [])
          setStats({
            earnings: profileData?.total_earnings || 0,
            jobsCompleted: profileData?.jobs_completed || 0,
            activeProposals: applicationsData?.filter(app => app.status === 'pending').length || 0,
            availableJobs: availableJobs?.length || 0,
            profileCompletion: 85, // Mock profile completion percentage
            skillMatch: 92 // Mock skill match percentage
          })
          
          // Mock recommended jobs data
          setRecommendedJobs([
            { id: 1, title: "Senior React Developer Needed for SaaS Platform", company: "TechCorp Inc.", budget: "$5,000-$7,000", posted: "2 days ago", proposals: 12, skills: ["React", "TypeScript", "Node.js"], description: "We are looking for an experienced React developer to help build our new SaaS platform..." },
            { id: 2, title: "UI/UX Designer for E-commerce Redesign", company: "Fashion Forward", budget: "$3,000-$4,500", posted: "1 day ago", proposals: 8, skills: ["UI/UX", "Figma", "Adobe XD"], description: "Seeking a talented UI/UX designer to revamp our e-commerce website with a modern look..." },
            { id: 3, title: "Backend Engineer for API Development", company: "DataFlow Systems", budget: "$4,000-$6,000", posted: "3 days ago", proposals: 15, skills: ["Node.js", "Express", "MongoDB"], description: "Looking for a backend developer to create RESTful APIs for our data processing system..." },
          ])
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchDashboardData()
  }, [])
  
  if (loading) {
    return (
      <DashboardShell>
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-4 w-[400px]" />
          </div>
          <div className="grid gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array(4).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-[120px] w-full" />
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-[300px] w-full" />
            </div>
          </div>
        </div>
      </DashboardShell>
    )
  }
  
  return (
    <DashboardShell>
      <DashboardHeader 
        heading={`Welcome, ${profile?.display_name || profile?.full_name || 'there'}!`} 
        text={userType === 'employer' 
          ? "Here's an overview of your hiring activities and job postings." 
          : "Here's an overview of your freelancing activities and opportunities."} 
      />
      
      <div className="grid gap-6">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            // Loading skeleton for stats
            [...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-5 w-1/3 mb-2" />
                  <Skeleton className="h-8 w-1/2" />
                </CardContent>
              </Card>
            ))
          ) : userType === 'employer' ? (
            // Employer stats
            <>
              <StatsCard 
                title="Jobs Posted" 
                value={stats?.jobsPosted || 0} 
                icon={<svg className="w-6 h-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
              />
              <StatsCard 
                title="Active Jobs" 
                value={stats?.activeJobs || 0} 
                icon={<svg className="w-6 h-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              />
              <StatsCard 
                title="Total Applications" 
                value={stats?.totalApplications || 0} 
                icon={<svg className="w-6 h-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
              />
              <StatsCard 
                title="Hired Freelancers" 
                value={stats?.hiredFreelancers || 0} 
                icon={<svg className="w-6 h-6 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
              />
            </>
          ) : (
            // Freelancer stats
            <>
              <StatsCard 
                title="Earnings" 
                value={`₹${stats?.earnings || 0}`} 
                icon={<svg className="w-6 h-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              />
              <StatsCard 
                title="Jobs Completed" 
                value={stats?.jobsCompleted || 0} 
                icon={<svg className="w-6 h-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
              />
              <StatsCard 
                title="Active Proposals" 
                value={stats?.activeProposals || 0} 
                icon={<svg className="w-6 h-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
          
          <div className="grid gap-1">
            <h1 className="text-2xl font-bold tracking-tight">
              {loading ? (
                <Skeleton className="h-8 w-[200px]" />
              ) : (
                <>Welcome back, {profile?.full_name || user?.user_metadata?.full_name || 'there'}!</>
              )}
            </h1>
            <p className="text-muted-foreground">
              {loading ? (
                <Skeleton className="h-4 w-[300px]" />
              ) : (
                <>Here's what's happening with your {userType === 'employer' ? 'projects' : 'freelance work'} today.</>
              )}
            </p>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="overview" className="text-sm">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="jobs" className="text-sm">
                <Briefcase className="mr-2 h-4 w-4" />
                {userType === 'employer' ? 'My Jobs' : 'Jobs'}
              </TabsTrigger>
              <TabsTrigger value="messages" className="text-sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
              </TabsTrigger>
              <TabsTrigger value="stats" className="text-sm">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Bell className="mr-2 h-4 w-4" />
                <span className="relative">
                  Notifications
                  {notifications && notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -right-4 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </span>
              </Button>
              
              <Button size="sm">
                {userType === 'employer' ? (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Post a Job
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Find Work
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Overview Tab Content */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Stats Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {loading ? (
                Array(4).fill(0).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardContent className="p-0">
                      <Skeleton className="h-[104px] w-full" />
                    </CardContent>
                  </Card>
                ))
              ) : userType === 'employer' ? (
                // Employer Stats
                <>
                  <StatsCard 
                    title="Jobs Posted" 
                    value={stats?.jobsPosted || 0}
                    icon={<FileText className="h-5 w-5 text-purple-600" />}
                  />
                  <StatsCard 
                    title="Active Jobs" 
                    value={stats?.activeJobs || 0}
                    icon={<Briefcase className="h-5 w-5 text-blue-600" />}
                  />
                  <StatsCard 
                    title="Total Applications" 
                    value={stats?.totalApplications || 0}
                    icon={<Users className="h-5 w-5 text-indigo-600" />}
                  />
                  <StatsCard 
                    title="Hired Freelancers" 
                    value={stats?.hiredFreelancers || 0}
                    icon={<UserCheck className="h-5 w-5 text-green-600" />}
                  />
                </>
              ) : (
                // Freelancer Stats
                <>
                  <StatsCard 
                    title="Total Earnings" 
                    value={`$${stats?.earnings?.toLocaleString() || 0}`}
                    icon={<DollarSign className="h-5 w-5 text-green-600" />}
                  />
                  <StatsCard 
                    title="Jobs Completed" 
                    value={stats?.jobsCompleted || 0}
                    icon={<CheckCircle2 className="h-5 w-5 text-blue-600" />}
                  />
                  <StatsCard 
                    title="Active Proposals" 
                    value={stats?.activeProposals || 0}
                    icon={<FileText className="h-5 w-5 text-purple-600" />}
                  />
                  <StatsCard 
                    title="Available Jobs" 
                    value={stats?.availableJobs || 0}
                    icon={<Zap className="h-5 w-5 text-amber-600" />}
                  />
                </>
              )}
            </div>

            {/* Profile & Activity Section - Two column layout */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              {/* Left column - wider */}
              <Card className="md:col-span-1 lg:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>
                    Your professional presence
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-3 w-[170px]" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={profile?.avatar_url || `/avatars/01.png`} alt={profile?.full_name || 'User'} />
                          <AvatarFallback>{profile?.full_name?.charAt(0) || user?.user_metadata?.full_name?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{profile?.full_name || user?.user_metadata?.full_name || 'Your Name'}</h3>
                          <p className="text-sm text-muted-foreground">{profile?.title || userType === 'employer' ? 'Employer' : 'Freelancer'}</p>
                        </div>
                      </div>

                      {userType === 'freelancer' && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Profile Completion</span>
                            <span className="font-medium">{stats?.profileCompletion || 0}%</span>
                          </div>
                          <Progress value={stats?.profileCompletion || 0} className={getProfileCompletionColor(stats?.profileCompletion || 0)} />
                        </div>
                      )}

                      {userType === 'freelancer' && (
                        <div className="space-y-2 pt-2">
                          <div className="flex justify-between text-sm">
                            <span>Skills Match Score</span>
                            <span className="font-medium">{stats?.skillMatch || 0}%</span>
                          </div>
                          <Progress value={stats?.skillMatch || 0} className="bg-blue-500" />
                        </div>
                      )}

                      <Button variant="outline" size="sm" className="w-full mt-4">
                        <Link href="/dashboard/profile" className="flex items-center justify-center w-full">
                          View Full Profile
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Right column */}
              <Card className="md:col-span-1 lg:col-span-5">
                <CardHeader className="pb-3">
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your latest {userType === 'employer' ? 'job postings' : 'applications'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentJobs && recentJobs.length > 0 ? (
                        recentJobs.map((job, i) => (
                          <div key={i} className="flex items-start p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <div className="relative flex-shrink-0 w-10 h-10 mr-4 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                              <Image 
                                src={job.company_logo || `/tech-media-logo.png`}
                                alt={job.company_name || "Company"}
                                width={40}
                                height={40}
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium text-gray-900 dark:text-gray-100">{job.title}</h4>
                                <Badge status={job.status} />
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                {job.company_name || "Company"} • {new Date(job.created_at).toLocaleDateString()}
                              </p>
                              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-2">
                                {job.description?.substring(0, 120)}...
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center p-8">
                          <div className="relative w-20 h-20 mx-auto mb-4">
                            <Image 
                              src="/abstract-purple-pattern.png"
                              alt="No Activity"
                              fill
                              className="object-cover rounded-lg opacity-60"
                            />
                          </div>
                          <p className="text-gray-500 mb-4">
                            {userType === 'employer' ? 'No jobs posted yet' : 'No applications yet'}
                          </p>
                          <Button asChild className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                            <Link href={userType === 'employer' ? '/dashboard/post-job' : '/dashboard/find-jobs'}>
                              {userType === 'employer' ? 'Post a Job' : 'Find Jobs'}
                            </Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}

// Helper components
function StatsCard({ title, value, icon }: { title: string; value: string | number, icon?: React.ReactNode }) {
  return (
    <Card className="overflow-hidden border-none shadow-md">
      <CardContent className="p-0">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 p-6">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-700 dark:from-purple-400 dark:to-indigo-400">
                {value}
              </p>
            </div>
            {icon && (
              <div className="w-12 h-12 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center shadow-sm">
                {icon}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function Badge({ status }: { status: string }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'completed':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    }
  }
  
  return (
    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
