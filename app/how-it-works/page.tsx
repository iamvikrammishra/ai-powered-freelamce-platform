import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Check, ArrowRight, UserPlus, Search, Edit, Briefcase, CreditCard, Award, Users } from "lucide-react"

export default function HowItWorksPage() {
  // Process steps for freelancers
  const freelancerSteps = [
    {
      icon: <UserPlus className="h-10 w-10 text-primary" />,
      title: "Create your profile",
      description: "Sign up and build a comprehensive profile showcasing your skills, experience, and portfolio."
    },
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Find projects",
      description: "Browse through thousands of jobs or get matched with projects that fit your expertise."
    },
    {
      icon: <Edit className="h-10 w-10 text-primary" />,
      title: "Submit proposals",
      description: "Apply to jobs with customized proposals highlighting why you're the perfect fit."
    },
    {
      icon: <Briefcase className="h-10 w-10 text-primary" />,
      title: "Do great work",
      description: "Collaborate with clients using our platform tools to deliver exceptional results."
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Get paid securely",
      description: "Receive payments safely through our secure payment protection system."
    },
  ]

  // Process steps for clients
  const clientSteps = [
    {
      icon: <Briefcase className="h-10 w-10 text-primary" />,
      title: "Post a job",
      description: "Create a detailed job posting describing your project requirements."
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Review proposals",
      description: "Receive proposals from qualified freelancers interested in your project."
    },
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Hire the best match",
      description: "Review profiles, portfolios, and ratings to select the perfect freelancer."
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Collaborate effectively",
      description: "Work together seamlessly using our communication and project management tools."
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Pay for quality work",
      description: "Release payments only when you're completely satisfied with the deliverables."
    },
  ]

  // Platform features
  const platformFeatures = [
    {
      title: "Secure Payments",
      description: "Our escrow system ensures freelancers get paid and clients get quality work."
    },
    {
      title: "Quality Matching",
      description: "Our AI algorithm connects the right talent with the right projects."
    },
    {
      title: "Dedicated Support",
      description: "24/7 customer support to help resolve any issues quickly."
    },
    {
      title: "Milestone Tracking",
      description: "Break projects into manageable milestones for better outcomes."
    },
    {
      title: "Contract Protection",
      description: "Clear contracts and terms to protect both parties."
    },
    {
      title: "Feedback System",
      description: "Build your reputation through verified client reviews."
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-black">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 md:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            How GigIndia Works
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            GigIndia connects talented freelancers with clients looking for quality work.
            Our platform makes the entire process simple, secure, and efficient.
          </p>
        </div>

        {/* For Freelancers Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">For Freelancers</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Follow these simple steps to start your freelancing journey and connect with clients worldwide.
            </p>
          </div>

          <div className="relative">
            {/* Progress line */}
            <div className="hidden lg:block absolute left-1/2 top-12 h-[calc(100%-80px)] w-1 bg-primary/20 -translate-x-1/2 rounded-full"></div>
            
            <div className="space-y-12 lg:space-y-0">
              {freelancerSteps.map((step, index) => (
                <div key={index} className="flex flex-col lg:flex-row lg:items-center lg:justify-center">
                  <div className={`lg:w-1/2 lg:pr-16 ${index % 2 === 0 ? 'lg:text-right order-1' : 'lg:order-3 lg:pl-16 lg:pr-0'}`}>
                    <div className={`bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm ${index % 2 === 0 ? 'lg:ml-auto' : 'lg:mr-auto'}`}>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center py-4 lg:py-0 lg:w-20 lg:order-2 z-10">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white shadow-md">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className={`hidden lg:block lg:w-1/2 ${index % 2 === 0 ? 'lg:order-3' : 'lg:order-1 lg:text-right'}`}>
                    <div className="h-24 flex items-center">
                      <div className={`${index % 2 === 0 ? '' : 'ml-auto'} p-3 bg-primary/10 rounded-full`}>
                        {step.icon}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              asChild
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              <Link href="/auth/register?type=freelancer">
                Get Started as a Freelancer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* For Clients Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">For Clients</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Find skilled professionals to help bring your projects to life with our streamlined hiring process.
            </p>
          </div>

          <div className="relative">
            {/* Progress line */}
            <div className="hidden lg:block absolute left-1/2 top-12 h-[calc(100%-80px)] w-1 bg-primary/20 -translate-x-1/2 rounded-full"></div>
            
            <div className="space-y-12 lg:space-y-0">
              {clientSteps.map((step, index) => (
                <div key={index} className="flex flex-col lg:flex-row lg:items-center lg:justify-center">
                  <div className={`lg:w-1/2 ${index % 2 !== 0 ? 'lg:text-right lg:pr-16 order-1' : 'lg:order-3 lg:pl-16'}`}>
                    <div className={`bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm ${index % 2 !== 0 ? 'lg:ml-auto' : 'lg:mr-auto'}`}>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center py-4 lg:py-0 lg:w-20 lg:order-2 z-10">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white shadow-md">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className={`hidden lg:block lg:w-1/2 ${index % 2 !== 0 ? 'lg:order-3' : 'lg:order-1 lg:text-right'}`}>
                    <div className="h-24 flex items-center">
                      <div className={`${index % 2 !== 0 ? '' : 'ml-auto'} p-3 bg-primary/10 rounded-full`}>
                        {step.icon}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              asChild
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              <Link href="/auth/register?type=employer">
                Get Started as a Client
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Platform Features */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose GigIndia</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our platform is designed to make freelancing and hiring simple, secure, and successful.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 text-primary">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center bg-primary/5 py-12 px-4 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of freelancers and clients already using GigIndia to collaborate on amazing projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              asChild
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              <Link href="/auth/register?type=freelancer">Join as a Freelancer</Link>
            </Button>
            <Button 
              size="lg" 
              asChild
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
            >
              <Link href="/auth/register?type=employer">Join as a Client</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
