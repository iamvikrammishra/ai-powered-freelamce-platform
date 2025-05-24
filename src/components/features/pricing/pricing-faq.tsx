"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function PricingFAQ() {
  const faqs = [
    {
      question: "How do I know which plan is right for me?",
      answer: "The best plan depends on your freelancing stage. Basic is perfect for beginners testing the waters, Pro is ideal for active freelancers seeking consistent work, and Business is designed for agencies or teams managing multiple projects simultaneously."
    },
    {
      question: "Can I switch between plans?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the new features will be available immediately. If you downgrade, the change will take effect at the end of your current billing cycle."
    },
    {
      question: "Do you offer discounts for students or non-profits?",
      answer: "Yes! We offer a 50% discount on all plans for verified students and registered non-profit organizations. Please contact our support team with proof of your status to apply for the discount."
    },
    {
      question: "Is there any commission fee on projects?",
      answer: "We charge a 5% service fee on all projects for Basic plans, 3% for Pro plans, and 2% for Business plans. This helps us maintain the platform and provide quality service while keeping subscription costs affordable."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit and debit cards, UPI, net banking, and select digital wallets. For Business plans, we also offer invoice-based payments with net-30 terms."
    },
    {
      question: "How does the 30-day money-back guarantee work?",
      answer: "If you're not satisfied with our service within the first 30 days of your subscription, contact our support team and we'll process a full refund. No questions asked!"
    },
    {
      question: "Can I use the platform without a paid subscription?",
      answer: "We offer a limited free tier that allows you to create a basic profile and browse available jobs. However, to apply for jobs and access most features, a paid subscription is required."
    },
    {
      question: "What happens to my profile if my subscription expires?",
      answer: "Your profile will remain visible, but you won't be able to apply to new jobs or access premium features. Any ongoing projects will continue unaffected until completion."
    }
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
            Get answers to common questions about our pricing and plans
          </p>
        </div>
        
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 dark:text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
