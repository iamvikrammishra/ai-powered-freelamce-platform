"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { PlusCircle, X, ExternalLink, Tag, Upload } from "lucide-react"
import Image from "next/image"
import { toast } from "@/components/ui/use-toast"

export function PortfolioGallery() {
  const [isLoading, setIsLoading] = useState(false)
  const [portfolioItems, setPortfolioItems] = useState([
    {
      id: 1,
      title: "E-commerce Website Redesign",
      description:
        "Complete redesign of an e-commerce platform focusing on user experience and conversion optimization.",
      image: "/placeholder.svg?key=9kqca",
      tags: ["UI/UX Design", "Web Design", "E-commerce"],
      url: "https://example.com/project1",
      aiTags: ["Web Design", "UI Design", "E-commerce"],
    },
    {
      id: 2,
      title: "Task Management Mobile App",
      description: "A mobile application for task management with real-time collaboration features.",
      image: "/task-management-app-ui.png",
      tags: ["Mobile App", "React Native", "UI Design"],
      url: "https://example.com/project2",
      aiTags: ["Mobile Design", "UI Design", "App Development"],
    },
    {
      id: 3,
      title: "Financial Dashboard",
      description: "Interactive dashboard for financial data visualization and analysis.",
      image: "/placeholder.svg?height=400&width=600&query=financial dashboard ui design",
      tags: ["Dashboard", "Data Visualization", "React"],
      url: "https://example.com/project3",
      aiTags: ["Dashboard Design", "Data Visualization", "Web Application"],
    },
  ])

  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    image: null as File | null,
    tags: [] as string[],
    url: "",
  })

  const [newTag, setNewTag] = useState("")

  const handleAddTag = () => {
    if (!newTag.trim()) return
    if (!newItem.tags.includes(newTag)) {
      setNewItem({
        ...newItem,
        tags: [...newItem.tags, newTag],
      })
    }
    setNewTag("")
  }

  const handleRemoveTag = (tag: string) => {
    setNewItem({
      ...newItem,
      tags: newItem.tags.filter((t) => t !== tag),
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewItem({
        ...newItem,
        image: e.target.files[0],
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call and AI analysis
    setTimeout(() => {
      const newId = Math.max(...portfolioItems.map((item) => item.id)) + 1

      // Simulate AI-generated tags
      const aiGeneratedTags = ["Web Design", "UI Design", "Creative"]

      setPortfolioItems([
        ...portfolioItems,
        {
          id: newId,
          title: newItem.title,
          description: newItem.description,
          // Use a placeholder image since we can't actually upload
          image: "/placeholder.svg?height=400&width=600&query=portfolio project web design",
          tags: newItem.tags,
          url: newItem.url,
          aiTags: aiGeneratedTags,
        },
      ])

      // Reset form
      setNewItem({
        title: "",
        description: "",
        image: null,
        tags: [],
        url: "",
      })

      setIsLoading(false)
      toast({
        title: "Portfolio item added",
        description: "Your portfolio item has been added and analyzed by AI.",
      })
    }, 2000)
  }

  const handleRemoveItem = (id: number) => {
    setPortfolioItems(portfolioItems.filter((item) => item.id !== id))
    toast({
      title: "Portfolio item removed",
      description: "The item has been removed from your portfolio.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Gallery</CardTitle>
          <CardDescription>
            Showcase your best work to attract potential clients. Our AI will analyze your portfolio to verify your
            skills.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative aspect-video">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full h-8 w-8 p-0"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {item.aiTags.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        AI-Detected Skills:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.aiTags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {item.url && (
                    <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Project
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}

            <Dialog>
              <DialogTrigger asChild>
                <Card className="flex flex-col items-center justify-center h-full min-h-[250px] border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                    <PlusCircle className="h-10 w-10 text-muted-foreground" />
                    <p className="text-muted-foreground font-medium">Add Portfolio Item</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>Add Portfolio Item</DialogTitle>
                    <DialogDescription>
                      Add details about your project. Our AI will analyze your portfolio to verify your skills.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Project Title</Label>
                      <Input
                        id="title"
                        value={newItem.title}
                        onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newItem.description}
                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="image">Project Image</Label>
                      <div className="flex items-center gap-2">
                        <Input id="image" type="file" accept="image/*" onChange={handleImageChange} required />
                        {newItem.image && (
                          <Badge variant="outline" className="text-xs">
                            {newItem.image.name}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="url">Project URL (optional)</Label>
                      <Input
                        id="url"
                        type="url"
                        placeholder="https://example.com/project"
                        value={newItem.url}
                        onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tags">Tags</Label>
                      <div className="flex gap-2">
                        <Input
                          id="tags"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Add a tag"
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                        />
                        <Button type="button" onClick={handleAddTag} disabled={!newTag.trim()}>
                          Add
                        </Button>
                      </div>
                      {newItem.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {newItem.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                              {tag}
                              <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                      {isLoading ? (
                        <>Uploading & Analyzing...</>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload & Analyze
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">{portfolioItems.length} items in your portfolio</p>
          <Button variant="outline">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Public Portfolio
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
