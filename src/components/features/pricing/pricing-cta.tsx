"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PricingCTA() {
  return (
    <section className="py-16 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-center shadow-lg sm:p-10 md:p-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to Start Your Freelance Journey?</h2>
          <p className="mt-4 text-lg text-purple-100">
            Join thousands of freelancers and businesses already using our platform
          </p>
          
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button 
              asChild
              size="lg" 
              className="bg-white text-purple-700 hover:bg-gray-100"
            >
              <Link href="/auth/register">
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10"
            >
              <Link href="/contact">
                Contact Sales
              </Link>
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-purple-100">
            No credit card required • Free 14-day trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  )
}
