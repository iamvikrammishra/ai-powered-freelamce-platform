"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function PricingTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const testimonials = [
    {
      quote: "I started with the Basic plan to test the waters. Within 3 months, I landed enough projects to upgrade to Pro. The investment has paid for itself many times over!",
      author: "Priya Sharma",
      role: "UI/UX Designer",
      plan: "Pro",
      image: "/testimonial-1.png"
    },
    {
      quote: "The Business plan has transformed how our agency operates. The team management tools and dedicated account manager have streamlined our entire workflow.",
      author: "Rahul Singh",
      role: "Creative Agency Owner",
      plan: "Business",
      image: "/testimonial-2.png"
    },
    {
      quote: "As a freelance developer, the Pro plan gives me everything I need. The verified badge and featured profile have significantly increased my client inquiries.",
      author: "Vikram Patel",
      role: "Full Stack Developer",
      plan: "Pro",
      image: "/testimonial-3.png"
    }
  ]
  
  const prev = () => {
    setCurrentIndex((index) => (index === 0 ? testimonials.length - 1 : index - 1))
  }
  
  const next = () => {
    setCurrentIndex((index) => (index === testimonials.length - 1 ? 0 : index + 1))
  }
  
  const currentTestimonial = testimonials[currentIndex]
  
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-900">
            <div className="absolute left-6 top-6">
              <Quote className="h-12 w-12 text-gray-200 dark:text-gray-800" />
            </div>
            
            <div className="relative z-10 px-6 py-12 sm:px-12">
              <blockquote className="space-y-6 text-center">
                <p className="text-xl italic text-gray-700 dark:text-gray-300 md:text-2xl">
                  "{currentTestimonial.quote}"
                </p>
                
                <div className="mx-auto flex max-w-max flex-col items-center">
                  <Avatar className="h-16 w-16 border-2 border-white shadow-md dark:border-gray-800">
                    <AvatarImage src={currentTestimonial.image} alt={currentTestimonial.author} />
                    <AvatarFallback>{currentTestimonial.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="mt-4 text-center">
                    <div className="font-medium">{currentTestimonial.author}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{currentTestimonial.role}</div>
                    <Badge variant="outline" className="mt-2">
                      {currentTestimonial.plan} Plan
                    </Badge>
                  </div>
                </div>
              </blockquote>
            </div>
            
            <div className="flex justify-center space-x-2 pb-6">
              <Button variant="outline" size="icon" onClick={prev} className="h-8 w-8 rounded-full">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </Button>
              <Button variant="outline" size="icon" onClick={next} className="h-8 w-8 rounded-full">
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
