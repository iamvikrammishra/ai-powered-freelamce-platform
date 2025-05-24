"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "UI/UX Designer",
      image: "/indian-woman-professional-headshot.png",
      content:
        "GigIndia helped me find consistent design work with great clients. The AI matching is spot-on and I love how the platform verifies my skills through my portfolio. I've doubled my income in just 3 months!",
      rating: 5,
      company: "Freelancer",
    },
    {
      name: "Rahul Mehta",
      role: "Full Stack Developer",
      image: "/indian-man-headshot.png",
      content:
        "As a developer, I appreciate the skill verification system. It helps me stand out from the crowd and the escrow payment system ensures I always get paid for my work. The mentorship feature has been invaluable for my growth.",
      rating: 5,
      company: "Tech Consultant",
    },
    {
      name: "Ananya Patel",
      role: "Content Writer",
      image: "/indian-woman-headshot.png",
      content:
        "The mentorship feature has been invaluable for my career growth. I've connected with experienced writers who have helped me improve my skills and find better opportunities. GigIndia is truly a game-changer!",
      rating: 4,
      company: "Freelance Writer",
    },
    {
      name: "Vikram Singh",
      role: "Startup Founder",
      image: "/indian-man-professional-headshot-2.png",
      content:
        "Finding quality talent for our startup was a challenge until we discovered GigIndia. The AI recommendations have saved us countless hours in the hiring process and the quality of freelancers is exceptional.",
      rating: 5,
      company: "TechStart Solutions",
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-0 h-80 w-80 rounded-full bg-purple-100/30 blur-3xl dark:bg-purple-900/10"></div>
        <div className="absolute bottom-0 left-20 h-60 w-60 rounded-full bg-blue-100/30 blur-3xl dark:bg-blue-900/10"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-xs sm:text-sm dark:bg-purple-900 text-purple-800 dark:text-purple-200 mb-3 sm:mb-4">
            Testimonials
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">What Our Users Say</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Thousands of freelancers and businesses are transforming how they work with GigIndia.
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-none shadow-xl bg-white dark:bg-gray-800 overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-6 sm:p-8 md:p-12 flex items-center">
                      <div>
                        <Quote className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white/30 mb-4 sm:mb-6" />
                        <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8">
                          "{testimonials[activeIndex].content}"
                        </p>
                        <div className="flex items-center">
                          <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full overflow-hidden border-2 border-white mr-3 sm:mr-4">
                            <img
                              src={testimonials[activeIndex].image || "/placeholder.svg"}
                              alt={testimonials[activeIndex].name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-white">{testimonials[activeIndex].name}</h4>
                            <p className="text-white/80">{testimonials[activeIndex].role}</p>
                            <p className="text-white/60 text-sm">{testimonials[activeIndex].company}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 sm:p-8 md:p-12 flex flex-col justify-center">
                      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Success Stories</h3>
                      <div className="space-y-6">
                        {testimonials.map((testimonial, index) => (
                          <div
                            key={index}
                            className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                              activeIndex === index
                                ? "bg-purple-50 dark:bg-purple-900/30 border-l-4 border-purple-600"
                                : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                            }`}
                            onClick={() => setActiveIndex(index)}
                          >
                            <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                              <img
                                src={testimonial.image || "/placeholder.svg"}
                                alt={testimonial.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-medium truncate">{testimonial.name}</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{testimonial.role}</p>
                              <div className="flex mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < testimonial.rating
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300 dark:text-gray-600"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 gap-2">
            <Button variant="outline" size="icon" className="rounded-full" onClick={prevTestimonial}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant={activeIndex === index ? "default" : "outline"}
                size="sm"
                className={`w-8 h-8 p-0 rounded-full ${
                  activeIndex === index ? "bg-purple-600 hover:bg-purple-700" : "border-gray-200 dark:border-gray-700"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {index + 1}
              </Button>
            ))}
            <Button variant="outline" size="icon" className="rounded-full" onClick={nextTestimonial}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
