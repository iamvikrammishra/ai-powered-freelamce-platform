"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AlertTriangle } from "lucide-react"

export default function JobDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <DashboardShell>
      <DashboardHeader heading="Error" text="There was a problem loading the job details." />
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-red-100 p-4 mb-4">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          We couldn't load the job details. Please try again or go back to the job listings.
        </p>
        <div className="flex gap-4">
          <Button onClick={reset} variant="default">
            Try again
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go back
          </Button>
        </div>
      </div>
    </DashboardShell>
  )
}
