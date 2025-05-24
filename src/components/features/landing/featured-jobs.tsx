"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Clock, IndianRupee, Star } from "lucide-react"
import Link from "next/link"

export function FeaturedJobs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const jobs = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "TechMahindra",
      logo: "/indian-tech-company-logo.png",
      location: "Bangalore (Remote)",
      type: "Contract",
      duration: "3 months",
      rate: "₹8,000-12,000/day",
      skills: ["React", "TypeScript", "Node.js"],
      matchScore: 95,
      posted: "2 days ago",
      applicants: 18,
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "Paytm",
      logo: "/fintech-company-logo.png",
      location: "Delhi NCR (Hybrid)",
      type: "Full-time",
      duration: "Ongoing",
      rate: "₹15-20 LPA",
      skills: ["Figma", "UI Design", "User Research"],
      matchScore: 88,
      posted: "1 week ago",
      applicants: 42,
    },
    {
      id: 3,
      title: "Content Marketing Specialist",
      company: "Zomato",
      logo: "/tech-media-logo.png",
      location: "Mumbai (Remote)",
      type: "Part-time",
      duration: "6 months",
      rate: "₹50,000-70,000/month",
      skills: ["Content Strategy", "SEO", "Social Media"],
      matchScore: 92,
      posted: "3 days ago",
      applicants: 24,
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-0 h-80 w-80 rounded-full bg-purple-100/30 blur-3xl dark:bg-purple-900/10"></div>
        <div className="absolute bottom-0 left-20 h-60 w-60 rounded-full bg-blue-100/30 blur-3xl dark:bg-blue-900/10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Opportunities</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              Discover top projects from leading Indian companies looking for talent like you
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/30"
          >
            <Link href="/dashboard/find-work">
              Browse All Jobs <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function JobCard({ job, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-200 dark:border-gray-700">
        <CardContent className="p-0">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 mr-4 flex-shrink-0">
                  <img
                    src={job.logo || "/placeholder.svg"}
                    alt={job.company}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{job.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-full px-3 py-1 text-sm font-medium text-purple-700 dark:text-purple-300 flex items-center">
                <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                {job.matchScore}%
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                {job.location}
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <Clock className="h-4 w-4 mr-2" />
                {job.type} · {job.duration}
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <IndianRupee className="h-4 w-4 mr-2" />
                {job.rate}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill, i) => (
                <Badge key={i} variant="outline" className="bg-gray-50 dark:bg-gray-800">
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Posted {job.posted}</span>
              <span>{job.applicants} applicants</span>
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-800/50">
            <Button
              asChild
              className="w-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
            >
              <Link href={`/dashboard/jobs/${job.id}`}>View Details</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
