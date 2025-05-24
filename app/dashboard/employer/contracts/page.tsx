"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// UI Components
import { DashboardHeader } from "@/components/features/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

// Icons
import { 
  Search, 
  FileText, 
  PlusCircle, 
  MoreVertical, 
  Clock, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Download, 
  ChevronDown,
  AlertCircle,
  DollarSign,
  FileSignature,
  MessageSquare,
  ChevronRight
} from "lucide-react"

// Sample data
const contractsData = [
  {
    id: "contract-1",
    title: "Website Redesign Project",
    freelancer: {
      id: "freelancer-1",
      name: "Ananya Patel",
      avatar: "/avatars/avatar-4.png"
    },
    status: "active",
    type: "fixed",
    startDate: "May 15, 2025",
    endDate: "June 30, 2025",
    budget: {
      total: 45000,
      spent: 25000,
      remaining: 20000,
      currency: "₹"
    },
    progress: 65,
    nextMilestone: {
      title: "Frontend Implementation",
      dueDate: "June 15, 2025",
      amount: 15000
    },
    paymentStatus: "on_schedule",
    lastUpdated: "May 22, 2025"
  },
  {
    id: "contract-2",
    title: "Mobile App Development",
    freelancer: {
      id: "freelancer-2",
      name: "Vikram Singh",
      avatar: "/avatars/avatar-3.png"
    },
    status: "active",
    type: "fixed",
    startDate: "May 10, 2025",
    endDate: "July 15, 2025",
    budget: {
      total: 75000,
      spent: 30000,
      remaining: 45000,
      currency: "₹"
    },
    progress: 40,
    nextMilestone: {
      title: "User Authentication",
      dueDate: "June 5, 2025",
      amount: 20000
    },
    paymentStatus: "on_schedule",
    lastUpdated: "May 24, 2025"
  },
  {
    id: "contract-3",
    title: "Content Writing for Blog",
    freelancer: {
      id: "freelancer-3",
      name: "Priya Sharma",
      avatar: "/avatars/avatar-2.png"
    },
    status: "draft",
    type: "hourly",
    startDate: "Pending",
    endDate: "Pending",
    budget: {
      total: 20000,
      spent: 0,
      remaining: 20000,
      currency: "₹"
    },
    progress: 0,
    nextMilestone: null,
    paymentStatus: "not_started",
    lastUpdated: "May 23, 2025"
  },
  {
    id: "contract-4",
    title: "Logo Design",
    freelancer: {
      id: "freelancer-4",
      name: "Rahul Mehra",
      avatar: "/avatars/avatar-1.png"
    },
    status: "pending",
    type: "fixed",
    startDate: "Pending Approval",
    endDate: "Pending Approval",
    budget: {
      total: 15000,
      spent: 0,
      remaining: 15000,
      currency: "₹"
    },
    progress: 0,
    nextMilestone: {
      title: "Initial Concepts",
      dueDate: "Pending",
      amount: 5000
    },
    paymentStatus: "not_started",
    lastUpdated: "May 21, 2025"
  },
  {
    id: "contract-5",
    title: "SEO Optimization",
    freelancer: {
      id: "freelancer-5",
      name: "Arjun Kumar",
      avatar: "/avatars/avatar-5.png"
    },
    status: "completed",
    type: "fixed",
    startDate: "April 10, 2025",
    endDate: "May 10, 2025",
    budget: {
      total: 25000,
      spent: 25000,
      remaining: 0,
      currency: "₹"
    },
    progress: 100,
    nextMilestone: null,
    paymentStatus: "paid",
    lastUpdated: "May 15, 2025"
  }
]

export default function ContractsManagementPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  
  // Filter contracts based on active tab, search query, and status
  const filteredContracts = contractsData.filter(contract => {
    // Filter by tab
    if (activeTab === "active" && contract.status !== "active") return false
    if (activeTab === "draft" && contract.status !== "draft") return false
    if (activeTab === "completed" && contract.status !== "completed") return false
    
    // Filter by search query
    if (searchQuery && 
        !contract.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !contract.freelancer.name.toLowerCase().includes(searchQuery.toLowerCase())) 
      return false
    
    // Filter by status
    if (statusFilter !== "all" && contract.status !== statusFilter) return false
    
    return true
  })
  
  // Count contracts by status
  const countsByStatus = {
    all: contractsData.length,
    active: contractsData.filter(c => c.status === "active").length,
    draft: contractsData.filter(c => c.status === "draft" || c.status === "pending").length,
    completed: contractsData.filter(c => c.status === "completed").length
  }
  
  // Handle contract actions
  const handleContractAction = (action: string, contractId: string) => {
    const contract = contractsData.find(c => c.id === contractId)
    
    switch (action) {
      case "view":
        router.push(`/dashboard/employer/contracts/${contractId}`)
        break
      case "edit":
        router.push(`/dashboard/employer/contracts/${contractId}/edit`)
        break
      case "message":
        router.push(`/dashboard/employer/messages?contract=${contractId}`)
        break
      case "release":
        toast({
          title: "Payment released",
          description: `Payment for milestone "${contract?.nextMilestone?.title}" has been released.`,
        })
        break
      case "download":
        toast({
          title: "Contract downloaded",
          description: "The contract document has been downloaded.",
        })
        break
      case "complete":
        toast({
          title: "Contract completed",
          description: `Contract for "${contract?.title}" has been marked as completed.`,
        })
        break
      case "cancel":
        toast({
          title: "Contract cancelled",
          description: `Contract for "${contract?.title}" has been cancelled.`,
        })
        break
      default:
        break
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <DashboardHeader
          heading="Manage Contracts"
          text="Create and manage contracts with freelancers"
        />
        <Link href="/dashboard/employer/contracts/new">
          <Button className="ml-auto">
            <FileSignature className="mr-2 h-4 w-4" />
            Create Contract
          </Button>
        </Link>
      </div>
      
      <div className="space-y-6">
        {/* Tabs and Filters */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full md:w-auto"
          >
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="all">
                All <Badge variant="outline" className="ml-2">{countsByStatus.all}</Badge>
              </TabsTrigger>
              <TabsTrigger value="active">
                Active <Badge variant="outline" className="ml-2">{countsByStatus.active}</Badge>
              </TabsTrigger>
              <TabsTrigger value="draft">
                Drafts & Pending <Badge variant="outline" className="ml-2">{countsByStatus.draft}</Badge>
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed <Badge variant="outline" className="ml-2">{countsByStatus.completed}</Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-[250px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search contracts..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending Approval</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Contracts Cards */}
        <div className="grid gap-6">
          {filteredContracts.length > 0 ? (
            filteredContracts.map((contract) => (
              <Card key={contract.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        <Link href={`/dashboard/employer/contracts/${contract.id}`} className="hover:underline">
                          {contract.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Working with {contract.freelancer.name} • {contract.type === "fixed" ? "Fixed Price" : "Hourly Rate"}
                      </CardDescription>
                    </div>
                    <Badge
                      className={
                        contract.status === "active"
                          ? "bg-green-100 text-green-800"
                          : contract.status === "draft"
                          ? "bg-blue-100 text-blue-800"
                          : contract.status === "pending"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Budget</p>
                      <p className="font-medium">
                        {contract.budget.currency}{contract.budget.total.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="font-medium">{contract.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">End Date</p>
                      <p className="font-medium">{contract.endDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Updated</p>
                      <p className="font-medium">{contract.lastUpdated}</p>
                    </div>
                  </div>
                  
                  {contract.status === "active" && (
                    <>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">Progress</div>
                          <div className="text-sm font-medium">{contract.progress}%</div>
                        </div>
                        <Progress value={contract.progress} className="h-2" />
                      </div>
                      
                      {contract.nextMilestone && (
                        <div className="bg-muted/40 p-3 rounded-md">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-sm font-medium">Next Milestone: {contract.nextMilestone.title}</h4>
                              <p className="text-xs text-muted-foreground">
                                Due: {contract.nextMilestone.dueDate} • 
                                Amount: {contract.budget.currency}{contract.nextMilestone.amount.toLocaleString()}
                              </p>
                            </div>
                            <Button size="sm" variant="outline">Release Payment</Button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
                <CardFooter className="bg-muted/10 border-t py-3 flex justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={contract.freelancer.avatar} alt={contract.freelancer.name} />
                      <AvatarFallback>{contract.freelancer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{contract.freelancer.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleContractAction("message", contract.id)}>
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleContractAction("view", contract.id)}>
                          View Details
                        </DropdownMenuItem>
                        {(contract.status === "draft" || contract.status === "pending") && (
                          <DropdownMenuItem onClick={() => handleContractAction("edit", contract.id)}>
                            Edit Contract
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleContractAction("download", contract.id)}>
                          Download Contract
                        </DropdownMenuItem>
                        {contract.status === "active" && contract.nextMilestone && (
                          <DropdownMenuItem onClick={() => handleContractAction("release", contract.id)}>
                            Release Milestone Payment
                          </DropdownMenuItem>
                        )}
                        {contract.status === "active" && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleContractAction("complete", contract.id)}>
                              Mark as Completed
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleContractAction("cancel", contract.id)}
                              className="text-red-600"
                            >
                              Cancel Contract
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card className="py-8">
              <CardContent className="flex flex-col items-center justify-center text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No contracts found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? "Try a different search term or filter." : "Start by creating a contract with a freelancer."}
                </p>
                <Link href="/dashboard/employer/contracts/new">
                  <Button>
                    <FileSignature className="mr-2 h-4 w-4" />
                    Create Contract
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Contract Creation Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Contract Management Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="font-medium">Define Clear Milestones</h3>
                <p className="text-sm text-muted-foreground">
                  Break your project into specific deliverables with clear acceptance criteria.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Set Reasonable Deadlines</h3>
                <p className="text-sm text-muted-foreground">
                  Allow sufficient time for each milestone while keeping the project on track.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Keep Communication Open</h3>
                <p className="text-sm text-muted-foreground">
                  Regular check-ins with freelancers help avoid misunderstandings and delays.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
