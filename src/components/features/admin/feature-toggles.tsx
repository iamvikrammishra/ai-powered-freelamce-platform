"use client"
import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { AlertCircle, CheckCircle } from "lucide-react"

export function FeatureToggles() {
  // Mock data for features
  const [features, setFeatures] = useState([
    { 
      id: 1, 
      name: "AI Job Matching", 
      description: "Matches freelancers with jobs using AI algorithm", 
      status: true, 
      environment: "all", 
      lastUpdated: "May 24, 2025" 
    },
    { 
      id: 2, 
      name: "Video Interviews", 
      description: "Built-in video interviewing functionality", 
      status: true, 
      environment: "production", 
      lastUpdated: "May 20, 2025" 
    },
    { 
      id: 3, 
      name: "Advanced Analytics", 
      description: "Detailed analytics for employers and freelancers", 
      status: false, 
      environment: "development", 
      lastUpdated: "May 18, 2025" 
    },
    { 
      id: 4, 
      name: "Crypto Payments", 
      description: "Accept cryptocurrency payments for projects", 
      status: false, 
      environment: "staging", 
      lastUpdated: "May 15, 2025" 
    },
    { 
      id: 5, 
      name: "Skill Verification", 
      description: "AI-powered skill verification for freelancers", 
      status: true, 
      environment: "all", 
      lastUpdated: "May 10, 2025" 
    },
  ])
  
  const handleToggle = (id: number) => {
    setFeatures(features.map(feature => 
      feature.id === id 
        ? { ...feature, status: !feature.status }
        : feature
    ))
    
    const feature = features.find(f => f.id === id)
    
    toast({
      title: `Feature ${feature?.status ? 'disabled' : 'enabled'}`,
      description: `${feature?.name} has been ${feature?.status ? 'disabled' : 'enabled'} successfully.`,
      variant: feature?.status ? "destructive" : "default",
    })
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Feature Management</h2>
          <p className="text-muted-foreground">Control platform features across environments</p>
        </div>
        <Button>
          <CheckCircle className="mr-2 h-4 w-4" />
          Publish Changes
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Platform Features</CardTitle>
          <CardDescription>
            Toggle features on or off across different environments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature) => (
                <TableRow key={feature.id}>
                  <TableCell className="font-medium">{feature.name}</TableCell>
                  <TableCell>{feature.description}</TableCell>
                  <TableCell>
                    <Badge variant={
                      feature.environment === "all" ? "default" :
                      feature.environment === "production" ? "outline" :
                      feature.environment === "staging" ? "secondary" :
                      "destructive"
                    }>
                      {feature.environment}
                    </Badge>
                  </TableCell>
                  <TableCell>{feature.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {feature.status ? (
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="mr-2 h-4 w-4 text-gray-400" />
                      )}
                      <span className={feature.status ? "text-green-500" : "text-gray-400"}>
                        {feature.status ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={feature.status}
                      onCheckedChange={() => handleToggle(feature.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Feature Rollout Plan</CardTitle>
          <CardDescription>Upcoming feature releases and rollout schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center py-10 text-muted-foreground">
            Feature rollout schedule would appear here
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
