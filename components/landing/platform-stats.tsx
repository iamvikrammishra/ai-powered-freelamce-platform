"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Briefcase, Award, TrendingUp } from "lucide-react"

export function PlatformStats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const stats = [
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      value: 10000,
      label: "Freelancers",
      suffix: "+",
    },
    {
      icon: <Briefcase className="h-8 w-8 text-indigo-600" />,
      value: 5000,
      label: "Projects Completed",
      suffix: "+",
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      value: 95,
      label: "Success Rate",
      suffix: "%",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-pink-600" />,
      value: 250,
      label: "Million INR Paid",
      suffix: "+",
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-100/30 to-blue-100/30 dark:from-purple-900/10 dark:to-blue-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-700 dark:from-purple-400 dark:to-indigo-400"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            India's Fastest Growing Freelance Platform
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join thousands of freelancers and businesses transforming how work gets done
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({ stat, index, isInView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = stat.value
      const duration = 2000
      const increment = end / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start > end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isInView, stat.value])

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-full mb-4">{stat.icon}</div>
      <h3 className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center">
        <span>{count}</span>
        <span className="text-purple-600 dark:text-purple-400">{stat.suffix}</span>
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
    </motion.div>
  )
}
