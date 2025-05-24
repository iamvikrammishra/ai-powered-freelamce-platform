import type { Metadata } from "next"
import { DashboardHeader } from "@/components/features/dashboard/dashboard-header"
import { DashboardShell } from "@/components/features/dashboard/dashboard-shell"
import { MentorshipTabs } from "@/components/mentorship/mentorship-tabs"

export const metadata: Metadata = {
  title: "Mentorship | GigIndia",
  description: "Find mentors or become a mentor to help others grow",
}

export default function MentorshipPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Mentorship Program"
        text="Connect with experienced professionals or share your knowledge with others."
      />
      <div className="mt-6">
        <MentorshipTabs />
      </div>
    </DashboardShell>
  )
}
