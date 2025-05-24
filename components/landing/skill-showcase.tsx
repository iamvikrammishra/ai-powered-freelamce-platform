"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function SkillShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Development", "Design", "Marketing", "Writing", "Business"]

  const skills = [
    { name: "React.js", category: "Development", count: 1245, trending: true },
    { name: "Node.js", category: "Development", count: 982, trending: true },
    { name: "UI/UX Design", category: "Design", count: 876, trending: true },
    { name: "Content Writing", category: "Writing", count: 765, trending: false },
    { name: "Digital Marketing", category: "Marketing", count: 654, trending: true },
    { name: "Python", category: "Development", count: 543, trending: false },
    { name: "Graphic Design", category: "Design", count: 432, trending: false },
    { name: "SEO", category: "Marketing", count: 321, trending: false },
    { name: "Data Analysis", category: "Business", count: 298, trending: true },
    { name: "WordPress", category: "Development", count: 276, trending: false },
    { name: "Social Media", category: "Marketing", count: 265, trending: false },
    { name: "Copywriting", category: "Writing", count: 254, trending: true },
    { name: "Figma", category: "Design", count: 243, trending: true },
    { name: "JavaScript", category: "Development", count: 232, trending: false },
    { name: "Business Strategy", category: "Business", count: 221, trending: false },
    { name: "Mobile Development", category: "Development", count: 210, trending: true },
    { name: "Video Editing", category: "Design", count: 198, trending: false },
    { name: "Technical Writing", category: "Writing", count: 187, trending: false },
  ]

  const filteredSkills = skills
    .filter(
      (skill) =>
        (selectedCategory === "All" || skill.category === selectedCategory) &&
        (searchTerm === "" || skill.name.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    .sort((a, b) => b.count - a.count)

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-purple-100/50 blur-3xl dark:bg-purple-900/20"></div>
        <div className="absolute bottom-40 right-20 h-60 w-60 rounded-full bg-blue-100/50 blur-3xl dark:bg-blue-900/20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore In-Demand Skills</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the most sought-after skills by employers across India and find your perfect match
          </p>
        </motion.div>

        <motion.div
          className="mb-8 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search skills..."
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`rounded-full ${
                selectedCategory === category
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "border-gray-200 dark:border-gray-700"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              className="group"
            >
              <Badge
                variant="outline"
                className={`
                  px-4 py-2 text-sm font-medium rounded-full cursor-pointer
                  border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500
                  ${skill.trending ? "bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20" : ""}
                  transition-all duration-300 hover:shadow-md hover:-translate-y-1
                `}
              >
                {skill.name}
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  {skill.count}
                </span>
                {skill.trending && (
                  <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    Trending
                  </span>
                )}
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            variant="outline"
            className="rounded-full border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/30"
          >
            View All Skills
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
