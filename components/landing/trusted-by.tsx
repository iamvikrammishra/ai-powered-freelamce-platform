"use client"

import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { useInView } from "framer-motion"
import { Star, ChevronRight, Award, TrendingUp, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function TrustedBy() {
  const router = useRouter()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeCompany, setActiveCompany] = useState(0)
  const [autoplayPaused, setAutoplayPaused] = useState(false)
  const controls = useAnimation()

  const companies = [
    {
      name: "TechMahindra",
      logo: "/indian-tech-company-logo.png",
      quote: "GigIndia has transformed how we find specialized tech talent across the country.",
      color: "from-purple-600/90 to-indigo-600/90",
      lightColor: "from-purple-200 to-indigo-200",
      darkColor: "from-purple-900/40 to-indigo-900/40",
      stats: {
        freelancers: 250,
        projects: 48,
        satisfaction: 98,
      },
    },
    {
      name: "Paytm",
      logo: "/fintech-company-logo.png",
      quote: "The quality of fintech freelancers we've hired through this platform has been exceptional.",
      color: "from-blue-600/90 to-cyan-600/90",
      lightColor: "from-blue-200 to-cyan-200",
      darkColor: "from-blue-900/40 to-cyan-900/40",
      stats: {
        freelancers: 180,
        projects: 36,
        satisfaction: 96,
      },
    },
    {
      name: "Zomato",
      logo: "/tech-media-logo.png",
      quote: "We've reduced our hiring time by 60% while finding better talent for our digital initiatives.",
      color: "from-red-600/90 to-orange-600/90",
      lightColor: "from-red-200 to-orange-200",
      darkColor: "from-red-900/40 to-orange-900/40",
      stats: {
        freelancers: 210,
        projects: 42,
        satisfaction: 97,
      },
    },
    {
      name: "Practo",
      logo: "/health-tech-logo.png",
      quote: "The AI-powered matching has connected us with healthcare specialists we couldn't find elsewhere.",
      color: "from-green-600/90 to-emerald-600/90",
      lightColor: "from-green-200 to-emerald-200",
      darkColor: "from-green-900/40 to-emerald-900/40",
      stats: {
        freelancers: 150,
        projects: 32,
        satisfaction: 99,
      },
    },
    {
      name: "BYJU'S",
      logo: "/elearning-logo.png",
      quote: "Our educational content creation has scaled tremendously thanks to GigIndia's talent network.",
      color: "from-yellow-600/90 to-amber-600/90",
      lightColor: "from-yellow-200 to-amber-200",
      darkColor: "from-yellow-900/40 to-amber-900/40",
      stats: {
        freelancers: 320,
        projects: 64,
        satisfaction: 95,
      },
    },
  ]

  // Auto-rotate companies
  useEffect(() => {
    if (autoplayPaused) return

    const interval = setInterval(() => {
      setActiveCompany((prev) => (prev + 1) % companies.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [companies.length, autoplayPaused])

  // Animation when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const handleViewCaseStudy = (companyName) => {
    router.push(`/case-studies/${companyName.toLowerCase().replace(/\s+/g, "-")}`)
  }

  const handleViewAllClients = () => {
    router.push("/clients")
  }

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
      className="py-24 relative overflow-hidden bg-gradient-to-b from-[#050914] to-[#0a0f25] text-white"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
      </div>

      {/* Glowing border - subtle */}
      <motion.div
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-600/30 to-transparent"
        animate={{
          opacity: [0.2, 0.5, 0.2],
          backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      ></motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="inline-block mb-3 px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20"
            variants={itemVariants}
            whileHover={{ scale: 1.05, borderColor: "rgba(139, 92, 246, 0.4)" }}
          >
            <span className="text-sm font-medium text-purple-400">Industry Leaders Trust Us</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400"
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
            Powering India's Top Companies
          </motion.h2>

          <motion.p className="text-gray-400 mx-auto text-lg" variants={itemVariants}>
            Join the 500+ innovative companies that have transformed their talent acquisition through our AI-powered
            platform
          </motion.p>
        </motion.div>

        {/* Company showcase - centered card design */}
        <div className="max-w-6xl mx-auto mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCompany}
              className="relative overflow-hidden rounded-2xl shadow-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl shadow-2xl border border-white/10",
                  "bg-gradient-to-br from-gray-900 to-gray-950",
                )}
              >
                {/* Background gradient */}
                <div
                  className={cn("absolute inset-0 bg-gradient-to-br opacity-30", companies[activeCompany].darkColor)}
                ></div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                ></motion.div>
                <motion.div
                  className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                ></motion.div>

                {/* Company showcase card */}
                <div className="relative z-10 p-8 md:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    {/* Left side - Company info */}
                    <div className="md:col-span-7">
                      <div className="flex items-center mb-8">
                        <div className="w-20 h-20 mr-5 bg-gray-800 rounded-xl p-3 flex items-center justify-center shadow-lg border border-gray-700/50">
                          <Image
                            src={companies[activeCompany].logo || "/placeholder.svg"}
                            alt={companies[activeCompany].name}
                            width={80}
                            height={80}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{companies[activeCompany].name}</h3>
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            ))}
                          </div>
                          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300">
                            <Award className="w-3 h-3 mr-1" /> Verified Partner
                          </div>
                        </div>
                      </div>

                      <blockquote className="relative mb-8">
                        <div className="absolute -top-2 -left-2 text-4xl text-purple-400 opacity-30">"</div>
                        <p className="relative z-10 text-xl italic text-gray-300 pl-4">
                          {companies[activeCompany].quote}
                        </p>
                        <div className="absolute -bottom-6 -right-2 text-4xl text-purple-400 opacity-30">"</div>
                      </blockquote>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-3 text-center border border-gray-700/30">
                          <p className="text-2xl font-bold text-purple-400">
                            {companies[activeCompany].stats.freelancers}+
                          </p>
                          <p className="text-xs text-gray-400">Freelancers</p>
                        </div>
                        <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-3 text-center border border-gray-700/30">
                          <p className="text-2xl font-bold text-indigo-400">
                            {companies[activeCompany].stats.projects}
                          </p>
                          <p className="text-xs text-gray-400">Projects</p>
                        </div>
                        <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-3 text-center border border-gray-700/30">
                          <p className="text-2xl font-bold text-pink-400">
                            {companies[activeCompany].stats.satisfaction}%
                          </p>
                          <p className="text-xs text-gray-400">Satisfaction</p>
                        </div>
                      </div>
                    </div>

                    {/* Right side - Success story */}
                    <div className="md:col-span-5">
                      <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50 h-full">
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                          <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                          Success Story
                        </h4>

                        <div className="space-y-3 mb-6">
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-300">
                              Reduced hiring time by <span className="font-semibold">60%</span>
                            </p>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-300">
                              Improved talent quality by <span className="font-semibold">45%</span>
                            </p>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-300">
                              Saved <span className="font-semibold">₹12 lakhs</span> in recruitment costs
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {[...Array(4)].map((_, i) => (
                              <div
                                key={i}
                                className="w-8 h-8 rounded-full border-2 border-gray-800 overflow-hidden bg-gray-700"
                              >
                                <Image
                                  src={`/professional-indian-headshot.png`}
                                  alt="Team member"
                                  width={32}
                                  height={32}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                            <div className="w-8 h-8 rounded-full border-2 border-gray-800 bg-purple-600 flex items-center justify-center text-xs text-white font-medium">
                              +12
                            </div>
                          </div>

                          <button
                            className="text-xs font-medium text-purple-400 hover:text-purple-300 flex items-center group"
                            onClick={() => handleViewCaseStudy(companies[activeCompany].name)}
                          >
                            Read case study
                            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Company selection - centered and improved */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            {companies.map((company, index) => (
              <button
                key={index}
                className={cn(
                  "group relative flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300",
                  "bg-gray-800/30 backdrop-blur-sm hover:shadow-xl",
                  "border border-transparent",
                  index === activeCompany
                    ? "border-purple-500/50 shadow-lg shadow-purple-500/10"
                    : "hover:border-purple-500/30",
                )}
                onClick={() => {
                  setActiveCompany(index)
                  setAutoplayPaused(true)
                  // Resume autoplay after 10 seconds
                  setTimeout(() => setAutoplayPaused(false), 10000)
                }}
              >
                <div
                  className={cn(
                    "w-16 h-16 md:w-20 md:h-20 mb-2 rounded-lg flex items-center justify-center",
                    "bg-gradient-to-br p-0.5",
                    index === activeCompany ? `${companies[index].color}` : "from-gray-700 to-gray-800",
                    "group-hover:from-purple-500/70 group-hover:to-indigo-500/70",
                  )}
                >
                  <div className="w-full h-full bg-gray-900 rounded-md flex items-center justify-center p-2">
                    <Image
                      src={company.logo || "/placeholder.svg"}
                      alt={company.name}
                      width={80}
                      height={80}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>

                <span
                  className={cn(
                    "text-sm font-medium transition-colors",
                    index === activeCompany
                      ? "bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400"
                      : "text-gray-400 group-hover:text-purple-400",
                  )}
                >
                  {company.name}
                </span>

                {index === activeCompany && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 w-12 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                    layoutId="activeCompanyIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ x: "-50%" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* View all clients button - centered */}
        <div className="text-center">
          <Button
            variant="outline"
            className="bg-transparent border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 group"
            onClick={handleViewAllClients}
          >
            View All Client Success Stories
            <span className="ml-2 inline-block">
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </div>
      </div>
    </section>
  )
}
