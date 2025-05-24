import type { Metadata } from "next"
import { DashboardHeader } from "@/components/features/dashboard/dashboard-header"
import { DashboardShell } from "@/components/features/dashboard/dashboard-shell"
import { MeetingTabs } from "@/components/meetings/meeting-tabs"

export const metadata: Metadata = {
  title: "Meetings | GigIndia",
  description: "Schedule and manage meetings with clients and freelancers",
}

export default function MeetingsPage() {
  return (
    <>
      <DashboardHeader
        heading="Meetings"
        text="Schedule, join, and manage your meetings with clients and freelancers."
      />
      <div className="mt-6">
        <MeetingTabs />
      </div>
    </>
  )
}
