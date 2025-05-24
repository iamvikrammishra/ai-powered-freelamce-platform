"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminOverview } from "@/components/features/admin/admin-overview"
import { UserManagement } from "@/components/features/admin/user-management"
import { FraudDetection } from "@/components/features/admin/fraud-detection"
import { PlatformAnalytics } from "@/components/features/admin/platform-analytics"
import { FeatureToggles } from "@/components/features/admin/feature-toggles"

export function AdminDashboard() {
  return (
    <Tabs defaultValue="overview">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="fraud">Fraud Detection</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="features">Features</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-6">
        <AdminOverview />
      </TabsContent>
      <TabsContent value="users" className="mt-6">
        <UserManagement />
      </TabsContent>
      <TabsContent value="fraud" className="mt-6">
        <FraudDetection />
      </TabsContent>
      <TabsContent value="analytics" className="mt-6">
        <PlatformAnalytics />
      </TabsContent>
      <TabsContent value="features" className="mt-6">
        <FeatureToggles />
      </TabsContent>
    </Tabs>
  )
}
