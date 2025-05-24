"use client"
import { useState } from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { MoreHorizontal, Search, UserPlus } from "lucide-react"

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [userRole, setUserRole] = useState("all")
  
  // Mock data for users
  const users = [
    { id: 1, name: "Rahul Patel", email: "rahul.patel@example.com", role: "freelancer", status: "active", joined: "May 10, 2023" },
    { id: 2, name: "Priya Sharma", email: "priya.sharma@example.com", role: "employer", status: "active", joined: "Jun 15, 2023" },
    { id: 3, name: "Vikram Singh", email: "vikram.singh@example.com", role: "freelancer", status: "inactive", joined: "Apr 22, 2023" },
    { id: 4, name: "Neha Gupta", email: "neha.gupta@example.com", role: "employer", status: "active", joined: "Jul 03, 2023" },
    { id: 5, name: "Aditya Verma", email: "aditya.verma@example.com", role: "freelancer", status: "active", joined: "Mar 18, 2023" },
  ]
  
  // Filter users based on search term and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = userRole === "all" || user.role === userRole
    
    return matchesSearch && matchesRole
  })
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="w-64 pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={userRole} onValueChange={setUserRole}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="freelancer">Freelancers</SelectItem>
              <SelectItem value="employer">Employers</SelectItem>
              <SelectItem value="admin">Admins</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    user.role === "admin" 
                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" 
                      : user.role === "employer"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" 
                      : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                  }`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    user.status === "active" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                  }`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>{user.joined}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit user</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Suspend user</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
