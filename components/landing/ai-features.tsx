"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Brain, Shield, TrendingUp, Users, Zap, ChevronRight, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export function AIFeatures() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: <Brain className="h-10 w-10 text-purple-500" />,
      title: "AI-Powered Matching",
      description:
        "Our advanced algorithms analyze your skills, experience, and preferences to match you with the perfect opportunities.",
      stats: "93% match accuracy",
      benefits: ["Personalized job recommendations", "Higher success rate", "Time-saving job search"],
      color: "from-purple-500 to-indigo-600",
    },
    {
      icon: <Shield className="h-10 w-10 text-blue-500" />,
      title: "Fraud Detection",
      description:
        "Advanced AI systems continuously monitor for suspicious activities, protecting both freelancers and clients.",
      stats: "99.7% fraud prevention rate",
      benefits: ["Secure payments", "Identity verification", "Dispute resolution"],
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-emerald-500" />,
      title: "Skill Verification",
      description:
        "Our AI evaluates your portfolio and work history to verify and showcase your skills to potential clients.",
      stats: "4.8× higher hiring rate",
      benefits: ["Credibility boost", "Competitive advantage", "Skill gap analysis"],
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: <Users className="h-10 w-10 text-amber-500" />,
      title: "Smart Mentorship",
      description: "Get paired with the perfect mentor based on your career goals, skill gaps, and learning style.",
      stats: "87% career growth",
      benefits: ["Personalized guidance", "Industry insights", "Network expansion"],
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: <Zap className="h-10 w-10 text-rose-500" />,
      title: "Predictive Analytics",
      description:
        "Gain insights into market trends, in-demand skills, and optimal pricing strategies for your services.",
      stats: "32% income increase",
      benefits: ["Market intelligence", "Pricing optimization", "Trend forecasting"],
      color: "from-rose-500 to-pink-600",
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
    <section ref={ref} className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')]"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        ></motion.div>
      </div>

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.2, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      ></motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="inline-block rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-1.5 text-sm text-white font-medium mb-4"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            AI-Powered Platform
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-200"
            variants={itemVariants}
            animate={{
              backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            Powered by AI, Built for Success
          </motion.h2>
          <motion.p className="text-lg text-gray-300 max-w-3xl mx-auto" variants={itemVariants}>
            Our cutting-edge AI technologies work behind the scenes to optimize your freelancing experience and maximize
            your success.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Feature selector - mobile accordion, desktop sidebar */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="bg-gray-900 rounded-xl p-1 mb-8 lg:mb-0"
              whileHover={{
                boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.1), 0 8px 10px -6px rgba(139, 92, 246, 0.1)",
              }}
            >
              {features.map((feature, index) => (
                <motion.button
                  key={index}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center gap-4 ${
                    activeFeature === index ? "bg-gray-800 shadow-lg" : "hover:bg-gray-800/50"
                  }`}
                  onClick={() => setActiveFeature(index)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <motion.div
                    className={`rounded-full p-2 ${
                      activeFeature === index ? `bg-gradient-to-r ${feature.color}` : "bg-gray-800"
                    }`}
                    whileHover={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <div>
                    <h3 className="font-medium text-white">{feature.title}</h3>
                    <p className="text-sm text-gray-400 hidden md:block">{feature.description.substring(0, 60)}...</p>
                  </div>
                  {activeFeature === index && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="ml-auto h-5 w-5 text-purple-400" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Feature details */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden border-0 bg-gradient-to-b from-gray-900 to-gray-950 shadow-xl">
                  <motion.div
                    className="p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex flex-col md:flex-row gap-8">
                      <motion.div className="flex-1" variants={containerVariants} initial="hidden" animate="visible">
                        <motion.div
                          className={`inline-flex rounded-lg p-3 bg-gradient-to-r ${features[activeFeature].color} bg-opacity-10 mb-4`}
                          variants={itemVariants}
                          whileHover={{ scale: 1.05, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        >
                          {features[activeFeature].icon}
                        </motion.div>
                        <motion.h3 className="text-2xl font-bold text-white mb-3" variants={itemVariants}>
                          {features[activeFeature].title}
                        </motion.h3>
                        <motion.p className="text-gray-300 mb-6" variants={itemVariants}>
                          {features[activeFeature].description}
                        </motion.p>

                        <motion.div className="space-y-3 mb-6" variants={containerVariants}>
                          {features[activeFeature].benefits.map((benefit, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center gap-2"
                              variants={itemVariants}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                            >
                              <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.5 }}>
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              </motion.div>
                              <span className="text-gray-200">{benefit}</span>
                            </motion.div>
                          ))}
                        </motion.div>

                        <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            className={`bg-gradient-to-r ${features[activeFeature].color} hover:opacity-90 transition-opacity group`}
                          >
                            Learn More
                            <motion.span className="ml-2 inline-block" initial={{ x: 0 }} whileHover={{ x: 3 }}>
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </motion.span>
                          </Button>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        className="md:w-1/3 flex flex-col justify-center"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <motion.div
                          className="bg-gray-800 rounded-xl p-6 text-center relative overflow-hidden"
                          variants={itemVariants}
                          whileHover={{
                            y: -5,
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                          }}
                        >
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-br ${features[activeFeature].color} opacity-10`}
                            animate={{
                              opacity: [0.05, 0.15, 0.05],
                              scale: [1, 1.05, 1],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "reverse",
                            }}
                          ></motion.div>
                          <div className="relative z-10">
                            <motion.p
                              className="text-sm text-gray-400 uppercase tracking-wider mb-2"
                              variants={itemVariants}
                            >
                              Success Rate
                            </motion.p>
                            <motion.p
                              className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${features[activeFeature].color}`}
                              variants={itemVariants}
                              animate={{
                                scale: [1, 1.1, 1],
                                backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                              }}
                              transition={{
                                scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 },
                                backgroundPosition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                              }}
                            >
                              {features[activeFeature].stats}
                            </motion.p>
                            <motion.div
                              className="w-16 h-1 mx-auto my-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600"
                              variants={itemVariants}
                              animate={{
                                width: ["30%", "70%", "30%"],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                              }}
                            ></motion.div>
                            <motion.p className="text-sm text-gray-300" variants={itemVariants}>
                              compared to industry average
                            </motion.p>
                          </div>
                        </motion.div>

                        <motion.div className="mt-6 text-center" variants={itemVariants}>
                          <Link
                            href="/case-studies"
                            className="text-purple-400 hover:text-purple-300 text-sm flex items-center justify-center group"
                          >
                            View success stories
                            <motion.span className="ml-1 inline-block" initial={{ x: 0 }} whileHover={{ x: 3 }}>
                              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </motion.span>
                          </Link>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="h-2 w-full bg-gradient-to-r from-purple-500 via-indigo-600 to-purple-500"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  ></motion.div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Button
            variant="outline"
            className="border-purple-700 text-purple-400 hover:bg-purple-950 hover:text-purple-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All AI Features
            <motion.span className="ml-2 inline-block" initial={{ x: 0 }} whileHover={{ x: 3 }}>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </motion.span>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
