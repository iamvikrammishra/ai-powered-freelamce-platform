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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

// Icons
import { 
  Search, 
  Filter, 
  Star, 
  MessageSquare, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Bookmark, 
  MoreVertical, 
  Clock, 
  UserCheck,
  Download,
  ChevronDown,
  ChevronRight,
  ArrowUpDown,
  Mail
} from "lucide-react"

// Sample data
const applicantsData = [
  {
    id: "applicant-1",
    name: "Rahul Mehra",
    title: "Senior Frontend Developer",
    avatar: "/avatars/avatar-1.png",
    jobTitle: "Frontend Developer with React Experience",
    jobId: "job-1",
    appliedDate: "May 20, 2025",
    status: "new",
    coverLetter: "I have over 5 years of experience with React and have worked on similar e-commerce projects...",
    proposedRate: "₹45,000",
    rating: 4.8,
    reviews: 42,
    location: "Mumbai, India",
    skills: ["React", "TypeScript", "Node.js", "Redux", "Next.js"],
    matchScore: 95,
    completedJobs: 38,
    successRate: 97
  },
  {
    id: "applicant-2",
    name: "Priya Sharma",
    title: "UX/UI Designer",
    avatar: "/avatars/avatar-2.png",
    jobTitle: "UI/UX Designer for Mobile App",
    jobId: "job-2",
    appliedDate: "May 19, 2025",
    status: "shortlisted",
    coverLetter: "I specialize in creating intuitive user experiences for mobile applications and have designed over 20 apps...",
    proposedRate: "₹38,000",
    rating: 4.9,
    reviews: 27,
    location: "Bangalore, India",
    skills: ["Figma", "UI/UX", "Adobe XD", "Sketch", "Prototyping"],
    matchScore: 92,
    completedJobs: 24,
    successRate: 100
  },
  {
    id: "applicant-3",
    name: "Vikram Singh",
    title: "Full Stack Developer",
    avatar: "/avatars/avatar-3.png",
    jobTitle: "Full Stack Developer for E-commerce Site",
    jobId: "job-3",
    appliedDate: "May 22, 2025",
    status: "interviewed",
    coverLetter: "I've built multiple e-commerce platforms from scratch using modern tech stacks...",
    proposedRate: "₹55,000",
    rating: 4.7,
    reviews: 31,
    location: "Delhi, India",
    skills: ["React", "Node.js", "MongoDB", "Express", "AWS", "Docker"],
    matchScore: 88,
    completedJobs: 29,
    successRate: 93
  },
  {
    id: "applicant-4",
    name: "Ananya Patel",
    title: "Frontend Engineer",
    avatar: "/avatars/avatar-4.png",
    jobTitle: "Frontend Developer with React Experience",
    jobId: "job-1",
    appliedDate: "May 18, 2025",
    status: "rejected",
    coverLetter: "I have 3 years of experience building responsive web applications using React...",
    proposedRate: "₹42,000",
    rating: 4.5,
    reviews: 19,
    location: "Pune, India",
    skills: ["React", "JavaScript", "HTML", "CSS", "Material UI"],
    matchScore: 75,
    completedJobs: 15,
    successRate: 87
  },
  {
    id: "applicant-5",
    name: "Arjun Kumar",
    title: "Senior Full Stack Developer",
    avatar: "/avatars/avatar-5.png",
    jobTitle: "Full Stack Developer for E-commerce Site",
    jobId: "job-3",
    appliedDate: "May 21, 2025",
    status: "new",
    coverLetter: "With 7+ years of experience building scalable web applications, I've worked with various e-commerce platforms...",
    proposedRate: "₹60,000",
    rating: 4.9,
    reviews: 47,
    location: "Hyderabad, India",
    skills: ["React", "Node.js", "PostgreSQL", "GraphQL", "TypeScript", "Next.js"],
    matchScore: 97,
    completedJobs: 42,
    successRate: 95
  }
]

// Status options with colors
const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "new", label: "New", color: "bg-blue-100 text-blue-800" },
  { value: "shortlisted", label: "Shortlisted", color: "bg-green-100 text-green-800" },
  { value: "interviewed", label: "Interviewed", color: "bg-purple-100 text-purple-800" },
  { value: "hired", label: "Hired", color: "bg-indigo-100 text-indigo-800" },
  { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800" }
]

// Job options
const jobOptions = [
  { value: "all", label: "All Jobs" },
  { value: "job-1", label: "Frontend Developer with React Experience" },
  { value: "job-2", label: "UI/UX Designer for Mobile App" },
  { value: "job-3", label: "Full Stack Developer for E-commerce Site" }
]

export default function ApplicantsReviewPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedJob, setSelectedJob] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([])
  
  // Filter applicants based on active tab, search query, job, and status
  const filteredApplicants = applicantsData.filter(applicant => {
    // Filter by tab
    if (activeTab === "new" && applicant.status !== "new") return false
    if (activeTab === "shortlisted" && applicant.status !== "shortlisted") return false
    if (activeTab === "interviewed" && applicant.status !== "interviewed") return false
    
    // Filter by search query
    if (searchQuery && !applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !applicant.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))) 
      return false
    
    // Filter by job
    if (selectedJob !== "all" && applicant.jobId !== selectedJob) return false
    
    // Filter by status
    if (selectedStatus !== "all" && applicant.status !== selectedStatus) return false
    
    return true
  })
  
  // Count applicants by status
  const countsByStatus = {
    all: applicantsData.length,
    new: applicantsData.filter(a => a.status === "new").length,
    shortlisted: applicantsData.filter(a => a.status === "shortlisted").length,
    interviewed: applicantsData.filter(a => a.status === "interviewed").length
  }
  
  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    if (selectedApplicants.length === 0) {
      toast({
        title: "No applicants selected",
        description: "Please select at least one applicant.",
        variant: "destructive"
      })
      return
    }
    
    const applicantNames = selectedApplicants.map(id => 
      applicantsData.find(a => a.id === id)?.name
    ).join(", ")
    
    switch (action) {
      case "shortlist":
        toast({
          title: "Applicants shortlisted",
          description: `${selectedApplicants.length} applicants have been shortlisted.`
        })
        break
      case "schedule":
        router.push("/dashboard/employer/schedule-interview")
        break
      case "message":
        router.push("/dashboard/employer/messages/new")
        break
      case "reject":
        toast({
          title: "Applicants rejected",
          description: `${selectedApplicants.length} applicants have been rejected.`
        })
        break
      default:
        break
    }
    
    // Clear selection after action
    setSelectedApplicants([])
  }
  
  // Handle individual applicant action
  const handleApplicantAction = (action: string, applicantId: string) => {
    const applicant = applicantsData.find(a => a.id === applicantId)
    
    switch (action) {
      case "view":
        router.push(`/dashboard/employer/applicants/${applicantId}`)
        break
      case "shortlist":
        toast({
          title: "Applicant shortlisted",
          description: `${applicant?.name} has been added to your shortlist.`
        })
        break
      case "schedule":
        router.push(`/dashboard/employer/schedule-interview?applicant=${applicantId}`)
        break
      case "message":
        router.push(`/dashboard/employer/messages/new?recipient=${applicantId}`)
        break
      case "reject":
        toast({
          title: "Applicant rejected",
          description: `${applicant?.name} has been rejected.`
        })
        break
      default:
        break
    }
  }
  
  // Toggle applicant selection
  const toggleApplicantSelection = (applicantId: string) => {
    setSelectedApplicants(prev => 
      prev.includes(applicantId)
        ? prev.filter(id => id !== applicantId)
        : [...prev, applicantId]
    )
  }
  
  // Check if all filtered applicants are selected
  const allSelected = filteredApplicants.length > 0 && 
    filteredApplicants.every(a => selectedApplicants.includes(a.id))
  
  // Toggle all applicants selection
  const toggleAllSelection = () => {
    if (allSelected) {
      setSelectedApplicants([])
    } else {
      setSelectedApplicants(filteredApplicants.map(a => a.id))
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <DashboardHeader
          heading="Review Applicants"
          text="Manage and evaluate freelancers who have applied to your jobs"
        />
      </div>
      
      <div className="space-y-6">
        {/* Tabs and Filters */}
        <div className="flex flex-col space-y-4">
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="all">
                All <Badge variant="outline" className="ml-2">{countsByStatus.all}</Badge>
              </TabsTrigger>
              <TabsTrigger value="new">
                New <Badge variant="outline" className="ml-2">{countsByStatus.new}</Badge>
              </TabsTrigger>
              <TabsTrigger value="shortlisted">
                Shortlisted <Badge variant="outline" className="ml-2">{countsByStatus.shortlisted}</Badge>
              </TabsTrigger>
              <TabsTrigger value="interviewed">
                Interviewed <Badge variant="outline" className="ml-2">{countsByStatus.interviewed}</Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 md:max-w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name or skill..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select
              value={selectedJob}
              onValueChange={setSelectedJob}
            >
              <SelectTrigger className="w-full md:w-[250px]">
                <SelectValue placeholder="Filter by job" />
              </SelectTrigger>
              <SelectContent>
                {jobOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={selectedStatus}
              onValueChange={setSelectedStatus}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="md:ml-auto">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Bulk Actions */}
        {selectedApplicants.length > 0 && (
          <Card className="bg-muted/50">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="text-sm">
                <span className="font-medium">{selectedApplicants.length}</span> applicants selected
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction("shortlist")}>
                  <Bookmark className="mr-2 h-4 w-4" />
                  Shortlist
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction("schedule")}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Interview
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction("message")}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleBulkAction("reject")}>
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Applicants List */}
        <Card>
          <CardHeader className="py-4">
            <CardTitle>Applicants</CardTitle>
            <CardDescription>
              {filteredApplicants.length} applicants found
              {selectedJob !== "all" && ` for "${jobOptions.find(j => j.value === selectedJob)?.label}"`}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-left">
                    <th className="py-3 px-4">
                      <Checkbox 
                        checked={allSelected} 
                        onCheckedChange={toggleAllSelection} 
                        aria-label="Select all applicants"
                      />
                    </th>
                    <th className="py-3 px-4 font-medium">Applicant</th>
                    <th className="py-3 px-4 font-medium">Job</th>
                    <th className="py-3 px-4 font-medium">Applied</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                    <th className="py-3 px-4 font-medium">Rating</th>
                    <th className="py-3 px-4 font-medium">Match</th>
                    <th className="py-3 px-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplicants.length > 0 ? (
                    filteredApplicants.map((applicant) => (
                      <tr key={applicant.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4">
                          <Checkbox 
                            checked={selectedApplicants.includes(applicant.id)} 
                            onCheckedChange={() => toggleApplicantSelection(applicant.id)} 
                            aria-label={`Select ${applicant.name}`}
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={applicant.avatar} alt={applicant.name} />
                              <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <Link 
                                href={`/dashboard/employer/applicants/${applicant.id}`} 
                                className="font-medium hover:underline"
                              >
                                {applicant.name}
                              </Link>
                              <p className="text-xs text-muted-foreground">{applicant.title}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="max-w-[200px] truncate" title={applicant.jobTitle}>
                            {applicant.jobTitle}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{applicant.appliedDate}</td>
                        <td className="py-3 px-4">
                          <Badge
                            className={
                              applicant.status === "new"
                                ? "bg-blue-100 text-blue-800"
                                : applicant.status === "shortlisted"
                                ? "bg-green-100 text-green-800"
                                : applicant.status === "interviewed"
                                ? "bg-purple-100 text-purple-800"
                                : applicant.status === "hired"
                                ? "bg-indigo-100 text-indigo-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-amber-500 mr-1" />
                            <span>{applicant.rating}</span>
                            <span className="text-muted-foreground ml-1">({applicant.reviews})</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Progress value={applicant.matchScore} className="h-2 w-14" />
                            <span className="font-medium">{applicant.matchScore}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleApplicantAction("message", applicant.id)}
                              title="Message"
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleApplicantAction("view", applicant.id)}>
                                  View Profile
                                </DropdownMenuItem>
                                {applicant.status !== "shortlisted" && applicant.status !== "hired" && (
                                  <DropdownMenuItem onClick={() => handleApplicantAction("shortlist", applicant.id)}>
                                    Shortlist
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem onClick={() => handleApplicantAction("schedule", applicant.id)}>
                                  Schedule Interview
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleApplicantAction("message", applicant.id)}>
                                  Send Message
                                </DropdownMenuItem>
                                {applicant.status !== "hired" && (
                                  <DropdownMenuItem onClick={() => handleApplicantAction("hire", applicant.id)}>
                                    Hire
                                  </DropdownMenuItem>
                                )}
                                {applicant.status !== "rejected" && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                      onClick={() => handleApplicantAction("reject", applicant.id)}
                                      className="text-red-600"
                                    >
                                      Reject
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-6 text-center text-muted-foreground">
                        No applicants found. {searchQuery && "Try a different search term."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="py-4 border-t flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Showing {filteredApplicants.length} of {applicantsData.length} applicants
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
        
        {/* Applicant Comparison */}
        {selectedApplicants.length >= 2 && selectedApplicants.length <= 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Compare Selected Applicants</CardTitle>
              <CardDescription>Side-by-side comparison of selected candidates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {selectedApplicants.map(id => {
                  const applicant = applicantsData.find(a => a.id === id)
                  if (!applicant) return null
                  
                  return (
                    <div key={id} className="space-y-4">
                      <div className="flex flex-col items-center text-center">
                        <Avatar className="h-16 w-16 mb-2">
                          <AvatarImage src={applicant.avatar} alt={applicant.name} />
                          <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-medium">{applicant.name}</h3>
                        <p className="text-sm text-muted-foreground">{applicant.title}</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-amber-500 mr-1" />
                          <span>{applicant.rating}</span>
                          <span className="text-muted-foreground ml-1">({applicant.reviews})</span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Match Score</span>
                          <span className="font-medium">{applicant.matchScore}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Completed Jobs</span>
                          <span className="font-medium">{applicant.completedJobs}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Success Rate</span>
                          <span className="font-medium">{applicant.successRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Proposed Rate</span>
                          <span className="font-medium">{applicant.proposedRate}</span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {applicant.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-center gap-2">
                        <Button size="sm">View Profile</Button>
                        <Button size="sm" variant="outline">Message</Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Hiring Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Hiring Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="font-medium">Look Beyond the Match Score</h3>
                <p className="text-sm text-muted-foreground">
                  While match scores are helpful, also consider communication skills and portfolio quality.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Schedule Brief Interviews</h3>
                <p className="text-sm text-muted-foreground">
                  Even a 15-minute video call can help assess cultural fit and communication abilities.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Check Reviews Thoroughly</h3>
                <p className="text-sm text-muted-foreground">
                  Look for patterns in feedback from previous clients to get insights into work style.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
