import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function PricingTestimonials() {
  const testimonials = [
    {
      quote:
        "Upgrading to the Pro plan was the best decision for my freelance career. The AI job matching alone has increased my client acquisition by 40%.",
      author: "Priya Sharma",
      role: "UI/UX Designer",
      avatar: "/indian-woman-professional-headshot.png",
    },
    {
      quote:
        "As a business owner, the Business plan has streamlined our entire freelancer hiring process. We've cut hiring time in half and found better talent.",
      author: "Rajesh Patel",
      role: "CEO, TechSolutions India",
      avatar: "/indian-man-headshot.png",
    },
    {
      quote:
        "I started with the Free plan to test the waters, and within a month I had enough projects to justify upgrading to Pro. Best investment ever!",
      author: "Ananya Desai",
      role: "Content Writer",
      avatar: "/indian-woman-headshot.png",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Users Say</h2>
            <p className="text-gray-500 dark:text-gray-400 md:text-xl">
              Join thousands of satisfied freelancers and businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.author} className="bg-white dark:bg-gray-950">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="relative h-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="absolute -top-2 -left-2 text-purple-200 dark:text-purple-900"
                      >
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                      </svg>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{testimonial.quote}</p>
                    <div className="flex items-center space-x-4">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.author}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
