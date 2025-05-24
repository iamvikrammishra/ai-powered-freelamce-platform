"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Users, BriefcaseBusiness, Clock, Eye, Edit, Trash, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { supabase } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function MyJobsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])
  const [contracts, setContracts] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [jobToDelete, setJobToDelete] = useState<string | null>(null)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current user
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        if (!currentUser) {
          router.push("/auth/login")
          return
        }
        setUser(currentUser)

        // Check if user is an employer
        const { data: userRole } = await supabase
          .from("users")
          .select("role")
          .eq("id", currentUser.id)
          .single()

        if (userRole?.role !== "employer") {
          toast({
            title: "Access denied",
            description: "This page is only accessible to employers",
            variant: "destructive",
          })
          router.push("/dashboard")
          return
        }

        // Fetch jobs posted by the employer
        const { data: jobsData, error: jobsError } = await supabase
          .from("jobs")
          .select("*")
          .eq("employer_id", currentUser.id)
          .order("created_at", { ascending: false })

        if (jobsError) throw jobsError
        setJobs(jobsData || [])

        // Fetch job applications
        const { data: applicationsData, error: applicationsError } = await supabase
          .from("job_applications")
          .select(`
            *,
            jobs (
              id,
              title
            ),
            freelancer_profiles: freelancer_id (
              id,
              user_id,
              display_name,
              avatar_url,
              skills
            )
          `)
          .in("job_id", jobsData?.map(job => job.id) || [])
          .order("created_at", { ascending: false })

        if (applicationsError) throw applicationsError
        setApplications(applicationsData || [])

        // Fetch contracts
        const { data: contractsData, error: contractsError } = await supabase
          .from("contracts")
          .select(`
            *,
            jobs (
              id,
              title
            ),
            freelancer_profiles: freelancer_id (
              id,
              user_id,
              display_name,
              avatar_url
            )
          `)
          .eq("employer_id", currentUser.id)
          .order("created_at", { ascending: false })

        if (contractsError) throw contractsError
        setContracts(contractsData || [])
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Failed to load data",
          description: "There was an error loading your jobs and applications",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router, toast])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300">Active</Badge>
      case "closed":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-300">Closed</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-300">Draft</Badge>
      case "paused":
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-300">Paused</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getApplicationStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="text-amber-600 border-amber-600">Pending Review</Badge>
      case "shortlisted":
        return <Badge variant="outline" className="text-blue-600 border-blue-600">Shortlisted</Badge>
      case "accepted":
        return <Badge variant="outline" className="text-green-600 border-green-600">Accepted</Badge>
      case "rejected":
        return <Badge variant="outline" className="text-red-600 border-red-600">Rejected</Badge>
      case "withdrawn":
        return <Badge variant="outline" className="text-gray-600 border-gray-600">Withdrawn</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getContractStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300">Active</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-300">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-300">Cancelled</Badge>
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-300">Pending</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const handleDeleteJob = async () => {
    if (!jobToDelete) return

    try {
      const { error } = await supabase
        .from("jobs")
        .update({ status: "closed" })
        .eq("id", jobToDelete)

      if (error) throw error

      setJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === jobToDelete ? { ...job, status: "closed" } : job
        )
      )

      toast({
        title: "Job closed",
        description: "The job has been closed and is no longer visible to freelancers",
      })
    } catch (error) {
      console.error("Error closing job:", error)
      toast({
        title: "Failed to close job",
        description: "There was an error closing the job",
        variant: "destructive",
      })
    } finally {
      setJobToDelete(null)
      setConfirmDeleteOpen(false)
    }
  }

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    try {
      const { error } = await supabase
        .from("job_applications")
        .update({ status })
        .eq("id", applicationId)

      if (error) throw error

      setApplications(prevApplications => 
        prevApplications.map(app => 
          app.id === applicationId ? { ...app, status } : app
        )
      )

      toast({
        title: "Application updated",
        description: `Application status changed to ${status}`,
      })

      // If accepted, create a new contract
      if (status === "accepted") {
        const application = applications.find(app => app.id === applicationId)
        if (application) {
          const { data: contractData, error: contractError } = await supabase
            .from("contracts")
            .insert({
              job_id: application.job_id,
              employer_id: user.id,
              freelancer_id: application.freelancer_id,
              status: "pending",
              amount: application.bid_amount,
              description: `Contract for job: ${application.jobs?.title}`,
              start_date: new Date().toISOString(),
            })
            .select()

          if (contractError) throw contractError

          setContracts(prev => [...prev, ...contractData])

          toast({
            title: "Contract created",
            description: "A new contract has been created and is pending freelancer approval",
          })
        }
      }
    } catch (error) {
      console.error("Error updating application:", error)
      toast({
        title: "Failed to update application",
        description: "There was an error updating the application status",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="My Jobs"
          text="Manage your job postings, applications, and contracts"
        />
        
        <div className="space-y-4">
          <Skeleton className="h-8 w-full max-w-[200px]" />
          <div className="grid gap-4">
            {Array(3).fill(0).map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-full mt-2" />
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-24" />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <DashboardHeader
          heading="My Jobs"
          text="Manage your job postings, applications, and contracts"
        />
        <Button asChild>
          <Link href="/dashboard/post-job">
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Link>
        </Button>
      </div>
      
      <Tabs defaultValue="jobs">
        <TabsList className="mb-4">
          <TabsTrigger value="jobs">
            My Jobs ({jobs.length})
          </TabsTrigger>
          <TabsTrigger value="applications">
            Applications ({applications.length})
          </TabsTrigger>
          <TabsTrigger value="contracts">
            Contracts ({contracts.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="jobs" className="space-y-4">
          {jobs.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <BriefcaseBusiness className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No jobs posted yet</h3>
                <p className="text-muted-foreground mb-4">Start hiring by posting your first job</p>
                <Button asChild>
                  <Link href="/dashboard/post-job">
                    <Plus className="mr-2 h-4 w-4" />
                    Post a Job
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {jobs.map(job => (
                <Card key={job.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>Posted on {formatDate(job.created_at)}</span>
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(job.status)}
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="12" cy="5" r="1" />
                                <circle cx="12" cy="19" r="1" />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/jobs/${job.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/edit-job/${job.id}`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Job
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600 focus:text-red-600" 
                              onClick={() => {
                                setJobToDelete(job.id)
                                setConfirmDeleteOpen(true)
                              }}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Close Job
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium">Budget</p>
                        <p className="text-sm">
                          {job.budget_min && job.budget_max 
                            ? `₹${job.budget_min.toLocaleString()} - ₹${job.budget_max.toLocaleString()}` 
                            : job.budget_min 
                              ? `₹${job.budget_min.toLocaleString()}+` 
                              : 'Not specified'}
                          {job.budget_type === "hourly" ? "/hr" : ""}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Duration</p>
                        <p className="text-sm capitalize">
                          {job.duration === "short" ? "Short Term" : 
                           job.duration === "medium" ? "Medium Term" : "Long Term"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Experience</p>
                        <p className="text-sm capitalize">{job.experience_level}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Applications</p>
                        <p className="text-sm">
                          {applications.filter(app => app.job_id === job.id).length}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-2">
                      {job.skills_required && job.skills_required.slice(0, 5).map((skill: string, index: number) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                      {job.skills_required && job.skills_required.length > 5 && (
                        <Badge variant="secondary">+{job.skills_required.length - 5} more</Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/jobs/${job.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/job/${job.id}/applications`}>
                        <Users className="mr-2 h-4 w-4" />
                        View Applications
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="applications" className="space-y-4">
          {applications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No applications yet</h3>
                <p className="text-muted-foreground mb-4">You'll see applications for your jobs here</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {applications.map(application => (
                <Card key={application.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={application.freelancer_profiles?.avatar_url || ""} alt={application.freelancer_profiles?.display_name || ""} />
                          <AvatarFallback>{application.freelancer_profiles?.display_name?.charAt(0) || "F"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{application.freelancer_profiles?.display_name}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <Link href={`/dashboard/jobs/${application.job_id}`} className="hover:underline">
                              {application.jobs?.title}
                            </Link>
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getApplicationStatusBadge(application.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium">Bid Amount</p>
                        <p className="text-sm">
                          ₹{application.bid_amount?.toLocaleString() || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Expected Duration</p>
                        <p className="text-sm">
                          {application.expected_duration || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Applied On</p>
                        <p className="text-sm">
                          {formatDate(application.created_at)}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Cover Letter</p>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {application.cover_letter}
                      </p>
                    </div>

                    {application.freelancer_profiles?.skills && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {application.freelancer_profiles.skills.slice(0, 5).map((skill: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
                          ))}
                          {application.freelancer_profiles.skills.length > 5 && (
                            <Badge variant="secondary" className="text-xs">+{application.freelancer_profiles.skills.length - 5} more</Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        asChild
                      >
                        <Link href={`/dashboard/freelancers/${application.freelancer_id}`}>
                          View Profile
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        asChild
                      >
                        <Link href={`/dashboard/messages/${application.freelancer_id}`}>
                          Message
                        </Link>
                      </Button>
                    </div>
                    
                    {application.status === "pending" && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-blue-600 text-blue-600 hover:bg-blue-50"
                          onClick={() => updateApplicationStatus(application.id, "shortlisted")}
                        >
                          Shortlist
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => updateApplicationStatus(application.id, "accepted")}
                        >
                          Accept
                        </Button>
                      </div>
                    )}
                    
                    {application.status === "shortlisted" && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          onClick={() => updateApplicationStatus(application.id, "accepted")}
                        >
                          Accept
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-red-600 text-red-600 hover:bg-red-50"
                          onClick={() => updateApplicationStatus(application.id, "rejected")}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="contracts" className="space-y-4">
          {contracts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <BriefcaseBusiness className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No contracts yet</h3>
                <p className="text-muted-foreground mb-4">When you accept applications, contracts will appear here</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {contracts.map(contract => (
                <Card key={contract.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{contract.jobs?.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <span>with</span>
                          <Link href={`/dashboard/freelancers/${contract.freelancer_id}`} className="font-medium hover:underline">
                            {contract.freelancer_profiles?.display_name}
                          </Link>
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {getContractStatusBadge(contract.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium">Amount</p>
                        <p className="text-sm">
                          ₹{contract.amount?.toLocaleString() || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Start Date</p>
                        <p className="text-sm">
                          {formatDate(contract.start_date)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">End Date</p>
                        <p className="text-sm">
                          {contract.end_date ? formatDate(contract.end_date) : "Not set"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Created On</p>
                        <p className="text-sm">
                          {formatDate(contract.created_at)}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Description</p>
                      <p className="text-sm text-muted-foreground">
                        {contract.description || "No description provided"}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        asChild
                      >
                        <Link href={`/dashboard/contracts/${contract.id}`}>
                          View Details
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        asChild
                      >
                        <Link href={`/dashboard/messages/${contract.freelancer_id}`}>
                          Message
                        </Link>
                      </Button>
                    </div>
                    
                    {contract.status === "active" && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50"
                        asChild
                      >
                        <Link href={`/dashboard/contracts/${contract.id}/milestones`}>
                          Manage Milestones
                        </Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Close Job</DialogTitle>
            <DialogDescription>
              Are you sure you want to close this job? It will no longer be visible to freelancers, but existing applications will still be accessible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteJob}>Close Job</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
