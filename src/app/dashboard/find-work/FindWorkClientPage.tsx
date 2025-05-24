"use client"

import { DashboardHeader } from "@/components/features/dashboard/dashboard-header"
import { DashboardShell } from "@/components/features/dashboard/dashboard-shell"
import { JobSearch } from "@/components/jobs/job-search"
import { JobFilters } from "@/components/jobs/job-filters"
import { JobList } from "@/components/jobs/job-list"
import { ErrorBoundary } from "react-error-boundary"

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
      <h2 className="text-lg font-semibold text-red-800 mb-2">Something went wrong:</h2>
      <p className="text-red-700 mb-4">{error.message}</p>
      <button onClick={resetErrorBoundary} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
        Try again
      </button>
    </div>
  )
}

export default function FindWorkClientPage() {
  return (
    <>
      <DashboardHeader
        heading="Find Work"
        text="Browse AI-recommended projects that match your skills and preferences."
      />
      <div className="grid gap-6">
        <JobSearch />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <JobFilters />
            </ErrorBoundary>
          </div>
          <div className="md:col-span-3">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <JobList />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </>
  )
}
