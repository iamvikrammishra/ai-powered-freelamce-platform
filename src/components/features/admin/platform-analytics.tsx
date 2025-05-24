"use client"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"

export function PlatformAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Platform Analytics</h2>
        <Select defaultValue="30d">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="year">This year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="growth">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="growth">Growth</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="regions">Regions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="growth" className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Users</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,248</div>
                <div className="mt-1 text-xs text-green-500">+15.3% from previous period</div>
                <div className="mt-4 h-32 w-full bg-slate-100 dark:bg-slate-800 rounded flex items-end justify-around">
                  {/* This would be a proper chart in a real implementation */}
                  {[40, 30, 45, 25, 60, 35, 50, 70, 55, 65, 40, 30].map((value, i) => (
                    <div 
                      key={i} 
                      className="bg-blue-500 dark:bg-blue-600 w-4 rounded-t"
                      style={{ height: `${value}%` }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Projects</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">685</div>
                <div className="mt-1 text-xs text-green-500">+8.7% from previous period</div>
                <div className="mt-4 h-32 w-full bg-slate-100 dark:bg-slate-800 rounded flex items-end justify-around">
                  {/* This would be a proper chart in a real implementation */}
                  {[30, 40, 35, 45, 30, 60, 55, 40, 50, 45, 35, 40].map((value, i) => (
                    <div 
                      key={i} 
                      className="bg-purple-500 dark:bg-purple-600 w-4 rounded-t"
                      style={{ height: `${value}%` }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8,432</div>
                <div className="mt-1 text-xs text-green-500">+5.2% from previous period</div>
                <div className="mt-4 h-32 w-full bg-slate-100 dark:bg-slate-800 rounded flex items-end justify-around">
                  {/* This would be a proper chart in a real implementation */}
                  {[60, 65, 70, 60, 75, 65, 80, 75, 70, 85, 80, 90].map((value, i) => (
                    <div 
                      key={i} 
                      className="bg-green-500 dark:bg-green-600 w-4 rounded-t"
                      style={{ height: `${value}%` }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="engagement" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>Analytics on user activity and platform engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-10 text-muted-foreground">
                Engagement metrics visualization would appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>Financial performance and revenue streams</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-10 text-muted-foreground">
                Revenue analytics visualization would appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="regions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Regional Distribution</CardTitle>
              <CardDescription>User and project distribution by region</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-10 text-muted-foreground">
                Regional distribution map would appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
