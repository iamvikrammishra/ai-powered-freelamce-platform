"use client"

import { Loader2 } from "lucide-react"

export function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-12 w-12 text-purple-600 animate-spin" />
        <p className="text-gray-600 dark:text-gray-300 text-lg">Loading...</p>
      </div>
    </div>
  )
}
