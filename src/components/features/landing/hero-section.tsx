"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "UI/UX Designer",
    text: "Found 3 high-paying clients in my first week!",
    avatar: "/indian-woman-professional-headshot.png",
    rating: 5,
  },
  {
    name: "Rahul Patel",
    role: "Full Stack Developer",
    text: "GigIndia's AI matched me with perfect projects.",
    avatar: "/indian-man-headshot.png",
    rating: 5,
  },
  {
    name: "Ananya Desai",
    role: "Content Strategist",
    text: "Doubled my freelance income in just 2 months.",
    avatar: "/indian-woman-headshot.png",
    rating: 5,
  },
]

const skills = [
  "Web Development",
  "UI/UX Design",
  "Content Writing",
  "Digital Marketing",
  "Mobile Development",
  "AI & ML",
]

export function HeroSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  const textOptions = ["Freelancers", "Opportunities", "Success"]

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Text typing animation
  useEffect(() => {
    const targetText = textOptions[currentTextIndex]
    let currentIndex = 0
    let direction = "typing" // 'typing' or 'deleting'

    const typeInterval = setInterval(
      () => {
        if (direction === "typing") {
          if (currentIndex <= targetText.length) {
            setTypedText(targetText.substring(0, currentIndex))
            currentIndex++
          } else {
            direction = "waiting"
            setTimeout(() => {
              direction = "deleting"
            }, 2000)
          }
        } else if (direction === "deleting") {
          if (currentIndex > 0) {
            setTypedText(targetText.substring(0, currentIndex - 1))
            currentIndex--
          } else {
            direction = "typing"
            setCurrentTextIndex((prev) => (prev + 1) % textOptions.length)
          }
        }
      },
      direction === "typing" ? 100 : 50,
    )

    return () => clearInterval(typeInterval)
  }, [currentTextIndex])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <section ref={heroRef} className="relative w-full overflow-hidden bg-white dark:bg-gray-950 py-12 sm:py-16 md:py-24">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white/80 to-indigo-50/50 dark:from-purple-950/30 dark:via-gray-950/80 dark:to-indigo-950/30"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[url('/abstract-purple-pattern.png')] bg-repeat opacity-[0.02] dark:opacity-[0.03]"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            className="flex flex-col space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Badge
                variant="outline"
                className="px-4 py-1.5 text-sm bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-purple-200 dark:border-purple-900 text-purple-800 dark:text-purple-300 rounded-full font-medium shadow-sm"
              >
                <span className="mr-1.5 inline-flex h-2 w-2 rounded-full bg-purple-600 animate-pulse"></span>
                India's #1 AI-Powered Freelancing Platform
              </Badge>
            </motion.div>

            <div className="space-y-6">
              <motion.h1
                className="text-3xl xs:text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none text-gray-900 dark:text-white"
                variants={itemVariants}
              >
                Find Work That <br className="hidden xs:inline" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 dark:from-purple-400 dark:via-indigo-400 dark:to-purple-400">
                  Matches Your Skills
                </span>
              </motion.h1>

              <motion.p
                className="max-w-[600px] text-sm xs:text-base text-gray-600 md:text-xl dark:text-gray-300 leading-relaxed"
                variants={itemVariants}
              >
                Join India's premier AI-powered freelancing platform that connects your expertise with perfect projects,
                verifies your skills, and helps you earn more.
              </motion.p>
            </div>

            <motion.div className="flex flex-col xs:flex-row gap-3 xs:gap-4 mt-2" variants={itemVariants}>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 rounded-lg px-4 sm:px-8 py-2 text-sm sm:text-base shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 group"
              >
                <Link href="/auth/register?type=freelancer">
                  Join as Freelancer{" "}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-lg border-2 border-indigo-200 dark:border-indigo-800 px-4 sm:px-8 py-2 text-sm sm:text-base hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-all duration-300"
              >
                <Link href="/auth/register?type=employer">Hire Talent</Link>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-3 sm:pt-4">
              <p className="text-xs xs:text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
                Trusted by 10,000+ freelancers across India
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-2 xs:px-3 py-1 rounded-full text-xs font-medium bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 cursor-pointer shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Hero image section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/freelancer-modern-office.png"
                  alt="Freelancers collaborating"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              </div>

              {/* Testimonial overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <motion.div
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-purple-100 dark:border-purple-900 flex-shrink-0">
                      <Image
                        src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                        alt={testimonials[currentTestimonial].name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {testimonials[currentTestimonial].name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {testimonials[currentTestimonial].role}
                          </p>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                          ))}
                        </div>
                      </div>
                      <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
                        "{testimonials[currentTestimonial].text}"
                      </p>
                      <div className="mt-2 flex items-center text-sm text-indigo-600 dark:text-indigo-400">
                        <CheckCircle className="h-4 w-4 mr-1" /> Verified Freelancer
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Skill tags */}
              <motion.div
                className="absolute top-4 right-4 flex flex-wrap gap-2 justify-end max-w-[60%]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {skills.slice(0, 3).map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>

              {/* Project card */}
              <motion.div
                className="absolute -bottom-6 -right-6 max-w-[200px] bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                      <span className="h-2 w-2 rounded-full bg-purple-600 dark:bg-purple-400 animate-pulse"></span>
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">New Project</span>
                  </div>
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400">₹45K</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">E-commerce website redesign needed</p>
              </motion.div>
            </div>

            {/* Subtle decorative elements */}
            <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-purple-300/10 to-indigo-300/10 dark:from-purple-900/10 dark:to-indigo-900/10 blur-2xl"></div>
            <div className="absolute -z-10 -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-br from-blue-300/10 to-indigo-300/10 dark:from-blue-900/10 dark:to-indigo-900/10 blur-2xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
