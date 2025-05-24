"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, MoreHorizontal, Shield, Ban, Flag, CheckCircle, AlertTriangle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

export function UserManagement() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Mock users data
  const users = [
    {
      id: 1,
      name: "Rahul Patel",
      email: "rahul.patel@example.com",
      avatar: "/placeholder.svg?key=c2ft4",
      initials: "RP",
      role: "freelancer",
      status: "active",
      verified: true,
      joinDate: "Jan 15, 2025",
      lastActive: "2 hours ago",
      fraudScore: 0.05,
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      avatar: "/placeholder.svg?key=k0zcg",
      initials: "PS",
      role: "employer",
      status: "active",
      verified: true,
      joinDate: "Feb 3, 2025",
      lastActive: "5 minutes ago",
      fraudScore: 0.02,
    },
    {
      id: 3,
      name: "Vikram mishra",
      email: "vikram.singh@example.com",
      avatar: "/placeholder.svg?key=zsvl7",
      initials: "VS",
      role: "freelancer",
      status: "suspended",
      verified: true,
      joinDate: "Dec 10, 2024",
      lastActive: "3 days ago",
      fraudScore: 0.75,
    },
    {
      id: 4,
      name: "Ananya Patel",
      email: "ananya.patel@example.com",
      avatar: "/placeholder.svg?height=40&width=40&query=indian woman professional headshot 2",
      initials: "AP",
      role: "freelancer",
      status: "active",
      verified: false,
      joinDate: "Mar 22, 2025",
      lastActive: "1 day ago",
      fraudScore: 0.15,
    },
    {
      id: 5,
      name: "Arjun Mehta",
      email: "arjun.mehta@example.com",
      avatar: "/placeholder.svg?height=40&width=40&query=indian man professional headshot 3",
      initials: "AM",
      role: "employer",
      status: "flagged",
      verified: true,
      joinDate: "Apr 5, 2025",
      lastActive: "4 hours ago",
      fraudScore: 0.65,
    },
  ]

  const handleVerifyUser = (userId: number) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "User verified",
        description: "The user has been verified successfully.",
      })
    }, 1000)
  }

  const handleSuspendUser = (userId: number) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "User suspended",
        description: "The user has been suspended from the platform.",
      })
    }, 1000)
  }

  const handleUnsuspendUser = (userId: number) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "User unsuspended",
        description: "The user has been unsuspended and can now access the platform.",
      })
    }, 1000)
  }

  const handleFlagUser = (userId: number) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "User flagged",
        description: "The user has been flagged for review.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage platform users, verify accounts, and handle suspicious activity.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or ID"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="freelancer">Freelancer</SelectItem>
                  <SelectItem value="employer">Employer</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b">
              <div className="col-span-5">User</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Join Date</div>
              <div className="col-span-1">Actions</div>
            </div>

            {users.map((user) => (
              <div key={user.id} className="grid grid-cols-12 gap-4 p-4 items-center border-b">
                <div className="col-span-5 flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {user.name}
                      {user.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {user.fraudScore > 0.6 && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    </div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                </div>

                <div className="col-span-2">
                  <Badge variant="outline" className="capitalize">
                    {user.role}
                  </Badge>
                </div>

                <div className="col-span-2">
                  <Badge
                    className={
                      user.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : user.status === "suspended"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }
                  >
                    {user.status === "active" && <CheckCircle className="mr-1 h-3 w-3" />}
                    {user.status === "suspended" && <Ban className="mr-1 h-3 w-3" />}
                    {user.status === "flagged" && <Flag className="mr-1 h-3 w-3" />}
                    <span className="capitalize">{user.status}</span>
                  </Badge>
                </div>

                <div className="col-span-2 text-sm">
                  <div>{user.joinDate}</div>
                  <div className="text-muted-foreground text-xs">Last active: {user.lastActive}</div>
                </div>

                <div className="col-span-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => window.open(`/admin/users/${user.id}`, "_blank")}>
                        View Details
                      </DropdownMenuItem>
                      {!user.verified && (
                        <DropdownMenuItem onClick={() => handleVerifyUser(user.id)}>
                          <Shield className="mr-2 h-4 w-4" />
                          Verify User
                        </DropdownMenuItem>
                      )}
                      {user.status === "active" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Ban className="mr-2 h-4 w-4" />
                              Suspend User
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Suspend User</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to suspend {user.name}? They will not be able to access the
                                platform until unsuspended.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <div className="flex items-center space-x-2">
                                <Checkbox id="notify-user" />
                                <label
                                  htmlFor="notify-user"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Notify user via email
                                </label>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => {}}>
                                Cancel
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => handleSuspendUser(user.id)}
                                disabled={isLoading}
                              >
                                {isLoading ? "Suspending..." : "Suspend User"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                      {user.status === "suspended" && (
                        <DropdownMenuItem onClick={() => handleUnsuspendUser(user.id)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Unsuspend User
                        </DropdownMenuItem>
                      )}
                      {user.status !== "flagged" && (
                        <DropdownMenuItem onClick={() => handleFlagUser(user.id)}>
                          <Flag className="mr-2 h-4 w-4" />
                          Flag for Review
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
