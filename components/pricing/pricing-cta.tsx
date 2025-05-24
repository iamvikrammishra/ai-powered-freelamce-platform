import Link from "next/link"
import { Button } from "@/components/ui/button"

export function PricingCTA() {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to get started?</h2>
            <p className="text-gray-500 dark:text-gray-400 md:text-xl">
              Join thousands of freelancers and businesses on GigIndia today
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Link href="/auth/register">Sign up for free</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact sales</Link>
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">No credit card required for free plan or trial</p>
        </div>
      </div>
    </section>
  )
}
