import type { Metadata } from "next"
import { PricingPlans } from "@/components/features/pricing/pricing-plans"
import { PricingFAQ } from "@/components/features/pricing/pricing-faq"
import { PricingComparison } from "@/components/features/pricing/pricing-comparison"
import { PricingHeader } from "@/components/features/pricing/pricing-header"
import { PricingTestimonials } from "@/components/features/pricing/pricing-testimonials"
import { PricingCTA } from "@/components/features/pricing/pricing-cta"

export const metadata: Metadata = {
  title: "Pricing - GigIndia",
  description: "Flexible pricing plans for freelancers and businesses of all sizes",
}

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <PricingHeader />
        <PricingPlans />
        <PricingComparison />
        <PricingTestimonials />
        <PricingFAQ />
        <PricingCTA />
      </main>
    </div>
  )
}
