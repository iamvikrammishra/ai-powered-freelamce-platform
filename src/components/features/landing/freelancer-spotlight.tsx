"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import Link from "next/link"

export function FreelancerSpotlight() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState(0)

  const freelancers = [
    {
      id: 1,
      name: "Arjun Patel",
      title: "Full Stack Developer",
      avatar: "/indian-man-headshot.png",
      location: "Mumbai, India",
      rating: 4.9,
      reviews: 38,
      hourlyRate: "₹2,500/hr",
      skills: ["React", "Node.js", "MongoDB", "AWS"],
      bio: "Full stack developer with 7+ years of experience building scalable web applications for startups and enterprises.",
      portfolio: [
        { title: "E-commerce Platform", image: "/modern-ecommerce-website.png" },
        { title: "Task Management App", image: "/task-management-app-ui.png" },
      ],
    },
    {
      id: 2,
      name: "Priya Sharma",
      title: "UI/UX Designer",
      avatar: "/indian-woman-professional-headshot.png",
      location: "Bangalore, India",
      rating: 5.0,
      reviews: 42,
      hourlyRate: "₹2,200/hr",
      skills: ["UI Design", "UX Research", "Figma", "Adobe XD"],
      bio: "Award-winning UI/UX designer specializing in creating intuitive and beautiful digital experiences for mobile and web.",
      portfolio: [
        { title: "Banking App Redesign", image: "/task-management-app-ui.png" },
        { title: "Travel Platform", image: "/modern-ecommerce-website.png" },
      ],
    },
    {
      id: 3,
      name: "Vikram Singh",
      title: "Digital Marketing Specialist",
      avatar: "/indian-man-professional-headshot-2.png",
      location: "Delhi, India",
      rating: 4.8,
      reviews: 27,
      hourlyRate: "₹1,800/hr",
      skills: ["SEO", "Content Strategy", "Social Media", "Google Ads"],
      bio: "Results-driven digital marketer with expertise in growing online presence and driving conversions for businesses of all sizes.",
      portfolio: [
        { title: "E-commerce Growth Case Study", image: "/modern-ecommerce-website.png" },
        { title: "SaaS Marketing Campaign", image: "/task-management-app-ui.png" },
      ],
    },
  ]

  const nextFreelancer = () => {
    setActiveIndex((prev) => (prev + 1) % freelancers.length)
  }

  const prevFreelancer = () => {
    setActiveIndex((prev) => (prev - 1 + freelancers.length) % freelancers.length)
  }

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-purple-100/30 blur-3xl dark:bg-purple-900/10"></div>
        <div className="absolute bottom-0 left-20 h-60 w-60 rounded-full bg-blue-100/30 blur-3xl dark:bg-blue-900/10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Freelancer Spotlight</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Meet some of our most successful freelancers who are making a difference
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="lg:flex gap-8 items-center"
            >
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <Card className="overflow-hidden border-gray-200 dark:border-gray-700 shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative h-64 bg-gradient-to-r from-purple-500 to-indigo-600">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="h-20 w-20 rounded-full border-4 border-white overflow-hidden">
                            <img
                              src={freelancers[activeIndex].avatar || "/placeholder.svg"}
                              alt={freelancers[activeIndex].name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">{freelancers[activeIndex].name}</h3>
                            <p className="text-white/80">{freelancers[activeIndex].title}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(freelancers[activeIndex].rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm">
                            {freelancers[activeIndex].rating} ({freelancers[activeIndex].reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {freelancers[activeIndex].location}
                        </div>
                        <div className="text-purple-600 dark:text-purple-400 font-bold">
                          {freelancers[activeIndex].hourlyRate}
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-4">{freelancers[activeIndex].bio}</p>

                      <div className="mb-6">
                        <h4 className="font-medium mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {freelancers[activeIndex].skills.map((skill, i) => (
                            <Badge
                              key={i}
                              className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      >
                        <Link href={`/freelancers/${freelancers[activeIndex].id}`}>View Full Profile</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:w-1/2">
                <h3 className="text-xl font-bold mb-4">Recent Work</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {freelancers[activeIndex].portfolio.map((item, i) => (
                    <div
                      key={i}
                      className="group relative rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700"
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-4 w-full">
                          <div className="flex justify-between items-center">
                            <h4 className="text-white font-medium">{item.title}</h4>
                            <Button size="sm" variant="ghost" className="text-white p-0 h-auto">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Why Choose Me</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mr-2 mt-0.5">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">Fast turnaround time with exceptional quality</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mr-2 mt-0.5">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">Clear communication and regular updates</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mr-2 mt-0.5">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">Expertise in the latest industry standards</p>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 gap-2">
            <Button variant="outline" size="icon" className="rounded-full" onClick={prevFreelancer}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {freelancers.map((_, index) => (
              <Button
                key={index}
                variant={activeIndex === index ? "default" : "outline"}
                size="sm"
                className={`w-8 h-8 p-0 rounded-full ${
                  activeIndex === index ? "bg-purple-600 hover:bg-purple-700" : "border-gray-200 dark:border-gray-700"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {index + 1}
              </Button>
            ))}
            <Button variant="outline" size="icon" className="rounded-full" onClick={nextFreelancer}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
