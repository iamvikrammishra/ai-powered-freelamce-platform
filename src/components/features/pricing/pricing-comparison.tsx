"use client"

import { Check, X } from "lucide-react"

export function PricingComparison() {
  const features = [
    {
      name: "Profile Features",
      basic: [
        { name: "Professional profile", available: true },
        { name: "Portfolio showcase (3 items)", available: true },
        { name: "Skills assessment", available: true },
        { name: "Featured profile", available: false },
        { name: "Verified badge", available: false },
        { name: "Custom profile URL", available: false }
      ]
    },
    {
      name: "Job Opportunities",
      basic: [
        { name: "Job application (10/month)", available: true },
        { name: "Saved jobs list", available: true },
        { name: "Early access to new jobs", available: false },
        { name: "Priority application highlighting", available: false },
        { name: "Custom job alerts", available: false },
        { name: "AI job matching", available: false }
      ]
    },
    {
      name: "Client Interaction",
      basic: [
        { name: "Direct messaging", available: true },
        { name: "File sharing", available: true },
        { name: "Video meetings", available: false },
        { name: "Contract templates", available: false },
        { name: "Milestone payments", available: false },
        { name: "Dispute resolution", available: false }
      ]
    },
    {
      name: "Support & Resources",
      basic: [
        { name: "Community forum access", available: true },
        { name: "Help center", available: true },
        { name: "Email support", available: true },
        { name: "Phone support", available: false },
        { name: "Dedicated account manager", available: false },
        { name: "Skills training resources", available: false }
      ]
    }
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Compare Plans</h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
            See which plan has the features you need for your freelancing career
          </p>
        </div>
        
        <div className="mt-12 overflow-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left font-medium">Features</th>
                <th className="p-4 text-center font-medium">Basic</th>
                <th className="p-4 text-center font-medium">Pro</th>
                <th className="p-4 text-center font-medium">Business</th>
              </tr>
            </thead>
            <tbody>
              {features.map((category) => (
                <>
                  <tr key={category.name} className="border-b bg-muted/50">
                    <td colSpan={4} className="p-4 font-medium">{category.name}</td>
                  </tr>
                  {category.basic.map((feature, featureIdx) => (
                    <tr key={feature.name} className={featureIdx !== category.basic.length - 1 ? "border-b" : ""}>
                      <td className="p-4">{feature.name}</td>
                      <td className="p-4 text-center">
                        {feature.available ? (
                          <Check className="mx-auto h-5 w-5 text-green-500" />
                        ) : (
                          <X className="mx-auto h-5 w-5 text-gray-300 dark:text-gray-600" />
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-500" />
                      </td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-500" />
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
