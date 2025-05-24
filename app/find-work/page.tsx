"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, Briefcase, Target, CheckCircle, TrendingUp, Clock, Star, DollarSign, Globe, Zap, Users, ArrowRight } from "lucide-react"

export default function FindWorkPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showSkillPopup, setShowSkillPopup] = useState(false);
  
  // Featured jobs with attractive details
  const featuredJobs = [
    {
      id: 1,
      title: "Senior React Developer for E-commerce Platform",
      company: "ShopifyPlus Inc.",
      location: "Remote",
      salary: "$50-70/hr",
      skills: ["React", "Redux", "TypeScript", "Node.js"],
      postedDate: "2 days ago",
      description: "We're looking for an experienced React developer to help build our next-generation e-commerce platform with advanced features and optimized performance.",
      avatarUrl: "/placeholders/avatars/company-1.png"
    },
    {
      id: 2,
      title: "UI/UX Designer for Mobile Banking App",
      company: "FinTech Solutions",
      location: "Remote, Europe",
      salary: "$45-60/hr",
      skills: ["Figma", "UI Design", "Mobile UX", "Prototyping"],
      postedDate: "1 day ago",
      description: "Design intuitive and secure user experiences for our mobile banking application. Must have experience with financial applications and security considerations.",
      avatarUrl: "/placeholders/avatars/company-2.png"
    },
    {
      id: 3,
      title: "Full Stack Developer for SaaS Platform",
      company: "CloudServe Technologies",
      location: "Remote, Worldwide",
      salary: "$60-80/hr",
      skills: ["JavaScript", "Python", "AWS", "React", "Django"],
      postedDate: "3 days ago",
      description: "Join our team building a cutting-edge SaaS platform for enterprise customers. You'll work on both frontend and backend components with modern technologies.",
      avatarUrl: "/placeholders/avatars/company-3.png"
    }
  ];

  // Sample job categories with custom icons
  const categories = [
    { name: "Web Development", icon: <Briefcase className="h-5 w-5" />, count: 1250, color: "from-blue-500 to-indigo-600" },
    { name: "Mobile Development", icon: <Zap className="h-5 w-5" />, count: 820, color: "from-purple-500 to-pink-600" },
    { name: "UI/UX Design", icon: <Target className="h-5 w-5" />, count: 935, color: "from-amber-500 to-orange-600" },
    { name: "Content Writing", icon: <CheckCircle className="h-5 w-5" />, count: 1100, color: "from-emerald-500 to-teal-600" },
    { name: "Digital Marketing", icon: <TrendingUp className="h-5 w-5" />, count: 760, color: "from-rose-500 to-red-600" },
    { name: "Data Science", icon: <Globe className="h-5 w-5" />, count: 590, color: "from-cyan-500 to-blue-600" },
  ]
  
  const topSkills = [
    "React", "Node.js", "Python", "UI Design", "Content Writing", 
    "SEO", "React Native", "Flutter", "WordPress", "Figma", "JavaScript"
  ]
  
  const benefits = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Find your ideal projects",
      description: "Search and apply to thousands of projects that match your skills and interests.",
      animation: { x: [-20, 0], opacity: [0, 1] }
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Get hired quickly",
      description: "Our matching algorithm connects you with relevant clients faster.",
      animation: { y: [20, 0], opacity: [0, 1] }
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Grow your career",
      description: "Build your portfolio, reputation, and client network with each project.",
      animation: { scale: [0.8, 1], opacity: [0, 1] }
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Work on your terms",
      description: "Choose projects that fit your schedule and work preferences.",
      animation: { x: [20, 0], opacity: [0, 1] }
    }
  ]
  
  // Stats counter with animation
  const platformStats = [
    { label: "Active Jobs", value: "8,500+", icon: <Briefcase className="h-6 w-6 text-primary" /> },
    { label: "Freelancers", value: "25,000+", icon: <Users className="h-6 w-6 text-primary" /> },
    { label: "Success Rate", value: "95%", icon: <Star className="h-6 w-6 text-primary" /> },
    { label: "Avg. Hourly Rate", value: "$45/hr", icon: <DollarSign className="h-6 w-6 text-primary" /> }
  ]

  // Animated skill tags
  const AnimatedSkillTag = ({ skill, index }: { skill: string; index: number }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <Badge 
        className="cursor-pointer hover:bg-primary hover:text-white transition-colors mr-2 mb-2 px-3 py-1 text-sm"
        variant="secondary"
        onClick={() => setSearchQuery(skill)}
      >
        {skill}
      </Badge>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-black">
      {/* Hero Section with animated background */}
      <section className="relative pt-20 pb-16 px-4 md:px-6 lg:px-8 mx-auto overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 h-[400px] bg-gradient-to-b from-purple-50 via-blue-50 to-transparent opacity-60 dark:from-purple-950/20 dark:via-blue-950/10 dark:to-transparent"></div>
          <div className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-purple-100 opacity-20 blur-3xl filter dark:bg-purple-900 dark:opacity-10"></div>
          <div className="absolute -right-[10%] top-[10%] h-[500px] w-[500px] rounded-full bg-blue-100 opacity-20 blur-3xl filter dark:bg-blue-900 dark:opacity-10"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Find Your Next Freelance Project
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Browse thousands of remote jobs across multiple categories and start working with clients globally.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="flex gap-2 shadow-lg dark:shadow-gray-800/20 rounded-xl overflow-hidden p-2 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for jobs (e.g. Web Development, UI Design)" 
                  className="pl-10 h-12 rounded-lg border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button size="lg" className="h-12 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                Search
              </Button>
            </div>
            
            <div className="mt-5 flex flex-wrap justify-center">
              <span className="text-sm text-muted-foreground mr-3 mt-1">Popular:</span>
              {topSkills.slice(0, 5).map((skill, index) => (
                <AnimatedSkillTag key={index} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Platform Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-5xl mx-auto mt-16 mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg p-6 dark:shadow-gray-800/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {platformStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
      
      {/* Featured Jobs Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Featured Jobs</h2>
          <Button variant="outline" className="mt-4 md:mt-0">
            View all jobs <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              <Card className="h-full hover:shadow-md transition-all overflow-hidden border-0 shadow group">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-gray-100 dark:bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                        {job.avatarUrl ? (
                          <div className="relative w-10 h-10">
                            <Image src={job.avatarUrl} alt={job.company} fill className="object-cover" />
                          </div>
                        ) : (
                          <Briefcase className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 hover:text-green-800 dark:hover:bg-green-900/30 dark:hover:text-green-400">
                        {job.postedDate}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{job.title}</h3>
                    <div className="flex items-center text-muted-foreground text-sm mb-3">
                      <span className="font-medium">{job.company}</span>
                      <span className="mx-2 text-xs">•</span>
                      <span>{job.location}</span>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2">{job.description}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span className="font-medium">{job.salary}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="pt-4 border-t">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Job Categories */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Browse Jobs by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-all cursor-pointer overflow-hidden border-0 shadow group">
                <CardContent className="p-0">
                  <div className={`h-2 w-full bg-gradient-to-r ${category.color}`}></div>
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${category.color} text-white`}>
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="font-medium group-hover:text-primary transition-colors">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.count} jobs</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/50">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-3">Why Freelancers Choose GigIndia</h2>
          <p className="text-muted-foreground">
            Join thousands of successful freelancers who have found great projects and clients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ ...benefit.animation }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="text-center bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="mb-4 flex justify-center">
                <div className="p-3 bg-primary/10 rounded-full">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="text-lg font-medium mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-10 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to start finding work?</h2>
          <p className="mb-8 text-white/80 max-w-2xl mx-auto">
            Create your account today and start applying to the best freelance jobs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              asChild
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              <Link href="/auth/register?type=freelancer">Sign up as a Freelancer</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild
              className="border-white text-white hover:bg-white/10"
            >
              <Link href="/auth/login">Already have an account? Log in</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
