"use client"

import { useState } from "react"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowRight, BriefcaseIcon, SearchIcon, UserIcon, 
  Star, Settings, CheckCircle, Mail, Award, Clock, 
  DollarSign, PieChart, BookOpen, Users, ChevronRight,
  Sparkles, BadgeCheck, LightbulbIcon
} from "lucide-react"

type WelcomeModalProps = {
  isOpen: boolean
  onClose: () => void
  userType?: 'freelancer' | 'employer'
  userName?: string
}

export function WelcomeModal({ isOpen, onClose, userType = 'freelancer', userName = '' }: WelcomeModalProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [showTutorial, setShowTutorial] = useState(false)
  
  // Industry-standard steps for freelancers
  const freelancerSteps = [
    {
      title: "Welcome to GigIndia!",
      description: "Your journey to freelance success starts here. Let's get you set up for success.",
      icon: <Star className="h-16 w-16 text-primary" />,
      action: () => {}
    },
    {
      title: "Complete Your Profile",
      description: "Stand out to clients by adding your skills, experience, and a professional photo.",
      icon: <UserIcon className="h-16 w-16 text-primary" />,
      action: () => router.push("/dashboard/profile"),
      ctaText: "Complete Profile"
    },
    {
      title: "Find Great Opportunities",
      description: "Browse thousands of jobs that match your skills and interests.",
      icon: <SearchIcon className="h-16 w-16 text-primary" />,
      action: () => router.push("/dashboard/find-jobs"),
      ctaText: "Browse Jobs"
    },
    {
      title: "Set Your Preferences",
      description: "Configure your job alerts, payment methods, and notification settings.",
      icon: <Settings className="h-16 w-16 text-primary" />,
      action: () => router.push("/dashboard/settings"),
      ctaText: "Settings"
    }
  ]

  // Industry-standard steps for employers
  const employerSteps = [
    {
      title: "Welcome to GigIndia!",
      description: "We're excited to help you find the perfect talent for your projects.",
      icon: <Star className="h-16 w-16 text-primary" />,
      action: () => {}
    },
    {
      title: "Post Your First Job",
      description: "Create a detailed job posting to attract the best freelancers for your project.",
      icon: <BriefcaseIcon className="h-16 w-16 text-primary" />,
      action: () => router.push("/dashboard/post-job"),
      ctaText: "Post a Job"
    },
    {
      title: "Browse Top Talent",
      description: "Explore our pool of skilled freelancers and filter by skills, ratings, and more.",
      icon: <SearchIcon className="h-16 w-16 text-primary" />,
      action: () => router.push("/dashboard/freelancers"),
      ctaText: "Find Talent"
    },
    {
      title: "Set Up Your Company",
      description: "Add your company details, payment methods, and team members.",
      icon: <Users className="h-16 w-16 text-primary" />,
      action: () => router.push("/dashboard/company-settings"),
      ctaText: "Complete Setup"
    }
  ]
  
  // Dashboard highlights to show in the tutorial
  const dashboardFeatures = userType === 'freelancer' ? [
    {
      title: "Job Recommendations",
      description: "Personalized job matches based on your skills and preferences",
      icon: <LightbulbIcon className="h-10 w-10 text-amber-500" />
    },
    {
      title: "Inbox",
      description: "Messages from clients and job notifications",
      icon: <Mail className="h-10 w-10 text-blue-500" />
    },
    {
      title: "Earnings",
      description: "Track your income, invoices, and payment history",
      icon: <DollarSign className="h-10 w-10 text-green-500" />
    },
    {
      title: "Skill Tests",
      description: "Verify your skills with certification tests",
      icon: <Award className="h-10 w-10 text-purple-500" />
    }
  ] : [
    {
      title: "Applicants",
      description: "Review candidates who have applied to your jobs",
      icon: <Users className="h-10 w-10 text-blue-500" />
    },
    {
      title: "Contracts",
      description: "Manage active contracts and payments",
      icon: <CheckCircle className="h-10 w-10 text-green-500" />
    },
    {
      title: "Analytics",
      description: "Track job performance and hiring metrics",
      icon: <PieChart className="h-10 w-10 text-purple-500" />
    },
    {
      title: "Resources",
      description: "Hiring guides and best practices",
      icon: <BookOpen className="h-10 w-10 text-amber-500" />
    }
  ]
  
  // Select the appropriate steps based on user type
  const steps = userType === 'employer' ? employerSteps : freelancerSteps
  
  // Handle "Next" button click
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1)
    } else {
      if (!showTutorial) {
        setShowTutorial(true)
      } else {
        // We're done with the tutorial, close the modal and redirect
        onClose()
        router.push(userType === 'employer' ? '/dashboard/employer' : '/dashboard')
      }
    }
  }
  
  // Handle action button click
  const handleActionButton = () => {
    const currentAction = steps[currentStep].action
    onClose()
    currentAction()
  }
  
  // Handle skip button click
  const handleSkip = () => {
    onClose()
    router.push(userType === 'employer' ? '/dashboard/employer' : '/dashboard')
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        {!showTutorial ? (
          <>
            <DialogHeader>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <DialogTitle className="text-2xl font-bold">
                  {steps[currentStep].title}
                </DialogTitle>
              </motion.div>
            </DialogHeader>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center p-6 text-center"
              >
                <div className="mb-6">
                  {steps[currentStep].icon}
                </div>
                
                <DialogDescription className="text-lg mb-8">
                  {steps[currentStep].description}
                </DialogDescription>
                
                {steps[currentStep].ctaText && (
                  <Button 
                    onClick={handleActionButton}
                    variant="outline" 
                    className="mb-6 border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    {steps[currentStep].ctaText}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </motion.div>
            </AnimatePresence>
            
            <div className="mt-2 mb-6">
              <Progress 
                value={(currentStep / (steps.length - 1)) * 100} 
                className="h-2 w-full"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Getting started</span>
                <span>Complete</span>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="ghost" onClick={handleSkip} className="text-gray-500">
                Skip for now
              </Button>
              <Button 
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                {currentStep < steps.length - 1 ? 'Continue' : 'Go to Dashboard'} 
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          /* Dashboard Tutorial View */
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Explore Your Dashboard
              </DialogTitle>
              <DialogDescription className="text-lg pt-2">
                Here's what you can do on your personalized dashboard.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              {dashboardFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                >
                  <div className="p-2 rounded-full bg-muted/50">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">{feature.title}</h4>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Simple, clean banner */}
            <div className="w-full my-8 rounded-lg overflow-hidden border border-blue-100 dark:border-blue-900">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 relative">
                <div className="flex flex-col sm:flex-row items-center">
                  <div className="mb-4 sm:mb-0 sm:mr-6 p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                    <Sparkles className="h-8 w-8 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2 text-center sm:text-left">
                      Personalized Dashboard
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center sm:text-left">
                      {userType === 'freelancer' ? 
                        "Your dashboard is customized to help you find the best opportunities." :
                        "Your dashboard is designed to help you find the perfect talent for your projects."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex flex-col space-y-4 sm:space-y-0">
              <motion.div 
                className="w-full" 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <Button 
                  onClick={handleNext}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transform transition-all duration-300 py-5"
                >
                  <div className="flex items-center justify-center">
                    <BadgeCheck className="mr-2 h-5 w-5" />
                    <span className="font-medium">Complete Your Profile</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-2">Takes only a few minutes to get started</p>
              </motion.div>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
