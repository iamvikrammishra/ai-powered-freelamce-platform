"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Clock, Heart, MessageCircle, Eye } from "lucide-react"

interface Freelancer {
  id: string
  name: string
  title: string
  avatar: string
  rating: number
  reviewCount: number
  location: string
  hourlyRate: number
  availability: string
  skills: string[]
  description: string
  completedJobs: number
  responseTime: string
  lastActive: string
  featured: boolean
}

const freelancers: Freelancer[] = [
  {
    id: "1",
    name: "Priya Sharma",
    title: "Full-Stack Developer & UI/UX Designer",
    avatar: "/indian-woman-professional.png",
    rating: 4.9,
    reviewCount: 127,
    location: "Mumbai, India",
    hourlyRate: 25,
    availability: "Available Now",
    skills: ["React", "Node.js", "MongoDB", "Figma", "TypeScript"],
    description:
      "Experienced full-stack developer with 5+ years in web development. Specialized in creating modern, responsive web applications with excellent user experience.",
    completedJobs: 156,
    responseTime: "1 hour",
    lastActive: "Online",
    featured: true,
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    title: "Mobile App Developer",
    avatar: "/indian-professional-man.png",
    rating: 4.8,
    reviewCount: 89,
    location: "Bangalore, India",
    hourlyRate: 22,
    availability: "Available in 2 days",
    skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
    description:
      "Mobile app developer with expertise in cross-platform development. Created 50+ mobile applications for startups and enterprises.",
    completedJobs: 98,
    responseTime: "2 hours",
    lastActive: "2 hours ago",
    featured: false,
  },
  {
    id: "3",
    name: "Anisha Patel",
    title: "Digital Marketing Specialist",
    avatar: "/indian-woman-professional-headshot.png",
    rating: 4.9,
    reviewCount: 203,
    location: "Delhi, India",
    hourlyRate: 18,
    availability: "Available Now",
    skills: ["SEO", "Google Ads", "Social Media", "Content Marketing", "Analytics"],
    description:
      "Digital marketing expert with proven track record of increasing organic traffic by 300%+ for multiple clients. Certified in Google Ads and Analytics.",
    completedJobs: 234,
    responseTime: "30 minutes",
    lastActive: "Online",
    featured: true,
  },
  {
    id: "4",
    name: "Vikram Singh",
    title: "Data Scientist & ML Engineer",
    avatar: "/indian-man-headshot.png",
    rating: 4.7,
    reviewCount: 76,
    location: "Hyderabad, India",
    hourlyRate: 35,
    availability: "Available in 1 week",
    skills: ["Python", "Machine Learning", "TensorFlow", "Data Analysis", "SQL"],
    description:
      "Data scientist with PhD in Computer Science. Specialized in building machine learning models and data-driven solutions for businesses.",
    completedJobs: 67,
    responseTime: "4 hours",
    lastActive: "1 day ago",
    featured: false,
  },
  {
    id: "5",
    name: "Kavya Reddy",
    title: "Content Writer & SEO Specialist",
    avatar: "/indian-woman-headshot.png",
    rating: 4.8,
    reviewCount: 145,
    location: "Chennai, India",
    hourlyRate: 15,
    availability: "Available Now",
    skills: ["Content Writing", "SEO", "Copywriting", "Blog Writing", "Technical Writing"],
    description:
      "Professional content writer with 4+ years of experience. Created engaging content for 100+ brands across various industries.",
    completedJobs: 189,
    responseTime: "1 hour",
    lastActive: "Online",
    featured: false,
  },
  {
    id: "6",
    name: "Arjun Mehta",
    title: "WordPress Developer",
    avatar: "/indian-man-professional-headshot-2.png",
    rating: 4.6,
    reviewCount: 92,
    location: "Pune, India",
    hourlyRate: 20,
    availability: "Available in 3 days",
    skills: ["WordPress", "PHP", "MySQL", "WooCommerce", "Elementor"],
    description:
      "WordPress expert with experience in custom theme development and e-commerce solutions. Built 200+ WordPress websites.",
    completedJobs: 143,
    responseTime: "3 hours",
    lastActive: "5 hours ago",
    featured: false,
  },
]

export function TalentList() {
  const [sortBy, setSortBy] = useState("relevance")
  const [savedTalent, setSavedTalent] = useState<string[]>([])

  const toggleSave = (freelancerId: string) => {
    setSavedTalent((prev) =>
      prev.includes(freelancerId) ? prev.filter((id) => id !== freelancerId) : [...prev, freelancerId],
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Available Talent</h2>
          <p className="text-muted-foreground">{freelancers.length} freelancers found</p>
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Most Relevant</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Talent Cards */}
      <div className="space-y-4">
        {freelancers.map((freelancer) => (
          <Card key={freelancer.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={freelancer.avatar || "/placeholder.svg"} alt={freelancer.name} />
                    <AvatarFallback>
                      {freelancer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          {freelancer.name}
                          {freelancer.featured && (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                              Featured
                            </Badge>
                          )}
                        </h3>
                        <p className="text-muted-foreground">{freelancer.title}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSave(freelancer.id)}
                        className="text-muted-foreground hover:text-red-500"
                      >
                        <Heart
                          className={`h-4 w-4 ${savedTalent.includes(freelancer.id) ? "fill-red-500 text-red-500" : ""}`}
                        />
                      </Button>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{freelancer.rating}</span>
                        <span>({freelancer.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {freelancer.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {freelancer.lastActive}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <div className="text-2xl font-bold">₹{freelancer.hourlyRate}</div>
                  <div className="text-sm text-muted-foreground">per hour</div>
                  <Badge variant={freelancer.availability === "Available Now" ? "default" : "secondary"}>
                    {freelancer.availability}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{freelancer.description}</p>

              <div className="flex flex-wrap gap-2">
                {freelancer.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span>{freelancer.completedJobs} jobs completed</span>
                  <span>Responds in {freelancer.responseTime}</span>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button size="sm">Hire Now</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Talent
        </Button>
      </div>
    </div>
  )
}
