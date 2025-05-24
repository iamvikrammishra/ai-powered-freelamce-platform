import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export const metadata = {
  title: "Dashboard | GigIndia",
  description: "Manage your freelancing activities and projects",
}

export default function DashboardLayout({ children }) {
  return (
    <DashboardShell>
      <div className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0">
        <DashboardNav />
      </div>
      <main className="md:pl-60">
        {children}
      </main>
    </DashboardShell>
  )
}
