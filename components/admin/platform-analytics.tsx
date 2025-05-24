"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { DropdownMenuContent } from "@/components/ui/dropdown-menu"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { DropdownMenu } from "@/components/ui/dropdown-menu"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, RefreshCw } from "lucide-react"
import Image from "next/image"
import { toast } from "@/components/ui/use-toast"

export function PlatformAnalytics() {
  const [isLoading, setIsLoading] = useState(false)
  const [timeRange, setTimeRange] = useState("30days")
  
  const handleRefreshAnalytics = () => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Analytics refreshed",
        description: "The analytics data has been updated.",
      })
    }, 1500)
  }
  
  const handleExportData = (format: string) => {
    toast({
      title: "Exporting data",
      description: `Exporting analytics data in ${format.toUpperCase()} format.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Platform Analytics</h2>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleRefreshAnalytics} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExportData("csv")}>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportData("excel")}>
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportData("pdf")}>
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Analytics</TabsTrigger>
          <TabsTrigger value="projects">Project Analytics</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
          <TabsTrigger value="skills">Skills Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Overview</CardTitle>
              <CardDescription>
                Key metrics for the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[2/1] relative">
                <Image
                  src="/placeholder.svg?height=400&width=800&query=dashboard with multiple charts showing platform metrics"
                  alt="Platform Overview"
                  fill
                  className="object-contain"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>
                New user registrations over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[2/1] relative">
                <Image
                  src="/placeholder.svg?height=400&width=800&query=line chart showing user growth over time"
                  alt="User Growth Chart"
                  fill
                  className="object-contain"
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>
                  Breakdown of user demographics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square relative">
                  <Image
                    src="/placeholder.svg?height=400&width=400&query=pie chart showing user demographics"
                    alt="User Demographics Chart"
                    fill
                    className="object-contain"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Retention</CardTitle>
                <CardDescription>
                  User retention rates over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square relative">
                  <Image
                    src="/placeholder.svg?height=400&width=400&query=cohort chart showing user retention"
                    alt="User Retention Chart"
                    fill
                    className="object-contain"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="projects" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Metrics</CardTitle>
              <CardDescription>
                Project creation and completion rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[2/1] relative">
                <Image
                  src="/placeholder.svg?height=400&width=800&query=line chart showing project creation and completion rates"
                  alt="Project Metrics Chart"
                  fill
                  className="object-contain"
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Categories</CardTitle>
                <CardDescription>
                  Distribution of projects by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square relative">
                  <Image
                    src="/placeholder.svg?height=400&width=400&query=pie chart showing project categories"
                    alt="Project Categories Chart"
                    fill
                    className="object-contain"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Project Success Rates</CardTitle>
                <CardDescription>
                  Success rates by project category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square relative">
                  <Image
                    src="/placeholder.svg?height=400&width=400&query=bar chart showing project success rates by category"
                    alt="Project Success Rates Chart"
                    fill
                    className="object-contain"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="revenue" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Growth</CardTitle>
              <CardDescription>
                Platform revenue over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[2/1] relative">
                <Image
                  src="/placeholder.svg?height=400&width=800&query=area chart showing platform revenue growth"
                  alt="Revenue Growth Chart"
                  fill
                  className="object-contain"
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Category</CardTitle>
                <CardDescription>
                  Revenue distribution by project category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square relative">
                  <Image
                    src="/placeholder.svg?height=400&width=400&query=pie chart showing revenue by project category"
                    alt="Revenue by Category Chart"
                    fill
                    className="object-contain"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Transaction Volume</CardTitle>
                <CardDescription>
                  Number of transactions over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square relative">
                  <Image
                    src="/placeholder.svg?height=400&width=400&query=bar chart showing transaction volume over time"
                    alt="Transaction Volume Chart"
                    fill
                    className="object-contain"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="skills" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skill Demand</CardTitle>
              <CardDescription>
                Most in-demand skills on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[2/1] relative">
                <Image
                  src="/placeholder.svg?height=400&width=800&query=horizontal bar chart showing demand for different skills"
                  alt="Skill Demand Chart"
                  fill
                  className="object-contain"
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Skill Growth</CardTitle>
                <CardDescription>
                  Fastest growing skills on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square relative">
                  <Image
                    src="/placeholder.svg?height=400&width=400&query=bar chart showing fastest growing skills"
                    alt="Skill Growth Chart"
                    fill
                    className="object-contain"\
                  />
