"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function PricingPlans() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly")
  
  const plans = [
    {
      name: "Basic",
      description: "Essential features for freelancers just getting started",
      price: {
        monthly: "₹499",
        yearly: "₹4,999",
        discount: "Save ₹989"
      },
      features: [
        "Create a professional profile",
        "Apply to up to 10 jobs per month",
        "Basic skills assessment",
        "Community forum access",
        "Email support"
      ],
      popular: false,
      cta: "Get Started"
    },
    {
      name: "Pro",
      description: "Perfect for active freelancers looking to grow",
      price: {
        monthly: "₹999",
        yearly: "₹9,999",
        discount: "Save ₹1,989"
      },
      features: [
        "Everything in Basic",
        "Unlimited job applications",
        "Featured profile for 7 days/month",
        "Advanced skills verification",
        "Priority bidding on projects",
        "Phone & email support"
      ],
      popular: true,
      cta: "Go Pro"
    },
    {
      name: "Business",
      description: "For agencies and teams managing multiple projects",
      price: {
        monthly: "₹2,499",
        yearly: "₹24,999",
        discount: "Save ₹4,989"
      },
      features: [
        "Everything in Pro",
        "Team management tools",
        "Dedicated account manager",
        "Custom contracts & invoicing",
        "API access",
        "24/7 priority support"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ]
  
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-sm flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Pricing Plans</h2>
            <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
              Choose the perfect plan for your freelancing journey
            </p>
          </div>
          
          <div className="flex items-center space-x-2 rounded-full border p-1">
            <Button
              variant={billing === "monthly" ? "default" : "ghost"}
              size="sm"
              onClick={() => setBilling("monthly")}
              className="rounded-full"
            >
              Monthly
            </Button>
            <Button
              variant={billing === "yearly" ? "default" : "ghost"}
              size="sm"
              onClick={() => setBilling("yearly")}
              className="rounded-full"
            >
              Yearly
            </Button>
          </div>
        </div>
        
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-10">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`flex flex-col ${
                plan.popular 
                  ? "border-purple-600 shadow-md shadow-purple-100 dark:shadow-purple-900/20" 
                  : ""
              }`}
            >
              {plan.popular && (
                <Badge 
                  className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600"
                >
                  Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {plan.description}
                </p>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-bold">
                    {billing === "monthly" ? plan.price.monthly : plan.price.yearly}
                  </span>
                  <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                    /{billing}
                  </span>
                </div>
                {billing === "yearly" && (
                  <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                    {plan.price.discount}
                  </p>
                )}
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="mr-2 h-5 w-5 shrink-0 text-green-500" />
                      <span className="text-sm">{feature}</span>
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
    </section>
  )
}
