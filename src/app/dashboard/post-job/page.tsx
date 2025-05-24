"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/features/dashboard/dashboard-header"
import { DashboardShell } from "@/components/features/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/use-toast"

export default function PostJobPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [availableSkills, setAvailableSkills] = useState<any[]>([])
  
  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [budgetType, setBudgetType] = useState<"fixed" | "hourly">("fixed")
  const [budgetMin, setBudgetMin] = useState("")
  const [budgetMax, setBudgetMax] = useState("")
  const [duration, setDuration] = useState<"short" | "medium" | "long">("medium")
  const [experienceLevel, setExperienceLevel] = useState<"beginner" | "intermediate" | "expert">("intermediate")
  const [locationType, setLocationType] = useState<"remote" | "onsite" | "hybrid">("remote")
  const [location, setLocation] = useState("")

  useEffect(() => {
    // Fetch current user
    async function fetchUserAndSkills() {
      try {
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
      } catch (error) {
        console.error("Error fetching user or skills:", error)
      }
    }
    
    fetchUserAndSkills()
  }, [router])

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title || !description || selectedSkills.length === 0) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }
    
    setLoading(true)
    
    try {
      // Get current date
      const now = new Date()
      
      // Set expiration date (30 days from now)
      const expiresAt = new Date()
      expiresAt.setDate(now.getDate() + 30)
      
      // Create job posting
      const { data, error } = await supabase
        .from("jobs")
        .insert({
          employer_id: user.id,
          title,
          description,
          skills_required: selectedSkills,
          budget_min: budgetMin ? parseFloat(budgetMin) : null,
          budget_max: budgetMax ? parseFloat(budgetMax) : null,
          budget_type: budgetType,
          duration,
          experience_level: experienceLevel,
          status: "open",
          location_type: locationType,
          location: locationType !== "remote" ? location : null,
          expires_at: expiresAt.toISOString(),
        })
        .select()
      
      if (error) throw error
      
      // Update employer's job count
      const { error: profileError } = await supabase
        .from("employer_profiles")
        .update({ jobs_posted: supabase.rpc("increment", { x: 1 }) })
        .eq("user_id", user.id)
      
      if (profileError) console.error("Error updating profile:", profileError)
      
      toast({
        title: "Job posted successfully!",
        description: "Your job is now live and visible to freelancers",
      })
      
      // Redirect to job management page
      router.push("/dashboard/my-jobs")
    } catch (error: any) {
      console.error("Error posting job:", error)
      toast({
        title: "Failed to post job",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Post a New Job"
        text="Create a detailed job posting to attract the right freelancers for your project."
      />
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>Provide basic information about your job</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title <span className="text-red-500">*</span></Label>
              <Input
                id="title"
                placeholder="e.g. Full Stack Developer for E-commerce Website"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Job Description <span className="text-red-500">*</span></Label>
              <Textarea
                id="description"
                placeholder="Describe the project, requirements, and deliverables in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[200px]"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Required Skills <span className="text-red-500">*</span></Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
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
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Budget & Timeline</CardTitle>
            <CardDescription>Define your budget and project timeline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Budget Type</Label>
              <RadioGroup value={budgetType} onValueChange={(value: "fixed" | "hourly") => setBudgetType(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fixed" id="fixed" />
                  <Label htmlFor="fixed">Fixed Price</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hourly" id="hourly" />
                  <Label htmlFor="hourly">Hourly Rate</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget-min">
                  {budgetType === "fixed" ? "Minimum Budget (₹)" : "Minimum Hourly Rate (₹/hr)"}
                </Label>
                <Input
                  id="budget-min"
                  type="number"
                  placeholder={budgetType === "fixed" ? "e.g. 10000" : "e.g. 500"}
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget-max">
                  {budgetType === "fixed" ? "Maximum Budget (₹)" : "Maximum Hourly Rate (₹/hr)"}
                </Label>
                <Input
                  id="budget-max"
                  type="number"
                  placeholder={budgetType === "fixed" ? "e.g. 20000" : "e.g. 1000"}
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Project Duration</Label>
              <Select value={duration} onValueChange={(value: "short" | "medium" | "long") => setDuration(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short Term (Less than 1 month)</SelectItem>
                  <SelectItem value="medium">Medium Term (1-3 months)</SelectItem>
                  <SelectItem value="long">Long Term (3+ months)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Experience Level</Label>
              <Select value={experienceLevel} onValueChange={(value: "beginner" | "intermediate" | "expert") => setExperienceLevel(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Entry Level</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
            <CardDescription>Specify if this job requires a specific location</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Work Type</Label>
              <RadioGroup value={locationType} onValueChange={(value: "remote" | "onsite" | "hybrid") => setLocationType(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="remote" id="remote" />
                  <Label htmlFor="remote">Remote</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="onsite" id="onsite" />
                  <Label htmlFor="onsite">On-Site</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hybrid" id="hybrid" />
                  <Label htmlFor="hybrid">Hybrid</Label>
                </div>
              </RadioGroup>
            </div>
            
            {locationType !== "remote" && (
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g. Mumbai, India"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required={locationType !== "remote"}
                />
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Posting..." : "Post Job"}
          </Button>
        </div>
      </form>
    </DashboardShell>
  )
}
