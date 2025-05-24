"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar } from "lucide-react"

function FindJobsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState<any[]>([])
  const [filteredJobs, setFilteredJobs] = useState<any[]>([])
  const [availableSkills, setAvailableSkills] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)

  // Filters
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [budgetMin, setBudgetMin] = useState("")
  const [budgetMax, setBudgetMax] = useState("")
  const [experienceLevel, setExperienceLevel] = useState<string>("")
  const [jobType, setJobType] = useState<string>("")
  const [locationType, setLocationType] = useState<string>("")

  useEffect(() => {
    // Get query parameters from URL
    const query = searchParams.get("q") || ""
    if (query) {
      setSearchTerm(query)
    }

    // Fetch current user, jobs, and skills
    async function fetchData() {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push("/auth/login")
          return
        }
        setUser(user)

        // Fetch available skills
        const { data: skills } = await supabase
          .from("skills")
          .select("*")
          .order("name")
        setAvailableSkills(skills || [])

        // Fetch open jobs
        const { data: jobsData, error } = await supabase
          .from("jobs")
          .select(`
            *,
            employer_profiles: employer_id (
              display_name,
              avatar_url,
              location
            )
          `)
          .eq("status", "open")
          .order("created_at", { ascending: false })

        if (error) throw error
        
        setJobs(jobsData || [])
        setFilteredJobs(jobsData || [])
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error loading jobs",
          description: "Failed to load available jobs. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router, searchParams, toast])

  // Apply filters whenever filter criteria changes
  useEffect(() => {
    if (jobs.length === 0) return

    let filtered = [...jobs]

    // Search term filter (title or description)
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        job => 
          job.title.toLowerCase().includes(term) || 
          job.description.toLowerCase().includes(term)
      )
    }

    // Skills filter
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(job => 
        selectedSkills.some(skill => 
          job.skills_required.includes(skill)
        )
      )
    }

    // Budget filter
    if (budgetMin) {
      const min = parseFloat(budgetMin)
      filtered = filtered.filter(job => 
        (job.budget_min && job.budget_min >= min) || 
        (job.budget_max && job.budget_max >= min)
      )
    }

    if (budgetMax) {
      const max = parseFloat(budgetMax)
      filtered = filtered.filter(job => 
        (job.budget_min && job.budget_min <= max) || 
        (!job.budget_min && job.budget_max && job.budget_max <= max)
      )
    }

    // Experience level filter
    if (experienceLevel) {
      filtered = filtered.filter(job => job.experience_level === experienceLevel)
    }

    // Job duration type filter
    if (jobType) {
      filtered = filtered.filter(job => job.duration === jobType)
    }

    // Location type filter
    if (locationType) {
      filtered = filtered.filter(job => job.location_type === locationType)
    }

    setFilteredJobs(filtered)
  }, [
    jobs, 
    searchTerm, 
    selectedSkills, 
    budgetMin, 
    budgetMax, 
    experienceLevel, 
    jobType, 
    locationType
  ])

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date)
  }

  const viewJobDetails = (jobId: string) => {
    router.push(`/dashboard/jobs/${jobId}`)
  }

  const renderJobCard = (job: any) => {
    return (
      <Card key={job.id} className="mb-4 hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{job.title}</CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>Posted on {formatDate(job.created_at)}</span>
              </CardDescription>
            </div>
            <div>
              <Badge variant={job.budget_type === "fixed" ? "default" : "outline"}>
                {job.budget_type === "fixed" ? "Fixed Price" : "Hourly Rate"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-3">
            <p className="text-sm line-clamp-2">{job.description}</p>
          </div>
          
          <div className="mb-4">
            <p className="text-sm font-medium">
              Budget: ₹{job.budget_min}{job.budget_max ? ` - ₹${job.budget_max}` : "+"}
              {job.budget_type === "hourly" ? "/hr" : ""}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {job.skills_required.slice(0, 5).map((skill: string, index: number) => (
              <Badge key={index} variant="secondary">{skill}</Badge>
            ))}
            {job.skills_required.length > 5 && (
              <Badge variant="secondary">+{job.skills_required.length - 5} more</Badge>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
            <div>
              <p className="font-semibold">Experience</p>
              <p>{job.experience_level.charAt(0).toUpperCase() + job.experience_level.slice(1)}</p>
            </div>
            <div>
              <p className="font-semibold">Duration</p>
              <p>
                {job.duration === "short" ? "Short Term" : 
                 job.duration === "medium" ? "Medium Term" : "Long Term"}
              </p>
            </div>
            <div>
              <p className="font-semibold">Location</p>
              <p>{job.location_type.charAt(0).toUpperCase() + job.location_type.slice(1)}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm" onClick={() => viewJobDetails(job.id)}>
            View Details
          </Button>
          <Button size="sm" onClick={() => viewJobDetails(job.id)}>
            Apply Now
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Find Jobs"
        text="Discover and apply for freelance opportunities that match your skills."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters panel */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  placeholder="Job title or keywords"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Skills</Label>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {availableSkills.map((skill) => (
                    <div key={skill.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`skill-${skill.id}`}
                        checked={selectedSkills.includes(skill.name)}
                        onCheckedChange={() => handleSkillToggle(skill.name)}
                      />
                      <Label htmlFor={`skill-${skill.id}`} className="cursor-pointer">
                        {skill.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                  <SelectTrigger id="experience">
                    <SelectValue placeholder="Any level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any level</SelectItem>
                    <SelectItem value="beginner">Entry Level</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="budget-min">Min Budget (₹)</Label>
                  <Input
                    id="budget-min"
                    type="number"
                    placeholder="Min"
                    value={budgetMin}
                    onChange={(e) => setBudgetMin(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget-max">Max Budget (₹)</Label>
                  <Input
                    id="budget-max"
                    type="number"
                    placeholder="Max"
                    value={budgetMax}
                    onChange={(e) => setBudgetMax(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="job-type">Project Duration</Label>
                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger id="job-type">
                    <SelectValue placeholder="Any duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any duration</SelectItem>
                    <SelectItem value="short">Short Term</SelectItem>
                    <SelectItem value="medium">Medium Term</SelectItem>
                    <SelectItem value="long">Long Term</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location-type">Work Type</Label>
                <Select value={locationType} onValueChange={setLocationType}>
                  <SelectTrigger id="location-type">
                    <SelectValue placeholder="Any type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any type</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="onsite">On-Site</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => {
                  setSearchTerm("")
                  setSelectedSkills([])
                  setBudgetMin("")
                  setBudgetMax("")
                  setExperienceLevel("")
                  setJobType("")
                  setLocationType("")
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Job listings */}
        <div className="md:col-span-3">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredJobs.length} of {jobs.length} available jobs
            </p>
            <Select defaultValue="latest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="budget-high">Highest Budget</SelectItem>
                <SelectItem value="budget-low">Lowest Budget</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {loading ? (
            // Loading skeleton
            Array(5).fill(0).map((_, i) => (
              <Card key={i} className="mb-4">
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/4 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-9 w-24" />
                </CardFooter>
              </Card>
            ))
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map(renderJobCard)
          ) : (
            <Card className="mb-4 p-8 text-center">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">No jobs match your filters</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or clear filters</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedSkills([])
                  setBudgetMin("")
                  setBudgetMax("")
                  setExperienceLevel("")
                  setJobType("")
                  setLocationType("")
                }}
              >
                Clear All Filters
              </Button>
            </Card>
          )}
        </div>
      </div>
    </DashboardShell>
  )
}

export default function FindJobsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>}>
      <FindJobsContent />
    </Suspense>
  )
}
