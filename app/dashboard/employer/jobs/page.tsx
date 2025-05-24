"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// UI Components
import { DashboardHeader } from "@/components/features/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"

// Icons
import { 
  Search, 
  Filter, 
  PlusCircle, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash, 
  Pause, 
  Play, 
  Clock, 
  Calendar, 
  Users, 
  CheckCircle, 
  XCircle,
  ArrowUpDown,
  ChevronDown,
  Download
} from "lucide-react"

// Sample data
const jobsData = [
  {
    id: "job-1",
    title: "Frontend Developer with React Experience",
    status: "active",
    category: "Web Development",
    posted: "May 15, 2025",
    expires: "June 15, 2025",
    applications: 14,
    newApplications: 5,
    budget: "₹30,000 - ₹50,000",
    type: "Fixed Price",
    views: 128
  },
  {
    id: "job-2",
    title: "UI/UX Designer for Mobile App",
    status: "active",
    category: "Design",
    posted: "May 17, 2025",
    expires: "June 17, 2025",
    applications: 8,
    newApplications: 2,
    budget: "₹25,000 - ₹40,000",
    type: "Fixed Price",
    views: 97
  },
  {
    id: "job-3",
    title: "Full Stack Developer for E-commerce Site",
    status: "active",
    category: "Web Development",
    posted: "May 18, 2025",
    expires: "June 18, 2025",
    applications: 5,
    newApplications: 5,
    budget: "₹45,000 - ₹65,000",
    type: "Fixed Price",
    views: 83
  },
  {
    id: "job-4",
    title: "WordPress Developer for Blog Redesign",
    status: "paused",
    category: "Web Development",
    posted: "May 10, 2025",
    expires: "June 10, 2025",
    applications: 12,
    newApplications: 0,
    budget: "₹15,000 - ₹25,000",
    type: "Fixed Price",
    views: 145
  },
  {
    id: "job-5",
    title: "Content Writer for Technology Blog",
    status: "closed",
    category: "Writing",
    posted: "April 25, 2025",
    expires: "May 25, 2025",
    applications: 23,
    newApplications: 0,
    budget: "₹10,000 - ₹20,000",
    type: "Fixed Price",
    views: 210
  },
  {
    id: "job-6",
    title: "Python Developer for Data Analysis Project",
    status: "closed",
    category: "Data Science",
    posted: "April 20, 2025",
    expires: "May 20, 2025",
    applications: 18,
    newApplications: 0,
    budget: "₹35,000 - ₹45,000",
    type: "Hourly (₹800 - ₹1,200/hr)",
    views: 175
  }
]

export default function JobsManagementPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  
  // Filter jobs based on active tab and search query
  const filteredJobs = jobsData.filter(job => {
    // Filter by tab
    if (activeTab !== "all" && job.status !== activeTab) return false
    
    // Filter by search query
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    
    // Filter by category
    if (selectedCategory !== "all" && job.category !== selectedCategory) return false
    
    return true
  })
  
  // Count jobs by status
  const countsByStatus = {
    all: jobsData.length,
    active: jobsData.filter(job => job.status === "active").length,
    paused: jobsData.filter(job => job.status === "paused").length,
    closed: jobsData.filter(job => job.status === "closed").length
  }
  
  // Handle job actions
  const handleJobAction = (action: string, jobId: string) => {
    const job = jobsData.find(job => job.id === jobId)
    
    switch (action) {
      case "view":
        router.push(`/dashboard/employer/jobs/${jobId}`)
        break
      case "edit":
        router.push(`/dashboard/employer/jobs/${jobId}/edit`)
        break
      case "pause":
        toast({
          title: "Job paused",
          description: `"${job?.title}" has been paused and is no longer visible to freelancers.`,
        })
        break
      case "activate":
        toast({
          title: "Job activated",
          description: `"${job?.title}" is now active and visible to freelancers.`,
        })
        break
      case "close":
        toast({
          title: "Job closed",
          description: `"${job?.title}" has been closed. You can no longer receive applications.`,
        })
        break
      case "delete":
        toast({
          title: "Job deleted",
          description: `"${job?.title}" has been deleted.`,
        })
        break
      default:
        break
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <DashboardHeader
          heading="Manage Jobs"
          text="Track and manage all your job postings"
        />
        <Link href="/dashboard/employer/post-job">
          <Button className="ml-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Post a Job
          </Button>
        </Link>
      </div>
      
      <div className="space-y-6">
        {/* Tabs and Filters */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full md:w-auto"
          >
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="all">
                All Jobs <Badge variant="outline" className="ml-2">{countsByStatus.all}</Badge>
              </TabsTrigger>
              <TabsTrigger value="active">
                Active <Badge variant="outline" className="ml-2">{countsByStatus.active}</Badge>
              </TabsTrigger>
              <TabsTrigger value="paused">
                Paused <Badge variant="outline" className="ml-2">{countsByStatus.paused}</Badge>
              </TabsTrigger>
              <TabsTrigger value="closed">
                Closed <Badge variant="outline" className="ml-2">{countsByStatus.closed}</Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-[250px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search jobs..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedCategory("all")}>
                  All Categories
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory("Web Development")}>
                  Web Development
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory("Design")}>
                  Design
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory("Writing")}>
                  Writing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory("Data Science")}>
                  Data Science
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Jobs Table */}
        <Card>
          <CardHeader className="py-4">
            <CardTitle>Job Listings</CardTitle>
            <CardDescription>
              {filteredJobs.length} jobs found {selectedCategory !== "all" ? `in ${selectedCategory}` : ""}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-left">
                    <th className="py-3 px-4 font-medium">Job Title</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                    <th className="py-3 px-4 font-medium">Applications</th>
                    <th className="py-3 px-4 font-medium">Posted</th>
                    <th className="py-3 px-4 font-medium">Expires</th>
                    <th className="py-3 px-4 font-medium">Budget</th>
                    <th className="py-3 px-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <tr key={job.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4">
                          <Link href={`/dashboard/employer/jobs/${job.id}`} className="font-medium hover:underline">
                            {job.title}
                          </Link>
                          <p className="text-xs text-muted-foreground">{job.category}</p>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            className={
                              job.status === "active"
                                ? "bg-green-100 text-green-800"
                                : job.status === "paused"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {job.status === "active"
                              ? "Active"
                              : job.status === "paused"
                              ? "Paused"
                              : "Closed"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{job.applications}</span>
                            {job.newApplications > 0 && (
                              <Badge variant="secondary" className="ml-2 text-xs">
                                {job.newApplications} new
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{job.posted}</td>
                        <td className="py-3 px-4 text-muted-foreground">{job.expires}</td>
                        <td className="py-3 px-4">{job.budget}</td>
                        <td className="py-3 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleJobAction("view", job.id)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              {job.status !== "closed" && (
                                <DropdownMenuItem onClick={() => handleJobAction("edit", job.id)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                              )}
                              {job.status === "active" && (
                                <DropdownMenuItem onClick={() => handleJobAction("pause", job.id)}>
                                  <Pause className="mr-2 h-4 w-4" />
                                  Pause
                                </DropdownMenuItem>
                              )}
                              {job.status === "paused" && (
                                <DropdownMenuItem onClick={() => handleJobAction("activate", job.id)}>
                                  <Play className="mr-2 h-4 w-4" />
                                  Activate
                                </DropdownMenuItem>
                              )}
                              {job.status !== "closed" && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleJobAction("close", job.id)}>
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Close Job
                                  </DropdownMenuItem>
                                </>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleJobAction("delete", job.id)}
                                className="text-red-600"
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-muted-foreground">
                        No jobs found. {searchQuery && "Try a different search term."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="py-4 border-t flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Showing {filteredJobs.length} of {jobsData.length} jobs
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        {/* Quick Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Job Posting Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="font-medium">Refresh Job Listings</h3>
                <p className="text-sm text-muted-foreground">
                  Jobs older than 30 days get fewer views. Consider refreshing your listing to increase visibility.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Improve Response Rates</h3>
                <p className="text-sm text-muted-foreground">
                  Jobs with clear descriptions and competitive rates receive 3x more qualified applications.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Use Screening Questions</h3>
                <p className="text-sm text-muted-foreground">
                  Adding 2-3 targeted screening questions can help filter candidates more effectively.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
