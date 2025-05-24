"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { TalentSearch } from "@/components/features/talent/talent-search"
import { TalentFilters } from "@/components/features/talent/talent-filters"
import { TalentList } from "@/components/features/talent/talent-list"
import { FeaturedTalent } from "@/components/features/talent/featured-talent"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Briefcase, Star, CheckCircle, Clock, Users, ArrowRight, Building, Globe } from "lucide-react"

export default function FindTalentPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // Sample data for industry stats
  const industryStats = [
    { label: "Skilled Freelancers", value: "50,000+", icon: <Users className="h-5 w-5 text-primary" /> },
    { label: "Successful Projects", value: "150,000+", icon: <CheckCircle className="h-5 w-5 text-primary" /> },
    { label: "Client Satisfaction", value: "97%", icon: <Star className="h-5 w-5 text-primary" /> },
    { label: "Global Clients", value: "120+ Countries", icon: <Globe className="h-5 w-5 text-primary" /> }
  ];
  
  // Professional categories with counts
  const professionalCategories = [
    { name: "Web Developers", icon: <Briefcase />, count: 12500, color: "from-blue-500 to-indigo-600" },
    { name: "Designers", icon: <Star />, count: 8750, color: "from-pink-500 to-rose-600" },
    { name: "Marketing Experts", icon: <Building />, count: 6300, color: "from-amber-500 to-orange-600" },
    { name: "Content Writers", icon: <CheckCircle />, count: 9200, color: "from-emerald-500 to-teal-600" },
    { name: "Data Scientists", icon: <Globe />, count: 3800, color: "from-violet-500 to-purple-600" },
    { name: "Mobile Developers", icon: <Clock />, count: 5400, color: "from-cyan-500 to-blue-600" },
  ];
  
  // Why choose our platform benefits
  const platformBenefits = [
    {
      title: "Verified Professionals",
      description: "Every freelancer is thoroughly vetted and verified for skills and experience.",
      icon: <CheckCircle className="h-10 w-10 text-white" />,
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Secure Payments",
      description: "Our escrow system ensures you only pay for work you're satisfied with.",
      icon: <Building className="h-10 w-10 text-white" />,
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "Fast Hiring",
      description: "Find the perfect match for your project in as little as 24 hours.",
      icon: <Clock className="h-10 w-10 text-white" />,
      color: "from-amber-500 to-orange-600"
    },
    {
      title: "Global Talent Pool",
      description: "Access top professionals from around the world across all industries.",
      icon: <Globe className="h-10 w-10 text-white" />,
      color: "from-purple-500 to-pink-600"
    },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with animated elements */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-blue-50 via-indigo-50/50 to-transparent opacity-60 dark:from-blue-950/20 dark:via-indigo-950/10 dark:to-transparent"></div>
          <div className="absolute -right-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-blue-100 opacity-20 blur-3xl filter dark:bg-blue-900 dark:opacity-10"></div>
          <div className="absolute -left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-indigo-100 opacity-20 blur-3xl filter dark:bg-indigo-900 dark:opacity-10"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6">
              Find Exceptional Talent
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with skilled freelancers and professionals who can bring your projects to life
            </p>
          </motion.div>

          {/* Industry Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 md:mb-16 text-center"
          >
            {industryStats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-primary/10 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Search Section with enhanced design */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800 relative z-10"
          >
            <TalentSearch />
          </motion.div>
        </div>
      </section>

      {/* Professional Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Browse through our extensive pool of professionals specialized in various fields</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionalCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group cursor-pointer"
                onClick={() => setActiveCategory(category.name.toLowerCase())}
              >
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all h-full">
                  <div className={`h-2 w-full bg-gradient-to-r ${category.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${category.color} text-white`}>
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-lg group-hover:text-primary transition-colors">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.count.toLocaleString()} professionals</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="group-hover:text-primary group-hover:bg-primary/10 transition-colors"
                      >
                        Browse <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - Talent List and Filters */}
      <section className="py-12 px-4 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/30">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="sticky top-20">
                <TalentFilters />
              </div>
            </motion.div>

            {/* Talent List */}
            <motion.div 
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <TalentList />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose GigIndia</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Our platform offers a seamless experience to find and hire the perfect talent for your projects</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              >
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm h-full border border-gray-100 dark:border-gray-800 overflow-hidden group hover:shadow-md transition-all">
                  <div className={`flex justify-center items-center h-24 bg-gradient-to-r ${benefit.color}`}>
                    {benefit.icon}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Talent Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/30">
        <motion.div 
          className="container mx-auto max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <FeaturedTalent />
        </motion.div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-10 text-white text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to find the perfect talent?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">Join thousands of businesses that have found their ideal freelancers on our platform.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                asChild
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Link href="/auth/register?type=employer">
                  Post a Job Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="/auth/login">Sign in to Hire</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
