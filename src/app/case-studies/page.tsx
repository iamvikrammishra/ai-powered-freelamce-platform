import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ChevronRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Case Studies | GigIndia",
  description: "Discover how companies are transforming their talent acquisition with GigIndia's AI-powered platform",
}

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      id: "tcs-talent-transformation",
      title: "How TCS Transformed Their Talent Acquisition",
      company: "Tata Consultancy Services",
      logo: "/indian-tech-company-logo.png",
      industry: "Technology",
      description:
        "Learn how TCS reduced hiring time by 47% and improved candidate quality using our AI-powered platform.",
      results: ["47% faster hiring", "32% cost reduction", "89% candidate satisfaction"],
      color: "purple",
    },
    {
      id: "hdfc-digital-transformation",
      title: "HDFC Bank's Digital Transformation Journey",
      company: "HDFC Bank",
      logo: "/fintech-company-logo.png",
      industry: "Finance",
      description:
        "Discover how HDFC Bank built a flexible tech workforce to accelerate their digital transformation initiatives.",
      results: ["125+ specialized roles filled", "3.5× faster project delivery", "₹4.2Cr cost savings"],
      color: "blue",
    },
    {
      id: "apollo-healthcare-innovation",
      title: "Apollo Hospitals: Innovation Through Specialized Talent",
      company: "Apollo Hospitals",
      logo: "/health-tech-logo.png",
      industry: "Healthcare",
      description:
        "How Apollo Hospitals leveraged specialized freelance talent to drive healthcare innovation initiatives.",
      results: ["18 new digital health initiatives", "41% faster time-to-market", "Expanded telemedicine reach"],
      color: "emerald",
    },
    {
      id: "byju-education-platform",
      title: "BYJU'S: Scaling Content Creation",
      company: "BYJU'S",
      logo: "/elearning-logo.png",
      industry: "Education",
      description: "How BYJU'S scaled their educational content creation by 300% while maintaining quality standards.",
      results: ["300% content production increase", "Expanded to 12 new languages", "95% quality consistency"],
      color: "amber",
    },
    {
      id: "flipkart-ecommerce-growth",
      title: "Flipkart: Seasonal Scaling Success",
      company: "Flipkart",
      logo: "/ecommerce-logo.png",
      industry: "E-commerce",
      description: "How Flipkart successfully managed seasonal demand spikes with on-demand specialized talent.",
      results: ["400% capacity scaling during sales", "Zero downtime during peak events", "28% cost optimization"],
      color: "rose",
    },
    {
      id: "zee-media-content-strategy",
      title: "Zee Media: Content Transformation Strategy",
      company: "Zee Media",
      logo: "/tech-media-logo.png",
      industry: "Media",
      description: "How Zee Media revolutionized their content strategy with specialized creative freelancers.",
      results: ["52 new content formats", "68% increase in engagement", "Expanded to 8 new regional markets"],
      color: "indigo",
    },
  ]

  const industries = ["All", "Technology", "Finance", "Healthcare", "Education", "E-commerce", "Media"]

  return (
    <main className="py-16 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-purple-900">
            Success Stories
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
            Client Success Stories
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover how leading Indian companies are transforming their businesses with GigIndia's AI-powered freelance
            talent platform.
          </p>
        </div>

        <Tabs defaultValue="All" className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-white dark:bg-gray-900 p-1 overflow-x-auto hide-scrollbar">
              {industries.map((industry) => (
                <TabsTrigger
                  key={industry}
                  value={industry}
                  className="px-4 py-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900 dark:data-[state=active]:bg-purple-900/30 dark:data-[state=active]:text-purple-100"
                >
                  {industry}
                </TabsTrigger>
              ))}
            </TabsList>

            <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
              <Filter className="h-4 w-4" /> Advanced Filters
            </Button>
          </div>

          {industries.map((industry) => (
            <TabsContent key={industry} value={industry} className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {caseStudies
                  .filter((study) => industry === "All" || study.industry === industry)
                  .map((study) => (
                    <Card
                      key={study.id}
                      className="overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className={`h-2 w-full bg-${study.color}-500`}></div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between mb-3">
                          <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 p-1">
                            <img
                              src={study.logo || "/placeholder.svg"}
                              alt={study.company}
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {study.industry}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl">{study.title}</CardTitle>
                        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                          {study.company}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{study.description}</p>
                        <div className="space-y-2">
                          {study.results.map((result, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <div className={`h-1.5 w-1.5 rounded-full bg-${study.color}-500`}></div>
                              <span>{result}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link
                          href={`/case-studies/${study.id}`}
                          className={`text-${study.color}-600 dark:text-${study.color}-400 hover:text-${study.color}-700 dark:hover:text-${study.color}-300 text-sm font-medium flex items-center`}
                        >
                          Read full case study <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 md:p-12 mt-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to transform your talent acquisition?
            </h2>
            <p className="text-purple-100 mb-8">
              Join 500+ innovative companies that have already revolutionized how they find and work with specialized
              talent.
            </p>
            <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
              Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
