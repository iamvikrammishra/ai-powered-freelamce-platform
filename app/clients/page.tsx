import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/features/navigation/navbar"
import { Footer } from "@/components/features/landing/footer"

export const metadata: Metadata = {
  title: "Client Success Stories | GigIndia",
  description: "Discover how leading companies across India have transformed their talent acquisition with GigIndia.",
}

export default function ClientsPage() {
  const clients = [
    {
      name: "TechMahindra",
      logo: "/indian-tech-company-logo.png",
      industry: "Technology",
      description:
        "Leading technology solutions provider that transformed their freelance hiring process with GigIndia's AI-powered platform.",
      results: ["60% faster hiring", "45% better talent quality", "₹12 lakhs in cost savings"],
      slug: "techmahindra",
    },
    {
      name: "Paytm",
      logo: "/fintech-company-logo.png",
      industry: "Fintech",
      description:
        "Financial services innovator that leveraged GigIndia to find specialized fintech talent across India.",
      results: ["40% reduction in time-to-hire", "98% client satisfaction", "200+ specialized freelancers"],
      slug: "paytm",
    },
    {
      name: "Zomato",
      logo: "/tech-media-logo.png",
      industry: "Food Tech",
      description:
        "Food delivery giant that scaled their digital initiatives by finding the right tech talent through GigIndia.",
      results: ["50% faster project completion", "30+ successful projects", "Seamless scaling during peak periods"],
      slug: "zomato",
    },
    {
      name: "Practo",
      logo: "/health-tech-logo.png",
      industry: "Healthcare",
      description:
        "Healthcare technology pioneer that connected with specialized healthcare freelancers through GigIndia's AI matching.",
      results: ["Found niche healthcare specialists", "Reduced hiring costs by 35%", "Improved project delivery times"],
      slug: "practo",
    },
    {
      name: "BYJU'S",
      logo: "/elearning-logo.png",
      industry: "EdTech",
      description:
        "Education technology leader that scaled their content creation by accessing GigIndia's talent network.",
      results: ["320+ specialized content creators", "64 successful projects", "95% satisfaction rate"],
      slug: "byjus",
    },
    {
      name: "Flipkart",
      logo: "/ecommerce-logo.png",
      industry: "E-commerce",
      description:
        "E-commerce giant that improved their digital initiatives through GigIndia's specialized freelance talent.",
      results: ["Scaled seasonal workforce efficiently", "Reduced onboarding time by 50%", "Improved project quality"],
      slug: "flipkart",
    },
    {
      name: "Ola",
      logo: "/placeholder-lq7z1.png",
      industry: "Transportation",
      description: "Ride-sharing company that enhanced their technology stack with specialized freelance developers.",
      results: ["Accelerated app development", "Reduced development costs", "Improved user experience"],
      slug: "ola",
    },
    {
      name: "MakeMyTrip",
      logo: "/placeholder.svg?height=80&width=80&query=travel company logo",
      industry: "Travel",
      description:
        "Travel booking platform that optimized their digital presence through GigIndia's freelance network.",
      results: ["Enhanced website performance", "Improved conversion rates", "Faster feature deployment"],
      slug: "makemytrip",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 to-black text-white">
      <Navbar />
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-20 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full opacity-10"
                  style={{
                    background: `linear-gradient(45deg, #8B5CF6, #6366F1)`,
                    width: `${Math.random() * 8 + 3}rem`,
                    height: `${Math.random() * 8 + 3}rem`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    filter: "blur(40px)",
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 backdrop-blur-[100px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-block mb-3 px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
              <span className="text-sm font-medium text-purple-400">Success Stories</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400">
              Client Success Stories
            </h1>

            <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
              Discover how leading companies across India have transformed their talent acquisition and project delivery
              with GigIndia's AI-powered freelance platform.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                Schedule a Demo
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
              >
                View Platform Features
              </Button>
            </div>
          </div>
        </section>

        {/* Client grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((client) => (
                <Card
                  key={client.slug}
                  className="bg-gray-900/50 border-gray-800 overflow-hidden hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-gray-800 rounded-lg p-2 mr-4 flex items-center justify-center border border-gray-700/50">
                        <img
                          src={client.logo || "/placeholder.svg"}
                          alt={client.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{client.name}</h3>
                        <p className="text-sm text-gray-400">{client.industry}</p>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 line-clamp-3">{client.description}</p>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Key Results:</h4>
                      <ul className="space-y-1">
                        {client.results.map((result, index) => (
                          <li key={index} className="text-sm text-gray-300 flex items-start">
                            <span className="text-purple-400 mr-2">•</span> {result}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={`/case-studies/${client.slug}`}
                      className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300"
                    >
                      Read full case study
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-20 px-4 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border-t border-b border-purple-500/10">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Talent Acquisition?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Join the 500+ innovative companies that have revolutionized how they find and work with specialized
              freelance talent.
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-lg px-8 py-6 h-auto">
              Get Started Today
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
