"use client"

import { useState } from "react"
import { PlusCircle, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

type Feature = {
  id: string
  name: string
  description: string
  enabled: boolean
  createdAt: string
}

export function FeatureToggles() {
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: "feature-1",
      name: "AI Job Recommendations",
      description: "Enable AI-powered job recommendations for freelancers based on their skills and preferences.",
      enabled: true,
      createdAt: "2023-10-15",
    },
    {
      id: "feature-2",
      name: "Skill Verification Tests",
      description: "Allow freelancers to take skill verification tests to prove their expertise.",
      enabled: true,
      createdAt: "2023-10-20",
    },
    {
      id: "feature-3",
      name: "Fraud Detection System",
      description: "AI-powered system to detect and prevent fraudulent activities on the platform.",
      enabled: true,
      createdAt: "2023-11-05",
    },
    {
      id: "feature-4",
      name: "Mentor-Mentee Matching",
      description: "Match experienced freelancers with beginners for mentorship opportunities.",
      enabled: false,
      createdAt: "2023-11-15",
    },
    {
      id: "feature-5",
      name: "Analytics Dashboard",
      description: "Provide detailed analytics for freelancers and employers about their platform activities.",
      enabled: true,
      createdAt: "2023-12-01",
    },
  ])

  const [newFeature, setNewFeature] = useState({
    name: "",
    description: "",
  })

  const [editFeature, setEditFeature] = useState<Feature | null>(null)
  const [openNewDialog, setOpenNewDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)

  const handleToggle = (id: string) => {
    setFeatures(features.map((feature) => (feature.id === id ? { ...feature, enabled: !feature.enabled } : feature)))

    const feature = features.find((f) => f.id === id)
    if (feature) {
      toast({
        title: `${feature.name} ${!feature.enabled ? "enabled" : "disabled"}`,
        description: `The feature has been ${!feature.enabled ? "enabled" : "disabled"} successfully.`,
        duration: 3000,
      })
    }
  }

  const handleAddFeature = () => {
    if (!newFeature.name || !newFeature.description) {
      toast({
        title: "Missing information",
        description: "Please provide both a name and description for the new feature.",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    const newId = `feature-${features.length + 1}`
    setFeatures([
      ...features,
      {
        id: newId,
        name: newFeature.name,
        description: newFeature.description,
        enabled: false,
        createdAt: new Date().toISOString().split("T")[0],
      },
    ])

    setNewFeature({ name: "", description: "" })
    setOpenNewDialog(false)

    toast({
      title: "Feature added",
      description: `${newFeature.name} has been added successfully.`,
      duration: 3000,
    })
  }

  const handleEditFeature = () => {
    if (!editFeature || !editFeature.name || !editFeature.description) {
      toast({
        title: "Missing information",
        description: "Please provide both a name and description for the feature.",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    setFeatures(features.map((feature) => (feature.id === editFeature.id ? editFeature : feature)))

    setEditFeature(null)
    setOpenEditDialog(false)

    toast({
      title: "Feature updated",
      description: `${editFeature.name} has been updated successfully.`,
      duration: 3000,
    })
  }

  const openEdit = (feature: Feature) => {
    setEditFeature(feature)
    setOpenEditDialog(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Feature Toggles</h2>
        <Dialog open={openNewDialog} onOpenChange={setOpenNewDialog}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Feature
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Feature</DialogTitle>
              <DialogDescription>Create a new feature toggle for the platform.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Feature Name</Label>
                <Input
                  id="name"
                  value={newFeature.name}
                  onChange={(e) => setNewFeature({ ...newFeature, name: e.target.value })}
                  placeholder="Enter feature name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newFeature.description}
                  onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                  placeholder="Describe what this feature does"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenNewDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddFeature}>Add Feature</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <Card key={feature.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>{feature.name}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => openEdit(feature)}>
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Edit {feature.name}</span>
                </Button>
              </div>
              <CardDescription>Added on {feature.createdAt}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id={`toggle-${feature.id}`}
                  checked={feature.enabled}
                  onCheckedChange={() => handleToggle(feature.id)}
                />
                <Label htmlFor={`toggle-${feature.id}`}>{feature.enabled ? "Enabled" : "Disabled"}</Label>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Feature</DialogTitle>
            <DialogDescription>Update the details for this feature toggle.</DialogDescription>
          </DialogHeader>
          {editFeature && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Feature Name</Label>
                <Input
                  id="edit-name"
                  value={editFeature.name}
                  onChange={(e) => setEditFeature({ ...editFeature, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editFeature.description}
                  onChange={(e) => setEditFeature({ ...editFeature, description: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-status"
                  checked={editFeature.enabled}
                  onCheckedChange={() => setEditFeature({ ...editFeature, enabled: !editFeature.enabled })}
                />
                <Label htmlFor="edit-status">{editFeature.enabled ? "Enabled" : "Disabled"}</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditFeature}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
