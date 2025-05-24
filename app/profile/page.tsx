import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ProfileForm } from "@/components/profile/profile-form"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortfolioGallery } from "@/components/profile/portfolio-gallery"
import { SkillsSection } from "@/components/profile/skills-section"
import { ReviewsSection } from "@/components/profile/reviews-section"

export const metadata: Metadata = {
  title: "Profile | GigIndia",
  description: "Manage your freelancer profile",
}

export default function ProfilePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Profile" text="Manage your profile information and portfolio.">
        <Button className="bg-purple-600 hover:bg-purple-700">Preview Profile</Button>
      </DashboardHeader>

      <Tabs defaultValue="general" className="mt-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General Info</TabsTrigger>
          <TabsTrigger value="skills">Skills & Tests</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="mt-6">
          <ProfileForm />
        </TabsContent>
        <TabsContent value="skills" className="mt-6">
          <SkillsSection />
        </TabsContent>
        <TabsContent value="portfolio" className="mt-6">
          <PortfolioGallery />
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <ReviewsSection />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
