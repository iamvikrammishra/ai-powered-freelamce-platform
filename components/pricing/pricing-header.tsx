export function PricingHeader() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-purple-100 dark:bg-purple-900/20 px-3 py-1 text-sm text-purple-600 dark:text-purple-300 mb-4">
              Pricing
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Simple, transparent pricing
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mt-4">
              Choose the perfect plan for your freelancing journey. No hidden fees, no surprises.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-8 justify-center">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-purple-600"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span className="text-sm font-medium">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-purple-600"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span className="text-sm font-medium">14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-purple-600"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span className="text-sm font-medium">Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
