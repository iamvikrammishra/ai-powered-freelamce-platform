"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Brain, Shield, Zap, Users, CreditCard, MessageSquare } from "lucide-react"

export function FeatureSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: <Brain className="h-10 w-10 text-purple-600 dark:text-purple-400" />,
      title: "AI-Powered Matching",
      description:
        "Our advanced algorithms match freelancers with the perfect projects based on skills, experience, and preferences.",
    },
    {
      icon: <Shield className="h-10 w-10 text-purple-600 dark:text-purple-400" />,
      title: "Verified Skills",
      description:
        "AI-powered skill verification through portfolio analysis and specialized tests ensures quality talent.",
    },
    {
      icon: <Zap className="h-10 w-10 text-purple-600 dark:text-purple-400" />,
      title: "Real-time Tracking",
      description: "Monitor project progress, milestones, and deadlines with our intuitive real-time tracking system.",
    },
    {
      icon: <Users className="h-10 w-10 text-purple-600 dark:text-purple-400" />,
      title: "Mentorship Matching",
      description: "Connect with industry experts for guidance and skill development through our mentorship program.",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-purple-600 dark:text-purple-400" />,
      title: "Secure Payments",
      description:
        "Our escrow-based payment system ensures secure transactions and fair compensation for completed work.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-purple-600 dark:text-purple-400" />,
      title: "Seamless Communication",
      description: "Real-time chat and collaboration tools keep projects moving forward efficiently.",
    },
  ]

  return (
    <section ref={ref} className="py-16 sm:py-20 md:py-24 bg-white dark:bg-gray-950 relative overflow-hidden" id="features">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-0 h-80 w-80 rounded-full bg-purple-100/30 blur-3xl dark:bg-purple-900/10"></div>
        <div className="absolute bottom-0 right-20 h-60 w-60 rounded-full bg-blue-100/30 blur-3xl dark:bg-blue-900/10"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-xs sm:text-sm dark:bg-purple-900 text-purple-800 dark:text-purple-200 mb-3 sm:mb-4 shadow-sm">
            Platform Features
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-700 dark:from-purple-400 dark:to-indigo-400">
            Powered by AI, Built for Success
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with user-friendly design to create the most effective
            freelancing experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 md:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white dark:bg-gray-900 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg inline-block mb-4 group-hover:bg-purple-100 dark:group-hover:bg-purple-800/40 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
