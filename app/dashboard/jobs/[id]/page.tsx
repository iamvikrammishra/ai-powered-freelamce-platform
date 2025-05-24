"use client"

import { useState, useEffect } from "react"
import { notFound, useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, MapPin, Clock, Briefcase, Building, Heart, Share2, Flag, Calendar, DollarSign } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [job, setJob] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any | null>(null)
  const [userProfile, setUserProfile] = useState<any | null>(null)
  const [similarJobs, setSimilarJobs] = useState<any[]>([])
  const [employerProfile, setEmployerProfile] = useState<any | null>(null)
  const [alreadyApplied, setAlreadyApplied] = useState(false)
  
  // Application form state
  const [coverLetter, setCoverLetter] = useState("")
  const [bidAmount, setBidAmount] = useState("")
  const [expectedDuration, setExpectedDuration] = useState("")
  const [attachPortfolio, setAttachPortfolio] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function fetchJobDetails() {
      try {
        // Get current user
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        if (currentUser) {
          setUser(currentUser)
          
          // Fetch user profile
          const { data: profileData } = await supabase
            .from("freelancer_profiles")
            .select("*")
            .eq("user_id", currentUser.id)
            .single()
          
          setUserProfile(profileData)
        }
        
        // Fetch job details
        const { data: jobData, error: jobError } = await supabase
          .from("jobs")
          .select(`
            *,
            employer_profiles: employer_id (*)
          `)
          .eq("id", params.id)
          .single()
        
        if (jobError) throw jobError
        if (!jobData) return notFound()
        
        setJob(jobData)
        setEmployerProfile(jobData.employer_profiles)
        
        // Check if user has already applied
        if (currentUser) {
          const { data: applicationData } = await supabase
            .from("job_applications")
            .select("*")
            .eq("job_id", params.id)
            .eq("freelancer_id", currentUser.id)
            .single()
          
          setAlreadyApplied(!!applicationData)
        }
        
        // Fetch similar jobs based on skills
        if (jobData.skills_required && jobData.skills_required.length > 0) {
          const { data: similarJobsData } = await supabase
            .from("jobs")
            .select(`
              *,
              employer_profiles: employer_id (*)
            `)
            .neq("id", params.id)
            .eq("status", "open")
            .order("created_at", { ascending: false })
            .limit(3)
          
          setSimilarJobs(similarJobsData || [])
        }
      } catch (error) {
        console.error("Error fetching job details:", error)
        toast({
          title: "Error loading job",
          description: "Failed to load job details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    
    fetchJobDetails()
  }, [params.id, toast])
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date)
  }
  
  const getTimeSince = (dateString: string) => {
    const now = new Date()
    const postedDate = new Date(dateString)
    const diffTime = Math.abs(now.getTime() - postedDate.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60))
        return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`
      }
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
    } else if (diffDays < 30) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
    } else {
      return formatDate(dateString)
    }
  }
  
  const getDurationText = (duration: string) => {
    switch (duration) {
      case "short":
        return "Short Term (Less than 1 month)"
      case "medium":
        return "Medium Term (1-3 months)"
      case "long":
        return "Long Term (3+ months)"
      default:
        return duration
    }
  }
  
  const getExperienceLevelText = (level: string) => {
    switch (level) {
      case "beginner":
        return "Entry Level"
      case "intermediate":
        return "Intermediate"
      case "expert":
        return "Expert"
      default:
        return level
    }
  }
  
  const calculateMatchScore = (jobSkills: string[], userSkills: string[]) => {
    if (!userSkills || userSkills.length === 0 || !jobSkills || jobSkills.length === 0) {
      return 0
    }
    
    const matchedSkills = jobSkills.filter(skill => 
      userSkills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase())
    )
    
    return Math.round((matchedSkills.length / jobSkills.length) * 100)
  }
  
  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to apply for this job",
        variant: "destructive",
      })
      router.push("/auth/login")
      return
    }
    
    if (!coverLetter) {
      toast({
        title: "Cover letter required",
        description: "Please write a cover letter to apply for this job",
        variant: "destructive",
      })
      return
    }
    
    setSubmitting(true)
    
    try {
      // Create job application
      const { data, error } = await supabase
        .from("job_applications")
        .insert({
          job_id: job?.id,
          freelancer_id: user.id,
          cover_letter: coverLetter,
          bid_amount: bidAmount ? parseFloat(bidAmount) : null,
          expected_duration: expectedDuration,
          status: "pending",
          include_portfolio: attachPortfolio,
        })
        .select()
      
      if (error) throw error
      
      toast({
        title: "Application submitted!",
        description: "Your application has been sent to the employer",
      })
      
      setAlreadyApplied(true)
      setCoverLetter("")
      setBidAmount("")
      setExpectedDuration("")
    } catch (error: any) {
      console.error("Error applying for job:", error)
      toast({
        title: "Failed to submit application",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }
  
  const handleSaveJob = async () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to save this job",
      })
      return
    }
    
    try {
      const { data, error } = await supabase
        .from("saved_jobs")
        .insert({
          job_id: job?.id,
          user_id: user.id,
        })
        .select()
      
      if (error) throw error
      
      toast({
        title: "Job saved",
        description: "This job has been saved to your favorites",
      })
    } catch (error: any) {
      console.error("Error saving job:", error)
      toast({
        title: "Failed to save job",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }
  
  if (loading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-[300px] mb-2" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-[150px] mb-6" />
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                </div>
                <Skeleton className="h-6 w-[100px] mb-2" />
                <Skeleton className="h-8 w-[180px] mb-6" />
                <Skeleton className="h-6 w-[100px] mb-2" />
                <div className="flex gap-2 mb-6">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <div className="space-y-4 mt-8">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-[100px] mb-4" />
                <Skeleton className="h-10 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-6" />
                <Skeleton className="h-6 w-[120px] mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardShell>
    )
  }

  if (!job) return notFound()
  
  const matchScore = userProfile?.skills 
    ? calculateMatchScore(job.skills_required, userProfile.skills)
    : 0

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <DashboardHeader 
          heading={job.title} 
          text={`${employerProfile?.display_name || 'Company'} • ${job.location_type !== "remote" ? job.location : 'Remote'}`} 
        />
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={handleSaveJob}>
            <Heart className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="font-medium text-lg">Job Details</div>
                {user && userProfile && (
                  <div className="flex items-center gap-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full text-xs font-medium">
                    <Sparkles className="h-3 w-3" />
                    {matchScore}% Match
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {job.location_type !== "remote" 
                      ? `${job.location} (${job.location_type === "hybrid" ? 'Hybrid' : 'On-site'})` 
                      : 'Remote'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {job.budget_type === "fixed" ? "Fixed Price" : "Hourly Rate"} • {getDurationText(job.duration)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Posted {getTimeSince(job.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{employerProfile?.display_name || 'Company'}</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="font-medium mb-2">Budget</div>
                <div className="text-xl font-semibold">
                  {job.budget_min && job.budget_max 
                    ? `₹${job.budget_min.toLocaleString()} - ₹${job.budget_max.toLocaleString()}` 
                    : job.budget_min 
                      ? `₹${job.budget_min.toLocaleString()}+` 
                      : 'Budget not specified'}
                  {job.budget_type === "hourly" ? "/hr" : ""}
                </div>
              </div>

              <div className="mb-6">
                <div className="font-medium mb-2">Required Skills</div>
                <div className="flex flex-wrap gap-2">
                  {job.skills_required && job.skills_required.map((skill: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="font-medium mb-2">Experience Level</div>
                <div>{getExperienceLevelText(job.experience_level)}</div>
              </div>

              <Tabs defaultValue="description">
                <TabsList className="mb-4">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="company">Company</TabsTrigger>
                </TabsList>
                <TabsContent value="description">
                  <div className="prose dark:prose-invert max-w-none prose-sm">
                    <p>{job.description}</p>
                  </div>
                </TabsContent>
                <TabsContent value="company">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={employerProfile?.avatar_url || ''} alt={employerProfile?.display_name || 'Company'} />
                        <AvatarFallback>{employerProfile?.display_name?.charAt(0) || 'C'}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{employerProfile?.display_name || 'Company'}</h3>
                        <p className="text-sm text-muted-foreground">{employerProfile?.location || 'Location not specified'}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">About the Company</h4>
                      <p className="text-sm">{employerProfile?.bio || 'No company description available.'}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Member Since</p>
                        <p>{employerProfile?.created_at ? formatDate(employerProfile.created_at) : 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="font-medium">Jobs Posted</p>
                        <p>{employerProfile?.jobs_posted || 0}</p>
                      </div>
                    </div>
                    
                    {employerProfile?.website && (
                      <div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={employerProfile.website} target="_blank" rel="noopener noreferrer">
                            Visit Website
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {similarJobs.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium text-lg mb-4">Similar Jobs</h3>
                <div className="space-y-4">
                  {similarJobs.map((similarJob) => (
                    <div key={similarJob.id} className="border rounded-md p-4 hover:bg-muted/50 transition-colors">
                      <Link href={`/dashboard/jobs/${similarJob.id}`}>
                        <h4 className="font-medium mb-1 hover:text-primary">{similarJob.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <span>{similarJob.employer_profiles?.display_name}</span>
                          <span>•</span>
                          <span>
                            {similarJob.budget_type === "fixed" ? "Fixed Price" : "Hourly Rate"}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {similarJob.skills_required && similarJob.skills_required.slice(0, 3).map((skill: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {similarJob.skills_required && similarJob.skills_required.length > 3 && (
                            <Badge variant="outline" className="text-xs">+{similarJob.skills_required.length - 3} more</Badge>
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div>
          <Card>
            <CardContent className="p-6">
              {alreadyApplied ? (
                <div className="text-center py-6">
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-3 rounded-full inline-flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Application Submitted</h3>
                  <p className="text-muted-foreground mb-4">You have already applied for this job</p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard/applications">View My Applications</Link>
                  </Button>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold mb-6">Apply for this Job</h3>
                  
                  {!user ? (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground mb-4">Login or create an account to apply for this job</p>
                      <Button className="w-full" asChild>
                        <Link href="/auth/login">Login to Apply</Link>
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleApply}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cover-letter">Cover Letter <span className="text-red-500">*</span></Label>
                          <Textarea
                            id="cover-letter"
                            placeholder="Introduce yourself and explain why you're a good fit for this job"
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            className="min-h-[150px]"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bid-amount">
                            Your Bid ({job.budget_type === "fixed" ? "Total" : "Hourly Rate"} in ₹)
                          </Label>
                          <Input
                            id="bid-amount"
                            type="number"
                            placeholder={job.budget_type === "fixed" ? "e.g. 50000" : "e.g. 1000"}
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                          />
                          {job.budget_min && job.budget_max && (
                            <p className="text-xs text-muted-foreground">
                              Client's budget: ₹{job.budget_min} - ₹{job.budget_max}
                              {job.budget_type === "hourly" ? "/hr" : ""}
                            </p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="expected-duration">Expected Duration</Label>
                          <Input
                            id="expected-duration"
                            placeholder="e.g. 2 weeks, 1 month"
                            value={expectedDuration}
                            onChange={(e) => setExpectedDuration(e.target.value)}
                          />
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="portfolio"
                            checked={attachPortfolio}
                            onCheckedChange={setAttachPortfolio}
                          />
                          <Label htmlFor="portfolio">Include my portfolio with application</Label>
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full mt-6" disabled={submitting}>
                        {submitting ? "Submitting Application..." : "Submit Application"}
                      </Button>
                    </form>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium mb-4">Job Overview</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Job ID</span>
                  <span className="text-sm">{job.id}</span>
                </div>
                <Separator />
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Location</span>
                  <span className="text-sm capitalize">{job.location_type}</span>
                </div>
                <Separator />
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Experience</span>
                  <span className="text-sm">{getExperienceLevelText(job.experience_level)}</span>
                </div>
                <Separator />
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Duration</span>
                  <span className="text-sm">{getDurationText(job.duration)}</span>
                </div>
                <Separator />
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Posted</span>
                  <span className="text-sm">{formatDate(job.created_at)}</span>
                </div>
                <Separator />
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Expires</span>
                  <span className="text-sm">{job.expires_at ? formatDate(job.expires_at) : 'Not specified'}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" size="sm" className="w-full">
                  <Flag className="mr-2 h-4 w-4" />
                  Report this Job
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
