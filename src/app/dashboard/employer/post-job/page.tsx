"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// UI Components
import { DashboardHeader } from "@/components/features/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

// Icons
import { ArrowLeft, Info, Briefcase, Bookmark, DollarSign, Clock, Globe, Users, Tag, Upload } from "lucide-react"

// Form schema
const formSchema = z.object({
  title: z.string().min(10, {
    message: "Job title must be at least 10 characters.",
  }),
  description: z.string().min(100, {
    message: "Job description must be at least 100 characters.",
  }),
  category: z.string({
    required_error: "Please select a job category.",
  }),
  type: z.enum(["fixed", "hourly"], {
    required_error: "Please select a job type.",
  }),
  experience: z.enum(["entry", "intermediate", "expert"], {
    required_error: "Please select experience level.",
  }),
  budget: z.object({
    min: z.string().min(1, "Minimum budget is required"),
    max: z.string().min(1, "Maximum budget is required"),
  }),
  duration: z.string({
    required_error: "Please select project duration.",
  }),
  skills: z.array(z.string()).min(1, {
    message: "Please select at least one skill.",
  }),
  visibility: z.enum(["public", "invite-only", "private"], {
    required_error: "Please select job visibility.",
  }),
  screening: z.array(z.string()).optional(),
})

type FormValues = z.infer<typeof formSchema>

// Skill options
const skillOptions = [
  { id: "react", label: "React" },
  { id: "angular", label: "Angular" },
  { id: "vue", label: "Vue.js" },
  { id: "node", label: "Node.js" },
  { id: "express", label: "Express" },
  { id: "mongodb", label: "MongoDB" },
  { id: "postgresql", label: "PostgreSQL" },
  { id: "typescript", label: "TypeScript" },
  { id: "javascript", label: "JavaScript" },
  { id: "python", label: "Python" },
  { id: "django", label: "Django" },
  { id: "flask", label: "Flask" },
  { id: "ruby", label: "Ruby" },
  { id: "rails", label: "Ruby on Rails" },
  { id: "php", label: "PHP" },
  { id: "laravel", label: "Laravel" },
  { id: "aws", label: "AWS" },
  { id: "docker", label: "Docker" },
  { id: "kubernetes", label: "Kubernetes" },
  { id: "devops", label: "DevOps" },
  { id: "figma", label: "Figma" },
  { id: "sketch", label: "Sketch" },
  { id: "adobe-xd", label: "Adobe XD" },
  { id: "ui-design", label: "UI Design" },
  { id: "ux-design", label: "UX Design" },
]

// Screening question options
const screeningOptions = [
  { id: "years", label: "Years of experience in required skills" },
  { id: "portfolio", label: "Relevant portfolio links" },
  { id: "availability", label: "Availability for interview" },
  { id: "start-date", label: "Desired start date" },
  { id: "similar-projects", label: "Experience with similar projects" },
]

export default function PostJobPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Default form values
  const defaultValues: Partial<FormValues> = {
    type: "fixed",
    experience: "intermediate",
    skills: [],
    visibility: "public",
    screening: [],
  }
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })
  
  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)
    
    try {
      // Simulate API call to create a new job
      console.log("Job data:", data)
      
      // Show success message
      toast({
        title: "Job posted successfully!",
        description: "Your job has been published and is now visible to freelancers.",
      })
      
      // Redirect to jobs page after successful submission
      router.push("/dashboard/employer/jobs")
    } catch (error) {
      console.error("Error posting job:", error)
      toast({
        title: "Error posting job",
        description: "There was an error posting your job. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <DashboardHeader
          heading="Post a New Job"
          text="Create a detailed job posting to attract the right freelancers for your project."
        />
        <Button variant="outline" size="sm" className="ml-auto" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-7">
        {/* Main Form */}
        <div className="md:col-span-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>
                    Provide the core details about your job
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Job Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. Senior React Developer for E-commerce Project" 
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          A clear title will attract more relevant freelancers.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Job Category */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Category</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="web-development">Web Development</SelectItem>
                            <SelectItem value="mobile-development">Mobile Development</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="writing">Writing</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="data-science">Data Science</SelectItem>
                            <SelectItem value="admin-support">Admin Support</SelectItem>
                            <SelectItem value="customer-service">Customer Service</SelectItem>
                            <SelectItem value="sales">Sales</SelectItem>
                            <SelectItem value="accounting">Accounting</SelectItem>
                            <SelectItem value="legal">Legal</SelectItem>
                            <SelectItem value="engineering">Engineering</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose the most relevant category for your job.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Job Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the project in detail. Include responsibilities, deliverables, and requirements."
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Detailed descriptions help freelancers understand your project and propose more accurate solutions.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Tag className="mr-2 h-5 w-5" />
                    Skills & Experience
                  </CardTitle>
                  <CardDescription>
                    Define the expertise required for your project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Skills Required */}
                  <FormField
                    control={form.control}
                    name="skills"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Required Skills</FormLabel>
                          <FormDescription>
                            Select the skills needed for this job.
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {skillOptions.map((skill) => (
                            <FormField
                              key={skill.id}
                              control={form.control}
                              name="skills"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={skill.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(skill.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, skill.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== skill.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {skill.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Experience Level */}
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Experience Level</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="entry" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Entry Level (0-2 years of experience)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="intermediate" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Intermediate (3-5 years of experience)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="expert" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Expert (5+ years of experience)
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" />
                    Budget & Timeline
                  </CardTitle>
                  <CardDescription>
                    Define your budget and project timeline
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Job Type */}
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Job Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="fixed" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Fixed Price (Pay a fixed amount for the entire project)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="hourly" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Hourly Rate (Pay based on hours worked)
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Budget Range */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="budget.min"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Budget (₹)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="e.g. 10000" 
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="budget.max"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Budget (₹)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="e.g. 50000" 
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Project Duration */}
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Duration</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select project duration" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="less-than-1-week">Less than 1 week</SelectItem>
                            <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                            <SelectItem value="2-4-weeks">2-4 weeks</SelectItem>
                            <SelectItem value="1-3-months">1-3 months</SelectItem>
                            <SelectItem value="3-6-months">3-6 months</SelectItem>
                            <SelectItem value="more-than-6-months">More than 6 months</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Estimated time to complete the entire project.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Visibility & Screening
                  </CardTitle>
                  <CardDescription>
                    Control who can see and apply to your job
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Job Visibility */}
                  <FormField
                    control={form.control}
                    name="visibility"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Job Visibility</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="public" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Public (Visible to all freelancers)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="invite-only" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Invite-Only (Only visible to freelancers you invite)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="private" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Private (Hidden from search, accessible only via direct link)
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Screening Questions */}
                  <FormField
                    control={form.control}
                    name="screening"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Screening Questions</FormLabel>
                          <FormDescription>
                            Select additional questions freelancers must answer when applying.
                          </FormDescription>
                        </div>
                        <div className="space-y-2">
                          {screeningOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="screening"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={option.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value || [], option.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== option.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {option.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Posting..." : "Post Job"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        
        {/* Sidebar with Tips */}
        <div className="md:col-span-2">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="text-sm">Job Posting Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Write a clear title</h3>
                <p className="text-muted-foreground text-xs">
                  Be specific about the role, e.g., "React Developer for E-commerce Dashboard" rather than just "Developer Needed".
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Detailed description</h3>
                <p className="text-muted-foreground text-xs">
                  Include project context, specific requirements, deliverables, and any relevant background information.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Be realistic with budget</h3>
                <p className="text-muted-foreground text-xs">
                  Research market rates for the skills you need. Offering competitive compensation attracts better talent.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Add screening questions</h3>
                <p className="text-muted-foreground text-xs">
                  This helps filter candidates and gives you insights into their experience before interviews.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Check for clarity</h3>
                <p className="text-muted-foreground text-xs">
                  Review your posting to ensure it clearly communicates your needs to potential freelancers.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full text-xs" size="sm">
                <Info className="mr-2 h-4 w-4" />
                View posting guidelines
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}
