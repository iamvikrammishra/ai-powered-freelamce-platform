"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export function CtaSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      // Here you would typically send the email to your backend
      setEmail("")
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(to right, #4338ca, #6d28d9, #8b5cf6)",
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/abstract-purple-pattern.png')] opacity-10"></div>
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-400/20 blur-3xl"></div>
        <div className="absolute bottom-40 left-20 h-60 w-60 rounded-full bg-indigo-400/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Ready to Transform Your Freelance Career?
            </h2>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
              Join thousands of freelancers who are finding better projects, earning more, and growing their skills with
              GigIndia.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white flex items-center justify-center mr-3 mt-0.5">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">AI-Powered Matching</h3>
                  <p className="text-purple-100">
                    Our AI matches you with projects that fit your skills and preferences perfectly.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white flex items-center justify-center mr-3 mt-0.5">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Verified Skills</h3>
                  <p className="text-purple-100">
                    Stand out with our AI-powered skill verification that validates your expertise.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white flex items-center justify-center mr-3 mt-0.5">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Secure Payments</h3>
                  <p className="text-purple-100">Get paid on time, every time with our secure escrow payment system.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
                  <p className="text-purple-100">We've sent you an email with next steps to get started.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-white mb-6">Get Started Today</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-purple-100 mb-2">Email Address</label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="bg-white/10 border-white/20 text-white placeholder:text-purple-200/50 focus-visible:ring-purple-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Button type="submit" className="w-full bg-white hover:bg-gray-100 text-purple-700">
                          Join Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-center">
                        <span className="text-purple-100">or</span>
                      </div>
                      <div className="flex-1">
                        <Button asChild variant="outline" className="w-full border-white text-white hover:bg-white/10">
                          <Link href="/auth/register">Sign Up</Link>
                        </Button>
                      </div>
                    </div>
                  </form>

                  <div className="mt-6 pt-6 border-t border-white/10 text-center">
                    <p className="text-sm text-purple-100">
                      Already have an account?{" "}
                      <Link href="/auth/login" className="text-white font-medium hover:underline">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
