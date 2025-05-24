import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function JobDetailLoading() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <DashboardHeader>
          <Skeleton className="h-8 w-[300px]" />
          <Skeleton className="h-4 w-[200px] mt-2" />
        </DashboardHeader>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-24" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>

              <div className="mb-6">
                <Skeleton className="h-5 w-24 mb-2" />
                <Skeleton className="h-7 w-40" />
              </div>

              <div className="mb-6">
                <Skeleton className="h-5 w-24 mb-2" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-28" />
                </div>
              </div>

              <div>
                <div className="flex gap-4 mb-4">
                  <Skeleton className="h-10 w-28" />
                  <Skeleton className="h-10 w-28" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-1/2 mt-1" />
                  <div className="flex gap-4 mt-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-5 w-32 mt-2" />
                </div>
                <div className="border-b pb-4">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-1/2 mt-1" />
                  <div className="flex gap-4 mt-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-5 w-32 mt-2" />
                </div>
                <div>
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-1/2 mt-1" />
                  <div className="flex gap-4 mt-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-5 w-32 mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-9 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
