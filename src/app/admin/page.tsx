import type { Metadata } from "next"
import { DashboardHeader } from "@/components/features/dashboard/dashboard-header"
import { DashboardShell } from "@/components/features/dashboard/dashboard-shell"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export const metadata: Metadata = {
  title: "Admin Dashboard | GigIndia",
  description: "Platform administration and analytics",
}

export default function AdminPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Admin Dashboard" text="Monitor platform activity, manage users, and view analytics." />
      <div className="mt-6">
        <AdminDashboard />
      </div>
    </DashboardShell>
  )
}
