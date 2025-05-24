import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function PricingFAQ() {
  const faqs = [
    {
      question: "Can I switch between plans?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the new features will be available immediately. If you downgrade, the changes will take effect at the end of your current billing cycle.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a 14-day free trial for our Pro and Business plans. No credit card is required to start your trial. You can upgrade to a paid plan at any time during or after your trial.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), UPI, NetBanking, and PayTM. For Business plans, we also offer invoice-based payments with net-30 terms.",
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer:
        "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied with our service within the first 30 days, contact our support team for a full refund.",
    },
    {
      question: "What happens when my free trial ends?",
      answer:
        "When your free trial ends, your account will automatically switch to the Free plan. You won't lose any data, but you'll lose access to premium features until you upgrade to a paid plan.",
    },
    {
      question: "Do you offer discounts for non-profits or educational institutions?",
      answer:
        "Yes, we offer special pricing for non-profits, educational institutions, and student freelancers. Please contact our sales team for more information.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Frequently Asked Questions</h2>
            <p className="text-gray-500 dark:text-gray-400 md:text-xl">
              Everything you need to know about our pricing and plans
            </p>
          </div>

          <div className="w-full max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
