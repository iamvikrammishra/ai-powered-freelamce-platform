"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/lib/supabase/client"
import { UserType } from "@/lib/types"

// UI Components
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Icons
import { 
  Briefcase, 
  MessageSquare, 
  BarChart3,
  Bell,
  Search,
  LayoutDashboard
} from "lucide-react"

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [userType, setUserType] = useState<UserType>('freelancer')
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setProfile({
        full_name: "John Doe",
        display_name: "John"
      })
      setLoading(false)
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <DashboardShell>
      <DashboardHeader 
        heading={`Welcome, ${profile?.display_name || profile?.full_name || 'there'}!`} 
        text={userType === 'employer' 
          ? "Here's an overview of your hiring activities and job postings." 
          : "Here's an overview of your freelancing activities and opportunities."} 
      />
      
      <div className="grid gap-6">
        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="overview" className="text-sm">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="jobs" className="text-sm">
                <Briefcase className="mr-2 h-4 w-4" />
                {userType === 'employer' ? 'My Jobs' : 'Jobs'}
              </TabsTrigger>
              <TabsTrigger value="messages" className="text-sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
              </TabsTrigger>
              <TabsTrigger value="stats" className="text-sm">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Bell className="mr-2 h-4 w-4" />
                <span className="relative">
                  Notifications
                </span>
              </Button>
              
              <Button size="sm">
                {userType === 'employer' ? (
                  <>
                    <Briefcase className="mr-2 h-4 w-4" />
                    Post a Job
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Find Work
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Overview Tab Content */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            {loading ? (
              <Card>
                <CardContent className="p-6">
                  <Skeleton className="h-24 w-full" />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Welcome to your dashboard! This is a simplified version for debugging purposes.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="jobs" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Your jobs will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Your messages will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stats" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Your analytics will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
