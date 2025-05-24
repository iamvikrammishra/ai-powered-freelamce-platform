"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function HeroSection() {
  const [activeTab, setActiveTab] = useState("freelancer")
  const [email, setEmail] = useState("")

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Find the perfect freelance services for your business
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Connect with talented professionals, collaborate on projects, and grow your business with our AI-powered
                freelancing platform.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link href="/auth/register?type=freelancer">Join as Freelancer</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/auth/register?type=employer">Hire Talent</Link>
              </Button>
            </div>
          </div>
          <img
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            height="550"
            src="/professional-freelancers.png"
            width="550"
          />
        </div>
      </div>
    </section>
  )
}
