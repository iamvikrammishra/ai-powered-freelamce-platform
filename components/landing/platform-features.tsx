"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Brain, Shield, Clock, Users, CreditCard, MessageSquare, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function PlatformFeatures() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Matching",
      description:
        "Our advanced algorithms match freelancers with the perfect projects based on skills, experience, and preferences.",
      gradientFrom: "rgb(147, 51, 234)",
      gradientTo: "rgb(79, 70, 229)",
      bgClass: "bg-gradient-to-r from-purple-600 to-indigo-600",
      textClass: "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600",
      image: "/ai-matching-purple.png",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Verified Skills",
      description:
        "AI-powered skill verification through portfolio analysis and specialized tests ensures quality talent.",
      gradientFrom: "rgb(79, 70, 229)",
      gradientTo: "rgb(37, 99, 235)",
      bgClass: "bg-gradient-to-r from-indigo-600 to-blue-600",
      textClass: "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600",
      image: "/blue-gradient-badges-certificates.png",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Real-time Tracking",
      description: "Monitor project progress, milestones, and deadlines with our intuitive real-time tracking system.",
      gradientFrom: "rgb(37, 99, 235)",
      gradientTo: "rgb(8, 145, 178)",
      bgClass: "bg-gradient-to-r from-blue-600 to-cyan-600",
      textClass: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600",
      image: "/project-dashboard-cyan.png",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Mentorship Matching",
      description: "Connect with industry experts for guidance and skill development through our mentorship program.",
      gradientFrom: "rgb(8, 145, 178)",
      gradientTo: "rgb(13, 148, 136)",
      bgClass: "bg-gradient-to-r from-cyan-600 to-teal-600",
      textClass: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600",
      image: "/placeholder.svg?height=400&width=600&query=Mentorship connection visualization with teal gradient",
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Secure Payments",
      description:
        "Our escrow-based payment system ensures secure transactions and fair compensation for completed work.",
      gradientFrom: "rgb(13, 148, 136)",
      gradientTo: "rgb(5, 150, 105)",
      bgClass: "bg-gradient-to-r from-teal-600 to-emerald-600",
      textClass: "text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600",
      image: "/placeholder.svg?height=400&width=600&query=Secure payment flow visualization with emerald gradient",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Seamless Communication",
      description: "Real-time chat and collaboration tools keep projects moving forward efficiently.",
      gradientFrom: "rgb(5, 150, 105)",
      gradientTo: "rgb(147, 51, 234)",
      bgClass: "bg-gradient-to-r from-emerald-600 to-purple-600",
      textClass: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-purple-600",
      image: "/placeholder.svg?height=400&width=600&query=Communication and collaboration tools with purple gradient",
    },
  ]

  // Stats data with explicit gradient classes
  const stats = [
    {
      label: "Active Users",
      value: "50,000+",
      gradientClass: "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600",
    },
    {
      label: "Projects Completed",
      value: "120,000+",
      gradientClass: "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600",
    },
    {
      label: "Success Rate",
      value: "94%",
      gradientClass: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600",
    },
    {
      label: "Client Satisfaction",
      value: "4.9/5",
      gradientClass: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600",
    },
  ]

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
    <section
      ref={ref}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-black"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.07]">
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="inline-block rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-1.5 text-sm text-white font-medium mb-4"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            Platform Features
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 dark:from-purple-400 dark:via-indigo-400 dark:to-purple-400"
            variants={itemVariants}
          >
            Powered by AI, Built for Success
          </motion.h2>
          <motion.p className="text-lg text-gray-700 dark:text-gray-300" variants={itemVariants}>
            Our platform combines cutting-edge technology with user-friendly design to create the most effective
            freelancing experience.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Feature tabs */}
          <motion.div
            className="lg:col-span-5 lg:sticky lg:top-24 self-start"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {features.map((feature, index) => (
                  <motion.button
                    key={index}
                    className={`w-full text-left p-5 transition-all duration-300 flex items-start gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                      activeFeature === index ? "bg-gray-50 dark:bg-gray-800" : ""
                    }`}
                    onClick={() => setActiveFeature(index)}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <motion.div
                      className={`rounded-xl p-3 ${feature.bgClass} text-white shrink-0 mt-1`}
                      whileHover={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <div>
                      <h3
                        className={`font-semibold text-lg mb-2 ${
                          activeFeature === index ? feature.textClass : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="p-5 bg-gray-50 dark:bg-gray-800/50">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white group">
                  Explore All Features
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Feature visualization */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                <motion.div
                  className="absolute inset-0 opacity-30 dark:opacity-50"
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, ${features[activeFeature].gradientFrom}, ${features[activeFeature].gradientTo})`,
                  }}
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                ></motion.div>

                <Image
                  src={features[activeFeature].image || "/placeholder.svg"}
                  alt={features[activeFeature].title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-gray-900/80 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                ></motion.div>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      className={`rounded-full p-2 ${features[activeFeature].bgClass} text-white`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle className="h-5 w-5" />
                    </motion.div>
                    <h3 className={features[activeFeature].textClass}>{features[activeFeature].title}</h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((item) => (
                      <motion.div
                        key={item}
                        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-sm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + item * 0.1 }}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      >
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          {item === 1 ? "Success Rate" : item === 2 ? "Time Saved" : "User Satisfaction"}
                        </div>
                        <div className={features[activeFeature].textClass}>
                          {item === 1 ? "94%" : item === 2 ? "3.5x" : "4.9/5"}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-3">
                  {["Fast", "Reliable", "Secure", "Intuitive", "AI-Powered"].map((tag, i) => (
                    <motion.span
                      key={i}
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <Link
                    href="#"
                    className={`text-sm font-medium ${features[activeFeature].textClass} flex items-center gap-1 group`}
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 overflow-hidden"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                      >
                        <Image
                          src={`/placeholder.svg?height=32&width=32&query=professional headshot ${i}`}
                          alt="User"
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                    <motion.div
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-xs font-medium text-white"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 }}
                    >
                      +99
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom stats */}
        <motion.div
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 text-center"
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <motion.div
                className={stat.gradientClass}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <span className="text-3xl md:text-4xl font-bold">{stat.value}</span>
              </motion.div>
              <div className="text-gray-600 dark:text-gray-400 font-medium mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
