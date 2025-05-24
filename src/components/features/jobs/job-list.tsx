"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, MapPin, Clock, Briefcase, Heart } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useRouter } from "next/navigation"

export function JobList() {
  const router = useRouter()
  const [savedJobs, setSavedJobs] = useState<number[]>([])
  const [coverLetter, setCoverLetter] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Mock data for job listings
  const jobs = [
    {
      id: 1,
      title: "Full Stack Developer for E-commerce Platform",
      company: "TechRetail Solutions",
      location: "Remote (India)",
      budget: "₹50,000 - ₹70,000",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      matchScore: 95,
      posted: "2 days ago",
      description:
        "We're looking for a skilled full-stack developer to build a modern e-commerce platform with React frontend and Node.js backend. The ideal candidate has experience with payment gateways and responsive design.",
      type: "Fixed Price",
      duration: "2-3 months",
      longDescription: `
        <p>We're looking for a skilled full-stack developer to build a modern e-commerce platform for a growing retail business. The project involves creating both the customer-facing storefront and the admin dashboard.</p>
        
        <h4>Key Responsibilities:</h4>
        <ul>
          <li>Develop a responsive React frontend with modern UI components</li>
          <li>Build a robust Node.js backend with RESTful APIs</li>
          <li>Implement MongoDB database design and optimization</li>
          <li>Integrate payment gateways (Razorpay, Stripe)</li>
          <li>Set up authentication and authorization</li>
          <li>Implement product search and filtering functionality</li>
          <li>Create admin dashboard for inventory management</li>
        </ul>
        
        <h4>Requirements:</h4>
        <ul>
          <li>3+ years of experience with React and Node.js</li>
          <li>Strong understanding of MongoDB and Express</li>
          <li>Experience with payment gateway integration</li>
          <li>Knowledge of responsive design principles</li>
          <li>Ability to write clean, maintainable code</li>
          <li>Good communication skills</li>
        </ul>
        
        <p>This is a fixed-price project with an estimated duration of 2-3 months. The successful candidate will work closely with our product team and report directly to the CTO.</p>
      `,
      aboutCompany:
        "TechRetail Solutions is a technology company specializing in e-commerce solutions for small and medium-sized businesses in India. Founded in 2018, we've helped over 200 retailers establish their online presence.",
    },
    {
      id: 2,
      title: "UI/UX Designer for Mobile Banking App",
      company: "FinTech Innovations",
      location: "Bangalore, India",
      budget: "₹40,000 - ₹60,000",
      skills: ["Figma", "UI Design", "Mobile UX", "Prototyping"],
      matchScore: 88,
      posted: "1 day ago",
      description:
        "We need a talented UI/UX designer to create intuitive and engaging user experiences for our mobile banking application. You'll work closely with our product team to design user-friendly interfaces.",
      type: "Fixed Price",
      duration: "1-2 months",
      longDescription: `
        <p>We're seeking a talented UI/UX designer to create intuitive and engaging user experiences for our mobile banking application. You'll work closely with our product team to design user-friendly interfaces that make financial management simple and accessible.</p>
        
        <h4>Key Responsibilities:</h4>
        <ul>
          <li>Create wireframes, mockups, and high-fidelity prototypes</li>
          <li>Design a consistent and intuitive mobile interface</li>
          <li>Conduct user research and usability testing</li>
          <li>Develop a comprehensive UI component library</li>
          <li>Collaborate with developers for implementation</li>
          <li>Create user flows and journey maps</li>
          <li>Design for accessibility and inclusivity</li>
        </ul>
        
        <h4>Requirements:</h4>
        <ul>
          <li>3+ years of experience in UI/UX design for mobile applications</li>
          <li>Proficiency in Figma and prototyping tools</li>
          <li>Understanding of mobile design patterns and best practices</li>
          <li>Experience with financial or banking applications is a plus</li>
          <li>Strong portfolio demonstrating mobile design work</li>
          <li>Ability to explain design decisions and incorporate feedback</li>
        </ul>
        
        <p>This is a fixed-price project with an estimated duration of 1-2 months. The successful candidate will have the opportunity to shape the user experience of a product used by thousands of customers.</p>
      `,
      aboutCompany:
        "FinTech Innovations is a leading financial technology company based in Bangalore. We're focused on making banking more accessible and user-friendly through innovative mobile solutions. Our apps serve over 50,000 users across India.",
    },
    {
      id: 3,
      title: "Content Writer for Technology Blog",
      company: "TechMedia Group",
      location: "Remote (India)",
      budget: "₹25,000 - ₹35,000",
      skills: ["Content Writing", "SEO", "Technology", "Blogging"],
      matchScore: 82,
      posted: "5 hours ago",
      description:
        "Looking for a technology-focused content writer to create engaging blog posts, tutorials, and product reviews. The ideal candidate has a strong understanding of SEO and can explain complex technical concepts clearly.",
      type: "Hourly Rate",
      duration: "Ongoing",
      longDescription: `
        <p>We're looking for a technology-focused content writer to create engaging blog posts, tutorials, and product reviews for our growing tech blog. The ideal candidate has a strong understanding of SEO and can explain complex technical concepts in a clear, accessible way.</p>
        
        <h4>Key Responsibilities:</h4>
        <ul>
          <li>Write 8-10 high-quality articles per month (1000-2000 words each)</li>
          <li>Research trending topics in technology and software development</li>
          <li>Optimize content for search engines following SEO best practices</li>
          <li>Create compelling headlines and meta descriptions</li>
          <li>Develop product reviews and comparison articles</li>
          <li>Write step-by-step tutorials for software and applications</li>
          <li>Edit and proofread all content before submission</li>
        </ul>
        
        <h4>Requirements:</h4>
        <ul>
          <li>Proven experience writing technology-related content</li>
          <li>Strong understanding of SEO principles</li>
          <li>Familiarity with current tech trends and products</li>
          <li>Ability to explain complex concepts in simple terms</li>
          <li>Excellent grammar and writing skills</li>
          <li>Ability to meet deadlines consistently</li>
          <li>Portfolio of published technology articles</li>
        </ul>
        
        <p>This is an ongoing hourly contract with potential for long-term collaboration. The successful candidate will have the opportunity to grow with our publication and establish themselves as a technology thought leader.</p>
      `,
      aboutCompany:
        "TechMedia Group publishes several technology-focused blogs and online magazines reaching over 500,000 readers monthly. We cover the latest in consumer technology, software development, AI, and digital transformation.",
    },
    {
      id: 4,
      title: "Mobile App Developer (React Native)",
      company: "HealthTech Startup",
      location: "Delhi, India (Hybrid)",
      budget: "₹45,000 - ₹65,000",
      skills: ["React Native", "Firebase", "Redux", "API Integration"],
      matchScore: 79,
      posted: "3 days ago",
      description:
        "We're seeking a React Native developer to build a health tracking mobile application for both iOS and Android. Experience with health-related apps or fitness trackers is a plus.",
      type: "Fixed Price",
      duration: "3-4 months",
      longDescription: `
        <p>We're seeking a React Native developer to build a comprehensive health tracking mobile application for both iOS and Android platforms. The app will allow users to track various health metrics, set goals, and receive personalized recommendations.</p>
        
        <h4>Key Responsibilities:</h4>
        <ul>
          <li>Develop a cross-platform mobile app using React Native</li>
          <li>Implement user authentication and profile management</li>
          <li>Create intuitive interfaces for health data visualization</li>
          <li>Integrate with health device APIs (Apple Health, Google Fit)</li>
          <li>Implement offline functionality and data synchronization</li>
          <li>Set up push notifications for reminders and alerts</li>
          <li>Optimize app performance and responsiveness</li>
        </ul>
        
        <h4>Requirements:</h4>
        <ul>
          <li>3+ years of experience with React Native development</li>
          <li>Proficiency with Redux for state management</li>
          <li>Experience with Firebase or similar backend services</li>
          <li>Knowledge of RESTful API integration</li>
          <li>Understanding of mobile UI/UX best practices</li>
          <li>Experience with health-related apps is a plus</li>
          <li>Ability to write clean, testable code</li>
        </ul>
        
        <p>This is a fixed-price project with an estimated duration of 3-4 months. The position is hybrid, requiring occasional in-person meetings at our Delhi office.</p>
      `,
      aboutCompany:
        "HealthTech Startup is an innovative health technology company founded in 2021. We're focused on creating accessible digital solutions that help people monitor and improve their health outcomes. Our team consists of healthcare professionals and technology experts.",
    },
    {
      id: 5,
      title: "Digital Marketing Specialist",
      company: "E-learning Platform",
      location: "Mumbai, India",
      budget: "₹30,000 - ₹45,000",
      skills: ["Social Media Marketing", "SEO", "Content Strategy", "Analytics"],
      matchScore: 75,
      posted: "4 days ago",
      description:
        "We need a digital marketing specialist to help grow our e-learning platform. Responsibilities include managing social media campaigns, SEO optimization, and analyzing marketing performance.",
      type: "Hourly Rate",
      duration: "Ongoing",
      longDescription: `
        <p>We need a digital marketing specialist to help grow our e-learning platform. You'll be responsible for developing and implementing comprehensive digital marketing strategies to increase our user base and engagement.</p>
        
        <h4>Key Responsibilities:</h4>
        <ul>
          <li>Develop and manage social media marketing campaigns</li>
          <li>Implement SEO strategies to improve organic traffic</li>
          <li>Create and optimize content for different marketing channels</li>
          <li>Set up and manage Google Ads and social media advertising</li>
          <li>Analyze marketing performance and provide regular reports</li>
          <li>Conduct competitor analysis and market research</li>
          <li>Collaborate with content creators and designers</li>
        </ul>
        
        <h4>Requirements:</h4>
        <ul>
          <li>3+ years of experience in digital marketing</li>
          <li>Proven track record in growing online platforms</li>
          <li>Strong knowledge of SEO best practices</li>
          <li>Experience with social media marketing and advertising</li>
          <li>Proficiency with analytics tools (Google Analytics, etc.)</li>
          <li>Understanding of content marketing principles</li>
          <li>Experience in the education sector is a plus</li>
        </ul>
        
        <p>This is an ongoing hourly contract with the potential for full-time employment. You'll work directly with our marketing director and have significant input into our overall marketing strategy.</p>
      `,
      aboutCompany:
        "E-learning Platform is one of India's fastest-growing online education platforms, offering courses in technology, business, and creative skills. Founded in 2019, we now serve over 100,000 students across the country with a mission to make quality education accessible to all.",
    },
  ]

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const toggleSaveJob = (jobId: number) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId))
      toast({
        title: "Job removed from saved list",
        description: "The job has been removed from your saved jobs.",
      })
    } else {
      setSavedJobs([...savedJobs, jobId])
      toast({
        title: "Job saved",
        description: "The job has been added to your saved jobs.",
      })
    }
  }

  const handleApply = (jobId: number) => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setCoverLetter("")
      toast({
        title: "Application submitted",
        description: "Your job application has been submitted successfully.",
      })
    }, 1500)
  }

  const navigateToJobDetails = (jobId: number) => {
    try {
      router.push(`/dashboard/jobs/${jobId}`)
    } catch (err) {
      console.error("Navigation error:", err)
      toast({
        title: "Navigation error",
        description: "Could not navigate to job details. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                <div className="flex gap-2">
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-lg font-semibold text-red-800 mb-2">Error loading jobs</h2>
        <p className="text-red-700 mb-4">{error}</p>
        <Button onClick={() => setError(null)} variant="destructive">
          Try again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{jobs.length}</span> jobs
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select className="text-sm border rounded-md px-2 py-1 bg-transparent">
            <option>Relevance</option>
            <option>Newest</option>
            <option>Budget: High to Low</option>
            <option>Budget: Low to High</option>
          </select>
        </div>
      </div>

      {jobs.map((job) => (
        <Card key={job.id} className="hover:border-purple-200 dark:hover:border-purple-800 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <Button
                  variant="link"
                  className="p-0 h-auto text-xl font-medium hover:text-purple-600 hover:no-underline transition-colors text-left"
                  onClick={() => navigateToJobDetails(job.id)}
                >
                  {job.title}
                </Button>
                <div className="text-sm text-muted-foreground mt-1">{job.company}</div>
              </div>
              <div className="flex items-center gap-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full text-xs font-medium">
                <Sparkles className="h-3 w-3" />
                {job.matchScore}% Match
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{job.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>
                  {job.type} • {job.duration}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Posted {job.posted}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill, index) => (
                <Badge key={index} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="font-medium">Budget: {job.budget}</div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleSaveJob(job.id)}
                  className={
                    savedJobs.includes(job.id)
                      ? "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800"
                      : ""
                  }
                >
                  <Heart
                    className={`mr-2 h-4 w-4 ${savedJobs.includes(job.id) ? "fill-purple-600 text-purple-600" : ""}`}
                  />
                  {savedJobs.includes(job.id) ? "Saved" : "Save"}
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Apply Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>Apply for {job.title}</DialogTitle>
                      <DialogDescription>Submit your application to {job.company}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Cover Letter</h4>
                        <Textarea
                          placeholder="Introduce yourself and explain why you're a good fit for this role..."
                          className="min-h-[200px]"
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Pro tip: Personalize your application by mentioning specific skills and experiences relevant
                          to this job.
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700"
                        disabled={isSubmitting || !coverLetter.trim()}
                        onClick={() => handleApply(job.id)}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Job Details Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-xl overflow-auto">
          {selectedJob && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl">{selectedJob.title}</SheetTitle>
                <SheetDescription>
                  {selectedJob.company} • {selectedJob.location}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Budget: {selectedJob.budget}</div>
                  <div className="flex items-center gap-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full text-xs font-medium">
                    <Sparkles className="h-3 w-3" />
                    {selectedJob.matchScore}% Match
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedJob.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedJob.duration}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Job Description</h3>
                  <div className="text-sm" dangerouslySetInnerHTML={{ __html: selectedJob.longDescription }}></div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">About {selectedJob.company}</h3>
                  <p className="text-sm">{selectedJob.aboutCompany}</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => navigateToJobDetails(selectedJob.id)}
                  >
                    View Full Details
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => toggleSaveJob(selectedJob.id)}
                    className={
                      savedJobs.includes(selectedJob.id)
                        ? "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800"
                        : ""
                    }
                  >
                    <Heart
                      className={`mr-2 h-4 w-4 ${
                        savedJobs.includes(selectedJob.id) ? "fill-purple-600 text-purple-600" : ""
                      }`}
                    />
                    {savedJobs.includes(selectedJob.id) ? "Saved" : "Save Job"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
