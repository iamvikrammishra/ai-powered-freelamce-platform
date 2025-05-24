"use client"
import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { AlertTriangle, CheckCircle, Shield, Eye, XCircle } from "lucide-react"

export function FraudDetection() {
  const [loading, setLoading] = useState(false)
  
  // Mock data for fraud alerts
  const fraudAlerts = [
    { 
      id: 1, 
      type: "Account", 
      description: "Multiple accounts created from the same IP address", 
      risk: "high", 
      user: "unknown", 
      timestamp: "Today, 10:23 AM", 
      status: "open" 
    },
    { 
      id: 2, 
      type: "Payment", 
      description: "Unusual payment pattern detected", 
      risk: "medium", 
      user: "priya.sharma@example.com", 
      timestamp: "Yesterday, 3:45 PM", 
      status: "investigating" 
    },
    { 
      id: 3, 
      type: "Activity", 
      description: "Suspicious login attempt from unrecognized location", 
      risk: "high", 
      user: "vikram.singh@example.com", 
      timestamp: "May 24, 2:12 PM", 
      status: "resolved" 
    },
    { 
      id: 4, 
      type: "Content", 
      description: "Potentially fraudulent job posting detected", 
      risk: "medium", 
      user: "aditya.verma@example.com", 
      timestamp: "May 23, 11:30 AM", 
      status: "open" 
    },
    { 
      id: 5, 
      type: "Payment", 
      description: "Multiple failed payment attempts", 
      risk: "low", 
      user: "rahul.patel@example.com", 
      timestamp: "May 22, 9:15 AM", 
      status: "resolved" 
    },
  ]
  
  const handleRunScan = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <CardDescription>Platform risk assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-500">Medium</div>
            <div className="mt-2 h-3 w-full rounded-full bg-muted">
              <div className="h-3 w-[65%] rounded-full bg-amber-500"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Alerts</CardTitle>
            <CardDescription>Requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">7</div>
            <div className="mt-1 text-xs text-muted-foreground">+2 since yesterday</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scan Status</CardTitle>
            <CardDescription>Fraud detection system</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col">
            <div className="text-sm text-muted-foreground">Last scan: 2 hours ago</div>
            <Button 
              onClick={handleRunScan} 
              disabled={loading}
              size="sm" 
              className="mt-2"
            >
              <Shield className="mr-2 h-4 w-4" />
              {loading ? "Scanning..." : "Run Scan Now"}
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Fraud Alerts</CardTitle>
          <CardDescription>
            Review and manage detected suspicious activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fraudAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>{alert.type}</TableCell>
                  <TableCell>{alert.description}</TableCell>
                  <TableCell>
                    <Badge variant={
                      alert.risk === "high" ? "destructive" : 
                      alert.risk === "medium" ? "default" : 
                      "outline"
                    }>
                      {alert.risk.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{alert.user}</TableCell>
                  <TableCell>{alert.timestamp}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {alert.status === "open" && (
                        <AlertTriangle className="mr-1 h-4 w-4 text-amber-500" />
                      )}
                      {alert.status === "investigating" && (
                        <Eye className="mr-1 h-4 w-4 text-blue-500" />
                      )}
                      {alert.status === "resolved" && (
                        <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                      )}
                      <span className="capitalize">{alert.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">View details</span>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
