"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star } from "lucide-react"

export function ReviewsSection() {
  const reviews = [
    {
      id: 1,
      clientName: "Ananya Patel",
      clientAvatar: "/placeholder.svg?key=pxjco",
      clientInitials: "AP",
      projectTitle: "E-commerce Website Redesign",
      rating: 5,
      date: "April 15, 2025",
      content:
        "Rahul did an exceptional job redesigning our e-commerce website. His attention to detail and understanding of user experience principles resulted in a significant increase in our conversion rates. He was communicative throughout the project and delivered ahead of schedule. Highly recommended!",
      skills: ["UI/UX Design", "React", "Responsive Design"],
    },
    {
      id: 2,
      clientName: "Vikram Singh",
      clientAvatar: "/indian-man-headshot.png",
      clientInitials: "VS",
      projectTitle: "Mobile Banking App Development",
      rating: 4,
      date: "March 22, 2025",
      content:
        "Rahul developed a mobile banking application for our fintech startup. His technical skills are impressive, and he was able to implement complex features with ease. The only reason for 4 stars instead of 5 is that we had some minor delays in the project timeline, but the quality of work was excellent.",
      skills: ["React Native", "API Integration", "Mobile Development"],
    },
    {
      id: 3,
      clientName: "Priya Sharma",
      clientAvatar: "/placeholder.svg?height=40&width=40&query=indian woman professional headshot 2",
      clientInitials: "PS",
      projectTitle: "Dashboard for Analytics Platform",
      rating: 5,
      date: "February 10, 2025",
      content:
        "Working with Rahul was a pleasure. He created a beautiful and functional dashboard for our analytics platform. His expertise in data visualization and frontend development made the complex data easy to understand and interact with. He was responsive to feedback and made revisions quickly.",
      skills: ["Data Visualization", "React", "Dashboard Design"],
    },
  ]

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
      ))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Client Reviews</CardTitle>
              <CardDescription>Reviews from clients you've worked with.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">{renderStars(4.7)}</div>
              <span className="font-medium">4.7</span>
              <span className="text-muted-foreground">({reviews.length})</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage src={review.clientAvatar || "/placeholder.svg"} alt={review.clientName} />
                      <AvatarFallback>{review.clientInitials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{review.clientName}</h4>
                      <p className="text-sm text-muted-foreground">{review.projectTitle}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{review.date}</div>
                </div>

                <div className="flex mt-3 mb-3">{renderStars(review.rating)}</div>

                <p className="text-sm mb-4">{review.content}</p>

                <Separator className="mb-4" />

                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground">Skills:</span>
                  {review.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
