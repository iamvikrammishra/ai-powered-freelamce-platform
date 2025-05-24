"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, MessageSquare, Calendar, Clock, CheckCircle } from "lucide-react"

export function RecentProjects() {
  const [selectedProject, setSelectedProject] = useState<any>(null)

  const projects = [
    {
      id: 1,
      title: "E-commerce Website Redesign",
      client: "Fashion Trends Ltd.",
      deadline: "May 28, 2025",
      progress: 75,
      status: "In Progress",
      description:
        "Complete redesign of the client's e-commerce website with modern UI/UX, improved checkout flow, and mobile responsiveness.",
      tasks: [
        { id: 1, title: "Homepage redesign", status: "completed" },
        { id: 2, title: "Product page layout", status: "completed" },
        { id: 3, title: "Checkout flow implementation", status: "in-progress" },
        { id: 4, title: "Mobile responsiveness", status: "in-progress" },
        { id: 5, title: "Payment gateway integration", status: "pending" },
      ],
      team: [
        { id: 1, name: "Ananya Patel", role: "Project Manager", avatar: "/placeholder.svg?key=pxjco" },
        { id: 2, name: "Vikram Singh", role: "UI Designer", avatar: "/indian-man-headshot.png" },
      ],
      milestones: [
        { id: 1, title: "Design Approval", date: "April 15, 2025", status: "completed" },
        { id: 2, title: "Frontend Implementation", date: "May 10, 2025", status: "completed" },
        { id: 3, title: "Backend Integration", date: "May 20, 2025", status: "in-progress" },
        { id: 4, title: "Testing & QA", date: "May 25, 2025", status: "pending" },
        { id: 5, title: "Launch", date: "May 28, 2025", status: "pending" },
      ],
    },
    {
      id: 2,
      title: "Mobile App Development",
      client: "HealthTech Solutions",
      deadline: "June 15, 2025",
      progress: 40,
      status: "In Progress",
      description:
        "Development of a health tracking mobile application for both iOS and Android platforms using React Native.",
      tasks: [
        { id: 1, title: "UI/UX Design", status: "completed" },
        { id: 2, title: "Core functionality", status: "in-progress" },
        { id: 3, title: "API Integration", status: "in-progress" },
        { id: 4, title: "Testing", status: "pending" },
        { id: 5, title: "App Store Submission", status: "pending" },
      ],
      team: [
        { id: 1, name: "Rahul Mehta", role: "Project Manager", avatar: "/indian-man-professional-headshot-2.png" },
        { id: 2, name: "Priya Sharma", role: "UI Designer", avatar: "/placeholder.svg?key=bm7ml" },
      ],
      milestones: [
        { id: 1, title: "Design Approval", date: "May 1, 2025", status: "completed" },
        { id: 2, title: "MVP Development", date: "May 30, 2025", status: "in-progress" },
        { id: 3, title: "Beta Testing", date: "June 10, 2025", status: "pending" },
        { id: 4, title: "App Store Submission", date: "June 15, 2025", status: "pending" },
      ],
    },
    {
      id: 3,
      title: "SEO Optimization",
      client: "Local Restaurant Chain",
      deadline: "May 25, 2025",
      progress: 90,
      status: "Review",
      description:
        "Comprehensive SEO optimization for a local restaurant chain's website to improve search rankings and online visibility.",
      tasks: [
        { id: 1, title: "Keyword Research", status: "completed" },
        { id: 2, title: "On-page Optimization", status: "completed" },
        { id: 3, title: "Content Enhancement", status: "completed" },
        { id: 4, title: "Backlink Building", status: "completed" },
        { id: 5, title: "Performance Report", status: "in-progress" },
      ],
      team: [{ id: 1, name: "Ananya Patel", role: "SEO Specialist", avatar: "/placeholder.svg?key=pxjco" }],
      milestones: [
        { id: 1, title: "Initial Audit", date: "April 10, 2025", status: "completed" },
        { id: 2, title: "Implementation", date: "May 5, 2025", status: "completed" },
        { id: 3, title: "Progress Report", date: "May 20, 2025", status: "in-progress" },
        { id: 4, title: "Final Report", date: "May 25, 2025", status: "pending" },
      ],
    },
    {
      id: 4,
      title: "Content Writing",
      client: "Educational Blog",
      deadline: "May 22, 2025",
      progress: 60,
      status: "In Progress",
      description:
        "Creation of educational content for a technology blog, including tutorials, guides, and industry insights.",
      tasks: [
        { id: 1, title: "Content Strategy", status: "completed" },
        { id: 2, title: "Article 1: AI Basics", status: "completed" },
        { id: 3, title: "Article 2: Machine Learning", status: "completed" },
        { id: 4, title: "Article 3: Data Science", status: "in-progress" },
        { id: 5, title: "Article 4: Future Trends", status: "pending" },
      ],
      team: [{ id: 1, name: "Vikram Singh", role: "Content Manager", avatar: "/indian-man-headshot.png" }],
      milestones: [
        { id: 1, title: "Content Plan Approval", date: "April 25, 2025", status: "completed" },
        { id: 2, title: "First Batch Delivery", date: "May 10, 2025", status: "completed" },
        { id: 3, title: "Second Batch Delivery", date: "May 22, 2025", status: "in-progress" },
      ],
    },
  ]

  const openProjectDetails = (project: any) => {
    setSelectedProject(project)
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
        <CardDescription>You have {projects.length} active projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="flex flex-col space-y-2 rounded-lg border p-3">
              <div className="flex items-start justify-between">
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        className="p-0 h-auto font-medium hover:underline text-left"
                        onClick={() => openProjectDetails(project)}
                      >
                        {project.title}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                        <DialogTitle>{project.title}</DialogTitle>
                        <DialogDescription>
                          Client: {project.client} • Deadline: {project.deadline}
                        </DialogDescription>
                      </DialogHeader>

                      <Tabs defaultValue="overview" className="mt-6">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="tasks">Tasks</TabsTrigger>
                          <TabsTrigger value="team">Team</TabsTrigger>
                          <TabsTrigger value="milestones">Milestones</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-4 mt-4">
                          <div>
                            <h4 className="font-medium mb-2">Project Description</h4>
                            <p className="text-sm text-muted-foreground">{project.description}</p>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Progress</h4>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span>Overall Completion</span>
                                <span className="font-medium">{project.progress}%</span>
                              </div>
                              <Progress value={project.progress} className="h-2" />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <div className="text-sm">
                                <p className="text-muted-foreground">Deadline</p>
                                <p className="font-medium">{project.deadline}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <div className="text-sm">
                                <p className="text-muted-foreground">Status</p>
                                <p className="font-medium">{project.status}</p>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="tasks" className="mt-4">
                          <div className="space-y-4">
                            {project.tasks.map((task) => (
                              <div key={task.id} className="flex items-center justify-between border-b pb-2">
                                <div className="flex items-center gap-2">
                                  {task.status === "completed" ? (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                  ) : task.status === "in-progress" ? (
                                    <Clock className="h-5 w-5 text-blue-500" />
                                  ) : (
                                    <FileText className="h-5 w-5 text-gray-400" />
                                  )}
                                  <span
                                    className={task.status === "completed" ? "line-through text-muted-foreground" : ""}
                                  >
                                    {task.title}
                                  </span>
                                </div>
                                <Badge
                                  variant={
                                    task.status === "completed"
                                      ? "default"
                                      : task.status === "in-progress"
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {task.status === "completed"
                                    ? "Completed"
                                    : task.status === "in-progress"
                                      ? "In Progress"
                                      : "Pending"}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="team" className="mt-4">
                          <div className="space-y-4">
                            {project.team.map((member) => (
                              <div key={member.id} className="flex items-center gap-4 border-b pb-4">
                                <Avatar>
                                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                  <AvatarFallback>
                                    {member.name.charAt(0)}
                                    {member.name.split(" ")[1].charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">{member.name}</h4>
                                  <p className="text-sm text-muted-foreground">{member.role}</p>
                                </div>
                                <Button variant="outline" size="sm" className="ml-auto">
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Message
                                </Button>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="milestones" className="mt-4">
                          <div className="space-y-4">
                            {project.milestones.map((milestone) => (
                              <div key={milestone.id} className="flex items-center justify-between border-b pb-2">
                                <div>
                                  <h4
                                    className={
                                      milestone.status === "completed"
                                        ? "line-through text-muted-foreground"
                                        : "font-medium"
                                    }
                                  >
                                    {milestone.title}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">{milestone.date}</p>
                                </div>
                                <Badge
                                  variant={
                                    milestone.status === "completed"
                                      ? "default"
                                      : milestone.status === "in-progress"
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {milestone.status === "completed"
                                    ? "Completed"
                                    : milestone.status === "in-progress"
                                      ? "In Progress"
                                      : "Pending"}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>

                      <div className="flex justify-end gap-2 mt-6">
                        <Button variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          View Files
                        </Button>
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact Client
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <p className="text-sm text-muted-foreground">{project.client}</p>
                </div>
                <Badge
                  variant={
                    project.status === "Review" ? "outline" : project.status === "Completed" ? "default" : "secondary"
                  }
                >
                  {project.status}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              <div className="text-xs text-muted-foreground">Due: {project.deadline}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
