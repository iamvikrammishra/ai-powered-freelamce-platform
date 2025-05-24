"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Sign up and create your profile highlighting your skills, experience, and portfolio.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      number: "02",
      title: "Get Verified",
      description: "Complete skill assessments to verify your expertise and stand out to potential clients.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      number: "03",
      title: "Find Opportunities",
      description: "Browse AI-matched projects or receive personalized job recommendations.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "04",
      title: "Collaborate & Earn",
      description: "Work with clients, deliver quality results, and receive secure payments.",
      color: "from-cyan-500 to-teal-500",
    },
  ]

  return (
    <section ref={ref} className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-0 h-80 w-80 rounded-full bg-purple-100/30 blur-3xl dark:bg-purple-900/10"></div>
        <div className="absolute bottom-0 left-20 h-60 w-60 rounded-full bg-blue-100/30 blur-3xl dark:bg-blue-900/10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm dark:bg-purple-900 text-purple-800 dark:text-purple-200 mb-4">
            How It Works
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Powerful, Effective</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our AI-powered platform makes it easy to find the perfect match for your project or find your next gig.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-teal-500 hidden md:block"></div>

          <div className="space-y-16 md:space-y-0 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`md:flex items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} mb-16`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="md:w-1/2 flex md:justify-center">
                  <div className={`relative ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-xl z-10 relative`}
                    >
                      {step.number}
                    </div>
                    <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full blur-lg opacity-50"></div>
                  </div>
                </div>

                <div
                  className={`md:w-1/2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}
                >
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Join thousands of freelancers and businesses already using our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            >
              <Link href="/auth/register?type=freelancer">
                Join as Freelancer <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/30"
            >
              <Link href="/auth/register?type=employer">Hire Talent</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
