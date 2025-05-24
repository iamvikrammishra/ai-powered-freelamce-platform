"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckIcon } from "lucide-react"

export function PricingPlans() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")
  }

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started with freelancing",
      price: {
        monthly: "₹0",
        annual: "₹0",
      },
      features: [
        "Create a professional profile",
        "Browse available projects",
        "Apply to up to 10 jobs per month",
        "Basic AI job matching",
        "Community forum access",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      description: "For serious freelancers looking to grow",
      price: {
        monthly: "₹999",
        annual: "₹9,990",
      },
      features: [
        "Everything in Free",
        "Unlimited job applications",
        "Priority AI job matching",
        "Featured profile placement",
        "Skill verification badge",
        "Early access to premium jobs",
        "Detailed analytics dashboard",
        "Priority support",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Business",
      description: "For companies hiring freelance talent",
      price: {
        monthly: "₹2,499",
        annual: "₹24,990",
      },
      features: [
        "Post unlimited jobs",
        "Advanced AI talent matching",
        "Verified talent pool access",
        "Team collaboration tools",
        "Dedicated account manager",
        "Custom reporting",
        "Bulk messaging",
        "API access",
        "Enterprise-grade security",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
            <Button
              variant={billingCycle === "monthly" ? "default" : "outline"}
              size="sm"
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-full ${billingCycle === "monthly" ? "bg-purple-600 hover:bg-purple-700" : ""}`}
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === "annual" ? "default" : "outline"}
              size="sm"
              onClick={() => setBillingCycle("annual")}
              className={`rounded-full ${billingCycle === "annual" ? "bg-purple-600 hover:bg-purple-700" : ""}`}
            >
              Annual
              <Badge
                variant="outline"
                className="ml-2 bg-purple-200 text-purple-900 dark:bg-purple-900 dark:text-purple-100"
              >
                Save 20%
              </Badge>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`w-full max-w-sm flex flex-col ${
                  plan.popular
                    ? "border-purple-600 dark:border-purple-400 shadow-lg shadow-purple-100 dark:shadow-purple-900/20"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mt-2 mb-6">
                    <span className="text-3xl font-bold">{plan.price[billingCycle]}</span>
                    {plan.name !== "Free" && (
                      <span className="text-muted-foreground ml-1">
                        /{billingCycle === "monthly" ? "month" : "year"}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
