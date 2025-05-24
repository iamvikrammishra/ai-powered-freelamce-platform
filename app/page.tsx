import { CtaSection } from "@/components/features/landing/cta-section"
import { FeatureSection } from "@/components/features/landing/feature-section"
import { FeaturedJobs } from "@/components/features/landing/featured-jobs"
import { FreelancerSpotlight } from "@/components/features/landing/freelancer-spotlight"
import { HeroSection } from "@/components/features/landing/hero-section"
import { HowItWorks } from "@/components/features/landing/how-it-works"
import { PlatformStats } from "@/components/features/landing/platform-stats"
import { SkillShowcase } from "@/components/features/landing/skill-showcase"
import { Testimonials } from "@/components/features/landing/testimonials"
import { TrustedBy } from "@/components/features/landing/trusted-by"
import { Footer } from "@/components/features/landing/footer"
import { PlatformFeatures } from "@/components/features/landing/platform-features"

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
