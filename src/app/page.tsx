import { CtaSection } from "@/components/landing/cta-section"
import { FeatureSection } from "@/components/landing/feature-section"
import { FeaturedJobs } from "@/components/landing/featured-jobs"
import { FreelancerSpotlight } from "@/components/landing/freelancer-spotlight"
import { HeroSection } from "@/components/landing/hero-section"
import { HowItWorks } from "@/components/landing/how-it-works"
import { PlatformStats } from "@/components/landing/platform-stats"
import { SkillShowcase } from "@/components/landing/skill-showcase"
import { Testimonials } from "@/components/landing/testimonials"
import { TrustedBy } from "@/components/landing/trusted-by"
import { Footer } from "@/components/landing/footer"
import { PlatformFeatures } from "@/components/landing/platform-features"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-black">
      <main className="flex-1">
        <HeroSection />
        <TrustedBy />
        <PlatformFeatures />
        <HowItWorks />
        <PlatformStats />
        <FeatureSection />
        <SkillShowcase />
        <FeaturedJobs />
        <FreelancerSpotlight />
        <Testimonials />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
