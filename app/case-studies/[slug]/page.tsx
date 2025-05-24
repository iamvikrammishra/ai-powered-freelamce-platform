import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CheckCircle, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/features/navigation/navbar"
import { Footer } from "@/components/features/landing/footer"

export const metadata: Metadata = {
  title: "Case Study | GigIndia",
  description: "Learn how leading companies have transformed their talent acquisition with GigIndia.",
}

// This would typically come from a database or CMS
const caseStudies = {
  techmahindra: {
    name: "TechMahindra",
    logo: "/indian-tech-company-logo.png",
    industry: "Technology",
    heroImage: "/placeholder.svg?height=600&width=1200&query=tech company office with people working",
    challenge:
      "TechMahindra was struggling to find specialized tech talent for their digital transformation projects. Traditional recruitment methods were taking too long and not yielding candidates with the right skill sets. They needed a solution that could quickly connect them with pre-vetted tech professionals across India.",
    solution:
      "GigIndia provided TechMahindra with access to our AI-powered platform that matches companies with pre-vetted freelancers based on specific skill requirements. Our platform's advanced algorithms analyzed project needs and identified the most suitable candidates from our talent pool of over 10,000 tech professionals.",
    results: [
      "Reduced hiring time by 60%, from 45 days to just 18 days",
      "Improved talent quality with 98% client satisfaction rate",
      "Saved ₹12 lakhs in recruitment costs over 6 months",
      "Successfully completed 48 projects with 250+ freelancers",
      "Increased project delivery speed by 40%",
    ],
    testimonial: {
      quote:
        "GigIndia has transformed how we find specialized tech talent across the country. Their AI-powered matching has connected us with exceptional freelancers who have the exact skills we need for our projects. The quality of work and time savings have been remarkable.",
      author: "Rajesh Kumar",
      position: "Chief Digital Officer, TechMahindra",
    },
    stats: {
      freelancers: 250,
      projects: 48,
      satisfaction: 98,
      timeReduction: 60,
      costSavings: 12,
    },
  },
  paytm: {
    name: "Paytm",
    logo: "/fintech-company-logo.png",
    industry: "Fintech",
    heroImage: "/placeholder.svg?height=600&width=1200&query=fintech company modern office",
    challenge:
      "Paytm was expanding rapidly and needed specialized fintech talent to support their growth. They struggled to find professionals with the right combination of financial and technical expertise through traditional hiring channels.",
    solution:
      "GigIndia's platform provided Paytm with access to a curated pool of fintech specialists. Our AI matching technology identified freelancers with both financial knowledge and technical skills, ensuring the perfect fit for Paytm's specialized projects.",
    results: [
      "Reduced hiring time by 40%, from 30 days to 18 days",
      "Achieved 96% client satisfaction rate across all projects",
      "Connected with 180+ specialized fintech freelancers",
      "Successfully completed 36 critical projects",
      "Improved project delivery timelines by 35%",
    ],
    testimonial: {
      quote:
        "The quality of fintech freelancers we've hired through this platform has been exceptional. GigIndia understands the unique challenges of our industry and has consistently connected us with talent that possesses both financial acumen and technical expertise.",
      author: "Priya Sharma",
      position: "VP of Technology, Paytm",
    },
    stats: {
      freelancers: 180,
      projects: 36,
      satisfaction: 96,
      timeReduction: 40,
      costSavings: 8,
    },
  },
  // Additional case studies would be defined here
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = caseStudies[params.slug]

  if (!caseStudy) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 to-black text-white">
      <Navbar />
      <main className="flex-1">
        {/* Hero section */}
        <section className="relative pt-20 pb-16 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full">
              {[...Array(8)].map((_, i) => (
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

          <div className="container mx-auto px-4 relative z-10">
            <Link
              href="/clients"
              className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300 mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to all case studies
            </Link>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-gray-800 rounded-xl p-3 flex items-center justify-center border border-gray-700/50">
                <img
                  src={caseStudy.logo || "/placeholder.svg"}
                  alt={caseStudy.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div>
                <div className="inline-block mb-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                  <span className="text-xs font-medium text-purple-400">{caseStudy.industry}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400">
                  {caseStudy.name} Success Story
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button
                variant="outline"
                className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Case Study
              </Button>
            </div>

            <div className="rounded-xl overflow-hidden mb-8 border border-gray-800">
              <img
                src={caseStudy.heroImage || "/placeholder.svg"}
                alt={`${caseStudy.name} office`}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* Case study content */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 mb-8">
                  <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                  <p className="text-gray-300 leading-relaxed">{caseStudy.challenge}</p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 mb-8">
                  <h2 className="text-2xl font-bold mb-4">Our Solution</h2>
                  <p className="text-gray-300 leading-relaxed">{caseStudy.solution}</p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
                  <h2 className="text-2xl font-bold mb-4">Results</h2>
                  <ul className="space-y-3">
                    {caseStudy.results.map((result, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5 mr-3" />
                        <p className="text-gray-300">{result}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-500/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Key Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold text-purple-400">{caseStudy.stats.freelancers}+</p>
                      <p className="text-sm text-gray-400">Freelancers</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold text-indigo-400">{caseStudy.stats.projects}</p>
                      <p className="text-sm text-gray-400">Projects</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold text-green-400">{caseStudy.stats.satisfaction}%</p>
                      <p className="text-sm text-gray-400">Satisfaction</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold text-pink-400">{caseStudy.stats.timeReduction}%</p>
                      <p className="text-sm text-gray-400">Time Reduction</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Testimonial</h3>
                  <blockquote className="relative">
                    <div className="absolute -top-2 -left-2 text-4xl text-purple-400 opacity-30">"</div>
                    <p className="relative z-10 text-gray-300 italic pl-4 mb-4">{caseStudy.testimonial.quote}</p>
                    <div className="absolute -bottom-6 -right-2 text-4xl text-purple-400 opacity-30">"</div>
                  </blockquote>
                  <div className="mt-4 pl-4">
                    <p className="font-medium text-white">{caseStudy.testimonial.author}</p>
                    <p className="text-sm text-gray-400">{caseStudy.testimonial.position}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/10 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Ready to achieve similar results?</h3>
                  <p className="text-gray-300 mb-4">
                    Transform your talent acquisition strategy with GigIndia's AI-powered freelance platform.
                  </p>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                    Schedule a Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related case studies */}
        <section className="py-16 px-4 border-t border-gray-800/50">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-8">Explore More Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(caseStudies)
                .filter(([slug]) => slug !== params.slug)
                .slice(0, 3)
                .map(([slug, study]) => (
                  <Link href={`/case-studies/${slug}`} key={slug}>
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-300">
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-gray-800 rounded-lg p-2 mr-3 flex items-center justify-center border border-gray-700/50">
                            <img
                              src={study.logo || "/placeholder.svg"}
                              alt={study.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-white">{study.name}</h3>
                            <p className="text-xs text-gray-400">{study.industry}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-300 line-clamp-2 mb-3">{study.testimonial.quote}</p>
                        <div className="text-purple-400 text-sm font-medium">Read case study →</div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
