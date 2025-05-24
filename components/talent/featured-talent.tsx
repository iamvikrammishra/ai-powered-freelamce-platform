"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Crown } from "lucide-react"

const featuredTalent = [
  {
    id: "1",
    name: "Priya Sharma",
    title: "Senior Full-Stack Developer",
    avatar: "/indian-woman-professional.png",
    rating: 4.9,
    reviewCount: 127,
    location: "Mumbai",
    hourlyRate: 25,
    topSkills: ["React", "Node.js", "MongoDB"],
    badge: "Top Rated Plus",
    specialty: "E-commerce Solutions",
  },
  {
    id: "2",
    name: "Anisha Patel",
    title: "Digital Marketing Expert",
    avatar: "/indian-woman-professional-headshot.png",
    rating: 4.9,
    reviewCount: 203,
    location: "Delhi",
    hourlyRate: 18,
    topSkills: ["SEO", "Google Ads", "Analytics"],
    badge: "Rising Talent",
    specialty: "Performance Marketing",
  },
  {
    id: "3",
    name: "Vikram Singh",
    title: "AI/ML Specialist",
    avatar: "/indian-man-headshot.png",
    rating: 4.7,
    reviewCount: 76,
    location: "Hyderabad",
    hourlyRate: 35,
    topSkills: ["Python", "TensorFlow", "Data Science"],
    badge: "Expert Verified",
    specialty: "Computer Vision",
  },
]

export function FeaturedTalent() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Featured Talent</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover our top-rated professionals who consistently deliver exceptional results
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredTalent.map((talent) => (
          <Card
            key={talent.id}
            className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200"
          >
            <CardContent className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <Avatar className="h-16 w-16 ring-2 ring-purple-100">
                  <AvatarImage src={talent.avatar || "/placeholder.svg"} alt={talent.name} />
                  <AvatarFallback>
                    {talent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Crown className="h-5 w-5 text-yellow-500" />
              </div>

              {/* Name and Title */}
              <div className="space-y-1">
                <h3 className="font-semibold text-lg group-hover:text-purple-600 transition-colors">{talent.name}</h3>
                <p className="text-muted-foreground text-sm">{talent.title}</p>
                <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                  {talent.badge}
                </Badge>
              </div>

              {/* Rating and Location */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{talent.rating}</span>
                  <span className="text-muted-foreground">({talent.reviewCount})</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {talent.location}
                </div>
              </div>

              {/* Specialty */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-lg p-3">
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  Specializes in {talent.specialty}
                </p>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1">
                {talent.topSkills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              {/* Rate and CTA */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <span className="text-xl font-bold">₹{talent.hourlyRate}</span>
                  <span className="text-sm text-muted-foreground">/hour</span>
                </div>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" size="lg">
          View All Featured Talent
        </Button>
      </div>
    </div>
  )
}
