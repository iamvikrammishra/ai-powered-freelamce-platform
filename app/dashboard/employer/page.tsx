"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase/client"

// UI Components
import { DashboardHeader } from "@/components/features/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Icons
import { 
  Briefcase, 
  MessageSquare, 
  BarChart3,
  Users,
  PlusCircle,
  Clock,
  Calendar,
  Search,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Star,
  FileText,
  Eye,
  ChevronRight,
} from "lucide-react"

export default function EmployerDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  
  // Employer dashboard data
  const [stats, setStats] = useState({
    activeJobs: 4,
    totalApplications: 27,
    pendingReview: 12,
    activeContracts: 3,
    budget: {
      total: 150000,
      spent: 68000,
      remaining: 82000
    },
    timeToHire: 3.2, // days
    applicantsPerJob: 12.5
  })
  
  const [activeJobs, setActiveJobs] = useState([
    {
      id: "job-1",
      title: "Frontend Developer with React Experience",
      applications: 14,
      new: 5,
      timeRemaining: "3 days",
      status: "active",
      budget: "₹30,000 - ₹50,000"
    },
    {
      id: "job-2",
      title: "UI/UX Designer for Mobile App",
      applications: 8,
      new: 2,
      timeRemaining: "5 days",
      status: "active",
      budget: "₹25,000 - ₹40,000"
    },
    {
      id: "job-3",
      title: "Full Stack Developer for E-commerce Site",
      applications: 5,
      new: 5,
      timeRemaining: "6 days",
      status: "active",
      budget: "₹45,000 - ₹65,000"
    }
  ])
  
  const [topCandidates, setTopCandidates] = useState([
    {
      id: "freelancer-1",
      name: "Priya Sharma",
      title: "Senior React Developer",
      rating: 4.9,
      jobSuccess: 96,
      hourlyRate: 35,
      matchScore: 95,
      skills: ["React", "TypeScript", "Node.js"],
      avatar: "/avatars/avatar-1.png"
    },
    {
      id: "freelancer-2",
      name: "Rahul Mehra",
      title: "UI/UX Designer",
      rating: 4.8,
      jobSuccess: 92,
      hourlyRate: 30,
      matchScore: 92,
      skills: ["Figma", "UI/UX", "Adobe XD"],
      avatar: "/avatars/avatar-2.png"
    }
  ])
  
  const [activeContracts, setActiveContracts] = useState([
    {
      id: "contract-1",
      title: "Website Redesign Project",
      freelancer: "Ananya Patel",
      progress: 65,
      nextMilestone: "Frontend Implementation",
      dueDate: "June 15, 2025",
      budget: {
        total: 45000,
        spent: 25000
      }
    },
    {
      id: "contract-2",
      title: "Mobile App Development",
      freelancer: "Vikram Singh",
      progress: 40,
      nextMilestone: "User Authentication",
      dueDate: "June 28, 2025",
      budget: {
        total: 75000,
        spent: 30000
      }
    }
  ])

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setProfile({
        company_name: "TechSolutions Inc.",
        display_name: "Sarah",
        title: "HR Manager",
        avatarUrl: "https://github.com/shadcn.png"
      })
      setLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Employer Dashboard Header */}
      <div className="flex items-start justify-between mb-6">
        <DashboardHeader 
          heading={`Welcome, ${profile?.display_name || 'there'}!`} 
          text="Manage your projects and find the perfect talent for your needs."
        />
        
        <div className="flex items-center gap-3">
          <Link href="/dashboard/employer/post-job">
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Post Job
            </Button>
          </Link>
        </div>
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
            {/* Overview Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Active Jobs */}
              <Link 
                href="/dashboard/employer/jobs" 
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 transition-all hover:bg-zinc-800/80 hover:border-zinc-700 hover:shadow-md group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="text-indigo-500 mr-2">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-zinc-400">Active Jobs</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-white">{stats.activeJobs}</div>
                  <div className="text-xs text-green-400 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" /> 12% this month
                  </div>
                </div>
              </Link>
              
              {/* Applications */}
              <Link 
                href="/dashboard/employer/applications" 
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 transition-all hover:bg-zinc-800/80 hover:border-zinc-700 hover:shadow-md group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="text-amber-500 mr-2">
                      <Clock className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-zinc-400">Applications</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-white">{stats.pendingReview}</div>
                  <div className="text-xs text-green-400 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" /> 5 new today
                  </div>
                </div>
              </Link>
              
              {/* Contracts */}
              <Link 
                href="/dashboard/employer/contracts" 
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 transition-all hover:bg-zinc-800/80 hover:border-zinc-700 hover:shadow-md group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="text-green-500 mr-2">
                      <FileText className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-zinc-400">Contracts</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-white">{stats.activeContracts}</div>
                  <div className="text-xs text-green-400 flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" /> 2 milestones due
                  </div>
                </div>
              </Link>
              
              {/* Budget */}
              <Link 
                href="/dashboard/employer/payments" 
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 transition-all hover:bg-zinc-800/80 hover:border-zinc-700 hover:shadow-md group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="text-purple-500 mr-2">
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-zinc-400">Budget</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-white">₹{stats.budget.spent.toLocaleString()}</div>
                  <div className="text-xs text-zinc-400">
                    of ₹{stats.budget.total.toLocaleString()} total
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Main dashboard content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left column: Active Jobs */}
              <div className="md:col-span-2">
                <Card className="shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6">
                    <div>
                      <CardTitle>Active Job Postings</CardTitle>
                      <CardDescription>Monitor your job listings and applicants</CardDescription>
                    </div>
                    <Link href="/dashboard/employer/jobs">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        View All
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {activeJobs.map((job) => (
                        <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                          <div className="grid gap-1">
                            <Link href={`/dashboard/employer/jobs/${job.id}`} className="font-medium hover:underline">
                              {job.title}
                            </Link>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
                                  {job.status}
                                </Badge>
                                <span className="text-xs">{job.budget}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col items-end text-sm">
                              <div className="font-medium">{job.applications} applicants</div>
                              <div className="text-xs text-muted-foreground">{job.new} new</div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Link href={`/dashboard/employer/jobs/${job.id}/applicants`}>
                                <Button size="sm" variant="outline">
                                  View Applicants
                                </Button>
                              </Link>
                              
                              <Link href={`/dashboard/employer/jobs/${job.id}`}>
                                <Button size="icon" variant="ghost">
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 pb-3 pt-3">
                    <Button variant="outline" className="w-full" size="sm">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Post New Job
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Right column: Top Candidates */}
              <div className="space-y-6">

                {/* Top Candidates Card */}
                <Card className="shadow-sm">
                  <CardHeader className="pb-2 pt-6">
                    <CardTitle>Top Candidates</CardTitle>
                    <CardDescription>Highly matched freelancers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {topCandidates.map((candidate) => (
                        <div key={candidate.id} className="border rounded-lg p-3 hover:bg-muted/30 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                                <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <Link href={`/dashboard/employer/freelancers/${candidate.id}`} className="font-medium hover:text-primary">
                                  {candidate.name}
                                </Link>
                                <p className="text-xs text-muted-foreground">{candidate.title}</p>
                              </div>
                            </div>
                            <Badge className="bg-green-50 text-green-700 hover:bg-green-100 border-0">
                              {candidate.matchScore}% Match
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-1 mb-2 text-sm">
                            <div className="flex items-center">
                              <Star className="h-3.5 w-3.5 text-amber-500 mr-1" />
                              <span className="text-xs">{candidate.rating}/5 ({candidate.jobSuccess}% Success)</span>
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="h-3.5 w-3.5 mr-1" />
                              <span className="text-xs">₹{candidate.hourlyRate}/hr</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {candidate.skills.slice(0, 2).map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700">
                                {skill}
                              </Badge>
                            ))}
                            {candidate.skills.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{candidate.skills.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 pb-3 pt-3">
                    <Button variant="outline" className="w-full" size="sm">
                      <Search className="mr-2 h-4 w-4" />
                      Find More Talent
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
            
            {/* Active Contracts Section */}
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6">
                <div>
                  <CardTitle>Active Contracts</CardTitle>
                  <CardDescription>Your ongoing projects with freelancers</CardDescription>
                </div>
                <Link href="/dashboard/employer/contracts">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeContracts.map((contract) => (
                    <div key={contract.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <Link href={`/dashboard/employer/contracts/${contract.id}`} className="font-medium hover:text-primary">
                          {contract.title}
                        </Link>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
                          Due: {contract.dueDate}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm mb-3">
                        <div className="text-muted-foreground">with</div>
                        <div className="font-medium">{contract.freelancer}</div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="text-muted-foreground">Progress</div>
                          <div>{contract.progress}%</div>
                        </div>
                        <Progress value={contract.progress} className="h-2" />
                      </div>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Next:</span> {contract.nextMilestone}
                        </div>
                        
                        <Link href={`/dashboard/employer/contracts/${contract.id}`}>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </>
  )
}
