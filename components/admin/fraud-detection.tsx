"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  Shield,
  Ban,
  Eye,
  Clock,
  RefreshCw,
  UserX,
  CreditCard,
  MousePointer,
  MapPin,
} from "lucide-react"
import Image from "next/image"
import { toast } from "@/components/ui/use-toast"

export function FraudDetection() {
  const [isLoading, setIsLoading] = useState(false)

  // Mock fraud cases data
  const flaggedUsers = [
    {
      id: 1,
      name: "Suspicious User 1",
      email: "suspicious1@example.com",
      avatar: null,
      initials: "SU",
      fraudScore: 0.92,
      reasons: [
        "Multiple login attempts from different countries",
        "Unusual bidding pattern",
        "Payment method verification failed",
      ],
      status: "flagged",
      lastActivity: "2 hours ago",
    },
    {
      id: 2,
      name: "Suspicious User 2",
      email: "suspicious2@example.com",
      avatar: null,
      initials: "SU",
      fraudScore: 0.85,
      reasons: [
        "Account created with known fraudulent email pattern",
        "Rapid succession of high-value bids",
        "IP address associated with previous fraud",
      ],
      status: "investigating",
      lastActivity: "5 hours ago",
    },
    {
      id: 3,
      name: "Suspicious User 3",
      email: "suspicious3@example.com",
      avatar: null,
      initials: "SU",
      fraudScore: 0.78,
      reasons: [
        "Unusual login time pattern",
        "Multiple payment method changes",
        "Bidding on unrelated project categories",
      ],
      status: "flagged",
      lastActivity: "1 day ago",
    },
  ]

  const handleRefreshFraudData = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Fraud data refreshed",
        description: "The fraud detection data has been updated.",
      })
    }, 1500)
  }

  const handleBanUser = (userId: number) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "User banned",
        description: "The user has been banned from the platform.",
      })
    }, 1000)
  }

  const handleClearFlag = (userId: number) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Flag cleared",
        description: "The user has been marked as legitimate.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Fraud Detection Dashboard</h2>
        <Button variant="outline" onClick={handleRefreshFraudData} disabled={isLoading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh Data
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Users</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 in the last 24 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Fraud</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">-2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bid Manipulation</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">+5 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspicious Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">+1 from last week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fraud Analytics</CardTitle>
          <CardDescription>Visualizations of fraud patterns and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="trends">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="trends">Fraud Trends</TabsTrigger>
              <TabsTrigger value="types">Fraud Types</TabsTrigger>
              <TabsTrigger value="locations">Geographic Distribution</TabsTrigger>
            </TabsList>
            <TabsContent value="trends" className="mt-4">
              <div className="aspect-[2/1] relative">
                <Image
                  src="/placeholder.svg?height=400&width=800&query=line chart showing fraud detection trends over time"
                  alt="Fraud Trends Chart"
                  fill
                  className="object-contain"
                />
              </div>
            </TabsContent>
            <TabsContent value="types" className="mt-4">
              <div className="aspect-[2/1] relative">
                <Image
                  src="/placeholder.svg?height=400&width=800&query=pie chart showing distribution of fraud types"
                  alt="Fraud Types Chart"
                  fill
                  className="object-contain"
                />
              </div>
            </TabsContent>
            <TabsContent value="locations" className="mt-4">
              <div className="aspect-[2/1] relative">
                <Image
                  src="/placeholder.svg?height=400&width=800&query=world map showing geographic distribution of fraud"
                  alt="Fraud Locations Map"
                  fill
                  className="object-contain"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Flagged Users</CardTitle>
          <CardDescription>Users flagged by the fraud detection system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {flaggedUsers.map((user) => (
              <div key={user.id} className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user.name}</h4>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>

                  <Badge
                    className={
                      user.status === "flagged"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    }
                  >
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    <span className="capitalize">{user.status}</span>
                  </Badge>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Fraud Score</span>
                    <span className="font-medium">{(user.fraudScore * 100).toFixed(0)}%</span>
                  </div>
                  <Progress value={user.fraudScore * 100} className="h-2" />
                </div>

                <div className="mt-4">
                  <h5 className="text-sm font-medium mb-2">Reasons for flagging:</h5>
                  <ul className="space-y-1">
                    {user.reasons.map((reason, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>Last activity: {user.lastActivity}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                  <Button variant="destructive" onClick={() => handleBanUser(user.id)} disabled={isLoading}>
                    <Ban className="mr-2 h-4 w-4" />
                    Ban User
                  </Button>
                  <Button variant="outline" onClick={() => handleClearFlag(user.id)} disabled={isLoading}>
                    <Shield className="mr-2 h-4 w-4" />
                    Clear Flag
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
