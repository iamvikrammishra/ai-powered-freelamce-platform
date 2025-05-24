"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Users, Briefcase, DollarSign, AlertTriangle, CheckCircle, Clock, RefreshCw } from "lucide-react"
import Image from "next/image"

export function AdminOverview() {
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleRefresh = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setLastUpdated(new Date())
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground">+15.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+7.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹24.5L</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fraud Cases</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">-5.1% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current status of platform services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Authentication Service</span>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Payment Processing</span>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>AI Recommendation Engine</span>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <span>Real-time Messaging</span>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                  Degraded
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Skill Verification API</span>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Operational
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>System alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Fraud Detection Alert</AlertTitle>
                <AlertDescription>Multiple suspicious login attempts detected from IP 203.0.113.42</AlertDescription>
              </Alert>
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>System Performance</AlertTitle>
                <AlertDescription>Database query performance degraded. Investigating the issue.</AlertDescription>
              </Alert>
              <Alert variant="default">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Maintenance Complete</AlertTitle>
                <AlertDescription>Scheduled maintenance completed successfully at 03:00 AM.</AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Analytics</CardTitle>
          <CardDescription>Key metrics and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="users">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="users">User Growth</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="skills">Skills Demand</TabsTrigger>
            </TabsList>
            <TabsContent value="users" className="mt-4">
              <div className="aspect-[2/1] relative">
                <Image
                  src="/placeholder.svg?height=400&width=800&query=line chart showing user growth over time"
                  alt="User Growth Chart"
                  fill
                  className="object-contain"
                />
              </div>
            </TabsContent>
            <TabsContent value="projects" className="mt-4">
              <div className="aspect-[2/1] relative">
                <Image
                  src="/placeholder.svg?height=400&width=800&query=bar chart showing project completion rates by category"
                  alt="Projects Chart"
                  fill
                  className="object-contain"
                />
              </div>
            </TabsContent>
            <TabsContent value="revenue" className="mt-4">
              <div className="aspect-[2/1] relative">
                <Image
                  src="/placeholder.svg?height=400&width=800&query=area chart showing platform revenue growth"
                  alt="Revenue Chart"
                  fill
                  className="object-contain"
                />
              </div>
            </TabsContent>
            <TabsContent value="skills" className="mt-4">
              <div className="aspect-[2/1] relative">
                <Image
                  src="/placeholder.svg?height=400&width=800&query=horizontal bar chart showing demand for different skills"
                  alt="Skills Demand Chart"
                  fill
                  className="object-contain"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
