"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Sparkles, Search, Star, Clock, DollarSign, Calendar } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function FindMentor() {
  const [isLoading, setIsLoading] = useState(false)
  const [priceRange, setPriceRange] = useState([1000, 5000])

  // Mock mentors data
  const mentors = [
    {
      id: 1,
      name: "Vikram Singh",
      avatar: "/placeholder.svg?key=i1r1a",
      initials: "VS",
      title: "Senior Full Stack Developer",
      skills: ["React", "Node.js", "System Design"],
      experience: 8,
      rating: 4.9,
      matchScore: 92,
      availability: "10 hours/week",
      price: 2000,
      bio: "Experienced full-stack developer with expertise in building scalable web applications. I've worked with startups and large enterprises, helping them implement best practices and modern development workflows.",
    },
    {
      id: 2,
      name: "Priya Sharma",
      avatar: "/placeholder.svg?key=bm7ml",
      initials: "PS",
      title: "UI/UX Design Lead",
      skills: ["UI/UX Design", "Figma", "User Research"],
      experience: 6,
      rating: 4.8,
      matchScore: 85,
      availability: "5 hours/week",
      price: 1800,
      bio: "Design leader with a passion for creating intuitive and beautiful user experiences. I specialize in user research, wireframing, and high-fidelity prototyping. I can help you improve your design skills and portfolio.",
    },
    {
      id: 3,
      name: "Rahul Mehta",
      avatar: "/indian-man-professional-headshot-2.png",
      initials: "RM",
      title: "DevOps & Cloud Architect",
      skills: ["AWS", "DevOps", "Kubernetes"],
      experience: 10,
      rating: 4.7,
      matchScore: 78,
      availability: "8 hours/week",
      price: 2500,
      bio: "Cloud and DevOps expert with a decade of experience in building and optimizing infrastructure. I can help you learn cloud technologies, CI/CD pipelines, and infrastructure as code.",
    },
    {
      id: 4,
      name: "Ananya Patel",
      avatar: "/placeholder.svg?height=80&width=80&query=indian woman professional headshot 2",
      initials: "AP",
      title: "Content Strategy Specialist",
      skills: ["Content Writing", "SEO", "Marketing"],
      experience: 5,
      rating: 4.6,
      matchScore: 65,
      availability: "12 hours/week",
      price: 1500,
      bio: "Content strategist with experience in creating engaging content that ranks well on search engines. I can help you improve your writing skills, SEO knowledge, and content marketing strategies.",
    },
  ]

  const handleFindMentors = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Mentors found",
        description: "We've found mentors that match your criteria.",
      })
    }, 1500)
  }

  const handleRequestSession = (mentorId: number) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Session requested",
        description: "Your mentorship request has been sent. The mentor will respond shortly.",
      })
    }, 1000)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Find Mentors</CardTitle>
            <CardDescription>Filter mentors based on your preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Skills, name, or keywords" className="pl-9" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Skills</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select skills" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="node">Node.js</SelectItem>
                  <SelectItem value="ui-design">UI Design</SelectItem>
                  <SelectItem value="aws">AWS</SelectItem>
                  <SelectItem value="content">Content Writing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Experience Level</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">1-3 years</SelectItem>
                  <SelectItem value="intermediate">4-7 years</SelectItem>
                  <SelectItem value="expert">8+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range (₹/hour)</label>
              <Slider
                defaultValue={[1000, 5000]}
                min={500}
                max={10000}
                step={100}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex items-center justify-between text-sm">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Availability</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">1-5 hours/week</SelectItem>
                  <SelectItem value="medium">6-10 hours/week</SelectItem>
                  <SelectItem value="high">10+ hours/week</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={handleFindMentors}
              disabled={isLoading}
            >
              {isLoading ? "Finding mentors..." : "Find Mentors"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-3">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">AI-Recommended Mentors</h3>
            <p className="text-sm text-muted-foreground">Showing {mentors.length} mentors</p>
          </div>

          {mentors.map((mentor) => (
            <Card key={mentor.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center md:items-start gap-2">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                      <AvatarFallback>{mentor.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-medium">{mentor.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full text-xs font-medium">
                      <Sparkles className="h-3 w-3" />
                      {mentor.matchScore}% Match
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold">{mentor.name}</h3>
                      <p className="text-muted-foreground">{mentor.title}</p>
                    </div>

                    <p className="text-sm">{mentor.bio}</p>

                    <div className="flex flex-wrap gap-2">
                      {mentor.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{mentor.availability}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{mentor.experience} years experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>₹{mentor.price}/hour</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={() => handleRequestSession(mentor.id)}
                        disabled={isLoading}
                      >
                        Request Session
                      </Button>
                      <Button variant="outline">View Full Profile</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
