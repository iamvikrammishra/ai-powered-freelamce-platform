import { CheckIcon, XIcon } from "lucide-react"

export function PricingComparison() {
  const features = [
    {
      name: "Profile Creation",
      free: true,
      pro: true,
      business: true,
    },
    {
      name: "Job Applications",
      free: "10/month",
      pro: "Unlimited",
      business: "N/A",
    },
    {
      name: "Job Postings",
      free: "1/month",
      pro: "5/month",
      business: "Unlimited",
    },
    {
      name: "AI Job Matching",
      free: "Basic",
      pro: "Advanced",
      business: "Premium",
    },
    {
      name: "Featured Profile",
      free: false,
      pro: true,
      business: "N/A",
    },
    {
      name: "Skill Verification",
      free: false,
      pro: true,
      business: "N/A",
    },
    {
      name: "Analytics Dashboard",
      free: "Basic",
      pro: "Advanced",
      business: "Premium",
    },
    {
      name: "Team Management",
      free: false,
      pro: false,
      business: true,
    },
    {
      name: "API Access",
      free: false,
      pro: false,
      business: true,
    },
    {
      name: "Dedicated Support",
      free: false,
      pro: "Priority",
      business: "Dedicated Manager",
    },
    {
      name: "Talent Pool Access",
      free: "Limited",
      pro: "Full",
      business: "Premium",
    },
    {
      name: "Contract Templates",
      free: "Basic",
      pro: "Advanced",
      business: "Custom",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Compare Plans</h2>
            <p className="text-gray-500 dark:text-gray-400 md:text-xl">
              Find the perfect plan for your freelancing needs
            </p>
          </div>

          <div className="w-full overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-4 px-6 text-left font-medium">Features</th>
                  <th className="py-4 px-6 text-center font-medium">Free</th>
                  <th className="py-4 px-6 text-center font-medium bg-purple-50 dark:bg-purple-900/20">Pro</th>
                  <th className="py-4 px-6 text-center font-medium">Business</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr
                    key={feature.name}
                    className={`${index % 2 === 0 ? "bg-white dark:bg-gray-950" : "bg-gray-50 dark:bg-gray-900"}`}
                  >
                    <td className="py-4 px-6 border-b">{feature.name}</td>
                    <td className="py-4 px-6 text-center border-b">
                      {typeof feature.free === "boolean" ? (
                        feature.free ? (
                          <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <XIcon className="h-5 w-5 text-red-500 mx-auto" />
                        )
                      ) : (
                        feature.free
                      )}
                    </td>
                    <td className="py-4 px-6 text-center border-b bg-purple-50 dark:bg-purple-900/20">
                      {typeof feature.pro === "boolean" ? (
                        feature.pro ? (
                          <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <XIcon className="h-5 w-5 text-red-500 mx-auto" />
                        )
                      ) : (
                        feature.pro
                      )}
                    </td>
                    <td className="py-4 px-6 text-center border-b">
                      {typeof feature.business === "boolean" ? (
                        feature.business ? (
                          <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <XIcon className="h-5 w-5 text-red-500 mx-auto" />
                        )
                      ) : (
                        feature.business
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
