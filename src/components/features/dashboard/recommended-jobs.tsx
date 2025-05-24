"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Heart } from "lucide-react"
import Link from "next/link"
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
import { useRouter } from "next/navigation"

export function RecommendedJobs() {
  const router = useRouter()
  const [savedJobs, setSavedJobs] = useState<number[]>([])
  const [coverLetter, setCoverLetter] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeJobId, setActiveJobId] = useState<number | null>(null)

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
    },
  ]

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
    router.push(`/dashboard/jobs/${jobId}`)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>AI-Recommended Jobs</CardTitle>
          <CardDescription>Personalized job matches based on your skills and preferences</CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/find-work">View All Jobs</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {jobs.map((job) => (
            <div key={job.id} className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-lg font-medium hover:text-purple-600 hover:no-underline transition-colors text-left"
                    onClick={() => navigateToJobDetails(job.id)}
                  >
                    {job.title}
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    {job.company} • {job.location}
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full text-xs font-medium">
                  <Sparkles className="h-3 w-3" />
                  {job.matchScore}% Match
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {job.skills.map((skill, index) => (
                  <Badge key={index} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Budget: {job.budget}</div>
                <div className="text-xs text-muted-foreground">Posted {job.posted}</div>
              </div>
              <div className="mt-4 flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => setActiveJobId(job.id)}
                    >
                      Apply Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>
                        Apply for {activeJobId && jobs.find((j) => j.id === activeJobId)?.title}
                      </DialogTitle>
                      <DialogDescription>
                        Submit your application to {activeJobId && jobs.find((j) => j.id === activeJobId)?.company}
                      </DialogDescription>
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
                        onClick={() => activeJobId && handleApply(activeJobId)}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

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
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
