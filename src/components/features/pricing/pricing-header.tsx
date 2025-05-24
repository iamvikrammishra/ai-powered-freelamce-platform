"use client"

import { Sparkles, CheckCircle } from "lucide-react"

export function PricingHeader() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20 lg:py-24">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-purple-50 via-indigo-50/50 to-transparent opacity-60 dark:from-purple-950/20 dark:via-indigo-950/10 dark:to-transparent"></div>
        <div className="absolute -right-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-purple-100 opacity-20 blur-3xl filter dark:bg-purple-900 dark:opacity-10"></div>
        <div className="absolute -left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-indigo-100 opacity-20 blur-3xl filter dark:bg-indigo-900 dark:opacity-10"></div>
      </div>
      
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-lg bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
            <Sparkles className="mr-1 h-4 w-4" />
            AI-Powered Freelance Platform
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-6 text-lg text-gray-500 dark:text-gray-400 md:text-xl">
            No hidden fees, no surprises. Choose the plan that works best for you and start finding the perfect 
            opportunities or talent today.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
              <span>No commitments</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
              <span>30-day money back</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
